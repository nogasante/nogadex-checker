import Image from "next/image";

/**
 * Shared ambient background — mirrors the main homepage's rich visual composition.
 * Used on SEO landing pages so they feel like part of the same brand/site.
 */
export function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Ambient Student Backdrop */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply">
        <Image
          src="/images/ghana-bg.jpg"
          alt=""
          fill
          className="object-cover object-top filter contrast-125"
          aria-hidden="true"
        />
      </div>

      {/* 2. Geometric Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full stroke-slate-900/[0.04] [mask-image:radial-gradient(80%_80%_at_top_center,white,transparent)]"
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
            <circle cx="18" cy="18" r="0.75" fill="currentColor" fillOpacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#page-grid)" />
      </svg>

      {/* 3. WAEC Sunburst Logo Watermark */}
      <div className="absolute -top-4 -right-4 sm:top-8 sm:right-16 w-28 h-28 sm:w-40 sm:h-40 opacity-[0.10] sm:opacity-[0.07] -rotate-12">
        <Image
          src="/images/waec-logo.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      {/* 4. Ambient Colored Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[220px] sm:h-[350px] bg-gradient-to-tr from-blue-200/30 via-rose-200/20 to-amber-200/30 blur-3xl rounded-full opacity-80" />
      <div className="absolute bottom-16 -left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-indigo-200/30 to-transparent blur-2xl rounded-full" />
      <div className="absolute top-28 -right-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-bl from-rose-200/25 to-transparent blur-2xl rounded-full" />

      {/* 5. Decorative Wireframe Rings */}
      <div className="absolute top-20 left-2 w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-slate-900/[0.04] border-dashed" />
      <div className="absolute bottom-24 right-4 w-32 sm:w-44 h-32 sm:h-44 rounded-full border border-slate-900/[0.04]" />
    </div>
  );
}
