"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import Svg, { Circle, Path, G, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");

type DNAIconName =
  | "building.columns.fill"
  | "fork.knife"
  | "mountain.2.fill"
  | "crown.fill"
  | "person.2.fill"
  | "leaf.fill"
  | "moon.fill"
  | "building.fill"
  | "bolt.fill"
  | "list.bullet.clipboard.fill"
  | "figure.walk"
  | "globe";

interface DNAProfile {
  title: string;
  iconName: DNAIconName;
  description: string;
  destinations: { name: string; image: number }[];
  colors: [string, string];
}

interface Props {
  dnaProfile: DNAProfile;
  tagCounts: Record<string, number>;
  resultAnim: Animated.Value;
  onFinish: () => void;
  onRetake?: () => void;
}

// Confetti particle
interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  rotate: Animated.Value;
  color: string;
  size: number;
}

const CONFETTI_COLORS = ["#6443F4", "#F94498", "#FBBF24", "#00D4FF", "#FF6B6B", "#4ADE80", "#FB923C"];

function useConfetti(count = 35) {
  const particles = useRef<Particle[]>(
    Array.from({ length: count }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-20),
      opacity: new Animated.Value(1),
      rotate: new Animated.Value(0),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 8,
    }))
  ).current;

  const launch = () => {
    particles.forEach((p) => {
      p.x.setValue(width * 0.2 + Math.random() * width * 0.6);
      p.y.setValue(100);
      p.opacity.setValue(1);
      p.rotate.setValue(0);
      Animated.parallel([
        Animated.timing(p.y, {
          toValue: 800 + Math.random() * 200,
          duration: 2000 + Math.random() * 1200,
          useNativeDriver: true,
        }),
        Animated.timing(p.x, {
          toValue: (Math.random() - 0.5) * 300 + width / 2,
          duration: 2000 + Math.random() * 1200,
          useNativeDriver: true,
        }),
        Animated.timing(p.rotate, {
          toValue: (Math.random() - 0.5) * 1080,
          duration: 2000 + Math.random() * 1200,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(1000 + Math.random() * 600),
          Animated.timing(p.opacity, { toValue: 0, duration: 700, useNativeDriver: true }),
        ]),
      ]).start();
    });
  };

  return { particles, launch };
}

// DNA Circle SVG visualization
function DNACircle({ tagCounts, colors }: { tagCounts: Record<string, number>; colors: [string, string] }) {
  const SIZE = 180;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const R = 72;
  const strokeW = 14;

  const TRAITS = [
    { key: "culture", label: "Culture", color: "#6443F4" },
    { key: "adventure", label: "Adventure", color: "#22C55E" },
    { key: "food", label: "Food", color: "#EA580C" },
    { key: "luxury", label: "Luxury", color: "#FBBF24" },
    { key: "social", label: "Social", color: "#F94498" },
    { key: "relax", label: "Relax", color: "#06B6D4" },
  ];

  const total = TRAITS.reduce((sum, t) => sum + (tagCounts[t.key] || 0), 0) || 1;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  const segments = TRAITS.map((t) => {
    const val = (tagCounts[t.key] || 0) / total;
    const dash = val * circumference;
    const gap = circumference - dash;
    const seg = { ...t, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: "center", justifyContent: "center" }}>
      <Svg width={SIZE} height={SIZE}>
        {/* Background circle */}
        <Circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeW} />
        {/* Colored segments */}
        {segments.map((seg, i) => (
          <Circle
            key={i}
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeDasharray={`${seg.dash} ${seg.gap}`}
            strokeDashoffset={-seg.offset + circumference * 0.25}
            strokeLinecap="butt"
            rotation={-90}
            origin={`${cx},${cy}`}
          />
        ))}
        {/* Inner circle */}
        <Circle cx={cx} cy={cy} r={R - strokeW / 2 - 8} fill="rgba(100,67,244,0.12)" />
      </Svg>
      {/* Center icon */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 28 }}>🧬</Text>
        </View>
      </View>
    </View>
  );
}

