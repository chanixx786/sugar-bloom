"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form/form-field";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/schemas/auth_schema";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        console.log("Forgot password email:", data.email);
        router.push(`/forgot-password/otp?email=${encodeURIComponent(data.email)}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
                <p className="text-sm text-gray-500">
                    Enter your email address and we'll send you a link to reset your password.
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
                    required
                    {...register("email")}
                />

                {/* Submit Button */}
                <div className="flex flex-col gap-3.5 mt-2">
                    <Button
                        className="w-full"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send Reset Link"}
                    </Button>

                    {/* Back to Login */}
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