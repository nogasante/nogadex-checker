"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, ArrowRight, ShieldCheck, AlertTriangle, Edit3, X } from "lucide-react";
import { PaymentChannelsBar } from "./PaymentLogos";

const EXAM_OPTIONS = [
  { value: "WASSCE", label: "WASSCE (School Candidates)" },
  { value: "NOVDEC", label: "NOVDEC (Private Candidates)" },
  { value: "BECE", label: "BECE (School Candidates)" },
  { value: "BECE_PVT", label: "BECE (Private Candidates)" },
  { value: "GBCE", label: "GBCE (Business Certificate)" },
  { value: "ABCE", label: "ABCE (Advanced Business)" },
];

const RECENT_YEARS = [
  { value: "2025", label: "2025 (Most Recent)" },
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
  { value: "2014", label: "2014" },
  { value: "2013", label: "2013" },
  { value: "2012", label: "2012" },
  { value: "2011", label: "2011" },
  { value: "2010", label: "2010 & Older" },
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
      setErrorMessage("Please enter candidate full name as registered for the exam.");
      return;
    }
    if (!formData.indexNumber.trim() || formData.indexNumber.length < 6) {
      setErrorMessage("Please enter a valid 10-digit WAEC Index Number.");
      return;
    }
    if (!formData.dateOfBirth) {
      setErrorMessage("Please enter your Date of Birth (required to verify record on WAEC).");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address to receive your PDF result.");
      return;
    }
    if (!formData.whatsappNumber.trim() || formData.whatsappNumber.length < 9) {
      setErrorMessage("Please enter a valid WhatsApp number so we can reach you if needed.");
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
    <div className="w-full space-y-6">
      
      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Surface */}
      <form onSubmit={handlePreSubmit} className="space-y-6">
        
        {/* GROUP 1: EXAMINATION DETAILS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              1. Choose Examination
            </h2>
            <span className="text-[10px] text-slate-400 font-medium">All Ghana Exams</span>
          </div>

          {/* Exam Type Segmented Grid */}
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

          {/* Exam Year & Index Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Exam Year
              </label>
              <select
                name="examYear"
                value={formData.examYear}
                onChange={handleChange}
                className="w-full h-11 input-clean px-3.5 text-slate-900 font-mono cursor-pointer"
              >
                {RECENT_YEARS.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
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
                className="w-full h-11 input-clean px-3.5 font-mono tracking-wider"
              />
            </div>
          </div>
        </div>

        {/* GROUP 2: CANDIDATE INFORMATION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              2. Candidate Information
            </h2>
            <span className="text-[10px] text-slate-400 font-medium">Record Verification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Candidate Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Kwabena Mensah"
                className="w-full h-11 input-clean px-3.5"
              />
              <p className="text-[10px] text-slate-400">As registered on your exam slip</p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                max="2015-12-31"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full h-11 input-clean px-3.5 text-slate-900 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Required by WAEC to verify record</p>
            </div>
          </div>
        </div>

        {/* GROUP 3: DELIVERY & WHATSAPP SUPPORT CONTACT */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              3. Delivery &amp; Contact
            </h2>
            <span className="text-[10px] text-slate-400 font-medium">Instant Dispatch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
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
                placeholder="kwabena@gmail.com"
                className="w-full h-11 input-clean px-3.5"
              />
              <p className="text-[10px] text-slate-400">Your PDF slip will be emailed here</p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                WhatsApp Phone Number
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                inputMode="tel"
                required
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="054 123 4567"
                className="w-full h-11 input-clean px-3.5 font-mono"
              />
              <p className="text-[10px] text-slate-400">For instant order updates &amp; support</p>
            </div>
          </div>
        </div>

        {/* COMPACT PRICE BREAKDOWN */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Genuine WAEC Checker Voucher PIN:</span>
            <span className="font-mono font-semibold">GH₵25.00</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>PDF Formatting &amp; Email Delivery:</span>
            <span className="font-mono font-semibold">GH₵5.00</span>
          </div>
          <div className="pt-1.5 border-t border-slate-200 flex justify-between font-bold text-slate-900">
            <span>Total Payable:</span>
            <span className="font-mono text-red-600 text-sm font-extrabold">GH₵30.00</span>
          </div>
        </div>

        {/* OUTCOME-DRIVEN ACTION BUTTON */}
        <div>
          <button
            type="submit"
            className="w-full h-12 btn-brand flex items-center justify-center gap-2 text-sm cursor-pointer shadow-sm"
          >
            <span>Continue to Secure Payment — GH₵30.00</span>
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
                <h3 className="text-sm font-bold text-slate-900">Review Candidate Details</h3>
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
                Please double-check your <strong>Index Number</strong> and <strong>Date of Birth</strong>. WAEC charges a card fee for every check attempt.
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
                className="w-full h-11 btn-brand flex items-center justify-center gap-2 text-xs transition-all cursor-pointer shadow-sm disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Paystack...</span>
                  </>
                ) : (
                  <>
                    <span>Pay GH₵30.00 &amp; Receive PDF by Email</span>
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
