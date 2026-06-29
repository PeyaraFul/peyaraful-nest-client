import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;
    const formData = await request.formData();
    const title = formData.get("title");
    const price = formData.get("price");
    const image = formData.get("image"); 
    const ownerId = formData.get("ownerId");
    const propertyLocation = formData.get("propertyLocation");
    const tenantName = user.name;
    const propertyId = formData.get("propertyId");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: title,
              images: [image],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        price,
        userId: user.id,
        customerEmail: user.email,
        propertyId,
        title,
        ownerId,
        tenantName,
        propertyLocation,
        propertyImage: image,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
