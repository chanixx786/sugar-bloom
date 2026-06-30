"use client";

import {
  ShoppingBag,
  Receipt,
  Banknote,
  Wallet,
  Users,
  Bike,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CartItem, OrderType, PaymentMode } from "./mock-data";
import { CASH_PRESETS } from "./constants";
import { CartItemRow } from "./cart-item-row";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface OrderPanelProps {
  cart: CartItem[];
  itemCount: number;
  orderType: OrderType;
  onOrderTypeChange: (type: OrderType) => void;
  customerName?: string;
  onChangeCustomer: () => void;
  paymentMode: PaymentMode;
  onPaymentModeChange: (mode: PaymentMode) => void;
  amountTendered: string;
  onAmountTenderedChange: (value: string) => void;
  orderTotal: number;
  discountTotal: number;
  change: number;
  isProcessing: boolean;
  onIncrease: (prodId: number) => void;
  onDecrease: (prodId: number) => void;
  onRemove: (prodId: number) => void;
  onClearCart: () => void;
  onPlaceOrder: () => void;
}

export function OrderPanel({
  cart,
  itemCount,
  orderType,
  onOrderTypeChange,
  customerName,
  onChangeCustomer,
  paymentMode,
  onPaymentModeChange,
  amountTendered,
  onAmountTenderedChange,
  orderTotal,
  discountTotal,
  change,
  isProcessing,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
  onPlaceOrder,
}: OrderPanelProps) {
  const tendered = parseFloat(amountTendered) || 0;
  const canPlaceOrder =
    !!customerName &&
    cart.length > 0 &&
    !isProcessing &&
    (paymentMode !== "Cash" || tendered >= orderTotal);

  return (
    <div className="w-80 xl:w-96 shrink-0 flex flex-col overflow-hidden">
      <Card className="flex flex-col flex-1 overflow-hidden p-0 py-0 gap-0">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0 bg-gradient-to-r from-[#d44876]/5 to-transparent">
          <div className="flex items-center gap-2">
            <Receipt className="size-4 text-[#d44876]" />
            <span className="font-bold text-sm text-foreground">Current Order</span>
            {itemCount > 0 && (
              <span className="inline-flex items-center justify-center size-5 rounded-full bg-[#d44876] text-white text-[10px] font-bold animate-in zoom-in-50">
                {itemCount}
              </span>
            )}
          </div>
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-[10px] font-semibold text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="px-5 py-3 border-b border-border/60 shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Order Type
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(["Walkin", "Online"] as OrderType[]).map((type) => (
              <button
                key={type}
                onClick={() => onOrderTypeChange(type)}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                  orderType === type
                    ? "bg-[#d44876] text-white border-[#d44876] shadow"
                    : "bg-white text-muted-foreground border-border hover:border-[#d44876]/40 hover:text-[#d44876]"
                )}
              >
                {type === "Walkin" ? <Users className="size-3.5" /> : <Bike className="size-3.5" />}
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 border-b border-border/60 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Customer
            </p>
            <button
              type="button"
              onClick={onChangeCustomer}
              className="text-[10px] font-semibold text-[#d44876] hover:underline cursor-pointer"
            >
              {customerName ? "Change" : "Set customer"}
            </button>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2",
              customerName
                ? "border-[#d44876]/20 bg-pink-50/40"
                : "border-dashed border-border bg-gray-50/50"
            )}
          >
            <User className="size-3.5 shrink-0 text-[#d44876]" />
            <span
              className={cn(
                "text-xs font-semibold truncate",
                customerName ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {customerName || "No customer selected"}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 min-h-0">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-center">
              <ShoppingBag className="size-8 text-muted-foreground/30" />
              <p className="text-xs text-muted-foreground">No items yet. Tap a product to add.</p>
            </div>
          ) : (
            cart.map((item) => (
              <CartItemRow
                key={item.product.prod_id}
                item={item}
                onIncrease={() => onIncrease(item.product.prod_id)}
                onDecrease={() => onDecrease(item.product.prod_id)}
                onRemove={() => onRemove(item.product.prod_id)}
              />
            ))
          )}
        </div>

        <div className="px-5 py-4 border-t border-border bg-gray-50/60 shrink-0 flex flex-col gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Payment Method
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["Cash", "E-wallet"] as PaymentMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    onPaymentModeChange(mode);
                    if (mode === "E-wallet") onAmountTenderedChange("");
                  }}
                  className={cn(
                    "flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                    paymentMode === mode
                      ? "bg-[oklch(0.3828_0.106_350.28)] text-white border-[oklch(0.3828_0.106_350.28)] shadow"
                      : "bg-white text-muted-foreground border-border hover:border-[oklch(0.3828_0.106_350.28)]/40"
                  )}
                >
                  {mode === "Cash" ? <Banknote className="size-3.5" /> : <Wallet className="size-3.5" />}
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {paymentMode === "Cash" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Amount Tendered
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground pointer-events-none">
                  ₱
                </span>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  value={amountTendered}
                  onChange={(e) => onAmountTenderedChange(e.target.value)}
                  className="pl-7 h-9 rounded-xl text-sm font-semibold"
                />
              </div>

              <div className="flex gap-1 flex-wrap">
                {CASH_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => onAmountTenderedChange(String(preset))}
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer",
                      tendered === preset
                        ? "bg-[#d44876] text-white border-[#d44876]"
                        : "bg-white text-muted-foreground border-border hover:border-[#d44876]/40 hover:text-[#d44876]"
                    )}
                  >
                    ₱{preset}
                  </button>
                ))}
                <button
                  onClick={() => onAmountTenderedChange(orderTotal.toFixed(2))}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-white text-muted-foreground border-border hover:border-[#d44876]/40 hover:text-[#d44876] transition-all cursor-pointer"
                >
                  Exact
                </button>
              </div>

              {amountTendered && tendered >= orderTotal && (
                <div className="flex justify-between text-xs font-semibold bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5">
                  <span className="text-emerald-700">Change</span>
                  <span className="text-emerald-700 font-extrabold">₱{fmt(change)}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1 pt-1 border-t border-border">
            {discountTotal > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                <span>Discount savings</span>
                <span>−₱{fmt(discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
              <span>₱{fmt(orderTotal)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[oklch(0.3828_0.106_350.28)] mt-0.5">
              <span>Total</span>
              <span className="text-[#d44876]">₱{fmt(orderTotal)}</span>
            </div>
          </div>

          <Button
            onClick={onPlaceOrder}
            disabled={!canPlaceOrder}
            className={cn(
              "w-full h-11 rounded-2xl font-bold text-sm tracking-wide transition-all",
              "bg-[#d44876] hover:bg-[#c23b65] text-white",
              "shadow-[0_6px_20px_-4px_rgba(212,72,118,0.35)]",
              "hover:shadow-[0_8px_24px_-4px_rgba(212,72,118,0.5)]",
              "hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
          >
            {isProcessing
              ? "Processing…"
              : cart.length === 0
                ? "Add items to order"
                : `Place Order · ₱${fmt(orderTotal)}`}
          </Button>
        </div>
      </Card>
    </div>
  );
}
