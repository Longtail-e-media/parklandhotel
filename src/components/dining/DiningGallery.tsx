"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Keyboard } from "swiper/modules";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";

export default function DiningGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <div
      className="relative min-w-0 w-full max-w-full overflow-hidden"
      style={{} as React.CSSProperties}
    >
      <Swiper
        modules={[Keyboard]}
        keyboard={{ enabled: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        a11y={{ containerMessage: `${name} photos` }}
        className="luxury-media min-w-0 w-full max-w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src} className="min-w-0 max-w-full overflow-hidden">
            <div className="relative aspect-4/5 w-full max-w-full overflow-hidden">
              <Image
                src={src}
                alt={`${name} — photo ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}

        {images.length > 1 && (
          <div
            slot="container-end"
            className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-3 pointer-events-none"
          >
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => swiperRef.current?.slidePrev()}
              className="testimonial-nav-btn dining-gallery-prev pointer-events-auto w-10! h-10! hover:bg-(--color-primary-green) hover:cursor-pointer"
            >
              <i
                className="fa-solid fa-arrow-left text-base"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => swiperRef.current?.slideNext()}
              className="testimonial-nav-btn dining-gallery-next pointer-events-auto w-10! h-10! hover:bg-(--color-primary-green) hover:cursor-pointer border-0"
            >
              <i
                className="fa-solid fa-arrow-right text-base"
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </Swiper>
    </div>
  );
}
