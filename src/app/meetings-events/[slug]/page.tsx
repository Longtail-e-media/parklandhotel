import MeetingEnquireButton from "@/components/meetings/MeetingEnquireButton";
import MeetingGallery from "@/components/meetings/MeetingGallery";
import Watermark from "@/components/ui/Watermark";
import { site } from "@/config/site";
import { meetingsPage } from "@/data/data";
import { getMeetingSpaces } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

/** Icon shown per setup style in the Occupancy and Setup Style table. Unrecognised
 * CMS setup-style names still render, just without an icon. */
const SETUP_STYLE_ICONS: Record<string, string> = {
  "U-Shape Style": "table-cells",
  "Classroom Style": "graduation-cap",
  "Theatre Style": "chalkboard-user",
  "Banquet Style": "utensils",
  "Cluster Style": "user-group",
  "Cocktail Style": "martini-glass",
  "Round Table": "circle",
};

/** Meeting space `features` are free-text phrases from the CMS (not fixed keys like
 * room amenities), so icons are matched by keyword. No per-space icon data yet — this
 * static list stands in until the CMS exposes one. */
const MEETING_FEATURE_ICONS: [RegExp, string][] = [
  [/wi-?fi/i, "fa-solid fa-wifi"],
  [/av equipment|audio|visual|projector|screen/i, "fa-solid fa-display"],
  [/catering|coffee|tea service|refreshment/i, "fa-solid fa-mug-saucer"],
  [/garden|lawn|outdoor|open-air/i, "fa-solid fa-tree"],
  [/wedding|reception/i, "fa-solid fa-ring"],
  [/light/i, "fa-solid fa-lightbulb"],
  [/events team|dedicated|staff/i, "fa-solid fa-user-tie"],
  [/air condition|\bac\b/i, "fa-solid fa-wind"],
  [/private|quiet/i, "fa-solid fa-door-closed"],
  [/booking|flexible|half\/full-day/i, "fa-solid fa-calendar-check"],
  [/layout|theatre|classroom|banquet/i, "fa-solid fa-chalkboard-user"],
  [/parking/i, "fa-solid fa-square-parking"],
];

function getMeetingFeatureIcon(feature: string): string {
  const match = MEETING_FEATURE_ICONS.find(([pattern]) => pattern.test(feature));
  return match?.[1] ?? "fa-solid fa-check";
}

/** Shown when the CMS has no amenities configured for a space yet (e.g. Chitwan
 * Hall, Sauraha Hall both return `amenities: []` today) so the section isn't empty. */
const DEFAULT_MEETING_FEATURES = [
  "High-Speed Wi-Fi",
  "AV Equipment",
  "Air Conditioning",
  "Tea & Coffee Service",
  "Flexible Seating Layout",
  "On-site Parking",
];

async function getMeetingSpacesWithFallback() {
  const apiSpaces = await getMeetingSpaces();
  return apiSpaces.length > 0 ? apiSpaces : meetingsPage.spaces;
}

export async function generateStaticParams() {
  const spaces = await getMeetingSpacesWithFallback();
  return spaces.map((space) => ({ slug: space.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spaces = await getMeetingSpacesWithFallback();
  const space = spaces.find((s) => s.slug === slug);
  if (!space) return {};

  const title = `${space.name} | Meetings & Events | ${site.name}`;
  return buildMetadata(
    "meetings-events",
    { title, description: space.excerpt, openGraph: { title, description: space.excerpt } },
    `/meetings-events/${space.slug}`
  );
}

export default async function MeetingSpaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spaces = await getMeetingSpacesWithFallback();
  const space = spaces.find((s) => s.slug === slug);
  if (!space) notFound();

  const otherSpaces = spaces.filter((s) => s.slug !== space.slug);
  const galleryImages = space.images && space.images.length > 0 ? space.images : [space.image];
  const displayFeatures = space.features.length > 0 ? space.features : DEFAULT_MEETING_FEATURES;

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden pt-36 lg:pt-44 pb-24 lg:pb-32">
        <Watermark
          motif="palm"
          className="w-40 lg:w-56 -right-10 top-14 text-gold/6"
          rotate={8}
          duration={19}
          flip
        />
        <Watermark
          motif="fern"
          className="w-28 lg:w-40 left-[6%] bottom-6 text-luxury-charcoal/5"
          rotate={-10}
          duration={15}
          delay={1.2}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            href="/meetings-events"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors mb-10"
          >
            <i className="fa-solid fa-arrow-left text-base" aria-hidden="true" /> All Meetings & Events
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="animate-slide-in-left">
              <MeetingGallery images={galleryImages} name={space.name} />
            </div>

            <div className="animate-slide-in-right">
              <p className="luxury-label text-gold-text mb-5">Meetings & Events</p>
              <h1 className="luxury-section-title text-luxury-charcoal">{space.name}</h1>

              <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-6 text-sm text-luxury-muted">
                {space.capacity && (
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-users text-base brown-btn" aria-hidden="true" />
                    {space.capacity}
                  </li>
                )}
                {space.size && (
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-expand text-base brown-btn" aria-hidden="true" />
                    {space.size}
                  </li>
                )}
              </ul>

              <div className="mt-8 space-y-4 text-luxury-muted leading-relaxed">
                {space.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <MeetingEnquireButton spaceName={space.name} />
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
                    key={feature}
                    className="flex items-center gap-3 text-sm text-luxury-muted border border-hairline rounded-xl px-4 py-3.5"
                  >
                    <i
                      className={`${getMeetingFeatureIcon(feature)} text-base brown-btn shrink-0`}
                      aria-hidden="true"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {space.setupStyles && space.setupStyles.length > 0 && (
        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="luxury-section-title text-luxury-charcoal text-2xl lg:text-3xl mb-8">
              Occupancy and Setup Style
            </h2>

            <div className="w-full overflow-x-auto border border-hairline rounded-xl">
              <table className="w-full min-w-180 table-fixed border-collapse text-center">
                <thead>
                  <tr className="bg-luxury-cream-alt">
                    {space.setupStyles.map(({ style }) => {
                      const icon = SETUP_STYLE_ICONS[style];
                      return (
                        <th
                          key={style}
                          scope="col"
                          className="border-b border-hairline px-4 py-5 font-normal align-top"
                        >
                          <div className="flex flex-col items-center gap-2">
                            {icon && (
                              <i className={`fa-solid fa-${icon} text-2xl brown-btn`} aria-hidden="true" />
                            )}
                            <span className="luxury-label text-[11px] text-gold-text">{style}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {space.setupStyles.map(({ style, pax }) => (
                      <td key={style} className="px-4 py-6 text-luxury-charcoal">
                        <span className="text-2xl lg:text-3xl text-gold-text">{pax}</span>{" "}
                        <span className="text-sm text-luxury-muted">pax</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
