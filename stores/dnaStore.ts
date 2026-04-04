import { create } from 'zustand';

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
  answers: DNAAnswer[];
  currentStep: number;
  totalSteps: number;
  dna: TravelDNA | null;
  isComplete: boolean;

  // Actions
  addAnswer: (answer: DNAAnswer) => void;
  setStep: (step: number) => void;
  setDNA: (dna: TravelDNA) => void;
  setComplete: (complete: boolean) => void;
  reset: () => void;
}

export const useDNAStore = create<DNAState>((set) => ({
  answers: [],
  currentStep: 0,
  totalSteps: 8,
  dna: null,
  isComplete: false,

  addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer], currentStep: state.currentStep + 1 })),
  setStep: (step) => set({ currentStep: step }),
  setDNA: (dna) => set({ dna, isComplete: true }),
  setComplete: (complete) => set({ isComplete: complete }),
  reset: () => set({ answers: [], currentStep: 0, dna: null, isComplete: false }),
}));
