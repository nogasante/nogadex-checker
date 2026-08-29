/**
 * Native Web Audio Synthesizer & Web Notification Engine for Nogadex Admin.
 * Runs 100% offline with zero external audio assets or lag.
 */

// Dual-tone high-fidelity chime for new paid orders
export function playAdminOrderChime() {
  if (typeof window === "undefined") return;

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();

    // First tone (D5 - 587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.35);

    // Second tone (A5 - 880 Hz) - Higher pitch for pleasant confirmation
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.35, ctx.currentTime + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.12);
    osc2.stop(ctx.currentTime + 0.65);

    // Trigger haptic vibration on mobile if supported
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  } catch (err) {
    console.log("Audio alert playback note:", err);
  }
}

/**
 * Request permission for System Web Notifications
 */
export async function requestAdminNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch (err) {
    console.error("Failed to request notification permission:", err);
    return "denied";
  }
}

/**
 * Trigger a System Push Notification
 */
export function sendAdminPushNotification(title: string, body: string, urlPath: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;

  if (Notification.permission !== "granted") return;

  try {
    const notif = new Notification(title, {
      body,
      icon: "/logo.png",
      badge: "/logo.png",
      tag: `nogadex-order-${Date.now()}`,
      requireInteraction: true,
    });

    notif.onclick = function () {
      window.focus();
      if (urlPath) {
        window.location.href = urlPath;
      }
      notif.close();
    };
  } catch (err) {
    console.error("Failed to fire system notification:", err);
  }
}
