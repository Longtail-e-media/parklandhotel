import { Star } from "lucide-react";
import { testimonials } from "@/data/data";

export default function TestimonialsSection() {
  return (
    <section className="bg-luxury-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">Guest Stories</p>
          <h2 className="luxury-section-title text-luxury-charcoal">What Our Guests Are Saying</h2>
          <p className="text-luxury-muted mt-5">Real words from real stays, via TripAdvisor.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="relative bg-luxury-cream-alt p-10 animate-fade-in-up">
              <p aria-hidden className="absolute top-4 left-6 text-7xl leading-none text-gold/15 font-serif">
                &ldquo;
              </p>
              <div className="relative flex gap-0.5 text-gold mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5" fill="currentColor" />
                ))}
              </div>
              <p className="relative text-luxury-charcoal/80 leading-relaxed mb-6">{t.quote}</p>
              <p className="relative luxury-section-title text-lg">{t.author}</p>
              <p className="relative luxury-label text-[11px] text-luxury-muted mt-1">{t.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
