import type { Metadata } from "next";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("gallery", {}, "/gallery", {
    title: `Gallery | ${site.name}`,
    description:
      "Browse photos of Hotel Parkland in Sauraha — the property, rooms and suites, dining, wellness and Chitwan wildlife experiences.",
  });
}

export default function GalleryPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <GalleryHeader />
      <GalleryGrid />
    </main>
  );
}
