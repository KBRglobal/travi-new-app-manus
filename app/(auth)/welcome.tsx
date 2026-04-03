import { useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, Animated,
  TouchableOpacity, Image, Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

const FEATURES = [
  { icon: "sparkles" as const,               color: "#A78BFA", label: "AI That Knows You" },
  { icon: "dollarsign.circle.fill" as const,  color: "#F472B6", label: "Zero Hidden Fees" },
  { icon: "location.fill" as const,           color: "#34D399", label: "Real-Time Agent" },
  { icon: "suitcase.fill" as const,           color: "#FBBF24", label: "All-in-One Trips" },
];

const MASCOT_SIZE = width * 0.48;
const LOGO_WIDTH  = width * 0.38;
const LOGO_HEIGHT = LOGO_WIDTH * 0.30;

export default function WelcomeScreen() {
  const { state, dispatch } = useStore();
  const insets = useSafeAreaInsets();

  const fade    = useRef(new Animated.Value(0)).current;
  const mascotY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,    { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(mascotY, { toValue: 0, tension: 55, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  const firstName = state.profile?.name?.split(" ")[0];
  const greeting  = firstName && firstName !== "Traveler"
    ? `Hey ${firstName}! 👋`
    : "Hey there! 👋";

  return (
    <View style={s.root}>
      {/* Background */}
      <LinearGradient
        colors={["#1A0B2E", "#160B35", "#1A0D3A"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Orbs — positioned to not block text */}
      <View style={s.orb1} />
      <View style={s.orb2} />

      {/* ── FULL SCREEN LAYOUT ── */}
      <View style={[s.layout, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20 }]}>

        {/* TOP: logo + text + chips */}
        <Animated.View style={[s.topSection, { opacity: fade }]}>
          <Image
            source={require("@/assets/logos/logotype-white.webp")}
            style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
            resizeMode="contain"
          />
          <View style={s.textBlock}>
            <Text style={s.greeting}>{greeting}</Text>
            <Text style={s.headline}>{"Travel like\nnever before"}</Text>
            <Text style={s.sub}>Smart planning, real bookings, zero hassle</Text>
          </View>
          <View style={s.chips}>
            {FEATURES.map((f, i) => (
              <View key={i} style={[s.chip, { borderColor: f.color + "55" }]}>
                <IconSymbol name={f.icon} size={13} color={f.color} />
                <Text style={[s.chipText, { color: f.color }]}>{f.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* MIDDLE: mascot — in flow, fills remaining space */}
        <Animated.View style={[s.mascotWrap, { transform: [{ translateY: mascotY }], opacity: fade }]}>
          <Image
            source={require("@/assets/logos/mascot-centered.png")}
            style={{ width: MASCOT_SIZE, height: MASCOT_SIZE }}
            resizeMode="contain"
          />
        </Animated.View>

        {/* BOTTOM: CTA + skip */}
        <Animated.View style={[s.bottomSection, { opacity: fade }]}>
          <TouchableOpacity
            style={s.btn}
            onPress={() => router.push("/(auth)/quiz" as never)}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={["#6443F4", "#B91C7C", "#F94498"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={s.btnInner}
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
          >
            <Text style={s.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#1A0B2E" },

  // Orbs — symmetric, not blocking content
  orb1: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    top: -40,
    right: -80,
    backgroundColor: "rgba(100,67,244,0.18)",
  },
  orb2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    bottom: 60,
    left: -80,
    backgroundColor: "rgba(249,68,152,0.12)",
  },

  // Main layout — flex column, space-between
  layout: {
    flex: 1,
    paddingHorizontal: 24,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Top section
  topSection: {
    alignItems: "center",
    gap: 14,
  },
  textBlock: {
    alignItems: "center",
    gap: 6,
  },
  greeting: {
    fontSize: 15,
    color: "rgba(196,181,217,0.82)",
    fontWeight: "500",
    textAlign: "center",
  },
  headline: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -0.8,
  },
  sub: {
    fontSize: 14,
    color: "rgba(196,181,217,0.68)",
    textAlign: "center",
    lineHeight: 20,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Mascot — in flow, centered
  mascotWrap: {
    alignItems: "center",
    justifyContent: "center",
  },

  // Bottom section
  bottomSection: {
    width: "100%",
    gap: 12,
    alignItems: "center",
  },
  btn: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#F94498",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
  },
  btnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    gap: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  skipText: {
    fontSize: 14,
    color: "rgba(196,181,217,0.70)",
    fontWeight: "500",
    paddingVertical: 4,
  },
});
