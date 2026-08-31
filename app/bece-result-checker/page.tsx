import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";

export const metadata: Metadata = {
  title: "BECE Result Checker Ghana 2025 | Buy Voucher & Check School Placement",
  description:
    "Check your 2025 BECE School and Private results online in Ghana. Get your official printable PDF result slip for Senior High School (SHS) placement.",
  alternates: {
    canonical: "https://nogadexconsults.app/bece-result-checker",
  },
  openGraph: {
    title: "BECE Result Checker Ghana 2025 | Nogadex Consults",
    description:
      "Instant BECE results checking with official printable PDF slip delivery. GH₵30.00.",
    url: "https://nogadexconsults.app/bece-result-checker",
    images: ["/images/real/bece-exam-hall.png"],
  },
};

export default function BeceResultCheckerPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white overflow-x-hidden">
      <PageBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            {/* Primary Semantic H1 for Bingbot & Search Engine Indexing */}
            <h1 className="sr-only">
              BECE Result Checker Ghana 2025 — Check Basic Education Certificate Examination Results
            </h1>

            {/* Authentic Ghanaian Hero Banner */}
            <div className="mb-5 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs">
              <div className="relative h-44 sm:h-52 w-full">
                <Image
                  src="/images/real/bece-exam-hall.png"
                  alt="BECE Candidates Ghana"
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 tracking-wide uppercase inline-block mb-1">
                    BECE 2025 Portal
                  </span>
                  <h2 className="text-sm sm:text-base font-bold leading-tight">
                    Check BECE Results &amp; SHS Placement
                  </h2>
                  <p className="text-[11px] text-slate-300 pt-0.5">
                    Official printable result slips delivered directly to Email &amp; WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="py-20 text-center text-slate-500">
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Loading BECE Portal...</p>
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
