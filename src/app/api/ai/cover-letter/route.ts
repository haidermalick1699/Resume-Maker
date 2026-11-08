import { NextResponse } from "next/server";
import { getActiveUser } from "@/server/auth/current-user";
import { generateCoverLetter } from "@/server/services/ai.service";
import { prisma } from "@/server/db/prisma";
import { applyRateLimit } from "@/server/middleware/rate-limit";

export async function POST(req: Request) {
  const user = await getActiveUser();
  const rateLimit = applyRateLimit(req, "ai", user.id);
  if (rateLimit.response) return rateLimit.response;

  try {
    const body = await req.json();
    const { resumeId, jobTitle, companyName, jobDescription } = body;

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const resumeData =
      typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content;

    const letter = await generateCoverLetter({
      userId: user.id,
      resumeData,
      jobTitle: jobTitle || "Target Role",
      companyName: companyName || "Target Company",
      jobDescription: jobDescription || "",
    });

    return NextResponse.json({ coverLetter: letter });
  } catch (error: any) {
    console.error("Cover Letter Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate cover letter" }, { status: 400 });
  }
}
