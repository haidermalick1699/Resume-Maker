import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSummary } from "@/server/services/ai.service";
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
    const { role, skills, experienceYears, tone } = body;

    const summaries = await generateSummary({
      userId: (session.user as any).id,
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
