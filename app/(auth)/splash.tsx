import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing, Image } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

// TRAVI Brand Colors
const PURPLE = "#6443F4";
const ORANGE = "#FF9327";
const PINK = "#F94498";
const GREEN = "#02A65C";

const DOTS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  top: (i * 97 + 40) % height,
  left: (i * 83 + 25) % width,
  size: i % 3 === 0 ? 5 : 3,
  opacity: 0.06 + (i % 4) * 0.03,
  color: i % 4 === 0 ? ORANGE : i % 4 === 1 ? PINK : i % 4 === 2 ? GREEN : PURPLE,
}));

export default function SplashScreen() {
  const { state } = useStore();

  const logoScale = useRef(new Animated.Value(0.2)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.5)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(40)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const orb1 = useRef(new Animated.Value(1)).current;
  const orb2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(orb1, { toValue: 1.3, duration: 3500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      Animated.timing(orb1, { toValue: 0.7, duration: 3500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
    ])).start();
    Animated.loop(Animated.sequence([
      Animated.timing(orb2, { toValue: 1.4, duration: 4500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      Animated.timing(orb2, { toValue: 0.6, duration: 4500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
    ])).start();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(glowOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(glowScale, { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.back(1.2)) }),
      ]),
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(titleY, { toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      ]),
      Animated.delay(200),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    Animated.timing(progressWidth, {
      toValue: 1, duration: 2400, delay: 1000, useNativeDriver: false,
      easing: Easing.inOut(Easing.quad),
    }).start();

    const timer = setTimeout(() => {
      if (state.isAuthenticated || state.isGuest) {
        if (!state.onboardingCompleted) {
          router.replace("/(auth)/welcome" as never);
        } else {
          router.replace("/(tabs)" as never);
        }
      } else {
        router.replace("/(auth)/sign-up" as never);
      }
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background gradient - deep purple */}
      <LinearGradient
        colors={["#0D0628", "#1A0A3D", "#2A1060", "#1A0A3D", "#0D0628"]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Ambient orbs */}
      <Animated.View style={[styles.orb1, { transform: [{ scale: orb1 }] }]} />
      <Animated.View style={[styles.orb2, { transform: [{ scale: orb2 }] }]} />
      <Animated.View style={[styles.orb3, { transform: [{ scale: orb1 }] }]} />

      {/* Brand color dots */}
      {DOTS.map((d) => (
        <View key={d.id} style={[styles.dot, {
          top: d.top, left: d.left,
          width: d.size, height: d.size,
          opacity: d.opacity,
          backgroundColor: d.color,
        }]} />
      ))}

      {/* Center content */}
      <View style={styles.center}>
        {/* Mascot — duck directly on background, no rings or halos */}
        <Animated.View style={[{ opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <Image
            source={require("@/assets/logos/mascot-centered.png")}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Logotype — white version for dark background */}
        <Animated.View style={[styles.titleWrap, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}>
          <Image
            source={require("@/assets/logos/logotype-white.webp")}
            style={styles.logotype}
            resizeMode="contain"
          />
          <View style={styles.titleBar}>
            <LinearGradient
              colors={["transparent", PINK, PURPLE, "transparent"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Your AI Travel Companion
        </Animated.Text>
      </View>

      {/* Progress */}
      <Animated.View style={[styles.bottomArea, { opacity: taglineOpacity }]}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, {
            width: progressWidth.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] })
          }]}>
            <LinearGradient
              colors={[PURPLE, PINK, ORANGE]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.progressGlow} />
          </Animated.View>
        </View>
        <Animated.Text style={[styles.loadingText, { opacity: taglineOpacity }]}>Preparing your adventure...</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628", alignItems: "center" },
  orb1: {
    position: "absolute", width: width * 1.4, height: width * 1.4,
    borderRadius: width * 0.7, top: -width * 0.7, left: -width * 0.5,
    backgroundColor: "rgba(100,67,244,0.15)",
  },
  orb2: {
    position: "absolute", width: width * 1.0, height: width * 1.0,
    borderRadius: width * 0.5, bottom: -height * 0.1, right: -width * 0.4,
    backgroundColor: "rgba(249,68,152,0.10)",
  },
  orb3: {
    position: "absolute", width: width * 0.7, height: width * 0.7,
    borderRadius: width * 0.35, top: height * 0.55, left: -width * 0.2,
    backgroundColor: "rgba(255,147,39,0.05)",
  },
  dot: { position: "absolute", borderRadius: 3 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 20 },
  mascotImage: {
    width: 200, height: 200,
  },
  logotype: { width: 160, height: 56 },
  titleWrap: { alignItems: "center", gap: 10 },
  titleBar: { width: 120, height: 2, borderRadius: 2, overflow: "hidden" },
  tagline: {
    fontSize: 13, color: "rgba(200,190,230,0.7)",
    letterSpacing: 3, fontWeight: "500", textAlign: "center",
    textTransform: "uppercase", fontFamily: "Satoshi-Medium",
  },
  bottomArea: { paddingHorizontal: 50, paddingBottom: 130, gap: 12, alignItems: "center", width: "100%" },
  progressTrack: {
    width: "100%", height: 3, backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 2, overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 2, position: "relative" },
  progressGlow: {
    position: "absolute", right: 0, top: -3, width: 20, height: 8,
    backgroundColor: "rgba(249,68,152,0.8)", borderRadius: 4,
  },
  loadingText: {
    color: "rgba(160,145,200,0.6)", fontSize: 11,
    letterSpacing: 2, fontWeight: "600", textTransform: "uppercase",
    fontFamily: "Satoshi-Medium",
  },
});
