import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { generatePdfResume } from "@/server/services/export-pdf.service";

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

  try {
    const content = typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content;
    const design = typeof resume.design === "string" ? JSON.parse(resume.design) : resume.design;

    const pdfBuffer = await generatePdfResume(content, design);
    const safeTitle = (resume.title || "Resume").replace(/[^a-zA-Z0-9_-]/g, "_") || "Resume";

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeTitle}.pdf"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("PDF Export API Error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
