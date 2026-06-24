import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Navbar({nav}: {nav: string}) {
  return (
    <header className="sticky top-0 z-50">
      <nav className="w-full flex items-center justify-between py-6">
        <a
          href="#"
          className="flex items-center select-none"
        >
          <Image
            src="/assets/sbImage.png"
            alt="Sugar Bloom Logo"
            width={160}
            height={80}
            className="w-20 md:w-24 h-auto select-none"
            priority
          />
          <span className="font-dancing text-2xl text-primary font-bold">Sugar Bloom</span>
        </a>
        <ul className="flex items-center gap-8">
            <li><Link href="#hero" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</Link></li>
            <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Collections</Link></li>
            <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</Link></li>
            <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Gallery</Link></li>    
            <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</Link></li>    
        </ul>
        <div>
          <Link href="/login" className="mr-4">
            <Button className="px-6">Login</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
