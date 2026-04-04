// Plan a Trip — 5 Holographic Portal Variations
// User picks one, then we keep only that variant

import { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Platform,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

const { width: W } = Dimensions.get("window");
const CARD_W = W - 32;

const C = {
  purple: "#6443F4",
  pink: "#F94498",
  cyan: "#01BEFF",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.6)",
  frosted: "rgba(255,255,255,0.12)",
};

function haptic() {
  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

// ─── Shared sub-components ───
function AIPill() {
  return (
    <View style={sh.aiPill}>
      <Text style={sh.aiPillText}>AI ✦</Text>
    </View>
  );
}

function CardText() {
  return (
    <View style={sh.textWrap}>
      <Text style={sh.title}>Plan a Trip</Text>
      <Text style={sh.sub}>Personalized itinerary in minutes</Text>
    </View>
  );
}

// ═══════════════════════════════════════════════════
// V1 — Aurora Borealis
// Slow-moving aurora waves + twinkling star sparkles
// ═══════════════════════════════════════════════════
function AuroraBorealis({ onPress }: { onPress: () => void }) {
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const stars = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 60,
      anim: new Animated.Value(Math.random()),
      delay: Math.random() * 1500,
    }))
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(wave1, { toValue: 1, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
    ).start();
    Animated.loop(
      Animated.timing(wave2, { toValue: 1, duration: 8000, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
    ).start();
    stars.forEach((s) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(s.delay),
          Animated.timing(s.anim, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(s.anim, { toValue: 0.1, duration: 1200, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  const w1X = wave1.interpolate({ inputRange: [0, 1], outputRange: [-60, 60] });
  const w2X = wave2.interpolate({ inputRange: [0, 1], outputRange: [40, -40] });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [sh.card, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <LinearGradient
        colors={["#0D0221", "#1A0B3E", "#0D0221"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Aurora wave 1 */}
      <Animated.View style={[v1.wave, { backgroundColor: "rgba(100,67,244,0.2)", transform: [{ translateX: w1X }, { rotate: "-8deg" }] }]} />
      {/* Aurora wave 2 */}
      <Animated.View style={[v1.wave, v1.wave2, { backgroundColor: "rgba(1,190,255,0.12)", transform: [{ translateX: w2X }, { rotate: "5deg" }] }]} />
      {/* Aurora wave 3 (pink) */}
      <Animated.View style={[v1.wave, v1.wave3, { backgroundColor: "rgba(249,68,152,0.1)", transform: [{ translateX: w1X }, { rotate: "12deg" }] }]} />
      {/* Stars */}
      {stars.map((s) => (
        <Animated.View
          key={s.id}
          style={[v1.star, { left: `${s.x}%` as any, top: `${s.y}%` as any, opacity: s.anim, transform: [{ scale: s.anim }] }]}
        />
      ))}
      <AIPill />
      <CardText />
    </Pressable>
  );
}

const v1 = StyleSheet.create({
  wave: {
    position: "absolute",
    width: "120%" as any,
    height: 50,
    top: 30,
    left: "-10%" as any,
    borderRadius: 30,
  },
  wave2: { top: 55, height: 40 },
  wave3: { top: 75, height: 35 },
  star: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#fff",
  },
});

// ═══════════════════════════════════════════════════
// V2 — Cosmic Warp
// Radial pulse from center + speed-line streaks
// ═══════════════════════════════════════════════════
function CosmicWarp({ onPress }: { onPress: () => void }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const streaks = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: i * 60,
      anim: new Animated.Value(0),
      delay: i * 200,
    }))
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 2000, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
    streaks.forEach((s) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(s.delay),
          Animated.timing(s.anim, { toValue: 1, duration: 1200, useNativeDriver: true }),
          Animated.timing(s.anim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 3] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 0.2, 0] });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [sh.card, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <LinearGradient
        colors={["#0D0221", "#16092C", "#0D0221"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Radial pulse */}
      <Animated.View style={[v2.pulseRing, { transform: [{ scale: pulseScale }], opacity: pulseOpacity }]} />
      {/* Speed streaks */}
      {streaks.map((s) => {
        const len = s.anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
        return (
          <Animated.View
            key={s.id}
            style={[
              v2.streak,
              {
                transform: [
                  { rotate: `${s.angle}deg` },
                  { scaleX: len },
                ],
                opacity: s.anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.8, 0] }),
              },
            ]}
          />
        );
      })}
      {/* Center glow dot */}
      <View style={v2.centerDot} />
      <AIPill />
      <CardText />
    </Pressable>
  );
}

