import nodemailer from "nodemailer";
import { Resend } from "resend";
import { getPdfBuffer } from "@/lib/storage";
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
  // Retrieve PDF file buffer from serverless/local storage
  const pdfBuffer = await getPdfBuffer(pdfPath);
  if (!pdfBuffer) {
    throw new Error(`Attachment PDF file could not be read from: ${pdfPath}`);
  }
  const subject = `Your WAEC Result (${data.examType} ${data.examYear}) — Nogadex Consults`;
  const htmlContent = generateResultEmailHtml(data);
  const textContent = generateResultEmailText(data);
  const fromAddress =
    process.env.EMAIL_FROM || "Nogadex Consults <results@nogadexconsults.app>";

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

export interface AdminOrderAlertData {
  requestId: string;
  fullName: string;
  indexNumber: string;
  examType: string;
  examYear: string;
  amount: number;
  customerEmail: string;
  customerPhone?: string;
  hasVoucherPin?: boolean;
}

/**
 * Sends an instant email notification to the Admin when a student pays
 */
export async function sendAdminNewOrderAlertEmail(data: AdminOrderAlertData): Promise<SendEmailResult> {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || process.env.ADMIN_EMAIL || "nogadexconsults@gmail.com";
  const subject = `🚨 [NEW ORDER] ${data.fullName} paid GH₵${data.amount.toFixed(2)} (${data.examType} ${data.examYear})`;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nogadexconsults.app";
  const adminOrderUrl = `${appUrl}/admin/requests/${data.requestId}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
          .card { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0f172a; padding: 24px; text-align: center; color: #ffffff; }
          .content { padding: 24px; }
          .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .label { color: #64748b; font-weight: 500; }
          .val { color: #0f172a; font-weight: 700; text-align: right; }
          .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 12px; }
          .btn { display: block; text-align: center; background: #dc2626; color: #ffffff !important; padding: 14px 20px; border-radius: 10px; font-weight: 700; text-decoration: none; margin-top: 24px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2 style="margin:0; font-size:20px; font-weight:800; letter-spacing:-0.5px;">🚨 New Paid WAEC Order</h2>
            <p style="margin:6px 0 0; font-size:13px; color:#94a3b8;">Nogadex Operations Dispatch</p>
          </div>
          <div class="content">
            <div style="text-align: center; margin-bottom: 20px;">
              <span class="badge">GH₵ ${data.amount.toFixed(2)} PAID VIA MOMO</span>
            </div>

            <div class="row"><span class="label">Candidate Name</span><span class="val">${data.fullName}</span></div>
            <div class="row"><span class="label">Index Number</span><span class="val">${data.indexNumber}</span></div>
            <div class="row"><span class="label">Examination</span><span class="val">${data.examType} (${data.examYear})</span></div>
            <div class="row"><span class="label">Customer Email</span><span class="val">${data.customerEmail}</span></div>
            <div class="row"><span class="label">Phone / WhatsApp</span><span class="val">${data.customerPhone || "N/A"}</span></div>
            <div class="row"><span class="label">Voucher PIN Status</span><span class="val">${data.hasVoucherPin ? "✅ Auto-Purchased" : "⏳ Manual / Stock"}</span></div>

            <a href="${adminOrderUrl}" class="btn">⚡ Open Order in Admin Console</a>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `🚨 NEW PAID ORDER: ${data.fullName} (GH₵${data.amount.toFixed(2)})\nIndex: ${data.indexNumber}\nExam: ${data.examType} ${data.examYear}\nEmail: ${data.customerEmail}\nOpen in Admin: ${adminOrderUrl}`;
  const fromAddress = process.env.EMAIL_FROM || "Nogadex Alerts <alerts@nogadexconsults.app>";

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: fromAddress,
        to: adminEmail,
        subject,
        html: htmlContent,
        text: textContent,
      });
      return { success: true, provider: "resend" };
    } catch (e) {
      console.log("Resend admin alert note:", e);
    }
  }

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
      await transporter.sendMail({
        from: fromAddress,
        to: adminEmail,
        subject,
        html: htmlContent,
        text: textContent,
      });
      return { success: true, provider: "smtp" };
    } catch (e) {
      console.log("SMTP admin alert note:", e);
    }
  }

  console.log(`[MOCK ADMIN EMAIL] New Order Alert sent to ${adminEmail} for ${data.fullName}`);
  return { success: true, provider: "mock-dev" };
}

