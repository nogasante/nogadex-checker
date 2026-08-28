import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentForm } from "@/components/StudentForm";
import {
  FileText,
  MailCheck,
  ShieldCheck,
  Zap,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

export default function HomePage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <div className="flex flex-col min-h-screen bg-[#080d1a] text-slate-100 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Header intro */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white">
              Check WAEC Results &amp; PDF
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              We check your results using official WAEC vouchers and email you the printable PDF copy for GH₵30.00.
            </p>
          </div>

          {/* Form Card (The Core Product) */}
          <StudentForm />

          {/* Key Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-slate-200">Official Vouchers</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Legitimate WAEC pins</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <MailCheck className="w-4 h-4 text-red-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-slate-200">PDF Delivery</div>
              <div className="text-[11px] text-slate-400 mt-0.5">High-res &amp; printable</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <Zap className="w-4 h-4 text-cyan-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-slate-200">2-Min Turnaround</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Fast email dispatch</div>
            </div>
          </div>

          {/* FAQ Accordion / Notes */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Frequently Asked Questions
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="font-semibold text-slate-200 block">Do I need to buy a separate scratch card?</span>
                <span className="text-slate-400 mt-0.5 block">No. The GH₵30.00 fee covers the official voucher pin and the PDF delivery.</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="font-semibold text-slate-200 block">Can I print the PDF for university admissions?</span>
                <span className="text-slate-400 mt-0.5 block">Yes! The PDF contains your full certified subject grades ready for university applications.</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Reassurance */}
          <div className="text-center pt-2 pb-4">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Questions? WhatsApp our desk at +{whatsappNumber}</span>
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
