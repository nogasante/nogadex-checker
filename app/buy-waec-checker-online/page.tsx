import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { CheckCircle2, KeyRound, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Buy WAEC Result Checker Online with MoMo (MTN, Telecel, AT) | Nogadex",
  description:
    "Buy genuine WAEC, WASSCE, NOVDEC, and BECE result checker PIN vouchers online in Ghana with instant MoMo delivery. Reliable wholesale pricing.",
  alternates: {
    canonical: "https://nogadexconsults.app/buy-waec-checker-online",
  },
  openGraph: {
    title: "Buy WAEC Result Checker Online with MoMo | Nogadex Consults",
    description:
      "Buy authentic WAEC result checker vouchers online with instant MoMo delivery. Starting from GH₵18.00.",
    url: "https://nogadexconsults.app/buy-waec-checker-online",
  },
};

export default function BuyWaecCheckerOnlinePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden">
      <PageBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
              <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Voucher Delivery via MoMo</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Buy <span className="text-red-600">WAEC Result Checker Vouchers</span> Online in Ghana
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Purchase genuine WAEC Serial &amp; PIN vouchers for WASSCE, NOVDEC, and BECE results. Instant payment with MTN Mobile Money, Telecel Cash, and AT Money with immediate SMS &amp; screen display.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                <span>Buy Checker Voucher Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pricing Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Option A</span>
                <h2 className="text-base font-bold text-slate-900">Buy Checker PIN Only</h2>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  GH₵18.00 <span className="text-xs font-normal text-slate-500">/ PIN</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant Serial &amp; PIN delivered to screen</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Can be used up to 3 times on waecdirect.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Supports WASSCE, NOVDEC, and BECE</span>
                </li>
              </ul>
              <Link
                href="/"
                className="block text-center py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                Select PIN Only
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-red-500/80 shadow-md space-y-4 relative">
              <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Option B</span>
                <h2 className="text-base font-bold text-slate-900">Full PDF Result Slip Delivery</h2>
                <div className="text-2xl font-extrabold text-red-600 font-mono">
                  GH₵30.00 <span className="text-xs font-normal text-slate-500">/ Complete Service</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Includes genuine WAEC voucher code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>We check and verify your result on WAEC</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>High-resolution printable PDF sent to your email</span>
                </li>
              </ul>
              <Link
                href="/"
                className="block text-center py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                Get Full PDF Slip (Recommended)
              </Link>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
            <h2 className="text-lg sm:text-xl font-bold">Buy genuine WAEC vouchers instantly</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
              Pay safely with MTN MoMo, Telecel Cash, or AT Money with instant fulfillment.
            </p>
            <div className="pt-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Buy Checker Now</span>
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
