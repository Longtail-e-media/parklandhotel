import { contact, kathmanduOffice, chitwanOffice } from "@/config/site";
import { getSiteRegulars } from "@/lib/data";

const offices = [
  { ...kathmanduOffice, heading: "Reservations", delay: "" },
  { ...chitwanOffice, heading: "At the Park", delay: "delay-100" },
];

export default async function ContactSection() {
  const siteRegulars = await getSiteRegulars();
  const phone = siteRegulars?.contact_info || contact.phone;
  const email = siteRegulars?.email_address || contact.email;
  const telHref = (value?: string) => (value ? `tel:${value.replace(/[^\d+]/g, "")}` : undefined);
  const splitPhoneNumbers = (value?: string) =>
    (value ?? "").split("/").map((number) => number.trim()).filter(Boolean);
  const phoneHref = telHref(phone);
  const contactRows = [
    [
      { label: "Reservations", icon: "fa-solid fa-phone", value: siteRegulars?.contact_info, href: telHref(siteRegulars?.contact_info) },
      { label: "Phone", icon: "fa-solid fa-phone", phoneNumbers: splitPhoneNumbers(siteRegulars?.whatsapp) },
      { label: "Email", icon: "fa-solid fa-envelope", value: siteRegulars?.email_address, href: `mailto:${email}` },
    ],
    [
      { label: "Landline", icon: "fa-solid fa-phone", value: siteRegulars?.landline_info, href: telHref(siteRegulars?.landline_info) },
      { label: "Mobile", icon: "fa-solid fa-mobile-screen", value: siteRegulars?.address, href: telHref(siteRegulars?.address) },
      { label: "Phone", icon: "fa-solid fa-phone", value: siteRegulars?.whatsapp_a, href: telHref(siteRegulars?.whatsapp_a) },
      { label: "Email", icon: "fa-solid fa-envelope", value: siteRegulars?.email_address, href: `mailto:${email}` },
    ],
  ].map((rows) => rows.filter((row) => Boolean(row.value || row.phoneNumbers?.length)));

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden scroll-mt-24
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
          {offices.map((office, officeIndex) => (
            <div
              key={office.label}
              className={`luxury-surface p-9 lg:p-10 animate-fade-in-up ${office.delay}`}
            >
              <p className="luxury-label text-[11px] mb-4">{office.label}</p>
              <h3 className="luxury-section-title text-2xl mb-4">{office.heading}</h3>
              <p className=" text-sm leading-relaxed mb-6">{office.address}</p>
              <ul className="space-y-3  text-luxury-charcoal/80 border-t border-hairline pt-6">
                {contactRows[officeIndex].map((row) => (
                  <li key={row.label} className="flex items-start gap-3">
                    <i className={`${row.icon} text-base shrink-0 mt-1`} aria-hidden="true" />
                    <span>
                      <span className="font-medium">{row.label}:</span>{" "}
                      {row.phoneNumbers ? (
                        row.phoneNumbers.map((number, index) => (
                          <span key={number}>
                            {index > 0 ? " / " : ""}
                            <a href={telHref(number)}>{number}</a>
                          </span>
                        ))
                      ) : row.href ? (
                        <a href={row.href}>{row.value}</a>
                      ) : (
                        row.value
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 animate-fade-in-up delay-200">
          <a href={`tel:${phoneHref}`} className="luxury-btn luxury-btn-accent">
            Call To Book
          </a>
          <a href={`mailto:${email}`} className="luxury-btn">
            Send An Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
