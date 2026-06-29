import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 lg:px-12">
        <Link href="#" className="flex items-center select-none">
          <Image
            src="/assets/sbImage.png"
            alt="Sugar Bloom Logo"
            width={160}
            height={80}
            className="w-20 md:w-24 h-auto select-none"
            priority
          />
          <span className="font-dancing text-2xl text-primary font-bold">
            Sugar Bloom
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#collections"
              className="hover:text-foreground transition-colors"
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#gallery"
              className="hover:text-foreground transition-colors"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
        {/* To Be Discussed (TBD) */}
        {/* <Link href="/login" className="hidden md:block">
          <Button className="rounded-full px-6">Login</Button>
        </Link> */}
      </nav>
    </header>
  );
}
