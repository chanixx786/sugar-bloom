"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { registerSchema, RegisterInput } from "@/schemas/auth_schema";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fname: "",
      lname: "",
      mname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    console.log("Register data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Subtitle */}
      <div className="text-center mb-6">
        <p className="text-xs md:text-sm text-gray-500 font-sans">
          Register to manage inventory & orders
        </p>
      </div>

      {/* Form Input fields */}
      <div className="flex flex-col gap-3.5 w-full">
        {/* Email Field */}
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="ex. juan@gmail.com"
          error={errors.email}
          required
          {...register("email")}
        />

        <div className="flex  flex-col  md:flex-row gap-4">
          {/* Name Field */}
          <FormField
            id="fname"
            label="First Name"
            type="text"
            placeholder="First Name"
            error={errors.fname}
            required
            {...register("fname")}
          />
          {/* Name Field */}
          <FormField
            id="lname"
            label="Last Name"
            type="text"
            placeholder="First Name, Last Name Middle Name"
            error={errors.lname}
            required
            {...register("lname")}
          />

        </div>
         <FormField
            id="mname"
            label="Middle Name"
            type="text"
            placeholder="Middle Name"
            error={errors.mname}
            
            {...register("mname")}
          />
        {/* Password Field */}
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••••••"
          error={errors.password}
          required
          description="Min. 8 chars with uppercase, lowercase & number"
          {...register("password")}
        />

        {/* Confirm Password Field */}
        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••••••"
          error={errors.confirmPassword}
          required
          {...register("confirmPassword")}
        />

        {/* Submit & Redirect */}
        <div className="flex flex-col gap-3.5 mt-2">
          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

          <div className="flex justify-center text-xs md:text-sm font-sans">
            <a href="/login" className="text-[#c2406a] font-semibold hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}