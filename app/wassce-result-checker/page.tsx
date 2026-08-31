import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";

export const metadata: Metadata = {
  title: "WASSCE Result Checker 2025 Ghana | Buy Voucher & Download PDF Slip",
  description:
    "Check your 2025 WASSCE School results online and receive your official printable PDF result slip delivered directly to your email and phone. Fast & secure MoMo payment.",
  alternates: {
    canonical: "https://nogadexconsults.app/wassce-result-checker",
  },
  openGraph: {
    title: "WASSCE Result Checker 2025 Ghana | Nogadex Consults",
    description:
      "Instant 2025 WASSCE results checking with official printable PDF slip delivery to your email and phone. GH₵30.00.",
    url: "https://nogadexconsults.app/wassce-result-checker",
    images: ["/images/real/wassce-candidate.png"],
  },
};

export default function WassceResultCheckerPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white overflow-x-hidden">
      <PageBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            {/* Primary Semantic H1 for Bingbot & Search Engine Indexing */}
            <h1 className="sr-only">
              WASSCE Result Checker 2025 Ghana — Buy Voucher &amp; Download Printable PDF Slip
            </h1>

            {/* Authentic Ghanaian Hero Banner */}
            <div className="mb-5 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs">
              <div className="relative h-44 sm:h-52 w-full">
                <Image
                  src="/images/real/wassce-candidate.png"
                  alt="Official WASSCE Candidate Ghana"
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 tracking-wide uppercase inline-block mb-1">
                    WASSCE 2025 Portal
                  </span>
                  <h2 className="text-sm sm:text-base font-bold leading-tight">
                    Check WASSCE Results &amp; Download PDF Slip
                  </h2>
                  <p className="text-[11px] text-slate-300 pt-0.5">
                    Fast grades retrieval with instant delivery to Email &amp; WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="py-20 text-center text-slate-500">
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Loading WASSCE Portal...</p>
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
