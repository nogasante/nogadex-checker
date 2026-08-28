import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { sendResultEmail } from "@/lib/email/sender";
import fs from "fs";

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
    const body = await req.json().catch(() => ({}));
    const isResend = Boolean(body.isResend);

    const request = await prisma.resultRequest.findFirst({
      where: {
        OR: [{ id }, { requestId: id }],
      },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (!request.pdfPath || !fs.existsSync(request.pdfPath)) {
      return NextResponse.json(
        { error: "No PDF result uploaded yet. Please upload the result PDF before sending." },
        { status: 400 }
      );
    }

    const emailResult = await sendResultEmail({
      toEmail: request.email,
      pdfPath: request.pdfPath,
      pdfFilename: request.pdfFilename || `${request.requestId}-Result.pdf`,
      data: {
        studentName: request.fullName,
        requestId: request.requestId,
        indexNumber: request.indexNumber,
        examType: request.examType,
        examYear: request.examYear,
        supportPhone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166",
      },
    });

    if (!emailResult.success) {
      await prisma.resultRequest.update({
        where: { id: request.id },
        data: {
          emailStatus: "FAILED",
          emailError: emailResult.error || "Email delivery failed",
        },
      });

      await logAudit({
        requestId: request.id,
        action: isResend ? "EMAIL_RESENT" : "EMAIL_SENT",
        adminEmail: session.email,
        details: `Failed to deliver email to ${request.email}: ${emailResult.error}`,
      });

      return NextResponse.json(
        { error: emailResult.error || "Failed to send email" },
        { status: 502 }
      );
    }

    // Success: mark COMPLETED
    const now = new Date();
    const updated = await prisma.resultRequest.update({
      where: { id: request.id },
      data: {
        emailStatus: "SENT",
        emailSentAt: now,
        emailError: null,
        processingStatus: "COMPLETED",
        completedAt: now,
      },
    });

    await logAudit({
      requestId: updated.id,
      action: isResend ? "EMAIL_RESENT" : "EMAIL_SENT",
      adminEmail: session.email,
      details: `Result PDF emailed successfully to ${request.email} (${emailResult.provider} - msgId: ${emailResult.messageId})`,
    });

    await logAudit({
      requestId: updated.id,
      action: "REQUEST_COMPLETED",
      adminEmail: session.email,
      details: `Request ${request.requestId} marked COMPLETED`,
    });

    return NextResponse.json({
      success: true,
      emailStatus: "SENT",
      processingStatus: "COMPLETED",
      provider: emailResult.provider,
      messageId: emailResult.messageId,
    });
  } catch (error: unknown) {
    console.error("Send result email error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
