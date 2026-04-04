// Screen 2 — Welcome Screen
// Route: /welcome | Mode: Pre-auth
// Visual DNA: #0A0514 bg, Chillax-Bold headline, Satoshi body, gradient CTA

import { View, Text, StyleSheet, Pressable, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const C = {
  bg: "#0A0514",
  purple: "#6443F4",
  pink: "#F94498",
  white: "#FFFFFF",
  muted: "#A79FB2",
  secondary: "#D3CFD8",
  glassBg: "rgba(36,16,62,0.7)",
  glassBorder: "rgba(100,67,244,0.25)",
};

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={s.root}>
      {/* Full-bleed hero image */}
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" }}
        style={s.heroImage}
        resizeMode="cover"
      />

      {/* Gradient overlay — bottom-up */}
      <LinearGradient
        colors={["transparent", "rgba(10,5,20,0.5)", "rgba(10,5,20,0.92)", "#0A0514"]}
        locations={[0.2, 0.45, 0.65, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Skip button */}
      <Pressable
        style={[s.skipBtn, { top: insets.top + 12 }]}
        onPress={() => router.replace("/(tabs)" as any)}
      >
        <View style={s.skipPill}>
          <Text style={s.skipText}>Skip</Text>
        </View>
      </Pressable>

      {/* Content */}
      <View style={[s.content, { paddingBottom: insets.bottom + 32 }]}>
        {/* Badge */}
        <View style={s.badge}>
          <View style={s.badgeDot} />
          <Text style={s.badgeText}>AI-Powered Travel</Text>
        </View>

        {/* Headline */}
        <Text style={s.headline}>
          Discover Your{"\n"}
          <Text style={s.headlineAccent}>Perfect</Text> Journey
        </Text>

        {/* Body */}
        <Text style={s.body}>
          Travel planning that matches your unique DNA. Swipe destinations, build trips, explore the world.
        </Text>

        {/* Feature pills */}
        <View style={s.pillsRow}>
          {["✦ DNA Matching", "✦ AI Itineraries", "✦ Live Concierge"].map((p) => (
            <View key={p} style={s.featurePill}>
              <Text style={s.featurePillText}>{p}</Text>
            </View>
          ))}
        </View>

        {/* Primary CTA */}
        <Pressable
          style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
          onPress={() => router.push("/(auth)/sign-up" as any)}
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

        {/* Sign in link */}
        <Pressable
          style={({ pressed }) => [s.signInBtn, pressed && { opacity: 0.6 }]}
          onPress={() => router.push("/(auth)/sign-up" as any)}
        >
          <Text style={s.signInText}>
            Already have an account?{" "}
            <Text style={s.signInAccent}>Sign In</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: height * 0.65,
  },
  skipBtn: {
    position: "absolute",
    right: 20,
    zIndex: 10,
  },
  skipPill: {
    backgroundColor: "rgba(36,16,62,0.6)",
    borderWidth: 1,
    borderColor: C.glassBorder,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 13,
    color: C.muted,
    fontFamily: "Satoshi-Medium",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    gap: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(100,67,244,0.15)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.purple,
  },
  badgeText: {
    fontSize: 12,
    color: C.purple,
    fontFamily: "Satoshi-Medium",
  },
  headline: {
    fontSize: 40,
    color: C.white,
    fontFamily: "Chillax-Bold",
    lineHeight: 44,
  },
  headlineAccent: {
    color: C.pink,
    fontFamily: "Chillax-Bold",
  },
  body: {
    fontSize: 15,
    color: C.secondary,
    fontFamily: "Satoshi-Regular",
    lineHeight: 22,
  },
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featurePill: {
    backgroundColor: "rgba(36,16,62,0.6)",
    borderWidth: 1,
    borderColor: C.glassBorder,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  featurePillText: {
    fontSize: 12,
    color: C.muted,
    fontFamily: "Satoshi-Regular",
  },
  ctaBtn: {
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  ctaGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ctaText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: C.white,
    letterSpacing: 0.3,
  },
  signInBtn: {
    alignItems: "center",
    paddingVertical: 4,
  },
  signInText: {
    fontSize: 14,
    color: C.muted,
    fontFamily: "Satoshi-Regular",
  },
  signInAccent: {
    color: C.pink,
    fontFamily: "Satoshi-Bold",
  },
});
