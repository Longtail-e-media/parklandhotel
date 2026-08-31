import Image from "next/image";
import { leisure, meetingsPage } from "@/data/data";
import { getMeetingsPackage, getMeetingSpaces, stripHtml } from "@/lib/data";
import Watermark from "@/components/ui/Watermark";

/**
 * Homepage teaser for the Meetings & Events pages (`/meetings-events`) — title/
 * intro prefer the Meetings & Events category record from `package`, falling
 * back to the static copy; the photo prefers the first live meeting space.
 */
export default async function LeisureSection() {
  const [meetingsPackage, spaces] = await Promise.all([getMeetingsPackage(), getMeetingSpaces()]);

  const title = meetingsPackage?.title ? stripHtml(meetingsPackage.title) : meetingsPage.header.title;
  const paragraphs = meetingsPackage?.description
    ? stripHtml(meetingsPackage.description)
        .split(/\r?\n\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [meetingsPage.intro];
  const image = meetingsPackage?.banner_img?.[0]?.url || spaces[0]?.image || leisure.image;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <Watermark
        motif="deer"
        className="w-40 lg:w-56 left-[8%] bottom-10 text-luxury-charcoal/5"
        rotate={-5}
        duration={20}
      />
      <Watermark
        motif="fern"
        className="w-28 lg:w-40 right-[6%] top-12 text-gold/6"
        rotate={12}
        duration={16}
        delay={1.2}
        flip
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 animate-slide-in-left">
          <p className="luxury-eyebrow luxury-label text-gold-text mb-6">{meetingsPage.header.eyebrow}</p>
          <h2 className="luxury-section-title text-luxury-charcoal mb-6">{title}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-luxury-muted leading-relaxed mb-5 last:mb-0">
              {p}
            </p>
          ))}
        </div>
        <div className="order-1 lg:order-2 relative animate-slide-in-right">
          <div className="aspect-4/5 luxury-media luxury-img-zoom">
            <Image
              src={image}
              alt="Meeting and event space at Hotel Parkland"
              width={700}
              height={875}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
