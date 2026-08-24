"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Delay before the promo popup opens on homepage load, in milliseconds. */
const OPEN_DELAY_MS = 2500;

/**
 * Promotional popup shown automatically on the homepage. Opens on every
 * visit (no dismissal persistence) after a short delay. Portaled to
 * document.body so its fixed backdrop isn't confined by an ancestor's
 * transform, same reasoning as EnquiryModal.
 */
export default function HomePromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className="absolute inset-0 bg-luxury-dark/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-promo-title"
        className="relative w-full max-w-sm bg-white overflow-hidden"
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full cursor-pointer bg-white/90 text-luxury-charcoal hover:bg-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-4/5">
          <Image
            src="/img/pool.jpg"
            alt="Hotel Parkland"
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover"
          />
        </div>

        <div className="p-6 text-center">
          <p className="luxury-label text-gold-text mb-2">Limited Time</p>
          <h2 id="home-promo-title" className="luxury-section-title text-xl text-luxury-charcoal">
            Discover Hotel Parkland
          </h2>
          <p className="text-sm text-luxury-muted mt-3 leading-relaxed">
            Seasonal dining events and stay packages, running for a limited time.
          </p>
          <Link
            href="/offers"
            onClick={() => setIsOpen(false)}
            className="luxury-btn mt-6 inline-flex cursor-pointer bg-(--color-primary-green) text-white"
          >
            View Offers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
