// Screen 1 — Splash Screen — STATIC WIREFRAME
// Route: /splash | Mode: Pre-auth
// Spec: Full screen centered, mascot 120x120 borderRadius 24, logo, tagline, 3 loading dots
// First-time → /welcome (2s hold), Returning → auth check (3s max) → /home or /welcome

import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={s.root}>
      {/* Mascot placeholder — 120x120, borderRadius 24 */}
      <View style={s.mascot}>
        <Text style={s.mascotEmoji}>🦆</Text>
      </View>

      {/* Logo wordmark */}
      <Text style={s.logo}>TRAVI</Text>

      {/* Tagline */}
      <Text style={s.tagline}>Your AI Travel Companion</Text>

      {/* 3 Loading dots */}
      <View style={s.dotsRow}>
        <View style={s.dot} />
        <View style={[s.dot, { opacity: 0.6 }]} />
        <View style={[s.dot, { opacity: 0.3 }]} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  mascot: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  mascotEmoji: {
    fontSize: 48,
  },
  logo: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: 4,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#888",
    marginBottom: 40,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#555",
  },
});
