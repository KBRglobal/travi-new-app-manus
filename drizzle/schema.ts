import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

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
