"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export function Navbar() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <header className="w-full border-b border-white/5 bg-[#080d1a]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm shrink-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Nogadex Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            nogadex<span className="text-red-500">.</span>
          </span>
        </Link>

        {/* WhatsApp Support Link */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Hello Nogadex Consults, I need assistance with checking my WAEC result."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Support</span>
        </a>

      </div>
    </header>
  );
}
