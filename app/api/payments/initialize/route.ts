import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniqueRequestId } from "@/lib/id-generator";
import { StudentSubmissionSchema } from "@/lib/validation";
import { initializePaystackTransaction } from "@/lib/paystack";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { isServiceOrExamEnabled, getServiceSetting } from "@/lib/services";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Verify Cloudflare Turnstile token
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined;
    if (body.turnstileToken) {
      const turnstileRes = await verifyTurnstileToken(body.turnstileToken, clientIp);
      if (!turnstileRes.success) {
        return NextResponse.json(
          { error: "Security check failed. Please verify the Cloudflare challenge." },
          { status: 403 }
        );
      }
    }

    const validatedData = StudentSubmissionSchema.parse(body);

    // 2. Check if the "Check Result & PDF" service is enabled
    const serviceCheck = await isServiceOrExamEnabled("service_check_result");
    if (!serviceCheck.enabled) {
      return NextResponse.json(
        {
          error:
            serviceCheck.message ||
            "The Result Checking & PDF service is temporarily paused for maintenance. Please check back shortly or reach out on WhatsApp.",
        },
        { status: 503 }
      );
    }

    // 3. Check if the specific examination type is enabled
    const examCheck = await isServiceOrExamEnabled(validatedData.examType);
    if (!examCheck.enabled) {
      return NextResponse.json(
        {
          error:
            examCheck.message ||
            `Checking results for ${examCheck.name} is currently unavailable. Please try again later.`,
        },
        { status: 503 }
      );
    }

    const serviceSetting = await getServiceSetting("service_check_result");
    const amountInGHS = serviceSetting.price && serviceSetting.price > 0 ? serviceSetting.price : 30.0;

    const requestId = await generateUniqueRequestId();
    const paymentReference = `NGX_PAY_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

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
