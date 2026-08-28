"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrackSlipModal } from "./TrackSlipModal";

export function Navbar() {
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <div className="w-6 h-6 rounded-md overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="Nogadex"
                width={24}
                height={24}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="text-[15px] font-semibold text-gray-900">
              Nogadex Consults
            </span>
          </Link>

          {/* Single action — plain text link */}
          <button
            onClick={() => setIsTrackOpen(true)}
            className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Track order
          </button>

        </div>
      </header>

      <TrackSlipModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </>
  );
}
