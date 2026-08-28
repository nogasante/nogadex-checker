"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { StudentForm } from "./StudentForm";
import { VoucherOnlyCard } from "./VoucherOnlyCard";
import {
  FileText,
  KeyRound,
  Search,
  GraduationCap,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Users,
} from "lucide-react";

export function StudentPortalHub() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialService = searchParams.get("service") as "check" | "voucher" | "track" | null;
  
  const [selectedService, setSelectedService] = useState<"none" | "check" | "voucher" | "track">(
    initialService && ["check", "voucher", "track"].includes(initialService) ? initialService : "none"
  );
  const [trackQuery, setTrackQuery] = useState("");

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  const handleSelectService = (service: "check" | "voucher" | "track") => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToServices = () => {
    setSelectedService("none");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    const cleanId = trackQuery.trim().toUpperCase();
    router.push(`/status/${cleanId}`);
  };

  // --------------------------------------------------------------------------
  // SCREEN 1: MINIMAL INITIAL SERVICE SELECTION SCREEN
  // --------------------------------------------------------------------------
  if (selectedService === "none") {
    return (
      <div className="w-full max-w-xl mx-auto space-y-8 animate-in fade-in duration-200">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 pt-2">
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
            What would you like to do?
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Select a service below to begin. We provide genuine WAEC result checking, instant scratch cards, and admission support.
          </p>
        </div>

        {/* 4 Minimal, High-Tactile Service Cards */}
        <div className="space-y-3">
          
          {/* Service 1: Check Result & Get PDF (Primary) */}
          <button
            type="button"
            onClick={() => handleSelectService("check")}
            className="w-full p-5 rounded-2xl bg-white border-2 border-red-600/90 hover:border-red-600 shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-slate-900 text-sm sm:text-base group-hover:text-red-600 transition-colors">
                    Check WAEC Result &amp; Get PDF
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-extrabold font-mono">
                    GH₵30.00
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We check your WASSCE, BECE, or NOVDEC grades and email a printable PDF slip in 2–5 mins.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Service 2: Buy Checker PIN Only */}
          <button
            type="button"
            onClick={() => handleSelectService("voucher")}
            className="w-full p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all text-left flex items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-slate-900 text-sm sm:text-base group-hover:text-slate-950 transition-colors">
                    Buy Checker PIN Only
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[10px] font-bold font-mono">
                    GH₵25.00
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Buy an authentic WAEC Scratch Card Serial &amp; PIN with instant SMS and WhatsApp delivery.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Service 3: Track Existing Order Slip */}
          <button
            type="button"
            onClick={() => handleSelectService("track")}
            className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all text-left flex items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="font-heading font-bold text-slate-900 text-sm">
                  Track Existing Result Slip
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Check live processing status or re-download your PDF using your Request ID.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Service 4: University Admissions Counseling */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 sm:p-5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-200 transition-all text-left flex items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-emerald-950 text-sm">
                    University &amp; Polytechnic Admissions
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-200/80 text-emerald-900 text-[9px] font-extrabold">
                    FREE
                  </span>
                </div>
                <p className="text-xs text-emerald-800/80 leading-relaxed">
                  Need help calculating cut-off points or filling out UG, KNUST, or UCC forms?
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-200/60 text-emerald-800 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <MessageCircle className="w-4 h-4" />
            </div>
          </a>

        </div>

        {/* Social Proof Footer Strip */}
        <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500 text-center flex-wrap">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>4,800+ Results Checked in Ghana</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secured by Paystack</span>
          </div>
        </div>

      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 2: FOCUSED SERVICE VIEW WITH BACK BUTTON
  // --------------------------------------------------------------------------
  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in duration-150">
      
      {/* Back Button Navigation */}
      <div>
        <button
          type="button"
          onClick={handleBackToServices}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Service</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">
        
        {/* VIEW A: CHECK RESULT & GET PDF */}
        {selectedService === "check" && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                Step 2 of 2 • Enter Candidate Details
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Check WAEC Result &amp; Get PDF
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                We assign a genuine WAEC voucher, retrieve your grades, and email your printable PDF result slip in 2–5 minutes.
              </p>
            </div>

            <StudentForm />
          </div>
        )}

        {/* VIEW B: BUY PIN ONLY */}
        {selectedService === "voucher" && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Instant Scratch Card Voucher
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Buy WAEC Checker PIN (GH₵25.00)
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                Buy an authentic WAEC Scratch Card Serial &amp; PIN with instant SMS and WhatsApp delivery to check results yourself on the WAEC Direct Ghana portal.
              </p>
            </div>

            <VoucherOnlyCard onSwitchToPdf={() => setSelectedService("check")} />
          </div>
        )}

        {/* VIEW C: TRACK EXISTING SLIP */}
        {selectedService === "track" && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Order Tracking
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Track Existing Result Slip
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                Enter the Request ID from your confirmation screen or SMS (e.g. <span className="font-mono font-bold text-slate-800">NGX-100234</span>).
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Request ID
                </label>
                <input
                  type="text"
                  required
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  placeholder="NGX-XXXXXX"
                  className="w-full h-11 input-clean px-3.5 font-mono uppercase text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Look Up Order Status</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Understated Support Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Need help or have questions?</span>
        </div>
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1 shrink-0"
        >
          <span>WhatsApp +233 53 490 8166</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
