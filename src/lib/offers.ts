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
