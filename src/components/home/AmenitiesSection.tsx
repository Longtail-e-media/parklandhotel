import { amenities } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

const ICONS: Record<string, string> = {
  wifi: "wifi",
  bell: "bell",
  "shield-check": "shield-halved",
  car: "car",
  bike: "bicycle",
  banknote: "money-bill",
  music: "music",
  users: "users",
  waves: "water",
};

export default function AmenitiesSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <Watermark
        motif="palm"
        className="w-40 lg:w-56 left-[5%] top-4 text-gold/6"
        rotate={-8}
        duration={19}
      />
      <Watermark
        motif="bird"
        className="w-24 lg:w-32 right-[8%] bottom-10 text-luxury-charcoal/5"
        rotate={8}
        duration={12}
        delay={0.6}
        flip
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[20rem_1fr] xl:grid-cols-[22rem_1fr] gap-12 lg:gap-16 items-center">
          {/* --- Intro column -------------------------------------------- */}
          <div className="animate-fade-in-up">
            <p className="luxury-label text-gold-text mb-4">The parkland Experience</p>
            <h2 className="luxury-section-title text-luxury-charcoal">Comfort in Every Details</h2>
            <p className="text-luxury-muted mt-5 leading-relaxed">
              From seamless connectivity to effortless exploration, every detail is thoughtfully taken care of — so you can simply relax and enjoy your time in Chitwan.
            </p>
            <a href="#contact" className="luxury-btn luxury-btn-accent mt-8">
              View All
            </a>
          </div>

          {/* --- Amenity cards ------------------------------------------- */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 animate-fade-in-up delay-100">
            {amenities.map((item) => {
              const icon = ICONS[item.icon];
              return (
                <div
                  key={item.label}
                  className="group flex flex-col items-center justify-center gap-5 text-center rounded-2xl  bg-[#fff5f594] px-5 py-10 transition-all duration-500 hover:-translate-y-1.5"
                >
                  {icon && (
                    <i
                      className={`fa-solid fa-${icon} text-[60px] opacity-90 text-luxury-charcoal transition-colors duration-500 group-hover:text-(--color-dark-brown)`}
                      aria-hidden="true"
                    />
                  )}
                  <p className="font-display text-lg text-luxury-charcoal leading-snug">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
