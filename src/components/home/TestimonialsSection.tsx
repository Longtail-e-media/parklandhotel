import { getTestimonials } from "@/lib/data";
import { testimonials as fallbackTestimonials } from "@/data/data";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  return (
    <TestimonialsCarousel testimonials={testimonials.length > 0 ? testimonials : fallbackTestimonials} />
  );
}
