import { Button } from "@/components/ui/button";
import {Star} from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-16 ">
      <section className="flex flex-col justify-center items-start w-full ">
        <div>
          <h1 className="text-8xl font-bold mb-4">
            Where <span className="font-dancing text-primary">Flavor</span>
          </h1>
          <h1 className="text-8xl font-bold mb-4">
            meets <span className="font-dancing text-primary">Artistry</span>
          </h1>
          <p className="text-lg text-left mb-8 text-gray-500">
            Beautifully crafted cakes with exceptional taste, <br />
            made fresh to elevate every occasion - from quiet <br />
            mornings to milestone celebrations.
          </p>
        </div>
        <div className="flex gap-4 mt-8 mb-6">
          <Button className="px-16 py-6">Order Now</Button>
          <Button variant="outline" className="px-16 py-6">
            View Menu
          </Button>
        </div>
        <div className="flex flex-row gap-18 mt-16 shadow-right-md text-4xl items-center justify-start">
          <p className="flex flex-col font-bold">
            10+{" "}
            <span className="text-lg font-normal text-gray-500 uppercase tracking-wide">
              YEARS
            </span>
          </p>
          <div className="h-16 w-px bg-gray-300" />
          <p className="flex flex-col font-bold">
            5K+{" "}
            <span className="text-lg font-normal text-gray-500 uppercase tracking-wide">
              CUSTOMERS
            </span>
          </p>
          <div className="h-16 w-px bg-gray-300" />
          <p className="flex flex-col font-bold">
            150+{" "}
            <span className="text-lg font-normal text-gray-500 uppercase tracking-wide">
              RECIPES
            </span>
          </p>
        </div>
      </section>
      <section className="lg:absolute lg:right-40 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[45%] flex justify-end relative isolate">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at center, oklch(0.58 0.18 0 / 0.12) 0%, oklch(0.58 0.18 0 / 0.75) 35%, oklch(0.58 0.18 0 / 0.30) 60%, transparent 78%)",
            filter: "blur(40px)",
          }}
        />
        <Image
          src="/assets/cupcake.svg"
          alt="Hero Image"
          width={500}
          height={500}
          className="relative w-full h-auto object-cover"
          priority
        />
        <div className="absolute bottom-6 right-0 z-20 flex items-center gap-4 rounded-full border border-white/60 bg-white/40 px-5 py-3 shadow-[0_8px_30px_-10px_oklch(0.65_0.2_354/0.35)] backdrop-blur-md">
          <div className="flex -space-x-2">
            <span className="h-8 w-8 rounded-full border-2 border-white bg-[oklch(0.6_0.2_354)]" />
            <span className="h-8 w-8 rounded-full border-2 border-white bg-[oklch(0.78_0.14_354)]" />
            <span className="h-8 w-8 rounded-full border-2 border-white bg-[oklch(0.95_0.03_85)]" />
          </div>
          <div className="pr-2">
            <div className="text-md font-semibold text-foreground">
              Loved by 5,000+
            </div>
            <div className="mt-0.5 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star fill="pink" key={i} className="h-4 w-4 stroke-none" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
