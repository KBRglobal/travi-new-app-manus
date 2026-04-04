/**
 * TRAVI DNA Learning Store
 * Every user interaction feeds this store.
 * The app always learns. The profile always grows.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const DNA_KEY = "travi_dna_v1";

export type InterestCategory =
  | "landmarks"
  | "nature"
  | "beaches"
  | "food"
  | "nightlife"
  | "shopping"
  | "adventure"
  | "wellness"
  | "history"
  | "water_sports"
  | "art_culture"
  | "sports"
  | "waterparks"
  | "extreme";

export interface InterestScore {
  score: number; // 0–100
  interactions: number;
  lastUpdated: number; // timestamp
}

export interface SwipeRecord {
  attractionId: string;
  category: InterestCategory;
  liked: boolean;
  hesitationMs: number; // time spent looking before swiping
  timestamp: number;
}

export interface TripRecord {
  destination: string;
  dates: { start: string; end: string };
  budget: number;
  travelers: number;
  rating?: number; // 1–5, set after trip
}

export interface DNATraits {
  adventureLevel: number;   // 0–100
  culturalDepth: number;
  foodieness: number;
  socialEnergy: number;
  luxuryAffinity: number;
  natureConnection: number;
}

export interface FoodPreferences {
  cuisines: string[];           // e.g. ["Italian", "Japanese"]
  avoid: string[];              // e.g. ["Pork", "Beef"]
  allergies: string[];          // e.g. ["Nuts", "Dairy"]
  notes: string;                // free text
  updatedAt: number;
}

export interface TravelerDNA {
  interests: Partial<Record<InterestCategory, InterestScore>>;
  traits: DNATraits;
  pace: "slow" | "moderate" | "packed";
  budgetStyle: "budget" | "mid" | "premium" | "luxury";
  foodPreferences?: FoodPreferences;
  swipeHistory: SwipeRecord[];
  trips: TripRecord[];
  totalInteractions: number;
  createdAt: number;
  updatedAt: number;
}

const DEFAULT_DNA: TravelerDNA = {
  interests: {},
  traits: {
    adventureLevel: 0,
    culturalDepth: 0,
    foodieness: 0,
    socialEnergy: 0,
    luxuryAffinity: 0,
    natureConnection: 0,
  },
  pace: "moderate",
  budgetStyle: "mid",
  swipeHistory: [],
  trips: [],
  totalInteractions: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

/** Recalculate traits from current interest scores */
function recalcTraits(dna: TravelerDNA): DNATraits {
  const get = (cat: InterestCategory) => dna.interests[cat]?.score ?? 0;

  return {
    adventureLevel: clamp(
      (get("adventure") + get("extreme") + get("water_sports")) / 3
    ),
    culturalDepth: clamp(
      (get("history") + get("art_culture") + get("landmarks")) / 3
    ),
    foodieness: clamp(get("food") * 1.2),
    socialEnergy: clamp(
      (get("nightlife") + get("shopping") + get("waterparks")) / 3
    ),
    luxuryAffinity: clamp(
      (get("shopping") + get("wellness")) / 2
    ),
    natureConnection: clamp(
      (get("nature") + get("beaches") + get("water_sports")) / 3
    ),
  };
}

// ─── Core Store ─────────────────────────────────────────────────────────────

let _cache: TravelerDNA | null = null;

export async function getDNA(): Promise<TravelerDNA> {
  if (_cache) return _cache;
  try {
    const raw = await AsyncStorage.getItem(DNA_KEY);
    if (raw) {
      _cache = JSON.parse(raw) as TravelerDNA;
      return _cache;
    }
  } catch {}
  _cache = { ...DEFAULT_DNA, createdAt: Date.now(), updatedAt: Date.now() };
  return _cache;
}

