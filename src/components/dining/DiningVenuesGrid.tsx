import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { diningPage } from "@/data/data";

export default function DiningVenuesGrid() {
  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-3 gap-8 animate-fade-in-up delay-300">
          {diningPage.venues.map((venue) => (
            <Link
              key={venue.slug}
              href={`/dining-bar/${venue.slug}`}
              className="group luxury-surface overflow-hidden flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden luxury-img-zoom">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 flex flex-col grow">

                <h3 className="luxury-section-title text-2xl">{venue.name}</h3>
                <p className="mt-4  grow">{venue.excerpt}</p>
                <p className="flex items-center gap-2 text-xs text-luxury-muted mt-5">
                  <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden /> {venue.hours}
                </p>
                <span className="inline-flex items-center gap-2 brown-btn luxury-label text-[11px] mt-5 group-hover:gap-3 transition-all">
                  View Details <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
