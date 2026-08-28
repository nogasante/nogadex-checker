import React from "react";
import { FileText, CheckCircle2 } from "lucide-react";

export function SamplePdfPreview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold text-slate-900">
            Sample Result Document
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
          Formatted PDF Copy
        </span>
      </div>

      {/* Mini Mock Document */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2 text-left shadow-2xs">
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
            <span className="text-slate-400 block">Candidate:</span>
            <span className="font-semibold text-slate-800">ASANTE KWABENA M.</span>
          </div>
          <div>
            <span className="text-slate-400 block">Index Number:</span>
            <span className="font-mono font-semibold text-slate-800">0010203040</span>
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
        <span>Ready for upload to Ghanaian university &amp; polytechnic application portals.</span>
      </div>
    </div>
  );
}
