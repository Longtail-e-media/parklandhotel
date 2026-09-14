import { contact, kathmanduOffice, chitwanOffice, address } from "@/config/site";
import { getSiteRegulars } from "@/lib/data";

export default async function ContactInfoSection() {
  const siteRegulars = await getSiteRegulars();
  const reservationsPhone = siteRegulars?.contact_info || contact.phone;
  const landline = siteRegulars?.landline_info || chitwanOffice.phones[0];
  const reservationsWhatsapp = siteRegulars?.whatsapp || contact.whatsapp;
  const chitwanWhatsapp = siteRegulars?.whatsapp_a || contact.whatsapp;
  const mobile = siteRegulars?.address || chitwanOffice.mobile.number;
  const email = siteRegulars?.email_address || contact.email;
  const telHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`;
  const hotelAddress = siteRegulars?.fiscal_address || chitwanOffice.address;
  const mapSrc =
    siteRegulars?.location_map ||
    `https://www.google.com/maps?q=${encodeURIComponent(address.full)}&output=embed`;

  const infoBlocks = [
    {
      heading: "Reservations Office",
      subheading: kathmanduOffice.label,
      lines: [
        { label: "Address", icon: "fa-solid fa-location-dot", value: kathmanduOffice.address },
        { label: "Telephone", icon: "fa-solid fa-phone", value: reservationsPhone, href: telHref(reservationsPhone) },
        { label: "WhatsApp", icon: "fa-solid fa-phone", value: reservationsWhatsapp, href: telHref(reservationsWhatsapp) },
        { label: "Email", icon: "fa-solid fa-envelope", value: email, href: `mailto:${email}` },
      ],
    },
    {
      heading: "Hotel Location",
      subheading: chitwanOffice.label,
      lines: [
        { label: "Address", icon: "fa-solid fa-location-dot", value: hotelAddress },
        { label: "Telephone", icon: "fa-solid fa-phone", value: landline, href: telHref(landline) },
        { label: "Mobile", icon: "fa-solid fa-mobile-screen", value: mobile, href: telHref(mobile) },
        { label: "WhatsApp", icon: "fa-solid fa-phone", value: chitwanWhatsapp, href: telHref(chitwanWhatsapp) },
        { label: "Email", icon: "fa-solid fa-envelope", value: email, href: `mailto:${email}` },
      ],
    },
  ];

  return (
    <section className="pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="luxury-media w-full h-[420px] lg:h-full min-h-[480px] animate-fade-in-up">
          <iframe
            title="Hotel Parkland location"
            src={mapSrc}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="space-y-14 animate-fade-in-up delay-100">
          {infoBlocks.map((block) => (
            <div key={block.heading}>
              <p className="luxury-label text-[11px] text-gold-text mb-3">{block.subheading}</p>
              <h2 className="luxury-section-title text-2xl text-luxury-charcoal mb-6">{block.heading}</h2>
              <ul className="space-y-3  text-luxury-charcoal/80 border-t border-hairline pt-6">
                {block.lines.map((line) => (
                  <li key={line.label} className="flex gap-3">
                    <i className={`${line.icon} text-base shrink-0 mt-1`} aria-hidden="true" />
                    <span>{line.label}:</span>
                    {line.href ? (
                      <a href={line.href} className="hover:text-luxury-gold transition-colors">
                        {line.value}
                      </a>
                    ) : (
                      <span>{line.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
