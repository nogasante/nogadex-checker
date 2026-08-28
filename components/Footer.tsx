import Image from "next/image";
import { MessageCircle } from "lucide-react";

export function Footer() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 py-10 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm shrink-0">
                <Image
                  src="/logo.png"
                  alt="Nogadex Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                Nogadex <span className="text-red-600">Consults</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
              Fast, reliable WAEC Result Checking and direct PDF delivery services across Ghana for WASSCE, NOVDEC, BECE, GBCE, and ABCE candidates.
            </p>
          </div>

          {/* Col 2: Examinations Supported */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">
              Examinations
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>WASSCE (School)</li>
              <li>NOVDEC (Private)</li>
              <li>BECE (School &amp; Private)</li>
              <li>GBCE &amp; ABCE</li>
            </ul>
          </div>

          {/* Col 3: Support & Contact */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">
              Support
            </h4>
            <div className="space-y-1.5 text-xs">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> +{whatsappNumber}
              </a>
              <p className="text-slate-500">
                results@results.nogadexconsults.app
              </p>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-6 space-y-3 text-xs text-slate-400">
          <p className="text-[11px] leading-relaxed text-slate-500">
            <strong className="text-slate-700">Disclaimer:</strong> Nogadex Consults is an independent educational consultancy providing result-checking and PDF document formatting services using legitimate scratch cards. WAEC is a registered trademark of the West African Examinations Council. Nogadex Consults is not affiliated with or endorsed by WAEC.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 text-slate-400">
            <p>&copy; {new Date().getFullYear()} Nogadex Consults. All rights reserved.</p>
            <span>Official Result Checking &amp; PDF Service (GH₵30.00)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
