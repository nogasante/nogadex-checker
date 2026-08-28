"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, X, AlertTriangle } from "lucide-react";
import { PaymentChannelsBar } from "./PaymentLogos";
import { CloudflareTurnstile } from "./CloudflareTurnstile";
import { LegalModal } from "./LegalModal";
import { CustomDropdown } from "./CustomDropdown";
import { DateOfBirthSelector } from "./DateOfBirthSelector";

const EXAM_OPTIONS = [
  { value: "WASSCE", label: "WASSCE (May/June)" },
  { value: "NOVDEC", label: "NOVDEC (Nov/Dec Pvt)" },
  { value: "BECE", label: "BECE (School)" },
  { value: "BECE_PVT", label: "BECE (Private)" },
  { value: "GBCE", label: "GBCE (General Business)" },
  { value: "ABCE", label: "ABCE (Advanced Business)" },
];

// Generate every individual year from 2026 down to 1990
const EXAM_YEARS = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => {
  const y = (2026 - i).toString();
  return { value: y, label: y };
});

export function StudentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [legalModalType, setLegalModalType] = useState<"terms" | "privacy" | "refund" | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    indexNumber: "",
    dateOfBirth: "2006-05-15",
    examType: "WASSCE",
    examYear: "2025",
    email: "",
    whatsappNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;

    // Strict numeric enforcement: block alphabets and symbols
    if (e.target.name === "indexNumber") {
      value = value.replace(/\D/g, "").slice(0, 10);
    } else if (e.target.name === "whatsappNumber") {
      value = value.replace(/[^\d+]/g, "").slice(0, 15);
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      setErrorMessage("Enter your full name as registered for the exam.");
      return;
    }
    if (!formData.indexNumber.trim() || formData.indexNumber.length < 10) {
      setErrorMessage("Please enter your complete 10-digit WAEC index number.");
      return;
    }
    if (!formData.dateOfBirth) {
      setErrorMessage("Date of birth is required to verify your identity on WAEC.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Enter a valid email address.");
      return;
    }
    if (!formData.whatsappNumber.trim() || formData.whatsappNumber.length < 9) {
      setErrorMessage("Enter a valid WhatsApp number.");
      return;
    }
    if (!turnstileToken) {
      setErrorMessage("Please complete the Cloudflare security verification.");
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage("You must accept the Terms of Service and Privacy Policy.");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmAndPay = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to initialize payment.");
      }

      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      } else {
        router.push(`/status/${data.requestId}?ref=${data.reference}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setShowConfirmModal(false);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Error */}
      {errorMessage && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-[13px] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePreSubmit} className="space-y-6">
        
        {/* ── Examination Details ── */}
        <div className="space-y-3">
          <label className="block text-[13px] font-medium text-slate-700">
            Examination Details
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            {/* Exam Type Custom Dropdown */}
            <CustomDropdown
              label="Exam Type"
              options={EXAM_OPTIONS}
              value={formData.examType}
              onChange={(val) => {
                const backendType = val === "BECE_PVT" ? "BECE" : val;
                setFormData((prev) => ({ ...prev, examType: backendType }));
                if (errorMessage) setErrorMessage("");
              }}
            />

            {/* Exam Year Custom Dropdown */}
            <CustomDropdown
              label="Exam Year"
              options={EXAM_YEARS}
              value={formData.examYear}
              onChange={(val) => {
                setFormData((prev) => ({ ...prev, examYear: val }));
                if (errorMessage) setErrorMessage("");
              }}
            />

            {/* Index Number (Numbers Only) */}
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700">
                Index Number (10 digits)
              </label>
              <input
                type="text"
                name="indexNumber"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                required
                value={formData.indexNumber}
                onChange={handleChange}
                placeholder="10 digit index number"
                className="w-full h-11 input-clean px-3 font-mono tracking-wide text-xs"
              />
            </div>

          </div>
        </div>

        {/* ── Candidate Details ── */}
        <div className="space-y-3">
          <label className="block text-[13px] font-medium text-slate-700">
            Candidate Identity
          </label>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Kwabena Mensah"
                className="w-full h-11 input-clean px-3 text-xs"
              />
              <p className="text-[11px] text-slate-400">As registered on your exam slip</p>
            </div>

            {/* Modern Custom Date of Birth Selector */}
            <DateOfBirthSelector
              value={formData.dateOfBirth}
              onChange={(val) => {
                setFormData((prev) => ({ ...prev, dateOfBirth: val }));
                if (errorMessage) setErrorMessage("");
              }}
            />
          </div>
        </div>

        {/* ── Delivery Channels ── */}
        <div className="space-y-3">
          <label className="block text-[13px] font-medium text-slate-700">
            PDF &amp; Confirmation Delivery
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@gmail.com"
                className="w-full h-11 input-clean px-3 text-xs"
              />
              <p className="text-[11px] text-slate-400">PDF slip emailed here</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                inputMode="tel"
                maxLength={15}
                required
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="054 123 4567"
                className="w-full h-11 input-clean px-3 font-mono text-xs"
              />
              <p className="text-[11px] text-slate-400">For SMS/WhatsApp alerts</p>
            </div>
          </div>
        </div>

        {/* ── Official Cloudflare Turnstile Verification ── */}
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200/80">
          <CloudflareTurnstile
            onSuccess={(token) => {
              setTurnstileToken(token);
              if (errorMessage.includes("Cloudflare")) setErrorMessage("");
            }}
            onError={() => {
              setTurnstileToken(null);
            }}
            onExpire={() => {
              setTurnstileToken(null);
            }}
          />
        </div>

        {/* ── Price Breakdown ── */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-[13px]">
          <div className="flex justify-between text-slate-600">
            <span>Genuine WAEC Checker PIN</span>
            <span className="font-mono tabular-nums font-semibold">GH₵24.00</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>PDF Formatting &amp; Delivery</span>
            <span className="font-mono tabular-nums font-semibold">GH₵6.00</span>
          </div>
          <div className="h-px bg-slate-200 my-1" />
          <div className="flex justify-between font-bold text-slate-900 text-sm">
            <span>Total Payable</span>
            <span className="font-mono tabular-nums text-red-600 text-base font-extrabold">GH₵30.00</span>
          </div>
        </div>

        {/* ── Terms & Privacy Checkbox ── */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="terms-check"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300 cursor-pointer"
          />
          <label htmlFor="terms-check" className="text-[11px] text-slate-500 leading-normal select-none cursor-pointer">
            I agree to the{" "}
            <button
              type="button"
              onClick={() => setLegalModalType("terms")}
              className="text-slate-900 underline font-semibold hover:text-red-600 transition-colors"
            >
              Terms of Service
            </button>{" "}
            and acknowledge the{" "}
            <button
              type="button"
              onClick={() => setLegalModalType("privacy")}
              className="text-slate-900 underline font-semibold hover:text-red-600 transition-colors"
            >
              Privacy &amp; Data Policy
            </button>
            .
          </label>
        </div>

        {/* ── Pay button ── */}
        <button
          type="submit"
          disabled={!turnstileToken || !agreedToTerms}
          className={`w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center transition-all ${
            turnstileToken && agreedToTerms
              ? "bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white shadow-md shadow-red-600/20 cursor-pointer"
              : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          Proceed to Payment
        </button>

        {/* Authentic Ghanaian Payment Badges */}
        <PaymentChannelsBar />

      </form>

      {/* ── Confirmation Modal ── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-5 border border-slate-200">
            
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Confirm Candidate Details</h3>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Warning */}
            <div className="px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Double-check your <strong>Index Number</strong> and <strong>Date of Birth</strong>. WAEC vouchers cannot be refunded once assigned.
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-xs divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Candidate Name</span>
                <span className="font-semibold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Index Number</span>
                <span className="font-mono font-bold text-slate-900">{formData.indexNumber}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Examination</span>
                <span className="font-semibold text-slate-900">{formData.examType} ({formData.examYear})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Date of Birth</span>
                <span className="font-mono font-semibold text-slate-900">{formData.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Email (PDF Destination)</span>
                <span className="font-semibold text-slate-900 truncate max-w-[190px]">{formData.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">WhatsApp Alert</span>
                <span className="font-mono font-semibold text-slate-900">{formData.whatsappNumber}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmAndPay}
                className="w-full h-12 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md shadow-red-600/20 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Paystack…</span>
                  </>
                ) : (
                  <span>Pay Now</span>
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowConfirmModal(false)}
                className="w-full h-9 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Edit Details
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── Legal Policy Modal ── */}
      {legalModalType && (
        <LegalModal
          isOpen={true}
          onClose={() => setLegalModalType(null)}
          type={legalModalType}
        />
      )}

    </div>
  );
}
