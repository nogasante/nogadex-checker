import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminLoginSchema } from "@/lib/validation";
import { verifyPassword, signAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = AdminLoginSchema.parse(body);

    let user = await prisma.user.findUnique({
      where: { email },
    });

    const defaultInitialPassword = process.env.ADMIN_INITIAL_PASSWORD || "AdminPassword2026!";
    const allowedAdmins = [
      "admin@nogadex.com",
      "nanasante2000@gmail.com",
      "nogasante@st.knust.edu.gh",
    ];

    // If database is empty or user not yet seeded, auto-provision on first valid login
    if (!user && allowedAdmins.includes(email.toLowerCase()) && password === defaultInitialPassword) {
      const { hashPassword } = await import("@/lib/auth");
      const passwordHash = await hashPassword(defaultInitialPassword);
      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name: email.split("@")[0].toUpperCase(),
          passwordHash,
          role: "ADMIN",
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Sign JWT token
    const token = await signAdminToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Set HTTP-only secure cookie
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    console.error("Admin login error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
