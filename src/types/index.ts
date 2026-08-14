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
  badge: string;
  image: string;
  description: string;
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
