import { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { Brand, Gradients, Text as DS, Border, Typography, Radius, Spacing } from "@/lib/design-system";

const { width } = Dimensions.get("window");
const CARD_W = (width - 48 - 12) / 2;

const FEATURES = [
  { iconName: "sparkles"              as const, title: "AI That Knows You",   desc: "Learns your travel DNA through fun scenarios", color: "#6443F4" },
  { iconName: "dollarsign.circle.fill" as const, title: "Zero Hidden Fees",    desc: "All commissions returned as TRAVI Points",    color: "#F94498" },
  { iconName: "location.fill"         as const, title: "Real-Time Agent",     desc: "Your AI guide knows exactly where you are",   color: "#00BCD4" },
  { iconName: "trophy.fill"           as const, title: "Travel Gamified",     desc: "Earn badges, climb tiers, unlock rewards",    color: "#FFD700" },
];

export default function WelcomeScreen() {
  const { state, dispatch } = useStore();

  const fade   = useRef(new Animated.Value(0)).current;
  const duckY  = useRef(new Animated.Value(24)).current;
  const cardsY = useRef(new Animated.Value(32)).current;
  const ctaY   = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade,  { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(duckY, { toValue: 0, friction: 7, tension: 60, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardsY, { toValue: 0, duration: 380, useNativeDriver: true }),
        Animated.timing(ctaY,   { toValue: 0, duration: 380, delay: 80, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const handleGetStarted = () => router.push("/(auth)/quiz" as never);
  const handleSkip = () => {
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });
    router.replace("/(tabs)" as never);
  };

  const firstName = state.profile?.name?.split(" ")[0];

  return (
    <View style={s.container}>
      <LinearGradient colors={Gradients.authBg} locations={[0, 0.35, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={s.orbTopRight} />
      <View style={s.orbBottomLeft} />

      {/* Hero — mascot only, no logotype */}
      <Animated.View style={[s.hero, { opacity: fade, transform: [{ translateY: duckY }] }]}>
        <Image source={require("@/assets/logos/mascot-centered.png")} style={s.mascot} resizeMode="contain" />
        <Text style={s.greeting}>
          {firstName ? `Hey ${firstName}! 👋` : "Welcome aboard! 👋"}
        </Text>
        <Text style={s.heroTitle}>Your AI Travel{"\n"}Companion</Text>
        <Text style={s.heroSub}>Plan, book, and explore — all in one place</Text>
      </Animated.View>

      {/* Feature grid 2×2 */}
      <Animated.View style={[s.grid, { opacity: fade, transform: [{ translateY: cardsY }] }]}>
        {FEATURES.map((f) => (
          <View key={f.title} style={s.card}>
            <LinearGradient colors={[`${f.color}20`, `${f.color}08`]} style={s.cardInner}>
              <View style={[s.iconWrap, { backgroundColor: `${f.color}25`, borderColor: `${f.color}40` }]}>
                <IconSymbol name={f.iconName} size={20} color={f.color} />
              </View>
              <Text style={s.cardTitle}>{f.title}</Text>
              <Text style={s.cardDesc}>{f.desc}</Text>
            </LinearGradient>
          </View>
        ))}
      </Animated.View>

      {/* CTA */}
      <Animated.View style={[s.cta, { opacity: fade, transform: [{ translateY: ctaY }] }]}>
        <View style={s.quizHint}>
          <LinearGradient colors={Gradients.badge} style={s.quizHintInner}>
            <IconSymbol name="star.fill" size={12} color={DS.secondary} />
            <Text style={s.quizHintText}>10 quick scenarios · 2 minutes</Text>
          </LinearGradient>
        </View>

        <TouchableOpacity style={s.ctaBtn} onPress={handleGetStarted} activeOpacity={0.85}>
          <LinearGradient colors={Gradients.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.ctaGradient}>
            <Text style={s.ctaText}>Build My Traveler Profile</Text>
            <IconSymbol name="arrow.right" size={18} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={s.skipBtn}>
          <Text style={s.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Brand.deepPurple, paddingHorizontal: 24, paddingTop: 56, paddingBottom: 32, gap: 24 },
  orbTopRight: {
    position: "absolute", width: 280, height: 280, borderRadius: 140,
    top: -80, right: -100, backgroundColor: "rgba(100,67,244,0.13)",
  },
  orbBottomLeft: {
    position: "absolute", width: 240, height: 240, borderRadius: 120,
    bottom: 40, left: -90, backgroundColor: "rgba(249,68,152,0.09)",
  },

  // Hero
  hero: { alignItems: "center", gap: 6 },
  mascot: { width: 140, height: 140, marginBottom: 4 },
  greeting: { ...Typography.small, color: DS.muted },
  heroTitle: { ...Typography.h1, textAlign: "center", lineHeight: 38 },
  heroSub: { ...Typography.body, color: DS.muted, textAlign: "center" },

  // Feature grid
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: CARD_W, borderRadius: Radius.xl, overflow: "hidden", borderWidth: 1, borderColor: Border.idle },
  cardInner: { padding: 16, gap: 8 },
  iconWrap: { width: 40, height: 40, borderRadius: Radius.md, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  cardTitle: { fontSize: 13, fontWeight: "700", color: DS.primary },
  cardDesc: { fontSize: 11, color: DS.muted, lineHeight: 16 },

  // CTA
  cta: { gap: 12, alignItems: "center" },
  quizHint: { alignSelf: "center" },
  quizHintInner: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: Radius.pill,
    borderWidth: 1, borderColor: Border.badge,
  },
  quizHintText: { ...Typography.small, color: DS.secondary },
  ctaBtn: { width: "100%", borderRadius: Radius.lg, overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 17, gap: 10 },
  ctaText: { ...Typography.cta },
  skipBtn: { paddingVertical: 8 },
  skipText: { ...Typography.small, color: DS.dim },
});
