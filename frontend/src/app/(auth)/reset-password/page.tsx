"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { PasswordStrength } from "@/components/ui/password-strength";
import { resetPasswordSchema, ResetPasswordInput } from "@/schemas/auth_schema";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset.");
      return;
    }

    try {
      console.log("Resetting password with token:", token);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      reset();
    } catch (error) {
      setError("Failed to reset password. Please try again or request a new link.");
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
            <Button 
              className="w-full bg-[#c2406a] hover:bg-[#a8345a]"
              onClick={() => window.location.href = "/login"}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Something Went Wrong
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-[#c2406a] hover:bg-[#a8345a]"
                onClick={() => window.location.href = "/forgot-password"}
              >
                Request New Reset Link
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => window.location.href = "/login"}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Enter your new password below.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Password Field */}
        <div className="space-y-1 mt-8">
          <FormField
            id="password"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            error={errors.password}
            required
            {...register("password")}
          />
          <PasswordStrength password={password ?? ""} />
        </div>

        {/* Confirm Password */}
        <FormField
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          error={errors.confirmPassword}
          required
          {...register("confirmPassword")}
        />

        <div className="flex flex-col gap-3.5 mt-2">
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>

          <div className="flex justify-center text-xs md:text-sm">
            <a href="/login" className="text-[#c2406a] font-semibold hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}