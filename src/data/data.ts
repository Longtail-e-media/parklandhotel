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
  FacilityItem,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Accommodation",
    href: "",
    // Mirrors the room types in `rooms` below — keep the two lists in step.
    children: [
      { label: "Deluxe Room", href: "" },
      { label: "Suite Room", href: "" },
      { label: "Presidential Room", href: "" },
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
    "Refined hospitality in a serene natural setting — just minutes from the heart of Sauraha and the gateway to Chitwan National Park.",
  image: "/img/hero.jpg",
};

export const about = {
  eyebrow: "Welcome To Hotel Parkland",
  title: "Where Jungle Tranquility\nMeets Refined Comfort",
  paragraphs: [
    "Welcome to Hotel Parkland, a premium destination in Sauraha designed for guests seeking comfort, sophistication and authentic Chitwan experiences.From elegantly appointed accommodations and exceptional dining to leisure facilities and curated wildlife adventures, every element is thoughtfully designed to make your stay memorable.Whether you are travelling for leisure, a family escape, a romantic getaway, a corporate retreat or an adventure into the wild, Hotel Parkland brings together the best of contemporary hospitality and the natural charm of Chitwan.",
  ],
  image: "/img/garden.jpg",
  stats: [
    { value: "1987", label: "Est. Since" },
    { value: "32", label: "Rooms & Suites" },
    { value: "10 Min", label: "To Sauraha Centre" },
  ],
};

/**
 * /about page content. Kept separate from `about` (the homepage teaser) so the
 * two can say different things — the homepage introduces the property, this
 * page tells the longer story.
 */
export const aboutPage = {
  header: {
    eyebrow: "About Us",
    title: "Our Story",
  },
  intro: {
    eyebrow: "About Us",
    title: "Welcome To Hotel Parkland,\nSauraha",
    paragraphs: [
      "Welcome to Hotel Parkland, where traditional hospitality meets the calm of the jungle in the heart of Chitwan. Since 1987 we have been dedicated to giving our guests an exceptional stay, blending modern comfort with the sylvan character that defines this corner of Sauraha.",
      "Our magnificent, mature gardens shelter rare indigenous trees, shrubs and flowers that draw birds and butterflies year-round. Rooms and suites open onto that greenery, ensuring a restful retreat whether you are here for the safari, for business, or simply for the quiet.",
    ],
    signature: "Hotel Parkland",
    signatureRole: "The Parkland Family",
    image: "/img/garden.jpg",
    imageOverlap: "/img/activities/elephant-bathing.jpg",
  },
  facilities: {
    eyebrow: "Facilities",
    title: "Hotel Facilities",
    image: "/img/rooms/room-premier.jpg",
    items: [
      {
        title: "Rooms and Suites",
        description:
          "Varied types of rooms, from deluxe garden rooms to Parkland suites, equipped with every essential for a restful night.",
        icon: "bed",
      },
      {
        title: "24-Hour Security",
        description:
          "On-site security personnel and round-the-clock surveillance, with secure storage available for valuables.",
        icon: "shield-check",
      },
      {
        title: "Swimming Pool",
        description:
          "An outdoor pool set within the gardens — for an unhurried afternoon between morning and evening safaris.",
        icon: "waves",
      },
      {
        title: "Restaurant & Bar",
        description:
          "Indoor dining and an open-air terrace, a daily buffet spread, and a garden bar that keeps the evening easy.",
        icon: "utensils",
      },
    ] as FacilityItem[],
  },
};

export const rooms: RoomType[] = [
  {
    name: "Deluxe Room",
    image: "/img/rooms/room-deluxe.jpg",
    description:
      "Garden-facing rooms with warm wood tones and private balconies overlooking mature gardens.",
    pricePerNight: 85,
    size: "28 Sq.m",
    adults: 2+1,
    features: ["wifi", "tv", "breakfast"],
  },
  {
    name: "Suite Room",
    image: "/img/rooms/room-premier.jpg",
    description:
      "Spacious interiors with elevated finishes, designed for longer, more restorative stays.",
    pricePerNight: 120,
    size: "34 Sq.m",
    adults: 2+1,
    features: ["wifi", "tv", "ac"],
  },
  {
    name: "Presidential Room",
    image: "/img/rooms/room-villa.jpg",
    description:
      "Our most refined address — generous living space for guests who want a little more room to unwind.",
    pricePerNight: 180,
    size: "46 Sq.m",
    adults: 2+1,
    features: ["wifi", "ac", "bath"],
  },
];

export const accommodations: RoomType[] = [
    {
    name: "Deluxe Room",
    image: "/img/rooms/room-deluxe.jpg",
    description:
      "Garden-facing rooms with warm wood tones and private balconies overlooking mature gardens.",
    pricePerNight: 85,
    size: "28 Sq.m",
    adults: 2,
    features: ["wifi", "tv", "breakfast"],
  },
];

export const dining = {
  eyebrow: "Dining & Bar",
  title: "Flavours Under the Sauraha Sky",
  paragraph:
    "From authentic Nepalese flavours to international favourites, discover dining experiences crafted to delight every palate.\n\nOur culinary spaces offer sophisticated settings, quality ingredients and attentive service—from relaxed breakfasts to memorable dinners and evening gatherings.",
  features: [
{title:"Outdoor Dining", description:"Al fresco dining surrounded by the beauty of Sauraha."},
{title:"Buffet Dining", description:"A generous selection of fresh flavours for every palate."},
{title:"Restaurant", description:"Contemporary dining featuring local and international cuisine."},
{title:"Bar", description:"Unwind with signature drinks and a relaxed evening ambience."},
  ],
  image: "/img/dining.jpg",
};

