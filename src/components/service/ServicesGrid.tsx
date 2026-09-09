import Image from "next/image";
import Link from "next/link";
import { servicesPage } from "@/data/data";
import { getServiceItems } from "@/lib/data";

export default async function ServicesGrid() {
  const apiItems = await getServiceItems();
  const items = apiItems.length > 0 ? apiItems : servicesPage.items;

  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 animate-fade-in-up delay-300">
          {items.map((item) => {
            const excerpt = (servicesPage.descriptions[item.slug] ?? item.description)[0];

            return (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group luxury-surface overflow-hidden flex flex-col"
              >
                {item.image ? (
                  <div className="aspect-4/3 overflow-hidden luxury-img-zoom">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-4/3 flex items-center justify-center bg-luxury-cream">
                    <i
                      className={`${item.icon || "fa-solid fa-circle-check"} text-5xl brown-btn transition-transform duration-500 group-hover:scale-110`}
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="p-5 lg:p-7 flex flex-col grow">
                  <h3 className="luxury-section-title text-lg lg:text-2xl">{item.title}</h3>
                  {excerpt && (
                    <p className="mt-3 text-sm text-luxury-muted grow line-clamp-2">{excerpt}</p>
                  )}
                  <span className="inline-flex items-center gap-2 brown-btn luxury-label text-[11px] mt-5 group-hover:gap-3 transition-all">
                    View Details <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
