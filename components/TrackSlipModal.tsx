"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, X, FileText, ArrowRight } from "lucide-react";

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
      // Direct navigation if starts with NGX or numeric
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-bold text-slate-900">Track Result Slip</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Enter your <strong>Request ID</strong> (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">NGX-100234</code>) to view your live status or download your PDF certificate.
        </p>

        {error && (
          <div className="p-2.5 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. NGX-774920"
              autoFocus
              required
              className="w-full h-11 pl-9 pr-3 text-sm font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:border-red-600 focus:bg-white focus:outline-none transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full h-10.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Search Tracking Slip</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
