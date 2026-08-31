import type { Metadata } from "next";
import DiningHeader from "@/components/dining/DiningHeader";
import DiningVenuesGrid from "@/components/dining/DiningVenuesGrid";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("dining-bar", {}, "/dining-bar", {
    title: `Dining & Bar | ${site.name}`,
    description:
      "From authentic Nepalese flavours to international favourites — restaurants, garden dining and the Parkland Bar at Hotel Parkland, Sauraha.",
  });
}

export default function DiningBarPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <DiningHeader />
      <DiningVenuesGrid />
    </main>
  );
}
