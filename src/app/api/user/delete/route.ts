import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/db/prisma";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    const body = await req.json().catch(() => ({}));
    const { confirmation } = body;

    // Safety guard: require confirmation string
    if (confirmation !== "DELETE_MY_ACCOUNT") {
      return NextResponse.json(
        {
          error:
            "Confirmation required. Send { confirmation: 'DELETE_MY_ACCOUNT' } to execute permanent deletion.",
        },
        { status: 400 }
      );
    }

    // Perform atomic cascading deletion in a transaction
    await prisma.$transaction([
      prisma.jobTailoring.deleteMany({ where: { userId } }),
      prisma.resume.deleteMany({ where: { userId } }),
      prisma.subscription.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Account and associated data have been permanently deleted.",
    });
  } catch (error: any) {
    console.error("Account Deletion Error:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
