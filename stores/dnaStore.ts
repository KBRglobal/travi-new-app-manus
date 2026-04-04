import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { asyncStorageAdapter } from '../lib/storage';
import type { DNAProfile } from '../lib/dnaSignals';

interface DNAAnswer {
  questionId: string;
  answer: string;
  imageUrl?: string;
}

interface TravelDNA {
  type: string; // e.g. 'Explorer', 'Foodie', 'Adventurer', 'Culture Lover'
  traits: string[];
  preferences: {
    pace: 'slow' | 'moderate' | 'fast';
    budget: 'budget' | 'mid' | 'luxury';
    style: 'solo' | 'couple' | 'family' | 'group';
    interests: string[];
  };
}

interface DNAState {
  // Quiz state
  answers: DNAAnswer[];
  currentStep: number;
  totalSteps: number;
  dna: TravelDNA | null;
  isComplete: boolean;

  // DNA Profile (from signal pipeline)
  dnaProfile: DNAProfile | null;
  signalCount: number;

  // Actions
  addAnswer: (answer: DNAAnswer) => void;
  setStep: (step: number) => void;
  setDNA: (dna: TravelDNA) => void;
  setComplete: (complete: boolean) => void;
  setDNAProfile: (profile: DNAProfile) => void;
  setSignalCount: (count: number) => void;
  reset: () => void;
}

// Alias for both naming conventions
export const useDnaStore = create<DNAState>()(
  persist(
    (set) => ({
      answers: [],
      currentStep: 0,
      totalSteps: 8,
      dna: null,
      isComplete: false,
      dnaProfile: null,
      signalCount: 0,

      addAnswer: (answer) => set((state) => ({
        answers: [...state.answers, answer],
        currentStep: state.currentStep + 1,
      })),
      setStep: (step) => set({ currentStep: step }),
      setDNA: (dna) => set({ dna, isComplete: true }),
      setComplete: (complete) => set({ isComplete: complete }),
      setDNAProfile: (profile) => set({ dnaProfile: profile }),
      setSignalCount: (count) => set({ signalCount: count }),
      reset: () => set({
        answers: [],
        currentStep: 0,
        dna: null,
        isComplete: false,
        dnaProfile: null,
        signalCount: 0,
      }),
    }),
    {
      name: 'travi-dna',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        answers: state.answers,
        currentStep: state.currentStep,
        dna: state.dna,
        isComplete: state.isComplete,
        dnaProfile: state.dnaProfile,
        signalCount: state.signalCount,
      }),
    }
  )
);

// Export with both naming conventions for compatibility
export const useDNAStore = useDnaStore;
