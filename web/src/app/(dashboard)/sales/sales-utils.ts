import { ExtendedOrder } from "../orders/mock-data";

export type SalesPeriod = "7d" | "30d" | "month" | "all";
export type SalesTypeFilter = "All" | "Walkin" | "Online";

export interface DailyRevenue {
  label: string;
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
}

export interface SalesBreakdownItem {
  label: string;
  value: number;
  color: string;
}

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export { fmtMoney };

export function isCountableSale(order: ExtendedOrder): boolean {
  return order.order_payment_status === "Paid" && order.order_status !== "Cancelled";
}

export function filterSalesOrders(
  orders: ExtendedOrder[],
  period: SalesPeriod,
  typeFilter: SalesTypeFilter
): ExtendedOrder[] {
  const now = new Date("2026-06-30T12:00:00Z");
  const periodDays = period === "7d" ? 7 : period === "30d" ? 30 : null;

  return orders.filter((order) => {
    if (!isCountableSale(order)) return false;
    if (typeFilter !== "All" && order.order_type !== typeFilter) return false;
    if (period === "month") {
      const created = new Date(order.created_at);
      if (
        created.getFullYear() !== now.getFullYear() ||
        created.getMonth() !== now.getMonth()
      ) {
        return false;
      }
    } else if (periodDays) {
      const created = new Date(order.created_at);
      const diffMs = now.getTime() - created.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      if (diffDays > periodDays) return false;
    }
    return true;
  });
}

export function computeSalesStats(orders: ExtendedOrder[]) {
  const revenue = orders.reduce((sum, o) => sum + o.order_total, 0);
  const count = orders.length;
  const walkin = orders.filter((o) => o.order_type === "Walkin");
  const online = orders.filter((o) => o.order_type === "Online");

  return {
    totalRevenue: revenue,
    totalOrders: count,
    avgOrderValue: count > 0 ? revenue / count : 0,
    walkinRevenue: walkin.reduce((s, o) => s + o.order_total, 0),
    onlineRevenue: online.reduce((s, o) => s + o.order_total, 0),
    walkinCount: walkin.length,
    onlineCount: online.length,
  };
}

export function computeDailyRevenue(orders: ExtendedOrder[]): DailyRevenue[] {
  const map = new Map<string, DailyRevenue>();

  for (const order of orders) {
    const date = order.created_at.slice(0, 10);
    const existing = map.get(date) ?? {
      label: new Date(order.created_at).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      date,
      revenue: 0,
      orders: 0,
    };
    existing.revenue += order.order_total;
    existing.orders += 1;
    map.set(date, existing);
  }

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function computeMonthlyRevenue(orders: ExtendedOrder[]): DailyRevenue[] {
  const map = new Map<string, DailyRevenue>();

  for (const order of orders) {
    const created = new Date(order.created_at);
    const date = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}`;
    const existing = map.get(date) ?? {
      label: created.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      date,
      revenue: 0,
      orders: 0,
    };
    existing.revenue += order.order_total;
    existing.orders += 1;
    map.set(date, existing);
  }

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function computeTopProducts(orders: ExtendedOrder[]): TopProduct[] {
  const map = new Map<string, TopProduct>();

  for (const order of orders) {
    for (const item of order.items) {
      const name = item.product.prodlist.prodlist_name;
      const category = item.product.prodlist.cat.cat_name;
      const key = name;
      const existing = map.get(key) ?? { name, category, unitsSold: 0, revenue: 0 };
      existing.unitsSold += item.qty;
      existing.revenue += item.unit_price * item.qty;
      map.set(key, existing);
    }
  }

  return Array.from(map.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

export function computePaymentBreakdown(orders: ExtendedOrder[]): SalesBreakdownItem[] {
  const cash = orders.filter((o) => o.order_payment_mode === "Cash");
  const ewallet = orders.filter((o) => o.order_payment_mode === "E-wallet");

  return [
    {
      label: "Cash",
      value: cash.reduce((s, o) => s + o.order_total, 0),
      color: "bg-[#d44876]",
    },
    {
      label: "E-wallet",
      value: ewallet.reduce((s, o) => s + o.order_total, 0),
      color: "bg-[#f6bc9c]",
    },
  ];
}

export function computeCategoryBreakdown(orders: ExtendedOrder[]): SalesBreakdownItem[] {
  const map = new Map<string, number>();
  const colors = ["bg-[#d44876]", "bg-[#f6bc9c]", "bg-emerald-400", "bg-amber-400"];

  for (const order of orders) {
    for (const item of order.items) {
      const cat = item.product.prodlist.cat.cat_name;
      map.set(cat, (map.get(cat) ?? 0) + item.unit_price * item.qty);
    }
  }

  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, value], i) => ({
      label,
      value,
      color: colors[i % colors.length],
    }));
}
