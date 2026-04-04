/* ═══════════════════════════════════════════
 *  TRAVI — Mock Data
 *  Used across all screens until real API is connected
 * ═══════════════════════════════════════════ */

// ── DNA Cards (S8, S25) ─────────────────
export const dnaCards = [
  { id: '1', title: 'Desert Safari', image: 'https://picsum.photos/400/600?random=1', category: 'adventure', tags: ['adventure', 'nature'] },
  { id: '2', title: 'Museum of the Future', image: 'https://picsum.photos/400/600?random=2', category: 'culture', tags: ['culture', 'technology'] },
  { id: '3', title: 'Street Food Tour', image: 'https://picsum.photos/400/600?random=3', category: 'food', tags: ['food', 'culture'] },
  { id: '4', title: 'Luxury Yacht Cruise', image: 'https://picsum.photos/400/600?random=4', category: 'luxury', tags: ['luxury', 'social'] },
  { id: '5', title: 'Mountain Trekking', image: 'https://picsum.photos/400/600?random=5', category: 'adventure', tags: ['adventure', 'nature'] },
  { id: '6', title: 'Spa & Wellness Retreat', image: 'https://picsum.photos/400/600?random=6', category: 'wellness', tags: ['wellness', 'luxury'] },
  { id: '7', title: 'Nightlife District', image: 'https://picsum.photos/400/600?random=7', category: 'social', tags: ['social', 'food'] },
  { id: '8', title: 'Temple Exploration', image: 'https://picsum.photos/400/600?random=8', category: 'culture', tags: ['culture', 'nature'] },
  { id: '9', title: 'Scuba Diving', image: 'https://picsum.photos/400/600?random=9', category: 'adventure', tags: ['adventure', 'nature'] },
  { id: '10', title: 'Cooking Class', image: 'https://picsum.photos/400/600?random=10', category: 'food', tags: ['food', 'culture'] },
  { id: '11', title: 'Bungee Jumping', image: 'https://picsum.photos/400/600?random=11', category: 'adventure', tags: ['adventure'] },
  { id: '12', title: 'Wine Tasting', image: 'https://picsum.photos/400/600?random=12', category: 'food', tags: ['food', 'luxury'] },
  { id: '13', title: 'Historical Walking Tour', image: 'https://picsum.photos/400/600?random=13', category: 'culture', tags: ['culture'] },
  { id: '14', title: 'Beach Yoga', image: 'https://picsum.photos/400/600?random=14', category: 'wellness', tags: ['wellness', 'nature'] },
  { id: '15', title: 'Local Market Shopping', image: 'https://picsum.photos/400/600?random=15', category: 'culture', tags: ['culture', 'food'] },
];

// ── Destinations ─────────────────────────
export const destinations = [
  { id: 'd1', name: 'Dubai', country: 'UAE', image: 'https://picsum.photos/800/400?random=20', matchScore: 0.94, priceIndex: 0.8, tags: ['luxury', 'adventure', 'food'] },
  { id: 'd2', name: 'Chiang Mai', country: 'Thailand', image: 'https://picsum.photos/800/400?random=21', matchScore: 0.91, priceIndex: 0.2, tags: ['culture', 'food', 'nature'] },
  { id: 'd3', name: 'Barcelona', country: 'Spain', image: 'https://picsum.photos/800/400?random=22', matchScore: 0.89, priceIndex: 0.5, tags: ['culture', 'food', 'social'] },
  { id: 'd4', name: 'Bali', country: 'Indonesia', image: 'https://picsum.photos/800/400?random=23', matchScore: 0.87, priceIndex: 0.3, tags: ['nature', 'wellness', 'adventure'] },
  { id: 'd5', name: 'Tokyo', country: 'Japan', image: 'https://picsum.photos/800/400?random=24', matchScore: 0.85, priceIndex: 0.7, tags: ['culture', 'food', 'technology'] },
  { id: 'd6', name: 'Lisbon', country: 'Portugal', image: 'https://picsum.photos/800/400?random=25', matchScore: 0.83, priceIndex: 0.4, tags: ['culture', 'food', 'social'] },
  { id: 'd7', name: 'Cape Town', country: 'South Africa', image: 'https://picsum.photos/800/400?random=26', matchScore: 0.81, priceIndex: 0.4, tags: ['adventure', 'nature', 'food'] },
  { id: 'd8', name: 'Reykjavik', country: 'Iceland', image: 'https://picsum.photos/800/400?random=27', matchScore: 0.79, priceIndex: 0.8, tags: ['nature', 'adventure'] },
  { id: 'd9', name: 'Marrakech', country: 'Morocco', image: 'https://picsum.photos/800/400?random=28', matchScore: 0.77, priceIndex: 0.3, tags: ['culture', 'food', 'adventure'] },
  { id: 'd10', name: 'New York', country: 'USA', image: 'https://picsum.photos/800/400?random=29', matchScore: 0.75, priceIndex: 0.9, tags: ['social', 'culture', 'food'] },
];

