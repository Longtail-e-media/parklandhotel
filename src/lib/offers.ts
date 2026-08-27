import { getOffers } from "./data";
import { offersPage } from "@/data/data";
import type { OfferItem } from "@/types";

/** Live CMS offers for the /offers listing + detail pages, falling back to the static list when the API is empty. */
export async function getOffersList(): Promise<OfferItem[]> {
  const offers = await getOffers();
  return offers.length > 0 ? offers : offersPage.items;
}

/** Formats an offer's ISO expiry date for display, e.g. "30 Sep 2026". */
export function formatOfferExpiry(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Whether an offer's expiry date has already passed, relative to now. */
export function isOfferExpired(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}
