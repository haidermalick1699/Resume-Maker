import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { generateDocxResume } from "@/server/services/export-docx.service";

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
      },
    });
  } catch (error) {
    console.error("DOCX Export Error:", error);
    return NextResponse.json({ error: "Failed to generate DOCX" }, { status: 500 });
  }
}

