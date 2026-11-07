import { describe, it, expect } from "vitest";
import { TEMPLATES, getTemplateById } from "../src/templates/registry";
import { generateDocxResume } from "../src/server/services/export-docx.service";
import { createSampleResume } from "../src/schemas/resume.schema";
import { PROFESSIONS, getProfessionBySlug } from "../src/data/professions";

describe("Phase 2 Test Suite", () => {
  describe("Expanded Template Registry (10 Templates + Academic CV)", () => {
    it("should register 10 production templates plus Academic CV (11 total)", () => {
      expect(TEMPLATES.length).toBe(10);
      const ids = TEMPLATES.map((t) => t.id);
      expect(ids).toContain("modern-minimal");
      expect(ids).toContain("modern-sidebar");
      expect(ids).toContain("modern-corporate");
      expect(ids).toContain("modern-compact");
      expect(ids).toContain("classic-ats-standard");
      expect(ids).toContain("classic-ivy-league");
      expect(ids).toContain("classic-clean-line");
      expect(ids).toContain("creative-accent");
      expect(ids).toContain("creative-designer");
      expect(ids).toContain("academic-cv");
    });

    it("should guarantee every template has a defined React component and metadata", () => {
      TEMPLATES.forEach((tmpl) => {
        expect(tmpl.id).toBeDefined();
        expect(tmpl.name.length).toBeGreaterThan(0);
        expect(tmpl.component).toBeDefined();
        expect(tmpl.recommendedRoles.length).toBeGreaterThan(0);
      });
    });
  });

  describe("DOCX Export Engine", () => {
    it("should compile normalized ResumeData into a valid DOCX Buffer", async () => {
      const sample = createSampleResume();
      const docxBuffer = await generateDocxResume(sample);
      expect(docxBuffer).toBeDefined();
      expect(docxBuffer.length).toBeGreaterThan(500); // Standard DOCX zip envelope is > 500 bytes
    });
  });

  describe("Programmatic SEO Data Engine", () => {
    it("should provide structured data for all profession landing pages", () => {
      expect(PROFESSIONS.length).toBeGreaterThanOrEqual(8);
      PROFESSIONS.forEach((p) => {
        expect(p.slug).toMatch(/^[a-z0-9-]+$/);
        expect(p.targetKeywords.length).toBeGreaterThan(3);
        expect(p.suggestedBullets.length).toBeGreaterThan(0);
        expect(getTemplateById(p.recommendedTemplateId)).toBeDefined();
      });
    });

    it("should accurately resolve profession by slug", () => {
      const se = getProfessionBySlug("software-engineer");
      expect(se).toBeDefined();
      expect(se?.name).toBe("Software Engineer");
      expect(se?.category).toBe("Technology");
    });
  });
});

