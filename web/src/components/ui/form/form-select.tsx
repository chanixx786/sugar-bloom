"use client";

import { forwardRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FormSelectProps {
  label: string;
  error?: FieldError | string;
  id: string;
  required?: boolean;
  description?: string;
  labelClassName?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: { target: { name: string; value: string } }) => void;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
}

export const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      label,
      error,
      id,
      className,
      labelClassName,
      required,
      description,
      options,
      placeholder,
      name,
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      onBlur,
      disabled,
      ...props
    },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    // Support both controlled and uncontrolled usage
    const [localValue, setLocalValue] = useState(controlledValue || defaultValue || "");

    useEffect(() => {
      if (controlledValue !== undefined) {
        setLocalValue(controlledValue);
      }
    }, [controlledValue]);

    const handleValueChange = (newValue: string | null) => {
      const val = newValue ?? "";
      if (controlledValue === undefined) {
        setLocalValue(val);
      }
      onValueChange?.(val);
      onChange?.({
        target: {
          name: name || "",
          value: val,
        },
      });
    };

    return (
      <div className="space-y-1.5 w-full">
        <div className="flex items-center justify-between">
          <Label
            htmlFor={id}
            className={`
              text-xs font-semibold text-foreground block pl-1
              ${labelClassName || ""}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
          {description && (
            <span className="text-xs text-foreground">{description}</span>
          )}
        </div>

        <Select
          value={localValue}
          onValueChange={handleValueChange}
          name={name}
          disabled={disabled}
        >
          <SelectTrigger
            id={id}
            ref={ref}
            onBlur={onBlur}
            className={`
              h-10 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-1 text-sm font-sans transition-[color,box-shadow,background-color] outline-none focus-visible:border-[#c2406a] focus-visible:ring-3 focus-visible:ring-[#c2406a]/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-10
              ${errorMessage ? "border-red-500 focus-visible:ring-red-500" : ""}
              ${className || ""}
            `}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border border-gray-100 bg-white shadow-xl max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 py-2.5 px-3 rounded-xl text-sm"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errorMessage && (
          <p className="text-xs text-red-500 pl-1 animate-in slide-in-from-top-1">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

