import Image from "next/image";
import { leisure } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

export default function LeisureSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <Watermark
        motif="deer"
        className="w-40 lg:w-56 left-[8%] bottom-10 text-luxury-charcoal/5"
        rotate={-5}
        duration={20}
      />
      <Watermark
        motif="fern"
        className="w-28 lg:w-40 right-[6%] top-12 text-gold/6"
        rotate={12}
        duration={16}
        delay={1.2}
        flip
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 animate-slide-in-left">
          <p className="luxury-eyebrow luxury-label text-gold-text mb-6">{leisure.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-6">{leisure.title}</h2>
          {leisure.paragraphs.map((p, i) => (
            <p key={i} className="text-luxury-muted leading-relaxed mb-5 last:mb-0">
              {p}
            </p>
          ))}
        </div>
        <div className="order-1 lg:order-2 relative animate-slide-in-right">
          <div className="aspect-4/5 luxury-media luxury-img-zoom">
            <Image
              src={leisure.image}
              alt="Swimming pool surrounded by gardens"
              width={700}
              height={875}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
