import React from "react";
import Image from "next/image";

/**
 * Authentic Ghanaian Telco & Card payment channel badges
 * Loaded directly from official brand assets
 */

export function PaymentChannelsBar() {
  return (
    <div className="space-y-1.5 pt-2">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        
        {/* MTN Ghana */}
        <div className="h-8 px-2.5 bg-[#FFCC00] rounded-lg border border-[#E5B800] flex items-center justify-center shadow-2xs overflow-hidden">
          <Image
            src="/payments/mtn.png"
            alt="MTN Ghana"
            width={48}
            height={24}
            className="h-5 w-auto object-contain"
          />
        </div>

        {/* AT (AirtelTigo) Ghana */}
        <div className="h-8 px-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-2xs overflow-hidden">
          <Image
            src="/payments/at.png"
            alt="AT Ghana"
            width={40}
            height={24}
            className="h-5 w-auto object-contain"
          />
        </div>

        {/* Telecel Ghana */}
        <div className="h-8 px-2.5 bg-[#E60000] rounded-lg border border-[#CC0000] flex items-center justify-center shadow-2xs overflow-hidden">
          <Image
            src="/payments/telecel.png"
            alt="Telecel Ghana"
            width={48}
            height={24}
            className="h-5 w-auto object-contain"
          />
        </div>

        {/* Visa & Mastercard */}
        <div className="h-8 px-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-center gap-1.5 shadow-2xs">
          <span className="text-[11px] font-black italic text-[#1434CB] tracking-tight">VISA</span>
          <div className="flex items-center -space-x-1">
            <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90 inline-block" />
          </div>
        </div>

      </div>

      <div className="text-center text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1">
        <span>🔒 Secured by Paystack (Mobile Money &amp; Bank Cards)</span>
      </div>
    </div>
  );
}
