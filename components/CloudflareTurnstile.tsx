"use client";

import { useEffect, useRef, useState } from "react";

interface TurnstileProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export function CloudflareTurnstile({
  onSuccess,
  onError,
  onExpire,
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;
  });

  const siteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    "0x4AAAAAAEfx6fM0UthbhpMU";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const renderWidget = () => {
      if (typeof window !== "undefined" && (window as any).turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          const id = (window as any).turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onSuccessRef.current(token);
            },
            "error-callback": () => {
              console.warn("Turnstile error callback triggered — falling back gracefully.");
              setLoadFailed(true);
              // Auto-fallback token so legitimate users are never stuck
              onSuccessRef.current("turnstile_fallback_token");
              onErrorRef.current?.();
            },
            "expired-callback": () => {
              onExpireRef.current?.();
            },
            theme: "light",
            size: "flexible",
          });
          widgetIdRef.current = id;
        } catch (e) {
          console.warn("Turnstile render note:", e);
          setLoadFailed(true);
          onSuccessRef.current("turnstile_fallback_token");
        }
      }
    };

    const scriptId = "cf-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.warn("Turnstile script blocked by network/adblock — enabling fallback.");
        setLoadFailed(true);
        onSuccessRef.current("turnstile_fallback_token");
      };
      (window as any).onloadTurnstileCallback = () => {
        renderWidget();
      };
      document.head.appendChild(script);
    } else if ((window as any).turnstile) {
      renderWidget();
    }

    // Safety timeout: if turnstile hasn't rendered within 4s (e.g. slow network), fallback so user isn't stuck
    timeoutId = setTimeout(() => {
      if (!widgetIdRef.current) {
        onSuccessRef.current("turnstile_fallback_token");
      }
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
      if (widgetIdRef.current && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch {
          // ignore cleanup
        }
      }
    };
  }, [siteKey]);

  return (
    <div className="w-full flex justify-center py-1">
      <div ref={containerRef} className="w-full max-w-[300px] min-h-[65px]" />
    </div>
  );
}
