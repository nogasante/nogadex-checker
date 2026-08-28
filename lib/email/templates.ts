import fs from "fs";
import path from "path";

export interface ResultEmailData {
  studentName: string;
  requestId: string;
  indexNumber: string;
  examType: string;
  examYear: string;
  supportPhone: string;
}

export function generateResultEmailHtml(data: ResultEmailData): string {
  // Read logo base64 as fallback
  let logoBase64 = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    if (fs.existsSync(logoPath)) {
      logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
    }
  } catch (err) {
    console.warn("Could not load logo for base64 fallback:", err);
  }

  const logoSrc = logoBase64 ? logoBase64 : "https://nogadex.com/logo.png";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your WAEC Result — Nogadex Consults</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070b14; margin: 0; padding: 24px 12px; color: #f8fafc; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto; background-color: #0d1322; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
    
    <!-- Top Header with Brand Logo -->
    <tr>
      <td style="background-color: #070b14; border-bottom: 1px solid #1e293b; padding: 28px 24px; text-align: center;">
        <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
          <tr>
            <td style="vertical-align: middle; padding-right: 12px;">
              <img src="cid:nogadex-logo" src-fallback="${logoSrc}" alt="Nogadex" width="42" height="42" style="display: block; border-radius: 10px; border: 0;" />
            </td>
            <td style="vertical-align: middle; text-align: left;">
              <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                nogadex<span style="color: #ef4444;">.consults</span>
              </div>
              <div style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 2px;">
                Official WAEC Results Delivery
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 32px 24px;">
        <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">
          Hello ${data.studentName},
        </div>
        
        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 16px 0;">
          Your official WAEC examination result has been verified and processed successfully.
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px 0;">
          Your formatted grade slip PDF is <strong style="color: #ffffff;">attached directly to this email</strong> for your download, printing, and records.
        </p>

        <!-- Candidate Dossier Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #070b14; border: 1px solid #1e293b; border-radius: 12px; margin: 0 0 24px 0; overflow: hidden;">
          <tr>
            <td colspan="2" style="background-color: #111827; padding: 10px 16px; border-bottom: 1px solid #1e293b; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">
              Candidate Summary
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #141f36; width: 38%;">Request ID</td>
            <td style="padding: 10px 16px; font-size: 13px; color: #ffffff; font-weight: 700; font-family: monospace; border-bottom: 1px solid #141f36;">#${data.requestId}</td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #141f36;">Index Number</td>
            <td style="padding: 10px 16px; font-size: 13px; color: #ffffff; font-weight: 700; font-family: monospace; border-bottom: 1px solid #141f36;">${data.indexNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #141f36;">Examination</td>
            <td style="padding: 10px 16px; font-size: 13px; color: #f8fafc; font-weight: 600; border-bottom: 1px solid #141f36;">${data.examType} (${data.examYear})</td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8;">Processing Status</td>
            <td style="padding: 10px 16px; font-size: 11px; color: #34d399; font-weight: 700;">
              <span style="background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 8px; border-radius: 6px; display: inline-block;">
                ✓ COMPLETED &amp; DELIVERED
              </span>
            </td>
          </tr>
        </table>

        <!-- Nogadex Red Tip Banner -->
        <div style="background-color: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 12.5px; color: #fca5a5; line-height: 1.5;">
            <strong style="color: #ffffff;">Important Notice:</strong> Download and keep this PDF safe on your device or Google Drive. You can present this copy for school admissions and verification.
          </p>
        </div>

        <!-- WhatsApp Support Direct Link -->
        <p style="font-size: 13px; line-height: 1.5; color: #94a3b8; margin: 0 0 20px 0;">
          Need assistance or another result checked? Contact our helpdesk on WhatsApp at 
          <a href="https://wa.me/${data.supportPhone}" style="color: #ef4444; font-weight: 700; text-decoration: none;">+${data.supportPhone}</a>.
        </p>

        <p style="font-size: 13px; color: #64748b; margin: 0;">
          Best regards,<br>
          <strong style="color: #cbd5e1;">Nogadex Consults Operations Team</strong>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #070b14; padding: 20px 24px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; line-height: 1.6;">
        &copy; ${new Date().getFullYear()} Nogadex Consults. All rights reserved.<br>
        Kumasi &amp; Accra, Ghana &bull; Ref: #${data.requestId}
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateResultEmailText(data: ResultEmailData): string {
  return `Hello ${data.studentName},

Your official WAEC examination result has been verified and processed successfully.
Your result PDF is attached directly to this email.

Candidate Summary:
- Request ID: #${data.requestId}
- Index Number: ${data.indexNumber}
- Examination: ${data.examType} (${data.examYear})
- Status: COMPLETED & DELIVERED

Support WhatsApp: +${data.supportPhone}

Thank you for choosing Nogadex Consults.
`;
}
