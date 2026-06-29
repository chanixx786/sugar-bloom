"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExtendedOrder } from "./mock-data";
import { cn } from "@/lib/utils";

export function getOrderColumns(
  onView: (order: ExtendedOrder) => void
): ColumnDef<ExtendedOrder>[] {
  return [
    {
      accessorKey: "order_id",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-semibold text-foreground">
          #{row.getValue("order_id")}
        </span>
      ),
    },
    {
      accessorKey: "customer_name",
      header: "Customer",
      cell: ({ row }) => {
        const name = row.original.customer_name || "Walk-in Customer";
        const phone = row.original.customer_phone;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{name}</span>
            {phone && <span className="text-[10px] text-muted-foreground">{phone}</span>}
          </div>
        );
      },
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
      header: "Payment Mode",
      cell: ({ row }) => (
        <span className="text-foreground font-medium">
          {row.getValue("order_payment_mode")}
        </span>
      ),
    },
    {
      accessorKey: "order_payment_status",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.getValue("order_payment_status") as string;
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold",
              status === "Paid"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            )}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "order_total",
      header: "Total",
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("order_total"));
        return (
          <span className="font-bold text-[oklch(0.3828_0.106_350.28)]">
            ₱{total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        );
      },
    },
    {
      accessorKey: "order_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("order_status") as string;
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold",
              status === "Completed" && "bg-emerald-100 text-emerald-800",
              status === "Pending" && "bg-amber-100 text-amber-800",
              status === "Out on Delivery" && "bg-indigo-100 text-indigo-800",
              status === "Cancelled" && "bg-gray-100 text-gray-800"
            )}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        const val = row.getValue("created_at") as string;
        const date = new Date(val);
        return (
          <span className="text-muted-foreground text-xs">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <div className="flex justify-end pr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(row.original)}
            className="size-8 rounded-lg hover:bg-secondary/50 cursor-pointer"
          >
            <Eye className="size-4 text-muted-foreground" />
            <span className="sr-only">View</span>
          </Button>
        </div>
      ),
    },
  ];
}
