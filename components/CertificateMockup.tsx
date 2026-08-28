import React from "react";
import { Check } from "lucide-react";

export function CertificateMockup() {
  return (
    <div className="relative rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3 select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Sample Delivered Document
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold text-slate-400">
          PDF • High Resolution
        </span>
      </div>

      {/* Mini Certificate Card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2.5 font-sans">
        <div className="flex items-center justify-between text-left">
          <div>
            <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
              West African Examinations Council
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Provisional Results Slip • WASSCE MAY/JUNE
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
            VERIFIED
          </span>
        </div>

        {/* Candidate Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-[10px] bg-white p-2 rounded-lg border border-slate-200/60">
          <div>
            <span className="text-slate-400 block">Candidate Name:</span>
            <span className="font-bold text-slate-800">ASANTE KWABENA M.</span>
          </div>
          <div>
            <span className="text-slate-400 block">Index Number:</span>
            <span className="font-mono font-bold text-slate-800">0010203040</span>
          </div>
        </div>

        {/* Subjects Sample Table */}
        <div className="space-y-1 text-[10px]">
          <div className="grid grid-cols-3 font-bold text-slate-500 border-b border-slate-200 pb-1">
            <span className="col-span-2">Subject</span>
            <span className="text-right">Grade</span>
          </div>
          <div className="grid grid-cols-3 text-slate-700">
            <span className="col-span-2">SOCIAL STUDIES</span>
            <span className="text-right font-bold text-emerald-700">A1</span>
          </div>
          <div className="grid grid-cols-3 text-slate-700">
            <span className="col-span-2">ENGLISH LANGUAGE</span>
            <span className="text-right font-bold text-emerald-700">B2</span>
          </div>
          <div className="grid grid-cols-3 text-slate-700">
            <span className="col-span-2">MATHEMATICS (CORE)</span>
            <span className="text-right font-bold text-emerald-700">A1</span>
          </div>
          <div className="grid grid-cols-3 text-slate-700">
            <span className="col-span-2">INTEGRATED SCIENCE</span>
            <span className="text-right font-bold text-emerald-700">A1</span>
          </div>
        </div>

        {/* Footer Serials */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400 font-mono">
          <span>PIN: WG-2025-XXXXXX</span>
          <span>CARD USED: 1 of 3</span>
        </div>
      </div>

      {/* Trust Guarantee Points */}
      <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>University Portal Ready</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Instant PDF Download</span>
        </div>
      </div>
    </div>
  );
}
