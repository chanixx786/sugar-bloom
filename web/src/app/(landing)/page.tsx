import Hero from "./hero";
import Navbar from "./navbar";
export default function Landing() {
  return (
    <div className="flex flex-col lg:px-48 md:px-32 sm:px-16 min-h-screen">
      <Navbar nav={"hero"}/>
      <main className="flex-1 flex items-center justify-start">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>
      </main>
    </div>
  );
}
