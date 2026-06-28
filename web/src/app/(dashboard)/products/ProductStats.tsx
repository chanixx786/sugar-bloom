"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, CheckCircle, PackageOpen, AlertTriangle } from "lucide-react";

interface ProductStatsProps {
  total: number;
  active: number;
  totalStock: number;
  lowStock: number;
}

export function ProductStats({ total, active, totalStock, lowStock }: ProductStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Products */}
      <Card className="  bg-gradient-to-r from-[#d4487727] to-[#f6bc9c34]  backdrop-blur-sm shadow-lg hover:shadow-md transition-shadow">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-[oklch(0.55_0.08_350)]">
              Total Products
            </span>
            <span className="text-3xl font-bold text-[oklch(0.3828_0.106_350.28)]">{total}</span>
          </div>
          <div className="p-3 bg-primary/70 rounded-2xl text-white">
            <Layers className="size-6" />
          </div>
        </CardContent>
      </Card>

      {/* Active Offerings */}
      <Card className="  bg-gradient-to-r from-[#d4487727] to-[#f6bc9c34]  backdrop-blur-sm shadow-lg hover:shadow-md transition-shadow">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-[oklch(0.55_0.08_350)]">
              Active Offerings
            </span>
            <span className="text-3xl font-bold text-foreground">{active}</span>
          </div>
          <div className="p-3 bg-primary/70 rounded-2xl text-white">
            <CheckCircle className="size-6" />
          </div>
        </CardContent>
      </Card>

      {/* Total Stock */}
      <Card className="  bg-gradient-to-r from-[#d4487727] to-[#f6bc9c34]  backdrop-blur-sm shadow-lg hover:shadow-md transition-shadow">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-[oklch(0.55_0.08_350)]">
              Total Stock
            </span>
            <span className="text-3xl font-bold text-foreground">{totalStock}</span>
          </div>
          <div className="p-3 bg-primary/70 rounded-2xl text-white">
            <PackageOpen className="size-6" />
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      <Card className="  bg-gradient-to-r from-[#d4487727] to-[#f6bc9c34]  backdrop-blur-sm shadow-lg hover:shadow-md transition-shadow">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-[oklch(0.55_0.08_350)]">
              Low Stock Alert
            </span>
            <span className="text-3xl font-bold text-foreground">{lowStock}</span>
          </div>
          <div className="p-3 bg-primary/70 rounded-2xl text-white">
            <AlertTriangle className="size-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
