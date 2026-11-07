import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/server/db/prisma";
import { getUserPlan } from "@/server/middleware/plan-guard";
import { ResumeData } from "@/schemas/resume.schema";

const apiKey = process.env.ANTHROPIC_API_KEY;

export const anthropic = apiKey ? new Anthropic({ apiKey }) : null;

// Quota verification
export async function assertAiQuota(userId: string): Promise<void> {
  const planInfo = await getUserPlan(userId);
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const usageCount = await prisma.usageLog.count({
    where: {
      userId,
      action: { startsWith: "AI_" },
      createdAt: { gte: startOfMonth },
    },
  });

  const quota = planInfo.isPro ? 250 : 5;

  if (usageCount >= quota) {
    throw new Error(
      `Monthly AI generation limit reached (${usageCount}/${quota}). Upgrade to Pro for unlimited AI access.`
    );
  }
}

// Log usage
export async function logAiUsage(userId: string, action: string, tokens: number = 0) {
  try {
    await prisma.usageLog.create({
      data: {
        userId,
        action,
        tokens,
      },
    });
  } catch (err) {
    console.error("Failed to log AI usage:", err);
  }
}

// 1. Generate Executive Summary
export async function generateSummary({
  userId,
  role,
  skills,
  experienceYears = "5+",
  tone = "Executive",
}: {
  userId: string;
  role: string;
  skills: string[];
  experienceYears?: string;
  tone?: string;
}): Promise<string[]> {
  await assertAiQuota(userId);

  if (anthropic && apiKey) {
    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 600,
        system: "You are an expert career strategist and executive resume writer. Generate 3 distinct, high-impact professional resume summaries in JSON array format: string[]. Do not include markdown codeblocks or preamble.",
        messages: [
          {
            role: "user",
            content: `Target Role: ${role}\nYears of Experience: ${experienceYears}\nKey Skills: ${skills.join(", ")}\nTone: ${tone}\n\nGenerate 3 tailored summaries. Return ONLY a valid JSON array of strings.`,
          },
        ],
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "[]";
      await logAiUsage(userId, "AI_SUMMARY", response.usage?.output_tokens || 150);
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn("Claude API call failed or timed out, using fallback:", err);
    }
  }

  // Fallback heuristic generator when API key is not yet set
  await logAiUsage(userId, "AI_SUMMARY", 50);
  const skillList = skills.length ? skills.slice(0, 4).join(", ") : "modern methodologies";
  return [
    `Results-driven ${role} with ${experienceYears} of proven expertise architecting scalable systems and driving cross-functional outcomes. Demonstrated track record leveraging ${skillList} to accelerate project delivery by 35% and reduce operational bottlenecks.`,
    `Strategic ${role} recognized for technical leadership, operational excellence, and mission-critical execution. Adept at transforming complex requirements into reliable solutions utilizing ${skillList} while mentoring high-performing engineering talent.`,
    `Innovative ${role} specializing in high-impact solutions and scalable infrastructure. Combines deep hands-on expertise in ${skillList} with analytical rigor to deliver 99.99% system reliability and quantifiable business growth.`,
  ];
}

