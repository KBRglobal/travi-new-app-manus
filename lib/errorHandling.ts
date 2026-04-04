/**
 * TRAVI SuperApp — Comprehensive Error Handling System
 * 
 * Covers: Network, Auth, Payment, Booking, Forms, Upload, Location, Empty States, Offline Mode
 */

import { router } from 'expo-router';

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export type ErrorCategory =
  | 'NETWORK'
  | 'AUTH'
  | 'PAYMENT'
  | 'BOOKING'
  | 'FORM'
  | 'UPLOAD'
  | 'LOCATION'
  | 'OFFLINE';

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface AppError {
  code: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  message: string;
  userMessage: string;
  action?: ErrorAction;
  meta?: Record<string, any>;
}

export type ErrorAction =
  | { type: 'toast'; message: string; duration?: number }
  | { type: 'modal'; modalId: string; params?: Record<string, any> }
  | { type: 'overlay'; component: 'NoInternetOverlay' | 'OfflineBadge' }
  | { type: 'inline'; field: string; message: string }
  | { type: 'shake'; target: string; message: string }
  | { type: 'navigate'; route: string }
  | { type: 'banner'; message: string; actionLabel?: string; onAction?: () => void }
  | { type: 'retry'; message: string; onRetry: () => void }
  | { type: 'confirm'; title: string; message: string; onConfirm: () => void; onCancel?: () => void };

// ─────────────────────────────────────────────────
// Toast Manager (global singleton)
// ─────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

type ToastListener = (toast: ToastMessage | null) => void;

class ToastManager {
  private listeners: Set<ToastListener> = new Set();
  private currentToast: ToastMessage | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  show(type: ToastType, message: string, duration: number = 3000) {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.currentToast = {
      id: Date.now().toString(),
      type,
      message,
      duration,
    };

    this.notify();

    this.timeoutId = setTimeout(() => {
      this.currentToast = null;
      this.notify();
    }, duration);
  }

  dismiss() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.currentToast = null;
    this.notify();
  }

  private notify() {
    this.listeners.forEach((l) => l(this.currentToast));
  }
}

export const toast = new ToastManager();

// ─────────────────────────────────────────────────
// NETWORK Errors
// ─────────────────────────────────────────────────

export const NetworkErrors = {
  timeout: (): AppError => ({
    code: 'NETWORK_TIMEOUT',
    category: 'NETWORK',
    severity: 'warning',
    message: 'Request timed out after 10s',
    userMessage: 'Connection timeout. Try again.',
    action: { type: 'toast', message: 'Connection timeout. Try again.', duration: 4000 },
  }),

  noConnection: (): AppError => ({
    code: 'NETWORK_NO_CONNECTION',
    category: 'NETWORK',
    severity: 'critical',
    message: 'No internet connection detected',
    userMessage: 'No internet connection',
    action: { type: 'overlay', component: 'NoInternetOverlay' },
  }),

  serverError: (statusCode: number = 500): AppError => ({
    code: 'NETWORK_SERVER_ERROR',
    category: 'NETWORK',
    severity: 'error',
    message: `Server returned ${statusCode}`,
    userMessage: "Something went wrong. We're on it.",
    action: { type: 'toast', message: "Something went wrong. We're on it.", duration: 4000 },
  }),
};

// ─────────────────────────────────────────────────
// AUTH Errors
// ─────────────────────────────────────────────────

