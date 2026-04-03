import { describe, it, expect } from "vitest";
import {
  getXpLevel,
  getCashbackRate,
  pointsToUsd,
  usdToPoints,
  calculateBookingPoints,
  POINTS_ACTIONS,
  XP_LEVELS,
} from "../lib/engines/points-engine";

// ─── POINTS_ACTIONS ────────────────────────────────────────────────────────

describe("POINTS_ACTIONS", () => {
  it("all actions have positive points and xp", () => {
    for (const action of Object.values(POINTS_ACTIONS)) {
      expect(action.points).toBeGreaterThan(0);
      expect(action.xp).toBeGreaterThan(0);
    }
  });

  it("BOOK_TRIP has higher points than COMPLETE_SWIPE", () => {
    expect(POINTS_ACTIONS.BOOK_TRIP.points).toBeGreaterThan(POINTS_ACTIONS.COMPLETE_SWIPE.points);
  });

  it("COMPLETE_TRIP has highest points among core actions", () => {
    const coreActions = ["COMPLETE_DNA_QUIZ", "COMPLETE_SWIPE", "CREATE_TRIP", "BOOK_TRIP", "COMPLETE_TRIP"];
    const completeTripPoints = POINTS_ACTIONS.COMPLETE_TRIP.points;
    for (const key of coreActions) {
      if (key !== "COMPLETE_TRIP") {
        expect(completeTripPoints).toBeGreaterThanOrEqual(POINTS_ACTIONS[key].points);
      }
    }
  });

  it("each action has a non-empty description", () => {
    for (const action of Object.values(POINTS_ACTIONS)) {
      expect(action.description.length).toBeGreaterThan(0);
    }
  });
});

// ─── XP_LEVELS ─────────────────────────────────────────────────────────────

describe("XP_LEVELS", () => {
  it("has 8 levels", () => {
    expect(XP_LEVELS).toHaveLength(8);
  });

  it("levels are in ascending order of minXp", () => {
    for (let i = 1; i < XP_LEVELS.length; i++) {
      expect(XP_LEVELS[i].minXp).toBeGreaterThan(XP_LEVELS[i - 1].minXp);
    }
  });

  it("each level has a title, emoji, and perks array", () => {
    for (const level of XP_LEVELS) {
      expect(typeof level.title).toBe("string");
      expect(level.title.length).toBeGreaterThan(0);
      expect(typeof level.emoji).toBe("string");
      expect(Array.isArray(level.perks)).toBe(true);
      expect(level.perks.length).toBeGreaterThan(0);
    }
  });

  it("last level has maxXp of Infinity", () => {
    const lastLevel = XP_LEVELS[XP_LEVELS.length - 1];
    expect(lastLevel.maxXp).toBe(Infinity);
  });
});

// ─── getXpLevel ────────────────────────────────────────────────────────────

describe("getXpLevel", () => {
  it("returns level 1 for 0 XP", () => {
    const result = getXpLevel(0);
    expect(result.level).toBe(1);
    expect(result.title).toBe("Wanderer");
  });

  it("returns level 2 for 500 XP", () => {
    const result = getXpLevel(500);
    expect(result.level).toBe(2);
    expect(result.title).toBe("Explorer");
  });

  it("returns level 8 for 50000+ XP", () => {
    const result = getXpLevel(50000);
    expect(result.level).toBe(8);
    expect(result.title).toBe("Legend");
  });

  it("progress is 0% at the start of a level", () => {
    const result = getXpLevel(0); // level 1, minXp=0
    expect(result.progress).toBe(0);
  });

  it("progress is 100% at the max of a level", () => {
    const result = getXpLevel(499); // level 1, maxXp=499
    expect(result.progress).toBe(100);
  });

  it("progress is between 0 and 100 inclusive", () => {
    const testValues = [0, 100, 499, 500, 1000, 1499, 3000, 10000, 50000, 99999];
    for (const xp of testValues) {
      const result = getXpLevel(xp);
      expect(result.progress).toBeGreaterThanOrEqual(0);
      expect(result.progress).toBeLessThanOrEqual(100);
    }
  });

  it("returns an integer progress value", () => {
    const result = getXpLevel(750);
    expect(Number.isInteger(result.progress)).toBe(true);
  });
});

