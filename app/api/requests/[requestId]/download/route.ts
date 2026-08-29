import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPdfBuffer } from "@/lib/storage";

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

    const request = await prisma.resultRequest.findFirst({
      where: {
        OR: [{ requestId }, { id: requestId }],
      },
    });

    if (!request) {
      return NextResponse.json(
        { success: false, error: "Order not found. Please check your tracking number." },
        { status: 404 }
      );
    }

    if (request.paymentStatus !== "PAID") {
      return NextResponse.json(
        { success: false, error: "Payment has not been confirmed for this request." },
        { status: 403 }
      );
    }

    if (!request.pdfPath) {
      return NextResponse.json(
        {
          success: false,
          error: "Your result slip is currently being processed by our team. Please check back in a few minutes.",
        },
        { status: 404 }
      );
    }

    const fileBuffer = await getPdfBuffer(request.pdfPath);
    if (!fileBuffer || fileBuffer.length === 0) {
      return NextResponse.json(
        { success: false, error: "Result PDF could not be retrieved from storage. Please contact WhatsApp support." },
        { status: 404 }
      );
    }

    const safeName = request.pdfFilename || `Nogadex-${request.requestId}-Result-Slip.pdf`;

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${safeName}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error: unknown) {
    console.error("Student result slip download error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while downloading your result slip." },
      { status: 500 }
    );
  }
}
