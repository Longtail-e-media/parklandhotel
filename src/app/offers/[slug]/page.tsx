import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarClock, Tag } from "lucide-react";
import { offersPage } from "@/data/data";
import { site } from "@/config/site";
import { formatOfferExpiry } from "@/lib/offers";
import Watermark from "@/components/ui/Watermark";
import OfferBookingWidget from "@/components/offers/OfferBookingWidget";
import OfferGallery from "@/components/offers/OfferGallery";

export function generateStaticParams() {
  return offersPage.items.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = offersPage.items.find((o) => o.slug === slug);
  if (!offer) return {};

  const title = `${offer.name} | Offers & Packages | ${site.name}`;
  return {
    title,
    description: offer.excerpt,
    alternates: { canonical: `/offers/${offer.slug}` },
    openGraph: {
      title,
      description: offer.excerpt,
      url: `/offers/${offer.slug}`,
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function OfferDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = offersPage.items.find((o) => o.slug === slug);
  if (!offer) notFound();

  const otherOffers = offersPage.items.filter((o) => o.slug !== offer.slug);
  const galleryImages = offer.images && offer.images.length > 0 ? offer.images : [offer.image];

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <section className="relative  pt-36 lg:pt-44 pb-24 lg:pb-32">
        <Watermark
          motif="leaf"
          className="w-28 lg:w-40 -left-8 top-16 text-gold/6"
          rotate={-14}
          duration={16}
        />
        <Watermark
          motif="deer"
          className="w-40 lg:w-56 -right-12 bottom-10 text-luxury-charcoal/4"
          rotate={6}
          duration={20}
          delay={1.4}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> All Offers
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="animate-slide-in-left">
              <h1 className="luxury-section-title text-luxury-charcoal text-3xl md:text-[2rem]">{offer.name}</h1>

              <p className="mt-8 text-luxury-muted leading-relaxed">{offer.excerpt}</p>
              <div className="mt-8">
                <OfferGallery images={galleryImages} name={offer.name} />
              </div>
            </div>

            <OfferBookingWidget offer={offer} className="lg:sticky top-24 animate-slide-in-right" />
          </div>
        </div>
      </section>

      {otherOffers.length > 0 && (
        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="luxury-section-title text-luxury-charcoal mb-10">More Offers &amp; Packages</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherOffers.map((o) => (
                <Link
                  key={o.slug}
                  href={`/offers/${o.slug}`}
                  className="group luxury-surface overflow-hidden block"
                >
                  <div className="aspect-4/3 overflow-hidden luxury-img-zoom">
                    <Image
                      src={o.image}
                      alt={o.name}
                      width={500}
                      height={375}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-3 py-4">
                    <h3 className="luxury-section-title text-lg">{o.name}</h3>
                    <p className="text-luxury-muted mt-2">{o.excerpt}</p>
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