export const AuthErrors = {
  tokenExpired: (): AppError => ({
    code: 'AUTH_TOKEN_EXPIRED',
    category: 'AUTH',
    severity: 'critical',
    message: 'Authentication token has expired',
    userMessage: 'Your session has expired. Please sign in again.',
    action: { type: 'modal', modalId: '/_modals/session-expired' },
  }),

  wrongPassword: (): AppError => ({
    code: 'AUTH_WRONG_PASSWORD',
    category: 'AUTH',
    severity: 'warning',
    message: 'Incorrect password provided',
    userMessage: 'Incorrect password',
    action: { type: 'inline', field: 'password', message: 'Incorrect password' },
  }),

  otpWrong: (): AppError => ({
    code: 'AUTH_OTP_WRONG',
    category: 'AUTH',
    severity: 'warning',
    message: 'Invalid OTP code entered',
    userMessage: 'Invalid code',
    action: { type: 'shake', target: 'otp-boxes', message: 'Invalid code' },
  }),

  otpExpired: (): AppError => ({
    code: 'AUTH_OTP_EXPIRED',
    category: 'AUTH',
    severity: 'warning',
    message: 'OTP code has expired',
    userMessage: 'Code expired. Resend?',
    action: { type: 'toast', message: 'Code expired. Resend?' },
  }),

  maxOtpAttempts: (): AppError => ({
    code: 'AUTH_MAX_OTP_ATTEMPTS',
    category: 'AUTH',
    severity: 'error',
    message: 'Maximum OTP attempts reached',
    userMessage: 'Too many attempts. Contact support.',
    action: { type: 'toast', message: 'Too many attempts. Contact support.', duration: 5000 },
  }),
};

// ─────────────────────────────────────────────────
// PAYMENT Errors
// ─────────────────────────────────────────────────

export const PaymentErrors = {
  cardDeclined: (): AppError => ({
    code: 'PAYMENT_CARD_DECLINED',
    category: 'PAYMENT',
    severity: 'error',
    message: 'Card was declined by the bank',
    userMessage: 'Card declined by your bank.',
    action: { type: 'toast', message: 'Card declined by your bank.', duration: 5000 },
  }),

  insufficientFunds: (): AppError => ({
    code: 'PAYMENT_INSUFFICIENT_FUNDS',
    category: 'PAYMENT',
    severity: 'error',
    message: 'Insufficient funds on card',
    userMessage: 'Insufficient funds.',
    action: { type: 'toast', message: 'Insufficient funds.', duration: 5000 },
  }),

  expiredCard: (): AppError => ({
    code: 'PAYMENT_EXPIRED_CARD',
    category: 'PAYMENT',
    severity: 'error',
    message: 'Card has expired',
    userMessage: 'Card expired. Please update your card.',
    action: { type: 'toast', message: 'Card expired. Please update your card.', duration: 5000 },
  }),

  threeDSFailed: (): AppError => ({
    code: 'PAYMENT_3DS_FAILED',
    category: 'PAYMENT',
    severity: 'error',
    message: '3D Secure verification failed',
    userMessage: 'Verification failed. Try again.',
    action: { type: 'toast', message: 'Verification failed. Try again.', duration: 5000 },
  }),

  timeout: (): AppError => ({
    code: 'PAYMENT_TIMEOUT',
    category: 'PAYMENT',
    severity: 'critical',
    message: 'Payment timed out after 90s',
    userMessage: 'Taking too long. Card NOT charged.',
    action: { type: 'toast', message: 'Taking too long. Card NOT charged.', duration: 6000 },
  }),

  holdExpired: (): AppError => ({
    code: 'PAYMENT_HOLD_EXPIRED',
    category: 'PAYMENT',
    severity: 'warning',
    message: 'Price hold has expired',
    userMessage: 'Price expired. Refresh to continue.',
    action: { type: 'toast', message: 'Price expired. Refresh to continue.', duration: 5000 },
  }),
};

// ─────────────────────────────────────────────────
// BOOKING Errors
// ─────────────────────────────────────────────────

