"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { PopupSlide } from "@/lib/data";

import "swiper/css";
import "swiper/css/navigation";

/** Delay before the promo popup opens on homepage load, in milliseconds. */
const OPEN_DELAY_MS = 2500;

const SIZE_CLASSES: Record<PopupSlide["orientation"], string> = {
  vertical: "w-[85vw] sm:w-[380px] aspect-3/4",
  horizontal: "w-[90vw] sm:w-[600px] lg:w-[720px] aspect-16/9",
  square: "w-[85vw] sm:w-[420px] aspect-square",
};

/**
 * Promotional popup shown automatically on the homepage. Opens on every
 * visit (no dismissal persistence) after a short delay. Portaled to
 * document.body so its fixed backdrop isn't confined by an ancestor's
 * transform, same reasoning as EnquiryModal.
 */
export default function HomePromoPopupClient({ slides }: { slides: PopupSlide[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleSlides = slides.length > 1;

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

  const activeSlide = slides[activeIndex] ?? slides[0];
  const sizeClass = SIZE_CLASSES[activeSlide.orientation];

  return createPortal(
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className="absolute inset-0 bg-luxury-dark/60 backdrop-blur-sm animate-fade-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={activeSlide.title}
        className={`relative bg-white overflow-hidden animate-fade-in-up ${sizeClass}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer bg-white/90 text-luxury-charcoal hover:bg-white transition-colors"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".promo-popup-prev", nextEl: ".promo-popup-next" }}
          loop={hasMultipleSlides}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          a11y={{ containerMessage: "Promotional offers" }}
          className="h-full w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className="h-full w-full">
              {slide.type === "video" && slide.videoSrc ? (
                <iframe
                  src={slide.videoSrc.includes("?") ? `${slide.videoSrc}&autoplay=1&mute=1` : `${slide.videoSrc}?autoplay=1&mute=1`}
                  title={slide.title}
                  className="w-full h-full bg-black"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <PopupSlideImage slide={slide} />
              )}
            </SwiperSlide>
          ))}

          {hasMultipleSlides && (
            <div slot="container-end">
              <button
                type="button"
                aria-label="Previous offer"
                className="promo-popup-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-luxury-charcoal transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next offer"
                className="promo-popup-next absolute top-1/2 right-2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-luxury-charcoal transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
              </button>
            </div>
          )}
        </Swiper>
      </div>
    </div>,
    document.body
  );
}

function PopupSlideImage({ slide }: { slide: PopupSlide }) {
  if (!slide.image) return null;

  const image = (
    <Image
      src={slide.image}
      alt={slide.alt || slide.title}
      fill
      sizes="(max-width: 640px) 85vw, 420px"
      className="object-cover"
      priority
    />
  );

  if (!slide.href) {
    return <div className="relative w-full h-full">{image}</div>;
  }

  const isExternal = /^https?:\/\//i.test(slide.href);
  return (
    <div className="relative w-full h-full">
      {isExternal ? (
        <a href={slide.href} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          {image}
        </a>
      ) : (
        <Link href={slide.href} className="block w-full h-full">
          {image}
        </Link>
      )}
    </div>
  );
}
