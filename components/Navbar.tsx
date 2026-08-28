"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { TrackSlipModal } from "./TrackSlipModal";

export function Navbar() {
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 select-none group">
            <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="Nogadex"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold text-slate-900 tracking-tight">
                Nogadex <span className="text-red-600">Consults</span>
              </span>
            </div>
          </Link>

          {/* Action: Track order button */}
          <button
            onClick={() => setIsTrackOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/80 shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Track Order</span>
          </button>

        </div>
      </header>

      <TrackSlipModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </>
  );
}
