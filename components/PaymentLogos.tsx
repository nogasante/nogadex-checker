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
        fontFamily="system-ui, -apple-system, sans-serif"
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
        x="63"
        y="27"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
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
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
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
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
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
      <path
        d="M23.5 28L26.5 14H30.5L27.5 28H23.5ZM41 14.3C40.2 14 39 13.7 37.5 13.7C33.7 13.7 31 15.7 31 18.5C31 20.6 32.9 21.8 34.3 22.5C35.8 23.2 36.3 23.7 36.3 24.4C36.3 25.4 35.1 25.9 33.9 25.9C32.4 25.9 31.5 25.6 30.2 25L29.7 24.8L29.1 27.5C30 27.9 31.7 28.3 33.5 28.3C37.6 28.3 40.3 26.3 40.3 23.3C40.3 21.7 39.3 20.4 37.1 19.3C35.8 18.7 35 18.2 35 17.5C35 16.9 35.7 16.2 37.2 16.2C38.4 16.2 39.4 16.5 40.2 16.8L40.6 17L41 14.3Z"
        fill="#1434CB"
      />
      <line x1="52" y1="11" x2="52" y2="31" stroke="#E2E8F0" strokeWidth="1" />
      {/* Mastercard Interlocking Circles */}
      <circle cx="75" cy="21" r="10" fill="#EB001B" />
      <circle cx="89" cy="21" r="10" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M82 14.7C80.3 16.3 79.2 18.5 79.2 21C79.2 23.5 80.3 25.7 82 27.3C83.7 25.7 84.8 23.5 84.8 21C84.8 18.5 83.7 16.3 82 14.7Z"
        fill="#FF5F00"
      />
    </svg>
  );
}