// Trait bar component
function TraitBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const barAnim = useRef(new Animated.Value(0)).current;
  const pct = max > 0 ? value / max : 0;

  useEffect(() => {
    Animated.timing(barAnim, { toValue: pct, duration: 900, delay: 300, useNativeDriver: false }).start();
  }, []);

  return (
    <View style={TB.row}>
      <Text style={TB.label}>{label}</Text>
      <View style={TB.track}>
        <Animated.View
          style={[
            TB.fill,
            {
              width: barAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
              backgroundColor: color,
            },
          ]}
        />
      </View>
      <Text style={[TB.pct, { color }]}>{Math.round(pct * 100)}%</Text>
    </View>
  );
}

const TB = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  label: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "600", width: 72 },
  track: { flex: 1, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 3 },
  pct: { fontSize: 11, fontWeight: "700", width: 34, textAlign: "right" },
});

const TRAIT_CONFIG = [
  { key: "culture", label: "Culture", color: "#6443F4" },
  { key: "adventure", label: "Adventure", color: "#22C55E" },
  { key: "food", label: "Food", color: "#EA580C" },
  { key: "luxury", label: "Luxury", color: "#FBBF24" },
  { key: "social", label: "Social", color: "#F94498" },
  { key: "relax", label: "Relax", color: "#06B6D4" },
];

const FUN_FACTS: Record<string, string[]> = {
  culture: ["You'd spend 3 hours in a single museum room", "You Google history before every trip", "Your camera roll is 80% architecture"],
  adventure: ["You've googled 'most dangerous hikes' for fun", "Jet lag is just a warm-up for you", "Your packing list includes a first aid kit"],
  food: ["You research restaurants before hotels", "You've taken a cooking class in 3 countries", "Street food > Michelin stars, always"],
  luxury: ["You know the difference between 5-star and 6-star", "You've upgraded to business class at least once", "Spa days are non-negotiable"],
  social: ["You've made lifelong friends on a 6-hour flight", "Your travel group chat has 47 people", "You know the best local bars before landing"],
  nature: ["You wake up at 5am for sunrises, no alarm needed", "You've camped under the stars on 3 continents", "Wildlife spotting is your cardio"],
  relax: ["You've read an entire book on a beach in one day", "You choose hotels by pool quality", "Naps are a travel activity"],
  urban: ["You know every city's best rooftop bar", "You've ridden every major metro system", "Skylines give you chills"],
  spontaneous: ["You've bought a flight 24 hours before departure", "Your best stories start with 'we had no plan'", "You thrive on last-minute deals"],
  planned: ["Your itinerary has color-coded time blocks", "You've booked restaurants 3 months in advance", "Backup plans have backup plans"],
  solo: ["You've eaten alone at a fancy restaurant and loved it", "You know exactly how to make friends at hostels", "Solo travel made you fearless"],
  default: ["You break every traveler stereotype", "Your trips are impossible to categorize", "Every destination surprises you"],
};

const EXTRA_DESTINATIONS: Record<string, string[]> = {
  culture: ["Istanbul, Turkey", "Athens, Greece"],
  food: ["Naples, Italy", "Ho Chi Minh City"],
  adventure: ["New Zealand", "Nepal"],
  luxury: ["Monaco", "Bora Bora"],
  social: ["Ibiza, Spain", "Rio de Janeiro"],
  nature: ["Costa Rica", "Norwegian Fjords"],
  relax: ["Seychelles", "Amalfi Coast"],
  urban: ["Singapore", "Dubai, UAE"],
  spontaneous: ["Lisbon, Portugal", "Tbilisi, Georgia"],
  planned: ["Vienna, Austria", "Singapore"],
  solo: ["Vietnam", "Morocco"],
  default: ["Lisbon, Portugal", "Colombia"],
};

