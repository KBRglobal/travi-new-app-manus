/**
 * TRAVI DNA Engine
 * Calculates traveler DNA scores from swipe/quiz responses
 * and matches them to destinations.
 */

export interface DnaScores {
  explorerScore: number;      // 0-100: urban exploration, city hopping
  relaxerScore: number;       // 0-100: beach, wellness, slow travel
  adventurerScore: number;    // 0-100: hiking, extreme sports, nature
  culturalistScore: number;   // 0-100: museums, art, local culture
  foodieScore: number;        // 0-100: restaurants, street food, cooking
  photographerScore: number;  // 0-100: scenic spots, architecture, nature
  historianScore: number;     // 0-100: historical sites, archaeology
  naturalistScore: number;    // 0-100: wildlife, national parks, eco-travel
}

export interface SwipeCounts {
  adventureCount: number;
  cultureCount: number;
  foodCount: number;
  natureCount: number;
  luxuryCount: number;
  urbanCount: number;
  beachCount: number;
  nightlifeCount: number;
  wellnessCount: number;
  historyCount: number;
  familyCount: number;
}

export interface DestinationProfile {
  id: string;
  name: string;
  country: string;
  scores: DnaScores;
  tags: string[];
  avgCostPerDay: number;
  bestMonths: number[];
  visaFree: string[];
}

/**
 * Calculate DNA scores from swipe session counts.
 * Uses weighted formula to normalize across 8 dimensions.
 */
export function calculateDnaFromSwipes(counts: SwipeCounts): DnaScores {
  const total = Object.values(counts).reduce((s, v) => s + v, 0) || 1;
  const pct = (n: number) => Math.round((n / total) * 100);

  return {
    explorerScore: pct(counts.adventureCount + counts.urbanCount),
    relaxerScore: pct(counts.wellnessCount + counts.beachCount),
    adventurerScore: pct(counts.adventureCount + counts.natureCount),
    culturalistScore: pct(counts.cultureCount + counts.historyCount),
    foodieScore: pct(counts.foodCount),
    photographerScore: pct(counts.cultureCount + counts.natureCount),
    historianScore: pct(counts.historyCount),
    naturalistScore: pct(counts.natureCount + counts.beachCount),
  };
}

/**
 * Calculate compatibility score between two DNA profiles (0-100).
 * Used for social matching between travelers.
 */
export function calculateCompatibility(a: DnaScores, b: DnaScores): number {
  const keys = Object.keys(a) as (keyof DnaScores)[];
  const totalDiff = keys.reduce((sum, key) => {
    return sum + Math.abs(a[key] - b[key]);
  }, 0);
  const maxDiff = keys.length * 100;
  return Math.round(((maxDiff - totalDiff) / maxDiff) * 100);
}

/**
 * Match a DNA profile to a list of destinations.
 * Returns destinations sorted by match score descending.
 */
