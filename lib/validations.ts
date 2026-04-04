import { z } from 'zod';

/* ═══════════════════════════════════════════
 *  TRAVI — Zod Validation Schemas
 *  Used with react-hook-form + @hookform/resolvers
 * ═══════════════════════════════════════════ */

// ── Auth ─────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
export type RegisterForm = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const verifyCodeSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
});
export type VerifyCodeForm = z.infer<typeof verifyCodeSchema>;

// ── DNA Quiz ─────────────────────────────
export const dnaQuizAnswerSchema = z.object({
  questionId: z.string(),
  answer: z.union([z.string(), z.number(), z.array(z.string())]),
});
export type DNAQuizAnswer = z.infer<typeof dnaQuizAnswerSchema>;

// ── Trip Planning ────────────────────────
export const tripSearchSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  travelers: z.number().min(1).max(20),
  budget: z.enum(['budget', 'moderate', 'luxury']).optional(),
});
export type TripSearchForm = z.infer<typeof tripSearchSchema>;

export const travelerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  passportNumber: z.string().optional(),
  passportExpiry: z.string().optional(),
  nationality: z.string().optional(),
});
export type TravelerForm = z.infer<typeof travelerSchema>;

// ── Expenses ─────────────────────────────
export const expenseSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3, 'Currency code must be 3 letters'),
  category: z.enum([
    'food', 'transport', 'accommodation', 'shopping',
    'activities', 'tips', 'other',
  ]),
  description: z.string().optional(),
  splitWith: z.array(z.string()).optional(),
  receiptUri: z.string().optional(),
});
export type ExpenseForm = z.infer<typeof expenseSchema>;

// ── Review ───────────────────────────────
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string().min(10, 'Review must be at least 10 characters').max(1000),
  photos: z.array(z.string()).max(5).optional(),
  tags: z.array(z.string()).optional(),
});
export type ReviewForm = z.infer<typeof reviewSchema>;

// ── Profile ──────────────────────────────
export const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  bio: z.string().max(300).optional(),
  homeAirport: z.string().optional(),
  preferredCurrency: z.string().length(3).optional(),
  languages: z.array(z.string()).optional(),
});
export type ProfileForm = z.infer<typeof profileSchema>;

// ── Flight Alert ─────────────────────────
export const flightAlertSchema = z.object({
  origin: z.string().length(3, 'Airport code must be 3 letters'),
  destination: z.string().length(3, 'Airport code must be 3 letters'),
  maxPrice: z.number().positive(),
  currency: z.string().length(3).default('EUR'),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  flexible: z.boolean().default(false),
});
export type FlightAlertForm = z.infer<typeof flightAlertSchema>;

// ── Split Pay ────────────────────────────
export const splitPaySchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  participants: z.array(z.object({
    userId: z.string(),
    share: z.number().positive(),
  })).min(2, 'At least 2 participants required'),
  description: z.string().optional(),
});
export type SplitPayForm = z.infer<typeof splitPaySchema>;
