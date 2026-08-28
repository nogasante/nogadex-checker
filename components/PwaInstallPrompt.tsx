"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Bell, X, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(Boolean(standalone));

    if (standalone) return;

    // Check if user dismissed recently (24 hours)
    const dismissedAt = localStorage.getItem("nogadex_pwa_dismissed");
    if (dismissedAt) {
      const hoursSinceDismissed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60);
      if (hoursSinceDismissed < 24) return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Standard Android / Chrome / Edge beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If on iOS and not standalone, show after a 3-second delay
    let iosTimer: NodeJS.Timeout;
    if (isIosDevice && !standalone) {
      iosTimer = setTimeout(() => {
        setShowPrompt(true);
      }, 3500);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }

    // Request notifications permission alongside install
    if ("Notification" in window && Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch (e) {
        console.log("Notification request note:", e);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("nogadex_pwa_dismissed", Date.now().toString());
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-950 text-white rounded-2xl border border-white/10 shadow-2xl p-4 space-y-3.5 backdrop-blur-md">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs shrink-0 border border-white/10 bg-white/5">
              <Image
                src="/logo.png"
                alt="Nogadex"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">
                Install Nogadex App
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Fast WAEC checking &amp; instant alerts
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Benefits text */}
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Install on your home screen for 1-tap results, PDF result slip downloads, and live notifications.
        </p>

        {/* iOS vs Android / Desktop Actions */}
        {isIos ? (
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Share className="w-3.5 h-3.5 text-red-500" />
              <span>To install on iPhone / iPad:</span>
            </div>
            <p className="text-slate-400">
              Tap the <span className="font-semibold text-white">Share</span> button in Safari and select <span className="font-semibold text-white">&quot;Add to Home Screen&quot;</span>.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 h-9 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.99] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-red-900/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="h-9 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Not Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
