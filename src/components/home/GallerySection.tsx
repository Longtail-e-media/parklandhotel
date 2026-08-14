import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

export default function GallerySection() {
  return (
    <section id="gallery" className="relative overflow-hidden  scroll-mt-24">
      <Watermark
        motif="tree"
        className="w-40 lg:w-56 -left-12 bottom-24 text-gold/6"
        rotate={5}
        duration={20}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 animate-fade-in-up">
          <div>
            <p className="luxury-eyebrow luxury-label text-gold-text mb-5">Gallery</p>
            <h2 className="luxury-section-title text-luxury-charcoal">A Glimpse of Parkland</h2>
          </div>
          <Link href="#contact" className="luxury-btn luxury-btn-dark">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
          {gallery.map((img, i) => (
            <div
              key={img.src}
              className={`relative h-64 overflow-hidden rounded-3xl ${
                i === 0 || i === 3 ? "md:row-span-2 md:h-full" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
