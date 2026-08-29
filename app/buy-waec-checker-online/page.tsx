import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { StudentPortalHub } from "@/components/StudentPortalHub";
import { CheckCircle2 } from "lucide-react";

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
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
