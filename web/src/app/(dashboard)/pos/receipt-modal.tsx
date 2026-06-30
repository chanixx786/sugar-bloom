"use client";

import { CheckCircle2, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Order } from "./mock-data";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface ReceiptModalProps {
  order: Order | null;
  change: number;
  onClose: () => void;
}

export function ReceiptModal({ order, change, onClose }: ReceiptModalProps) {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-sm p-0 rounded-[2rem] bg-white border border-gray-100 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-[#d44876] to-[#f6bc9c] px-8 py-6 text-white text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white/20 rounded-full p-3">
              <CheckCircle2 className="size-7" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">Order Placed!</DialogTitle>
            <DialogDescription className="text-white/80 text-xs mt-1">
              #{order.order_id} · {order.order_type} · {order.order_payment_mode}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-4 flex flex-col gap-2 max-h-60 overflow-y-auto">
          {order.items.map((item) => (
            <div key={item.product.prod_id} className="flex justify-between text-xs">
              <span className="text-foreground truncate flex-1 pr-2">
                {item.product.prodlist.prodlist_name}
                <span className="text-muted-foreground"> ×{item.qty}</span>
              </span>
              <span className="font-semibold text-[oklch(0.3828_0.106_350.28)] shrink-0">
                ₱{fmt(item.unit_price * item.qty)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border mx-6" />
        <div className="px-6 py-3 flex flex-col gap-1.5">
          {order.customer_name && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Customer</span>
              <span className="font-semibold text-foreground">{order.customer_name}</span>
            </div>
          )}
          {order.cus_id && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Customer ID</span>
              <span className="font-semibold text-[#d44876]">#{order.cus_id}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-extrabold text-[oklch(0.3828_0.106_350.28)]">
            <span>Total</span>
            <span className="text-[#d44876]">₱{fmt(order.order_total)}</span>
          </div>
          {order.order_payment_mode === "Cash" && change > 0 && (
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Change</span>
              <span className="text-emerald-600">₱{fmt(change)}</span>
            </div>
          )}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Status</span>
            <span
              className={cn(
                "font-semibold",
                order.order_status === "Completed" ? "text-emerald-600" : "text-amber-600"
              )}
            >
              {order.order_status}
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-2">
          <Button
            variant="outline"
            className="flex-1 rounded-2xl gap-2 border-border text-muted-foreground cursor-pointer"
            onClick={onClose}
          >
            <Printer className="size-4" />
            Print
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 rounded-2xl bg-[#d44876] hover:bg-[#c23b65] text-white cursor-pointer shadow-[0_4px_14px_-4px_rgba(212,72,118,0.4)]"
          >
            New Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
