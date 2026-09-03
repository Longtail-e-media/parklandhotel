import { accommodationsPage } from "@/data/data";
import { getRoomsPackage, stripHtml } from "@/lib/data";

/**
 * Typographic page header — no banner image, so the top padding here is what
 * clears the fixed navbar (h-24 / h-20 once scrolled). Title/intro prefer the
 * Rooms category record from `package` once the client sets one up; falls
 * back to the static copy below until then.
 */
export default async function RoomsHeader() {
  const { header, intro } = accommodationsPage;
  const roomsPackage = await getRoomsPackage();

  const title = roomsPackage?.title ? stripHtml(roomsPackage.title) : header.title;
  const description = roomsPackage?.description ? stripHtml(roomsPackage.description) : intro;

  return (
    <section className="pt-36 lg:pt-44 pb-4 lg:pb-8">
      <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
        <p className="luxury-eyebrow luxury-eyebrow-center justify-center luxury-label text-gold-text mb-5 animate-fade-in-up delay-100">
          {header.eyebrow}
        </p>
        <h2 className="luxury-hero-title text-luxury-charcoal animate-fade-in-up delay-200 text-4xl">
          {title}
        </h2>
        <p className="text-luxury-muted mt-5 animate-fade-in-up delay-300">{description}</p>
      </div>
    </section>
  );
}
