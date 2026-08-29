import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";
import { FileText, Smartphone, ShieldCheck } from "lucide-react";

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
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden">
      <PageBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
          {/* Same form as homepage */}
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

          {/* SEO Content Below the Form */}
          <div className="max-w-4xl mx-auto mt-16 space-y-10">
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">SHS Ready PDF Slip</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear document formatted with all BECE subject grades, raw scores, and candidate verification IDs for SHS placement.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">Parent-Friendly MoMo</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Parents can pay seamlessly using MTN Mobile Money, Telecel Cash, or AT Money from any phone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">Official WAEC Direct</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verified directly against the official Basic Education Certificate Examination database.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
