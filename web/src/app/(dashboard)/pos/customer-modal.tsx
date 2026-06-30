"use client";

import { useEffect, useState } from "react";
import { Hash, Search, User, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { findCustomerById } from "./customers-mock-data";
import { OrderType } from "./mock-data";

export interface OrderCustomer {
  cus_id?: number;
  customer_name: string;
  customer_phone?: string;
}

interface CustomerModalProps {
  open: boolean;
  orderType: OrderType;
  onClose: () => void;
  onConfirm: (customer: OrderCustomer) => void;
}

type Step = "choose" | "search-id" | "enter-name";

export function CustomerModal({ open, orderType, onClose, onConfirm }: CustomerModalProps) {
  const [step, setStep] = useState<Step>("choose");
  const [customerIdQuery, setCustomerIdQuery] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [foundName, setFoundName] = useState<string | null>(null);
  const [foundPhone, setFoundPhone] = useState<string | undefined>();

  useEffect(() => {
    if (open) {
      setStep("choose");
      setCustomerIdQuery("");
      setCustomerName("");
      setFoundName(null);
      setFoundPhone(undefined);
    }
  }, [open]);

  const handleSearchId = () => {
    const customer = findCustomerById(customerIdQuery);
    if (!customer) {
      setFoundName(null);
      setFoundPhone(undefined);
      toast.error("No customer found with that ID.");
      return;
    }
    setFoundName(customer.cus_name);
    setFoundPhone(customer.cus_phone);
  };

  const handleConfirmExisting = () => {
    const customer = findCustomerById(customerIdQuery);
    if (!customer) {
      toast.error("Please search and select a valid customer ID.");
      return;
    }
    onConfirm({
      cus_id: customer.cus_id,
      customer_name: customer.cus_name,
      customer_phone: customer.cus_phone,
    });
  };

  const handleConfirmGuest = () => {
    const name = customerName.trim();
    if (!name) {
      toast.error("Please enter a customer name.");
      return;
    }
    onConfirm({ customer_name: name });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden p-0 gap-0"
      >
        <div className="bg-gradient-to-br from-[#d44876] to-[#f6bc9c] px-6 py-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">
              Customer for {orderType} Order
            </DialogTitle>
            <DialogDescription className="text-white/85 text-xs mt-1">
              Does this customer have an existing customer ID?
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {step === "choose" && (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStep("search-id")}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-[#d44876]/40 hover:bg-pink-50/50 transition-all cursor-pointer"
              >
                <div className="size-10 rounded-full bg-[#d44876]/10 flex items-center justify-center text-[#d44876]">
                  <Hash className="size-5" />
                </div>
                <span className="text-sm font-bold text-foreground">Yes, has ID</span>
                <span className="text-[10px] text-muted-foreground text-center">
                  Search by customer ID
                </span>
              </button>
              <button
                type="button"
                onClick={() => setStep("enter-name")}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-[#d44876]/40 hover:bg-pink-50/50 transition-all cursor-pointer"
              >
                <div className="size-10 rounded-full bg-[#d44876]/10 flex items-center justify-center text-[#d44876]">
                  <UserPlus className="size-5" />
                </div>
                <span className="text-sm font-bold text-foreground">No ID</span>
                <span className="text-[10px] text-muted-foreground text-center">
                  Enter customer name
                </span>
              </button>
            </div>
          )}

          {step === "search-id" && (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="text-xs text-muted-foreground hover:text-[#d44876] self-start cursor-pointer"
              >
                ← Back
              </button>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Customer ID
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="e.g. 1001"
                  value={customerIdQuery}
                  onChange={(e) => {
                    setCustomerIdQuery(e.target.value);
                    setFoundName(null);
                    setFoundPhone(undefined);
                  }}
                  className="rounded-xl h-10"
                />
                <Button
                  type="button"
                  onClick={handleSearchId}
                  className="rounded-xl bg-[#d44876] hover:bg-[#c23b65] text-white shrink-0 cursor-pointer"
                >
                  <Search className="size-4" />
                </Button>
              </div>
              {foundName && (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                  <p className="text-xs font-bold text-emerald-800">{foundName}</p>
                  {foundPhone && (
                    <p className="text-[10px] text-emerald-700 mt-0.5">{foundPhone}</p>
                  )}
                </div>
              )}
              <Button
                type="button"
                onClick={handleConfirmExisting}
                disabled={!foundName}
                className="rounded-xl bg-[#d44876] hover:bg-[#c23b65] text-white cursor-pointer disabled:opacity-50"
              >
                Confirm Customer
              </Button>
            </div>
          )}

          {step === "enter-name" && (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="text-xs text-muted-foreground hover:text-[#d44876] self-start cursor-pointer"
              >
                ← Back
              </button>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Customer Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="pl-9 rounded-xl h-10"
                />
              </div>
              <Button
                type="button"
                onClick={handleConfirmGuest}
                className="rounded-xl bg-[#d44876] hover:bg-[#c23b65] text-white cursor-pointer"
              >
                Confirm Customer
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
