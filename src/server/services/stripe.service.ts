import Stripe from "stripe";
import { prisma } from "@/server/db/prisma";

const stripeApiKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key_for_build";

export const stripe = new Stripe(stripeApiKey, {
  apiVersion: "2026-10-28.endive" as any,
  typescript: true,
});

export const PLANS = {
  PRO_MONTHLY: {
    name: "Pro Monthly",
    priceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "price_pro_monthly_placeholder",
    amount: 1200, // $12.00
    interval: "month",
  },
  PRO_ANNUAL: {
    name: "Pro Annual",
    priceId: process.env.STRIPE_PRO_ANNUAL_PRICE_ID || "price_pro_annual_placeholder",
    amount: 9600, // $96.00/year ($8/mo)
    interval: "year",
  },
  ONE_TIME_PASS: {
    name: "30-Day Download Pass",
    priceId: "price_onetime_placeholder",
    amount: 1900, // $19.00
    interval: "one_time",
  },
};

export async function createCheckoutSession({
  userId,
  email,
  plan,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  email: string;
  plan: "PRO_MONTHLY" | "PRO_ANNUAL" | "ONE_TIME_PASS";
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  let user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user) throw new Error("User not found");

  let customerId = user.subscription?.stripeCustomerId;

  if (!customerId && process.env.STRIPE_SECRET_KEY) {
    const customer = await stripe.customers.create({
      email,
      metadata: { userId },
    });
    customerId = customer.id;

    await prisma.subscription.upsert({
      where: { userId },
      update: { stripeCustomerId: customerId },
      create: {
        userId,
        stripeCustomerId: customerId,
        plan: "FREE",
        status: "ACTIVE",
      },
    });
  }

  // If Stripe key is in test placeholder mode, simulate mock checkout URL for local dev
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
    // In local dev without live stripe keys, upgrade immediately to PRO for testing!
    await prisma.subscription.upsert({
      where: { userId },
      update: { plan: "PRO_MONTHLY", status: "ACTIVE" },
      create: {
        userId,
        plan: "PRO_MONTHLY",
        status: "ACTIVE",
      },
    });
    // Remove watermarks on all user's resumes
    await prisma.resume.updateMany({
      where: { userId },
      data: { hasWatermark: false },
    });
    return `${successUrl}?session_id=mock_checkout_success`;
  }

  const selectedPlan = PLANS[plan];
  const isSubscription = selectedPlan.interval !== "one_time";

  const session = await stripe.checkout.sessions.create({
    customer: customerId || undefined,
    customer_email: customerId ? undefined : email,
    mode: isSubscription ? "subscription" : "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `ResumeForge ${selectedPlan.name}`,
            description: "Full access to ATS resume builder, 11+ templates, and zero watermark PDF/DOCX downloads.",
          },
          unit_amount: selectedPlan.amount,
          recurring: isSubscription
            ? { interval: selectedPlan.interval as "month" | "year" }
            : undefined,
        },
        quantity: 1,
      },
    ],
    metadata: { userId, plan },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session.url || successUrl;
}

export async function createCustomerPortalSession(
  userId: string,
  returnUrl: string
): Promise<string> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription?.stripeCustomerId || !process.env.STRIPE_SECRET_KEY) {
    return returnUrl;
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: returnUrl,
  });

  return portalSession.url;
}

export async function handleStripeWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan || "PRO_MONTHLY";

      if (userId) {
        await prisma.subscription.upsert({
          where: { userId },
          update: {
            plan,
            status: "ACTIVE",
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
          },
          create: {
            userId,
            plan,
            status: "ACTIVE",
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
          },
        });

        // Remove watermark from all user's resumes
        await prisma.resume.updateMany({
          where: { userId },
          data: { hasWatermark: false },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = sub.customer as string;

      const record = await prisma.subscription.findUnique({
        where: { stripeCustomerId: customerId },
      });

      if (record) {
        await prisma.subscription.update({
          where: { id: record.id },
          data: { plan: "FREE", status: "CANCELED" },
        });

        // Restore watermark on free tier
        await prisma.resume.updateMany({
          where: { userId: record.userId },
          data: { hasWatermark: true },
        });
      }
      break;
    }
  }
}
