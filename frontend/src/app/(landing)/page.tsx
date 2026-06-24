import Hero from "./landing-hero";

export default function Landing() {
    return (
        <div >
            <main className="lg:px-48 md:px-32 sm:px-16 h-screen">
                {/* Hero Section */}
                <section>
                    <Hero />
                </section>

            </main>
        </div>
    )
}