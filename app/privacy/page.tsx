import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Data Protection | Nogadex Consults",
  description: "Privacy Policy and Ghana Data Protection Act 2012 compliance for Nogadex Consults WAEC portal.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-slate-900">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal</span>
          </Link>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Data Security &amp; Compliance</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Privacy Policy &amp; Data Security
              </h1>
              <p className="text-xs text-slate-500">
                Compliance with Ghana Data Protection Act, 2012 (Act 843) • 256-Bit SSL
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium">
              <strong>Data Privacy Commitment:</strong> We protect student privacy. Your examination credentials and personal contact details are encrypted in transit and are never sold, rented, or distributed to any third party.
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                We only collect data strictly necessary to fulfill your result checking request:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Candidate Index Number, Exam Type, and Year (for WAEC verification)</li>
                <li>Email address (for PDF result slip dispatch)</li>
                <li>Phone number (for SMS PIN delivery and WhatsApp support)</li>
              </ul>

              <h2 className="text-base font-bold text-slate-900">2. How Your Data Is Handled</h2>
              <p>
                Candidate data is submitted over secure, encrypted HTTPS connections directly to our verification backend. Once results are processed and delivered to you, sensitive session data is purged.
              </p>

              <h2 className="text-base font-bold text-slate-900">3. Payment Information Security</h2>
              <p>
                All financial transactions are handled exclusively by <strong>Paystack</strong>, a certified PCI-DSS Level 1 payment processor. Nogadex Consults never stores, logs, or views your Mobile Money PIN, CVV, or card numbers.
              </p>

              <h2 className="text-base font-bold text-slate-900">4. Bot Protection &amp; Scraping Prevention</h2>
              <p>
                We employ automated bot protection (client challenge verification and rate-limiting) to safeguard against automated scraping and abuse of candidate records.
              </p>

              <h2 className="text-base font-bold text-slate-900">5. Contact Us</h2>
              <p>
                For privacy inquiries or data requests, contact our privacy compliance desk on WhatsApp at <strong>+233 534 908 166</strong>.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
