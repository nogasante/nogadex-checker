"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { StudentForm } from "./StudentForm";
import { VoucherOnlyCard } from "./VoucherOnlyCard";
import { PaymentChannelsBar } from "./PaymentLogos";
import { WhatsAppOutlineIcon } from "./WhatsAppIcon";
import { TrackSlipModal } from "./TrackSlipModal";
import {
  ArrowLeft,
  AlertTriangle,
  X,
  MessageCircle,
} from "lucide-react";
import { ServiceConfig } from "@/lib/services";

export function StudentPortalHub() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") as "check" | "voucher" | null;
  
  const [selectedService, setSelectedService] = useState<"none" | "check" | "voucher">(
    initialService && ["check", "voucher"].includes(initialService) ? initialService : "none"
  );
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [disabledNoticeModal, setDisabledNoticeModal] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const [serviceStatusMap, setServiceStatusMap] = useState<Record<string, ServiceConfig>>({});
  const [loadingServices, setLoadingServices] = useState(true);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (data.services) {
            const map: Record<string, ServiceConfig> = {};
            data.services.forEach((s: ServiceConfig) => {
              map[s.key] = s;
            });
            setServiceStatusMap(map);
          }
        }
      } catch (e) {
        console.error("Error loading services:", e);
      } finally {
        setLoadingServices(false);
      }
    }
    loadServices();
  }, []);

  const checkResultService = serviceStatusMap["service_check_result"] || {
    enabled: true,
    price: 30.0,
  };
  const buyPinService = serviceStatusMap["service_buy_pin"] || {
    enabled: true,
    price: 24.0,
  };
  const admissionsService = serviceStatusMap["service_admissions"] || {
    enabled: true,
  };

  const handleSelectService = (service: "check" | "voucher") => {
    if (service === "check" && checkResultService.enabled === false) {
      setDisabledNoticeModal({
        title: "Check Result & PDF Slip is Currently Paused",
        message:
          checkResultService.message ||
          "Result checking and PDF generation is temporarily paused for system maintenance. Please contact support on WhatsApp for manual assistance.",
      });
      return;
    }

    if (service === "voucher" && buyPinService.enabled === false) {
      setDisabledNoticeModal({
        title: "Scratch Card Vouchers Temporarily Unavailable",
        message:
          buyPinService.message ||
          "Scratch Card PIN vouchers are temporarily out of stock. Please check back shortly or chat with us on WhatsApp.",
      });
      return;
    }

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
            className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all text-left flex flex-col justify-between cursor-pointer min-h-[170px] sm:min-h-[185px] group ${
              checkResultService.enabled === false
                ? "border-amber-200 bg-amber-50/20 hover:border-amber-300"
                : "border-slate-200 hover:border-slate-300 shadow-xs"
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0">
                <Image
                  src="/images/3d/certificate.png"
                  alt="Result Certificate"
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className={`object-contain drop-shadow-sm ${
                    checkResultService.enabled === false ? "grayscale-[0.5] opacity-80" : ""
                  }`}
                  priority
                />
              </div>

              {checkResultService.enabled === false ? (
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] sm:text-[11px] font-bold">
                  Paused
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-mono font-bold">
                  GH₵{(checkResultService.price || 30.0).toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-1 pt-2">
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                  Check Result &amp; Get PDF
                </h2>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                {checkResultService.enabled === false
                  ? checkResultService.message || "Service is temporarily paused for maintenance."
                  : "We check & deliver your official printable slip via email."}
              </p>
            </div>
          </button>

          {/* Card 2: Buy Checker PIN (Top Right) */}
          <button
            type="button"
            onClick={() => handleSelectService("voucher")}
            className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all text-left flex flex-col justify-between cursor-pointer min-h-[170px] sm:min-h-[185px] group ${
              buyPinService.enabled === false
                ? "border-amber-200 bg-amber-50/20 hover:border-amber-300"
                : "border-slate-200 hover:border-slate-300 shadow-xs"
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0">
                <Image
                  src="/images/3d/key.png"
                  alt="Checker PIN"
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className={`object-contain drop-shadow-sm ${
                    buyPinService.enabled === false ? "grayscale-[0.5] opacity-80" : ""
                  }`}
                  priority
                />
              </div>

              {buyPinService.enabled === false ? (
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] sm:text-[11px] font-bold">
                  Paused
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-mono font-bold">
                  GH₵{(buyPinService.price || 24.0).toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-1 pt-2">
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                Buy PIN Only
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                {buyPinService.enabled === false
                  ? buyPinService.message || "Vouchers are temporarily out of stock."
                  : "Genuine WAEC Scratch Card PIN sent instantly via SMS."}
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
                {admissionsService.enabled === false ? "Paused" : "Free"}
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

        {/* Disabled Service Alert Modal */}
        {disabledNoticeModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {disabledNoticeModal.title}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDisabledNoticeModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                {disabledNoticeModal.message}
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20have%20an%20inquiry%20regarding%20the%20paused%20service`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer"
                >
                  <WhatsAppOutlineIcon className="w-4 h-4" />
                  <span>Contact WhatsApp Help Desk</span>
                </a>

                <button
                  type="button"
                  onClick={() => setDisabledNoticeModal(null)}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

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

            <StudentForm
              serviceSettings={serviceStatusMap}
              price={checkResultService.price || 30.0}
            />
          </div>
        )}

        {/* VIEW B: BUY PIN ONLY */}
        {selectedService === "voucher" && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Buy WAEC Checker PIN (GH₵{(buyPinService.price || 24.0).toFixed(2)})
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                Authentic WAEC Scratch Card Serial &amp; PIN with instant SMS and WhatsApp delivery.
              </p>
            </div>

            <VoucherOnlyCard
              serviceSetting={buyPinService}
              onSwitchToPdf={() => setSelectedService("check")}
            />
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
