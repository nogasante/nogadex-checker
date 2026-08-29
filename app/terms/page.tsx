import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Disclaimer | Nogadex Consults",
  description: "Terms of Service, legal disclaimers, and service policies for Nogadex Consults WAEC checking services in Ghana.",
};

export default function TermsPage() {
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
              <div className="flex items-center gap-2 text-red-600 font-semibold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Legal &amp; Policy</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Terms of Service &amp; Disclaimer
              </h1>
              <p className="text-xs text-slate-500">
                Last updated: August 2026 • Ghana Jurisdiction
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
              <strong>Official Disclaimer:</strong> Nogadex Consults is an independent educational consultancy operated in Ghana. WAEC (West African Examinations Council) is a registered trademark of the West African Examinations Council. Nogadex Consults is not affiliated with, authorized, or operated by WAEC. We provide independent result-checking assistance and scratch card provisioning.
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                By accessing Nogadex Consults, placing an order for a WAEC result check, or purchasing a WAEC Checker PIN, you agree to be bound by these Terms of Service.
              </p>

              <h2 className="text-base font-bold text-slate-900">2. Scope of Services</h2>
              <p>
                Nogadex Consults offers two distinct services:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Check Result &amp; PDF Slip (GH₵30):</strong> We retrieve and verify your examination grades from the official WAEC database and deliver a high-resolution, printable PDF result slip directly to your <strong>Email address</strong>. You can also view or re-download your slip anytime via our Track Order portal.</li>
                <li><strong>Buy Checker PIN (GH₵24):</strong> We provision authentic WAEC Scratch Card vouchers delivered instantly via <strong>SMS</strong> and displayed on-screen for self-checking on waecdirect.org.</li>
              </ul>

              <h2 className="text-base font-bold text-slate-900">3. Accurate Candidate Information</h2>
              <p>
                You are responsible for ensuring that the Index Number, Exam Type, Exam Year, and Date of Birth provided are correct. If incorrect candidate information is submitted, the card voucher may be utilized by the WAEC verification server and cannot be reversed.
              </p>

              <h2 className="text-base font-bold text-slate-900">4. Examination Council Decisions &amp; Grades</h2>
              <p>
                Nogadex Consults has no control over grades, subject scores, or result withholding enacted by the West African Examinations Council. Results retrieved reflect the official status on the WAEC database at the time of the query.
              </p>

              <h2 className="text-base font-bold text-slate-900">5. Payment Security &amp; Refunds</h2>
              <p>
                All payments are handled securely through Paystack (PCI-DSS compliant). Due to the irreversible delivery of cryptographic scratch card serials and PINs, digital vouchers once delivered to your screen or via SMS are non-refundable.
              </p>

              <h2 className="text-base font-bold text-slate-900">6. Customer Support</h2>
              <p>
                For assistance, contact our verified support team on WhatsApp at <strong>+233 534 908 166</strong>.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
