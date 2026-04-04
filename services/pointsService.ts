/**
 * TRAVI — Points & Rewards Service
 * Handles points balance, transactions, badges, challenges, and referrals.
 */
import { get, post } from '../lib/api';

// ─── Types ───

export interface PointsBalance {
  balance: number;
  lifetimeEarned: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  nextTierAt: number;
}

export interface PointsTransaction {
  id: string;
  type: 'earned' | 'redeemed' | 'gifted' | 'received';
  amount: number;
  description: string;
  date: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: string;
  locked: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  target: number;
  deadline?: string;
}

export interface RedeemOption {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  imageUrl?: string;
}

// ─── Service ───

export const pointsService = {
  getBalance: () =>
    get<PointsBalance>('/points/balance'),

  getTransactions: (params?: { page?: number; limit?: number }) =>
    get<PointsTransaction[]>('/points/transactions', { params }),

  getBadges: () =>
    get<Badge[]>('/points/badges'),

  getChallenges: () =>
    get<Challenge[]>('/points/challenges'),

  getRedeemOptions: () =>
    get<RedeemOption[]>('/points/redeem'),

  redeemPoints: (optionId: string) =>
    post<{ success: boolean; newBalance: number }>('/points/redeem', { optionId }),

  getReferralCode: () =>
    get<{ code: string; referralCount: number; totalEarned: number }>('/points/referral'),

  applyReferral: (code: string) =>
    post<{ pointsEarned: number }>('/points/referral/apply', { code }),
};
