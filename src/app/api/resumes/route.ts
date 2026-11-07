import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/db/prisma";
import { createSampleResume } from "@/schemas/resume.schema";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      templateId: true,
      atsScore: true,
      hasWatermark: true,
      isPublished: true,
      shareSlug: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ resumes });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const userPlan = (session.user as any).plan || "FREE";

  try {
    const body = await req.json().catch(() => ({}));
    const title = body.title || "Untitled Resume";
    const templateId = body.templateId || "modern-minimal";

    const content = body.content || createSampleResume();
    const design = body.design || {
      paperSize: "A4",
      fontFamily: "Inter",
      fontSize: "medium",
      lineHeight: "normal",
      pageMargins: "normal",
      sectionSpacing: "normal",
      primaryColor: "#2563EB",
      textColor: "#1E293B",
      backgroundColor: "#FFFFFF",
      photo: { visible: true, shape: "circle", size: "medium", border: false },
      showWatermark: userPlan === "FREE",
    };

    const newResume = await prisma.resume.create({
      data: {
        userId,
        title,
        templateId,
        content: typeof content === "string" ? content : JSON.stringify(content),
        design: typeof design === "string" ? design : JSON.stringify(design),
        hasWatermark: userPlan === "FREE",
        atsScore: 85,
      },
    });

    return NextResponse.json({ resume: newResume }, { status: 201 });
  } catch (error) {
    console.error("Create Resume Error:", error);
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 });
  }
}

