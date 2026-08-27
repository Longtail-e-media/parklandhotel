import { getNearbyLandmarks } from "@/lib/data";
import { nearby as fallbackNearby } from "@/data/data";
import DestinationSectionClient from "./DestinationSectionClient";

export default async function DestinationSection() {
  const items = await getNearbyLandmarks();

  return <DestinationSectionClient items={items.length > 0 ? items : fallbackNearby} />;
}
