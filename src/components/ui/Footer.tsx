import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { site, contact, address, kathmanduOffice, chitwanOffice, links, business } from "@/config/site";
import { getMenuItems, getSiteRegulars, getSocialGroup, resolveExternalHref, splitContactList } from "@/lib/data";
import Newsletter from "./Newsletter";
import WhatsAppButton from "./WhatsAppButton";
import Image from "next/image";
import { trustBadges, exploreLinks, quickLinks } from "@/data/data";

const rating = business.aggregateRating;

// Static fallback — only the Facebook link is actually configured today.
const fallbackSocials = [
  { href: links.social[0], label: "Facebook", Icon: faFacebook },
  { href: links.social[1], label: "Tiktok", Icon: faTiktok },
  { href: links.social[2], label: "Instagram", Icon: faInstagram },
].filter((s): s is typeof s & { href: string } => Boolean(s.href));

export default async function Footer() {
  const [exploreMenu, quickMenu, siteRegulars, socialGroup, otaGroup] = await Promise.all([
    getMenuItems(2), // "Other Links" container — closest CMS match for the "Explore" column
    getMenuItems(3), // "Quick Links" container — matches the column name directly
    getSiteRegulars(),
    getSocialGroup(1),
    getSocialGroup(2), // OTA/partner logos
  ]);

  const explore = exploreMenu.length > 0 ? exploreMenu : exploreLinks;
  const quick = quickMenu.length > 0 ? quickMenu : quickLinks;
  const fiscalAddress = siteRegulars?.fiscal_address || address.full;
  const email = splitContactList(siteRegulars?.email_address)[0] || contact.email;
  const whatsappNumber = siteRegulars?.whatsapp_a || contact.whatsapp;
  const socialItems = socialGroup?.items?.length ? socialGroup.items : null;

  // Only entries with a logo image render as a badge — CMS entries without one
  // (e.g. a bare TripAdvisor link) have nothing to show in this slot.
  const otaItems: { title?: string; url?: string; image: string }[] = (otaGroup?.items ?? []).filter(
    (item: { image?: string | null }): item is { title?: string; url?: string; image: string } => Boolean(item?.image),
  );
  const badges =
    otaItems.length > 0
      ? otaItems.map((item) => ({
          name: item.title || "Partner",
          image: item.image,
          link: resolveExternalHref(item.url) || "#",
        }))
      : trustBadges;

  return (
    <>
      <footer
        id="contact-footer"
        className="relative overflow-hidden bg-white text-luxury-charcoal  pb-8"
      >

      {/* ota */}
          <section className="pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-10 items-center animate-fade-in-up border-y border-hairline py-10">
            {rating && (
              <div className="flex items-center gap-6 md:border-r md:border-hairline md:pr-10">
                <div className="shrink-0 text-center">
                  <p className="luxury-hero-title text-4xl  leading-none">{rating.ratingValue}</p>
                  <div className="flex gap-0.5 justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        aria-hidden="true"
                        className="fa-solid fa-star text-sm"
                        style={{ color: i < Math.round(Number(rating.ratingValue)) ? "var(--color-rating)" : "var(--line-soft)" }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-luxury-muted leading-relaxed">
                  Ranked <strong className="text-luxury-charcoal">#2 of 36</strong> specialty lodging in
                  Sauraha, from <strong className="text-luxury-charcoal">{rating.reviewCount} traveller
                  reviews</strong> on TripAdvisor.
                </p>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-center md:justify-evenly gap-x-5 gap-y-6">
              {badges.map((badge) => (
                <a href={badge.link} target="_blank" key={badge.name}><Image key={badge.name} src={badge.image} alt={badge.name} width={80} height={30} className="
               object-contain" /></a>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ota end */}




        {/* Oversized wordmark, sitting just below the baseline */}
        <p
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-[-0.14em] left-1/2 -translate-x-1/2 whitespace-nowrap luxury-hero-title text-[18vw] leading-none text-luxury-charcoal/4"
        >
          Parkland
        </p>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Brand row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12">
            <div>
              <div className="flex items-center gap-4">
                <span className="luxury-hero-title text-3xl">{site.name}</span>
              </div>
              <p className=" mt-5 leading-relaxed">
             Refined hospitality in a serene natural setting — just ten minutes from Sauraha, at the gateway to Chitwan National Park.
              </p>
              <p className="flex items-center gap-2  text-sm mt-4">
                <i className="fa-solid fa-location-dot text-base shrink-0" aria-hidden="true" /> {fiscalAddress}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {socialItems
                ? socialItems.map((item: { title?: string; url?: string; image?: string; icon?: string }, i: number) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.title || "Social media link"}
                      className="w-11 h-11 flex items-center justify-center rounded-full border border-hairline text-luxury-charcoal/70 hover:border-soft hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {item.image ? (
                        <Image src={item.image} alt={item.title || ""} width={16} height={16} />
                      ) : item.icon ? (
                        <i className={item.icon} />
                      ) : null}
                    </a>
                  ))
                : fallbackSocials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 flex items-center justify-center rounded-full border border-hairline text-luxury-charcoal/70 hover:border-soft hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={Icon} className="w-4 h-4" />
                    </a>
                  ))}
            </div>
          </div>




          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-10 ">
                  <div>
                  <p className="luxury-label text-luxury-charcoal mb-5">Explore</p>
                  <ul className="space-y-3">
                    {explore.map((link, i) => (
                      <li key={i}>
                        <Link href={link.href || "#"} className="transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  </div>

      <div>
              <p className="luxury-label text-luxury-charcoal mb-5">Quick Links</p>
              <ul className="space-y-3">
                {quick.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href || "#"} className="transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="luxury-label text-luxury-charcoal mb-5">Reservations</p>
              <ul className="space-y-4">
                <li>
                  <span className="block text-[12px] uppercase tracking-wide mb-1">Kathmandu</span>
                  <a href={`tel:${kathmanduOffice.phones[0]}`} className="transition-colors">
                    {kathmanduOffice.phones[0]}
                  </a>
                </li>
                <li>
                  <span className="block text-[12px] uppercase tracking-wide mb-1">Chitwan</span>
                  <a href={`tel:${chitwanOffice.phones[0]}`} className="transition-colors">
                    {chitwanOffice.phones[0]}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${email}`} className="transition-colors">
                    {email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="luxury-label text-luxury-charcoal mb-5">Stay in touch</p>
              <p className="mb-5">
               Be the first to discover special offers, seasonal experiences and stories from Hotel Parkland.
              </p>
              <Newsletter />
            </div>
          </div>

          <div className="border-t border-hairline pt-8 flex flex-col z-999 sm:flex-row items-center justify-between gap-4 text-[14px]">
            <p>&copy; {new Date().getFullYear()} {site.name}, Sauraha, Chitwan National Park, Nepal.</p>
            <p>Developed by <a href="https://longtail.info/" target="_blank" className="font-semibold">Longtail e-media</a></p>
          </div>
        </div>
      </footer>

      <WhatsAppButton phone={whatsappNumber} />
      </>

  );
}