async function saveDNA(dna: TravelerDNA): Promise<void> {
  dna.updatedAt = Date.now();
  dna.traits = recalcTraits(dna);
  _cache = dna;
  try {
    await AsyncStorage.setItem(DNA_KEY, JSON.stringify(dna));
  } catch {}
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Record interest selections from the photo-grid picker.
 * Each selected category gets a score boost.
 */
export async function recordInterestSelections(
  selected: InterestCategory[]
): Promise<TravelerDNA> {
  const dna = await getDNA();

  for (const cat of selected) {
    const prev = dna.interests[cat] ?? { score: 0, interactions: 0, lastUpdated: 0 };
    dna.interests[cat] = {
      score: clamp(prev.score + 20),
      interactions: prev.interactions + 1,
      lastUpdated: Date.now(),
    };
  }

  dna.totalInteractions += selected.length;
  await saveDNA(dna);
  return dna;
}

/**
 * Record a Tinder swipe on an attraction.
 * Hesitation time is a strong signal — longer hesitation on a liked item = stronger preference.
 */
export async function recordSwipe(
  attractionId: string,
  category: InterestCategory,
  liked: boolean,
  hesitationMs: number
): Promise<TravelerDNA> {
  const dna = await getDNA();

  // Score delta: liked = positive, skipped = small negative
  // Hesitation multiplier: >3s = 1.5x, >6s = 2x
  let delta = liked ? 10 : -3;
  if (liked && hesitationMs > 6000) delta = 20;
  else if (liked && hesitationMs > 3000) delta = 15;
  else if (!liked && hesitationMs > 4000) delta = 5; // hesitated but skipped = weak positive

  const prev = dna.interests[category] ?? { score: 30, interactions: 0, lastUpdated: 0 };
  dna.interests[category] = {
    score: clamp(prev.score + delta),
    interactions: prev.interactions + 1,
    lastUpdated: Date.now(),
  };

  dna.swipeHistory.push({
    attractionId,
    category,
    liked,
    hesitationMs,
    timestamp: Date.now(),
  });

  // Keep only last 500 swipes
  if (dna.swipeHistory.length > 500) {
    dna.swipeHistory = dna.swipeHistory.slice(-500);
  }

  dna.totalInteractions += 1;
  await saveDNA(dna);
  return dna;
}

/**
 * Record budget choice — updates luxuryAffinity and budgetStyle.
 */
export async function recordBudgetChoice(
  amount: number
): Promise<TravelerDNA> {
  const dna = await getDNA();

  if (amount < 1000) dna.budgetStyle = "budget";
  else if (amount < 3000) dna.budgetStyle = "mid";
  else if (amount < 7000) dna.budgetStyle = "premium";
  else dna.budgetStyle = "luxury";

  // Boost luxury affinity
  const luxBoost = amount < 1000 ? -10 : amount < 3000 ? 0 : amount < 7000 ? 15 : 30;
  const prev = dna.interests["shopping"] ?? { score: 30, interactions: 0, lastUpdated: 0 };
  dna.interests["wellness"] = {
    score: clamp((dna.interests["wellness"]?.score ?? 30) + luxBoost),
    interactions: (dna.interests["wellness"]?.interactions ?? 0) + 1,
    lastUpdated: Date.now(),
  };

  dna.totalInteractions += 1;
  await saveDNA(dna);
  return dna;
}

/**
 * Record a completed trip — strongest learning signal.
 */
export async function recordTrip(trip: TripRecord): Promise<TravelerDNA> {
  const dna = await getDNA();
  dna.trips.push(trip);
  dna.totalInteractions += 10; // trip completion = 10 interactions worth
  await saveDNA(dna);
  return dna;
}

/**
 * Get the top N interest categories by score.
 */
export function getTopInterests(dna: TravelerDNA, n = 3): InterestCategory[] {
  return (Object.entries(dna.interests) as [InterestCategory, InterestScore][])
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, n)
    .map(([cat]) => cat);
}

/**
 * Get a human-readable DNA summary label.
 */
export function getDNALabel(dna: TravelerDNA): string {
  const top = getTopInterests(dna, 2);
  const labels: Record<InterestCategory, string> = {
    landmarks: "Explorer",
    nature: "Nature Lover",
    beaches: "Beach Seeker",
    food: "Foodie",
    nightlife: "Night Owl",
    shopping: "Style Hunter",
    adventure: "Adventurer",
    wellness: "Wellness Traveler",
    history: "Culture Buff",
    water_sports: "Water Sports Fan",
    art_culture: "Art Lover",
    sports: "Sports Fan",
    waterparks: "Thrill Seeker",
    extreme: "Adrenaline Junkie",
  };
  return top.map((c) => labels[c] ?? c).join(" + ") || "Traveler";
}

/**
 * Record food preferences — saved to DNA and used to filter restaurant swipes.
 */
export async function recordFoodPreferences(
  prefs: Omit<FoodPreferences, "updatedAt">
): Promise<TravelerDNA> {
  const dna = await getDNA();

  dna.foodPreferences = { ...prefs, updatedAt: Date.now() };

  // Boost foodieness trait based on specificity
  const specificity = prefs.cuisines.length + prefs.avoid.length + prefs.allergies.length;
  const prev = dna.interests["food"] ?? { score: 30, interactions: 0, lastUpdated: 0 };
  dna.interests["food"] = {
    score: clamp(prev.score + Math.min(specificity * 3, 25)),
    interactions: prev.interactions + 1,
    lastUpdated: Date.now(),
  };

  dna.totalInteractions += 1;
  await saveDNA(dna);
  return dna;
}

/** Reset DNA (for testing / re-onboarding) */
export async function resetDNA(): Promise<void> {
  _cache = null;
  await AsyncStorage.removeItem(DNA_KEY);
}
