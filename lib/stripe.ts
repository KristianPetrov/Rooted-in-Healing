import Stripe from "stripe";

declare global {
  // eslint-disable-next-line no-var
  var __stripe: Stripe | undefined;
}

function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return key;
}

export function getStripe(): Stripe {
  if (!globalThis.__stripe) {
    // Use the SDK's pinned API version by default.
    globalThis.__stripe = new Stripe(getStripeSecretKey());
  }
  return globalThis.__stripe;
}

