"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function DiningGallery({ images, name }: { images: string[]; name: string }) {
  return (
    <div
      className="relative"
      style={
        {
          "--swiper-pagination-color": "var(--luxury-gold)",
          "--swiper-pagination-bullet-inactive-color": "var(--luxury-charcoal)",
          "--swiper-pagination-bullet-inactive-opacity": "0.2",
        } as React.CSSProperties
      }
    >
      <Swiper
        modules={[Navigation, Keyboard, Pagination]}
        keyboard={{ enabled: true }}
        navigation={{ prevEl: ".dining-gallery-prev", nextEl: ".dining-gallery-next" }}
        pagination={{ clickable: true, el: ".dining-gallery-pagination" }}
        a11y={{ containerMessage: `${name} photos` }}
        className="luxury-media"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            <div className="aspect-4/5">
              <Image
                src={src}
                alt={`${name} — photo ${i + 1}`}
                width={700}
                height={875}
                className="w-full h-full object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}

        {images.length > 1 && (
          <div slot="container-end" className="flex items-center justify-between gap-4 my-5">
            <div className="dining-gallery-pagination flex items-center gap-2 static! w-auto!" />
            <div className="flex items-center gap-3 me-1">
              <button
                type="button"
                aria-label="Previous photo"
                className="testimonial-nav-btn dining-gallery-prev w-10! h-10! hover:bg-(--color-primary-green) hover:cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-base" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                className="testimonial-nav-btn dining-gallery-next w-10! h-10! hover:bg-(--color-primary-green) hover:cursor-pointer border-0"
              >
                <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </Swiper>
    </div>
  );
}
