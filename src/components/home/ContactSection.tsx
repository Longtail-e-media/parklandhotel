import { Phone, Smartphone, Mail } from "lucide-react";
import { contact, kathmanduOffice, chitwanOffice } from "@/config/site";

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-luxury-dark text-white py-24 lg:py-32 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <p className="luxury-label text-gold mb-5">Reservations</p>
          <h2 className="luxury-section-title">Plan Your Escape to Chitwan</h2>
          <p className="text-white/70 mt-5">
            Reach us directly — our teams in Kathmandu and Chitwan are on hand to help you plan your stay.
          </p>
        </div>

        <div id="book" className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto scroll-mt-24">
          <div className="border border-white/15 p-10 animate-fade-in-up">
            <p className="luxury-label text-gold text-[11px] mb-4">{kathmanduOffice.label}</p>
            <h3 className="luxury-section-title text-2xl mb-4">Reservations</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-5">{kathmanduOffice.address}</p>
            <ul className="space-y-2 text-sm text-white/85">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" /> {kathmanduOffice.phones.join(" / ")}
              </li>
              <li className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-gold" /> {kathmanduOffice.mobile.number} ({kathmanduOffice.mobile.name})
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" /> {kathmanduOffice.email}
              </li>
            </ul>
          </div>

          <div className="border border-white/15 p-10 animate-fade-in-up delay-100">
            <p className="luxury-label text-gold text-[11px] mb-4">{chitwanOffice.label}</p>
            <h3 className="luxury-section-title text-2xl mb-4">At the Park</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-5">{chitwanOffice.address}</p>
            <ul className="space-y-2 text-sm text-white/85">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" /> {chitwanOffice.phones.join(" / ")}
              </li>
              <li className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-gold" /> {chitwanOffice.mobile.number} ({chitwanOffice.mobile.name})
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" /> {chitwanOffice.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 animate-fade-in-up delay-200">
          <a href={`tel:${contact.phoneE164}`} className="luxury-btn luxury-btn-solid">
            Call To Book
          </a>
          <a href={`mailto:${contact.email}`} className="luxury-btn luxury-btn-light">
            Send An Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
