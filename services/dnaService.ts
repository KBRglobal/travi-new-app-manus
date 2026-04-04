/**
 * TRAVI — DNA Service
 * Handles Travel DNA quiz, profile, and matching operations.
 */
import { get, post } from '../lib/api';
import type { DNASignal, DNAProfile } from '../lib/dnaSignals';

// ─── Types ───

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'image_choice' | 'scale' | 'multiple_choice';
  options: {
    id: string;
    text: string;
    imageUrl?: string;
  }[];
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
}

export interface DNAResult {
  type: string;
  traits: string[];
  preferences: {
    pace: string;
    budget: string;
    style: string;
    interests: string[];
  };
  profile: DNAProfile;
}

// ─── Service ───

export const dnaService = {
  getQuizQuestions: () =>
    get<QuizQuestion[]>('/dna/quiz'),

  submitQuiz: (answers: QuizAnswer[]) =>
    post<DNAResult>('/dna/quiz/submit', { answers }),

  getProfile: () =>
    get<DNAProfile>('/dna/profile'),

  flushSignals: (signals: DNASignal[]) =>
    post<{ processed: number }>('/dna/signals', { signals }),

  getMatchScore: (destinationId: string) =>
    get<{ score: number; reasons: string[] }>(`/dna/match/${destinationId}`),
};
