import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getOrderById } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

function toCents(amount: number): number {
  return Math.max(0, Math.round(amount * 100));
}

async function getBaseUrlFromHeaders(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  if (!host) throw new Error("Missing Host header");
  return `${proto}://${host}`;
}

export default async function PayOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  if (!order) notFound();

  if (order.status?.toUpperCase() === "PAID") {
    redirect(`/pay/success?orderId=${encodeURIComponent(order.id)}`);
  }

  const stripe = getStripe();
  const baseUrl = await getBaseUrlFromHeaders();

  // Stripe Checkout shows line item names to the customer; use a neutral label
  // so payment UI and receipts read as consulting, not catalog SKUs.
  const subtotal = Number(order.subtotal);
  const shippingCost =
    order.shipping_cost != null && order.shipping_cost !== ""
      ? Number(order.shipping_cost)
      : 0;
  const total =
    order.total_amount != null && String(order.total_amount).length > 0
      ? Number(order.total_amount)
      : subtotal + shippingCost;

  if (!Number.isFinite(total) || total <= 0) {
    throw new Error("Order total is missing or invalid for checkout");
  }

  const line_items = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Consulting",
          description: "Professional consulting services.",
        },
        unit_amount: toCents(total),
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: order.customer_email,
    line_items,
    success_url: `${baseUrl}/pay/success?orderId=${encodeURIComponent(order.id)}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/pay/cancel?orderId=${encodeURIComponent(order.id)}`,
    metadata: {
      orderId: order.id,
      orderNumber: order.order_number,
    },
  });

  if (!session.url) {
    throw new Error("Stripe Checkout session missing url");
  }

  redirect(session.url);
}

