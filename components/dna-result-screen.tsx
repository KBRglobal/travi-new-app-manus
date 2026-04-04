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
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

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

// ─── Confetti ────────────────────────────────────────────────────────────────
interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  rotate: Animated.Value;
  color: string;
  size: number;
}

const CONFETTI_COLORS = ["#6443F4", "#F94498", "#FBBF24", "#00D4FF", "#FF6B6B", "#4ADE80", "#FB923C"];

function useConfetti(count = 30) {
  const particles = useRef<Particle[]>(
    Array.from({ length: count }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-20),
      opacity: new Animated.Value(1),
      rotate: new Animated.Value(0),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 5 + Math.random() * 7,
    }))
  ).current;

  const launch = () => {
    particles.forEach((p) => {
      p.x.setValue(width * 0.15 + Math.random() * width * 0.7);
      p.y.setValue(80);
      p.opacity.setValue(1);
      p.rotate.setValue(0);
      Animated.parallel([
        Animated.timing(p.y, { toValue: 900 + Math.random() * 200, duration: 2200 + Math.random() * 1000, useNativeDriver: true }),
        Animated.timing(p.x, { toValue: (Math.random() - 0.5) * 280 + width / 2, duration: 2200 + Math.random() * 1000, useNativeDriver: true }),
        Animated.timing(p.rotate, { toValue: (Math.random() - 0.5) * 900, duration: 2200 + Math.random() * 1000, useNativeDriver: true }),
        Animated.sequence([
          Animated.delay(1200 + Math.random() * 600),
          Animated.timing(p.opacity, { toValue: 0, duration: 700, useNativeDriver: true }),
        ]),
      ]).start();
    });
  };

  return { particles, launch };
}

// ─── DNA Ring ────────────────────────────────────────────────────────────────
const TRAIT_CONFIG = [
  { key: "culture",   label: "Culture",   color: "#6443F4" },
  { key: "adventure", label: "Adventure", color: "#22C55E" },
  { key: "food",      label: "Food",      color: "#EA580C" },
  { key: "luxury",    label: "Luxury",    color: "#FBBF24" },
  { key: "social",    label: "Social",    color: "#F94498" },
  { key: "relax",     label: "Relax",     color: "#06B6D4" },
];

function DNARing({
  tagCounts,
  colors,
  iconName,
  pulse,
}: {
  tagCounts: Record<string, number>;
  colors: [string, string];
  iconName: DNAIconName;
  pulse: Animated.Value;
}) {
  const SIZE = 220;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const R = 88;
  const strokeW = 16;
  const total = TRAIT_CONFIG.reduce((s, t) => s + (tagCounts[t.key] || 0), 0) || 1;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  const segments = TRAIT_CONFIG.map((t) => {
    const val = (tagCounts[t.key] || 0) / total;
    const dash = val * circumference;
    const gap = circumference - dash;
    const seg = { ...t, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <Animated.View style={{ transform: [{ scale: pulse }] }}>
      <View style={{ width: SIZE, height: SIZE, alignItems: "center", justifyContent: "center" }}>
        <Svg width={SIZE} height={SIZE}>
          <Defs>
            <RadialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={colors[0]} stopOpacity="0.25" />
              <Stop offset="100%" stopColor={colors[0]} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          {/* Glow fill */}
          <Circle cx={cx} cy={cy} r={R - strokeW / 2} fill="url(#innerGlow)" />
          {/* Track */}
          <Circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={strokeW} />
          {/* Segments */}
          {segments.map((seg, i) => (
            <Circle
              key={i}
              cx={cx} cy={cy} r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeW}
              strokeDasharray={`${seg.dash} ${seg.gap}`}
              strokeDashoffset={-seg.offset + circumference * 0.25}
              strokeLinecap="round"
              rotation={-90}
              origin={`${cx},${cy}`}
            />
          ))}
          {/* Outer ring accent */}
          <Circle cx={cx} cy={cy} r={R + strokeW / 2 + 6} fill="none" stroke={colors[1] + "22"} strokeWidth={1.5} />
        </Svg>
        {/* Center badge */}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <LinearGradient
              colors={colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={RS.centerBadge}
            >
              <IconSymbol name={iconName} size={40} color="rgba(255,255,255,0.95)" />
            </LinearGradient>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Trait Bar ───────────────────────────────────────────────────────────────
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
          style={[TB.fill, {
            width: barAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
            backgroundColor: color,
          }]}
        />
      </View>
      <Text style={[TB.pct, { color }]}>{Math.round(pct * 100)}%</Text>
    </View>
  );
}

const TB = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  label: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: "600", width: 72 },
  track: { flex: 1, height: 7, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.07)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 4 },
  pct: { fontSize: 11, fontWeight: "700", width: 34, textAlign: "right" },
});

