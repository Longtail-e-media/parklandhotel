import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceGallery from "@/components/service/ServiceGallery";
import Watermark from "@/components/ui/Watermark";
import { contact, site } from "@/config/site";
import { servicesPage } from "@/data/data";
import { getServiceItems } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

/** Shown when a facility has no CMS description yet — every /services facility today. */
const GENERIC_FALLBACK_DESCRIPTION = [
  `One of the many comforts on hand during your stay at ${site.shortName} — ask our front desk for details.`,
];

async function getServiceItemsWithFallback() {
  const apiItems = await getServiceItems();
  return apiItems.length > 0 ? apiItems : servicesPage.items;
}

export async function generateStaticParams() {
  const items = await getServiceItemsWithFallback();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const items = await getServiceItemsWithFallback();
  const service = items.find((i) => i.slug === slug);
  if (!service) return {};

  const description =
    (service.description.length > 0 ? service.description : servicesPage.descriptions[slug])?.[0] ??
    GENERIC_FALLBACK_DESCRIPTION[0];
  const title = `${service.title} | Facilities & Services | ${site.name}`;
  return buildMetadata(
    "services",
    { title, description, openGraph: { title, description } },
    `/services/${service.slug}`
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await getServiceItemsWithFallback();
  const service = items.find((i) => i.slug === slug);
  if (!service) notFound();

  const galleryImages =
    service.images && service.images.length > 0
      ? service.images
      : service.image
        ? [service.image]
        : [];
  const paragraphs =
    service.description.length > 0
      ? service.description
      : servicesPage.descriptions[service.slug] ?? GENERIC_FALLBACK_DESCRIPTION;
  const phoneHref = `tel:${contact.phone.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`;

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
          motif="fern"
          className="w-32 lg:w-44 -right-10 bottom-10 text-luxury-charcoal/4"
          rotate={8}
          duration={18}
          delay={1.2}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors mb-10"
          >
            <i className="fa-solid fa-arrow-left text-base" aria-hidden="true" /> All Facilities & Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="animate-slide-in-left">
              {galleryImages.length > 0 ? (
                <ServiceGallery images={galleryImages} name={service.title} />
              ) : (
                <div className="luxury-media aspect-4/5 flex items-center justify-center bg-luxury-cream">
                  <i
                    className={`${service.icon || "fa-solid fa-circle-check"} text-8xl brown-btn`}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            <div className="animate-slide-in-right">
              <p className="luxury-label text-gold-text mb-5">Facilities & Services</p>
              <h1 className="luxury-section-title text-luxury-charcoal">{service.title}</h1>

              <div className="mt-8 space-y-4 text-luxury-muted leading-relaxed">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <a href={phoneHref} className="luxury-btn luxury-btn-accent">
                  <i className="fa-solid fa-phone" aria-hidden="true" /> Call Us
                </a>
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="luxury-btn">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
