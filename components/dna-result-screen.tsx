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

const CONFETTI_COLORS = ["#6443F4", "#F94498", "#FFD700", "#00D4FF", "#FF6B6B", "#4ADE80", "#FB923C"];

function useConfetti(count = 30) {
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
      p.x.setValue(Math.random() * width);
      p.y.setValue(-20);
      p.opacity.setValue(1);
      p.rotate.setValue(0);
      Animated.parallel([
        Animated.timing(p.y, {
          toValue: 700 + Math.random() * 200,
          duration: 1800 + Math.random() * 1200,
          useNativeDriver: true,
        }),
        Animated.timing(p.x, {
          toValue: (Math.random() - 0.5) * 200 + parseFloat(JSON.stringify(p.x)),
          duration: 1800 + Math.random() * 1200,
          useNativeDriver: true,
        }),
        Animated.timing(p.rotate, {
          toValue: (Math.random() - 0.5) * 720,
          duration: 1800 + Math.random() * 1200,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(800 + Math.random() * 600),
          Animated.timing(p.opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
      ]).start();
    });
  };

  return { particles, launch };
}

export function DNAResultScreen({ dnaProfile, tagCounts, resultAnim, onFinish }: Props) {
  const { particles, launch } = useConfetti(28);
  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeRotate = useRef(new Animated.Value(-15)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const destAnim = useRef(new Animated.Value(0)).current;
  const pointsAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;
  const [pointsDisplay, setPointsDisplay] = useState(0);
  const ringPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.sequence([
      Animated.delay(100),
      Animated.parallel([
        Animated.spring(badgeScale, { toValue: 1, tension: 70, friction: 7, useNativeDriver: true }),
        Animated.timing(badgeRotate, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start(() => {
      launch();
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });

    Animated.stagger(120, [
      Animated.timing(titleAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(descAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(destAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(pointsAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(ctaAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    // Animate points counter
    const start = Date.now();
    const duration = 1200;
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
        Animated.timing(ringPulse, { toValue: 1.08, duration: 1200, useNativeDriver: true }),
        Animated.timing(ringPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
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
    luxury: ["#292524", "#78716C"],
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
                { rotate: p.rotate.interpolate({ inputRange: [-720, 720], outputRange: ["-720deg", "720deg"] }) },
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
        {/* Badge */}
        <Animated.View
          style={[
            RS.badgeWrap,
            {
              transform: [
                { scale: badgeScale },
                { rotate: badgeRotate.interpolate({ inputRange: [-15, 0], outputRange: ["-15deg", "0deg"] }) },
              ],
            },
          ]}
        >
          {/* Outer pulsing ring */}
          <Animated.View
            style={[
              RS.ringOuter,
              {
                borderColor: dnaProfile.colors[1] + "30",
                transform: [{ scale: ringPulse }],
              },
            ]}
          />
          {/* Inner ring */}
          <View style={[RS.ringInner, { borderColor: dnaProfile.colors[1] + "60" }]} />
          {/* Badge */}
          <LinearGradient
            colors={dnaProfile.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={RS.badge}
          >
            <IconSymbol name={dnaProfile.iconName} size={52} color="rgba(255,255,255,0.95)" />
          </LinearGradient>
          {/* Sparkle dots */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <View
              key={i}
              style={[
                RS.sparkleDot,
                {
                  backgroundColor: i % 2 === 0 ? dnaProfile.colors[0] : dnaProfile.colors[1],
                  transform: [
                    { rotate: `${deg}deg` },
                    { translateY: -88 },
                  ],
                },
              ]}
            />
          ))}
        </Animated.View>

        {/* Label */}
        <Animated.View style={{ opacity: titleAnim, transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }}>
          <Text style={RS.label}>✦ YOUR TRAVELER DNA ✦</Text>
          <Text style={RS.title}>{dnaProfile.title}</Text>
        </Animated.View>

        {/* Description */}
        <Animated.Text
          style={[RS.desc, { opacity: descAnim, transform: [{ translateY: descAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] }]}
        >
          {dnaProfile.description}
        </Animated.Text>

        {/* Trait chips */}
        <Animated.View
          style={[RS.tagsRow, { opacity: descAnim }]}
        >
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

        {/* Destinations */}
        <Animated.View style={{ opacity: destAnim, transform: [{ translateY: destAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] }}>
          <Text style={RS.sectionLabel}>Perfect destinations for you</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={RS.destRow}
          >
            {dnaProfile.destinations.map((dest, i) => (
              <TouchableOpacity
                key={i}
                style={RS.destCard}
                activeOpacity={0.88}
                onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              >
                <Image source={dest.image} style={RS.destImg} resizeMode="cover" />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.75)"]}
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

        {/* Points celebration */}
        <Animated.View
          style={[RS.pointsCard, { opacity: pointsAnim, transform: [{ scale: pointsAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] }]}
        >
          <LinearGradient
            colors={["rgba(255,215,0,0.18)", "rgba(255,149,0,0.08)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={RS.pointsLeft}>
            <Text style={RS.pointsEmoji}>⭐</Text>
          </View>
          <View style={RS.pointsRight}>
            <Text style={RS.pointsValue}>+{pointsDisplay}</Text>
            <Text style={RS.pointsLabel}>TRAVI Points earned!</Text>
            <Text style={RS.pointsSub}>For completing your Traveler DNA quiz</Text>
          </View>
        </Animated.View>

        {/* CTA */}
        <Animated.View
          style={[RS.ctaWrap, { opacity: ctaAnim, transform: [{ translateY: ctaAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}
        >
          <TouchableOpacity style={RS.ctaBtn} onPress={onFinish} activeOpacity={0.88}>
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={RS.ctaGradient}
            >
              <Text style={RS.ctaText}>Start Exploring</Text>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const RS = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  particle: { position: "absolute", top: 0, left: 0 },
  scroll: { paddingTop: 60, paddingBottom: 48, alignItems: "center", gap: 20 },

  // Badge
  badgeWrap: { width: 200, height: 200, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  ringOuter: { position: "absolute", width: 190, height: 190, borderRadius: 95, borderWidth: 1.5 },
  ringInner: { position: "absolute", width: 156, height: 156, borderRadius: 78, borderWidth: 1.5 },
  badge: { width: 120, height: 120, borderRadius: 36, alignItems: "center", justifyContent: "center" },
  sparkleDot: { position: "absolute", width: 7, height: 7, borderRadius: 3.5 },

  // Text
  label: { color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: "700", letterSpacing: 2, textAlign: "center", marginBottom: 6 },
  title: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", textAlign: "center", letterSpacing: -0.5, lineHeight: 38 },
  desc: { color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 22, textAlign: "center", paddingHorizontal: 32 },

  // Tags
  tagsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8, paddingHorizontal: 24 },
  tagChip: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7 },
  tagText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  // Destinations
  sectionLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12, paddingHorizontal: 24 },
  destRow: { paddingHorizontal: 20, gap: 12 },
  destCard: { width: 160, height: 110, borderRadius: 18, overflow: "hidden", justifyContent: "flex-end", padding: 12 },
  destImg: { ...StyleSheet.absoluteFillObject as object, width: undefined, height: undefined },
  destNumBadge: { position: "absolute", top: 10, left: 10, width: 24, height: 24, borderRadius: 12, backgroundColor: "rgba(100,67,244,0.85)", alignItems: "center", justifyContent: "center" },
  destNumText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  destName: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },

  // Points
  pointsCard: { width: width - 48, borderRadius: 20, overflow: "hidden", flexDirection: "row", alignItems: "center", padding: 18, gap: 14, borderWidth: 1, borderColor: "rgba(255,215,0,0.2)" },
  pointsLeft: { width: 52, height: 52, borderRadius: 16, backgroundColor: "rgba(255,215,0,0.15)", alignItems: "center", justifyContent: "center" },
  pointsEmoji: { fontSize: 26 },
  pointsRight: { flex: 1 },
  pointsValue: { color: "#FFD700", fontSize: 28, fontWeight: "900", lineHeight: 32 },
  pointsLabel: { color: "#FFD700", fontSize: 13, fontWeight: "700" },
  pointsSub: { color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 2 },

  // CTA
  ctaWrap: { width: width - 48 },
  ctaBtn: { borderRadius: 20, overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
});
