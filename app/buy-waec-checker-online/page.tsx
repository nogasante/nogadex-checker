import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";

export const metadata: Metadata = {
  title: "Buy WAEC Result Checker Online with MoMo (MTN, Telecel, AT) | Nogadex",
  description:
    "Buy genuine WAEC, WASSCE, NOVDEC, and BECE result checker PIN vouchers online in Ghana with instant MoMo delivery. Reliable wholesale pricing.",
  alternates: {
    canonical: "https://nogadexconsults.app/buy-waec-checker-online",
  },
  openGraph: {
    title: "Buy WAEC Result Checker Online with MoMo | Nogadex Consults",
    description:
      "Buy authentic WAEC result checker vouchers online with instant MoMo delivery.",
    url: "https://nogadexconsults.app/buy-waec-checker-online",
  },
};

export default function BuyWaecCheckerOnlinePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white overflow-x-hidden">
      <PageBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            {/* Primary Semantic H1 for Bingbot & Search Engine Indexing */}
            <h1 className="sr-only">
              Buy WAEC Result Checker PIN Online Ghana — Instant MoMo Voucher Delivery
            </h1>

            <Suspense
              fallback={
                <div className="py-20 text-center text-slate-500">
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Loading Checker Purchase Portal...</p>
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
