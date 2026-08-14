import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { hero } from "@/data/data";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <Image
        src={hero.image}
        alt="Aerial view of Hotel Parkland's pool and gardens"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="luxury-label text-white/90 mb-6 animate-fade-in-up">{hero.eyebrow}</p>
        <h1 className="luxury-hero-title text-white max-w-4xl whitespace-pre-line animate-fade-in-up delay-100">
          {hero.title}
        </h1>
        <p className="luxury-subtitle text-white/85 max-w-xl mt-6 animate-fade-in-up delay-200">
          {hero.subtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300">
          <Link href="#book" className="luxury-btn luxury-btn-solid">
            Book Your Stay
          </Link>
          <Link href="#rooms" className="luxury-btn luxury-btn-light">
            Explore The Resort
          </Link>
        </div>
        
      </div>

      <Link
        href="#about"
        aria-label="Scroll down"
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80"
      >
        <ChevronDown className="w-7 h-7" />
      </Link>
    </section>
  );
}
