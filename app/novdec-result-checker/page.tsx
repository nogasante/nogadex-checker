import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";
import { CheckCircle2, FileText, Smartphone, ShieldCheck } from "lucide-react";

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
                <h2 className="font-bold text-sm text-slate-900">Printable Result Slip</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official NOVDEC document format complete with grades, subject breakdown, and verification IDs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">Mobile Money Checkout</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Instant checkout with MTN MoMo, Telecel Cash, and AT Money directly on your phone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">100% Genuine WAEC Data</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verified directly against official Ghana WAEC records for private candidates.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-600" />
                <span>3 Simple Steps to Check NOVDEC Results</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-red-600 uppercase">Step 01</span>
                  <h3 className="font-bold text-slate-900">Enter Details</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Provide your 10-digit NOVDEC Index Number and select your Exam Year.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-red-600 uppercase">Step 02</span>
                  <h3 className="font-bold text-slate-900">Pay GH₵30 via MoMo</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Approve the instant Mobile Money prompt on your phone.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-red-600 uppercase">Step 03</span>
                  <h3 className="font-bold text-slate-900">Download Result Slip</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Your official printable PDF result slip is delivered straight to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
