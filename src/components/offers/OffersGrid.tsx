"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarClock } from "lucide-react";
import { offersPage } from "@/data/data";
import type { OfferItem } from "@/types";
import { formatOfferExpiry } from "@/lib/offers";
import OfferModal from "./OfferModal";

function OfferCard({ offer, priority, onSelect }: { offer: OfferItem; priority: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group luxury-surface luxury-card-hover overflow-hidden text-left cursor-pointer"
    >
      <div className="relative aspect-4/5 overflow-hidden luxury-img-zoom">
        <Image
          src={offer.image}
          alt={offer.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm luxury-label text-[10px] text-luxury-charcoal px-3.5 py-2 rounded-lg shadow-[0_10px_30px_-16px_rgba(36,36,32,0.7)]">
          <CalendarClock className="w-3 h-3" aria-hidden />
          Expires {formatOfferExpiry(offer.expiryDate)}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-luxury-dark/85 via-luxury-dark/20 to-transparent px-5 pt-10 pb-5">
          <p className="text-white font-display text-lg leading-tight">{offer.name}</p>
          {offer.price && <p className="text-white/80 text-xs mt-1">{offer.price}</p>}
        </div>
      </div>
    </button>
  );
}

export default function OffersGrid() {
  const [selected, setSelected] = useState<OfferItem | null>(null);

  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 animate-fade-in-up delay-100">
          {offersPage.items.map((offer, i) => (
            <OfferCard key={offer.slug} offer={offer} priority={i === 0} onSelect={() => setSelected(offer)} />
          ))}
        </div>
      </div>

      <OfferModal offer={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
