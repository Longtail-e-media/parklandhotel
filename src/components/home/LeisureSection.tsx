import Image from "next/image";
import { leisure } from "@/data/data";

export default function LeisureSection() {
  return (
    <section className="bg-luxury-cream-alt py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 animate-slide-in-left">
          <p className="luxury-label text-gold-text mb-5">{leisure.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-6">{leisure.title}</h2>
          {leisure.paragraphs.map((p, i) => (
            <p key={i} className="text-luxury-muted leading-relaxed mb-5 last:mb-0">
              {p}
            </p>
          ))}
        </div>
        <div className="order-1 lg:order-2 relative animate-slide-in-right">
          <div className="aspect-4/5 overflow-hidden luxury-img-zoom">
            <Image
              src={leisure.image}
              alt="Swimming pool surrounded by gardens"
              width={700}
              height={875}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block absolute -bottom-8 -right-8 w-40 h-40 border border-gold/40 -z-10" />
        </div>
      </div>
    </section>
  );
}
