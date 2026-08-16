import Image from "next/image";
import { Star } from "lucide-react";
import { trustBadges } from "@/data/data";
import { business } from "@/config/site";


export default function TrustSection() {
  const rating = business.aggregateRating;

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-10 items-center animate-fade-in-up border-y border-hairline py-10">
          {rating && (
            <div className="flex items-center gap-6 md:border-r md:border-hairline md:pr-10">
              <div className="shrink-0 text-center">
                <p className="luxury-hero-title text-4xl text-gold leading-none">{rating.ratingValue}</p>
                <div className="flex gap-0.5 justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      style={{ color: i < Math.round(Number(rating.ratingValue)) ? "var(--luxury-gold)" : "var(--line-soft)" }}
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
          <div className="hidden flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-6 grayscale opacity-60 hover:opacity-90 transition-opacity">
            {trustBadges.map((badge, i) => (
              <a key={i} href={badge.link} target="_blank" >
                <Image src={badge.image} alt={badge.link} width={100} height={36} className="h-9 w-auto object-contain" />
              </a>
            ))
            }

          </div>
        </div>
      </div>
    </section>
  );
}
