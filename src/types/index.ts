export interface NavItem {
  label: string;
  href: string;
  /** Sub-navigation — rendered as an accordion inside the drawer. */
  children?: NavItem[];
}

export interface RoomType {
  /** URL segment for the room's detail page, e.g. /accommodation/deluxe-room. */
  slug: string;
  name: string;
  img?: { src: string; title: string }[];
  image: string;
  /** Extra photos shown in the detail page gallery, beyond `image`. */
  images?: string[];
  description: string;
  /** Longer copy for the detail page, one paragraph per entry. Falls back to `description` if omitted. */
  longDescription?: string[];
  /** Nightly rate in USD — printed on the badge over the photo. */
  pricePerNight: number;
  /** Floor area as written on the card, e.g. "34 Sqm". */
  size: string;
  /** Maximum adults the room sleeps. */
  adults: number;
  /** Bed configuration as written on the card, e.g. "1 King Bed". */
  beds: string;
  /** Guest rating out of 5, shown as stars on the listing card. */
  rating: number;
  /** Shows a "Featured" badge over the photo on the listing card. */
  featured?: boolean;
  /** Amenities/features — titled, with an icon (Font Awesome class) or feature image resolved from the CMS. */
  features: RoomFeature[];
}

/** One room amenity — `icon` is a full Font Awesome class, `image` a feature image used when no icon is set. */
export interface RoomFeature {
  title: string;
  /** Full Font Awesome class from the CMS, e.g. "fa-solid fa-broom". */
  icon?: string;
  /** Feature image URL from the CMS, shown when no `icon` is set. */
  image?: string;
}

/** A dining or bar outlet on the /dining-bar listing and detail pages. */
export interface DiningVenue {
  /** URL segment for the venue's detail page, e.g. /dining-bar/the-parkland-restaurant. */
  slug: string;
  name: string;
  sub_title?: string;
  category: "restaurant" | "bar";
  image: string;
  images?: string[];
  excerpt: string;
  /** Longer copy for the detail page — raw HTML from the CMS, rendered as-is so its own tags/classes are preserved. */
  description: string;
  /** Not modelled by the CMS yet — omitted when unavailable. */
  hours?: string;
  /** Amenities/features — titled, with an icon (Font Awesome class) or feature image resolved from the CMS. */
  features: RoomFeature[];
}

/** A function/conference space on the /meetings-events listing and detail pages. */
export interface MeetingSpace {
  /** URL segment for the space's detail page, e.g. /meetings-events/grand-conference-hall. */
  slug: string;
  name: string;
  image: string;
  images?: string[];
  excerpt: string;
  /** Longer copy for the detail page — raw HTML from the CMS, rendered as-is so its own tags/classes are preserved. */
  description: string;
  /** Derived from the largest configured setup-style pax count — omitted when the CMS has none. */
  capacity?: string;
  /** Not always populated by the CMS — omitted when unavailable. */
  size?: string;
  features: string[];
  /** Max pax per seating configuration, shown as the Occupancy and Setup Style table. Omit for spaces with a fixed single layout. */
  setupStyles?: { style: string; pax: number }[];
}

/** A post on the /blog listing and detail pages. */
export interface BlogPost {
  /** URL segment for the post's detail page, e.g. /blog/a-guide-to-jungle-safaris. */
  slug: string;
  title: string;
  excerpt: string;
  /** Body copy, one paragraph per entry. */
  content: string[];
  image: string;
  /** Date string, e.g. "2026-06-12" (static data) or "August 27, 2026" (CMS) — anything Date-parseable. */
  date: string;
  author: string;
  /** Not set for CMS-sourced posts — the CMS `blog` endpoint has no category field. */
  category?: string;
}

export interface ActivityItem {
  title: string;
  subtitle?: string;
  image: string;
  /** Large hero tile spanning 2x2 in the bento grid. */
  featured?: boolean;
}

export interface NearbyItem {
  title: string;
  /** Approximate road distance from the hotel — printed on the card. */
  distance: string;
  /** Google Maps search query the embedded map loads when the card is picked. */
  query: string;
  description: string;
  /** Kept for the old card layout / future use; the map list doesn't render it. */
  image?: string;
  /** CMS-provided Google Maps embed URL — used directly as the <iframe src> instead of building one from `query`. */
  mapUrl?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  source: string;
  /** Guest rating out of 5, shown as stars on the card. */
  rating?: number;
}

export interface AmenityItem {
  label: string;
  icon: string;
  image?: string;
  /** URL segment for the amenity's /services detail page — unset for statically-defined fallback amenities that have no matching CMS facility. */
  slug?: string;
}

/** A hotel facility on the /services listing and detail pages, from the CMS `services` (type 1) group. */
export interface ServiceItem {
  /** URL segment for the facility's detail page, e.g. /services/swimming-pool. */
  slug: string;
  title: string;
  image: string;
  /** Extra photos shown in the detail page gallery, beyond `image`. */
  images?: string[];
  /** Longer copy for the detail page, one paragraph per entry — empty when the CMS hasn't filled it in yet. */
  description: string[];
  /** Font Awesome class from the CMS icon field — empty for every facility today, so cards fall back to `image`. */
  icon?: string;
}

/** Facility card on the About page — an amenity with a line of explanation. */
export interface FacilityItem {
  title: string;
  description: string;
  /** Icon key resolved by ICONS in FacilitiesShowcase — keep the two in step. */
  icon: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  /** Filter-pill key — a CSS-safe slug (see `getGalleryPage` in lib/data.ts for CMS items, or a static key from galleryPage.categories for the fallback). */
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** An experience highlight on the /experiences-destination page. */
export interface ExperienceItem {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/** A nearby attraction on the /experiences-destination page, from the CMS `nearby` endpoint. */
export interface Landmark {
  id: string;
  title: string;
  subtitle: string;
  /** Rich-text HTML body. */
  content: string;
  distance: string;
  /** Google Maps embed URL — used directly as an <iframe src>. */
  map_url: string;
}

/** Raw shape of one `blog` entry, as returned by the CMS `api_blog.php`. */
export interface NewsData {
  id?: number;
  slug: string;
  title: string;
  author?: string;
  date: string;
  image?: string;
  banner_image?: string | null;
  content?: string;
  meta_description?: string;
}

/** An offer/package on the /offers listing page. */
export interface OfferItem {
  slug: string;
  name: string;
  image: string;
  /** Extra photos shown in the detail page gallery, beyond `image`. */
  images?: string[];
  excerpt: string;
  /** Price line as written on the card, e.g. "NPR 2,200 per person". */
  price?: string;
  /** Numeric per-pax rate the booking form multiplies by pax count. */
  unitPrice: number;
  /** Currency label shown alongside unitPrice, e.g. "NPR". */
  currency: string;
  /** ISO date string the offer is valid through, e.g. "2026-09-30". */
  expiryDate: string;
}
