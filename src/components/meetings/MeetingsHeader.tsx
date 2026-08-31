import { meetingsPage } from "@/data/data";
import { getMeetingsPackage, stripHtml } from "@/lib/data";
import Watermark from "@/components/ui/Watermark";

/**
 * Typographic page header — no banner image, so the top padding here is what
 * clears the fixed navbar (h-24 / h-20 once scrolled). Title/intro prefer the
 * Meetings & Events category record from `package` once populated; falls back
 * to the static copy below until then.
 */
export default async function MeetingsHeader() {
  const { header, intro: fallbackIntro } = meetingsPage;
  const meetingsPackage = await getMeetingsPackage();

  const title = meetingsPackage?.title ? stripHtml(meetingsPackage.title) : header.title;
  const intro = meetingsPackage?.description ? stripHtml(meetingsPackage.description) : fallbackIntro;

  return (
    <section className="relative overflow-hidden pt-36 lg:pt-44 pb-4 lg:pb-8">
      <Watermark
        motif="palm"
        className="w-36 lg:w-52 -right-10 top-8 text-gold/6"
        rotate={8}
        duration={19}
        flip
      />
      <Watermark
        motif="fern"
        className="w-24 lg:w-36 left-[7%] bottom-4 text-luxury-charcoal/5"
        rotate={-10}
        duration={15}
        delay={1.2}
      />
      <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
        <p className="luxury-eyebrow luxury-eyebrow-center justify-center luxury-label text-gold-text mb-5 animate-fade-in-up delay-100">
          {header.eyebrow}
        </p>
        <h2 className="luxury-hero-title text-luxury-charcoal animate-fade-in-up delay-200 text-4xl">
          {title}
        </h2>
        <p className="text-luxury-muted mt-5 animate-fade-in-up delay-300">{intro}</p>
      </div>
    </section>
  );
}
