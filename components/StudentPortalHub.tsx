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
} from "lucide-react";

export function StudentPortalHub() {
  const [activeView, setActiveView] = useState<"hub" | "pdf_check" | "voucher_buy">("hub");
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  // Focused Flow: Result Check & PDF Delivery
  if (activeView === "pdf_check") {
    return (
      <div className="max-w-xl mx-auto space-y-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveView("hub")}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            PDF Result Checking
          </span>
        </div>

        <StudentForm />
      </div>
    );
  }

  // Focused Flow: Buy Checker PIN Only
  if (activeView === "voucher_buy") {
    return (
      <div className="max-w-md mx-auto space-y-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveView("hub")}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Voucher Purchase
          </span>
        </div>

        <VoucherOnlyCard onSwitchToPdf={() => setActiveView("pdf_check")} />
      </div>
    );
  }

  // MINIMALIST, SPACIOUS, CALM SERVICE HUB
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-6 sm:py-12">
      
      {/* Clean, Spacious Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          How can we help you today?
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto font-normal">
          Select an educational service below to begin.
        </p>
      </div>

      {/* 3 Calm, Distinct, Spacious Service Options */}
      <div className="space-y-4">
        
        {/* Service 1: Check Result & PDF Delivery (Primary) */}
        <div
          onClick={() => setActiveView("pdf_check")}
          className="group bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 rounded-2xl p-6 shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  Check Result &amp; Get PDF
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[11px] font-bold">
                  GH₵30.00
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                We check your WASSCE, BECE, or NOVDEC grades and email you a verified, printable PDF certificate in 2–5 minutes.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto h-10 px-4 bg-slate-900 group-hover:bg-red-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
          >
            <span>Start Check</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service 2: Buy Checker PIN Only */}
        <div
          onClick={() => setActiveView("voucher_buy")}
          className="group bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 rounded-2xl p-6 shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
              <KeyRound className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                  Buy Voucher PIN Only (Checker)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                  GH₵25.00
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Instant SMS and WhatsApp delivery of an official WAEC Scratch Card PIN to check your results yourself.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto h-10 px-4 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
          >
            <span>Buy PIN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom 2-Column Split: Track Slip & Admission Help */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          {/* Action A: Track Order */}
          <div
            onClick={() => setIsTrackOpen(true)}
            className="bg-white hover:bg-slate-50/80 border border-slate-200 rounded-2xl p-5 shadow-xs transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Track Existing Order</div>
                <div className="text-[11px] text-slate-500">Check status or re-download PDF</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Action B: Admission Help */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-slate-50/80 border border-slate-200 rounded-2xl p-5 shadow-xs transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Admission Assistance</div>
                <div className="text-[11px] text-slate-500">Chat with support on WhatsApp</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </a>

        </div>

      </div>

      {/* Track Slip Modal */}
      <TrackSlipModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </div>
  );
}
