import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, FileText, ArrowRight, Smartphone, ShieldCheck, Zap, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Check WAEC Results on Your Phone in Ghana (Step-by-Step Guide)",
  description:
    "Complete step-by-step guide to checking WASSCE, NOVDEC, and BECE results directly on your smartphone in Ghana without visiting a cyber cafe.",
  alternates: {
    canonical: "https://nogadexconsults.app/how-to-check-waec-result-on-phone",
  },
  openGraph: {
    title: "How to Check WAEC Results on Your Phone in Ghana | Nogadex Consults",
    description:
      "Learn how to check your WAEC results and download your printable PDF slip directly on your smartphone in 2 minutes.",
    url: "https://nogadexconsults.app/how-to-check-waec-result-on-phone",
  },
};

export default function HowToCheckWaecResultOnPhonePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Article Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Mobile Guide for Ghanaian Students &amp; Parents</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How to Check Your <span className="text-red-600">WAEC Results on Phone</span> &amp; Save PDF Slip
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            You no longer need to spend money traveling to a cyber cafe or waiting in long queues. Here is the complete 2-minute guide to checking your WASSCE, NOVDEC, or BECE results directly on your smartphone.
          </p>
        </div>

        {/* Detailed Guide Content */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono">1</span>
              <span>Visit Nogadex Consults on Your Mobile Browser</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Open Chrome, Safari, or your phone browser and go to <Link href="/" className="text-red-600 font-bold hover:underline">nogadexconsults.app</Link>. The platform works on all Android and iOS smartphones.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono">2</span>
              <span>Enter Your 10-Digit WAEC Candidate Details</span>
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
              <li><strong>Index Number:</strong> Enter your exact 10-digit candidate index number (e.g. 0010101928).</li>
              <li><strong>Exam Type:</strong> Select WASSCE (School), WASSCE Private (NOVDEC), or BECE.</li>
              <li><strong>Exam Year:</strong> Select the year you wrote the exam (e.g. 2025).</li>
              <li><strong>Date of Birth:</strong> Enter your Day, Month, and Year of birth.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono">3</span>
              <span>Pay GH₵30.00 via MTN MoMo / Telecel Cash</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Approve the instant Mobile Money prompt on your phone. You will receive an immediate SMS confirmation from your network provider.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono">4</span>
              <span>Download Your Official Printable PDF Result Slip</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Within minutes, your authentic result slip is delivered directly to your email inbox and available for 1-tap download on your screen. You can save it to Google Drive or print it whenever needed.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
          <h2 className="text-lg sm:text-xl font-bold">Ready to check your result on your phone?</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Experience fast, reliable WAEC checking with instant PDF delivery.
          </p>
          <div className="pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Check WAEC Result on Phone (GH₵30)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
