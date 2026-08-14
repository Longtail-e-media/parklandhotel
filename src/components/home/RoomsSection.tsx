import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { rooms } from "@/data/data";

export default function RoomsSection() {
  return (
    <section id="rooms" className="bg-luxury-cream-alt py-24 lg:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">Rooms & Suites</p>
          <h2 className="luxury-section-title text-luxury-charcoal">Restful Spaces, Reimagined</h2>
          <p className="text-luxury-muted mt-5">
            Thirty-two rooms are being reimagined for our five-star chapter — each pairing warm, natural
            materials with the quiet of the garden beyond the window.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <div key={room.name} className={`group animate-fade-in-up delay-${(i + 1) * 100}`}>
              <div className="aspect-4/5 overflow-hidden luxury-img-zoom">
                <Image
                  src={room.image}
                  alt={`${room.name} interior`}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-6">
                <h3 className="luxury-section-title text-2xl">{room.name}</h3>
                <p className="text-luxury-muted text-sm mt-2 leading-relaxed">{room.description}</p>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-gold-text luxury-label text-[11px] mt-5 hover:gap-3 transition-all"
                >
                  Rates & Tariffs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
