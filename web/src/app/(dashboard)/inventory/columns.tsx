"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InventoryItem,
  CATEGORY_COLORS,
  STATUS_STYLES,
} from "./mock-data";


export function getInventoryColumns(
  onEdit: (item: InventoryItem) => void,
  onDelete: (item: InventoryItem) => void
): ColumnDef<InventoryItem>[] {
  return [
    {
      accessorKey: "item",
      header: "Item",
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {row.getValue("item")}
        </span>
      ),
    },

    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const cat: string = row.getValue("category");
        const colorClass =
          CATEGORY_COLORS[cat] ?? CATEGORY_COLORS["Other"];
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}
          >
            {cat}
          </span>
        );
      },
    },

    {
      id: "qty",
      header: "Qty",
      cell: ({ row }) => {
        const { qty, qty_unit } = row.original;
        return (
          <span className="text-foreground">
            {qty} {qty_unit}
          </span>
        );
      },
    },

    {
      id: "threshold",
      header: "Threshold",
      cell: ({ row }) => {
        const { threshold, threshold_unit } = row.original;
        return (
          <span className="text-foreground">
            {threshold} {threshold_unit}
          </span>
        );
      },
    },

    {
      accessorKey: "expiry_date",
      header: "Expiry Date",
      cell: ({ row }) => {
        const expiryDateStr = row.original.expiry_date;

        if (!expiryDateStr) {
          return <span className="text-muted-foreground/40 text-xs">—</span>;
        }

        // Parse as local date (avoids UTC-offset-shift bugs)
        const [y, m, d] = expiryDateStr.split("-").map(Number);
        const expiryDate = new Date(y, m - 1, d);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffDays = Math.ceil(
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        const formatted = expiryDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        // Determine badge style and label
        let dateColor = "text-foreground";
        let badgeClass = "";
        let badgeLabel = "";

        if (diffDays < 0) {
          dateColor = "text-red-600 font-semibold dark:text-red-400";
          badgeClass =
            "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400";
          badgeLabel = "Expired";
        } else if (diffDays <= 7) {
          dateColor = "text-amber-600 font-semibold dark:text-amber-400";
          badgeClass =
            "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400";
          badgeLabel = "Near Expiry";
        } else if (diffDays <= 30) {
          dateColor = "text-orange-500 font-medium dark:text-orange-400";
          badgeClass =
            "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400";
          badgeLabel = "Expiring Soon";
        }

        return (
          <div className="flex flex-col gap-0.5">
            <span className={`text-sm ${dateColor}`}>{formatted}</span>
            {badgeLabel && (
              <span
                className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${badgeClass}`}
              >
                {badgeLabel}
              </span>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue<string>("status") as keyof typeof STATUS_STYLES;
        const styleClass = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500";
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styleClass}`}
          >
            {status}
          </span>
        );
      },
    },

    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground hover:bg-muted/60 cursor-pointer"
            onClick={() => onEdit(row.original)}
            aria-label="Edit inventory item"
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10 cursor-pointer"
            onClick={() => onDelete(row.original)}
            aria-label="Delete inventory item"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ),
    },
  ];
}
