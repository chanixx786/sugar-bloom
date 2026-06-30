"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form/form-field";
import { FormSelect } from "@/components/ui/form/form-select";
import { Button } from "@/components/ui/button";
import { ExternalLink, Save } from "lucide-react";
import { Expense } from "./mock-data";
import { INITIAL_INVENTORY } from "../inventory/mock-data";
import { expenseFormSchema, ExpenseFormInput } from "@/schemas/expense_schema";

interface ExpenseModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
}

const INVENTORY_OPTIONS = INITIAL_INVENTORY.map((item) => ({
  label: `${item.item} (${item.category})`,
  value: String(item.id),
}));

export default function ExpenseModal({ expense, isOpen, onClose, onSave }: ExpenseModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ExpenseFormInput>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      inv_id: 0,
      exp_amount: 0,
      exp_date_purchased: "",
      exp_vendor: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (expense) {
        reset({
          inv_id: expense.inv_id,
          exp_amount: expense.exp_amount,
          exp_date_purchased: expense.exp_date_purchased,
          exp_vendor: expense.exp_vendor,
        });
      } else {
        reset({
          inv_id: 0,
          exp_amount: 0,
          exp_date_purchased: new Date().toISOString().slice(0, 10),
          exp_vendor: "",
        });
      }
    }
  }, [expense, isOpen, reset]);

  const onSubmit = (data: ExpenseFormInput) => {
    const inventoryItem = INITIAL_INVENTORY.find((i) => i.id === data.inv_id);
    if (!inventoryItem) return;

    const savedExpense: Expense = {
      exp_id: expense?.exp_id ?? Date.now(),
      inv_id: data.inv_id,
      inv_name: inventoryItem.item,
      inv_category: inventoryItem.category,
      exp_amount: data.exp_amount,
      exp_date_purchased: data.exp_date_purchased,
      exp_vendor: data.exp_vendor,
    };
    onSave(savedExpense);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-xl p-0 rounded-[2rem] bg-white border border-gray-100 max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-8 pb-0">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle>
              {expense ? `Edit Expense #${expense.exp_id}` : "Record Expense"}
            </DialogTitle>
            <DialogDescription>
              {expense
                ? "Update the purchase details for this expense."
                : "Log a new inventory purchase expense."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 pb-6 space-y-5">
            <Controller
              name="inv_id"
              control={control}
              render={({ field }) => (
                <FormSelect
                  id="inv_id"
                  label="Inventory Item"
                  error={errors.inv_id}
                  required
                  options={INVENTORY_OPTIONS}
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                  disabled={field.disabled}
                  name={field.name}
                  ref={field.ref}
                  placeholder="Select inventory item"
                />
              )}
            />

            <FormField
              id="exp_vendor"
              label="Vendor"
              placeholder="e.g. Metro Gaisano Supermart"
              error={errors.exp_vendor}
              required
              {...register("exp_vendor")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                id="exp_amount"
                label="Amount (₱)"
                type="number"
                step="0.01"
                min="0"
                placeholder="ex. 1500.00"
                error={errors.exp_amount}
                required
                {...register("exp_amount", { valueAsNumber: true })}
              />

              <FormField
                id="exp_date_purchased"
                label="Date Purchased"
                type="date"
                error={errors.exp_date_purchased}
                required
                {...register("exp_date_purchased")}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 p-8 pt-4 border-t border-gray-100 bg-gray-50/50">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-2xl px-5 py-2.5 cursor-pointer font-semibold"
            >
              <ExternalLink className="size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-2 bg-[#d44876] hover:bg-[#c23b65] text-white border-none shadow-[0_6px_20px_-4px_rgba(212,72,118,0.25)] hover:shadow-[0_8px_24px_-4px_rgba(212,72,118,0.35)] rounded-2xl px-6 h-10 cursor-pointer font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save className="size-4" />
              Save Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
