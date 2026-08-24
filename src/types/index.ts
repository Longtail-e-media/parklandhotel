export interface NavItem {
  label: string;
  href: string;
  /** Sub-navigation — rendered as an accordion inside the drawer. */
  children?: NavItem[];
}

export interface RoomType {
  /** URL segment for the room's detail page, e.g. /accommodations/deluxe-room. */
  slug: string;
  name: string;
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
  /** Icon keys resolved by ROOM_FEATURES in RoomsSection — keep the two in step. */
  features: string[];
}

/** A dining or bar outlet on the /dining-bar listing and detail pages. */
export interface DiningVenue {
  /** URL segment for the venue's detail page, e.g. /dining-bar/the-parkland-restaurant. */
  slug: string;
  name: string;
  category: "restaurant" | "bar";
  image: string;
  images?: string[];
  excerpt: string;
  /** Longer copy for the detail page, one paragraph per entry. */
  description: string[];
  hours: string;
  features: string[];
}

/** A function/conference space on the /meetings-events listing and detail pages. */
export interface MeetingSpace {
  /** URL segment for the space's detail page, e.g. /meetings-events/grand-conference-hall. */
  slug: string;
  name: string;
  image: string;
  images?: string[];
  excerpt: string;
  /** Longer copy for the detail page, one paragraph per entry. */
  description: string[];
  capacity: string;
  size: string;
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
  /** ISO date string, e.g. "2026-06-12". */
  date: string;
  author: string;
  category: string;
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
}

export interface Testimonial {
  quote: string;
  author: string;
  source: string;
}

export interface AmenityItem {
  label: string;
  icon: string;
}

/** Facility card on the About page — an amenity with a line of explanation. */
export interface FacilityItem {
  title: string;
  description: string;
  /** Icon key resolved by ICONS in FacilitiesShowcase — keep the two in step. */
  icon: string;
}

/** Category key for a gallery photo — must match a `key` in galleryPage.categories. */
export type GalleryCategory = "hotel" | "rooms" | "dining" | "wellness" | "experiences";

export interface GalleryItem {
  src: string;
  alt: string;
  category: GalleryCategory;
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
