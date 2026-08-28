/**
 * Nogadex Consults - Ghana WAEC Portal Autofill Assistant
 * 
 * Target URL: https://ghana.waecdirect.org/
 * 
 * Exact WAEC DOM IDs Discovered:
 * - Candidate Index:   #candid
 * - Exam Type:         #examtype  ("01" = WASSCE School, "08" = WASSCE Private / NOVDEC, "07" = BECE)
 * - Exam Year:         #examyear  ("2026", "2025", "2024", ...)
 * - DOB Day:           #cday      ("01" - "31")
 * - DOB Month:         #cmonth    ("01" - "12")
 * - DOB Year:          #cyear     ("2016" - "1926")
 * - Voucher Serial:    #serial
 * - Voucher PIN:       #pin
 * - Confirm Index:     #ccandid
 * - Confirm Year:      #cexamyear
 */

(function () {
  'use strict';

  // 1. Candidate payload (passed dynamically or configured here)
  const candidate = {
    indexNumber: "0010101234",
    examType: "01",            // "01": WASSCE School, "08": NOVDEC/Private, "07": BECE, "09": BECE Pvt
    examYear: "2025",
    dobDay: "15",              // 01 - 31
    dobMonth: "05",            // 01 - 12
    dobYear: "2006",           // YYYY
    voucherSerial: "",         // Optional: e.g. "WSC123456789"
    voucherPin: ""             // Optional: e.g. "123456789012"
  };

  console.log("%c[Nogadex WAEC Assistant]%c Autofilling Ghana WAEC portal...", "color: #dc2626; font-weight: bold;", "color: #0f172a;");

  function setVal(id, val) {
    if (!val) return;
    const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (el) {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // 1. Fill Primary Exam Information
  setVal('candid', candidate.indexNumber);
  setVal('examtype', candidate.examType);
  setVal('examyear', candidate.examYear);

  // 2. Fill Date of Birth (Required for WASSCE Private / BECE)
  setVal('cday', candidate.dobDay);
  setVal('cmonth', candidate.dobMonth);
  setVal('cyear', candidate.dobYear);

  // 3. Fill Voucher Credentials (if pre-loaded)
  if (candidate.voucherSerial) setVal('serial', candidate.voucherSerial);
  if (candidate.voucherPin) setVal('pin', candidate.voucherPin);

  // 4. Fill Confirmation Fields (Bottom of WAEC Form)
  setVal('ccandid', candidate.indexNumber);
  setVal('cexamyear', candidate.examYear);

  // 5. Highlight & Focus PIN field for operator
  const pinEl = document.getElementById('pin') || document.querySelector('input[name="pin"]');
  if (pinEl) {
    pinEl.focus();
    pinEl.style.outline = "3px solid #dc2626";
    pinEl.style.backgroundColor = "#fef2f2";
  }

  console.log("%c[Nogadex WAEC Assistant]%c ✅ Successfully populated all fields for index #" + candidate.indexNumber + "!", "color: #16a34a; font-weight: bold;", "color: #0f172a;");
})();