export const BookingErrors = {
  soldOut: (): AppError => ({
    code: 'BOOKING_SOLD_OUT',
    category: 'BOOKING',
    severity: 'error',
    message: 'Item is no longer available',
    userMessage: 'No longer available. Try similar.',
    action: { type: 'toast', message: 'No longer available. Try similar.', duration: 5000 },
  }),

  priceChanged: (newPrice: string): AppError => ({
    code: 'BOOKING_PRICE_CHANGED',
    category: 'BOOKING',
    severity: 'warning',
    message: `Price changed to ${newPrice}`,
    userMessage: `Price changed to ${newPrice}. Accept?`,
    action: {
      type: 'confirm',
      title: 'Price Changed',
      message: `The price has changed to ${newPrice}. Do you want to continue?`,
      onConfirm: () => {},
      onCancel: () => {},
    },
    meta: { newPrice },
  }),

  holdExpired: (): AppError => ({
    code: 'BOOKING_HOLD_EXPIRED',
    category: 'BOOKING',
    severity: 'warning',
    message: 'Booking hold has expired',
    userMessage: 'Hold expired. Returning to cart.',
    action: { type: 'navigate', route: '/(trip)/plan' },
  }),
};

// ─────────────────────────────────────────────────
// FORM Validation Errors
// ─────────────────────────────────────────────────

export const FormErrors = {
  emailInvalid: (): AppError => ({
    code: 'FORM_EMAIL_INVALID',
    category: 'FORM',
    severity: 'warning',
    message: 'Invalid email format',
    userMessage: 'Invalid email address',
    action: { type: 'inline', field: 'email', message: 'Invalid email address' },
  }),

  passwordWeak: (): AppError => ({
    code: 'FORM_PASSWORD_WEAK',
    category: 'FORM',
    severity: 'warning',
    message: 'Password does not meet strength requirements',
    userMessage: 'Password too weak',
    action: { type: 'inline', field: 'password', message: 'Password too weak' },
  }),

  passwordsNoMatch: (): AppError => ({
    code: 'FORM_PASSWORDS_NO_MATCH',
    category: 'FORM',
    severity: 'warning',
    message: 'Password confirmation does not match',
    userMessage: "Passwords don't match",
    action: { type: 'inline', field: 'confirmPassword', message: "Passwords don't match" },
  }),

  under18: (): AppError => ({
    code: 'FORM_UNDER_18',
    category: 'FORM',
    severity: 'error',
    message: 'User is under 18 years old',
    userMessage: 'Must be 18 or older',
    action: { type: 'inline', field: 'dateOfBirth', message: 'Must be 18 or older' },
  }),
};

// ─────────────────────────────────────────────────
// UPLOAD Errors
// ─────────────────────────────────────────────────

export const UploadErrors = {
  fileTooLarge: (maxSizeMB: number = 5): AppError => ({
    code: 'UPLOAD_FILE_TOO_LARGE',
    category: 'UPLOAD',
    severity: 'warning',
    message: `File exceeds ${maxSizeMB}MB limit`,
    userMessage: `Image too large. Max ${maxSizeMB}MB.`,
    action: { type: 'toast', message: `Image too large. Max ${maxSizeMB}MB.` },
  }),

  uploadFailed: (onRetry: () => void): AppError => ({
    code: 'UPLOAD_FAILED',
    category: 'UPLOAD',
    severity: 'error',
    message: 'File upload failed',
    userMessage: 'Upload failed. Try again.',
    action: { type: 'retry', message: 'Upload failed. Try again.', onRetry },
  }),
};

// ─────────────────────────────────────────────────
// LOCATION Errors
// ─────────────────────────────────────────────────

export const LocationErrors = {
  permissionDenied: (): AppError => ({
    code: 'LOCATION_PERMISSION_DENIED',
    category: 'LOCATION',
    severity: 'warning',
    message: 'Location permission was denied',
    userMessage: 'Enable location for auto check-in',
    action: {
      type: 'banner',
      message: 'Enable location for auto check-in',
      actionLabel: 'Settings',
    },
  }),

  gpsUnavailable: (): AppError => ({
    code: 'LOCATION_GPS_UNAVAILABLE',
    category: 'LOCATION',
    severity: 'info',
    message: 'GPS signal not available',
    userMessage: 'GPS unavailable. Using manual check-in.',
    action: { type: 'toast', message: 'GPS unavailable. Using manual check-in.' },
  }),
};

// ─────────────────────────────────────────────────
// EMPTY STATES (per screen)
// ─────────────────────────────────────────────────

