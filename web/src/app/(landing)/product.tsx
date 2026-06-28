import Image from "next/image";

const galleryItems = [
  {
    src: "/assets/cupcake.svg",
    title: "Signature Wedding Cake",
    className: "md:row-span-2",
  },
  {
    src: "/assets/cupcake.svg",
    title: "Fresh Berry Collection",
    className: "",
  },
  {
    src: "/assets/cupcake.svg",
    title: "Strawberry Dream",
    className: "md:col-span-2",
  },
  {
    src: "/assets/cupcake.svg",
    title: "French Macarons",
    className: "",
  },
  {
    src: "/assets/cupcake.svg",
    title: "Seasonal Favorites",
    className: "md:col-span-2",
  },
];

export default function Product() {
  return (
    <section
      id="gallery"
      className="relative min-h-screen overflow-hidden bg-from- px-6 py-32 lg:px-12 flex items-center"
    >
      <div className="relative max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-primary mb-4">
            Gallery
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Little works of{" "}
            <span className="font-dancing text-primary">
              edible art
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Every dessert is handcrafted with passion, blending delicate
            flavors and artistic presentation to create unforgettable moments.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`
                group relative overflow-hidden rounded-[2rem]
                border border-border/50 bg-card shadow-sm
                hover:shadow-2xl transition-all duration-500
                hover:-translate-y-2
                ${item.className}
              `}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={800}
                height={800}
                className="
                  h-full w-full object-cover
                  transition-all duration-700
                  group-hover:scale-110
                "
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs text-white mb-3">
                  Featured
                </span>

                <h3 className="text-white text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}