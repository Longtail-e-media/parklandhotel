import Image from "next/image";
import Link from "next/link";
import { meetingsPage } from "@/data/data";

export default function MeetingsGrid() {
  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-300">
          {meetingsPage.spaces.map((space) => (
            <Link
              key={space.slug}
              href={`/meetings-events/${space.slug}`}
              className="group luxury-surface overflow-hidden flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden luxury-img-zoom">
                <Image
                  src={space.image}
                  alt={space.name}
                  width={500}
                  height={375}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 flex flex-col grow">
                <h3 className="luxury-section-title text-xl">{space.name}</h3>
                <p className="text-luxury-muted mt-4 leading-relaxed grow">{space.excerpt}</p>
                <ul className="flex flex-col gap-2 mt-5 text-xs text-luxury-muted">
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-users text-sm shrink-0" aria-hidden="true" /> {space.capacity}
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-expand text-sm shrink-0" aria-hidden="true" /> {space.size}
                  </li>
                </ul>
                <span className="inline-flex items-center gap-2 brown-btn luxury-label text-[11px] mt-5 group-hover:gap-3 transition-all">
                  View Details <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
