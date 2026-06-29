"use client";

import { ShoppingBag, Clock, CheckCircle2, XCircle } from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";

interface OrdersStatsProps {
  total: number;
  completed: number;
  pending: number;
  cancelled: number;
}

export function OrdersStats({ total, completed, pending, cancelled }: OrdersStatsProps) {
  return (
    <StatsGrid
      stats={[
        { label: "Total Orders", value: total, icon: ShoppingBag },
        { label: "Completed", value: completed, icon: CheckCircle2 },
        { label: "Pending / Delivery", value: pending, icon: Clock },
        { label: "Cancelled", value: cancelled, icon: XCircle },
      ]}
    />
  );
}
