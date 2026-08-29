import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";

export const metadata: Metadata = {
  title: "How to Check WAEC Results on Your Phone in Ghana (Step-by-Step Guide)",
  description:
    "Complete step-by-step guide to checking WASSCE, NOVDEC, and BECE results directly on your smartphone in Ghana without visiting a cyber cafe.",
  alternates: {
    canonical: "https://nogadexconsults.app/how-to-check-waec-result-on-phone",
  },
  openGraph: {
    title: "How to Check WAEC Results on Your Phone in Ghana | Nogadex Consults",
    description:
      "Learn how to check your WAEC results and download your printable PDF slip directly on your smartphone in 2 minutes.",
    url: "https://nogadexconsults.app/how-to-check-waec-result-on-phone",
  },
};

export default function HowToCheckWaecResultOnPhonePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white overflow-x-hidden">
      <PageBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            {/* Primary Semantic H1 for Bingbot & Search Engine Indexing */}
            <h1 className="sr-only">
              How to Check WAEC Results on Phone in Ghana — Step-by-Step Guide
            </h1>

            <Suspense
              fallback={
                <div className="py-20 text-center text-slate-500">
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Loading Guide...</p>
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
