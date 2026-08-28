import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalRequests,
      todayRequests,
      pendingRequests,
      processingRequests,
      completedRequests,
      failedRequests,
      paidRequests,
      todayPaidRequests,
    ] = await Promise.all([
      prisma.resultRequest.count(),
      prisma.resultRequest.count({
        where: { createdAt: { gte: today } },
      }),
      prisma.resultRequest.count({
        where: {
          processingStatus: { in: ["PAID", "READY_TO_PROCESS"] },
        },
      }),
      prisma.resultRequest.count({
        where: {
          processingStatus: { in: ["PROCESSING", "RESULT_CHECKED", "PDF_UPLOADED"] },
        },
      }),
      prisma.resultRequest.count({
        where: { processingStatus: "COMPLETED" },
      }),
      prisma.resultRequest.count({
        where: {
          OR: [
            { processingStatus: "FAILED" },
            { paymentStatus: "FAILED" },
          ],
        },
      }),
      prisma.resultRequest.findMany({
        where: { paymentStatus: "PAID" },
        select: { paymentAmount: true },
      }),
      prisma.resultRequest.findMany({
        where: {
          paymentStatus: "PAID",
          createdAt: { gte: today },
        },
        select: { paymentAmount: true },
      }),
    ]);

    const totalRevenue = paidRequests.reduce((acc, curr) => acc + curr.paymentAmount, 0);
    const todayRevenue = todayPaidRequests.reduce((acc, curr) => acc + curr.paymentAmount, 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalRequests,
        todayRequests,
        todayRevenue,
        totalRevenue,
        pendingRequests,
        processingRequests,
        completedRequests,
        failedRequests,
      },
    });
  } catch (error: unknown) {
    console.error("Fetch admin stats error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