export const leisure = {
  eyebrow: "Leisure & Wellness",
  title: "Serenity Beneath the Chitwan Sky",
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
  // { title: "Bird Watching", image: "/img/activities/birdwatching.jpg" },
  // {
  //   title: "Elephant Breeding Center",
  //   image: "/img/activities/elephant-breeding.jpg",
  // },
];

/**
 * Distances are approximate road distances from the hotel in Sauraha and are
 * shown to guests as a rough guide — confirm them before print use.
 */
export const nearby: NearbyItem[] = [
  {
    title: "Chitwan National Park Gate",
    distance: "1.3 Km",
    query: "Chitwan National Park Entrance Gate, Sauraha, Nepal",
    image: "/img/nearby/park-gate.jpg",
    description:
      "Minutes from our door — the gateway to Nepal's first national park and a UNESCO World Heritage site.",
  },
  {
    title: "The Rapti River",
    distance: "400 m",
    query: "Rapti River, Sauraha, Chitwan, Nepal",
    image: "/img/nearby/rapti-river.jpg",
    description:
      "The river that separates Sauraha from the wild — rhinos are often spotted grazing along its banks.",
  },
  {
    title: "Elephant Breeding Centre",
    distance: "3.2 Km",
    query: "Elephant Breeding Centre, Sauraha, Chitwan, Nepal",
    description:
      "Home to the calves of Chitwan's government elephant stables, and an easy morning cycle from the hotel.",
  },
  {
    title: "Tharu Cultural Museum",
    distance: "2.5 Km",
    query: "Tharu Cultural Museum, Bachhauli, Chitwan, Nepal",
    image: "/img/nearby/tharu-museum.jpg",
    description:
      "Textiles, tools and traditions of the indigenous Tharu community, Chitwan's original inhabitants.",
  },
  {
    title: "Bishazari Tal",
    distance: "10 Km",
    query: "Bishazari Tal, Chitwan, Nepal",
    image: "/img/nearby/bishazari-tal.jpg",
    description:
      '"Twenty Thousand Lakes" — a Ramsar-listed wetland and one of the region\'s best birdwatching spots.',
  },
  {
    title: "Gharial Breeding Centre",
    distance: "26 Km",
    query: "Gharial Breeding Center, Kasara, Chitwan, Nepal",
    description:
      "A conservation centre at Kasara raising the critically endangered gharial crocodile for release into the Rapti.",
  },
  {
    title: "Bharatpur Airport",
    distance: "22 Km",
    query: "Bharatpur Airport, Chitwan, Nepal",
    description:
      "Twenty-five-minute flights from Kathmandu land here; we can arrange a car to meet you on arrival.",
  },
];

export const amenities: AmenityItem[] = [
  { label: "Swimming Pool", icon: "waves" },
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
  { name: "TripAdvisor", image: "/img/trust/trip.png" , link:"https://www.tripadvisor.com/Hotel_Review-g1367591-d1896438-Reviews-Hotel_Parkland-Sauraha_Chitwan_District_Narayani_Zone_Central_Region.html"},
  { name: "Booking.com", image: "/img/trust/bo.png", link:"https://www.booking.com/hotel/np/parkland-chitwan.html" },
  { name: "Agoda", image: "/img/trust/ag.png", link:"https://www.agoda.com/hotel-parkland/hotel/chitwan-np.html?cid=-218" },
  { name: "Expedia", image: "/img/trust/ex.png", link:"https://www.expedia.com/Sauraha-Hotels-Hotel-Parkland.h22518607.Hotel-Information?regionId=11702&langid=1033&semcid=US.UB.GOOGLE.PT-c-EN.HOTEL&semdtl=a1625600556.b127830482108.r1.g1dsa-287861008464.i145058999560.d1270356234835.e1c.j11011034.k19070016.f11t1.n1.l1g.h1b.m1" },
  { name: "Goibibo", image: "/img/trust/goibibo.png", link:"https://www.goibibo.com/hotels/parkland-hotel-in-chitwan-6035664439464244233/" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Waking up to see an elephant at the window of your room. Amazing feeling for a citygal like me! Food served in the hotel are simply yummlicious. Very polite staff. Our tour guide at the hotel Mr Hari, is indeed very knowledgable, he knows simple mandarin and speaks very good english. Only thing to improve is the hair dryer. So bring your own hair dryer if you need it.",
    author: "Peinidaochuzhou",
    source: "Singapore",
  },
  {
    quote:
      "Staff were very helpful and the rooms were clean and comfortable. It's amazing to wake up with elephants outside the bedroom window and be so close to such a wide array of wildlife. We had an amazing guide in Bishnu who taught us so much and is clearly so passionate about the flora and fauna he lives amongst. Hope to be back",
    author: "Roving443250",
    source: "Verified Guest",
  },
  {
    quote:
      "We have been to Chitwan National Park for family visit and stayed at Hotel Parkland. We find it best location for family and leisure holidays in Chitwan National Park. We highly recommend the nice garden, swimming pool.",
    author: "Spahari",
    source: "Kathmandu",
  },
  {
    quote:
      "ery comfortable rooms and friendly, helpful staff. Hotel has nice Garden, tranquil and peaceful place. We quite enjoyed food. (Mostly Nepali, Indian, Chinese kitchen). Our guide Bishnu was simply amazing, very knowledgeable.",
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
