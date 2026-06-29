import { INITIAL_PRODUCTS, Product } from "../products/mock-data";

export { INITIAL_PRODUCTS };
export type { Product };

// ─── Order Types ─────────────────────────────────────────────
export type OrderType    = "Walkin" | "Online";
export type PaymentMode  = "Cash" | "E-wallet";
export type OrderStatus  = "Completed" | "Pending" | "Out on Delivery" | "Cancelled";

export interface CartItem {
  product: Product;
  qty: number;
  /** Unit price at time of adding (after promo) */
  unit_price: number;
}

export interface Order {
  order_id: number;
  order_type: OrderType;
  order_payment_mode: PaymentMode;
  order_payment_status: "Paid" | "Unpaid";
  order_status: OrderStatus;
  items: CartItem[];
  order_total: number;   // gross (before discount)
  order_amount: number;  // amount tendered (cash) or 0 for e-wallet
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────
export function getEffectivePrice(product: Product): number {
  if (!product.promo) return Number(product.prod_price);
  const price = Number(product.prod_price);
  const val   = Number(product.promo.promo_value);
  if (product.promo.promo_type === "percent") return price * (1 - val / 100);
  if (product.promo.promo_type === "fixed")   return Math.max(0, price - val);
  return price;
}
