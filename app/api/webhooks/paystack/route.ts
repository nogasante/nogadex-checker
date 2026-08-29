import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { purchaseInconsultPin } from "@/lib/inconsult";
import { logAudit } from "@/lib/audit";
import { sendAdminNewOrderAlertEmail } from "@/lib/email/sender";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const secretKey = process.env.PAYSTACK_SECRET_KEY || "";

    // If Paystack secret key is configured, verify HMAC signature
    if (secretKey && !secretKey.includes("placeholder")) {
      const hash = crypto
        .createHmac("sha512", secretKey)
        .update(rawBody)
        .digest("hex");

      if (hash !== signature) {
        console.error("Paystack webhook signature mismatch");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
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
        return NextResponse.json({ received: true, note: "Reference not found" });
      }

      // Idempotency: If already marked as PAID, do not re-process
      if (request.paymentStatus === "PAID") {
        return NextResponse.json({
          received: true,
          status: "already_processed",
        });
      }

      let voucherSerial: string | undefined;
      let voucherPin: string | undefined;

      // Automatically purchase WAEC PIN from InConsult Developer API
      if (process.env.INCONSULT_API_KEY) {
        try {
          const pinRes = await purchaseInconsultPin(request.examType as any);
          if (pinRes.success && pinRes.pin) {
            voucherSerial = pinRes.serial;
            voucherPin = pinRes.pin;
          }
        } catch (pinErr) {
          console.error("InConsult auto-purchase error in webhook:", pinErr);
        }
      }

      // Update to PAID & READY_TO_PROCESS
      const updated = await prisma.resultRequest.update({
        where: { id: request.id },
        data: {
          paymentStatus: "PAID",
          processingStatus: "READY_TO_PROCESS",
          paymentVerifiedAt: new Date(),
          paymentAmount: amountInGHS,
          voucherSerial: voucherSerial || undefined,
          voucherPin: voucherPin || undefined,
        } as any,
      });

      // Send instant notification alert to Admin
      try {
        await sendAdminNewOrderAlertEmail({
          requestId: updated.id,
          fullName: updated.fullName,
          indexNumber: updated.indexNumber,
          examType: updated.examType,
          examYear: updated.examYear,
          amount: amountInGHS,
          customerEmail: updated.email,
          customerPhone: updated.whatsappNumber || undefined,
          hasVoucherPin: !!(voucherPin || updated.voucherPin),
        });
      } catch (alertErr) {
        console.error("Admin order notification error in webhook:", alertErr);
      }

      await logAudit({
        requestId: updated.id,
        action: "PAYMENT_VERIFIED",
        details: `Webhook verified payment of GH₵${amountInGHS} via ${channel} (Ref: ${reference})${voucherPin ? " — Auto-acquired WAEC PIN via InConsult" : ""}`,
      });

      return NextResponse.json({
        received: true,
        requestId: updated.requestId,
        status: "PAID",
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("Paystack webhook error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
