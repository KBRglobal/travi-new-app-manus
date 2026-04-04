/**
 * TRAVI — Quick DNA Swipe Data
 * 116 items across 11 categories for the swipe-based travel DNA profiling.
 * Each item maps to a bundled destination image and carries tags for DNA scoring.
 */

// ─── Bundled destination images ─────────────────────────────────────────────
const IMG = {
  amsterdam: require("@/assets/destinations/amsterdam.jpg"),
  bali: require("@/assets/destinations/bali.jpg"),
  barcelona: require("@/assets/destinations/barcelona.jpg"),
  dubai: require("@/assets/destinations/dubai.jpg"),
  iceland: require("@/assets/destinations/iceland.jpg"),
  kyoto: require("@/assets/destinations/kyoto.jpg"),
  machupicchu: require("@/assets/destinations/machupicchu.jpg"),
  maldives: require("@/assets/destinations/maldives.jpg"),
  newyork: require("@/assets/destinations/newyork.jpg"),
  paris: require("@/assets/destinations/paris.jpg"),
  patagonia: require("@/assets/destinations/patagonia.jpg"),
  phuket: require("@/assets/destinations/phuket.jpg"),
  rome: require("@/assets/destinations/rome.jpg"),
  santorini: require("@/assets/destinations/santorini.jpg"),
  tokyo: require("@/assets/destinations/tokyo.jpg"),
};

// ─── Types ──────────────────────────────────────────────────────────────────
export interface SwipeItem {
  id: string;
  title: string;
  subtitle: string;
  category: SwipeCategory;
  image: number; // require() asset
  tags: string[];
}

export type SwipeCategory =
  | "landmarks"
  | "museums"
  | "food"
  | "nature"
  | "beaches"
  | "shopping"
  | "nightlife"
  | "activities"
  | "extreme"
  | "family"
  | "investments";

export const SWIPE_CATEGORIES: {
  id: SwipeCategory;
  label: string;
  emoji: string;
  count: number;
}[] = [
  { id: "landmarks", label: "Landmarks", emoji: "🏛️", count: 12 },
  { id: "museums", label: "Museums & Art", emoji: "🎨", count: 10 },
  { id: "food", label: "Food & Dining", emoji: "🍜", count: 12 },
  { id: "nature", label: "Nature", emoji: "🌿", count: 10 },
  { id: "beaches", label: "Beaches", emoji: "🏖️", count: 10 },
  { id: "shopping", label: "Shopping", emoji: "🛍️", count: 8 },
  { id: "nightlife", label: "Nightlife", emoji: "🌙", count: 10 },
  { id: "activities", label: "Activities", emoji: "🎯", count: 12 },
  { id: "extreme", label: "Extreme Sports", emoji: "🪂", count: 10 },
  { id: "family", label: "Family Fun", emoji: "👨‍👩‍👧‍👦", count: 10 },
  { id: "investments", label: "Business & RE", emoji: "💼", count: 12 },
];

// ─── 116 Swipe Items ────────────────────────────────────────────────────────

