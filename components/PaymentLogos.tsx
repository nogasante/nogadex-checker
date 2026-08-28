import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

export function PaymentChannelsBar() {
  return (
    <div className="pt-2 pb-1 space-y-2">
      
      {/* Sleek unified payment badge container */}
      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
        
        {/* Left: Text Label */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Pay via MoMo &amp; Cards</span>
        </div>

        {/* Right: Clean Brand Icons */}
        <div className="flex items-center gap-2">
          
          {/* MTN */}
          <div className="w-5 h-5 rounded-full overflow-hidden shadow-2xs border border-amber-300/80 shrink-0 bg-[#FFCC00] flex items-center justify-center" title="MTN Mobile Money">
            <Image
              src="/payments/mtn-circle.png"
              alt="MTN"
              width={20}
              height={20}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Telecel */}
          <div className="w-5 h-5 rounded-full overflow-hidden shadow-2xs border border-red-300/80 shrink-0 bg-[#E60000] flex items-center justify-center" title="Telecel Cash">
            <Image
              src="/payments/telecel-circle.png"
              alt="Telecel"
              width={20}
              height={20}
              className="w-full h-full object-cover"
            />
          </div>

          {/* AT Money */}
          <div className="w-5 h-5 rounded-full overflow-hidden shadow-2xs border border-blue-300/80 shrink-0 bg-[#0055A5] flex items-center justify-center" title="AT Money">
            <Image
              src="/payments/at-circle.png"
              alt="AT Money"
              width={20}
              height={20}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-slate-300/80 mx-0.5" />

          {/* Visa */}
          <span className="text-[10px] font-black italic tracking-tighter text-[#1A1F71] select-none">
            VISA
          </span>

          {/* Mastercard Circles */}
          <div className="flex items-center -space-x-1.5 select-none" title="Mastercard">
            <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
          </div>

        </div>

      </div>

      {/* Subtle reassurance footer */}
      <p className="text-[11px] text-slate-400 text-center">
        Secured 256-bit checkout powered by <span className="font-semibold text-slate-600">Paystack</span>
      </p>

    </div>
  );
}
