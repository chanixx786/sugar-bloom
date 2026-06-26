"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { resetPasswordSchema, ResetPasswordInput } from "@/schemas/auth_schema";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

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

  // Calculate password strength
  const calculateStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;
    return strength;
  };

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

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
        {/* Password Field with Toggle */}
        <div className="space-y-1 mt-8">
          <FormField
            id="password"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            error={errors.password}
            required
            {...register("password")}
            onChange={(e) => {
              const value = e.target.value;
              setPasswordStrength(calculateStrength(value));
            }}
          />

          {/* Password Strength Bar */}
          {password && password.length > 0 && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Password strength:</span>
                <span className={`text-xs font-semibold ${
                  passwordStrength < 2 ? "text-red-500" :
                  passwordStrength === 2 ? "text-yellow-500" :
                  passwordStrength === 3 ? "text-blue-500" :
                  "text-green-500"
                }`}>
                  {getStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password with Toggle */}
        <FormField
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          error={errors.confirmPassword}
          required
          {...register("confirmPassword")}
        />

        {/* Password Requirements */}
        <div className="text-xs text-gray-500 space-y-1 mt-1">
          <p className="font-medium">Password must contain:</p>
          <ul className="space-y-0.5 pl-4 list-disc">
            <li className={password?.length >= 8 ? "text-green-600" : ""}>
              At least 8 characters
            </li>
            <li className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? "text-green-600" : ""}>
              At least one uppercase and one lowercase letter
            </li>
            <li className={/\d/.test(password) ? "text-green-600" : ""}>
              At least one number
            </li>
          </ul>
        </div>

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