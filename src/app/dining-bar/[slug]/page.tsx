import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { diningPage } from "@/data/data";
import { site } from "@/config/site";
import Watermark from "@/components/ui/Watermark";
import DiningEnquireButton from "@/components/dining/DiningEnquireButton";
import DiningGallery from "@/components/dining/DiningGallery";

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
  const galleryImages = venue.images && venue.images.length > 0 ? venue.images : [venue.image];

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden pt-36 lg:pt-44 pb-24 lg:pb-32">
        <Watermark
          motif="leaf"
          className="w-28 lg:w-40 -left-8 top-16 text-gold/6"
          rotate={-14}
          duration={16}
        />
        <Watermark
          motif="palm"
          className="w-40 lg:w-56 -right-12 bottom-10 text-luxury-charcoal/4"
          rotate={6}
          duration={20}
          delay={1.4}
          flip
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            href="/dining-bar"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> All Dining & Bar
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="animate-slide-in-left">
              <DiningGallery images={galleryImages} name={venue.name} />
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

              <DiningEnquireButton venueName={venue.name} />
            </div>
          </div>
        </div>
      </section>

      {otherVenues.length > 0 && (
        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="luxury-section-title text-luxury-charcoal mb-10">Others</h2>
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
                  <div className="px-3 py-4">
                    <h3 className="luxury-section-title text-lg">{v.name}</h3>
                    <p className="text-luxury-muted  mt-2">{v.excerpt}</p>
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
