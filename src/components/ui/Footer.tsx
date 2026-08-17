"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTiktok,faWhatsapp  } from "@fortawesome/free-brands-svg-icons";
import { site, contact, kathmanduOffice, chitwanOffice, links } from "@/config/site";
import Newsletter from "./Newsletter";
import Watermark from "./Watermark";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { trustBadges, exploreLinks,quickLinks } from "@/data/data";
import { business } from "@/config/site";
  const rating = business.aggregateRating;
const socials = [
  { href: links.social[0], label: "Facebook", Icon: ({ className }: { className?: string }) => <FontAwesomeIcon icon={faFacebook} className={className} />, external: true },
  { href: links.social[1], label: "Tiktok", Icon: ({ className }: { className?: string }) => <FontAwesomeIcon icon={faTiktok} className={className} />, external: true },
  { href: links.social[2], label: "Instagram", Icon: ({ className }: { className?: string }) => <FontAwesomeIcon icon={faInstagram} className={className} />, external: true },
];


export default function Footer() {
    const [showWhatsapp, setShowWhatsapp] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowWhatsapp(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
{showWhatsapp && (
<a
  href="https://wa.me/9841229970" // replace with your WhatsApp number
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-3 z-50 shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
>
  <FontAwesomeIcon icon={faWhatsapp} className="w-8! h-8!" />
</a>
)}

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
          <div className="flex flex-wrap items-center justify-center md:justify-evenly gap-x-5 gap-y-6">
            {trustBadges.map((badge) => (
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
                <p className="luxury-label text-luxury-charcoal mb-5">Explore</p>
                <ul className="space-y-3">
                  {exploreLinks.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                </div>

    <div>
            <p className="luxury-label text-luxury-charcoal mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="transition-colors">
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
                <a href={`mailto:${contact.email}`} className="transition-colors">
                  {contact.email}
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
    </>

  );
}
