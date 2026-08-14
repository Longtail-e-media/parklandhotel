"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { nearby } from "@/data/data";
import { address, site } from "@/config/site";
import Watermark from "@/components/ui/Watermark";

const HOTEL_QUERY = `${site.name}, ${address.full}`;

/** Keyless Google Maps embed — no API key or billing account needed. */
function embedSrc(query: string, zoom: number) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=en&output=embed`;
}

function mapsLink(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function NearbySection() {
  // `null` = the hotel itself, which is what the map shows on first paint.
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const active = nearby.find((item) => item.title === activeTitle);
  const query = active ? active.query : HOTEL_QUERY;

  return (
    <section id="nearby" className="relative overflow-hidden py-24 lg:py-32 scroll-mt-24">
      <Watermark
        motif="rhino"
        className="w-56 lg:w-80 -right-16 bottom-12 text-gold/6"
        rotate={4}
        duration={23}
        flip
      />
      <Watermark
        motif="tree"
        className="w-32 lg:w-48 left-[3%] top-20 text-luxury-charcoal/4"
        rotate={-6}
        duration={18}
        delay={1.6}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">Beyond The Gates</p>
          <h2 className="luxury-section-title text-luxury-charcoal">Nearby Landmarks</h2>
          <p className="text-luxury-muted mt-5">
            Sauraha&rsquo;s edge-of-the-jungle setting puts a handful of Chitwan&rsquo;s best-known sights
            within easy reach. Pick a landmark to place it on the map.
          </p>
        </div>

        <div className="grid lg:grid-cols-[22rem_1fr] xl:grid-cols-[24rem_1fr] gap-6 lg:gap-8 animate-fade-in-up delay-100">
          {/* --- Landmark list ------------------------------------------- */}
          <ul className="luxury-scroll h-88 lg:h-128 overflow-y-auto pr-3 space-y-3">
            {nearby.map((item) => {
              const isActive = item.title === activeTitle;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setActiveTitle(isActive ? null : item.title)}
                    aria-pressed={isActive}
                    className={`group w-full text-left rounded-2xl border px-6 py-5 transition-all duration-300 ${
                      isActive
                        ? "border-gold bg-luxury-cream-alt shadow-[0_14px_36px_-24px_rgba(36,36,32,0.45)]"
                        : "border-hairline bg-luxury-cream hover:border-soft hover:bg-luxury-cream-alt"
                    }`}
                  >
                    <h3 className="font-display text-xl text-luxury-charcoal leading-snug">
                      {item.title}
                    </h3>
                    <span className="mt-1.5 flex items-center gap-2 text-sm text-luxury-muted">
                      Distance: {item.distance}
                      <ArrowRight
                        className={`w-4 h-4 text-gold transition-transform duration-300 ${
                          isActive ? "translate-x-1" : "group-hover:translate-x-1"
                        }`}
                      />
                    </span>
                    {isActive && (
                      <p className="mt-3 text-sm text-luxury-muted leading-relaxed border-t border-hairline pt-3">
                        {item.description}
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* --- Map ------------------------------------------------------ */}
          <div className="relative h-88 lg:h-128 luxury-media border border-hairline">
            <iframe
              // Remount on change so the embed re-centres instead of caching the first place.
              key={query}
              src={embedSrc(query, active ? 14 : 15)}
              title={`Map showing ${active ? active.title : site.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
            />
            <a
              href={mapsLink(query)}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2.5 luxury-label text-[10px] text-luxury-charcoal shadow-[0_8px_24px_-12px_rgba(36,36,32,0.5)] hover:text-gold-text transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-gold" />
              Open In Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
