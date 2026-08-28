"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { StudentForm } from "./StudentForm";
import { VoucherOnlyCard } from "./VoucherOnlyCard";
import { ArrowLeft, Search } from "lucide-react";

export function StudentPortalHub() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialService = searchParams.get("service") as "check" | "voucher" | "track" | null;
  
  const [selectedService, setSelectedService] = useState<"none" | "check" | "voucher" | "track">(
    initialService && ["check", "voucher", "track"].includes(initialService) ? initialService : "none"
  );
  const [trackQuery, setTrackQuery] = useState("");

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  const handleSelectService = (service: "check" | "voucher" | "track") => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToServices = () => {
    setSelectedService("none");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    const cleanId = trackQuery.trim().toUpperCase();
    router.push(`/status/${cleanId}`);
  };

  // ─── SCREEN 1: SERVICE SELECTION ───
  if (selectedService === "none") {
    return (
      <div className="space-y-10">
        
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-gray-900 leading-tight tracking-tight">
            Check your WAEC result
          </h1>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            Select a service to get started.
          </p>
        </div>

        {/* Service list */}
        <div className="space-y-3">
          
          {/* Check Result & Get PDF */}
          <button
            type="button"
            onClick={() => handleSelectService("check")}
            className="w-full text-left px-5 py-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-gray-900">
                Check result &amp; get PDF
              </span>
              <span className="text-[15px] text-gray-400 tabular-nums">
                GH₵30
              </span>
            </div>
            <p className="text-[13px] text-gray-500 mt-1">
              We check your WASSCE, BECE, or NOVDEC grades and email a printable PDF slip.
            </p>
          </button>

          {/* Buy Checker PIN */}
          <button
            type="button"
            onClick={() => handleSelectService("voucher")}
            className="w-full text-left px-5 py-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-gray-900">
                Buy checker PIN only
              </span>
              <span className="text-[15px] text-gray-400 tabular-nums">
                GH₵25
              </span>
            </div>
            <p className="text-[13px] text-gray-500 mt-1">
              Get a WAEC scratch card serial &amp; PIN sent to your phone instantly.
            </p>
          </button>

          {/* Track Existing Order */}
          <button
            type="button"
            onClick={() => handleSelectService("track")}
            className="w-full text-left px-5 py-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-gray-900">
                Track existing order
              </span>
            </div>
            <p className="text-[13px] text-gray-500 mt-1">
              Check processing status or re-download your PDF.
            </p>
          </button>

        </div>

        {/* Admissions link — quiet, not a card */}
        <div className="pt-2 border-t border-gray-100">
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20help%20with%20university%20admissions`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
          >
            Need help with university admissions? Chat with us →
          </a>
        </div>

      </div>
    );
  }

  // ─── SCREEN 2: FOCUSED SERVICE VIEW ───
  return (
    <div className="space-y-8">
      
      {/* Back link */}
      <button
        type="button"
        onClick={handleBackToServices}
        className="inline-flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      {/* VIEW A: CHECK RESULT & GET PDF */}
      {selectedService === "check" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-semibold text-gray-900 leading-tight tracking-tight">
              Check result &amp; get PDF
            </h2>
            <p className="text-[15px] text-gray-500 mt-1">
              Fill in your details. We'll check your grades and email a PDF slip in 2–5 minutes.
            </p>
          </div>

          <StudentForm />
        </div>
      )}

      {/* VIEW B: BUY PIN ONLY */}
      {selectedService === "voucher" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-semibold text-gray-900 leading-tight tracking-tight">
              Buy checker PIN
            </h2>
            <p className="text-[15px] text-gray-500 mt-1">
              Get a WAEC scratch card serial &amp; PIN to check results yourself.
            </p>
          </div>

          <VoucherOnlyCard onSwitchToPdf={() => setSelectedService("check")} />
        </div>
      )}

      {/* VIEW C: TRACK ORDER */}
      {selectedService === "track" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-semibold text-gray-900 leading-tight tracking-tight">
              Track your order
            </h2>
            <p className="text-[15px] text-gray-500 mt-1">
              Enter the Request ID from your confirmation (e.g. NGX-100234).
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700">
                Request ID
              </label>
              <input
                type="text"
                required
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="NGX-XXXXXX"
                className="w-full h-11 input-clean px-3.5 font-mono uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 btn-brand flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Look up order</span>
            </button>
          </form>
        </div>
      )}

      {/* Quiet help link */}
      <div className="pt-4 border-t border-gray-100 text-[13px] text-gray-400">
        Need help?{" "}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20Nogadex,%20I%20need%20assistance`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          WhatsApp us
        </a>
      </div>

    </div>
  );
}
