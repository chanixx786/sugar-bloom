export interface Expense {
  exp_id: number;
  inv_id: number;
  inv_name: string;
  inv_category: string;
  exp_amount: number;
  exp_date_purchased: string;
  exp_vendor: string;
}

export const VENDOR_COLORS: Record<string, string> = {
  "Metro Gaisano Supermart": "bg-pink-100 text-pink-600",
  "SM Supermarket": "bg-blue-100 text-blue-600",
  "Robinsons Supermarket": "bg-green-100 text-green-600",
  "Local Market": "bg-amber-100 text-amber-600",
  Other: "bg-gray-100 text-gray-500",
};

export const INITIAL_EXPENSES: Expense[] = [
  {
    exp_id: 1,
    inv_id: 1,
    inv_name: "All-purpose flour",
    inv_category: "Baking",
    exp_amount: 1500.0,
    exp_date_purchased: "2026-06-01",
    exp_vendor: "Metro Gaisano Supermart",
  },
  {
    exp_id: 2,
    inv_id: 2,
    inv_name: "Granulated sugar",
    inv_category: "Baking",
    exp_amount: 980.0,
    exp_date_purchased: "2026-06-05",
    exp_vendor: "SM Supermarket",
  },
  {
    exp_id: 3,
    inv_id: 3,
    inv_name: "Heavy cream",
    inv_category: "Dairy",
    exp_amount: 720.0,
    exp_date_purchased: "2026-06-10",
    exp_vendor: "Robinsons Supermarket",
  },
  {
    exp_id: 4,
    inv_id: 4,
    inv_name: "Fresh strawberries",
    inv_category: "Fruits",
    exp_amount: 450.0,
    exp_date_purchased: "2026-06-15",
    exp_vendor: "Local Market",
  },
  {
    exp_id: 5,
    inv_id: 7,
    inv_name: "Butter (unsalted)",
    inv_category: "Dairy",
    exp_amount: 1250.0,
    exp_date_purchased: "2026-06-18",
    exp_vendor: "Metro Gaisano Supermart",
  },
  {
    exp_id: 6,
    inv_id: 6,
    inv_name: "Gift boxes (medium)",
    inv_category: "Packaging",
    exp_amount: 320.0,
    exp_date_purchased: "2026-06-20",
    exp_vendor: "SM Supermarket",
  },
  {
    exp_id: 7,
    inv_id: 12,
    inv_name: "Eggs (large)",
    inv_category: "Dairy",
    exp_amount: 540.0,
    exp_date_purchased: "2026-06-22",
    exp_vendor: "Local Market",
  },
  {
    exp_id: 8,
    inv_id: 8,
    inv_name: "Baking powder",
    inv_category: "Baking",
    exp_amount: 180.0,
    exp_date_purchased: "2026-06-25",
    exp_vendor: "Robinsons Supermarket",
  },
  {
    exp_id: 9,
    inv_id: 5,
    inv_name: "Pink roses",
    inv_category: "Flowers",
    exp_amount: 890.0,
    exp_date_purchased: "2026-06-27",
    exp_vendor: "Local Market",
  },
  {
    exp_id: 10,
    inv_id: 10,
    inv_name: "Blueberries",
    inv_category: "Fruits",
    exp_amount: 620.0,
    exp_date_purchased: "2026-06-28",
    exp_vendor: "Metro Gaisano Supermart",
  },
];
