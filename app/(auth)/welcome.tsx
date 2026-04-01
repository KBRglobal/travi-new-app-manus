import { useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, Animated, Dimensions,
  TouchableOpacity, Image, ScrollView,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");
const CARD = (width - 48 - 12) / 2; // 2 columns, 24px side padding each, 12px gap

const FEATURES = [
  { icon: "sparkles"               as const, label: "AI That Knows You",  sub: "Learns your travel DNA",          color: "#7C5CFC" },
  { icon: "dollarsign.circle.fill" as const, label: "Zero Hidden Fees",   sub: "Commissions → TRAVI Points",      color: "#F94498" },
  { icon: "location.fill"          as const, label: "Real-Time Agent",    sub: "Knows exactly where you are",     color: "#06C2B0" },
  { icon: "trophy.fill"            as const, label: "Travel Gamified",    sub: "Badges, tiers & rewards",         color: "#FFB800" },
];

export default function WelcomeScreen() {
  const { state, dispatch } = useStore();

  const fade  = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,   { toValue: 1, duration: 520, useNativeDriver: true }),
      Animated.spring(slideY, { toValue: 0, friction: 8, tension: 55, useNativeDriver: true }),
    ]).start();
  }, []);

  const firstName = state.profile?.name?.split(" ")[0];

  const handleStart = () => router.push("/(auth)/quiz" as never);
  const handleSkip  = () => {
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });
    router.replace("/(tabs)" as never);
  };

  return (
    <View style={s.root}>
      <LinearGradient colors={["#100825", "#1B0D3A", "#1B0D3A"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />

      {/* Subtle ambient glow — corners only */}
      <View style={s.glowTR} />
      <View style={s.glowBL} />

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fade, transform: [{ translateY: slideY }] }}>

          {/* ── Hero ── */}
          <View style={s.hero}>
            <Image
              source={require("@/assets/logos/mascot-centered.png")}
              style={s.mascot}
              resizeMode="contain"
            />
            <Text style={s.greeting}>{firstName ? `Hey ${firstName}! 👋` : "Welcome aboard! 👋"}</Text>
            <Text style={s.headline}>Your AI Travel{"\n"}Companion</Text>
            <Text style={s.tagline}>Plan, book, and explore — all in one place</Text>
          </View>

          {/* ── Feature 2×2 grid ── */}
          <View style={s.grid}>
            {FEATURES.map((f) => (
              <View key={f.label} style={s.card}>
                {/* Uniform dark glass background */}
                <View style={s.cardBg} />
                {/* Subtle top-left color accent */}
                <View style={[s.cardAccent, { backgroundColor: f.color + "18" }]} />

                <View style={[s.iconBox, { backgroundColor: f.color + "22" }]}>
                  <IconSymbol name={f.icon} size={20} color={f.color} />
                </View>
                <Text style={s.cardLabel}>{f.label}</Text>
                <Text style={s.cardSub}>{f.sub}</Text>
              </View>
            ))}
          </View>

          {/* ── CTA ── */}
          <View style={s.cta}>
            {/* Hint pill */}
            <View style={s.pill}>
              <IconSymbol name="star.fill" size={11} color="#A78BFA" />
              <Text style={s.pillText}>10 quick scenarios · 2 minutes</Text>
            </View>

            {/* Primary button */}
            <TouchableOpacity style={s.btn} onPress={handleStart} activeOpacity={0.85}>
              <LinearGradient
                colors={["#6443F4", "#C2185B", "#F94498"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={s.btnGrad}
              >
                <Text style={s.btnText}>Build My Traveler Profile</Text>
                <IconSymbol name="arrow.right" size={17} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSkip} activeOpacity={0.65} style={s.skip}>
              <Text style={s.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#100825" },

  glowTR: {
    position: "absolute", width: 260, height: 260, borderRadius: 130,
    top: -90, right: -90, backgroundColor: "rgba(100,67,244,0.14)",
  },
  glowBL: {
    position: "absolute", width: 220, height: 220, borderRadius: 110,
    bottom: 50, left: -80, backgroundColor: "rgba(249,68,152,0.10)",
  },

  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40, gap: 28 },

  // Hero
  hero: { alignItems: "center", gap: 8 },
  mascot: { width: 150, height: 150, marginBottom: 4 },
  greeting: { fontSize: 14, color: "rgba(196,181,217,0.70)", fontWeight: "500" },
  headline: {
    fontSize: 34, fontWeight: "800", color: "#FFFFFF",
    textAlign: "center", lineHeight: 40, letterSpacing: -0.5,
  },
  tagline: { fontSize: 15, color: "rgba(196,181,217,0.60)", textAlign: "center", lineHeight: 21 },

  // Grid — strict 2×2, every card identical
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: CARD, height: CARD * 0.88,
    borderRadius: 18, overflow: "hidden",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
    padding: 16, gap: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  cardBg: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(255,255,255,0.03)" },
  cardAccent: { position: "absolute", top: 0, left: 0, right: 0, height: "50%", borderRadius: 18 },
  iconBox: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  cardLabel: { fontSize: 13, fontWeight: "700", color: "#FFFFFF", lineHeight: 18 },
  cardSub: { fontSize: 11, color: "rgba(196,181,217,0.65)", lineHeight: 15 },

  // CTA
  cta: { gap: 14, alignItems: "center" },
  pill: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: "rgba(124,92,252,0.18)",
    borderWidth: 1, borderColor: "rgba(124,92,252,0.35)",
  },
  pillText: { fontSize: 12, color: "#A78BFA", fontWeight: "500" },
  btn: { width: "100%", borderRadius: 16, overflow: "hidden" },
  btnGrad: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 17, gap: 10,
  },
  btnText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF" },
  skip: { paddingVertical: 8 },
  skipText: { fontSize: 13, color: "rgba(196,181,217,0.45)", fontWeight: "500" },
});
