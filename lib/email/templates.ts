export interface ResultEmailData {
  studentName: string;
  requestId: string;
  indexNumber: string;
  examType: string;
  examYear: string;
  supportPhone: string;
}

export const NOGADEX_LOGO_CDN_URL =
  "https://raw.githubusercontent.com/nogasante/nogadex-checker/master/public/logo.png";

export function generateResultEmailHtml(data: ResultEmailData): string {
  const currentYear = new Date().getFullYear();
  const trackingUrl = `https://nogadexconsults.app/status/${data.requestId}`;
  const whatsappUrl = `https://wa.me/${data.supportPhone}?text=${encodeURIComponent(
    `Hello Nogadex Consults, I am inquiring about my WAEC result request #${data.requestId}`
  )}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your WAEC Result Slip — Nogadex Consults</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #0f172a; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01);">
    
    <!-- Top Brand Header -->
    <tr>
      <td style="background-color: #ffffff; border-bottom: 1px solid #f1f5f9; padding: 24px 28px; text-align: left;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="vertical-align: middle;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <img 
                      src="${NOGADEX_LOGO_CDN_URL}" 
                      alt="Nogadex Logo" 
                      width="38" 
                      height="38" 
                      style="display: block; width: 38px; height: 38px; border-radius: 10px; border: 0; object-fit: contain;" 
                    />
                  </td>
                  <td style="vertical-align: middle;">
                    <div style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px; line-height: 1.1;">
                      Nogadex <span style="color: #dc2626;">Consults</span>
                    </div>
                    <div style="font-size: 11px; font-weight: 600; color: #64748b; margin-top: 2px;">
                      Official WAEC Document Delivery
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td style="vertical-align: middle; text-align: right;">
              <span style="display: inline-block; background-color: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.2px;">
                ✓ Verified Result
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Main Message -->
    <tr>
      <td style="padding: 28px 28px 20px 28px;">
        <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 10px 0; letter-spacing: -0.4px;">
          Hello ${data.studentName},
        </h1>
        
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 16px 0;">
          Your official <strong>${data.examType} (${data.examYear})</strong> result has been checked, verified, and formatted into a printable high-resolution PDF slip.
        </p>

        <!-- PDF Attached Highlight Card -->
        <div style="background: linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%); border: 1px solid #fecdd3; border-radius: 14px; padding: 16px 18px; margin-bottom: 24px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width: 32px; vertical-align: top; font-size: 22px; line-height: 1;">
                📄
              </td>
              <td style="vertical-align: middle; padding-left: 8px;">
                <div style="font-size: 13.5px; font-weight: 700; color: #991b1b;">
                  Your Result Slip PDF is Attached
                </div>
                <div style="font-size: 12px; color: #b91c1c; margin-top: 2px; line-height: 1.4;">
                  You can open and save the attached PDF directly to your smartphone or laptop for printing and university applications.
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Candidate Dossier Table -->
        <div style="border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
          <div style="background-color: #f8fafc; padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
            Candidate &amp; Examination Dossier
          </div>
          
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding: 11px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #f1f5f9; width: 40%;">Candidate Name</td>
              <td style="padding: 11px 16px; font-size: 13px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #f1f5f9;">${data.studentName}</td>
            </tr>
            <tr>
              <td style="padding: 11px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #f1f5f9;">Index Number</td>
              <td style="padding: 11px 16px; font-size: 13.5px; color: #0f172a; font-weight: 700; font-family: monospace; border-bottom: 1px solid #f1f5f9;">${data.indexNumber}</td>
            </tr>
            <tr>
              <td style="padding: 11px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #f1f5f9;">Examination</td>
              <td style="padding: 11px 16px; font-size: 13px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${data.examType} (${data.examYear})</td>
            </tr>
            <tr>
              <td style="padding: 11px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #f1f5f9;">Request Tracking</td>
              <td style="padding: 11px 16px; font-size: 13px; color: #0f172a; font-weight: 700; font-family: monospace; border-bottom: 1px solid #f1f5f9;">#${data.requestId}</td>
            </tr>
            <tr>
              <td style="padding: 11px 16px; font-size: 13px; color: #64748b;">Delivery Status</td>
              <td style="padding: 11px 16px; font-size: 12px; color: #059669; font-weight: 700;">
                ✓ COMPLETED &amp; DELIVERED
              </td>
            </tr>
          </table>
        </div>

        <!-- Action Buttons -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding-bottom: 10px;">
              <a href="${trackingUrl}" style="display: block; text-align: center; background-color: #dc2626; color: #ffffff; padding: 13px 20px; border-radius: 12px; font-size: 13.5px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 10px rgba(220, 38, 38, 0.25);">
                ⚡ View Live Tracking &amp; Re-Download Slip
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="${whatsappUrl}" style="display: block; text-align: center; background-color: #f8fafc; color: #0f172a; border: 1px solid #e2e8f0; padding: 11px 20px; border-radius: 12px; font-size: 13px; font-weight: 600; text-decoration: none;">
                💬 Contact WhatsApp Support (+${data.supportPhone})
              </a>
            </td>
          </tr>
        </table>

        <!-- University Admissions Tip -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 20px;">
          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 700; color: #0f172a;">
            🎓 Planning for University Admissions?
          </p>
          <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.45;">
            This printable slip is accepted for undergraduate admission applications at UG Legon, KNUST, UCC, and all Ghanaian tertiary institutions.
          </p>
        </div>

        <!-- Trustpilot Review Invitation -->
        <div style="text-align: center; padding: 12px 0 6px 0; border-top: 1px solid #f1f5f9;">
          <a href="https://www.trustpilot.com/evaluate/nogadexconsults.app" style="font-size: 12px; color: #059669; font-weight: 600; text-decoration: underline;">
            ★ Satisfied with our service? Leave a review on Trustpilot
          </a>
        </div>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #0f172a; padding: 22px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <div style="font-size: 12px; font-weight: 700; color: #ffffff; margin-bottom: 6px;">
          Nogadex <span style="color: #ef4444;">Consults</span>
        </div>
        <div style="font-size: 11px; color: #94a3b8; line-height: 1.5; margin-bottom: 10px;">
          Ghana's trusted educational consultancy and digital verification portal.
        </div>
        <div style="font-size: 11px; color: #64748b;">
          &copy; ${currentYear} Nogadex Consults &bull; Ref: #${data.requestId}
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateResultEmailText(data: ResultEmailData): string {
  return `Hello ${data.studentName},

Your official WAEC examination result (${data.examType} ${data.examYear}) has been verified and processed successfully.
Your high-resolution result slip PDF is attached directly to this email.

Candidate Summary:
- Request ID: #${data.requestId}
- Candidate: ${data.studentName}
- Index Number: ${data.indexNumber}
- Examination: ${data.examType} (${data.examYear})
- Status: COMPLETED & DELIVERED

View Live Tracking: https://nogadexconsults.app/status/${data.requestId}
Support WhatsApp: +${data.supportPhone}
Review on Trustpilot: https://www.trustpilot.com/evaluate/nogadexconsults.app

Thank you for choosing Nogadex Consults.
`;
}
