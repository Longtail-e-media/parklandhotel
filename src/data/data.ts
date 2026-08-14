// Homepage content — the fallback/demo data layer (see config/site.ts header
// comment). No CMS is wired up yet, so every home section reads straight from
// here. Copy is sourced from the live hotelparkland.com.np site and verified
// TripAdvisor data; imagery is curated stock standing in for a future
// photoshoot (the property is repositioning to 5-star).

import type {
  NavItem,
  RoomType,
  ActivityItem,
  NearbyItem,
  Testimonial,
  AmenityItem,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "" },
  {
    label: "Accommodation",
    href: "",
    // Mirrors the room types in `rooms` below — keep the two lists in step.
    children: [
      { label: "Deluxe Garden Rooms", href: "" },
      { label: "Premier Rooms", href: "" },
      { label: "Parkland Suites", href: "" },
    ],
  },
  { label: "Dining", href: "" },
  { label: "Experiences & Destination", href: "" },
  { label: "Offers & Packages", href: "" },
  { label: "Blog", href: "" },
  { label: "Events", href: "" },
  { label: "Contact", href: "" }
];

export const hero = {
  eyebrow: "Sauraha · Chitwan National Park, Nepal",
  title: "A Five-Star Sanctuary\non the Edge of the Wild",
  subtitle:
    "Traditional hospitality in a sylvan setting — ten minutes from the heart of Sauraha, and minutes from the gates of the jungle.",
  image: "/img/hero.jpg",
};

export const about = {
  eyebrow: "Welcome To Hotel Parkland",
  title: "Where Jungle Tranquility\nMeets Refined Comfort",
  paragraphs: [
    "Since 1987, Hotel Parkland has offered travellers a quiet and peaceful stay just ten minutes from the centre of Sauraha, and only minutes from the entrance to Chitwan National Park and its office.",
    "Our magnificent, mature gardens shelter rare indigenous trees, shrubs and flowers that draw birds and butterflies year-round — the same sylvan calm that keeps so many of our guests returning, year after year. As we embark on our journey toward five-star hospitality, that quiet, garden-bound character remains our compass.",
  ],
  image: "/img/garden.jpg",
  stats: [
    { value: "1987", label: "Est. Since" },
    { value: "32", label: "Rooms & Suites" },
    { value: "10 Min", label: "To Sauraha Centre" },
  ],
};

export const rooms: RoomType[] = [
  {
    name: "Deluxe Garden Room",
    image: "/img/rooms/room-deluxe.jpg",
    description:
      "Garden-facing rooms with warm wood tones and private balconies overlooking mature gardens.",
  },
  {
    name: "Premier Room",
    image: "/img/rooms/room-premier.jpg",
    description:
      "Spacious interiors with elevated finishes, designed for longer, more restorative stays.",
  },
  {
    name: "Parkland Suite",
    image: "/img/rooms/room-villa.jpg",
    description:
      "Our most refined address — generous living space for guests who want a little more room to unwind.",
  },
];

export const dining = {
  eyebrow: "Dining & Bar",
  title: "Dine Under the Sauraha Sky",
  paragraph:
    "Take breakfast on the open-air terrace, or settle in for a full buffet spread at our restaurant after a day in the jungle. Our bar keeps the evening unhurried, with the garden as its backdrop.",
  features: [
    "Indoor restaurant & open-air terrace dining",
    "Daily buffet service",
    "Garden bar, open through the evening",
  ],
  image: "/img/dining.jpg",
};

export const leisure = {
  eyebrow: "Leisure & Wellness",
  title: "Unwind Beside the Pool",
  paragraphs: [
    "Spend an unhurried afternoon at the swimming pool, or wander the mature gardens that surround it — home to indigenous trees, flowering shrubs, and the birds and butterflies they attract.",
    "It's the kind of quiet that's hard to find near a national park, and one of the reasons our guests keep coming back.",
  ],
  image: "/img/pool.jpg",
};