export interface EmptyState {
  screenId: string;
  emoji: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionRoute?: string;
}

export const EmptyStates: Record<string, EmptyState> = {
  // S57 - My Trips (no trips)
  trips: {
    screenId: 'S57',
    emoji: '✈️',
    title: 'No trips yet',
    description: 'Plan your first trip and start exploring the world!',
    actionLabel: 'Plan Your First Trip',
    actionRoute: '/(tabs)/explore',
  },

  // S84 - Messages (no messages)
  messages: {
    screenId: 'S84',
    emoji: '💬',
    title: 'No messages yet',
    description: 'Connect with travelers to start chatting.',
    actionLabel: 'Find Travel Buddies',
    actionRoute: '/(social)/discover',
  },

  // S17 - Wishlist (empty)
  wishlist: {
    screenId: 'S17',
    emoji: '❤️',
    title: 'Wishlist is empty',
    description: 'Save places you love and plan them later.',
    actionLabel: 'Explore Destinations',
    actionRoute: '/(tabs)/explore',
  },

  // S78 - Social Feed (empty)
  feed: {
    screenId: 'S78',
    emoji: '📱',
    title: 'Your feed is empty',
    description: 'Follow travelers to see their posts and travel stories.',
    actionLabel: 'Discover Travelers',
    actionRoute: '/(social)/discover',
  },

  // S91 - Points (zero points)
  points: {
    screenId: 'S91',
    emoji: '🏆',
    title: 'No points yet',
    description: 'Book your first trip to earn points and unlock rewards!',
    actionLabel: 'Start Earning',
    actionRoute: '/(trip)/points/earn',
  },

  // Additional empty states
  notifications: {
    screenId: 'notifications',
    emoji: '🔔',
    title: 'All caught up!',
    description: "You don't have any notifications right now.",
  },

  searchResults: {
    screenId: 'search',
    emoji: '🔍',
    title: 'No results found',
    description: 'Try adjusting your search or filters.',
  },

  buddies: {
    screenId: 'buddies',
    emoji: '👥',
    title: 'No travel buddies yet',
    description: 'Connect with like-minded travelers.',
    actionLabel: 'Find Buddies',
    actionRoute: '/(social)/discover',
  },

  events: {
    screenId: 'events',
    emoji: '🎉',
    title: 'No events nearby',
    description: 'Check back later for events in your area.',
  },

  groups: {
    screenId: 'groups',
    emoji: '👥',
    title: 'No groups yet',
    description: 'Join or create a travel group.',
    actionLabel: 'Create Group',
  },

  transactions: {
    screenId: 'transactions',
    emoji: '💳',
    title: 'No transactions yet',
    description: 'Your transaction history will appear here.',
  },

  memories: {
    screenId: 'memories',
    emoji: '📸',
    title: 'No memories yet',
    description: 'Start capturing moments from your trip!',
    actionLabel: 'Add Memory',
  },

  reviews: {
    screenId: 'reviews',
    emoji: '⭐',
    title: 'No reviews yet',
    description: 'Share your travel experiences with others.',
  },

  badges: {
    screenId: 'badges',
    emoji: '🏅',
    title: 'No badges yet',
    description: 'Complete challenges to earn badges!',
    actionLabel: 'View Challenges',
    actionRoute: '/(trip)/points/challenges',
  },

  leaderboard: {
    screenId: 'leaderboard',
    emoji: '📊',
    title: 'Leaderboard loading',
    description: 'Check back soon to see the rankings.',
  },
};

// ─────────────────────────────────────────────────
// OFFLINE MODE
// ─────────────────────────────────────────────────

