"use client";

import { useState } from "react";
import { StudentForm } from "@/components/StudentForm";
import { VoucherOnlyCard } from "@/components/VoucherOnlyCard";
import { TrackSlipModal } from "@/components/TrackSlipModal";
import {
  KeyRound,
  Search,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export function StudentPortalHub() {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [trackQuery, setTrackQuery] = useState("");

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";
  const dataplugBuyUrl =
    process.env.NEXT_PUBLIC_DATAPLUG_BUY_URL ||
    "https://dataplug-gh.com/pay/nogadex-consults-e8c92a30";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Main 2-Column High-Trust Layout (Desktop) / Fluid Stack (Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Checkout Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Official WAEC Result Verification
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              Check WAEC Result &amp; Get PDF
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Enter your candidate details below. We verify your grades with an official WAEC scratch card PIN and dispatch a high-resolution printable PDF certificate straight to your email.
            </p>
          </div>

          {/* Primary Form */}
          <StudentForm />
        </div>

        {/* Right Column: Other Services & Institutional Trust Dossier (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick Service A: Buy Voucher PIN Only */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Buy Checker PIN Only</h3>
                  <p className="text-[11px] text-slate-500">Self-check on WAEC Ghana portal</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-slate-900 font-mono">GH₵25.00</span>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Need to check results yourself? Buy an authentic WAEC Scratch Card Serial &amp; PIN with instant SMS and WhatsApp delivery.
            </p>

            <button
              type="button"
              onClick={() => setShowVoucherModal(true)}
              className="w-full h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Buy Checker PIN (GH₵25)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Service B: Track Existing Order Slip */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Track Existing Order</h3>
                <p className="text-[11px] text-slate-500">Check live status or re-download PDF</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsTrackOpen(true);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="e.g. NGX-100234"
                className="flex-1 h-9 px-3 text-xs font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:border-red-600 focus:bg-white focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="h-9 px-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Track
              </button>
            </form>
          </div>

          {/* Quick Service C: University Admission Desk */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">Admission Guidance</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                FREE SUPPORT
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Need assistance calculating aggregate scores, checking course cut-off points, or filling out University &amp; Polytechnic admission forms?
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors pt-1"
            >
              <span>Chat with counselor on WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Institutional Trust Notes */}
          <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-700">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-800" />
              <span>Service Guarantees</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% Genuine, unused WAEC Scratch Card PINs.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Printable PDF results certificates suitable for all university portals.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Average delivery time: 2 to 5 minutes after payment.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* 3-Step Lifecycle Process */}
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

      {/* Modals */}
      <TrackSlipModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />

      {/* Buy Voucher PIN Only Modal */}
      {showVoucherModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-slate-900" />
                <h3 className="text-sm font-bold text-slate-900">Buy WAEC Scratch Card PIN</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVoucherModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer text-xs font-bold"
              >
                Close ✕
              </button>
            </div>
            <VoucherOnlyCard onSwitchToPdf={() => setShowVoucherModal(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
