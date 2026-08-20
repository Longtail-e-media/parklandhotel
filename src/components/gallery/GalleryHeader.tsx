import { galleryPage } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

/**
 * Typographic page header — no banner image, so the top padding here is what
 * clears the fixed navbar (h-24 / h-20 once scrolled).
 */
export default function GalleryHeader() {
  const { header } = galleryPage;

  return (
    <section className="relative overflow-hidden pt-36 lg:pt-44 pb-4 lg:pb-8">
      <Watermark
        motif="tree"
        className="w-32 lg:w-44 -left-10 top-6 text-gold/6"
        rotate={-6}
        duration={18}
      />
      <Watermark
        motif="paw"
        className="w-20 lg:w-28 right-[10%] bottom-6 text-luxury-charcoal/5"
        rotate={12}
        duration={13}
        delay={0.8}
      />
      <div className="mx-auto px-6 lg:px-10 text-center">
        <p className="luxury-eyebrow luxury-eyebrow-center justify-center luxury-label text-gold-text mb-5 animate-fade-in-up delay-100">
          {header.eyebrow}
        </p>
        <h2 className="luxury-hero-title text-luxury-charcoal animate-fade-in-up delay-200 text-4xl">
          {header.title}
        </h2>
      </div>
    </section>
  );
}