// ── Flights ──────────────────────────────
export const flights = [
  { id: 'f1', airline: 'Emirates', flightNo: 'EK201', departure: '08:30', arrival: '14:45', duration: '6h 15m', price: 450, stops: 0, class: 'economy' },
  { id: 'f2', airline: 'Qatar Airways', flightNo: 'QR302', departure: '10:15', arrival: '17:30', duration: '7h 15m', price: 380, stops: 1, class: 'economy' },
  { id: 'f3', airline: 'Turkish Airlines', flightNo: 'TK44', departure: '14:00', arrival: '22:30', duration: '8h 30m', price: 320, stops: 1, class: 'economy' },
  { id: 'f4', airline: 'Lufthansa', flightNo: 'LH629', departure: '06:45', arrival: '12:00', duration: '5h 15m', price: 520, stops: 0, class: 'economy' },
  { id: 'f5', airline: 'Emirates', flightNo: 'EK201', departure: '08:30', arrival: '14:45', duration: '6h 15m', price: 1200, stops: 0, class: 'business' },
];

// ── Hotels ───────────────────────────────
export const hotels = [
  { id: 'h1', name: 'The Grand Palace Hotel', stars: 5, price: 280, image: 'https://picsum.photos/800/400?random=30', rating: 4.8, reviews: 2341, amenities: ['pool', 'spa', 'gym', 'wifi', 'restaurant'] },
  { id: 'h2', name: 'City Center Boutique', stars: 4, price: 150, image: 'https://picsum.photos/800/400?random=31', rating: 4.5, reviews: 1203, amenities: ['wifi', 'restaurant', 'bar'] },
  { id: 'h3', name: 'Budget Backpacker Inn', stars: 2, price: 45, image: 'https://picsum.photos/800/400?random=32', rating: 4.1, reviews: 876, amenities: ['wifi', 'kitchen'] },
  { id: 'h4', name: 'Seaside Resort & Spa', stars: 5, price: 350, image: 'https://picsum.photos/800/400?random=33', rating: 4.9, reviews: 3456, amenities: ['pool', 'spa', 'beach', 'gym', 'wifi', 'restaurant'] },
  { id: 'h5', name: 'Downtown Apartment', stars: 3, price: 95, image: 'https://picsum.photos/800/400?random=34', rating: 4.3, reviews: 654, amenities: ['wifi', 'kitchen', 'washer'] },
];

// ── Activities ───────────────────────────
export const activities = [
  { id: 'a1', name: 'Desert Safari Adventure', price: 85, duration: '4h', rating: 4.7, image: 'https://picsum.photos/400/300?random=40', category: 'adventure', time: '09:00' },
  { id: 'a2', name: 'Old Town Walking Tour', price: 25, duration: '2h', rating: 4.5, image: 'https://picsum.photos/400/300?random=41', category: 'culture', time: '10:00' },
  { id: 'a3', name: 'Cooking Class with Chef', price: 65, duration: '3h', rating: 4.9, image: 'https://picsum.photos/400/300?random=42', category: 'food', time: '14:00' },
  { id: 'a4', name: 'Sunset Boat Cruise', price: 120, duration: '2h', rating: 4.8, image: 'https://picsum.photos/400/300?random=43', category: 'luxury', time: '17:00' },
  { id: 'a5', name: 'Temple Visit & Meditation', price: 15, duration: '1.5h', rating: 4.6, image: 'https://picsum.photos/400/300?random=44', category: 'wellness', time: '07:00' },
  { id: 'a6', name: 'Night Market Tour', price: 30, duration: '3h', rating: 4.4, image: 'https://picsum.photos/400/300?random=45', category: 'social', time: '19:00' },
];

// ── Itinerary Days ───────────────────────
export const itineraryDays = [
  { id: 'day1', date: '2026-05-15', label: 'Day 1', activities: [activities[0], activities[2]] },
  { id: 'day2', date: '2026-05-16', label: 'Day 2', activities: [activities[1], activities[3]] },
  { id: 'day3', date: '2026-05-17', label: 'Day 3', activities: [activities[4], activities[5]] },
];

// ── Expenses ─────────────────────────────
export const expenses = [
  { id: 'e1', description: 'Lunch at local restaurant', amount: 35, currency: 'EUR', category: 'food', date: '2026-05-15', splitWith: [] },
  { id: 'e2', description: 'Taxi to hotel', amount: 22, currency: 'EUR', category: 'transport', date: '2026-05-15', splitWith: ['user2'] },
  { id: 'e3', description: 'Museum entrance', amount: 15, currency: 'EUR', category: 'activities', date: '2026-05-16', splitWith: [] },
  { id: 'e4', description: 'Souvenir shop', amount: 48, currency: 'EUR', category: 'shopping', date: '2026-05-16', splitWith: [] },
  { id: 'e5', description: 'Dinner for group', amount: 120, currency: 'EUR', category: 'food', date: '2026-05-17', splitWith: ['user2', 'user3'] },
];

