import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, FileText, ArrowRight, Smartphone, ShieldCheck, Zap, HelpCircle } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-red-600" />
            <span>NOVDEC / WASSCE Private Candidate Verification</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Check Your <span className="text-red-600">NOVDEC Results</span> &amp; Download Printable PDF Slip
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Quickly check your WASSCE Private (NOVDEC) examination grades online without traveling to a WAEC office or cyber cafe. Pay via MoMo and receive your verified slip in minutes.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
            >
              <span>Check NOVDEC Result Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">Printable Result Slip</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Official document format complete with grades, subject breakdown, and verification IDs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">Mobile Money Checkout</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant checkout with MTN MoMo, Telecel Cash, and AT Money directly on your phone.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">100% Genuine WAEC Data</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verified directly against official Ghana WAEC records for private candidates.
            </p>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
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

        {/* Bottom CTA */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
          <h2 className="text-lg sm:text-xl font-bold">Need your NOVDEC result slip today?</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Check your grades and download your official printable PDF result slip now.
          </p>
          <div className="pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Check NOVDEC Result (GH₵30)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
