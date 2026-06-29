"use client";

import { Package, AlertTriangle, XCircle, LayoutGrid } from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";

interface InventoryStatsProps {
  total: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

export function InventoryStats({ total, inStock, lowStock, outOfStock }: InventoryStatsProps) {
  return (
    <StatsGrid
      stats={[
        { label: "Total Items", value: total, icon: LayoutGrid, },
        { label: "In Stock", value: inStock, icon: Package, },
        { label: "Low Stock", value: lowStock, icon: AlertTriangle, },
        { label: "Out of Stock", value: outOfStock, icon: XCircle, },
      ]}
    />
  );
}