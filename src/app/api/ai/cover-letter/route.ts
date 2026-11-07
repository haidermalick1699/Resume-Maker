import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateCoverLetter } from "@/server/services/ai.service";
import { prisma } from "@/server/db/prisma";
import { applyRateLimit } from "@/server/middleware/rate-limit";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = applyRateLimit(req, "ai", (session.user as any).id);
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
      userId: (session.user as any).id,
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
