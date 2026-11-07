import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/db/prisma";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const original = await prisma.resume.findFirst({
    where: { id: params.id, userId },
  });

  if (!original) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const duplicated = await prisma.resume.create({
    data: {
      userId,
      title: `${original.title} (Copy)`,
      templateId: original.templateId,
      content: original.content,
      design: original.design,
      hasWatermark: original.hasWatermark,
      atsScore: original.atsScore,
    },
  });

  return NextResponse.json({ resume: duplicated }, { status: 201 });
}

