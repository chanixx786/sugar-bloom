"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExtendedOrder } from "./mock-data";
import { OrderStatus } from "../pos/mock-data";
import { ShoppingBag, CreditCard, User, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface OrderModalProps {
  order: ExtendedOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: number, status: OrderStatus, paymentStatus: "Paid" | "Unpaid") => void;
}

export function OrderModal({ order, isOpen, onClose, onUpdateStatus }: OrderModalProps) {
  const [status, setStatus] = useState<OrderStatus>("Pending");
  const [paymentStatus, setPaymentStatus] = useState<"Paid" | "Unpaid">("Unpaid");

  useEffect(() => {
    if (order) {
      setStatus(order.order_status);
      setPaymentStatus(order.order_payment_status);
    }
  }, [order]);

  if (!order) return null;

  const handleSave = () => {
    onUpdateStatus(order.order_id, status, paymentStatus);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-2xl !p-0 !gap-0 rounded-[2rem] bg-white border border-gray-100 shadow-2xl overflow-hidden"
      >
        {/* Header banner */}
        <div className="relative bg-gradient-to-br from-[#d44876] to-[#f6bc9c] px-8 py-6 text-white rounded-t-[2rem]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/20 hover:text-white cursor-pointer"
          >
            <X className="size-4" />
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 pr-10">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
                {order.order_type === "Walkin" ? "Walk-in Order" : "Online Order"}
              </span>
              <DialogTitle className="text-white text-2xl font-bold mt-2 break-all">
                Order #{order.order_id}
              </DialogTitle>
              <DialogDescription className="text-white/85 text-xs mt-1">
                Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </DialogDescription>
            </div>

            <div className="shrink-0 sm:text-right">
              <span className="text-xs text-white/80 block">Total Amount</span>
              <span className="text-3xl font-extrabold leading-tight">
                ₱{order.order_total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 max-h-[60vh] overflow-y-auto flex flex-col gap-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col gap-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <User className="size-3.5" /> Customer Info
              </span>
              <div>
                <p className="font-bold text-sm text-[oklch(0.3828_0.106_350.28)]">
                  {order.customer_name || "Walk-in Customer"}
                </p>
                {order.customer_phone && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Phone className="size-3" /> {order.customer_phone}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col gap-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <CreditCard className="size-3.5" /> Payment Details
              </span>
              <div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Mode:</span>
                  <span className="font-semibold text-foreground">{order.order_payment_mode}</span>
                </div>
                <div className="flex justify-between items-center text-xs mt-1.5">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={cn(
                      "font-bold px-2 py-0.5 rounded-md text-[10px]",
                      order.order_payment_status === "Paid"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    )}
                  >
                    {order.order_payment_status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <ShoppingBag className="size-3.5" /> Ordered Items ({order.items.length})
            </h4>
            <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100 bg-white">
              {order.items.map((item, idx) => {
                const prodName = item.product.prodlist.prodlist_name;
                const category = item.product.prodlist.cat.cat_name;
                const imageSrc = item.product.images?.[0] || "";
                return (
                  <div key={idx} className="p-4 flex items-center gap-4 hover:bg-gray-50/45 transition-colors">
                    {imageSrc && (
                      <div className="relative size-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                        <Image
                          src={imageSrc}
                          alt={prodName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">{prodName}</p>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
                        {category}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {item.qty} × ₱{item.unit_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="font-bold text-sm text-[oklch(0.3828_0.106_350.28)] mt-0.5">
                        ₱{(item.qty * item.unit_price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Settings controls */}
          <div className="p-5 bg-pink-50/10 rounded-2xl border border-[oklch(0.3828_0.106_350.28)]/5 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-[oklch(0.3828_0.106_350.28)] uppercase tracking-wider">
              Manage Order Status
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Order Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500">Order Status</label>
                <div className="flex flex-wrap gap-1.5">
                  {(["Pending", "Out on Delivery", "Completed", "Cancelled"] as OrderStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(s)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer",
                        status === s
                          ? "bg-[#d44876] border-[#d44876] text-white shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-[#d44876]/40 hover:text-[#d44876]"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500">Payment Status</label>
                <div className="flex gap-1.5">
                  {(["Paid", "Unpaid"] as const).map((ps) => (
                    <button
                      key={ps}
                      type="button"
                      onClick={() => setPaymentStatus(ps)}
                      className={cn(
                        "flex-1 px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center",
                        paymentStatus === ps
                          ? ps === "Paid"
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                            : "bg-rose-600 border-rose-600 text-white shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      )}
                    >
                      {ps}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3 rounded-b-[2rem]">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl px-5 h-10 border-gray-200 text-gray-600 font-semibold cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-xl px-6 h-10 bg-gradient-to-r from-[#d44876] to-[#f6bc9c] hover:opacity-95 text-white font-semibold cursor-pointer shadow-[0_4px_14px_-4px_rgba(212,72,118,0.4)]"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
