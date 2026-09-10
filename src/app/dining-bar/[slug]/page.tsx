import DiningEnquireButton from "@/components/dining/DiningEnquireButton";
import DiningGallery from "@/components/dining/DiningGallery";
import Watermark from "@/components/ui/Watermark";
import { site } from "@/config/site";
import { diningPage } from "@/data/data";
import { getDiningVenues } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import type { RoomFeature } from "@/types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import qr from "../../../../assets/img/qr.png";

/** Fallback icon for an amenity with no `icon`/`image` of its own. */
function getDefaultFeatureIcon(category: "restaurant" | "bar"): string {
  return category === "bar" ? "fa-solid fa-martini-glass" : "fa-solid fa-utensils";
}

/** Shown when the CMS has no amenities configured for a venue yet (e.g. Sauraha
 * Restaurant returns `amenities: []` today) so the section isn't empty. */
const DEFAULT_DINING_FEATURES: Record<"restaurant" | "bar", RoomFeature[]> = {
  restaurant: [
    { title: "Free Wi-Fi" },
    { title: "Air Conditioning" },
    { title: "Indoor & Outdoor Seating" },
    { title: "Vegetarian Options" },
    { title: "Family Friendly" },
  ],
  bar: [
    { title: "Free Wi-Fi" },
    { title: "Signature Cocktails" },
    { title: "Indoor & Outdoor Seating" },
    { title: "Live Music Evenings" },
    { title: "Family Friendly" },
  ],
};

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
  const displayFeatures =
    venue.features.length > 0 ? venue.features : DEFAULT_DINING_FEATURES[venue.category];

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

              <div
                className="mt-8 space-y-4 text-luxury-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: venue.description }}
              />

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

          {displayFeatures.length > 0 && (
            <div className="mt-16 lg:mt-20 animate-fade-in-up">
              <h2 className="luxury-section-title text-luxury-charcoal text-2xl lg:text-3xl mb-8">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {displayFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-center gap-3 text-sm text-luxury-muted border border-hairline rounded-xl px-4 py-3.5"
                  >
                    {feature.icon ? (
                      <i className={`${feature.icon} text-base brown-btn shrink-0`} aria-hidden="true" />
                    ) : feature.image ? (
                      <Image
                        src={feature.image}
                        alt=""
                        width={20}
                        height={20}
                        className="object-contain shrink-0"
                      />
                    ) : (
                      <i
                        className={`${getDefaultFeatureIcon(venue.category)} text-base brown-btn shrink-0`}
                        aria-hidden="true"
                      />
                    )}
                    {feature.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
