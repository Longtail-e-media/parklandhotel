import { Wifi, Bell, ShieldCheck, Car, Bike, Banknote, Music, Users, type LucideIcon } from "lucide-react";
import { amenities } from "@/data/data";

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
    <section className="bg-luxury-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="luxury-label text-gold text-center mb-14 animate-fade-in-up">
          The Essentials, Taken Care Of
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10 animate-fade-in-up">
          {amenities.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.label}
                className="border-r border-b border-white/10 flex flex-col items-center justify-center gap-3 text-center p-8 hover:bg-white/[0.04] transition-colors"
              >
                {Icon && <Icon className="w-5 h-5 text-gold" />}
                <p className="luxury-label text-[11px] text-white/75">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
