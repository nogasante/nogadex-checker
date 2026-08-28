import { prisma } from "./prisma";

export interface LogAuditParams {
  requestId?: string;
  action: string;
  adminEmail?: string;
  details?: string;
  ipAddress?: string;
}

export async function logAudit({
  requestId,
  action,
  adminEmail,
  details,
  ipAddress,
}: LogAuditParams) {
  try {
    return await prisma.auditLog.create({
      data: {
        requestId,
        action,
        adminEmail,
        details,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
    return null;
  }
}
