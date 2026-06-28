"use client";

import React from "react";
import { Product } from "./mock-data";
import { ProductImageCarousel } from "./ProductImageCarousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  // Discounted price calculator helper
  const getDiscountedPrice = (prod: Product) => {
    if (!prod.promo) return prod.prod_price;
    const price = Number(prod.prod_price);
    const val = Number(prod.promo.promo_value);

    if (prod.promo.promo_type === "percent") {
      return price * (1 - val / 100);
    }
    if (prod.promo.promo_type === "fixed") {
      return Math.max(0, price - val);
    }
    return price;
  };

  const discPrice = getDiscountedPrice(product);
  const origPrice = Number(product.prod_price);
  const hasPromo = product.promo !== null;

  return (
    <Card className="group p-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Carousel Container with Overlays */}
      <div className="relative w-full overflow-hidden">
        <ProductImageCarousel
          images={product.images}
          productName={product.prodlist.prodlist_name}
        />

        {/* Overlaid Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {/* Category */}
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase rounded-full bg-white/95 text-[oklch(0.3828_0.106_350.28)] backdrop-blur-sm shadow-sm w-fit">
            {product.prodlist.cat.cat_name}
          </span>

          {/* Promotion Badge */}
          {hasPromo && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wide uppercase rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md w-fit flex items-center gap-0.5 animate-bounce">
              {product.promo?.promo_code}:{" "}
              {product.promo?.promo_type === "percent"
                ? `${product.promo.promo_value}% OFF`
                : `₱${product.promo?.promo_value} OFF`}
            </span>
          )}
        </div>

        {/* Status Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={cn(
              "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm",
              product.prod_status === "Available" && "bg-emerald-500 text-white",
              product.prod_status === "Sold" && "bg-red-500 text-white",
              product.prod_status === "Reserved" && "bg-purple-600 text-white",
              product.prod_status === "Discarded" && "bg-gray-500 text-white"
            )}
          >
            {product.prod_status}
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <CardContent className="pt-4 flex-1 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-base text-[oklch(0.3828_0.106_350.28)] ">
            {product.prodlist.prodlist_name}
          </h3>
          <p className="text-xs text-[oklch(0.55_0.08_350)] line-clamp-2 h-full leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing Details */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-gray-100">
          <span className="text-xl font-extrabold text-[oklch(0.3828_0.106_350.28)]">
            ₱
            {discPrice.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          {hasPromo && (
            <span className="text-xs text-gray-400 line-through">
              ₱
              {origPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </div>

        {/* Stock Progress Indicator */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-gray-400">Stock Status</span>
            <span
              className={cn(
                product.prod_stock === 0 && "text-red-500 font-bold",
                product.prod_stock > 0 && product.prod_stock <= 5 && "text-amber-500 font-bold",
                product.prod_stock > 5 && "text-emerald-600"
              )}
            >
              {product.prod_stock === 0
                ? "Out of Stock"
                : `${product.prod_stock} remaining`}
            </span>
          </div>

          {/* Progress Bar (out of 50 capacity max) */}
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-0.5">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                product.prod_stock === 0 && "w-0",
                product.prod_stock > 0 && product.prod_stock <= 5 && "bg-amber-400",
                product.prod_stock > 5 && "bg-emerald-500"
              )}
              style={{
                width: `${Math.min((product.prod_stock / 50) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </CardContent>

      {/* Card Actions Footer */}
      <CardFooter className="py-3.5 px-6   bg-primary/20 flex justify-between gap-2">
        <span className="text-[10px] text-foreground flex items-center gap-1">
          Updated: {new Date(product.updated_at).toLocaleDateString()}
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => onEdit(product)}
            className="size-7 rounded-lg border-gray-200 hover:border-[#d44876] hover:text-[#d44876] hover:bg-pink-50/30 transition-all cursor-pointer"
            title="Edit Product"
          >
            <Edit2 className="size-3" />
          </Button>
          <Button
            variant="destructive"
            size="icon-xs"
            onClick={() => onDelete(product)}
            className="size-7 rounded-lg hover:scale-105 transition-all cursor-pointer"
            title="Delete Product"
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
