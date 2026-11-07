import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rewriteTone } from "@/server/services/ai.service";
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
    const { text, tone } = body;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const rewritten = await rewriteTone({
      userId: (session.user as any).id,
      text,
      tone: tone || "Executive",
    });

    return NextResponse.json({ rewritten });
  } catch (error: any) {
    console.error("AI Tone Error:", error);
    return NextResponse.json({ error: error.message || "Failed to rewrite tone" }, { status: 400 });
  }
}
