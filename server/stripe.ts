/**
 * TRAVI — Stripe Integration
 * Handles payments, subscriptions, and webhooks
 */

import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
export const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2025-01-27.acacia" }) : null;

// ── Price IDs (set in Stripe dashboard) ─────────────────────────────────────
export const STRIPE_PRICES = {
  TRAVI_PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "price_pro_monthly",
  TRAVI_PRO_YEARLY: process.env.STRIPE_PRICE_PRO_YEARLY ?? "price_pro_yearly",
  TRAVI_ELITE_MONTHLY: process.env.STRIPE_PRICE_ELITE_MONTHLY ?? "price_elite_monthly",
  TRAVI_ELITE_YEARLY: process.env.STRIPE_PRICE_ELITE_YEARLY ?? "price_elite_yearly",
};

// ── Create Checkout Session ──────────────────────────────────────────────────
export async function createCheckoutSession({
  userId,
  priceId,
  successUrl,
  cancelUrl,
  customerEmail,
}: {
  userId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}) {
  if (!stripe) throw new Error("Stripe not configured");
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    customer_email: customerEmail,
    metadata: { userId },
  });
  return session;
}

// ── Create Payment Intent (one-time booking) ─────────────────────────────────
export async function createPaymentIntent({
  amount,
  currency = "usd",
  userId,
  description,
  metadata = {},
}: {
  amount: number; // in cents
  currency?: string;
  userId: string;
  description: string;
  metadata?: Record<string, string>;
}) {
  if (!stripe) throw new Error("Stripe not configured");
  const intent = await stripe.paymentIntents.create({
    amount,
    currency,
    description,
    metadata: { userId, ...metadata },
    automatic_payment_methods: { enabled: true },
  });
  return intent;
}

// ── Create Customer Portal Session ───────────────────────────────────────────
export async function createPortalSession(customerId: string, returnUrl: string) {
  if (!stripe) throw new Error("Stripe not configured");
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session;
}

// ── Webhook Handler ───────────────────────────────────────────────────────────
export function constructWebhookEvent(payload: Buffer, signature: string) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  if (!stripe || !secret) throw new Error("Stripe webhook not configured");
  return stripe.webhooks.constructEvent(payload, signature, secret);
}

// ── Subscription tier from price ID ──────────────────────────────────────────
export function getTierFromPriceId(priceId: string): "pro" | "elite" | "free" {
  if (priceId.includes("elite")) return "elite";
  if (priceId.includes("pro")) return "pro";
  return "free";
}
