import Image from "next/image";
import { about } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden pt-30  scroll-mt-24">
      <Watermark
        motif="fern"
        className="w-40 lg:w-64 -left-10 top-16 text-gold/7"
        rotate={-8}
        duration={18}
      />
      <Watermark
        motif="bird"
        className="w-28 lg:w-40 right-[12%] top-10 text-luxury-charcoal/5"
        rotate={-6}
        duration={13}
        delay={1.5}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center pb-10">
        <div className="order-2 lg:order-1 animate-slide-in-left">
          <p className="luxury-eyebrow luxury-label text-gold-text mb-6">{about.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-6">
            {about.title}
          </h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-luxury-muted leading-relaxed mb-5 last:mb-10">
              {p}
            </p>
          ))}

          <div className="grid grid-cols-3 gap-6 border-t border-hairline pt-8">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl">{stat.value}</p>
                <p className="luxury-label text-[10px] text-luxury-muted mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 relative animate-slide-in-right">
          <div className="aspect-4/5 luxury-media luxury-img-zoom">
            <Image
              src={about.image}
              alt="Mature tropical gardens at Hotel Parkland"
              width={700}
              height={875}
              className="w-full h-full object-cover"
            />
          </div>
          {/* floating stat chip instead of the old offset square outline */}
          <div className="hidden md:flex absolute -bottom-7 -left-7 flex-col items-center justify-center w-32 h-32 rounded-full bg-white border border-hairline shadow-[0_18px_50px_-24px_rgba(36,36,32,0.35)]">
            <span className="luxury-hero-title text-2xl leading-none">1987</span>
            <span className="luxury-label text-[9px] text-luxury-muted mt-2">Established</span>
          </div>
        </div>
      </div>
    </section>
  );
}
