import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { logAudit } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const { reference, requestId, isSimulated } = await req.json();

    if (!reference && !requestId) {
      return NextResponse.json(
        { error: "Payment reference or request ID is required" },
        { status: 400 }
      );
    }

    // Find request in DB
    const request = await prisma.resultRequest.findFirst({
      where: {
        OR: [
          ...(reference ? [{ paymentReference: reference }] : []),
          ...(requestId ? [{ requestId }] : []),
        ],
      },
    });

    if (!request) {
      return NextResponse.json(
        { error: "Result request record not found" },
        { status: 404 }
      );
    }

    // Idempotency check: if already verified as PAID, return immediately
    if (request.paymentStatus === "PAID") {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        paymentStatus: "PAID",
        processingStatus: request.processingStatus,
        requestId: request.requestId,
      });
    }

    const isPaystackConfigured =
      Boolean(process.env.PAYSTACK_SECRET_KEY) &&
      !process.env.PAYSTACK_SECRET_KEY?.includes("placeholder");

    let isSuccess = false;
    let paidAmount = 30.0;
    let channel = "paystack";
    let failureReason = "Payment was not completed";

    if (isPaystackConfigured) {
      const verifyRes = await verifyPaystackTransaction(request.paymentReference || reference);
      
      if (verifyRes.status && verifyRes.data && verifyRes.data.status === "success") {
        isSuccess = true;
        paidAmount = verifyRes.data.amount / 100; // convert pesewas to GHS
        channel = verifyRes.data.channel || "paystack";
      } else {
        // Payment was abandoned, cancelled, or failed on Paystack
        const paystackStatus = verifyRes.data?.status || "abandoned";
        failureReason = `Payment was ${paystackStatus}`;
        
        await prisma.resultRequest.update({
          where: { id: request.id },
          data: {
            paymentStatus: paystackStatus === "failed" ? "FAILED" : "PENDING",
            processingStatus: "AWAITING_PAYMENT",
          },
        });

        return NextResponse.json({
          success: false,
          paymentStatus: paystackStatus === "failed" ? "FAILED" : "PENDING",
          message: failureReason,
          requestId: request.requestId,
        });
      }
    } else {
      // In dev mode when Paystack is not configured, only proceed if explicitly simulated by test runner
      if (isSimulated === true) {
        isSuccess = true;
        channel = "simulated_test";
      } else {
        return NextResponse.json({
          success: false,
          paymentStatus: "PENDING",
          message: "Payment is pending live Paystack confirmation.",
          requestId: request.requestId,
        });
      }
    }

    if (isSuccess) {
      const updated = await prisma.resultRequest.update({
        where: { id: request.id },
        data: {
          paymentStatus: "PAID",
          processingStatus: "READY_TO_PROCESS",
          paymentVerifiedAt: new Date(),
          paymentAmount: paidAmount,
        },
      });

      await logAudit({
        requestId: updated.id,
        action: "PAYMENT_VERIFIED",
        details: `Payment of GH₵${paidAmount} verified via ${channel} (Ref: ${request.paymentReference})`,
      });

      return NextResponse.json({
        success: true,
        paymentStatus: "PAID",
        processingStatus: updated.processingStatus,
        requestId: updated.requestId,
      });
    }

    return NextResponse.json(
      { error: "Unable to verify payment", paymentStatus: "PENDING" },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
