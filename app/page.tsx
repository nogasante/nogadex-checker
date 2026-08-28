import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentForm } from "@/components/StudentForm";
import { CertificateMockup } from "@/components/CertificateMockup";
import { ShieldCheck, Mail, Zap, MessageCircle } from "lucide-react";

export default function HomePage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Main 2-Column Grid (Desktop) / Vertical Stack (Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Product Value & Live Mockup (5 Cols) */}
            <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
              
              {/* Header Title on Desktop */}
              <div className="hidden lg:block space-y-2">
                <h1 className="text-3xl font-heading font-extrabold tracking-tight text-slate-900 leading-tight">
                  Check WAEC Results &amp; Receive Official PDF
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Fast, genuine verification for WASSCE, BECE, and NOVDEC candidates across Ghana. Delivered straight to your email.
                </p>
              </div>

              {/* Sample Certificate Mockup */}
              <CertificateMockup />

              {/* Trust Pillars */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <ShieldCheck className="w-4 h-4 text-slate-800 mx-auto" />
                  <div className="text-[11px] font-bold text-slate-900">Genuine PIN</div>
                  <div className="text-[10px] text-slate-500">Unused WAEC card</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <Mail className="w-4 h-4 text-slate-800 mx-auto" />
                  <div className="text-[11px] font-bold text-slate-900">Email Delivery</div>
                  <div className="text-[10px] text-slate-500">Printable PDF</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <Zap className="w-4 h-4 text-slate-800 mx-auto" />
                  <div className="text-[11px] font-bold text-slate-900">2-5 Minutes</div>
                  <div className="text-[10px] text-slate-500">Fast check queue</div>
                </div>
              </div>

              {/* Direct WhatsApp Contact */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900">Need help with an order?</div>
                  <div className="text-[11px] text-slate-500">WhatsApp our team anytime</div>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
                >
                  Chat Support
                </a>
              </div>

            </div>

            {/* Right Column: Checkout Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              
              {/* Mobile Only Header */}
              <div className="lg:hidden text-center space-y-1.5 pb-1">
                <h1 className="text-2xl font-heading font-extrabold tracking-tight text-slate-900">
                  Check WAEC Result &amp; Get PDF
                </h1>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Enter your index details to check your WASSCE, BECE, or NOVDEC grades and receive your verified PDF certificate.
                </p>
              </div>

              {/* Checkout Form */}
              <StudentForm />

            </div>

          </div>

          {/* 3-Step Process (Clean, Solid, Direct) */}
          <div className="border-t border-slate-200 pt-8 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
              How It Works
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <div className="text-xs font-bold text-slate-900">Enter Details &amp; Pay</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  Provide your WAEC Index Number, exam type, and email. Pay GH₵30.00 via MTN MoMo, Telecel, AT, or Card.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <div className="text-xs font-bold text-slate-900">Official WAEC Check</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  A genuine, unused WAEC scratch card PIN is assigned to your request and your grades are retrieved directly.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <div className="text-xs font-bold text-slate-900">Instant PDF Delivery</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  A high-resolution PDF results certificate is generated and sent to your email, ready for university application portals.
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
