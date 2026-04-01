import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top: (i * 37 + 17) % height,
  left: (i * 53 + 23) % width,
  size: i % 7 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
  opacity: 0.1 + (i % 6) * 0.08,
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
    // Ambient orb pulse
    Animated.loop(Animated.sequence([
      Animated.timing(orb1, { toValue: 1.25, duration: 3500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(orb1, { toValue: 0.75, duration: 3500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
    ])).start();
    Animated.loop(Animated.sequence([
      Animated.timing(orb2, { toValue: 1.4, duration: 4500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      Animated.timing(orb2, { toValue: 0.6, duration: 4500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
    ])).start();

    // Entrance sequence
    Animated.sequence([
      // Glow blooms
      Animated.parallel([
        Animated.timing(glowOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(glowScale, { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.back(1.2)) }),
      ]),
      // Logo springs in
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
      ]),
      Animated.delay(100),
      // Title slides up
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(titleY, { toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      ]),
      Animated.delay(200),
      // Tagline
      Animated.timing(taglineOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    // Progress bar
    Animated.timing(progressWidth, {
      toValue: 1, duration: 2400, delay: 1000, useNativeDriver: false,
      easing: Easing.inOut(Easing.quad),
    }).start();

    // Navigate
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
      {/* Deep space gradient */}
      <LinearGradient
        colors={["#040010", "#0D0520", "#18093A", "#0D0520", "#040010"]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Ambient orbs */}
      <Animated.View style={[styles.orb1, { transform: [{ scale: orb1 }] }]} />
      <Animated.View style={[styles.orb2, { transform: [{ scale: orb2 }] }]} />
      <Animated.View style={[styles.orb3, { transform: [{ scale: orb1 }] }]} />

      {/* Stars */}
      {STARS.map((s) => (
        <View key={s.id} style={[styles.star, { top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }]} />
      ))}

      {/* Center content */}
      <View style={styles.center}>
        {/* Glow halo */}
        <Animated.View style={[styles.glowHalo, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}>
          <LinearGradient
            colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)", "transparent"]}
            style={styles.glowGradient}
          />
        </Animated.View>

        {/* Logo card */}
        <Animated.View style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <LinearGradient
            colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]}
            style={styles.logoCard}
          >
            <View style={styles.logoInner}>
              <Image source={require("@/assets/logos/mascot-dark.png")} style={styles.logo} contentFit="contain" />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Title */}
        <Animated.View style={[styles.titleWrap, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}>
          <Text style={styles.title}>TRAVI</Text>
          <View style={styles.titleBar}>
            <LinearGradient colors={["transparent", "#E91E8C", "#7B2FBE", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
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
            <LinearGradient colors={["#7B2FBE", "#E91E8C", "#FF2D78"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <View style={styles.progressGlow} />
          </Animated.View>
        </View>
        <Text style={styles.loadingText}>Preparing your adventure...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010", alignItems: "center" },
  orb1: {
    position: "absolute", width: width * 1.1, height: width * 1.1,
    borderRadius: width * 0.55, top: -width * 0.35, left: -width * 0.25,
    backgroundColor: "rgba(123,47,190,0.15)",
  },
  orb2: {
    position: "absolute", width: width * 0.9, height: width * 0.9,
    borderRadius: width * 0.45, bottom: height * 0.05, right: -width * 0.35,
    backgroundColor: "rgba(233,30,140,0.10)",
  },
  orb3: {
    position: "absolute", width: width * 0.6, height: width * 0.6,
    borderRadius: width * 0.3, top: height * 0.4, left: -width * 0.15,
    backgroundColor: "rgba(0,188,212,0.05)",
  },
  star: { position: "absolute", borderRadius: 2, backgroundColor: "#FFFFFF" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 24 },
  glowHalo: {
    position: "absolute", width: 320, height: 320, borderRadius: 160,
  },
  glowGradient: { width: 320, height: 320, borderRadius: 160 },
  logoWrap: { alignItems: "center" },
  logoCard: {
    width: 150, height: 150, borderRadius: 40,
    padding: 3, borderWidth: 1.5, borderColor: "rgba(123,47,190,0.7)",
    shadowColor: "#7B2FBE", shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9, shadowRadius: 40, elevation: 20,
  },
  logoInner: {
    flex: 1, borderRadius: 37, backgroundColor: "rgba(13,5,32,0.9)",
    alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  logo: { width: 120, height: 120 },
  titleWrap: { alignItems: "center", gap: 8 },
  title: {
    fontSize: 56, fontWeight: "900", color: "#FFFFFF",
    letterSpacing: 14, textAlign: "center",
    textShadowColor: "rgba(123,47,190,0.9)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  titleBar: { width: 100, height: 2.5, borderRadius: 2, overflow: "hidden" },
  tagline: {
    fontSize: 15, color: "rgba(196,181,217,0.75)",
    letterSpacing: 2.5, fontWeight: "500", textAlign: "center",
    textTransform: "uppercase",
  },
  bottomArea: { paddingHorizontal: 50, paddingBottom: 64, gap: 12, alignItems: "center", width: "100%" },
  progressTrack: {
    width: "100%", height: 2.5, backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 2, overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 2, position: "relative" },
  progressGlow: {
    position: "absolute", right: 0, top: -3, width: 20, height: 8,
    backgroundColor: "rgba(233,30,140,0.8)", borderRadius: 4,
  },
  loadingText: {
    color: "rgba(139,122,170,0.6)", fontSize: 11,
    letterSpacing: 2, fontWeight: "600", textTransform: "uppercase",
  },
});
