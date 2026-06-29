import { z } from "zod";

export const productFormSchema = z.object({
  prodlist_name: z.string().min(1, "Product name is required"),
  cat_name: z.string().min(1, "Category is required"),
  prod_status: z.enum(["Available", "Sold", "Reserved", "Discarded"], {
    errorMap: () => ({ message: "Status must be Available, Sold, Reserved, or Discarded" })
  }),
  prod_price: z.number().min(0.01, "Price must be greater than 0"),
  prod_stock: z.number().min(0, "Stock cannot be negative"),
  description: z.string().min(1, "Description is required"),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
