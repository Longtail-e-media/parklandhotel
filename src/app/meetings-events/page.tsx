import type { Metadata } from "next";
import MeetingsHeader from "@/components/meetings/MeetingsHeader";
import MeetingsGrid from "@/components/meetings/MeetingsGrid";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Meetings & Events | ${site.name}`,
  description:
    "Conference halls, garden pavilions and private boardrooms at Hotel Parkland, Sauraha — for corporate retreats, weddings and celebrations.",
  alternates: { canonical: "/meetings-events" },
  openGraph: {
    title: `Meetings & Events | ${site.name}`,
    description:
      "Conference halls, garden pavilions and private boardrooms at Hotel Parkland, Sauraha — for corporate retreats, weddings and celebrations.",
    url: "/meetings-events",
    siteName: site.name,
    type: "website",
  },
};

export default function MeetingsEventsPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <MeetingsHeader />
      <MeetingsGrid />
    </main>
  );
}
