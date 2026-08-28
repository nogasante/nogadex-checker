import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentForm } from "@/components/StudentForm";
import {
  FileText,
  MailCheck,
  ShieldCheck,
  Zap,
  CheckCircle,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main Hero & Form Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Hero Content */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  Official Nogadex Consults Checker Service
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  Get your <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">WAEC Result</span> checked &amp; receive a <span className="underline decoration-blue-500 underline-offset-4">PDF copy</span> by email.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Avoid the hassle of buying scratch cards and navigating complicated portals. We legitimately check your WAEC examination result and deliver the official PDF copy straight to your email.
                </p>

                {/* Value Props Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-sm text-slate-200 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WASSCE &amp; NOVDEC</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-200 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>BECE (School &amp; Private)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-200 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Legitimate Vouchers Used</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-200 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <MailCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Attached Result PDF</span>
                  </div>
                </div>

                {/* Pricing summary */}
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                      GH₵
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">All-Inclusive Service</div>
                      <div className="text-xs text-slate-400">Voucher cost + PDF delivery included</div>
                    </div>
                  </div>
                  <div className="text-xl font-black text-cyan-300">GH₵30.00</div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-6">
                <StudentForm />
              </div>

            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-slate-950/60 border-y border-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                How The Service Works
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Fast, seamless, and automated tracking from payment to PDF delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="glass-card p-6 rounded-2xl relative">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-black text-lg mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Provide Candidate Info</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Enter your index number, exam type, year, date of birth, and email address where your PDF will be sent.
                </p>
              </div>

              {/* Step 2 */}
              <div className="glass-card p-6 rounded-2xl relative">
                <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-black text-lg mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Pay GH₵30 via Paystack</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Complete your payment securely using MTN MoMo, Telecel Cash, AT Money, or Bank Card with instant verification.
                </p>
              </div>

              {/* Step 3 */}
              <div className="glass-card p-6 rounded-2xl relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-lg mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Receive Result PDF</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Our team checks your result using legitimate WAEC vouchers, generates your PDF document, and emails it to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-400" /> Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-5 rounded-xl">
              <h3 className="text-base font-semibold text-white mb-1">
                How long does it take to receive my result PDF?
              </h3>
              <p className="text-sm text-slate-400">
                Once payment is confirmed, your request is queued for processing. Results are typically processed and emailed within a few minutes during active hours.
              </p>
            </div>

            <div className="glass-card p-5 rounded-xl">
              <h3 className="text-base font-semibold text-white mb-1">
                Do I need to buy a separate WAEC scratch card?
              </h3>
              <p className="text-sm text-slate-400">
                No! The GH₵30 fee covers both the legitimate WAEC result checker voucher and the PDF generation &amp; email delivery.
              </p>
            </div>

            <div className="glass-card p-5 rounded-xl">
              <h3 className="text-base font-semibold text-white mb-1">
                What payment methods are supported?
              </h3>
              <p className="text-sm text-slate-400">
                We accept all Ghanaian Mobile Money networks (MTN Mobile Money, Telecel Cash, AT Money) and debit/credit cards (Visa, Mastercard) through Paystack.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
