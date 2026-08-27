import Image from "next/image";
import Link from "next/link";
import { getRooms } from "@/lib/data";
import { rooms as fallbackRooms } from "@/data/data";
import type { RoomType } from "@/types";
import Watermark from "@/components/ui/Watermark";


function RoomStat({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1.5 sm:flex-row sm:items-center sm:text-left sm:gap-3 min-w-0">
      <span className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-gold-text shrink-0">
        <i className={`fa-solid fa-${icon} text-base sm:text-lg`} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-luxury-charcoal leading-tight wrap-break-word">{value}</p>
        <p className="text-xs text-luxury-muted mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function RoomCard({ room, priority }: { room: RoomType; priority: boolean }) {
  return (
    <article className="group luxury-surface overflow-hidden grid md:grid-cols-2">
      <div className="relative min-h-70 md:min-h-0 overflow-hidden luxury-img-zoom">
        <Image
          src={room.image}
          alt={`${room.name} interior`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />

      </div>

      <div className="p-7 sm:p-9 lg:p-10 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="luxury-section-title text-2xl lg:text-[1.75rem]">{room.name}</h3>

        </div>

        <p className="mt-3">
          <span className="text-xl text-gold-text">${room.pricePerNight}.00</span>
          <span className="luxury-label text-[11px] text-luxury-muted ml-1.5">/ Night</span>
        </p>

        <p className="text-luxury-muted mt-4 leading-relaxed">{room.description}</p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 bg-luxury-cream-alt/60 rounded-2xl px-4 sm:px-6 py-5">
          <RoomStat icon="user" value={`${room.adults} Person`} label="Guests" />
          <RoomStat icon="bed" value={room.beds} label="Bed Type" />
          <RoomStat icon="expand" value={room.size} label="Room Size" />
        </div>

        <div className="flex items-center justify-between gap-4 mt-auto pt-6">
          <Link
            href={`/accommodations/${room.slug}`}
            className="inline-flex items-center gap-2 brown-btn luxury-label text-[11px] hover:gap-3 transition-all"
          >
            View Details <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="luxury-btn py-2.5! px-5! text-[11px] bg-(--color-primary-green) text-white">
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function RoomsSection() {
  const apiRooms = await getRooms();
  const rooms = apiRooms.length > 0 ? apiRooms : fallbackRooms;

  return (
    <section id="rooms" className="relative overflow-hidden py-10 lg:pb-30 scroll-mt-24">
      <Watermark
        motif="leaf"
        className="w-24 lg:w-36 left-[6%] top-24 text-gold/7"
        rotate={14}
        duration={17}
      />
      <Watermark
        motif="palm"
        className="w-48 lg:w-72 -right-16 top-1/3 text-luxury-charcoal/4"
        rotate={6}
        duration={21}
        delay={2}
        flip
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">


        <div className="flex flex-col gap-8 lg:gap-10 animate-fade-in-up delay-100">
          {rooms.map((room, i) => (
            <RoomCard key={room.slug} room={room} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
