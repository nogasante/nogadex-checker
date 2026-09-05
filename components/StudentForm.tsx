"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, AlertTriangle, X, ShieldAlert } from "lucide-react";
import { PaymentChannelsBar } from "./PaymentLogos";
import { LegalModal } from "./LegalModal";
import { DateOfBirthSelector } from "./DateOfBirthSelector";
import { ServiceConfig, getExamSettingKey } from "@/lib/services";

const EXAM_OPTIONS = [
  { value: "WASSCE", label: "WASSCE (May/June)", key: "exam_wassce" },
  { value: "NOVDEC", label: "NOVDEC (Nov/Dec Pvt)", key: "exam_novdec" },
  { value: "BECE", label: "BECE (School)", key: "exam_bece_school" },
  { value: "BECE_PVT", label: "BECE (Private)", key: "exam_bece_private" },
  { value: "GBCE", label: "GBCE (General Business)", key: "exam_gbce" },
  { value: "ABCE", label: "ABCE (Advanced Business)", key: "exam_abce" },
];

// Generate every individual year from 2026 down to 1990
const EXAM_YEARS = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => {
  const y = (2026 - i).toString();
  return { value: y, label: y };
});

export function StudentForm({
  serviceSettings,
  price = 30.0,
}: {
  serviceSettings?: Record<string, ServiceConfig>;
  price?: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [legalModalType, setLegalModalType] = useState<"terms" | "privacy" | "refund" | null>(null);

  const [localSettings, setLocalSettings] = useState<Record<string, ServiceConfig>>(serviceSettings || {});

  useEffect(() => {
    if (serviceSettings) {
      setLocalSettings(serviceSettings);
      return;
    }

    async function load() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (data.services) {
            const map: Record<string, ServiceConfig> = {};
            data.services.forEach((s: ServiceConfig) => {
              map[s.key] = s;
            });
            setLocalSettings(map);
          }
        }
      } catch (err) {
        console.error("Error fetching services in form:", err);
      }
    }
    load();
  }, [serviceSettings]);

  const [formData, setFormData] = useState({
    fullName: "",
    indexNumber: "",
    dateOfBirth: "2006-05-15",
    examType: "WASSCE",
    examYear: "2026",
    email: "",
    whatsappNumber: "",
  });

  const currentExamSettingKey = getExamSettingKey(formData.examType);
  const currentExamSetting = localSettings[currentExamSettingKey];
  const isCurrentExamDisabled = currentExamSetting?.enabled === false;

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

    if (isCurrentExamDisabled) {
      setErrorMessage(
        currentExamSetting?.message ||
          `Checking results for ${formData.examType} is currently unavailable.`
      );
      return;
    }

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
        body: JSON.stringify(formData),
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
      
      {/* Error / Disabled Banner */}
      {isCurrentExamDisabled && (
        <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[13px] flex items-start gap-2.5 shadow-2xs">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <div className="space-y-0.5">
            <span className="font-bold block">
              {currentExamSetting?.name || formData.examType} Checking Paused
            </span>
            <span className="text-xs text-amber-800 leading-relaxed">
              {currentExamSetting?.message ||
                "Checking for this examination is temporarily unavailable. Please choose another exam type or reach out on WhatsApp."}
            </span>
          </div>
        </div>
      )}

      {errorMessage && !isCurrentExamDisabled && (
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
            
            {/* Exam Type Select */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Exam Type
              </label>
              <select
                name="examType"
                value={formData.examType}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 cursor-pointer transition-colors shadow-2xs"
              >
                {EXAM_OPTIONS.map((opt) => {
                  const setting = localSettings[opt.key];
                  const isDisabled = setting?.enabled === false;
                  return (
                    <option
                      key={opt.value}
                      value={opt.value === "BECE_PVT" ? "BECE_PRIVATE" : opt.value}
                    >
                      {opt.label} {isDisabled ? "— (Unavailable)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Exam Year Select */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Exam Year
              </label>
              <select
                name="examYear"
                value={formData.examYear}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 cursor-pointer transition-colors shadow-2xs"
              >
                {EXAM_YEARS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

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

            {/* Date of Birth Selector */}
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

        {/* ── Total Price ── */}
        <div className="flex justify-between items-center p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="font-medium text-slate-700 text-xs sm:text-sm">Total Payable</span>
          <span className="font-mono tabular-nums text-red-600 text-base sm:text-lg font-extrabold">
            GH₵{price.toFixed(2)}
          </span>
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
          disabled={!agreedToTerms || loading || isCurrentExamDisabled}
          className={`w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center transition-all ${
            agreedToTerms && !loading && !isCurrentExamDisabled
              ? "bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white shadow-md shadow-red-600/20 cursor-pointer"
              : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Processing...</span>
            </div>
          ) : isCurrentExamDisabled ? (
            "Examination Currently Unavailable"
          ) : (
            "Proceed to Payment"
          )}
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
                  <span>Pay GH₵{price.toFixed(2)}</span>
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
