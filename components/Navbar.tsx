"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export function Navbar() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 select-none">
          <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0">
            <Image
              src="/logo.png"
              alt="Nogadex Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            Nogadex Consults
          </span>
        </Link>

        {/* Minimal Support Link */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp Support</span>
        </a>

      </div>
    </header>
  );
}
