import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/db/prisma";
import { formatDate } from "@/lib/utils";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const resume = await prisma.resume.findFirst({
    where: { id: params.id, userId },
  });

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  try {
    const data = typeof resume.content === "string" ? JSON.parse(resume.content) : resume.content;
    const { basics, work, education, skills, projects } = data;

    let txt = "";

    // Header
    txt += `${(basics.name || "YOUR NAME").toUpperCase()}\n`;
    if (basics.label) txt += `${basics.label}\n`;
    const contact = [
      basics.email,
      basics.phone,
      [basics.location?.city, basics.location?.region].filter(Boolean).join(", "),
      basics.url,
    ]
      .filter(Boolean)
      .join(" | ");
    if (contact) txt += `${contact}\n`;
    txt += `\n${"=".repeat(60)}\n\n`;

    // Summary
    if (basics.summary) {
      txt += `PROFESSIONAL SUMMARY\n${"-".repeat(30)}\n`;
      txt += `${basics.summary}\n\n`;
    }

    // Work Experience
    if (work && work.length > 0) {
      txt += `WORK EXPERIENCE\n${"-".repeat(30)}\n`;
      work.forEach((job: any) => {
        txt += `${job.position} — ${job.name}\n`;
        txt += `${formatDate(job.startDate)} – ${job.current ? "Present" : formatDate(job.endDate)}`;
        if (job.location) txt += ` | ${job.location}`;
        txt += "\n";
        job.highlights?.forEach((h: string) => {
          if (h.trim()) txt += `* ${h}\n`;
        });
        txt += "\n";
      });
    }

    // Education
    if (education && education.length > 0) {
      txt += `EDUCATION\n${"-".repeat(30)}\n`;
      education.forEach((edu: any) => {
        txt += `${edu.studyType} in ${edu.area} — ${edu.institution}\n`;
        txt += `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`;
        if (edu.score) txt += ` | GPA: ${edu.score}`;
        txt += "\n\n";
      });
    }

    // Skills
    if (skills && skills.length > 0) {
      txt += `TECHNICAL SKILLS\n${"-".repeat(30)}\n`;
      skills.forEach((cat: any) => {
        txt += `${cat.name}: ${cat.keywords.join(", ")}\n`;
      });
      txt += "\n";
    }

    // Projects
    if (projects && projects.length > 0) {
      txt += `PROJECTS\n${"-".repeat(30)}\n`;
      projects.forEach((p: any) => {
        txt += `${p.name}${p.url ? ` (${p.url})` : ""}\n`;
        if (p.description) txt += `${p.description}\n`;
        p.highlights?.forEach((h: string) => {
          if (h.trim()) txt += `* ${h}\n`;
        });
        txt += "\n";
      });
    }

    const safeTitle = (resume.title || "Resume").replace(/[^a-zA-Z0-9_-]/g, "_");

    return new NextResponse(txt, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${safeTitle}.txt"`,
      },
    });
  } catch (error) {
    console.error("TXT Export Error:", error);
    return NextResponse.json({ error: "Failed to generate plain text" }, { status: 500 });
  }
}

