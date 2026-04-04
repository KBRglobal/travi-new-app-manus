/**
 * TRAVI — Haptic Feedback Utility
 * 
 * Provides consistent haptic feedback across the app.
 * Falls back gracefully on web/unsupported platforms.
 * 
 * Usage:
 *   haptic.light()    — tab switch, toggle, chip select
 *   haptic.medium()   — button press, card tap, swipe complete
 *   haptic.heavy()    — delete, error, important action
 *   haptic.success()  — booking confirmed, payment success
 *   haptic.warning()  — price change, hold expiring
 *   haptic.error()    — payment failed, validation error
 *   haptic.selection() — picker scroll, slider step
 */

import { Platform } from 'react-native';

// Try to import expo-haptics (may not be available on web)
let Haptics: any = null;
try {
  Haptics = require('expo-haptics');
} catch {
  // expo-haptics not available
}

const isSupported = Platform.OS !== 'web' && Haptics !== null;

export const haptic = {
  /** Light tap — tab switch, toggle, chip select */
  light() {
    if (isSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },

  /** Medium tap — button press, card tap, swipe complete */
  medium() {
    if (isSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  /** Heavy tap — delete, error, important action */
  heavy() {
    if (isSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  },

  /** Success — booking confirmed, payment success, level up */
  success() {
    if (isSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },

  /** Warning — price change, hold expiring, low balance */
  warning() {
    if (isSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  },

  /** Error — payment failed, validation error, wrong OTP */
  error() {
    if (isSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  },

  /** Selection — picker scroll, slider step, list reorder */
  selection() {
    if (isSupported) {
      Haptics.selectionAsync();
    }
  },
};
