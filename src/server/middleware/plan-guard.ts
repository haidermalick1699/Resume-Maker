import { prisma } from "@/server/db/prisma";

export interface UserPlanDetails {
  plan: string;
  isPro: boolean;
  canRemoveWatermark: boolean;
  maxResumes: number;
}

export async function getUserPlan(userId: string): Promise<UserPlanDetails> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user) {
    return {
      plan: "FREE",
      isPro: false,
      canRemoveWatermark: false,
      maxResumes: 2,
    };
  }

  const plan = user.subscription?.plan || "FREE";
  const status = user.subscription?.status || "ACTIVE";
  const isPro = (plan === "PRO_MONTHLY" || plan === "PRO_ANNUAL" || plan === "ONE_TIME_PASS") && status === "ACTIVE";

  return {
    plan,
    isPro,
    canRemoveWatermark: isPro,
    maxResumes: isPro ? 100 : 2,
  };
}

