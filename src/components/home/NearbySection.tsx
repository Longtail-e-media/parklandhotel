import { getNearbyLandmarks } from "@/lib/data";
import { nearby as fallbackNearby } from "@/data/data";
import NearbySectionClient from "./NearbySectionClient";

export default async function NearbySection() {
  const items = await getNearbyLandmarks();

  return <NearbySectionClient items={items.length > 0 ? items : fallbackNearby} />;
}
