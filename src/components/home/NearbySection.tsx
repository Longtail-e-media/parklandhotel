import Image from "next/image";
import { nearby } from "@/data/data";

export default function NearbySection() {
  return (
    <section id="nearby" className="bg-luxury-cream-alt py-24 lg:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">Beyond The Gates</p>
          <h2 className="luxury-section-title text-luxury-charcoal">Worth The Trip</h2>
          <p className="text-luxury-muted mt-5">
            Sauraha&rsquo;s edge-of-the-jungle setting puts a handful of Chitwan&rsquo;s best-known sights
            within easy reach.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearby.map((item) => (
            <div key={item.title} className="group animate-fade-in-up">
              <div className="relative aspect-4/5 overflow-hidden luxury-img-zoom">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-luxury-cream/95 text-luxury-charcoal luxury-label text-[10px] px-3 py-1.5">
                  {item.badge}
                </span>
              </div>
              <div className="pt-5">
                <h3 className="luxury-section-title text-xl">{item.title}</h3>
                <p className="text-luxury-muted text-sm mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
