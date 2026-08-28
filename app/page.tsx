import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentForm } from "@/components/StudentForm";
import { ShieldCheck, Mail, Zap, MessageCircle } from "lucide-react";

export default function HomePage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-lg mx-auto space-y-6">
          
          {/* Main Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-slate-900">
              Check WAEC Result &amp; Get PDF
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Fast, genuine result verification for WASSCE, BECE, and NOVDEC. Delivered directly to your email.
            </p>
          </div>

          {/* Checkout Card */}
          <StudentForm />

          {/* Key Value Points (Direct & Authentic) */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <ShieldCheck className="w-4 h-4 text-slate-700 mx-auto" />
              <div className="text-[11px] font-bold text-slate-900">Genuine PIN</div>
              <div className="text-[10px] text-slate-500">Unused WAEC voucher</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <Mail className="w-4 h-4 text-slate-700 mx-auto" />
              <div className="text-[11px] font-bold text-slate-900">Email Delivery</div>
              <div className="text-[10px] text-slate-500">Clean printable PDF</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <Zap className="w-4 h-4 text-slate-700 mx-auto" />
              <div className="text-[11px] font-bold text-slate-900">2-5 Minutes</div>
              <div className="text-[10px] text-slate-500">Instant check queue</div>
            </div>
          </div>

          {/* Quick FAQ / Help */}
          <div className="rounded-xl bg-white border border-slate-200/80 p-4 space-y-3 shadow-xs">
            <div className="text-xs font-bold text-slate-900">Need to know</div>
            <div className="space-y-2 text-xs text-slate-600">
              <p>
                <strong>Admission applications:</strong> The delivered PDF includes candidate details, subjects, grades, and serial numbers suitable for university and polytechnic application portals.
              </p>
              <p>
                <strong>Need help?</strong> WhatsApp our team at{" "}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  +{whatsappNumber}
                </a>{" "}
                if you need to correct an index number or check order status.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
