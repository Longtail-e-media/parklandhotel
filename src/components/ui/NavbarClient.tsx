"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import type { NavItem } from "@/types";
import Image from 'next/image';

interface NavbarClientProps {
  menu: NavItem[];
  /** Dark/colour logo lockup — shown on the solid (white) header state. */
  logoDark: string;
  /** Light logo — shown on the transparent header state atop the hero. */
  logoLight: string;
  phone: string;
  phoneHref: string;
  /** Absolute booking-engine URL, or a `tel:` fallback when none is configured. */
  bookingUrl: string;
  email: string;
}

export default function NavbarClient({ menu, logoDark, logoLight, phone, phoneHref, bookingUrl, email }: NavbarClientProps) {
  const isExternalBooking = bookingUrl.startsWith("http");
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
              src={isTransparentPage ? ( isScrolled ? logoDark : logoLight) : logoDark}
              alt="Company Logo"
              width={200}
              height={200}
              priority
               unoptimized
              />
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={phoneHref}
            className={`hidden md:inline-flex text-sm transition-colors  ${
              isSolid ? "text-luxury-charcoal" : "text-white"
            }`}
          >
            {phone}
          </a>
          <a
            href={bookingUrl}
            {...(isExternalBooking ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="hidden sm:inline-flex luxury-btn luxury-btn-solid !py-3 !px-6"
          >
            Book Now
          </a>
          {/* Menu lives in the off-canvas drawer at every breakpoint — eight
              items with long labels won't fit inline without wrapping. */}
          <button
            className={`p-2 -mr-2 rounded-full cursor-pointer transition-colors duration-200 hover:text-amber-200 ${
              isSolid
                ? "text-luxury-charcoal hover:bg-luxury-charcoal/5"
                : "text-white hover:bg-white/15"
            }`}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <i className="fa-solid fa-bars text-2xl" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menu={menu}
        phone={phone}
        phoneHref={phoneHref}
        bookingUrl={bookingUrl}
        email={email}
      />
    </header>
  );
}
