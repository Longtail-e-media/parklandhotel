"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { nearby, experiencesPage } from "@/data/data";
import { address, site } from "@/config/site";

const HOTEL_QUERY = `${site.name}, ${address.full}`;

/** Keyless Google Maps embed — no API key or billing account needed. */
function embedSrc(query: string, zoom: number) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=en&output=embed`;
}

function mapsLink(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function DestinationSection() {
  const { destination } = experiencesPage;
  // `null` = the hotel itself, which is what the map shows on first paint.
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const active = nearby.find((item) => item.title === activeTitle);
  const query = active ? active.query : HOTEL_QUERY;

  return (
    <section id="destination" className="relative overflow-hidden scroll-mt-24 after:absolute after:left-0 after:bottom-0
    after:w-40 after:h-40 after:-z-10 after:opacity-45
    after:bg-[url('/img/map.png')]
    after:bg-contain after:bg-no-repeat after:bg-right-bottom
    after:pointer-events-none">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">{destination.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal">{destination.title}</h2>
          <p className="text-luxury-muted mt-5">{destination.intro}</p>
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
                        ? "border-gold bg-amber-100/95 shadow-[0_14px_36px_-24px_rgba(36,36,32,0.45)]"
                        : "border-hairline bg-luxury-cream hover:border-soft hover:bg-luxury-cream-alt"
                    }`}
                  >
                    <h3 className="font-display text-xl text-luxury-charcoal leading-snug">
                      {item.title}
                    </h3>
                    <span className="mt-1.5 flex items-center gap-2 text-sm text-luxury-muted">
                      Distance: {item.distance}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-300 ${
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
