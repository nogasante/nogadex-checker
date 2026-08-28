"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, X, AlertTriangle } from "lucide-react";

const EXAM_OPTIONS = [
  { value: "WASSCE", label: "WASSCE" },
  { value: "NOVDEC", label: "NOVDEC" },
  { value: "BECE", label: "BECE" },
  { value: "BECE_PVT", label: "BECE (Pvt)" },
  { value: "GBCE", label: "GBCE" },
  { value: "ABCE", label: "ABCE" },
];

const EXAM_YEARS = [
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2010", label: "2010 & older" },
];

export function StudentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    indexNumber: "",
    dateOfBirth: "",
    examType: "WASSCE",
    examYear: "2025",
    email: "",
    whatsappNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleExamTypeSelect = (typeValue: string) => {
    const backendType = typeValue === "BECE_PVT" ? "BECE" : typeValue;
    setFormData((prev) => ({ ...prev, examType: backendType }));
    if (errorMessage) setErrorMessage("");
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      setErrorMessage("Enter your full name as registered for the exam.");
      return;
    }
    if (!formData.indexNumber.trim() || formData.indexNumber.length < 6) {
      setErrorMessage("Enter a valid WAEC index number.");
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
      
      {/* Error */}
      {errorMessage && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-[13px] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePreSubmit} className="space-y-8">
        
        {/* ── Examination ── */}
        <div className="space-y-3">
          <label className="block text-[13px] font-medium text-gray-500">
            Examination
          </label>

          {/* Segmented control */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg">
            {EXAM_OPTIONS.map((t) => {
              const isSelected =
                formData.examType === t.value ||
                (t.value === "BECE_PVT" && formData.examType === "BECE_PVT");
              return (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => handleExamTypeSelect(t.value)}
                  className={`py-2 rounded-md text-[13px] font-medium transition-all cursor-pointer text-center select-none ${
                    isSelected
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Year + Index */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700">
                Year
              </label>
              <select
                name="examYear"
                value={formData.examYear}
                onChange={handleChange}
                className="w-full h-11 input-clean px-3 cursor-pointer"
              >
                {EXAM_YEARS.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700">
                Index number
              </label>
              <input
                type="text"
                name="indexNumber"
                inputMode="numeric"
                required
                value={formData.indexNumber}
                onChange={handleChange}
                placeholder="0123456789"
                className="w-full h-11 input-clean px-3 font-mono tracking-wide"
              />
            </div>
          </div>
        </div>

        {/* ── Your details ── */}
        <div className="space-y-3">
          <label className="block text-[13px] font-medium text-gray-500">
            Your details
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Kwabena Mensah"
                className="w-full h-11 input-clean px-3"
              />
              <p className="text-[13px] text-gray-400">As registered on your exam slip</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700">
                Date of birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                max="2016-12-31"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full h-11 input-clean px-3 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* ── Delivery ── */}
        <div className="space-y-3">
          <label className="block text-[13px] font-medium text-gray-500">
            Delivery
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700">
                Email address
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
                className="w-full h-11 input-clean px-3"
              />
              <p className="text-[13px] text-gray-400">PDF will be sent here</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700">
                WhatsApp number
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                inputMode="tel"
                required
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="054 123 4567"
                className="w-full h-11 input-clean px-3 font-mono"
              />
              <p className="text-[13px] text-gray-400">For order updates</p>
            </div>
          </div>
        </div>

        {/* ── Price ── */}
        <div className="space-y-2 text-[14px]">
          <div className="flex justify-between text-gray-500">
            <span>WAEC voucher PIN</span>
            <span className="tabular-nums">GH₵25.00</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>PDF formatting &amp; delivery</span>
            <span className="tabular-nums">GH₵5.00</span>
          </div>
          <div className="h-px bg-gray-200 my-1" />
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span className="tabular-nums">GH₵30.00</span>
          </div>
        </div>

        {/* ── Pay button ── */}
        <button
          type="submit"
          className="w-full h-12 btn-brand cursor-pointer"
        >
          Pay GH₵30.00
        </button>

        {/* Payment methods — quiet text */}
        <p className="text-center text-[13px] text-gray-400">
          Mobile Money · Visa · Mastercard — via Paystack
        </p>

      </form>

      {/* ── Confirmation Modal ── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-gray-900">Confirm your details</h3>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Warning */}
            <div className="px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[13px] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Double-check your <strong>index number</strong> and <strong>date of birth</strong>. WAEC vouchers can't be refunded once assigned.
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2.5 text-[14px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium text-gray-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Index number</span>
                <span className="font-mono font-medium text-gray-900">{formData.indexNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Exam</span>
                <span className="font-medium text-gray-900">{formData.examType} ({formData.examYear})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date of birth</span>
                <span className="font-mono font-medium text-gray-900">{formData.dateOfBirth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-900 truncate max-w-[200px]">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">WhatsApp</span>
                <span className="font-mono font-medium text-gray-900">{formData.whatsappNumber}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmAndPay}
                className="w-full h-12 btn-brand flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Paystack…</span>
                  </>
                ) : (
                  <span>Pay GH₵30.00</span>
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowConfirmModal(false)}
                className="w-full h-10 text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Edit details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
