import { Star } from "lucide-react";

const reviews = [
  { name: "Amelia R.", text: "The strawberry cake was the highlight of our anniversary. Absolute perfection from first bite to last crumb.", role: "Anniversary" },
  { name: "Marcus L.", text: "Beautifully presented and even more delicious than it looks. Sugar Bloom is now our go-to bakery.", role: "Birthday" },
  { name: "Sofia D.", text: "Custom wedding tier was a showstopper. Guests are still talking about the buttercream weeks later.", role: "Wedding" },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">
          From people who <span className="font-script text-primary">tasted it</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary stroke-none" />
                ))}
              </div>
              <blockquote className="text-sm text-foreground/80 leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blush grid place-items-center font-serif font-bold text-primary">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
