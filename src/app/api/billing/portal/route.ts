import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCustomerPortalSession } from "@/server/services/stripe.service";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const returnUrl = `${origin}/billing`;

    const portalUrl = await createCustomerPortalSession(
      (session.user as any).id,
      returnUrl
    );

    return NextResponse.json({ url: portalUrl });
  } catch (error: any) {
    console.error("Billing Portal Error:", error);
    return NextResponse.json({ error: error.message || "Failed to open customer portal" }, { status: 500 });
  }
}

