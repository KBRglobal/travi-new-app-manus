// @ts-nocheck
/**
 * SplashScreen — Cinematic Intro
 *
 * Animation sequence (total ~5s):
 * 0.0s  Black screen
 * 0.0s  Mascot starts HUGE (scale 4.5, close-up on face) → snaps to normal (scale 1) in 0.5s
 * 0.5s  Mascot settles with spring bounce
 * 0.8s  Mascot starts gentle float loop
 * 1.0s  Logotype reveals left→right (mask wipe, 0.7s)
 * 1.8s  Gradient accent line sweeps under logo (0.4s)
 * 2.2s  Tagline fades in (0.5s)
 * 4.5s  Fade to black → navigate
 */

import { useEffect, useRef } from "react";
import {
  View, StyleSheet, Animated, Dimensions, Easing, Image,
  Text,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

const MASCOT_SIZE   = width * 0.54;
const LOGO_WIDTH    = width * 0.46;
const LOGO_HEIGHT   = LOGO_WIDTH * 0.32;

export default function SplashScreen() {
  const { state } = useStore();

  // ── Animated values ──────────────────────────────────────────────────────────
  const mascotScale   = useRef(new Animated.Value(4.5)).current;  // starts huge
  const mascotOpacity = useRef(new Animated.Value(0)).current;
  const floatY        = useRef(new Animated.Value(0)).current;

  // Logo: revealed via width mask (0 → LOGO_WIDTH)
  const logoReveal    = useRef(new Animated.Value(0)).current;
  const logoOpacity   = useRef(new Animated.Value(0)).current;

  // Accent line under logo
  const lineWidth     = useRef(new Animated.Value(0)).current;
  const lineOpacity   = useRef(new Animated.Value(0)).current;

  // Tagline
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY       = useRef(new Animated.Value(10)).current;

  // Screen fade-out
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // ── 1. Mascot snap zoom-out ───────────────────────────────────────────────
    Animated.sequence([
      // Flash in at huge scale
      Animated.timing(mascotOpacity, {
        toValue: 1, duration: 80,
        useNativeDriver: true,
      }),
      // Snap back — fast ease-out like the video
      Animated.spring(mascotScale, {
        toValue: 1,
        friction: 4.5,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();

    // ── 2. Float loop (starts at 0.8s) ────────────────────────────────────────
    setTimeout(() => {
      Animated.loop(Animated.sequence([
        Animated.timing(floatY, {
          toValue: -10, duration: 2200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(floatY, {
          toValue: 0, duration: 2200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])).start();
    }, 800);

    // ── 3. Logo reveal — left to right wipe (starts at 1.0s) ─────────────────
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(logoReveal, {
          toValue: LOGO_WIDTH,
          duration: 700,
          useNativeDriver: false,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    }, 1000);

    // ── 4. Accent line sweeps (starts at 1.8s) ────────────────────────────────
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(lineOpacity, {
          toValue: 1, duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(lineWidth, {
          toValue: LOGO_WIDTH * 0.7,
          duration: 400,
          useNativeDriver: false,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    }, 1800);

    // ── 5. Tagline fades in (starts at 2.2s) ─────────────────────────────────
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1, duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(taglineY, {
          toValue: 0, duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    }, 2200);

    // ── 6. Fade to black → navigate (at 4.5s) ────────────────────────────────
    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0, duration: 600,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
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
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[s.root, { opacity: screenOpacity }]}>
      {/* Background — deep dark gradient */}
      <LinearGradient
        colors={["#1A0B2E", "#0E0528", "#1A0B2E"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* ── Center content ── */}
      <View style={s.center}>

        {/* Mascot — starts huge (close-up), snaps to normal */}
        <Animated.View style={{
          transform: [
            { scale: mascotScale },
            { translateY: floatY },
          ],
          opacity: mascotOpacity,
        }}>
          <Image
            source={require("@/assets/logos/mascot-centered.png")}
            style={s.mascot}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Logotype — revealed left→right via animated width clip */}
        <Animated.View style={[s.logoContainer, { opacity: logoOpacity }]}>
          <Animated.View style={[s.logoClip, { width: logoReveal }]}>
            <Image
              source={require("@/assets/logos/logotype-white.webp")}
              style={s.logotype}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>

        {/* Accent line — sweeps left→right under logo */}
        <Animated.View style={[s.accentWrap, { opacity: lineOpacity }]}>
          <Animated.View style={[s.accentLine, { width: lineWidth }]}>
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[s.tagline, {
          opacity: taglineOpacity,
          transform: [{ translateY: taglineY }],
        }]}>
          YOUR AI TRAVEL COMPANION
        </Animated.Text>

      </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1A0B2E",
    alignItems: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  mascot: {
    width: MASCOT_SIZE,
    height: MASCOT_SIZE,
  },
  // Logo clip container — overflow hidden, width animates
  logoContainer: {
    height: LOGO_HEIGHT,
    alignItems: "flex-start",
    overflow: "hidden",
    // Full width so the clip can grow into it
    width: LOGO_WIDTH,
  },
  logoClip: {
    height: LOGO_HEIGHT,
    overflow: "hidden",
  },
  logotype: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  // Accent line
  accentWrap: {
    width: LOGO_WIDTH,
    height: 2,
    alignItems: "flex-start",
    marginTop: -8,
  },
  accentLine: {
    height: 2,
    borderRadius: 1,
    overflow: "hidden",
  },
  tagline: {
    fontSize: 11,
    color: "rgba(196,181,217,0.65)",
    letterSpacing: 3.5,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 4,
  },
});
