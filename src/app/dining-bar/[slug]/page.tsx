import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { diningPage } from "@/data/data";
import { site } from "@/config/site";

export function generateStaticParams() {
  return diningPage.venues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = diningPage.venues.find((v) => v.slug === slug);
  if (!venue) return {};

  const title = `${venue.name} | Dining & Bar | ${site.name}`;
  return {
    title,
    description: venue.excerpt,
    alternates: { canonical: `/dining-bar/${venue.slug}` },
    openGraph: {
      title,
      description: venue.excerpt,
      url: `/dining-bar/${venue.slug}`,
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function DiningVenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = diningPage.venues.find((v) => v.slug === slug);
  if (!venue) notFound();

  const otherVenues = diningPage.venues.filter((v) => v.slug !== venue.slug);
  const extraImages = venue.images?.filter((src) => src !== venue.image) ?? [];

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <section className="pt-36 lg:pt-44 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            href="/dining-bar"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> All Dining & Bar
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="animate-slide-in-left">
              <div className="aspect-4/5 luxury-media luxury-img-zoom">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  width={700}
                  height={875}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {extraImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {extraImages.map((src) => (
                    <div key={src} className="aspect-square luxury-media">
                      <Image
                        src={src}
                        alt={venue.name}
                        width={340}
                        height={340}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="animate-slide-in-right">
              <p className="luxury-label text-gold-text mb-5">
                {venue.category === "bar" ? "Bar" : "Restaurant"}
              </p>
              <h1 className="luxury-section-title text-luxury-charcoal">{venue.name}</h1>

              <p className="flex items-center gap-2 text-sm text-luxury-muted mt-6">
                <Clock className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                {venue.hours}
              </p>

              <div className="mt-8 space-y-4 text-luxury-muted leading-relaxed">
                {venue.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <ul className="grid sm:grid-cols-2 gap-3 mt-8">
                {venue.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-luxury-muted border border-hairline rounded-full px-5 py-3"
                  >
                    <Check className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="luxury-btn luxury-btn-dark mt-10 inline-flex">
                Enquire Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {otherVenues.length > 0 && (
        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="luxury-section-title text-luxury-charcoal mb-10">More Dining & Bar</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherVenues.map((v) => (
                <Link
                  key={v.slug}
                  href={`/dining-bar/${v.slug}`}
                  className="group luxury-surface overflow-hidden block"
                >
                  <div className="aspect-4/3 overflow-hidden luxury-img-zoom">
                    <Image
                      src={v.image}
                      alt={v.name}
                      width={500}
                      height={375}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="luxury-section-title text-lg">{v.name}</h3>
                    <p className="text-luxury-muted text-sm mt-2">{v.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
