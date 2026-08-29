import { Suspense } from "react";
import { Metadata } from "next";
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
  },
};

export default function BeceResultCheckerPage() {
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
