import Image from "next/image";
import { Star } from "lucide-react";
import { trustBadges } from "@/data/data";
import { business } from "@/config/site";

export default function TrustSection() {
  const rating = business.aggregateRating;

  return (
    <section className="bg-luxury-cream border-b border-luxury-border py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-10 items-center animate-fade-in-up">
          {rating && (
            <div className="flex items-center gap-6 md:border-r md:border-luxury-border md:pr-10">
              <div className="shrink-0 text-center">
                <p className="luxury-hero-title text-4xl text-gold leading-none">{rating.ratingValue}</p>
                <div className="flex gap-0.5 justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      style={{ color: i < Math.round(Number(rating.ratingValue)) ? "var(--luxury-gold)" : "var(--luxury-border)" }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-luxury-muted leading-relaxed">
                Ranked <strong className="text-luxury-charcoal">#2 of 36</strong> specialty lodging in
                Sauraha, from <strong className="text-luxury-charcoal">{rating.reviewCount} traveller
                reviews</strong> on TripAdvisor.
              </p>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-6 grayscale opacity-70">
            {trustBadges.map((badge) => (
              <Image key={badge.name} src={badge.image} alt={badge.name} width={120} height={36} className="h-9 w-auto object-contain" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
