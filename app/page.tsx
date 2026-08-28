import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentForm } from "@/components/StudentForm";
import { Check, MessageCircle, Shield, Award, Clock } from "lucide-react";

export default function HomePage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-8">
          
          {/* Header intro */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/80 mb-1">
              <Award className="w-3.5 h-3.5 text-red-600" />
              <span>Official WAEC Result Delivery Service</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-[-0.02em] text-slate-900">
              WAEC Result Checker &amp; PDF Delivery
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We check your official WAEC grades and send a high-resolution, printable PDF certificate directly to your email inbox.
            </p>
          </div>

          {/* Form Card (The Core Product) */}
          <StudentForm />

          {/* What You Receive */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 space-y-3.5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
              What your GH₵30.00 fee covers
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Official WAEC Scratch Card:</strong> A genuine, unused voucher PIN is purchased and used for your check.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Certified PDF Certificate:</strong> High-resolution document ready for university and polytechnic admissions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Instant Email Dispatch:</strong> Delivered directly to your inbox with a copy stored in your tracking link.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">WhatsApp Agent Support:</strong> Direct desk support if you have any questions or made a typo in your index number.</span>
              </li>
            </ul>
          </div>

          {/* Student FAQs */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Frequently Asked Questions
            </h2>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-sm">
                <div className="font-semibold text-slate-900">How long does delivery take?</div>
                <div>Results are checked and dispatched within 2 to 5 minutes once payment is confirmed via Mobile Money or Card.</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-sm">
                <div className="font-semibold text-slate-900">Can I use this PDF for university admission applications?</div>
                <div>Yes. The generated PDF displays your candidate photo, school name, subject grades, and official verification serials suitable for printing and upload to KNUST, UG, UCC, or other tertiary portals.</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-sm">
                <div className="font-semibold text-slate-900">What if my index number is incorrect?</div>
                <div>Contact our support desk on WhatsApp (+{whatsappNumber}) with your payment reference and we will immediately update your details before checking.</div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Link */}
          <div className="text-center pt-2 pb-4">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Need help or have questions? WhatsApp +{whatsappNumber}</span>
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
