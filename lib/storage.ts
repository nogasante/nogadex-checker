import fs from "fs";
import path from "path";

/**
 * Storage Helper for Local Development & Vercel Serverless Production
 */
export function getPdfStorageDir(): string {
  // On Vercel serverless functions, only /tmp is writable
  const baseDir = process.env.VERCEL
    ? path.join("/tmp", "storage", "pdfs")
    : path.join(process.cwd(), "storage", "pdfs");

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  return baseDir;
}

export async function savePdfFile(
  requestId: string,
  buffer: Buffer
): Promise<{ path: string; size: number }> {
  const dir = getPdfStorageDir();
  const filePath = path.join(dir, `${requestId}.pdf`);
  fs.writeFileSync(filePath, buffer);
  return {
    path: filePath,
    size: buffer.length,
  };
}

export async function getPdfBuffer(pdfPath: string): Promise<Buffer | null> {
  if (fs.existsSync(pdfPath)) {
    return fs.readFileSync(pdfPath);
  }

  // Check fallback in /tmp if path was from another execution
  const basename = path.basename(pdfPath);
  const tmpFallback = path.join("/tmp", "storage", "pdfs", basename);
  if (fs.existsSync(tmpFallback)) {
    return fs.readFileSync(tmpFallback);
  }

  // Check local fallback
  const localFallback = path.join(process.cwd(), "storage", "pdfs", basename);
  if (fs.existsSync(localFallback)) {
    return fs.readFileSync(localFallback);
  }

  return null;
}
