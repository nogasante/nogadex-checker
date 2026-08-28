"use client";

import { X, ShieldCheck, FileText, Lock } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy" | "refund";
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            {type === "terms" && <FileText className="w-5 h-5 text-slate-700" />}
            {type === "privacy" && <Lock className="w-5 h-5 text-slate-700" />}
            {type === "refund" && <ShieldCheck className="w-5 h-5 text-slate-700" />}
            <h3 className="font-bold text-slate-900 text-base">
              {type === "terms" && "Terms of Service & Disclaimer"}
              {type === "privacy" && "Privacy Policy & Data Protection"}
              {type === "refund" && "Refund & Voucher Policy"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed">
          
          {type === "terms" && (
            <>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-medium">
                <strong>Important Legal Notice:</strong> Nogadex Consults is an independent private educational technology consultancy in Ghana. WAEC is a registered trademark of the West African Examinations Council. We are not affiliated with, endorsed by, or operated by WAEC.
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">1. Services Provided</h4>
                <p>
                  Nogadex Consults assists candidates in checking their WASSCE, BECE, and NOVDEC grades by provisioning genuine WAEC Scratch Card vouchers and generating a formatted, printable PDF result summary delivered via email.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">2. Candidate Information Accuracy</h4>
                <p>
                  You are solely responsible for entering the correct 10-digit Index Number, Exam Year, and Exam Type. If incorrect candidate details are submitted, the WAEC system will attempt verification with the provided credentials, which may consume a card usage.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">3. Voucher PIN Validity</h4>
                <p>
                  Each WAEC Scratch Card Serial &amp; PIN allows up to three (3) result checks on the official WAEC portal as per official WAEC policy. Once purchased and delivered, the digital PIN is active immediately.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">4. Limitation of Liability</h4>
                <p>
                  Nogadex Consults is not responsible for examination grades assigned by WAEC, withholding of results by the council, or temporary downtime on WAEC official servers.
                </p>
              </div>
            </>
          )}

          {type === "privacy" && (
            <>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
                <strong>Ghana Data Protection Compliance:</strong> We comply fully with the Ghana Data Protection Act, 2012 (Act 843). Your exam details and contact information are encrypted in transit using 256-bit SSL.
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">1. Data We Collect</h4>
                <p>
                  We collect your Index Number, Exam Type, Exam Year, Email Address, and Phone Number solely for the purpose of checking your results, delivering your PDF slip, and sending confirmation via SMS or WhatsApp.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">2. Payment Data Security</h4>
                <p>
                  All payments are processed directly through <strong>Paystack</strong> (PCI-DSS Level 1 certified). Nogadex Consults does NOT store, log, or have access to your Mobile Money PIN, debit card numbers, or banking credentials.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">3. No Sale of Personal Data</h4>
                <p>
                  We never sell, rent, or distribute candidate records or contact details to third parties or advertising brokers.
                </p>
              </div>
            </>
          )}

          {type === "refund" && (
            <>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">1. Voucher &amp; PIN Purchases</h4>
                <p>
                  Due to the nature of digital cryptographic serial numbers and PINs, vouchers that have been successfully generated and delivered to your screen, SMS, or WhatsApp cannot be refunded.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">2. Result Checking Issues</h4>
                <p>
                  If an automated check fails due to a system error on our platform (and not due to incorrect index numbers or WAEC council withholding), our 24/7 support will re-process your request or issue a replacement voucher at zero additional cost.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">3. Customer Support</h4>
                <p>
                  For any billing inquiries or assistance, reach out via WhatsApp at <strong>+233 534 908 166</strong> with your Request ID.
                </p>
              </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
