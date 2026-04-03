// Screen 6 — Welcome to TRAVI — STATIC WIREFRAME
// Route: /welcome-travi | Mode: Auth/Onboarding
// Spec: Mascot 160x160, 3 feature pills (72px each), CTA, Skip link

import { View, Text, StyleSheet, Pressable } from "react-native";

export default function WelcomeTraviScreen() {
  return (
    <View style={s.root}>
      {/* Mascot — 160x160 */}
      <View style={s.mascot}>
        <Text style={s.mascotEmoji}>🦆</Text>
      </View>

      <Text style={s.title}>Welcome to TRAVI!</Text>
      <Text style={s.subtitle}>Here's what we can do together</Text>

      {/* 3 Feature pills — 72px each */}
      <View style={s.pillsContainer}>
        <View style={s.pill}>
          <Text style={s.pillIcon}>🧬</Text>
          <View style={s.pillContent}>
            <Text style={s.pillTitle}>Travel DNA</Text>
            <Text style={s.pillDesc}>Discover your unique travel personality</Text>
          </View>
        </View>

        <View style={s.pill}>
          <Text style={s.pillIcon}>🗺️</Text>
          <View style={s.pillContent}>
            <Text style={s.pillTitle}>Smart Planning</Text>
            <Text style={s.pillDesc}>AI-powered itineraries just for you</Text>
          </View>
        </View>

        <View style={s.pill}>
          <Text style={s.pillIcon}>🤖</Text>
          <View style={s.pillContent}>
            <Text style={s.pillTitle}>Live Assistant</Text>
            <Text style={s.pillDesc}>Real-time help during your trip</Text>
          </View>
        </View>
      </View>

      {/* CTA */}
      <Pressable style={s.primaryBtn}>
        <Text style={s.primaryText}>Let's Go!</Text>
      </Pressable>

      {/* Skip */}
      <Pressable style={s.skipBtn}>
        <Text style={s.skipText}>Skip for now</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1, backgroundColor: "#111",
    justifyContent: "center", alignItems: "center", padding: 24,
  },
  mascot: {
    width: 160, height: 160, borderRadius: 32,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333",
    justifyContent: "center", alignItems: "center", marginBottom: 24,
  },
  mascotEmoji: { fontSize: 64 },
  title: { fontSize: 28, fontWeight: "700", color: "#FFF", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#999", marginBottom: 32 },
  pillsContainer: { width: "100%", gap: 12, marginBottom: 32 },
  pill: {
    height: 72, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", flexDirection: "row",
    alignItems: "center", paddingHorizontal: 16, gap: 12,
  },
  pillIcon: { fontSize: 28 },
  pillContent: { flex: 1 },
  pillTitle: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  pillDesc: { color: "#888", fontSize: 13, marginTop: 2 },
  primaryBtn: {
    width: "90%", height: 56, borderRadius: 28, backgroundColor: "#333",
    borderWidth: 1, borderColor: "#555",
    justifyContent: "center", alignItems: "center", marginBottom: 16,
  },
  primaryText: { color: "#FFF", fontSize: 17, fontWeight: "600" },
  skipBtn: { paddingVertical: 8 },
  skipText: { color: "#888", fontSize: 14 },
});
