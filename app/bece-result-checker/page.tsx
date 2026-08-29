import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { FileText, ArrowRight, Smartphone, ShieldCheck, Zap } from "lucide-react";

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

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-red-600" />
              <span>Official BECE &amp; SHS Placement Verification</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Check Your <span className="text-red-600">BECE Results</span> &amp; Download Printable PDF Slip
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Parents and Junior High School graduates can easily check BECE results online and download a verified printable PDF result slip for SHS admission and school placement verification.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                <span>Check BECE Result Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">SHS Ready PDF Slip</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear document formatted with all subject grades, raw scores, and candidate verification IDs.
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

          {/* Bottom CTA */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
            <h2 className="text-lg sm:text-xl font-bold">Check your BECE results in minutes</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
              Get your genuine printable WAEC BECE result slip delivered straight to your email.
            </p>
            <div className="pt-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Check BECE Result (GH₵30)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
