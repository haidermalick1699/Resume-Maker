import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { improveBullet } from "@/server/services/ai.service";
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
    const { bullet, role, company } = body;

    if (!bullet) {
      return NextResponse.json({ error: "Bullet text is required" }, { status: 400 });
    }

    const suggestions = await improveBullet({
      userId: (session.user as any).id,
      bullet,
      role,
      company,
    });

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    console.error("AI Bullet Error:", error);
    return NextResponse.json({ error: error.message || "Failed to improve bullet" }, { status: 400 });
  }
}