export const activities: ActivityItem[] = [
  {
    title: "Elephant Bathing",
    subtitle: "Join the mahouts at the riverbank",
    image: "/img/activities/elephant-bathing.jpg",
    featured: true,
  },
  { title: "Dugout Canoe Ride", image: "/img/activities/canoe.jpg" },
  { title: "Jungle Jeep Drive", image: "/img/activities/jungle-drive.jpg" },
  { title: "Cultural Dance Tour", image: "/img/activities/cultural.jpg" },
  { title: "Guided Nature Walk", image: "/img/activities/nature-walk.jpg" },
  { title: "Bird Watching", image: "/img/activities/birdwatching.jpg" },
  {
    title: "Elephant Breeding Center",
    image: "/img/activities/elephant-breeding.jpg",
  },
];

export const nearby: NearbyItem[] = [
  {
    title: "Chitwan National Park",
    badge: "2 Min Away",
    image: "/img/nearby/park-gate.jpg",
    description:
      "Minutes from our door — the gateway to Nepal's first national park and a UNESCO World Heritage site.",
  },
  {
    title: "The Rapti River",
    badge: "5 Min Walk",
    image: "/img/nearby/rapti-river.jpg",
    description:
      "The river that separates Sauraha from the wild — rhinos are often spotted grazing along its banks.",
  },
  {
    title: "Bishazari Tal",
    badge: "~10 Km",
    image: "/img/nearby/bishazari-tal.jpg",
    description:
      '"Twenty Thousand Lakes" — a Ramsar-listed wetland and one of the region\'s best birdwatching spots.',
  },
  {
    title: "Tharu Cultural Museum",
    badge: "Bachhauli",
    image: "/img/nearby/tharu-museum.jpg",
    description:
      "Textiles, tools and traditions of the indigenous Tharu community, Chitwan's original inhabitants.",
  },
];

export const amenities: AmenityItem[] = [
  { label: "Free Wi-Fi", icon: "wifi" },
  { label: "Room Service", icon: "bell" },
  { label: "24/7 Security", icon: "shield-check" },
  { label: "Private Parking", icon: "car" },
  { label: "Bicycle Rental", icon: "bike" },
  { label: "Currency Exchange", icon: "banknote" },
  { label: "Live Music Evenings", icon: "music" },
  { label: "Conference Hall", icon: "users" },
];

export const trustBadges = [
  { name: "TripAdvisor", image: "/img/trust/tripadvisor.jpg" },
  { name: "Booking.com", image: "/img/trust/booking.jpg" },
  { name: "Agoda", image: "/img/trust/agoda.jpg" },
  { name: "Expedia", image: "/img/trust/expedia.jpg" },
  { name: "Goibibo", image: "/img/trust/goibibo.jpg" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Waking up to see an elephant at the window of your room. Amazing feeling for a citygal like me!",
    author: "Peinidaochuzhou",
    source: "Singapore",
  },
  {
    quote:
      "Staff were very helpful and the rooms were clean and comfortable. It's amazing to wake up with elephants outside the bedroom window.",
    author: "Roving443250",
    source: "Verified Guest",
  },
  {
    quote:
      "We find it best location for family and leisure holidays in Chitwan National Park. We highly recommend the nice garden, swimming pool.",
    author: "Spahari",
    source: "Kathmandu",
  },
  {
    quote:
      "Very comfortable rooms and friendly, helpful staff. Hotel has nice garden, tranquil and peaceful place.",
    author: "Rusowasp",
    source: "Tbilisi",
  },
];

export const gallery = [
  { src: "/img/garden.jpg", alt: "Mature gardens at Hotel Parkland" },
  { src: "/img/pool.jpg", alt: "Swimming pool surrounded by gardens" },
  { src: "/img/dining.jpg", alt: "Outdoor dining terrace" },
  { src: "/img/activities/elephant-bathing.jpg", alt: "Elephant bathing in the river" },
  { src: "/img/rooms/room-deluxe.jpg", alt: "Deluxe Garden Room interior" },
  { src: "/img/activities/canoe.jpg", alt: "Dugout canoe ride on the river" },
];
