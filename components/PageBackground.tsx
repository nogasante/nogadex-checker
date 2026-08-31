import Image from "next/image";

/**
 * Lightweight, hardware-accelerated ambient background.
 * Optimized to prevent GPU memory pressure and frame drops on mobile devices.
 */
export function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Ambient Background Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/95 to-slate-100/90" />

      {/* 2. Geometric Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full stroke-slate-900/[0.035]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="page-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 36V.5H36" fill="none" strokeWidth="1" />
            <circle cx="18" cy="18" r="0.75" fill="currentColor" fillOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#page-grid)" />
      </svg>


      {/* 4. WAEC Sunburst Logo Watermark */}
      <div className="absolute -top-4 -right-4 sm:top-8 sm:right-16 w-28 h-28 sm:w-36 sm:h-36 opacity-[0.06] -rotate-12">
        <Image
          src="/images/waec-logo.png"
          alt="WAEC Watermark Logo"
          width={144}
          height={144}
          className="object-contain"
        />
      </div>
    </div>
  );
}
