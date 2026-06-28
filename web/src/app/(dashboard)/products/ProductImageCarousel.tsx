"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative group/carousel w-full overflow-hidden rounded-t-3xl bg-pink-50/20">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="ml-0">
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="pl-0 basis-full">
              <div className="relative w-full h-70">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${productName} - Slide ${idx + 1}`}
                  className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous/Next Navigation Controls */}
        {images.length > 1 && (
          <>
            <CarouselPrevious
              type="button"
              className={cn(
                "left-2 z-20 bg-white/80 hover:bg-white text-gray-800 border-none shadow-sm cursor-pointer",
                "opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200"
              )}
            />
            <CarouselNext
              type="button"
              className={cn(
                "right-2 z-20 bg-white/80 hover:bg-white text-gray-800 border-none shadow-sm cursor-pointer",
                "opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200"
              )}
            />
          </>
        )}
      </Carousel>

      {/* Slide Progress Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                idx === current ? "w-4 bg-white shadow-sm" : "w-1.5 bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
