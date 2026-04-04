// Screen 6 — Welcome to TRAVI
// Route: /welcome-travi | Mode: Auth/Onboarding
// Visual DNA: #0A0514 bg, mascot asset, Chillax-Bold, glass feature pills, gradient CTA

import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const C = {
  bg: "#0A0514",
  surface: "rgba(36,16,62,0.6)",
  border: "rgba(123,68,230,0.3)",
  purple: "#6443F4",
  pink: "#F94498",
  success: "#02A65C",
  white: "#FFFFFF",
  secondary: "#D3CFD8",
  muted: "#A79FB2",
};

const FEATURES = [
  {
    icon: "biotech" as const,
    color: C.purple,
    title: "Travel DNA",
    desc: "Discover your unique travel personality",
  },
  {
    icon: "map" as const,
    color: "#01BEFF",
    title: "Smart Planning",
    desc: "AI-powered itineraries just for you",
  },
  {
    icon: "support-agent" as const,
    color: C.pink,
    title: "Live Concierge",
    desc: "Real-time help during your trip",
  },
];

export default function WelcomeTraviScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      {/* Mascot */}
      <View style={s.mascotWrap}>
        <Image
          source={require("@/assets/images/mascot-dark.png")}
          style={s.mascot}
          resizeMode="contain"
        />
        {/* Glow ring */}
        <View style={s.glowRing} />
      </View>

      {/* Title */}
      <Text style={s.title}>
        Welcome to <Text style={s.titleAccent}>TRAVI!</Text>
      </Text>
      <Text style={s.subtitle}>Here's what we can do together</Text>

      {/* Feature pills */}
      <View style={s.pillsContainer}>
        {FEATURES.map((f) => (
          <View key={f.title} style={s.pill}>
            <View style={[s.pillIconWrap, { borderColor: f.color + "40", backgroundColor: f.color + "15" }]}>
              <MaterialIcons name={f.icon} size={24} color={f.color} />
            </View>
            <View style={s.pillContent}>
              <Text style={s.pillTitle}>{f.title}</Text>
              <Text style={s.pillDesc}>{f.desc}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={C.muted} />
          </View>
        ))}
      </View>

      {/* CTA */}
      <Pressable
        style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
        onPress={() => router.replace("/(dna)/categories" as any)}
      >
        <LinearGradient
          colors={[C.purple, C.pink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={s.ctaGrad}
        >
          <Text style={s.ctaText}>Let's Go!</Text>
          <MaterialIcons name="arrow-forward" size={20} color={C.white} style={{ marginLeft: 8 }} />
        </LinearGradient>
      </Pressable>

      {/* Skip */}
      <Pressable
        style={({ pressed }) => [s.skipBtn, pressed && { opacity: 0.6 }]}
        onPress={() => router.replace("/(tabs)" as any)}
      >
        <Text style={s.skipText}>Skip for now</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  mascotWrap: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  mascot: { width: 130, height: 130, zIndex: 2 },
  glowRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.3)",
    backgroundColor: "rgba(100,67,244,0.05)",
  },
  title: {
    fontSize: 32,
    fontFamily: "Chillax-Bold",
    color: C.white,
    marginBottom: 8,
    textAlign: "center",
  },
  titleAccent: { color: C.pink, fontFamily: "Chillax-Bold" },
  subtitle: {
    fontSize: 15,
    fontFamily: "Satoshi-Regular",
    color: C.muted,
    marginBottom: 32,
    textAlign: "center",
  },
  pillsContainer: { width: "100%", gap: 12, marginBottom: 32 },
  pill: {
    height: 72,
    borderRadius: 18,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 14,
  },
  pillIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pillContent: { flex: 1 },
  pillTitle: {
    color: C.white,
    fontSize: 15,
    fontFamily: "Satoshi-Bold",
    marginBottom: 2,
  },
  pillDesc: {
    color: C.muted,
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
  },
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
    marginBottom: 16,
  },
  ctaGrad: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ctaText: { fontSize: 16, fontFamily: "Satoshi-Bold", color: C.white },
  skipBtn: {
    paddingVertical: 8,
    minHeight: 44,
    justifyContent: "center",
  },
  skipText: { fontSize: 14, fontFamily: "Satoshi-Regular", color: C.muted },
});
