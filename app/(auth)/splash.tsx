import { useEffect, useRef } from "react";
import {
  View, StyleSheet, Animated, Dimensions, Easing, Image, Text,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

const PURPLE = "#6443F4";
const PINK   = "#F94498";
const ORANGE = "#FF9327";

// ── Particles ─────────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: Math.random() * width,
  y: Math.random() * height,
  size: 1.2 + Math.random() * 3,
  color: [PURPLE, PINK, ORANGE, "#FFFFFF", "#C4B5F9"][i % 5],
  delay: 600 + i * 60,
  duration: 2800 + Math.random() * 2200,
  drift: (Math.random() - 0.5) * 80,
}));

// ── Ring data ─────────────────────────────────────────────────────────────────
const RINGS = [
  { size: width * 0.55, color: PURPLE + "30", delay: 700,  duration: 900 },
  { size: width * 0.80, color: PINK   + "20", delay: 900,  duration: 900 },
  { size: width * 1.10, color: PURPLE + "12", delay: 1100, duration: 900 },
];

export default function SplashScreen() {
  const { state } = useStore();

  // ── Animated values ──────────────────────────────────────────────────────────
  const flashOpacity   = useRef(new Animated.Value(1)).current;
  const bgOpacity      = useRef(new Animated.Value(0)).current;

  const orb1Scale      = useRef(new Animated.Value(0)).current;
  const orb2Scale      = useRef(new Animated.Value(0)).current;
  const orb3Scale      = useRef(new Animated.Value(0)).current;
  const breathe1       = useRef(new Animated.Value(1)).current;
  const breathe2       = useRef(new Animated.Value(1)).current;

  const ringAnims      = useRef(RINGS.map(() => ({
    scale:   new Animated.Value(0),
    opacity: new Animated.Value(0),
  }))).current;

  const mascotScale    = useRef(new Animated.Value(0)).current;
  const mascotOpacity  = useRef(new Animated.Value(0)).current;
  const mascotRotate   = useRef(new Animated.Value(-8)).current;
  const floatY         = useRef(new Animated.Value(0)).current;

  const glowScale      = useRef(new Animated.Value(0.4)).current;
  const glowOpacity    = useRef(new Animated.Value(0)).current;

  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const logoY          = useRef(new Animated.Value(40)).current;
  const logoScale      = useRef(new Animated.Value(0.85)).current;

  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY       = useRef(new Animated.Value(16)).current;

  const screenOpacity  = useRef(new Animated.Value(1)).current;
  const dotsOpacity    = useRef(new Animated.Value(0)).current;

  const particleAnims  = useRef(PARTICLES.map(() => ({
    opacity: new Animated.Value(0),
    y:       new Animated.Value(0),
    x:       new Animated.Value(0),
  }))).current;

  useEffect(() => {
    // ── Continuous orb breathing ──────────────────────────────────────────────
    Animated.loop(Animated.sequence([
      Animated.timing(breathe1, { toValue: 1.3,  duration: 4500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      Animated.timing(breathe1, { toValue: 0.75, duration: 4500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
    ])).start();
    Animated.loop(Animated.sequence([
      Animated.timing(breathe2, { toValue: 1.4,  duration: 6000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      Animated.timing(breathe2, { toValue: 0.6,  duration: 6000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
    ])).start();

    // ── Particles ─────────────────────────────────────────────────────────────
    PARTICLES.forEach((p, i) => {
      const anim = particleAnims[i];
      const loop = () => {
        anim.y.setValue(0);
        anim.x.setValue(0);
        Animated.sequence([
          Animated.delay(p.delay + i * 30),
          Animated.parallel([
            Animated.timing(anim.opacity, { toValue: 0.8, duration: 500, useNativeDriver: true }),
            Animated.timing(anim.y, { toValue: -p.drift, duration: p.duration, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
            Animated.timing(anim.x, { toValue: (Math.random() - 0.5) * 30, duration: p.duration, useNativeDriver: true }),
          ]),
          Animated.timing(anim.opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]).start(({ finished }) => { if (finished) loop(); });
      };
      loop();
    });

    // ── Rings ripple ──────────────────────────────────────────────────────────
    RINGS.forEach((r, i) => {
      const anim = ringAnims[i];
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(anim.opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(anim.scale,   { toValue: 1, duration: r.duration, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
        ]).start(() => {
          Animated.timing(anim.opacity, { toValue: 0, duration: 400, useNativeDriver: true }).start();
        });
      }, r.delay);
    });

    // ── Main cinematic sequence ───────────────────────────────────────────────
    Animated.sequence([
      // 1. Flash fades out — dramatic black reveal
      Animated.timing(flashOpacity, {
        toValue: 0, duration: 500,
        useNativeDriver: true, easing: Easing.out(Easing.cubic),
      }),

      // 2. Background + orbs burst in
      Animated.parallel([
        Animated.timing(bgOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(orb1Scale, { toValue: 1, friction: 3.5, tension: 35, useNativeDriver: true }),
        Animated.spring(orb2Scale, { toValue: 1, friction: 4,   tension: 30, useNativeDriver: true }),
        Animated.spring(orb3Scale, { toValue: 1, friction: 5,   tension: 25, useNativeDriver: true }),
      ]),

      Animated.delay(80),

      // 3. Glow halo expands behind mascot
      Animated.parallel([
        Animated.timing(glowOpacity, { toValue: 0.75, duration: 700, useNativeDriver: true }),
        Animated.timing(glowScale,   { toValue: 1,    duration: 800, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      ]),

      Animated.delay(60),

      // 4. Mascot SLAMS in — scale from 0 with rotation snap
      Animated.parallel([
        Animated.timing(mascotOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(mascotScale, {
          toValue: 1, friction: 3.5, tension: 70, useNativeDriver: true,
        }),
        Animated.timing(mascotRotate, {
          toValue: 0, duration: 500, useNativeDriver: true,
          easing: Easing.out(Easing.back(2)),
        }),
      ]),

      Animated.delay(200),

      // 5. Logotype slides up with scale pop
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(logoY,       { toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.back(1.2)) }),
        Animated.spring(logoScale,   { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      ]),

      Animated.delay(120),

      // 6. Tagline drifts up
      Animated.parallel([
        Animated.timing(taglineOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(taglineY,       { toValue: 0, duration: 550, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      ]),

      Animated.delay(100),

      // 7. (no progress bar)
    ]).start();

    // Dots fade in after tagline
    Animated.timing(dotsOpacity, {
      toValue: 1, duration: 400, delay: 2000,
      useNativeDriver: true,
    }).start();

    // Mascot float loop (after entrance)
    setTimeout(() => {
      Animated.loop(Animated.sequence([
        Animated.timing(floatY, { toValue: -12, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(floatY, { toValue:   0, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ])).start();
    }, 1400);

    // Navigate with fade-out
    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0, duration: 500,
        useNativeDriver: true, easing: Easing.in(Easing.cubic),
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
    }, 3400);
    return () => clearTimeout(timer);
  }, []);

  const mascotRotateDeg = mascotRotate.interpolate({
    inputRange: [-8, 0], outputRange: ["-8deg", "0deg"],
  });

  return (
    <Animated.View style={[s.root, { opacity: screenOpacity }]}>
      {/* ── Background ── */}
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: bgOpacity }]}>
        <LinearGradient
          colors={["#06021A", "#0E0528", "#1A0840", "#0E0528", "#06021A"]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0.3, y: 0 }} end={{ x: 0.7, y: 1 }}
        />
      </Animated.View>

      {/* ── Orbs ── */}
      <Animated.View style={[s.orb1, { transform: [{ scale: Animated.multiply(orb1Scale, breathe1) }] }]} />
      <Animated.View style={[s.orb2, { transform: [{ scale: Animated.multiply(orb2Scale, breathe2) }] }]} />
      <Animated.View style={[s.orb3, { transform: [{ scale: orb3Scale }] }]} />

      {/* ── Ripple rings ── */}
      {RINGS.map((r, i) => (
        <Animated.View
          key={i}
          style={[s.ring, {
            width: r.size, height: r.size,
            borderRadius: r.size / 2,
            marginLeft: -r.size / 2,
            marginTop: -r.size / 2,
            borderColor: r.color,
            opacity: ringAnims[i].opacity,
            transform: [{ scale: ringAnims[i].scale }],
          }]}
        />
      ))}

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
            transform: [
              { translateY: particleAnims[i].y },
              { translateX: particleAnims[i].x },
            ],
          }]}
        />
      ))}

      {/* ── Glow halo ── */}
      <Animated.View style={[s.glowHalo, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}>
        <LinearGradient
          colors={[PURPLE + "60", PINK + "40", "transparent"]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* ── Center content ── */}
      <View style={s.center}>
        {/* Mascot */}
        <Animated.View style={{
          opacity: mascotOpacity,
          transform: [
            { scale: mascotScale },
            { rotate: mascotRotateDeg },
            { translateY: floatY },
          ],
        }}>
          <Image
            source={require("@/assets/logos/mascot-centered.png")}
            style={s.mascot}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Logotype */}
        <Animated.View style={[s.logoWrap, {
          opacity: logoOpacity,
          transform: [{ translateY: logoY }, { scale: logoScale }],
        }]}>
          <Image
            source={require("@/assets/logos/logotype-white.webp")}
            style={s.logotype}
            resizeMode="contain"
          />
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
          transform: [{ translateY: taglineY }],
        }]}>
          YOUR AI TRAVEL COMPANION
        </Animated.Text>
      </View>

      {/* ── Dots indicator ── */}
      <Animated.View style={[s.bottom, { opacity: dotsOpacity }]}>
        <View style={s.dotsRow}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[s.dot, i === 1 && s.dotActive]} />
          ))}
        </View>
      </Animated.View>

      {/* ── Flash overlay ── */}
      <Animated.View style={[StyleSheet.absoluteFillObject, s.flash, { opacity: flashOpacity }]} />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#06021A",
    alignItems: "center",
  },
  orb1: {
    position: "absolute",
    width: width * 1.8, height: width * 1.8,
    borderRadius: width * 0.9,
    top: -width * 0.9, left: -width * 0.65,
    backgroundColor: "rgba(100,67,244,0.22)",
  },
  orb2: {
    position: "absolute",
    width: width * 1.2, height: width * 1.2,
    borderRadius: width * 0.6,
    bottom: -height * 0.08, right: -width * 0.5,
    backgroundColor: "rgba(249,68,152,0.16)",
  },
  orb3: {
    position: "absolute",
    width: width * 0.9, height: width * 0.9,
    borderRadius: width * 0.45,
    top: height * 0.55, left: -width * 0.3,
    backgroundColor: "rgba(255,147,39,0.09)",
  },
  ring: {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderWidth: 1.5,
  },
  particle: {
    position: "absolute",
  },
  glowHalo: {
    position: "absolute",
    width: width * 0.80, height: width * 0.80,
    borderRadius: width * 0.40,
    top: height * 0.5 - width * 0.40 - 80,
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.30)",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  mascot: {
    width: width * 0.52,
    height: width * 0.52,
  },
  logoWrap: {
    alignItems: "center",
    gap: 12,
  },
  logotype: {
    width: width * 0.44,
    height: width * 0.15,
  },
  accentLine: {
    width: 160, height: 2,
    borderRadius: 2,
    overflow: "hidden",
  },
  tagline: {
    fontSize: 11,
    color: "rgba(196,181,217,0.70)",
    letterSpacing: 3.5,
    fontWeight: "600",
    textAlign: "center",
  },
  bottom: {
    paddingHorizontal: 44,
    paddingBottom: 110,
    gap: 10,
    alignItems: "center",
    width: "100%",
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dot: {
    width: 6, height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: {
    width: 20, height: 6,
    borderRadius: 3,
    backgroundColor: PINK,
  },
  flash: {
    backgroundColor: "#FFFFFF",
  },
});
