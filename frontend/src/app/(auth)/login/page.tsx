import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sbImage from "@/assets/sbImage.png";
import sbText from "@/assets/sbText.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginLayout() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-around gap-8 md:gap-20 items-center min-h-screen p-4 max-w-7xl mx-auto">
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight">Sugar Bloom</h1>
          <p className="mt-4 text-muted-foreground">
            Cakes layered with rose-cream. Ice cream churned with petals. Bouquets tied by hand. A
            boutique for the moments worth celebrating.
          </p>
        </div>

        <div className="w-md">
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6 pt-6">
              <div className="flex flex-col items-center gap-2">
                <Image src={sbImage} alt="Sugar Bloom Logo" className="w-24 h-auto" />
                <Image src={sbText} alt="Sugar Bloom" className="w-40 h-auto" />
              </div>

              <div className="flex justify-center">
                <Label>Sign in to manage inventory & orders</Label>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="email" className="mb-2 block">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Email" />
                </div>
                <div>
                  <Label htmlFor="password" className="mb-2 block">
                    Password
                  </Label>
                  <Input id="password" type="password" placeholder="Password" />
                </div>
                <div className="flex justify-end">
                  <Label>Forgot Password</Label>
                </div>
                <div className="flex flex-col gap-4">
                  <Button className="w-full mt-2">Login</Button>
                  <div className="flex justify-center">
                    <Label className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <a href="/register" className="text-primary">
                        Register
                      </a>
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
