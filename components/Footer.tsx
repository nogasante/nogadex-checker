import Link from "next/link";
import { ShieldCheck, Clock, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <footer className="border-t border-slate-800 bg-[#080c14] text-slate-400 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-white font-bold text-base">Nogadex Consults</h3>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              We provide fast, reliable WAEC Result Checking and direct PDF delivery services across Ghana for WASSCE, NOVDEC, BECE, GBCE, and ABCE candidates.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Legitimate Vouchers
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Clock className="w-4 h-4" /> Prompt Email Delivery
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Examinations</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors">WASSCE (School Candidates)</li>
              <li className="hover:text-white transition-colors">WASSCE Private (NOVDEC)</li>
              <li className="hover:text-white transition-colors">BECE (School &amp; Private)</li>
              <li className="hover:text-white transition-colors">GBCE &amp; ABCE</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Support &amp; Contact</h4>
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> +{whatsappNumber}
              </a>
              <p className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-slate-500" /> results@nogadex.com
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Mon - Sat: 8:00 AM - 10:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Nogadex Consults. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Official Result Checker Service (GH₵30.00)</span>
            <Link href="/admin" className="hover:text-slate-400 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
