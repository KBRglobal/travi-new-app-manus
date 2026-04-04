import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { asyncStorageAdapter } from '../lib/storage';

interface TimelineEvent {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'transfer' | 'free';
  title: string;
  time: string;
  location?: string;
  status: 'upcoming' | 'active' | 'completed' | 'skipped';
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  splitWith?: string[];
  receiptUrl?: string;
}

interface TaxReceipt {
  id: string;
  store: string;
  amount: number;
  vatAmount: number;
  date: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
}

interface LiveState {
  tripId: string | null;
  timeline: TimelineEvent[];
  expenses: Expense[];
  taxReceipts: TaxReceipt[];
  currentEventIndex: number;
  weather: { temp: number; condition: string } | null;
  emergencyMode: boolean;

  // Actions
  setTripId: (id: string) => void;
  setTimeline: (events: TimelineEvent[]) => void;
  addExpense: (expense: Expense) => void;
  addTaxReceipt: (receipt: TaxReceipt) => void;
  setCurrentEvent: (index: number) => void;
  setWeather: (weather: { temp: number; condition: string }) => void;
  setEmergencyMode: (mode: boolean) => void;
  reset: () => void;
}

export const useLiveStore = create<LiveState>()(
  persist(
    (set) => ({
      tripId: null,
      timeline: [],
      expenses: [],
      taxReceipts: [],
      currentEventIndex: 0,
      weather: null,
      emergencyMode: false,

      setTripId: (id) => set({ tripId: id }),
      setTimeline: (events) => set({ timeline: events }),
      addExpense: (expense) => set((s) => ({ expenses: [...s.expenses, expense] })),
      addTaxReceipt: (receipt) => set((s) => ({ taxReceipts: [...s.taxReceipts, receipt] })),
      setCurrentEvent: (index) => set({ currentEventIndex: index }),
      setWeather: (weather) => set({ weather }),
      setEmergencyMode: (mode) => set({ emergencyMode: mode }),
      reset: () => set({ tripId: null, timeline: [], expenses: [], taxReceipts: [], currentEventIndex: 0, weather: null, emergencyMode: false }),
    }),
    {
      name: 'travi-live',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        tripId: state.tripId,
        timeline: state.timeline,
        expenses: state.expenses,
        taxReceipts: state.taxReceipts,
        currentEventIndex: state.currentEventIndex,
      }),
    }
  )
);
