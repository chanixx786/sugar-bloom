"use client";

import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { SalesPeriod, SalesTypeFilter } from "./sales-utils";

interface SalesFiltersProps {
  period: SalesPeriod;
  onPeriodChange: (period: SalesPeriod) => void;
  typeFilter: SalesTypeFilter;
  onTypeFilterChange: (type: SalesTypeFilter) => void;
}

const PERIODS: { label: string; value: SalesPeriod }[] = [
  { label: "Last 7 Days", value: "7d" },
  { label: "This Month",  value: "month" },
  { label: "All Time",    value: "all" },
];

const TYPES: SalesTypeFilter[] = ["All", "Walkin", "Online"];

export function SalesFilters({
  period,
  onPeriodChange,
  typeFilter,
  onTypeFilterChange,
}: SalesFiltersProps) {
  const isFiltering = period !== "month" || typeFilter !== "All";

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex items-center bg-gray-100/80 p-1 rounded-xl overflow-x-auto max-w-full">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => onPeriodChange(p.value)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap",
              period === p.value
                ? "bg-white text-[oklch(0.3828_0.106_350.28)] shadow-sm font-bold"
                : "text-[oklch(0.55_0.08_350)] hover:text-[oklch(0.3828_0.106_350.28)]"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center bg-gray-100/80 p-1 rounded-xl">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTypeFilterChange(t)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap",
                typeFilter === t
                  ? "bg-white text-[oklch(0.3828_0.106_350.28)] shadow-sm font-bold"
                  : "text-[oklch(0.55_0.08_350)] hover:text-[oklch(0.3828_0.106_350.28)]"
              )}
            >
              {t === "All" ? "All Types" : t === "Walkin" ? "Walk-in" : "Online"}
            </button>
          ))}
        </div>

        {isFiltering && (
          <button
            type="button"
            onClick={() => {
              onPeriodChange("month");
              onTypeFilterChange("All");
            }}
            className="text-xs text-[#d44876] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="size-3" /> Reset
          </button>
        )}
      </div>
    </div>
  );
}