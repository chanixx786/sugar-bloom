import { Sun } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen md:h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#fee2e2] via-[#fffbf9] to-[#fee2e2] overflow-hidden">
      {/* Decorative background blur shapes for premium appearance */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#fecdd3] rounded-full blur-[120px] opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fecdd3] rounded-full blur-[120px] opacity-40 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-around gap-8 md:gap-12 lg:gap-16">
        {/* Left Column: Hero Text & Graphic */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/75 border border-[#fbcbcb] text-[#c2406a] text-xs font-semibold shadow-sm backdrop-blur-xs mb-4 md:mb-6">
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Good Morning</span>
          </div>

          {/* Heading */}
          <h1 className="font-dancing text-5xl md:text-6xl lg:text-[75px] text-[#c2406a] leading-tight select-none">
            Sweetness,
            <br />
            in full bloom.
          </h1>

          {/* Description */}
          <p className="mt-3 text-[#6e5d5d] text-sm md:text-base leading-relaxed font-sans max-w-sm">
            Cakes layered with rose-cream. Ice cream churned with petals.
            Bouquets tied by hand. A boutique for the moments worth celebrating.
          </p>

          {/* Cupcake Splash graphic */}
          <div className="mt-6 relative w-full max-w-[280px] lg:max-w-[320px] aspect-square flex justify-center items-center">
            <Image
              src="/assets/cupcake.svg"
              alt="Cupcake Splash"
              className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(212,72,118,0.12)] select-none"
              width={320}
              height={320}
              priority
            />
          </div>
        </div>

        {/* Right Column: Form Card - SCROLLABLE WITH HIDDEN SCROLLBAR */}
        <div className="w-full max-w-md flex justify-center ">
          <Card className="w-full border-none shadow-[0_20px_50px_rgba(212,72,118,0.06)] rounded-[32px] bg-white overflow-hidden">
            <CardContent className="flex flex-col gap-5 p-6 md:p-8 max-h-[80vh] overflow-y-auto auth-card-scroll">
              {/* Logo / Branding */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <Image
                  src="/assets/sbImage.png"
                  alt="Sugar Bloom Logo"
                  width={160}
                  height={80}
                  className="w-20 md:w-24 h-auto select-none"
                  priority
                />
                <span className="font-dancing text-2xl font-semibold">Sugar Bloom</span>
              </div>

              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
