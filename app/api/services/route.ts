import { NextResponse } from "next/server";
import { getAllServiceSettings } from "@/lib/services";

export const dynamic = "force-dynamic";

/**
 * Public endpoint to fetch current service & exam type availability
 */
export async function GET() {
  try {
    const services = await getAllServiceSettings();

    // Map for quick client lookup { [key]: { enabled, message, name, price } }
    const statusMap = services.reduce((acc, curr) => {
      acc[curr.key] = {
        name: curr.name,
        category: curr.category,
        enabled: curr.enabled,
        message: curr.message,
        price: curr.price,
      };
      return acc;
    }, {} as Record<string, { name: string; category: string; enabled: boolean; message?: string | null; price?: number | null }>);

    return NextResponse.json({
      success: true,
      services,
      statusMap,
    });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      { error: "Failed to load service configurations" },
      { status: 500 }
    );
  }
}
