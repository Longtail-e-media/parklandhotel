import Link from "next/link";
import { Facebook, Mail, MessageCircle, MapPin } from "lucide-react";
import { site, contact, kathmanduOffice, chitwanOffice, links } from "@/config/site";
import Newsletter from "./Newsletter";
import Watermark from "./Watermark";
import Image from "next/image";
import { Star } from "lucide-react";
import { trustBadges } from "@/data/data";
import { business } from "@/config/site";
  const rating = business.aggregateRating;
const socials = [
  ...(links.social[0] ? [{ href: links.social[0], label: "Facebook", Icon: Facebook, external: true }] : []),
  { href: `https://wa.me/${contact.whatsapp}`, label: "WhatsApp", Icon: MessageCircle, external: true },
  { href: `mailto:${contact.email}`, label: "Email", Icon: Mail, external: false },
];

export default function Footer() {
  return (
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
                    <Star
                      key={i}
                      className="w-3.5 h-3.5"
                      fill="currentColor"
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
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-6">
            {trustBadges.map((badge) => (
              <a href="" target="_blank" key={badge.name}><Image key={badge.name} src={badge.image} alt={badge.name} width={120} height={36} className="
            - w-auto object-contain" /></a>
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
            <p className="text-luxury-muted text-sm mt-5 leading-relaxed">
              Traditional hospitality in a sylvan setting — ten minutes from Sauraha, on the edge of Chitwan
              National Park.
            </p>
            <p className="flex items-center gap-2 text-luxury-muted text-sm mt-4">
              <MapPin className="w-4 h-4  shrink-0" /> Sauraha, Chitwan, Nepal
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-hairline text-luxury-charcoal/70 hover:border-soft hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>




        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-10 ">
          <div>
            <p className="luxury-label text-[11px] text-luxury-charcoal mb-5">Explore</p>
            <ul className="space-y-3 text-sm text-luxury-muted">
              <li><Link href="#rooms" className="transition-colors">Rooms &amp; Suites</Link></li>
              <li><Link href="#dining" className="transition-colors">Dining &amp; Bar</Link></li>
              <li><Link href="#activities" className="transition-colors">Activities</Link></li>
              <li><Link href="#gallery" className="transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <p className="luxury-label text-[11px] text-luxury-charcoal mb-5">Property</p>
            <ul className="space-y-3 text-sm text-luxury-muted">
              <li><Link href="#nearby" className="transition-colors">Nearby</Link></li>
              <li><Link href="#contact" className="transition-colors">Contact</Link></li>
              <li><Link href="#book" className="transition-colors">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <p className="luxury-label text-[11px] text-luxury-charcoal mb-5">Reservations</p>
            <ul className="space-y-4 text-sm text-luxury-muted">
              <li>
                <span className="block text-luxury-muted/70 text-[11px] uppercase tracking-wide mb-1">Kathmandu</span>
                <a href={`tel:${kathmanduOffice.phones[0]}`} className="transition-colors">
                  {kathmanduOffice.phones[0]}
                </a>
              </li>
              <li>
                <span className="block text-luxury-muted/70 text-[11px] uppercase tracking-wide mb-1">Chitwan</span>
                <a href={`tel:${chitwanOffice.phones[0]}`} className="transition-colors">
                  {chitwanOffice.phones[0]}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="luxury-label text-[11px] text-luxury-charcoal mb-5">Stay In Touch</p>
            <p className="text-luxury-muted text-sm mb-5">
              Notes on our five-star journey, straight to your inbox.
            </p>
            <Newsletter />
          </div>
        </div>

        <div className="border-t border-hairline pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-luxury-muted">
          <p>&copy; {new Date().getFullYear()} {site.name}, Sauraha, Chitwan National Park, Nepal.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
