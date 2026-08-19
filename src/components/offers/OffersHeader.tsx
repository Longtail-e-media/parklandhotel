import { offersPage } from "@/data/data";

/**
 * Typographic page header — no banner image, so the top padding here is what
 * clears the fixed navbar (h-24 / h-20 once scrolled).
 */
export default function OffersHeader() {
  const { header, intro } = offersPage;

  return (
    <section className="pt-36 lg:pt-44 pb-4 lg:pb-8">
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
