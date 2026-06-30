"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExtendedOrder } from "../orders/mock-data";
import { cn } from "@/lib/utils";
import { fmtMoney } from "./sales-utils";

export function getSalesColumns(): ColumnDef<ExtendedOrder>[] {
  return [
    {
      accessorKey: "order_id",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-semibold text-foreground">#{row.getValue("order_id")}</span>
      ),
    },
    {
      accessorKey: "customer_name",
      header: "Customer",
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {row.original.customer_name || "Walk-in Customer"}
        </span>
      ),
    },
    {
      accessorKey: "order_type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("order_type") as string;
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              type === "Walkin"
                ? "bg-slate-100 text-slate-700"
                : "bg-blue-50 text-blue-700"
            )}
          >
            {type === "Walkin" ? "Walk-in" : "Online"}
          </span>
        );
      },
    },
    {
      accessorKey: "order_payment_mode",
      header: "Payment",
      cell: ({ row }) => (
        <span className="text-foreground font-medium">{row.getValue("order_payment_mode")}</span>
      ),
    },
    {
      accessorKey: "order_total",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-bold text-[#d44876]">
          ₱{fmtMoney(row.getValue("order_total") as number)}
        </span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.getValue("created_at") as string).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
  ];
}
