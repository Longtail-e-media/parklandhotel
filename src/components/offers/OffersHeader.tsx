import { offersPage } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

/**
 * Typographic page header — no banner image, so the top padding here is what
 * clears the fixed navbar (h-24 / h-20 once scrolled).
 */
export default function OffersHeader() {
  const { header, intro } = offersPage;

  return (
    <section className="relative overflow-hidden pt-36 lg:pt-44 pb-4 lg:pb-8">
      <Watermark
        motif="leaf"
        className="w-28 lg:w-40 -left-8 top-10 text-gold/7"
        rotate={16}
        duration={17}
      />
      <Watermark
        motif="deer"
        className="w-28 lg:w-40 right-[7%] bottom-2 text-luxury-charcoal/5"
        rotate={-8}
        duration={14}
        delay={1.6}
      />
      <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
        <p className="luxury-eyebrow luxury-eyebrow-center justify-center luxury-label text-gold-text mb-5 animate-fade-in-up delay-100">
          {header.eyebrow}
        </p>
        <h2 className="luxury-hero-title text-luxury-charcoal animate-fade-in-up delay-200 text-4xl">
          {header.title}
        </h2>
        <p className="text-luxury-muted mt-5 animate-fade-in-up delay-300">{intro}</p>
      </div>
    </section>
  );
}
