import { useEffect, useRef, useState } from "react";
import {
  View, StyleSheet, Animated, Dimensions, Easing, Image, Text,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

// ─── Brand ───────────────────────────────────────────────────────────────────
const PURPLE  = "#6443F4";
const PINK    = "#F94498";
const ORANGE  = "#FF9327";

// ─── Particle data (static, generated once) ──────────────────────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * width,
  y: Math.random() * height,
  size: 1.5 + Math.random() * 2.5,
  color: [PURPLE, PINK, ORANGE, "#FFFFFF"][i % 4],
  delay: i * 80,
  duration: 2200 + Math.random() * 1800,
  drift: (Math.random() - 0.5) * 60,
}));

export default function SplashScreen() {
  const { state } = useStore();

  // ── Phase 1: Flash (white burst on open) ──
  const flashOpacity    = useRef(new Animated.Value(1)).current;

  // ── Phase 2: Background gradient reveal ──
  const bgOpacity       = useRef(new Animated.Value(0)).current;

  // ── Phase 3: Orb pulse ──
  const orb1Scale       = useRef(new Animated.Value(0)).current;
  const orb2Scale       = useRef(new Animated.Value(0)).current;
  const orb3Scale       = useRef(new Animated.Value(0)).current;

  // ── Phase 4: Mascot dramatic entrance ──
  const mascotScale     = useRef(new Animated.Value(0)).current;
  const mascotOpacity   = useRef(new Animated.Value(0)).current;
  const mascotY         = useRef(new Animated.Value(60)).current;

  // ── Phase 5: Glow ring ──
  const glowScale       = useRef(new Animated.Value(0.3)).current;
  const glowOpacity     = useRef(new Animated.Value(0)).current;

  // ── Phase 6: Logotype slide up ──
  const logoOpacity     = useRef(new Animated.Value(0)).current;
  const logoY           = useRef(new Animated.Value(30)).current;

  // ── Phase 7: Tagline ──
  const taglineOpacity  = useRef(new Animated.Value(0)).current;
  const taglineScale    = useRef(new Animated.Value(0.85)).current;

  // ── Phase 8: Progress bar ──
  const progressWidth   = useRef(new Animated.Value(0)).current;
  const progressOpacity = useRef(new Animated.Value(0)).current;

  // ── Particles ──
  const particleAnims   = useRef(PARTICLES.map(() => ({
    opacity: new Animated.Value(0),
    y:       new Animated.Value(0),
  }))).current;

  // ── Continuous orb breathing ──
  const breathe1        = useRef(new Animated.Value(1)).current;
  const breathe2        = useRef(new Animated.Value(1)).current;

  // ── Mascot float ──
  const floatY          = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // ── Continuous breathing (starts immediately) ──
    Animated.loop(Animated.sequence([
      Animated.timing(breathe1, { toValue: 1.25, duration: 4000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      Animated.timing(breathe1, { toValue: 0.8,  duration: 4000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
    ])).start();
    Animated.loop(Animated.sequence([
      Animated.timing(breathe2, { toValue: 1.35, duration: 5500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      Animated.timing(breathe2, { toValue: 0.65, duration: 5500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
    ])).start();

    // ── Particles ──
    PARTICLES.forEach((p, i) => {
      const anim = particleAnims[i];
      Animated.loop(
        Animated.sequence([
          Animated.delay(p.delay),
          Animated.parallel([
            Animated.timing(anim.opacity, { toValue: 0.7, duration: 600, useNativeDriver: true }),
            Animated.timing(anim.y, { toValue: -p.drift * 0.5, duration: p.duration / 2, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
          ]),
          Animated.parallel([
            Animated.timing(anim.opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
            Animated.timing(anim.y, { toValue: -p.drift, duration: p.duration / 2, useNativeDriver: true }),
          ]),
          Animated.timing(anim.y, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      ).start();
    });

    // ── Main cinematic sequence ──
    Animated.sequence([
      // Flash out
      Animated.timing(flashOpacity, { toValue: 0, duration: 350, useNativeDriver: true, easing: Easing.out(Easing.quad) }),

      // BG + orbs burst in simultaneously
      Animated.parallel([
        Animated.timing(bgOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(orb1Scale, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }),
        Animated.spring(orb2Scale, { toValue: 1, friction: 5, tension: 35, useNativeDriver: true }),
        Animated.spring(orb3Scale, { toValue: 1, friction: 6, tension: 30, useNativeDriver: true }),
      ]),

      Animated.delay(100),

      // Glow ring expands
      Animated.parallel([
        Animated.timing(glowOpacity, { toValue: 0.6, duration: 600, useNativeDriver: true }),
        Animated.spring(glowScale,   { toValue: 1,   friction: 4, tension: 30, useNativeDriver: true }),
      ]),

      // Mascot dramatic entrance — scale from 0 with spring bounce
      Animated.parallel([
        Animated.timing(mascotOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(mascotScale,   { toValue: 1, friction: 4, tension: 50, useNativeDriver: true }),
        Animated.timing(mascotY,       { toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.back(1.5)) }),
      ]),

      Animated.delay(120),

      // Logotype slides up
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(logoY,       { toValue: 0, duration: 450, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      ]),

      Animated.delay(100),

      // Tagline pops in
      Animated.parallel([
        Animated.timing(taglineOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(taglineScale,   { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
      ]),

      Animated.delay(150),

      // Progress bar fades in and fills
      Animated.timing(progressOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    // Progress fill (non-native driver — runs in parallel with sequence)
    Animated.timing(progressWidth, {
      toValue: 1, duration: 2000, delay: 1400, useNativeDriver: false,
      easing: Easing.inOut(Easing.quad),
    }).start();

    // Mascot gentle float loop (starts after entrance)
    setTimeout(() => {
      Animated.loop(Animated.sequence([
        Animated.timing(floatY, { toValue: -10, duration: 1800, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(floatY, { toValue:   0, duration: 1800, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ])).start();
    }, 1200);

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
    }, 3400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={s.root}>
      {/* ── Background gradient ── */}
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: bgOpacity }]}>
        <LinearGradient
          colors={["#0A0520", "#150835", "#1E0D4A", "#150835", "#0A0520"]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.7, y: 1 }}
        />
      </Animated.View>

      {/* ── Orbs ── */}
      <Animated.View style={[s.orb1, { transform: [{ scale: Animated.multiply(orb1Scale, breathe1) }] }]} />
      <Animated.View style={[s.orb2, { transform: [{ scale: Animated.multiply(orb2Scale, breathe2) }] }]} />
      <Animated.View style={[s.orb3, { transform: [{ scale: orb3Scale }] }]} />

      {/* ── Particles ── */}
      {PARTICLES.map((p, i) => (
        <Animated.View
          key={p.id}
          style={[s.particle, {
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            borderRadius: p.size / 2,
            backgroundColor: p.color,
            opacity: particleAnims[i].opacity,
            transform: [{ translateY: particleAnims[i].y }],
          }]}
        />
      ))}

      {/* ── Glow ring behind mascot ── */}
      <Animated.View style={[s.glowRing, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}>
        <LinearGradient
          colors={[PURPLE + "55", PINK + "33", "transparent"]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* ── Center content ── */}
      <View style={s.center}>
        {/* Mascot */}
        <Animated.View style={{
          opacity: mascotOpacity,
          transform: [
            { scale: mascotScale },
            { translateY: Animated.add(mascotY, floatY) },
          ],
        }}>
          <Image
            source={require("@/assets/logos/mascot-centered.png")}
            style={s.mascot}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Logotype */}
        <Animated.View style={[s.logoWrap, { opacity: logoOpacity, transform: [{ translateY: logoY }] }]}>
          <Image
            source={require("@/assets/logos/logotype-white.webp")}
            style={s.logotype}
            resizeMode="contain"
          />
          {/* Accent line */}
          <View style={s.accentLine}>
            <LinearGradient
              colors={["transparent", PINK, PURPLE, "transparent"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[s.tagline, {
          opacity: taglineOpacity,
          transform: [{ scale: taglineScale }],
        }]}>
          Your AI Travel Companion
        </Animated.Text>
      </View>

      {/* ── Progress bar ── */}
      <Animated.View style={[s.bottom, { opacity: progressOpacity }]}>
        <View style={s.progressTrack}>
          <Animated.View style={[s.progressFill, {
            width: progressWidth.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
          }]}>
            <LinearGradient
              colors={[PURPLE, PINK, ORANGE]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={s.progressGlow} />
          </Animated.View>
        </View>
        <Text style={s.loadingText}>Preparing your adventure...</Text>
      </Animated.View>

      {/* ── White flash overlay (fades out at start) ── */}
      <Animated.View style={[StyleSheet.absoluteFillObject, s.flash, { opacity: flashOpacity }]} />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0A0520",
    alignItems: "center",
  },

  // Orbs
  orb1: {
    position: "absolute",
    width: width * 1.6, height: width * 1.6,
    borderRadius: width * 0.8,
    top: -width * 0.8, left: -width * 0.55,
    backgroundColor: "rgba(100,67,244,0.18)",
  },
  orb2: {
    position: "absolute",
    width: width * 1.1, height: width * 1.1,
    borderRadius: width * 0.55,
    bottom: -height * 0.05, right: -width * 0.45,
    backgroundColor: "rgba(249,68,152,0.13)",
  },
  orb3: {
    position: "absolute",
    width: width * 0.8, height: width * 0.8,
    borderRadius: width * 0.4,
    top: height * 0.5, left: -width * 0.25,
    backgroundColor: "rgba(255,147,39,0.07)",
  },

  // Particles
  particle: {
    position: "absolute",
  },

  // Glow ring
  glowRing: {
    position: "absolute",
    width: width * 0.75, height: width * 0.75,
    borderRadius: width * 0.375,
    top: height * 0.5 - width * 0.375 - 60,
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.25)",
  },

  // Center
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  mascot: {
    width: width * 0.48,
    height: width * 0.48,
  },
  logoWrap: {
    alignItems: "center",
    gap: 10,
  },
  logotype: {
    width: width * 0.42,
    height: width * 0.14,
  },
  accentLine: {
    width: 140, height: 2,
    borderRadius: 2,
    overflow: "hidden",
  },
  tagline: {
    fontSize: 13,
    color: "rgba(255,255,255,0.88)",
    letterSpacing: 2,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Satoshi-Medium",
  },

  // Progress
  bottom: {
    paddingHorizontal: 44,
    paddingBottom: 120,
    gap: 10,
    alignItems: "center",
    width: "100%",
  },
  progressTrack: {
    width: "100%", height: 3,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
    position: "relative",
  },
  progressGlow: {
    position: "absolute",
    right: 0, top: -4,
    width: 24, height: 10,
    backgroundColor: "rgba(249,68,152,0.9)",
    borderRadius: 5,
  },
  loadingText: {
    color: "rgba(200,190,230,0.75)",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "600",
    textTransform: "uppercase",
    fontFamily: "Satoshi-Medium",
  },

  // Flash
  flash: {
    backgroundColor: "#FFFFFF",
    pointerEvents: "none",
  },
});
