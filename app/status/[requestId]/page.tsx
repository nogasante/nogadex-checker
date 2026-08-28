"use client";

import { useEffect, useState, use, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Mail,
  MessageCircle,
  RefreshCw,
  Loader2,
  Check,
} from "lucide-react";

interface RequestData {
  requestId: string;
  fullName: string;
  indexNumber: string;
  examType: string;
  examYear: string;
  email: string;
  whatsappNumber?: string;
  paymentStatus: string;
  paymentAmount: number;
  currency: string;
  processingStatus: string;
  emailStatus: string;
  emailSentAt?: string;
  createdAt: string;
  completedAt?: string;
}

function StatusContent({ requestId }: { requestId: string }) {
  const searchParams = useSearchParams();
  const refFromQuery = searchParams.get("ref") || "";

  const [request, setRequest] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const supportNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/requests/${requestId}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Request not found.");
      }

      setRequest(data.request);

      if (data.request.paymentStatus === "PENDING" && refFromQuery) {
        verifyPayment(refFromQuery);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not load request.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference: string, isSimulated = false) => {
    try {
      setVerifying(true);
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, requestId, isSimulated }),
      });

      const data = await res.json();
      if (data.success) {
        const refreshedRes = await fetch(`/api/requests/${requestId}`);
        const refreshedData = await refreshedRes.json();
        if (refreshedData.success) {
          setRequest(refreshedData.request);
        }
      }
    } catch (err) {
      console.error("Verification check failed:", err);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    const interval = setInterval(() => {
      if (request?.processingStatus !== "COMPLETED") {
        fetchStatus();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [requestId, refFromQuery]);

  const whatsappMessage = request
    ? `Hello Nogadex Consults, I am checking on my WAEC result request.\nName: ${request.fullName}\nIndex: ${request.indexNumber}\nExam: ${request.examType} (${request.examYear})\nEmail: ${request.email}\nRequest ID: #${request.requestId}`
    : `Hello Nogadex Consults, I am inquiring about request #${requestId}`;

  const isPaid = request?.paymentStatus === "PAID";
  const isCompleted = request?.processingStatus === "COMPLETED";

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Official Tracking Receipt Card */}
      <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        
        {/* Top Tracking Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0">
              <Image
                src="/logo.png"
                alt="Nogadex Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                Official Result Slip
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">
                #{requestId}
              </h1>
            </div>
          </div>

          <button
            onClick={fetchStatus}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors self-start cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Live Status Announcement Card */}
        {request && (
          <div
            className={`p-4 rounded-xl border ${
              isCompleted
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : isPaid
                ? "bg-red-50 border-red-200 text-red-900"
                : "bg-amber-50 border-amber-200 text-amber-900"
            }`}
          >
            <div className="flex items-start gap-3">
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : isPaid ? (
                <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5 animate-pulse" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {isCompleted
                    ? "Result Checked & Emailed!"
                    : isPaid
                    ? "Payment Confirmed — Checking Official WAEC Grades"
                    : "Awaiting Payment Confirmation"}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isCompleted
                    ? `Your official WAEC result PDF certificate has been dispatched to ${request.email}. Please check your inbox.`
                    : isPaid
                    ? "Your GH₵30.00 fee was received. We are verifying your result on the WAEC portal and will email your PDF shortly."
                    : "Waiting for Paystack confirmation. If you authorized the prompt on your phone, click Verify below."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pending Verification CTA */}
        {request && !isPaid && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs">
              <div className="font-semibold text-slate-900">Completed Mobile Money prompt?</div>
              <div className="text-slate-500">Click below to check status with Paystack</div>
            </div>
            <button
              onClick={() => verifyPayment(refFromQuery || requestId, true)}
              disabled={verifying}
              className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {verifying ? "Verifying..." : "Verify Payment"}
            </button>
          </div>
        )}

        {/* 3-Step Progress */}
        <div className="border border-slate-200 bg-slate-50/50 rounded-xl p-4 space-y-3">
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Order Lifecycle
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isPaid ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                1
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Payment Confirmed</span>
                <span className="text-[11px] text-slate-500">
                  {isPaid ? "GH₵30.00 verified via Paystack" : "Awaiting payment"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  request?.processingStatus === "PROCESSING" ||
                  request?.processingStatus === "RESULT_CHECKED" ||
                  request?.processingStatus === "PDF_UPLOADED" ||
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                2
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Official WAEC Lookup</span>
                <span className="text-[11px] text-slate-500">Checked with genuine voucher PIN</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isCompleted ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                3
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">PDF Email Dispatch</span>
                <span className="text-[11px] text-slate-500">
                  {isCompleted ? `Dispatched to ${request?.email}` : "Emailed upon generation"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Summary */}
        {request && (
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Candidate Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Candidate:</span>
                <span className="font-semibold text-slate-900">{request.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Index Number:</span>
                <span className="font-mono font-semibold text-slate-900">{request.indexNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Exam:</span>
                <span className="font-semibold text-slate-900">{request.examType} ({request.examYear})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Delivery Email:</span>
                <span className="font-semibold text-red-600">{request.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Helpline Link */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Need urgent assistance with your request?
          </div>

          <a
            href={`https://wa.me/${supportNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}

export default function StatusPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const resolvedParams = use(params);
  const requestId = resolvedParams.requestId;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="py-24 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-red-600" />
              <span className="text-xs font-medium">Loading tracking slip...</span>
            </div>
          }
        >
          <StatusContent requestId={requestId} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
