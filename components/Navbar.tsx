"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Search } from "lucide-react";
import { TrackSlipModal } from "./TrackSlipModal";

export function Navbar() {
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          
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

          {/* Solid Professional Actions (Zero Translucent / Pastel AI Buttons) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTrackOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Slip</span>
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">Help</span>
            </a>
          </div>

        </div>
      </header>

      <TrackSlipModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </>
  );
}
