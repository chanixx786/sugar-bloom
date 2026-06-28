import { createFileRoute } from "@tanstack/react-router";
import {Navbar} from "./navbar";
import Hero from "./hero";
import Collections from "./collections";
import FourSteps from "./procedure";
import Testimonials from "./testimonials";
import Newsletter from "./newsletter";
import Footer from "./footer";
import About from "./about";
import Product from "./product";

export const Route = createFileRoute()({
  head: () => ({
    meta: [
      { title: "Sugar Bloom — Where Flavor meets Artistry" },
      { name: "description", content: "Handcrafted artisan cakes & pastries made fresh for every celebration." },
      { property: "og:title", content: "Sugar Bloom — Artisan Bakery" },
      { property: "og:description", content: "Handcrafted artisan cakes & pastries made fresh for every celebration." },
    ],
  }),
  component: Landing,
});

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex flex-col ">
        <Hero />
        <Collections title="Our" accent="Collections" />
        <Collections title="Loved by" accent="everyone" />
        <About />
        <Product />
        <FourSteps />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}