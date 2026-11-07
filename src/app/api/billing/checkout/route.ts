import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCheckoutSession } from "@/server/services/stripe.service";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const plan = body.plan || "PRO_MONTHLY";

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const successUrl = `${origin}/billing?payment=success`;
    const cancelUrl = `${origin}/billing?payment=cancelled`;

    const checkoutUrl = await createCheckoutSession({
      userId: (session.user as any).id,
      email: session.user.email!,
      plan,
      successUrl,
      cancelUrl,
    });

    return NextResponse.json({ url: checkoutUrl });
  } catch (error: any) {
    console.error("Billing Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 });
  }
}

