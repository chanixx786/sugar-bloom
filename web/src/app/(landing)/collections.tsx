import { ArrowRight, Box } from "lucide-react";
import Image from "next/image";

const items = [
  { img: "/assets/cupcake.svg", name: "Strawberry Bliss", price: "$32" },
  { img: "/assets/cupcake.svg", name: "Choco Rose Velvet", price: "$38" },
  { img: "/assets/cupcake.svg", name: "Vanilla Berry Cloud", price: "$28" },
  { img: "/assets/cupcake.svg", name: "Red Velvet Slice", price: "$24" },
];

export default function Collections({
  title = "Our",
  accent = "Collections",
}: {
  title?: string;
  accent?: string;
}) {
  return (
    <section
      id="collections"
      className="relative min-h-screen overflow-hidden px-6 py-32 lg:px-12 flex flex-col"
    >
      <div className="relative max-w-7xl mx-auto w-full flex flex-col flex-1">
        {/* Header - fixed height, doesn't grow */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10 flex-shrink-0">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-primary mb-3">
              Freshly Crafted
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {title}{" "}
              <span className="font-dancing text-primary">{accent}</span>
            </h2>
          </div>

          <a
            href="#"
            className="group flex items-center gap-2 text-primary font-medium transition-all"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Products Grid - FILLS REMAINING SPACE */}
        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr">
          {items.map((item) => (
            <article key={item.name} className="group cursor-pointer flex">
              <div className="flex flex-col w-full overflow-hidden rounded-3xl border border-border/50 bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* Image Container - takes most of the space */}
                <div className="relative flex-1 aspect-square overflow-hidden bg-blush-soft">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-primary shadow">
                    Bestseller
                  </div>

                  <Image
                    src={item.img}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="
                      h-full w-full object-cover
                      transition-all duration-700
                      group-hover:scale-110
                      group-hover:rotate-3
                    "
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Card Content - fixed height at bottom */}
                <div className="p-4 md:p-5 flex-shrink-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base md:text-lg font-semibold leading-tight">
                      {item.name}
                    </h3>

                    <span className="text-base md:text-lg font-bold text-primary whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>

                  <p className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground line-clamp-2">
                    Handcrafted with premium ingredients and baked fresh daily.
                  </p>

                  <button
                    className="
                      mt-3 md:mt-5 w-full rounded-full border border-primary/20
                      py-2 md:py-3 text-xs md:text-sm font-medium transition-all duration-300
                      hover:bg-primary hover:text-primary-foreground
                      flex items-center justify-center gap-2
                    "
                  >
                    <Box className="w-4 h-4" />
                    Add to Box
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
