export interface Product {
  prod_id: number;
  prod_price: number;
  prod_stock: number;
  prod_status: "Available" | "Sold" | "Reserved" | "Discarded";
  updated_at: string;
  prodlist_id: number;
  prodlist: {
    prodlist_name: string;
    cat: {
      cat_name: string;
    };
  };
  promo: {
    promo_code: string;
    promo_type: string;
    promo_value: number;
  } | null;
  description: string;
  images: string[];
}



// Default Category Images

export const DEFAULT_IMAGES: Record<string, string[]> = {
  Cakes: [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80",
  ],
  Cupcakes: [
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=80",
  ],
  Pastries: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
  ],
};

export const DEFAULT_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
];

// Initial Seed Data

export const INITIAL_PRODUCTS: Product[] = [
  {
    prod_id: 1,
    prod_price: 850.0,
    prod_stock: 10,
    prod_status: "Available",
    updated_at: new Date("2026-06-25").toISOString(),
    prodlist_id: 1,
    prodlist: {
      prodlist_name: "Classic Red Velvet Cake",
      cat: { cat_name: "Cakes" },
    },
    promo: {
      promo_code: "WELCOME10",
      promo_type: "percent",
      promo_value: 10,
    },
    description:
      "Deep red cocoa sponge layered with rich, tangy cream cheese frosting.",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 2,
    prod_price: 1200.0,
    prod_stock: 5,
    prod_status: "Available",
    updated_at: new Date("2026-06-26").toISOString(),
    prodlist_id: 2,
    prodlist: {
      prodlist_name: "Premium Chocolate Fudge Cake",
      cat: { cat_name: "Cakes" },
    },
    promo: null,
    description:
      "Rich Belgian chocolate cake coated with silky warm chocolate fudge icing.",
    images: [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 3,
    prod_price: 350.0,
    prod_stock: 20,
    prod_status: "Available",
    updated_at: new Date("2026-06-24").toISOString(),
    prodlist_id: 1,
    prodlist: {
      prodlist_name: "Classic Vanilla Chiffon",
      cat: { cat_name: "Cakes" },
    },
    promo: null,
    description: "Light and airy chiffon cake with a delicate sweet vanilla glaze.",
    images: [
      "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 4,
    prod_price: 1350.0,
    prod_stock: 8,
    prod_status: "Available",
    updated_at: new Date("2026-06-27").toISOString(),
    prodlist_id: 2,
    prodlist: {
      prodlist_name: "Premium Strawberry Shortcake",
      cat: { cat_name: "Cakes" },
    },
    promo: null,
    description:
      "Soft sponge layers filled with fresh local strawberries and light whipped cream.",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 5,
    prod_price: 120.0,
    prod_stock: 24,
    prod_status: "Available",
    updated_at: new Date("2026-06-25").toISOString(),
    prodlist_id: 3,
    prodlist: {
      prodlist_name: "Blueberry Bliss Cupcake",
      cat: { cat_name: "Cupcakes" },
    },
    promo: null,
    description:
      "Fluffy vanilla base topped with rich blueberry buttercream frosting and fresh berries.",
    images: [
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 6,
    prod_price: 130.0,
    prod_stock: 30,
    prod_status: "Available",
    updated_at: new Date("2026-06-26").toISOString(),
    prodlist_id: 3,
    prodlist: {
      prodlist_name: "Double Chocolate Cupcake",
      cat: { cat_name: "Cupcakes" },
    },
    promo: {
      promo_code: "WELCOME10",
      promo_type: "percent",
      promo_value: 10,
    },
    description:
      "Decadent dark chocolate cake crowned with chocolate frosting and fine dark curls.",
    images: [
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 7,
    prod_price: 135.0,
    prod_stock: 0,
    prod_status: "Sold",
    updated_at: new Date("2026-06-27").toISOString(),
    prodlist_id: 3,
    prodlist: {
      prodlist_name: "Salted Caramel Cupcake",
      cat: { cat_name: "Cupcakes" },
    },
    promo: null,
    description:
      "Rich caramel base with a pinch of sea salt, topped with a smooth caramel drizzle.",
    images: [
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 8,
    prod_price: 95.0,
    prod_stock: 40,
    prod_status: "Available",
    updated_at: new Date("2026-06-25").toISOString(),
    prodlist_id: 4,
    prodlist: {
      prodlist_name: "Golden Butter Croissant",
      cat: { cat_name: "Pastries" },
    },
    promo: null,
    description:
      "Traditional flaky, buttery multi-layered pastry baked to golden-brown perfection.",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 9,
    prod_price: 110.0,
    prod_stock: 25,
    prod_status: "Available",
    updated_at: new Date("2026-06-26").toISOString(),
    prodlist_id: 4,
    prodlist: {
      prodlist_name: "Premium Pain au Chocolat",
      cat: { cat_name: "Pastries" },
    },
    promo: null,
    description:
      "Crisp, flaky laminated dough enclosing two bars of bittersweet dark chocolate.",
    images: [
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 10,
    prod_price: 125.0,
    prod_stock: 10,
    prod_status: "Available",
    updated_at: new Date("2026-06-27").toISOString(),
    prodlist_id: 4,
    prodlist: {
      prodlist_name: "Sweet Almond Danish",
      cat: { cat_name: "Pastries" },
    },
    promo: null,
    description:
      "Delicate pastry filled with sweet almond frangipane, topped with toasted sliced almonds.",
    images: [
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 11,
    prod_price: 85.0,
    prod_stock: 4,
    prod_status: "Reserved",
    updated_at: new Date("2026-06-25").toISOString(),
    prodlist_id: 4,
    prodlist: {
      prodlist_name: "Glazed Cinnamon Roll",
      cat: { cat_name: "Pastries" },
    },
    promo: null,
    description:
      "Soft sweet yeast dough roll swirled with cinnamon butter and frosted with cream cheese glaze.",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80",
    ],
  },
  {
    prod_id: 12,
    prod_price: 75.0,
    prod_stock: 0,
    prod_status: "Discarded",
    updated_at: new Date("2026-06-24").toISOString(),
    prodlist_id: 4,
    prodlist: {
      prodlist_name: "Blueberry Crumb Scone",
      cat: { cat_name: "Pastries" },
    },
    promo: null,
    description:
      "Buttery, crumbly scone baked with fresh sweet blueberries and dusted with coarse sugar.",
    images: [
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80",
    ],
  },
];
