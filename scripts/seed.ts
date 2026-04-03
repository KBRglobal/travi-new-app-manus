/**
 * TRAVI Database Seed Script
 * Populates all 22 tables with realistic demo data.
 * Run: DATABASE_URL=... tsx scripts/seed.ts
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../drizzle/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log("🌱 Seeding TRAVI database...");

  // ── 1. Users ─────────────────────────────────────────────────────────────
  console.log("  → users");
  const userRows = await db.insert(schema.users).values([
    { email: "yoni@travi.app", name: "Yoni Cohen", role: "admin", avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
    { email: "maya@travi.app", name: "Maya Levi", role: "user", avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
    { email: "avi@travi.app", name: "Avi Shapiro", role: "user", avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg" },
    { email: "noa@travi.app", name: "Noa Ben-David", role: "user", avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg" },
    { email: "dan@travi.app", name: "Dan Mizrahi", role: "user", avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg" },
  ]).returning();
  const [yoni, maya, avi, noa, dan] = userRows;

  // ── 2. Traveler Profiles ──────────────────────────────────────────────────
  console.log("  → traveler_profiles");
  await db.insert(schema.travelerProfiles).values([
    {
      userId: yoni.id, travelerType: "Adventurer", bio: "Love hiking, street food, and getting lost in new cities.",
      homeCity: "Tel Aviv", homeCountry: "Israel", languages: ["Hebrew", "English", "Spanish"],
      points: 4820, tier: "Globetrotter", totalTrips: 14, totalSaved: 2340,
      explorerScore: 88, relaxerScore: 35, adventurerScore: 92, culturalistScore: 70,
      foodieScore: 85, photographerScore: 60, historianScore: 55, naturalistScore: 78,
      interests: ["hiking", "street-food", "photography", "nightlife"],
      visitedCountries: ["Thailand", "Japan", "Peru", "Morocco", "Iceland"],
    },
    {
      userId: maya.id, travelerType: "Culturalist", bio: "Museums, local markets, and hidden cafés are my thing.",
      homeCity: "Jerusalem", homeCountry: "Israel", languages: ["Hebrew", "English", "French"],
      points: 2150, tier: "Adventurer", totalTrips: 7, totalSaved: 980,
      explorerScore: 60, relaxerScore: 55, adventurerScore: 45, culturalistScore: 95,
      foodieScore: 80, photographerScore: 75, historianScore: 90, naturalistScore: 40,
      interests: ["museums", "art", "local-food", "architecture"],
      visitedCountries: ["France", "Italy", "Greece", "Spain"],
    },
    {
      userId: avi.id, travelerType: "Luxury Traveler", bio: "5-star hotels, fine dining, and first-class flights.",
      homeCity: "Herzliya", homeCountry: "Israel", languages: ["Hebrew", "English"],
      points: 9600, tier: "Elite Nomad", totalTrips: 28, totalSaved: 8200,
      explorerScore: 50, relaxerScore: 85, adventurerScore: 30, culturalistScore: 65,
      foodieScore: 90, photographerScore: 55, historianScore: 40, naturalistScore: 35,
      interests: ["luxury", "fine-dining", "spa", "golf"],
      visitedCountries: ["Maldives", "Seychelles", "Monaco", "Dubai", "Switzerland"],
    },
    {
      userId: noa.id, travelerType: "Beach Lover", bio: "Sun, sea, and good vibes.",
      homeCity: "Haifa", homeCountry: "Israel", languages: ["Hebrew", "English"],
      points: 1200, tier: "Explorer", totalTrips: 4, totalSaved: 450,
      explorerScore: 55, relaxerScore: 90, adventurerScore: 40, culturalistScore: 30,
      foodieScore: 65, photographerScore: 80, historianScore: 20, naturalistScore: 70,
      interests: ["beaches", "snorkeling", "sunsets", "cocktails"],
      visitedCountries: ["Santorini", "Bali", "Mykonos"],
    },
    {
      userId: dan.id, travelerType: "Urban Explorer", bio: "Cities, street art, and rooftop bars.",
      homeCity: "Tel Aviv", homeCountry: "Israel", languages: ["Hebrew", "English", "Arabic"],
      points: 3400, tier: "Adventurer", totalTrips: 11, totalSaved: 1560,
      explorerScore: 82, relaxerScore: 40, adventurerScore: 75, culturalistScore: 80,
      foodieScore: 88, photographerScore: 70, historianScore: 65, naturalistScore: 30,
      interests: ["street-art", "rooftop-bars", "local-food", "architecture"],
      visitedCountries: ["NYC", "Tokyo", "Berlin", "Barcelona", "Lisbon"],
    },
  ]);

  // ── 3. Trips ──────────────────────────────────────────────────────────────
  console.log("  → trips");
  const tripRows = await db.insert(schema.trips).values([
    {
      userId: yoni.id, destination: "Tokyo", destinationCode: "TYO",
      departureDate: new Date("2026-05-15"), returnDate: new Date("2026-05-25"),
      status: "booked", travelers: 2, budget: "luxury",
      flightCost: 3200, hotelCost: 2800, activitiesCost: 600,
      totalCost: 6600, cashbackEarned: 330, pointsEarned: 660,
      coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      notes: "Cherry blossom season — book Shinjuku Gyoen early!",
    },
    {
      userId: yoni.id, destination: "Bali", destinationCode: "DPS",
      departureDate: new Date("2025-12-20"), returnDate: new Date("2026-01-03"),
      status: "completed", travelers: 1, budget: "mid-range",
      flightCost: 1800, hotelCost: 900, activitiesCost: 400,
      totalCost: 3100, cashbackEarned: 155, pointsEarned: 310,
      coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    },
    {
      userId: maya.id, destination: "Paris", destinationCode: "CDG",
      departureDate: new Date("2026-06-10"), returnDate: new Date("2026-06-17"),
      status: "planning", travelers: 2, budget: "mid-range",
      flightCost: 1400, hotelCost: 1200, activitiesCost: 500,
      totalCost: 3100, cashbackEarned: 155, pointsEarned: 310,
      coverImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    },
    {
      userId: avi.id, destination: "Maldives", destinationCode: "MLE",
      departureDate: new Date("2026-07-01"), returnDate: new Date("2026-07-10"),
      status: "booked", travelers: 2, budget: "luxury",
      flightCost: 4500, hotelCost: 8000, activitiesCost: 1200,
      totalCost: 13700, cashbackEarned: 685, pointsEarned: 1370,
      coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    },
    {
      userId: dan.id, destination: "Barcelona", destinationCode: "BCN",
      departureDate: new Date("2026-04-20"), returnDate: new Date("2026-04-27"),
      status: "active", travelers: 3, budget: "mid-range",
      flightCost: 900, hotelCost: 1100, activitiesCost: 450,
      totalCost: 2450, cashbackEarned: 122, pointsEarned: 245,
      coverImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
    },
  ]).returning();
  const [tokyoTrip, , parisTrip, , barcelonaTrip] = tripRows;

  // ── 4. Itinerary Items ────────────────────────────────────────────────────
  console.log("  → itinerary_items");
  await db.insert(schema.itineraryItems).values([
    // Tokyo Day 1
    { tripId: tokyoTrip.id, day: 1, order: 1, type: "activity", title: "Tsukiji Outer Market", description: "Fresh sushi breakfast at the world's most famous fish market.", startTime: "08:00", endTime: "10:00", location: "Tsukiji, Tokyo", cost: 30, cashback: 3, imageUrl: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400" },
    { tripId: tokyoTrip.id, day: 1, order: 2, type: "transport", title: "Taxi to Shibuya", description: "Taxi from Tsukiji to Shibuya Crossing.", startTime: "10:15", endTime: "10:45", location: "Shibuya, Tokyo", cost: 15, cashback: 0 },
    { tripId: tokyoTrip.id, day: 1, order: 3, type: "activity", title: "Shibuya Crossing", description: "Experience the world's busiest pedestrian crossing.", startTime: "11:00", endTime: "12:00", location: "Shibuya, Tokyo", cost: 0, cashback: 0, imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400" },
    { tripId: tokyoTrip.id, day: 1, order: 4, type: "restaurant", title: "Ichiran Ramen", description: "Solo dining ramen experience in individual booths.", startTime: "13:00", endTime: "14:00", location: "Shibuya, Tokyo", cost: 20, cashback: 2 },
    { tripId: tokyoTrip.id, day: 1, order: 5, type: "hotel", title: "Park Hyatt Tokyo", description: "Iconic luxury hotel from Lost in Translation.", startTime: "15:00", endTime: "15:30", location: "Shinjuku, Tokyo", cost: 450, cashback: 45 },
    // Tokyo Day 2
    { tripId: tokyoTrip.id, day: 2, order: 1, type: "activity", title: "Senso-ji Temple", description: "Tokyo's oldest and most significant Buddhist temple.", startTime: "09:00", endTime: "11:00", location: "Asakusa, Tokyo", cost: 0, cashback: 0, imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400" },
    { tripId: tokyoTrip.id, day: 2, order: 2, type: "activity", title: "teamLab Borderless", description: "Immersive digital art museum — book in advance!", startTime: "13:00", endTime: "16:00", location: "Odaiba, Tokyo", cost: 32, cashback: 3 },
    { tripId: tokyoTrip.id, day: 2, order: 3, type: "restaurant", title: "Gonpachi Nishi-Azabu", description: "The restaurant that inspired Kill Bill's battle scene.", startTime: "19:00", endTime: "21:00", location: "Nishi-Azabu, Tokyo", cost: 60, cashback: 6 },
    // Paris Day 1
    { tripId: parisTrip.id, day: 1, order: 1, type: "activity", title: "Eiffel Tower", description: "Visit the iconic iron lady — book summit tickets in advance.", startTime: "09:00", endTime: "11:30", location: "Champ de Mars, Paris", cost: 28, cashback: 3, imageUrl: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400" },
    { tripId: parisTrip.id, day: 1, order: 2, type: "restaurant", title: "Café de Flore", description: "Historic café in Saint-Germain-des-Prés, Sartre's favorite.", startTime: "12:00", endTime: "13:30", location: "Saint-Germain, Paris", cost: 35, cashback: 3 },
    { tripId: parisTrip.id, day: 1, order: 3, type: "activity", title: "Louvre Museum", description: "World's largest art museum — 2-3 hours minimum.", startTime: "14:00", endTime: "17:00", location: "1st arr., Paris", cost: 22, cashback: 2, imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400" },
    // Barcelona Day 1
    { tripId: barcelonaTrip.id, day: 1, order: 1, type: "activity", title: "Sagrada Família", description: "Gaudí's masterpiece — still under construction since 1882.", startTime: "10:00", endTime: "12:00", location: "Eixample, Barcelona", cost: 26, cashback: 3, imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400" },
    { tripId: barcelonaTrip.id, day: 1, order: 2, type: "restaurant", title: "El Xampanyet", description: "Classic tapas bar in El Born — try the house cava.", startTime: "13:00", endTime: "14:30", location: "El Born, Barcelona", cost: 25, cashback: 2 },
    { tripId: barcelonaTrip.id, day: 1, order: 3, type: "activity", title: "Park Güell", description: "Colorful mosaic park with panoramic city views.", startTime: "16:00", endTime: "18:00", location: "Gràcia, Barcelona", cost: 13, cashback: 1 },
  ]);

  // ── 5. Price Alerts ───────────────────────────────────────────────────────
  console.log("  → price_alerts");
  await db.insert(schema.priceAlerts).values([
    { userId: yoni.id, destination: "New York", type: "flight", maxPrice: 2500, currentPrice: 2800, isActive: true, triggered: false },
    { userId: maya.id, destination: "Rome", type: "hotel", maxPrice: 150, currentPrice: 180, isActive: true, triggered: false },
    { userId: avi.id, destination: "Seychelles", type: "package", maxPrice: 8000, currentPrice: 7200, isActive: true, triggered: true },
    { userId: dan.id, destination: "Lisbon", type: "flight", maxPrice: 600, currentPrice: 580, isActive: true, triggered: true },
  ]);

  // ── 6. Wallet Transactions ────────────────────────────────────────────────
  console.log("  → wallet_transactions");
  await db.insert(schema.walletTransactions).values([
    { userId: yoni.id, type: "commission", amount: 330, currency: "USD", description: "Cashback from Tokyo trip booking", tripId: tokyoTrip.id, status: "completed" },
    { userId: yoni.id, type: "commission", amount: 155, currency: "USD", description: "Cashback from Bali trip booking", status: "completed" },
    { userId: yoni.id, type: "credit", amount: 50, currency: "USD", description: "Referral bonus — Avi joined TRAVI", status: "completed" },
    { userId: yoni.id, type: "debit", amount: 100, currency: "USD", description: "Redeemed for flight upgrade", status: "completed" },
    { userId: maya.id, type: "commission", amount: 155, currency: "USD", description: "Cashback from Paris trip booking", tripId: parisTrip.id, status: "pending" },
    { userId: avi.id, type: "commission", amount: 685, currency: "USD", description: "Cashback from Maldives trip booking", status: "completed" },
    { userId: avi.id, type: "debit", amount: 200, currency: "USD", description: "Redeemed for hotel upgrade", status: "completed" },
    { userId: dan.id, type: "commission", amount: 122, currency: "USD", description: "Cashback from Barcelona trip booking", tripId: barcelonaTrip.id, status: "completed" },
  ]);

  // ── 7. DNA Sessions ───────────────────────────────────────────────────────
  console.log("  → dna_sessions");
  const dnaRows = await db.insert(schema.dnaSessions).values([
    { userId: yoni.id, sessionType: "quick_quiz", completedAt: new Date("2026-01-10"), durationSeconds: 420, totalQuestions: 10, answeredQuestions: 10 },
    { userId: maya.id, sessionType: "quick_quiz", completedAt: new Date("2026-01-15"), durationSeconds: 380, totalQuestions: 10, answeredQuestions: 10 },
    { userId: avi.id, sessionType: "first_class", completedAt: new Date("2026-01-05"), durationSeconds: 2400, totalQuestions: 60, answeredQuestions: 58 },
    { userId: dan.id, sessionType: "quick_swipe", completedAt: new Date("2026-02-01"), durationSeconds: 600, totalQuestions: 20, answeredQuestions: 18 },
  ]).returning();

  // ── 8. Quick DNA Results ──────────────────────────────────────────────────
  console.log("  → quick_dna_results");
  await db.insert(schema.quickDnaResults).values([
    {
      sessionId: dnaRows[0].id, userId: yoni.id, travelerType: "Adventurer",
      explorerScore: 88, relaxerScore: 35, adventurerScore: 92, culturalistScore: 70,
      foodieScore: 85, photographerScore: 60, historianScore: 55, naturalistScore: 78,
      topDestinations: ["Patagonia", "Nepal", "Japan", "Morocco", "Iceland"],
      personalityInsights: "You live for the rush of discovery. You'd rather eat street food with locals than dine at a Michelin star.",
    },
    {
      sessionId: dnaRows[1].id, userId: maya.id, travelerType: "Culturalist",
      explorerScore: 60, relaxerScore: 55, adventurerScore: 45, culturalistScore: 95,
      foodieScore: 80, photographerScore: 75, historianScore: 90, naturalistScore: 40,
      topDestinations: ["Rome", "Athens", "Kyoto", "Istanbul", "Cairo"],
      personalityInsights: "History speaks to you. You find meaning in ancient ruins and local traditions.",
    },
  ]);

  // ── 9. Learning Events ────────────────────────────────────────────────────
  console.log("  → learning_events");
  await db.insert(schema.learningEvents).values([
    { userId: yoni.id, eventType: "swipe_right", entityType: "activity", entityId: "hiking-tour", metadata: { destination: "Nepal", category: "adventure" } },
    { userId: yoni.id, eventType: "swipe_right", entityType: "activity", entityId: "street-food-tour", metadata: { destination: "Bangkok", category: "food" } },
    { userId: yoni.id, eventType: "swipe_left", entityType: "activity", entityId: "golf-course", metadata: { destination: "Dubai", category: "sports" } },
    { userId: maya.id, eventType: "swipe_right", entityType: "activity", entityId: "louvre-museum", metadata: { destination: "Paris", category: "culture" } },
    { userId: maya.id, eventType: "search", entityType: "destination", entityId: "Rome", metadata: { query: "Rome museums" } },
    { userId: dan.id, eventType: "bookmark", entityType: "destination", entityId: "Lisbon", metadata: {} },
  ]);

  // ── 10. User Preferences ──────────────────────────────────────────────────
  console.log("  → user_preferences");
  await db.insert(schema.userPreferences).values([
    { userId: yoni.id, currency: "USD", language: "he", notificationsEnabled: true, darkMode: true, dietaryRestrictions: ["kosher"], allergies: [], accessibilityNeeds: [] },
    { userId: maya.id, currency: "EUR", language: "he", notificationsEnabled: true, darkMode: false, dietaryRestrictions: ["vegetarian"], allergies: ["nuts"], accessibilityNeeds: [] },
    { userId: avi.id, currency: "USD", language: "en", notificationsEnabled: true, darkMode: true, dietaryRestrictions: [], allergies: [], accessibilityNeeds: [] },
    { userId: dan.id, currency: "USD", language: "he", notificationsEnabled: false, darkMode: true, dietaryRestrictions: ["halal"], allergies: [], accessibilityNeeds: [] },
  ]);

  // ── 11. Trip Reflections ──────────────────────────────────────────────────
  console.log("  → trip_reflections");
  await db.insert(schema.tripReflections).values([
    { userId: yoni.id, tripId: tokyoTrip.id, rating: 5, highlights: ["teamLab Borderless", "Tsukiji Market", "Shinjuku at night"], lowlights: ["Crowds at Senso-ji on weekends"], wouldReturn: true, recommendationScore: 10, notes: "Best trip of my life. Tokyo is on another level." },
    { userId: dan.id, tripId: barcelonaTrip.id, rating: 4, highlights: ["Sagrada Família", "La Boqueria", "Barceloneta beach"], lowlights: ["Pickpockets on Las Ramblas"], wouldReturn: true, recommendationScore: 9, notes: "Incredible food and architecture. Go in spring." },
  ]);

  // ── 12. Conversations (AI Chat) ───────────────────────────────────────────
  console.log("  → conversations + messages");
  const convRows = await db.insert(schema.conversations).values([
    { userId: yoni.id, title: "Tokyo Trip Planning", tripId: tokyoTrip.id, model: "gpt-4o-mini" },
    { userId: maya.id, title: "Paris Itinerary Help", tripId: parisTrip.id, model: "gpt-4o-mini" },
  ]).returning();

  await db.insert(schema.messages).values([
    { conversationId: convRows[0].id, role: "user", content: "What are the best things to do in Tokyo for 10 days?" },
    { conversationId: convRows[0].id, role: "assistant", content: "Tokyo is incredible for 10 days! Here's my top recommendation: Start with Shinjuku and Shibuya for the urban energy, then head to Asakusa for traditional culture. Don't miss teamLab Borderless for digital art, and the Tsukiji Outer Market for the best sushi breakfast of your life. For day trips, Nikko and Kamakura are both stunning." },
    { conversationId: convRows[1].id, role: "user", content: "Is 7 days enough for Paris?" },
    { conversationId: convRows[1].id, role: "assistant", content: "7 days is perfect for Paris! You can cover the main highlights — Eiffel Tower, Louvre, Musée d'Orsay, Notre-Dame (reopened!), Versailles day trip, and still have time to wander Saint-Germain and Montmartre. Pro tip: buy a Paris Museum Pass for days 2-5 to skip queues." },
  ]);

  // ── 13. Support Tickets ───────────────────────────────────────────────────
  console.log("  → support_tickets");
  await db.insert(schema.supportTickets).values([
    { userId: maya.id, category: "booking", subject: "Hotel booking confirmation not received", description: "I booked the Marriott in Paris 3 days ago but haven't received a confirmation email.", status: "in_progress", priority: "high" },
    { userId: dan.id, category: "payment", subject: "Cashback not credited after Barcelona trip", description: "My Barcelona trip is completed but the $122 cashback hasn't appeared in my wallet.", status: "open", priority: "medium" },
    { userId: noa.id, category: "technical", subject: "App crashes when opening Explore tab", description: "Every time I tap the Explore tab the app crashes. iOS 17.4, iPhone 15 Pro.", status: "resolved", priority: "high", resolvedAt: new Date() },
  ]);

  // ── 14. Referrals ─────────────────────────────────────────────────────────
  console.log("  → referrals");
  await db.insert(schema.referrals).values([
    { referrerId: yoni.id, refereeId: avi.id, code: "YONI2026", status: "completed", rewardAmount: 50, rewardCurrency: "USD", completedAt: new Date("2026-01-20") },
    { referrerId: yoni.id, refereeId: noa.id, code: "YONI2026", status: "completed", rewardAmount: 50, rewardCurrency: "USD", completedAt: new Date("2026-02-05") },
    { referrerId: avi.id, refereeId: dan.id, code: "AVI2026", status: "pending", rewardAmount: 50, rewardCurrency: "USD" },
  ]);

  // ── 15. Social Connections ────────────────────────────────────────────────
  console.log("  → social_connections");
  await db.insert(schema.socialConnections).values([
    { requesterId: yoni.id, receiverId: dan.id, status: "accepted", dnaCompatibility: 78, sharedInterests: ["street-food", "photography", "nightlife"] },
    { requesterId: yoni.id, receiverId: maya.id, status: "accepted", dnaCompatibility: 62, sharedInterests: ["culture", "local-food"] },
    { requesterId: maya.id, receiverId: noa.id, status: "pending", dnaCompatibility: 45, sharedInterests: ["beaches", "photography"] },
    { requesterId: avi.id, receiverId: yoni.id, status: "accepted", dnaCompatibility: 55, sharedInterests: ["luxury", "fine-dining"] },
  ]);

  // ── 16. Social Messages ───────────────────────────────────────────────────
  console.log("  → social_messages");
  await db.insert(schema.socialMessages).values([
    { senderId: yoni.id, receiverId: dan.id, content: "Hey! Are you going to Barcelona? I heard it's amazing in April 🔥", isRead: true },
    { senderId: dan.id, receiverId: yoni.id, content: "Yes! Flying out on the 20th. The Sagrada Família tickets are already booked. You should come!", isRead: true },
    { senderId: yoni.id, receiverId: dan.id, content: "Might join for the weekend. What hotel are you at?", isRead: false },
    { senderId: maya.id, receiverId: yoni.id, content: "Any tips for Paris in June? First time!", isRead: true },
    { senderId: yoni.id, receiverId: maya.id, content: "Avoid Eiffel Tower on weekends — go on a Tuesday morning. And eat at Septime for dinner, book 3 weeks ahead.", isRead: true },
  ]);

  // ── 17. Properties (Real Estate) ──────────────────────────────────────────
  console.log("  → properties");
  await db.insert(schema.properties).values([
    {
      title: "Luxury 2BR Apartment — Downtown Dubai", type: "apartment", location: "Downtown Dubai, UAE",
      price: 2800000, currency: "AED", pricePerSqm: 28000, size: 100, bedrooms: 2, bathrooms: 2,
      floor: 35, totalFloors: 50, yearBuilt: 2023, developer: "Emaar Properties",
      amenities: ["Pool", "Gym", "Concierge", "Parking", "Balcony with Burj Khalifa view"],
      roi: 6.8, rentalYield: 7.2, occupancyRate: 94, monthlyRent: 16000,
      imageUrls: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"],
      description: "Stunning 2-bedroom apartment with direct Burj Khalifa views. Ready to move in. Ideal for investment or end-use.",
      isOffPlan: false, completionDate: null, paymentPlan: null, handoverDate: null,
      status: "available",
    },
    {
      title: "Off-Plan Villa — Palm Jumeirah", type: "villa", location: "Palm Jumeirah, Dubai, UAE",
      price: 18500000, currency: "AED", pricePerSqm: 35000, size: 528, bedrooms: 5, bathrooms: 6,
      floor: 1, totalFloors: 3, yearBuilt: 2026, developer: "Nakheel",
      amenities: ["Private pool", "Beach access", "Smart home", "5-car garage", "Staff quarters"],
      roi: 5.5, rentalYield: 5.8, occupancyRate: 88, monthlyRent: 85000,
      imageUrls: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"],
      description: "Exclusive off-plan villa on the iconic Palm Jumeirah. 60/40 payment plan. Handover Q4 2026.",
      isOffPlan: true, completionDate: new Date("2026-12-01"), paymentPlan: "60/40", handoverDate: new Date("2026-12-01"),
      status: "available",
    },
    {
      title: "Studio — Business Bay", type: "studio", location: "Business Bay, Dubai, UAE",
      price: 850000, currency: "AED", pricePerSqm: 21000, size: 40, bedrooms: 0, bathrooms: 1,
      floor: 18, totalFloors: 40, yearBuilt: 2022, developer: "DAMAC",
      amenities: ["Pool", "Gym", "Metro access", "Co-working space"],
      roi: 8.2, rentalYield: 8.5, occupancyRate: 97, monthlyRent: 6000,
      imageUrls: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
      description: "High-yield studio in the heart of Business Bay. Perfect for short-term rental investment.",
      isOffPlan: false, completionDate: null, paymentPlan: null, handoverDate: null,
      status: "available",
    },
    {
      title: "Penthouse — Abu Dhabi Corniche", type: "penthouse", location: "Corniche, Abu Dhabi, UAE",
      price: 12000000, currency: "AED", pricePerSqm: 40000, size: 300, bedrooms: 4, bathrooms: 5,
      floor: 42, totalFloors: 42, yearBuilt: 2021, developer: "Aldar Properties",
      amenities: ["360° views", "Private terrace", "Butler service", "Private elevator", "Wine cellar"],
      roi: 4.8, rentalYield: 5.2, occupancyRate: 85, monthlyRent: 52000,
      imageUrls: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
      description: "Ultra-luxury penthouse with panoramic Arabian Gulf views. One of a kind.",
      isOffPlan: false, completionDate: null, paymentPlan: null, handoverDate: null,
      status: "available",
    },
  ]);

  // ── 18. RE Contacts ───────────────────────────────────────────────────────
  console.log("  → re_contacts");
  await db.insert(schema.reContacts).values([
    { name: "David Katz", type: "agent", company: "Better Homes Dubai", phone: "+971-50-123-4567", email: "david@betterhomes.ae", specialization: ["Downtown Dubai", "Palm Jumeirah", "Business Bay"], languages: ["Hebrew", "English", "Arabic"], rating: 4.9, reviewCount: 127, yearsExperience: 12, avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg", bio: "Top-ranked Israeli agent in Dubai. Helped 200+ Israeli investors find their dream property." },
    { name: "Sarah Al-Rashid", type: "lawyer", company: "Al-Rashid Legal Group", phone: "+971-4-567-8901", email: "sarah@alrashidlegal.ae", specialization: ["Property law", "Foreign investment", "Off-plan contracts"], languages: ["English", "Arabic"], rating: 4.8, reviewCount: 89, yearsExperience: 15, avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg", bio: "Expert in UAE property law for foreign investors. Free initial consultation for TRAVI users." },
    { name: "Mohammed Al-Maktoum", type: "developer", company: "Emaar Properties", phone: "+971-4-888-8888", email: "invest@emaar.ae", specialization: ["Downtown Dubai", "Dubai Creek Harbour", "Arabian Ranches"], languages: ["English", "Arabic"], rating: 4.7, reviewCount: 340, yearsExperience: 20, avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg", bio: "Emaar's dedicated investment advisor for international buyers." },
    { name: "Yael Friedman", type: "consultant", company: "Israel-UAE Investment Bridge", phone: "+972-52-987-6543", email: "yael@iuib.com", specialization: ["Israeli investor guide", "Tax optimization", "Portfolio strategy"], languages: ["Hebrew", "English"], rating: 5.0, reviewCount: 45, yearsExperience: 8, avatarUrl: "https://randomuser.me/api/portraits/women/55.jpg", bio: "Specialized in helping Israeli families build UAE property portfolios. Based in Tel Aviv and Dubai." },
  ]);

  // ── 19. Enterprise Metrics ────────────────────────────────────────────────
  console.log("  → enterprise_metrics");
  const months = ["2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03"];
  const mrrValues = [18400, 24200, 31800, 38500, 45200, 52800];
  const userCounts = [820, 1240, 1890, 2650, 3420, 4180];
  for (let i = 0; i < months.length; i++) {
    await db.insert(schema.enterpriseMetrics).values({
      period: months[i], periodType: "monthly",
      mrr: mrrValues[i], arr: mrrValues[i] * 12,
      activeUsers: userCounts[i], newUsers: i === 0 ? 820 : userCounts[i] - userCounts[i - 1],
      churnRate: 2.8 - i * 0.2, cac: 42 - i * 2, clv: 380 + i * 15,
      totalBookings: 120 + i * 85, totalRevenue: mrrValues[i] * 1.4,
      commissionsPaid: mrrValues[i] * 0.35, netRevenue: mrrValues[i] * 1.05,
      conversionRate: 3.2 + i * 0.3, avgOrderValue: 2800 + i * 120,
    });
  }

  // ── 20. Prospects (CRM) ───────────────────────────────────────────────────
  console.log("  → prospects");
  await db.insert(schema.prospects).values([
    { companyName: "El Al Airlines", contactName: "Oren Shapira", contactEmail: "oren.shapira@elal.co.il", contactPhone: "+972-3-971-6111", status: "proposal", dealValue: 480000, currency: "USD", notes: "Partnership for exclusive cashback on El Al flights. Meeting scheduled for April 15.", industry: "Aviation", source: "outbound", assignedTo: yoni.id },
    { companyName: "Fattal Hotels Group", contactName: "Michal Fattal", contactEmail: "michal@fattal.co.il", contactPhone: "+972-3-542-5000", status: "negotiation", dealValue: 320000, currency: "USD", notes: "Chain of 50+ hotels in Israel and Europe. Wants to offer TRAVI cashback to guests.", industry: "Hospitality", source: "inbound", assignedTo: yoni.id },
    { companyName: "Isracard", contactName: "Tamar Levy", contactEmail: "tamar.levy@isracard.co.il", contactPhone: "+972-3-636-3636", status: "qualified", dealValue: 1200000, currency: "USD", notes: "Credit card partnership — TRAVI points on every purchase. Huge opportunity.", industry: "Financial Services", source: "referral", assignedTo: yoni.id },
    { companyName: "Booking.com", contactName: "Ariel Cohen", contactEmail: "ariel.cohen@booking.com", contactPhone: "+31-20-712-5000", status: "lead", dealValue: 2500000, currency: "USD", notes: "Initial conversation about white-label DNA-based hotel recommendations.", industry: "Travel Tech", source: "conference", assignedTo: yoni.id },
    { companyName: "Mobileye", contactName: "Shai Agassi", contactEmail: "shai@mobileye.com", contactPhone: "+972-2-541-7100", status: "closed_won", dealValue: 150000, currency: "USD", notes: "Corporate travel management for 3,000 employees. Signed Q1 2026.", industry: "Technology", source: "outbound", assignedTo: yoni.id },
  ]);

  console.log("\n✅ Seed complete! All 22 tables populated.");
  await pool.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
