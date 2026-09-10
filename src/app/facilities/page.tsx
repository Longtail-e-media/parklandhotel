import type { Metadata } from "next";
import FacilitiesHeader from "@/components/facilities/FacilitiesHeader";
import FacilitiesGrid from "@/components/facilities/FacilitiesGrid";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("facilities", {}, "/facilities", {
    title: `Hotel Facilities & Services | ${site.name}`,
    description:
      "Everyday comforts at Hotel Parkland, Sauraha — airport transfers, high-speed Wi-Fi, a garden pool, fitness centre, spa and more.",
  });
}

export default function FacilitiesPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <FacilitiesHeader />
      <FacilitiesGrid />
    </main>
  );
}
