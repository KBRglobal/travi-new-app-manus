import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
interface DNASnapshot {
  id: string;
  date: string;
  tripName: string;
  destination: string;
  traits: Record<string, number>;
  insights: string[];
  emoji: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TRAIT_META: Record<string, { label: string; icon: string; color: string }> = {
  adventureLevel:   { label: "Adventure",   icon: "🧗", color: "#EF4444" },
  culturalDepth:    { label: "Culture",     icon: "🏛️", color: "#A855F7" },
  foodieness:       { label: "Foodie",      icon: "🍜", color: "#F59E0B" },
  socialEnergy:     { label: "Social",      icon: "🎉", color: "#EC4899" },
  luxuryAffinity:   { label: "Luxury",      icon: "👑", color: "#D97706" },
  natureConnection: { label: "Nature",      icon: "🌿", color: "#22C55E" },
};

const SNAPSHOTS: DNASnapshot[] = [
  {
    id: "s4",
    date: "Apr 2, 2026",
    tripName: "Current DNA",
    destination: "—",
    emoji: "✨",
    traits: { adventureLevel: 82, culturalDepth: 91, foodieness: 88, socialEnergy: 76, luxuryAffinity: 45, natureConnection: 68 },
    insights: [
      "Your cultural depth has grown 12% since Tokyo — you're seeking deeper, more authentic experiences.",
      "Adventure spirit is at an all-time high. You're ready for more challenging activities.",
      "Luxury affinity remains low — you value experiences over comfort.",
    ],
  },
  {
    id: "s3",
    date: "Mar 21, 2026",
    tripName: "Tokyo & Kyoto",
    destination: "Japan",
    emoji: "🇯🇵",
    traits: { adventureLevel: 78, culturalDepth: 79, foodieness: 85, socialEnergy: 74, luxuryAffinity: 42, natureConnection: 65 },
    insights: [
      "Tokyo trip boosted your foodie score by 18% — you loved the omakase experiences.",
      "Cultural depth jumped after visiting temples and traditional tea ceremonies.",
      "You preferred local izakayas over Michelin restaurants — luxury score dropped slightly.",
    ],
  },
  {
    id: "s2",
    date: "Jan 17, 2026",
    tripName: "Bali Wellness Retreat",
    destination: "Indonesia",
    emoji: "🇮🇩",
    traits: { adventureLevel: 72, culturalDepth: 68, foodieness: 67, socialEnergy: 70, luxuryAffinity: 48, natureConnection: 82 },
    insights: [
      "Nature connection spiked after Bali — you spent 80% of time outdoors.",
      "Wellness activities (yoga, spa) increased your luxury affinity temporarily.",
      "You avoided nightlife — social energy stayed steady.",
    ],
  },
  {
    id: "s1",
    date: "Nov 5, 2025",
    tripName: "Initial DNA Quiz",
    destination: "—",
    emoji: "🧬",
    traits: { adventureLevel: 65, culturalDepth: 60, foodieness: 55, socialEnergy: 68, luxuryAffinity: 50, natureConnection: 58 },
    insights: [
      "Your starting DNA profile — based on the onboarding quiz.",
      "TRAVI learns more about you with every trip you take.",
      "The more you travel, the more accurate your recommendations become.",
    ],
  },
];

// ─── DNA Snapshot Card ────────────────────────────────────────────────────────
function SnapshotCard({ snapshot, isLatest }: { snapshot: DNASnapshot; isLatest: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[S.snapshotCard, isLatest && S.snapshotCardLatest]}>
      {isLatest && (
        <LinearGradient
          colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.12)"]}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <View style={S.snapshotHeader}>
        <View style={S.snapshotLeft}>
          <Text style={S.snapshotEmoji}>{snapshot.emoji}</Text>
          <View>
            <Text style={S.snapshotTrip}>{snapshot.tripName}</Text>
            <Text style={S.snapshotDate}>{snapshot.date}</Text>
          </View>
        </View>
        {isLatest && (
          <View style={S.latestBadge}>
            <Text style={S.latestBadgeText}>Current</Text>
          </View>
        )}
      </View>

      {/* Traits Grid */}
      <View style={S.traitsGrid}>
        {Object.entries(snapshot.traits).map(([key, value]) => {
          const meta = TRAIT_META[key];
          if (!meta) return null;
          return (
            <View key={key} style={S.traitPill}>
              <Text style={S.traitIcon}>{meta.icon}</Text>
              <Text style={S.traitValue}>{value}</Text>
            </View>
          );
        })}
      </View>

      {/* Insights */}
      <TouchableOpacity
        style={S.insightsToggle}
        onPress={() => {
          if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setExpanded(!expanded);
        }}
        activeOpacity={0.8}
      >
        <Text style={S.insightsToggleText}>
          {expanded ? "Hide insights" : `View ${snapshot.insights.length} insights`}
        </Text>
        <IconSymbol name="chevron.right" size={14} color={BRAND.textMuted} />
      </TouchableOpacity>

      {expanded && (
        <View style={S.insightsWrap}>
          {snapshot.insights.map((insight, i) => (
            <View key={i} style={S.insightRow}>
              <View style={S.insightDot} />
              <Text style={S.insightText}>{insight}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function DNAEvolutionScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#24103E", "#1A0A30", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity
          style={S.backBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>DNA Evolution</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Hero */}
      <View style={S.hero}>
        <Text style={S.heroTitle}>Your Travel DNA Journey</Text>
        <Text style={S.heroSub}>
          TRAVI learns from every trip you take. Watch how your travel personality evolves over time.
        </Text>
      </View>

      {/* Timeline */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, gap: 12 }}
      >
        {SNAPSHOTS.map((snapshot, i) => (
          <SnapshotCard key={snapshot.id} snapshot={snapshot} isLatest={i === 0} />
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  orb1: { position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(100,67,244,0.1)" },
  orb2: { position: "absolute", bottom: 200, left: -80, width: 160, height: 160, borderRadius: 80, backgroundColor: "rgba(249,68,152,0.07)" },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary, flex: 1, textAlign: "center" },

  hero: { paddingHorizontal: 16, paddingBottom: 16, gap: 6 },
  heroTitle: { ...TYPE.h3, color: BRAND.textPrimary },
  heroSub: { ...TYPE.body, color: BRAND.textSecondary, lineHeight: 22 },

  snapshotCard: { borderRadius: RADIUS.xl, overflow: "hidden", padding: 16, gap: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" },
  snapshotCardLatest: { borderColor: "rgba(100,67,244,0.4)", borderWidth: 2 },
  snapshotHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  snapshotLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  snapshotEmoji: { fontSize: 32 },
  snapshotTrip: { ...TYPE.h4, color: BRAND.textPrimary },
  snapshotDate: { ...TYPE.small, color: BRAND.textMuted, marginTop: 2 },
  latestBadge: { backgroundColor: "rgba(100,67,244,0.25)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(100,67,244,0.5)" },
  latestBadgeText: { color: BRAND.purple, fontSize: 11, fontWeight: "800", fontFamily: "Chillax-Bold" },

  traitsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  traitPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  traitIcon: { fontSize: 14 },
  traitValue: { color: BRAND.textPrimary, fontSize: 13, fontWeight: "700" },

  insightsToggle: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 8 },
  insightsToggleText: { ...TYPE.small, color: BRAND.purple, fontWeight: "700", flex: 1 },

  insightsWrap: { gap: 10, paddingTop: 4 },
  insightRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  insightDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: BRAND.purple, marginTop: 6 },
  insightText: { ...TYPE.body, color: BRAND.textSecondary, flex: 1, lineHeight: 20 },
});
