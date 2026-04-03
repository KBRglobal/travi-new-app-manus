import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../drizzle/schema";
import type {
  InsertUser,
  InsertTravelerProfile,
  InsertTrip,
  InsertPriceAlert,
  InsertPushToken,
} from "../drizzle/schema";
const { users, travelerProfiles, trips, priceAlerts, pushTokens } = schema;
import { ENV } from "./_core/env";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      _db = drizzle(pool, { schema });
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Traveler Profiles ────────────────────────────────────────────────────────
export async function getTravelerProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(travelerProfiles).where(eq(travelerProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function upsertTravelerProfile(data: InsertTravelerProfile) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert traveler profile: database not available"); return; }
  const updateSet: Partial<InsertTravelerProfile> = { ...data };
  delete (updateSet as Record<string, unknown>)["userId"];
  await db.insert(travelerProfiles).values(data).onConflictDoUpdate({
    target: travelerProfiles.userId,
    set: updateSet,
  });
}

// ─── Trips ────────────────────────────────────────────────────────────────────
export async function getUserTrips(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trips).where(eq(trips.userId, userId));
}

export async function getTripById(tripId: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(trips).where(and(eq(trips.id, tripId), eq(trips.userId, userId))).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createTrip(data: InsertTrip) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(trips).values(data).returning();
  return result[0];
}

export async function updateTrip(tripId: number, userId: number, data: Partial<InsertTrip>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(trips).set(data).where(and(eq(trips.id, tripId), eq(trips.userId, userId)));
}

export async function deleteTrip(tripId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(trips).where(and(eq(trips.id, tripId), eq(trips.userId, userId)));
}

// ─── Price Alerts ─────────────────────────────────────────────────────────────
export async function getUserPriceAlerts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(priceAlerts).where(and(eq(priceAlerts.userId, userId), eq(priceAlerts.active, 1)));
}

export async function createPriceAlert(data: InsertPriceAlert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(priceAlerts).values(data);
}

export async function deletePriceAlert(alertId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(priceAlerts).set({ active: 0 }).where(and(eq(priceAlerts.id, alertId), eq(priceAlerts.userId, userId)));
}

// ─── Push Tokens ──────────────────────────────────────────────────────────────
export async function upsertPushToken(data: InsertPushToken) {
  const db = await getDb();
  if (!db) return;
  await db.insert(pushTokens).values(data).onConflictDoUpdate({
    target: pushTokens.token,
    set: { userId: data.userId, platform: data.platform },
  });
}

export async function getUserPushTokens(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pushTokens).where(eq(pushTokens.userId, userId));
}

// ─── Wallet ───────────────────────────────────────────────────────────────────
import type {
  InsertWalletTransaction, InsertItineraryItem, InsertDnaSession,
  InsertQuickDnaResult, InsertTripReflection, InsertConversation,
  InsertMessage, InsertSupportTicket, InsertReferral,
  InsertSocialConnection, InsertSocialMessage,
  InsertProperty, InsertReContact, InsertEnterpriseMetric, InsertProspect,
  InsertUserPreferences,
} from "../drizzle/schema";
import {
  walletTransactions, itineraryItems, dnaSessions, quickDnaResults,
  tripReflections, conversations, messages, supportTickets, referrals,
  socialConnections, socialMessages, properties, reContacts,
  enterpriseMetrics, prospects, userPreferences,
} from "../drizzle/schema";
import { desc, sql, or } from "drizzle-orm";

export async function getWalletBalance(userId: number) {
  const db = await getDb();
  if (!db) return { balance: 0, transactions: [] };
  const txs = await db.select().from(walletTransactions).where(eq(walletTransactions.userId, userId)).orderBy(desc(walletTransactions.createdAt)).limit(50);
  const balance = txs.reduce((sum: number, tx: { type: string; amount: number }) => {
    return tx.type === "credit" || tx.type === "refund" ? sum + tx.amount : sum - tx.amount;
  }, 0);
  return { balance, transactions: txs };
}
export async function createWalletTransaction(data: InsertWalletTransaction) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(walletTransactions).values(data).returning();
  return result[0];
}

// ─── Itinerary Items ──────────────────────────────────────────────────────────
export async function getTripItineraryItems(tripId: number, userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(itineraryItems).where(and(eq(itineraryItems.tripId, tripId), eq(itineraryItems.userId, userId))).orderBy(itineraryItems.sortOrder);
}
export async function createItineraryItem(data: InsertItineraryItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(itineraryItems).values(data).returning();
  return result[0];
}
export async function updateItineraryItem(itemId: number, userId: number, data: Partial<InsertItineraryItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(itineraryItems).set(data).where(and(eq(itineraryItems.id, itemId), eq(itineraryItems.userId, userId)));
}
export async function deleteItineraryItem(itemId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(itineraryItems).where(and(eq(itineraryItems.id, itemId), eq(itineraryItems.userId, userId)));
}

