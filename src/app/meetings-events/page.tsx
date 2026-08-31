import type { Metadata } from "next";
import MeetingsHeader from "@/components/meetings/MeetingsHeader";
import MeetingsGrid from "@/components/meetings/MeetingsGrid";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("meetings-events", {}, "/meetings-events", {
    title: `Meetings & Events | ${site.name}`,
    description:
      "Conference halls, garden pavilions and private boardrooms at Hotel Parkland, Sauraha — for corporate retreats, weddings and celebrations.",
  });
}

export default function MeetingsEventsPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <MeetingsHeader />
      <MeetingsGrid />
    </main>
  );
}
