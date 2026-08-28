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

    if (isPaystackConfigured) {
      const verifyRes = await verifyPaystackTransaction(request.paymentReference || reference);
      
      if (verifyRes.status && verifyRes.data.status === "success") {
        isSuccess = true;
        paidAmount = verifyRes.data.amount / 100; // convert pesewas to GHS
        channel = verifyRes.data.channel;
      } else {
        await prisma.resultRequest.update({
          where: { id: request.id },
          data: {
            paymentStatus: "FAILED",
            processingStatus: "FAILED",
          },
        });

        return NextResponse.json({
          success: false,
          paymentStatus: "FAILED",
          message: "Payment was not successful on Paystack",
        });
      }
    } else {
      // In dev mode when Paystack keys are placeholders, allow simulated dev verification
      if (process.env.NODE_ENV !== "production" || isSimulated) {
        isSuccess = true;
      } else {
        return NextResponse.json(
          { error: "Paystack is not configured on this server" },
          { status: 500 }
        );
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
      { error: "Unable to verify payment" },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
