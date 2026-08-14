// import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import AboutSection from "@/components/home/AboutSection";
import RoomsSection from "@/components/home/RoomsSection";
import DiningSection from "@/components/home/DiningSection";
import LeisureSection from "@/components/home/LeisureSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import NearbySection from "@/components/home/NearbySection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      {/* <Hero /> */}
      <VideoSection />
      <AboutSection />
      <RoomsSection />
      <DiningSection />
      <LeisureSection />
      <ActivitiesSection />
      <AmenitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <NearbySection />
      <ContactSection />
    </main>
  );
}