export const SWIPE_ITEMS: SwipeItem[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // 1. LANDMARKS (12)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "lm-01",
    title: "Eiffel Tower at Sunset",
    subtitle: "Paris, France",
    category: "landmarks",
    image: IMG.paris,
    tags: ["iconic", "romantic", "views", "architecture", "photography"],
  },
  {
    id: "lm-02",
    title: "Colosseum by Moonlight",
    subtitle: "Rome, Italy",
    category: "landmarks",
    image: IMG.rome,
    tags: ["ancient", "history", "architecture", "night", "iconic"],
  },
  {
    id: "lm-03",
    title: "Machu Picchu at Dawn",
    subtitle: "Cusco Region, Peru",
    category: "landmarks",
    image: IMG.machupicchu,
    tags: ["ancient", "hiking", "mountains", "spiritual", "wonder"],
  },
  {
    id: "lm-04",
    title: "Burj Khalifa Observation Deck",
    subtitle: "Dubai, UAE",
    category: "landmarks",
    image: IMG.dubai,
    tags: ["modern", "skyscraper", "views", "luxury", "architecture"],
  },
  {
    id: "lm-05",
    title: "Fushimi Inari Shrine Gates",
    subtitle: "Kyoto, Japan",
    category: "landmarks",
    image: IMG.kyoto,
    tags: ["spiritual", "traditional", "photography", "walk", "culture"],
  },
  {
    id: "lm-06",
    title: "Statue of Liberty Up Close",
    subtitle: "New York, USA",
    category: "landmarks",
    image: IMG.newyork,
    tags: ["iconic", "history", "freedom", "ferry", "views"],
  },
  {
    id: "lm-07",
    title: "Sagrada Familia Interior",
    subtitle: "Barcelona, Spain",
    category: "landmarks",
    image: IMG.barcelona,
    tags: ["architecture", "gaudi", "stained-glass", "sacred", "art"],
  },
  {
    id: "lm-08",
    title: "Santorini Caldera Viewpoint",
    subtitle: "Oia, Greece",
    category: "landmarks",
    image: IMG.santorini,
    tags: ["views", "romantic", "sunset", "cliffs", "photography"],
  },
  {
    id: "lm-09",
    title: "Amsterdam Canal Houses",
    subtitle: "Amsterdam, Netherlands",
    category: "landmarks",
    image: IMG.amsterdam,
    tags: ["canals", "architecture", "charming", "historic", "walk"],
  },
  {
    id: "lm-10",
    title: "Torres del Paine Massif",
    subtitle: "Patagonia, Chile",
    category: "landmarks",
    image: IMG.patagonia,
    tags: ["mountains", "nature", "epic", "remote", "photography"],
  },
  {
    id: "lm-11",
    title: "Tanah Lot Sea Temple",
    subtitle: "Bali, Indonesia",
    category: "landmarks",
    image: IMG.bali,
    tags: ["spiritual", "ocean", "sunset", "culture", "photography"],
  },
  {
    id: "lm-12",
    title: "Blue Lagoon Geothermal Spa",
    subtitle: "Reykjavik, Iceland",
    category: "landmarks",
    image: IMG.iceland,
    tags: ["geothermal", "spa", "unique", "nature", "iconic"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2. MUSEUMS & ART (10)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "mu-01",
    title: "Louvre After Hours",
    subtitle: "Paris, France",
    category: "museums",
    image: IMG.paris,
    tags: ["art", "world-class", "history", "iconic", "painting"],
  },
  {
    id: "mu-02",
    title: "teamLab Borderless",
    subtitle: "Tokyo, Japan",
    category: "museums",
    image: IMG.tokyo,
    tags: ["digital-art", "immersive", "futuristic", "interactive", "light"],
  },
  {
    id: "mu-03",
    title: "Vatican Museums & Sistine Chapel",
    subtitle: "Rome, Italy",
    category: "museums",
    image: IMG.rome,
    tags: ["renaissance", "sacred", "masterpiece", "history", "ceiling"],
  },
  {
    id: "mu-04",
    title: "Van Gogh Museum",
    subtitle: "Amsterdam, Netherlands",
    category: "museums",
    image: IMG.amsterdam,
    tags: ["painting", "impressionism", "biography", "art", "dutch"],
  },
  {
    id: "mu-05",
    title: "MoMA Contemporary Exhibit",
    subtitle: "New York, USA",
    category: "museums",
    image: IMG.newyork,
    tags: ["modern-art", "contemporary", "sculpture", "design", "culture"],
  },
  {
    id: "mu-06",
    title: "Picasso Museum Walking Tour",
    subtitle: "Barcelona, Spain",
    category: "museums",
    image: IMG.barcelona,
    tags: ["picasso", "cubism", "art", "walking-tour", "history"],
  },
  {
    id: "mu-07",
    title: "Dubai Museum of the Future",
    subtitle: "Dubai, UAE",
    category: "museums",
    image: IMG.dubai,
    tags: ["futuristic", "technology", "innovation", "architecture", "ai"],
  },
  {
    id: "mu-08",
    title: "Street Art Tour in Ubud",
    subtitle: "Bali, Indonesia",
    category: "museums",
    image: IMG.bali,
    tags: ["street-art", "murals", "local", "culture", "walking"],
  },
  {
    id: "mu-09",
    title: "Samurai & Geisha History Museum",
    subtitle: "Kyoto, Japan",
    category: "museums",
    image: IMG.kyoto,
    tags: ["samurai", "tradition", "history", "costume", "culture"],
  },
  {
    id: "mu-10",
    title: "Harpa Concert Hall & Art Walk",
    subtitle: "Reykjavik, Iceland",
    category: "museums",
    image: IMG.iceland,
    tags: ["architecture", "music", "glass", "design", "nordic"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 3. FOOD & DINING (12)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "fd-01",
    title: "Street Food in Bangkok Style",
    subtitle: "Chatuchak Market",
    category: "food",
    image: IMG.tokyo,
    tags: ["street-food", "spicy", "local", "cheap-eats", "authentic"],
  },
  {
    id: "fd-02",
    title: "Sushi Omakase at a Tokyo Counter",
    subtitle: "Tsukiji, Tokyo",
    category: "food",
    image: IMG.tokyo,
    tags: ["sushi", "omakase", "fresh", "japanese", "premium"],
  },
  {
    id: "fd-03",
    title: "Pasta Making in a Roman Kitchen",
    subtitle: "Trastevere, Rome",
    category: "food",
    image: IMG.rome,
    tags: ["cooking-class", "pasta", "italian", "hands-on", "tradition"],
  },
  {
    id: "fd-04",
    title: "Wine Tasting in Santorini Vineyards",
    subtitle: "Santorini, Greece",
    category: "food",
    image: IMG.santorini,
    tags: ["wine", "vineyard", "sunset", "tasting", "romantic"],
  },
  {
    id: "fd-05",
    title: "Balinese Cooking Class",
    subtitle: "Ubud, Bali",
    category: "food",
    image: IMG.bali,
    tags: ["cooking-class", "spices", "tropical", "local", "organic"],
  },
  {
    id: "fd-06",
    title: "French Pastry & Cafe Hopping",
    subtitle: "Le Marais, Paris",
    category: "food",
    image: IMG.paris,
    tags: ["pastry", "croissant", "cafe", "french", "morning"],
  },
  {
    id: "fd-07",
    title: "Tapas Crawl in El Born",
    subtitle: "Barcelona, Spain",
    category: "food",
    image: IMG.barcelona,
    tags: ["tapas", "bar-hopping", "seafood", "social", "spanish"],
  },
  {
    id: "fd-08",
    title: "Rooftop Brunch Overlooking the Palm",
    subtitle: "Palm Jumeirah, Dubai",
    category: "food",
    image: IMG.dubai,
    tags: ["brunch", "luxury", "views", "champagne", "rooftop"],
  },
  {
    id: "fd-09",
    title: "Ramen Alley Late-Night Crawl",
    subtitle: "Shinjuku, Tokyo",
    category: "food",
    image: IMG.tokyo,
    tags: ["ramen", "late-night", "noodles", "authentic", "hidden-gem"],
  },
  {
    id: "fd-10",
    title: "Farm-to-Table in Patagonia",
    subtitle: "El Chalten, Argentina",
    category: "food",
    image: IMG.patagonia,
    tags: ["farm-to-table", "lamb", "organic", "rustic", "wine"],
  },
  {
    id: "fd-11",
    title: "Seafood Feast on the Beach",
    subtitle: "Phuket, Thailand",
    category: "food",
    image: IMG.phuket,
    tags: ["seafood", "beachside", "grilled", "tropical", "fresh"],
  },
  {
    id: "fd-12",
    title: "Dutch Cheese Market Experience",
    subtitle: "Amsterdam, Netherlands",
    category: "food",
    image: IMG.amsterdam,
    tags: ["cheese", "market", "dutch", "tasting", "tradition"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 4. NATURE (10)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "na-01",
    title: "Northern Lights Chase",
    subtitle: "Iceland",
    category: "nature",
    image: IMG.iceland,
    tags: ["aurora", "night-sky", "bucket-list", "photography", "cold"],
  },
  {
    id: "na-02",
    title: "Tegallalang Rice Terrace Walk",
    subtitle: "Ubud, Bali",
    category: "nature",
    image: IMG.bali,
    tags: ["rice-terraces", "green", "walk", "serene", "photography"],
  },
  {
    id: "na-03",
    title: "Glacier Hiking on Solheimajokull",
    subtitle: "South Iceland",
    category: "nature",
    image: IMG.iceland,
    tags: ["glacier", "ice", "hiking", "adventure", "raw"],
  },
  {
    id: "na-04",
    title: "Grey Glacier Lookout Trek",
    subtitle: "Torres del Paine, Chile",
    category: "nature",
    image: IMG.patagonia,
    tags: ["glacier", "trek", "remote", "epic", "mountain"],
  },
  {
    id: "na-05",
    title: "Sacred Monkey Forest Sanctuary",
    subtitle: "Ubud, Bali",
    category: "nature",
    image: IMG.bali,
    tags: ["wildlife", "monkeys", "jungle", "sacred", "walk"],
  },
  {
    id: "na-06",
    title: "Mount Fuji Sunrise Hike",
    subtitle: "Fuji-Hakone, Japan",
    category: "nature",
    image: IMG.tokyo,
    tags: ["volcano", "sunrise", "bucket-list", "hiking", "sacred"],
  },
  {
    id: "na-07",
    title: "Whale Watching at Husavik",
    subtitle: "North Iceland",
    category: "nature",
    image: IMG.iceland,
    tags: ["whales", "ocean", "wildlife", "boat", "arctic"],
  },
  {
    id: "na-08",
    title: "Bamboo Forest Walk",
    subtitle: "Arashiyama, Kyoto",
    category: "nature",
    image: IMG.kyoto,
    tags: ["bamboo", "forest", "zen", "walk", "photography"],
  },
  {
    id: "na-09",
    title: "Maldives Bioluminescent Beach",
    subtitle: "Vaadhoo Island, Maldives",
    category: "nature",
    image: IMG.maldives,
    tags: ["bioluminescence", "night", "ocean", "unique", "magical"],
  },
  {
    id: "na-10",
    title: "Central Park in Autumn",
    subtitle: "New York, USA",
    category: "nature",
    image: IMG.newyork,
    tags: ["park", "autumn", "foliage", "walk", "urban-nature"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 5. BEACHES (10)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "be-01",
    title: "Overwater Bungalow Morning Swim",
    subtitle: "Maldives",
    category: "beaches",
    image: IMG.maldives,
    tags: ["luxury", "turquoise", "private", "swim", "paradise"],
  },
  {
    id: "be-02",
    title: "Red Beach Sunset",
    subtitle: "Santorini, Greece",
    category: "beaches",
    image: IMG.santorini,
    tags: ["volcanic", "unique", "sunset", "cliffs", "photography"],
  },
  {
    id: "be-03",
    title: "Maya Bay Crystal Waters",
    subtitle: "Phuket Region, Thailand",
    category: "beaches",
    image: IMG.phuket,
    tags: ["crystal-clear", "snorkeling", "tropical", "iconic", "boat"],
  },
  {
    id: "be-04",
    title: "Seminyak Beach Club Day",
    subtitle: "Bali, Indonesia",
    category: "beaches",
    image: IMG.bali,
    tags: ["beach-club", "cocktails", "music", "social", "sunset"],
  },
  {
    id: "be-05",
    title: "Black Sand Beach Walk",
    subtitle: "Vik, Iceland",
    category: "beaches",
    image: IMG.iceland,
    tags: ["black-sand", "dramatic", "raw", "basalt", "photography"],
  },
  {
    id: "be-06",
    title: "Jumeirah Public Beach at Dusk",
    subtitle: "Dubai, UAE",
    category: "beaches",
    image: IMG.dubai,
    tags: ["skyline", "warm", "free", "sunset", "urban-beach"],
  },
  {
    id: "be-07",
    title: "Kata Beach Surfing Lesson",
    subtitle: "Phuket, Thailand",
    category: "beaches",
    image: IMG.phuket,
    tags: ["surfing", "beginner", "waves", "tropical", "active"],
  },
  {
    id: "be-08",
    title: "Sandbar Picnic in the Maldives",
    subtitle: "Ari Atoll, Maldives",
    category: "beaches",
    image: IMG.maldives,
    tags: ["sandbar", "picnic", "exclusive", "turquoise", "romantic"],
  },
  {
    id: "be-09",
    title: "Barceloneta Beach Volleyball",
    subtitle: "Barcelona, Spain",
    category: "beaches",
    image: IMG.barcelona,
    tags: ["volleyball", "social", "urban-beach", "active", "fun"],
  },
  {
    id: "be-10",
    title: "Coney Island Boardwalk Stroll",
    subtitle: "Brooklyn, New York",
    category: "beaches",
    image: IMG.newyork,
    tags: ["boardwalk", "retro", "amusement", "hot-dogs", "classic"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 6. SHOPPING (8)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "sh-01",
    title: "Grand Bazaar Treasure Hunt",
    subtitle: "Istanbul-Style Souk, Dubai",
    category: "shopping",
    image: IMG.dubai,
    tags: ["souk", "haggle", "spices", "gold", "authentic"],
  },
  {
    id: "sh-02",
    title: "Harajuku Fashion District",
    subtitle: "Tokyo, Japan",
    category: "shopping",
    image: IMG.tokyo,
    tags: ["fashion", "quirky", "streetwear", "pop-culture", "unique"],
  },
  {
    id: "sh-03",
    title: "Fifth Avenue Window Shopping",
    subtitle: "Manhattan, New York",
    category: "shopping",
    image: IMG.newyork,
    tags: ["luxury", "fashion", "iconic", "brands", "city"],
  },
  {
    id: "sh-04",
    title: "Floating Market Boat Shopping",
    subtitle: "Bangkok-Style, Phuket",
    category: "shopping",
    image: IMG.phuket,
    tags: ["floating-market", "boat", "local", "crafts", "tropical"],
  },
  {
    id: "sh-05",
    title: "Flea Market Vintage Finds",
    subtitle: "Paris, France",
    category: "shopping",
    image: IMG.paris,
    tags: ["vintage", "antiques", "flea-market", "unique", "treasure"],
  },
  {
    id: "sh-06",
    title: "Ubud Artisan Market",
    subtitle: "Bali, Indonesia",
    category: "shopping",
    image: IMG.bali,
    tags: ["handicrafts", "local", "bargain", "art", "souvenirs"],
  },
  {
    id: "sh-07",
    title: "La Boqueria Market Stroll",
    subtitle: "Las Ramblas, Barcelona",
    category: "shopping",
    image: IMG.barcelona,
    tags: ["food-market", "fresh", "colorful", "tapas", "local"],
  },
  {
    id: "sh-08",
    title: "Nishiki Market Snack Run",
    subtitle: "Kyoto, Japan",
    category: "shopping",
    image: IMG.kyoto,
    tags: ["food-market", "japanese", "snacks", "matcha", "traditional"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 7. NIGHTLIFE (10)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "nl-01",
    title: "Rooftop Bar With Skyline Views",
    subtitle: "Manhattan, New York",
    category: "nightlife",
    image: IMG.newyork,
    tags: ["rooftop", "cocktails", "skyline", "glamour", "views"],
  },
  {
    id: "nl-02",
    title: "Golden Gai Bar Crawl",
    subtitle: "Shinjuku, Tokyo",
    category: "nightlife",
    image: IMG.tokyo,
    tags: ["tiny-bars", "izakaya", "neon", "authentic", "local"],
  },
  {
    id: "nl-03",
    title: "Beach Club Full Moon Party",
    subtitle: "Phuket, Thailand",
    category: "nightlife",
    image: IMG.phuket,
    tags: ["full-moon", "beach-party", "dance", "fire-show", "wild"],
  },
  {
    id: "nl-04",
    title: "Flamenco Show in a Cave",
    subtitle: "Barcelona, Spain",
    category: "nightlife",
    image: IMG.barcelona,
    tags: ["flamenco", "live-music", "passion", "culture", "intimate"],
  },
  {
    id: "nl-05",
    title: "Seine River Dinner Cruise",
    subtitle: "Paris, France",
    category: "nightlife",
    image: IMG.paris,
    tags: ["cruise", "dinner", "romantic", "lights", "river"],
  },
  {
    id: "nl-06",
    title: "Trastevere Wine Bar Hopping",
    subtitle: "Rome, Italy",
    category: "nightlife",
    image: IMG.rome,
    tags: ["wine", "cobblestones", "local", "aperitivo", "social"],
  },
  {
    id: "nl-07",
    title: "Kuta Beach Sunset Cocktails",
    subtitle: "Bali, Indonesia",
    category: "nightlife",
    image: IMG.bali,
    tags: ["sunset", "cocktails", "beach-bar", "chill", "tropical"],
  },
  {
    id: "nl-08",
    title: "Dubai Fountain & Marina Walk",
    subtitle: "Downtown Dubai, UAE",
    category: "nightlife",
    image: IMG.dubai,
    tags: ["fountain-show", "lights", "waterfront", "luxury", "evening"],
  },
  {
    id: "nl-09",
    title: "Amsterdam Brown Cafe Evening",
    subtitle: "Amsterdam, Netherlands",
    category: "nightlife",
    image: IMG.amsterdam,
    tags: ["brown-cafe", "beer", "cozy", "canal-side", "traditional"],
  },
  {
    id: "nl-10",
    title: "Santorini Caldera Sunset Drinks",
    subtitle: "Fira, Santorini",
    category: "nightlife",
    image: IMG.santorini,
    tags: ["sunset", "caldera", "wine", "views", "romantic"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 8. ACTIVITIES (12)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ac-01",
    title: "Cooking Class With a Local Chef",
    subtitle: "Kyoto, Japan",
    category: "activities",
    image: IMG.kyoto,
    tags: ["cooking", "hands-on", "local", "japanese", "culture"],
  },
  {
    id: "ac-02",
    title: "Guided Bike Tour Along Canals",
    subtitle: "Amsterdam, Netherlands",
    category: "activities",
    image: IMG.amsterdam,
    tags: ["cycling", "canals", "city-tour", "active", "scenic"],
  },
  {
    id: "ac-03",
    title: "Scuba Diving a Coral Reef",
    subtitle: "Maldives",
    category: "activities",
    image: IMG.maldives,
    tags: ["scuba", "coral", "underwater", "marine-life", "adventure"],
  },
  {
    id: "ac-04",
    title: "Hot Air Balloon Over Temples",
    subtitle: "Bali Region, Indonesia",
    category: "activities",
    image: IMG.bali,
    tags: ["balloon", "aerial", "sunrise", "views", "bucket-list"],
  },
  {
    id: "ac-05",
    title: "Horse Riding on the Beach",
    subtitle: "Phuket, Thailand",
    category: "activities",
    image: IMG.phuket,
    tags: ["horse-riding", "beach", "sunset", "romantic", "active"],
  },
  {
    id: "ac-06",
    title: "Stand-Up Paddleboard at Dawn",
    subtitle: "Santorini, Greece",
    category: "activities",
    image: IMG.santorini,
    tags: ["paddleboard", "ocean", "sunrise", "calm", "active"],
  },
  {
    id: "ac-07",
    title: "Vespa Tour Through Narrow Streets",
    subtitle: "Rome, Italy",
    category: "activities",
    image: IMG.rome,
    tags: ["vespa", "adventure", "city-tour", "fast", "iconic"],
  },
  {
    id: "ac-08",
    title: "Kayaking Through Glacier Lagoon",
    subtitle: "Jokulsarlon, Iceland",
    category: "activities",
    image: IMG.iceland,
    tags: ["kayaking", "glacier", "icebergs", "unique", "cold"],
  },
  {
    id: "ac-09",
    title: "Rock Climbing Montserrat Cliffs",
    subtitle: "Near Barcelona, Spain",
    category: "activities",
    image: IMG.barcelona,
    tags: ["climbing", "cliffs", "views", "challenge", "outdoor"],
  },
  {
    id: "ac-10",
    title: "Sunrise Yoga on a Volcano",
    subtitle: "Mount Batur, Bali",
    category: "activities",
    image: IMG.bali,
    tags: ["yoga", "sunrise", "volcano", "mindful", "views"],
  },
  {
    id: "ac-11",
    title: "Photography Walk in Montmartre",
    subtitle: "Paris, France",
    category: "activities",
    image: IMG.paris,
    tags: ["photography", "art", "cobblestones", "charming", "walk"],
  },
  {
    id: "ac-12",
    title: "Desert Dune Bashing",
    subtitle: "Dubai, UAE",
    category: "activities",
    image: IMG.dubai,
    tags: ["4x4", "desert", "adrenaline", "sand", "adventure"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 9. EXTREME SPORTS (10)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ex-01",
    title: "Skydiving Over Palm Jumeirah",
    subtitle: "Dubai, UAE",
    category: "extreme",
    image: IMG.dubai,
    tags: ["skydiving", "freefall", "adrenaline", "aerial", "bucket-list"],
  },
  {
    id: "ex-02",
    title: "Bungee Jump From a Bridge",
    subtitle: "Queenstown-Style, Iceland",
    category: "extreme",
    image: IMG.iceland,
    tags: ["bungee", "freefall", "fear", "adrenaline", "extreme"],
  },
  {
    id: "ex-03",
    title: "White Water Rafting Class V",
    subtitle: "Patagonia, Argentina",
    category: "extreme",
    image: IMG.patagonia,
    tags: ["rafting", "rapids", "river", "team", "wild"],
  },
  {
    id: "ex-04",
    title: "Paragliding Over a Volcano",
    subtitle: "Bali, Indonesia",
    category: "extreme",
    image: IMG.bali,
    tags: ["paragliding", "aerial", "volcano", "views", "extreme"],
  },
  {
    id: "ex-05",
    title: "Ice Climbing a Frozen Waterfall",
    subtitle: "South Iceland",
    category: "extreme",
    image: IMG.iceland,
    tags: ["ice-climbing", "frozen", "technical", "cold", "extreme"],
  },
  {
    id: "ex-06",
    title: "Cliff Diving Into Ocean Pools",
    subtitle: "Santorini, Greece",
    category: "extreme",
    image: IMG.santorini,
    tags: ["cliff-diving", "ocean", "adrenaline", "jumping", "bold"],
  },
  {
    id: "ex-07",
    title: "Canyoning Through Waterfalls",
    subtitle: "Near Barcelona, Spain",
    category: "extreme",
    image: IMG.barcelona,
    tags: ["canyoning", "waterfall", "rappel", "swim", "adventure"],
  },
  {
    id: "ex-08",
    title: "Mountain Biking Steep Trails",
    subtitle: "Patagonia, Chile",
    category: "extreme",
    image: IMG.patagonia,
    tags: ["mountain-biking", "downhill", "trails", "speed", "nature"],
  },
  {
    id: "ex-09",
    title: "Surfing Big Waves at Uluwatu",
    subtitle: "Bali, Indonesia",
    category: "extreme",
    image: IMG.bali,
    tags: ["surfing", "big-waves", "reef-break", "adrenaline", "ocean"],
  },
  {
    id: "ex-10",
    title: "Zip-Line Over a Jungle Canopy",
    subtitle: "Phuket, Thailand",
    category: "extreme",
    image: IMG.phuket,
    tags: ["zip-line", "jungle", "canopy", "height", "speed"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 10. FAMILY FUN (10)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "fa-01",
    title: "Aquaventure Waterpark Day",
    subtitle: "Palm Jumeirah, Dubai",
    category: "family",
    image: IMG.dubai,
    tags: ["waterpark", "slides", "kids", "all-ages", "splash"],
  },
  {
    id: "fa-02",
    title: "Dolphin Watching Boat Trip",
    subtitle: "Maldives",
    category: "family",
    image: IMG.maldives,
    tags: ["dolphins", "boat", "ocean", "kids", "wildlife"],
  },
  {
    id: "fa-03",
    title: "Bamboo Raft Down a River",
    subtitle: "Phuket Region, Thailand",
    category: "family",
    image: IMG.phuket,
    tags: ["rafting", "gentle", "scenic", "kids", "nature"],
  },
  {
    id: "fa-04",
    title: "Gelato Tour Through Rome",
    subtitle: "Rome, Italy",
    category: "family",
    image: IMG.rome,
    tags: ["gelato", "walking-tour", "sweet", "kids", "fun"],
  },
  {
    id: "fa-05",
    title: "Canal Boat Ride With Pancakes",
    subtitle: "Amsterdam, Netherlands",
    category: "family",
    image: IMG.amsterdam,
    tags: ["canal-boat", "pancakes", "cozy", "kids", "dutch"],
  },
  {
    id: "fa-06",
    title: "Disneyland Paris Adventure",
    subtitle: "Marne-la-Vallee, France",
    category: "family",
    image: IMG.paris,
    tags: ["theme-park", "rides", "characters", "kids", "magical"],
  },
  {
    id: "fa-07",
    title: "Petting Zoo & Rice Planting",
    subtitle: "Ubud, Bali",
    category: "family",
    image: IMG.bali,
    tags: ["farm", "animals", "hands-on", "kids", "educational"],
  },
  {
    id: "fa-08",
    title: "Shibuya Robot Show Experience",
    subtitle: "Tokyo, Japan",
    category: "family",
    image: IMG.tokyo,
    tags: ["robots", "show", "neon", "quirky", "kids"],
  },
  {
    id: "fa-09",
    title: "Park Guell Mosaic Playground",
    subtitle: "Barcelona, Spain",
    category: "family",
    image: IMG.barcelona,
    tags: ["gaudi", "mosaics", "playground", "colorful", "kids"],
  },
  {
    id: "fa-10",
    title: "Glacier Lagoon Boat Tour",
    subtitle: "Jokulsarlon, Iceland",
    category: "family",
    image: IMG.iceland,
    tags: ["glacier", "boat", "icebergs", "educational", "scenic"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 11. BUSINESS & REAL ESTATE INVESTMENTS (12)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "in-01",
    title: "Luxury Villa Investment Tour",
    subtitle: "Seminyak, Bali",
    category: "investments",
    image: IMG.bali,
    tags: ["real-estate", "villa", "rental-income", "luxury", "tropical"],
  },
  {
    id: "in-02",
    title: "Dubai Marina Apartment Viewing",
    subtitle: "Dubai Marina, UAE",
    category: "investments",
    image: IMG.dubai,
    tags: ["real-estate", "apartment", "skyline", "rental", "tax-free"],
  },
  {
    id: "in-03",
    title: "Startup Hub & Co-Working Tour",
    subtitle: "Tokyo, Japan",
    category: "investments",
    image: IMG.tokyo,
    tags: ["startup", "co-working", "tech", "networking", "innovation"],
  },
  {
    id: "in-04",
    title: "Santorini Boutique Hotel Walkthrough",
    subtitle: "Oia, Santorini",
    category: "investments",
    image: IMG.santorini,
    tags: ["hospitality", "boutique-hotel", "tourism", "income", "views"],
  },
  {
    id: "in-05",
    title: "Amsterdam Canal House Investment",
    subtitle: "Jordaan, Amsterdam",
    category: "investments",
    image: IMG.amsterdam,
    tags: ["real-estate", "canal-house", "heritage", "airbnb", "europe"],
  },
  {
    id: "in-06",
    title: "Phuket Beachfront Resort Tour",
    subtitle: "Phuket, Thailand",
    category: "investments",
    image: IMG.phuket,
    tags: ["resort", "beachfront", "hospitality", "roi", "tropical"],
  },
  {
    id: "in-07",
    title: "NYC Commercial Real Estate Walk",
    subtitle: "Manhattan, New York",
    category: "investments",
    image: IMG.newyork,
    tags: ["commercial", "real-estate", "office", "prime-location", "city"],
  },
  {
    id: "in-08",
    title: "Barcelona Apartment Renovation Flip",
    subtitle: "Eixample, Barcelona",
    category: "investments",
    image: IMG.barcelona,
    tags: ["renovation", "flip", "apartment", "architecture", "europe"],
  },
  {
    id: "in-09",
    title: "Maldives Private Island Development",
    subtitle: "Maldives Atolls",
    category: "investments",
    image: IMG.maldives,
    tags: ["private-island", "luxury", "development", "hospitality", "exclusive"],
  },
  {
    id: "in-10",
    title: "Paris Arrondissement Property Tour",
    subtitle: "Saint-Germain, Paris",
    category: "investments",
    image: IMG.paris,
    tags: ["real-estate", "historic", "appreciation", "parisian", "rental"],
  },
  {
    id: "in-11",
    title: "Iceland Eco-Lodge Business Plan",
    subtitle: "Golden Circle, Iceland",
    category: "investments",
    image: IMG.iceland,
    tags: ["eco-lodge", "sustainable", "tourism", "nature", "business"],
  },
  {
    id: "in-12",
    title: "Rome Historic Center B&B Opportunity",
    subtitle: "Monti, Rome",
    category: "investments",
    image: IMG.rome,
    tags: ["b&b", "historic", "tourism", "income", "heritage"],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Get all items for a given category */
export function getItemsByCategory(category: SwipeCategory): SwipeItem[] {
  return SWIPE_ITEMS.filter((item) => item.category === category);
}

/** Get a flat shuffled array of all items */
export function getShuffledItems(): SwipeItem[] {
  const arr = [...SWIPE_ITEMS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Total item count (should be 116) */
export const TOTAL_SWIPE_ITEMS = SWIPE_ITEMS.length;
