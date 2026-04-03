/**
 * TRAVI — Mode Awareness Badge
 * Design Bible v3.0 — Part 10, Rule 10
 *
 * Persistent header pill, color matches current mode, always visible.
 * Emergency exit always one tap away.
 *
 * Modes:
 *   discovery  — Purple #6443F4
 *   planning   — Pink #F94498
 *   live       — Green #02A65C
 *   post-trip  — Purple #6443F4 (with orange accent)
 */

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AppMode = "discovery" | "planning" | "live" | "post-trip";

interface ModeConfig {
  label: string;
  color: string;
  icon: string;
  bgColor: string;
}

const MODE_CONFIG: Record<AppMode, ModeConfig> = {
  discovery: {
    label: "Discovery",
    color: "#FFFFFF",
    icon: "explore",
    bgColor: "#6443F4",
  },
  planning: {
    label: "Planning",
    color: "#FFFFFF",
    icon: "map",
    bgColor: "#F94498",
  },
  live: {
    label: "Live",
    color: "#FFFFFF",
    icon: "location-on",
    bgColor: "#02A65C",
  },
  "post-trip": {
    label: "Post-Trip",
    color: "#FFFFFF",
    icon: "star",
    bgColor: "#6443F4",
  },
};

// ─── Mode Badge Component ─────────────────────────────────────────────────────
export interface ModeBadgeProps {
  mode: AppMode;
  showEmergencyExit?: boolean;
  onEmergencyExit?: () => void;
}

export function ModeBadge({
  mode,
  showEmergencyExit = false,
  onEmergencyExit,
}: ModeBadgeProps) {
  const router = useRouter();
  const config = MODE_CONFIG[mode];

  // Pulse animation for Live mode
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (mode === "live") {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [mode]);

  const handleEmergencyExit = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (onEmergencyExit) {
      onEmergencyExit();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={s.container}>
      {/* Emergency Exit — top-left, always visible in non-Discovery modes */}
      {showEmergencyExit && mode !== "discovery" && (
        <TouchableOpacity
          onPress={handleEmergencyExit}
          style={s.emergencyExit}
          accessibilityLabel="Return to Discovery"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons name="home" size={22} color="#A79FB2" />
        </TouchableOpacity>
      )}

      {/* Mode pill */}
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <View
          style={[
            s.pill,
            { backgroundColor: config.bgColor + "22", borderColor: config.bgColor + "60" },
          ]}
        >
          {/* Live mode dot */}
          {mode === "live" && (
            <View style={s.liveDot} />
          )}
          <MaterialIcons
            name={config.icon as any}
            size={12}
            color={config.bgColor}
          />
          <Text style={[s.pillText, { color: config.bgColor }]}>
            {config.label}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emergencyExit: {
    padding: 4,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#02A65C",
    marginRight: 2,
  },
});
