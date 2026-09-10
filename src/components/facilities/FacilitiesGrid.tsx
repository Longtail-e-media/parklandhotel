import Image from "next/image";
import { servicesPage } from "@/data/data";
import { getServiceItems } from "@/lib/data";

export default async function FacilitiesGrid() {
  const apiItems = await getServiceItems();
  const items = apiItems.length > 0 ? apiItems : servicesPage.items;

  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline animate-fade-in-up delay-200">
          {items.map((item, index) => {
            const excerpt = (servicesPage.descriptions[item.slug] ?? item.description)[0];

            return (
              <div
                key={item.slug}
                className="group relative flex flex-col items-center border-r border-b border-hairline px-6 py-12 lg:px-8 lg:py-14 text-center overflow-hidden transition-colors duration-500 hover:bg-luxury-cream"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 right-4 font-display text-6xl lg:text-7xl text-luxury-charcoal/5 select-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative h-16 flex items-center justify-center mb-6">
                  {item.icon ? (
                    <i
                      className={`${item.icon} text-4xl text-gold-text transition-transform duration-500 group-hover:-translate-y-1`}
                      aria-hidden="true"
                    />
                  ) : item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  ) : (
                    <i
                      className="fa-solid fa-circle-check text-4xl text-gold-text"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <h3 className="luxury-label text-sm lg:text-[0.95rem] text-luxury-charcoal">
                  {item.title}
                </h3>
                {excerpt && (
                  <p className="mt-3 text-sm text-luxury-muted leading-relaxed max-w-[22rem]">
                    {excerpt}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
