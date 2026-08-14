import Image from "next/image";
import { about } from "@/data/data";

export default function AboutSection() {
  return (
    <section id="about" className="bg-luxury-cream py-24 lg:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 animate-slide-in-left">
          <p className="luxury-label text-gold-text mb-5">{about.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-6">
            {about.title}
          </h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-luxury-muted leading-relaxed mb-5 last:mb-10">
              {p}
            </p>
          ))}

          <div className="grid grid-cols-3 gap-6 border-t border-luxury-border pt-8">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <p className="luxury-hero-title text-3xl text-gold">{stat.value}</p>
                <p className="luxury-label text-[10px] text-luxury-muted mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 relative animate-slide-in-right">
          <div className="aspect-4/5 overflow-hidden luxury-img-zoom">
            <Image
              src={about.image}
              alt="Mature tropical gardens at Hotel Parkland"
              width={700}
              height={875}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block absolute -bottom-8 -left-8 w-40 h-40 border border-gold/40 -z-10" />
        </div>
      </div>
    </section>
  );
}
