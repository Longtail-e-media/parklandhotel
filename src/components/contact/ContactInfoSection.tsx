import { contact, kathmanduOffice, chitwanOffice, address } from "@/config/site";
import { getSiteRegulars, splitContactList } from "@/lib/data";

export default async function ContactInfoSection() {
  const siteRegulars = await getSiteRegulars();
  // The CMS doesn't yet expose distinct per-office address/mobile fields —
  // until it does, every block shares these same CMS-driven values (same
  // fallback pattern as the homepage's ContactSection) instead of the old
  // hardcoded per-office config.
  const phone = splitContactList(siteRegulars?.contact_info)[0] || contact.phone;
  const email = splitContactList(siteRegulars?.email_address)[0] || contact.email;
  const hotelAddress = siteRegulars?.fiscal_address || chitwanOffice.address;
  const mapSrc =
    siteRegulars?.location_map ||
    `https://www.google.com/maps?q=${encodeURIComponent(address.full)}&output=embed`;

  const infoBlocks = [
    {
      heading: "Reservations Office",
      subheading: kathmanduOffice.label,
      lines: [
        { label: "Address", value: hotelAddress },
        { label: "Telephone", value: phone },
        { label: "Mobile", value: phone },
        { label: "Email", value: email, href: `mailto:${email}` },
      ],
    },
    {
      heading: "Hotel Location",
      subheading: chitwanOffice.label,
      lines: [
        { label: "Address", value: hotelAddress },
        { label: "Telephone", value: phone },
        { label: "Mobile", value: phone },
        { label: "Email", value: email, href: `mailto:${email}` },
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
                  <li key={line.label} className="flex gap-2">
                    <span className="">{line.label}:</span>
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
