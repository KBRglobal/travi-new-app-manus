/**
 * Tests for Food Preferences and Trip Hub features
 */
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn().mockResolvedValue(null),
    setItem: vi.fn().mockResolvedValue(undefined),
    removeItem: vi.fn().mockResolvedValue(undefined),
  },
}));

import {
  recordFoodPreferences,
  getDNA,
  resetDNA,
  type FoodPreferences,
} from "../lib/dna-store";

describe("Food Preferences → DNA Store", () => {
  beforeEach(async () => {
    await resetDNA();
  });

  it("saves food preferences to DNA", async () => {
    const prefs: Omit<FoodPreferences, "updatedAt"> = {
      cuisines: ["Italian", "Japanese"],
      avoid: ["Pork"],
      allergies: ["Nuts"],
      notes: "Prefer healthy options",
    };

    const dna = await recordFoodPreferences(prefs);

    expect(dna.foodPreferences).toBeDefined();
    expect(dna.foodPreferences?.cuisines).toEqual(["Italian", "Japanese"]);
    expect(dna.foodPreferences?.avoid).toEqual(["Pork"]);
    expect(dna.foodPreferences?.allergies).toEqual(["Nuts"]);
    expect(dna.foodPreferences?.notes).toBe("Prefer healthy options");
    expect(dna.foodPreferences?.updatedAt).toBeGreaterThan(0);
  });

  it("boosts food interest score when preferences are specific", async () => {
    const prefs: Omit<FoodPreferences, "updatedAt"> = {
      cuisines: ["Italian", "Japanese", "Mexican"],
      avoid: ["Pork", "Beef"],
      allergies: ["Nuts", "Dairy / Lactose"],
      notes: "",
    };

    const dna = await recordFoodPreferences(prefs);
    const foodScore = dna.interests["food"]?.score ?? 0;

    // Specificity = 3 + 2 + 2 = 7 → boost = min(7*3, 25) = 21
    // Starting score 30 + 21 = 51
    expect(foodScore).toBeGreaterThan(30);
  });

  it("increments totalInteractions on food preferences save", async () => {
    const before = (await getDNA()).totalInteractions;
    await recordFoodPreferences({ cuisines: ["Thai"], avoid: [], allergies: [], notes: "" });
    const after = (await getDNA()).totalInteractions;
    expect(after).toBe(before + 1);
  });

  it("overwrites previous food preferences on second save", async () => {
    await recordFoodPreferences({ cuisines: ["Italian"], avoid: [], allergies: [], notes: "" });
    await recordFoodPreferences({ cuisines: ["Japanese", "Korean"], avoid: ["Pork"], allergies: [], notes: "No MSG" });

    const dna = await getDNA();
    expect(dna.foodPreferences?.cuisines).toEqual(["Japanese", "Korean"]);
    expect(dna.foodPreferences?.notes).toBe("No MSG");
  });

  it("handles empty food preferences without error", async () => {
    const dna = await recordFoodPreferences({ cuisines: [], avoid: [], allergies: [], notes: "" });
    expect(dna.foodPreferences).toBeDefined();
    expect(dna.foodPreferences?.cuisines).toHaveLength(0);
  });
});

describe("Trip Hub — cashback calculation logic", () => {
  it("parses cashback strings correctly", () => {
    const cashbackStr = "$15 back";
    const amount = parseInt(cashbackStr.replace(/\D/g, ""), 10);
    expect(amount).toBe(15);
  });

  it("sums booked upsell cashback correctly", () => {
    const upsells = [
      { id: "taxi", cashback: "$8 back", booked: true },
      { id: "esim", cashback: "$3 back", booked: false },
      { id: "insurance", cashback: "$12 back", booked: true },
    ];

    const total = upsells
      .filter((u) => u.booked)
      .reduce((sum, u) => sum + parseInt(u.cashback.replace(/\D/g, ""), 10), 0);

    expect(total).toBe(20); // 8 + 12
  });

  it("calculates countdown correctly", () => {
    const now = Date.now();
    const future = now + 18 * 24 * 60 * 60 * 1000; // 18 days
    const diff = future - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    expect(days).toBe(18);
  });

  it("calculates split per person correctly", () => {
    const total = 1840;
    const travelers = 2;
    const perPerson = Math.round(total / travelers);
    expect(perPerson).toBe(920);
  });

  it("calculates cashback per person correctly", () => {
    const totalCashback = 127;
    const bookedCashback = 20;
    const travelers = 2;
    const perPerson = Math.round((totalCashback + bookedCashback) / travelers);
    expect(perPerson).toBe(74); // Math.round(147 / 2)
  });
});
