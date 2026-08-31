import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === "production" ? (() => {
  console.warn("WARNING: JWT_SECRET environment variable is missing in production! Using emergency fallback.");
  return "nogadex-waec-checker-fallback-secret-2026";
})() : "nogadex-waec-checker-fallback-secret-2026");

const encodedSecret = new TextEncoder().encode(JWT_SECRET);
export const ADMIN_COOKIE_NAME = "ngx_admin_session";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface AdminJwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function signAdminToken(payload: AdminJwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload as unknown as AdminJwtPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminJwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}
