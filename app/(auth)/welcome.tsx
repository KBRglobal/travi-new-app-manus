// Screen 2 — Welcome Screen — STATIC WIREFRAME
// Route: /welcome | Mode: Pre-auth
// Spec: Skip top-right, Hero 55% full-bleed + gradient overlay bottom
// Headline + body + primary CTA (56px pill) + secondary link
// Primary → /signup, Secondary → /login, Skip → /signup

import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <View style={s.root}>
      {/* Skip — top-right */}
      <Pressable style={s.skipBtn}>
        <Text style={s.skipText}>Skip</Text>
      </Pressable>

      {/* Hero area — 55% viewport */}
      <View style={s.hero}>
        <Text style={s.heroLabel}>Hero Image</Text>
        <Text style={s.heroSub}>55% viewport, full-bleed</Text>
        {/* Gradient overlay at bottom */}
        <View style={s.heroGradient}>
          <Text style={s.gradientLabel}>↑ gradient overlay</Text>
        </View>
      </View>

      {/* Content */}
      <View style={s.content}>
        <View>
          <Text style={s.headline}>Discover Your{"\n"}Perfect Trip</Text>
          <Text style={s.body}>
            AI-powered travel planning that matches your unique travel DNA.
            Personalized recommendations, smart itineraries, and real-time assistance.
          </Text>
        </View>

        <View style={s.ctaArea}>
          {/* Primary CTA — 56px pill, 90% width */}
          <Pressable style={s.primaryBtn}>
            <Text style={s.primaryText}>Get Started</Text>
          </Pressable>

          {/* Secondary link */}
          <Text style={s.secondaryText}>
            Already have an account? <Text style={s.secondaryLink}>Sign In</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  skipBtn: { position: "absolute", top: 56, right: 20, zIndex: 10, padding: 8 },
  skipText: { color: "#888", fontSize: 15 },
  hero: {
    height: height * 0.55,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  heroLabel: { color: "#555", fontSize: 18, fontWeight: "600" },
  heroSub: { color: "#444", fontSize: 12, marginTop: 4 },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(17,17,17,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientLabel: { color: "#444", fontSize: 11 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  headline: { fontSize: 28, fontWeight: "700", color: "#FFF", lineHeight: 34, marginBottom: 12 },
  body: { fontSize: 15, color: "#999", lineHeight: 22 },
  ctaArea: { alignItems: "center", gap: 16 },
  primaryBtn: {
    width: "90%",
    height: 56,
    borderRadius: 28,
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: { color: "#FFF", fontSize: 17, fontWeight: "600" },
  secondaryText: { color: "#888", fontSize: 14 },
  secondaryLink: { color: "#AAA", textDecorationLine: "underline" },
});
