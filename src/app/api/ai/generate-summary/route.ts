import { NextResponse } from "next/server";
import { getActiveUser } from "@/server/auth/current-user";
import { generateSummary } from "@/server/services/ai.service";
import { applyRateLimit } from "@/server/middleware/rate-limit";

export async function POST(req: Request) {
  const user = await getActiveUser();
  const rateLimit = applyRateLimit(req, "ai", user.id);
  if (rateLimit.response) return rateLimit.response;

  try {
    const body = await req.json();
    const { role, skills, experienceYears, tone } = body;

    const summaries = await generateSummary({
      userId: user.id,
      role: role || "Professional",
      skills: skills || [],
      experienceYears: experienceYears || "5+",
      tone: tone || "Executive",
    });

    return NextResponse.json({ summaries });
  } catch (error: any) {
    console.error("AI Summary Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate summary" }, { status: 400 });
  }
}
