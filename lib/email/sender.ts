import fs from "fs";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import {
  ResultEmailData,
  generateResultEmailHtml,
  generateResultEmailText,
} from "./templates";

export interface SendResultEmailParams {
  toEmail: string;
  pdfPath: string;
  pdfFilename: string;
  data: ResultEmailData;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  provider: "resend" | "smtp" | "mock-dev";
}

/**
 * Sends the student their WAEC result PDF via email with Nogadex branding
 */
export async function sendResultEmail({
  toEmail,
  pdfPath,
  pdfFilename,
  data,
}: SendResultEmailParams): Promise<SendEmailResult> {
  // Check if PDF file exists
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Attachment PDF file not found at: ${pdfPath}`);
  }

  const pdfBuffer = fs.readFileSync(pdfPath);
  const subject = `Your WAEC Result (${data.examType} ${data.examYear}) — Nogadex Consults`;
  const htmlContent = generateResultEmailHtml(data);
  const textContent = generateResultEmailText(data);
  const fromAddress =
    process.env.EMAIL_FROM || "Nogadex Consults <results@results.nogadexconsults.app>";

  // 1. Try Resend API if API key is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // ONLY attach the single Result PDF (no extra image files to clutter attachments)
      const attachments = [
        {
          filename: pdfFilename,
          content: pdfBuffer,
        },
      ];

      const result = await resend.emails.send({
        from: fromAddress,
        to: toEmail,
        subject,
        html: htmlContent,
        text: textContent,
        attachments,
      });

      if (result.error) {
        console.error("Resend API error:", result.error);
        return {
          success: false,
          error: result.error.message,
          provider: "resend",
        };
      }

      return {
        success: true,
        messageId: result.data?.id,
        provider: "resend",
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Resend delivery exception:", errorMessage);
      return {
        success: false,
        error: errorMessage,
        provider: "resend",
      };
    }
  }

  // 2. Try SMTP Nodemailer if host configured
  if (process.env.SMTP_HOST) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: fromAddress,
        to: toEmail,
        subject,
        text: textContent,
        html: htmlContent,
        attachments: [
          {
            filename: pdfFilename,
            path: pdfPath,
          },
        ],
      });

      return {
        success: true,
        messageId: info.messageId,
        provider: "smtp",
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("SMTP delivery exception:", errorMessage);
      return {
        success: false,
        error: errorMessage,
        provider: "smtp",
      };
    }
  }

  // 3. Fallback Mock Driver for Development / Testing without API keys
  console.log("==================================================");
  console.log("📧 [MOCK EMAIL DELIVERED - NO RESEND/SMTP KEYS]");
  console.log(`To: ${toEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`Attachment: ${pdfFilename} (${pdfBuffer.length} bytes)`);
  console.log(`Request ID: ${data.requestId}`);
  console.log("==================================================");

  return {
    success: true,
    messageId: `mock-msg-${Date.now()}`,
    provider: "mock-dev",
  };
}
