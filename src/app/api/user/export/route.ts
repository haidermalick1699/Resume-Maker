import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        subscription: true,
        resumes: {
          select: {
            id: true,
            title: true,
            templateId: true,
            content: true,
            atsScore: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        jobTailorings: {
          select: {
            id: true,
            jobTitle: true,
            companyName: true,
            matchScore: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse resumes' JSON content for human-readable export
    const formattedResumes = user.resumes.map((r) => ({
      ...r,
      content: typeof r.content === "string" ? JSON.parse(r.content) : r.content,
    }));

    const exportData = {
      exportedAt: new Date().toISOString(),
      metadata: {
        application: "Resume Maker",
        formatVersion: "1.0",
        compliance: "GDPR / CCPA User Data Portability",
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        memberSince: user.createdAt,
        subscription: user.subscription,
      },
      resumes: formattedResumes,
      jobTailoringHistory: user.jobTailorings,
    };

    const filename = `resumemaker-data-export-${new Date().toISOString().split("T")[0]}.json`;

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Data Export Error:", error);
    return NextResponse.json(
      { error: "Failed to export account data" },
      { status: 500 }
    );
  }
}

