import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniqueRequestId } from "@/lib/id-generator";
import { StudentSubmissionSchema } from "@/lib/validation";
import { initializePaystackTransaction } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = StudentSubmissionSchema.parse(body);

    const requestId = await generateUniqueRequestId();
    const paymentReference = `NGX_PAY_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const amountInGHS = 30.0;

    // Check if Paystack secret key is configured
    const isPaystackConfigured =
      Boolean(process.env.PAYSTACK_SECRET_KEY) &&
      !process.env.PAYSTACK_SECRET_KEY?.includes("placeholder");

    let authorizationUrl = "";
    let accessCode = "";

    const callbackUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/status/${requestId}?ref=${paymentReference}`;

    if (isPaystackConfigured) {
      const paystackRes = await initializePaystackTransaction({
        email: validatedData.email,
        amountInGHS,
        reference: paymentReference,
        callbackUrl,
        metadata: {
          requestId,
          fullName: validatedData.fullName,
          indexNumber: validatedData.indexNumber,
          examType: validatedData.examType,
          examYear: validatedData.examYear,
        },
      });

      if (!paystackRes.status) {
        return NextResponse.json(
          { error: "Could not initialize payment with Paystack" },
          { status: 502 }
        );
      }

      authorizationUrl = paystackRes.data.authorization_url;
      accessCode = paystackRes.data.access_code;
    } else {
      // In development / demo mode when Paystack keys are not yet configured:
      // Provide a direct status link so tester can verify payment flow seamlessly
      authorizationUrl = callbackUrl;
    }

    // Save request to database
    const newRequest = await prisma.resultRequest.create({
      data: {
        requestId,
        fullName: validatedData.fullName,
        indexNumber: validatedData.indexNumber,
        dateOfBirth: validatedData.dateOfBirth,
        examType: validatedData.examType,
        examYear: validatedData.examYear,
        email: validatedData.email,
        whatsappNumber: validatedData.whatsappNumber || null,
        paymentReference,
        paymentAmount: amountInGHS,
        currency: "GHS",
        paymentStatus: "PENDING",
        processingStatus: "AWAITING_PAYMENT",
      },
    });

    return NextResponse.json({
      success: true,
      requestId: newRequest.requestId,
      reference: paymentReference,
      authorizationUrl,
      accessCode,
      isPaystackConfigured,
      amount: amountInGHS,
    });
  } catch (error: unknown) {
    console.error("Payment initialization error:", error);
    if (error && typeof error === "object" && "errors" in error) {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
