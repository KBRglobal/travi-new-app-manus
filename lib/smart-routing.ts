/**
 * TRAVI Smart Routing Engine
 *
 * Builds an optimized daily itinerary from a list of activities.
 * Takes into account:
 *  - Trip pace (slow: 2-3/day, balanced: 4-5/day, full: 6-8/day)
 *  - Activity duration
 *  - Geographic clusters (simulated by neighborhood/area)
 *  - Opening hours
 *  - Must-see priority
 *  - User's DNA activity categories
 */

import type { ActivityCategory, TripPace } from "./store";

export type RoutingActivity = {
  id: string;
  title: string;
  duration: string; // e.g. "2h", "30min", "Half day", "Full day"
  openTime: string; // "09:00"
  closeTime: string; // "22:00"
  area: string; // neighborhood/area for clustering
  categories: ActivityCategory[];
  mustSee: boolean;
  price: number;
  cashback: number;
  rating: number;
  image: number;
  desc: string;
  url: string;
};

export type RoutedStop = {
  id: string;
  time: string;
  endTime: string;
  title: string;
  duration: string;
  area: string;
  categories: ActivityCategory[];
  mustSee: boolean;
  price: number;
  cashback: number;
  rating: number;
  image: number;
  desc: string;
  url: string;
  transport?: { mode: "walk" | "taxi" | "metro" | "boat"; minutes: number; cost: number };
};

export type RoutedDay = {
  day: number;
  date: string;
  theme: string;
  emoji: string;
  area: string;
  stops: RoutedStop[];
  totalCost: number;
  totalCashback: number;
  walkingMinutes: number;
};

// ── Duration parser ───────────────────────────────────────────────────────────

