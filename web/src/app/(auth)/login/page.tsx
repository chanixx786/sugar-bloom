"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form/form-field";
import { loginSchema, LoginInput } from "@/schemas/auth_schema";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
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
    router.push("/dashboard");

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