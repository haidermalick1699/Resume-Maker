import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { createSampleResume } from "@/schemas/resume.schema";
import { getActiveUser } from "@/server/auth/current-user";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getActiveUser();
  let resumes = await prisma.resume.findMany({
    where: { userId: user.id },
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

  // If no resumes exist yet, auto-create a starter resume so the user can immediately edit!
  if (resumes.length === 0) {
    const sampleResume = createSampleResume();
    const defaultDesign = {
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
      showWatermark: false,
    };

    const starter = await prisma.resume.create({
      data: {
        userId: user.id,
        title: "Alex Sterling - Senior Architect",
        templateId: "modern-minimal",
        content: JSON.stringify(sampleResume),
        design: JSON.stringify(defaultDesign),
        hasWatermark: false,
        atsScore: 94,
      },
    });

    resumes = [
      {
        id: starter.id,
        title: starter.title,
        templateId: starter.templateId,
        atsScore: starter.atsScore,
        hasWatermark: starter.hasWatermark,
        isPublished: starter.isPublished,
        shareSlug: starter.shareSlug,
        createdAt: starter.createdAt,
        updatedAt: starter.updatedAt,
      },
    ];
  }

  return NextResponse.json({ resumes });
}

export async function POST(req: Request) {
  const user = await getActiveUser();
  const userId = user.id;

  try {
    const body = await req.json().catch(() => ({}));
    const title = body.title || "Untitled Resume";
    const templateId = body.templateId || "modern-minimal";

    const content = body.content || createSampleResume();
    const defaultDesign = {
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
      showWatermark: false,
    };
    const design = body.design || defaultDesign;

    const resume = await prisma.resume.create({
      data: {
        userId,
        title,
        templateId,
        content: typeof content === "string" ? content : JSON.stringify(content),
        design: typeof design === "string" ? design : JSON.stringify(design),
        hasWatermark: false,
        atsScore: 85,
      },
    });

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    console.error("Failed to create resume:", error);
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 });
  }
}
