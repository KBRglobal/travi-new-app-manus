import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  InsertUser, users,
  travelerProfiles, InsertTravelerProfile,
  trips, InsertTrip,
  priceAlerts, InsertPriceAlert,
  pushTokens, InsertPushToken,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      _db = drizzle(pool);
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
