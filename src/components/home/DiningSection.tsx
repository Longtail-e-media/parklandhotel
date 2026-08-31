import Image from "next/image";
import { dining } from "@/data/data";
import { getDiningPackage, getDiningVenues, stripHtml } from "@/lib/data";
import Watermark from "@/components/ui/Watermark";

export default async function DiningSection() {
  const [diningPackage, venues] = await Promise.all([getDiningPackage(), getDiningVenues()]);

  const title = diningPackage?.title ? stripHtml(diningPackage.title) : dining.title;
  const paragraph = diningPackage?.description ? stripHtml(diningPackage.description) : dining.paragraph;
  const image = diningPackage?.banner_img?.[0]?.url || dining.image;
  const features =
    venues.length > 0 ? venues.map((v) => ({ title: v.name, description: v.excerpt })) : dining.features;

  return (
    <section id="dining" className="relative  overflow-hidden scroll-mt-24">
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
              src={image}
              alt="Outdoor dining terrace at Hotel Parkland"
              width={700}
              height={875}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="animate-slide-in-right">
          <p className="luxury-eyebrow luxury-label text-gold-text mb-6">{dining.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-6">{title}</h2>
          <p className="text-luxury-muted leading-relaxed mb-8 whitespace-pre-line">{paragraph}</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex  gap-3 text-luxury-muted text-sm border border-hairline rounded-full px-5 py-3"
              >
                <div className="wrapper">
                  <p><span className="block">{feature.title}</span>{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
