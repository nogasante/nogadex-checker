"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History, RefreshCw, ArrowLeft, Loader2 } from "lucide-react";

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
    if (action.includes("PAYMENT")) return "text-emerald-400";
    if (action.includes("EMAIL")) return "text-cyan-400";
    if (action.includes("PDF")) return "text-purple-400";
    if (action.includes("COMPLETED")) return "text-emerald-300";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-red-500" />
            <span>Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable log of payments, PDF dispatches, and operator activities.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 transition-colors self-start cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl bg-[#0d1322] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Request</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
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
                    <td className="py-3 px-4 font-bold">
                      <span className={getActionColor(log.action)}>
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
    </div>
  );
}
