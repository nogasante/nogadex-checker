import { Suspense } from "react";
import { Metadata } from "next";
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
  },
};

export default function WassceResultCheckerPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white overflow-x-hidden">
      <PageBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            <Suspense
              fallback={
                <div className="py-20 text-center text-slate-500">
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Loading...</p>
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
