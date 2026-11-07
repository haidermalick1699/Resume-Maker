import { NextResponse } from "next/server";

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

const TIER_CONFIGS: Record<string, RateLimitConfig> = {
  ai: { limit: 15, windowMs: 60 * 1000 }, // 15 requests per minute
  auth: { limit: 10, windowMs: 15 * 60 * 1000 }, // 10 attempts per 15 minutes
  export: { limit: 25, windowMs: 60 * 1000 }, // 25 downloads per minute
  general: { limit: 120, windowMs: 60 * 1000 }, // 120 general requests per minute
};

interface WindowRecord {
  timestamps: number[];
}

// In-memory sliding window store
const memoryStore = new Map<string, WindowRecord>();

// Periodic cleanup every 5 minutes to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    memoryStore.forEach((record, key) => {
      // Retain only timestamps within the last 15 minutes
      record.timestamps = record.timestamps.filter((t: number) => now - t < 15 * 60 * 1000);
      if (record.timestamps.length === 0) {
        memoryStore.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export function checkRateLimit(
  identifier: string,
  tier: "ai" | "auth" | "export" | "general" = "general"
): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
} {
  const config = TIER_CONFIGS[tier] || TIER_CONFIGS.general;
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const key = `${tier}:${identifier}`;
  let record = memoryStore.get(key);

  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(key, record);
  }

  // Filter timestamps outside current window
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  if (record.timestamps.length >= config.limit) {
    const oldest = record.timestamps[0];
    const resetTime = Math.ceil((oldest + config.windowMs - now) / 1000);
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: Math.max(1, resetTime),
    };
  }

  record.timestamps.push(now);
  const remaining = config.limit - record.timestamps.length;
  const resetTime = Math.ceil(config.windowMs / 1000);

  return {
    success: true,
    limit: config.limit,
    remaining,
    reset: resetTime,
  };
}

export function applyRateLimit(
  req: Request,
  tier: "ai" | "auth" | "export" | "general" = "general",
  customIdentifier?: string
): { response?: NextResponse; headers: Record<string, string> } {
  const ip = customIdentifier || getClientIp(req);
  const result = checkRateLimit(ip, tier);

  const headers = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.reset),
  };

  if (!result.success) {
    return {
      response: NextResponse.json(
        {
          error: "Rate limit exceeded. Too many requests, please try again shortly.",
          retryAfter: result.reset,
        },
        {
          status: 429,
          headers: {
            ...headers,
            "Retry-After": String(result.reset),
          },
        }
      ),
      headers,
    };
  }

  return { headers };
}
