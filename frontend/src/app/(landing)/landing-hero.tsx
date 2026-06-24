import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center overflow-hidden">
      <section className="flex flex-col justify-center items-start w-full max-w-2xl px-4">
        <div className="text-left">
          <h1 className="text-7xl font-bold mb-4">
            Where <span className="font-dancing text-primary">Flavor</span>
          </h1>
          <h1 className="text-7xl font-bold mb-4">
            meets <span className="font-dancing text-primary">Artistry</span>
          </h1>
          <p className="text-lg text-left mb-8 text-gray-500">
            Beautifully crafted cakes with exceptional taste, <br />
            made fresh to elevate every occasion - from quiet <br />
            mornings to milestone celebrations.
          </p>
        </div>
      </section>
      <section className="w-full max-w-2xl px-4">
        <Image
          src="/assets/cupcake.svg"
          alt="Hero Image"
          width={500}
          height={500}
          className="w-full h-auto object-cover"
          priority
        />
      </section>
    </div>
  );
}
