"use client";

import React from "react";
import { PaymentChannelsBar } from "./PaymentLogos";

export function VoucherOnlyCard({
  onSwitchToPdf,
}: {
  onSwitchToPdf?: () => void;
}) {
  const dataplugBuyUrl =
    process.env.NEXT_PUBLIC_DATAPLUG_BUY_URL ||
    "https://dataplug-gh.com/pay/nogadex-consults-e8c92a30";

  return (
    <div className="space-y-4">

      {/* Price Bar */}
      <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
        <span className="text-sm font-medium text-slate-700">WAEC Checker PIN</span>
        <span className="font-bold text-slate-900 tabular-nums text-base">GH₵24.00</span>
      </div>

      {/* Direct Buy button */}
      <a
        href={dataplugBuyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white shadow-md shadow-red-600/20 transition-all cursor-pointer"
      >
        Buy Checker PIN
      </a>

      {/* Payment note & Logos */}
      <PaymentChannelsBar />

      {/* Switch to PDF */}
      {onSwitchToPdf && (
        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={onSwitchToPdf}
            className="text-xs text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer"
          >
            Want us to check your results &amp; email a printable PDF instead? →
          </button>
        </div>
      )}

    </div>
  );
}
