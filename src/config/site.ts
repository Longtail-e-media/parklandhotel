/**
 * ============================================================================
 *  SITE CONFIG — the single source of truth for Hotel Parkland's identity.
 *
 *  Three other places hold per-property values, by design:
 *    1. src/app/globals.css  → brand colours (--luxury-gold, etc.)
 *    2. src/data/data.ts     → homepage content (copy, images, arrays)
 *    3. public/img           → photography
 *
 *  No CMS is wired up yet — every page reads straight from this file and
 *  data/data.ts. If Parkland gets a headless CMS later, that's a data-layer
 *  swap behind the same functions in data/data.ts; nothing here changes.
 * ============================================================================
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hotelparkland.com.np"
).replace(/\/$/, "");

export const site = {
  name: "Hotel Parkland",
  shortName: "Parkland",
  title: "Hotel Parkland | Sauraha, Chitwan National Park, Nepal",
  description:
    "Hotel Parkland is a five-star sanctuary in Sauraha, ten minutes from the gates of Chitwan National Park — traditional hospitality in a sylvan setting since 1987.",
  keywords:
    "Hotel Parkland, Sauraha hotel, Chitwan National Park hotel, Chitwan resort, jungle lodge Nepal, elephant safari Chitwan",
  locale: "en",
  schemaType: ["Resort", "LodgingBusiness"] as readonly string[],
} as const;

export const contact = {
  phone: "+977-9841229970",
  phoneE164: "+9779841229970",
  whatsapp: "9779841229970",
  email: "parkland@mail.com.np",
} as const;

/** Kathmandu reservations office. */
export const kathmanduOffice = {
  label: "Kathmandu Office",
  address: "Citron Gardens, Thamel, Kathmandu, Nepal",
  phones: ["+977-01-4701888", "+977-01-4701887"],
  mobile: { name: "Biken", number: "+977-9841229970" },
  email: "parkland@mail.com.np",
} as const;

/** Chitwan (on-site) office. */
export const chitwanOffice = {
  label: "Chitwan Office",
  address: "Sauraha, Chitwan National Park, Nepal",
  phones: ["+977-056-580344"],
  mobile: { name: "Anjan", number: "+977-9845043068" },
  email: "parkland@mail.com.np",
} as const;

export const address = {
  street: "Sauraha",
  locality: "Sauraha",
  region: "Chitwan District, Bagmati Province",
  country: "NP",
  full: "Sauraha, Chitwan National Park, Nepal",
  geo: { latitude: 27.5804, longitude: 84.5064 },
  mapUrl: "https://maps.app.goo.gl/hVv3S8sK5s7bXktb7",
} as const;

export const business = {
  priceRange: "$$",
  currency: "NPR",
  starRating: 5,
  checkinTime: "12:00",
  checkoutTime: "10:00",
  numberOfRooms: 32,
  languages: ["English", "Nepali", "Hindi"],
  amenities: [
    "Swimming Pool",
    "Restaurant & Bar",
    "Free WiFi",
    "Garden",
    "Conference Hall",
    "Room Service",
    "24-Hour Security",
    "Bicycle Rental",
  ],
  /**
   * Real, verifiable rating (TripAdvisor, checked 2026-08). Set to `null` if
   * this ever can't be confirmed against a live, on-page source.
   */
  aggregateRating: {
    ratingValue: "4.0",
    reviewCount: "211",
    bestRating: "5",
    worstRating: "1",
  } as {
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  } | null,
} as const;

export const links = {
  /** No live booking engine yet — CTAs fall back to a phone call. */
  booking: `tel:${contact.phoneE164}`,
  social: ["https://www.facebook.com/Hotel-Parkland-Chitwan-National-Park-Sauraha"] as string[],
} as const;
