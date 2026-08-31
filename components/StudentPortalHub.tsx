"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { StudentForm } from "./StudentForm";
import { VoucherOnlyCard } from "./VoucherOnlyCard";
import { PaymentChannelsBar } from "./PaymentLogos";
import { WhatsAppOutlineIcon } from "./WhatsAppIcon";
import { TrackSlipModal } from "./TrackSlipModal";
import {
  ArrowLeft,
} from "lucide-react";

export function StudentPortalHub() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") as "check" | "voucher" | null;
  
  const [selectedService, setSelectedService] = useState<"none" | "check" | "voucher">(
    initialService && ["check", "voucher"].includes(initialService) ? initialService : "none"
  );
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  const handleSelectService = (service: "check" | "voucher") => {
    setSelectedService(service);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  const handleBackToServices = () => {
    setSelectedService("none");
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  // ─── SCREEN 1: SERVICE SELECTION (2x2 GRID WITH TRANSPARENT 3D ICONS) ───
  if (selectedService === "none") {
    return (
      <div className="space-y-6">
        
        {/* Header */}
        <div className="space-y-1.5 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            What would you like to do?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg">
            Select a service below to check your WAEC results, purchase genuine scratch cards, or track an existing order.
          </p>
        </div>

        {/* 2x2 Grid with Floating 3D Transparent Icons */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4.5">
          
          {/* Card 1: Check Result & Get PDF (Top Left) */}
          <button
            type="button"
            onClick={() => handleSelectService("check")}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-colors text-left flex flex-col justify-between cursor-pointer min-h-[170px] sm:min-h-[185px] group"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0">
                <Image
                  src="/images/3d/certificate.png"
                  alt="Result Certificate"
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-mono font-bold">
                GH₵30.00
              </span>
            </div>

            <div className="space-y-1 pt-2">
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                Check Result &amp; Get PDF
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                We check &amp; deliver your official printable slip via email.
              </p>
            </div>
          </button>

          {/* Card 2: Buy Checker PIN (Top Right) */}
          <button
            type="button"
            onClick={() => handleSelectService("voucher")}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-colors text-left flex flex-col justify-between cursor-pointer min-h-[170px] sm:min-h-[185px] group"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0">
                <Image
                  src="/images/3d/key.png"
                  alt="Checker PIN"
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-mono font-bold">
                GH₵24.00
              </span>
            </div>

            <div className="space-y-1 pt-2">
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                Buy PIN Only
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                Genuine WAEC Scratch Card PIN sent instantly via SMS.
              </p>
            </div>
          </button>

          {/* Card 3: Track Existing Order (Bottom Left) */}
          <button
            type="button"
            onClick={() => setIsTrackModalOpen(true)}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-colors text-left flex flex-col justify-between cursor-pointer min-h-[170px] sm:min-h-[185px] group"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0">
                <Image
                  src="/images/3d/search.png"
                  alt="Track Order Search"
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-medium">
                Live Status
              </span>
            </div>

            <div className="space-y-1 pt-2">
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                Track Existing Order
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                Check status or re-download your PDF slip.
              </p>
            </div>
          </button>

          {/* Card 4: University Admissions (Bottom Right) */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance%20with%20my%20university%20admission%20form`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-colors text-left flex flex-col justify-between cursor-pointer min-h-[170px] sm:min-h-[185px] group"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0">
                <Image
                  src="/images/3d/grad.png"
                  alt="Admissions Graduation"
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] sm:text-[11px] font-bold">
                Free
              </span>
            </div>

            <div className="space-y-1 pt-2">
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                Admissions Guidance
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                UG, KNUST &amp; UCC cut-off forms assistance.
              </p>
            </div>
          </a>

        </div>

        {/* Ghanaian Payment Channels Bar */}
        <PaymentChannelsBar />

        {/* Track Modal when Card 3 is clicked */}
        <TrackSlipModal
          isOpen={isTrackModalOpen}
          onClose={() => setIsTrackModalOpen(false)}
        />

      </div>
    );
  }

  // ─── SCREEN 2: FOCUSED SERVICE VIEW ───
  return (
    <div className="space-y-6">
      
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={handleBackToServices}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Service</span>
        </button>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">
        
        {/* VIEW A: CHECK RESULT & GET PDF */}
        {selectedService === "check" && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Check WAEC Result &amp; Get PDF
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                Enter your exam details below. We retrieve your grades and email a printable PDF result slip in 2–5 minutes.
              </p>
            </div>

            <StudentForm />
          </div>
        )}

        {/* VIEW B: BUY PIN ONLY */}
        {selectedService === "voucher" && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Buy WAEC Checker PIN (GH₵24.00)
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                Authentic WAEC Scratch Card Serial &amp; PIN with instant SMS and WhatsApp delivery.
              </p>
            </div>

            <VoucherOnlyCard onSwitchToPdf={() => setSelectedService("check")} />
          </div>
        )}

      </div>

      {/* Support Link */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
        <span>Have a question?</span>
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-slate-800 hover:text-slate-950 bg-slate-100/90 hover:bg-slate-200/80 px-3 py-1 rounded-full border border-slate-200 transition-colors shadow-2xs"
        >
          <WhatsAppOutlineIcon className="w-3.5 h-3.5 text-emerald-600 inline" />
          <span>WhatsApp Help Desk (+233 534 908 166)</span>
        </a>
      </div>

      {/* Track Modal */}
      <TrackSlipModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />

    </div>
  );
}
