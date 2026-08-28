export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<{ success: boolean; error?: string }> {
  const secretKey =
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
    "0x4AAAAAAEfx6XPrg1H_eoMvd9RdDpOSpaY";

  if (!token) {
    return { success: false, error: "Missing Turnstile verification token." };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      return { success: true };
    } else {
      console.warn("Cloudflare verification rejection:", data);
      return {
        success: false,
        error: data["error-codes"]?.join(", ") || "Cloudflare verification failed.",
      };
    }
  } catch (error: unknown) {
    console.error("Cloudflare Turnstile verify error:", error);
    return { success: process.env.NODE_ENV !== "production" };
  }
}