export function DNAResultScreen({ dnaProfile, tagCounts, resultAnim, onFinish, onRetake }: Props) {
  const { particles, launch } = useConfetti(35);
  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeRotate = useRef(new Animated.Value(-15)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const destAnim = useRef(new Animated.Value(0)).current;
  const pointsAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;
  const traitsAnim = useRef(new Animated.Value(0)).current;
  const factsAnim = useRef(new Animated.Value(0)).current;
  const [pointsDisplay, setPointsDisplay] = useState(0);
  const ringPulse = useRef(new Animated.Value(1)).current;

  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "default";
  const funFacts = FUN_FACTS[topTag] || FUN_FACTS.default;
  const extraDests = EXTRA_DESTINATIONS[topTag] || EXTRA_DESTINATIONS.default;

  // Build 5 destinations: 3 from profile + 2 extra
  const allDestinations = [
    ...dnaProfile.destinations,
    ...extraDests.map((name) => ({ name, image: dnaProfile.destinations[0]?.image })),
  ].slice(0, 5);

  const maxTagCount = Math.max(...Object.values(tagCounts), 1);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.spring(badgeScale, { toValue: 1, tension: 120, friction: 5, useNativeDriver: true }),
        Animated.timing(badgeRotate, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start(() => {
      launch();
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.stagger(120, [
        Animated.spring(titleAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(descAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(traitsAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(factsAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(destAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(ctaAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
      ]).start();
    });

    // Animate points counter
    const start = Date.now();
    const duration = 1400;
    const target = 250;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPointsDisplay(Math.round(eased * target));
      if (progress >= 1) clearInterval(interval);
    }, 16);

    // Ring pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(ringPulse, { toValue: 1.06, duration: 1400, useNativeDriver: true }),
        Animated.timing(ringPulse, { toValue: 1, duration: 1400, useNativeDriver: true }),
      ])
    ).start();

    return () => clearInterval(interval);
  }, []);

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

  const TAG_COLORS: Record<string, [string, string]> = {
    culture: ["#6443F4", "#9077EF"],
    adventure: ["#02A65C", "#22C55E"],
    food: ["#C2410C", "#EA580C"],
    luxury: ["#B8860B", "#FBBF24"],
    social: ["#6B21A8", "#F94498"],
    nature: ["#14532D", "#22C55E"],
    relax: ["#0E7490", "#06B6D4"],
    urban: ["#1E40AF", "#3B82F6"],
    spontaneous: ["#B45309", "#F59E0B"],
    planned: ["#1E40AF", "#6366F1"],
    solo: ["#6443F4", "#9077EF"],
  };

  return (
    <View style={RS.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#0D0628"]} style={StyleSheet.absoluteFillObject} />

      {/* Confetti particles */}
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          pointerEvents="none"
          style={[
            RS.particle,
            {
              width: p.size,
              height: p.size,
              borderRadius: p.size * 0.3,
              backgroundColor: p.color,
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                { rotate: p.rotate.interpolate({ inputRange: [-1080, 1080], outputRange: ["-1080deg", "1080deg"] }) },
              ],
              opacity: p.opacity,
            },
          ]}
        />
      ))}

      <ScrollView
        contentContainerStyle={RS.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header label ── */}
        <Text style={RS.headerLabel}>✦ YOUR TRAVELER DNA ✦</Text>

        {/* ── DNA Circle + Badge side by side ── */}
        <Animated.View
          style={[
            RS.dnaRow,
            {
              transform: [
                { scale: badgeScale },
                { rotate: badgeRotate.interpolate({ inputRange: [-15, 0], outputRange: ["-15deg", "0deg"] }) },
              ],
            },
          ]}
        >
          {/* DNA Circle visualization */}
          <DNACircle tagCounts={tagCounts} colors={dnaProfile.colors} />

          {/* Badge */}
          <View style={RS.badgeWrap}>
            <Animated.View style={[RS.ringOuter, { borderColor: dnaProfile.colors[1] + "30", transform: [{ scale: ringPulse }] }]} />
            <View style={[RS.ringInner, { borderColor: dnaProfile.colors[1] + "55" }]} />
            <LinearGradient
              colors={dnaProfile.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={RS.badge}
            >
              <IconSymbol name={dnaProfile.iconName} size={44} color="rgba(255,255,255,0.95)" />
            </LinearGradient>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <View
                key={i}
                style={[
                  RS.sparkleDot,
                  {
                    backgroundColor: i % 2 === 0 ? dnaProfile.colors[0] : dnaProfile.colors[1],
                    transform: [{ rotate: `${deg}deg` }, { translateY: -72 }],
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* ── Title ── */}
        <Animated.View style={{ opacity: titleAnim, transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }], alignItems: "center" }}>
          <Text style={RS.title}>{dnaProfile.title}</Text>
          <Text style={RS.desc}>{dnaProfile.description}</Text>
        </Animated.View>

        {/* ── Trait chips ── */}
        <Animated.View style={[RS.tagsRow, { opacity: descAnim }]}>
          {topTags.map((tag) => {
            const colors = TAG_COLORS[tag] || ["#6443F4", "#9077EF"];
            return (
              <View key={tag} style={RS.tagChip}>
                <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                <Text style={RS.tagText}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</Text>
              </View>
            );
          })}
        </Animated.View>

        {/* ── Personality Breakdown ── */}
        <Animated.View
          style={[
            RS.card,
            {
              opacity: traitsAnim,
              transform: [{ translateY: traitsAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            },
          ]}
        >
          <View style={RS.cardHeader}>
            <Text style={RS.cardTitle}>Personality Breakdown</Text>
            <Text style={RS.cardSubtitle}>Your travel DNA traits</Text>
          </View>
          {TRAIT_CONFIG.map((t) => (
            <TraitBar
              key={t.key}
              label={t.label}
              value={tagCounts[t.key] || 0}
              max={maxTagCount}
              color={t.color}
            />
          ))}
        </Animated.View>

        {/* ── Fun Facts ── */}
        <Animated.View
          style={[
            RS.card,
            {
              opacity: factsAnim,
              transform: [{ translateY: factsAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            },
          ]}
        >
          <View style={RS.cardHeader}>
            <Text style={RS.cardTitle}>Fun Facts About You</Text>
            <Text style={RS.cardSubtitle}>Travelers like you...</Text>
          </View>
          {funFacts.map((fact, i) => (
            <View key={i} style={RS.factRow}>
              <View style={[RS.factDot, { backgroundColor: dnaProfile.colors[1] }]} />
              <Text style={RS.factText}>{fact}</Text>
            </View>
          ))}
        </Animated.View>

        {/* ── Destinations (5) ── */}
        <Animated.View style={{ opacity: destAnim, transform: [{ translateY: destAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }], width: "100%" }}>
          <Text style={RS.sectionLabel}>Perfect destinations for you</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={RS.destRow}
          >
            {allDestinations.map((dest, i) => (
              <TouchableOpacity
                key={i}
                style={RS.destCard}
                activeOpacity={0.88}
                onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              >
                <Image source={dest.image} style={RS.destImg} resizeMode="cover" />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={RS.destNumBadge}>
                  <Text style={RS.destNumText}>{i + 1}</Text>
                </View>
                <Text style={RS.destName}>{dest.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── Points + CTA ── */}
        <Animated.View
          style={[
            RS.bottomBlock,
            {
              opacity: ctaAnim,
              transform: [{ translateY: ctaAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
            },
          ]}
        >
          {/* Points card */}
          <LinearGradient
            colors={["#2A1A00", "#1A0D00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={RS.pointsCard}
          >
            {/* Glow overlay */}
            <LinearGradient
              colors={["rgba(255,200,0,0.22)", "rgba(255,120,0,0.10)", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={RS.pointsLeft}>
              <LinearGradient
                colors={["#FBBF24", "#FF8C00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={RS.pointsIconBox}
              >
                <Text style={{ fontSize: 24 }}>⭐</Text>
              </LinearGradient>
              <View>
                <Text style={RS.pointsValue}>+{pointsDisplay}</Text>
                <Text style={RS.pointsPillLabel}>TRAVI Points earned</Text>
              </View>
            </View>
            <View style={RS.pointsRight}>
              <Text style={RS.pointsRightLabel}>Quiz{"\n"}Complete</Text>
              <LinearGradient
                colors={["#FBBF24", "#FF8C00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={RS.completeBadge}
              >
                <Text style={{ fontSize: 16, color: "#1A0D00", fontWeight: "900",
      fontFamily: "Chillax-Bold" }}>✓</Text>
              </LinearGradient>
            </View>
          </LinearGradient>

          {/* CTA */}
          <TouchableOpacity style={RS.ctaBtn} onPress={onFinish} activeOpacity={0.88}>
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={RS.ctaGradient}
            >
              <Text style={RS.ctaText}>Start Exploring  →</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Retake + Share row */}
          <View style={RS.secondaryRow}>
            {onRetake && (
              <TouchableOpacity
                style={RS.secondaryBtn}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onRetake();
                }}
                activeOpacity={0.75}
              >
                <IconSymbol name="arrow.clockwise" size={14} color="rgba(255,255,255,0.5)" />
                <Text style={RS.secondaryBtnText}>Retake Quiz</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={RS.secondaryBtn}
              onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.75}
            >
              <IconSymbol name="square.and.arrow.up" size={14} color="rgba(255,255,255,0.5)" />
              <Text style={RS.secondaryBtnText}>Share Result</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const RS = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  particle: { position: "absolute", top: 0, left: 0 },
  scroll: { paddingTop: 52, paddingBottom: 130, alignItems: "center", gap: 20 },

  headerLabel: { color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: "700", letterSpacing: 2.5, textAlign: "center" },

  // DNA Row
  dnaRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 16, paddingHorizontal: 16 },

  // Badge
  badgeWrap: { width: 160, height: 160, alignItems: "center", justifyContent: "center" },
  ringOuter: { position: "absolute", width: 152, height: 152, borderRadius: 76, borderWidth: 1.5 },
  ringInner: { position: "absolute", width: 120, height: 120, borderRadius: 60, borderWidth: 1.5 },
  badge: { width: 96, height: 96, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  sparkleDot: { position: "absolute", width: 6, height: 6, borderRadius: 3 },

  // Text
  title: { color: "#FFFFFF", fontSize: 30, fontWeight: "900",
      fontFamily: "Chillax-Bold", textAlign: "center", letterSpacing: -0.5, lineHeight: 36 },
  desc: { color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 21, textAlign: "center", paddingHorizontal: 28, marginTop: 8 },

  // Tags
  tagsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8, paddingHorizontal: 24 },
  tagChip: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7 },
  tagText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  // Card
  card: {
    width: width - 32,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    padding: 18,
    gap: 4,
  },
  cardHeader: { marginBottom: 12 },
  cardTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  cardSubtitle: { color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 2 },

  // Fun facts
  factRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
  factDot: { width: 6, height: 6, borderRadius: 3, marginTop: 5, flexShrink: 0 },
  factText: { color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 19, flex: 1 },

  // Destinations
  sectionLabel: { color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12, paddingHorizontal: 16, alignSelf: "flex-start" },
  destRow: { paddingHorizontal: 16, gap: 10 },
  destCard: { width: 160, height: 120, borderRadius: 16, overflow: "hidden", justifyContent: "flex-end", padding: 10 },
  destImg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  destNumBadge: { position: "absolute", top: 8, left: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(100,67,244,0.9)", alignItems: "center", justifyContent: "center" },
  destNumText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  destName: { color: "#FFFFFF", fontSize: 12, fontWeight: "800", textShadowColor: "rgba(0,0,0,0.6)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },

  // Bottom block
  bottomBlock: { width: width - 32, alignItems: "center", gap: 14 },

  // Points card
  pointsCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255,200,0,0.45)",
    shadowColor: "#FBBF24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  pointsLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  pointsIconBox: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  pointsValue: { color: "#FBBF24", fontSize: 36, fontWeight: "900", lineHeight: 40, textShadowColor: "rgba(255,215,0,0.5)", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 },
  pointsPillLabel: { color: "rgba(255,200,80,0.85)", fontSize: 12, fontWeight: "700", marginTop: 2, letterSpacing: 0.3 },
  pointsRight: { alignItems: "center", gap: 8 },
  pointsRightLabel: { color: "rgba(255,200,80,0.75)", fontSize: 10, fontWeight: "700", textAlign: "center", letterSpacing: 0.5, textTransform: "uppercase" },
  completeBadge: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center" },

  // CTA
  ctaBtn: { width: "100%", borderRadius: 18, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  ctaGradient: { alignItems: "center", justifyContent: "center", paddingVertical: 17 },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800",
      fontFamily: "Chillax-Bold", letterSpacing: 0.3 },

  // Secondary row
  secondaryRow: { flexDirection: "row", gap: 20, justifyContent: "center" },
  secondaryBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 8, paddingHorizontal: 12 },
  secondaryBtnText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "600" },
});
