import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function GradientButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = "primary",
  size = "md",
}: GradientButtonProps) {
  const sizeStyles = {
    sm: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
    md: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 24 },
    lg: { paddingVertical: 18, paddingHorizontal: 36, borderRadius: 28 },
  };

  const textSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  if (variant === "outline") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.outlineButton, sizeStyles[size], disabled && styles.disabled, style]}
        activeOpacity={0.8}
      >
        <Text style={[styles.outlineText, { fontSize: textSizes[size] }, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === "ghost") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[sizeStyles[size], disabled && styles.disabled, style]}
        activeOpacity={0.7}
      >
        <Text style={[styles.ghostText, { fontSize: textSizes[size] }, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.wrapper, disabled && styles.disabled, style]}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={["#6443F4", "#F94498"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, sizeStyles[size]]}
      >
        <Text style={[styles.text, { fontSize: textSizes[size] }, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 28,
    overflow: "hidden",
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: "#6443F4",
    alignItems: "center",
    justifyContent: "center",
  },
  outlineText: {
    color: "#6443F4",
    fontWeight: "600",
  },
  ghostText: {
    color: "#A78BCA",
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.5,
  },
});
