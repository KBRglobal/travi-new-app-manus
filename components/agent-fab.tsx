import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface AgentFABProps {
  /** Extra bottom offset — useful when a tab bar is present (default: 72) */
  tabBarOffset?: number;
}

/**
 * Floating Action Button that opens the TRAVI AI Agent chat.
 * Place it as the last child inside the screen's root View (position: absolute).
 */
export function AgentFAB({ tabBarOffset = 72 }: AgentFABProps) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 16) + tabBarOffset;

  return (
    <TouchableOpacity
      style={[styles.fab, { bottom }]}
      onPress={() => {
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        router.push("/(agent)/chat" as never);
      }}
      activeOpacity={0.88}
    >
      <LinearGradient
        colors={["#7C3AED", "#9333EA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.border} />
      <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
      <Text style={styles.label}>Agent</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 99,
  },
  border: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(192,132,252,0.4)",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
