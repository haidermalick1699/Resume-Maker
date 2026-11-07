import { ResumeData } from "@/schemas/resume.schema";

export interface AtsCheckResult {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  summary: string;
  checks: {
    category: string;
    passed: boolean;
    label: string;
    description: string;
    severity: "critical" | "warning" | "good";
  }[];
  metricsCount: number;
  actionVerbCount: number;
  buzzwordWarnings: string[];
  suggestedActionVerbs: string[];
}

const STRONG_ACTION_VERBS = [
  "architected", "engineered", "spearheaded", "orchestrated", "developed",
  "designed", "streamlined", "optimized", "implemented", "authored",
  "mentored", "accelerated", "scaled", "automated", "overhauled",
  "generated", "delivered", "championed", "negotiated", "executed"
];

const CLICHE_BUZZWORDS = [
  "hard worker", "team player", "go-getter", "responsible for",
  "detail oriented", "think outside the box", "synergy", "dynamic",
  "self-motivated", "results driven", "ninja", "rockstar"
];

const SUGGESTED_VERBS_BY_ROLE: Record<string, string[]> = {
  engineering: ["Architected", "Engineered", "Refactored", "Automated", "Productionized", "Deployed"],
  management: ["Spearheaded", "Orchestrated", "Championed", "Accelerated", "Mentored", "Mobilized"],
  data: ["Modeled", "Extracted", "Analyzed", "Synthesized", "Forecasted", "Derived"],
  general: ["Delivered", "Overhauled", "Established", "Initiated", "Streamlined", "Resolved"],
};

