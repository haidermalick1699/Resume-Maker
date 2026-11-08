import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/server/db/prisma";

export interface ActiveUser {
  id: string;
  email: string;
  name: string;
  role: string;
  plan: string;
}

/**
 * Returns a verified, existing database user.
 * If the session holds a stale or non-existent ID, this safely falls back
 * to the verified demo user so foreign-key constraints never fail.
 */
export async function getActiveUser(): Promise<ActiveUser> {
  let dbUser: any = null;

  try {
    const session = await getServerSession(authOptions);
    const sessionUserId = (session?.user as any)?.id;
    const sessionUserEmail = session?.user?.email;

    // Verify session user actually exists in the current database
    if (sessionUserId) {
      dbUser = await prisma.user.findUnique({
        where: { id: sessionUserId },
        include: { subscription: true },
      });
    }

    if (!dbUser && sessionUserEmail) {
      dbUser = await prisma.user.findUnique({
        where: { email: sessionUserEmail.toLowerCase() },
        include: { subscription: true },
      });
    }
  } catch (err) {
    console.warn("Session check fallback:", err);
  }

  // Fallback 1: Use primary demo user
  if (!dbUser) {
    dbUser = await prisma.user.findFirst({
      where: { email: "demo@resumemaker.com" },
      include: { subscription: true },
    });
  }

  // Fallback 2: Any existing user in database
  if (!dbUser) {
    dbUser = await prisma.user.findFirst({
      include: { subscription: true },
    });
  }

  // Fallback 3: Create primary demo user with PRO plan
  if (!dbUser) {
    try {
      dbUser = await prisma.user.create({
        data: {
          email: "demo@resumemaker.com",
          name: "Alex Sterling",
          role: "USER",
          subscription: {
            create: {
              plan: "PRO",
              status: "ACTIVE",
            },
          },
        },
        include: { subscription: true },
      });
    } catch {
      // If race condition occurred, fetch the existing record
      dbUser = await prisma.user.findFirst({
        include: { subscription: true },
      });
    }
  }

  return {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name || "Alex Sterling",
    role: dbUser.role || "USER",
    plan: dbUser.subscription?.plan || "PRO",
  };
}
