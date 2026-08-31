import type { Metadata } from "next";
import OffersHeader from "@/components/offers/OffersHeader";
import OffersGrid from "@/components/offers/OffersGrid";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("offers", {}, "/offers", {
    title: `Offers & Packages | ${site.name}`,
    description:
      "Seasonal dining events and stay packages at Hotel Parkland in Sauraha, Chitwan National Park — limited-time offers, reserved online.",
  });
}

export default function OffersPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <OffersHeader />
      <OffersGrid />
    </main>
  );
}
