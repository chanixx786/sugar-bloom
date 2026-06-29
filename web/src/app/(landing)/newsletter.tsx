"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-blush-soft">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
          First taste of every <span className="font-script text-primary">new flavor</span>
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-background rounded-full p-2 shadow-sm border border-border"
        >
          <Input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
          />
          <Button type="submit" className="rounded-full px-8">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}