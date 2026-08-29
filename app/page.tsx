import { Suspense } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentPortalHub } from "@/components/StudentPortalHub";
import { PageBackground } from "@/components/PageBackground";

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Shared Lightweight Ambient Background */}
      <PageBackground />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            {/* Primary Semantic H1 for Bingbot & Search Engine Indexing */}
            <h1 className="sr-only">
              WAEC Result Checker &amp; Printable PDF Delivery Portal Ghana — WASSCE, BECE &amp; NOVDEC
            </h1>

            <Suspense
              fallback={
                <div className="py-20 text-center text-slate-500">
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-3" />
                  <h2 className="text-xs font-medium">Loading Student Portal...</h2>
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
