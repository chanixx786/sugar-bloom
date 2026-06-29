import { Order } from "../pos/mock-data";

export interface ExtendedOrder extends Order {
  customer_name?: string;
  customer_phone?: string;
}

export const INITIAL_ORDERS: ExtendedOrder[] = [
  {
    order_id: 1719602400000, // June 28, 2026
    order_type: "Walkin",
    order_payment_mode: "Cash",
    order_payment_status: "Paid",
    order_status: "Completed",
    customer_name: "Walk-in Customer",
    items: [
      {
        product: {
          prod_id: 1,
          prodlist_id: 101,
          prod_price: 765.00,
          prod_stock: 12,
          prod_status: "Available",
          updated_at: new Date().toISOString(),
          description: "Rich chocolate fudge layers.",
          images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80"],
          prodlist: {
            prodlist_name: "Chocolate Fudge Cake",
            cat: { cat_name: "Cakes" },
          },
          promo: null
        },
        qty: 1,
        unit_price: 765.00
      }
    ],
    order_total: 765.00,
    order_amount: 800.00,
    created_at: "2026-06-28T14:30:00Z"
  },
  {
    order_id: 1719606000000,
    order_type: "Online",
    order_payment_mode: "E-wallet",
    order_payment_status: "Paid",
    order_status: "Pending",
    customer_name: "Maria Santos",
    customer_phone: "+63 917 123 4567",
    items: [
      {
        product: {
          prod_id: 2,
          prodlist_id: 102,
          prod_price: 850.00,
          prod_stock: 8,
          prod_status: "Available",
          updated_at: new Date().toISOString(),
          description: "Classic red velvet with cream cheese.",
          images: ["https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&auto=format&fit=crop&q=80"],
          prodlist: {
            prodlist_name: "Classic Red Velvet Cake",
            cat: { cat_name: "Cakes" },
          },
          promo: null
        },
        qty: 1,
        unit_price: 850.00
      },
      {
        product: {
          prod_id: 3,
          prodlist_id: 103,
          prod_price: 90.00,
          prod_stock: 24,
          prod_status: "Available",
          updated_at: new Date().toISOString(),
          description: "Rich dark chocolate cupcake.",
          images: ["https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=80"],
          prodlist: {
            prodlist_name: "Double Chocolate Cupcake",
            cat: { cat_name: "Cupcakes" },
          },
          promo: null
        },
        qty: 4,
        unit_price: 90.00
      }
    ],
    order_total: 1210.00,
    order_amount: 1210.00,
    created_at: "2026-06-28T15:35:00Z"
  },
  {
    order_id: 1719609600000,
    order_type: "Online",
    order_payment_mode: "E-wallet",
    order_payment_status: "Paid",
    order_status: "Out on Delivery",
    customer_name: "James Yap",
    customer_phone: "+63 918 765 4321",
    items: [
      {
        product: {
          prod_id: 1,
          prodlist_id: 101,
          prod_price: 765.00,
          prod_stock: 12,
          prod_status: "Available",
          updated_at: new Date().toISOString(),
          description: "Rich chocolate fudge layers.",
          images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80"],
          prodlist: {
            prodlist_name: "Chocolate Fudge Cake",
            cat: { cat_name: "Cakes" },
          },
          promo: null
        },
        qty: 2,
        unit_price: 765.00
      }
    ],
    order_total: 1530.00,
    order_amount: 1530.00,
    created_at: "2026-06-28T16:20:00Z"
  },
  {
    order_id: 1719613200000,
    order_type: "Walkin",
    order_payment_mode: "Cash",
    order_payment_status: "Paid",
    order_status: "Completed",
    customer_name: "Walk-in Customer",
    items: [
      {
        product: {
          prod_id: 4,
          prodlist_id: 104,
          prod_price: 120.00,
          prod_stock: 15,
          prod_status: "Available",
          updated_at: new Date().toISOString(),
          description: "Crispy butter croissant.",
          images: ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"],
          prodlist: {
            prodlist_name: "Butter Croissant",
            cat: { cat_name: "Pastries" },
          },
          promo: null
        },
        qty: 3,
        unit_price: 120.00
      }
    ],
    order_total: 360.00,
    order_amount: 500.00,
    created_at: "2026-06-29T09:15:00Z"
  },
  {
    order_id: 1719616800000,
    order_type: "Online",
    order_payment_mode: "E-wallet",
    order_payment_status: "Unpaid",
    order_status: "Cancelled",
    customer_name: "Sarah Lim",
    customer_phone: "+63 920 888 9999",
    items: [
      {
        product: {
          prod_id: 2,
          prodlist_id: 102,
          prod_price: 850.00,
          prod_stock: 8,
          prod_status: "Available",
          updated_at: new Date().toISOString(),
          description: "Classic red velvet with cream cheese.",
          images: ["https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&auto=format&fit=crop&q=80"],
          prodlist: {
            prodlist_name: "Classic Red Velvet Cake",
            cat: { cat_name: "Cakes" },
          },
          promo: null
        },
        qty: 1,
        unit_price: 850.00
      }
    ],
    order_total: 850.00,
    order_amount: 0.00,
    created_at: "2026-06-29T10:40:00Z"
  }
];
