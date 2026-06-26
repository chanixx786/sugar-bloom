"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { loginSchema, LoginInput } from "@/schemas/auth_schema";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    console.log("Login data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      {/* Subtitle */}
      <div className="text-center mb-6">
        <p className="text-xs md:text-sm text-gray-500">
          Sign in to manage inventory & orders
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="ex. juan@gmail.com"
          error={errors.email}
          {...register("email")}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password}
          {...register("password")}
        />

        {/* Forgot Password */}
        <div className="flex justify-end pr-1">
          <a
            href="/forgot-password"
            className="text-xs md:text-sm font-semibold text-[#c2406a] hover:underline transition-all"
          >
            Forgot Password
          </a>
        </div>

        {/* Submit & Register */}
        <div className="flex flex-col gap-3.5 mt-1">
          <Button 
            className="w-full" 
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-0.5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={() => console.log("Google sign-in")}
            className="w-full h-10 flex items-center justify-center gap-2.5 rounded-4xl border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted hover:shadow-md active:translate-y-px cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="flex justify-center text-xs md:text-sm">
            <span className="text-gray-500">
              Don't have an account?{" "}
              <a href="/register" className="text-[#c2406a] font-semibold hover:underline">
                Create one
              </a>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}