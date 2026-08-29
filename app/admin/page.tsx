"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Trash2,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  playAdminOrderChime,
  requestAdminNotificationPermission,
  sendAdminPushNotification,
} from "@/lib/admin-alerts";

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
  const [showFilters, setShowFilters] = useState(false);
  const [inconsultStock, setInconsultStock] = useState<number | null>(null);

  // Live Alerts & Push Notification State
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>("default");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [newOrderToast, setNewOrderToast] = useState<{
    id: string;
    fullName: string;
    examType: string;
    amount: number;
  } | null>(null);

  const seenPaidIdsRef = useRef<Set<string>>(new Set());
  const isFirstLoadRef = useRef(true);

  // Check notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const handleToggleNotifications = async () => {
    const perm = await requestAdminNotificationPermission();
    setNotifPermission(perm);
    if (perm === "granted") {
      playAdminOrderChime();
      sendAdminPushNotification(
        "✅ Nogadex Admin Live Alerts Active",
        "You will receive instant sound and push notifications when students pay for results.",
        "/admin"
      );
    }
  };

  const handleTestChime = () => {
    playAdminOrderChime();
    sendAdminPushNotification(
      "🔔 Test Order Alert (GH₵30.00)",
      "WASSCE 2025 • Index: 0010123456 • Kwesi Mensah",
      "/admin"
    );
  };

  const fetchInconsultStock = async () => {
    try {
      const res = await fetch("/api/admin/inconsult/stock");
      const data = await res.json();
      if (data.success && data.stock) {
        setInconsultStock(data.stock.available ?? 0);
      }
    } catch (e) {
      console.log("InConsult stock check note:", e);
    }
  };

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
        limit: "25",
      });

      const res = await fetch(`/api/admin/requests?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setRequests(data.requests || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchInconsultStock();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [search, paymentStatus, processingStatus, examYear, page]);

  // Real-time live order detector & notification dispatch
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch("/api/admin/requests?limit=10");
        const data = await res.json();
        if (data.success && data.requests) {
          const paidOrders: RequestItem[] = data.requests.filter(
            (r: RequestItem) => r.paymentStatus === "PAID"
          );

          // On first load, seed the known IDs without alerting old orders
          if (isFirstLoadRef.current) {
            paidOrders.forEach((o) => seenPaidIdsRef.current.add(o.id));
            isFirstLoadRef.current = false;
            return;
          }

          // Detect any brand new paid orders
          const newOrders = paidOrders.filter((o) => !seenPaidIdsRef.current.has(o.id));
          if (newOrders.length > 0) {
            newOrders.forEach((o) => seenPaidIdsRef.current.add(o.id));
            const latest = newOrders[0];

            if (soundEnabled) {
              playAdminOrderChime();
            }

            sendAdminPushNotification(
              `🚨 New Paid Order: ${latest.fullName} (GH₵${latest.paymentAmount.toFixed(2)})`,
              `${latest.examType} ${latest.examYear} • Index: ${latest.indexNumber}`,
              `/admin/requests/${latest.id}`
            );

            setNewOrderToast({
              id: latest.id,
              fullName: latest.fullName,
              examType: latest.examType,
              amount: latest.paymentAmount,
            });

            fetchStats();
            fetchRequests();
          }
        }
      } catch (pollErr) {
        console.log("Admin background poll note:", pollErr);
      }
    }, 8000);

    return () => clearInterval(pollInterval);
  }, [soundEnabled]);

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
        return "bg-amber-500/15 text-amber-300 border-amber-500/30 font-bold";
      case "FAILED":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-white/5 text-slate-400 border-white/10";
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
        return "bg-white/5 text-slate-400 border-white/10";
    }
  };

  const handlePurgeAllOrders = async () => {
    if (!window.confirm("Are you sure you want to clear all test orders and reset the database to a fresh state?")) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/admin/requests", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchStats();
        fetchRequests();
      } else {
        alert(data.error || "Failed to clear data.");
      }
    } catch (e) {
      alert("Error clearing data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
            Requests Queue
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Student submissions &amp; PDF dispatch console
          </p>
        </div>

        <div className="flex items-center gap-2">
          {inconsultStock !== null && (
            <a
              href="https://incbusinesshub.org/dashboard/inventory"
              target="_blank"
              rel="noopener noreferrer"
              title="Click to manage InConsult store inventory"
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                inconsultStock > 0
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
              }`}
            >
              <span>🎫 InConsult: <strong>{inconsultStock} PINs</strong></span>
            </a>
          )}

          <button
            onClick={handlePurgeAllOrders}
            disabled={loading}
            title="Purge test records and reset queue"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Queue</span>
          </button>

          <button
            onClick={() => {
              fetchStats();
              fetchRequests();
            }}
            disabled={loading}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-slate-200 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Real-time Order Alert Toast */}
      {newOrderToast && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-red-600/20 via-amber-600/20 to-red-600/10 border border-red-500/40 shadow-lg shadow-red-950/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <BellRing className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                🚨 New Paid Order: {newOrderToast.fullName}
              </p>
              <p className="text-[11px] text-amber-300 font-medium">
                {newOrderToast.examType} • GH₵{newOrderToast.amount.toFixed(2)} Paid via MoMo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href={`/admin/requests/${newOrderToast.id}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>Process Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setNewOrderToast(null)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Live Alerts & PWA Control Banner */}
      <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">Live Order Dispatcher:</span>
          <span className="text-emerald-400 font-semibold">Active &amp; Polling (8s)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Permission Toggle */}
          {notifPermission !== "granted" ? (
            <button
              onClick={handleToggleNotifications}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold transition-colors cursor-pointer"
            >
              <Bell className="w-3 h-3" />
              <span>Enable Push Alerts</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <BellRing className="w-3 h-3 text-emerald-400" />
              <span>Push Active</span>
            </span>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
              soundEnabled
                ? "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
                : "bg-rose-500/10 text-rose-300 border-rose-500/20"
            }`}
            title={soundEnabled ? "Sound alerts enabled" : "Sound alerts muted"}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 text-emerald-400" /> : <VolumeX className="w-3 h-3 text-rose-400" />}
            <span className="text-[11px]">{soundEnabled ? "Sound ON" : "Muted"}</span>
          </button>

          {/* Test Chime */}
          <button
            onClick={handleTestChime}
            title="Test notification chime sound & push alert"
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-[11px]">Test Alert</span>
          </button>
        </div>
      </div>

      {/* Sleek, Compact KPI Metrics */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className="p-3 sm:p-4 rounded-xl surface-elevated">
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Ready to Process
            </div>
            <div className="text-lg sm:text-2xl font-bold text-amber-300 mt-0.5 font-mono">
              {stats.pendingRequests}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl surface-elevated">
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Completed Today
            </div>
            <div className="text-lg sm:text-2xl font-bold text-emerald-400 mt-0.5 font-mono">
              {stats.completedRequests}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl surface-elevated">
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Today's Revenue
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white mt-0.5 font-mono">
              GH₵{stats.todayRevenue.toFixed(2)}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl surface-elevated">
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Total Volume
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white mt-0.5 font-mono">
              {stats.totalRequests} <span className="text-[11px] text-slate-500 font-normal">reqs</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="p-2.5 sm:p-3.5 rounded-xl surface-card space-y-2">
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Index, Name, Email, ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full h-9 input-tech rounded-lg pl-8 pr-3 text-xs text-white placeholder-slate-500"
            />
          </div>

          {/* Toggle Filter Bar on Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`sm:hidden h-9 px-2.5 rounded-lg text-xs font-medium border flex items-center gap-1 transition-colors ${
              showFilters || paymentStatus !== "ALL" || processingStatus !== "ALL" || examYear !== "ALL"
                ? "bg-red-600/15 text-red-400 border-red-500/30"
                : "bg-white/5 text-slate-400 border-white/10"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Selects (Always visible on desktop, toggleable on mobile) */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 ${showFilters ? "block" : "hidden sm:grid"}`}>
          <select
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(e.target.value);
              setPage(1);
            }}
            className="w-full h-8 sm:h-9 bg-[#0f172a] input-tech rounded-lg px-2.5 text-xs text-white cursor-pointer"
          >
            <option value="ALL">Payment: All</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>

          <select
            value={processingStatus}
            onChange={(e) => {
              setProcessingStatus(e.target.value);
              setPage(1);
            }}
            className="w-full h-8 sm:h-9 bg-[#0f172a] input-tech rounded-lg px-2.5 text-xs text-white cursor-pointer"
          >
            <option value="ALL">Status: All</option>
            <option value="READY_TO_PROCESS">Ready to Process</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="AWAITING_PAYMENT">Awaiting Payment</option>
            <option value="FAILED">Failed</option>
          </select>

          <select
            value={examYear}
            onChange={(e) => {
              setExamYear(e.target.value);
              setPage(1);
            }}
            className="w-full h-8 sm:h-9 bg-[#0f172a] input-tech rounded-lg px-2.5 text-xs text-white cursor-pointer"
          >
            <option value="ALL">Year: All</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      {/* 📱 MOBILE VIEW: Beautiful Card List (< 768px) */}
      <div className="block md:hidden space-y-2.5">
        {loading ? (
          <div className="py-12 text-center text-slate-500 surface-card rounded-2xl">
            <RefreshCw className="w-4 h-4 animate-spin mx-auto mb-2 text-red-500" />
            <span className="text-xs">Loading requests...</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="py-12 text-center text-slate-500 surface-card rounded-2xl text-xs">
            No requests found.
          </div>
        ) : (
          requests.map((r) => (
            <div
              key={r.id}
              className="p-3.5 rounded-xl surface-card space-y-2.5"
            >
              {/* Top Row: ID, Date, Badges */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white">
                    #{r.requestId}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(r.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getPaymentBadge(
                      r.paymentStatus
                    )}`}
                  >
                    {r.paymentStatus}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getProcessingBadge(
                      r.processingStatus
                    )}`}
                  >
                    {r.processingStatus.replace(/_/g, " ")}
                  </span>
                </div>
              </div>

              {/* Middle Row: Candidate Info */}
              <div className="border-t border-white/[0.04] pt-2 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{r.fullName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Index: {r.indexNumber}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-medium text-slate-300">
                    {r.examType}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Year {r.examYear}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="border-t border-white/[0.04] pt-2 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  GH₵{r.paymentAmount.toFixed(2)}
                </div>

                <Link
                  href={`/admin/requests/${r.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors"
                >
                  <span>Process</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 💻 DESKTOP VIEW: High-Density Table (≥ 768px) */}
      <div className="hidden md:block rounded-2xl surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Index No.</th>
                <th className="py-3 px-4">Exam</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <RefreshCw className="w-4 h-4 animate-spin mx-auto mb-2 text-red-500" />
                    Loading requests...
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
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      <Link
                        href={`/admin/requests/${r.id}`}
                        className="hover:text-red-400 transition-colors"
                      >
                        #{r.requestId}
                      </Link>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{r.fullName}</div>
                      <div className="text-[11px] text-slate-400">{r.email}</div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-200">
                      {r.indexNumber}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-200">{r.examType}</span>
                      <span className="text-slate-500 block text-[10px]">
                        {r.examYear}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${getPaymentBadge(
                          r.paymentStatus
                        )}`}
                      >
                        {r.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-semibold border ${getProcessingBadge(
                          r.processingStatus
                        )}`}
                      >
                        {r.processingStatus.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(r.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/requests/${r.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/15 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition-all"
                      >
                        <span>Process</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-3 surface-elevated rounded-xl flex items-center justify-between text-xs text-slate-400">
          <div>
            Page <span className="text-white font-bold">{page}</span> of{" "}
            <span className="text-white font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 disabled:opacity-40 hover:bg-white/10"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 disabled:opacity-40 hover:bg-white/10"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
