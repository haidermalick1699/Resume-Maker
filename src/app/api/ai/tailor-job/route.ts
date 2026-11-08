import { NextResponse } from "next/server";
import { getActiveUser } from "@/server/auth/current-user";
import { tailorResumeToJob } from "@/server/services/tailor.service";
import { applyRateLimit } from "@/server/middleware/rate-limit";

export async function POST(req: Request) {
  const user = await getActiveUser();
  const rateLimit = applyRateLimit(req, "ai", user.id);
  if (rateLimit.response) return rateLimit.response;

  try {
    const body = await req.json();
    const { resumeId, jobTitle, companyName, jobDescription } = body;

    if (!resumeId || !jobDescription) {
      return NextResponse.json(
        { error: "Resume ID and Job Description are required" },
        { status: 400 }
      );
    }

    const result = await tailorResumeToJob({
      userId: user.id,
      resumeId,
      jobTitle: jobTitle || "Target Role",
      companyName: companyName || "Target Company",
      jobDescription,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Job Tailoring Error:", error);
    return NextResponse.json({ error: error.message || "Failed to tailor resume" }, { status: 400 });
  }
}
