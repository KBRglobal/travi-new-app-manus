/**
 * TRAVI — Error Screens (P0 Blockers)
 * Design Bible v3.0 — Appendix D
 *
 * Screens:
 *   NoInternetScreen   — Full-page, cloud-off icon, cached data note
 *   ApiFailureScreen   — Brand copy: "Our ducks are in a row... wrong."
 *   PaymentFailedScreen — Dynamic copy by error code
 *   SessionExpiredModal — Modal (not full-page)
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#1A0B2E",
  surface: "#24103E",
  purple: "#6443F4",
  pink: "#F94498",
  orange: "#FF9327",
  green: "#02A65C",
  white: "#FFFFFF",
  secondary: "#D3CFD8",
  tertiary: "#A79FB2",
  disabled: "#504065",
  glassBorder: "rgba(123, 68, 230, 0.3)",
  glass: "rgba(36, 16, 62, 0.6)",
} as const;

// ─── Gradient Button ──────────────────────────────────────────────────────────
function GradientButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: object;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[s.btnWrapper, style]}
    >
      <LinearGradient
        colors={["#6443F4", "#F94498"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={s.gradBtn}
      >
        <Text style={s.gradBtnText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Outline Button ───────────────────────────────────────────────────────────
function OutlineButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={s.outlineBtn}>
      <Text style={s.outlineBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Text Link Button ─────────────────────────────────────────────────────────
function TextLinkButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={s.textBtn}>
      <Text style={s.textBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── No Internet Screen ───────────────────────────────────────────────────────
export interface NoInternetScreenProps {
  onRetry: () => void;
  isLiveMode?: boolean; // shows "cached itinerary available" note
}

export function NoInternetScreen({ onRetry, isLiveMode }: NoInternetScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.fullScreen, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      {/* Cloud pattern overlay */}
      <View style={s.cloudOverlay} />

      <View style={s.centerContent}>
        {/* Icon */}
        <View style={s.iconContainer}>
          <MaterialIcons name="cloud-off" size={64} color={C.tertiary} />
        </View>

        {/* Title */}
        <Text style={s.errorTitle}>No internet connection</Text>

        {/* Message */}
        <Text style={s.errorMessage}>
          Check your connection and try again.{"\n"}Your work is saved.
        </Text>

        {/* Live mode note */}
        {isLiveMode && (
          <View style={s.cachedNote}>
            <MaterialIcons name="offline-bolt" size={16} color={C.orange} />
            <Text style={s.cachedNoteText}>
              Your trip itinerary is available offline
            </Text>
          </View>
        )}

        {/* CTA */}
        <GradientButton label="Retry" onPress={onRetry} style={{ marginTop: 32 }} />
      </View>
    </View>
  );
}

// ─── API Failure Screen ───────────────────────────────────────────────────────
export interface ApiFailureScreenProps {
  onRetry: () => void;
  onContactSupport?: () => void;
}

export function ApiFailureScreen({ onRetry, onContactSupport }: ApiFailureScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.fullScreen, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.centerContent}>
        {/* Icon */}
        <View style={s.iconContainer}>
          <MaterialIcons name="warning" size={64} color={C.orange} />
        </View>

        {/* Title */}
        <Text style={s.errorTitle}>Something went wrong</Text>

        {/* Brand copy — Design Bible spec */}
        <Text style={s.errorMessage}>
          Our ducks are in a row... wrong.{"\n"}Tap to retry.
        </Text>

        {/* CTAs */}
        <GradientButton label="Try Again" onPress={onRetry} style={{ marginTop: 32 }} />
        {onContactSupport && (
          <TextLinkButton label="Contact Support" onPress={onContactSupport} />
        )}
      </View>
    </View>
  );
}

// ─── Payment Failed Screen ────────────────────────────────────────────────────
export type PaymentErrorCode =
  | "card_declined"
  | "insufficient_funds"
  | "network_error"
  | "generic";

const PAYMENT_COPY: Record<PaymentErrorCode, string> = {
  card_declined: "Your card was declined. Try another payment method.",
  insufficient_funds: "Insufficient funds. Use another card or add funds.",
  network_error: "Connection lost. Your card was not charged.",
  generic: "Payment couldn't be processed. Please try again.",
};

export interface PaymentFailedScreenProps {
  errorCode?: PaymentErrorCode;
  onRetry: () => void;
  onChangePaymentMethod: () => void;
  onContactSupport?: () => void;
}

export function PaymentFailedScreen({
  errorCode = "generic",
  onRetry,
  onChangePaymentMethod,
  onContactSupport,
}: PaymentFailedScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.fullScreen, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.centerContent}>
        {/* Icon — credit card with X */}
        <View style={s.iconContainer}>
          <View style={s.cardIconWrapper}>
            <MaterialIcons name="credit-card" size={56} color={C.tertiary} />
            <View style={s.xBadge}>
              <MaterialIcons name="close" size={16} color={C.white} />
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={s.errorTitle}>Payment couldn't{"\n"}be processed</Text>

        {/* Dynamic message by error code */}
        <Text style={s.errorMessage}>{PAYMENT_COPY[errorCode]}</Text>

        {/* CTAs — Design Bible order */}
        <GradientButton label="Try Again" onPress={onRetry} style={{ marginTop: 32 }} />
        <OutlineButton label="Change Payment Method" onPress={onChangePaymentMethod} />
        {onContactSupport && (
          <TextLinkButton label="Contact Support" onPress={onContactSupport} />
        )}
      </View>
    </View>
  );
}

// ─── Session Expired Modal ────────────────────────────────────────────────────
export interface SessionExpiredModalProps {
  visible: boolean;
  onSignIn: () => void;
}

export function SessionExpiredModal({ visible, onSignIn }: SessionExpiredModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={s.modalOverlay}>
        <View style={s.modalCard}>
          {/* Icon */}
          <View style={s.modalIconContainer}>
            <MaterialIcons name="lock" size={32} color={C.purple} />
          </View>

          {/* Title */}
          <Text style={s.modalTitle}>Session expired</Text>

          {/* Message */}
          <Text style={s.modalMessage}>
            For your security, please sign in again.
          </Text>

          {/* CTA — no dismiss option per Design Bible */}
          <GradientButton label="Sign In" onPress={onSignIn} style={{ marginTop: 20 }} />
        </View>
      </View>
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  cloudOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(100, 67, 244, 0.03)",
  },
  centerContent: {
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
  },
  iconContainer: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  xBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: C.white,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 36,
  },
  errorMessage: {
    fontSize: 16,
    color: C.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  cachedNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 147, 39, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 147, 39, 0.3)",
  },
  cachedNoteText: {
    fontSize: 14,
    color: C.orange,
  },
  // Gradient button
  btnWrapper: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  gradBtn: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  gradBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
  },
  // Outline button
  outlineBtn: {
    width: "100%",
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: C.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: C.pink,
  },
  // Text link button
  textBtn: {
    marginTop: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  textBtnText: {
    fontSize: 14,
    color: C.tertiary,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    paddingHorizontal: 16,
  },
  modalCard: {
    width: "100%",
    backgroundColor: C.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: C.glassBorder,
    padding: 28,
    alignItems: "center",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  modalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(100, 67, 244, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: C.white,
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 15,
    color: C.secondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
