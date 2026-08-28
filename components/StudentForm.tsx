"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, ArrowRight } from "lucide-react";
import {
  MtnMomoLogo,
  TelecelLogo,
  AtMoneyLogo,
  CardLogos,
} from "./PaymentLogos";

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
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      
      {/* Examination Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Examination
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
                className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center select-none ${
                  isSelected
                    ? "bg-white text-slate-900 shadow-xs font-bold"
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
      <form onSubmit={handleSubmit} className="space-y-3.5">
        
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
              className="w-full h-10.5 input-tech-light rounded-lg px-3 text-sm placeholder-slate-400 font-mono"
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

        {/* WhatsApp (Optional) */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700 flex items-center justify-between">
            <span>WhatsApp Number</span>
            <span className="text-[10px] text-slate-400 font-normal">Optional</span>
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            inputMode="tel"
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="054 123 4567"
            className="w-full h-10.5 input-tech-light rounded-lg px-3 text-sm placeholder-slate-400 font-mono"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting to Paystack...</span>
              </>
            ) : (
              <>
                <span>Check Result — GH₵30.00</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Official Payment Channels */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <MtnMomoLogo className="h-6 w-auto shadow-2xs" />
          <TelecelLogo className="h-6 w-auto shadow-2xs" />
          <AtMoneyLogo className="h-6 w-auto shadow-2xs" />
          <CardLogos className="h-6 w-auto shadow-2xs" />
        </div>

      </form>
    </div>
  );
}
