import type { Metadata } from "next";
import RoomsHeader from "@/components/accommodations/RoomsHeader";
import RoomsSection from "@/components/accommodations/RoomsSection";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Accommodation | ${site.name}`,
  description:
    "Thirty-two rooms across three categories at Hotel Parkland, Sauraha — each pairing warm, natural materials with the quiet of the garden beyond the window.",
  alternates: { canonical: "/accommodations" },
  openGraph: {
    title: `Accommodation | ${site.name}`,
    description:
      "Thirty-two rooms across three categories at Hotel Parkland, Sauraha — each pairing warm, natural materials with the quiet of the garden beyond the window.",
    url: "/accommodations",
    siteName: site.name,
    type: "website",
  },
};

export default function AccommodationsPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <RoomsHeader />
      <RoomsSection />
    </main>
  );
}
