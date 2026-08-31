import type { Metadata } from "next";
import RoomsHeader from "@/components/accommodations/RoomsHeader";
import RoomsSection from "@/components/accommodations/RoomsSection";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("accommodations", {}, "/accommodations", {
    title: `Accommodation | ${site.name}`,
    description:
      "Thirty-two rooms across three categories at Hotel Parkland, Sauraha — each pairing warm, natural materials with the quiet of the garden beyond the window.",
  });
}

export default function AccommodationsPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <RoomsHeader />
      <RoomsSection />
    </main>
  );
}
