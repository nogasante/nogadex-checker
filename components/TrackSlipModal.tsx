"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X, Search } from "lucide-react";

export function TrackSlipModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    if (!clean) return;

    setLoading(true);
    setError("");

    try {
      const sanitized = clean.startsWith("#") ? clean.substring(1) : clean;
      const res = await fetch(`/api/requests/${sanitized}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "No order found with this tracking ID.");
      }

      router.push(`/status/${data.request.requestId}`);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Request not found.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-5 animate-in fade-in duration-100">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-gray-900">
            Track your order
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[14px] text-gray-500 leading-relaxed">
          Enter your Request ID (e.g. <span className="font-mono text-gray-800 font-medium">NGX-100234</span>) to check live status or re-download your PDF.
        </p>

        {error && (
          <div className="px-3.5 py-2.5 rounded-lg bg-red-50 text-red-800 text-[13px] border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-gray-700">
              Request ID
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="NGX-XXXXXX"
              autoFocus
              required
              className="w-full h-11 input-clean px-3.5 font-mono uppercase text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full h-12 btn-brand flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Looking up order…</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Look up order</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
