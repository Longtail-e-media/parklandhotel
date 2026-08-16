import Image from "next/image";
import Link from "next/link";
import { BedDouble, ShieldCheck, Waves, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { aboutPage } from "@/data/data";

const ICONS: Record<string, LucideIcon> = {
  bed: BedDouble,
  "shield-check": ShieldCheck,
  waves: Waves,
  utensils: UtensilsCrossed,
};

export default function FacilitiesShowcase() {
  const { facilities } = aboutPage;

  return (
    <section className="relative py-20 lg:py-28">
      {/* Tinted panel behind the copy only — on large screens it stops short
          of the right edge so the photograph overhangs it. */}
      <div
        aria-hidden="true"
        className="absolute left-0 inset-y-0 lg:inset-y-14 w-full lg:w-[64%] bg-[#f2f1ee]"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        {/* --- Copy + facility grid ------------------------------------- */}
        <div className="animate-fade-in-up">
          <p className="luxury-eyebrow luxury-label text-gold-text mb-5">{facilities.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-12">{facilities.title}</h2>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
            {facilities.items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <div key={item.title} className="group">
                  {Icon && (
                    <Icon
                      className="w-11 h-11 text-gold-text transition-transform duration-500 group-hover:-translate-y-1"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="font-display text-xl text-luxury-charcoal mt-6 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-luxury-muted leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          <Link href="/#rooms" className="luxury-btn luxury-btn-accent mt-12">
            View Our Rooms
          </Link>
        </div>

        {/* --- Photograph ----------------------------------------------- */}
        <div className="luxury-media luxury-img-zoom relative aspect-4/5 lg:aspect-auto lg:min-h-[36rem] animate-fade-in-up delay-100">
          <Image
            src={facilities.image}
            alt="Premier room interior at Hotel Parkland"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
