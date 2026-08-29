import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";

export const metadata: Metadata = {
  title: "NOVDEC Result Checker Online Ghana | Buy WASSCE Private Checker",
  description:
    "Check your NOVDEC / WASSCE Private candidate results online in Ghana. Instant Mobile Money payment and printable PDF slip delivery directly to your phone.",
  alternates: {
    canonical: "https://nogadexconsults.app/novdec-result-checker",
  },
  openGraph: {
    title: "NOVDEC Result Checker Online Ghana | Nogadex Consults",
    description:
      "Instant NOVDEC WASSCE Private results checking with official printable PDF slip delivery. GH₵30.00.",
    url: "https://nogadexconsults.app/novdec-result-checker",
  },
};

export default function NovdecResultCheckerPage() {
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
