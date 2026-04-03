import { useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, Animated,
  TouchableOpacity, Image, Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

// Mascot: 20% of screen height — always fits regardless of device
const MASCOT_SIZE = height * 0.20;

const FEATURES = [
  {
    icon: "sparkles"               as const,
    color: "#A78BFA",
    title: "AI That Knows You",
    desc:  "Recommendations that actually match who you are",
  },
  {
    icon: "dollarsign.circle.fill" as const,
    color: "#F472B6",
    title: "Zero Hidden Fees",
    desc:  "What we earn, you earn back",
  },
  {
    icon: "location.fill"          as const,
    color: "#34D399",
    title: "Real-Time Agent",
    desc:  "In-trip help whenever you need it",
  },
  {
    icon: "suitcase.fill"          as const,
    color: "#FBBF24",
    title: "All-in-One Trips",
    desc:  "Flights, hotels, and experiences — no app-switching",
  },
];

export default function WelcomeScreen() {
  const { state, dispatch } = useStore();

  const fade   = useRef(new Animated.Value(0)).current;
  const duckY  = useRef(new Animated.Value(-16)).current;
  const textY  = useRef(new Animated.Value(14)).current;
  const listY  = useRef(new Animated.Value(20)).current;
  const ctaY   = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade,  { toValue: 1, duration: 380, useNativeDriver: true }),
        Animated.spring(duckY, { toValue: 0, friction: 7, tension: 55, useNativeDriver: true }),
        Animated.timing(textY, { toValue: 0, duration: 380, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(listY, { toValue: 0, duration: 320, useNativeDriver: true }),
        Animated.timing(ctaY,  { toValue: 0, duration: 320, delay: 60, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const firstName = state.profile?.name?.split(" ")[0];

  return (
    <View style={s.bg}>
      <LinearGradient
        colors={["#0C0720", "#160B35", "#1A0D3A"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={s.glowTR} />
      <View style={s.glowBL} />

      {/* SafeAreaView handles top notch/island + bottom home indicator */}
      <SafeAreaView style={s.safe} edges={["top", "bottom"]}>

        {/* ─── Mascot ─── */}
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
            {firstName && firstName !== "Traveler" ? `Hey ${firstName}! 👋` : "Hey there! 👋"}
          </Text>
          <Text style={s.headline}>Travel like{"\n"}never before</Text>
          <Text style={s.sub}>Smart planning, real bookings, zero hassle</Text>
        </Animated.View>

        {/* ─── Features — flex:1 fills middle ─── */}
        <Animated.View style={[s.list, { opacity: fade, transform: [{ translateY: listY }] }]}>
          {FEATURES.map((f, i) => (
            <View key={i} style={s.row}>
              <View style={[s.iconCircle, { backgroundColor: f.color + "20" }]}>
                <IconSymbol name={f.icon} size={20} color={f.color} />
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

      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#0C0720",
  },

  // SafeAreaView fills the whole screen, column layout
  safe: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "column",
  },

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

  // Mascot — fixed height, centered
  duckWrap: { alignItems: "center", marginBottom: 4 },
  duck: { width: MASCOT_SIZE, height: MASCOT_SIZE },

  // Headline block
  headlineWrap: { gap: 6, alignItems: "center", marginBottom: 4 },
  greeting: {
    fontSize: 14,
    color: "rgba(196,181,217,0.80)",
    fontWeight: "500",
    fontFamily: "Satoshi-Medium",
    textAlign: "center",
  },
  headline: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.8,
    fontFamily: "Chillax-Bold",
  },
  sub: {
    fontSize: 14,
    color: "rgba(196,181,217,0.80)",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Satoshi-Regular",
  },

  // Feature list — flex:1 fills remaining space, items evenly distributed
  list: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 8,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  iconCircle: {
    width: 44, height: 44, borderRadius: 13,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  rowText: { flex: 1, gap: 3 },
  rowTitle: { fontSize: 14, fontWeight: "700", color: "#FFFFFF", fontFamily: "Satoshi-Bold" },
  rowDesc:  { fontSize: 13, color: "rgba(196,181,217,0.75)", lineHeight: 18, fontFamily: "Satoshi-Regular" },

  // CTA
  cta: { gap: 12, alignItems: "center" },
  btn: {
    width: "100%", borderRadius: 16, overflow: "hidden",
    shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
  },
  btnGrad: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 18, gap: 10,
  },
  btnText: { fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold", color: "#FFFFFF" },
  skip: { paddingVertical: 6 },
  skipText: { fontSize: 14, color: "rgba(196,181,217,0.75)", fontWeight: "500", fontFamily: "Satoshi-Medium" },
});
