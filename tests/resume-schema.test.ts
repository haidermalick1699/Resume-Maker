import { describe, it, expect } from "vitest";
import {
  ResumeDataSchema,
  ResumeDesignSchema,
  createDefaultResume,
  createSampleResume,
} from "../src/schemas/resume.schema";
import { TEMPLATES, getTemplateById } from "../src/templates/registry";
import { formatDate, generateId } from "../src/lib/utils";

describe("Resume Maker Core Engine Tests", () => {
  describe("Zod Resume Schema & Data Generators", () => {
    it("should validate a default blank resume structure", () => {
      const defaultResume = createDefaultResume();
      const parsed = ResumeDataSchema.safeParse(defaultResume);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.work).toHaveLength(0);
        expect(parsed.data.basics.name).toBe("");
      }
    });

    it("should validate a populated sample resume with full sections", () => {
      const sample = createSampleResume();
      const parsed = ResumeDataSchema.safeParse(sample);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.basics.name).toBe("Alex Sterling");
        expect(parsed.data.work.length).toBeGreaterThan(0);
        expect(parsed.data.education.length).toBeGreaterThan(0);
        expect(parsed.data.skills.length).toBeGreaterThan(0);
      }
    });

    it("should validate design tokens and typography options", () => {
      const designConfig = {
        paperSize: "A4",
        fontFamily: "Inter",
        fontSize: "medium",
        lineHeight: "normal",
        pageMargins: "normal",
        sectionSpacing: "normal",
        primaryColor: "#2563EB",
        textColor: "#1E293B",
        backgroundColor: "#FFFFFF",
        photo: { visible: true, shape: "circle", size: "medium", border: false },
        showWatermark: true,
      };
      const parsed = ResumeDesignSchema.safeParse(designConfig);
      expect(parsed.success).toBe(true);
    });
  });

  describe("Template Registry", () => {
    it("should register templates in registry", () => {
      expect(TEMPLATES.length).toBeGreaterThanOrEqual(5);
      const ids = TEMPLATES.map((t) => t.id);
      expect(ids).toContain("modern-minimal");
      expect(ids).toContain("modern-sidebar");
      expect(ids).toContain("classic-ats-standard");
      expect(ids).toContain("classic-ivy-league");
      expect(ids).toContain("creative-accent");
    });

    it("should retrieve a template by ID or fall back gracefully", () => {
      const template = getTemplateById("classic-ats-standard");
      expect(template.name).toBe("Classic ATS Standard");
      expect(template.isAtsOptimized).toBe(true);

      const fallback = getTemplateById("non-existent-template");
      expect(fallback).toBeDefined();
      expect(fallback.id).toBe("modern-minimal");
    });
  });

  describe("Formatting Utilities", () => {
    it("should format dates accurately into readable strings", () => {
      expect(formatDate("Present")).toBe("Present");
      expect(formatDate("current")).toBe("Present");
      expect(formatDate("2021-03")).toBe("Mar 2021");
      expect(formatDate("2023-11")).toBe("Nov 2023");
      expect(formatDate("2020")).toBe("2020");
    });

    it("should generate unique prefixed identifiers", () => {
      const id1 = generateId("job");
      const id2 = generateId("job");
      expect(id1.startsWith("job_")).toBe(true);
      expect(id1).not.toBe(id2);
    });
  });
});

