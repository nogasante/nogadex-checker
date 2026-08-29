import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";
import { CheckCircle2, FileText, Smartphone, ShieldCheck, HelpCircle } from "lucide-react";

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
                <h2 className="font-bold text-sm text-slate-900">Official PDF Slip</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Formatted high-resolution WASSCE result slip ready for university admissions and printing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">Instant MoMo Payment</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pay with MTN Mobile Money, Telecel Cash, or AT Money directly from your phone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">Direct WAEC Verification</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Authenticated directly against the Ghana WAEC Direct central database records.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-600" />
                <span>How to Check WASSCE Results with Nogadex</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-red-600 uppercase">Step 01</span>
                  <h3 className="font-bold text-slate-900">Enter Details</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Provide your 10-digit WASSCE Index Number, Exam Year (e.g. 2025), and Date of Birth.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-red-600 uppercase">Step 02</span>
                  <h3 className="font-bold text-slate-900">Pay via MoMo</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Complete the GH₵30.00 verification fee securely on your phone via Paystack.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-red-600 uppercase">Step 03</span>
                  <h3 className="font-bold text-slate-900">Get Your PDF</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Your printable PDF result slip is emailed to you and ready for immediate download.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-slate-700" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 space-y-1 text-xs sm:text-sm">
                  <h3 className="font-bold text-slate-900">Can I use this result slip for university admission?</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Yes. The downloaded PDF contains your authentic WAEC grades, subjects, candidate photo area, and official verification details accepted by Ghanaian universities (Legon, KNUST, UCC, etc.).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 space-y-1 text-xs sm:text-sm">
                  <h3 className="font-bold text-slate-900">How long does delivery take?</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Requests are typically fulfilled in 2 to 5 minutes. You can also monitor real-time progress on your tracking screen.
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
