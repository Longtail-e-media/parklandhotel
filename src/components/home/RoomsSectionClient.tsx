"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import type { RoomType } from "@/types";
import Watermark from "@/components/ui/Watermark";

import "swiper/css";
import "swiper/css/navigation";

/** Feature keys used in `rooms` — the stack of icons floating over each photo. */
const ROOM_FEATURES: Record<string, { icon: string; label: string }> = {
  wifi: { icon: "wifi", label: "Complimentary wi-fi" },
  tv: { icon: "tv", label: "Flat-screen TV" },
  breakfast: { icon: "mug-saucer", label: "Breakfast included" },
  ac: { icon: "wind", label: "Air conditioning" },
  bath: { icon: "bath", label: "Ensuite bath" },
};

export default function RoomsSectionClient({ rooms }: { rooms: RoomType[] }) {
  if (rooms.length === 0) return null;

  return (
    <section id="rooms" className="relative overflow-hidden py-24 lg:py-32 scroll-mt-24">
      <Watermark
        motif="leaf"
        className="w-24 lg:w-36 left-[6%] top-24 text-gold/7"
        rotate={14}
        duration={17}
      />
      <Watermark
        motif="palm"
        className="w-48 lg:w-72 -right-16 top-1/3 text-luxury-charcoal/4"
        rotate={6}
        duration={21}
        delay={2}
        flip
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">Rooms &amp; Suites</p>
          <h2 className="luxury-section-title text-luxury-charcoal">A Sanctuary of Refined Comfort </h2>
          <p className="text-luxury-muted mt-5">
Discover beautifully appointed rooms and suites designed to provide an elegant sanctuary after a day of exploring Chitwan. Each accommodation combines contemporary design, premium amenities and thoughtful details to create a refined and relaxing stay.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Keyboard]}
          spaceBetween={32}
          slidesPerView={1}
          keyboard={{ enabled: true }}
          navigation={{ prevEl: ".rooms-prev", nextEl: ".rooms-next" }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          a11y={{ containerMessage: "Rooms and suites" }}
          className="rooms-swiper animate-fade-in-up delay-100"
        >
          {rooms.map((room) => (
            <SwiperSlide key={room.slug} className="h-auto!">
              <article className="group luxury-surface h-full flex flex-col overflow-hidden">
                <div className="relative">
                  <div className="aspect-4/5 overflow-hidden luxury-img-zoom">
                    <Image
                      src={room.image}
                      alt={`${room.name} interior`}
                      width={600}
                      height={750}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Rate badge — top-right corner of the photo */}
                  <p className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-[0_10px_30px_-16px_rgba(36,36,32,0.7)]">
                    <span className=" text-lg text-luxury-charcoal">
                      ${room.pricePerNight}
                    </span>
                    <span className="luxury-label text-[10px] text-luxury-muted ml-1.5">/ night</span>
                  </p>

                  {/* Feature icons — stacked down the right edge, under the badge */}
                  <ul className="absolute top-20 right-5 flex flex-col gap-2">
                    {room.features.map((key, i) => {
                      const feature = ROOM_FEATURES[key.toLowerCase()];
                      const icon = feature?.icon ?? "check";
                      const label = feature?.label ?? key;
                      return (
                        <li
                          key={key}
                          title={label}
                          style={{ transitionDelay: `${i * 70}ms` }}
                          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm text-luxury-charcoal shadow-[0_10px_30px_-18px_rgba(36,36,32,0.8)] transition-all duration-500 hover:bg-gold hover:text-white sm:opacity-0 sm:translate-x-3 sm:group-hover:opacity-100 sm:group-hover:translate-x-0"
                        >
                          <i className={`fa-solid fa-${icon} text-base`} aria-hidden="true" />
                          <span className="sr-only">{label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="p-7 flex flex-col grow">
                  <h3 className="luxury-section-title text-2xl">{room.name}</h3>

                  <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-luxury-muted">
                    <li className="flex items-center gap-2">
                      <i className="fa-solid fa-expand text-base brown-btn" aria-hidden="true" />
                      Size: {room.size}
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fa-solid fa-user text-base brown-btn" aria-hidden="true" />
                      Adults: {room.adults}
                    </li>
                  </ul>

                  <p className="text-luxury-muted  mt-4 leading-relaxed">{room.description}</p>

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 brown-btn luxury-label text-[11px] mt-auto pt-5 hover:gap-3 transition-all"
                  >
                    Book Now <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}

          {/* Sits inside the Swiper so it can hide itself when nothing can scroll */}
          <div slot="container-end" className="rooms-nav flex items-center justify-center gap-3 mt-12">
            <button type="button" aria-label="Previous room" className="rooms-nav-btn rooms-prev">
              <i className="fa-solid fa-arrow-left text-base" aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next room" className="rooms-nav-btn rooms-next">
              <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
            </button>
          </div>
        </Swiper>
      </div>
    </section>
  );
}
