"use client";

import { useState } from "react";
import { StudentForm } from "./StudentForm";
import { VoucherOnlyCard } from "./VoucherOnlyCard";
import { TrackSlipModal } from "./TrackSlipModal";
import { KeyRound, Search, MessageCircle, ExternalLink, ArrowRight } from "lucide-react";

export function StudentPortalHub() {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";
  const dataplugBuyUrl =
    process.env.NEXT_PUBLIC_DATAPLUG_BUY_URL ||
    "https://dataplug-gh.com/pay/nogadex-consults-e8c92a30";

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Quick Access Bar (Single-Tap Action Tiles) */}
      <div className="grid grid-cols-3 gap-2">
        
        {/* Quick Access 1: Buy PIN Only */}
        <button
          type="button"
          onClick={() => setShowVoucherModal(true)}
          className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs text-left transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between pb-1">
            <KeyRound className="w-4 h-4 text-slate-700 group-hover:text-red-600 transition-colors" />
            <span className="text-[10px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
              GH₵25
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-900 leading-tight">Buy PIN Only</div>
          <div className="text-[9px] text-slate-500 truncate">Voucher Serial &amp; PIN</div>
        </button>

        {/* Quick Access 2: Track Order Slip */}
        <button
          type="button"
          onClick={() => setIsTrackOpen(true)}
          className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs text-left transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between pb-1">
            <Search className="w-4 h-4 text-slate-700 group-hover:text-red-600 transition-colors" />
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Live
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-900 leading-tight">Track Slip</div>
          <div className="text-[9px] text-slate-500 truncate">Check order status</div>
        </button>

        {/* Quick Access 3: Admission Help */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs text-left transition-all group"
        >
          <div className="flex items-center justify-between pb-1">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              Help
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-900 leading-tight">Admissions</div>
          <div className="text-[9px] text-slate-500 truncate">University forms</div>
        </a>

      </div>

      {/* Main Direct Hero Card: Check Result & PDF Delivery */}
      <div className="space-y-3">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-bold">
            <span>OFFICIAL CHECK &amp; PDF SERVICE</span>
          </div>
          <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
            Check WAEC Result &amp; Get PDF
          </h1>
          <p className="text-xs text-slate-600">
            Enter your details below. We verify your grades with a fresh WAEC voucher PIN and email your high-res printable PDF certificate in 2–5 minutes.
          </p>
        </div>

        {/* The Direct Form */}
        <StudentForm />
      </div>

      {/* Modals */}
      <TrackSlipModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />

      {/* Buy PIN Only Modal */}
      {showVoucherModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-1 animate-in fade-in zoom-in-95 duration-150">
            <VoucherOnlyCard onSwitchToPdf={() => setShowVoucherModal(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