// ─── DNA ──────────────────────────────────────────────────────────────────────
export async function createDnaSession(data: InsertDnaSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(dnaSessions).values(data).returning();
  return result[0];
}
export async function upsertQuickDnaResult(data: InsertQuickDnaResult) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateSet: Partial<InsertQuickDnaResult> = { ...data };
  delete (updateSet as Record<string, unknown>)["userId"];
  await db.insert(quickDnaResults).values(data).onConflictDoUpdate({ target: quickDnaResults.userId, set: updateSet });
}
export async function getQuickDnaResult(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(quickDnaResults).where(eq(quickDnaResults.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ─── Trip Reflections ─────────────────────────────────────────────────────────
export async function getTripReflection(tripId: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(tripReflections).where(and(eq(tripReflections.tripId, tripId), eq(tripReflections.userId, userId))).limit(1);
  return result.length > 0 ? result[0] : null;
}
export async function upsertTripReflection(data: InsertTripReflection) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateSet: Partial<InsertTripReflection> = { ...data };
  delete (updateSet as Record<string, unknown>)["tripId"];
  delete (updateSet as Record<string, unknown>)["userId"];
  await db.insert(tripReflections).values(data).onConflictDoUpdate({ target: [tripReflections.tripId, tripReflections.userId], set: updateSet });
}

// ─── Conversations & Messages ─────────────────────────────────────────────────
export async function getUserConversations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(conversations).where(and(eq(conversations.userId, userId), eq(conversations.archived, false))).orderBy(desc(conversations.updatedAt)).limit(20);
}
export async function createConversation(data: InsertConversation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(conversations).values(data).returning();
  return result[0];
}
export async function getConversationMessages(conversationId: number, userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(messages).where(and(eq(messages.conversationId, conversationId), eq(messages.userId, userId))).orderBy(messages.createdAt).limit(100);
}
export async function createMessage(data: InsertMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(messages).values(data).returning();
  return result[0];
}

// ─── Support Tickets ──────────────────────────────────────────────────────────
export async function getUserSupportTickets(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(supportTickets).where(eq(supportTickets.userId, userId)).orderBy(desc(supportTickets.createdAt));
}
export async function createSupportTicket(data: InsertSupportTicket) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(supportTickets).values(data).returning();
  return result[0];
}
export async function updateSupportTicket(ticketId: number, userId: number, data: Partial<InsertSupportTicket>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(supportTickets).set(data).where(and(eq(supportTickets.id, ticketId), eq(supportTickets.userId, userId)));
}

// ─── Referrals ────────────────────────────────────────────────────────────────
export async function getUserReferrals(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(referrals).where(eq(referrals.referrerId, userId)).orderBy(desc(referrals.createdAt));
}
export async function createReferral(data: InsertReferral) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(referrals).values(data).returning();
  return result[0];
}
export async function getReferralByCode(code: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(referrals).where(eq(referrals.referralCode, code)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ─── Social ───────────────────────────────────────────────────────────────────
export async function getUserConnections(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(socialConnections).where(
    or(eq(socialConnections.requesterId, userId), eq(socialConnections.receiverId, userId))
  ).orderBy(desc(socialConnections.updatedAt));
}
export async function createSocialConnection(data: InsertSocialConnection) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(socialConnections).values(data).returning();
  return result[0];
}
export async function updateSocialConnection(id: number, data: Partial<InsertSocialConnection>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(socialConnections).set(data).where(eq(socialConnections.id, id));
}
export async function getSocialMessages(userId: number, partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(socialMessages).where(
    or(
      and(eq(socialMessages.senderId, userId), eq(socialMessages.receiverId, partnerId)),
      and(eq(socialMessages.senderId, partnerId), eq(socialMessages.receiverId, userId))
    )
  ).orderBy(socialMessages.createdAt).limit(100);
}
export async function createSocialMessage(data: InsertSocialMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(socialMessages).values(data).returning();
  return result[0];
}

// ─── Properties ───────────────────────────────────────────────────────────────
export async function getProperties(filters?: { city?: string; minPrice?: number; maxPrice?: number; featured?: boolean }) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(properties).where(eq(properties.active, true));
  return query.orderBy(desc(properties.featured), desc(properties.createdAt)).limit(50);
}
export async function getPropertyById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ─── RE Contacts ──────────────────────────────────────────────────────────────
export async function getReContacts(city?: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reContacts).where(eq(reContacts.active, true)).orderBy(desc(reContacts.verified), desc(reContacts.rating)).limit(50);
}

// ─── Enterprise Metrics ───────────────────────────────────────────────────────
export async function getEnterpriseMetrics(periods?: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(enterpriseMetrics).orderBy(desc(enterpriseMetrics.period)).limit(periods ?? 12);
}
export async function upsertEnterpriseMetric(data: InsertEnterpriseMetric) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateSet: Partial<InsertEnterpriseMetric> = { ...data };
  delete (updateSet as Record<string, unknown>)["period"];
  await db.insert(enterpriseMetrics).values(data).onConflictDoUpdate({ target: enterpriseMetrics.period, set: updateSet });
}

// ─── CRM Prospects ────────────────────────────────────────────────────────────
export async function getProspects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(prospects).orderBy(desc(prospects.updatedAt)).limit(100);
}
export async function createProspect(data: InsertProspect) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(prospects).values(data).returning();
  return result[0];
}
export async function updateProspect(id: number, data: Partial<InsertProspect>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(prospects).set(data).where(eq(prospects.id, id));
}

// ─── User Preferences ─────────────────────────────────────────────────────────
export async function getUserPreferences(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}
export async function upsertUserPreferences(data: InsertUserPreferences) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateSet: Partial<InsertUserPreferences> = { ...data };
  delete (updateSet as Record<string, unknown>)["userId"];
  await db.insert(userPreferences).values(data).onConflictDoUpdate({ target: userPreferences.userId, set: updateSet });
}
