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
  GalleryItem,
  FaqItem,
  DiningVenue,
  MeetingSpace,
  BlogPost,
  OfferItem,
  ExperienceItem,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Accommodation",
    href: "/accommodations",
    // Mirrors the room types in `rooms` below — keep the two lists in step.
    children: [
      { label: "Deluxe Room", href: "/accommodations/deluxe-room" },
      { label: "Suite Room", href: "/accommodations/suite-room" },
      { label: "Presidential Room", href: "/accommodations/presidential-room" },
    ],
  },
  { label: "Dining & Bar", href: "/dining-bar" },
  { label: "Meeting and Events", href: "/meetings-events" },
  { label: "Experiences & Destination", href: "/experiences-destination" },
  { label: "Offers & Packages", href: "/offers" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
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
    { value: "120", label: "Rooms & Suites" },
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
    slug: "deluxe-room",
    name: "Deluxe Room",
    image: "/img/rooms/room-deluxe.jpg",
    images: ["/img/rooms/room-deluxe.jpg", "/img/garden.jpg", "/img/pool.jpg"],
    description:
      "Garden-facing rooms with warm wood tones and private balconies overlooking mature gardens.",
    longDescription: [
      "Our Deluxe Rooms open onto the mature gardens that have defined Hotel Parkland since 1987 — warm wood tones, soft natural light and a private balcony set the tone for an unhurried stay.",
      "Each room is finished with locally sourced furnishings and every essential for a restful night, from a well-appointed ensuite bath to complimentary wi-fi throughout.",
    ],
    pricePerNight: 85,
    size: "28 Sq.m",
    adults: 2 + 1,
    beds: "1 Queen Bed",
    rating: 4.3,
    features: ["wifi", "tv", "breakfast"],
  },
  {
    slug: "suite-room",
    name: "Suite Room",
    image: "/img/rooms/room-premier.jpg",
    images: ["/img/rooms/room-premier.jpg", "/img/garden.jpg", "/img/dining.jpg"],
    description:
      "Spacious interiors with elevated finishes, designed for longer, more restorative stays.",
    longDescription: [
      "Suite Rooms trade up to a more spacious footprint and elevated finishes, with a distinct sitting area separate from the bed — built for guests staying a little longer.",
      "Air conditioning and a flat-screen TV are standard, alongside the same garden outlook and quiet that runs through every room category.",
    ],
    pricePerNight: 120,
    size: "34 Sq.m",
    adults: 2 + 1,
    beds: "1 King Bed",
    rating: 4.6,
    featured: true,
    features: ["wifi", "tv", "ac"],
  },
  {
    slug: "presidential-room",
    name: "Presidential Room",
    image: "/img/rooms/room-villa.jpg",
    images: ["/img/rooms/room-villa.jpg", "/img/pool.jpg", "/img/garden.jpg"],
    description:
      "Our most refined address — generous living space for guests who want a little more room to unwind.",
    longDescription: [
      "The Presidential Room is Hotel Parkland's most refined address — generous living space, considered detailing and an ensuite bath built for unwinding after a day on safari.",
      "Air conditioning, garden views and every in-room comfort come as standard, reserved for guests who want a little more room to breathe.",
    ],
    pricePerNight: 180,
    size: "46 Sq.m",
    adults: 2 + 1,
    beds: "1 KingBed",
    rating: 4.9,
    featured: true,
    features: ["wifi", "ac", "bath"],
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
    "Spend an unhurried afternoon by the swimming pool or wander through our lush gardens, surrounded by indigenous trees, flowering shrubs, and the gentle presence of birds and butterflies.",
    "A tranquil retreat from the excitement of Chitwan, where nature invites you to slow down, reconnect, and simply be.",
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

export const exploreLinks = [
  { label: "Rooms & Suites", href: "" },
  { label: "Dining & Bar", href: "" },
  { label: "Wellness & Leisure", href: "" },
  { label: "Experiences", href: "" },
];
export const quickLinks = [
  { label: "Book Your Stay", href: "" },
  { label: "Special Offers", href: "/offers" },
  { label: "Getting Here", href: "" },
  { label: "Privacy Policy", href: "" },
  { label: "Terms & Conditions", href: "" },
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
      "Very comfortable rooms and friendly, helpful staff. Hotel has nice Garden, tranquil and peaceful place. We quite enjoyed food. (Mostly Nepali, Indian, Chinese kitchen). Our guide Bishnu was simply amazing, very knowledgeable.",
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

/**
 * /gallery page content — the filterable Isotope + lightGallery showcase.
 * Separate from `gallery` (the homepage teaser strip) so the full page can
 * carry more photos and category metadata without touching the teaser.
 */
export const galleryPage = {
  header: {
    eyebrow: "Gallery",
    title: "A Glimpse of Parkland",
  },
  categories: [
    { key: "all", label: "All" },
    { key: "hotel", label: "Hotel" },
    { key: "rooms", label: "Rooms" },
    { key: "dining", label: "Dining" },
    { key: "wellness", label: "Wellness" },
    { key: "experiences", label: "Experiences" },
  ],
  items: [
    { src: "/img/hero.jpg", alt: "Hotel Parkland at dusk", category: "hotel" },
    { src: "/img/garden.jpg", alt: "Mature gardens at Hotel Parkland", category: "hotel" },
    { src: "/img/rooms/room-deluxe.jpg", alt: "Deluxe Garden Room interior", category: "rooms" },
    { src: "/img/rooms/room-premier.jpg", alt: "Suite Room interior", category: "rooms" },
    { src: "/img/rooms/room-villa.jpg", alt: "Presidential Room interior", category: "rooms" },
    { src: "/img/dining.jpg", alt: "Outdoor dining terrace", category: "dining" },
    { src: "/img/pool.jpg", alt: "Swimming pool surrounded by gardens", category: "wellness" },
    {
      src: "/img/activities/elephant-bathing.jpg",
      alt: "Elephant bathing in the river",
      category: "experiences",
    },
    { src: "/img/activities/canoe.jpg", alt: "Dugout canoe ride on the river", category: "experiences" },
    {
      src: "/img/activities/jungle-drive.jpg",
      alt: "Jungle jeep drive through Chitwan",
      category: "experiences",
    },
    {
      src: "/img/activities/cultural.jpg",
      alt: "Tharu cultural dance performance",
      category: "experiences",
    },
    {
      src: "/img/activities/nature-walk.jpg",
      alt: "Guided nature walk in Chitwan National Park",
      category: "experiences",
    },
  ] as GalleryItem[],
};

/** /faq page content. */
export const faqPage = {
  header: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
  },
  items: [
    {
      question: "What are the check-in and check-out times?",
      answer:
        "Check-in is from 12:00 PM and check-out is by 10:00 AM. Let us know your arrival time in advance and we'll do our best to accommodate an early check-in or late check-out, subject to availability.",
    },
    {
      question: "How do I book a room, and do you take online bookings?",
      answer:
        "We don't yet have a live online booking engine — reservations are confirmed over phone, WhatsApp or email through our Kathmandu or Chitwan offices. Call or WhatsApp us at +977-9841229970, or email parkland@mail.com.np and our team will confirm availability and rates.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellation terms depend on the season and package booked, and are confirmed in writing when your reservation is made. Please contact our reservations team directly for the terms attached to your specific booking.",
    },
    {
      question: "Are jungle safaris and activities included in the room rate?",
      answer:
        "Room rates cover accommodation only. Elephant bathing, canoe rides, jungle jeep drives, guided nature walks and cultural performances can all be arranged through the hotel and are booked separately — ask our front desk or reservations team to put together an itinerary.",
    },
    {
      question: "What amenities does the hotel offer?",
      answer:
        "Hotel Parkland has a swimming pool, restaurant and bar, free WiFi, gardens, a conference hall, room service, bicycle rental and 24-hour security across our 32 rooms.",
    },
    {
      question: "Is Hotel Parkland suitable for families and children?",
      answer:
        "Yes — our gardens, pool and easy access to Chitwan National Park make it a popular choice for families. Let us know the ages of any children travelling when you book so we can suggest suitable rooms and activities.",
    },
    {
      question: "Do you arrange airport or bus park transfers?",
      answer:
        "Yes, we can arrange transfers from Bharatpur Airport or the Sauraha bus park. Share your arrival details with our reservations team in advance so a vehicle is ready when you arrive.",
    },
    {
      question: "What languages does your staff speak?",
      answer: "Our team is comfortable communicating in English, Nepali and Hindi.",
    },
  ] as FaqItem[],
};

/** /accommodations page header. Room data itself lives in `rooms` above. */
export const accommodationsPage = {
  header: {
    eyebrow: "Accommodation",
    title: "Restful Spaces, Reimagined",
  },
  intro:
    "Thirty-two rooms across three categories, each pairing warm, natural materials with the quiet of the garden beyond the window.",
};

/** /offers page content. */
export const offersPage = {
  header: {
    eyebrow: "Offers & Packages",
    title: "Seasonal Offers at Parkland",
  },
  intro:
    "Curated dining events and stay packages, running for a limited time — tap any offer for details and to reserve.",
  items: [
    {
      slug: "monsoon-garden-dinner",
      name: "Monsoon Garden Dinner",
      image: "/img/dining.jpg",
      excerpt:
        "A five-course set dinner served on the Garden Terrace as the monsoon rains settle over Sauraha — Nepalese and continental plates, paired with the garden's evening quiet.",
      price: "NPR 2,200 per person",
      expiryDate: "2026-09-30",
    },
    {
      slug: "full-board-wildlife-package",
      name: "Full Board Wildlife Package",
      image: "/img/activities/elephant-bathing.jpg",
      excerpt:
        "Two nights, full board, with a guided jungle jeep drive, canoe ride and elephant bathing session included — our most complete way to see Chitwan.",
      price: "NPR 18,500 per couple",
      expiryDate: "2026-10-15",
    },
    {
      slug: "poolside-weekend-brunch",
      name: "Poolside Weekend Brunch",
      image: "/img/pool.jpg",
      excerpt:
        "An unlimited Saturday brunch spread by the pool — live counters, fresh juices and a relaxed midday sitting for the whole family.",
      price: "NPR 1,500 per person",
      expiryDate: "2026-09-05",
    },
  ] as OfferItem[],
};

/** /dining-bar page content. */
export const diningPage = {
  header: {
    eyebrow: "Dining & Bar",
    title: "Flavours Under the Sauraha Sky",
  },
  intro: dining.paragraph,
  venues: [
    {
      slug: "the-parkland-restaurant",
      name: "The Parkland Restaurant",
      category: "restaurant",
      image: "/img/dining.jpg",
      images: ["/img/dining.jpg", "/img/garden.jpg"],
      excerpt: "Contemporary dining featuring local and international cuisine.",
      description: [
        "Our main restaurant serves a considered mix of Nepalese, Indian and continental dishes, drawing on quality local ingredients and recipes passed down through Parkland's kitchen since 1987.",
        "Indoor seating looks out over the gardens, with attentive service pitched for everything from a relaxed breakfast to a memorable dinner.",
      ],
      hours: "6:30 AM – 10:00 PM",
      features: ["À la carte menu", "Nepali, Indian & continental cuisine", "Garden views", "Vegetarian options"],
    },
    {
      slug: "garden-terrace",
      name: "Garden Terrace",
      category: "restaurant",
      image: "/img/garden.jpg",
      images: ["/img/garden.jpg", "/img/dining.jpg"],
      excerpt: "Al fresco dining surrounded by the beauty of Sauraha.",
      description: [
        "Set among the mature gardens that give Hotel Parkland its character, the Garden Terrace is our open-air dining space — shaded by the property's indigenous trees and open to birdsong through the day.",
        "A natural choice for breakfast or a long, easy lunch between morning and evening safaris, weather permitting.",
      ],
      hours: "7:00 AM – 10:00 PM (weather permitting)",
      features: ["Open-air seating", "Shaded by mature gardens", "À la carte & light bites", "Family friendly"],
    },
    {
      slug: "buffet-hall",
      name: "Buffet Hall",
      category: "restaurant",
      image: "/img/dining.jpg",
      images: ["/img/dining.jpg", "/img/garden.jpg"],
      excerpt: "A generous selection of fresh flavours for every palate.",
      description: [
        "For guests on full board or simply after variety, the Buffet Hall lays out a generous daily spread — a rotating mix of Nepalese, Indian and international dishes prepared fresh each service.",
        "Sittings are timed around the day's safari and activity schedule, so there's always a hot meal waiting whichever excursion you've just returned from.",
      ],
      hours: "Breakfast 7:00 – 10:00 AM · Dinner 7:00 – 9:30 PM",
      features: ["Daily rotating buffet", "Nepali, Indian & international dishes", "Group & full-board friendly", "Indoor seating"],
    },
    {
      slug: "parkland-bar",
      name: "Parkland Bar",
      category: "bar",
      image: "/img/pool.jpg",
      images: ["/img/pool.jpg", "/img/garden.jpg"],
      excerpt: "Unwind with signature drinks and a relaxed evening ambience.",
      description: [
        "The Parkland Bar keeps the evening easy — a garden-set bar pouring signature cocktails, local spirits and a well-stocked selection of wine and beer.",
        "Live music evenings turn it into the natural gathering point after a day in the jungle, with seating that spills out toward the pool.",
      ],
      hours: "4:00 PM – 11:00 PM",
      features: ["Signature cocktails", "Local & international spirits", "Live music evenings", "Poolside seating"],
    },
  ] as DiningVenue[],
};

/** /meetings-events page content. */
export const meetingsPage = {
  header: {
    eyebrow: "Meetings & Events",
    title: "Gather, Celebrate, Connect",
  },
  intro:
    "From boardroom strategy sessions to garden celebrations, Hotel Parkland's function spaces bring together attentive service and the calm of Sauraha.",
  spaces: [
    {
      slug: "grand-conference-hall",
      name: "Grand Conference Hall",
      image: "/img/dining.jpg",
      images: ["/img/dining.jpg", "/img/garden.jpg"],
      excerpt: "Our largest indoor venue, set up for conferences, seminars and corporate retreats.",
      description: [
        "The Grand Conference Hall is Hotel Parkland's largest indoor venue — a flexible, naturally lit space that reconfigures for theatre-style seminars, classroom training sessions or banquet-style gatherings.",
        "Standard AV equipment, high-speed wi-fi and dedicated event staff come as part of every booking, with catering drawn from our restaurant kitchen.",
      ],
      capacity: "Up to 120 guests, theatre-style",
      size: "150 Sq.m",
      features: ["Theatre, classroom & banquet layouts", "AV equipment included", "High-speed wi-fi", "On-site catering"],
    },
    {
      slug: "garden-pavilion",
      name: "Garden Pavilion",
      image: "/img/garden.jpg",
      images: ["/img/garden.jpg", "/img/pool.jpg"],
      excerpt: "An open-air setting among the gardens, built for weddings and celebrations.",
      description: [
        "Set beneath Hotel Parkland's mature trees, the Garden Pavilion is our open-air venue for weddings, receptions and milestone celebrations — string lighting and lawn seating included.",
        "The space pairs easily with the adjoining Garden Terrace for cocktail hours and evening dining, and our events team can help shape a full-day itinerary around it.",
      ],
      capacity: "Up to 200 guests, reception-style",
      size: "300 Sq.m open lawn",
      features: ["Open-air garden setting", "Wedding & reception ready", "String lighting", "Dedicated events team"],
    },
    {
      slug: "the-boardroom",
      name: "The Boardroom",
      image: "/img/rooms/room-premier.jpg",
      images: ["/img/rooms/room-premier.jpg", "/img/dining.jpg"],
      excerpt: "An intimate, private room for small corporate meetings and interviews.",
      description: [
        "For smaller gatherings — board meetings, interviews or client presentations — the Boardroom offers a private, air-conditioned space away from the rest of the hotel.",
        "Seats up to twelve around a single table, with tea and coffee service available throughout.",
      ],
      capacity: "Up to 12 guests, boardroom-style",
      size: "40 Sq.m",
      features: ["Air conditioned", "Private & quiet", "Tea & coffee service", "Flexible half/full-day booking"],
    },
  ] as MeetingSpace[],
};

/** /experiences-destination page content. */
export const experiencesPage = {
  header: {
    eyebrow: "Experiences & Destination",
    title: "Moments Made in Chitwan",
  },
  intro:
    "From an unhurried morning by the pool to a golden-hour drink on the terrace, and the wild landscape of Chitwan just beyond our gates — here is how a stay at Parkland unfolds.",
  experiences: [
    {
      eyebrow: "Recreation",
      title: "Swimming Pool & Yoga",
      description:
        "The swimming pool is more than a spot to cool off — it's a tranquil escape where leisure meets comfort, set within the mature gardens that have grown since 1987. Whether you're basking in the morning sun, easing into a sunrise yoga session, or sharing an unhurried afternoon with family, the pool strikes the balance between relaxation and recreation, just steps from your room.",
      image: "/img/pool.jpg",
      imageAlt: "Swimming pool surrounded by gardens at dusk",
    },
    {
      eyebrow: "Sundowner",
      title: "Golden Hours, Endless Memories",
      description:
        "As the sun dips below the tree line, the garden turns into Sauraha's best-kept secret — a quiet corner for a drink in hand and the day's safari stories still fresh. The sky blushes amber and rose over the palms, and the evening settles into the easy rhythm that Chitwan is known for.",
      image: "/img/garden.jpg",
      imageAlt: "Palm-shaded gardens at golden hour",
    },
    {
      eyebrow: "Wildlife",
      title: "Elephant Bathing at the Riverbank",
      description:
        "Join the mahouts at the Rapti River for one of Sauraha's most joyful traditions — wading in alongside the elephants for a mid-morning wash. It's a hands-on, genuinely warm hour, and one of the experiences guests remember longest after they've left Chitwan.",
      image: "/img/activities/elephant-bathing.jpg",
      imageAlt: "Elephant bathing in the Rapti River",
    },
    {
      eyebrow: "Culture",
      title: "An Evening of Tharu Dance",
      description:
        "Chitwan's indigenous Tharu community has shaped this land for centuries, and their stick dance — rhythmic, high-energy, performed to drums under the open sky — is the liveliest way to encounter it. A short walk from the hotel brings you to an evening performance that closes the day on a very different note from the quiet of the jungle.",
      image: "/img/activities/cultural.jpg",
      imageAlt: "Tharu cultural dance performance",
    },
  ] as ExperienceItem[],
  destination: {
    eyebrow: "Destination",
    title: "What Lies Beyond Our Gates",
    intro:
      "At the gateway to Chitwan's wilderness, some of the region's most remarkable landmarks are just moments away — here's what's worth the short trip from Parkland.",
  },
};

/** /blog page content. */
export const blogPage = {
  header: {
    eyebrow: "Blog",
    title: "Stories from Sauraha",
  },
  intro:
    "Notes on the wildlife, culture and everyday life of Chitwan — from our team on the ground in Sauraha.",
  posts: [
    {
      slug: "a-first-timers-guide-to-jungle-safaris",
      title: "A First-Timer's Guide to Jungle Safaris in Chitwan",
      excerpt:
        "What to expect on your first elephant bathing, jeep drive or nature walk through Chitwan National Park — and how to make the most of it.",
      content: [
        "Chitwan National Park is Nepal's first national park and a UNESCO World Heritage Site, home to one-horned rhinos, Bengal tigers and over 500 species of birds. For first-time visitors, the sheer range of ways to experience it — jeep drives, dugout canoes, guided nature walks, elephant bathing — can be a lot to plan around.",
        "Our advice: start slow. A dawn canoe ride along the Rapti River is the gentlest introduction, drifting past gharial crocodiles and kingfishers before the day heats up. Save the jungle jeep drive, which covers the most ground and offers the best odds of a rhino or tiger sighting, for mid-morning or late afternoon when wildlife is most active.",
        "Guides matter more than most visitors expect. A good naturalist guide reads tracks, calls and disturbed grass long before you'd notice anything yourself — ask your hotel to pair you with one who's been walking these trails for years, not months.",
        "Whatever you book, bring layers, a hat and insect repellent, and keep noise to a minimum once you're in the park. The animals were here first.",
      ],
      image: "/img/activities/jungle-drive.jpg",
      date: "2026-05-14",
      author: "Hotel Parkland Team",
      category: "Wildlife",
    },
    {
      slug: "elephant-bathing-what-to-know",
      title: "Elephant Bathing at the Riverbank: What to Know Before You Go",
      excerpt:
        "One of Sauraha's signature experiences, explained — what happens, how it's run responsibly, and what to bring.",
      content: [
        "Elephant bathing at the riverbank is one of Sauraha's best-loved experiences: joining the mahouts as they lead their elephants into the Rapti River for a mid-morning wash, with visitors invited to help scrub and splash alongside them.",
        "It's a genuinely joyful hour, but it's worth choosing an operator that treats the elephants' welfare as the priority — shorter sessions, no riding, and mahouts who clearly know and are gentle with their animals.",
        "Bring a change of clothes; you will get wet. Water shoes help on the riverbed, and a waterproof case for your phone or camera is worth packing if you want photos.",
        "Sessions typically run in the mid-morning, once the day has warmed up. Our front desk can arrange timings around the rest of your itinerary.",
      ],
      image: "/img/activities/elephant-bathing.jpg",
      date: "2026-04-22",
      author: "Hotel Parkland Team",
      category: "Wildlife",
    },
    {
      slug: "tharu-culture-in-sauraha",
      title: "Beyond the Safari: Tharu Culture in Sauraha",
      excerpt:
        "Chitwan's indigenous Tharu community has called this land home for centuries. Here's where to encounter their culture beyond the wildlife itinerary.",
      content: [
        "It's easy for a Chitwan trip to become entirely about wildlife — but the Tharu people, the indigenous community of the region, have shaped this landscape for centuries, and their culture is very much worth a detour.",
        "The Tharu Cultural Museum in nearby Bachhauli houses textiles, tools and household objects that trace daily Tharu life, and is a short, easy visit from the hotel.",
        "In the evenings, look out for a Tharu stick dance performance — a rhythmic, high-energy dance performed to drums, often staged in Sauraha village for visitors. It's a livelier, more communal counterpart to a day spent quietly watching wildlife.",
        "If you have time, a short walk through the older parts of Sauraha village, past traditional mud-and-thatch Tharu houses, tells you as much about Chitwan as any safari does.",
      ],
      image: "/img/activities/cultural.jpg",
      date: "2026-03-30",
      author: "Hotel Parkland Team",
      category: "Culture",
    },
    {
      slug: "best-time-to-visit-chitwan",
      title: "The Best Time to Visit Chitwan National Park",
      excerpt:
        "Chitwan rewards visitors year-round, but the season you choose changes what you'll see. A season-by-season breakdown.",
      content: [
        "Chitwan National Park is open, and rewarding, in every season — but the experience shifts considerably depending on when you visit.",
        "October to February brings cool, dry weather and the clearest visibility, making it the most popular window and the easiest for wildlife spotting as the tall grasses are cut back after the monsoon.",
        "March to May is hot and dry, with grasses still low from the winter cut — visibility for tiger and rhino sightings is often at its best, if you can handle the daytime heat.",
        "June to September is monsoon season: lush, green and quiet, with fewer visitors and lower rates, though some activities may pause around heavy rainfall. It's a good fit for travellers more interested in birdlife and the park's greener side than peak wildlife odds.",
      ],
      image: "/img/nearby/bishazari-tal.jpg",
      date: "2026-02-18",
      author: "Hotel Parkland Team",
      category: "Travel Tips",
    },
    {
      slug: "a-morning-in-the-parkland-gardens",
      title: "A Morning in the Parkland Gardens",
      excerpt:
        "Before the day's safari begins, our gardens are worth slowing down for — a short walk through what makes Hotel Parkland's grounds distinctive.",
      content: [
        "Guests often move straight from breakfast to their first safari of the day, and it's easy to miss what's right outside the restaurant door: gardens that have been growing since 1987, sheltering rare indigenous trees, flowering shrubs and a steady population of birds and butterflies.",
        "Early morning, before the heat sets in, is the best time to walk them — you'll hear more birdsong in twenty minutes here than most of the day's jeep drive.",
        "The gardens also frame most of our rooms, which is deliberate: after a day spent looking for wildlife at a distance, we wanted the walk back to your room to feel like an extension of it, not a return to the ordinary.",
      ],
      image: "/img/garden.jpg",
      date: "2026-01-25",
      author: "Hotel Parkland Team",
      category: "Hotel News",
    },
    {
      slug: "planning-a-family-trip-to-chitwan",
      title: "Planning a Family Trip to Chitwan",
      excerpt:
        "Practical notes for travelling with children — which activities work best by age, and how we help families plan around them.",
      content: [
        "Chitwan is a genuinely good family destination, but a little planning goes a long way toward keeping everyone — including younger children — engaged rather than overwhelmed.",
        "Canoe rides and elephant bathing tend to work well across age groups; jungle jeep drives, which involve longer stretches of quiet waiting, are usually a better fit from around age six or seven up.",
        "Our pool and gardens give families an easy way to break up the day between activities, and our kitchen can accommodate simpler menus for children on request.",
        "Let us know the ages of everyone travelling when you book — we'll help put together an itinerary that paces the wildlife activities around what actually works for your group.",
      ],
      image: "/img/pool.jpg",
      date: "2025-12-10",
      author: "Hotel Parkland Team",
      category: "Travel Tips",
    },
  ] as BlogPost[],
};
