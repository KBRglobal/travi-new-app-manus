/**
 * TRAVI — Deep Linking Configuration
 * 
 * Handles both custom scheme (travi://) and universal links (https://travi.app/).
 * Integrates with expo-router for automatic route resolution.
 * 
 * Supported deep links:
 * - travi://home → Home tab
 * - travi://trip/{tripId} → Trip detail
 * - travi://destination/{id} → Destination detail
 * - travi://explore → Explore tab
 * - travi://wallet → Wallet tab
 * - travi://profile → Profile tab
 * - travi://chat → AI Chat
 * - travi://live/{tripId} → Live trip mode
 * - travi://points → Points & rewards
 * - travi://settings → Settings
 * - travi://invite/{code} → Referral invite
 */
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useAuthStore } from '../stores/authStore';

// ─── URL Parsing ───

export interface DeepLinkParams {
  screen: string;
  params: Record<string, string>;
}

/**
 * Parse a deep link URL into a screen name and parameters.
 */
export function parseDeepLink(url: string): DeepLinkParams | null {
  try {
    const parsed = Linking.parse(url);
    const path = parsed.path || '';
    const queryParams = parsed.queryParams || {};

    // Map URL paths to expo-router routes
    const routeMap: Record<string, string> = {
      'home': '/(tabs)/home',
      'explore': '/(tabs)/explore',
      'wallet': '/(tabs)/wallet',
      'profile': '/(tabs)/profile',
      'points': '/(tabs)/points',
      'chat': '/_modals/ai-chat',
      'settings': '/(trip)/settings',
    };

    // Handle parameterized routes
    if (path.startsWith('trip/')) {
      const tripId = path.split('/')[1];
      return { screen: '/(trip)/plan', params: { tripId, ...queryParams as Record<string, string> } };
    }

    if (path.startsWith('destination/')) {
      const id = path.split('/')[1];
      return { screen: '/(tabs)/home/destination/[id]', params: { id, ...queryParams as Record<string, string> } };
    }

    if (path.startsWith('live/')) {
      const tripId = path.split('/')[1];
      return { screen: '/(live)/[tripId]', params: { tripId, ...queryParams as Record<string, string> } };
    }

    if (path.startsWith('invite/')) {
      const code = path.split('/')[1];
      return { screen: '/(trip)/points/referrals', params: { code, ...queryParams as Record<string, string> } };
    }

    // Static routes
    const route = routeMap[path];
    if (route) {
      return { screen: route, params: queryParams as Record<string, string> };
    }

    return null;
  } catch (error) {
    console.error('[DeepLink] Failed to parse URL:', url, error);
    return null;
  }
}

/**
 * Handle an incoming deep link by navigating to the appropriate screen.
 */
export function handleDeepLink(url: string): void {
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated) {
    // Store the deep link to handle after authentication
    pendingDeepLink = url;
    console.log('[DeepLink] User not authenticated, storing pending link:', url);
    return;
  }

  const parsed = parseDeepLink(url);
  if (!parsed) {
    console.warn('[DeepLink] Unknown deep link:', url);
    return;
  }

  console.log('[DeepLink] Navigating to:', parsed.screen, parsed.params);

  try {
    router.push({
      pathname: parsed.screen as any,
      params: parsed.params,
    });
  } catch (error) {
    console.error('[DeepLink] Navigation failed:', error);
  }
}

// ─── Pending Deep Link ───

let pendingDeepLink: string | null = null;

/**
 * Process any pending deep link after authentication.
 * Call this after successful login/signup.
 */
export function processPendingDeepLink(): void {
  if (pendingDeepLink) {
    const url = pendingDeepLink;
    pendingDeepLink = null;
    handleDeepLink(url);
  }
}

/**
 * Check if there's a pending deep link.
 */
export function hasPendingDeepLink(): boolean {
  return pendingDeepLink !== null;
}

// ─── Link Generation ───

/**
 * Generate a shareable deep link URL.
 */
export function createDeepLink(path: string, params?: Record<string, string>): string {
  const baseUrl = 'https://travi.app';
  const queryString = params
    ? '?' + Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
    : '';
  return `${baseUrl}/${path}${queryString}`;
}

/**
 * Generate a trip share link.
 */
export function createTripShareLink(tripId: string): string {
  return createDeepLink(`trip/${tripId}`);
}

/**
 * Generate a destination share link.
 */
export function createDestinationShareLink(destinationId: string): string {
  return createDeepLink(`destination/${destinationId}`);
}

/**
 * Generate a referral invite link.
 */
export function createReferralLink(code: string): string {
  return createDeepLink(`invite/${code}`);
}

// ─── URL Listener Setup ───

/**
 * Set up the deep link listener. Call this in the root layout.
 * Returns a cleanup function.
 */
export function setupDeepLinkListener(): () => void {
  // Handle URL that launched the app
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('[DeepLink] App launched with URL:', url);
      handleDeepLink(url);
    }
  });

  // Handle URLs while app is running
  const subscription = Linking.addEventListener('url', (event) => {
    console.log('[DeepLink] Received URL:', event.url);
    handleDeepLink(event.url);
  });

  return () => {
    subscription.remove();
  };
}