// 2. Improve Bullet Point (STAR Method)
export async function improveBullet({
  userId,
  bullet,
  role,
  company,
}: {
  userId: string;
  bullet: string;
  role?: string;
  company?: string;
}): Promise<string[]> {
  await assertAiQuota(userId);

  if (anthropic && apiKey) {
    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 500,
        system: "You are an executive resume editor specializing in the Google X-Y-Z formula and STAR methodology. Rewrite the user's bullet point into 3 stronger alternatives that begin with strong past-tense action verbs and feature quantified metrics. Return ONLY a valid JSON array of 3 strings: string[].",
        messages: [
          {
            role: "user",
            content: `Original Bullet: "${bullet}"\nRole: ${role || "Professional"}\nCompany: ${company || "Enterprise"}\n\nReturn ONLY a JSON array of 3 improved bullets.`,
          },
        ],
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "[]";
      await logAiUsage(userId, "AI_BULLET", response.usage?.output_tokens || 100);
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn("Claude API call failed, using fallback:", err);
    }
  }

  // Fallback STAR generator
  await logAiUsage(userId, "AI_BULLET", 40);
  const trimmed = bullet.replace(/^(responsible for|helped with|worked on)/i, "").trim();
  return [
    `Architected and executed ${trimmed}, reducing turnaround latency by 35% and improving team delivery velocity.`,
    `Spearheaded the development of ${trimmed}, resulting in a 24% increase in operational efficiency across 3 core departments.`,
    `Streamlined ${trimmed} utilizing modern automation, cutting manual processing overhead by 40+ hours per quarter.`,
  ];
}

// 3. Rewrite Tone
export async function rewriteTone({
  userId,
  text,
  tone,
}: {
  userId: string;
  text: string;
  tone: "Executive" | "Technical" | "Confident" | "Concise";
}): Promise<string> {
  await assertAiQuota(userId);

  if (anthropic && apiKey) {
    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 400,
        system: `Rewrite the given text into an ${tone} professional resume tone. Keep it impactful, clear, and grammatically flawless. Output only the rewritten text.`,
        messages: [{ role: "user", content: text }],
      });

      await logAiUsage(userId, "AI_TONE", response.usage?.output_tokens || 80);
      return response.content[0].type === "text" ? response.content[0].text.trim() : text;
    } catch (err) {
      console.warn("Claude API call failed, using fallback:", err);
    }
  }

  await logAiUsage(userId, "AI_TONE", 20);
  if (tone === "Concise") {
    return text.split(".")[0] + ".";
  }
  return `Strategic ${text.trim()}`;
}

// 4. Generate Matching Cover Letter
export async function generateCoverLetter({
  userId,
  resumeData,
  jobTitle,
  companyName,
  jobDescription,
}: {
  userId: string;
  resumeData: ResumeData;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
}): Promise<string> {
  await assertAiQuota(userId);

  const { basics, work } = resumeData;
  const recentJob = work[0]?.position || "Experienced Professional";
  const recentCompany = work[0]?.name || "Leading Firm";

  if (anthropic && apiKey) {
    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1200,
        system: "You are an executive career advisor. Write a persuasive, 3-paragraph tailored cover letter connecting the candidate's achievements directly to the target role and company requirements.",
        messages: [
          {
            role: "user",
            content: `Candidate: ${basics.name}\nRecent Role: ${recentJob} at ${recentCompany}\nTarget Job: ${jobTitle} at ${companyName}\nJob Description:\n${jobDescription}\n\nWrite a compelling cover letter.`,
          },
        ],
      });

      await logAiUsage(userId, "AI_COVER_LETTER", response.usage?.output_tokens || 350);
      return response.content[0].type === "text" ? response.content[0].text.trim() : "";
    } catch (err) {
      console.warn("Claude API call failed, using fallback:", err);
    }
  }

  await logAiUsage(userId, "AI_COVER_LETTER", 100);
  return `Dear Hiring Team at ${companyName},

I am writing to express my strong enthusiasm for the ${jobTitle} position. With a solid foundation as ${recentJob} at ${recentCompany}, I have consistently specialized in delivering scalable solutions, driving team efficiency, and solving complex problems with high-reliability execution.

Having closely reviewed your requirements, I am confident that my hands-on background aligns seamlessly with your team's objectives. In my recent roles, I have spearheaded mission-critical projects that improved delivery timelines by over 35% and introduced modern best practices that enhanced overall system quality.

I would welcome the opportunity to discuss how my technical expertise and leadership approach can contribute to ${companyName}'s continued growth. Thank you for your time and consideration.

Sincerely,
${basics.name || "Candidate"}
${basics.email || ""} | ${basics.phone || ""}`;
}
