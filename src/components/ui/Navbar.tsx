"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { navItems } from "@/data/data";
import { contact } from "@/config/site";
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only the homepage opens on a full-bleed video, so only there can the header
  // start out white-on-transparent. Inner pages begin on the white canvas and
  // need the solid treatment from the first pixel or the nav is invisible.
  const isTransparentPage = pathname === "/";
  const isSolid = isScrolled || !isTransparentPage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isSolid ? "bg-white/85 backdrop-blur-md border-b border-hairline" : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-20" : "h-24"
        }`}

      >
        <Link
          href="/"
          className={`luxury-hero-title text-2xl  lg:text-[1.7rem] transition-colors ${
            isSolid ? "text-luxury-charcoal" : "text-white"
          }`}
        >
                <Image
              src={isScrolled ? "/img/logo2.png" : "/img/logo.png"}
              alt="Company Logo"
              width={200}
              height={200}
              priority
               unoptimized
              />
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${contact.phoneE164}`}
            className={`hidden md:inline-flex text-sm transition-colors  ${
              isSolid ? "text-luxury-charcoal" : "text-white"
            }`}
          >
            {contact.phone}
          </a>
          <Link href="#book" className="hidden sm:inline-flex luxury-btn luxury-btn-solid !py-3 !px-6">
            Book Now
          </Link>
          {/* Menu lives in the off-canvas drawer at every breakpoint — eight
              items with long labels won't fit inline without wrapping. */}
          <button
            className={`p-2 -mr-2 rounded-full cursor-pointer transition-colors duration-200 hover:text-gold ${
              isSolid
                ? "text-luxury-charcoal hover:bg-luxury-charcoal/5"
                : "text-white hover:bg-white/15"
            }`}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menu={navItems}
      />
    </header>
  );
}
