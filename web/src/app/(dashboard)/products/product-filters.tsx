"use client";

import { Input } from "@/components/ui/input";
import { Search, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export function ProductFilters({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter
}: ProductFiltersProps) {
  const isFiltering = searchQuery || categoryFilter !== "All" || statusFilter !== "All";

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  return (
    <div>
      <div className=" flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search Box */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search product, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-white/50 focus-visible:bg-white text-gray-700"
          />
        </div>

        {/* Filters Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Category Tabs */}
          <div className="flex items-center bg-gray-100/80 p-1 rounded-2xl">
            {["All", "Cakes", "Cupcakes", "Pastries"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer",
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
          <div className="flex items-center gap-1 bg-white/50 border border-gray-200/60 rounded-xl px-2.5 py-1.5 text-xs font-semibold">
            <span className="text-gray-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none outline-none font-bold text-[oklch(0.3828_0.106_350.28)] cursor-pointer pr-1"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
              <option value="Discarded">Discarded</option>
            </select>
          </div>

          {/* Reset Filters */}
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
