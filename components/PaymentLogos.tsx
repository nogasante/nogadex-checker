import React from "react";

/**
 * High-fidelity vector logos for Ghanaian Payment Channels
 */

export function MtnMomoLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 42"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MTN Mobile Money"
    >
      <rect width="130" height="42" rx="7" fill="#FFCC00" />
      {/* Official MTN Oval */}
      <ellipse cx="32" cy="21" rx="20" ry="13.5" fill="#000000" />
      <text
        x="32"
        y="25.5"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="12.5"
        fill="#FFCC00"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        MTN
      </text>
      {/* MoMo text */}
      <text
        x="64"
        y="27"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontSize="15"
        fill="#000000"
        letterSpacing="-0.3"
      >
        MoMo
      </text>
    </svg>
  );
}

export function TelecelLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 42"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Telecel Cash"
    >
      <rect width="130" height="42" rx="7" fill="#E60000" />
      {/* Telecel icon vortex */}
      <circle cx="26" cy="21" r="11" fill="#FFFFFF" />
      <circle cx="26" cy="21" r="6" fill="#E60000" />
      <circle cx="29" cy="17" r="3" fill="#FFFFFF" />
      {/* telecel wordmark */}
      <text
        x="76"
        y="26.5"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="14.5"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="-0.4"
      >
        telecel
      </text>
    </svg>
  );
}

export function AtMoneyLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 42"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AT Money"
    >
      <rect width="130" height="42" rx="7" fill="#002D62" />
      {/* AT logo mark */}
      <path
        d="M17 28L23.5 13L30 28H26.8L25.3 24.5H21.7L20.2 28H17ZM22.3 22.3H24.7L23.5 19.3L22.3 22.3Z"
        fill="#E60000"
      />
      <path
        d="M29.5 15.5H39V18H35.5V28H32.8V18H29.5V15.5Z"
        fill="#FFFFFF"
      />
      {/* money text */}
      <text
        x="77"
        y="26.5"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="14"
        fill="#FFFFFF"
        letterSpacing="-0.3"
      >
        money
      </text>
    </svg>
  );
}

export function CardLogos({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 42"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa and Mastercard"
    >
      <rect width="130" height="42" rx="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      {/* Visa Wordmark */}
      <text
        x="28"
        y="26.5"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="16"
        fill="#1434CB"
        textAnchor="middle"
      >
        VISA
      </text>
      <line x1="56" y1="10" x2="56" y2="32" stroke="#E2E8F0" strokeWidth="1" />
      {/* Mastercard Interlocking Circles */}
      <circle cx="78" cy="21" r="9.5" fill="#EB001B" />
      <circle cx="92" cy="21" r="9.5" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M85 15C83.4 16.5 82.4 18.6 82.4 21C82.4 23.4 83.4 25.5 85 27C86.6 25.5 87.6 23.4 87.6 21C87.6 18.6 86.6 16.5 85 15Z"
        fill="#FF5F00"
      />
    </svg>
  );
}
