import DiningEnquireButton from "@/components/dining/DiningEnquireButton";
import DiningGallery from "@/components/dining/DiningGallery";
import Watermark from "@/components/ui/Watermark";
import { site } from "@/config/site";
import { diningPage } from "@/data/data";
import { getDiningVenues } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import qr from "../../../../assets/img/qr.png";

async function getDiningVenuesWithFallback() {
  const apiVenues = await getDiningVenues();
  return apiVenues.length > 0 ? apiVenues : diningPage.venues;
}

export async function generateStaticParams() {
  const venues = await getDiningVenuesWithFallback();
  return venues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venues = await getDiningVenuesWithFallback();
  const venue = venues.find((v) => v.slug === slug);
  if (!venue) return {};

  const title = `${venue.name} | Dining & Bar | ${site.name}`;
  return buildMetadata(
    "dining-bar",
    { title, description: venue.excerpt, openGraph: { title, description: venue.excerpt } },
    `/dining-bar/${venue.slug}`
  );
}

export default async function DiningVenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venues = await getDiningVenuesWithFallback();
  const venue = venues.find((v) => v.slug === slug);
  if (!venue) notFound();

  const otherVenues = venues.filter((v) => v.slug !== venue.slug);
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
            <i className="fa-solid fa-arrow-left text-base" aria-hidden="true" /> All Dining & Bar
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

              {venue.hours && (
                <p className="flex items-center gap-2 text-sm text-luxury-muted mt-6">
                  <i className="fa-solid fa-clock text-base brown-btn shrink-0" aria-hidden="true" />
                  {venue.hours}
                </p>
              )}

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
                    <i className="fa-solid fa-check text-base brown-btn shrink-0" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <DiningEnquireButton venueName={venue.name} />
              <div className="mt-8 flex items-center gap-5 mt-15">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl  bg-luxury-cream text-gold-text">
               <Image src={qr} alt="qr" />
                </div>
                <div>
                  <p className="luxury-label text-gold-text">Scan QR CODE</p>
                  <p className="mt-2 text-sm leading-relaxed text-luxury-muted w-[250px]">
                    Scan to explore our menu and discover more.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
