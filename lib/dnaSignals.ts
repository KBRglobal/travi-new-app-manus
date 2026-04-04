import { useDnaStore } from '../stores/dnaStore';

/* ═══════════════════════════════════════════
 *  TRAVI — DNA Signal Pipeline
 *  Full implementation: signals, calculation, matching
 * ═══════════════════════════════════════════ */

// ─── Types ───

export type SignalType =
  | 'swipe_like'
  | 'swipe_reject'
  | 'swipe_like_hesitant'
  | 'viewed_not_tapped'
  | 'detail_view_no_booking'
  | 'booking_completed'
  | 'activity_added'
  | 'activity_removed'
  | 'rated_5_stars'
  | 'rated_1_2_stars'
  | 'wishlist_added'
  | 'wishlist_removed'
  | 'checkin_completed';

export type ItemType = 'destination' | 'activity' | 'hotel';

export type DNADimension =
  | 'adventure'
  | 'culture'
  | 'luxury'
  | 'social'
  | 'nature'
  | 'food'
  | 'wellness'
  | 'budget';

export interface DNASignal {
  id: string;
  type: SignalType;
  itemId: string;
  itemType: ItemType;
  weight: number;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface DNAProfile {
  userId: string;
  adventure: number;
  culture: number;
  luxury: number;
  social: number;
  nature: number;
  food: number;
  wellness: number;
  budget: number;
  signalCount: number;
  lastCalculated: Date;
  vector: number[];
}

// ─── Signal Weights ───

const SIGNAL_WEIGHTS: Record<SignalType, number> = {
  swipe_like: 1.0,
  swipe_reject: -0.8,
  swipe_like_hesitant: 0.3,
  viewed_not_tapped: -0.4,
  detail_view_no_booking: -0.2,
  booking_completed: 2.0,
  activity_added: 1.5,
  activity_removed: -1.0,
  rated_5_stars: 2.5,
  rated_1_2_stars: -2.0,
  wishlist_added: 0.8,
  wishlist_removed: -0.5,
  checkin_completed: 1.2,
};

// ─── Item → Dimension Tags (17 destinations + activities) ───

export const ITEM_TAGS: Record<string, Partial<Record<DNADimension, number>>> = {
  // Destinations
  dest_dubai:       { adventure: 0.7, culture: 0.8, luxury: 0.9, social: 0.8, nature: 0.5, food: 0.9, wellness: 0.6, budget: 0.3 },
  dest_chiang_mai:  { adventure: 0.6, culture: 0.9, luxury: 0.3, social: 0.4, nature: 0.8, food: 0.9, wellness: 0.8, budget: 0.9 },
  dest_barcelona:   { adventure: 0.5, culture: 0.9, luxury: 0.6, social: 0.9, nature: 0.4, food: 0.9, wellness: 0.5, budget: 0.5 },
  dest_tokyo:       { adventure: 0.4, culture: 0.95, luxury: 0.7, social: 0.6, nature: 0.5, food: 0.95, wellness: 0.6, budget: 0.4 },
  dest_bali:        { adventure: 0.7, culture: 0.7, luxury: 0.6, social: 0.5, nature: 0.9, food: 0.7, wellness: 0.9, budget: 0.7 },
  dest_iceland:     { adventure: 0.95, culture: 0.4, luxury: 0.5, social: 0.3, nature: 0.95, food: 0.4, wellness: 0.7, budget: 0.3 },
  dest_lisbon:      { adventure: 0.4, culture: 0.8, luxury: 0.5, social: 0.7, nature: 0.5, food: 0.8, wellness: 0.5, budget: 0.7 },
  dest_marrakech:   { adventure: 0.6, culture: 0.9, luxury: 0.7, social: 0.6, nature: 0.5, food: 0.9, wellness: 0.7, budget: 0.6 },
  dest_new_york:    { adventure: 0.4, culture: 0.8, luxury: 0.8, social: 0.9, nature: 0.2, food: 0.8, wellness: 0.4, budget: 0.3 },
  dest_maldives:    { adventure: 0.5, culture: 0.2, luxury: 0.95, social: 0.3, nature: 0.8, food: 0.6, wellness: 0.95, budget: 0.1 },
  dest_paris:       { adventure: 0.3, culture: 0.95, luxury: 0.8, social: 0.7, nature: 0.4, food: 0.95, wellness: 0.5, budget: 0.4 },
  dest_cape_town:   { adventure: 0.9, culture: 0.6, luxury: 0.6, social: 0.6, nature: 0.9, food: 0.7, wellness: 0.5, budget: 0.6 },
  dest_rome:        { adventure: 0.3, culture: 0.95, luxury: 0.6, social: 0.7, nature: 0.3, food: 0.9, wellness: 0.4, budget: 0.5 },
  dest_tbilisi:     { adventure: 0.5, culture: 0.8, luxury: 0.3, social: 0.5, nature: 0.7, food: 0.8, wellness: 0.5, budget: 0.9 },
  dest_bangkok:     { adventure: 0.5, culture: 0.7, luxury: 0.5, social: 0.8, nature: 0.4, food: 0.95, wellness: 0.6, budget: 0.8 },
  dest_santorini:   { adventure: 0.3, culture: 0.6, luxury: 0.9, social: 0.5, nature: 0.7, food: 0.7, wellness: 0.8, budget: 0.3 },
  dest_amsterdam:   { adventure: 0.4, culture: 0.8, luxury: 0.5, social: 0.9, nature: 0.4, food: 0.7, wellness: 0.4, budget: 0.5 },
  // Activities
  act_scuba:         { adventure: 0.95, nature: 0.8, wellness: 0.3 },
  act_museum:        { culture: 0.95, luxury: 0.3 },
  act_spa:           { wellness: 0.95, luxury: 0.8 },
  act_food_tour:     { food: 0.95, culture: 0.6, social: 0.5 },
  act_nightclub:     { social: 0.95, luxury: 0.4 },
  act_hiking:        { adventure: 0.8, nature: 0.95, wellness: 0.5 },
  act_cooking_class: { food: 0.9, culture: 0.7 },
  act_surfing:       { adventure: 0.9, nature: 0.7 },
  act_yoga:          { wellness: 0.9, nature: 0.5 },
  act_wine_tasting:  { food: 0.8, luxury: 0.7, culture: 0.5 },
  act_kayaking:      { adventure: 0.85, nature: 0.8 },
  act_temple_visit:  { culture: 0.9, wellness: 0.4 },
};

// ─── Signal Queue (Client-side batching) ───

let signalQueue: DNASignal[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const FLUSH_DELAY = 5000;
const MAX_QUEUE_SIZE = 20;

// Local signal store for offline calculation
let allSignals: DNASignal[] = [];

function generateId(): string {
  return `sig_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function logSignal(
  type: SignalType,
  itemId: string,
  itemType: ItemType,
  metadata?: Record<string, unknown>,
) {
  const signal: DNASignal = {
    id: generateId(),
    type,
    itemId,
    itemType,
    weight: SIGNAL_WEIGHTS[type],
    metadata,
    timestamp: new Date().toISOString(),
  };

  signalQueue.push(signal);
  allSignals.push(signal);

  if (signalQueue.length >= MAX_QUEUE_SIZE) {
    flushSignals();
    return;
  }

  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flushSignals, FLUSH_DELAY);
}

async function flushSignals() {
  if (signalQueue.length === 0) return;

  const batch = [...signalQueue];
  signalQueue = [];

  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }

  try {
    // TODO: Replace with tRPC call when backend is ready
    // await trpc.dna.flushSignals.mutate({ signals: batch });
    console.log(`[DNA] Flushed ${batch.length} signals`);

    // Update local store with signal count
    const store = useDnaStore.getState();
    store.setSignalCount((store.signalCount || 0) + batch.length);

    // Recalculate DNA profile locally
    const profile = calculateDNA(allSignals);
    store.setDNAProfile(profile);
  } catch (error) {
    signalQueue = [...batch, ...signalQueue];
    console.error('[DNA] Flush failed, re-queued', error);
  }
}

// ─── DNA Calculation Logic ───

interface ItemScore {
  itemId: string;
  itemType: ItemType;
  avgWeight: number;
  signalCount: number;
}

function groupAndAverage(signals: DNASignal[]): ItemScore[] {
  const groups: Record<string, { weights: number[]; type: ItemType }> = {};

  for (const signal of signals) {
    const key = `${signal.itemType}:${signal.itemId}`;
    if (!groups[key]) {
      groups[key] = { weights: [], type: signal.itemType };
    }
    groups[key].weights.push(signal.weight);
  }

  return Object.entries(groups).map(([key, { weights, type }]) => ({
    itemId: key.split(':')[1],
    itemType: type,
    avgWeight: weights.reduce((a, b) => a + b, 0) / weights.length,
    signalCount: weights.length,
  }));
}

function mapToDimensions(
  itemScores: ItemScore[]
): Record<DNADimension, number[]> {
  const dimensions: Record<DNADimension, number[]> = {
    adventure: [], culture: [], luxury: [], social: [],
    nature: [], food: [], wellness: [], budget: [],
  };

  for (const item of itemScores) {
    const tags = ITEM_TAGS[item.itemId];
    if (!tags) continue;

    for (const [dim, tagWeight] of Object.entries(tags)) {
      const dimension = dim as DNADimension;
      dimensions[dimension].push(item.avgWeight * (tagWeight || 0));
    }
  }

  return dimensions;
}

function normalizeDimensions(
  dimensions: Record<DNADimension, number[]>
): Record<DNADimension, number> {
  const result: Record<string, number> = {};

  for (const [dim, scores] of Object.entries(dimensions)) {
    if (scores.length === 0) {
      result[dim] = 0.5; // neutral default
    } else {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      // Normalize from [-2.5, 2.5] range to [0, 1]
      result[dim] = Math.max(0, Math.min(1, (avg + 2.5) / 5));
    }
  }

  return result as Record<DNADimension, number>;
}

export function calculateDNA(signals: DNASignal[]): DNAProfile {
  const itemScores = groupAndAverage(signals);
  const dimensions = mapToDimensions(itemScores);
  const normalized = normalizeDimensions(dimensions);

  const vector = [
    normalized.adventure,
    normalized.culture,
    normalized.luxury,
    normalized.social,
    normalized.nature,
    normalized.food,
    normalized.wellness,
    normalized.budget,
  ];

  return {
    userId: '',
    ...normalized,
    signalCount: signals.length,
    lastCalculated: new Date(),
    vector,
  };
}

// ─── Matching Engine ───

export interface DestinationVector {
  id: string;
  name: string;
  country: string;
  vector: number[];
}

// Pre-computed destination vectors from ITEM_TAGS
export const DESTINATION_VECTORS: DestinationVector[] = Object.entries(ITEM_TAGS)
  .filter(([key]) => key.startsWith('dest_'))
  .map(([key, tags]) => {
    const name = key.replace('dest_', '').split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    return {
      id: key,
      name,
      country: '',
      vector: [
        tags.adventure || 0,
        tags.culture || 0,
        tags.luxury || 0,
        tags.social || 0,
        tags.nature || 0,
        tags.food || 0,
        tags.wellness || 0,
        tags.budget || 0,
      ],
    };
  });

export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dotProduct / denominator;
}

export interface MatchResult {
  destinationId: string;
  name: string;
  matchScore: number;
  whyText: string;
  topDimensions: DNADimension[];
}

const DIMENSION_LABELS: Record<DNADimension, string> = {
  adventure: 'Adventure & Sports',
  culture: 'Culture & History',
  luxury: 'Luxury & Comfort',
  social: 'Social & Nightlife',
  nature: 'Nature & Wildlife',
  food: 'Food & Gastronomy',
  wellness: 'Wellness & Relaxation',
  budget: 'Budget-Friendly',
};

function getTopMatchingDimensions(
  userVector: number[],
  destVector: number[]
): DNADimension[] {
  const dims: DNADimension[] = ['adventure', 'culture', 'luxury', 'social', 'nature', 'food', 'wellness', 'budget'];

  const scores = dims.map((dim, i) => ({
    dim,
    score: Math.min(userVector[i], destVector[i]), // overlap score
  }));

  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((s) => s.dim);
}

function generateMatchReason(topDims: DNADimension[]): string {
  if (topDims.length === 0) return 'Explore something new!';
  if (topDims.length === 1) return `Matches your love of ${DIMENSION_LABELS[topDims[0]]}`;
  return `Perfect for your ${DIMENSION_LABELS[topDims[0]]} & ${DIMENSION_LABELS[topDims[1]]} DNA`;
}

export function getRecommendations(
  userProfile: DNAProfile,
  excludeIds: string[] = [],
  limit: number = 20,
  minMatch: number = 0.0
): MatchResult[] {
  return DESTINATION_VECTORS
    .filter((dest) => !excludeIds.includes(dest.id))
    .map((dest) => {
      const matchScore = cosineSimilarity(userProfile.vector, dest.vector);
      const topDimensions = getTopMatchingDimensions(userProfile.vector, dest.vector);
      return {
        destinationId: dest.id,
        name: dest.name,
        matchScore: Math.round(matchScore * 100) / 100,
        whyText: generateMatchReason(topDimensions),
        topDimensions,
      };
    })
    .filter((r) => r.matchScore >= minMatch)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

// Get DNA cards for swipe screens (S8, S25)
export function getDNACards(
  userProfile: DNAProfile,
  excludeSeen: string[] = [],
  limit: number = 30
): MatchResult[] {
  return getRecommendations(userProfile, excludeSeen, limit);
}

// Get activity recommendations for a destination
export function getActivityRecommendations(
  userProfile: DNAProfile,
  limit: number = 30
): MatchResult[] {
  const activityVectors = Object.entries(ITEM_TAGS)
    .filter(([key]) => key.startsWith('act_'))
    .map(([key, tags]) => ({
      id: key,
      name: key.replace('act_', '').split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
      vector: [
        tags.adventure || 0, tags.culture || 0, tags.luxury || 0, tags.social || 0,
        tags.nature || 0, tags.food || 0, tags.wellness || 0, tags.budget || 0,
      ],
    }));

  return activityVectors
    .map((act) => {
      const matchScore = cosineSimilarity(userProfile.vector, act.vector);
      const topDimensions = getTopMatchingDimensions(userProfile.vector, act.vector);
      return {
        destinationId: act.id,
        name: act.name,
        matchScore: Math.round(matchScore * 100) / 100,
        whyText: generateMatchReason(topDimensions),
        topDimensions,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

// ─── Convenience Helpers ───

export function logSwipeLike(itemId: string, itemType: ItemType, hesitationMs?: number) {
  if (hesitationMs && hesitationMs > 2000) {
    logSignal('swipe_like_hesitant', itemId, itemType, { hesitation_ms: hesitationMs });
  } else {
    logSignal('swipe_like', itemId, itemType);
  }
}

export function logSwipeReject(itemId: string, itemType: ItemType) {
  logSignal('swipe_reject', itemId, itemType);
}

export function logBooking(itemId: string, itemType: ItemType) {
  logSignal('booking_completed', itemId, itemType);
}

export function logCheckin(activityId: string) {
  logSignal('checkin_completed', activityId, 'activity');
}

export function logRating(itemId: string, itemType: ItemType, rating: number) {
  if (rating >= 5) {
    logSignal('rated_5_stars', itemId, itemType);
  } else if (rating <= 2) {
    logSignal('rated_1_2_stars', itemId, itemType);
  }
}

export function logWishlist(itemId: string, itemType: ItemType, added: boolean) {
  logSignal(added ? 'wishlist_added' : 'wishlist_removed', itemId, itemType);
}

export function logActivityAdded(itemId: string) {
  logSignal('activity_added', itemId, 'activity');
}

export function logActivityRemoved(itemId: string) {
  logSignal('activity_removed', itemId, 'activity');
}

export function logViewedNotTapped(itemId: string, itemType: ItemType) {
  logSignal('viewed_not_tapped', itemId, itemType);
}

export function logDetailViewNoBooking(itemId: string, itemType: ItemType) {
  logSignal('detail_view_no_booking', itemId, itemType);
}

// ─── Get all signals (for debug/testing) ───
export function getAllSignals(): DNASignal[] {
  return [...allSignals];
}

export function clearSignals(): void {
  allSignals = [];
  signalQueue = [];
}
