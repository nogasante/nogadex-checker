import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { savePdfFile, getPdfBuffer } from "@/lib/storage";

// 15 MB limit
const MAX_PDF_SIZE_BYTES = 15 * 1024 * 1024;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const request = await prisma.resultRequest.findFirst({
      where: {
        OR: [{ id }, { requestId: id }],
      },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("pdf") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF documents are allowed." },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_PDF_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File size exceeds the 15MB limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Verify PDF header magic bytes (%PDF)
    const header = buffer.subarray(0, 5).toString();
    if (!header.startsWith("%PDF")) {
      return NextResponse.json(
        { error: "Uploaded file is not a valid PDF document." },
        { status: 400 }
      );
    }

    // Safe slugified name: e.g. NGX-100123-John-Mensah-WAEC-Result.pdf
    const sanitizedStudentName = request.fullName
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    
    const safeFilename = `${request.requestId}-${sanitizedStudentName || "Candidate"}-WAEC-Result.pdf`;

    // Save using cross-platform / Vercel serverless storage helper
    const stored = await savePdfFile(request.requestId, buffer);

    const updated = await prisma.resultRequest.update({
      where: { id: request.id },
      data: {
        pdfPath: stored.path,
        pdfFilename: safeFilename,
        pdfFileSize: stored.size,
        pdfUploadedAt: new Date(),
        processingStatus: "PDF_UPLOADED",
      },
    });

    await logAudit({
      requestId: updated.id,
      action: "PDF_UPLOADED",
      adminEmail: session.email,
      details: `Uploaded result PDF: ${safeFilename} (${Math.round(stored.size / 1024)} KB)`,
    });

    return NextResponse.json({
      success: true,
      filename: safeFilename,
      size: stored.size,
      uploadedAt: updated.pdfUploadedAt,
      processingStatus: updated.processingStatus,
    });
  } catch (error: unknown) {
    console.error("PDF upload error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const request = await prisma.resultRequest.findFirst({
      where: {
        OR: [{ id }, { requestId: id }],
      },
    });

    if (!request || !request.pdfPath) {
      return NextResponse.json(
        { error: "PDF document not found" },
        { status: 404 }
      );
    }

    const fileBuffer = await getPdfBuffer(request.pdfPath);
    if (!fileBuffer) {
      return NextResponse.json(
        { error: "PDF file could not be retrieved from storage" },
        { status: 404 }
      );
    }

    const filename = request.pdfFilename || `${request.requestId}-Result.pdf`;

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error: unknown) {
    console.error("PDF streaming error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
