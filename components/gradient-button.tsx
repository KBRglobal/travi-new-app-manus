/**
 * TRAVI GradientButton
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable CTA button with purple→pink gradient and glow.
 *
 * Usage:
 *   <GradientButton label="Continue" onPress={handlePress} />
 *   <GradientButton label="Skip" variant="ghost" onPress={handleSkip} />
 */

import { Pressable, Text, StyleSheet, ActivityIndicator, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { DS } from "./screen-wrapper";

type ButtonVariant = "gradient" | "outline" | "ghost";

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconRight?: boolean;
  style?: ViewStyle;
  height?: number;
}

export function GradientButton({
  label,
  onPress,
  variant = "gradient",
  disabled = false,
  loading = false,
  icon,
  iconRight = true,
  style,
  height = 56,
}: GradientButtonProps) {
  if (variant === "ghost") {
    return (
      <Pressable
        style={({ pressed }) => [
          s.ghostBtn,
          { height, minHeight: height },
          pressed && { opacity: 0.6 },
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <Text style={s.ghostText}>{label}</Text>
      </Pressable>
    );
  }

  if (variant === "outline") {
    return (
      <Pressable
        style={({ pressed }) => [
          s.outlineBtn,
          { height },
          pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
          disabled && s.disabledBtn,
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator color={DS.purple} />
        ) : (
          <>
            {icon && !iconRight && (
              <MaterialIcons name={icon} size={20} color={DS.purple} style={{ marginRight: 8 }} />
            )}
            <Text style={s.outlineText}>{label}</Text>
            {icon && iconRight && (
              <MaterialIcons name={icon} size={20} color={DS.purple} style={{ marginLeft: 8 }} />
            )}
          </>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        s.gradBtn,
        { height },
        pressed && !disabled && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        disabled && s.disabledBtn,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <LinearGradient
        colors={disabled ? ["#2A1A4A", "#2A1A4A"] : DS.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={s.gradInner}
      >
        {loading ? (
          <ActivityIndicator color={DS.white} />
        ) : (
          <>
            {icon && !iconRight && (
              <MaterialIcons name={icon} size={20} color={DS.white} style={{ marginRight: 8 }} />
            )}
            <Text style={[s.gradText, disabled && { opacity: 0.4 }]}>{label}</Text>
            {icon && iconRight && (
              <MaterialIcons name={icon} size={20} color={DS.white} style={{ marginLeft: 8 }} />
            )}
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const s = StyleSheet.create({
  gradBtn: {
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: DS.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  gradInner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  gradText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: DS.white,
  },
  outlineBtn: {
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: DS.purple,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  outlineText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: DS.purple,
  },
  ghostBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  ghostText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    color: DS.muted,
  },
  disabledBtn: {
    opacity: 0.5,
  },
});
