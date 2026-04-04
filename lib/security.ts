/* ═══════════════════════════════════════════
 *  TRAVI — Security Configuration
 *  8 security items from Phase 2 spec
 * ═══════════════════════════════════════════ */

import { Platform } from 'react-native';

// ─── 1. Secure Storage (expo-secure-store) ───

let SecureStore: any = null;

async function getSecureStore() {
  if (!SecureStore) {
    try {
      SecureStore = require('expo-secure-store');
    } catch {
      // Fallback for web
      SecureStore = {
        getItemAsync: async (key: string) => {
          try { return localStorage.getItem(key); } catch { return null; }
        },
        setItemAsync: async (key: string, value: string) => {
          try { localStorage.setItem(key, value); } catch {}
        },
        deleteItemAsync: async (key: string) => {
          try { localStorage.removeItem(key); } catch {}
        },
      };
    }
  }
  return SecureStore;
}

export const secureStorage = {
  async get(key: string): Promise<string | null> {
    const store = await getSecureStore();
    return store.getItemAsync(key);
  },

  async set(key: string, value: string): Promise<void> {
    const store = await getSecureStore();
    await store.setItemAsync(key, value);
  },

  async delete(key: string): Promise<void> {
    const store = await getSecureStore();
    await store.deleteItemAsync(key);
  },

  // Token management
  async getToken(): Promise<string | null> {
    return this.get('auth_token');
  },

  async setToken(token: string): Promise<void> {
    return this.set('auth_token', token);
  },

  async getRefreshToken(): Promise<string | null> {
    return this.get('refresh_token');
  },

  async setRefreshToken(token: string): Promise<void> {
    return this.set('refresh_token', token);
  },

  async clearTokens(): Promise<void> {
    await this.delete('auth_token');
    await this.delete('refresh_token');
  },
};

// ─── 2. Rate Limiting (Client-side) ───

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimits: Map<string, RateLimitEntry> = new Map();

export function checkRateLimit(
  key: string,
  maxRequests: number = 60,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimits.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetIn: entry.resetAt - now };
}

// ─── 3. Input Sanitization ───

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JS protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ─── 4. SSL Pinning Config ───

export const SSL_PINNING_CONFIG = {
  'api.travi.app': {
    includeSubdomains: true,
    publicKeyHashes: [
      // SHA-256 hashes of the server's public key
      // Replace with actual hashes in production
      'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=',
    ],
  },
};

// ─── 5. Biometric Authentication ───

export async function authenticateWithBiometrics(): Promise<boolean> {
  if (Platform.OS === 'web') return true;

  try {
    const LocalAuth = require('expo-local-authentication');
    const hasHardware = await LocalAuth.hasHardwareAsync();
    if (!hasHardware) return true; // Skip if no hardware

    const isEnrolled = await LocalAuth.isEnrolledAsync();
    if (!isEnrolled) return true; // Skip if not enrolled

    const result = await LocalAuth.authenticateAsync({
      promptMessage: 'Authenticate to continue',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

    return result.success;
  } catch {
    return true; // Fail open for prototype
  }
}

// ─── 6. Environment Variables ───

export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.travi.app',
  WS_URL: process.env.EXPO_PUBLIC_WS_URL || 'wss://ws.travi.app',
  STRIPE_KEY: process.env.EXPO_PUBLIC_STRIPE_KEY || 'pk_test_mock',
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN || '',
  MAPS_KEY: process.env.EXPO_PUBLIC_MAPS_KEY || '',
  BRANCH_KEY: process.env.EXPO_PUBLIC_BRANCH_KEY || '',
  ENV: process.env.EXPO_PUBLIC_ENV || 'development',
  IS_DEV: (process.env.EXPO_PUBLIC_ENV || 'development') === 'development',
};

// ─── 7. Request Headers ───

export function getAuthHeaders(token: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Client-Version': '1.0.0',
    'X-Platform': Platform.OS,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

// ─── 8. Data Encryption Helpers ───

// Simple obfuscation for sensitive data display
export function maskCardNumber(cardNumber: string): string {
  return '•••• •••• •••• ' + cardNumber.slice(-4);
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  const masked = local[0] + '•'.repeat(Math.max(1, local.length - 2)) + local[local.length - 1];
  return `${masked}@${domain}`;
}

export function maskPhone(phone: string): string {
  return '•'.repeat(phone.length - 4) + phone.slice(-4);
}

// ─── Session Management ───

let sessionTimeout: ReturnType<typeof setTimeout> | null = null;
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export function resetSessionTimer(onTimeout: () => void): void {
  if (sessionTimeout) clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(onTimeout, SESSION_TIMEOUT_MS);
}

export function clearSessionTimer(): void {
  if (sessionTimeout) {
    clearTimeout(sessionTimeout);
    sessionTimeout = null;
  }
}
