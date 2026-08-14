import { Wifi, Bell, ShieldCheck, Car, Bike, Banknote, Music, Users, type LucideIcon } from "lucide-react";
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
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-4">The Essentials</p>
          <h2 className="luxury-section-title text-luxury-charcoal text-3xl">Taken Care Of</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
          {amenities.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.label}
                className="luxury-surface flex flex-col items-center justify-center gap-4 text-center px-6 py-9"
              >
                {Icon && (
                  <span className="flex items-center justify-center w-12 h-12 rounded-full border border-hairline text-gold">
                    <Icon className="w-5 h-5" />
                  </span>
                )}
                <p className="luxury-label text-[11px] text-luxury-charcoal/70">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
