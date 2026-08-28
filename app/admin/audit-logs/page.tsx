"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History, RefreshCw, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";

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
    return "text-blue-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-blue-400" /> System Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete, immutable audit log of payment verifications, admin actions, and email dispatches.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 transition-colors self-start cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Logs
        </button>
      </div>

      {/* Audit Log Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Related Request</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Details</th>
                <th className="py-3.5 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-500" />
                    Loading audit trail...
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
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold">
                      <span className={getActionColor(log.action)}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {log.request ? (
                        <Link
                          href={`/admin/requests/${log.requestId}`}
                          className="font-mono text-blue-400 hover:underline"
                        >
                          {log.request.requestId} ({log.request.fullName})
                        </Link>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {log.adminEmail || "Automated System"}
                    </td>
                    <td className="py-3 px-4 text-slate-300 max-w-md">
                      {log.details || "-"}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-500">
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
