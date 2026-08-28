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
} from "lucide-react";

export function StudentPortalHub() {
  const [activeView, setActiveView] = useState<"hub" | "pdf_check" | "voucher_buy">("hub");
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  // Flow A: Dedicated PDF Result Checking Form
  if (activeView === "pdf_check") {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveView("hub")}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services Dashboard</span>
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            PDF Result Checking
          </span>
        </div>

        <StudentForm />
      </div>
    );
  }

  // Flow B: Dedicated Voucher Purchase Card
  if (activeView === "voucher_buy") {
    return (
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveView("hub")}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services Dashboard</span>
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Voucher PIN Purchase
          </span>
        </div>

        <VoucherOnlyCard onSwitchToPdf={() => setActiveView("pdf_check")} />
      </div>
    );
  }

  // MAIN DASHBOARD ONBOARDING HUB
  return (
    <div className="space-y-8">
      
      {/* Dashboard Welcome Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold tracking-wide">
          <span>🇬🇭 Nogadex Educational Services</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          Select an Educational Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Official WAEC result checking, instant scratch card PIN vouchers, live tracking, and university admission application assistance.
        </p>
      </div>

      {/* 4 Primary Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        
        {/* Service Card 1: Check Result & PDF Delivery */}
        <div className="bg-white border-2 border-red-600 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              Most Popular
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  WAEC Result Check &amp; PDF Delivery
                </h3>
                <span className="text-sm font-extrabold text-red-600 font-mono">GH₵30.00</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                We assign a genuine WAEC voucher PIN, check your WASSCE, BECE, or NOVDEC grades, and dispatch an official printable PDF certificate straight to your email.
              </p>
            </div>

            <div className="space-y-1.5 pt-1 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Includes genuine WAEC voucher PIN</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Printable PDF ready for university portals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Dispatched to email in 2–5 minutes</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveView("pdf_check")}
            className="w-full h-11 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer shadow-2xs"
          >
            <span>Check Result &amp; Get PDF (GH₵30)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service Card 2: Buy Checker PIN Only */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Buy Voucher PIN Only (Checker)
                </h3>
                <span className="text-sm font-extrabold text-slate-900 font-mono">GH₵25.00</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Buy an official WAEC Scratch Card Serial &amp; PIN to check results yourself on the WAEC Direct Ghana portal.
              </p>
            </div>

            <div className="space-y-1.5 pt-1 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant PIN delivery via SMS &amp; Email</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Valid for 3 checks across all Ghana exams</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant MoMo &amp; Card checkout</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveView("voucher_buy")}
            className="w-full h-11 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer shadow-2xs"
          >
            <span>Buy Checker PIN (GH₵25)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service Card 3: Track Existing Order Slip */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Track Existing Result Slip
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Already submitted an order? Enter your Request ID (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">NGX-100234</code>) to check live status or re-download your PDF certificate.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsTrackOpen(true)}
            className="w-full h-11 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-300 flex items-center justify-center gap-2 text-xs transition-all cursor-pointer shadow-2xs"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span>Search &amp; Track Slip</span>
          </button>
        </div>

        {/* Service Card 4: University Admission & Form Assistance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Admission &amp; Form Assistance
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  COUNSELING
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Need guidance calculating aggregate, picking cut-off courses, or filling out University (UG, KNUST, UCC) &amp; Polytechnic forms?
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer shadow-2xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Admission Counselor</span>
          </a>
        </div>

      </div>

      {/* 3-Step Lifecycle Overview */}
      <div className="border-t border-slate-200 pt-8 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
          How Result Checking Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <div className="text-xs font-bold text-slate-900">Enter Details &amp; Pay</div>
            <div className="text-[11px] text-slate-600 leading-relaxed">
              Provide your WAEC Index Number, exam year, and delivery email. Pay GH₵30.00 securely via MTN MoMo, Telecel, AT, or Card.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <div className="text-xs font-bold text-slate-900">Official WAEC Check</div>
            <div className="text-[11px] text-slate-600 leading-relaxed">
              A genuine, unused WAEC scratch card PIN is assigned to your request and your grades are retrieved directly.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              3
            </div>
            <div className="text-xs font-bold text-slate-900">Instant PDF Delivery</div>
            <div className="text-[11px] text-slate-600 leading-relaxed">
              A high-resolution PDF results certificate is generated and sent to your email, ready for university application portals.
            </div>
          </div>
        </div>
      </div>

      {/* Track Slip Modal */}
      <TrackSlipModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </div>
  );
}