export function auditResumeAts(resume: ResumeData): AtsCheckResult {
  const { basics, work, education, skills, projects } = resume;

  const checks: AtsCheckResult["checks"] = [];
  let score = 100;
  let metricsCount = 0;
  let actionVerbCount = 0;
  const buzzwordWarnings: string[] = [];

  // 1. Check Full Name
  if (basics.name && basics.name.trim().length >= 2) {
    checks.push({
      category: "Contact Info",
      passed: true,
      label: "Full Name Present",
      description: "Recruiters and ATS parsers require a prominent legal name header.",
      severity: "good",
    });
  } else {
    score -= 15;
    checks.push({
      category: "Contact Info",
      passed: false,
      label: "Missing Full Name",
      description: "Your full name is missing or too short. ATS parsers will fail to create your candidate profile.",
      severity: "critical",
    });
  }

  // 2. Check Email & Phone
  const hasEmail = Boolean(basics.email && basics.email.includes("@"));
  const hasPhone = Boolean(basics.phone && basics.phone.trim().length >= 7);

  if (hasEmail && hasPhone) {
    checks.push({
      category: "Contact Info",
      passed: true,
      label: "Direct Contact Information",
      description: "Both email address and phone number are present for automated recruiter outreach.",
      severity: "good",
    });
  } else {
    score -= 10;
    checks.push({
      category: "Contact Info",
      passed: false,
      label: "Incomplete Contact Info",
      description: `Missing ${!hasEmail ? "valid email" : ""} ${!hasEmail && !hasPhone ? "and " : ""}${!hasPhone ? "phone number" : ""}.`,
      severity: "critical",
    });
  }

  // 3. Location (City / State)
  if (basics.location?.city || basics.location?.region) {
    checks.push({
      category: "Contact Info",
      passed: true,
      label: "Geographic Location",
      description: "Geographic city/region enables local and timezone job filtering.",
      severity: "good",
    });
  } else {
    score -= 5;
    checks.push({
      category: "Contact Info",
      passed: false,
      label: "Location Missing",
      description: "Add your city and state/country so location-based ATS queries match your application.",
      severity: "warning",
    });
  }

  // 4. Professional Summary
  if (basics.summary && basics.summary.trim().length >= 40) {
    checks.push({
      category: "Structure",
      passed: true,
      label: "Professional Summary Included",
      description: "Strong introductory narrative matching core competencies.",
      severity: "good",
    });
  } else {
    score -= 8;
    checks.push({
      category: "Structure",
      passed: false,
      label: "Weak or Missing Summary",
      description: "Add a concise 2-3 sentence executive summary highlighting your career achievements and target role.",
      severity: "warning",
    });
  }

  // 5. Work Experience Section
  if (work && work.length > 0) {
    checks.push({
      category: "Structure",
      passed: true,
      label: "Employment History Present",
      description: `Includes ${work.length} position(s) with titles, employers, and dates.`,
      severity: "good",
    });

    // Check Bullets for Quantifiable Metrics & Action Verbs
    const allHighlights = work.flatMap((w) => w.highlights || []);

    const metricRegex = /\b(\d+[%kKmMbB]?|\$\d+|\d+\+|\d+x|\d+X)\b/;

    allHighlights.forEach((bullet) => {
      const lower = bullet.toLowerCase().trim();

      // Check metric
      if (metricRegex.test(bullet)) {
        metricsCount++;
      }

      // Check action verb
      const firstWord = lower.split(/\s+/)[0];
      if (STRONG_ACTION_VERBS.includes(firstWord)) {
        actionVerbCount++;
      }

      // Check buzzwords
      CLICHE_BUZZWORDS.forEach((cliche) => {
        if (lower.includes(cliche) && !buzzwordWarnings.includes(cliche)) {
          buzzwordWarnings.push(cliche);
        }
      });
    });

    if (metricsCount >= 3) {
      checks.push({
        category: "Content Quality",
        passed: true,
        label: `Quantified Impact (${metricsCount} metrics detected)`,
        description: "Your bullets include concrete numbers, percentages, or dollar figures proving measurable business results.",
        severity: "good",
      });
    } else {
      score -= 10;
      checks.push({
        category: "Content Quality",
        passed: false,
        label: "Low Metric Density",
        description: `Only ${metricsCount} bullet point(s) contain numbers or quantifiable results. Aim for at least 3-5 quantified achievements (e.g. 'reduced latency by 45%', 'grew revenue by $2M').`,
        severity: "warning",
      });
    }

    if (buzzwordWarnings.length > 0) {
      score -= 5;
      checks.push({
        category: "Content Quality",
        passed: false,
        label: `Cliche Buzzwords Detected (${buzzwordWarnings.length})`,
        description: `Avoid generic filler words: "${buzzwordWarnings.join('", "')}". Replace with concrete responsibilities.`,
        severity: "warning",
      });
    }
  } else {
    score -= 25;
    checks.push({
      category: "Structure",
      passed: false,
      label: "Missing Work Experience",
      description: "ATS algorithms place 60%+ weight on chronological work experience.",
      severity: "critical",
    });
  }

  // 6. Education
  if (education && education.length > 0) {
    checks.push({
      category: "Structure",
      passed: true,
      label: "Education Record Included",
      description: `Includes ${education.length} degree(s) / institution(s).`,
      severity: "good",
    });
  } else {
    score -= 10;
    checks.push({
      category: "Structure",
      passed: false,
      label: "Missing Education",
      description: "Include your college degree, university coursework, or high school diploma to satisfy educational filters.",
      severity: "warning",
    });
  }

  // 7. Skills Inventory
  const totalKeywords = skills ? skills.reduce((acc, cat) => acc + cat.keywords.length, 0) : 0;
  if (totalKeywords >= 5) {
    checks.push({
      category: "Keywords",
      passed: true,
      label: `Core Skills Inventory (${totalKeywords} skills)`,
      description: "Rich keyword coverage helps ATS parsers match target job requirements.",
      severity: "good",
    });
  } else {
    score -= 12;
    checks.push({
      category: "Keywords",
      passed: false,
      label: "Low Skills Keyword Count",
      description: `Only ${totalKeywords} skill keyword(s) entered. Add at least 6-12 relevant technical or domain keywords.`,
      severity: "warning",
    });
  }

  // Normalize final score between 20 and 100
  const finalScore = Math.max(Math.min(score, 100), 20);

  let grade: AtsCheckResult["grade"] = "F";
  if (finalScore >= 90) grade = "A";
  else if (finalScore >= 80) grade = "B";
  else if (finalScore >= 70) grade = "C";
  else if (finalScore >= 60) grade = "D";

  let summary = "";
  if (grade === "A") {
    summary = "Outstanding! Your resume is highly optimized for enterprise Applicant Tracking Systems.";
  } else if (grade === "B") {
    summary = "Solid resume. Minor adjustments to quantifiable metrics and keywords will make it exceptional.";
  } else if (grade === "C") {
    summary = "Average ATS pass probability. Address critical missing information and quantify your achievements.";
  } else {
    summary = "High risk of ATS rejection. Please review critical flagged issues below before submitting.";
  }

  return {
    score: finalScore,
    grade,
    summary,
    checks,
    metricsCount,
    actionVerbCount,
    buzzwordWarnings,
    suggestedActionVerbs: SUGGESTED_VERBS_BY_ROLE.engineering,
  };
}
