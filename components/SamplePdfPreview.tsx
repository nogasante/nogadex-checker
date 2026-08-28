import React from "react";
import { FileText, CheckCircle2 } from "lucide-react";

export function SamplePdfPreview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold text-slate-900">
            Sample Result Document Preview
          </span>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
          SAMPLE • DUMMY DATA
        </span>
      </div>

      {/* Mini Mock Document */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2 text-left shadow-2xs relative overflow-hidden">
        {/* Subtle Sample Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none text-4xl font-black rotate-[-25deg]">
          SAMPLE MOCKUP
        </div>

        <div className="border-b border-slate-100 pb-2">
          <div className="text-[11px] font-bold text-slate-900">
            WEST AFRICAN EXAMINATIONS COUNCIL
          </div>
          <div className="text-[10px] text-slate-500">
            Provisional Results Slip • WASSCE MAY/JUNE
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2 rounded-lg">
          <div>
            <span className="text-slate-400 block text-[9px]">Candidate:</span>
            <span className="font-semibold text-slate-800">SAMPLE STUDENT (DEMO)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px]">Index Number:</span>
            <span className="font-mono font-semibold text-slate-800">0010000000</span>
          </div>
        </div>

        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between text-slate-500 font-bold border-b border-slate-100 pb-0.5">
            <span>Subject</span>
            <span>Grade</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>SOCIAL STUDIES</span>
            <span className="font-bold text-emerald-700">A1</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>ENGLISH LANGUAGE</span>
            <span className="font-bold text-emerald-700">B2</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>MATHEMATICS (CORE)</span>
            <span className="font-bold text-emerald-700">A1</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>INTEGRATED SCIENCE</span>
            <span className="font-bold text-emerald-700">A1</span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-100 flex justify-between text-[9px] text-slate-400 font-mono">
          <span>PIN: WG-2025-XXXXXX</span>
          <span>CARD USE: 1 of 3</span>
        </div>
      </div>

      <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Ready to download and print for Ghanaian university &amp; polytechnic forms.</span>
      </div>
    </div>
  );
}
