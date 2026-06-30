"use client";

import {
  PhilippinePeso,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";
import { fmtMoney } from "./sales-utils";

interface SalesStatsProps {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  walkinCount: number;
  onlineCount: number;
}

export function SalesStats({
  totalRevenue,
  totalOrders,
  avgOrderValue,
  walkinCount,
  onlineCount,
}: SalesStatsProps) {
  return (
    <StatsGrid
      stats={[
        {
          label: "Total Revenue",
          value: `₱${fmtMoney(totalRevenue)}`,
          icon: PhilippinePeso,
        },
        {
          label: "Paid Orders",
          value: totalOrders,
          icon: ShoppingBag,
        },
        {
          label: "Avg Order Value",
          value: `₱${fmtMoney(avgOrderValue)}`,
          icon: TrendingUp,
        },
        {
          label: "Walk-in / Online",
          value: `${walkinCount} / ${onlineCount}`,
          icon: Users,
        },
      ]}
    />
  );
}
