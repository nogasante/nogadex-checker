import React from "react";

/**
 * Authentic vector logos for Ghanaian Telco & Card payment channels
 * Displayed on clean white tiles matching modern fintech standards (Paystack / Stripe)
 */

export function MtnLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <div className="inline-flex items-center justify-center px-2 py-1 bg-[#FFCC00] rounded-md border border-[#E5B800] shadow-2xs">
      <svg viewBox="0 0 70 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="35" cy="14" rx="26" ry="12" fill="#000000" />
        <text
          x="35"
          y="18.5"
          fontFamily="Impact, 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="14"
          fill="#FFCC00"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          MTN
        </text>
      </svg>
    </div>
  );
}

export function TelecelLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <div className="inline-flex items-center justify-center px-2 py-1 bg-[#E60000] rounded-md border border-[#CC0000] shadow-2xs">
      <svg viewBox="0 0 84 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Telecel swirl */}
        <circle cx="16" cy="14" r="8.5" fill="#FFFFFF" />
        <circle cx="16" cy="14" r="4.5" fill="#E60000" />
        <circle cx="18.5" cy="11" r="2.2" fill="#FFFFFF" />
        <text
          x="53"
          y="19"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="14"
          fill="#FFFFFF"
          textAnchor="middle"
          letterSpacing="-0.5"
        >
          telecel
        </text>
      </svg>
    </div>
  );
}

export function AtLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <div className="inline-flex items-center justify-center px-2 py-1 bg-[#002D62] rounded-md border border-[#001F45] shadow-2xs">
      <svg viewBox="0 0 65 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Red A */}
        <path d="M12 22L17.5 7L23 22H19.5L18.3 18.5H14.7L13.5 22H12ZM15.4 16.2H17.6L16.5 13L15.4 16.2Z" fill="#E60000" />
        {/* White T */}
        <path d="M22 9.5H31V12H27.8V22H25.2V12H22V9.5Z" fill="#FFFFFF" />
        {/* Subtitle */}
        <text x="47" y="19" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="13" fill="#FFFFFF">
          money
        </text>
      </svg>
    </div>
  );
}

export function CardLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <div className="inline-flex items-center justify-center px-2 py-1 bg-white rounded-md border border-slate-200 shadow-2xs">
      <svg viewBox="0 0 75 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Visa */}
        <text
          x="18"
          y="18.5"
          fontFamily="Impact, Arial, sans-serif"
          fontStyle="italic"
          fontWeight="900"
          fontSize="13"
          fill="#1434CB"
          textAnchor="middle"
        >
          VISA
        </text>
        <line x1="36" y1="6" x2="36" y2="22" stroke="#E2E8F0" strokeWidth="1" />
        {/* Mastercard circles */}
        <circle cx="50" cy="14" r="7" fill="#EB001B" />
        <circle cx="60" cy="14" r="7" fill="#F79E1B" fillOpacity="0.9" />
        <path
          d="M55 9.5C53.8 10.7 53 12.3 53 14C53 15.7 53.8 17.3 55 18.5C56.2 17.3 57 15.7 57 14C57 12.3 56.2 10.7 55 9.5Z"
          fill="#FF5F00"
        />
      </svg>
    </div>
  );
}

export function PaymentChannelsBar() {
  return (
    <div className="space-y-1.5 pt-2">
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        <MtnLogo />
        <TelecelLogo />
        <AtLogo />
        <CardLogo />
      </div>
      <div className="text-center text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
        <span>🔒 Secured by Paystack (MoMo &amp; Cards)</span>
      </div>
    </div>
  );
}
