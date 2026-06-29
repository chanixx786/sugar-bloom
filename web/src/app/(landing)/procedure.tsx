import { Cookie, ChefHat, ShoppingBag, Truck } from "lucide-react";

const steps = [
  { icon: Cookie, label: "Browse" },
  { icon: ChefHat, label: "Customize" },
  { icon: ShoppingBag, label: "Order" },
  { icon: Truck, label: "Enjoy" },
];

export default function Procedure() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-blush-soft">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-14">
          Four steps to <span className="font-script text-primary">creation</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-primary/40" aria-hidden />
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center relative z-10">
              <div className="grid place-items-center h-16 w-16 rounded-full bg-background border border-primary/30 text-primary shadow-sm">
                <s.icon className="h-7 w-7" />
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Step {i + 1}</div>
              <div className="font-serif text-lg font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}