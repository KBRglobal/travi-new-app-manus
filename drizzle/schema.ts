import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Traveler DNA Profile ─────────────────────────────────────────────────────
export const travelerProfiles = mysqlTable("traveler_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  // 8-dimension DNA scores (0-100 each)
  explorerScore: int("explorerScore").default(0).notNull(),
  relaxerScore: int("relaxerScore").default(0).notNull(),
  adventurerScore: int("adventurerScore").default(0).notNull(),
  culturalistScore: int("culturalistScore").default(0).notNull(),
  foodieScore: int("foodieScore").default(0).notNull(),
  photographerScore: int("photographerScore").default(0).notNull(),
  historianScore: int("historianScore").default(0).notNull(),
  naturalistScore: int("naturalistScore").default(0).notNull(),
  // XP gamification
  xp: int("xp").default(0).notNull(),
  points: int("points").default(0).notNull(),
  // Quiz state (0 = false, 1 = true)
  quizCompleted: int("quizCompleted").default(0).notNull(),
  swipeCompleted: int("swipeCompleted").default(0).notNull(),
  // Travel preferences (JSON blob)
  preferences: text("preferences"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type TravelerProfile = typeof travelerProfiles.$inferSelect;
export type InsertTravelerProfile = typeof travelerProfiles.$inferInsert;

// ─── Trips ────────────────────────────────────────────────────────────────────
export const trips = mysqlTable("trips", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  destination: varchar("destination", { length: 128 }).notNull(),
  country: varchar("country", { length: 64 }),
  startDate: varchar("startDate", { length: 16 }),
  endDate: varchar("endDate", { length: 16 }),
  status: mysqlEnum("status", ["planning", "booked", "active", "completed"]).default("planning").notNull(),
  budget: int("budget").default(0),
  currency: varchar("currency", { length: 8 }).default("USD"),
  itinerary: text("itinerary"),   // JSON array of day plans
  companions: text("companions"), // JSON array of companion user IDs/names
  expenses: text("expenses"),     // JSON array of { id, label, amount, paidBy, split }
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Trip = typeof trips.$inferSelect;
export type InsertTrip = typeof trips.$inferInsert;

// ─── Price Alerts ─────────────────────────────────────────────────────────────
export const priceAlerts = mysqlTable("price_alerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  destination: varchar("destination", { length: 128 }).notNull(),
  targetPrice: int("targetPrice").notNull(), // in cents
  currentPrice: int("currentPrice").default(0),
  type: mysqlEnum("type", ["flight", "hotel", "package"]).default("flight").notNull(),
  active: int("active").default(1).notNull(), // 0 = inactive, 1 = active
  lastChecked: timestamp("lastChecked").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PriceAlert = typeof priceAlerts.$inferSelect;
export type InsertPriceAlert = typeof priceAlerts.$inferInsert;

// ─── Push Tokens ──────────────────────────────────────────────────────────────
export const pushTokens = mysqlTable("push_tokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  token: varchar("token", { length: 256 }).notNull().unique(),
  platform: mysqlEnum("platform", ["ios", "android", "web"]).default("ios").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type PushToken = typeof pushTokens.$inferSelect;
export type InsertPushToken = typeof pushTokens.$inferInsert;
