"use client";

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "react-hook-form";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError | string;
  id: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  labelClassName?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    { 
      label, 
      error, 
      id, 
      placeholder, 
      className,
      labelClassName,
      required,
      description,
      ...props 
    }, 
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label 
            htmlFor={id} 
            className={`
              text-xs font-semibold foreground block pl-1
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
        
        <div className="relative">
          <Textarea
            id={id}
            placeholder={placeholder}
            ref={ref}
            className={`
              ${errorMessage ? "border-red-500 focus-visible:ring-red-500" : ""} 
              ${className || ""}
            `}
            {...props}
          />
        </div>
        
        {errorMessage && (
          <p className="text-xs text-red-500 pl-1 animate-in slide-in-from-top-1">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
