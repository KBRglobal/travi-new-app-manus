/**
 * TRAVI — Home Dashboard (Neutral Mockup)
 * Clean, minimal dark theme. Focus on UX and information, not decoration.
 */
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Platform, StatusBar, ImageBackground, Image,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

// ─── Neutral Design Tokens ───────────────────────────────────────────────────
const N = {
  bg:         "#111111",
  surface:    "#1C1C1E",
  surfaceAlt: "#2C2C2E",
  border:     "rgba(255,255,255,0.10)",
  white:      "#FFFFFF",
  textPri:    "#FFFFFF",
  textSec:    "#ABABAB",
  textMuted:  "#777777",
  accent:     "#007AFF",   // iOS blue — neutral accent
  green:      "#34C759",
  orange:     "#FF9500",
  red:        "#FF3B30",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const DESTINATIONS = [
  { id: "1", city: "Bali",      country: "Indonesia", match: 96, price: "€850",   days: "7-10", tags: ["Adventure", "Nature"],  image: require("@/assets/destinations/bali.jpg") },
  { id: "2", city: "Santorini", country: "Greece",    match: 91, price: "€1,200", days: "5-7",  tags: ["Romance", "Sunsets"],   image: require("@/assets/destinations/santorini.jpg") },
  { id: "3", city: "Kyoto",     country: "Japan",     match: 88, price: "€950",   days: "7-10", tags: ["Culture", "History"],   image: require("@/assets/destinations/kyoto.jpg") },
  { id: "4", city: "Paris",     country: "France",    match: 85, price: "€780",   days: "4-6",  tags: ["Romance", "Art"],       image: require("@/assets/destinations/paris.jpg") },
  { id: "5", city: "Maldives",  country: "Maldives",  match: 82, price: "€2,100", days: "5-8",  tags: ["Beach", "Luxury"],      image: require("@/assets/destinations/maldives.jpg") },
];

const TRENDING = [
  { id: "t1", city: "Dubai",     country: "UAE",   image: require("@/assets/destinations/dubai.jpg"),     price: "€650" },
  { id: "t2", city: "Tokyo",     country: "Japan", image: require("@/assets/destinations/tokyo.jpg"),     price: "€1,100" },
  { id: "t3", city: "Barcelona", country: "Spain", image: require("@/assets/destinations/barcelona.jpg"), price: "€720" },
  { id: "t4", city: "New York",  country: "USA",   image: require("@/assets/destinations/newyork.jpg"),   price: "€890" },
];

// ─── Destination Card ────────────────────────────────────────────────────────
function DestCard({ item }: { item: typeof DESTINATIONS[0] }) {
  const [saved, setSaved] = useState(false);
  return (
    <View style={S.destCard}>
      <ImageBackground source={item.image} style={S.destImage} imageStyle={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }} resizeMode="cover">
        <View style={S.destOverlay} />
        <View style={S.matchBadge}>
          <Text style={S.matchBadgeText}>{item.match}% Match</Text>
        </View>
        <Text style={S.destCityOverlay}>{item.city}, {item.country}</Text>
      </ImageBackground>
      <View style={S.destContent}>
        <View style={S.tagsRow}>
          {item.tags.map(t => (
            <View key={t} style={S.tag}><Text style={S.tagText}>{t}</Text></View>
          ))}
        </View>
        <Text style={S.destPrice}>From {item.price} · {item.days} days</Text>
        <View style={S.destCTA}>
          <TouchableOpacity
            style={S.planBtn}
            onPress={() => router.push("/(trip)/plan" as never)}
            activeOpacity={0.7}
          >
            <Text style={S.planBtnText}>Plan Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[S.saveBtn, saved && S.saveBtnActive]}
            onPress={() => { setSaved(s => !s); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            activeOpacity={0.7}
          >
            <IconSymbol name={saved ? "heart.fill" : "heart"} size={16} color={saved ? N.white : N.textSec} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Trending Card ───────────────────────────────────────────────────────────
function TrendCard({ item }: { item: typeof TRENDING[0] }) {
  return (
    <TouchableOpacity style={S.trendCard} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.7}>
      <ImageBackground source={item.image} style={StyleSheet.absoluteFillObject} imageStyle={{ borderRadius: 12 }} resizeMode="cover">
        <View style={[S.destOverlay, { borderRadius: 12 }]} />
        <View style={S.trendBottom}>
          <Text style={S.trendCity}>{item.city}</Text>
          <Text style={S.trendPrice}>From {item.price}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { state } = useStore();
  const insets = useSafeAreaInsets();

  const profile    = state.profile;
  const activeTrip = state.activeTrip;
  const dnaType    = profile?.travelerDNA?.type;
  const firstName  = profile?.name?.split(" ")[0] || "Traveler";
  const hasQuiz    = !!dnaType;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    if (h < 21) return "Good evening";
    return "Good night";
  })();

  const tabBarOffset = 56 + Math.max(insets.bottom, 8) + 16;
  const upcomingTrips = state.trips?.filter(t => t.status === "upcoming") ?? [];

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={N.bg} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>

        {/* ── Header ── */}
        <View style={[S.header, { paddingTop: insets.top + 8 }]}>
          <Image source={require("@/assets/images/logotype-dark.webp")} style={S.logoImg} resizeMode="contain" />
          <TouchableOpacity
            style={S.avatarBtn}
            onPress={() => router.push("/(tabs)/profile" as never)}
            activeOpacity={0.7}
          >
            <View style={S.avatar}>
              <Text style={S.avatarText}>{firstName.charAt(0)}</Text>
            </View>
            {activeTrip && <View style={S.avatarDot} />}
          </TouchableOpacity>
        </View>

        {/* ── Greeting ── */}
        <View style={S.greeting}>
          <Text style={S.greetingText}>{greeting}, {firstName}</Text>
          <Text style={S.greetingSub}>
            {hasQuiz ? `DNA Profile: ${dnaType}` : "DNA Profile: Not completed"}
          </Text>
          {!hasQuiz && (
            <TouchableOpacity
              style={S.greetingCTA}
              onPress={() => router.push("/(trip)/swipe" as never)}
              activeOpacity={0.7}
            >
              <Text style={S.greetingCTAText}>Complete DNA Quiz</Text>
              <IconSymbol name="chevron.right" size={14} color={N.accent} />
            </TouchableOpacity>
          )}
        </View>

        {/* ── Quick Actions ── */}
        <View style={S.quickRow}>
          {[
            { icon: "airplane" as const,               label: "Plan Trip",   onPress: () => router.push("/(trip)/plan" as never) },
            { icon: "safari.fill" as const,            label: "Explore",     onPress: () => router.push("/(tabs)/explore" as never) },
            { icon: "wallet.pass.fill" as const,       label: "Wallet",      onPress: () => router.push("/(tabs)/wallet" as never) },
            { icon: "sparkles" as const,               label: "DNA",         onPress: () => router.push("/(trip)/swipe" as never) },
          ].map(a => (
            <TouchableOpacity
              key={a.label}
              style={S.quickItem}
              onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); a.onPress(); }}
              activeOpacity={0.7}
            >
              <View style={S.quickIcon}>
                <IconSymbol name={a.icon} size={22} color={N.white} />
              </View>
              <Text style={S.quickLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Live Trip Banner ── */}
        {activeTrip && (
          <View style={S.sectionPad}>
            <TouchableOpacity style={S.liveBanner} onPress={() => router.push("/(live)/home" as never)} activeOpacity={0.7}>
              <View style={S.liveDot} />
              <View style={{ flex: 1 }}>
                <Text style={S.liveLabel}>LIVE TRIP</Text>
                <Text style={S.liveDest}>{activeTrip.destination}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={N.green} />
            </TouchableOpacity>
          </View>
        )}

        {/* ── Upcoming Trips ── */}
        {upcomingTrips.length > 0 && (
          <View style={S.section}>
            <Text style={S.sectionTitle}>Upcoming Trips</Text>
            {upcomingTrips.map(trip => {
              const daysLeft = Math.ceil((new Date(trip.startDate).getTime() - Date.now()) / 86400000);
              return (
                <TouchableOpacity key={trip.id} style={S.tripCard} onPress={() => router.push("/(tabs)/trip-hub" as never)} activeOpacity={0.7}>
                  <View style={S.tripContent}>
                    <Text style={S.tripDest}>{trip.destination}</Text>
                    <Text style={S.tripDates}>{trip.startDate} – {trip.endDate}</Text>
                  </View>
                  <View style={S.tripCountdown}>
                    <Text style={S.tripCountdownNum}>{daysLeft}</Text>
                    <Text style={S.tripCountdownLabel}>days</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* ── Recommended Destinations ── */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Recommended for You</Text>
          <Text style={S.sectionSub}>Based on your DNA profile</Text>
          <FlatList
            data={DESTINATIONS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={i => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            renderItem={({ item }) => <DestCard item={item} />}
            scrollEnabled
          />
        </View>

        {/* ── Trending Now ── */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Trending Now</Text>
          <FlatList
            data={TRENDING}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={i => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            renderItem={({ item }) => <TrendCard item={item} />}
            scrollEnabled
          />
        </View>

        {/* ── Value Proposition ── */}
        {!hasQuiz && (
          <View style={S.sectionPad}>
            <View style={S.valueCard}>
              <Text style={S.valueTitle}>You are your own agent.</Text>
              <Text style={S.valueBody}>
                Traditional agents pocket 10–15% of every booking. TRAVI removes the middleman — that commission comes back to you as cashback.
              </Text>
              <View style={S.valueRow}>
                <View style={S.valueCol}>
                  <Text style={S.valueColLabel}>Old way</Text>
                  <View style={S.valuePill}>
                    <Text style={S.valuePillText}>Agent keeps 15%</Text>
                  </View>
                </View>
                <Text style={S.valueVs}>vs</Text>
                <View style={S.valueCol}>
                  <Text style={S.valueColLabel}>TRAVI</Text>
                  <View style={[S.valuePill, S.valuePillGreen]}>
                    <Text style={[S.valuePillText, { color: N.green }]}>You keep it all</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

      </ScrollView>

      {/* ── Agent FAB ── */}
      <TouchableOpacity
        style={[S.fab, { bottom: tabBarOffset }]}
        onPress={() => {
          if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push("/(agent)/chat" as never);
        }}
        activeOpacity={0.8}
      >
        <Image source={require("@/assets/images/mascot-dark.png")} style={S.fabMascot} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },

  // Header
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingBottom: 12,
    backgroundColor: N.bg,
  },
  logoImg: { width: 90, height: 30 },
  avatarBtn: { position: "relative" },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: N.surfaceAlt,
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: N.white, fontSize: 15, fontWeight: "600" },
  avatarDot: {
    position: "absolute", top: -1, right: -1, width: 10, height: 10,
    borderRadius: 5, backgroundColor: N.green, borderWidth: 2, borderColor: N.bg,
  },

  // Greeting
  greeting: {
    paddingHorizontal: 20, paddingVertical: 20, gap: 6,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: N.border,
  },
  greetingText: { color: N.white, fontSize: 24, fontWeight: "700" },
  greetingSub: { color: N.textSec, fontSize: 14 },
  greetingCTA: {
    flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8,
  },
  greetingCTAText: { color: N.accent, fontSize: 15, fontWeight: "600" },

  // Quick Actions
  quickRow: {
    flexDirection: "row", justifyContent: "space-around",
    paddingHorizontal: 20, paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: N.border,
  },
  quickItem: { alignItems: "center", gap: 8 },
  quickIcon: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: N.surface,
    alignItems: "center", justifyContent: "center",
  },
  quickLabel: { color: N.textSec, fontSize: 12, fontWeight: "500" },

  // Sections
  section: { paddingTop: 24, gap: 12 },
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  sectionTitle: {
    color: N.white, fontSize: 18, fontWeight: "700", paddingHorizontal: 20,
  },
  sectionSub: {
    color: N.textMuted, fontSize: 13, paddingHorizontal: 20, marginTop: -6,
  },

  // Live Banner
  liveBanner: {
    flexDirection: "row", alignItems: "center", gap: 12,
    borderRadius: 12, borderWidth: 1, borderColor: "rgba(52,199,89,0.3)",
    backgroundColor: "rgba(52,199,89,0.08)",
    paddingHorizontal: 16, paddingVertical: 14,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: N.green },
  liveLabel: { color: N.green, fontSize: 10, fontWeight: "700", letterSpacing: 1 },
  liveDest: { color: N.white, fontSize: 15, fontWeight: "600" },

  // Trip Card
  tripCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: N.surface, borderRadius: 12, marginHorizontal: 20,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  tripContent: { flex: 1, padding: 16, gap: 4 },
  tripDest: { color: N.white, fontSize: 16, fontWeight: "600" },
  tripDates: { color: N.textSec, fontSize: 13 },
  tripCountdown: {
    alignItems: "center", justifyContent: "center",
    paddingHorizontal: 20, paddingVertical: 16,
    borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: N.border,
  },
  tripCountdownNum: { color: N.accent, fontSize: 22, fontWeight: "700" },
  tripCountdownLabel: { color: N.textMuted, fontSize: 10 },

  // Destination Card
  destCard: {
    width: 260, borderRadius: 14,
    backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
    overflow: "hidden",
  },
  destImage: { width: 260, height: 160, justifyContent: "flex-end", padding: 12 },
  destOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  matchBadge: {
    alignSelf: "flex-start",
    backgroundColor: N.green, borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  matchBadgeText: { color: N.white, fontSize: 11, fontWeight: "700" },
  destCityOverlay: {
    position: "absolute", bottom: 12, left: 14,
    color: N.white, fontSize: 16, fontWeight: "700",
  },
  destContent: { padding: 14, gap: 8 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  tagText: { color: N.textSec, fontSize: 11 },
  destPrice: { color: N.textSec, fontSize: 14, fontWeight: "600" },
  destCTA: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  planBtn: {
    backgroundColor: N.accent, borderRadius: 8,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  planBtnText: { color: N.white, fontSize: 14, fontWeight: "600" },
  saveBtn: {
    width: 40, height: 40, borderRadius: 8,
    backgroundColor: N.surfaceAlt,
    alignItems: "center", justifyContent: "center",
  },
  saveBtnActive: { backgroundColor: N.red },

  // Trending
  trendCard: {
    width: 150, height: 100, borderRadius: 12, overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  trendBottom: { position: "absolute", bottom: 10, left: 12 },
  trendCity: { color: N.white, fontSize: 14, fontWeight: "700" },
  trendPrice: { color: "rgba(255,255,255,0.7)", fontSize: 11 },

  // Value Card
  valueCard: {
    borderRadius: 14, padding: 20, gap: 12,
    backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  valueTitle: { color: N.white, fontSize: 18, fontWeight: "700" },
  valueBody: { color: N.textSec, fontSize: 14, lineHeight: 22 },
  valueRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 8 },
  valueCol: { alignItems: "center", gap: 8 },
  valueColLabel: { color: N.textMuted, fontSize: 11, fontWeight: "500", letterSpacing: 0.5 },
  valuePill: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  valuePillGreen: { backgroundColor: "rgba(52,199,89,0.12)" },
  valuePillText: { color: N.textSec, fontSize: 13, fontWeight: "600" },
  valueVs: { color: N.textMuted, fontSize: 14, fontWeight: "600" },

  // FAB
  fab: {
    position: "absolute", right: 20, zIndex: 100,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: N.accent,
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
  },
  fabMascot: { width: 36, height: 36 },
});
