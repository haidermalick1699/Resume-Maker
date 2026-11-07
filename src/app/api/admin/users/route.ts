import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subscription: true,
      _count: {
        select: { resumes: true },
      },
    },
  });

  const formatted = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    plan: u.subscription?.plan || "FREE",
    resumeCount: u._count.resumes,
    createdAt: u.createdAt,
  }));

  return NextResponse.json({ users: formatted });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { userId, role, plan } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    if (role) {
      await prisma.user.update({
        where: { id: userId },
        data: { role },
      });
    }

    if (plan) {
      await prisma.subscription.upsert({
        where: { userId },
        update: { plan, status: "ACTIVE" },
        create: { userId, plan, status: "ACTIVE" },
      });

      // Synchronize watermarks
      const shouldHaveWatermark = plan === "FREE";
      await prisma.resume.updateMany({
        where: { userId },
        data: { hasWatermark: shouldHaveWatermark },
      });
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Admin Update Error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

