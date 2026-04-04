import { create } from 'zustand';

interface PointsTransaction {
  id: string;
  type: 'earned' | 'redeemed' | 'gifted' | 'received';
  amount: number;
  description: string;
  date: string;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: string;
  locked: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  target: number;
  deadline?: string;
}

interface PointsState {
  balance: number;
  lifetimeEarned: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  transactions: PointsTransaction[];
  badges: Badge[];
  challenges: Challenge[];
  referralCode: string;
  referralCount: number;

  // Actions
  addPoints: (amount: number, description: string) => void;
  redeemPoints: (amount: number, description: string) => void;
  setBalance: (balance: number) => void;
  setTier: (tier: PointsState['tier']) => void;
  addBadge: (badge: Badge) => void;
  updateChallenge: (id: string, progress: number) => void;
  reset: () => void;
}

export const usePointsStore = create<PointsState>((set) => ({
  balance: 12450,
  lifetimeEarned: 24800,
  tier: 'silver',
  transactions: [],
  badges: [],
  challenges: [],
  referralCode: 'TRAVI2024',
  referralCount: 0,

  addPoints: (amount, description) => set((s) => ({
    balance: s.balance + amount,
    lifetimeEarned: s.lifetimeEarned + amount,
    transactions: [{ id: Date.now().toString(), type: 'earned', amount, description, date: new Date().toISOString() }, ...s.transactions],
  })),
  redeemPoints: (amount, description) => set((s) => ({
    balance: s.balance - amount,
    transactions: [{ id: Date.now().toString(), type: 'redeemed', amount, description, date: new Date().toISOString() }, ...s.transactions],
  })),
  setBalance: (balance) => set({ balance }),
  setTier: (tier) => set({ tier }),
  addBadge: (badge) => set((s) => ({ badges: [...s.badges, badge] })),
  updateChallenge: (id, progress) => set((s) => ({
    challenges: s.challenges.map((c) => c.id === id ? { ...c, progress } : c),
  })),
  reset: () => set({ balance: 0, lifetimeEarned: 0, tier: 'bronze', transactions: [], badges: [], challenges: [] }),
}));
