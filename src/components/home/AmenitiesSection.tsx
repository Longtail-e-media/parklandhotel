import {
  Wifi,
  Bell,
  ShieldCheck,
  Car,
  Bike,
  Banknote,
  Music,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { amenities } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  bell: Bell,
  "shield-check": ShieldCheck,
  car: Car,
  bike: Bike,
  banknote: Banknote,
  music: Music,
  users: Users,
  waves: Waves,
};

export default function AmenitiesSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <Watermark
        motif="palm"
        className="w-40 lg:w-56 left-[5%] top-4 text-gold/6"
        rotate={-8}
        duration={19}
      />
      <Watermark
        motif="bird"
        className="w-24 lg:w-32 right-[8%] bottom-10 text-luxury-charcoal/5"
        rotate={8}
        duration={12}
        delay={0.6}
        flip
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[20rem_1fr] xl:grid-cols-[22rem_1fr] gap-12 lg:gap-16 items-center">
          {/* --- Intro column -------------------------------------------- */}
          <div className="animate-fade-in-up">
            <p className="luxury-label text-gold-text mb-4">The Essentials</p>
            <h2 className="luxury-section-title text-luxury-charcoal">Facilities</h2>
            <p className="text-luxury-muted mt-5 leading-relaxed">
              Everything a stay in the jungle needs, quietly taken care of — from fibre wi-fi and
              private parking to bicycles for the ride out to the elephant stables.
            </p>
            <a href="#contact" className="luxury-btn luxury-btn-accent mt-8">
              Ask About Facilities
            </a>
          </div>

          {/* --- Amenity cards ------------------------------------------- */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 animate-fade-in-up delay-100">
            {amenities.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <div
                  key={item.label}
                  className="group flex flex-col items-center justify-center gap-5 text-center rounded-2xl bg-white px-5 py-10 shadow-[0_12px_40px_-22px_rgba(36,36,32,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_-25px_rgba(36,36,32,0.5)]"
                >
                  {Icon && (
                    <Icon
                      className="w-8 h-8 text-luxury-charcoal transition-colors duration-500 group-hover:text-gold"
                      strokeWidth={1.25}
                    />
                  )}
                  <p className="font-display text-lg text-luxury-charcoal leading-snug">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
