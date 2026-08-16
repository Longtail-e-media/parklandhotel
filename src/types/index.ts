export interface NavItem {
  label: string;
  href: string;
  /** Sub-navigation — rendered as an accordion inside the drawer. */
  children?: NavItem[];
}

export interface RoomType {
  name: string;
  image: string;
  description: string;
  /** Nightly rate in USD — printed on the badge over the photo. */
  pricePerNight: number;
  /** Floor area as written on the card, e.g. "34 Sqm". */
  size: string;
  /** Maximum adults the room sleeps. */
  adults: number;
  /** Icon keys resolved by ROOM_FEATURES in RoomsSection — keep the two in step. */
  features: string[];
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