// ── Wallet / Points ──────────────────────
export const walletData = {
  balance: 245.50,
  currency: 'EUR',
  pendingCashback: 32.00,
  transactions: [
    { id: 't1', type: 'cashback', amount: 15.00, description: 'Hotel booking cashback', date: '2026-04-20' },
    { id: 't2', type: 'topup', amount: 100.00, description: 'Wallet top-up', date: '2026-04-18' },
    { id: 't3', type: 'payment', amount: -45.00, description: 'Activity booking', date: '2026-04-15' },
    { id: 't4', type: 'cashback', amount: 8.50, description: 'Flight booking cashback', date: '2026-04-10' },
  ],
};

export const pointsData = {
  balance: 12500,
  tier: 'gold' as const,
  tierProgress: 0.65,
  nextTier: 'platinum',
  nextTierAt: 50000,
  earnRate: 2.0,
  transactions: [
    { id: 'p1', type: 'earn', amount: 500, description: 'Flight booking', date: '2026-04-20' },
    { id: 'p2', type: 'earn', amount: 200, description: 'Hotel review', date: '2026-04-18' },
    { id: 'p3', type: 'redeem', amount: -1000, description: 'Gift card redemption', date: '2026-04-15' },
    { id: 'p4', type: 'earn', amount: 100, description: 'Check-in bonus', date: '2026-04-10' },
  ],
};

// ── User Profile ─────────────────────────
export const currentUser = {
  id: 'user1',
  firstName: 'Alex',
  lastName: 'Cohen',
  email: 'alex@example.com',
  avatar: 'https://picsum.photos/200/200?random=99',
  homeAirport: 'TLV',
  preferredCurrency: 'EUR',
  memberSince: '2025-11-01',
  tripsCompleted: 4,
  countriesVisited: 12,
  dna: {
    adventure: 0.82,
    culture: 0.75,
    luxury: 0.45,
    social: 0.68,
    nature: 0.71,
    food: 0.90,
    wellness: 0.55,
    budget: 0.60,
  },
};

// ── Social / Travelers ───────────────────
export const travelers = [
  { id: 'user2', name: 'Maya Levi', avatar: 'https://picsum.photos/200/200?random=50', compatibility: 0.89, mutualTrips: 2 },
  { id: 'user3', name: 'Dan Katz', avatar: 'https://picsum.photos/200/200?random=51', compatibility: 0.76, mutualTrips: 1 },
  { id: 'user4', name: 'Sarah Ben', avatar: 'https://picsum.photos/200/200?random=52', compatibility: 0.92, mutualTrips: 0 },
  { id: 'user5', name: 'Tom Raz', avatar: 'https://picsum.photos/200/200?random=53', compatibility: 0.71, mutualTrips: 3 },
];

// ── Chat Messages ────────────────────────
export const chatMessages = [
  { id: 'm1', sender: 'ai', text: 'Welcome to Dubai! I see you have a Desert Safari at 9 AM tomorrow. Would you like me to arrange transport?', timestamp: '2026-05-15T08:00:00Z', actions: ['Yes, arrange', 'No thanks'] },
  { id: 'm2', sender: 'user', text: 'Yes please!', timestamp: '2026-05-15T08:01:00Z' },
  { id: 'm3', sender: 'ai', text: 'Done! A pickup has been arranged for 8:15 AM from your hotel lobby. The driver will hold a TRAVI sign. Enjoy the safari! 🏜️', timestamp: '2026-05-15T08:01:30Z' },
];

// ── Flight Alerts ────────────────────────
export const flightAlerts = [
  { id: 'fa1', origin: 'TLV', destination: 'BCN', maxPrice: 200, currentBest: 175, status: 'active', lastChecked: '2026-04-04T10:00:00Z' },
  { id: 'fa2', origin: 'TLV', destination: 'LHR', maxPrice: 300, currentBest: 320, status: 'active', lastChecked: '2026-04-04T10:00:00Z' },
  { id: 'fa3', origin: 'TLV', destination: 'BKK', maxPrice: 500, currentBest: 445, status: 'triggered', lastChecked: '2026-04-04T09:00:00Z' },
];

// ── Currencies ───────────────────────────
export const exchangeRates: Record<string, number> = {
  USD: 1.0, EUR: 0.92, GBP: 0.79, ILS: 3.65, THB: 34.5,
  JPY: 151.2, AED: 3.67, IDR: 15800, MAD: 10.1, ZAR: 18.5,
  ISK: 137.5, AUD: 1.53, CAD: 1.36, CHF: 0.88, SEK: 10.8,
};
