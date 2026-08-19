import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Maximize2, Users } from "lucide-react";
import { meetingsPage } from "@/data/data";
import { site } from "@/config/site";

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
  const extraImages = space.images?.filter((src) => src !== space.image) ?? [];

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <section className="pt-36 lg:pt-44 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            href="/meetings-events"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> All Meetings & Events
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="animate-slide-in-left">
              <div className="aspect-4/5 luxury-media luxury-img-zoom">
                <Image
                  src={space.image}
                  alt={space.name}
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
                        alt={space.name}
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

              <Link href="/contact" className="luxury-btn luxury-btn-dark mt-10 inline-flex">
                Enquire Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {otherSpaces.length > 0 && (
        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="luxury-section-title text-luxury-charcoal mb-10">More Spaces</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherSpaces.map((s) => (
                <Link
                  key={s.slug}
                  href={`/meetings-events/${s.slug}`}
                  className="group luxury-surface overflow-hidden block"
                >
                  <div className="aspect-4/3 overflow-hidden luxury-img-zoom">
                    <Image
                      src={s.image}
                      alt={s.name}
                      width={500}
                      height={375}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="luxury-section-title text-lg">{s.name}</h3>
                    <p className="text-luxury-muted text-sm mt-2">{s.excerpt}</p>
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
