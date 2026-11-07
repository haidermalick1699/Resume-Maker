import { ResumeData, createDefaultResume } from "@/schemas/resume.schema";
import { generateId } from "@/lib/utils";

export function parseJsonResume(rawJson: any): ResumeData {
  const result = createDefaultResume();

  if (!rawJson || typeof rawJson !== "object") return result;

  // 1. Basics
  if (rawJson.basics) {
    const b = rawJson.basics;
    result.basics.name = b.name || "";
    result.basics.label = b.label || "";
    result.basics.image = b.image || "";
    result.basics.email = b.email || "";
    result.basics.phone = b.phone || "";
    result.basics.url = b.url || "";
    result.basics.summary = b.summary || "";

    if (b.location) {
      result.basics.location = {
        address: b.location.address || "",
        postalCode: b.location.postalCode || "",
        city: b.location.city || "",
        region: b.location.region || "",
        countryCode: b.location.countryCode || "",
      };
    }

    if (Array.isArray(b.profiles)) {
      result.basics.profiles = b.profiles.map((p: any) => ({
        id: generateId("prof"),
        network: p.network || "Link",
        username: p.username || "",
        url: p.url || "",
      }));
    }
  }

  // 2. Work Experience
  if (Array.isArray(rawJson.work)) {
    result.work = rawJson.work.map((w: any) => ({
      id: generateId("job"),
      name: w.name || w.company || "",
      position: w.position || "",
      url: w.url || "",
      startDate: w.startDate || "",
      endDate: w.endDate || "",
      current: !w.endDate || w.endDate.toLowerCase() === "present",
      location: w.location || "",
      summary: w.summary || "",
      highlights: Array.isArray(w.highlights) ? w.highlights : [],
    }));
  }

  // 3. Education
  if (Array.isArray(rawJson.education)) {
    result.education = rawJson.education.map((e: any) => ({
      id: generateId("edu"),
      institution: e.institution || "",
      url: e.url || "",
      area: e.area || "",
      studyType: e.studyType || "",
      startDate: e.startDate || "",
      endDate: e.endDate || "",
      current: !e.endDate || e.endDate.toLowerCase() === "present",
      score: e.score || e.gpa || "",
      courses: Array.isArray(e.courses) ? e.courses : [],
      highlights: Array.isArray(e.highlights) ? e.highlights : [],
    }));
  }

  // 4. Skills
  if (Array.isArray(rawJson.skills)) {
    result.skills = rawJson.skills.map((s: any) => ({
      id: generateId("skill"),
      name: s.name || "Skills",
      level: s.level || "Advanced",
      keywords: Array.isArray(s.keywords) ? s.keywords : [],
    }));
  }

  // 5. Projects
  if (Array.isArray(rawJson.projects)) {
    result.projects = rawJson.projects.map((p: any) => ({
      id: generateId("proj"),
      name: p.name || "",
      description: p.description || "",
      highlights: Array.isArray(p.highlights) ? p.highlights : [],
      keywords: Array.isArray(p.keywords) ? p.keywords : [],
      startDate: p.startDate || "",
      endDate: p.endDate || "",
      url: p.url || "",
      githubUrl: p.githubUrl || "",
    }));
  }

  return result;
}

export function parsePlainTextResume(rawText: string): ResumeData {
  const result = createDefaultResume();
  if (!rawText || !rawText.trim()) return result;

  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);

  // 1. Extract email
  const emailMatch = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
  if (emailMatch) result.basics.email = emailMatch[1];

  // 2. Extract phone
  const phoneMatch = rawText.match(/(\+?\d[\d\s().-]{7,}\d)/);
  if (phoneMatch) result.basics.phone = phoneMatch[1];

  // 3. First non-empty line as name
  if (lines.length > 0) {
    result.basics.name = lines[0];
  }

  // 4. Second line as headline if short
  if (lines.length > 1 && lines[1].length < 60 && !lines[1].includes("@")) {
    result.basics.label = lines[1];
  }

  // 5. Group lines under simple sections
  let currentSection = "";
  const summaryLines: string[] = [];
  const skillKeywords: string[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const upper = line.toUpperCase();

    if (upper.includes("SUMMARY") || upper.includes("PROFILE")) {
      currentSection = "summary";
      continue;
    } else if (upper.includes("EXPERIENCE") || upper.includes("EMPLOYMENT")) {
      currentSection = "experience";
      continue;
    } else if (upper.includes("EDUCATION")) {
      currentSection = "education";
      continue;
    } else if (upper.includes("SKILLS")) {
      currentSection = "skills";
      continue;
    }

    if (currentSection === "summary") {
      summaryLines.push(line);
    } else if (currentSection === "skills") {
      // Split by commas
      const words = line.split(/[,•|]/).map((w) => w.trim()).filter(Boolean);
      skillKeywords.push(...words);
    }
  }

  if (summaryLines.length > 0) {
    result.basics.summary = summaryLines.join(" ");
  }

  if (skillKeywords.length > 0) {
    result.skills.push({
      id: generateId("skill"),
      name: "Core Skills",
      level: "Advanced",
      keywords: Array.from(new Set(skillKeywords)),
    });
  }

  return result;
}

