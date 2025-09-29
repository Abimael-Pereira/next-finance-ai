import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature")!;
  if (!signature) {
    return new NextResponse("Missing stripe signature", { status: 400 });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return new NextResponse("Missing stripe secret key", { status: 500 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Missing webhook secret", { status: 500 });
  }

  const text = await request.text();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const clerkUserId = session.metadata?.clerk_user_id;

      if (!clerkUserId) {
        console.log(
          "Missing clerk_user_id in session metadata:",
          session.metadata,
        );
        return new NextResponse("Missing clerk user ID in metadata", {
          status: 400,
        });
      }

      try {
        await clerkClient().users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
          },
          publicMetadata: {
            subscriptionPlan: "premium",
          },
        });
        console.log("Successfully updated user metadata for:", clerkUserId);
      } catch (error) {
        console.error("Error updating clerk user:", error);
        return new NextResponse("Error updating user metadata", {
          status: 500,
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const clerkUserId = subscription.metadata?.clerk_user_id;

      if (!clerkUserId) {
        console.log(
          "Missing clerk_user_id in subscription metadata:",
          subscription.metadata,
        );
        return new NextResponse("Missing clerk user ID in metadata", {
          status: 400,
        });
      }

      try {
        await clerkClient().users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: null,
            stripeSubscriptionId: null,
          },
          publicMetadata: {
            subscriptionPlan: null,
          },
        });
        console.log(
          "Successfully removed premium subscription for:",
          clerkUserId,
        );
      } catch (error) {
        console.error(
          "Error updating clerk user on subscription deletion:",
          error,
        );
        return new NextResponse("Error updating user metadata", {
          status: 500,
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
};
