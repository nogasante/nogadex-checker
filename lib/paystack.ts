import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";
const PAYSTACK_BASE_URL = "https://api.paystack.co";

export interface InitializePaystackParams {
  email: string;
  amountInGHS: number; // 30.00
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string; // "success", "failed", "abandoned"
    reference: string;
    amount: number; // in pesewas (3000 for 30 GHS)
    currency: string;
    paid_at: string;
    channel: string;
    customer: {
      id: number;
      email: string;
      customer_code: string;
    };
    metadata?: Record<string, unknown>;
  };
}

/**
 * Initialize a Paystack transaction for GH₵30
 */
export async function initializePaystackTransaction(
  params: InitializePaystackParams
): Promise<PaystackInitResponse> {
  const amountInPesewas = Math.round(params.amountInGHS * 100);

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: amountInPesewas,
      currency: "GHS",
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Paystack initialize error:", errorBody);
    throw new Error(`Paystack initialization failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Verify Paystack transaction directly with Paystack servers
 */
export async function verifyPaystackTransaction(
  reference: string
): Promise<PaystackVerifyResponse> {
  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Paystack verify error:", errorBody);
    throw new Error(`Paystack verification failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Verify HMAC SHA-512 signature of incoming Paystack webhook
 */
export function verifyPaystackWebhookSignature(
  rawBody: string,
  signatureHeader: string
): boolean {
  if (!PAYSTACK_SECRET_KEY || !signatureHeader) {
    return false;
  }

  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");

  return hash === signatureHeader;
}
