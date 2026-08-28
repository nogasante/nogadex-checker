import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaystackWebhookSignature } from "@/lib/paystack";
import { logAudit } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing x-paystack-signature header" },
        { status: 400 }
      );
    }

    // Verify webhook authenticity
    const isValidSignature = verifyPaystackWebhookSignature(rawBody, signature);
    if (!isValidSignature) {
      console.warn("Unauthorized Paystack webhook signature mismatch");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);

    // We specifically care about charge.success
    if (event.event === "charge.success") {
      const data = event.data;
      const reference = data.reference;
      const amountInGHS = data.amount ? data.amount / 100 : 30.0;
      const channel = data.channel || "webhook";

      const request = await prisma.resultRequest.findUnique({
        where: { paymentReference: reference },
      });

      if (!request) {
        console.warn(`Webhook received for unknown reference: ${reference}`);
        // Return 200 so Paystack stops retrying unknown ref
        return NextResponse.json({ received: true, note: "Reference not found" });
      }

      // Idempotency: If already marked as PAID, do not re-process
      if (request.paymentStatus === "PAID") {
        return NextResponse.json({
          received: true,
          status: "already_processed",
        });
      }

      // Update to PAID & READY_TO_PROCESS
      const updated = await prisma.resultRequest.update({
        where: { id: request.id },
        data: {
          paymentStatus: "PAID",
          processingStatus: "READY_TO_PROCESS",
          paymentVerifiedAt: new Date(),
          paymentAmount: amountInGHS,
        },
      });

      await logAudit({
        requestId: updated.id,
        action: "PAYMENT_VERIFIED",
        details: `Webhook verified payment of GH₵${amountInGHS} via ${channel} (Ref: ${reference})`,
      });

      return NextResponse.json({
        received: true,
        requestId: updated.requestId,
        status: "PAID",
      });
    }

    return NextResponse.json({ received: true, event: event.event });
  } catch (error: unknown) {
    console.error("Paystack webhook processing error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
