import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  try {
    const { requestId } = await params;

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
        { error: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, request });
  } catch (error: unknown) {
    console.error("Fetch request status error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
