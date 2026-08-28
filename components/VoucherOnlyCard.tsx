import React from "react";
import { ExternalLink } from "lucide-react";

export function VoucherOnlyCard({
  onSwitchToPdf,
}: {
  onSwitchToPdf?: () => void;
}) {
  const dataplugBuyUrl =
    process.env.NEXT_PUBLIC_DATAPLUG_BUY_URL ||
    "https://dataplug-gh.com/pay/nogadex-consults-e8c92a30";

  return (
    <div className="space-y-6">

      {/* What you get */}
      <div className="text-[14px] text-gray-600 leading-relaxed space-y-2">
        <p>
          You'll receive a genuine WAEC scratch card serial &amp; PIN via SMS and WhatsApp
          immediately after payment. Each card allows up to 3 result checks.
        </p>
      </div>

      {/* Price */}
      <div className="flex justify-between items-center text-[15px]">
        <span className="text-gray-500">WAEC Checker PIN</span>
        <span className="font-semibold text-gray-900 tabular-nums">GH₵25.00</span>
      </div>

      {/* Buy button */}
      <a
        href={dataplugBuyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-12 btn-brand flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Buy PIN — GH₵25.00</span>
        <ExternalLink className="w-4 h-4" />
      </a>

      {/* Payment note */}
      <p className="text-center text-[13px] text-gray-400">
        Mobile Money · Visa · Mastercard — via Paystack
      </p>

      {/* Switch to PDF */}
      {onSwitchToPdf && (
        <div className="pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onSwitchToPdf}
            className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Want us to check and send you a PDF instead? →
          </button>
        </div>
      )}

    </div>
  );
}
