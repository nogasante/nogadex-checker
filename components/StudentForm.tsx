"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EXAM_TYPES } from "@/lib/validation";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  User,
  Hash,
  Mail,
  Phone,
  BookOpen,
} from "lucide-react";

export function StudentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const currentYear = new Date().getFullYear();

  // Generate examination year options (e.g. 2026 down to 1995)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side quick checks
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name as registered with WAEC.");
      return;
    }
    if (!formData.indexNumber.trim() || formData.indexNumber.length < 6) {
      setErrorMessage("Please enter a valid WAEC Index Number (at least 6 characters).");
      return;
    }
    if (!formData.dateOfBirth) {
      setErrorMessage("Please select your Date of Birth.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please provide a valid email address to receive your PDF result.");
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

      // If Paystack authorization URL is provided and not on localhost fallback
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
    <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> Direct PDF Delivery
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Order Result Check &amp; PDF
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill your details carefully. Your official PDF will be sent to your email.
          </p>
        </div>

        {/* Pricing badge */}
        <div className="text-right bg-gradient-to-br from-blue-950 to-slate-900 border border-blue-500/30 rounded-xl p-3 shadow-inner">
          <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider block">
            Fee (Voucher + PDF)
          </span>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            GH₵30<span className="text-xs font-normal text-slate-400">.00</span>
          </div>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-400" />
            Full Name (as registered with WAEC) <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Mensah Kwabena John"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Two-column layout for Index & DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Index Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-blue-400" />
              WAEC Index Number <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="indexNumber"
              required
              value={formData.indexNumber}
              onChange={handleChange}
              placeholder="e.g. 0010101001"
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-mono transition-all"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Date of Birth <span className="text-rose-400">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Two-column layout for Exam Type & Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Examination Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Examination Type <span className="text-rose-400">*</span>
            </label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            >
              {EXAM_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Examination Year */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Examination Year <span className="text-rose-400">*</span>
            </label>
            <select
              name="examYear"
              value={formData.examYear}
              onChange={handleChange}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-mono transition-all"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Two-column layout for Email & WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              Email Address (for PDF Delivery) <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. yourname@gmail.com"
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          {/* WhatsApp Number (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp Number (Optional)
            </label>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="e.g. 0541234567"
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Pay Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-base transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Initializing Paystack Checkout...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                CONTINUE TO PAYMENT — GH₵30.00
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Secured by Paystack (MTN MoMo, Telecel, AT Money, Visa, Mastercard)
        </div>
      </form>
    </div>
  );
}
