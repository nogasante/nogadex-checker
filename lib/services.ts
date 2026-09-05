import { prisma } from "@/lib/prisma";

export interface ServiceConfig {
  key: string;
  name: string;
  category: "SERVICE" | "EXAM_TYPE";
  enabled: boolean;
  message?: string | null;
  price?: number | null;
  updatedAt?: Date;
}

export const DEFAULT_SERVICES: Record<string, Omit<ServiceConfig, "key">> = {
  // Primary Services
  service_check_result: {
    name: "Check Result & Get PDF",
    category: "SERVICE",
    enabled: true,
    price: 30.0,
    message: "WAEC result checking & PDF delivery is running smoothly.",
  },
  service_buy_pin: {
    name: "Buy Checker PIN (SMS)",
    category: "SERVICE",
    enabled: true,
    price: 24.0,
    message: "Scratch card PINs are available with instant SMS delivery.",
  },
  service_admissions: {
    name: "University Admissions Guidance",
    category: "SERVICE",
    enabled: true,
    price: null,
    message: "Free cut-off points & admissions assistance on WhatsApp.",
  },

  // Exam Types
  exam_wassce: {
    name: "WASSCE (School Candidates)",
    category: "EXAM_TYPE",
    enabled: true,
    message: null,
  },
  exam_novdec: {
    name: "WASSCE Private / NOVDEC",
    category: "EXAM_TYPE",
    enabled: true,
    message: null,
  },
  exam_bece_school: {
    name: "BECE (School Candidates)",
    category: "EXAM_TYPE",
    enabled: true,
    message: null,
  },
  exam_bece_private: {
    name: "BECE (Private Candidates)",
    category: "EXAM_TYPE",
    enabled: true,
    message: null,
  },
  exam_gbce: {
    name: "GBCE",
    category: "EXAM_TYPE",
    enabled: true,
    message: null,
  },
  exam_abce: {
    name: "ABCE",
    category: "EXAM_TYPE",
    enabled: true,
    message: null,
  },
};

/**
 * Maps standard exam type codes (from forms/database) to setting keys
 */
export function getExamSettingKey(examType: string): string {
  const normalized = (examType || "").toUpperCase().replace(/[^A-Z0-9_]/g, "");
  switch (normalized) {
    case "WASSCE":
      return "exam_wassce";
    case "NOVDEC":
      return "exam_novdec";
    case "BECE_SCHOOL":
    case "BECE":
      return "exam_bece_school";
    case "BECE_PRIVATE":
      return "exam_bece_private";
    case "GBCE":
      return "exam_gbce";
    case "ABCE":
      return "exam_abce";
    default:
      return `exam_${normalized.toLowerCase()}`;
  }
}

/**
 * Retrieves all service and exam type settings from the database,
 * merging with default values for any unconfigured items.
 */
export async function getAllServiceSettings(): Promise<ServiceConfig[]> {
  try {
    const dbSettings = await prisma.serviceSetting.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    const settingsMap = new Map<string, ServiceConfig>();

    // 1. Populate with defaults
    for (const [key, val] of Object.entries(DEFAULT_SERVICES)) {
      settingsMap.set(key, {
        key,
        name: val.name,
        category: val.category,
        enabled: val.enabled,
        message: val.message,
        price: val.price,
      });
    }

    // 2. Override with stored database values
    for (const item of dbSettings) {
      settingsMap.set(item.key, {
        key: item.key,
        name: item.name || DEFAULT_SERVICES[item.key]?.name || item.key,
        category: (item.category as "SERVICE" | "EXAM_TYPE") || "SERVICE",
        enabled: item.enabled,
        message: item.message,
        price: item.price,
        updatedAt: item.updatedAt,
      });
    }

    return Array.from(settingsMap.values());
  } catch (error) {
    console.error("Error fetching service settings, falling back to defaults:", error);
    // Fallback gracefully to default definitions if database isn't reached
    return Object.entries(DEFAULT_SERVICES).map(([key, val]) => ({
      key,
      ...val,
    }));
  }
}

/**
 * Retrieves setting for a single service or exam type key
 */
export async function getServiceSetting(key: string): Promise<ServiceConfig> {
  const defaultSetting = DEFAULT_SERVICES[key] || {
    name: key,
    category: key.startsWith("exam_") ? "EXAM_TYPE" : "SERVICE",
    enabled: true,
    message: null,
    price: null,
  };

  try {
    const item = await prisma.serviceSetting.findUnique({
      where: { key },
    });

    if (!item) {
      return { key, ...defaultSetting };
    }

    return {
      key: item.key,
      name: item.name || defaultSetting.name,
      category: (item.category as "SERVICE" | "EXAM_TYPE") || defaultSetting.category,
      enabled: item.enabled,
      message: item.message,
      price: item.price,
      updatedAt: item.updatedAt,
    };
  } catch {
    return { key, ...defaultSetting };
  }
}

/**
 * Checks if a specific service or exam type is enabled
 */
export async function isServiceOrExamEnabled(keyOrExamType: string): Promise<{
  enabled: boolean;
  name: string;
  message?: string | null;
}> {
  const settingKey = keyOrExamType.startsWith("service_") || keyOrExamType.startsWith("exam_")
    ? keyOrExamType
    : getExamSettingKey(keyOrExamType);

  const setting = await getServiceSetting(settingKey);
  return {
    enabled: setting.enabled,
    name: setting.name,
    message: setting.message,
  };
}

/**
 * Updates a service or exam type setting in the database
 */
export async function updateServiceSetting(
  key: string,
  data: {
    enabled?: boolean;
    message?: string | null;
    price?: number | null;
    name?: string;
  }
): Promise<ServiceConfig> {
  const defaultVal = DEFAULT_SERVICES[key];
  const name = data.name || defaultVal?.name || key;
  const category = defaultVal?.category || (key.startsWith("exam_") ? "EXAM_TYPE" : "SERVICE");

  const updated = await prisma.serviceSetting.upsert({
    where: { key },
    update: {
      ...(data.enabled !== undefined && { enabled: data.enabled }),
      ...(data.message !== undefined && { message: data.message }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.name !== undefined && { name: data.name }),
    },
    create: {
      key,
      name,
      category,
      enabled: data.enabled !== undefined ? data.enabled : true,
      message: data.message !== undefined ? data.message : null,
      price: data.price !== undefined ? data.price : defaultVal?.price || null,
    },
  });

  return {
    key: updated.key,
    name: updated.name,
    category: updated.category as "SERVICE" | "EXAM_TYPE",
    enabled: updated.enabled,
    message: updated.message,
    price: updated.price,
    updatedAt: updated.updatedAt,
  };
}
