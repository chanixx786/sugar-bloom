import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <>
      {/* Subtitle */}
      <div className="text-center">
        <p className="text-xs md:text-sm text-gray-500 font-sans">
          Sign in to manage inventory & orders
        </p>
      </div>

      {/* Form Input fields */}
      <div className="flex flex-col gap-3.5 w-full">
        {/* Email Field */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-semibold text-gray-600 block pl-1">
            Email
          </Label>
          <Input id="email" type="email" placeholder="ex. juan@gmail.com" />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <Label
            htmlFor="password"
            className="text-xs font-semibold text-gray-600 block pl-1"
          >
            Password
          </Label>
          <Input id="password" type="password" placeholder="ex. juan@gmail.com" />
        </div>

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
          <Button className="w-full" size="lg">
            Login
          </Button>

          <div className="flex justify-center text-xs md:text-sm font-sans">
            <span className="text-gray-500">
              Don't have an account?{" "}
              <a href="/register" className="text-[#c2406a] font-semibold hover:underline">
                Create one
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
