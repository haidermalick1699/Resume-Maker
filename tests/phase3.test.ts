import { describe, it, expect } from "vitest";
import { auditResumeAts } from "../src/server/services/ats.service";
import { parseJsonResume, parsePlainTextResume } from "../src/server/services/import.service";
import { createSampleResume } from "../src/schemas/resume.schema";

describe("Phase 3 Test Suite — AI, ATS, Import & RTL", () => {
  describe("ATS Scoring & Audit Engine", () => {
    it("should calculate a high ATS score (>= 85, Grade A/B) for a complete sample resume", () => {
      const sample = createSampleResume();
      const result = auditResumeAts(sample);

      expect(result.score).toBeGreaterThanOrEqual(85);
      expect(["A", "B"]).toContain(result.grade);
      expect(result.checks.length).toBeGreaterThan(5);
      expect(result.metricsCount).toBeGreaterThan(0);
    });

    it("should penalize resumes with missing names, missing contacts, or missing experience", () => {
      const incompleteResume = createSampleResume();
      incompleteResume.basics.name = "";
      incompleteResume.basics.email = "";
      incompleteResume.basics.phone = "";
      incompleteResume.work = [];

      const result = auditResumeAts(incompleteResume);
      expect(result.score).toBeLessThan(70);
      expect(["C", "D", "F"]).toContain(result.grade);

      const criticalChecks = result.checks.filter((c) => c.severity === "critical");
      expect(criticalChecks.length).toBeGreaterThanOrEqual(2);
    });

    it("should flag buzzwords like 'rockstar' or 'hard worker'", () => {
      const buzzwordResume = createSampleResume();
      buzzwordResume.work[0].highlights.push("Hard worker and team player doing tasks as a ninja");

      const result = auditResumeAts(buzzwordResume);
      expect(result.buzzwordWarnings.length).toBeGreaterThan(0);
      expect(result.buzzwordWarnings).toContain("hard worker");
    });
  });

  describe("Resume Import Engine", () => {
    it("should correctly parse standard JSON Resume input", () => {
      const rawJson = {
        basics: {
          name: "Ada Lovelace",
          label: "First Programmer",
          email: "ada@analyticalengine.org",
          summary: "Pioneer of computing algorithms.",
        },
        work: [
          {
            name: "Babbage Labs",
            position: "Lead Algorithmist",
            highlights: ["Designed Bernoulli numbers computation algorithm."],
          },
        ],
        skills: [
          {
            name: "Mathematics",
            keywords: ["Algebra", "Analytical Engine", "Calculus"],
          },
        ],
      };

      const imported = parseJsonResume(rawJson);
      expect(imported.basics.name).toBe("Ada Lovelace");
      expect(imported.basics.email).toBe("ada@analyticalengine.org");
      expect(imported.work).toHaveLength(1);
      expect(imported.work[0].id).toBeDefined();
      expect(imported.work[0].name).toBe("Babbage Labs");
      expect(imported.skills[0].keywords).toContain("Analytical Engine");
    });

    it("should extract email, name, and phone from unstructured plain text", () => {
      const plainText = `
Charles Babbage
Computer Pioneer
charles@differenceengine.org | +44 20 7946 0919
London, UK

SUMMARY
Inventor of the mechanical computer and visionary mathematician.

SKILLS
Mechanical Engineering, Mathematics, Astronomy, Calculus
      `;

      const imported = parsePlainTextResume(plainText);
      expect(imported.basics.name).toBe("Charles Babbage");
      expect(imported.basics.email).toBe("charles@differenceengine.org");
      expect(imported.basics.phone).toBe("+44 20 7946 0919");
      expect(imported.skills.length).toBeGreaterThan(0);
      expect(imported.skills[0].keywords).toContain("Calculus");
    });
  });
});
