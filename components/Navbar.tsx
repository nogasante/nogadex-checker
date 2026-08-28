import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export function Navbar() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group select-none">
          <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Nogadex Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-base font-bold text-slate-900 tracking-tight">
            nogadex<span className="text-red-600">.consults</span>
          </span>
        </Link>

        {/* WhatsApp Helpline */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 transition-all cursor-pointer select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Support Desk</span>
        </a>

      </div>
    </header>
  );
}
