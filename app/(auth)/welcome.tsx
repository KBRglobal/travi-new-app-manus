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

const { width } = Dimensions.get("window");

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
  const insets = useSafeAreaInsets();

  const fade  = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,   { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideY, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const firstName = state.profile?.name?.split(" ")[0];

  // Mascot: square, 48% of screen width
  const mascotSize = width * 0.48;

  return (
    <View style={s.root}>
      {/* Background gradient */}
      <LinearGradient
        colors={["#0C0720", "#160B35", "#1A0D3A"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Ambient glows */}
      <View style={s.glowTR} />
      <View style={s.glowBL} />

      {/* ── CONTENT ── */}
      <Animated.View
        style={[
          s.content,
          {
            paddingTop: insets.top + 44,
            paddingBottom: insets.bottom + 12,
            opacity: fade,
            transform: [{ translateY: slideY }],
          },
        ]}
      >
        {/* Mascot */}
        <View style={s.mascotWrap}>
          <Image
            source={require("@/assets/logos/mascot-centered.png")}
            style={{ width: mascotSize, height: mascotSize }}
            resizeMode="contain"
          />
        </View>

        {/* Greeting + headline */}
        <View style={s.headBlock}>
          <Text style={s.greeting}>
            {firstName && firstName !== "Traveler" ? `Hey ${firstName}! 👋` : "Hey there! 👋"}
          </Text>
          <Text style={s.headline}>Travel like{"\n"}never before</Text>
          <Text style={s.sub}>Smart planning, real bookings, zero hassle</Text>
        </View>

        {/* Feature rows */}
        <View style={s.features}>
          {FEATURES.map((f, i) => (
            <View key={i} style={s.row}>
              <View style={[s.iconBox, { backgroundColor: f.color + "22" }]}>
                <IconSymbol name={f.icon} size={20} color={f.color} />
              </View>
              <View style={s.rowText}>
                <Text style={s.rowTitle}>{f.title}</Text>
                <Text style={s.rowDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={s.ctaBlock}>
          <TouchableOpacity
            style={s.btn}
            onPress={() => router.push("/(auth)/quiz" as never)}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={["#6443F4", "#B91C7C", "#F94498"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
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
        </View>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0C0720",
  },

  glowTR: {
    position: "absolute",
    width: 280, height: 280, borderRadius: 140,
    top: -100, right: -100,
    backgroundColor: "rgba(100,67,244,0.18)",
  },
  glowBL: {
    position: "absolute",
    width: 240, height: 240, borderRadius: 120,
    bottom: -60, left: -80,
    backgroundColor: "rgba(249,68,152,0.12)",
  },

  // Main column — fills screen, distributes sections with space-between
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },

  // Mascot centered
  mascotWrap: {
    alignItems: "center",
  },

  // Headline block
  headBlock: {
    alignItems: "center",
    gap: 6,
  },
  greeting: {
    fontSize: 14,
    color: "rgba(196,181,217,0.82)",
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
    letterSpacing: -0.5,
    fontFamily: "Chillax-Bold",
  },
  sub: {
    fontSize: 14,
    color: "rgba(196,181,217,0.78)",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Satoshi-Regular",
  },

  // Feature rows
  features: {
    gap: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconBox: {
    width: 44, height: 44, borderRadius: 13,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  rowText: { flex: 1, gap: 2 },
  rowTitle: {
    fontSize: 14, fontWeight: "700",
    color: "#FFFFFF", fontFamily: "Satoshi-Bold",
  },
  rowDesc: {
    fontSize: 13,
    color: "rgba(196,181,217,0.75)",
    lineHeight: 18,
    fontFamily: "Satoshi-Regular",
  },

  // CTA block
  ctaBlock: {
    gap: 12,
    alignItems: "center",
  },
  btn: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#F94498",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  btnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    gap: 10,
  },
  btnText: {
    fontSize: 16, fontWeight: "700",
    fontFamily: "Chillax-Semibold", color: "#FFFFFF",
  },
  skipText: {
    fontSize: 14,
    color: "rgba(196,181,217,0.75)",
    fontWeight: "500",
    fontFamily: "Satoshi-Medium",
    paddingVertical: 4,
  },
});
