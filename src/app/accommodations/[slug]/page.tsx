import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Baby,
  Check,
  Coffee,
  Maximize2,
  Tv,
  User,
  Wifi,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { rooms } from "@/data/data";
import { site } from "@/config/site";
import RoomGallery from "@/components/accommodations/RoomGallery";
import RoomBookingWidget from "@/components/accommodations/RoomBookingWidget";
import Watermark from "@/components/ui/Watermark";

/** Mirrors ROOM_FEATURES in RoomsSection — keep the two in step. */
const ROOM_FEATURES: Record<string, { icon: LucideIcon; label: string }> = {
  wifi: { icon: Wifi, label: "Free Wifi" },
  tv: { icon: Tv, label: "TV" },
  breakfast: { icon: Coffee, label: "Breakfast Included" },
  ac: { icon: Wind, label: "Air Condition" },
  bath: { icon: Bath, label: "Ensuite Bath" },
};

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return {};

  const title = `${room.name} | Accommodation | ${site.name}`;
  return {
    title,
    description: room.description,
    alternates: { canonical: `/accommodations/${room.slug}` },
    openGraph: {
      title,
      description: room.description,
      url: `/accommodations/${room.slug}`,
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();

  const otherRooms = rooms.filter((r) => r.slug !== room.slug);
  const galleryImages = room.images && room.images.length > 0 ? room.images : [room.image];

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <section className="relative pt-36 lg:pt-44 pb-24 lg:pb-32">
        <Watermark
          motif="leaf"
          className="w-28 lg:w-40 -left-8 top-20 text-gold/6"
          rotate={-14}
          duration={18}
        />
        <Watermark
          motif="elephant"
          className="w-40 lg:w-56 -right-10 top-1/2 text-luxury-charcoal/4"
          rotate={0}
          duration={22}
          delay={1.4}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            href="/accommodations"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> All Rooms
          </Link>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            <div className="min-w-0 lg:col-span-2 animate-slide-in-left">
              <RoomGallery images={galleryImages} name={room.name} />

              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 mt-9">
                <div>
                  <p className="luxury-label text-gold-text mb-3">Accommodation</p>
                  <h1 className="luxury-section-title text-luxury-charcoal text-3xl lg:text-4xl">
                    {room.name}
                  </h1>
                </div>
                <p className="pt-1">
                  <span className="text-2xl lg:text-3xl text-gold-text">
                    ${room.pricePerNight}
                  </span>
                  <span className="luxury-label text-[11px] text-luxury-muted ml-2">/ Night</span>
                </p>
              </div>

              <div className="mt-7 space-y-4 text-luxury-muted leading-relaxed">
                {(room.longDescription ?? [room.description]).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <h2 className="luxury-section-title text-xl lg:text-2xl mt-12 mb-6">Room Amenities</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.features.map((key) => {
                  const feature = ROOM_FEATURES[key];
                  if (!feature) return null;
                  const Icon = feature.icon;
                  return (
                    <li
                      key={key}
                      className="flex items-center gap-3 text-luxury-muted border border-hairline rounded-xl px-4 py-3.5"
                    >
                      <Icon className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                      {feature.label}
                    </li>
                  );
                })}
                <li className="flex items-center gap-3 text-luxury-muted border border-hairline rounded-xl px-4 py-3.5">
                  <User className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                  Adults: {room.adults}
                </li>
                <li className="flex items-center gap-3 text-luxury-muted border border-hairline rounded-xl px-4 py-3.5">
                  <Maximize2 className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                  Size: {room.size}
                </li>
                <li className="flex items-center gap-3 text-luxury-muted border border-hairline rounded-xl px-4 py-3.5">
                  <BedDouble className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                  Bed Type: {room.beds}
                </li>
              </ul>

              <div className="grid sm:grid-cols-2 gap-8 mt-12">
                <div>
                  <h2 className="luxury-section-title text-xl lg:text-2xl mb-5">Check-in</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-luxury-muted">
                      <Check className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                      Check-in from 02:00 PM
                    </li>
                    <li className="flex items-center gap-3 text-luxury-muted">
                      <Check className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                      Early check-in subject to availability
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="luxury-section-title text-xl lg:text-2xl mb-5">Check-out</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-luxury-muted">
                      <Check className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                      Check-out before noon
                    </li>
                    <li className="flex items-center gap-3 text-luxury-muted">
                      <Check className="w-4 h-4 brown-btn shrink-0" strokeWidth={1.5} aria-hidden />
                      Express check-out
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="luxury-section-title text-xl lg:text-2xl mt-12 mb-6">Children &amp; Extra Beds</h2>
              <div className="luxury-surface flex flex-col sm:flex-row gap-6 p-6 lg:p-7">
                <div className="shrink-0 w-11 h-11 rounded-full bg-luxury-cream-alt flex items-center justify-center">
                  <Baby className="w-5 h-5 brown-btn" strokeWidth={1.5} aria-hidden />
                </div>
                <ul className="space-y-3 text-luxury-muted leading-relaxed">
                  <li className="flex gap-3">
                    <Check className="w-4 h-4 brown-btn shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                    <span>Children are welcome — kids stay free when using existing bedding.</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-4 h-4 brown-btn shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                    <span>Children may not be eligible for complimentary breakfast.</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-4 h-4 brown-btn shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                    <span>Rollaway / extra beds are available for $10 per day, subject to availability.</span>
                  </li>
                </ul>
              </div>
            </div>

            <RoomBookingWidget
              room={room}
              rooms={rooms}
              className="min-w-0 lg:sticky  top-24 animate-slide-in-right"
            />
          </div>
        </div>
      </section>

      {otherRooms.length > 0 && (
        <section className="relative pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="luxury-section-title text-luxury-charcoal mb-10 text-4xl">Other Rooms</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherRooms.map((r) => (
                <Link
                  key={r.slug}
                  href={`/accommodations/${r.slug}`}
                  className="group luxury-surface overflow-hidden block"
                >
                  <div className="aspect-4/5 overflow-hidden luxury-img-zoom">
                    <Image
                      src={r.image}
                      alt={`${r.name} interior`}
                      width={500}
                      height={625}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="luxury-section-title text-lg  md:text-3xl">{r.name}</h3>
                    <p className="text-luxury-muted text-sm mt-2">${r.pricePerNight} / night</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
