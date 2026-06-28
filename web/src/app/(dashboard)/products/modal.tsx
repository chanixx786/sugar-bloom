"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form/form-field";
import { FormTextarea } from "@/components/ui/form/form-textarea";
import { FormSelect } from "@/components/ui/form/form-select";
import { Button } from "@/components/ui/button";
import { ExternalLink, Save, Plus, X } from "lucide-react";
import { Product } from "./mock-data";
import { productFormSchema, ProductFormInput } from "@/schemas/product_schema";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function ProductModal({ product, isOpen, onClose, onSave }: ProductModalProps) {
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      prodlist_name: "",
      cat_name: "",
      prod_status: "Available",
      prod_price: 0,
      prod_stock: 0,
      description: ""
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          prodlist_name: product.prodlist.prodlist_name,
          cat_name: product.prodlist.cat.cat_name,
          prod_status: product.prod_status,
          prod_price: product.prod_price,
          prod_stock: product.prod_stock,
          description: product.description
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setImages(product.images || []);
      } else {
        reset({
          prodlist_name: "",
          cat_name: "",
          prod_status: "Available",
          prod_price: 0,
          prod_stock: 0,
          description: ""
        });
        setImages([]);
      }
    }
  }, [product, isOpen, reset]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newUrls]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const onSubmit = (data: ProductFormInput) => {
    console.log("Form Data:", data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-xl p-0 rounded-[2rem] bg-white border border-gray-100 max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Fixed Header */}
        <div className="p-8 pb-0">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle>
              {product ? `Edit – ${product.prodlist.prodlist_name}` : "Add Product"}
            </DialogTitle>
            <DialogDescription>Update the details of this product.</DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 pb-6 space-y-5">
            <FormField
              id="prodlist_name"
              label="Product name"
              placeholder="ex. juan@gmail.com"
              error={errors.prodlist_name}
              required
              {...register("prodlist_name")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                id="cat_name"
                label="Category"
                placeholder="ex. juan@gmail.com"
                error={errors.cat_name}
                required
                {...register("cat_name")}
              />
              <Controller
                name="prod_status"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    id="prod_status"
                    label="Status"
                    error={errors.prod_status}
                    required
                    options={[
                      { label: "Available", value: "Available" },
                      { label: "Sold", value: "Sold" },
                      { label: "Reserved", value: "Reserved" },
                      { label: "Discarded", value: "Discarded" }
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                    name={field.name}
                    ref={field.ref}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                id="prod_price"
                label="Price (₱)"
                type="number"
                step="0.01"
                placeholder="ex. juan@gmail.com"
                error={errors.prod_price}
                required
                {...register("prod_price", { valueAsNumber: true })}
              />
              <FormField
                id="prod_stock"
                label="Stock"
                type="number"
                placeholder="ex. juan@gmail.com"
                error={errors.prod_stock}
                required
                {...register("prod_stock", { valueAsNumber: true })}
              />
            </div>

            <FormTextarea
              id="description"
              label="Description"
              placeholder="Hand-piped buttercream rose cupcake topped with silver sugar pearls."
              error={errors.description}
              required
              className="min-h-16"
              {...register("description")}
            />

            {/* Image Upload Gallery */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-foreground pl-1 block">
                Product Images
              </span>
              <div className="flex items-center gap-4 flex-wrap">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group w-24 h-24 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center transition-all hover:scale-[1.02]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}

                <label className="w-24 h-24 rounded-2xl border border-dashed border-gray-300 hover:border-[#d44876] hover:bg-pink-50/20 cursor-pointer flex flex-col items-center justify-center transition-all group">
                  <Plus className="size-6 text-gray-400 group-hover:text-[#d44876] transition-colors" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
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
