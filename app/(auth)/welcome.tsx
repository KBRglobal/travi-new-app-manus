/**
 * Welcome Screen — Neutral Wireframe
 * Spec: Hero image (55% height), headline, body, Get Started, I have an account, Skip
 * All logic preserved, visual stripped to neutral.
 */
import { useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const N = {
  bg:       "#111111",
  surface:  "#1A1A1A",
  white:    "#FFFFFF",
  textSec:  "#ABABAB",
  textTer:  "#777777",
  accent:   "#007AFF",
  border:   "#333333",
};

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  const fadeHero = useRef(new Animated.Value(0)).current;
  const fadeText = useRef(new Animated.Value(0)).current;
  const textY    = useRef(new Animated.Value(20)).current;
  const fadeCTA  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeHero, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(fadeText, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(textY,    { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.timing(fadeCTA, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Skip button */}
      <TouchableOpacity
        style={s.skipBtn}
        onPress={() => router.push("/(auth)/sign-up" as never)}
        activeOpacity={0.7}
      >
        <Text style={s.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Hero placeholder (55% height) */}
      <Animated.View style={[s.heroPlaceholder, { opacity: fadeHero }]}>
        <View style={s.heroInner}>
          <Text style={s.heroLabel}>Hero Image</Text>
          <Text style={s.heroSub}>Travel destination photo</Text>
        </View>
      </Animated.View>

      {/* Content section */}
      <View style={[s.content, { paddingBottom: insets.bottom + 40 }]}>
        <Animated.View style={{ opacity: fadeText, transform: [{ translateY: textY }] }}>
          <Text style={s.headline}>
            {"Stop searching.\nStart discovering."}
          </Text>
          <Text style={s.body}>
            Let AI find trips that feel right — not just look right.
          </Text>
        </Animated.View>

        <Animated.View style={[s.ctaSection, { opacity: fadeCTA }]}>
          {/* Primary CTA */}
          <TouchableOpacity
            style={s.primaryBtn}
            onPress={() => router.push("/(auth)/sign-up" as never)}
            activeOpacity={0.8}
          >
            <Text style={s.primaryBtnText}>Get Started</Text>
          </TouchableOpacity>

          {/* Secondary link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-up" as never)}
            activeOpacity={0.6}
          >
            <Text style={s.secondaryLink}>I have an account</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },

  skipBtn: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  skipText: { fontSize: 14, color: N.textTer, fontWeight: "500" },

  // Hero placeholder — 55% of screen
  heroPlaceholder: {
    height: height * 0.55,
    width: "100%",
    backgroundColor: N.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  heroInner: { alignItems: "center", gap: 4 },
  heroLabel: { fontSize: 18, color: N.textTer, fontWeight: "600" },
  heroSub: { fontSize: 13, color: "#555" },

  // Content section
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    justifyContent: "space-between",
  },

  headline: {
    fontSize: 32,
    fontWeight: "800",
    color: N.white,
    lineHeight: 36,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: N.textSec,
    lineHeight: 24,
  },

  ctaSection: { gap: 16, alignItems: "center" },

  primaryBtn: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    backgroundColor: N.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtnText: { fontSize: 16, fontWeight: "700", color: N.white },

  secondaryLink: { fontSize: 14, color: N.textTer, fontWeight: "500", paddingVertical: 4 },
});
