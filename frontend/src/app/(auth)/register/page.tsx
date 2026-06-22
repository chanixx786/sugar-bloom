import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <>
      {/* Subtitle */}
      <div className="text-center">
        <p className="text-xs md:text-sm text-gray-500 font-sans">
          Register to manage inventory & orders
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

        {/* Name Field */}
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs font-semibold text-gray-600 block pl-1">
            Name
          </Label>
          <Input id="name" type="text" placeholder="First Name, Last Name Middle Name" />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs font-semibold text-gray-600 block pl-1">
            Password
          </Label>
          <Input id="password" type="password" placeholder="••••••••••••" />
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-600 block pl-1">
            Confirm Password
          </Label>
          <Input id="confirmPassword" type="password" placeholder="••••••••••••" />
        </div>

        {/* Submit & Redirect */}
        <div className="flex flex-col gap-3.5 mt-2">
          <Button className="w-full" size="lg">
            Register
          </Button>

          <div className="flex justify-center text-xs md:text-sm font-sans">
            <a href="/login" className="text-[#c2406a] font-semibold hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