// ─── Data ────────────────────────────────────────────────────────────────────
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

// ─── Main Component ───────────────────────────────────────────────────────────
export function DNAResultScreen({ dnaProfile, tagCounts, resultAnim, onFinish, onRetake }: Props) {
  const { particles, launch } = useConfetti(30);
  const heroScale = useRef(new Animated.Value(0.7)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const tagsAnim = useRef(new Animated.Value(0)).current;
  const traitsAnim = useRef(new Animated.Value(0)).current;
  const factsAnim = useRef(new Animated.Value(0)).current;
  const destAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;
  const ringPulse = useRef(new Animated.Value(1)).current;
  const [pointsDisplay, setPointsDisplay] = useState(0);

  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "default";
  const funFacts = FUN_FACTS[topTag] || FUN_FACTS.default;
  const extraDests = EXTRA_DESTINATIONS[topTag] || EXTRA_DESTINATIONS.default;
  const allDestinations = [
    ...dnaProfile.destinations,
    ...extraDests.map((name) => ({ name, image: dnaProfile.destinations[0]?.image })),
  ].slice(0, 5);
  const maxTagCount = Math.max(...Object.values(tagCounts), 1);
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([tag]) => tag);

  useEffect(() => {
    // Hero entrance
    Animated.parallel([
      Animated.spring(heroScale, { toValue: 1, tension: 100, friction: 7, useNativeDriver: true }),
      Animated.timing(heroOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      launch();
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.stagger(100, [
        Animated.spring(titleAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(descAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(tagsAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(traitsAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(factsAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(destAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.spring(ctaAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
      ]).start();
    });

    // Points counter
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

    // Ring pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(ringPulse, { toValue: 1.05, duration: 1600, useNativeDriver: true }),
        Animated.timing(ringPulse, { toValue: 1, duration: 1600, useNativeDriver: true }),
      ])
    ).start();

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={RS.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={["#0D0628", "#130A35", "#0D0628"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Subtle radial glow behind ring */}
      <View style={RS.glowBehind} pointerEvents="none">
        <LinearGradient
          colors={[dnaProfile.colors[0] + "40", "transparent"]}
          style={{ flex: 1, borderRadius: 300 }}
        />
      </View>

      {/* Confetti */}
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          pointerEvents="none"
          style={[RS.particle, {
            width: p.size, height: p.size,
            borderRadius: p.size * 0.3,
            backgroundColor: p.color,
            transform: [
              { translateX: p.x },
              { translateY: p.y },
              { rotate: p.rotate.interpolate({ inputRange: [-900, 900], outputRange: ["-900deg", "900deg"] }) },
            ],
            opacity: p.opacity,
          }]}
        />
      ))}

      <ScrollView contentContainerStyle={RS.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Header label ── */}
        <Text style={RS.headerLabel}>✦  YOUR TRAVELER DNA  ✦</Text>

        {/* ── DNA Ring (centered, large) ── */}
        <Animated.View style={{ opacity: heroOpacity, transform: [{ scale: heroScale }], alignItems: "center" }}>
          <DNARing tagCounts={tagCounts} colors={dnaProfile.colors} iconName={dnaProfile.iconName} pulse={ringPulse} />
        </Animated.View>

        {/* ── Title + Description ── */}
        <Animated.View style={[RS.titleBlock, {
          opacity: titleAnim,
          transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
        }]}>
          <Text style={RS.title}>{dnaProfile.title}</Text>
          <Text style={RS.desc}>{dnaProfile.description}</Text>
        </Animated.View>

        {/* ── Trait chips ── */}
        <Animated.View style={[RS.tagsRow, { opacity: tagsAnim }]}>
          {topTags.map((tag) => {
            const chipColors = TAG_COLORS[tag] || ["#6443F4", "#9077EF"];
            return (
              <View key={tag} style={RS.tagChip}>
                <LinearGradient colors={chipColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                <Text style={RS.tagText}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</Text>
              </View>
            );
          })}
        </Animated.View>

        {/* ── Personality Breakdown ── */}
        <Animated.View style={[RS.card, {
          opacity: traitsAnim,
          transform: [{ translateY: traitsAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        }]}>
          {/* Gradient border accent */}
          <LinearGradient
            colors={[dnaProfile.colors[0] + "60", dnaProfile.colors[1] + "30", "transparent"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={RS.cardAccentBorder}
          />
          <Text style={RS.cardTitle}>Personality Breakdown</Text>
          <Text style={RS.cardSubtitle}>Your travel DNA traits</Text>
          <View style={{ marginTop: 16 }}>
            {TRAIT_CONFIG.map((t) => (
              <TraitBar key={t.key} label={t.label} value={tagCounts[t.key] || 0} max={maxTagCount} color={t.color} />
            ))}
          </View>
        </Animated.View>

        {/* ── Fun Facts ── */}
        <Animated.View style={[RS.card, {
          opacity: factsAnim,
          transform: [{ translateY: factsAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        }]}>
          <LinearGradient
            colors={["#F9449830", "#6443F430", "transparent"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={RS.cardAccentBorder}
          />
          <Text style={RS.cardTitle}>Fun Facts About You</Text>
          <Text style={RS.cardSubtitle}>Travelers like you...</Text>
          <View style={{ marginTop: 14, gap: 10 }}>
            {funFacts.map((fact, i) => (
              <View key={i} style={RS.factRow}>
                <LinearGradient
                  colors={dnaProfile.colors}
                  style={RS.factDot}
                />
                <Text style={RS.factText}>{fact}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ── Destinations ── */}
        <Animated.View style={{ opacity: destAnim, transform: [{ translateY: destAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }], width: "100%" }}>
          <Text style={RS.sectionLabel}>Perfect destinations for you</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={RS.destRow}>
            {allDestinations.map((dest, i) => (
              <TouchableOpacity
                key={i}
                style={RS.destCard}
                activeOpacity={0.88}
                onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              >
                <Image source={dest.image} style={RS.destImg} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} style={StyleSheet.absoluteFillObject} />
                <View style={RS.destNumBadge}>
                  <Text style={RS.destNumText}>{i + 1}</Text>
                </View>
                <Text style={RS.destName}>{dest.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── Points earned ── */}
        <Animated.View style={[RS.bottomBlock, {
          opacity: ctaAnim,
          transform: [{ translateY: ctaAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
        }]}>
          <LinearGradient
            colors={["#1E1200", "#2A1A00"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={RS.pointsCard}
          >
            <LinearGradient
              colors={["rgba(255,200,0,0.18)", "transparent"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={RS.pointsLeft}>
              <LinearGradient colors={["#FBBF24", "#FF8C00"]} style={RS.pointsIconBox}>
                <IconSymbol name="star.fill" size={22} color="#1A0D00" />
              </LinearGradient>
              <View>
                <Text style={RS.pointsValue}>+{pointsDisplay}</Text>
                <Text style={RS.pointsPillLabel}>TRAVI Points earned</Text>
              </View>
            </View>
            <View style={RS.pointsBadge}>
              <LinearGradient colors={["#FBBF24", "#FF8C00"]} style={RS.completeBadge}>
                <IconSymbol name="checkmark" size={16} color="#1A0D00" />
              </LinearGradient>
              <Text style={RS.pointsRightLabel}>Quiz{"\n"}Complete</Text>
            </View>
          </LinearGradient>

          {/* CTA */}
          <TouchableOpacity style={RS.ctaBtn} onPress={onFinish} activeOpacity={0.88}>
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={RS.ctaGradient}
            >
              <Text style={RS.ctaText}>Start Exploring</Text>
              <IconSymbol name="arrow.right" size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Secondary row */}
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
                <IconSymbol name="arrow.clockwise" size={13} color="rgba(255,255,255,0.45)" />
                <Text style={RS.secondaryBtnText}>Retake Quiz</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={RS.secondaryBtn}
              onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.75}
            >
              <IconSymbol name="square.and.arrow.up" size={13} color="rgba(255,255,255,0.45)" />
              <Text style={RS.secondaryBtnText}>Share Result</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const RS = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  particle: { position: "absolute", top: 0, left: 0 },
  scroll: { paddingTop: 56, paddingBottom: 140, alignItems: "center", gap: 24 },

  // Glow behind ring
  glowBehind: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: "hidden",
    opacity: 0.6,
  },

  headerLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    textAlign: "center",
  },

  // Center badge inside ring
  centerBadge: {
    width: 86,
    height: 86,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },

  // Title block
  titleBlock: { alignItems: "center", paddingHorizontal: 28, gap: 10 },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    fontFamily: "Chillax-Bold",
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  desc: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },

  // Tags
  tagsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8, paddingHorizontal: 20 },
  tagChip: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7 },
  tagText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  // Card
  card: {
    width: width - 32,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    padding: 20,
    overflow: "hidden",
  },
  cardAccentBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 2,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
  },
  cardSubtitle: { color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 3 },

  // Fun facts
  factRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  factDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5, flexShrink: 0 },
  factText: { color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 20, flex: 1 },

  // Destinations
  sectionLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 12,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  destRow: { paddingHorizontal: 16, gap: 10 },
  destCard: { width: 150, height: 110, borderRadius: 16, overflow: "hidden", justifyContent: "flex-end", padding: 10 },
  destImg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  destNumBadge: {
    position: "absolute", top: 8, left: 8,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: "rgba(100,67,244,0.9)",
    alignItems: "center", justifyContent: "center",
  },
  destNumText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800", fontFamily: "Chillax-Bold" },
  destName: {
    color: "#FFFFFF", fontSize: 12, fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

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
    borderColor: "rgba(255,200,0,0.35)",
    shadowColor: "#FBBF24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  pointsLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  pointsIconBox: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  pointsValue: {
    color: "#FBBF24", fontSize: 34, fontWeight: "900", lineHeight: 38,
    textShadowColor: "rgba(255,215,0,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  pointsPillLabel: { color: "rgba(255,200,80,0.75)", fontSize: 11, fontWeight: "700", marginTop: 2 },
  pointsBadge: { alignItems: "center", gap: 6 },
  pointsRightLabel: { color: "rgba(255,200,80,0.65)", fontSize: 10, fontWeight: "700", textAlign: "center", letterSpacing: 0.5, textTransform: "uppercase" },
  completeBadge: { width: 36, height: 36, borderRadius: 11, alignItems: "center", justifyContent: "center" },

  // CTA
  ctaBtn: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#F94498",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 17,
  },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold", letterSpacing: 0.3 },

  // Secondary row
  secondaryRow: { flexDirection: "row", gap: 20, justifyContent: "center" },
  secondaryBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 8, paddingHorizontal: 12 },
  secondaryBtnText: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "600" },
});
