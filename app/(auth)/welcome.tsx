// Screen 2 — Welcome Screen — DESIGNED
// Route: /welcome | Mode: Pre-auth
// Spec: Hero image 55% height, gradient overlay, headline, body, primary CTA, secondary link

import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

const C = {
  bgBase: "#1A0B2E",
  bgSurface: "#24103E",
  purple: "#6443F4",
  pink: "#F94498",
  textPrimary: "#FFFFFF",
  textSecondary: "#D3CFD8",
  textTertiary: "#A79FB2",
};

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={s.root}>
      {/* Hero image area — 55% height with gradient overlay */}
      <View style={s.heroContainer}>
        <View style={s.heroPlaceholder}>
          <Text style={{ fontSize: 64 }}>✈️</Text>
          <Text style={{ fontSize: 14, color: C.textTertiary, marginTop: 8 }}>Hero Image</Text>
        </View>
        <LinearGradient
          colors={["transparent", "rgba(26,11,46,0.6)", C.bgBase]}
          locations={[0.3, 0.7, 1]}
          style={s.heroGradient}
        />
        {/* Skip — top-right, 44px tap area */}
        <Pressable
          style={({ pressed }) => [s.skipBtn, pressed && { opacity: 0.6 }]}
          onPress={() => router.replace("/(auth)/sign-up")}
        >
          <Text style={s.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* Content block */}
      <View style={s.content}>
        <View>
          <Text style={s.headline}>Discover Your{"\n"}Perfect Journey</Text>
          <Text style={s.body}>
            AI-powered travel planning that matches your unique travel DNA. Swipe, plan, and explore — all in one place.
          </Text>
        </View>

        <View style={s.ctaArea}>
          {/* Primary CTA — gradient pill, 56px, full-width minus 48px */}
          <Pressable
            style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }]}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <LinearGradient
              colors={[C.purple, C.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.ctaGradient}
            >
              <Text style={s.ctaText}>Get Started</Text>
            </LinearGradient>
          </Pressable>

          {/* Secondary link */}
          <Pressable
            style={({ pressed }) => [{ paddingVertical: 8, minHeight: 44, justifyContent: "center" as const }, pressed && { opacity: 0.6 }]}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text style={s.secondaryText}>
              Already have an account? <Text style={s.secondaryAccent}>Sign In</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bgBase },
  heroContainer: { height: height * 0.55, position: "relative" },
  heroPlaceholder: {
    flex: 1,
    backgroundColor: C.bgSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  skipBtn: {
    position: "absolute",
    top: 59,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: { fontSize: 14, color: C.textTertiary, fontWeight: "500" },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  headline: {
    fontSize: 36,
    fontWeight: "800",
    color: C.textPrimary,
    lineHeight: 40,
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: C.textSecondary,
    lineHeight: 24,
  },
  ctaArea: { alignItems: "center", gap: 16 },
  ctaBtn: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
  },
  ctaText: { fontSize: 16, fontWeight: "700", color: C.textPrimary },
  secondaryText: { fontSize: 14, color: C.textTertiary },
  secondaryAccent: { color: C.pink, fontWeight: "600" },
});
