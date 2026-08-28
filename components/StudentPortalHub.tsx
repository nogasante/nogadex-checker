"use client";

import { useState } from "react";
import { StudentForm } from "./StudentForm";
import { VoucherOnlyCard } from "./VoucherOnlyCard";
import { TrackSlipModal } from "./TrackSlipModal";
import {
  FileText,
  KeyRound,
  Search,
  GraduationCap,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export function StudentPortalHub() {
  const [activeModal, setActiveModal] = useState<"none" | "pdf_check" | "voucher_buy" | "track">("none");
  const [quickTrackQuery, setQuickTrackQuery] = useState("");

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";
  const dataplugBuyUrl =
    process.env.NEXT_PUBLIC_DATAPLUG_BUY_URL ||
    "https://dataplug-gh.com/pay/nogadex-consults-e8c92a30";

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* 1. DRIBBBLE-GRADE HERO SECTION */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-4 sm:pt-8 px-2">
        {/* Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Official Ghana WAEC Verification &amp; Vouchers</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-slate-900 tracking-tight leading-[1.08]">
          Your WAEC Results, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
            Delivered in 2 Minutes.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Fast, legitimate result checking and instant voucher PINs for WASSCE, BECE, and NOVDEC candidates across Ghana.
        </p>

        {/* Trust Metrics Bar */}
        <div className="pt-2 flex items-center justify-center gap-4 sm:gap-8 text-xs text-slate-500 flex-wrap">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">100% Genuine PINs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">2–5 Min Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">University Portal Ready</span>
          </div>
        </div>
      </section>

      {/* 2. MODERN BENTO SERVICES GRID */}
      <section className="space-y-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            Our Services
          </h2>
          <span className="text-xs text-slate-500 font-medium">Select to begin</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          
          {/* Bento Card 1: Main Result Checking & PDF Service (Spans 7 Cols) */}
          <div
            onClick={() => setActiveModal("pdf_check")}
            className="md:col-span-7 group relative bg-white hover:bg-slate-50/70 border-2 border-red-600/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 overflow-hidden"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black">
                  POPULAR • GH₵30.00
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                Check Result &amp; Get Official PDF
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We assign an unused WAEC voucher PIN, verify your WASSCE, BECE, or NOVDEC grades, and dispatch a high-resolution printable PDF certificate straight to your email.
              </p>

              {/* Supported Exams Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">WASSCE</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">NOVDEC</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">BECE</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">GBCE &amp; ABCE</span>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="w-full h-12 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all shadow-sm cursor-pointer"
            >
              <span>Check Result &amp; PDF (GH₵30)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bento Card 2: Buy Checker PIN Only (Spans 5 Cols) */}
          <div
            onClick={() => setActiveModal("voucher_buy")}
            className="md:col-span-5 group relative bg-white hover:bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                <KeyRound className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-black font-mono">
                GH₵25.00
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 group-hover:text-slate-950 transition-colors">
                Buy Voucher PIN Only
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Need to check results yourself? Buy an authentic WAEC Scratch Card Serial &amp; PIN with instant SMS and WhatsApp delivery.
              </p>
              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Valid for 3 checks across all Ghana exams</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all shadow-sm cursor-pointer"
            >
              <span>Buy Checker PIN (GH₵25)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bento Card 3: Track Existing Order Slip (Spans 6 Cols) */}
          <div className="md:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Track Existing Result Slip
                </h3>
                <p className="text-xs text-slate-500">
                  Check live processing status or re-download your PDF.
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (quickTrackQuery.trim()) {
                  setActiveModal("track");
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={quickTrackQuery}
                onChange={(e) => setQuickTrackQuery(e.target.value)}
                placeholder="e.g. NGX-100234"
                className="flex-1 h-11 px-3.5 text-xs font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:border-red-600 focus:bg-white focus:outline-none transition-colors"
              />
              <button
                type="submit"
                onClick={() => setActiveModal("track")}
                className="h-11 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Track Slip
              </button>
            </form>
          </div>

          {/* Bento Card 4: University Admission Desk (Spans 6 Cols) */}
          <div className="md:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Admission Assistance
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      FREE DESK
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Cut-off points, course selection, and university forms.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Admission Counselor</span>
            </a>
          </div>

        </div>
      </section>

      {/* 3. THREE-STEP PROCESS (HOW IT WORKS) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center space-y-1">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            How It Works
          </h2>
          <p className="text-xl font-heading font-extrabold text-slate-900">
            Fast, transparent, 3-step verification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">Fill Details &amp; Pay</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your WAEC Index Number, exam year, and delivery email. Pay GH₵30.00 securely via MTN MoMo, Telecel, AT, or Card.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Official WAEC Check</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A genuine, single-use WAEC scratch card PIN is assigned to your request and your grades are retrieved directly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">Instant PDF Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A high-resolution PDF results certificate is generated and sent to your email, ready for university application portals.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MODALS (FOCUSED CHECKOUT EXPERIENCE) */}
      
      {/* A. Full Result Check & PDF Modal */}
      {activeModal === "pdf_check" && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl my-8 bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">Check WAEC Result &amp; Get PDF</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal("none")}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer text-xs font-bold"
              >
                Close ✕
              </button>
            </div>
            <StudentForm />
          </div>
        </div>
      )}

      {/* B. Buy Voucher PIN Only Modal */}
      {activeModal === "voucher_buy" && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-slate-900" />
                <h3 className="text-base font-bold text-slate-900">Buy WAEC Scratch Card PIN</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal("none")}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer text-xs font-bold"
              >
                Close ✕
              </button>
            </div>
            <VoucherOnlyCard onSwitchToPdf={() => setActiveModal("pdf_check")} />
          </div>
        </div>
      )}

      {/* C. Track Slip Modal */}
      <TrackSlipModal isOpen={activeModal === "track"} onClose={() => setActiveModal("none")} />

    </div>
  );
}
