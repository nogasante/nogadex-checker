"use client";

import { useEffect, useState, use, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Loader2,
  ArrowLeft,
  Download,
  MessageCircle,
  Bell,
  BellRing,
  Share2,
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
  const [paymentNotice, setPaymentNotice] = useState("");
  const [notifPermission, setNotifPermission] = useState<string>("default");

  const supportNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/requests/${requestId}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order not found. Please verify your Request ID.");
      }

      setRequest(data.request);

      // Only attempt verification if payment is currently pending and a ref is in query
      if (data.request.paymentStatus === "PENDING" && refFromQuery) {
        verifyPayment(refFromQuery);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not load order details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference: string) => {
    try {
      setVerifying(true);
      setPaymentNotice("");

      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, requestId }),
      });

      const data = await res.json();

      if (data.success && data.paymentStatus === "PAID") {
        const refreshedRes = await fetch(`/api/requests/${requestId}`);
        const refreshedData = await refreshedRes.json();
        if (refreshedData.success) {
          setRequest(refreshedData.request);
        }
      } else {
        setPaymentNotice(data.message || "Payment not received yet. If you cancelled the transaction, please complete payment below.");
      }
    } catch (err) {
      console.error("Verification check failed:", err);
      setPaymentNotice("Could not verify with Paystack. Click 'Verify Payment' to check again.");
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
    }, 12000);

    return () => clearInterval(interval);
  }, [requestId]);

  // Trigger native browser notification when order reaches COMPLETED
  useEffect(() => {
    if (request?.processingStatus === "COMPLETED" && notifPermission === "granted") {
      try {
        new Notification("🎓 WAEC Result Slip Ready!", {
          body: `Official WAEC slip ready for ${request.fullName}. Tap to download your PDF.`,
          icon: "/logo.png",
        });
      } catch (e) {
        console.log("Notification note:", e);
      }
    }
  }, [request?.processingStatus, notifPermission]);

  const requestNotification = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const perm = await Notification.requestPermission();
      setNotifPermission(perm);
      if (perm === "granted") {
        new Notification("🔔 Notifications Enabled", {
          body: "We will alert you the moment your WAEC result slip is generated!",
          icon: "/logo.png",
        });
      }
    }
  };

  const whatsappMessage = request
    ? `Hello Nogadex Consults, I am following up on my WAEC result request.\nName: ${request.fullName}\nIndex: ${request.indexNumber}\nExam: ${request.examType} (${request.examYear})\nRequest ID: #${request.requestId}`
    : `Hello Nogadex Consults, I need assistance with request #${requestId}`;

  const isPaid = request?.paymentStatus === "PAID";
  const isCompleted = request?.processingStatus === "COMPLETED";
  const isFailed = request?.paymentStatus === "FAILED" || request?.processingStatus === "FAILED";

  return (
    <div className="max-w-lg mx-auto space-y-6">
      
      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Status Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-2xs shrink-0">
              <Image
                src="/logo.png"
                alt="Nogadex"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block">
                Order Tracking
              </span>
              <h1 className="text-lg font-bold text-slate-900 font-mono tracking-tight">
                #{requestId}
              </h1>
            </div>
          </div>

          <button
            onClick={fetchStatus}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Error Notice if fetch failed */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-red-950">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Unable to find order</span>
            </div>
            <p className="leading-relaxed text-red-800">{error}</p>
          </div>
        )}

        {/* Payment Incomplete / Cancelled Notice */}
        {!isPaid && paymentNotice && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Payment Incomplete</span>
              <p className="text-amber-800 leading-relaxed">{paymentNotice}</p>
            </div>
          </div>
        )}

        {/* Notification Opt-in Prompt */}
        {!isCompleted && notifPermission === "default" && (
          <button
            type="button"
            onClick={requestNotification}
            className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>Get instant phone alert when slip is ready</span>
            </div>
            <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-md border border-red-200/60">
              Enable
            </span>
          </button>
        )}

        {/* Notification Enabled Badge */}
        {!isCompleted && notifPermission === "granted" && (
          <div className="px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-emerald-800 text-[11px] font-medium flex items-center gap-2">
            <BellRing className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Browser alerts active: We will notify you the moment your PDF is ready.</span>
          </div>
        )}

        {/* Live Status Summary Card */}
        {request && (
          <div
            className={`p-4 rounded-xl border space-y-2 transition-all ${
              isCompleted
                ? "bg-emerald-50/70 border-emerald-200"
                : isFailed
                ? "bg-red-50/70 border-red-200"
                : isPaid
                ? "bg-slate-50 border-slate-200"
                : "bg-amber-50/50 border-amber-200/80"
            }`}
          >
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isFailed ? (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              ) : isPaid ? (
                <Clock className="w-4 h-4 text-slate-700 shrink-0 animate-pulse" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <h2 className="text-sm font-bold text-slate-900">
                {isCompleted
                  ? "Result Checked & Slip Delivered"
                  : isFailed
                  ? "Payment Incomplete / Cancelled"
                  : isPaid
                  ? "Payment Confirmed — Generating PDF"
                  : "Awaiting Payment"}
              </h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {isCompleted
                ? `Your official WAEC printable result slip was generated and sent to ${request.email}. You can download it directly below.`
                : isFailed
                ? "Payment was not completed. Your result cannot be processed until payment of GH₵30.00 is received."
                : isPaid
                ? "We received your payment and are currently retrieving your official grades from WAEC."
                : "Payment has not been confirmed yet. If you were debited, click 'Verify Payment'. If you cancelled or closed the window, click 'Verify Payment' after paying."}
            </p>
          </div>
        )}

        {/* 3-Step Lifecycle Visual */}
        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-semibold text-slate-500">
            Order Progress
          </h3>

          <div className="space-y-2 text-xs">
            {/* Step 1: Payment */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isPaid ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {isPaid ? "✓" : "1"}
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span className="font-medium text-slate-900">Payment</span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {isPaid ? "Received (GH₵30.00)" : "Pending (GH₵30.00)"}
                </span>
              </div>
            </div>

            {/* Step 2: WAEC Verification */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : isPaid
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {isCompleted ? "✓" : "2"}
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span className="font-medium text-slate-900">WAEC Portal Verification</span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {isCompleted ? "Grades Retrieved" : isPaid ? "Processing…" : "Waiting for payment"}
                </span>
              </div>
            </div>

            {/* Step 3: PDF Delivery */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isCompleted ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {isCompleted ? "✓" : "3"}
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span className="font-medium text-slate-900">Printable PDF Delivery</span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {isCompleted ? "Sent to Email" : "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Information Card */}
        {request && (
          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
            <h3 className="font-semibold text-slate-500">
              Candidate Information
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[11px]">Candidate</span>
                <span className="font-semibold text-slate-900">{request.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Index Number</span>
                <span className="font-mono font-bold text-slate-900">{request.indexNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Examination</span>
                <span className="font-medium text-slate-900">{request.examType} ({request.examYear})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Destination Email</span>
                <span className="font-medium text-slate-900 truncate block">{request.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* COMPLETED STATE ACTION: Direct PDF Download & Viral WhatsApp Share */}
        {request && isCompleted && (
          <div className="pt-2 space-y-2.5">
            <a
              href={`/api/requests/${requestId}/download`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Result Slip PDF</span>
            </a>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `🎓 I just checked my WAEC result and received my official printable PDF slip on Nogadex Consults! You can check yours too with instant MoMo payment here: https://nogadexconsults.app`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl font-medium text-xs flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Share Nogadex with Classmates on WhatsApp</span>
            </a>
          </div>
        )}

        {/* PENDING STATE ACTIONS: Verify Payment */}
        {request && !isPaid && (
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={() => verifyPayment(refFromQuery || requestId)}
              disabled={verifying}
              className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white shadow-md shadow-red-600/20 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${verifying ? "animate-spin" : ""}`} />
              <span>{verifying ? "Checking with Paystack…" : "Verify Payment"}</span>
            </button>

            <p className="text-center text-[11px] text-slate-500">
              Paid via MoMo prompt on your phone? Click Verify Payment above.
            </p>
          </div>
        )}

      </div>

      {/* Support Direct Action */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <p className="font-bold text-slate-900">Need help with this order?</p>
          <p className="text-slate-500">Our support desk is available on WhatsApp 24/7.</p>
        </div>
        <a
          href={`https://wa.me/${supportNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold transition-colors shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Chat on WhatsApp</span>
        </a>
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
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="py-24 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-slate-700" />
              <span className="text-xs font-medium">Loading tracking details...</span>
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
