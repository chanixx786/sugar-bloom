"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Product } from "../products/mock-data";
import { CATEGORIES } from "./constants";
import { POSProductCard } from "./pos-product-card";

interface ProductCatalogProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductCatalog({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  products,
  onAddToCart,
}: ProductCatalogProps) {
  return (
    <div className="flex flex-col gap-8 flex-1 min-w-0 overflow-hidden">
      <div className="flex flex-wrap gap-2 shrink-0">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search products…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-white border-border"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="inline-flex items-center gap-1 bg-[#f4f3f6] p-1 rounded-2xl shrink-0 select-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer",
                categoryFilter === cat
                  ? "bg-white text-[oklch(0.3828_0.106_350.28)] shadow-sm"
                  : "text-[oklch(0.42_0.08_350)] hover:text-[oklch(0.32_0.13_350)] bg-transparent border-none"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
            <div className="p-4 bg-pink-50 rounded-full text-[#d44876]">
              <Search className="size-8" />
            </div>
            <p className="text-sm font-semibold text-foreground">No products found</p>
            <p className="text-xs text-muted-foreground">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-2">
            {products.map((product) => (
              <POSProductCard
                key={product.prod_id}
                product={product}
                onAdd={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
