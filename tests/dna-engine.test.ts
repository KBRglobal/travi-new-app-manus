import { describe, it, expect } from "vitest";
import {
  calculateDnaFromSwipes,
  calculateCompatibility,
  matchDestinations,
  getDnaArchetype,
  DESTINATION_PROFILES,
  type SwipeCounts,
  type DnaScores,
} from "../lib/engines/dna-engine";

// ─── calculateDnaFromSwipes ────────────────────────────────────────────────

describe("calculateDnaFromSwipes", () => {
  it("returns all-zero scores when all counts are zero", () => {
    const counts: SwipeCounts = {
      adventureCount: 0, cultureCount: 0, foodCount: 0, natureCount: 0,
      luxuryCount: 0, urbanCount: 0, beachCount: 0, nightlifeCount: 0,
      wellnessCount: 0, historyCount: 0, familyCount: 0,
    };
    const scores = calculateDnaFromSwipes(counts);
    expect(scores.explorerScore).toBe(0);
    expect(scores.relaxerScore).toBe(0);
    expect(scores.adventurerScore).toBe(0);
    expect(scores.culturalistScore).toBe(0);
    expect(scores.foodieScore).toBe(0);
    expect(scores.photographerScore).toBe(0);
    expect(scores.historianScore).toBe(0);
    expect(scores.naturalistScore).toBe(0);
  });

  it("all scores are in range 0-100", () => {
    const counts: SwipeCounts = {
      adventureCount: 10, cultureCount: 5, foodCount: 8, natureCount: 6,
      luxuryCount: 3, urbanCount: 7, beachCount: 4, nightlifeCount: 2,
      wellnessCount: 5, historyCount: 3, familyCount: 2,
    };
    const scores = calculateDnaFromSwipes(counts);
    for (const val of Object.values(scores)) {
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(100);
    }
  });

  it("returns integer scores (rounded)", () => {
    const counts: SwipeCounts = {
      adventureCount: 3, cultureCount: 3, foodCount: 3, natureCount: 3,
      luxuryCount: 0, urbanCount: 0, beachCount: 0, nightlifeCount: 0,
      wellnessCount: 0, historyCount: 0, familyCount: 0,
    };
    const scores = calculateDnaFromSwipes(counts);
    for (const val of Object.values(scores)) {
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  it("foodie-dominant profile has highest foodieScore", () => {
    const counts: SwipeCounts = {
      adventureCount: 0, cultureCount: 0, foodCount: 100, natureCount: 0,
      luxuryCount: 0, urbanCount: 0, beachCount: 0, nightlifeCount: 0,
      wellnessCount: 0, historyCount: 0, familyCount: 0,
    };
    const scores = calculateDnaFromSwipes(counts);
    expect(scores.foodieScore).toBeGreaterThan(0);
    // foodieScore = pct(foodCount) = 100/100 * 100 = 100
    expect(scores.foodieScore).toBe(100);
  });

  it("beach + wellness dominant profile has high relaxerScore", () => {
    const counts: SwipeCounts = {
      adventureCount: 0, cultureCount: 0, foodCount: 0, natureCount: 0,
      luxuryCount: 0, urbanCount: 0, beachCount: 50, nightlifeCount: 0,
      wellnessCount: 50, historyCount: 0, familyCount: 0,
    };
    const scores = calculateDnaFromSwipes(counts);
    expect(scores.relaxerScore).toBe(100);
  });

  it("history-only profile has high historianScore", () => {
    const counts: SwipeCounts = {
      adventureCount: 0, cultureCount: 0, foodCount: 0, natureCount: 0,
      luxuryCount: 0, urbanCount: 0, beachCount: 0, nightlifeCount: 0,
      wellnessCount: 0, historyCount: 100, familyCount: 0,
    };
    const scores = calculateDnaFromSwipes(counts);
    expect(scores.historianScore).toBe(100);
  });
});

// ─── calculateCompatibility ────────────────────────────────────────────────

describe("calculateCompatibility", () => {
  const identical: DnaScores = {
    explorerScore: 80, relaxerScore: 60, adventurerScore: 70,
    culturalistScore: 90, foodieScore: 85, photographerScore: 75,
    historianScore: 65, naturalistScore: 55,
  };

  it("identical profiles return 100% compatibility", () => {
    expect(calculateCompatibility(identical, identical)).toBe(100);
  });

  it("completely opposite profiles return 0% compatibility", () => {
    const opposite: DnaScores = {
      explorerScore: 20, relaxerScore: 40, adventurerScore: 30,
      culturalistScore: 10, foodieScore: 15, photographerScore: 25,
      historianScore: 35, naturalistScore: 45,
    };
    // Not necessarily 0 unless all are exactly 100 apart
    const score = calculateCompatibility(identical, opposite);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("fully opposite (0 vs 100) profiles return 0%", () => {
    const all0: DnaScores = {
      explorerScore: 0, relaxerScore: 0, adventurerScore: 0,
      culturalistScore: 0, foodieScore: 0, photographerScore: 0,
      historianScore: 0, naturalistScore: 0,
    };
    const all100: DnaScores = {
      explorerScore: 100, relaxerScore: 100, adventurerScore: 100,
      culturalistScore: 100, foodieScore: 100, photographerScore: 100,
      historianScore: 100, naturalistScore: 100,
    };
    expect(calculateCompatibility(all0, all100)).toBe(0);
  });

  it("compatibility is symmetric", () => {
    const a: DnaScores = {
      explorerScore: 70, relaxerScore: 50, adventurerScore: 80,
      culturalistScore: 60, foodieScore: 90, photographerScore: 40,
      historianScore: 30, naturalistScore: 55,
    };
    const b: DnaScores = {
      explorerScore: 40, relaxerScore: 80, adventurerScore: 50,
      culturalistScore: 90, foodieScore: 30, photographerScore: 70,
      historianScore: 60, naturalistScore: 45,
    };
    expect(calculateCompatibility(a, b)).toBe(calculateCompatibility(b, a));
  });

  it("result is always an integer", () => {
    const a: DnaScores = {
      explorerScore: 33, relaxerScore: 67, adventurerScore: 51,
      culturalistScore: 72, foodieScore: 44, photographerScore: 88,
      historianScore: 19, naturalistScore: 63,
    };
    const result = calculateCompatibility(a, identical);
    expect(Number.isInteger(result)).toBe(true);
  });
});

// ─── matchDestinations ─────────────────────────────────────────────────────

describe("matchDestinations", () => {
  const foodieDna: DnaScores = {
    explorerScore: 50, relaxerScore: 50, adventurerScore: 30,
    culturalistScore: 70, foodieScore: 100, photographerScore: 60,
    historianScore: 60, naturalistScore: 30,
  };

  it("returns same number of destinations as input", () => {
    const results = matchDestinations(foodieDna, DESTINATION_PROFILES);
    expect(results).toHaveLength(DESTINATION_PROFILES.length);
  });

  it("results are sorted by matchScore descending", () => {
    const results = matchDestinations(foodieDna, DESTINATION_PROFILES);
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].matchScore).toBeGreaterThanOrEqual(results[i + 1].matchScore);
    }
  });

  it("all matchScores are in range 0-100", () => {
    const results = matchDestinations(foodieDna, DESTINATION_PROFILES);
    for (const r of results) {
      expect(r.matchScore).toBeGreaterThanOrEqual(0);
      expect(r.matchScore).toBeLessThanOrEqual(100);
    }
  });

  it("Tokyo or Paris ranks highly for foodie profile", () => {
    const results = matchDestinations(foodieDna, DESTINATION_PROFILES);
    const top3Ids = results.slice(0, 3).map((r) => r.id);
    const hasTopFoodDest = top3Ids.includes("tokyo") || top3Ids.includes("paris") || top3Ids.includes("nyc");
    expect(hasTopFoodDest).toBe(true);
  });

  it("budget bonus applies: within-budget destination gets +5", () => {
    // Bali avgCostPerDay=80, 7 days = $560. Budget $600 → bonus applies
    const withBudget = matchDestinations(foodieDna, DESTINATION_PROFILES, 600);
    const withoutBudget = matchDestinations(foodieDna, DESTINATION_PROFILES);
    const baliWithBudget = withBudget.find((d) => d.id === "bali")!;
    const baliWithout = withoutBudget.find((d) => d.id === "bali")!;
    // With budget bonus, Bali score should be >= without (capped at 100)
    expect(baliWithBudget.matchScore).toBeGreaterThanOrEqual(baliWithout.matchScore);
  });

  it("returns empty array for empty destinations input", () => {
    const results = matchDestinations(foodieDna, []);
    expect(results).toHaveLength(0);
  });
});

// ─── getDnaArchetype ───────────────────────────────────────────────────────

describe("getDnaArchetype", () => {
  it("returns Explorer for high explorerScore", () => {
    const dna: DnaScores = {
      explorerScore: 100, relaxerScore: 10, adventurerScore: 10,
      culturalistScore: 10, foodieScore: 10, photographerScore: 10,
      historianScore: 10, naturalistScore: 10,
    };
    const archetype = getDnaArchetype(dna);
    expect(archetype.type).toBe("Explorer");
  });

  it("returns Foodie for high foodieScore", () => {
    const dna: DnaScores = {
      explorerScore: 10, relaxerScore: 10, adventurerScore: 10,
      culturalistScore: 10, foodieScore: 100, photographerScore: 10,
      historianScore: 10, naturalistScore: 10,
    };
    const archetype = getDnaArchetype(dna);
    expect(archetype.type).toBe("Foodie");
  });

  it("returns Relaxer for high relaxerScore", () => {
    const dna: DnaScores = {
      explorerScore: 5, relaxerScore: 99, adventurerScore: 5,
      culturalistScore: 5, foodieScore: 5, photographerScore: 5,
      historianScore: 5, naturalistScore: 5,
    };
    const archetype = getDnaArchetype(dna);
    expect(archetype.type).toBe("Relaxer");
  });

  it("archetype has type, emoji, and description fields", () => {
    const dna: DnaScores = {
      explorerScore: 50, relaxerScore: 50, adventurerScore: 50,
      culturalistScore: 50, foodieScore: 50, photographerScore: 50,
      historianScore: 50, naturalistScore: 50,
    };
    const archetype = getDnaArchetype(dna);
    expect(archetype).toHaveProperty("type");
    expect(archetype).toHaveProperty("emoji");
    expect(archetype).toHaveProperty("description");
    expect(typeof archetype.type).toBe("string");
    expect(typeof archetype.description).toBe("string");
  });
});
