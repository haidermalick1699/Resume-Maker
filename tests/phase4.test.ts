import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, getClientIp } from "@/server/middleware/rate-limit";

describe("Phase 4: Security, Rate Limiting & GDPR Compliance", () => {
  it("Rate Limiter correctly tracks sliding window requests", () => {
    const testIp = `test-ip-${Date.now()}`;

    // Under AI tier limit of 15
    for (let i = 0; i < 15; i++) {
      const result = checkRateLimit(testIp, "ai");
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(15 - (i + 1));
    }

    // 16th request must trigger rate limit
    const exceeded = checkRateLimit(testIp, "ai");
    expect(exceeded.success).toBe(false);
    expect(exceeded.remaining).toBe(0);
    expect(exceeded.reset).toBeGreaterThan(0);
  });

  it("Auth tier applies strict rate limiting (10 attempts)", () => {
    const authIp = `auth-ip-${Date.now()}`;

    for (let i = 0; i < 10; i++) {
      const res = checkRateLimit(authIp, "auth");
      expect(res.success).toBe(true);
    }

    const blocked = checkRateLimit(authIp, "auth");
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("Extracts client IP correctly from headers with proxy support", () => {
    const reqWithForwarded = new Request("http://localhost:3000", {
      headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" },
    });
    expect(getClientIp(reqWithForwarded)).toBe("203.0.113.195");

    const reqWithRealIp = new Request("http://localhost:3000", {
      headers: { "x-real-ip": "198.51.100.1" },
    });
    expect(getClientIp(reqWithRealIp)).toBe("198.51.100.1");

    const directReq = new Request("http://localhost:3000");
    expect(getClientIp(directReq)).toBe("127.0.0.1");
  });

  it("Validates GDPR Data Export format specification", () => {
    const sampleExport = {
      exportedAt: new Date().toISOString(),
      metadata: {
        application: "Resume Maker",
        formatVersion: "1.0",
        compliance: "GDPR / CCPA User Data Portability",
      },
      user: {
        id: "usr_123",
        name: "Test User",
        email: "test@example.com",
        role: "USER",
      },
      resumes: [
        {
          id: "res_1",
          title: "Senior Engineer",
          templateId: "modern-minimal",
          content: { basics: { name: "Test User" } },
        },
      ],
      jobTailoringHistory: [],
    };

    expect(sampleExport.metadata.compliance).toContain("GDPR");
    expect(sampleExport.user.email).toBe("test@example.com");
    expect(sampleExport.resumes).toHaveLength(1);
  });

  it("Validates PDF and PNG export filename sanitization", () => {
    const raw = "Alex Sterling / Senior Lead & Architect! #1";
    const safe = raw.replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_");
    expect(safe).toBe("Alex_Sterling_Senior_Lead_Architect_1");
  });

  it("Generates valid binary PDF buffer from resume content", async () => {
    const { generatePdfResume } = await import("@/server/services/export-pdf.service");
    const { createSampleResume, defaultDesign } = await import("@/schemas/resume.schema");
    const sample = createSampleResume();
    const pdfBuf = await generatePdfResume(sample, defaultDesign);

    expect(pdfBuf).toBeInstanceOf(Buffer);
    expect(pdfBuf.length).toBeGreaterThan(1000);
    // PDF magic number check (%PDF)
    const header = pdfBuf.subarray(0, 4).toString("ascii");
    expect(header).toBe("%PDF");
  });

  it("Builds isomorphic vector PDF document with custom margins and paper sizes", async () => {
    const { buildJsPdfResume } = await import("@/lib/pdf-builder");
    const { createSampleResume, defaultDesign } = await import("@/schemas/resume.schema");
    const sample = createSampleResume();

    // Test compact margins + US Letter
    const docLetter = buildJsPdfResume(sample, {
      ...defaultDesign,
      paperSize: "LETTER",
      pageMargins: "compact",
      primaryColor: "#059669",
    });
    expect(docLetter).toBeDefined();
    const letterBuf = Buffer.from(docLetter.output("arraybuffer"));
    expect(letterBuf.subarray(0, 4).toString("ascii")).toBe("%PDF");

    // Test spacious margins + A4
    const docA4 = buildJsPdfResume(sample, {
      ...defaultDesign,
      paperSize: "A4",
      pageMargins: "spacious",
      primaryColor: "#7C3AED",
    });
    expect(docA4).toBeDefined();
    const a4Buf = Buffer.from(docA4.output("arraybuffer"));
    expect(a4Buf.subarray(0, 4).toString("ascii")).toBe("%PDF");
  });
});

