"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Single Stat Card

export interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, className }: StatCardProps) {
  return (
    <Card
      className={cn(
        "bg-gradient-to-r from-[#d4487727] to-[#f6bc9c34] backdrop-blur-sm shadow-lg hover:shadow-md transition-shadow",
        className
      )}
    >
      <CardContent className="pt-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-[oklch(0.55_0.08_350)]">
            {label}
          </span>
          <span className="text-3xl font-bold text-foreground">{value}</span>
        </div>
        <div className="p-3 bg-secondary rounded-2xl text-primary">
          <Icon className="size-6" />
        </div>
      </CardContent>
    </Card>
  );
}

// Stats Grid

export interface StatsGridProps {
  stats: StatCardProps[];
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}