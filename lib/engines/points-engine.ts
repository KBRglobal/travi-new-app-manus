/**
 * TRAVI Points & XP Engine
 * Manages loyalty points, XP levels, and rewards.
 */

export interface PointsAction {
  action: string;
  points: number;
  xp: number;
  description: string;
}

export const POINTS_ACTIONS: Record<string, PointsAction> = {
  COMPLETE_DNA_QUIZ:     { action: "COMPLETE_DNA_QUIZ",     points: 500,  xp: 200,  description: "Completed DNA Quiz" },
  COMPLETE_SWIPE:        { action: "COMPLETE_SWIPE",         points: 200,  xp: 100,  description: "Completed Activity Swipe" },
  CREATE_TRIP:           { action: "CREATE_TRIP",            points: 300,  xp: 150,  description: "Created a new trip" },
  BOOK_TRIP:             { action: "BOOK_TRIP",              points: 1000, xp: 500,  description: "Booked a trip through TRAVI" },
  COMPLETE_TRIP:         { action: "COMPLETE_TRIP",          points: 2000, xp: 1000, description: "Completed a trip" },
  WRITE_REFLECTION:      { action: "WRITE_REFLECTION",       points: 300,  xp: 150,  description: "Wrote a trip reflection" },
  REFER_FRIEND:          { action: "REFER_FRIEND",           points: 1000, xp: 300,  description: "Referred a friend" },
  FRIEND_JOINED:         { action: "FRIEND_JOINED",          points: 500,  xp: 100,  description: "Referred friend joined" },
  CONNECT_TRAVELER:      { action: "CONNECT_TRAVELER",       points: 100,  xp: 50,   description: "Connected with another traveler" },
  DAILY_LOGIN:           { action: "DAILY_LOGIN",            points: 50,   xp: 25,   description: "Daily login bonus" },
  FIRST_TRIP:            { action: "FIRST_TRIP",             points: 2000, xp: 500,  description: "First trip bonus" },
  PREMIUM_UPGRADE:       { action: "PREMIUM_UPGRADE",        points: 5000, xp: 2000, description: "Upgraded to Premium" },
};

export interface XpLevel {
  level: number;
  title: string;
  emoji: string;
  minXp: number;
  maxXp: number;
  perks: string[];
}

export const XP_LEVELS: XpLevel[] = [
  { level: 1,  title: "Wanderer",       emoji: "🌱", minXp: 0,     maxXp: 499,   perks: ["Basic trip planning"] },
  { level: 2,  title: "Explorer",       emoji: "🗺️", minXp: 500,   maxXp: 1499,  perks: ["Price alerts", "DNA quiz"] },
  { level: 3,  title: "Adventurer",     emoji: "⛺", minXp: 1500,  maxXp: 2999,  perks: ["Priority support", "Early access"] },
  { level: 4,  title: "Globetrotter",   emoji: "✈️", minXp: 3000,  maxXp: 5999,  perks: ["5% cashback", "Lounge access"] },
  { level: 5,  title: "Nomad",          emoji: "🌍", minXp: 6000,  maxXp: 9999,  perks: ["10% cashback", "Free upgrades"] },
  { level: 6,  title: "Jet Setter",     emoji: "💎", minXp: 10000, maxXp: 19999, perks: ["15% cashback", "Concierge"] },
  { level: 7,  title: "World Citizen",  emoji: "👑", minXp: 20000, maxXp: 49999, perks: ["20% cashback", "VIP access"] },
  { level: 8,  title: "Legend",         emoji: "🏆", minXp: 50000, maxXp: Infinity, perks: ["25% cashback", "Unlimited perks"] },
];

/**
 * Get XP level info for a given XP amount.
 */
export function getXpLevel(xp: number): XpLevel & { progress: number } {
  const level = XP_LEVELS.find((l) => xp >= l.minXp && xp <= l.maxXp) ?? XP_LEVELS[XP_LEVELS.length - 1];
  const range = level.maxXp === Infinity ? 50000 : level.maxXp - level.minXp;
  const progress = Math.min(100, Math.round(((xp - level.minXp) / range) * 100));
  return { ...level, progress };
}

/**
 * Calculate cashback percentage based on level.
 */
export function getCashbackRate(xp: number): number {
  const level = getXpLevel(xp);
  const rates: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 5, 5: 10, 6: 15, 7: 20, 8: 25 };
  return rates[level.level] ?? 0;
}

/**
 * Convert TRAVI points to USD value.
 * 1000 points = $1 USD
 */
export function pointsToUsd(points: number): number {
  return points / 1000;
}

/**
 * Convert USD to TRAVI points.
 */
export function usdToPoints(usd: number): number {
  return Math.floor(usd * 1000);
}

/**
 * Calculate points earned from a booking.
 * Base: 1 point per $1 spent + level multiplier.
 */
export function calculateBookingPoints(amountUsd: number, xp: number): number {
  const level = getXpLevel(xp);
  const multipliers: Record<number, number> = { 1: 1, 2: 1.5, 3: 2, 4: 2.5, 5: 3, 6: 4, 7: 5, 8: 6 };
  const multiplier = multipliers[level.level] ?? 1;
  return Math.floor(amountUsd * multiplier);
}
