"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Camera,
  Heart,
  Maximize2,
  Star,
  User,
} from "lucide-react";
import { rooms } from "@/data/data";
import type { RoomType } from "@/types";
import Watermark from "@/components/ui/Watermark";

/** Star rating — filled up to the nearest whole star, muted outline beyond. */
function RoomRating({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < filled ? "w-3.5 h-3.5 fill-gold text-gold" : "w-3.5 h-3.5 text-soft"}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </span>
  );
}

function RoomStat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof User;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1.5 sm:flex-row sm:items-center sm:text-left sm:gap-3 min-w-0">
      <span className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-gold-text shrink-0">
        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={1.5} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-luxury-charcoal leading-tight wrap-break-word">{value}</p>
        <p className="text-xs text-luxury-muted mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function RoomCard({ room, priority }: { room: RoomType; priority: boolean }) {
  const [saved, setSaved] = useState(false);
  const photoCount = room.images?.length ?? 1;

  return (
    <article className="group luxury-surface overflow-hidden grid md:grid-cols-2">
      <div className="relative min-h-70 md:min-h-0 overflow-hidden luxury-img-zoom">
        <Image
          src={room.image}
          alt={`${room.name} interior`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />

        {room.featured && (
          <span className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm luxury-label text-[10px] text-luxury-charcoal px-4 py-2 rounded-lg shadow-[0_10px_30px_-16px_rgba(36,36,32,0.7)]">
            Featured
          </span>
        )}

        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${room.name} from saved rooms` : `Save ${room.name}`}
          className="absolute top-5 right-5 flex items-center justify-center w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_10px_30px_-16px_rgba(36,36,32,0.7)] text-luxury-charcoal transition-colors hover:text-gold"
        >
          <Heart className={saved ? "w-4.5 h-4.5 fill-gold text-gold" : "w-4.5 h-4.5"} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      <div className="p-7 sm:p-9 lg:p-10 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="luxury-section-title text-2xl lg:text-[1.75rem]">{room.name}</h3>

          <div className="flex items-center gap-3 shrink-0 pt-1.5">
            <RoomRating rating={room.rating} />
            <span className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-luxury-charcoal text-white shrink-0">
              <Camera className="w-4 h-4" strokeWidth={1.5} aria-hidden />
              {photoCount > 1 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-gold text-[9px] font-semibold text-white">
                  {photoCount}
                </span>
              )}
              <span className="sr-only">{photoCount} photos</span>
            </span>
          </div>
        </div>

        <p className="mt-3">
          <span className="font-display text-xl text-gold-text">${room.pricePerNight}.00</span>
          <span className="luxury-label text-[11px] text-luxury-muted ml-1.5">/ Night</span>
        </p>

        <p className="text-luxury-muted text-sm mt-4 leading-relaxed">{room.description}</p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 bg-luxury-cream-alt/60 rounded-2xl px-4 sm:px-6 py-5">
          <RoomStat icon={User} value={`${room.adults} Person`} label="Guests" />
          <RoomStat icon={BedDouble} value={room.beds} label="Bed Type" />
          <RoomStat icon={Maximize2} value={room.size} label="Room Size" />
        </div>

        <div className="flex items-center justify-between gap-4 mt-auto pt-6">
          <Link
            href={`/accommodations/${room.slug}`}
            className="inline-flex items-center gap-2 brown-btn luxury-label text-[11px] hover:gap-3 transition-all"
          >
            View Details <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
          <Link href="/contact" className="luxury-btn luxury-btn-dark py-2.5! px-5! text-[11px]">
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function RoomsSection() {
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
          <h2 className="luxury-section-title text-luxury-charcoal">Restful Spaces, Reimagined</h2>
          <p className="text-luxury-muted mt-5">
            Thirty-two rooms are being reimagined for our five-star chapter — each pairing warm, natural
            materials with the quiet of the garden beyond the window.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10 animate-fade-in-up delay-100">
          {rooms.map((room, i) => (
            <RoomCard key={room.slug} room={room} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
