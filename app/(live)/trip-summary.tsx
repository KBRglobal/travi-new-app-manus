import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Dimensions, Share
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, LOGOS, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TRIP = {
  title: "Tokyo & Kyoto Adventure",
  dates: "Mar 18–21, 2025",
  duration: "4 days",
  travelers: ["You", "Maya R.", "Lior K."],
  coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
  totalSpent: 840,
  myShare: 280,
  savedVsAvg: 23,
  distanceTraveled: 1240,
  activitiesCompleted: 8,
  restaurantsVisited: 5,
  photosCount: 247,
  dnaMatch: 94,
};

const HIGHLIGHTS = [
  { id: "h1", title: "TeamLab Planets", emoji: "🎨", rating: 5, note: "Mind-blowing digital art experience", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300" },
  { id: "h2", title: "Sushi Saito Dinner", emoji: "🍣", rating: 5, note: "Best meal of the trip, worth every penny", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300" },
  { id: "h3", title: "Fushimi Inari at Dawn", emoji: "⛩️", rating: 5, note: "No crowds, magical atmosphere", image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=300" },
];

const MEMORIES_GRID = [
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200",
  "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=200",
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=200",
  "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=200",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200",
];

const BADGES = [
  { id: "b1", icon: "airplane", label: "Jet Setter",     desc: "Flew 11,000+ km",       color: BRAND.purple },
  { id: "b2", icon: "fork.knife", label: "Foodie",       desc: "5 restaurants visited", color: BRAND.orange },
  { id: "b3", icon: "camera.fill", label: "Photographer", desc: "247 photos taken",     color: BRAND.pink },
  { id: "b4", icon: "star.fill",  label: "Explorer",     desc: "8 activities done",     color: "#FFD112" },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <View style={[S.statCard, { borderColor: color + "30" }]}>
      <LinearGradient colors={[color + "18", color + "08"]} style={StyleSheet.absoluteFillObject} />
      <View style={[S.statIcon, { backgroundColor: color + "25" }]}>
        <IconSymbol name={icon as any} size={18} color={color} />
      </View>
      <Text style={[S.statValue, { color }]}>{value}</Text>
      <Text style={S.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Highlight Card ───────────────────────────────────────────────────────────
function HighlightCard({ item }: { item: typeof HIGHLIGHTS[0] }) {
  return (
    <View style={S.highlightCard}>
      <Image source={{ uri: item.image }} style={S.highlightImage} resizeMode="cover" />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} style={S.highlightGradient} />
      <View style={S.highlightContent}>
        <Text style={S.highlightEmoji}>{item.emoji}</Text>
        <Text style={S.highlightTitle}>{item.title}</Text>
        <Text style={S.highlightNote} numberOfLines={2}>{item.note}</Text>
        <View style={S.starsRow}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <IconSymbol key={i} name="star.fill" size={12} color="#FFD112" />
          ))}
        </View>
      </View>
    </View>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ badge }: { badge: typeof BADGES[0] }) {
  return (
    <View style={[S.badge, { borderColor: badge.color + "40" }]}>
      <LinearGradient colors={[badge.color + "20", badge.color + "08"]} style={StyleSheet.absoluteFillObject} />
      <View style={[S.badgeIcon, { backgroundColor: badge.color + "25" }]}>
        <IconSymbol name={badge.icon as any} size={22} color={badge.color} />
      </View>
      <Text style={[S.badgeLabel, { color: badge.color }]}>{badge.label}</Text>
      <Text style={S.badgeDesc}>{badge.desc}</Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function TripSummaryScreen() {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(0);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      await Share.share({
        message: `Just got back from an amazing trip to Tokyo & Kyoto! 🇯🇵✈️ ${TRIP.activitiesCompleted} activities, ${TRIP.restaurantsVisited} restaurants, and ${TRIP.photosCount} photos. Planned with TRAVI 🦆`,
        title: "My TRAVI Trip Summary",
      });
      setShared(true);
    } catch {}
  };

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#24103E", "rgba(36,16,62,0.55)", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Trip Summary</Text>
        <TouchableOpacity style={S.shareBtn} onPress={handleShare} activeOpacity={0.8}>
          <IconSymbol name="square.and.arrow.up" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Hero cover */}
        <View style={S.heroWrap}>
          <Image source={{ uri: TRIP.coverImage }} style={S.heroCover} resizeMode="cover" />
          <LinearGradient colors={["transparent", "rgba(13,5,32,0.95)"]} style={S.heroGradient} />
          <View style={S.heroContent}>
            <View style={S.heroLogoWrap}>
              <Image source={LOGOS.logotypeDark} style={S.heroLogo} resizeMode="contain" />
            </View>
            <Text style={S.heroTitle}>{TRIP.title}</Text>
            <Text style={S.heroDates}>{TRIP.dates} · {TRIP.duration}</Text>
            <View style={S.heroTravelers}>
              {TRIP.travelers.map((t, i) => (
                <View key={i} style={[S.travelerAvatar, { backgroundColor: [BRAND.purple, BRAND.pink, BRAND.cyan][i] + "40", marginLeft: i > 0 ? -10 : 0 }]}>
                  <Text style={S.travelerInitial}>{t[0]}</Text>
                </View>
              ))}
              <Text style={S.travelerNames}>{TRIP.travelers.join(", ")}</Text>
            </View>
          </View>
        </View>

        {/* DNA Match */}
        <View style={S.dnaMatchCard}>
          <LinearGradient colors={["rgba(100,67,244,0.25)", "rgba(249,68,152,0.15)"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.dnaMatchLeft}>
            <Text style={S.dnaMatchPct}>{TRIP.dnaMatch}%</Text>
            <Text style={S.dnaMatchLabel}>DNA Match</Text>
            <Text style={S.dnaMatchSub}>This trip matched your traveler DNA perfectly!</Text>
          </View>
          <Image source={LOGOS.mascotDark} style={S.dnaMascot} resizeMode="contain" />
        </View>

        {/* Stats grid */}
        <View style={S.sectionHeader}>
          <Text style={S.sectionTitle}>Trip Stats</Text>
        </View>
        <View style={S.statsGrid}>
          <StatCard icon="dollarsign.circle.fill" value={`$${TRIP.myShare}`} label="Your Share" color={BRAND.purple} />
          <StatCard icon="airplane" value={`${TRIP.distanceTraveled}km`} label="Traveled" color={BRAND.cyan} />
          <StatCard icon="ticket.fill" value={`${TRIP.activitiesCompleted}`} label="Activities" color={BRAND.pink} />
          <StatCard icon="camera.fill" value={`${TRIP.photosCount}`} label="Photos" color="#FFD112" />
          <StatCard icon="fork.knife" value={`${TRIP.restaurantsVisited}`} label="Restaurants" color={BRAND.orange} />
          <StatCard icon="leaf.fill" value={`${TRIP.savedVsAvg}%`} label="Saved vs Avg" color={BRAND.green} />
        </View>

        {/* Expense breakdown */}
        <View style={S.sectionHeader}>
          <Text style={S.sectionTitle}>Expenses</Text>
          <TouchableOpacity onPress={() => router.push("/(live)/expenses")} activeOpacity={0.7}>
            <Text style={S.seeAll}>See Details →</Text>
          </TouchableOpacity>
        </View>
        <View style={S.expenseCard}>
          <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.expenseRow}>
            <Text style={S.expenseLabel}>Total Trip Cost</Text>
            <Text style={S.expenseValue}>${TRIP.totalSpent}</Text>
          </View>
          <View style={S.expenseRow}>
            <Text style={S.expenseLabel}>Your Share</Text>
            <Text style={[S.expenseValue, { color: BRAND.purple }]}>${TRIP.myShare}</Text>
          </View>
          <View style={S.expenseRow}>
            <Text style={S.expenseLabel}>Saved vs Average Tourist</Text>
            <Text style={[S.expenseValue, { color: BRAND.green }]}>-{TRIP.savedVsAvg}% 🎉</Text>
          </View>
          <View style={S.expenseBar}>
            <View style={[S.expenseBarFill, { width: "33%" }]}>
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            </View>
          </View>
          <Text style={S.expenseBarLabel}>Your share: 33% of total</Text>
        </View>

        {/* Highlights */}
        <View style={S.sectionHeader}>
          <Text style={S.sectionTitle}>Top Highlights</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.highlightsRow}>
          {HIGHLIGHTS.map((h) => <HighlightCard key={h.id} item={h} />)}
        </ScrollView>

        {/* Memory grid */}
        <View style={S.sectionHeader}>
          <Text style={S.sectionTitle}>Memories</Text>
          <Text style={S.seeAll}>{TRIP.photosCount} photos</Text>
        </View>
        <View style={S.memoriesGrid}>
          {MEMORIES_GRID.map((uri, i) => (
            <TouchableOpacity key={i} style={[S.memoryCell, i === 0 && S.memoryCellLarge]} activeOpacity={0.9}>
              <Image source={{ uri }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
              {i === 5 && (
                <View style={S.moreOverlay}>
                  <Text style={S.moreText}>+{TRIP.photosCount - 5}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Badges earned */}
        <View style={S.sectionHeader}>
          <Text style={S.sectionTitle}>Badges Earned</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.badgesRow}>
          {BADGES.map((b) => <Badge key={b.id} badge={b} />)}
        </ScrollView>

        {/* Rate your trip */}
        <View style={S.rateSection}>
          <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.rateTitle}>How was your trip?</Text>
          <Text style={S.rateSub}>Your feedback helps us plan better trips</Text>
          <View style={S.starsWrap}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setRating(star);
                }}
                activeOpacity={0.8}
              >
                <IconSymbol
                  name={star <= rating ? "star.fill" : "star"}
                  size={36}
                  color={star <= rating ? "#FFD112" : "rgba(255,255,255,0.06)"}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={S.rateThankYou}>
              {rating === 5 ? "Amazing! We're so glad you loved it! 🎉" :
               rating >= 3 ? "Thanks for the feedback! We'll do better 🙏" :
               "Sorry to hear that. We'll improve! 💪"}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[S.bottomCTA, { paddingBottom: insets.bottom + 16 }]}>
        <LinearGradient colors={["rgba(13,5,32,0)", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity
          style={S.planNextBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace("/");
          }}
          activeOpacity={0.85}
        >
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="airplane" size={18} color="#FFF" />
          <Text style={S.planNextText}>Plan Your Next Adventure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={S.shareMemoriesBtn} onPress={handleShare} activeOpacity={0.8}>
          <IconSymbol name="square.and.arrow.up" size={16} color={BRAND.textSecondary} />
          <Text style={S.shareMemoriesText}>Share Memories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, paddingTop: 4 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary, flex: 1, textAlign: "center" },
  shareBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },

  heroWrap: { marginHorizontal: 16, borderRadius: RADIUS.xxl, overflow: "hidden", marginBottom: 16, height: 260 },
  heroCover: { ...StyleSheet.absoluteFillObject },
  heroGradient: { ...StyleSheet.absoluteFillObject },
  heroContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20 },
  heroLogoWrap: { marginBottom: 8 },
  heroLogo: { width: 60, height: 20 },
  heroTitle: { ...TYPE.h1, color: "#FFF", marginBottom: 4 },
  heroDates: { ...TYPE.body, color: "rgba(255,255,255,0.7)", marginBottom: 10 },
  heroTravelers: { flexDirection: "row", alignItems: "center", gap: 8 },
  travelerAvatar: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: BRAND.bgDeep },
  travelerInitial: { ...TYPE.caption, color: "#FFF", fontFamily: "Chillax-Bold" },
  travelerNames: { ...TYPE.small, color: "rgba(255,255,255,0.7)" },

  dnaMatchCard: { overflow: "hidden", marginHorizontal: 16, borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)", flexDirection: "row", alignItems: "center", padding: 16, marginBottom: 8 },
  dnaMatchLeft: { flex: 1 },
  dnaMatchPct: { fontSize: 40, fontFamily: "Chillax-Bold", color: "#FFF", lineHeight: 44 },
  dnaMatchLabel: { ...TYPE.h4, color: BRAND.purple, marginBottom: 4 },
  dnaMatchSub: { ...TYPE.small, color: BRAND.textSecondary, lineHeight: 18 },
  dnaMascot: { width: 80, height: 80 },

  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, marginTop: 20, marginBottom: 12 },
  sectionTitle: { ...TYPE.h3, color: BRAND.textPrimary },
  seeAll: { ...TYPE.small, color: BRAND.purple },

  statsGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 10 },
  statCard: { overflow: "hidden", width: (W - 52) / 3, borderRadius: RADIUS.xl, borderWidth: 1, padding: 12, alignItems: "center", gap: 4 },
  statIcon: { width: 36, height: 36, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  statValue: { ...TYPE.h3, fontFamily: "Chillax-Bold" },
  statLabel: { ...TYPE.caption, color: BRAND.textMuted, textAlign: "center" },

  expenseCard: { overflow: "hidden", marginHorizontal: 16, borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", padding: 16, gap: 10 },
  expenseRow: { flexDirection: "row", justifyContent: "space-between" },
  expenseLabel: { ...TYPE.body, color: BRAND.textSecondary },
  expenseValue: { ...TYPE.bodyMed, color: BRAND.textPrimary, fontFamily: "Chillax-Semibold" },
  expenseBar: { height: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", marginTop: 4 },
  expenseBarFill: { height: "100%", borderRadius: 3 },
  expenseBarLabel: { ...TYPE.caption, color: BRAND.textMuted },

  highlightsRow: { paddingHorizontal: 16, gap: 12 },
  highlightCard: { overflow: "hidden", width: W * 0.65, height: 180, borderRadius: RADIUS.xl },
  highlightImage: { ...StyleSheet.absoluteFillObject },
  highlightGradient: { ...StyleSheet.absoluteFillObject },
  highlightContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 14 },
  highlightEmoji: { fontSize: 24, marginBottom: 4 },
  highlightTitle: { ...TYPE.bodyMed, color: "#FFF", marginBottom: 3 },
  highlightNote: { ...TYPE.caption, color: "rgba(255,255,255,0.7)", marginBottom: 6 },
  starsRow: { flexDirection: "row", gap: 2 },

  memoriesGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 6 },
  memoryCell: { width: (W - 44) / 3, height: (W - 44) / 3, borderRadius: RADIUS.md, overflow: "hidden" },
  memoryCellLarge: { width: (W - 44) / 3 * 2 + 6, height: (W - 44) / 3 * 2 + 6 },
  moreOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)", alignItems: "center", justifyContent: "center" },
  moreText: { ...TYPE.h2, color: "#FFF", fontFamily: "Chillax-Bold" },

  badgesRow: { paddingHorizontal: 16, gap: 12 },
  badge: { overflow: "hidden", width: 100, borderRadius: RADIUS.xl, borderWidth: 1, padding: 14, alignItems: "center", gap: 6 },
  badgeIcon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  badgeLabel: { ...TYPE.label, textAlign: "center" },
  badgeDesc: { ...TYPE.caption, color: BRAND.textMuted, textAlign: "center" },

  rateSection: { overflow: "hidden", marginHorizontal: 16, borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", padding: 20, alignItems: "center", marginTop: 8 },
  rateTitle: { ...TYPE.h3, color: BRAND.textPrimary, marginBottom: 6 },
  rateSub: { ...TYPE.small, color: BRAND.textSecondary, marginBottom: 16 },
  starsWrap: { flexDirection: "row", gap: 8, marginBottom: 12 },
  rateThankYou: { ...TYPE.body, color: BRAND.textSecondary, textAlign: "center" },

  bottomCTA: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 16, alignItems: "center", gap: 10 },
  planNextBtn: { overflow: "hidden", width: "100%", borderRadius: RADIUS.xl, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 18 },
  planNextText: { ...TYPE.button, color: "#FFF" },
  shareMemoriesBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  shareMemoriesText: { ...TYPE.body, color: BRAND.textSecondary },
});
