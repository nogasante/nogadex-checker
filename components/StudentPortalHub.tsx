"use client";

import { useState } from "react";
import { StudentForm } from "./StudentForm";
import { VoucherOnlyCard } from "./VoucherOnlyCard";
import { TrackSlipModal } from "./TrackSlipModal";
import { FileText, KeyRound, Search, MessageCircle } from "lucide-react";

export function StudentPortalHub() {
  const [activeTab, setActiveTab] = useState<"pdf_check" | "voucher_buy">("pdf_check");
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <div className="max-w-xl mx-auto space-y-6 sm:space-y-8">
      
      {/* Crisp, Focused Hero Header */}
      <div className="text-center space-y-1.5 px-2">
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
          WAEC Results &amp; Voucher Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto font-normal">
          Check your WASSCE, BECE, or NOVDEC grades and get your official printable PDF delivered instantly.
        </p>
      </div>

      {/* Segmented Service Selector */}
      <div className="bg-slate-200/70 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("pdf_check")}
          className={`flex-1 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${
            activeTab === "pdf_check"
              ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-900/5 font-extrabold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className={`w-3.5 h-3.5 ${activeTab === "pdf_check" ? "text-red-600" : "text-slate-500"}`} />
          <span>Check Result &amp; PDF (GH₵30)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("voucher_buy")}
          className={`flex-1 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${
            activeTab === "voucher_buy"
              ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-900/5 font-extrabold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <KeyRound className={`w-3.5 h-3.5 ${activeTab === "voucher_buy" ? "text-slate-900" : "text-slate-500"}`} />
          <span>Buy PIN Only (GH₵25)</span>
        </button>
      </div>

      {/* Active Form Surface */}
      <div className="transition-all">
        {activeTab === "pdf_check" ? (
          <StudentForm />
        ) : (
          <VoucherOnlyCard onSwitchToPdf={() => setActiveTab("pdf_check")} />
        )}
      </div>

      {/* Minimalist Secondary Links (Clean, No Box-in-Box) */}
      <div className="pt-2 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <button
          type="button"
          onClick={() => setIsTrackOpen(true)}
          className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-semibold flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Track existing order slip</span>
          </div>
          <span className="text-slate-400 font-bold">→</span>
        </button>

        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20admission%20form`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-semibold flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Admission &amp; form guidance</span>
          </div>
          <span className="text-slate-400 font-bold">→</span>
        </a>
      </div>

      {/* Track Slip Modal */}
      <TrackSlipModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </div>
  );
}
