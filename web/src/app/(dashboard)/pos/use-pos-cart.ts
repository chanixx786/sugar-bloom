"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Product } from "../products/mock-data";
import { OrderCustomer } from "./customer-modal";
import {
  CartItem,
  Order,
  OrderType,
  PaymentMode,
  getEffectivePrice,
} from "./mock-data";

export function usePosCart(products: Product[]) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("Walkin");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("Cash");
  const [amountTendered, setAmountTendered] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [lastChange, setLastChange] = useState(0);
  const [customer, setCustomer] = useState<OrderCustomer | null>(null);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const matchesSearch =
        !q ||
        p.prodlist.prodlist_name.toLowerCase().includes(q) ||
        p.prodlist.cat.cat_name.toLowerCase().includes(q);
      const matchesCat =
        categoryFilter === "All" || p.prodlist.cat.cat_name === categoryFilter;
      return matchesSearch && matchesCat && p.prod_status === "Available";
    });
  }, [products, search, categoryFilter]);

  const orderTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.unit_price * i.qty, 0),
    [cart]
  );

  const itemCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart]
  );

  const discountTotal = useMemo(
    () =>
      cart.reduce((sum, i) => {
        const orig = Number(i.product.prod_price);
        return sum + (orig - i.unit_price) * i.qty;
      }, 0),
    [cart]
  );

  const change = useMemo(() => {
    const tendered = parseFloat(amountTendered) || 0;
    return Math.max(0, tendered - orderTotal);
  }, [amountTendered, orderTotal]);

  const clearCart = () => {
    setCart([]);
    setAmountTendered("");
  };

  const handleOrderTypeChange = (type: OrderType) => {
    setOrderType(type);
    setCustomer(null);
  };

  const handleConfirmCustomer = (nextCustomer: OrderCustomer) => {
    setCustomer(nextCustomer);
    setCustomerModalOpen(false);
  };

  const handleAddToCart = (product: Product) => {
    const unitPrice = getEffectivePrice(product);
    setCart((prev) => {
      const existing = prev.find((i) => i.product.prod_id === product.prod_id);
      if (existing) {
        if (existing.qty >= product.prod_stock) {
          toast.error(`Max stock reached for "${product.prodlist.prodlist_name}".`);
          return prev;
        }
        return prev.map((i) =>
          i.product.prod_id === product.prod_id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1, unit_price: unitPrice }];
    });
  };

  const handleIncrease = (prodId: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.product.prod_id !== prodId) return i;
        if (i.qty >= i.product.prod_stock) {
          toast.error("Maximum available stock reached.");
          return i;
        }
        return { ...i, qty: i.qty + 1 };
      })
    );
  };

  const handleDecrease = (prodId: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.prod_id === prodId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const handleRemove = (prodId: number) =>
    setCart((prev) => prev.filter((i) => i.product.prod_id !== prodId));

  const handlePlaceOrder = () => {
    if (!customer) {
      toast.error("Please identify the customer before placing an order.");
      return;
    }
    if (cart.length === 0) {
      toast.error("Cart is empty. Add items before placing an order.");
      return;
    }
    if (paymentMode === "Cash" && (parseFloat(amountTendered) || 0) < orderTotal) {
      toast.error("Amount tendered is less than the order total.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const order: Order = {
        order_id: Date.now(),
        order_type: orderType,
        order_payment_mode: paymentMode,
        order_payment_status: "Paid",
        order_status: orderType === "Online" ? "Pending" : "Completed",
        items: [...cart],
        order_total: orderTotal,
        order_amount: parseFloat(amountTendered) || orderTotal,
        created_at: new Date().toISOString(),
        cus_id: customer.cus_id,
        customer_name: customer.customer_name,
        customer_phone: customer.customer_phone,
      };

      setLastChange(change);
      setLastOrder(order);
      clearCart();
      setCustomer(null);
      setIsProcessing(false);
    }, 600);
  };

  return {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    filteredProducts,
    cart,
    orderType,
    customer,
    customerModalOpen,
    setCustomerModalOpen,
    handleOrderTypeChange,
    handleConfirmCustomer,
    paymentMode,
    setPaymentMode,
    amountTendered,
    setAmountTendered,
    orderTotal,
    itemCount,
    discountTotal,
    change,
    isProcessing,
    lastOrder,
    lastChange,
    clearReceipt: () => setLastOrder(null),
    handleAddToCart,
    handleIncrease,
    handleDecrease,
    handleRemove,
    handleClearCart: clearCart,
    handlePlaceOrder,
  };
}
