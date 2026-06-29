// Types

export type InventoryStatus = "In stock" | "Low stock" | "Out of stock";

export interface InventoryItem {
  id: number;
  item: string;
  category: string;
  qty: number;
  qty_unit: string;
  threshold: number;
  threshold_unit: string;
  status: InventoryStatus;
  expiry_date?: string;
}

// Category Colors

export const CATEGORY_COLORS: Record<string, string> = {
  Baking: "bg-pink-100 text-pink-600",
  Dairy: "bg-blue-100 text-blue-500",
  Fruits: "bg-green-100 text-green-600",
  Flowers: "bg-purple-100 text-purple-500",
  Packaging: "bg-amber-100 text-amber-600",
  Other: "bg-gray-100 text-gray-500",
};

// Status Colors

export const STATUS_STYLES: Record<InventoryStatus, string> = {
  "In stock": "bg-green-100 text-green-600",
  "Low stock": "bg-red-100 text-red-500",
  "Out of stock": "bg-gray-100 text-gray-500",
};

// Seed Data

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 1,
    item: "All-purpose flour",
    category: "Baking",
    qty: 24,
    qty_unit: "kg",
    threshold: 10,
    threshold_unit: "kg",
    status: "In stock",
    expiry_date: "2026-12-31",        // normal — no badge
  },
  {
    id: 2,
    item: "Granulated sugar",
    category: "Baking",
    qty: 18,
    qty_unit: "kg",
    threshold: 8,
    threshold_unit: "kg",
    status: "In stock",
    expiry_date: "2026-12-31",        // normal — no badge
  },
  {
    id: 3,
    item: "Heavy cream",
    category: "Dairy",
    qty: 6,
    qty_unit: "L",
    threshold: 8,
    threshold_unit: "L",
    status: "Low stock",
    expiry_date: "2026-07-03",        // Near Expiry (≤ 7 days)
  },
  {
    id: 4,
    item: "Fresh strawberries",
    category: "Fruits",
    qty: 3,
    qty_unit: "kg",
    threshold: 5,
    threshold_unit: "kg",
    status: "Low stock",
    expiry_date: "2026-06-20",        // Expired (past date)
  },
  {
    id: 5,
    item: "Pink roses",
    category: "Flowers",
    qty: 60,
    qty_unit: "stems",
    threshold: 30,
    threshold_unit: "stems",
    status: "In stock",
    expiry_date: "2026-07-20",        // Expiring Soon (≤ 30 days)
  },
  {
    id: 6,
    item: "Gift boxes (medium)",
    category: "Packaging",
    qty: 22,
    qty_unit: "pcs",
    threshold: 15,
    threshold_unit: "pcs",
    status: "In stock",
    // no expiry_date — shows "—"
  },
  {
    id: 7,
    item: "Butter (unsalted)",
    category: "Dairy",
    qty: 12,
    qty_unit: "kg",
    threshold: 5,
    threshold_unit: "kg",
    status: "In stock",
    expiry_date: "2026-07-05",        // Near Expiry (≤ 7 days)
  },
  {
    id: 8,
    item: "Baking powder",
    category: "Baking",
    qty: 2,
    qty_unit: "kg",
    threshold: 3,
    threshold_unit: "kg",
    status: "Low stock",
    expiry_date: "2026-07-25",        // Expiring Soon (≤ 30 days)
  },
  {
    id: 9,
    item: "Vanilla extract",
    category: "Baking",
    qty: 0,
    qty_unit: "L",
    threshold: 1,
    threshold_unit: "L",
    status: "Out of stock",
    expiry_date: "2026-05-15",        // Expired (past date)
  },
  {
    id: 10,
    item: "Blueberries",
    category: "Fruits",
    qty: 8,
    qty_unit: "kg",
    threshold: 4,
    threshold_unit: "kg",
    status: "In stock",
    expiry_date: "2026-07-01",        // Near Expiry (≤ 7 days)
  },
  {
    id: 11,
    item: "Ribbon (pink, 1m)",
    category: "Packaging",
    qty: 50,
    qty_unit: "pcs",
    threshold: 20,
    threshold_unit: "pcs",
    status: "In stock",
    // no expiry_date — shows "—"
  },
  {
    id: 12,
    item: "Eggs (large)",
    category: "Dairy",
    qty: 4,
    qty_unit: "trays",
    threshold: 5,
    threshold_unit: "trays",
    status: "Low stock",
    expiry_date: "2026-07-10",        // Expiring Soon (≤ 30 days)
  },
];
