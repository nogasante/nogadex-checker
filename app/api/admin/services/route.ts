import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getAllServiceSettings, updateServiceSetting } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await getAllServiceSettings();
    return NextResponse.json({ success: true, services });
  } catch (error: unknown) {
    console.error("Fetch admin services error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { key, enabled, message, price, name } = body;

    if (!key) {
      return NextResponse.json(
        { error: "Service key is required" },
        { status: 400 }
      );
    }

    const updated = await updateServiceSetting(key, {
      enabled: typeof enabled === "boolean" ? enabled : undefined,
      message: message !== undefined ? message : undefined,
      price: typeof price === "number" ? price : undefined,
      name: typeof name === "string" ? name : undefined,
    });

    // Log admin audit
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined;
    await logAudit({
      action: "SERVICE_TOGGLED",
      adminEmail: session.email,
      details: `${session.email} updated "${updated.name}" (${key}) -> Status: ${
        updated.enabled ? "ENABLED" : "DISABLED"
      }${updated.message ? ` | Notice: "${updated.message}"` : ""}`,
      ipAddress: clientIp,
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: unknown) {
    console.error("Update admin service error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
