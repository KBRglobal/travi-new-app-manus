/* ═══════════════════════════════════════════
 *  TRAVI — tRPC API Client
 *  All endpoints from Phase 2 spec
 *  Currently using mock responses, ready for real backend
 * ═══════════════════════════════════════════ */

import { currentUser, destinations, flights, hotels, activities, walletData, pointsData } from '../mockData';
import { calculateDNA, getRecommendations, getDNACards, getActivityRecommendations, getAllSignals } from '../dnaSignals';
import type { DNAProfile, MatchResult } from '../dnaSignals';

// ─── Base API Config ───

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'https://api.travi.app';

// Simulated network delay
const delay = (ms: number = 300) => new Promise((r) => setTimeout(r, ms));

// ─── Auth ───

export const auth = {
  async register(email: string, password: string, name: string) {
    await delay(500);
    return {
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_' + Date.now(),
      user: { ...currentUser, email, name },
    };
  },

  async login(email: string, password: string) {
    await delay(500);
    return {
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_' + Date.now(),
      user: currentUser,
    };
  },

  async validate(token: string) {
    await delay(100);
    if (!token) throw new Error('Unauthorized');
    return { user: currentUser };
  },

  async refresh(refreshToken: string) {
    await delay(200);
    return { token: 'mock_token_' + Date.now() };
  },

  async verifyEmail(code: string) {
    await delay(300);
    return { success: code.length === 6 };
  },

  async resendVerification(email: string) {
    await delay(200);
    return { success: true };
  },
};

// ─── Users / DNA ───

export const users = {
  async me() {
    await delay();
    const signals = getAllSignals();
    const dnaProfile = signals.length > 0 ? calculateDNA(signals) : null;
    return { user: currentUser, dnaProfile };
  },

  async update(data: Partial<typeof currentUser>) {
    await delay();
    return { user: { ...currentUser, ...data } };
  },

  async uploadAvatar(presignedUrl: string) {
    await delay(500);
    return { avatarUrl: 'https://picsum.photos/200' };
  },
};

export const dna = {
  async calculate(userId: string): Promise<{ profile: DNAProfile }> {
    await delay(500);
    const signals = getAllSignals();
    const profile = calculateDNA(signals);
    return { profile };
  },

  async getProfile(userId: string): Promise<{ profile: DNAProfile | null }> {
    await delay();
    const signals = getAllSignals();
    if (signals.length === 0) return { profile: null };
    return { profile: calculateDNA(signals) };
  },

  async logSignal(signal: { type: string; itemId: string; itemType: string }) {
    await delay(100);
    return { success: true };
  },

  async flushSignals(signals: unknown[]) {
    await delay(200);
    return { processed: signals.length };
  },
};

// ─── Destinations ───

export const destinationsApi = {
  async getById(id: string) {
    await delay();
    const dest = destinations.find((d) => d.id === id) || destinations[0];
    const signals = getAllSignals();
    const profile = signals.length > 0 ? calculateDNA(signals) : null;
    let matchScore = 0;
    let whyText = 'Explore something new!';

    if (profile) {
      const matches = getRecommendations(profile);
      const match = matches.find((m) => m.destinationId === `dest_${dest.id}`);
      if (match) {
        matchScore = match.matchScore;
        whyText = match.whyText;
      }
    }

    return { destination: dest, matchScore, whyText };
  },

  async search(query: string) {
    await delay();
    const results = destinations.filter(
      (d) => d.name.toLowerCase().includes(query.toLowerCase()) ||
             d.country.toLowerCase().includes(query.toLowerCase())
    );
    return { results };
  },

  async getPopular() {
    await delay();
    return { destinations: destinations.slice(0, 10) };
  },

  async getRecommendations(filters?: { minMatch?: number; limit?: number }) {
    await delay(500);
    const signals = getAllSignals();
    if (signals.length === 0) {
      return { destinations: destinations.slice(0, 10), matches: [] };
    }
    const profile = calculateDNA(signals);
    const matches = getRecommendations(
      profile,
      [],
      filters?.limit || 20,
      filters?.minMatch || 0
    );
    return { destinations, matches };
  },
};

// ─── Recommendations ───

export const recommendations = {
  async get(userId: string, limit: number = 20, minMatch: number = 0.7) {
    await delay(500);
    const signals = getAllSignals();
    if (signals.length === 0) return { results: [] };
    const profile = calculateDNA(signals);
    return { results: getRecommendations(profile, [], limit, minMatch) };
  },

  async getDNACards(userId: string, limit: number = 30, excludeSeen: string[] = []) {
    await delay(400);
    const signals = getAllSignals();
    if (signals.length === 0) return { cards: [] };
    const profile = calculateDNA(signals);
    return { cards: getDNACards(profile, excludeSeen, limit) };
  },

  async getActivities(destinationId: string, userId: string, limit: number = 30) {
    await delay(400);
    const signals = getAllSignals();
    if (signals.length === 0) return { activities: [] };
    const profile = calculateDNA(signals);
    return { activities: getActivityRecommendations(profile, limit) };
  },

  async feedback(userId: string, itemId: string, itemType: string, feedbackType: string) {
    await delay(100);
    return { success: true };
  },
};

// ─── Trips ───

