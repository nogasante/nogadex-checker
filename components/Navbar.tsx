"use client";

import Link from "next/link";
import { GraduationCap, MessageCircle, ShieldCheck } from "lucide-react";

export function Navbar() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Nogadex <span className="text-blue-400 font-medium">Consults</span>
            </span>
            <span className="block text-[10px] text-slate-400 -mt-1 font-medium tracking-wider uppercase">
              WAEC Results Checker &amp; Delivery
            </span>
          </div>
        </Link>

        {/* Action Links */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello Nogadex Consults, I have a question about the WAEC Results Checker + PDF service."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            WhatsApp Support
          </a>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Staff Portal
          </Link>
        </div>
      </div>
    </header>
  );
}
