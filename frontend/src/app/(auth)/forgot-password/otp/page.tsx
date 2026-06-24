"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema, OtpInput } from "@/schemas/auth_schema";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
    const router = useRouter()
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [otpValue, setOtpValue] = useState("");

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<OtpInput>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    // Handle OTP change
    const handleOtpChange = (value: string) => {
        setOtpValue(value);
        setValue("otp", value, { shouldValidate: true });
    };

    // Handle verification
    const onSubmit = async (data: OtpInput) => {
        setIsVerifying(true);
        try {
            console.log("Verifying OTP:", data.otp);

            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push("/reset-password");

        } catch (error) {
            console.error("Verification error:", error);
        } finally {
            setIsVerifying(false);
        }
    };

    // Handle resend code
    const handleResendCode = async () => {
        setIsResending(true);
        try {
            console.log("Resending OTP...");
            alert("New verification code sent!");
        } catch (error) {
            console.error("Resend error:", error);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Header */}
            <div className="text-center mb-8">
                <p className="text-sm text-gray-500">
                    Enter the verification code we sent to your email address:{" "}
                    <span className="font-medium text-[#c2406a]">m@example.com</span>.
                </p>
            </div>

            {/* OTP Input */}
            <div >
                <Field >
                    <div className="flex items-center justify-between mb-2">
                        <FieldLabel htmlFor="otp-verification" className="text-sm font-medium">
                            Verification Code
                        </FieldLabel>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleResendCode}
                            disabled={isResending}
                            className="h-8 text-xs"
                        >
                            <RefreshCwIcon className={`h-3 w-3 mr-1 ${isResending ? "animate-spin" : ""}`} />
                            {isResending ? "Sending..." : "Resend Code"}
                        </Button>
                    </div>

                    <div className="flex justify-center"
                    >
                        <InputOTP
                            maxLength={6}
                            id="otp-verification"
                            value={otpValue}
                            onChange={handleOtpChange}
                            required
                        >
                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:border-gray-300 *:data-[slot=input-otp-slot]:focus:border-[#c2406a] *:data-[slot=input-otp-slot]:focus:ring-[#c2406a]">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator className="mx-2" />
                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:border-gray-300 *:data-[slot=input-otp-slot]:focus:border-[#c2406a] *:data-[slot=input-otp-slot]:focus:ring-[#c2406a]">
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    {errors.otp && (
                        <p className="text-sm text-red-500 mt-2">{errors.otp.message}</p>
                    )}
                </Field>
            </div>

            {/* Footer */}
            <div className=" mt-6 space-y-4">
                <Button
                    className="w-full"
                    type="submit"
                    disabled={isVerifying || otpValue.length !== 6}
                >
                    {isVerifying ? "Verifying..." : "Verify"}
                </Button>

                <div className="text-sm text-center text-gray-500">
                    Having trouble signing in?{" "}
                    <a
                        href="/support"
                        className="underline underline-offset-4 transition-colors hover:text-[#c2406a] text-[#c2406a]"
                    >
                        Contact support
                    </a>
                </div>
            </div>
        </form>
    );
}