export const OfflineMode = {
  /** Screens that work offline */
  availableOffline: [
    'S42', // Emergency
    'trip-data-cached', // Cached trip data
    'checklist', // Pre-trip checklist (cached)
    'documents', // Travel documents (cached)
    'timeline', // Today's timeline (cached)
  ],

  /** Actions blocked offline */
  blockedOffline: [
    'payments',
    'booking',
    'search',
    'social-feed',
    'messages-send',
    'upload',
  ],

  /** Badge message for offline mode */
  badgeMessage: 'Offline — limited functionality',

  /** Check if a screen/action is available offline */
  isAvailableOffline(screenId: string): boolean {
    return this.availableOffline.includes(screenId);
  },

  /** Check if an action is blocked offline */
  isBlockedOffline(action: string): boolean {
    return this.blockedOffline.includes(action);
  },

  /** Get the offline error for a blocked action */
  getBlockedError(action: string): AppError {
    return {
      code: 'OFFLINE_BLOCKED',
      category: 'OFFLINE',
      severity: 'warning',
      message: `${action} is not available offline`,
      userMessage: `${action} requires an internet connection.`,
      action: { type: 'toast', message: `${action} requires an internet connection.` },
    };
  },
};

// ─────────────────────────────────────────────────
// Error Handler (central dispatcher)
// ─────────────────────────────────────────────────

export function handleError(error: AppError): void {
  // Log error for monitoring
  console.error(`[${error.category}] ${error.code}: ${error.message}`);

  if (!error.action) return;

  switch (error.action.type) {
    case 'toast':
      toast.show(
        error.severity === 'info' ? 'info' : error.severity === 'warning' ? 'warning' : 'error',
        error.action.message,
        error.action.duration || 3000
      );
      break;

    case 'modal':
      router.push(error.action.modalId as any);
      break;

    case 'overlay':
      // NoInternetOverlay is handled by the root layout via NetInfo listener
      // This triggers the global state
      globalErrorState.setOverlay(error.action.component);
      break;

    case 'inline':
      // Inline errors are returned to the form — handled by the caller
      break;

    case 'shake':
      // Shake animation is handled by the component — handled by the caller
      break;

    case 'navigate':
      router.replace(error.action.route as any);
      break;

    case 'banner':
      // Banner is shown at the top of the screen
      globalErrorState.setBanner(error.action.message, error.action.actionLabel);
      break;

    case 'retry':
      toast.show('error', error.action.message);
      break;

    case 'confirm':
      globalErrorState.setConfirm(
        error.action.title,
        error.action.message,
        error.action.onConfirm,
        error.action.onCancel
      );
      break;
  }
}

// ─────────────────────────────────────────────────
// Global Error State (for overlays, banners, confirms)
// ─────────────────────────────────────────────────

type OverlayListener = (overlay: string | null) => void;
type BannerListener = (banner: { message: string; actionLabel?: string } | null) => void;
type ConfirmListener = (confirm: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
} | null) => void;

class GlobalErrorState {
  private overlayListeners: Set<OverlayListener> = new Set();
  private bannerListeners: Set<BannerListener> = new Set();
  private confirmListeners: Set<ConfirmListener> = new Set();

  // Overlay
  subscribeOverlay(listener: OverlayListener) {
    this.overlayListeners.add(listener);
    return () => this.overlayListeners.delete(listener);
  }

  setOverlay(component: string | null) {
    this.overlayListeners.forEach((l) => l(component));
  }

  // Banner
  subscribeBanner(listener: BannerListener) {
    this.bannerListeners.add(listener);
    return () => this.bannerListeners.delete(listener);
  }

  setBanner(message: string, actionLabel?: string) {
    this.bannerListeners.forEach((l) => l({ message, actionLabel }));
  }

  dismissBanner() {
    this.bannerListeners.forEach((l) => l(null));
  }

  // Confirm Dialog
  subscribeConfirm(listener: ConfirmListener) {
    this.confirmListeners.add(listener);
    return () => this.confirmListeners.delete(listener);
  }

  setConfirm(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) {
    this.confirmListeners.forEach((l) =>
      l({ title, message, onConfirm, onCancel })
    );
  }

  dismissConfirm() {
    this.confirmListeners.forEach((l) => l(null));
  }
}

export const globalErrorState = new GlobalErrorState();