// ─── getCashbackRate ───────────────────────────────────────────────────────

describe("getCashbackRate", () => {
  it("returns 0% cashback for level 1 (0 XP)", () => {
    expect(getCashbackRate(0)).toBe(0);
  });

  it("returns 1% cashback for level 2 (500 XP)", () => {
    expect(getCashbackRate(500)).toBe(1);
  });

  it("returns 25% cashback for level 8 (50000+ XP)", () => {
    expect(getCashbackRate(50000)).toBe(25);
  });

  it("cashback increases with higher XP levels", () => {
    const rates = [0, 500, 1500, 3000, 6000, 10000, 20000, 50000].map(getCashbackRate);
    for (let i = 1; i < rates.length; i++) {
      expect(rates[i]).toBeGreaterThanOrEqual(rates[i - 1]);
    }
  });
});

// ─── pointsToUsd / usdToPoints ────────────────────────────────────────────

describe("pointsToUsd", () => {
  it("1000 points = $1 USD", () => {
    expect(pointsToUsd(1000)).toBe(1);
  });

  it("0 points = $0 USD", () => {
    expect(pointsToUsd(0)).toBe(0);
  });

  it("500 points = $0.5 USD", () => {
    expect(pointsToUsd(500)).toBe(0.5);
  });

  it("10000 points = $10 USD", () => {
    expect(pointsToUsd(10000)).toBe(10);
  });
});

describe("usdToPoints", () => {
  it("$1 USD = 1000 points", () => {
    expect(usdToPoints(1)).toBe(1000);
  });

  it("$0 USD = 0 points", () => {
    expect(usdToPoints(0)).toBe(0);
  });

  it("$1.5 USD = 1500 points", () => {
    expect(usdToPoints(1.5)).toBe(1500);
  });

  it("fractional USD is floored", () => {
    // $0.0009 = 0.9 points → floor → 0
    expect(usdToPoints(0.0009)).toBe(0);
  });

  it("pointsToUsd and usdToPoints are inverse for whole numbers", () => {
    const usd = 50;
    expect(pointsToUsd(usdToPoints(usd))).toBe(usd);
  });
});

// ─── calculateBookingPoints ────────────────────────────────────────────────

describe("calculateBookingPoints", () => {
  it("level 1 user earns 1x multiplier", () => {
    // Level 1: 0 XP, multiplier=1
    expect(calculateBookingPoints(100, 0)).toBe(100);
  });

  it("level 4 user earns 2.5x multiplier", () => {
    // Level 4: 3000 XP, multiplier=2.5
    expect(calculateBookingPoints(100, 3000)).toBe(250);
  });

  it("level 8 user earns 6x multiplier", () => {
    // Level 8: 50000 XP, multiplier=6
    expect(calculateBookingPoints(100, 50000)).toBe(600);
  });

  it("result is always an integer (floored)", () => {
    // $33.33 * 1.5 = 49.995 → floor → 49
    const result = calculateBookingPoints(33.33, 500);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("higher XP earns more points for same booking amount", () => {
    const amount = 200;
    const level1Points = calculateBookingPoints(amount, 0);
    const level5Points = calculateBookingPoints(amount, 6000);
    const level8Points = calculateBookingPoints(amount, 50000);
    expect(level5Points).toBeGreaterThan(level1Points);
    expect(level8Points).toBeGreaterThan(level5Points);
  });

  it("$0 booking earns 0 points regardless of level", () => {
    expect(calculateBookingPoints(0, 0)).toBe(0);
    expect(calculateBookingPoints(0, 50000)).toBe(0);
  });
});
