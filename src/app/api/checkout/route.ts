export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { jobId } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: "Devotional Blessing Video" },
        unit_amount: 299,
      },
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}?canceled=true`,
    metadata: { jobId },
  });
  return NextResponse.json({ url: session.url });
}

