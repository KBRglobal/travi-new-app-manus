import { View, ViewStyle, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle;
  gradient?: [string, string];
  borderColor?: string;
  padding?: number;
}

export function GlassCard({
  children,
  style,
  gradient = ["rgba(255,255,255,0.55)", "rgba(255,255,255,0.55)"],
  borderColor = "rgba(255,255,255,0.55)",
  padding = 18,
}: GlassCardProps) {
  return (
    <View style={[styles.card, { borderColor, padding }, style]}>
      <LinearGradient colors={gradient} style={StyleSheet.absoluteFillObject} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.5,
  },
});
