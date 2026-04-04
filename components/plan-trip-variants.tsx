// Plan a Trip — 5 design variants for user selection
// Temporary component: user picks one, then we keep only that variant

import { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

const { width: W } = Dimensions.get("window");
const CARD_W = W - 32;

const C = {
  bg: "#0D0221",
  purple: "#6443F4",
  pink: "#F94498",
  cyan: "#01BEFF",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.6)",
  frosted: "rgba(255,255,255,0.12)",
};

function haptic() {
  if (Platform.OS !== "web") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

// ═══════════════════════════════════════════════════
// VARIANT 1 — Holographic Portal
// ═══════════════════════════════════════════════════
function HolographicPortal({ onPress }: { onPress: () => void }) {
  const shimmer = useRef(new Animated.Value(0)).current;
  const planeX = useRef(new Animated.Value(-40)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, { toValue: 1, duration: 3000, useNativeDriver: false })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(planeX, { toValue: CARD_W + 40, duration: 4000, useNativeDriver: true }),
        Animated.timing(planeX, { toValue: -40, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const bg1 = shimmer.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#6443F4", "#F94498", "#01BEFF", "#6443F4"],
  });
  const bg2 = shimmer.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#F94498", "#01BEFF", "#6443F4", "#F94498"],
  });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [vs.card, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bg1, opacity: 0.6 }]} />
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bg2, opacity: 0.3 }]} />
      {/* Shimmer overlay */}
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.08)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* AI pill */}
      <View style={vs.aiPill}>
        <Text style={vs.aiPillText}>AI ✦</Text>
      </View>
      {/* Animated plane with trail */}
      <Animated.View style={[vs.planeWrap, { transform: [{ translateX: planeX }] }]}>
        <View style={vs.planeTrail} />
        <MaterialIcons name="flight" size={22} color="rgba(255,255,255,0.7)" style={{ transform: [{ rotate: "45deg" }] }} />
      </Animated.View>
      {/* Text */}
      <View style={vs.textWrap}>
        <Text style={vs.title}>Plan a Trip</Text>
        <Text style={vs.sub}>Personalized itinerary in minutes</Text>
      </View>
    </Pressable>
  );
}

