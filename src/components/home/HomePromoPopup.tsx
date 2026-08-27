import { getActivePopupSlides } from "@/lib/data";
import HomePromoPopupClient from "./HomePromoPopupClient";

/**
 * Promotional popup shown automatically on the homepage, from the CMS
 * `popup` endpoint. Renders nothing when no popup is currently active.
 */
export default async function HomePromoPopup() {
  const slides = await getActivePopupSlides();
  if (slides.length === 0) return null;

  return <HomePromoPopupClient slides={slides} />;
}
