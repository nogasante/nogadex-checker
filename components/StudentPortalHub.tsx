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
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export function StudentPortalHub() {
  const [activeModal, setActiveModal] = useState<"none" | "pdf_check" | "voucher_buy" | "track">("none");
  const [trackIdInput, setTrackIdInput] = useState("");

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";
  const dataplugBuyUrl =
    process.env.NEXT_PUBLIC_DATAPLUG_BUY_URL ||
    "https://dataplug-gh.com/pay/nogadex-consults-e8c92a30";

  return (
    <div className="space-y-8 sm:space-y-12">
      
      {/* 1. CLEAN, HUMAN, AGENCY-GRADE HERO HEADER (Zero AI Pills / Zero Pulsing Dots) */}
      <section className="space-y-2 pt-2 sm:pt-4 text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
          Nogadex Consults • Student Services
        </span>
        <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          Select a Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal leading-relaxed">
          Official WAEC result checking, voucher scratch card vending, order tracking, and university admission support for Ghanaian students.
        </p>
      </section>

      {/* 2. PROFESSIONAL SERVICE LIST / CARDS (Dribbble Clean Agency Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Service 01: Result Checking & PDF Service (Primary) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">01</span>
              <span className="text-sm font-extrabold text-slate-900 font-mono">GH₵30.00</span>
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                WAEC Result Check &amp; PDF Delivery
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We check your WASSCE, BECE, or NOVDEC grades with an official scratch card voucher and email you a verified, high-resolution printable PDF certificate.
              </p>
            </div>

            <div className="text-[11px] text-slate-500 font-medium pt-1">
              Supports: WASSCE • NOVDEC • BECE • GBCE • ABCE
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal("pdf_check")}
            className="w-full h-11 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <span>Check Result &amp; Get PDF</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service 02: Buy Checker PIN Only */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">02</span>
              <span className="text-sm font-extrabold text-slate-900 font-mono">GH₵25.00</span>
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Buy Voucher PIN Only (Checker)
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buy an official WAEC Scratch Card Serial &amp; PIN with instant SMS and WhatsApp delivery to check your results yourself on the WAEC Ghana portal.
              </p>
            </div>

            <div className="text-[11px] text-slate-500 font-medium pt-1">
              Instant delivery • Valid for 3 checks across all exams
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal("voucher_buy")}
            className="w-full h-11 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <span>Buy Checker PIN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service 03: Track Result Slip */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">03</span>
              <span className="text-[11px] font-bold text-slate-500">TRACKING</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Track Existing Result Slip
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Already submitted a request? Enter your Request ID (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">NGX-100234</code>) to check live status or re-download your PDF.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal("track")}
            className="w-full h-11 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span>Look Up Order Status</span>
          </button>
        </div>

        {/* Service 04: Admission Guidance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">04</span>
              <span className="text-[11px] font-bold text-emerald-700">ADVISORY</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                University &amp; Polytechnic Admissions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need guidance calculating your aggregate, picking cut-off courses, or filling out University (UG, KNUST, UCC) &amp; Polytechnic application forms?
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </section>

      {/* 3. PRACTICAL NEED-TO-KNOW NOTE */}
      <section className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs text-xs space-y-1.5">
        <div className="font-bold text-slate-900">Important Information</div>
        <p className="text-slate-600 leading-relaxed">
          The delivered PDF results slip contains your full candidate details, subjects, grades, and serial numbers. It is formatted for direct upload to university and polytechnic application portals across Ghana.
        </p>
        <p className="text-slate-500 pt-0.5">
          Need support? Reach our team on WhatsApp at <strong>+{whatsappNumber}</strong> or email <strong>results@results.nogadexconsults.app</strong>.
        </p>
      </section>

      {/* 4. MODALS */}

      {/* Modal A: Check Result & Get PDF */}
      {activeModal === "pdf_check" && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl my-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-bold text-slate-900">Check WAEC Result &amp; Get PDF</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal("none")}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer text-xs font-bold"
              >
                Close ✕
              </button>
            </div>
            <StudentForm />
          </div>
        </div>
      )}

      {/* Modal B: Buy Voucher PIN Only */}
      {activeModal === "voucher_buy" && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-slate-900" />
                <h3 className="text-sm font-bold text-slate-900">Buy WAEC Scratch Card PIN</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal("none")}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer text-xs font-bold"
              >
                Close ✕
              </button>
            </div>
            <VoucherOnlyCard onSwitchToPdf={() => setActiveModal("pdf_check")} />
          </div>
        </div>
      )}

      {/* Modal C: Track Slip */}
      <TrackSlipModal isOpen={activeModal === "track"} onClose={() => setActiveModal("none")} />

    </div>
  );
}
