"use client";

import { forwardRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError | string;
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  description?: string;
  labelClassName?: string;
  showPasswordToggle?: boolean; // New prop to control toggle visibility
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { 
      label, 
      error, 
      id, 
      placeholder, 
      type = "text", 
      className,
      labelClassName,
      required,
      description,
      showPasswordToggle = true, // Default to true
      ...props 
    }, 
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const errorMessage = typeof error === "string" ? error : error?.message;
    
    // Determine if this is a password field
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label 
            htmlFor={id} 
            className={`
              text-xs font-semibold text-gray-600 block pl-1
              ${labelClassName || ""}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
          {description && (
            <span className="text-xs text-gray-400">{description}</span>
          )}
        </div>
        
        <div className="relative">
          <Input
            id={id}
            type={inputType}
            placeholder={placeholder}
            ref={ref}
            className={`
              ${errorMessage ? "border-red-500 focus-visible:ring-red-500" : ""} 
              ${isPassword && showPasswordToggle ? "pr-10" : ""}
              ${className || ""}
            `}
            {...props}
          />
          
          {/* Show toggle button only for password fields */}
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1} // Prevent focus on button
            >
              {showPassword ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          )}
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

FormField.displayName = "FormField";