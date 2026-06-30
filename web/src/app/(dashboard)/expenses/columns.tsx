"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Expense, VENDOR_COLORS } from "./mock-data";
import { CATEGORY_COLORS } from "../inventory/mock-data";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function getExpenseColumns(
  onEdit: (expense: Expense) => void,
  onDelete: (expense: Expense) => void
): ColumnDef<Expense>[] {
  return [
    {
      accessorKey: "exp_id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-semibold text-foreground">#{row.getValue("exp_id")}</span>
      ),
    },
    {
      accessorKey: "inv_name",
      header: "Inventory Item",
      cell: ({ row }) => {
        const { inv_name, inv_category } = row.original;
        const colorClass = CATEGORY_COLORS[inv_category] ?? CATEGORY_COLORS["Other"];
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-foreground">{inv_name}</span>
            <span
              className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${colorClass}`}
            >
              {inv_category}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "exp_vendor",
      header: "Vendor",
      cell: ({ row }) => {
        const vendor = row.getValue<string>("exp_vendor");
        const colorClass = VENDOR_COLORS[vendor] ?? VENDOR_COLORS["Other"];
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}
          >
            {vendor}
          </span>
        );
      },
    },
    {
      accessorKey: "exp_amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-bold text-[#d44876]">₱{fmtMoney(row.getValue("exp_amount"))}</span>
      ),
    },
    {
      accessorKey: "exp_date_purchased",
      header: "Date Purchased",
      cell: ({ row }) => {
        const dateStr = row.getValue<string>("exp_date_purchased");
        const [y, m, d] = dateStr.split("-").map(Number);
        const formatted = new Date(y, m - 1, d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return <span className="text-foreground">{formatted}</span>;
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
            aria-label="Edit expense"
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10 cursor-pointer"
            onClick={() => onDelete(row.original)}
            aria-label="Delete expense"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ),
    },
  ];
}
