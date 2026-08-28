import { WaecCandidateDetails, WAEC_GHANA_PORTAL_URL } from "./types";

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
 * Generate a safe, non-intrusive browser console script / bookmarklet
 * that the admin can run to quickly populate candidate details into the WAEC Ghana form.
 *
 * NOTE: The script DOES NOT touch PIN, Serial Number, or CAPTCHA.
 * The admin must enter their purchased voucher and review the result manually.
 */
export function generateWaecAutofillScript(details: WaecCandidateDetails): string {
  const [year, month, day] = details.dateOfBirth.split("-");

  return `
(function() {
  console.log("Nogadex Consults WAEC Assistant: Populating candidate fields...");
  
  // Index Number
  const indexInput = document.querySelector('input[name*="index" i], input[id*="index" i], input[name*="candidate" i]');
  if (indexInput) {
    indexInput.value = "${details.indexNumber}";
    indexInput.dispatchEvent(new Event('input', { bubbles: true }));
    indexInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Year
  const yearSelect = document.querySelector('select[name*="year" i], select[id*="year" i]');
  if (yearSelect) {
    for (let i = 0; i < yearSelect.options.length; i++) {
      if (yearSelect.options[i].text.includes("${details.examYear}") || yearSelect.options[i].value.includes("${details.examYear}")) {
        yearSelect.selectedIndex = i;
        yearSelect.dispatchEvent(new Event('change', { bubbles: true }));
        break;
      }
    }
  }

  // Date of birth (if applicable)
  const dobInput = document.querySelector('input[type="date"], input[name*="dob" i], input[id*="dob" i]');
  if (dobInput) {
    dobInput.value = "${details.dateOfBirth}";
    dobInput.dispatchEvent(new Event('input', { bubbles: true }));
    dobInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  alert("Candidate details populated for ${details.fullName} (${details.indexNumber}). Please enter your purchased Voucher PIN and verify the CAPTCHA.");
})();
  `.trim();
}
