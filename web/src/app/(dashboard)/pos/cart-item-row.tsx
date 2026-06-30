"use client";

import { CartItem } from "./mock-data";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CartItemRowProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  const lineTotal = item.unit_price * item.qty;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border/60 last:border-0">
      {/* Thumbnail */}
      <div className="relative size-12 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-border">
        <Image
          src={item.product.images[0]}
          alt={item.product.prodlist.prodlist_name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[oklch(0.3828_0.106_350.28)] leading-tight truncate">
          {item.product.prodlist.prodlist_name}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          ₱{item.unit_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} × {item.qty}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDecrease}
          className="size-6 rounded-lg hover:bg-pink-50 hover:text-[#d44876] cursor-pointer"
        >
          <Minus className="size-3" />
        </Button>

        <span className="w-6 text-center text-xs font-bold text-foreground">{item.qty}</span>

        <Button
          variant="ghost"
          size="icon"
          onClick={onIncrease}
          disabled={item.qty >= item.product.prod_stock}
          className="size-6 rounded-lg hover:bg-pink-50 hover:text-[#d44876] cursor-pointer"
        >
          <Plus className="size-3" />
        </Button>
      </div>

      {/* Line total + remove */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-xs font-bold text-[#d44876]">
          ₱{lineTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="size-5 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
        >
          <Trash2 className="size-3" />
        </Button>
      </div>
    </div>
  );
}
