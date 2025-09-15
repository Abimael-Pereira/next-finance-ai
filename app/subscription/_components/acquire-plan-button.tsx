"use client";

import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/app/_components/ui/button";

import { createStripeCheckout } from "../_actions/create-checkout";

const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!sessionId) {
      throw new Error("Missing session ID");
    }

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Missing Stripe publishable key");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    );

    if (!stripe) {
      throw new Error("Stripe failed to load");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adiquirir plano
    </Button>
  );
};

export default AcquirePlanButton;
