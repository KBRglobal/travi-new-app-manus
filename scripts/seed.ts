/**
 * TRAVI Database Seed Script
 * Populates all 23 tables with realistic demo data.
 * Run: npx tsx scripts/seed.ts
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../drizzle/schema";

const connStr = process.env.RAILWAY_DATABASE_URL ?? process.env.DATABASE_URL;
if (!connStr) throw new Error("No DATABASE_URL or RAILWAY_DATABASE_URL set");

const pool = new Pool({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
const db = drizzle(pool, { schema });

async function seed() {
  console.log("🌱 Seeding TRAVI database...");

  // ── 1. Users ─────────────────────────────────────────────────────────────
  console.log("  → users");
  const userRows = await db.insert(schema.users).values([
    { openId: "seed-001", email: "yoni@travi.app", name: "Yoni Cohen", loginMethod: "google", role: "admin" },
    { openId: "seed-002", email: "maya@travi.app", name: "Maya Levi", loginMethod: "google", role: "user" },
    { openId: "seed-003", email: "avi@travi.app", name: "Avi Shapiro", loginMethod: "apple", role: "user" },
    { openId: "seed-004", email: "noa@travi.app", name: "Noa Ben-David", loginMethod: "google", role: "user" },
    { openId: "seed-005", email: "dan@travi.app", name: "Dan Mizrahi", loginMethod: "apple", role: "user" },
  ]).returning();
  const [yoni, maya, avi, noa, dan] = userRows;

  // ── 2. Traveler Profiles ──────────────────────────────────────────────────
  console.log("  → traveler_profiles");
  await db.insert(schema.travelerProfiles).values([
    {
      userId: yoni.id,
      explorerScore: 88, relaxerScore: 35, adventurerScore: 92, culturalistScore: 70,
      foodieScore: 85, photographerScore: 60, historianScore: 55, naturalistScore: 78,
      xp: 4820, points: 4820, quizCompleted: 1, swipeCompleted: 1,
      preferences: JSON.stringify({ pace: "fast", budget: "mid", interests: ["hiking", "street-food", "photography"] }),
    },
    {
      userId: maya.id,
      explorerScore: 60, relaxerScore: 55, adventurerScore: 45, culturalistScore: 95,
      foodieScore: 80, photographerScore: 75, historianScore: 90, naturalistScore: 40,
      xp: 2150, points: 2150, quizCompleted: 1, swipeCompleted: 1,
      preferences: JSON.stringify({ pace: "balanced", budget: "mid", interests: ["museums", "art", "local-food"] }),
    },
    {
      userId: avi.id,
      explorerScore: 50, relaxerScore: 85, adventurerScore: 30, culturalistScore: 65,
      foodieScore: 90, photographerScore: 55, historianScore: 40, naturalistScore: 35,
      xp: 9600, points: 9600, quizCompleted: 1, swipeCompleted: 1,
      preferences: JSON.stringify({ pace: "slow", budget: "luxury", interests: ["fine-dining", "spa", "golf"] }),
    },
    {
      userId: noa.id,
      explorerScore: 55, relaxerScore: 90, adventurerScore: 40, culturalistScore: 30,
      foodieScore: 65, photographerScore: 80, historianScore: 20, naturalistScore: 70,
      xp: 1200, points: 1200, quizCompleted: 1, swipeCompleted: 0,
      preferences: JSON.stringify({ pace: "slow", budget: "budget", interests: ["beaches", "snorkeling", "sunsets"] }),
    },
    {
      userId: dan.id,
      explorerScore: 82, relaxerScore: 40, adventurerScore: 75, culturalistScore: 80,
      foodieScore: 88, photographerScore: 70, historianScore: 65, naturalistScore: 30,
      xp: 3400, points: 3400, quizCompleted: 1, swipeCompleted: 1,
      preferences: JSON.stringify({ pace: "fast", budget: "mid", interests: ["street-art", "rooftop-bars", "local-food"] }),
    },
  ]);

  // ── 3. Trips ──────────────────────────────────────────────────────────────
  console.log("  → trips");
  const tripRows = await db.insert(schema.trips).values([
    { userId: yoni.id, destination: "Tokyo", country: "Japan", startDate: "2026-05-10", endDate: "2026-05-20", status: "booked", budget: 800000, currency: "USD", itinerary: JSON.stringify([]), companions: JSON.stringify([]) },
    { userId: yoni.id, destination: "Bali", country: "Indonesia", startDate: "2026-08-01", endDate: "2026-08-14", status: "planning", budget: 450000, currency: "USD", itinerary: JSON.stringify([]), companions: JSON.stringify([]) },
    { userId: maya.id, destination: "Paris", country: "France", startDate: "2026-04-15", endDate: "2026-04-22", status: "completed", budget: 500000, currency: "EUR", itinerary: JSON.stringify([]), companions: JSON.stringify([]) },
    { userId: avi.id, destination: "Maldives", country: "Maldives", startDate: "2026-06-01", endDate: "2026-06-10", status: "booked", budget: 1500000, currency: "USD", itinerary: JSON.stringify([]), companions: JSON.stringify([]) },
    { userId: noa.id, destination: "Santorini", country: "Greece", startDate: "2026-07-20", endDate: "2026-07-30", status: "planning", budget: 350000, currency: "EUR", itinerary: JSON.stringify([]), companions: JSON.stringify([]) },
    { userId: dan.id, destination: "New York", country: "USA", startDate: "2026-09-05", endDate: "2026-09-12", status: "planning", budget: 600000, currency: "USD", itinerary: JSON.stringify([]), companions: JSON.stringify([]) },
  ]).returning();
  const [tokyoTrip, baliTrip, parisTrip, maldivesTrip] = tripRows;

  // ── 4. Wallet Transactions ────────────────────────────────────────────────
  console.log("  → wallet_transactions");
  await db.insert(schema.walletTransactions).values([
    { userId: yoni.id, type: "credit", amount: 24000, currency: "USD", description: "Hotel commission cashback — Tokyo Hilton", tripId: tokyoTrip.id },
    { userId: yoni.id, type: "credit", amount: 8500, currency: "USD", description: "Flight commission cashback — TLV→NRT", tripId: tokyoTrip.id },
    { userId: yoni.id, type: "debit", amount: 15000, currency: "USD", description: "Points redeemed — Bali resort upgrade", tripId: baliTrip.id },
    { userId: yoni.id, type: "credit", amount: 32000, currency: "USD", description: "Hotel commission cashback — Bali Alaya", tripId: baliTrip.id },
    { userId: maya.id, type: "credit", amount: 18000, currency: "EUR", description: "Hotel commission cashback — Paris Marriott", tripId: parisTrip.id },
    { userId: maya.id, type: "credit", amount: 6500, currency: "EUR", description: "Tour package cashback — Louvre + Versailles", tripId: parisTrip.id },
    { userId: avi.id, type: "credit", amount: 120000, currency: "USD", description: "Hotel commission cashback — Maldives Conrad", tripId: maldivesTrip.id },
    { userId: avi.id, type: "credit", amount: 45000, currency: "USD", description: "Flight commission cashback — First Class TLV→MLE", tripId: maldivesTrip.id },
    { userId: noa.id, type: "credit", amount: 9500, currency: "USD", description: "Referral bonus — Maya joined TRAVI" },
    { userId: dan.id, type: "credit", amount: 12000, currency: "USD", description: "Hotel commission cashback — NYC Marriott" },
  ]);

  // ── 5. DNA Sessions ───────────────────────────────────────────────────────
  console.log("  → dna_sessions");
  await db.insert(schema.dnaSessions).values([
    { userId: yoni.id, type: "quick_swipe", completed: true, scores: JSON.stringify({ explorer: 88, adventurer: 92, foodie: 85 }), xpEarned: 100 },
    { userId: maya.id, type: "quick_swipe", completed: true, scores: JSON.stringify({ culturalist: 95, historian: 90, foodie: 80 }), xpEarned: 100 },
    { userId: avi.id, type: "first_class", completed: true, scores: JSON.stringify({ relaxer: 85, foodie: 90 }), xpEarned: 300 },
    { userId: noa.id, type: "quick_swipe", completed: false, scores: null, xpEarned: 0 },
    { userId: dan.id, type: "quick_swipe", completed: true, scores: JSON.stringify({ explorer: 82, culturalist: 80, foodie: 88 }), xpEarned: 100 },
  ]);

  // ── 6. Quick DNA Results ──────────────────────────────────────────────────
  console.log("  → quick_dna_results");
  await db.insert(schema.quickDnaResults).values([
    {
      userId: yoni.id,
      adventureCount: 18, cultureCount: 12, foodCount: 16, natureCount: 14,
      luxuryCount: 8, urbanCount: 15, beachCount: 10, nightlifeCount: 12,
      wellnessCount: 6, historyCount: 9, familyCount: 4,
      explorerScore: 88, relaxerScore: 35, adventurerScore: 92, culturalistScore: 70,
      foodieScore: 85, photographerScore: 60, historianScore: 55, naturalistScore: 78,
    },
    {
      userId: maya.id,
      adventureCount: 8, cultureCount: 19, foodCount: 14, natureCount: 7,
      luxuryCount: 10, urbanCount: 12, beachCount: 5, nightlifeCount: 6,
      wellnessCount: 9, historyCount: 18, familyCount: 7,
      explorerScore: 60, relaxerScore: 55, adventurerScore: 45, culturalistScore: 95,
      foodieScore: 80, photographerScore: 75, historianScore: 90, naturalistScore: 40,
    },
  ]);

  // ── 7. Itinerary Items ────────────────────────────────────────────────────
  console.log("  → itinerary_items");
  await db.insert(schema.itineraryItems).values([
    { tripId: tokyoTrip.id, userId: yoni.id, type: "activity", title: "Tsukiji Outer Market", description: "Morning sushi breakfast at the famous fish market", startTime: "08:00", endTime: "10:00", location: "Tsukiji, Tokyo", cost: 3000, currency: "USD", date: "2026-05-10" },
    { tripId: tokyoTrip.id, userId: yoni.id, type: "activity", title: "Senso-ji Temple", description: "Iconic Buddhist temple in Asakusa", startTime: "11:00", endTime: "13:00", location: "Asakusa, Tokyo", cost: 0, currency: "USD", date: "2026-05-10" },
    { tripId: tokyoTrip.id, userId: yoni.id, type: "restaurant", title: "Ichiran Ramen", description: "Solo dining ramen experience", startTime: "13:30", endTime: "14:30", location: "Shibuya, Tokyo", cost: 1500, currency: "USD", date: "2026-05-10" },
    { tripId: parisTrip.id, userId: maya.id, type: "activity", title: "Louvre Museum", description: "World's largest art museum", startTime: "09:00", endTime: "13:00", location: "1st arrondissement, Paris", cost: 2200, currency: "EUR", date: "2026-04-15" },
    { tripId: parisTrip.id, userId: maya.id, type: "activity", title: "Palace of Versailles", description: "Royal château and gardens", startTime: "09:00", endTime: "17:00", location: "Versailles", cost: 2000, currency: "EUR", date: "2026-04-16" },
  ]);

  // ── 8. Support Tickets ────────────────────────────────────────────────────
  console.log("  → support_tickets");
  await db.insert(schema.supportTickets).values([
    { userId: maya.id, subject: "Cashback not received", description: "I booked a hotel 2 weeks ago and still haven't received my cashback.", status: "open", priority: 3, category: "payment" },
    { userId: noa.id, subject: "Can't complete DNA quiz", description: "The quiz keeps crashing on question 7.", status: "in_progress", priority: 2, category: "technical" },
    { userId: dan.id, subject: "How to redeem points?", description: "I have 3400 points but can't find where to redeem them.", status: "resolved", priority: 1, category: "other" },
  ]);

  // ── 9. Referrals ──────────────────────────────────────────────────────────
  console.log("  → referrals");
  await db.insert(schema.referrals).values([
    { referrerId: yoni.id, referralCode: "YONI2026A", status: "completed", pointsEarned: 500 },
    { referrerId: yoni.id, referralCode: "YONI2026B", status: "pending", pointsEarned: 0 },
    { referrerId: maya.id, referralCode: "MAYA2026A", status: "completed", pointsEarned: 500 },
    { referrerId: avi.id, referralCode: "AVI20261A", status: "pending", pointsEarned: 0 },
  ]);

  // ── 10. Learning Events ───────────────────────────────────────────────────
  console.log("  → learning_events");
  await db.insert(schema.learningEvents).values([
    { userId: yoni.id, type: "book", entityType: "hotel", entityId: "tokyo-hilton", metadata: JSON.stringify({ destination: "Tokyo", amount: 2400 }) },
    { userId: yoni.id, type: "view_destination", entityType: "destination", entityId: "bali", metadata: JSON.stringify({ views: 3 }) },
    { userId: maya.id, type: "book", entityType: "hotel", entityId: "paris-marriott", metadata: JSON.stringify({ destination: "Paris", amount: 1800 }) },
    { userId: avi.id, type: "book", entityType: "hotel", entityId: "maldives-conrad", metadata: JSON.stringify({ destination: "Maldives", amount: 12000 }) },
    { userId: noa.id, type: "search", entityType: "destination", entityId: "santorini", metadata: JSON.stringify({ query: "Santorini beach hotels" }) },
  ]);

  // ── 11. Conversations ─────────────────────────────────────────────────────
  console.log("  → conversations");
  const convRows = await db.insert(schema.conversations).values([
    { userId: yoni.id, title: "Tokyo Trip Planning", context: JSON.stringify({ destination: "Tokyo", days: 10 }) },
    { userId: maya.id, title: "Paris Itinerary Help", context: JSON.stringify({ destination: "Paris", days: 7 }) },
    { userId: avi.id, title: "Maldives Luxury Package", context: JSON.stringify({ destination: "Maldives", budget: 15000 }) },
  ]).returning();
  const [tokyoConv, parisConv] = convRows;

  // ── 12. Messages ──────────────────────────────────────────────────────────
  console.log("  → messages");
  await db.insert(schema.messages).values([
    { conversationId: tokyoConv.id, userId: yoni.id, role: "user", content: "I want to plan a 10-day trip to Tokyo. I love street food and photography." },
    { conversationId: tokyoConv.id, userId: yoni.id, role: "assistant", content: "Great choice! Based on your DNA profile (Adventurer + Foodie), I recommend starting with Tsukiji Market, then Shibuya crossing at night for photography. Want me to build a full itinerary?" },
    { conversationId: tokyoConv.id, userId: yoni.id, role: "user", content: "Yes please! And include some hidden gems." },
    { conversationId: parisConv.id, userId: maya.id, role: "user", content: "Help me plan Paris for 7 days. I'm a museum lover." },
    { conversationId: parisConv.id, userId: maya.id, role: "assistant", content: "Perfect! As a Culturalist, Paris is your dream destination. I suggest: Day 1 - Louvre, Day 2 - Musée d'Orsay, Day 3 - Versailles. Shall I add restaurant recommendations between museums?" },
  ]);

  // ── 13. Price Alerts ──────────────────────────────────────────────────────
  console.log("  → price_alerts");
  await db.insert(schema.priceAlerts).values([
    { userId: yoni.id, type: "flight", destination: "NRT", targetPrice: 80000, currentPrice: 105000, active: 1 },
    { userId: maya.id, type: "hotel", destination: "Rome", targetPrice: 15000, currentPrice: 22000, active: 1 },
    { userId: noa.id, type: "flight", destination: "ATH", targetPrice: 30000, currentPrice: 34000, active: 1 },
    { userId: dan.id, type: "flight", destination: "JFK", targetPrice: 70000, currentPrice: 85000, active: 0 },
  ]);

  // ── 14. Push Tokens ───────────────────────────────────────────────────────
  console.log("  → push_tokens");
  await db.insert(schema.pushTokens).values([
    { userId: yoni.id, token: "ExponentPushToken[seed-yoni-001]", platform: "ios" },
    { userId: maya.id, token: "ExponentPushToken[seed-maya-002]", platform: "android" },
    { userId: avi.id, token: "ExponentPushToken[seed-avi-003]", platform: "ios" },
  ]);

  // ── 15. User Preferences ─────────────────────────────────────────────────
  console.log("  → user_preferences");
  await db.insert(schema.userPreferences).values([
    { userId: yoni.id, currency: "USD", language: "en", notificationsEnabled: true, marketingEmails: true, darkMode: true },
    { userId: maya.id, currency: "EUR", language: "he", notificationsEnabled: true, marketingEmails: false, darkMode: false },
    { userId: avi.id, currency: "USD", language: "en", notificationsEnabled: false, marketingEmails: true, darkMode: true },
  ]);

  // ── 16. Trip Reflections ──────────────────────────────────────────────────
  console.log("  → trip_reflections");
  await db.insert(schema.tripReflections).values([
    {
      tripId: parisTrip.id, userId: maya.id, overallRating: 5,
      highlights: JSON.stringify(["Louvre at sunset", "Croissants at Café de Flore", "Seine river walk"]),
      lowlights: JSON.stringify(["Long queues at Eiffel Tower"]),
      wouldReturn: true, photos: JSON.stringify([]), xpEarned: 200,
    },
  ]);

  // ── 17. Properties ────────────────────────────────────────────────────────
  console.log("  → properties");
  await db.insert(schema.properties).values([
    { title: "Luxury Penthouse — Dubai Marina", type: "penthouse", city: "Dubai", country: "UAE", priceUsd: 2800000, bedrooms: 4, bathrooms: 4, sqm: 320, roiPercent: 8, rentalYieldPercent: 6, description: "Stunning penthouse with panoramic Marina views, private pool, and concierge service.", photos: JSON.stringify(["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"]), amenities: JSON.stringify(["Pool", "Gym", "Concierge", "Parking", "Smart Home"]), developer: "Emaar Properties", handoverDate: "2026-Q4", featured: true, active: true },
    { title: "Sea View Apartment — Tel Aviv", type: "apartment", city: "Tel Aviv", country: "Israel", priceUsd: 1200000, bedrooms: 3, bathrooms: 2, sqm: 140, roiPercent: 5, rentalYieldPercent: 4, description: "Modern apartment steps from the beach with Mediterranean views.", photos: JSON.stringify(["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"]), amenities: JSON.stringify(["Balcony", "Parking", "Storage"]), developer: "Azorim", handoverDate: "2025-Q2", featured: true, active: true },
    { title: "Beachfront Villa — Bali", type: "villa", city: "Seminyak", country: "Indonesia", priceUsd: 650000, bedrooms: 5, bathrooms: 5, sqm: 480, roiPercent: 12, rentalYieldPercent: 10, description: "Tropical villa with private beach access, infinity pool, and staff.", photos: JSON.stringify(["https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800"]), amenities: JSON.stringify(["Private Beach", "Infinity Pool", "Staff", "Garden"]), developer: "Bali Luxury Estates", handoverDate: "Ready", featured: false, active: true },
    { title: "Studio — Lisbon Historic Center", type: "studio", city: "Lisbon", country: "Portugal", priceUsd: 280000, bedrooms: 1, bathrooms: 1, sqm: 45, roiPercent: 7, rentalYieldPercent: 6, description: "Charming studio in Alfama with azulejo tiles and city views.", photos: JSON.stringify(["https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800"]), amenities: JSON.stringify(["Furnished", "AC", "City Views"]), developer: "Private", handoverDate: "Ready", featured: false, active: true },
  ]);

  // ── 18. RE Contacts ───────────────────────────────────────────────────────
  console.log("  → re_contacts");
  await db.insert(schema.reContacts).values([
    { name: "David Katz", type: "agent", company: "Emaar Realty", city: "Dubai", country: "UAE", phone: "+971-50-123-4567", email: "david@emaar-realty.ae", languages: JSON.stringify(["English", "Hebrew", "Arabic"]), specialties: JSON.stringify(["Luxury", "Off-plan", "Marina"]), rating: 49, reviewCount: 87, verified: true, bio: "15 years in Dubai luxury real estate. Specialist in Marina and Downtown properties." },
    { name: "Sarah Cohen", type: "agent", company: "Anglo-Saxon", city: "Tel Aviv", country: "Israel", phone: "+972-52-987-6543", email: "sarah@anglosaxon.co.il", languages: JSON.stringify(["Hebrew", "English"]), specialties: JSON.stringify(["Residential", "Sea View", "Renovations"]), rating: 47, reviewCount: 134, verified: true, bio: "Top-rated Tel Aviv agent specializing in sea-view properties and investment." },
    { name: "James Thornton", type: "lawyer", company: "Thornton & Associates", city: "Dubai", country: "UAE", phone: "+971-4-321-9876", email: "james@thornton-law.ae", languages: JSON.stringify(["English"]), specialties: JSON.stringify(["Property Law", "Foreign Investment", "DIFC"]), rating: 48, reviewCount: 52, verified: true, bio: "DIFC-registered lawyer specializing in UAE property transactions for foreign investors." },
  ]);

  // ── 19. Enterprise Metrics ────────────────────────────────────────────────
  console.log("  → enterprise_metrics");
  await db.insert(schema.enterpriseMetrics).values([
    { period: "2025-10", mrr: 142000, arr: 1704000, newUsers: 1240, activeUsers: 8400, churnRate: 3, cac: 45, clv: 1200, bookingsCount: 1820, bookingsRevenue: 142000 },
    { period: "2025-11", mrr: 168000, arr: 2016000, newUsers: 1580, activeUsers: 9800, churnRate: 2, cac: 42, clv: 1280, bookingsCount: 2140, bookingsRevenue: 168000 },
    { period: "2025-12", mrr: 221000, arr: 2652000, newUsers: 2100, activeUsers: 11200, churnRate: 2, cac: 38, clv: 1350, bookingsCount: 2890, bookingsRevenue: 221000 },
    { period: "2026-01", mrr: 195000, arr: 2340000, newUsers: 1420, activeUsers: 10800, churnRate: 4, cac: 44, clv: 1320, bookingsCount: 2480, bookingsRevenue: 195000 },
    { period: "2026-02", mrr: 248000, arr: 2976000, newUsers: 2340, activeUsers: 12600, churnRate: 2, cac: 36, clv: 1420, bookingsCount: 3180, bookingsRevenue: 248000 },
    { period: "2026-03", mrr: 312000, arr: 3744000, newUsers: 3100, activeUsers: 14832, churnRate: 1, cac: 32, clv: 1580, bookingsCount: 3847, bookingsRevenue: 312000 },
  ]);

  // ── 20. Prospects (CRM) ───────────────────────────────────────────────────
  console.log("  → prospects");
  await db.insert(schema.prospects).values([
    { companyName: "El Al Airlines", contactName: "Roni Shapira", email: "roni.shapira@elal.co.il", phone: "+972-3-971-6111", status: "negotiation", dealValue: 180000, industry: "Aviation", country: "Israel", notes: "Interested in white-label TRAVI platform for their loyalty program members.", assignedTo: yoni.id },
    { companyName: "Isrotel Hotels", contactName: "Michal Koren", email: "mkoren@isrotel.com", phone: "+972-8-638-6666", status: "proposal", dealValue: 120000, industry: "Hospitality", country: "Israel", notes: "Wants to integrate TRAVI cashback for all 30 properties.", assignedTo: yoni.id },
    { companyName: "Fattal Hotels", contactName: "Avi Fattal", email: "avi@fattal.co.il", phone: "+972-9-863-8888", status: "qualified", dealValue: 95000, industry: "Hospitality", country: "Israel", notes: "Initial meeting went well. Sending proposal next week.", assignedTo: yoni.id },
    { companyName: "Dubai Tourism Board", contactName: "Ahmed Al-Rashidi", email: "a.rashidi@dubaitourism.ae", phone: "+971-4-201-7000", status: "lead", dealValue: 250000, industry: "Tourism", country: "UAE", notes: "Reached out via LinkedIn. Interested in TRAVI DNA matching for Dubai destination marketing.", assignedTo: yoni.id },
    { companyName: "Arkia Airlines", contactName: "Dina Levi", email: "dlevi@arkia.com", phone: "+972-3-690-2222", status: "closed_won", dealValue: 75000, industry: "Aviation", country: "Israel", notes: "Contract signed. Integration starts Q2 2026.", assignedTo: yoni.id },
    { companyName: "Hertz Israel", contactName: "Yoav Ben-Ami", email: "yoav@hertz.co.il", phone: "+972-3-523-1234", status: "closed_lost", dealValue: 45000, industry: "Car Rental", country: "Israel", notes: "Went with competitor. Follow up in 6 months.", assignedTo: yoni.id },
  ]);

  // ── 21. Social Connections ────────────────────────────────────────────────
  console.log("  → social_connections");
  await db.insert(schema.socialConnections).values([
    { requesterId: yoni.id, receiverId: maya.id, status: "accepted", compatibilityScore: 82 },
    { requesterId: yoni.id, receiverId: avi.id, status: "accepted", compatibilityScore: 65 },
    { requesterId: maya.id, receiverId: dan.id, status: "accepted", compatibilityScore: 74 },
    { requesterId: dan.id, receiverId: yoni.id, status: "accepted", compatibilityScore: 78 },
    { requesterId: noa.id, receiverId: maya.id, status: "pending", compatibilityScore: 70 },
  ]);

  // ── 22. Social Messages ───────────────────────────────────────────────────
  console.log("  → social_messages");
  await db.insert(schema.socialMessages).values([
    { senderId: maya.id, receiverId: yoni.id, content: "Hey! How was Tokyo? Share your itinerary!", read: false },
    { senderId: yoni.id, receiverId: maya.id, content: "Amazing! The ramen scene is unreal. I'll share the full itinerary soon.", read: true },
    { senderId: dan.id, receiverId: yoni.id, content: "Bro, can you share your Tokyo hotel recommendations?", read: false },
  ]);

  // ── 23. First Class DNA Results ───────────────────────────────────────────
  console.log("  → first_class_dna_results");
  await db.insert(schema.firstClassDnaResults).values([
    {
      userId: avi.id,
      identityScore: 72, crisisScore: 45, moneyScore: 90, visualScore: 68,
      brandScore: 85, socialScore: 60, sensoryScore: 88, futureScore: 75, aiChallengeScore: 55,
      travelPersonality: "The Connoisseur",
      aiInsights: "You seek the finest experiences money can buy. Quality over quantity, always. Your sensory score suggests you are deeply affected by ambiance, scent, and texture — making spa and fine dining your ideal travel anchors.",
      completedModules: JSON.stringify(["identity", "money", "visual", "brand", "sensory"]),
    },
  ]);

  console.log("✅ Seed complete! All 23 tables populated.");
  await pool.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  if (err.cause) console.error("  Cause:", err.cause.message);
  process.exit(1);
});
