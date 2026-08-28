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
  ShieldCheck,
  Hash,
  User,
  Calendar,
  CreditCard,
  Zap,
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

      // If payment is pending and we have a reference, attempt server-side verification
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
        // Refetch full status
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

    // Auto-poll status every 10 seconds if not yet completed
    const interval = setInterval(() => {
      if (request?.processingStatus !== "COMPLETED") {
        fetchStatus();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [requestId, refFromQuery]);

  // Construct WhatsApp pre-filled message
  const whatsappMessage = request
    ? `Hello Nogadex Consults, I am checking on my WAEC result request.\nName: ${request.fullName}\nIndex Number: ${request.indexNumber}\nExam: ${request.examType} (${request.examYear})\nEmail: ${request.email}\nRequest ID: ${request.requestId}`
    : `Hello Nogadex Consults, I am inquiring about request ${requestId}`;

  const isPaid = request?.paymentStatus === "PAID";
  const isCompleted = request?.processingStatus === "COMPLETED";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Official Tracking Receipt Card */}
      <div className="nogadex-card p-6 sm:p-8 rounded-3xl relative border border-slate-800 shadow-2xl">
        
        {/* Top Tracking Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-red-950/40 shrink-0">
              <Image
                src="/logo.svg"
                alt="Nogadex Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                Official Result Dispatch Slip
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                #{requestId}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStatus}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#182032] border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh Status
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Live Status Announcement Card */}
        {request && (
          <div
            className={`p-5 rounded-2xl border mb-6 ${
              isCompleted
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : isPaid
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : "bg-amber-500/10 border-amber-500/30 text-amber-300"
            }`}
          >
            <div className="flex items-start gap-3.5">
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : isPaid ? (
                <Clock className="w-6 h-6 text-red-400 shrink-0 mt-0.5 animate-pulse" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="text-base font-bold text-white">
                  {isCompleted
                    ? "Result Processed & Emailed!"
                    : isPaid
                    ? "Payment Verified — Processing WAEC Result"
                    : "Awaiting Payment Confirmation"}
                </h3>
                <p className="text-xs sm:text-sm mt-1 opacity-90 leading-relaxed">
                  {isCompleted
                    ? `Your WAEC result PDF has been emailed to ${request.email}. Please check your inbox and spam/junk folder.`
                    : isPaid
                    ? "Your GH₵30.00 payment was confirmed. Our operations desk is verifying your result with official WAEC vouchers and will dispatch your PDF shortly."
                    : "We are waiting for Paystack to confirm your payment. If you have already authorized the prompt, click Verify Payment below."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* If pending payment, show verification trigger */}
        {request && !isPaid && (
          <div className="p-4 rounded-2xl bg-[#141a29] border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">Did you just complete your Mobile Money authorization?</div>
              <div className="text-xs text-slate-400">Click below to verify status with Paystack</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => verifyPayment(refFromQuery || requestId, true)}
                disabled={verifying}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {verifying ? "Verifying..." : "Verify Payment"}
              </button>
            </div>
          </div>
        )}

        {/* 4-Step Processing Timeline */}
        <div className="border border-slate-800 bg-[#0e1422] rounded-2xl p-5 mb-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Order Progress
          </h3>

          <div className="space-y-4">
            {/* Step 1: Payment */}
            <div className="flex items-start gap-3.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isPaid
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  Payment Verification (GH₵30.00)
                </div>
                <div className="text-xs text-slate-400">
                  {isPaid ? "Payment confirmed via Paystack" : "Pending payment confirmation"}
                </div>
              </div>
            </div>

            {/* Step 2: WAEC Lookup */}
            <div className="flex items-start gap-3.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  request?.processingStatus === "PROCESSING" ||
                  request?.processingStatus === "RESULT_CHECKED" ||
                  request?.processingStatus === "PDF_UPLOADED" ||
                  isCompleted
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  WAEC Voucher Lookup
                </div>
                <div className="text-xs text-slate-400">
                  Checked on the official WAEC database
                </div>
              </div>
            </div>

            {/* Step 3: PDF Generated & Emailed */}
            <div className="flex items-start gap-3.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isCompleted
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  Official PDF Email Dispatch
                </div>
                <div className="text-xs text-slate-400">
                  {isCompleted
                    ? `Dispatched to ${request?.email}`
                    : "Will be emailed with official PDF attachment"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Summary Receipt */}
        {request && (
          <div className="border border-slate-800 rounded-2xl p-5 bg-[#101624] space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Candidate Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Candidate Name:</span>
                <span className="font-bold text-white text-sm">
                  {request.fullName}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Index Number:</span>
                <span className="font-bold text-white text-sm font-mono">
                  {request.indexNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Examination:</span>
                <span className="font-bold text-white text-sm">
                  {request.examType} ({request.examYear})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Delivery Email:</span>
                <span className="font-bold text-red-400 text-sm">
                  {request.email}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Helpline Link */}
        <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Have questions or want to verify with our team directly?
          </div>

          <a
            href={`https://wa.me/${supportNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            SEND DETAILS ON WHATSAPP
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
    <div className="flex flex-col min-h-screen bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="py-24 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
              <span className="text-sm font-medium">Loading receipt details...</span>
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
