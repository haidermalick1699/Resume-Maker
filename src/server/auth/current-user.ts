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
 * Returns the currently authenticated user if logged in, OR automatically
 * provides a seamless guest/demo user so the application works 100% friction-free
 * without requiring login or signup.
 */
export async function getActiveUser(): Promise<ActiveUser> {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user && (session.user as any).id) {
      return {
        id: (session.user as any).id,
        email: session.user.email || "demo@resumemaker.com",
        name: session.user.name || "Professional Candidate",
        role: (session.user as any).role || "USER",
        plan: (session.user as any).plan || "PRO",
      };
    }
  } catch (err) {
    console.warn("Session check failed, falling back to default user:", err);
  }

  // Find existing demo or default user
  let user = await prisma.user.findFirst({
    where: { email: "demo@resumemaker.com" },
    include: { subscription: true },
  });

  if (!user) {
    user = await prisma.user.findFirst({
      include: { subscription: true },
    });
  }

  if (!user) {
    // Create default user with PRO access for friction-free editing
    user = await prisma.user.create({
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
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name || "Alex Sterling",
    role: user.role,
    plan: user.subscription?.plan || "PRO",
  };
}
