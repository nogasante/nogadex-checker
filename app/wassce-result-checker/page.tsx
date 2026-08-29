import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, FileText, ArrowRight, Smartphone, ShieldCheck, Zap, HelpCircle } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-red-600" />
            <span>Official 2025 WASSCE Portal Verification</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Check Your <span className="text-red-600">WASSCE Results</span> &amp; Get an Official Printable PDF Slip
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            No need to travel to a cyber café or struggle with slow portals. Enter your index number, pay securely via Mobile Money, and download your authentic WAEC result slip PDF instantly.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
            >
              <span>Check WASSCE Result Now</span>
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
            <h2 className="font-bold text-sm text-slate-900">Official PDF Slip</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formatted high-resolution result slip ready for university admissions and printing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">Instant MoMo Payment</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pay with MTN Mobile Money, Telecel Cash, or AT Money directly from your phone.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">Direct WAEC Verification</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Authenticated directly against the Ghana WAEC Direct central database records.
            </p>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
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
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 text-xs sm:text-sm">
              <h3 className="font-bold text-slate-900">Can I use this result slip for university admission?</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Yes. The downloaded PDF contains your authentic WAEC grades, subjects, candidate photo area, and official verification details accepted by Ghanaian universities (Legon, KNUST, UCC, etc.).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 text-xs sm:text-sm">
              <h3 className="font-bold text-slate-900">How long does delivery take?</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Requests are typically fulfilled in 2 to 5 minutes. You can also monitor real-time progress on your tracking screen.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
          <h2 className="text-lg sm:text-xl font-bold">Ready to check your WASSCE results?</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Get your genuine printable WAEC result slip delivered straight to your email.
          </p>
          <div className="pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Get Your Result Slip Now (GH₵30)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
