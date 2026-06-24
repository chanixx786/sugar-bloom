import Hero from "./landing/landing-hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between dark:bg-black sm:items-start">
        <Hero />
      </main>
    </div>
  );
}
