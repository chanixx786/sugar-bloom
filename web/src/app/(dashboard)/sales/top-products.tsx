"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { fmtMoney, TopProduct } from "./sales-utils";

interface TopProductsProps {
  products: TopProduct[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="rounded-[2rem] border-none shadow-md bg-white py-0 gap-0 h-full">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className=" flex items-center gap-2">
          <Trophy className="size-4 text-[#d44876]" />
          Top Products
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 flex flex-col gap-3">
        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No product sales yet.</p>
        ) : (
          products.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-gray-50/40 hover:bg-pink-50/30 transition-colors"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d44876] to-[#f6bc9c] text-white text-xs font-bold">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-base text-foreground truncate">{product.name}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {product.category} · {product.unitsSold} sold
                </p>
              </div>
              <span className="text-sm font-extrabold text-[#d44876] shrink-0">
                ₱{fmtMoney(product.revenue)}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
