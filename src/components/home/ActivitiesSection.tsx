import Image from "next/image";
import { activities } from "@/data/data";

export default function ActivitiesSection() {
  return (
    <section id="activities" className="bg-luxury-cream py-24 lg:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">Activities</p>
          <h2 className="luxury-section-title text-luxury-charcoal">Into the Heart of Chitwan</h2>
          <p className="text-luxury-muted mt-5">
            Seven ways to meet the jungle, each arranged through the hotel with an experienced local guide.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className={`relative group overflow-hidden aspect-3/4 animate-fade-in-up ${
                activity.featured ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 md:p-6">
                <h3 className={`luxury-section-title text-white ${activity.featured ? "text-2xl" : "text-lg"}`}>
                  {activity.title}
                </h3>
                {activity.subtitle && <p className="text-white/80 text-sm mt-1">{activity.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
