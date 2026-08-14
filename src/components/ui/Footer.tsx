import Link from "next/link";
import { Facebook, Mail, MessageCircle } from "lucide-react";
import { site, contact, kathmanduOffice, chitwanOffice, links } from "@/config/site";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer id="contact-footer" className="relative bg-luxury-dark text-white pt-20 pb-8 overflow-hidden">
      {/* Decorative watermark */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-[-0.12em] left-1/2 -translate-x-1/2 whitespace-nowrap luxury-hero-title text-[18vw] leading-none text-white/4"
      >
        Parkland
      </p>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Brand row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-4">
              <span className="luxury-hero-title text-3xl">{site.name}</span>
              <span className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-full border border-gold/50 text-gold shrink-0">
                <span className="text-[8px] tracking-widest uppercase leading-none">Estd</span>
                <span className="luxury-hero-title text-sm leading-none mt-1">1987</span>
              </span>
            </div>
            <p className="text-white/55 text-sm mt-4 leading-relaxed max-w-sm">
              Traditional hospitality in a sylvan setting — ten minutes from Sauraha, on the edge of Chitwan
              National Park.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {links.social[0] && (
              <a
                href={links.social[0]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-gold hover:text-gold transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-gold hover:text-gold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-gold hover:text-gold transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-14">
          <div>
            <p className="luxury-label text-[11px] text-white/40 mb-5">Explore</p>
            <ul className="space-y-3 text-sm text-white/75">
              <li><Link href="#rooms" className="hover:text-gold transition-colors">Rooms & Suites</Link></li>
              <li><Link href="#dining" className="hover:text-gold transition-colors">Dining & Bar</Link></li>
              <li><Link href="#activities" className="hover:text-gold transition-colors">Activities</Link></li>
              <li><Link href="#gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <p className="luxury-label text-[11px] text-white/40 mb-5">Property</p>
            <ul className="space-y-3 text-sm text-white/75">
              <li><Link href="#nearby" className="hover:text-gold transition-colors">Nearby</Link></li>
              <li><Link href="#contact" className="hover:text-gold transition-colors">Contact</Link></li>
              <li><Link href="#book" className="hover:text-gold transition-colors">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <p className="luxury-label text-[11px] text-white/40 mb-5">Reservations</p>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <span className="block text-white/40 text-[11px] uppercase tracking-wide mb-1">Kathmandu</span>
                <a href={`tel:${kathmanduOffice.phones[0]}`} className="hover:text-gold transition-colors">
                  {kathmanduOffice.phones[0]}
                </a>
              </li>
              <li>
                <span className="block text-white/40 text-[11px] uppercase tracking-wide mb-1">Chitwan</span>
                <a href={`tel:${chitwanOffice.phones[0]}`} className="hover:text-gold transition-colors">
                  {chitwanOffice.phones[0]}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-gold transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="luxury-label text-[11px] text-white/40 mb-5">Stay In Touch</p>
            <p className="text-white/55 text-sm mb-4">Notes on our five-star journey, straight to your inbox.</p>
            <Newsletter />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
          <p>&copy; {new Date().getFullYear()} {site.name}, Sauraha, Chitwan National Park, Nepal.</p>
          <p>Design direction aligned with our five-star vision.</p>
        </div>
      </div>
    </footer>
  );
}