export function matchDestinations(
  dna: DnaScores,
  destinations: DestinationProfile[],
  budget?: number,
  month?: number,
): Array<DestinationProfile & { matchScore: number }> {
  return destinations
    .map((dest) => {
      const keys = Object.keys(dna) as (keyof DnaScores)[];
      const totalDiff = keys.reduce((sum, key) => {
        return sum + Math.abs(dna[key] - dest.scores[key]);
      }, 0);
      const maxDiff = keys.length * 100;
      let matchScore = Math.round(((maxDiff - totalDiff) / maxDiff) * 100);

      // Budget bonus: if destination is within budget, +5
      if (budget && dest.avgCostPerDay * 7 <= budget) matchScore = Math.min(100, matchScore + 5);

      // Season bonus: if current month is in best months, +5
      if (month && dest.bestMonths.includes(month)) matchScore = Math.min(100, matchScore + 5);

      return { ...dest, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Get the dominant traveler archetype from DNA scores.
 */
export function getDnaArchetype(dna: DnaScores): {
  type: string;
  emoji: string;
  description: string;
} {
  const scores = [
    { type: "Explorer", emoji: "🗺️", score: dna.explorerScore, description: "You thrive on discovering hidden gems and urban adventures" },
    { type: "Relaxer", emoji: "🏖️", score: dna.relaxerScore, description: "You seek peace, wellness, and beautiful beaches" },
    { type: "Adventurer", emoji: "🏔️", score: dna.adventurerScore, description: "You chase thrills, hikes, and extreme experiences" },
    { type: "Culturalist", emoji: "🎭", score: dna.culturalistScore, description: "You immerse yourself in local culture and art" },
    { type: "Foodie", emoji: "🍜", score: dna.foodieScore, description: "You travel for the food — every meal is an adventure" },
    { type: "Photographer", emoji: "📸", score: dna.photographerScore, description: "You see the world through a lens and chase the perfect shot" },
    { type: "Historian", emoji: "🏛️", score: dna.historianScore, description: "You connect with the past through ancient sites and stories" },
    { type: "Naturalist", emoji: "🌿", score: dna.naturalistScore, description: "You find peace in nature, wildlife, and eco-experiences" },
  ];

  return scores.sort((a, b) => b.score - a.score)[0];
}

/**
 * TRAVI destination database — used for matching engine.
 */
export const DESTINATION_PROFILES: DestinationProfile[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    scores: { explorerScore: 75, relaxerScore: 60, adventurerScore: 30, culturalistScore: 95, foodieScore: 90, photographerScore: 90, historianScore: 85, naturalistScore: 40 },
    tags: ["culture", "food", "romance", "art", "history"],
    avgCostPerDay: 150,
    bestMonths: [4, 5, 6, 9, 10],
    visaFree: ["IL", "US", "EU"],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    scores: { explorerScore: 90, relaxerScore: 50, adventurerScore: 60, culturalistScore: 85, foodieScore: 95, photographerScore: 85, historianScore: 70, naturalistScore: 55 },
    tags: ["tech", "food", "culture", "nightlife", "anime"],
    avgCostPerDay: 130,
    bestMonths: [3, 4, 10, 11],
    visaFree: ["IL", "US", "EU"],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    scores: { explorerScore: 80, relaxerScore: 70, adventurerScore: 65, culturalistScore: 60, foodieScore: 75, photographerScore: 80, historianScore: 40, naturalistScore: 45 },
    tags: ["luxury", "shopping", "desert", "architecture", "nightlife"],
    avgCostPerDay: 200,
    bestMonths: [11, 12, 1, 2, 3],
    visaFree: ["US", "EU"],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    scores: { explorerScore: 70, relaxerScore: 90, adventurerScore: 75, culturalistScore: 80, foodieScore: 70, photographerScore: 90, historianScore: 60, naturalistScore: 85 },
    tags: ["beach", "wellness", "culture", "nature", "surfing"],
    avgCostPerDay: 80,
    bestMonths: [4, 5, 6, 7, 8, 9],
    visaFree: ["IL", "US", "EU"],
  },
  {
    id: "nyc",
    name: "New York",
    country: "USA",
    scores: { explorerScore: 95, relaxerScore: 40, adventurerScore: 50, culturalistScore: 90, foodieScore: 90, photographerScore: 85, historianScore: 75, naturalistScore: 35 },
    tags: ["urban", "culture", "food", "shopping", "nightlife"],
    avgCostPerDay: 250,
    bestMonths: [4, 5, 6, 9, 10],
    visaFree: ["EU"],
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    scores: { explorerScore: 40, relaxerScore: 100, adventurerScore: 60, culturalistScore: 30, foodieScore: 55, photographerScore: 95, historianScore: 20, naturalistScore: 90 },
    tags: ["beach", "luxury", "diving", "romance", "overwater"],
    avgCostPerDay: 400,
    bestMonths: [11, 12, 1, 2, 3, 4],
    visaFree: ["IL", "US", "EU"],
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    scores: { explorerScore: 80, relaxerScore: 70, adventurerScore: 55, culturalistScore: 85, foodieScore: 85, photographerScore: 85, historianScore: 75, naturalistScore: 60 },
    tags: ["beach", "architecture", "food", "nightlife", "art"],
    avgCostPerDay: 120,
    bestMonths: [4, 5, 6, 9, 10],
    visaFree: ["IL", "US", "EU"],
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    scores: { explorerScore: 65, relaxerScore: 85, adventurerScore: 45, culturalistScore: 70, foodieScore: 75, photographerScore: 100, historianScore: 65, naturalistScore: 70 },
    tags: ["romance", "views", "beach", "food", "history"],
    avgCostPerDay: 180,
    bestMonths: [4, 5, 6, 9, 10],
    visaFree: ["IL", "US", "EU"],
  },
];
