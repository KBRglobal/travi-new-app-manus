/**
 * TRAVI GlassCard
 * ─────────────────────────────────────────────────────────────────────────────
 * Apple-style glass card for all screens.
 * Uses BlurView on native, fallback surface color on web.
 *
 * Usage:
 *   <GlassCard style={{ padding: 16 }}>
 *     <Text>Content</Text>
 *   </GlassCard>
 *
 *   <GlassCard variant="strong" borderColor={DS.pink}>
 *     ...
 *   </GlassCard>
 */

import { View, StyleSheet, type ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { Platform } from "react-native";
import { ReactNode } from "react";
import { DS } from "./screen-wrapper";

type GlassVariant = "default" | "strong" | "subtle";

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle;
  /** Border radius override (default: 20) */
  radius?: number;
  /** Border color override */
  borderColor?: string;
  /** Blur intensity: default=30, strong=50, subtle=15 */
  variant?: GlassVariant;
  /** Disable blur (use flat surface) */
  noBlur?: boolean;
}

const BLUR_INTENSITY: Record<GlassVariant, number> = {
  default: 30,
  strong: 50,
  subtle: 15,
};

const BG_COLOR: Record<GlassVariant, string> = {
  default: DS.surface,
  strong: DS.surfaceHigh,
  subtle: "rgba(36,16,62,0.35)",
};

export function GlassCard({
  children,
  style,
  radius = 20,
  borderColor = DS.border,
  variant = "default",
  noBlur = false,
}: GlassCardProps) {
  const borderStyle: ViewStyle = {
    borderRadius: radius,
    borderWidth: 1,
    borderColor,
    overflow: "hidden",
  };

  if (Platform.OS === "web" || noBlur) {
    return (
      <View
        style={[
          borderStyle,
          { backgroundColor: BG_COLOR[variant] },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <View style={[borderStyle, style]}>
      <BlurView
        intensity={BLUR_INTENSITY[variant]}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />
      <View style={{ backgroundColor: BG_COLOR[variant], borderRadius: radius }}>
        {children}
      </View>
    </View>
  );
}

export const glassStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Chillax-Bold",
    color: DS.white,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
    color: DS.secondary,
    marginBottom: 8,
  },
  value: {
    fontSize: 15,
    fontFamily: "Satoshi-Regular",
    color: DS.white,
  },
  muted: {
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    color: DS.muted,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(100,67,244,0.15)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.3)",
  },
  pillText: {
    fontSize: 12,
    fontFamily: "Satoshi-Medium",
    color: DS.purple,
  },
});
