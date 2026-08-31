import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

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
      include: {
        auditLogs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // Log request opened action
    await logAudit({
      requestId: request.id,
      action: "REQUEST_OPENED",
      adminEmail: session.email,
      details: `Admin ${session.name} opened request ${request.requestId}`,
    });

    return NextResponse.json({ success: true, request });
  } catch (error: unknown) {
    console.error("Fetch request error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { processingStatus, notes, actionType, voucherPin, voucherSerial } = body;

    const request = await prisma.resultRequest.findFirst({
      where: {
        OR: [{ id }, { requestId: id }],
      },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (processingStatus) updateData.processingStatus = processingStatus;
    if (notes !== undefined) updateData.notes = notes;
    if (voucherPin !== undefined) updateData.voucherPin = voucherPin;
    if (voucherSerial !== undefined) updateData.voucherSerial = voucherSerial;

    const updated = await prisma.resultRequest.update({
      where: { id: request.id },
      data: updateData,
    });

    let auditAction = "STATUS_UPDATED";
    let auditDetails = `Processing status updated to ${processingStatus || request.processingStatus}`;

    if (actionType === "WAEC_PROCESSING_STARTED") {
      auditAction = "WAEC_PROCESSING_STARTED";
      auditDetails = `Admin started WAEC check on official portal`;
    } else if (actionType === "RESULT_MARKED_CHECKED") {
      auditAction = "RESULT_MARKED_CHECKED";
      auditDetails = `Admin confirmed WAEC result was checked and verified`;
    } else if (voucherPin) {
      auditAction = "VOUCHER_ATTACHED";
      auditDetails = `Voucher PIN manually entered/updated`;
    }

    await logAudit({
      requestId: updated.id,
      action: auditAction,
      adminEmail: session.email,
      details: auditDetails,
    });

    return NextResponse.json({ success: true, request: updated });
  } catch (error: unknown) {
    console.error("Update request error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
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

    await prisma.resultRequest.delete({
      where: { id: request.id },
    });

    await logAudit({
      action: "REQUEST_DELETED",
      adminEmail: session.email,
      details: `Admin ${session.name} deleted request ${request.requestId} (${request.fullName})`,
    });

    return NextResponse.json({
      success: true,
      message: `Request ${request.requestId} successfully deleted.`,
    });
  } catch (error: unknown) {
    console.error("Delete request error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

