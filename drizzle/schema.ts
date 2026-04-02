import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Traveler DNA Profile ─────────────────────────────────────────────────────
export const travelerProfiles = pgTable("traveler_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().unique(),
  // 8-dimension DNA scores (0-100 each)
  explorerScore: integer("explorerScore").default(0).notNull(),
  relaxerScore: integer("relaxerScore").default(0).notNull(),
  adventurerScore: integer("adventurerScore").default(0).notNull(),
  culturalistScore: integer("culturalistScore").default(0).notNull(),
  foodieScore: integer("foodieScore").default(0).notNull(),
  photographerScore: integer("photographerScore").default(0).notNull(),
  historianScore: integer("historianScore").default(0).notNull(),
  naturalistScore: integer("naturalistScore").default(0).notNull(),
  // XP gamification
  xp: integer("xp").default(0).notNull(),
  points: integer("points").default(0).notNull(),
  // Quiz state
  quizCompleted: integer("quizCompleted").default(0).notNull(),
  swipeCompleted: integer("swipeCompleted").default(0).notNull(),
  // Travel preferences (JSON blob)
  preferences: text("preferences"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type TravelerProfile = typeof travelerProfiles.$inferSelect;
export type InsertTravelerProfile = typeof travelerProfiles.$inferInsert;

// ─── Trips ────────────────────────────────────────────────────────────────────
export const tripStatusEnum = pgEnum("trip_status", ["planning", "booked", "active", "completed"]);

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  destination: varchar("destination", { length: 128 }).notNull(),
  country: varchar("country", { length: 64 }),
  startDate: varchar("startDate", { length: 16 }),
  endDate: varchar("endDate", { length: 16 }),
  status: tripStatusEnum("status").default("planning").notNull(),
  budget: integer("budget").default(0),
  currency: varchar("currency", { length: 8 }).default("USD"),
  itinerary: text("itinerary"),   // JSON array of day plans
  companions: text("companions"), // JSON array of companion user IDs/names
  expenses: text("expenses"),     // JSON array of { id, label, amount, paidBy, split }
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Trip = typeof trips.$inferSelect;
export type InsertTrip = typeof trips.$inferInsert;

// ─── Price Alerts ─────────────────────────────────────────────────────────────
export const alertTypeEnum = pgEnum("alert_type", ["flight", "hotel", "package"]);

export const priceAlerts = pgTable("price_alerts", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  destination: varchar("destination", { length: 128 }).notNull(),
  targetPrice: integer("targetPrice").notNull(), // in cents
  currentPrice: integer("currentPrice").default(0),
  type: alertTypeEnum("type").default("flight").notNull(),
  active: integer("active").default(1).notNull(), // 0 = inactive, 1 = active
  lastChecked: timestamp("lastChecked").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PriceAlert = typeof priceAlerts.$inferSelect;
export type InsertPriceAlert = typeof priceAlerts.$inferInsert;

// ─── Push Tokens ──────────────────────────────────────────────────────────────
export const platformEnum = pgEnum("platform", ["ios", "android", "web"]);

export const pushTokens = pgTable("push_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  token: varchar("token", { length: 256 }).notNull().unique(),
  platform: platformEnum("platform").default("ios").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type PushToken = typeof pushTokens.$inferSelect;
export type InsertPushToken = typeof pushTokens.$inferInsert;

// ─── Wallet Transactions ──────────────────────────────────────────────────────
export const walletTxTypeEnum = pgEnum("wallet_tx_type", ["credit", "debit", "refund", "commission"]);

export const walletTransactions = pgTable("wallet_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  amount: integer("amount").notNull(), // in cents
  currency: varchar("currency", { length: 8 }).default("USD").notNull(),
  type: walletTxTypeEnum("type").notNull(),
  description: text("description"),
  tripId: integer("tripId"),
  referenceId: varchar("referenceId", { length: 128 }), // booking ref, etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type WalletTransaction = typeof walletTransactions.$inferSelect;
export type InsertWalletTransaction = typeof walletTransactions.$inferInsert;

// ─── Itinerary Items ──────────────────────────────────────────────────────────
export const itineraryItemTypeEnum = pgEnum("itinerary_item_type", [
  "flight", "hotel", "activity", "restaurant", "transport", "note"
]);

export const itineraryItems = pgTable("itinerary_items", {
  id: serial("id").primaryKey(),
  tripId: integer("tripId").notNull(),
  userId: integer("userId").notNull(),
  type: itineraryItemTypeEnum("type").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 256 }),
  date: varchar("date", { length: 16 }),
  startTime: varchar("startTime", { length: 8 }),
  endTime: varchar("endTime", { length: 8 }),
  cost: integer("cost").default(0), // in cents
  currency: varchar("currency", { length: 8 }).default("USD"),
  bookingRef: varchar("bookingRef", { length: 128 }),
  confirmed: boolean("confirmed").default(false).notNull(),
  metadata: text("metadata"), // JSON blob for extra data
  sortOrder: integer("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type ItineraryItem = typeof itineraryItems.$inferSelect;
export type InsertItineraryItem = typeof itineraryItems.$inferInsert;

// ─── DNA Sessions ─────────────────────────────────────────────────────────────
export const dnaSessionTypeEnum = pgEnum("dna_session_type", ["quick_quiz", "quick_swipe", "first_class"]);

export const dnaSessions = pgTable("dna_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  type: dnaSessionTypeEnum("type").notNull(),
  completed: boolean("completed").default(false).notNull(),
  scores: text("scores"), // JSON: { explorer, relaxer, adventurer, ... }
  rawAnswers: text("rawAnswers"), // JSON array of answers
  xpEarned: integer("xpEarned").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type DnaSession = typeof dnaSessions.$inferSelect;
export type InsertDnaSession = typeof dnaSessions.$inferInsert;

// ─── Quick DNA Results ────────────────────────────────────────────────────────
export const quickDnaResults = pgTable("quick_dna_results", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().unique(),
  sessionId: integer("sessionId"),
  // Swipe counts per category
  adventureCount: integer("adventureCount").default(0).notNull(),
  cultureCount: integer("cultureCount").default(0).notNull(),
  foodCount: integer("foodCount").default(0).notNull(),
  natureCount: integer("natureCount").default(0).notNull(),
  luxuryCount: integer("luxuryCount").default(0).notNull(),
  urbanCount: integer("urbanCount").default(0).notNull(),
  beachCount: integer("beachCount").default(0).notNull(),
  nightlifeCount: integer("nightlifeCount").default(0).notNull(),
  wellnessCount: integer("wellnessCount").default(0).notNull(),
  historyCount: integer("historyCount").default(0).notNull(),
  familyCount: integer("familyCount").default(0).notNull(),
  // Computed dimension scores
  explorerScore: integer("explorerScore").default(0).notNull(),
  relaxerScore: integer("relaxerScore").default(0).notNull(),
  adventurerScore: integer("adventurerScore").default(0).notNull(),
  culturalistScore: integer("culturalistScore").default(0).notNull(),
  foodieScore: integer("foodieScore").default(0).notNull(),
  photographerScore: integer("photographerScore").default(0).notNull(),
  historianScore: integer("historianScore").default(0).notNull(),
  naturalistScore: integer("naturalistScore").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type QuickDnaResult = typeof quickDnaResults.$inferSelect;
export type InsertQuickDnaResult = typeof quickDnaResults.$inferInsert;

// ─── First Class DNA Results ──────────────────────────────────────────────────
export const firstClassDnaResults = pgTable("first_class_dna_results", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().unique(),
  sessionId: integer("sessionId"),
  // 9 module scores (0-100 each)
  identityScore: integer("identityScore").default(0).notNull(),
  crisisScore: integer("crisisScore").default(0).notNull(),
  moneyScore: integer("moneyScore").default(0).notNull(),
  visualScore: integer("visualScore").default(0).notNull(),
  brandScore: integer("brandScore").default(0).notNull(),
  socialScore: integer("socialScore").default(0).notNull(),
  sensoryScore: integer("sensoryScore").default(0).notNull(),
  futureScore: integer("futureScore").default(0).notNull(),
  aiChallengeScore: integer("aiChallengeScore").default(0).notNull(),
  // Overall profile
  travelPersonality: varchar("travelPersonality", { length: 64 }),
  aiInsights: text("aiInsights"), // AI-generated personality summary
  completedModules: text("completedModules"), // JSON array of completed module IDs
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type FirstClassDnaResult = typeof firstClassDnaResults.$inferSelect;
export type InsertFirstClassDnaResult = typeof firstClassDnaResults.$inferInsert;

// ─── Learning Events ──────────────────────────────────────────────────────────
export const learningEventTypeEnum = pgEnum("learning_event_type", [
  "search", "view_destination", "book", "review", "share", "wishlist"
]);

export const learningEvents = pgTable("learning_events", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  type: learningEventTypeEnum("type").notNull(),
  entityType: varchar("entityType", { length: 64 }), // "destination", "hotel", "flight"
  entityId: varchar("entityId", { length: 128 }),
  metadata: text("metadata"), // JSON blob
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type LearningEvent = typeof learningEvents.$inferSelect;
export type InsertLearningEvent = typeof learningEvents.$inferInsert;

// ─── User Preferences ─────────────────────────────────────────────────────────
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().unique(),
  language: varchar("language", { length: 8 }).default("en").notNull(),
  currency: varchar("currency", { length: 8 }).default("USD").notNull(),
  distanceUnit: varchar("distanceUnit", { length: 4 }).default("km").notNull(),
  temperatureUnit: varchar("temperatureUnit", { length: 4 }).default("C").notNull(),
  notificationsEnabled: boolean("notificationsEnabled").default(true).notNull(),
  marketingEmails: boolean("marketingEmails").default(false).notNull(),
  darkMode: boolean("darkMode").default(false).notNull(),
  biometricAuth: boolean("biometricAuth").default(false).notNull(),
  twoFactorAuth: boolean("twoFactorAuth").default(false).notNull(),
  dataSharing: boolean("dataSharing").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;

// ─── Trip Reflections ─────────────────────────────────────────────────────────
export const tripReflections = pgTable("trip_reflections", {
  id: serial("id").primaryKey(),
  tripId: integer("tripId").notNull(),
  userId: integer("userId").notNull(),
  overallRating: integer("overallRating"), // 1-5
  highlights: text("highlights"), // JSON array of strings
  lowlights: text("lowlights"),   // JSON array of strings
  wouldReturn: boolean("wouldReturn"),
  recommendTo: text("recommendTo"), // JSON array of traveler types
  photos: text("photos"),          // JSON array of photo URLs
  notes: text("notes"),
  xpEarned: integer("xpEarned").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type TripReflection = typeof tripReflections.$inferSelect;
export type InsertTripReflection = typeof tripReflections.$inferInsert;

// ─── Conversations (AI Chat) ───────────────────────────────────────────────────
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 256 }),
  context: text("context"), // JSON: trip context, destination, etc.
  archived: boolean("archived").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

// ─── Messages ─────────────────────────────────────────────────────────────────
export const messageRoleEnum = pgEnum("message_role", ["user", "assistant", "system"]);

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversationId").notNull(),
  userId: integer("userId").notNull(),
  role: messageRoleEnum("role").notNull(),
  content: text("content").notNull(),
  metadata: text("metadata"), // JSON: suggestions, actions, etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

// ─── Support Tickets ──────────────────────────────────────────────────────────
export const ticketStatusEnum = pgEnum("ticket_status", ["open", "in_progress", "resolved", "closed"]);
export const ticketCategoryEnum = pgEnum("ticket_category", [
  "booking", "payment", "account", "technical", "feedback", "other"
]);

export const supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  category: ticketCategoryEnum("category").default("other").notNull(),
  subject: varchar("subject", { length: 256 }).notNull(),
  description: text("description").notNull(),
  status: ticketStatusEnum("status").default("open").notNull(),
  priority: integer("priority").default(1).notNull(), // 1=low, 2=medium, 3=high
  tripId: integer("tripId"),
  attachments: text("attachments"), // JSON array of URLs
  resolvedAt: timestamp("resolvedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

// ─── Referrals ────────────────────────────────────────────────────────────────
export const referralStatusEnum = pgEnum("referral_status", ["pending", "completed", "expired"]);

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrerId").notNull(),
  refereeId: integer("refereeId"),
  referralCode: varchar("referralCode", { length: 16 }).notNull().unique(),
  status: referralStatusEnum("status").default("pending").notNull(),
  pointsEarned: integer("pointsEarned").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;
