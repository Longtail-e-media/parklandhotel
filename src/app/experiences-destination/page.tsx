import type { Metadata } from "next";
import ExperiencesHeader from "@/components/experiences/ExperiencesHeader";
import ExperienceRows from "@/components/experiences/ExperienceRows";
import DestinationSection from "@/components/experiences/DestinationSection";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Experiences & Destination | ${site.name}`,
  description:
    "Poolside mornings, golden-hour sundowners, elephant bathing at the riverbank and Tharu culture — the experiences and Chitwan landmarks that shape a stay at Hotel Parkland, Sauraha.",
  alternates: { canonical: "/experiences-destination" },
  openGraph: {
    title: `Experiences & Destination | ${site.name}`,
    description:
      "Poolside mornings, golden-hour sundowners, elephant bathing at the riverbank and Tharu culture — the experiences and Chitwan landmarks that shape a stay at Hotel Parkland, Sauraha.",
    url: "/experiences-destination",
    siteName: site.name,
    type: "website",
  },
};

export default function ExperiencesDestinationPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <ExperiencesHeader />
      <ExperienceRows />
      <DestinationSection />
    </main>
  );
}
