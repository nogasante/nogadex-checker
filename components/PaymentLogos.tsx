import React from "react";
import Image from "next/image";

/**
 * Authentic Ghanaian Telco & Card payment channel badges
 * Loaded directly from official circular brand assets
 */

export function PaymentChannelsBar() {
  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-center gap-3">
        
        {/* MTN Circular Badge */}
        <div className="w-8 h-8 rounded-full overflow-hidden shadow-xs hover:scale-105 transition-transform flex items-center justify-center">
          <Image
            src="/payments/mtn-circle.png"
            alt="MTN Ghana"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Telecel Circular Badge */}
        <div className="w-8 h-8 rounded-full overflow-hidden shadow-xs hover:scale-105 transition-transform flex items-center justify-center">
          <Image
            src="/payments/telecel-circle.png"
            alt="Telecel Ghana"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* AT Circular Badge */}
        <div className="w-8 h-8 rounded-full overflow-hidden shadow-xs hover:scale-105 transition-transform flex items-center justify-center">
          <Image
            src="/payments/at-circle.png"
            alt="AT Ghana"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Card Badge */}
        <div className="h-8 px-2.5 bg-slate-50 rounded-full border border-slate-200/90 flex items-center justify-center gap-1.5 shadow-2xs">
          <span className="text-[11px] font-black italic text-[#1434CB] tracking-tight">VISA</span>
          <div className="flex items-center -space-x-1">
            <span className="w-3 h-3 rounded-full bg-[#EB001B] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90 inline-block" />
          </div>
        </div>

      </div>

      <div className="text-center text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1">
        <span>🔒 Secured by Paystack (Mobile Money &amp; Bank Cards)</span>
      </div>
    </div>
  );
}
