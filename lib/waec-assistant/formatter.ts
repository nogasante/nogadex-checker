import { WaecCandidateDetails, WAEC_GHANA_PORTAL_URL } from "./types";

/**
 * Maps Nogadex exam types to exact Ghana WAEC portal select option values:
 * 01: W A S S C E (School)
 * 08: W A S S C E (Private) (NOVDEC)
 * 07: B E C E
 * 09: B E C E (Private)
 * 03: G B C E (MAY/JUN)
 * 05: A B C E (MAY/JUN)
 * 00: S S S C E
 */
export function mapExamTypeToWaecValue(examType: string): string {
  const norm = (examType || "").toUpperCase();
  if (norm.includes("NOVDEC") || norm.includes("PRIVATE") || norm.includes("PVT")) return "08";
  if (norm.includes("BECE") && (norm.includes("PVT") || norm.includes("PRIVATE"))) return "09";
  if (norm.includes("BECE")) return "07";
  if (norm.includes("GBCE")) return "03";
  if (norm.includes("ABCE")) return "05";
  if (norm.includes("SSSCE")) return "00";
  return "01"; // Default WASSCE (School)
}

/**
 * Format candidate details into a convenient summary block for admin viewing
 */
export function formatCandidateSummary(details: WaecCandidateDetails): string {
  return `WAEC CANDIDATE DETAILS
---------------------------------
Request ID:    ${details.requestId}
Full Name:     ${details.fullName}
Index Number:  ${details.indexNumber}
Date of Birth: ${details.dateOfBirth}
Exam Type:     ${details.examType}
Exam Year:     ${details.examYear}
Portal URL:    ${WAEC_GHANA_PORTAL_URL}
---------------------------------`;
}

/**
 * Generate a 100% exact, automated browser console script for https://ghana.waecdirect.org/
 * Targets exact WAEC field IDs: #candid, #examtype, #examyear, #cday, #cmonth, #cyear, #ccandid, #cexamyear, #serial, #pin
 */
export function generateWaecAutofillScript(details: WaecCandidateDetails): string {
  const [dobYear, dobMonth, dobDay] = (details.dateOfBirth || "2006-05-15").split("-");
  const waecExamTypeValue = mapExamTypeToWaecValue(details.examType);

  return `
(function() {
  console.log("%c[Nogadex WAEC Assistant]%c Populating candidate details...", "color: #dc2626; font-weight: bold;", "color: #0f172a;");
  
  // 1. Index Number
  const candid = document.getElementById('candid') || document.querySelector('input[name="candid"]');
  if (candid) {
    candid.value = "${details.indexNumber}";
    candid.dispatchEvent(new Event('input', { bubbles: true }));
    candid.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // 2. Exam Type (01: WASSCE School, 08: WASSCE Pvt, 07: BECE, etc.)
  const examType = document.getElementById('examtype') || document.querySelector('select[name="examtype"]');
  if (examType) {
    examType.value = "${waecExamTypeValue}";
    examType.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // 3. Exam Year
  const examYear = document.getElementById('examyear') || document.querySelector('select[name="examyear"]');
  if (examYear) {
    examYear.value = "${details.examYear}";
    examYear.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // 4. Date of Birth (cday, cmonth, cyear)
  const cday = document.getElementById('cday') || document.querySelector('select[name="cday"]');
  if (cday) {
    cday.value = "${dobDay}";
    cday.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const cmonth = document.getElementById('cmonth') || document.querySelector('select[name="cmonth"]');
  if (cmonth) {
    cmonth.value = "${dobMonth}";
    cmonth.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const cyear = document.getElementById('cyear') || document.querySelector('select[name="cyear"]');
  if (cyear) {
    cyear.value = "${dobYear}";
    cyear.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // 5. Confirm Candidate Index Number (#ccandid)
  const ccandid = document.getElementById('ccandid') || document.querySelector('input[name="ccandid"]');
  if (ccandid) {
    ccandid.value = "${details.indexNumber}";
    ccandid.dispatchEvent(new Event('input', { bubbles: true }));
    ccandid.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // 6. Confirm Exam Year (#cexamyear)
  const cexamyear = document.getElementById('cexamyear') || document.querySelector('select[name="cexamyear"]');
  if (cexamyear) {
    cexamyear.value = "${details.examYear}";
    cexamyear.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // 7. Auto-fill Serial & PIN if available
  const serialEl = document.getElementById('serial') || document.querySelector('input[name="serial"]');
  if (serialEl && "${details.serial || ""}") {
    serialEl.value = "${details.serial || ""}";
    serialEl.dispatchEvent(new Event('input', { bubbles: true }));
    serialEl.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const pinEl = document.getElementById('pin') || document.querySelector('input[name="pin"]');
  if (pinEl) {
    if ("${details.pin || ""}") {
      pinEl.value = "${details.pin || ""}";
      pinEl.dispatchEvent(new Event('input', { bubbles: true }));
      pinEl.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      pinEl.focus();
      pinEl.style.outline = "3px solid #dc2626";
      pinEl.style.backgroundColor = "#fef2f2";
    }
  }

  console.log("%c[Nogadex WAEC Assistant]%c ✅ Populated: ${details.fullName} (#${details.indexNumber})", "color: #16a34a; font-weight: bold;", "color: #0f172a;");
})();
  `.trim();
}
