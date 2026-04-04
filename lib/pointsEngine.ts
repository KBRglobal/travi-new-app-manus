/* ═══════════════════════════════════════════
 *  TRAVI — Points Engine & Cashback System
 *  Full implementation from Phase 2 spec
 * ═══════════════════════════════════════════ */

// ─── Types ───

export type MembershipTier = 'freemium' | 'pass' | 'plus' | 'first_class';
export type PointsTier = 'silver' | 'gold' | 'platinum' | 'diamond';
export type EarnAction =
  | 'booking_flight'
  | 'booking_hotel'
  | 'booking_activity'
  | 'checkin'
  | 'review_written'
  | 'referral_signup'
  | 'referral_upgrade_pass'
  | 'referral_upgrade_plus'
  | 'referral_upgrade_first_class'
  | 'referral_renewal'
  | 'dna_completed'
  | 'first_booking';

export type BookingCategory = 'flights' | 'hotels' | 'activities';

export interface PointsTransaction {
  id: string;
  userId: string;
  action: EarnAction | 'redeem' | 'transfer' | 'expire';
  amount: number; // positive = earn, negative = spend
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface CashbackTransaction {
  id: string;
  userId: string;
  bookingId: string;
  category: BookingCategory;
  bookingAmount: number;
  cashbackRate: number;
  tierMultiplier: number;
  cashbackAmount: number;
  status: 'pending' | 'released' | 'cancelled';
  releaseDate: string; // 14 days after trip end
  createdAt: string;
}

// ─── Earn Rules ───

export const EARN_RULES: Record<EarnAction, { base: number; multiplier: 'tier' | number }> = {
  booking_flight:              { base: 100, multiplier: 'tier' },
  booking_hotel:               { base: 50,  multiplier: 'tier' },
  booking_activity:            { base: 25,  multiplier: 'tier' },
  checkin:                     { base: 10,  multiplier: 1 },
  review_written:              { base: 50,  multiplier: 1 },
  referral_signup:             { base: 500, multiplier: 1 },
  referral_upgrade_pass:       { base: 200, multiplier: 1 },
  referral_upgrade_plus:       { base: 400, multiplier: 1 },
  referral_upgrade_first_class: { base: 800, multiplier: 1 },
  referral_renewal:            { base: 100, multiplier: 1 },
  dna_completed:               { base: 200, multiplier: 1 },
  first_booking:               { base: 100, multiplier: 1 },
};

// ─── Tier Multipliers ───

export const TIER_MULTIPLIERS: Record<MembershipTier, number> = {
  freemium:    1.0,
  pass:        2.0,
  plus:        2.5,
  first_class: 3.0,
};

// ─── Points Tier Thresholds ───

export const TIER_THRESHOLDS: Record<PointsTier, number> = {
  silver:   0,
  gold:     10_000,
  platinum: 50_000,
  diamond:  200_000,
};

// ─── Cashback Rates ───

export const CASHBACK_RATES: Record<BookingCategory, number> = {
  flights:    0.02, // 2%
  hotels:     0.03, // 3%
  activities: 0.05, // 5%
};

export const CASHBACK_MULTIPLIERS: Record<MembershipTier, number> = {
  freemium:    0,    // no cashback on free
  pass:        1.0,
  plus:        1.5,
  first_class: 2.0,
};

// ─── Points Calculation ───

export function calculatePointsEarned(
  action: EarnAction,
  membershipTier: MembershipTier
): number {
  const rule = EARN_RULES[action];
  const multiplier = rule.multiplier === 'tier'
    ? TIER_MULTIPLIERS[membershipTier]
    : rule.multiplier;
  return Math.round(rule.base * multiplier);
}

export function getPointsTier(lifetimePoints: number): PointsTier {
  if (lifetimePoints >= TIER_THRESHOLDS.diamond) return 'diamond';
  if (lifetimePoints >= TIER_THRESHOLDS.platinum) return 'platinum';
  if (lifetimePoints >= TIER_THRESHOLDS.gold) return 'gold';
  return 'silver';
}

export function getNextTierThreshold(currentTier: PointsTier): { tier: PointsTier; threshold: number } | null {
  const tiers: PointsTier[] = ['silver', 'gold', 'platinum', 'diamond'];
  const currentIndex = tiers.indexOf(currentTier);
  if (currentIndex >= tiers.length - 1) return null;
  const nextTier = tiers[currentIndex + 1];
  return { tier: nextTier, threshold: TIER_THRESHOLDS[nextTier] };
}

export function getProgressToNextTier(lifetimePoints: number): {
  currentTier: PointsTier;
  nextTier: PointsTier | null;
  progress: number; // 0-1
  pointsNeeded: number;
} {
  const currentTier = getPointsTier(lifetimePoints);
  const next = getNextTierThreshold(currentTier);

  if (!next) {
    return { currentTier, nextTier: null, progress: 1, pointsNeeded: 0 };
  }

  const currentThreshold = TIER_THRESHOLDS[currentTier];
  const range = next.threshold - currentThreshold;
  const progress = Math.min(1, (lifetimePoints - currentThreshold) / range);

  return {
    currentTier,
    nextTier: next.tier,
    progress,
    pointsNeeded: next.threshold - lifetimePoints,
  };
}

// ─── Cashback Calculation ───

export function calculateCashback(
  bookingAmount: number,
  category: BookingCategory,
  membershipTier: MembershipTier
): CashbackTransaction {
  const rate = CASHBACK_RATES[category];
  const multiplier = CASHBACK_MULTIPLIERS[membershipTier];
  const cashbackAmount = Math.round(bookingAmount * rate * multiplier * 100) / 100;

  // Release date: 14 days after trip end (mock: 14 days from now)
  const releaseDate = new Date();
  releaseDate.setDate(releaseDate.getDate() + 14);

  return {
    id: 'cb_' + Date.now(),
    userId: '',
    bookingId: '',
    category,
    bookingAmount,
    cashbackRate: rate,
    tierMultiplier: multiplier,
    cashbackAmount,
    status: membershipTier === 'freemium' ? 'cancelled' : 'pending',
    releaseDate: releaseDate.toISOString(),
    createdAt: new Date().toISOString(),
  };
}

// ─── Points Transaction Builder ───

export function createPointsTransaction(
  userId: string,
  action: EarnAction,
  membershipTier: MembershipTier,
  metadata?: Record<string, unknown>
): PointsTransaction {
  const amount = calculatePointsEarned(action, membershipTier);
  const descriptions: Record<EarnAction, string> = {
    booking_flight: 'Flight booking reward',
    booking_hotel: 'Hotel booking reward',
    booking_activity: 'Activity booking reward',
    checkin: 'Check-in reward',
    review_written: 'Review written reward',
    referral_signup: 'Referral signup bonus',
    referral_upgrade_pass: 'Referral upgrade to Pass',
    referral_upgrade_plus: 'Referral upgrade to Plus',
    referral_upgrade_first_class: 'Referral upgrade to First Class',
    referral_renewal: 'Referral renewal bonus',
    dna_completed: 'DNA quiz completed',
    first_booking: 'First booking bonus',
  };

  return {
    id: 'pts_' + Date.now(),
    userId,
    action,
    amount,
    description: descriptions[action],
    metadata,
    createdAt: new Date().toISOString(),
  };
}

// ─── Redemption Options ───

export interface RedemptionOption {
  id: string;
  type: 'wallet_credit' | 'gift_card' | 'upgrade' | 'donation';
  name: string;
  pointsCost: number;
  value: string;
}

export const REDEMPTION_OPTIONS: RedemptionOption[] = [
  { id: 'r1', type: 'wallet_credit', name: 'Wallet Credit €5', pointsCost: 500, value: '€5' },
  { id: 'r2', type: 'wallet_credit', name: 'Wallet Credit €10', pointsCost: 900, value: '€10' },
  { id: 'r3', type: 'wallet_credit', name: 'Wallet Credit €25', pointsCost: 2000, value: '€25' },
  { id: 'r4', type: 'wallet_credit', name: 'Wallet Credit €50', pointsCost: 3500, value: '€50' },
  { id: 'r5', type: 'gift_card', name: 'Amazon Gift Card €10', pointsCost: 1000, value: '€10' },
  { id: 'r6', type: 'gift_card', name: 'Airbnb Gift Card €25', pointsCost: 2500, value: '€25' },
  { id: 'r7', type: 'upgrade', name: 'Upgrade to Pass (1 month)', pointsCost: 5000, value: '1 month Pass' },
  { id: 'r8', type: 'donation', name: 'Plant a Tree', pointsCost: 100, value: '1 tree' },
  { id: 'r9', type: 'donation', name: 'Clean Ocean (1kg plastic)', pointsCost: 250, value: '1kg plastic removed' },
];

export function canRedeem(balance: number, option: RedemptionOption): boolean {
  return balance >= option.pointsCost;
}

// ─── Tier Benefits ───

export interface TierBenefit {
  tier: PointsTier;
  benefits: string[];
}

export const TIER_BENEFITS: TierBenefit[] = [
  {
    tier: 'silver',
    benefits: ['Basic rewards', 'Standard support', 'Community access'],
  },
  {
    tier: 'gold',
    benefits: ['2x points on bookings', 'Priority support', 'Early access to deals', 'Free cancellation'],
  },
  {
    tier: 'platinum',
    benefits: ['3x points on bookings', 'VIP support', 'Exclusive deals', 'Airport lounge access', 'Free upgrades'],
  },
  {
    tier: 'diamond',
    benefits: ['5x points on bookings', 'Personal concierge', 'Best price guarantee', 'All platinum benefits', 'Annual travel credit'],
  },
];
