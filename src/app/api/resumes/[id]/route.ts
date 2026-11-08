import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const resume = await prisma.resume.findFirst({
    where: { id: params.id },
  });

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  return NextResponse.json({
    resume: {
      ...resume,
      content: typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content,
      design: typeof resume.design === "string" ? JSON.parse(resume.design) : resume.design,
    },
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updateData: any = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.templateId !== undefined) updateData.templateId = body.templateId;
    if (body.content !== undefined) {
      updateData.content = typeof body.content === "string" ? body.content : JSON.stringify(body.content);
    }
    if (body.design !== undefined) {
      updateData.design = typeof body.design === "string" ? body.design : JSON.stringify(body.design);
    }
    if (body.isPublished !== undefined) updateData.isPublished = body.isPublished;

    const updated = await prisma.resume.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ resume: updated });
  } catch (error) {
    console.error("Save Resume Error:", error);
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.resume.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete Resume Error:", error);
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
  }
}