// ═══════════════════════════════════════════════════
// VARIANT 2 — Glassmorphism + Particles
// ═══════════════════════════════════════════════════
function GlassParticles({ onPress }: { onPress: () => void }) {
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      anim: new Animated.Value(0),
      delay: Math.random() * 2000,
    }))
  ).current;

  useEffect(() => {
    particles.forEach((p) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(p.delay),
          Animated.timing(p.anim, { toValue: 1, duration: 2500, useNativeDriver: true }),
          Animated.timing(p.anim, { toValue: 0, duration: 2500, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [vs.card, vs.glassCard, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      {/* Particles */}
      {particles.map((p) => (
        <Animated.View
          key={p.id}
          style={[
            vs.particle,
            {
              left: `${p.x}%` as any,
              top: `${p.y}%` as any,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              opacity: p.anim,
              transform: [{ scale: p.anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.5] }) }],
            },
          ]}
        />
      ))}
      {/* AI pill */}
      <View style={vs.aiPill}>
        <Text style={vs.aiPillText}>AI ✦</Text>
      </View>
      {/* Center icon */}
      <View style={vs.centerIcon}>
        <MaterialIcons name="public" size={40} color="rgba(100,67,244,0.4)" />
      </View>
      {/* Text */}
      <View style={vs.textWrap}>
        <Text style={vs.title}>Plan a Trip</Text>
        <Text style={vs.sub}>Personalized itinerary in minutes</Text>
      </View>
    </Pressable>
  );
}

// ═══════════════════════════════════════════════════
// VARIANT 3 — Gradient Mesh + 3D Icon
// ═══════════════════════════════════════════════════
function MeshGradient({ onPress }: { onPress: () => void }) {
  const iconScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconScale, { toValue: 1.08, duration: 2000, useNativeDriver: true }),
        Animated.timing(iconScale, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [vs.card, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      {/* Mesh-like gradient layers */}
      <LinearGradient
        colors={["#2D1B69", "#1A0B3E", "#0D0221"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[vs.meshOrb, { top: -20, right: -20, backgroundColor: "rgba(100,67,244,0.25)" }]} />
      <View style={[vs.meshOrb, { bottom: -30, left: -10, backgroundColor: "rgba(249,68,152,0.15)", width: 140, height: 140 }]} />
      <View style={[vs.meshOrb, { top: 20, left: "40%" as any, backgroundColor: "rgba(1,190,255,0.1)", width: 100, height: 100 }]} />
      {/* AI pill */}
      <View style={vs.aiPill}>
        <Text style={vs.aiPillText}>AI ✦</Text>
      </View>
      {/* 3D Icon */}
      <Animated.View style={[vs.icon3d, { transform: [{ scale: iconScale }] }]}>
        <MaterialIcons name="flight-takeoff" size={48} color="rgba(255,255,255,0.85)" />
      </Animated.View>
      {/* Text */}
      <View style={vs.textWrap}>
        <Text style={vs.title}>Plan a Trip</Text>
        <Text style={vs.sub}>Personalized itinerary in minutes</Text>
      </View>
    </Pressable>
  );
}

// ═══════════════════════════════════════════════════
// VARIANT 4 — Neon Outline
// ═══════════════════════════════════════════════════
function NeonOutline({ onPress }: { onPress: () => void }) {
  const glow = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.4, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <Animated.View style={[vs.card, vs.neonCard, { opacity: glow.interpolate({ inputRange: [0.4, 1], outputRange: [0.85, 1] }) }]}>
        <View style={vs.neonInner}>
          {/* AI pill */}
          <View style={vs.aiPill}>
            <Text style={vs.aiPillText}>AI ✦</Text>
          </View>
          {/* Center text with glow */}
          <View style={vs.neonCenter}>
            <Text style={vs.neonStar}>✦</Text>
            <Text style={vs.neonTitle}>Plan a Trip</Text>
            <Text style={vs.neonSub}>Personalized itinerary in minutes</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

// ═══════════════════════════════════════════════════
// VARIANT 5 — Animated Map Lines
// ═══════════════════════════════════════════════════
function MapLines({ onPress }: { onPress: () => void }) {
  const dotPos = useRef(new Animated.Value(0)).current;
  const compassSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(dotPos, { toValue: 1, duration: 3000, useNativeDriver: true })
    ).start();
    Animated.loop(
      Animated.timing(compassSpin, { toValue: 1, duration: 8000, useNativeDriver: true })
    ).start();
  }, []);

  const dotX = dotPos.interpolate({ inputRange: [0, 1], outputRange: [20, CARD_W - 40] });
  const dotY = dotPos.interpolate({ inputRange: [0, 0.3, 0.6, 1], outputRange: [100, 40, 80, 30] });
  const spin = compassSpin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [vs.card, vs.mapCard, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      {/* Flight path lines */}
      <View style={[vs.pathLine, { top: 50, left: 20, width: "70%" as any, transform: [{ rotate: "-15deg" }] }]} />
      <View style={[vs.pathLine, { top: 80, left: 40, width: "60%" as any, transform: [{ rotate: "10deg" }] }]} />
      <View style={[vs.pathLine, { top: 110, left: 10, width: "80%" as any, transform: [{ rotate: "-5deg" }] }]} />
      {/* Moving dot */}
      <Animated.View style={[vs.movingDot, { transform: [{ translateX: dotX }, { translateY: dotY }] }]} />
      {/* Compass */}
      <Animated.View style={[vs.compassWrap, { transform: [{ rotate: spin }] }]}>
        <MaterialIcons name="explore" size={36} color="rgba(100,67,244,0.35)" />
      </Animated.View>
      {/* AI pill */}
      <View style={vs.aiPill}>
        <Text style={vs.aiPillText}>AI ✦</Text>
      </View>
      {/* Text */}
      <View style={vs.textWrap}>
        <Text style={vs.title}>Plan a Trip</Text>
        <Text style={vs.sub}>Personalized itinerary in minutes</Text>
      </View>
    </Pressable>
  );
}

