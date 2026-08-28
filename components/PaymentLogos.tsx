import React from "react";

export function MtnMomoLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="8" fill="#FFCC00" />
      {/* Oval emblem */}
      <ellipse cx="32" cy="20" rx="20" ry="14" fill="#000000" />
      <text x="32" y="24" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="13" fill="#FFCC00" textAnchor="middle">
        MTN
      </text>
      <text x="78" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="14" fill="#000000">
        MoMo
      </text>
    </svg>
  );
}

export function TelecelLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="8" fill="#E60000" />
      {/* Telecel icon */}
      <circle cx="24" cy="20" r="11" fill="#FFFFFF" />
      <circle cx="24" cy="20" r="6" fill="#E60000" />
      <circle cx="28" cy="16" r="3" fill="#FFFFFF" />
      <text x="73" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="14" fill="#FFFFFF" textAnchor="middle">
        telecel
      </text>
    </svg>
  );
}

export function AtMoneyLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="8" fill="#002D62" />
      {/* AT icon */}
      <path d="M16 26L23 13L30 26H26.5L25 23H21L19.5 26H16ZM21.8 21.2H24.2L23 18.5L21.8 21.2Z" fill="#E60000" />
      <path d="M29 15.5H39V18.2H35.4V26H32.6V18.2H29V15.5Z" fill="#FFFFFF" />
      <text x="75" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="13" fill="#FFFFFF" textAnchor="middle">
        money
      </text>
    </svg>
  );
}

export function CardLogos({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
      {/* Visa */}
      <text x="32" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontStyle="italic" fontSize="15" fill="#1A1F71" textAnchor="middle">
        VISA
      </text>
      <line x1="60" y1="10" x2="60" y2="30" stroke="#CBD5E1" strokeWidth="1" />
      {/* Mastercard interlinked circles */}
      <circle cx="82" cy="20" r="9" fill="#EB001B" />
      <circle cx="94" cy="20" r="9" fill="#F79E1B" fillOpacity="0.85" />
    </svg>
  );
}
