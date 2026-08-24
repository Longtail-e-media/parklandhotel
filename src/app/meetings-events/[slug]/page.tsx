import MeetingEnquireButton from "@/components/meetings/MeetingEnquireButton";
import MeetingGallery from "@/components/meetings/MeetingGallery";
import Watermark from "@/components/ui/Watermark";
import { site } from "@/config/site";
import { meetingsPage } from "@/data/data";
import {
  ArrowLeft,
  Check,
  GraduationCap,
  Martini,
  Maximize2,
  Presentation,
  Table2,
  Users,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

/** Icon shown per setup style in the Occupancy and Setup Style table. */
const SETUP_STYLE_ICONS: Record<string, LucideIcon> = {
  "U-Shape Style": Table2,
  "Classroom Style": GraduationCap,
  "Theatre Style": Presentation,
  "Banquet Style": UtensilsCrossed,
  "Cluster Style": UsersRound,
  "Cocktail Style": Martini,
};

export function generateStaticParams() {
  return meetingsPage.spaces.map((space) => ({ slug: space.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const space = meetingsPage.spaces.find((s) => s.slug === slug);
  if (!space) return {};

  const title = `${space.name} | Meetings & Events | ${site.name}`;
  return {
    title,
    description: space.excerpt,
    alternates: { canonical: `/meetings-events/${space.slug}` },
    openGraph: {
      title,
      description: space.excerpt,
      url: `/meetings-events/${space.slug}`,
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function MeetingSpaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const space = meetingsPage.spaces.find((s) => s.slug === slug);
  if (!space) notFound();

  const otherSpaces = meetingsPage.spaces.filter((s) => s.slug !== space.slug);
  const galleryImages = space.images && space.images.length > 0 ? space.images : [space.image];

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
            <ArrowLeft className="w-4 h-4" /> All Meetings & Events
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="animate-slide-in-left">
              <MeetingGallery images={galleryImages} name={space.name} />
            </div>

            <div className="animate-slide-in-right">
              <p className="luxury-label text-gold-text mb-5">Meetings & Events</p>
              <h1 className="luxury-section-title text-luxury-charcoal">{space.name}</h1>

              <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-6 text-sm text-luxury-muted">
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 brown-btn" strokeWidth={1.5} aria-hidden />
                  {space.capacity}
                </li>
                <li className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 brown-btn" strokeWidth={1.5} aria-hidden />
                  {space.size}
                </li>
              </ul>

              <div className="mt-8 space-y-4 text-luxury-muted leading-relaxed">
                {space.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <ul className="grid sm:grid-cols-2 gap-3 mt-8">
                {space.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-luxury-muted border border-hairline rounded-full px-5 py-3"
                  >
                    <Check className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <MeetingEnquireButton spaceName={space.name} />
            </div>
          </div>
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
                      const Icon = SETUP_STYLE_ICONS[style];
                      return (
                        <th
                          key={style}
                          scope="col"
                          className="border-b border-hairline px-4 py-5 font-normal align-top"
                        >
                          <div className="flex flex-col items-center gap-2">
                            {Icon && (
                              <Icon className="w-6 h-6 brown-btn" strokeWidth={1.5} aria-hidden />
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
