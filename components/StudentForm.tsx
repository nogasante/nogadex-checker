"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, ArrowRight, ShieldCheck, Check, AlertTriangle, Edit3, X } from "lucide-react";
import { PaymentChannelsBar } from "./PaymentLogos";

const EXAM_OPTIONS = [
  { value: "WASSCE", label: "WASSCE (School)" },
  { value: "NOVDEC", label: "NOVDEC (Private)" },
  { value: "BECE", label: "BECE (School)" },
  { value: "BECE_PVT", label: "BECE (Private)" },
  { value: "GBCE", label: "GBCE" },
  { value: "ABCE", label: "ABCE" },
];

export function StudentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 1994 }, (_, i) =>
    (currentYear + 1 - i).toString()
  );

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

  // Step 1: Pre-validation before opening confirmation modal
  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter candidate full name.");
      return;
    }
    if (!formData.indexNumber.trim() || formData.indexNumber.length < 6) {
      setErrorMessage("Please enter a valid 10-digit WAEC Index Number.");
      return;
    }
    if (!formData.dateOfBirth) {
      setErrorMessage("Please select Date of Birth.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please provide a valid delivery email address.");
      return;
    }
    if (!formData.whatsappNumber.trim() || formData.whatsappNumber.length < 9) {
      setErrorMessage("Please enter a valid WhatsApp contact number in case of any issues.");
      return;
    }

    // Open verification modal
    setShowConfirmModal(true);
  };

  // Step 2: Final Confirmation & Paystack Launch
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
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      
      {/* Examination Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-900">
          1. Select Examination
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          {EXAM_OPTIONS.map((t) => {
            const isSelected =
              formData.examType === t.value ||
              (t.value === "BECE_PVT" && formData.examType === "BECE_PVT");
            return (
              <button
                type="button"
                key={t.value}
                onClick={() => handleExamTypeSelect(t.value)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center select-none ${
                  isSelected
                    ? "bg-white text-slate-900 shadow-xs font-bold ring-1 ring-slate-950/5"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handlePreSubmit} className="space-y-3.5">
        
        <div className="text-xs font-bold text-slate-900 pt-1">
          2. Candidate &amp; Delivery Details
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Candidate Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Kwabena Mensah"
            className="w-full h-10.5 input-tech-light rounded-lg px-3 text-sm placeholder-slate-400 font-medium"
          />
        </div>

        {/* Index Number & Exam Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              WAEC Index Number
            </label>
            <input
              type="text"
              name="indexNumber"
              inputMode="numeric"
              required
              value={formData.indexNumber}
              onChange={handleChange}
              placeholder="10-digit number"
              className="w-full h-10.5 input-tech-light rounded-lg px-3 text-sm placeholder-slate-400 font-mono tracking-wider"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Exam Year
            </label>
            <select
              name="examYear"
              value={formData.examYear}
              onChange={handleChange}
              className="w-full h-10.5 input-tech-light rounded-lg px-3 text-sm text-slate-900 font-mono cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date of Birth & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full h-10.5 input-tech-light rounded-lg px-3 text-sm text-slate-900 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Delivery Email Address
            </label>
            <input
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@gmail.com"
              className="w-full h-10.5 input-tech-light rounded-lg px-3 text-sm placeholder-slate-400"
            />
          </div>
        </div>

        {/* WhatsApp Number (Compulsory for support & clarification) */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700 flex items-center justify-between">
            <span>WhatsApp Number</span>
            <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
              Required for Support
            </span>
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            inputMode="tel"
            required
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="054 123 4567"
            className="w-full h-10.5 input-tech-light rounded-lg px-3 text-sm placeholder-slate-400 font-mono"
          />
        </div>

        {/* Transparent Fee Summary Box */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Official WAEC Voucher PIN:</span>
            <span className="font-mono font-semibold">GH₵25.00</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>High-Res PDF &amp; Email Delivery:</span>
            <span className="font-mono font-semibold">GH₵5.00</span>
          </div>
          <div className="pt-1.5 border-t border-slate-200 flex justify-between font-bold text-slate-900">
            <span>Total Payable:</span>
            <span className="font-mono text-red-600 text-sm">GH₵30.00</span>
          </div>
        </div>

        {/* Submit / Review Button */}
        <div className="pt-1">
          <button
            type="submit"
            className="w-full h-12 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all cursor-pointer shadow-sm"
          >
            <span>Review &amp; Pay (GH₵30.00)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Official Ghanaian Telco & Card Badges */}
        <PaymentChannelsBar />

      </form>

      {/* PRE-PAYMENT DETAILS CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Confirm Your Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Warning Callout */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Please double-check your <strong>Index Number</strong> and <strong>Date of Birth</strong>. WAEC vouchers are single-use and cannot be refunded if details are entered wrongly.
              </p>
            </div>

            {/* Summary Details Table */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between pb-1 border-b border-slate-200/60">
                <span className="text-slate-500">Candidate:</span>
                <span className="font-bold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200/60">
                <span className="text-slate-500">Index Number:</span>
                <span className="font-mono font-bold text-slate-900">{formData.indexNumber}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200/60">
                <span className="text-slate-500">Exam &amp; Year:</span>
                <span className="font-semibold text-slate-900">{formData.examType} ({formData.examYear})</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200/60">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-mono font-bold text-slate-900">{formData.dateOfBirth}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200/60">
                <span className="text-slate-500">Delivery Email:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[200px]">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">WhatsApp:</span>
                <span className="font-mono font-bold text-slate-900">{formData.whatsappNumber}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmAndPay}
                className="w-full h-11 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer shadow-sm disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Paystack...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Pay GH₵30.00</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowConfirmModal(false)}
                className="w-full h-9 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                <span>Edit / Correct Details</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