export const trips = {
  async create(data: { destinationId: string; startDate: string; endDate: string; travelers: number }) {
    await delay(500);
    return {
      trip: {
        id: 'trip_' + Date.now(),
        ...data,
        status: 'planning',
        createdAt: new Date().toISOString(),
      },
    };
  },

  async getAll(userId: string) {
    await delay();
    return {
      trips: [
        { id: 'trip_1', destination: 'Barcelona', status: 'upcoming', startDate: '2026-05-15', endDate: '2026-05-22' },
        { id: 'trip_2', destination: 'Tokyo', status: 'completed', startDate: '2026-01-10', endDate: '2026-01-20' },
      ],
    };
  },

  async getById(tripId: string) {
    await delay();
    return {
      trip: { id: tripId, destination: 'Barcelona', status: 'upcoming', startDate: '2026-05-15', endDate: '2026-05-22' },
      activities: activities.slice(0, 5),
      flights: flights.slice(0, 2),
      hotels: hotels.slice(0, 1),
    };
  },

  async updateStatus(tripId: string, status: string) {
    await delay();
    return { trip: { id: tripId, status } };
  },

  async buildCart(tripId: string) {
    await delay(500);
    const flightPrice = flights[0]?.price || 150;
    const hotelPrice = (hotels[0]?.price || 120) * 7;
    const activityPrice = activities.slice(0, 3).reduce((s, a) => s + a.price, 0);
    return {
      cart: {
        id: 'cart_' + Date.now(),
        tripId,
        items: [
          { type: 'flight', name: flights[0]?.airline || 'Flight', price: flightPrice },
          { type: 'hotel', name: hotels[0]?.name || 'Hotel', price: hotelPrice },
          { type: 'activities', name: '3 Activities', price: activityPrice },
        ],
      },
      pricing: {
        subtotal: flightPrice + hotelPrice + activityPrice,
        tax: Math.round((flightPrice + hotelPrice + activityPrice) * 0.1),
        total: Math.round((flightPrice + hotelPrice + activityPrice) * 1.1),
      },
    };
  },

  async hold(cartId: string) {
    await delay(300);
    return {
      holdId: 'hold_' + Date.now(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 min
    };
  },

  async confirm(holdId: string, paymentIntentId: string) {
    await delay(1000);
    return {
      booking: {
        id: 'booking_' + Date.now(),
        status: 'confirmed',
        confirmationCode: 'TRAVI-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      },
    };
  },

  async cancel(tripId: string) {
    await delay(500);
    return { refundEstimate: 250 };
  },
};

// ─── Live Mode ───

export const live = {
  async activate(tripId: string) {
    await delay(500);
    return {
      liveSession: {
        id: 'live_' + Date.now(),
        tripId,
        startedAt: new Date().toISOString(),
        status: 'active',
      },
    };
  },

  async updateLocation(tripId: string, coords: { lat: number; lng: number }) {
    await delay(100);
    return { success: true };
  },

  async checkin(activityId: string) {
    await delay(300);
    return {
      checkin: { id: 'ci_' + Date.now(), activityId, timestamp: new Date().toISOString() },
      pointsEarned: 10,
    };
  },

  async addExpense(tripId: string, expense: { amount: number; category: string; description: string; currency: string }) {
    await delay(200);
    return {
      expense: {
        id: 'exp_' + Date.now(),
        ...expense,
        createdAt: new Date().toISOString(),
      },
    };
  },

  async addMemory(tripId: string, imageUrl: string) {
    await delay(300);
    return {
      memory: { id: 'mem_' + Date.now(), imageUrl, createdAt: new Date().toISOString() },
    };
  },

  async endTrip(tripId: string) {
    await delay(500);
    return {
      postTrip: {
        tripId,
        totalExpenses: 1635,
        totalActivities: 12,
        totalPhotos: 45,
        pointsEarned: 350,
        cashbackEarned: 48.5,
      },
    };
  },
};

// ─── Payments ───

export const payments = {
  async createIntent(cartId: string) {
    await delay(500);
    return {
      clientSecret: 'pi_mock_' + Date.now() + '_secret_' + Math.random().toString(36).slice(2),
    };
  },

  async confirm(paymentIntentId: string) {
    await delay(1000);
    return {
      booking: {
        id: 'booking_' + Date.now(),
        status: 'confirmed',
        confirmationCode: 'TRAVI-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      },
    };
  },

  async createSplit(amount: number, participants: string[]) {
    await delay(300);
    return {
      splitId: 'split_' + Date.now(),
      links: participants.map((p) => ({
        userId: p,
        amount: Math.round(amount / participants.length),
        link: `https://travi.app/pay/${p}`,
      })),
    };
  },

  async topupWallet(amount: number) {
    await delay(500);
    return {
      clientSecret: 'pi_topup_' + Date.now() + '_secret_' + Math.random().toString(36).slice(2),
    };
  },

  async getWallet(userId: string) {
    await delay();
    return {
      balance: walletData.balance,
      transactions: walletData.transactions,
    };
  },
};

// ─── Points ───

export const points = {
  async getBalance(userId: string) {
    await delay();
    return {
      balance: pointsData.balance,
      tier: pointsData.tier,
      earnRate: pointsData.earnRate,
    };
  },

  async getTransactions(userId: string) {
    await delay();
    return { transactions: pointsData.transactions };
  },

  async transfer(userId: string, partnerId: string, amount: number) {
    await delay(500);
    return {
      transfer: {
        id: 'xfer_' + Date.now(),
        from: userId,
        to: partnerId,
        amount,
        status: 'completed',
      },
    };
  },

  async buyGiftCard(userId: string, brand: string, amount: number) {
    await delay(500);
    return {
      giftCode: 'GIFT-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
    };
  },

  async redeem(userId: string, type: string, amount: number) {
    await delay(500);
    return {
      redemption: {
        id: 'redeem_' + Date.now(),
        type,
        amount,
        status: 'completed',
      },
    };
  },
};

// ─── Export all as trpc-like object ───

export const trpc = {
  auth,
  users,
  dna,
  destinations: destinationsApi,
  recommendations,
  trips,
  live,
  payments,
  points,
};

export default trpc;
