export interface ResultEmailData {
  studentName: string;
  requestId: string;
  indexNumber: string;
  examType: string;
  examYear: string;
  supportPhone: string;
}

export function generateResultEmailHtml(data: ResultEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your WAEC Result — Nogadex Consults</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070b14; margin: 0; padding: 16px 8px; color: #f8fafc; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; margin: 0 auto; background-color: #0d1322; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden;">
    
    <!-- Top Header with Brand Badge -->
    <tr>
      <td style="background-color: #070b14; border-bottom: 1px solid #1e293b; padding: 20px 20px; text-align: left;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="vertical-align: middle; padding-right: 12px;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 36px; height: 36px; background-color: #dc2626; border-radius: 10px; text-align: center; vertical-align: middle; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; font-weight: 900; color: #ffffff; line-height: 36px; mso-line-height-rule: exactly;">
                    n
                  </td>
                </tr>
              </table>
            </td>
            <td style="vertical-align: middle;">
              <div style="font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.1;">
                nogadex<span style="color: #ef4444;">.consults</span>
              </div>
              <div style="font-size: 10.5px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 2px;">
                Official WAEC Result Delivery
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 24px 20px;">
        <div style="font-size: 17px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">
          Hello ${data.studentName},
        </div>
        
        <p style="font-size: 13.5px; line-height: 1.5; color: #cbd5e1; margin: 0 0 12px 0;">
          Your official WAEC examination result has been checked and verified.
        </p>

        <p style="font-size: 13.5px; line-height: 1.5; color: #cbd5e1; margin: 0 0 20px 0;">
          Your official grade report is <strong style="color: #ffffff;">attached to this email as a PDF</strong>.
        </p>

        <!-- Candidate Dossier Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #070b14; border: 1px solid #1e293b; border-radius: 12px; margin: 0 0 20px 0; overflow: hidden;">
          <tr>
            <td colspan="2" style="background-color: #111827; padding: 8px 14px; border-bottom: 1px solid #1e293b; font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">
              Candidate Summary
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 14px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #141f36; width: 40%;">Request ID</td>
            <td style="padding: 8px 14px; font-size: 12.5px; color: #ffffff; font-weight: 700; font-family: monospace; border-bottom: 1px solid #141f36;">#${data.requestId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 14px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #141f36;">Index Number</td>
            <td style="padding: 8px 14px; font-size: 12.5px; color: #ffffff; font-weight: 700; font-family: monospace; border-bottom: 1px solid #141f36;">${data.indexNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px 14px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #141f36;">Examination</td>
            <td style="padding: 8px 14px; font-size: 12.5px; color: #f8fafc; font-weight: 600; border-bottom: 1px solid #141f36;">${data.examType} (${data.examYear})</td>
          </tr>
          <tr>
            <td style="padding: 8px 14px; font-size: 12px; color: #94a3b8;">Status</td>
            <td style="padding: 8px 14px; font-size: 11px; color: #34d399; font-weight: 700;">
              ✓ COMPLETED &amp; DELIVERED
            </td>
          </tr>
        </table>

        <!-- Nogadex Red Tip Banner -->
        <div style="background-color: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; border-radius: 6px; padding: 12px 14px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 12px; color: #fca5a5; line-height: 1.45;">
            <strong style="color: #ffffff;">Download Advice:</strong> Save the attached PDF to your device. You can present this copy for school admissions and verification.
          </p>
        </div>

        <!-- WhatsApp Support Link -->
        <p style="font-size: 12.5px; line-height: 1.5; color: #94a3b8; margin: 0 0 16px 0;">
          Need support? Contact us on WhatsApp at 
          <a href="https://wa.me/${data.supportPhone}" style="color: #ef4444; font-weight: 700; text-decoration: none;">+${data.supportPhone}</a>.
        </p>

        <p style="font-size: 12px; color: #64748b; margin: 0;">
          Best regards,<br>
          <strong style="color: #cbd5e1;">Nogadex Consults Operations Team</strong>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #070b14; padding: 16px 20px; text-align: center; border-top: 1px solid #1e293b; font-size: 10.5px; color: #64748b; line-height: 1.5;">
        &copy; ${new Date().getFullYear()} Nogadex Consults &bull; Ref: #${data.requestId}
      </td>
    </tr>
  </table>
</body>
</html>`;
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
