// InConsult Business Hub Developer API Integration
// Base URL: https://incbusinesshub.org/api/v1

export interface InconsultPinResponse {
  success: boolean;
  serial?: string;
  pin?: string;
  productType?: string;
  error?: string;
}

export interface InconsultStockResponse {
  success: boolean;
  available: number;
  productType: string;
  error?: string;
}

const INCONSULT_BASE_URL = "https://incbusinesshub.org/api/v1";

/**
 * Get API Key from environment or fallback
 */
function getApiKey(): string {
  return process.env.INCONSULT_API_KEY || "inc_ew52k9ok9orfpho55y2med";
}

/**
 * Check remaining InConsult store inventory for a specific exam type
 */
export async function checkInconsultStock(
  productType: "WASSCE" | "BECE" | "NOVDEC" = "WASSCE"
): Promise<InconsultStockResponse> {
  try {
    const apiKey = getApiKey();
    const res = await fetch(
      `${INCONSULT_BASE_URL}/pins?productType=${encodeURIComponent(productType)}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        available: 0,
        productType,
        error: `InConsult stock error (${res.status}): ${errorText}`,
      };
    }

    const data = await res.json();
    return {
      success: true,
      available: data.availableCount ?? data.count ?? data.stock ?? 0,
      productType,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to check InConsult stock";
    return {
      success: false,
      available: 0,
      productType,
      error: msg,
    };
  }
}

/**
 * Programmatically purchase 1 WAEC / BECE PIN from InConsult inventory
 */
export async function purchaseInconsultPin(
  productType: "WASSCE" | "BECE" | "NOVDEC" = "WASSCE"
): Promise<InconsultPinResponse> {
  try {
    const apiKey = getApiKey();
    const res = await fetch(`${INCONSULT_BASE_URL}/pins/purchase`, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productType: productType === "BECE" ? "BECE" : "WASSCE",
        quantity: 1,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        error: `InConsult purchase failed (${res.status}): ${errorText}`,
      };
    }

    const data = await res.json();

    // Map response serial & pin
    const serial = data.serial || data.serialNumber || data.pin?.serial;
    const pin = data.pinCode || data.pin || data.pin?.pin;

    if (!pin) {
      return {
        success: false,
        error: "InConsult did not return a valid PIN code. Check store stock.",
      };
    }

    return {
      success: true,
      serial: serial || "N/A",
      pin,
      productType,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "InConsult API network error";
    return {
      success: false,
      error: msg,
    };
  }
}
