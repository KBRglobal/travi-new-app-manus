/**
 * SplashScreen — Neutral Wireframe
 * Keeps: auth check, navigation logic, loading animation
 * Removed: gradients, orbs, mascot zoom, accent line
 */
import { useEffect, useRef } from "react";
import {
  View, StyleSheet, Animated, Easing, Text,
} from "react-native";
import { router } from "expo-router";
import { useStore } from "@/lib/store";

const N = {
  bg:      "#111111",
  white:   "#FFFFFF",
  textSec: "#ABABAB",
  accent:  "#007AFF",
};

export default function SplashScreen() {
  const { state } = useStore();

  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Loading dots pulse
    const pulse = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1.4, duration: 400, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(dot, { toValue: 1, duration: 400, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        ])
      );
    pulse(dot1, 0).start();
    pulse(dot2, 200).start();
    pulse(dot3, 400).start();

    // Navigate after 2.5s
    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0, duration: 400,
        useNativeDriver: true,
      }).start(() => {
        if (state.isAuthenticated || state.isGuest) {
          if (!state.onboardingCompleted) {
            router.replace("/(auth)/welcome" as never);
          } else {
            router.replace("/(tabs)" as never);
          }
        } else {
          router.replace("/(auth)/sign-up" as never);
        }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[s.root, { opacity: screenOpacity }]}>
      <View style={s.center}>
        {/* Logo placeholder */}
        <View style={s.logoBox}>
          <Text style={s.logoText}>TRAVI</Text>
        </View>
        <Text style={s.tagline}>Your AI Travel Companion</Text>

        {/* Loading dots */}
        <View style={s.dotsRow}>
          {[dot1, dot2, dot3].map((dot, i) => (
            <Animated.View
              key={i}
              style={[s.dot, { transform: [{ scale: dot }] }]}
            />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg, alignItems: "center", justifyContent: "center" },
  center: { alignItems: "center", gap: 16 },
  logoBox: { marginBottom: 8 },
  logoText: { fontSize: 40, fontWeight: "800", color: N.white, letterSpacing: 2 },
  tagline: { fontSize: 16, color: N.textSec },
  dotsRow: { flexDirection: "row", gap: 10, marginTop: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: N.accent },
});
