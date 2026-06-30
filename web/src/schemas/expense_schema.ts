import { z } from "zod";

export const expenseFormSchema = z.object({
  inv_id: z.coerce.number().min(1, "Inventory item is required"),
  exp_amount: z.coerce.number().min(0.01, "Amount must be greater than zero"),
  exp_date_purchased: z.string().min(1, "Purchase date is required"),
  exp_vendor: z.string().min(1, "Vendor is required"),
});

export type ExpenseFormInput = z.infer<typeof expenseFormSchema>;
