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
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  RefreshCw,
  Eye,
  Download,
  Terminal,
  X,
  Loader2,
  MessageCircle,
} from "lucide-react";
import {
  formatCandidateSummary,
  generateWaecAutofillScript,
  WAEC_GHANA_PORTAL_URL,
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

  // Status transition handlers
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
      // Reset input value
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
        text: `Result PDF emailed successfully to ${request?.email}! Status marked COMPLETED.`,
      });
      fetchRequest();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Email error.";
      setActionMessage({ type: "error", text: msg });
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading && !request) {
    return (
      <div className="py-24 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="text-sm">Loading request console...</span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="py-24 text-center text-slate-400">
        <p>Request not found.</p>
        <Link
          href="/admin"
          className="mt-4 inline-flex items-center gap-2 text-xs text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const hasPdf = Boolean(request.pdfPath);
  const isCompleted = request.processingStatus === "COMPLETED";
  const autofillScript = generateWaecAutofillScript(request);
  const candidateSummary = formatCandidateSummary(request);

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white font-mono tracking-tight">
                #{request.requestId}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {request.processingStatus.replace(/_/g, " ")}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Created on{" "}
              {new Date(request.createdAt).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        <button
          onClick={fetchRequest}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white self-start cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-medium flex items-center justify-between gap-3 ${
            actionMessage.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
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

      {/* Operations Control Bar (The 5 Workflow Steps) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Processing Actions Workflow
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Step 1: Open WAEC Checker Modal */}
          <button
            onClick={() => setShowCheckerModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            1. OPEN WAEC CHECKER
          </button>

          {/* Step 2: Mark Result Checked */}
          <button
            onClick={handleMarkChecked}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            2. MARK RESULT CHECKED
          </button>

          {/* Step 3: Upload PDF */}
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 transition-all cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            {uploadingPdf ? "UPLOADING PDF..." : "3. UPLOAD RESULT PDF"}
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              disabled={uploadingPdf}
              className="hidden"
            />
          </label>

          {/* Step 4: Preview & Download PDF */}
          {hasPdf && (
            <>
              <button
                onClick={() => setShowPdfPreview(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                PREVIEW PDF
              </button>

              <a
                href={`/api/admin/requests/${id}/pdf`}
                download={request.pdfFilename || `${request.requestId}-Result.pdf`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD
              </a>
            </>
          )}

          {/* Step 5: Send / Resend Email */}
          <button
            onClick={() => handleSendEmail(isCompleted)}
            disabled={!hasPdf || sendingEmail}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isCompleted
                ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {sendingEmail ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                DISPATCHING EMAIL...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {isCompleted ? "RESEND RESULT EMAIL" : "5. SEND RESULT EMAIL"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Student Info & Payment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Student Information Card (Left 7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              Student Information
            </h2>
            <button
              onClick={() => copyToClipboard(candidateSummary, "summary")}
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline"
            >
              {copiedKey === "summary" ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              Copy All Details
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Full Name</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">
                  {request.fullName}
                </span>
                <button
                  onClick={() => copyToClipboard(request.fullName, "fullName")}
                  className="text-slate-400 hover:text-white p-1"
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
            <div className="p-3 bg-slate-900/60 rounded-xl border border-blue-900/30">
              <span className="text-blue-400 block mb-1 font-semibold">
                Index Number
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-300 text-sm">
                  {request.indexNumber}
                </span>
                <button
                  onClick={() => copyToClipboard(request.indexNumber, "indexNumber")}
                  className="text-slate-400 hover:text-white p-1"
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
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Date of Birth</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm font-mono">
                  {request.dateOfBirth}
                </span>
                <button
                  onClick={() => copyToClipboard(request.dateOfBirth, "dob")}
                  className="text-slate-400 hover:text-white p-1"
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
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Exam &amp; Year</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">
                  {request.examType} ({request.examYear})
                </span>
                <button
                  onClick={() => copyToClipboard(request.examYear, "year")}
                  className="text-slate-400 hover:text-white p-1"
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
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Email (Delivery)</span>
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-400 truncate pr-2">
                  {request.email}
                </span>
                <button
                  onClick={() => copyToClipboard(request.email, "email")}
                  className="text-slate-400 hover:text-white p-1"
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
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">WhatsApp Number</span>
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
        <div className="lg:col-span-5 space-y-6">
          {/* Payment Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Payment Details
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-white text-sm">
                  GH₵{request.paymentAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {request.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono text-slate-300 truncate max-w-[180px]">
                  {request.paymentReference || "N/A"}
                </span>
              </div>

              {request.paymentVerifiedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Verified At:</span>
                  <span className="text-slate-300">
                    {new Date(request.paymentVerifiedAt).toLocaleTimeString("en-GB")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* PDF Status Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              PDF Document
            </h2>

            {hasPdf ? (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span className="truncate">{request.pdfFilename}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Uploaded:{" "}
                  {request.pdfUploadedAt
                    ? new Date(request.pdfUploadedAt).toLocaleString("en-GB")
                    : "N/A"}{" "}
                  {request.pdfFileSize &&
                    `(${Math.round(request.pdfFileSize / 1024)} KB)`}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-2">
                No PDF result uploaded yet. Please use the WAEC Assistant to check the result, save as PDF, and upload.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Audit History Log */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Request Audit Trail
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Actor / Admin</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {request.auditLogs && request.auditLogs.length > 0 ? (
                request.auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/20">
                    <td className="py-2.5 px-3 font-semibold text-blue-400">
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  WAEC Assistant &amp; Field Helper
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
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

            {/* Step 1: Open Official WAEC portal */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Step 1: Open Official WAEC Portal
              </h4>
              <a
                href={WAEC_GHANA_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Open ghana.waecdirect.org in New Tab
              </a>
            </div>

            {/* Step 2: Quick Copy Fields */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Step 2: Candidate Quick-Copy Fields
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  onClick={() => copyToClipboard(request.indexNumber, "modalIndex")}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-left hover:border-blue-500 transition-colors"
                >
                  <span className="text-[10px] text-slate-400 block">Index Number</span>
                  <span className="font-mono font-bold text-white">
                    {request.indexNumber}
                  </span>
                </button>

                <button
                  onClick={() => copyToClipboard(request.examYear, "modalYear")}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-left hover:border-blue-500 transition-colors"
                >
                  <span className="text-[10px] text-slate-400 block">Exam Year</span>
                  <span className="font-mono font-bold text-white">
                    {request.examYear}
                  </span>
                </button>

                <button
                  onClick={() => copyToClipboard(request.examType, "modalExam")}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-left hover:border-blue-500 transition-colors"
                >
                  <span className="text-[10px] text-slate-400 block">Exam Type</span>
                  <span className="font-bold text-white truncate block">
                    {request.examType}
                  </span>
                </button>

                <button
                  onClick={() => copyToClipboard(request.dateOfBirth, "modalDob")}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-left hover:border-blue-500 transition-colors"
                >
                  <span className="text-[10px] text-slate-400 block">Date of Birth</span>
                  <span className="font-mono font-bold text-white">
                    {request.dateOfBirth}
                  </span>
                </button>
              </div>
            </div>

            {/* Step 3: Browser Console Autofill Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Browser Console Autofill Snippet (Optional)
                </h4>
                <button
                  onClick={() => copyToClipboard(autofillScript, "script")}
                  className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:underline"
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
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500">
                You can paste this snippet into your browser DevTools Console on the WAEC portal to auto-fill index and year.
              </p>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 leading-relaxed">
              <strong>Human Verification Reminder:</strong> Enter your purchased Voucher PIN and solve the CAPTCHA manually. Print or Save the official result as PDF, then return here to upload and email the document.
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowCheckerModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700"
              >
                Close Assistant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Inline Preview Modal */}
      {showPdfPreview && hasPdf && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-4xl h-[85vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{request.pdfFilename}</span>
              </div>
              <button
                onClick={() => setShowPdfPreview(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-slate-950">
              <iframe
                src={`/api/admin/requests/${id}/pdf`}
                className="w-full h-full border-none"
                title="Result PDF Preview"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