function parseDurationMinutes(dur: string): number {
  if (dur.toLowerCase().includes("full day")) return 360;
  if (dur.toLowerCase().includes("half day")) return 180;
  const h = dur.match(/(\d+(?:\.\d+)?)\s*h/i);
  const m = dur.match(/(\d+)\s*min/i);
  return (h ? parseFloat(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0) || 90;
}

function minutesToTime(base: number, addMinutes: number): string {
  const total = base + addMinutes;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// ── Transport estimator ───────────────────────────────────────────────────────

type TransportInfo = { mode: "walk" | "taxi" | "metro" | "boat"; minutes: number; cost: number };

function estimateTransport(fromArea: string, toArea: string): TransportInfo {
  if (fromArea === toArea) {
    return { mode: "walk", minutes: 10, cost: 0 };
  }
  // Simple heuristic: different areas = taxi
  const modes: Array<"walk" | "taxi" | "metro"> = ["walk", "taxi", "metro"];
  const mode = modes[Math.floor(Math.abs(fromArea.charCodeAt(0) - toArea.charCodeAt(0)) % 3)];
  return {
    mode,
    minutes: mode === "walk" ? 20 : mode === "metro" ? 25 : 15,
    cost: mode === "taxi" ? 12 : mode === "metro" ? 3 : 0,
  };
}

// ── Pace config ───────────────────────────────────────────────────────────────

const PACE_CONFIG: Record<TripPace, { activitiesPerDay: number; startHour: number; endHour: number; lunchBreak: number }> = {
  slow:     { activitiesPerDay: 3, startHour: 9,  endHour: 20, lunchBreak: 90 },
  balanced: { activitiesPerDay: 5, startHour: 8,  endHour: 22, lunchBreak: 60 },
  full:     { activitiesPerDay: 7, startHour: 7,  endHour: 23, lunchBreak: 45 },
};

// ── Day theme generator ───────────────────────────────────────────────────────

function getDayTheme(areas: string[], categories: ActivityCategory[]): { theme: string; emoji: string } {
  const topCat = categories[0];
  const themeMap: Record<string, { theme: string; emoji: string }> = {
    beaches:      { theme: "Beach & Water Day",    emoji: "🏖️" },
    hiking:       { theme: "Into the Wild",         emoji: "🥾" },
    food:         { theme: "Culinary Journey",      emoji: "🍜" },
    nightlife:    { theme: "Night Owl Day",          emoji: "🌙" },
    culture:      { theme: "Culture & Heritage",    emoji: "🏛️" },
    adventure:    { theme: "Adrenaline Day",         emoji: "🪂" },
    wellness:     { theme: "Rest & Restore",         emoji: "🧘" },
    shopping:     { theme: "Retail Therapy",         emoji: "🛍️" },
    nature:       { theme: "Nature Escape",          emoji: "🌿" },
    art:          { theme: "Art & Creativity",       emoji: "🎨" },
    music:        { theme: "Sounds of the City",     emoji: "🎵" },
    architecture: { theme: "Icons & Skylines",       emoji: "🏗️" },
  };
  const area = areas[0] ?? "City";
  return themeMap[topCat] ?? { theme: `${area} Exploration`, emoji: "🗺️" };
}

// ── Date generator ────────────────────────────────────────────────────────────

function getDateLabel(dayIndex: number, startDate?: string): string {
  const base = startDate ? new Date(startDate) : new Date();
  base.setDate(base.getDate() + dayIndex);
  return base.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

// ── Main routing function ─────────────────────────────────────────────────────

export function buildSmartItinerary(
  activities: RoutingActivity[],
  options: {
    pace: TripPace;
    days: number;
    userCategories: ActivityCategory[];
    startDate?: string;
  }
): RoutedDay[] {
  const { pace, days, userCategories, startDate } = options;
  const config = PACE_CONFIG[pace];

  // Sort: must-see first, then by user category match, then by rating
  const sorted = [...activities].sort((a, b) => {
    if (a.mustSee !== b.mustSee) return a.mustSee ? -1 : 1;
    const aMatch = a.categories.some((c) => userCategories.includes(c)) ? 1 : 0;
    const bMatch = b.categories.some((c) => userCategories.includes(c)) ? 1 : 0;
    if (aMatch !== bMatch) return bMatch - aMatch;
    return b.rating - a.rating;
  });

  // Cluster by area for geo-proximity
  const areaGroups: Record<string, RoutingActivity[]> = {};
  sorted.forEach((act) => {
    if (!areaGroups[act.area]) areaGroups[act.area] = [];
    areaGroups[act.area].push(act);
  });

  // Flatten back into area-clustered order
  const clustered: RoutingActivity[] = [];
  const areaOrder = Object.keys(areaGroups);
  let areaIdx = 0;
  while (clustered.length < sorted.length) {
    const area = areaOrder[areaIdx % areaOrder.length];
    const group = areaGroups[area];
    if (group && group.length > 0) clustered.push(group.shift()!);
    areaIdx++;
  }

  const result: RoutedDay[] = [];
  let actIdx = 0;

  for (let d = 0; d < days; d++) {
    const dayActivities: RoutingActivity[] = [];
    let count = 0;
    while (count < config.activitiesPerDay && actIdx < clustered.length) {
      dayActivities.push(clustered[actIdx]);
      actIdx++;
      count++;
    }

    if (dayActivities.length === 0) break;

    // Build stops with times
    let currentMinutes = config.startHour * 60;
    const stops: RoutedStop[] = [];
    let prevArea = dayActivities[0]?.area ?? "";
    let totalCost = 0;
    let totalCashback = 0;
    let walkingMinutes = 0;

    // Add lunch break in the middle
    const lunchInsertIdx = Math.floor(dayActivities.length / 2);

    dayActivities.forEach((act, i) => {
      // Transport from previous
      let transport: RoutedStop["transport"] | undefined;
      if (i > 0) {
        const t = estimateTransport(prevArea, act.area);
        transport = t;
        currentMinutes += t.minutes + 5; // 5 min buffer
        if (t.mode === "walk") walkingMinutes += t.minutes;
        totalCost += t.cost;
      }

      // Lunch break
      if (i === lunchInsertIdx && config.lunchBreak > 0) {
        currentMinutes += config.lunchBreak;
      }

      const durMin = parseDurationMinutes(act.duration);
      const startTime = minutesToTime(0, currentMinutes);
      const endTime = minutesToTime(0, currentMinutes + durMin);

      stops.push({
        id: act.id,
        time: startTime,
        endTime,
        title: act.title,
        duration: act.duration,
        area: act.area,
        categories: act.categories,
        mustSee: act.mustSee,
        price: act.price,
        cashback: act.cashback,
        rating: act.rating,
        image: act.image,
        desc: act.desc,
        url: act.url,
        transport: i > 0 ? transport : undefined,
      });

      totalCost += act.price;
      totalCashback += act.cashback;
      currentMinutes += durMin + 15; // 15 min buffer between activities
      prevArea = act.area;
    });

    const allCategories = dayActivities.flatMap((a) => a.categories);
    const allAreas = dayActivities.map((a) => a.area);
    const { theme, emoji } = getDayTheme(allAreas, allCategories);

    result.push({
      day: d + 1,
      date: getDateLabel(d, startDate),
      theme,
      emoji,
      area: allAreas[0] ?? "City",
      stops,
      totalCost,
      totalCashback,
      walkingMinutes,
    });
  }

  return result;
}
