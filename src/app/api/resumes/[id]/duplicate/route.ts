import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { getActiveUser } from "@/server/auth/current-user";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getActiveUser();
  const userId = user.id;

  const original = await prisma.resume.findFirst({
    where: { id: params.id },
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