const v2 = StyleSheet.create({
  pulseRing: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "rgba(100,67,244,0.5)",
    top: "50%" as any,
    left: "50%" as any,
    marginTop: -40,
    marginLeft: -40,
  },
  streak: {
    position: "absolute",
    width: 100,
    height: 2,
    backgroundColor: "rgba(249,68,152,0.4)",
    top: "50%" as any,
    left: "50%" as any,
    borderRadius: 1,
    transformOrigin: "left center",
  },
  centerDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.pink,
    top: "50%" as any,
    left: "50%" as any,
    marginTop: -4,
    marginLeft: -4,
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
});

// ═══════════════════════════════════════════════════
// V3 — Liquid Chrome
// Metallic liquid morph + iridescent shimmer sweep
// ═══════════════════════════════════════════════════
function LiquidChrome({ onPress }: { onPress: () => void }) {
  const morph1 = useRef(new Animated.Value(0)).current;
  const morph2 = useRef(new Animated.Value(0)).current;
  const shimmerX = useRef(new Animated.Value(-CARD_W)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(morph1, { toValue: 1, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(morph1, { toValue: 0, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(morph2, { toValue: 1, duration: 5000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(morph2, { toValue: 0, duration: 5000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerX, { toValue: CARD_W, duration: 3000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.delay(1500),
        Animated.timing(shimmerX, { toValue: -CARD_W, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const m1X = morph1.interpolate({ inputRange: [0, 1], outputRange: [-20, 30] });
  const m1Y = morph1.interpolate({ inputRange: [0, 1], outputRange: [0, 20] });
  const m2X = morph2.interpolate({ inputRange: [0, 1], outputRange: [20, -30] });
  const m2Y = morph2.interpolate({ inputRange: [0, 1], outputRange: [10, -15] });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [sh.card, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <LinearGradient
        colors={["#0D0221", "#1A0B3E", "#16092C"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Chrome blob 1 */}
      <Animated.View style={[v3.blob, { transform: [{ translateX: m1X }, { translateY: m1Y }] }]}>
        <LinearGradient
          colors={["rgba(100,67,244,0.3)", "rgba(249,68,152,0.2)", "rgba(1,190,255,0.15)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={v3.blobInner}
        />
      </Animated.View>
      {/* Chrome blob 2 */}
      <Animated.View style={[v3.blob, v3.blob2, { transform: [{ translateX: m2X }, { translateY: m2Y }] }]}>
        <LinearGradient
          colors={["rgba(249,68,152,0.25)", "rgba(1,190,255,0.2)", "rgba(100,67,244,0.15)"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={v3.blobInner}
        />
      </Animated.View>
      {/* Shimmer sweep */}
      <Animated.View style={[v3.shimmer, { transform: [{ translateX: shimmerX }] }]}>
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.08)", "rgba(255,255,255,0.15)", "rgba(255,255,255,0.08)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: 120, height: "100%" as any }}
        />
      </Animated.View>
      <AIPill />
      <CardText />
    </Pressable>
  );
}

const v3 = StyleSheet.create({
  blob: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    top: -30,
    left: -20,
    overflow: "hidden",
  },
  blob2: {
    top: 10,
    left: "auto" as any,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  blobInner: {
    width: "100%",
    height: "100%",
    borderRadius: 90,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%" as any,
    width: 120,
  },
});

// ═══════════════════════════════════════════════════
// V4 — Nebula Drift
// Layered nebula clouds + floating light particles
// ═══════════════════════════════════════════════════
function NebulaDrift({ onPress }: { onPress: () => void }) {
  const drift1 = useRef(new Animated.Value(0)).current;
  const drift2 = useRef(new Animated.Value(0)).current;
  const particles = useRef(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: Math.random() * 80,
      size: 2 + Math.random() * 4,
      anim: new Animated.Value(Math.random()),
      dur: 1500 + Math.random() * 2000,
    }))
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift1, { toValue: 1, duration: 7000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(drift1, { toValue: 0, duration: 7000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift2, { toValue: 1, duration: 9000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(drift2, { toValue: 0, duration: 9000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
    particles.forEach((p) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(p.anim, { toValue: 1, duration: p.dur, useNativeDriver: true }),
          Animated.timing(p.anim, { toValue: 0.1, duration: p.dur * 0.8, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  const d1X = drift1.interpolate({ inputRange: [0, 1], outputRange: [-15, 25] });
  const d1Y = drift1.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const d2X = drift2.interpolate({ inputRange: [0, 1], outputRange: [10, -20] });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [sh.card, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <LinearGradient
        colors={["#0D0221", "#120830", "#0D0221"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Nebula cloud 1 */}
      <Animated.View style={[v4.cloud, { transform: [{ translateX: d1X }, { translateY: d1Y }] }]} />
      {/* Nebula cloud 2 */}
      <Animated.View style={[v4.cloud, v4.cloud2, { transform: [{ translateX: d2X }] }]} />
      {/* Nebula cloud 3 */}
      <Animated.View style={[v4.cloud, v4.cloud3, { transform: [{ translateX: d1X }] }]} />
      {/* Floating particles */}
      {particles.map((p) => (
        <Animated.View
          key={p.id}
          style={[
            v4.particle,
            {
              left: `${p.x}%` as any,
              top: `${p.y}%` as any,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              opacity: p.anim,
              transform: [
                { translateY: p.anim.interpolate({ inputRange: [0, 1], outputRange: [5, -5] }) },
                { scale: p.anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.3] }) },
              ],
            },
          ]}
        />
      ))}
      <AIPill />
      <CardText />
    </Pressable>
  );
}

const v4 = StyleSheet.create({
  cloud: {
    position: "absolute",
    width: 200,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(100,67,244,0.12)",
    top: 10,
    left: -30,
  },
  cloud2: {
    backgroundColor: "rgba(249,68,152,0.08)",
    width: 180,
    height: 90,
    top: 50,
    left: "auto" as any,
    right: -40,
    borderRadius: 45,
  },
  cloud3: {
    backgroundColor: "rgba(1,190,255,0.07)",
    width: 150,
    height: 80,
    top: 70,
    left: 60,
    borderRadius: 40,
  },
  particle: {
    position: "absolute",
    backgroundColor: "rgba(200,180,255,0.8)",
    shadowColor: "#C4B5FD",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});

// ═══════════════════════════════════════════════════
// V5 — Prism Refraction
// Rainbow light bands sweeping + diamond sparkle
// ═══════════════════════════════════════════════════
function PrismRefraction({ onPress }: { onPress: () => void }) {
  const sweep = useRef(new Animated.Value(0)).current;
  const sparkle = useRef(new Animated.Value(0)).current;
  const bands = [
    { color: "rgba(100,67,244,0.2)", offset: 0 },
    { color: "rgba(1,190,255,0.15)", offset: 15 },
    { color: "rgba(0,201,107,0.1)", offset: 30 },
    { color: "rgba(253,205,10,0.1)", offset: 45 },
    { color: "rgba(249,68,152,0.15)", offset: 60 },
  ];

  useEffect(() => {
    Animated.loop(
      Animated.timing(sweep, { toValue: 1, duration: 5000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkle, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(sparkle, { toValue: 0.2, duration: 900, useNativeDriver: true }),
        Animated.delay(800),
      ])
    ).start();
  }, []);

  const sweepX = sweep.interpolate({ inputRange: [0, 1], outputRange: [-CARD_W, CARD_W] });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [sh.card, pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <LinearGradient
        colors={["#0D0221", "#16092C", "#0D0221"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Rainbow bands sweeping */}
      <Animated.View style={[v5.bandsWrap, { transform: [{ translateX: sweepX }] }]}>
        {bands.map((b, i) => (
          <View key={i} style={[v5.band, { backgroundColor: b.color, top: 20 + b.offset }]} />
        ))}
      </Animated.View>
      {/* Diamond sparkle */}
      <Animated.View style={[v5.diamond, { opacity: sparkle, transform: [{ scale: sparkle.interpolate({ inputRange: [0.2, 1], outputRange: [0.8, 1.2] }) }, { rotate: "45deg" }] }]} />
      {/* Prism triangle hint */}
      <View style={v5.prism}>
        <View style={v5.prismInner} />
      </View>
      <AIPill />
      <CardText />
    </Pressable>
  );
}

const v5 = StyleSheet.create({
  bandsWrap: {
    position: "absolute",
    width: CARD_W,
    height: "100%" as any,
  },
  band: {
    position: "absolute",
    width: 80,
    height: 3,
    left: 0,
    borderRadius: 2,
    transform: [{ rotate: "-25deg" }],
  },
  diamond: {
    position: "absolute",
    width: 12,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.7)",
    top: 35,
    right: 60,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  prism: {
    position: "absolute",
    top: 25,
    right: 40,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 35,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  prismInner: {
    position: "absolute",
    top: 6,
    left: -14,
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 24,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(13,2,33,0.6)",
  },
});

// ═══════════════════════════════════════════════════
// VARIANT SELECTOR — arrows + dots + label
// ═══════════════════════════════════════════════════
const VARIANT_NAMES = [
  "Aurora Borealis",
  "Cosmic Warp",
  "Liquid Chrome",
  "Nebula Drift",
  "Prism Refraction",
];

const VARIANTS = [AuroraBorealis, CosmicWarp, LiquidChrome, NebulaDrift, PrismRefraction];

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
// SHARED STYLES
// ═══════════════════════════════════════════════════
const sh = StyleSheet.create({
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
    alignItems: "center",
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
