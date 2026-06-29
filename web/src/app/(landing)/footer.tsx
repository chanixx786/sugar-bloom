import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary px-6 lg:px-12 py-14">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <Link
          href="#"
          className="flex items-center select-none"
        >
          <Image
            src="/assets/sbImage.png"
            alt="Sugar Bloom Logo"
            width={140}
            height={70}
            className="w-20 md:w-24 h-auto select-none"
            priority
          />
          <span className="font-dancing text-2xl text-secondary font-bold">Sugar Bloom</span>
        </Link>
          <p className="text-sm text-foreground/70 max-w-xs">
            Handcrafted cakes and pastries baked with love for life's sweetest moments.
          </p>
          <div className="flex gap-3 mt-4">
            {/* {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full bg-background/60 hover:bg-background transition-colors">
                <Icon className="h-4 w-4 text-primary" />
              </a>
            ))} */}
          </div>
        </div>
        <div>
          <h4 className="font-serif font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#" className="hover:text-primary">Cakes</a></li>
            <li><a href="#" className="hover:text-primary">Cupcakes</a></li>
            <li><a href="#" className="hover:text-primary">Pastries</a></li>
            <li><a href="#" className="hover:text-primary">Custom Orders</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#about" className="hover:text-primary">About</a></li>
            <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
            <li><a href="#" className="hover:text-primary">Blog</a></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif font-semibold mb-3">Visit Us</h4>
          <address className="not-italic text-sm text-foreground/70 space-y-1">
            <div>123 Baker Street</div>
            <div>Brooklyn, NY 11201</div>
            <div>hello@sugarbloom.co</div>
            <div>+1 (555) 010-0420</div>
          </address>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-background/40 text-xs text-foreground/60 text-center">
        © {new Date().getFullYear()} Sugar Bloom Bakery. All rights reserved.
      </div>
    </footer>
  );
}