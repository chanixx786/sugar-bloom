import { z } from "zod";

export const inventoryFormSchema = z.object({
  inv_name: z.string().min(1, "Inventory item name is required"),
  cat_name: z.string().min(1, "Category is required"),
  inv_qty: z.number().min(0, "Quantity cannot be negative"),
  qty_unit: z.string().min(1, "Unit is required"),
  inv_thresold: z.number().min(0, "Threshold cannot be negative"),
  threshold_unit: z.string().min(1, "Threshold unit is required"),
  inv_status: z.enum(["In stock", "Low stock", "Out of stock"], {
    errorMap: () => ({ message: "Status must be In stock, Low stock, or Out of stock" }),
  }),
  expiry_date: z.string().optional().or(z.literal("")),
});

export type InventoryFormInput = z.infer<typeof inventoryFormSchema>;
