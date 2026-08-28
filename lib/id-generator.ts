import { prisma } from "./prisma";

/**
 * Generate a unique, recognizable Request ID: NGX-XXXXXX (e.g. NGX-104928)
 */
export async function generateUniqueRequestId(): Promise<string> {
  let isUnique = false;
  let requestId = "";

  while (!isUnique) {
    // Generate 6-digit random number between 100000 and 999999
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    requestId = `NGX-${randomNum}`;

    const existing = await prisma.resultRequest.findUnique({
      where: { requestId },
      select: { id: true },
    });

    if (!existing) {
      isUnique = true;
    }
  }

  return requestId;
}
