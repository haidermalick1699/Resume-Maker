import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { generateDocxResume } from "@/server/services/export-docx.service";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: params.id },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const content = typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content;
    const docxBuffer = await generateDocxResume(content);

    const safeTitle = (resume.title || "Resume").replace(/[^a-zA-Z0-9_-]/g, "_");

    return new NextResponse(docxBuffer as any, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${safeTitle}.docx"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("DOCX Export Error:", error);
    return NextResponse.json({ error: "Failed to generate DOCX" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json().catch(() => ({}));
    let content = body.content;
    let title = body.title;

    if (!content) {
      const resume = await prisma.resume.findUnique({
        where: { id: params.id },
      });
      if (resume) {
        content = typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content;
        title = title || resume.title;
      }
    }

    if (!content) {
      return NextResponse.json({ error: "No resume content provided" }, { status: 400 });
    }

    const docxBuffer = await generateDocxResume(content);
    const safeTitle = (title || "Resume").replace(/[^a-zA-Z0-9_-]/g, "_");

    return new NextResponse(docxBuffer as any, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${safeTitle}.docx"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("DOCX Export POST Error:", error);
    return NextResponse.json({ error: "Failed to generate DOCX" }, { status: 500 });
  }
}
