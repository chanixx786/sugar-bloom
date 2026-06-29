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
import { InventoryItem } from "./mock-data";
import { inventoryFormSchema, InventoryFormInput } from "@/schemas/inventory_schema";

interface InventoryModalProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
}

const CATEGORY_OPTIONS = [
  { label: "Baking", value: "Baking" },
  { label: "Dairy", value: "Dairy" },
  { label: "Fruits", value: "Fruits" },
  { label: "Flowers", value: "Flowers" },
  { label: "Packaging", value: "Packaging" },
  { label: "Other", value: "Other" },
];

const STATUS_OPTIONS = [
  { label: "In Stock", value: "In stock" },
  { label: "Low Stock", value: "Low stock" },
  { label: "Out of Stock", value: "Out of stock" },
];

export default function InventoryModal({ item, isOpen, onClose, onSave }: InventoryModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InventoryFormInput>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      inv_name: "",
      cat_name: "Baking",
      inv_qty: 0,
      qty_unit: "kg",
      inv_thresold: 0,
      threshold_unit: "kg",
      inv_status: "In stock",
      expiry_date: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (item) {
        reset({
          inv_name: item.item,
          cat_name: item.category,
          inv_qty: item.qty,
          qty_unit: item.qty_unit,
          inv_thresold: item.threshold,
          threshold_unit: item.threshold_unit,
          inv_status: item.status,
          expiry_date: item.expiry_date || "",
        });
      } else {
        reset({
          inv_name: "",
          cat_name: "Baking",
          inv_qty: 0,
          qty_unit: "kg",
          inv_thresold: 0,
          threshold_unit: "kg",
          inv_status: "In stock",
          expiry_date: "",
        });
      }
    }
  }, [item, isOpen, reset]);

  const onSubmit = (data: InventoryFormInput) => {
    const savedItem: InventoryItem = {
      id: item?.id || Date.now(),
      item: data.inv_name,
      category: data.cat_name,
      qty: data.inv_qty,
      qty_unit: data.qty_unit,
      threshold: data.inv_thresold,
      threshold_unit: data.threshold_unit,
      status: data.inv_status,
      expiry_date: data.expiry_date || undefined,
    };
    onSave(savedItem);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-xl p-0 rounded-[2rem] bg-white border border-gray-100 max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Fixed Header */}
        <div className="p-8 pb-0">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle>
              {item ? `Edit – ${item.item}` : "Add Inventory Item"}
            </DialogTitle>
            <DialogDescription>
              {item ? "Update the details of this inventory item." : "Create a new inventory tracking item."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 pb-6 space-y-5">
            {/* Item Name */}
            <FormField
              id="inv_name"
              label="Item Name"
              placeholder="ex. All-purpose flour"
              error={errors.inv_name}
              required
              {...register("inv_name")}
            />

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="cat_name"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    id="cat_name"
                    label="Category"
                    error={errors.cat_name}
                    required
                    options={CATEGORY_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                    name={field.name}
                    ref={field.ref}
                  />
                )}
              />

              <Controller
                name="inv_status"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    id="inv_status"
                    label="Status"
                    error={errors.inv_status}
                    required
                    options={STATUS_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                    name={field.name}
                    ref={field.ref}
                  />
                )}
              />
            </div>

            {/* Quantity and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                id="inv_qty"
                label="Quantity"
                type="number"
                step="any"
                placeholder="ex. 24"
                error={errors.inv_qty}
                required
                {...register("inv_qty", { valueAsNumber: true })}
              />

              <FormField
                id="qty_unit"
                label="Quantity Unit"
                placeholder="ex. kg, L, pcs"
                error={errors.qty_unit}
                required
                {...register("qty_unit")}
              />
            </div>

            {/* Threshold and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                id="inv_thresold"
                label="Threshold"
                type="number"
                step="any"
                placeholder="ex. 10"
                error={errors.inv_thresold}
                required
                {...register("inv_thresold", { valueAsNumber: true })}
              />

              <FormField
                id="threshold_unit"
                label="Threshold Unit"
                placeholder="ex. kg, L, pcs"
                error={errors.threshold_unit}
                required
                {...register("threshold_unit")}
              />
            </div>

            {/* Expiry Date (Optional) */}
            <FormField
              id="expiry_date"
              label="Expiry Date"
              type="date"
              error={errors.expiry_date}
              {...register("expiry_date")}
            />
          </div>

          {/* Fixed Footer */}
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
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
