import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { parseJsonResume, parsePlainTextResume } from "@/server/services/import.service";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { format, payload } = body;

    let parsedResume;

    if (format === "json") {
      const raw = typeof payload === "string" ? JSON.parse(payload) : payload;
      parsedResume = parseJsonResume(raw);
    } else {
      parsedResume = parsePlainTextResume(String(payload || ""));
    }

    return NextResponse.json({ resume: parsedResume });
  } catch (error: any) {
    console.error("Resume Import Error:", error);
    return NextResponse.json({ error: error.message || "Failed to parse resume" }, { status: 400 });
  }
}
