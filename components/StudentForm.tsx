"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <div className="w-full surface-card-light rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-5">
      
      {/* Examination Type Picker */}
      <div className="space-y-2">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Select Examination
        </label>
        <div className="grid grid-cols-2 gap-1.5 p-1 surface-inset-light rounded-xl">
          {EXAM_OPTIONS.map((t) => {
            const isSelected =
              formData.examType === t.value ||
              (t.value === "BECE_PVT" && formData.examType === "BECE_PVT");
            return (
              <button
                type="button"
                key={t.value}
                onClick={() => handleExamTypeSelect(t.value)}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center select-none ${
                  isSelected
                    ? "bg-red-600 text-white shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
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
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
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
            className="w-full h-11 input-tech-light rounded-xl px-3.5 text-base sm:text-sm placeholder-slate-400 font-medium"
          />
        </div>

        {/* Index Number & Exam Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5">
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
              placeholder="e.g. 1010101001"
              className="w-full h-11 input-tech-light rounded-xl px-3.5 text-base sm:text-sm placeholder-slate-400 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Examination Year
            </label>
            <select
              name="examYear"
              value={formData.examYear}
              onChange={handleChange}
              className="w-full h-11 input-tech-light rounded-xl px-3 text-base sm:text-sm text-slate-900 font-mono cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y} Examination
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date of Birth & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full h-11 input-tech-light rounded-xl px-3 text-base sm:text-sm text-slate-900 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
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
              placeholder="name@gmail.com"
              className="w-full h-11 input-tech-light rounded-xl px-3.5 text-base sm:text-sm placeholder-slate-400"
            />
          </div>
        </div>

        {/* WhatsApp (Optional) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>WhatsApp Number</span>
            <span className="text-[10px] text-slate-400 font-normal">Optional for support</span>
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            inputMode="tel"
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="054 123 4567"
            className="w-full h-11 input-tech-light rounded-xl px-3.5 text-base sm:text-sm placeholder-slate-400 font-mono"
          />
        </div>

        {/* Submit & Fee */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 btn-primary-tech text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting to Paystack...</span>
              </>
            ) : (
              <>
                <span>Pay GH₵30.00 &amp; Receive PDF</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Trust Note */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Includes Official WAEC Scratch Card PIN &amp; High-Res PDF</span>
        </div>

        {/* Supported Networks */}
        <div className="flex items-center justify-center gap-2 pt-0.5">
          <span className="px-2 py-0.5 rounded text-[9px] font-bold momo-mtn">MTN MoMo</span>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold momo-telecel">Telecel</span>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold momo-at">AT Money</span>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Bank Card</span>
        </div>

      </form>
    </div>
  );
}
