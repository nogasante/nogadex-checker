export interface ResultEmailData {
  studentName: string;
  requestId: string;
  indexNumber: string;
  examType: string;
  examYear: string;
  supportPhone: string;
}

export function generateResultEmailHtml(data: ResultEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your WAEC Result — Nogadex Consults</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 24px; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Nogadex Consults</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; color: #93c5fd;">WAEC Result Checker &amp; Delivery Service</p>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 32px 24px;">
        <h2 style="margin-top: 0; color: #0f172a; font-size: 20px;">Hello ${data.studentName},</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          Your WAEC result has been processed successfully!
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          Your official result PDF document is attached to this email for your download and records.
        </p>

        <!-- Details Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin: 24px 0; padding: 16px;">
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600; width: 40%;">Request ID:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #0f172a; font-weight: 700;">${data.requestId}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Index Number:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #0f172a; font-family: monospace;">${data.indexNumber}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Examination:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #0f172a;">${data.examType} (${data.examYear})</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Status:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #16a34a; font-weight: 700;">PROCESSED &amp; DELIVERED</td>
          </tr>
        </table>

        <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 13px; color: #1e40af; line-height: 1.5;">
            <strong>Important Tip:</strong> Please save a copy of the attached PDF to your phone, computer, or cloud storage for safe keeping.
          </p>
        </div>

        <p style="font-size: 14px; line-height: 1.5; color: #475569;">
          If you have any questions or need further assistance, you can reach out directly via WhatsApp at 
          <a href="https://wa.me/${data.supportPhone}" style="color: #2563eb; font-weight: 600; text-decoration: none;">+${data.supportPhone}</a>.
        </p>

        <p style="font-size: 14px; margin-top: 24px; color: #334155;">
          Thank you for choosing <strong>Nogadex Consults</strong>.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
        &copy; ${new Date().getFullYear()} Nogadex Consults. All rights reserved.<br>
        This email was sent regarding request ID ${data.requestId}.
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export function generateResultEmailText(data: ResultEmailData): string {
  return `Hello ${data.studentName},

Your WAEC result has been processed successfully.
Your result PDF is attached to this email.

Request ID: ${data.requestId}
Index Number: ${data.indexNumber}
Exam: ${data.examType} (${data.examYear})

Thank you for using Nogadex Consults.
Support WhatsApp: +${data.supportPhone}
`;
}
