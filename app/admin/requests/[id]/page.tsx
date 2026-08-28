"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  UploadCloud,
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Download,
  Terminal,
  X,
  Loader2,
  MessageCircle,
  ShoppingCart,
} from "lucide-react";
import {
  formatCandidateSummary,
  generateWaecAutofillScript,
  WAEC_GHANA_PORTAL_URL,
  DATAPLUG_CHECKER_STORE_URL,
} from "@/lib/waec-assistant";

interface RequestDetail {
  id: string;
  requestId: string;
  fullName: string;
  indexNumber: string;
  dateOfBirth: string;
  examType: string;
  examYear: string;
  email: string;
  whatsappNumber?: string;
  paymentReference?: string;
  paymentAmount: number;
  currency: string;
  paymentStatus: string;
  paymentVerifiedAt?: string;
  processingStatus: string;
  pdfPath?: string;
  pdfFilename?: string;
  pdfFileSize?: number;
  pdfUploadedAt?: string;
  emailStatus: string;
  emailSentAt?: string;
  emailError?: string;
  notes?: string;
  createdAt: string;
  completedAt?: string;
  auditLogs?: Array<{
    id: string;
    action: string;
    adminEmail?: string;
    details?: string;
    createdAt: string;
  }>;
}

export default function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [request, setRequest] = useState<RequestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Modals & Action States
  const [showCheckerModal, setShowCheckerModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/requests/${id}`);
      const data = await res.json();
      if (data.success) {
        setRequest(data.request);
      }
    } catch (err) {
      console.error("Failed to load request detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleMarkChecked = async () => {
    try {
      const res = await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          processingStatus: "RESULT_CHECKED",
          actionType: "RESULT_MARKED_CHECKED",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage({
          type: "success",
          text: "Result marked as checked successfully.",
        });
        fetchRequest();
      }
    } catch (err) {
      setActionMessage({
        type: "error",
        text: "Failed to update status.",
      });
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setActionMessage({
        type: "error",
        text: "Please select a valid PDF document.",
      });
      return;
    }

    setUploadingPdf(true);
    setActionMessage(null);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch(`/api/admin/requests/${id}/pdf`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload PDF.");
      }

      setActionMessage({
        type: "success",
        text: `PDF uploaded successfully: ${data.filename}`,
      });
      fetchRequest();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload error.";
      setActionMessage({ type: "error", text: msg });
    } finally {
      setUploadingPdf(false);
      e.target.value = "";
    }
  };

  const handleSendEmail = async (isResend = false) => {
    setSendingEmail(true);
    setActionMessage(null);

    try {
      const res = await fetch(`/api/admin/requests/${id}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isResend }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to dispatch email.");
      }

      setActionMessage({
        type: "success",
        text: `Result PDF emailed to ${request?.email}! Status updated to COMPLETED.`,
      });
      fetchRequest();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Email dispatch failed.";
      setActionMessage({ type: "error", text: msg });
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading && !request) {
    return (
      <div className="py-24 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-red-500" />
        <span className="text-xs">Loading request console...</span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="py-24 text-center text-slate-400">
        <p>Request not found.</p>
        <Link
          href="/admin"
          className="mt-4 inline-flex items-center gap-2 text-xs text-red-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Queue
        </Link>
      </div>
    );
  }

  const hasPdf = Boolean(request.pdfPath);
  const isCompleted = request.processingStatus === "COMPLETED";
  const autofillScript = generateWaecAutofillScript(request);
  const candidateSummary = formatCandidateSummary(request);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-bold text-white font-mono tracking-tight">
                #{request.requestId}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold bg-red-600/15 text-red-400 border border-red-500/30">
                {request.processingStatus.replace(/_/g, " ")}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {new Date(request.createdAt).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        <button
          onClick={fetchRequest}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-slate-300 hover:text-white self-start cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={`p-3 rounded-xl text-xs font-medium flex items-center justify-between gap-3 ${
            actionMessage.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Operations Control Bar */}
      <div className="p-3.5 sm:p-5 rounded-2xl surface-card space-y-3">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Processing Actions Workflow
        </h2>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {/* Step 1: Open WAEC Checker Modal */}
          <button
            onClick={() => setShowCheckerModal(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all cursor-pointer text-center"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>1. Checker Helper</span>
          </button>

          {/* Step 2: Mark Result Checked */}
          <button
            onClick={handleMarkChecked}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all cursor-pointer text-center"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>2. Mark Checked</span>
          </button>

          {/* Step 3: Upload PDF */}
          <label className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all cursor-pointer text-center">
            <UploadCloud className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>{uploadingPdf ? "Uploading..." : "3. Upload PDF"}</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              disabled={uploadingPdf}
              className="hidden"
            />
          </label>

          {/* Step 4: Preview PDF */}
          {hasPdf && (
            <button
              onClick={() => setShowPdfPreview(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-emerald-400 border border-white/10 transition-all cursor-pointer text-center"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>Preview</span>
            </button>
          )}

          {/* Step 5: Send / Resend Email */}
          <button
            onClick={() => handleSendEmail(isCompleted)}
            disabled={!hasPdf || sendingEmail}
            className={`col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isCompleted
                ? "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {sendingEmail ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending Email...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>{isCompleted ? "Resend Result Email" : "4. Dispatch Result Email"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Student Info & Payment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Student Information Card (Left 7 Cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 rounded-2xl surface-card space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Candidate Dossier
            </h2>
            <button
              onClick={() => copyToClipboard(candidateSummary, "summary")}
              className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline cursor-pointer"
            >
              {copiedKey === "summary" ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>Copy All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {/* Full Name */}
            <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-slate-400 block mb-0.5 text-[11px]">Full Name</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">
                  {request.fullName}
                </span>
                <button
                  onClick={() => copyToClipboard(request.fullName, "fullName")}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  {copiedKey === "fullName" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* WAEC Index Number */}
            <div className="p-2.5 bg-white/[0.02] rounded-xl border border-red-500/20">
              <span className="text-red-400 block mb-0.5 text-[11px] font-semibold">
                Index Number
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-white text-sm">
                  {request.indexNumber}
                </span>
                <button
                  onClick={() => copyToClipboard(request.indexNumber, "indexNumber")}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  {copiedKey === "indexNumber" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-slate-400 block mb-0.5 text-[11px]">Date of Birth</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm font-mono">
                  {request.dateOfBirth}
                </span>
                <button
                  onClick={() => copyToClipboard(request.dateOfBirth, "dob")}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  {copiedKey === "dob" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Examination & Year */}
            <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-slate-400 block mb-0.5 text-[11px]">Exam &amp; Year</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">
                  {request.examType} ({request.examYear})
                </span>
                <button
                  onClick={() => copyToClipboard(request.examYear, "year")}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  {copiedKey === "year" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Email Address */}
            <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-slate-400 block mb-0.5 text-[11px]">Email</span>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-200 truncate pr-2">
                  {request.email}
                </span>
                <button
                  onClick={() => copyToClipboard(request.email, "email")}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  {copiedKey === "email" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-slate-400 block mb-0.5 text-[11px]">WhatsApp</span>
              <div className="flex items-center justify-between">
                <span className="font-medium text-emerald-400">
                  {request.whatsappNumber || "Not provided"}
                </span>
                {request.whatsappNumber && (
                  <a
                    href={`https://wa.me/${request.whatsappNumber.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 p-1 flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment & PDF Status Card (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Payment Card */}
          <div className="p-4 sm:p-5 rounded-2xl surface-card space-y-2.5">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-white/10 pb-2">
              Payment Verification
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Fee Paid:</span>
                <span className="font-bold text-white text-sm font-mono">
                  GH₵{request.paymentAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {request.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono text-slate-300 truncate max-w-[150px]">
                  {request.paymentReference || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* PDF Status Card */}
          <div className="p-4 sm:p-5 rounded-2xl surface-card space-y-2.5">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-white/10 pb-2">
              Result Document
            </h2>

            {hasPdf ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span className="truncate">{request.pdfFilename}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Uploaded:{" "}
                  {request.pdfUploadedAt
                    ? new Date(request.pdfUploadedAt).toLocaleString("en-GB")
                    : "N/A"}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-1">
                No PDF result uploaded yet. Use WAEC Assistant to check, save PDF, and upload.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 📱 MOBILE AUDIT CARDS + 💻 DESKTOP AUDIT TABLE */}
      <div className="p-4 sm:p-5 rounded-2xl surface-card space-y-3">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Request Audit Trail
        </h2>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-2">
          {request.auditLogs && request.auditLogs.length > 0 ? (
            request.auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-white/[0.02] rounded-xl border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{log.action}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(log.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">{log.details || "-"}</div>
                <div className="text-[10px] text-slate-500 border-t border-white/[0.04] pt-1">
                  By: {log.adminEmail || "System"}
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-slate-500 text-xs">No audit records yet.</div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Actor / Admin</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {request.auditLogs && request.auditLogs.length > 0 ? (
                request.auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {log.adminEmail || "System"}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{log.details || "-"}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500 font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleString("en-GB")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">
                    No audit records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* WAEC Assistant Modal */}
      {showCheckerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0c1220] border border-white/15 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  WAEC Assistant &amp; Field Helper
                </h3>
                <p className="text-xs text-slate-400">
                  Assisting candidate data entry on the official WAEC portal.
                </p>
              </div>
              <button
                onClick={() => setShowCheckerModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Open WAEC & DataPlug */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Step 1: Check Result &amp; Stock Vouchers
              </h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href={WAEC_GHANA_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open ghana.waecdirect.org</span>
                </a>

                <a
                  href={DATAPLUG_CHECKER_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Buy Vouchers (DataPlug Ghana)</span>
                </a>
              </div>
            </div>

            {/* Step 2: Quick Copy Fields */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Step 2: Candidate Quick-Copy Fields
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  onClick={() => copyToClipboard(request.indexNumber, "modalIndex")}
                  className="p-2 bg-white/[0.04] border border-white/10 rounded-xl text-left hover:border-red-500 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-slate-400 block">Index</span>
                  <span className="font-mono font-bold text-white">
                    {request.indexNumber}
                  </span>
                </button>

                <button
                  onClick={() => copyToClipboard(request.examYear, "modalYear")}
                  className="p-2 bg-white/[0.04] border border-white/10 rounded-xl text-left hover:border-red-500 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-slate-400 block">Year</span>
                  <span className="font-mono font-bold text-white">
                    {request.examYear}
                  </span>
                </button>

                <button
                  onClick={() => copyToClipboard(request.examType, "modalExam")}
                  className="p-2 bg-white/[0.04] border border-white/10 rounded-xl text-left hover:border-red-500 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-slate-400 block">Exam</span>
                  <span className="font-bold text-white truncate block">
                    {request.examType}
                  </span>
                </button>

                <button
                  onClick={() => copyToClipboard(request.dateOfBirth, "modalDob")}
                  className="p-2 bg-white/[0.04] border border-white/10 rounded-xl text-left hover:border-red-500 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-slate-400 block">DOB</span>
                  <span className="font-mono font-bold text-white">
                    {request.dateOfBirth}
                  </span>
                </button>
              </div>
            </div>

            {/* Step 3: Browser Console Autofill Snippet */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-red-400" />
                  Console Autofill Snippet
                </h4>
                <button
                  onClick={() => copyToClipboard(autofillScript, "script")}
                  className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:underline cursor-pointer"
                >
                  {copiedKey === "script" ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  Copy Script
                </button>
              </div>
              <textarea
                readOnly
                value={autofillScript}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 font-mono text-[11px] text-slate-300 focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowCheckerModal(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal with Mobile Fallback */}
      {showPdfPreview && hasPdf && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-4xl h-[85vh] rounded-2xl bg-[#0c1220] border border-white/15 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between bg-[#070b14] gap-2">
              <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm truncate">
                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{request.pdfFilename}</span>
                {request.pdfFileSize && (
                  <span className="text-[10px] text-slate-500 font-normal shrink-0">
                    ({(request.pdfFileSize / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`/api/admin/requests/${id}/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={request.pdfFilename}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open / Download</span>
                </a>

                <button
                  onClick={() => setShowPdfPreview(false)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body with Fallback */}
            <div className="flex-1 bg-slate-950 relative flex flex-col">
              {/* Mobile Quick Action Banner */}
              <div className="sm:hidden p-2.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Viewing on phone?
                </span>
                <a
                  href={`/api/admin/requests/${id}/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <object
                data={`/api/admin/requests/${id}/pdf`}
                type="application/pdf"
                className="w-full flex-1"
              >
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3">
                  <FileText className="w-12 h-12 text-slate-600" />
                  <p className="text-xs">
                    Your mobile browser does not display inline PDF previews.
                  </p>
                  <a
                    href={`/api/admin/requests/${id}/pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white"
                  >
                    <Download className="w-4 h-4" /> Open / Download PDF
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
