import type { Metadata } from "next";
import DiningHeader from "@/components/dining/DiningHeader";
import DiningVenuesGrid from "@/components/dining/DiningVenuesGrid";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Dining & Bar | ${site.name}`,
  description:
    "From authentic Nepalese flavours to international favourites — restaurants, garden dining and the Parkland Bar at Hotel Parkland, Sauraha.",
  alternates: { canonical: "/dining-bar" },
  openGraph: {
    title: `Dining & Bar | ${site.name}`,
    description:
      "From authentic Nepalese flavours to international favourites — restaurants, garden dining and the Parkland Bar at Hotel Parkland, Sauraha.",
    url: "/dining-bar",
    siteName: site.name,
    type: "website",
  },
};

export default function DiningBarPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <DiningHeader />
      <DiningVenuesGrid />
    </main>
  );
}
