"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentForm } from "@/components/StudentForm";
import { VoucherOnlyCard } from "@/components/VoucherOnlyCard";
import { TrackSlipModal } from "@/components/TrackSlipModal";
import { SamplePdfPreview } from "@/components/SamplePdfPreview";
import {
  KeyRound,
  Search,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function HomePage() {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [trackInput, setTrackInput] = useState("");

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* 1. CLEAR, HONEST VALUE PROPOSITION & TRUST STRIP */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Nogadex Consults • Ghana Result Checking Service
              </span>
              <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
                Check Your WAEC Result &amp; Get a Printable PDF
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Enter your candidate details, pay securely with Mobile Money or Card, and receive a professionally formatted copy of your checked result by email.
              </p>
            </div>

            {/* High-Trust Benefit Bar */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-500 flex-wrap pt-1 border-t border-slate-100 pb-1">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-slate-800">Secure Paystack Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-slate-800">Email Delivery in 2–5 Mins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-slate-800">WhatsApp Help (+233 53 490 8166)</span>
              </div>
            </div>
          </div>

          {/* 2. MAIN TWO-COLUMN TRANSACTIONAL FUNNEL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Focused 3-Group Checkout Form (7 Cols) */}
            <div className="lg:col-span-7">
              <StudentForm />
            </div>

            {/* Right Column: Visual Sample Preview & Secondary Options (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Visual Sample Result Document Preview */}
              <SamplePdfPreview />

              {/* What to Expect (Honest Guarantees) */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-slate-800" />
                  <span>What to expect</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>A genuine, single-use WAEC scratch card PIN is used for each check.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Formatted PDF result document sent directly to your email.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Order tracking slip provided immediately upon payment.</span>
                  </li>
                </ul>
              </div>

              {/* Secondary Option: Prefer to Check Yourself? (PIN Only) */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-slate-700" />
                    <h3 className="text-xs font-bold text-slate-900">Prefer to check it yourself?</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-900 font-mono">GH₵25.00</span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Buy an unused WAEC Scratch Card Serial &amp; PIN delivered instantly via SMS and WhatsApp.
                </p>

                <button
                  type="button"
                  onClick={() => setShowVoucherModal(true)}
                  className="w-full h-8.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Buy Checker PIN Only (GH₵25)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Already Paid? Quick Order Tracker */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-700" />
                  <h3 className="text-xs font-bold text-slate-900">Already paid? Track your slip</h3>
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
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
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

              {/* Admission Support Box */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-bold text-slate-900">University Admissions Help</h3>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    FREE
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Need guidance on course cut-off points or filling out UG, KNUST, or UCC application forms?
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>Chat with an admission counselor on WhatsApp</span>
                  <span>→</span>
                </a>
              </div>

            </div>

          </div>

          {/* 3. HOW IT WORKS */}
          <div className="border-t border-slate-100 pt-8 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
              How Result Checking Works
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <div className="text-xs font-bold text-slate-900">Enter Details &amp; Pay</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  Provide your WAEC Index Number, exam year, and delivery email. Pay GH₵30.00 securely via MTN MoMo, Telecel, AT, or Card.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <div className="text-xs font-bold text-slate-900">Result Retrieval</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  A genuine, unused WAEC scratch card PIN is assigned to your request and your grades are retrieved from WAEC Ghana.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <div className="text-xs font-bold text-slate-900">PDF Delivery to Email</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  A clean, printable PDF copy of your result is generated and sent to your email, ready for university application portals.
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

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
