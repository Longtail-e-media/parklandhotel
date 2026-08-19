import Image from "next/image";
import { experiencesPage } from "@/data/data";
import Watermark, { type Motif } from "@/components/ui/Watermark";

/** Cycled per row so four stacked sections don't repeat the same motif twice in a row. */
const ROW_WATERMARKS: { motif: Motif; className: string; rotate: number }[] = [
  { motif: "deer", className: "w-40 lg:w-56 left-[6%] bottom-6 text-luxury-charcoal/5", rotate: -5 },
  { motif: "fern", className: "w-28 lg:w-40 right-[6%] top-10 text-gold/6", rotate: 12 },
  { motif: "paw", className: "w-16 lg:w-24 right-[10%] bottom-10 text-luxury-charcoal/5", rotate: 18 },
  { motif: "palm", className: "w-24 lg:w-32 left-[8%] top-8 text-gold/6", rotate: -10 },
];

export default function ExperienceRows() {
  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col gap-20 lg:gap-28">
        {experiencesPage.experiences.map((item, i) => {
          const imageLeft = i % 2 === 1;
          const wm = ROW_WATERMARKS[i % ROW_WATERMARKS.length];

          const copyClass = imageLeft
            ? "order-2 animate-slide-in-right"
            : "order-2 lg:order-1 animate-slide-in-left";
          const mediaClass = imageLeft
            ? "order-1 animate-slide-in-left"
            : "order-1 lg:order-2 animate-slide-in-right";

          return (
            <div key={item.title} className="relative overflow-hidden">
              <Watermark motif={wm.motif} className={wm.className} rotate={wm.rotate} duration={16 + i} />

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={copyClass}>
                  <p className="luxury-eyebrow luxury-label text-gold-text mb-6">{item.eyebrow}</p>
                  <h2 className="luxury-section-title text-luxury-charcoal mb-6 text-3xl lg:text-4xl">
                    &ldquo;{item.title}&rdquo;
                  </h2>
                  <p className="text-luxury-muted leading-relaxed">{item.description}</p>
                </div>

                <div className={`relative ${mediaClass}`}>
                  <div className="aspect-4/5 luxury-media luxury-img-zoom">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={700}
                      height={875}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
