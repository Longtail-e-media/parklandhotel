"use client";

import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonials } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Watermark
        motif="fern"
        className="w-28 lg:w-40 right-[4%] bottom-16 text-gold/6"
        rotate={-14}
        duration={18}
      />
      <Watermark
        motif="paw"
        className="w-14 lg:w-20 left-[8%] top-20 text-luxury-charcoal/5"
        rotate={-16}
        duration={14}
        delay={1.1}
        flip
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">Guest Stories</p>
          <h2 className="luxury-section-title text-luxury-charcoal">In their words</h2>
          <p className="text-luxury-muted mt-5">Real words from real stays, via TripAdvisor.</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={testimonials.length > 2}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          a11y={{ containerMessage: "Guest testimonials" }}
          className="testimonial-swiper !pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.author} className="!h-auto">
              <figure className="relative h-full luxury-surface p-9 lg:p-10">
                <p aria-hidden className="absolute top-5 right-8 text-7xl leading-none text-gold/15 font-serif">
                  &rdquo;
                </p>
                <div className="relative flex gap-0.5 text-(--color-rating) mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5" fill="currentColor" />
                  ))}
                </div>
                <blockquote className="relative text-luxury-charcoal/80 leading-8 mb-7">
                  {t.quote}
                </blockquote>
                <figcaption className="relative flex items-center gap-4 border-t border-hairline pt-6">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full border border-hairline luxury-hero-title text-base text-gold shrink-0">
                    {t.author.trim().charAt(0)}
                  </span>
                  <span>
                    <span className="block luxury-section-title text-lg">{t.author}</span>
                    <span className="block luxury-label text-[10px] text-luxury-muted mt-1">{t.source}</span>
                  </span>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
