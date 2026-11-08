import { NextResponse } from "next/server";
import { getActiveUser } from "@/server/auth/current-user";
import { prisma } from "@/server/db/prisma";
import { auditResumeAts } from "@/server/services/ats.service";
import { applyRateLimit } from "@/server/middleware/rate-limit";

export async function POST(req: Request) {
  const user = await getActiveUser();
  const rateLimit = applyRateLimit(req, "ai", user.id);
  if (rateLimit.response) return rateLimit.response;

  try {
    const body = await req.json();
    const { resumeId } = body;

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const content =
      typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content;

    const audit = auditResumeAts(content);

    // Save calculated score back to resume record
    await prisma.resume.update({
      where: { id: resumeId },
      data: { atsScore: audit.score },
    });

    return NextResponse.json(audit);
  } catch (error: any) {
    console.error("ATS Audit Error:", error);
    return NextResponse.json({ error: error.message || "Failed to audit resume" }, { status: 500 });
  }
}
