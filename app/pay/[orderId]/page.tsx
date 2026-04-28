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

  const line_items = [
    ...(order.items ?? []).map((item) => {
      const name = [
        item.productName ?? "Item",
        item.variantLabel ? `(${item.variantLabel})` : null,
      ]
        .filter(Boolean)
        .join(" ");

      const pack =
        typeof item.tierQuantity === "number" && item.tierQuantity > 1
          ? `Pack of ${item.tierQuantity}`
          : undefined;

      const unitPrice = typeof item.tierPrice === "number" ? item.tierPrice : 0;
      const qty = typeof item.count === "number" && item.count > 0 ? item.count : 1;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
            ...(pack ? { description: pack } : {}),
          },
          unit_amount: toCents(unitPrice),
        },
        quantity: qty,
      } as const;
    }),
  ];

  const shipping =
    order.shipping_cost && Number(order.shipping_cost) > 0
      ? Number(order.shipping_cost)
      : 0;

  if (shipping > 0) {
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Shipping" },
        unit_amount: toCents(shipping),
      },
      quantity: 1,
    });
  }

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

