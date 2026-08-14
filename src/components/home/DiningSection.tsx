import Image from "next/image";
import { Check } from "lucide-react";
import { dining } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

export default function DiningSection() {
  return (
    <section id="dining" className="relative py-24 lg:py-32 overflow-hidden scroll-mt-24">
      <Watermark
        motif="grass"
        className="w-56 lg:w-80 left-[4%] bottom-6 text-gold/6"
        rotate={-4}
        duration={19}
      />
      <Watermark
        motif="leaf"
        className="w-20 lg:w-28 right-[14%] top-16 text-luxury-charcoal/5"
        rotate={-22}
        duration={14}
        delay={1}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-slide-in-left">
          <div className="aspect-4/5 luxury-media luxury-img-zoom">
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
          <p className="luxury-eyebrow luxury-label text-gold-text mb-6">{dining.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-6">{dining.title}</h2>
          <p className="text-luxury-muted leading-relaxed mb-8">{dining.paragraph}</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {dining.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-luxury-muted text-sm border border-hairline rounded-full px-5 py-3"
              >
                <Check className="w-4 h-4 text-gold shrink-0" /> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
