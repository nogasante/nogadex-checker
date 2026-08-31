import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const paymentStatus = searchParams.get("paymentStatus") || "";
    const processingStatus = searchParams.get("processingStatus") || "";
    const examYear = searchParams.get("examYear") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { requestId: { contains: search } },
        { fullName: { contains: search } },
        { indexNumber: { contains: search } },
        { email: { contains: search } },
      ];
    }

    // By default, only show real, verified PAID orders.
    // Abandoned / incomplete payment attempts are void and excluded.
    if (!paymentStatus || paymentStatus === "PAID") {
      where.paymentStatus = "PAID";
    } else if (paymentStatus !== "ALL") {
      where.paymentStatus = paymentStatus;
    }

    if (processingStatus && processingStatus !== "ALL") {
      where.processingStatus = processingStatus;
    }

    if (examYear && examYear !== "ALL") {
      where.examYear = examYear;
    }

    const [total, requests] = await Promise.all([
      prisma.resultRequest.count({ where }),
      prisma.resultRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      requests,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error("Fetch admin requests error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const confirmPurge = searchParams.get("confirmPurge");

    // Single item deletion via query param ?id=...
    if (id) {
      const request = await prisma.resultRequest.findFirst({
        where: { OR: [{ id }, { requestId: id }] },
      });
      if (!request) {
        return NextResponse.json({ error: "Request not found" }, { status: 404 });
      }
      await prisma.resultRequest.delete({ where: { id: request.id } });
      return NextResponse.json({
        success: true,
        message: `Order ${request.requestId} deleted successfully.`,
      });
    }

    // Bulk purge requires explicit ?confirmPurge=true safety flag
    if (confirmPurge === "true") {
      const deletedLogs = await prisma.auditLog.deleteMany({});
      const deletedRequests = await prisma.resultRequest.deleteMany({});

      return NextResponse.json({
        success: true,
        message: `Cleared ${deletedRequests.count} orders and ${deletedLogs.count} audit logs.`,
      });
    }

    return NextResponse.json(
      { error: "Missing 'id' or 'confirmPurge=true' parameter. Unconditional bulk deletion is blocked for safety." },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error("Delete request error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
