import { ResumeData } from "@/schemas/resume.schema";
import { prisma } from "@/server/db/prisma";
import { anthropic } from "./ai.service";

export interface TailorResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  tailoredDiff: {
    section: string;
    original?: string;
    suggestion: string;
    reason: string;
  }[];
}

const COMMON_TECH_KEYWORDS = [
  "typescript", "javascript", "python", "java", "go", "golang", "c++", "c#",
  "react", "next.js", "node.js", "vue", "angular", "graphql", "rest", "api",
  "docker", "kubernetes", "aws", "gcp", "azure", "terraform", "ci/cd", "kafka",
  "postgresql", "mongodb", "redis", "mysql", "sql", "git", "microservices",
  "agile", "scrum", "system design", "distributed systems", "tdd", "devops"
];

export async function tailorResumeToJob({
  userId,
  resumeId,
  jobTitle,
  companyName,
  jobDescription,
}: {
  userId: string;
  resumeId: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
}): Promise<TailorResult> {
  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
  });

  if (!resume) throw new Error("Resume not found");

  const data: ResumeData =
    typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content;

  // Extract keywords present in job description
  const jdLower = jobDescription.toLowerCase();
  const jdKeywords = COMMON_TECH_KEYWORDS.filter((kw) => jdLower.includes(kw));

  // Extract keywords present in resume
  const resumeText = JSON.stringify(data).toLowerCase();
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  jdKeywords.forEach((kw) => {
    if (resumeText.includes(kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // Calculate Match Score
  const totalRelevant = jdKeywords.length;
  let matchScore = 75; // Baseline if few keywords detected
  if (totalRelevant > 0) {
    matchScore = Math.round((matchedKeywords.length / totalRelevant) * 100);
    // Clamp score reasonably
    matchScore = Math.max(Math.min(matchScore, 98), 40);
  }

  // Suggest bullet point adjustments
  const tailoredDiff: TailorResult["tailoredDiff"] = [];

  if (missingKeywords.length > 0) {
    tailoredDiff.push({
      section: "Skills & Core Competencies",
      suggestion: `Add the following keywords explicitly into your Skills section: ${missingKeywords.slice(0, 5).join(", ")}.`,
      reason: `Found in target job posting for ${jobTitle} at ${companyName}, but missing from your resume.`,
    });
  }

  if (data.work && data.work.length > 0) {
    const firstJob = data.work[0];
    const topMissing = missingKeywords[0] || "system scalability";
    tailoredDiff.push({
      section: `Experience — ${firstJob.name}`,
      original: firstJob.highlights?.[0] || "",
      suggestion: `Spearheaded architecture improvements utilizing ${topMissing}, directly accelerating feature delivery velocity and improving uptime.`,
      reason: `Demonstrates hands-on mastery of ${topMissing} requested in the job requirements.`,
    });
  }

  // Store in database
  try {
    await prisma.jobTailoring.create({
      data: {
        userId,
        resumeId,
        jobTitle,
        companyName,
        jobDescription,
        matchScore,
        missingKeywords: JSON.stringify(missingKeywords),
        tailoredDiff: JSON.stringify(tailoredDiff),
      },
    });
  } catch (err) {
    console.error("Failed to store tailoring record:", err);
  }

  return {
    matchScore,
    matchedKeywords,
    missingKeywords,
    tailoredDiff,
  };
}
