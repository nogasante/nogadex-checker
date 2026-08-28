import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, KeyRound, ExternalLink } from "lucide-react";
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
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold">
            INSTANT PIN DELIVERY
          </span>
          <div className="text-right">
            <span className="text-xs text-slate-400 line-through mr-1.5">GH₵28.00</span>
            <span className="text-xl font-extrabold text-slate-900">GH₵25.00</span>
          </div>
        </div>
        <h3 className="text-base font-bold text-slate-900 pt-1">
          Official WAEC Scratch Card (Serial &amp; PIN)
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Buy an unused, genuine WAEC Result Checker PIN to check your results yourself on the official WAEC Direct Ghana portal.
        </p>
      </div>

      {/* Feature Checklist */}
      <div className="space-y-2.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span><strong>Instant SMS &amp; Email Delivery:</strong> Serial &amp; PIN sent immediately after payment.</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span><strong>3 Result Checks Per Card:</strong> Valid for checking WASSCE, BECE, NOVDEC, GBCE, or ABCE up to 3 times.</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span><strong>100% Genuine WAEC Voucher:</strong> Verified authentic scratch card serials.</span>
        </div>
      </div>

      {/* Buy Button linking to DataPlug */}
      <div className="space-y-2.5">
        <a
          href={dataplugBuyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all cursor-pointer shadow-sm"
        >
          <span>Buy Checker PIN Now (GH₵25.00)</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Option to switch to PDF */}
        {onSwitchToPdf && (
          <button
            type="button"
            onClick={onSwitchToPdf}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-900 font-medium py-1 transition-colors cursor-pointer"
          >
            Want us to check and send you the official PDF instead? <span className="text-red-600 font-semibold underline">Select PDF Service (GH₵30)</span>
          </button>
        )}
      </div>

      {/* Payment Channels */}
      <PaymentChannelsBar />
    </div>
  );
}
