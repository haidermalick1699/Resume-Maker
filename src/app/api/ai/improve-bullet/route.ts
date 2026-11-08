import { NextResponse } from "next/server";
import { getActiveUser } from "@/server/auth/current-user";
import { improveBullet } from "@/server/services/ai.service";
import { applyRateLimit } from "@/server/middleware/rate-limit";

export async function POST(req: Request) {
  const user = await getActiveUser();
  const rateLimit = applyRateLimit(req, "ai", user.id);
  if (rateLimit.response) return rateLimit.response;

  try {
    const body = await req.json();
    const { bullet, role, company } = body;

    if (!bullet) {
      return NextResponse.json({ error: "Bullet text is required" }, { status: 400 });
    }

    const suggestions = await improveBullet({
      userId: user.id,
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
