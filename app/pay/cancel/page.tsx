import Link from "next/link";

export default async function PayCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Payment canceled</h1>
      <p className="mt-3 text-sm text-muted">
        No charge was made. You can try again whenever you’re ready.
      </p>
      {orderId ? (
        <p className="mt-4 text-sm">
          Order ID: <span className="font-mono">{orderId}</span>
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        {orderId ? (
          <Link
            href={`/pay/${encodeURIComponent(orderId)}`}
            className="inline-flex items-center justify-center rounded-2xl bg-accent px-4 py-2.5 text-sm font-medium text-background ring-1 ring-accent/60 hover:brightness-105"
          >
            Try payment again
          </Link>
        ) : null}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl border border-border/80 bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:border-border"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

