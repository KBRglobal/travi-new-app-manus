/**
 * TRAVI — Analytics Module
 * Amplitude-ready event tracking.
 *
 * Usage:
 *   import { track } from "@/lib/analytics";
 *   track("dna_swipe", { direction: "right", destination: "Paris", category: "food" });
 *
 * To connect Amplitude:
 *   1. Install: pnpm add @amplitude/analytics-react-native
 *   2. Set EXPO_PUBLIC_AMPLITUDE_KEY in .env
 *   3. Uncomment the Amplitude init block below
 */

// ─── Event Types ──────────────────────────────────────────────────────────────

export type TraviEvent =
  // DNA & Discovery
  | "dna_swipe"
  | "dna_quiz_complete"
  | "dna_profile_view"
  | "dna_evolution_view"
  | "destination_view"
  | "destination_save"
  | "destination_share"
  // Booking Funnel
  | "booking_start"
  | "booking_flight_select"
  | "booking_hotel_select"
  | "booking_activity_add"
  | "booking_checkout_start"
  | "booking_checkout_complete"
  | "booking_checkout_abandon"
  // Wallet & Cashback
  | "wallet_view"
  | "cashback_earned"
  | "cashback_redeem"
  | "wallet_topup"
  | "wallet_withdraw"
  // Social
  | "invite_partner"
  | "compatibility_check"
  | "community_post_view"
  | "community_post_create"
  // Live Mode
  | "live_mode_enter"
  | "live_mode_exit"
  | "itinerary_view"
  | "map_open"
  | "expense_add"
  | "split_payment_create"
  // AI Agent
  | "ai_chat_open"
  | "ai_suggestion_accept"
  | "ai_suggestion_reject"
  // Onboarding
  | "onboarding_start"
  | "onboarding_step_complete"
  | "onboarding_complete"
  | "onboarding_skip"
  // Auth
  | "signup_start"
  | "signup_complete"
  | "login"
  | "logout"
  // Settings
  | "language_change"
  | "notifications_toggle"
  | "subscription_view"
  | "subscription_upgrade"
  // Errors
  | "error_no_internet"
  | "error_api_failure"
  | "error_payment_failed";

export type EventProperties = Record<string, string | number | boolean | null | undefined>;

// ─── Analytics Queue (for offline support) ───────────────────────────────────

const eventQueue: Array<{ event: TraviEvent; props: EventProperties; ts: number }> = [];
let isAmplitudeReady = false;

// ─── Amplitude Integration (uncomment when ready) ────────────────────────────
/*
import * as amplitude from "@amplitude/analytics-react-native";

const AMPLITUDE_KEY = process.env.EXPO_PUBLIC_AMPLITUDE_KEY || "";

export async function initAnalytics(userId?: string) {
  if (!AMPLITUDE_KEY) {
    console.warn("[Analytics] No Amplitude key set. Events will be queued.");
    return;
  }
  await amplitude.init(AMPLITUDE_KEY, userId, {
    trackingOptions: {
      ipAddress: false, // GDPR compliance
    },
  }).promise;
  isAmplitudeReady = true;
  // Flush queued events
  eventQueue.forEach(({ event, props }) => {
    amplitude.track(event, props);
  });
  eventQueue.length = 0;
}

export function identifyUser(userId: string, traits?: Record<string, string>) {
  const identify = new amplitude.Identify();
  if (traits) {
    Object.entries(traits).forEach(([key, value]) => {
      identify.set(key, value);
    });
  }
  amplitude.setUserId(userId);
  amplitude.identify(identify);
}
*/

// ─── Core Track Function ──────────────────────────────────────────────────────

/**
 * Track an analytics event.
 * In development: logs to console.
 * In production: sends to Amplitude (when key is set).
 */
export function track(event: TraviEvent, properties?: EventProperties): void {
  const props: EventProperties = {
    ...properties,
    platform: "mobile",
    timestamp: Date.now(),
  };

  if (__DEV__) {
    console.log(`[Analytics] ${event}`, props);
  }

  if (isAmplitudeReady) {
    // amplitude.track(event, props);
  } else {
    // Queue for when Amplitude is ready
    eventQueue.push({ event, props, ts: Date.now() });
    // Keep queue bounded
    if (eventQueue.length > 100) eventQueue.shift();
  }
}

// ─── Convenience Helpers ──────────────────────────────────────────────────────

/** Track a DNA swipe event */
export function trackDnaSwipe(
  direction: "right" | "left" | "up",
  destination: string,
  category?: string,
  hesitationMs?: number
) {
  track("dna_swipe", {
    direction,
    destination,
    category: category || "unknown",
    hesitation_ms: hesitationMs,
    is_love: direction === "right",
    is_save: direction === "up",
  });
}

/** Track booking funnel step */
export function trackBookingStep(
  step: "start" | "flight" | "hotel" | "activity" | "checkout" | "complete" | "abandon",
  destination?: string,
  value?: number
) {
  const eventMap: Record<string, TraviEvent> = {
    start: "booking_start",
    flight: "booking_flight_select",
    hotel: "booking_hotel_select",
    activity: "booking_activity_add",
    checkout: "booking_checkout_start",
    complete: "booking_checkout_complete",
    abandon: "booking_checkout_abandon",
  };
  track(eventMap[step], { destination, booking_value: value });
}

/** Track cashback event */
export function trackCashback(
  type: "earned" | "redeem",
  amount: number,
  currency = "USD"
) {
  track(type === "earned" ? "cashback_earned" : "cashback_redeem", {
    amount,
    currency,
  });
}

/** Track AI agent interaction */
export function trackAI(
  action: "open" | "accept" | "reject",
  suggestionType?: string
) {
  const eventMap: Record<string, TraviEvent> = {
    open: "ai_chat_open",
    accept: "ai_suggestion_accept",
    reject: "ai_suggestion_reject",
  };
  track(eventMap[action], { suggestion_type: suggestionType });
}

/** Track error screen shown */
export function trackError(
  type: "no_internet" | "api_failure" | "payment_failed",
  context?: string
) {
  const eventMap: Record<string, TraviEvent> = {
    no_internet: "error_no_internet",
    api_failure: "error_api_failure",
    payment_failed: "error_payment_failed",
  };
  track(eventMap[type], { context });
}

/** Track language change */
export function trackLanguageChange(from: string, to: string) {
  track("language_change", { from_language: from, to_language: to });
}

// ─── Screen View Tracking ─────────────────────────────────────────────────────

/**
 * Track screen views automatically.
 * Call this in each screen's useEffect or useFocusEffect.
 *
 * Example:
 *   useFocusEffect(() => { trackScreen("Home"); });
 */
export function trackScreen(screenName: string, properties?: EventProperties) {
  if (__DEV__) {
    console.log(`[Analytics] Screen: ${screenName}`, properties);
  }
  // amplitude.logEvent("screen_view", { screen_name: screenName, ...properties });
}
