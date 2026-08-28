import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { checkInconsultStock } from "@/lib/inconsult";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const productType = (searchParams.get("type") as "WASSCE" | "BECE") || "WASSCE";

    const stock = await checkInconsultStock(productType);

    return NextResponse.json({
      success: true,
      stock,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
