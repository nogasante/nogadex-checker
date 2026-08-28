import { Suspense } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentPortalHub } from "@/components/StudentPortalHub";

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* ─── RICH BACKGROUND COMPOSITION (MOBILE & DESKTOP) ─── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. Real Ghanaian High School Students & WAEC Building Ambient Backdrop */}
        <div className="absolute inset-0 opacity-[0.12] sm:opacity-[0.09] mix-blend-multiply">
          <Image
            src="/images/ghana-bg.jpg"
            alt="Ghanaian Senior High School students"
            fill
            priority
            className="object-cover object-top filter contrast-125"
          />
        </div>

        {/* 2. Abstract Geometric Grid Pattern */}
        <svg
          className="absolute inset-0 w-full h-full stroke-slate-900/[0.05] [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="geo-grid"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 36V.5H36" fill="none" strokeWidth="1" />
              <circle cx="18" cy="18" r="0.75" fill="currentColor" fillOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#geo-grid)" />
        </svg>

        {/* 3. Floating Official WAEC Sunburst Logo Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute -top-4 -right-4 sm:top-8 sm:right-16 w-32 h-32 sm:w-48 sm:h-48 opacity-[0.14] sm:opacity-[0.09] pointer-events-none -rotate-12">
          <Image
            src="/images/waec-logo.png"
            alt="WAEC Sunburst Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* 4. Ambient Colored Glow Orbs (Adds Visual Energy & Depth) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[260px] sm:h-[400px] bg-gradient-to-tr from-blue-200/40 via-rose-200/30 to-amber-200/40 blur-3xl rounded-full opacity-90" />
        <div className="absolute bottom-16 -left-10 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-br from-indigo-200/40 to-transparent blur-2xl rounded-full" />
        <div className="absolute top-28 -right-10 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-bl from-rose-200/40 to-transparent blur-2xl rounded-full" />

        {/* 5. Mobile & Desktop Ambient Watermark Badges */}
        {/* Left Side: Real WAEC Result Slip Watermark */}
        <div className="absolute top-24 -left-14 sm:-left-10 lg:left-6 w-44 sm:w-56 lg:w-64 h-60 sm:h-72 lg:h-80 rounded-2xl bg-white/40 lg:bg-white/75 backdrop-blur-xs lg:backdrop-blur-md border border-slate-200/60 lg:border-slate-200/80 shadow-sm lg:shadow-lg p-2 -rotate-6 opacity-35 sm:opacity-50 lg:opacity-75 transition-transform pointer-events-none lg:pointer-events-auto">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-50/80 border border-slate-100">
            <Image
              src="/images/waec-result-slip.png"
              alt="Official WAEC Result Slip"
              fill
              className="object-contain object-top"
            />
          </div>
          <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-semibold whitespace-nowrap shadow-xs">
            Official WAEC Slip
          </div>
        </div>

        {/* Right Side: Real Ghana Universities Grid Watermark */}
        <div className="absolute top-36 -right-14 sm:-right-10 lg:right-6 w-44 sm:w-56 lg:w-64 h-60 sm:h-72 lg:h-80 rounded-2xl bg-white/40 lg:bg-white/75 backdrop-blur-xs lg:backdrop-blur-md border border-slate-200/60 lg:border-slate-200/80 shadow-sm lg:shadow-lg p-2 rotate-6 opacity-35 sm:opacity-50 lg:opacity-75 transition-transform pointer-events-none lg:pointer-events-auto">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-50/80 border border-slate-100">
            <Image
              src="/images/ghana-universities.png"
              alt="Ghana Universities Portals"
              fill
              className="object-contain object-center"
            />
          </div>
          <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-semibold whitespace-nowrap shadow-xs">
            UG • KNUST • UCC
          </div>
        </div>

        {/* 6. Abstract Floating Geometric Wireframe Rings */}
        <div className="absolute top-20 left-2 w-28 sm:w-36 h-28 sm:h-36 rounded-full border border-slate-900/[0.05] border-dashed" />
        <div className="absolute bottom-24 right-4 w-36 sm:w-48 h-36 sm:h-48 rounded-full border border-slate-900/[0.05]" />

      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            <Suspense
              fallback={
                <div className="py-20 text-center text-slate-500">
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Loading Student Portal...</p>
                </div>
              }
            >
              <StudentPortalHub />
            </Suspense>
          </div>
        </main>

        <Footer />
      </div>

    </div>
  );
}
