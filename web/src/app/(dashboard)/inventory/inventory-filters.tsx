"use client";

import { Input } from "@/components/ui/input";
import { Search, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const CATEGORIES = ["All", "Baking", "Dairy", "Fruits", "Flowers", "Packaging", "Other"];

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "In Stock",     value: "In stock" },
  { label: "Low Stock",    value: "Low stock" },
  { label: "Out of Stock", value: "Out of stock" },
];

export function InventoryFilters({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}: InventoryFiltersProps) {
  const isFiltering = searchQuery || categoryFilter !== "All" || statusFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setStatusFilter("all");
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search Box */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search items, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-white/50 focus-visible:bg-white text-gray-700"
          />
        </div>

        {/* Filters Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Category Tabs */}
          <div className="flex items-center bg-gray-100/80 p-1 rounded-2xl overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap",
                  categoryFilter === cat
                    ? "bg-white text-[oklch(0.3828_0.106_350.28)] shadow-sm font-bold"
                    : "text-[oklch(0.55_0.08_350)] hover:text-[oklch(0.3828_0.106_350.28)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Select */}
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val ?? "all")}>
            <SelectTrigger className="h-9 w-36 bg-white/50 border-gray-200/60 rounded-xl text-xs font-semibold text-[oklch(0.3828_0.106_350.28)]">
              <span className="text-gray-400 font-normal mr-1">Status:</span>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="rounded-lg text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {isFiltering && (
            <button
              onClick={handleClearFilters}
              type="button"
              className="text-xs text-[#d44876] hover:underline font-semibold flex items-center gap-1 cursor-pointer pl-1"
            >
              <RefreshCw className="size-3" /> Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}