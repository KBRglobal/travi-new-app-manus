import { useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, Animated,
  TouchableOpacity, Image, Dimensions,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

const FEATURES = [
  {
    icon: "sparkles"               as const,
    color: "#A78BFA",
    title: "AI That Knows You",
    desc:  "Learns your travel DNA through fun scenarios",
  },
  {
    icon: "dollarsign.circle.fill" as const,
    color: "#F472B6",
    title: "Zero Hidden Fees",
    desc:  "All commissions returned as TRAVI Points",
  },
  {
    icon: "location.fill"          as const,
    color: "#34D399",
    title: "Real-Time Agent",
    desc:  "Your AI guide knows exactly where you are",
  },
  {
    icon: "trophy.fill"            as const,
    color: "#FBBF24",
    title: "Travel Gamified",
    desc:  "Earn badges, climb tiers, unlock rewards",
  },
];

export default function WelcomeScreen() {
  const { state, dispatch } = useStore();

  const fade   = useRef(new Animated.Value(0)).current;
  const duckY  = useRef(new Animated.Value(-20)).current;
  const textY  = useRef(new Animated.Value(20)).current;
  const listY  = useRef(new Animated.Value(30)).current;
  const ctaY   = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade,  { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(duckY, { toValue: 0, friction: 7, tension: 60, useNativeDriver: true }),
        Animated.timing(textY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(listY, { toValue: 0, duration: 350, useNativeDriver: true }),
        Animated.timing(ctaY,  { toValue: 0, duration: 350, delay: 60, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const firstName = state.profile?.name?.split(" ")[0];

  return (
    <View style={s.root}>
      {/* Background */}
      <LinearGradient
        colors={["#0C0720", "#160B35", "#1A0D3A"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Glow top-right */}
      <View style={s.glowTR} />
      {/* Glow bottom-left */}
      <View style={s.glowBL} />

      {/* ─── Duck hero ─── */}
      <Animated.View style={[s.duckWrap, { opacity: fade, transform: [{ translateY: duckY }] }]}>
        <Image
          source={require("@/assets/logos/mascot-centered.png")}
          style={s.duck}
          resizeMode="contain"
        />
      </Animated.View>

      {/* ─── Headline ─── */}
      <Animated.View style={[s.headlineWrap, { opacity: fade, transform: [{ translateY: textY }] }]}>
        <Text style={s.greeting}>
          {firstName ? `Hey ${firstName}! 👋` : "Welcome! 👋"}
        </Text>
        <Text style={s.headline}>Your AI Travel{"\n"}Companion</Text>
        <Text style={s.sub}>Plan, book, and explore — all in one place</Text>
      </Animated.View>

      {/* ─── Feature list ─── */}
      <Animated.View style={[s.list, { opacity: fade, transform: [{ translateY: listY }] }]}>
        {FEATURES.map((f, i) => (
          <View key={i} style={s.row}>
            <View style={[s.iconCircle, { backgroundColor: f.color + "20" }]}>
              <IconSymbol name={f.icon} size={18} color={f.color} />
            </View>
            <View style={s.rowText}>
              <Text style={s.rowTitle}>{f.title}</Text>
              <Text style={s.rowDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </Animated.View>

      {/* ─── CTA ─── */}
      <Animated.View style={[s.cta, { opacity: fade, transform: [{ translateY: ctaY }] }]}>
        <TouchableOpacity
          style={s.btn}
          onPress={() => router.push("/(auth)/quiz" as never)}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={["#6443F4", "#B91C7C", "#F94498"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={s.btnGrad}
          >
            <Text style={s.btnText}>Build My Traveler Profile</Text>
            <IconSymbol name="arrow.right" size={17} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "SET_ONBOARDING_COMPLETED" });
            router.replace("/(tabs)" as never);
          }}
          activeOpacity={0.6}
          style={s.skip}
        >
          <Text style={s.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0C0720",
    paddingHorizontal: 28,
    paddingTop: height * 0.06,
    paddingBottom: 130,
    justifyContent: "space-between",
  },

  // Ambient glows — pushed to corners
  glowTR: {
    position: "absolute",
    width: 300, height: 300, borderRadius: 150,
    top: -120, right: -120,
    backgroundColor: "rgba(100,67,244,0.16)",
  },
  glowBL: {
    position: "absolute",
    width: 260, height: 260, borderRadius: 130,
    bottom: -80, left: -100,
    backgroundColor: "rgba(249,68,152,0.11)",
  },

  // Duck
  duckWrap: { alignItems: "center" },
  duck: { width: width * 0.52, height: width * 0.52 },

  // Headline block
  headlineWrap: { gap: 6 },
  greeting: {
    fontSize: 14,
    color: "rgba(196,181,217,0.65)",
    fontWeight: "500",
      fontFamily: "Satoshi-Medium",
    textAlign: "center",
  },
  headline: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -0.8,
    fontFamily: "Chillax-Bold",
  },
  sub: {
    fontSize: 14,
    color: "rgba(196,181,217,0.55)",
    textAlign: "center",
    lineHeight: 20,
  },

  // Feature list — horizontal rows, no cards
  list: { gap: 14 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  iconCircle: {
    width: 42, height: 42, borderRadius: 13,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  rowText: { flex: 1, gap: 2 },
  rowTitle: { fontSize: 14, fontWeight: "700", color: "#FFFFFF", fontFamily: "Satoshi-Bold" },
  rowDesc:  { fontSize: 12, color: "rgba(196,181,217,0.60)", lineHeight: 17, fontFamily: "Satoshi-Regular" },

  // CTA
  cta: { gap: 12, alignItems: "center" },
  btn: { width: "100%", borderRadius: 16, overflow: "hidden" },
  btnGrad: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 17, gap: 10,
  },
  btnText: { fontSize: 16, fontWeight: "700",
      fontFamily: "Chillax-Semibold", color: "#FFFFFF" },
  skip: { paddingVertical: 6 },
  skipText: { fontSize: 14, color: "rgba(196,181,217,0.60)", fontWeight: "500",
      fontFamily: "Satoshi-Medium" },
});
