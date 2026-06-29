"use client";

import React from "react";
import { Product } from "../products/mock-data";
import { ProductImageCarousel } from "../products/image-carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { getEffectivePrice } from "./mock-data";

interface POSProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function POSProductCard({ product, onAdd }: POSProductCardProps) {
  const discPrice  = getEffectivePrice(product);
  const origPrice  = Number(product.prod_price);
  const hasPromo   = product.promo !== null;
  const outOfStock = product.prod_stock === 0 || product.prod_status !== "Available";

  return (
    <Card className="group p-0 py-0 gap-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* ── Image Carousel + Overlaid Badges ─────────────── */}
      <div className="relative w-full overflow-hidden">
        <ProductImageCarousel
          images={product.images}
          productName={product.prodlist.prodlist_name}
        />

        {/* Top-left: Category + Promo badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase rounded-full bg-white/95 text-[oklch(0.3828_0.106_350.28)] backdrop-blur-sm shadow-sm w-fit">
            {product.prodlist.cat.cat_name}
          </span>

          {hasPromo && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wide uppercase rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md w-fit flex items-center gap-0.5 animate-bounce">
              {product.promo!.promo_code}:{" "}
              {product.promo!.promo_type === "percent"
                ? `${product.promo!.promo_value}% OFF`
                : `₱${product.promo!.promo_value} OFF`}
            </span>
          )}
        </div>

        {/* Top-right: Status badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={cn(
              "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm",
              product.prod_status === "Available" && "bg-emerald-500 text-white",
              product.prod_status === "Sold"      && "bg-red-500 text-white",
              product.prod_status === "Reserved"  && "bg-purple-600 text-white",
              product.prod_status === "Discarded" && "bg-gray-500 text-white"
            )}
          >
            {product.prod_status}
          </span>
        </div>
      </div>

      {/* ── Card Body ─────────────────────────────────────── */}
      <CardContent className="pt-4 flex-1 flex flex-col gap-3">
        {/* Name + Description */}
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-base text-[oklch(0.3828_0.106_350.28)]">
            {product.prodlist.prodlist_name}
          </h3>
          <p className="text-xs text-accent-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-gray-100">
          <span className="text-xl font-extrabold text-[oklch(0.3828_0.106_350.28)]">
            ₱{discPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          {hasPromo && (
            <span className="text-xs text-gray-400 line-through">
              ₱{origPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Stock Status + Progress Bar */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-gray-400">Stocks</span>
            <span
              className={cn(
                product.prod_stock === 0                          && "text-red-500 font-bold",
                product.prod_stock > 0 && product.prod_stock <= 5 && "text-amber-500 font-bold",
                product.prod_stock > 5                            && "text-emerald-600"
              )}
            >
              {product.prod_stock === 0 ? "Out of Stock" : `${product.prod_stock} remaining`}
            </span>
          </div>

          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-0.5">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                product.prod_stock === 0                          && "w-0",
                product.prod_stock > 0 && product.prod_stock <= 5 && "bg-amber-400",
                product.prod_stock > 5                            && "bg-emerald-500"
              )}
              style={{ width: `${Math.min((product.prod_stock / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>

      {/* ── Footer: Add to Order ──────────────────────────── */}
      <CardFooter className="py-3.5 px-6 bg-secondary/50">
        <Button
          type="button"
          disabled={outOfStock}
          onClick={() => onAdd(product)}
          className={cn(
            "w-full gap-2 font-semibold rounded-2xl transition-all cursor-pointer",
            "bg-[#d44876] hover:bg-[#c23b65] text-white",
            "shadow-[0_4px_14px_-4px_rgba(212,72,118,0.3)]",
            "hover:shadow-[0_6px_18px_-4px_rgba(212,72,118,0.45)]",
            "hover:scale-[1.02] active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          <ShoppingCart className="size-4" />
          {outOfStock ? "Unavailable" : "Add to Order"}
        </Button>
      </CardFooter>
    </Card>
  );
}
