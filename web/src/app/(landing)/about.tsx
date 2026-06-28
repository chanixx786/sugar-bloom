import Image from "next/image";
import { Button } from "@/components/ui/button";
// import baker from "@/assets/cupcake.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-background px-6 py-32 lg:px-12 flex items-center"
    >
      {/* Background Glow Effects */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-pink-200/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            {/* Decorative Blob */}
            <div
              className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
              aria-hidden
            />

            {/* Background Accent */}
            <div
              className="absolute -inset-4 rounded-[2rem] bg-primary/10 rotate-[-4deg]"
              aria-hidden
            />

            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              {/* <Image
                src={baker}
                alt="Our master baker"
                priority
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
              /> */}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/20 backdrop-blur-md px-5 py-4 text-white">
                <p className="text-sm uppercase tracking-widest opacity-80">
                  Since
                </p>
                <p className="text-3xl font-bold">2014</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-primary mb-4">
              Our Story
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              A Crafted Confections built on{" "}
              <span className="font-dancing text-primary">
                patience
              </span>
            </h2>

            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Every recipe starts with the slow, careful work of hands that
              have been kneading dough for over a decade. We refuse shortcuts —
              only the freshest ingredients, traditional techniques, and an
              obsession with detail end up on your plate.
            </p>

            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From intimate celebrations to grand occasions, every dessert is
              lovingly handcrafted to create moments worth remembering.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { value: "10+", label: "Years" },
                { value: "5K+", label: "Orders" },
                { value: "150+", label: "Recipes" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="
                    rounded-2xl border border-border/50 bg-card
                    p-5 text-center shadow-sm
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg
                  "
                >
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button className="mt-10 rounded-full px-10 py-6 text-base">
              Read Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}