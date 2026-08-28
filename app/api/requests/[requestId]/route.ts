import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  try {
    const { requestId } = await params;

    if (!requestId || requestId.length < 3) {
      return NextResponse.json(
        { success: false, error: "Invalid Request ID provided." },
        { status: 400 }
      );
    }

    const request = await prisma.resultRequest.findUnique({
      where: { requestId },
      select: {
        requestId: true,
        fullName: true,
        indexNumber: true,
        examType: true,
        examYear: true,
        email: true,
        whatsappNumber: true,
        paymentStatus: true,
        paymentAmount: true,
        currency: true,
        processingStatus: true,
        emailStatus: true,
        emailSentAt: true,
        createdAt: true,
        completedAt: true,
      },
    });

    if (!request) {
      return NextResponse.json(
        { success: false, error: `No order found matching Request ID "${requestId}". Please verify the ID and try again.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, request });
  } catch (error: unknown) {
    console.error("Fetch request status error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to retrieve order details at this moment. Please try again shortly." },
      { status: 500 }
    );
  }
}
