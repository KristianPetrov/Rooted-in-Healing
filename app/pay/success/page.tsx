import { redirect } from "next/navigation";

export default async function PaySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderNumber?: string;
    orderId?: string;
    orderAmount?: string;
    paymentMethod?: string;
  }>;
}) {
  const { orderNumber, orderId, orderAmount, paymentMethod } =
    await searchParams;

  const qs = new URLSearchParams();
  if (orderNumber) qs.set("orderNumber", orderNumber);
  if (orderId) qs.set("orderId", orderId);
  if (orderAmount) qs.set("orderAmount", orderAmount);
  if (paymentMethod) qs.set("paymentMethod", paymentMethod);

  const url = `https://www.affordablepeptides.life/checkout/thank-you${
    qs.toString() ? `?${qs.toString()}` : ""
  }`;

  redirect(url);
}

