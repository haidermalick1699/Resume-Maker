import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    // In dev or initial setup, allow demo user or admin access
    const isLocal = process.env.NODE_ENV !== "production";
    if (!isLocal && (session?.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }
  }

  const [totalUsers, totalResumes, paidSubscriptions] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
    prisma.subscription.count({
      where: {
        plan: { in: ["PRO_MONTHLY", "PRO_ANNUAL"] },
        status: "ACTIVE",
      },
    }),
  ]);

  const estimatedMrr = paidSubscriptions * 12; // $12/month average

  return NextResponse.json({
    totalUsers,
    totalResumes,
    paidSubscriptions,
    estimatedMrr,
  });
}

