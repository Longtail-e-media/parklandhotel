import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/data/data";

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-luxury-cream py-24 lg:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 animate-fade-in-up">
          <div>
            <p className="luxury-label text-gold-text mb-5">Gallery</p>
            <h2 className="luxury-section-title text-luxury-charcoal">A Glimpse of Parkland</h2>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-gold-text luxury-label text-[11px] hover:gap-3 transition-all"
          >
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
          {gallery.map((img, i) => (
            <div
              key={img.src}
              className={`relative h-64 ${i === 0 || i === 3 ? "md:row-span-2 md:h-full" : ""}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
