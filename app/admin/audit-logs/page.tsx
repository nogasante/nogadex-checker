"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History, RefreshCw, Loader2, ArrowLeft } from "lucide-react";

interface AuditLogEntry {
  id: string;
  requestId?: string;
  action: string;
  adminEmail?: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
  request?: {
    requestId: string;
    fullName: string;
  };
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/audit-logs?limit=100");
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionColor = (action: string) => {
    if (action.includes("PAYMENT")) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    if (action.includes("EMAIL")) return "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
    if (action.includes("PDF")) return "bg-purple-500/15 text-purple-400 border-purple-500/30";
    if (action.includes("COMPLETED")) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    return "bg-red-500/15 text-red-400 border-red-500/30";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0" />
            <span>Audit Trail</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Immutable log of payments, dispatches &amp; operator actions.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/[0.08] hover:bg-white/10 text-slate-200 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* 📱 MOBILE VIEW: Clean Cards with ZERO Horizontal Scrolling (< 768px) */}
      <div className="block md:hidden space-y-2.5">
        {loading ? (
          <div className="py-12 text-center text-slate-500 surface-card rounded-2xl">
            <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2 text-red-500" />
            <span className="text-xs">Loading audit records...</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center text-slate-500 surface-card rounded-2xl text-xs">
            No audit records registered yet.
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl surface-card space-y-2"
            >
              {/* Top Row: Action Badge + Timestamp */}
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getActionColor(log.action)}`}>
                  {log.action.replace(/_/g, " ")}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(log.createdAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>

              {/* Request Link */}
              {log.request && (
                <div className="text-xs">
                  <Link
                    href={`/admin/requests/${log.requestId}`}
                    className="font-mono font-semibold text-white hover:text-red-400 transition-colors"
                  >
                    #{log.request.requestId} ({log.request.fullName})
                  </Link>
                </div>
              )}

              {/* Details & Actor */}
              <div className="text-[11px] text-slate-300">
                {log.details || "No additional details"}
              </div>

              <div className="text-[10px] text-slate-500 border-t border-white/[0.04] pt-1.5 flex items-center justify-between">
                <span>By: {log.adminEmail || "Automated System"}</span>
                {log.ipAddress && <span>IP: {log.ipAddress}</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 💻 DESKTOP VIEW: High-Density Table (≥ 768px) */}
      <div className="hidden md:block rounded-2xl surface-card overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Request</th>
              <th className="py-3 px-4">Actor</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2 text-red-500" />
                  Loading audit records...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  No audit records registered yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {log.request ? (
                      <Link
                        href={`/admin/requests/${log.requestId}`}
                        className="font-mono font-semibold text-white hover:text-red-400 transition-colors"
                      >
                        #{log.request.requestId}
                      </Link>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {log.adminEmail || "System"}
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                    {log.details || "-"}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString("en-GB")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