// ─────────────────────────────────────────────────
// tRPC Error Mapper
// ─────────────────────────────────────────────────

export function mapTRPCError(error: any): AppError {
  const code = error?.data?.code || error?.code || '';
  const httpStatus = error?.data?.httpStatus || error?.status || 0;
  const message = error?.message || '';

  // Auth errors
  if (code === 'UNAUTHORIZED' || httpStatus === 401) {
    return AuthErrors.tokenExpired();
  }

  // Network errors
  if (message.includes('timeout') || message.includes('TIMEOUT')) {
    return NetworkErrors.timeout();
  }
  if (message.includes('Network request failed') || message.includes('fetch failed')) {
    return NetworkErrors.noConnection();
  }
  if (httpStatus >= 500) {
    return NetworkErrors.serverError(httpStatus);
  }

  // Payment errors
  if (code === 'card_declined') return PaymentErrors.cardDeclined();
  if (code === 'insufficient_funds') return PaymentErrors.insufficientFunds();
  if (code === 'expired_card') return PaymentErrors.expiredCard();
  if (code === '3ds_failed') return PaymentErrors.threeDSFailed();
  if (code === 'payment_timeout') return PaymentErrors.timeout();
  if (code === 'hold_expired') return PaymentErrors.holdExpired();

  // Booking errors
  if (code === 'sold_out') return BookingErrors.soldOut();
  if (code === 'price_changed') {
    return BookingErrors.priceChanged(error?.data?.newPrice || 'unknown');
  }
  if (code === 'booking_hold_expired') return BookingErrors.holdExpired();

  // Default: generic server error
  return NetworkErrors.serverError(httpStatus || 500);
}

// ─────────────────────────────────────────────────
// Utility: Wrap async calls with error handling
// ─────────────────────────────────────────────────

export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options?: {
    timeoutMs?: number;
    onError?: (error: AppError) => void;
    offlineAction?: string;
  }
): Promise<T | null> {
  const { timeoutMs = 10000, onError, offlineAction } = options || {};

  // Check offline
  if (offlineAction && OfflineMode.isBlockedOffline(offlineAction)) {
    const error = OfflineMode.getBlockedError(offlineAction);
    handleError(error);
    onError?.(error);
    return null;
  }

  try {
    const result = await Promise.race([
      fn(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs)
      ),
    ]);
    return result;
  } catch (err: any) {
    const appError =
      err?.message === 'TIMEOUT'
        ? NetworkErrors.timeout()
        : mapTRPCError(err);

    handleError(appError);
    onError?.(appError);
    return null;
  }
}

// ─────────────────────────────────────────────────
// Utility: Password strength checker
// ─────────────────────────────────────────────────

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export function checkPasswordStrength(password: string): {
  strength: PasswordStrength;
  score: number; // 0-4
  feedback: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const strength: PasswordStrength =
    score <= 1 ? 'weak' : score === 2 ? 'fair' : score === 3 ? 'good' : 'strong';

  const feedback =
    strength === 'weak'
      ? 'Add uppercase, numbers, and symbols'
      : strength === 'fair'
      ? 'Getting better. Add more variety.'
      : strength === 'good'
      ? 'Good password!'
      : 'Strong password!';

  return { strength, score: Math.min(score, 4), feedback };
}

// ─────────────────────────────────────────────────
// Utility: File size validator
// ─────────────────────────────────────────────────

export function validateFileSize(
  fileSizeBytes: number,
  maxSizeMB: number = 5
): AppError | null {
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (fileSizeBytes > maxBytes) {
    return UploadErrors.fileTooLarge(maxSizeMB);
  }
  return null;
}

// ─────────────────────────────────────────────────
// Utility: Age validator
// ─────────────────────────────────────────────────

export function validateAge(dateOfBirth: Date, minAge: number = 18): AppError | null {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  const actualAge =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
      ? age - 1
      : age;

  if (actualAge < minAge) {
    return FormErrors.under18();
  }
  return null;
}
