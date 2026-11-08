import { NextResponse } from "next/server";
import { getActiveUser } from "@/server/auth/current-user";
import { rewriteTone } from "@/server/services/ai.service";
import { applyRateLimit } from "@/server/middleware/rate-limit";

export async function POST(req: Request) {
  const user = await getActiveUser();
  const rateLimit = applyRateLimit(req, "ai", user.id);
  if (rateLimit.response) return rateLimit.response;

  try {
    const body = await req.json();
    const { text, tone } = body;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const rewritten = await rewriteTone({
      userId: user.id,
      text,
      tone: tone || "Executive",
    });

    return NextResponse.json({ rewritten });
  } catch (error: any) {
    console.error("AI Tone Error:", error);
    return NextResponse.json({ error: error.message || "Failed to rewrite tone" }, { status: 400 });
  }
}
