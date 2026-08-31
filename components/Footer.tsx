import Link from "next/link";
import { WhatsAppOutlineIcon } from "./WhatsAppIcon";

export function Footer() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <footer className="border-t border-slate-200/90 bg-white/80 backdrop-blur-xs text-slate-500 py-8 mt-auto">
      <div className="max-w-lg mx-auto px-5 sm:px-6 space-y-4">

        {/* Main Brand & Contact Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <span>© {new Date().getFullYear()} Nogadex</span>
            <span className="text-red-600">Consults</span>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-slate-800 text-xs font-semibold transition-colors shadow-2xs"
          >
            <WhatsAppOutlineIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>+233 534 908 166</span>
          </a>
        </div>

        {/* Clean Modern Navigation Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-xs pt-2 border-t border-slate-100 font-medium">
          <Link
            href="/terms"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            Privacy Policy
          </Link>
          <a
            href="https://www.trustpilot.com/review/nogadexconsults.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
          >
            <span>Trustpilot Reviews</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">★ 4.9</span>
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
          Nogadex Consults is an independent educational consultancy. WAEC is a registered trademark of the West African Examinations Council. We are not affiliated with or endorsed by WAEC.
        </p>

      </div>
    </footer>
  );
}
