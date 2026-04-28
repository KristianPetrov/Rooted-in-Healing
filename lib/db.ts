import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return url;
}

export function getPool(): Pool {
  if (!globalThis.__pgPool) {
    globalThis.__pgPool = new Pool({
      connectionString: getDatabaseUrl(),
      max: 5,
    });
  }
  return globalThis.__pgPool;
}

export type DbOrderItem = {
  productName?: string;
  variantLabel?: string;
  tierQuantity?: number;
  tierPrice?: number;
  count?: number;
};

export type DbOrder = {
  id: string;
  order_number: string;
  status: string;
  customer_name: string;
  customer_email: string;
  items: DbOrderItem[];
  subtotal: string;
  shipping_cost: string | null;
  total_amount: string | null;
  payment_method: string;
};

export async function getOrderById(orderId: string): Promise<DbOrder | null> {
  const pool = getPool();
  const res = await pool.query<DbOrder>(
    `select
      id,
      order_number,
      status,
      customer_name,
      customer_email,
      items,
      subtotal,
      shipping_cost,
      total_amount,
      payment_method
    from public.orders
    where id = $1
    limit 1`,
    [orderId],
  );

  return res.rows[0] ?? null;
}

