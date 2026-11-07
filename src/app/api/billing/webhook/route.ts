import { NextResponse } from "next/server";
import { stripe, handleStripeWebhookEvent } from "@/server/services/stripe.service";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }

    await handleStripeWebhookEvent(event);
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}

