import Image from "next/image";
import { Check } from "lucide-react";
import { dining } from "@/data/data";

export default function DiningSection() {
  return (
    <section id="dining" className="bg-luxury-cream py-24 lg:py-32 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-slide-in-left">
          <div className="aspect-4/5 overflow-hidden luxury-img-zoom">
            <Image
              src={dining.image}
              alt="Outdoor dining terrace at Hotel Parkland"
              width={700}
              height={875}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="animate-slide-in-right">
          <p className="luxury-label text-gold-text mb-5">{dining.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-6">{dining.title}</h2>
          <p className="text-luxury-muted leading-relaxed mb-5">{dining.paragraph}</p>
          <ul className="space-y-3 text-luxury-muted text-sm">
            {dining.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-gold shrink-0" /> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
