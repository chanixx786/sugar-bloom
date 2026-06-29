"use client";

import React from "react";
import { Layers, CheckCircle, PackageOpen, AlertTriangle } from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";

interface ProductStatsProps {
  total: number;
  active: number;
  totalStock: number;
  lowStock: number;
}

export function ProductStats({ total, active, totalStock, lowStock }: ProductStatsProps) {
  return (
    <StatsGrid
      stats={[
        { label: "Total Products",   value: total,      icon: Layers        },
        { label: "Active Offerings", value: active,     icon: CheckCircle   },
        { label: "Total Stock",      value: totalStock, icon: PackageOpen   },
        { label: "Low Stock Alert",  value: lowStock,   icon: AlertTriangle },
      ]}
    />
  );
}