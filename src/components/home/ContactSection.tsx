import { Phone, Smartphone, Mail } from "lucide-react";
import { contact, kathmanduOffice, chitwanOffice } from "@/config/site";

const offices = [
  { ...kathmanduOffice, heading: "Reservations", delay: "" },
  { ...chitwanOffice, heading: "At the Park", delay: "delay-100" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="    relative py-24 lg:py-32 overflow-hidden scroll-mt-24
    after:absolute after:right-0 after:bottom-0
    after:w-64 after:h-64
    after:bg-[url('/img/travel.png')]
    after:bg-contain after:bg-no-repeat after:bg-right-bottom
    after:pointer-events-none after:opacity-30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <p className="luxury-label mb-5">Reservations</p>
          <h2 className="luxury-section-title text-luxury-charcoal">Plan Your Escape to Chitwan</h2>
          <p className="text-luxury-muted mt-5">
            Reach us directly — our teams in Kathmandu and Chitwan are on hand to help you plan your stay.
          </p>
        </div>

        <div id="book" className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto scroll-mt-24">
          {offices.map((office) => (
            <div
              key={office.label}
              className={`luxury-surface p-9 lg:p-10 animate-fade-in-up ${office.delay}`}
            >
              <p className="luxury-label text-[11px] mb-4">{office.label}</p>
              <h3 className="luxury-section-title text-2xl mb-4">{office.heading}</h3>
              <p className="text-luxury-muted text-sm leading-relaxed mb-6">{office.address}</p>
              <ul className="space-y-3 text-sm text-luxury-charcoal/80 border-t border-hairline pt-6">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0" /> {office.phones.join(" / ")}
                </li>
                <li className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 shrink-0" /> {office.mobile.number} ({office.mobile.name})
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0" /> {office.email}
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 animate-fade-in-up delay-200">
          <a href={`tel:${contact.phoneE164}`} className="luxury-btn luxury-btn-accent">
            Call To Book
          </a>
          <a href={`mailto:${contact.email}`} className="luxury-btn luxury-btn-dark">
            Send An Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
