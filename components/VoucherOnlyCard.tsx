"use client";

import React from "react";
import { PaymentChannelsBar } from "./PaymentLogos";
import { ServiceConfig } from "@/lib/services";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { WhatsAppOutlineIcon } from "./WhatsAppIcon";

export function VoucherOnlyCard({
  serviceSetting,
  onSwitchToPdf,
}: {
  serviceSetting?: ServiceConfig;
  onSwitchToPdf?: () => void;
}) {
  const dataplugBuyUrl =
    process.env.NEXT_PUBLIC_DATAPLUG_BUY_URL ||
    "https://dataplug-gh.com/pay/nogadex-consults-e8c92a30";

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  const isEnabled = serviceSetting?.enabled !== false;
  const price = serviceSetting?.price || 24.0;

  return (
    <div className="space-y-4">

      {/* Disabled / Maintenance Banner */}
      {!isEnabled && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Scratch Card PINs Temporarily Unavailable</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            {serviceSetting?.message ||
              "Vouchers are temporarily out of stock. Please check back shortly or chat with us on WhatsApp for assistance."}
          </p>
        </div>
      )}

      {/* Price Bar */}
      <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
        <span className="text-sm font-medium text-slate-700">WAEC Checker PIN</span>
        <span className="font-bold text-slate-900 tabular-nums text-base">
          GH₵{price.toFixed(2)}
        </span>
      </div>

      {/* Direct Buy button or WhatsApp Alternative */}
      {isEnabled ? (
        <a
          href={dataplugBuyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white shadow-md shadow-red-600/20 transition-all cursor-pointer"
        >
          Buy Checker PIN
        </a>
      ) : (
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20want%20to%20buy%20a%20WAEC%20checker%20PIN`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer"
        >
          <WhatsAppOutlineIcon className="w-4 h-4" />
          <span>Inquire via WhatsApp Desk</span>
        </a>
      )}

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
