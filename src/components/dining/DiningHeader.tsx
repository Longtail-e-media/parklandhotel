import { diningPage } from "@/data/data";
import { getDiningPackage, stripHtml } from "@/lib/data";
import Watermark from "@/components/ui/Watermark";

/**
 * Typographic page header — no banner image, so the top padding here is what
 * clears the fixed navbar (h-24 / h-20 once scrolled). Title/intro prefer the
 * Dining & Bar category record from `package` once populated; falls back to
 * the static copy below until then.
 */
export default async function DiningHeader() {
  const { header, intro: fallbackIntro } = diningPage;
  const diningPackage = await getDiningPackage();

  const title = diningPackage?.title ? stripHtml(diningPackage.title) : header.title;
  const intro = diningPackage?.description ? stripHtml(diningPackage.description) : fallbackIntro;

  return (
    <section className="relative overflow-hidden pt-36 lg:pt-44 pb-4 lg:pb-8">
      <Watermark
        motif="leaf"
        className="w-28 lg:w-40 -right-6 top-10 text-gold/7"
        rotate={-14}
        duration={16}
      />
      <Watermark
        motif="palm"
        className="w-36 lg:w-52 left-[6%] bottom-2 text-luxury-charcoal/5"
        rotate={5}
        duration={20}
        delay={1.4}
        flip
      />
      <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
        <p className="luxury-eyebrow luxury-eyebrow-center justify-center luxury-label text-gold-text mb-5 animate-fade-in-up delay-100">
          {header.eyebrow}
        </p>
        <h2 className="luxury-hero-title text-luxury-charcoal animate-fade-in-up delay-200 text-4xl">
          {title}
        </h2>
        <p className="text-luxury-muted mt-5 whitespace-pre-line animate-fade-in-up delay-300">{intro}</p>
      </div>
    </section>
  );
}
