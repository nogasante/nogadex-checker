"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  User,
  Hash,
  Mail,
  Calendar,
} from "lucide-react";

interface RequestItem {
  id: string;
  requestId: string;
  fullName: string;
  indexNumber: string;
  examType: string;
  examYear: string;
  email: string;
  whatsappNumber?: string;
  paymentStatus: string;
  paymentAmount: number;
  processingStatus: string;
  pdfFilename?: string;
  emailStatus: string;
  createdAt: string;
}

interface StatsData {
  totalRequests: number;
  todayRequests: number;
  todayRevenue: number;
  totalRevenue: number;
  pendingRequests: number;
  processingRequests: number;
  completedRequests: number;
  failedRequests: number;
}

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("ALL");
  const [processingStatus, setProcessingStatus] = useState("ALL");
  const [examYear, setExamYear] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        paymentStatus,
        processingStatus,
        examYear,
        page: page.toString(),
        limit: "15",
      });

      const res = await fetch(`/api/admin/requests?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setRequests(data.requests);
        setTotalPages(data.pagination.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [search, paymentStatus, processingStatus, examYear, page]);

  // Status badge styling
  const getProcessingBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "PDF_UPLOADED":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "RESULT_CHECKED":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "PROCESSING":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "READY_TO_PROCESS":
      case "PAID":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "FAILED":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "PENDING":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "FAILED":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Requests Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time WAEC result processing queue &amp; PDF dispatch console.
          </p>
        </div>

        <button
          onClick={() => {
            fetchStats();
            fetchRequests();
          }}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 self-start cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards Grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Today's Requests */}
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Today's Requests
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {stats.todayRequests}
            </div>
          </div>

          {/* Today's Revenue */}
          <div className="glass-card p-4 rounded-xl border border-blue-900/30 bg-blue-950/20">
            <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
              Today's Revenue
            </div>
            <div className="text-2xl font-bold text-cyan-300 mt-1">
              GH₵{stats.todayRevenue.toFixed(2)}
            </div>
          </div>

          {/* Pending Queue */}
          <div className="glass-card p-4 rounded-xl border border-amber-900/30 bg-amber-950/20">
            <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              Pending Queue
            </div>
            <div className="text-2xl font-bold text-amber-300 mt-1">
              {stats.pendingRequests}
            </div>
          </div>

          {/* In Processing */}
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Processing
            </div>
            <div className="text-2xl font-bold text-blue-400 mt-1">
              {stats.processingRequests}
            </div>
          </div>

          {/* Completed */}
          <div className="glass-card p-4 rounded-xl border border-emerald-900/30 bg-emerald-950/20">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              Completed
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {stats.completedRequests}
            </div>
          </div>

          {/* Total Revenue */}
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              GH₵{stats.totalRevenue.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="glass-panel p-4 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Request ID, Name, Index, Email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Payment Status */}
          <div>
            <select
              value={paymentStatus}
              onChange={(e) => {
                setPaymentStatus(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="PAID">PAID</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>

          {/* Processing Status */}
          <div>
            <select
              value={processingStatus}
              onChange={(e) => {
                setProcessingStatus(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="ALL">All Processing Statuses</option>
              <option value="READY_TO_PROCESS">Ready to Process</option>
              <option value="PROCESSING">Processing</option>
              <option value="RESULT_CHECKED">Result Checked</option>
              <option value="PDF_UPLOADED">PDF Uploaded</option>
              <option value="COMPLETED">Completed</option>
              <option value="AWAITING_PAYMENT">Awaiting Payment</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          {/* Exam Year */}
          <div>
            <select
              value={examYear}
              onChange={(e) => {
                setExamYear(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="ALL">All Exam Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Requests Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Request ID</th>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Index No.</th>
                <th className="py-3.5 px-4">Exam</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Processing Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-500" />
                    Loading requests queue...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No requests found matching your filters.
                  </td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Request ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                      <Link
                        href={`/admin/requests/${r.id}`}
                        className="hover:underline flex items-center gap-1"
                      >
                        {r.requestId}
                      </Link>
                    </td>

                    {/* Candidate */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{r.fullName}</div>
                      <div className="text-[11px] text-slate-400">{r.email}</div>
                    </td>

                    {/* Index Number */}
                    <td className="py-3.5 px-4 font-mono text-slate-200">
                      {r.indexNumber}
                    </td>

                    {/* Examination */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-300">{r.examType}</span>
                      <span className="text-slate-500 block text-[10px]">
                        Year {r.examYear}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPaymentBadge(
                          r.paymentStatus
                        )}`}
                      >
                        {r.paymentStatus}
                      </span>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        GH₵{r.paymentAmount.toFixed(2)}
                      </div>
                    </td>

                    {/* Processing Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${getProcessingBadge(
                          r.processingStatus
                        )}`}
                      >
                        {r.processingStatus.replace(/_/g, " ")}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(r.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/requests/${r.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        Process <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              Page <span className="text-white font-bold">{page}</span> of{" "}
              <span className="text-white font-bold">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