// ═══════════════════════════════════════════════════
// VARIANT SELECTOR — arrows + dots
// ═══════════════════════════════════════════════════
const VARIANT_NAMES = [
  "Holographic Portal",
  "Glass + Particles",
  "Gradient Mesh",
  "Neon Outline",
  "Map Lines",
];

const VARIANTS = [HolographicPortal, GlassParticles, MeshGradient, NeonOutline, MapLines];

export function PlanTripVariantSelector({ onPress }: { onPress: () => void }) {
  const [idx, setIdx] = useState(0);
  const Variant = VARIANTS[idx];

  const prev = () => {
    haptic();
    setIdx((i) => (i - 1 + VARIANTS.length) % VARIANTS.length);
  };
  const next = () => {
    haptic();
    setIdx((i) => (i + 1) % VARIANTS.length);
  };

  return (
    <View>
      <Variant onPress={onPress} />
      {/* Navigation row */}
      <View style={ns.navRow}>
        <Pressable onPress={prev} style={({ pressed }) => [ns.arrow, pressed && { opacity: 0.6 }]}>
          <MaterialIcons name="chevron-left" size={24} color={C.white} />
        </Pressable>
        <View style={ns.dotsRow}>
          {VARIANTS.map((_, i) => (
            <View key={i} style={[ns.dot, i === idx && ns.dotActive]} />
          ))}
        </View>
        <Pressable onPress={next} style={({ pressed }) => [ns.arrow, pressed && { opacity: 0.6 }]}>
          <MaterialIcons name="chevron-right" size={24} color={C.white} />
        </Pressable>
      </View>
      <Text style={ns.variantLabel}>{idx + 1}/5 — {VARIANT_NAMES[idx]}</Text>
    </View>
  );
}

// ═══════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════
const vs = StyleSheet.create({
  card: {
    width: "100%" as any,
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#16092C",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 12,
  },

  // Shared
  aiPill: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: C.frosted,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 10,
  },
  aiPillText: {
    color: C.white,
    fontSize: 12,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 0.5,
  },
  textWrap: {
    position: "absolute",
    bottom: 18,
    left: 18,
    zIndex: 10,
  },
  title: {
    color: C.white,
    fontSize: 24,
    fontFamily: "Chillax-Bold",
    lineHeight: 30,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  sub: {
    color: C.muted,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: 3,
  },

  // V1 — Holographic
  planeWrap: {
    position: "absolute",
    top: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  planeTrail: {
    width: 60,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginRight: 4,
    borderRadius: 1,
  },

  // V2 — Glass
  glassCard: {
    backgroundColor: "rgba(22,9,44,0.6)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.35)",
  },
  particle: {
    position: "absolute",
    backgroundColor: "rgba(200,180,255,0.7)",
  },
  centerIcon: {
    position: "absolute",
    top: "50%" as any,
    left: "50%" as any,
    marginTop: -30,
    marginLeft: -20,
    opacity: 0.5,
  },

  // V3 — Mesh
  meshOrb: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  icon3d: {
    position: "absolute",
    top: 30,
    right: 30,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },

  // V4 — Neon
  neonCard: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: C.purple,
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  neonInner: {
    flex: 1,
    backgroundColor: "rgba(13,2,33,0.85)",
    borderRadius: 18,
  },
  neonCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  neonStar: {
    color: C.pink,
    fontSize: 28,
    marginBottom: 6,
    textShadowColor: C.pink,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  neonTitle: {
    color: C.white,
    fontSize: 28,
    fontFamily: "Chillax-Bold",
    textShadowColor: C.purple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  neonSub: {
    color: C.muted,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: 4,
  },

  // V5 — Map
  mapCard: {
    backgroundColor: "#0D0221",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.2)",
  },
  pathLine: {
    position: "absolute",
    height: 1,
    backgroundColor: "rgba(100,67,244,0.2)",
  },
  movingDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.pink,
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  compassWrap: {
    position: "absolute",
    top: 30,
    right: 30,
  },
});

const ns = StyleSheet.create({
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 16,
  },
  arrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(100,67,244,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsRow: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  dotActive: {
    backgroundColor: C.pink,
    width: 20,
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  variantLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    fontFamily: "Satoshi-Medium",
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 0.3,
  },
});
