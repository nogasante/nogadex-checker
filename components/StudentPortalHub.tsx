"use client";

import { useState } from "react";
import { StudentForm } from "./StudentForm";
import { VoucherOnlyCard } from "./VoucherOnlyCard";
import {
  FileText,
  KeyRound,
  Search,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function StudentPortalHub() {
  const [activeTab, setActiveTab] = useState<"check" | "voucher" | "track">("check");
  const [trackQuery, setTrackQuery] = useState("");
  const router = useRouter();

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    const cleanId = trackQuery.trim().toUpperCase();
    router.push(`/status/${cleanId}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      
      {/* 1. BRAND HEADER & VALUE PROP */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Nogadex Consults • Ghana</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
          WAEC Results &amp; Vouchers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Fast result checking, printable PDF delivery, and instant scratch card PINs for WASSCE, BECE &amp; NOVDEC candidates.
        </p>
      </div>

      {/* 2. WORLD-CLASS STRIPE-STYLE SERVICE SWITCHER */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("check")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
            activeTab === "check"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-red-600" />
          <span>Check Result &amp; PDF</span>
          <span className="hidden sm:inline text-[10px] font-mono bg-red-50 text-red-700 px-1.5 py-0.5 rounded">
            GH₵30
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("voucher")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
            activeTab === "voucher"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <KeyRound className="w-3.5 h-3.5 text-slate-700" />
          <span>Buy PIN Only</span>
          <span className="hidden sm:inline text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
            GH₵25
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("track")}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
            activeTab === "track"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Search className="w-3.5 h-3.5 text-slate-700" />
          <span>Track</span>
        </button>
      </div>

      {/* 3. MAIN CARD CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">
        
        {/* TAB 1: RESULT CHECKING & PDF DELIVERY */}
        {activeTab === "check" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900">
                Check Result &amp; Receive PDF Slip
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                We assign a genuine WAEC voucher, check your grades, and email your printable result slip in 2–5 minutes.
              </p>
            </div>

            <StudentForm />
          </div>
        )}

        {/* TAB 2: BUY PIN ONLY */}
        {activeTab === "voucher" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900">
                Buy WAEC Scratch Card PIN (GH₵25.00)
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                For students who prefer to check results themselves on the official WAEC Ghana portal.
              </p>
            </div>

            <VoucherOnlyCard onSwitchToPdf={() => setActiveTab("check")} />
          </div>
        )}

        {/* TAB 3: TRACK EXISTING ORDER */}
        {activeTab === "track" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900">
                Track Existing Result Slip
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                Enter the Request ID from your confirmation screen or SMS (e.g. <span className="font-mono font-bold text-slate-800">NGX-100234</span>).
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-3">
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

      {/* 4. UNDERSTATED SUPPORT BAR */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Need help or admission guidance?</span>
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
