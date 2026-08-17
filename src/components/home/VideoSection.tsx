import { hero } from "@/data/data";
import Link from "next/link";
export default function VideoSection() {
  return (
<section className="relative w-full h-screen overflow-hidden">
  <video
    src="/videos/park.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Top gradient */}
  <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-[1]" />

  {/* Hero content */}
  <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-6">
    <p className="luxury-label text-white mb-3 animate-fade-in-up">
      {hero.eyebrow}
    </p>

    <h1 className="luxury-hero-title text-white max-w-4xl whitespace-pre-line animate-fade-in-up delay-100">
      {hero.title}
    </h1>

    <p className="luxury-subtitle text-white max-w-xl mt-6 animate-fade-in-up delay-200">
      {hero.subtitle}
    </p>

    <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300 mb-14">
      <Link href="#book" className="luxury-btn luxury-btn-solid">
          Explore our Rooms
      </Link>
    </div>
  </div>
</section>
  );
}