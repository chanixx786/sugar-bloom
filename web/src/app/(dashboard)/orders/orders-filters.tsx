"use client";

import React from "react";
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

interface OrdersFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  paymentStatusFilter: string;
  setPaymentStatusFilter: (status: string) => void;
}

const TYPES = ["All", "Walkin", "Online"];

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Completed",    value: "Completed" },
  { label: "Pending",      value: "Pending" },
  { label: "Out on Delivery", value: "Out on Delivery" },
  { label: "Cancelled",    value: "Cancelled" },
];

const PAYMENT_OPTIONS = [
  { label: "All Payments", value: "all" },
  { label: "Paid",         value: "Paid" },
  { label: "Unpaid",       value: "Unpaid" },
];

export function OrdersFilters({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  paymentStatusFilter,
  setPaymentStatusFilter,
}: OrdersFiltersProps) {
  const isFiltering =
    searchQuery || typeFilter !== "All" || statusFilter !== "all" || paymentStatusFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setTypeFilter("All");
    setStatusFilter("all");
    setPaymentStatusFilter("all");
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search Box */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search Order ID, Customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-white/50 focus-visible:bg-white text-gray-700"
          />
        </div>

        {/* Filters Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Order Type Tabs */}
          <div className="flex items-center bg-gray-100/80 p-1 rounded-xl overflow-x-auto max-w-full">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
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

          {/* Payment Select */}
          <Select value={paymentStatusFilter} onValueChange={(val) => setPaymentStatusFilter(val ?? "all")}>
            <SelectTrigger className="h-9 w-36 bg-white/50 border-gray-200/60 rounded-xl text-xs font-semibold text-[oklch(0.3828_0.106_350.28)]">
              <span className="text-gray-400 font-normal mr-1">Payment:</span>
              <SelectValue placeholder="All Payments" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {PAYMENT_OPTIONS.map((opt) => (
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
