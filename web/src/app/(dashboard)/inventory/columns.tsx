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
