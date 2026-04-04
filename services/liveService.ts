/**
 * TRAVI — Live Trip Service
 * Handles live trip timeline, expenses, tax receipts, weather, and emergency.
 */
import { get, post, upload } from '../lib/api';

// ─── Types ───

export interface TimelineEvent {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'transfer' | 'free';
  title: string;
  time: string;
  location?: string;
  status: 'upcoming' | 'active' | 'completed' | 'skipped';
  details?: Record<string, unknown>;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  splitWith?: string[];
  receiptUrl?: string;
}

export interface TaxReceipt {
  id: string;
  store: string;
  amount: number;
  vatAmount: number;
  date: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  receiptImageUrl?: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: { day: string; high: number; low: number; condition: string }[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  type: 'embassy' | 'police' | 'hospital' | 'insurance';
}

// ─── Service ───

export const liveService = {
  getTimeline: (tripId: string) =>
    get<TimelineEvent[]>(`/live/${tripId}/timeline`),

  updateEventStatus: (tripId: string, eventId: string, status: TimelineEvent['status']) =>
    post<void>(`/live/${tripId}/timeline/${eventId}/status`, { status }),

  getExpenses: (tripId: string) =>
    get<Expense[]>(`/live/${tripId}/expenses`),

  addExpense: (tripId: string, expense: Omit<Expense, 'id'>) =>
    post<Expense>(`/live/${tripId}/expenses`, expense),

  uploadReceipt: (tripId: string, formData: FormData) =>
    upload<{ url: string }>(`/live/${tripId}/receipts/upload`, formData),

  getTaxReceipts: (tripId: string) =>
    get<TaxReceipt[]>(`/live/${tripId}/tax-receipts`),

  submitTaxReceipt: (tripId: string, receipt: Omit<TaxReceipt, 'id' | 'status'>) =>
    post<TaxReceipt>(`/live/${tripId}/tax-receipts`, receipt),

  getWeather: (lat: number, lng: number) =>
    get<WeatherData>('/weather', { params: { lat, lng } }),

  getEmergencyContacts: (countryCode: string) =>
    get<EmergencyContact[]>(`/emergency/${countryCode}`),
};
