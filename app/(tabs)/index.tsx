/**
 * TRAVI — Home Dashboard
 * Dark mode: #1A0B2E bg, #24103E surface, purple→pink gradients
 * NO circles — bare icons, pill badges, glassmorphism cards
 */
import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Platform, StatusBar, ImageBackground, Image,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withSequence,
  withTiming, withDelay,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

// ─── Design Tokens (Dark Mode) ────────────────────────────────────────────────
const C = {
  bg:           "#1A0B2E",   // Main background
  surface:      "#24103E",   // Cards / elevated surfaces
  surfaceHover: "#2D1649",   // Pressed state
  glass:        "rgba(36,16,62,0.6)",
  glassStroke:  "rgba(123,68,230,0.3)",
  purple:       "#6443F4",
  pink:         "#F94498",
  orange:       "#FF9327",
  green:        "#02A65C",
  white:        "#FFFFFF",
  textPrimary:  "#FFFFFF",
  textSecondary:"#D3CFD8",
  textMuted:    "#A79FB2",
  textDisabled: "#504065",
};

// ─── Destinations data ────────────────────────────────────────────────────────
const DESTINATIONS = [
  { id: "1", city: "Bali",      country: "Indonesia", match: 96, price: "€850",  days: "7-10", tags: ["Adventure", "Nature", "Wellness"],  image: require("@/assets/destinations/bali.jpg") },
  { id: "2", city: "Santorini", country: "Greece",    match: 91, price: "€1,200", days: "5-7", tags: ["Romance", "Sunsets", "Food"],        image: require("@/assets/destinations/santorini.jpg") },
  { id: "3", city: "Kyoto",     country: "Japan",     match: 88, price: "€950",  days: "7-10", tags: ["Culture", "History", "Zen"],         image: require("@/assets/destinations/kyoto.jpg") },
  { id: "4", city: "Paris",     country: "France",    match: 85, price: "€780",  days: "4-6",  tags: ["Romance", "Art", "Food"],             image: require("@/assets/destinations/paris.jpg") },
  { id: "5", city: "Maldives",  country: "Maldives",  match: 82, price: "€2,100", days: "5-8", tags: ["Beach", "Luxury", "Snorkeling"],     image: require("@/assets/destinations/maldives.jpg") },
];

const TRENDING = [
  { id: "t1", city: "Dubai",     country: "UAE",   image: require("@/assets/destinations/dubai.jpg"),     price: "€650" },
  { id: "t2", city: "Tokyo",     country: "Japan", image: require("@/assets/destinations/tokyo.jpg"),     price: "€1,100" },
  { id: "t3", city: "Barcelona", country: "Spain", image: require("@/assets/destinations/barcelona.jpg"), price: "€720" },
  { id: "t4", city: "New York",  country: "USA",   image: require("@/assets/destinations/newyork.jpg"),   price: "€890" },
];

// ─── Animated FAB ─────────────────────────────────────────────────────────────
function AgentFAB({ bottomOffset }: { bottomOffset: number }) {
  const bounce = useSharedValue(0);
  useEffect(() => {
    bounce.value = withDelay(2000,
      withRepeat(withSequence(withTiming(-7, { duration: 380 }), withTiming(0, { duration: 380 })), -1, true)
    );
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bounce.value }] }));
  return (
    <Animated.View style={[S.fab, { bottom: bottomOffset }, animStyle]}>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push("/(agent)/chat" as never);
        }}
        activeOpacity={0.88}
        style={S.fabInner}
      >
        <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
        <Image source={require("@/assets/images/mascot-dark.png")} style={S.fabMascot} resizeMode="contain" />
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Destination Card ─────────────────────────────────────────────────────────
function DestCard({ item }: { item: typeof DESTINATIONS[0] }) {
  const [saved, setSaved] = useState(false);
  return (
    <View style={S.destCard}>
      <ImageBackground source={item.image} style={S.destImage} imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} resizeMode="cover">
        <LinearGradient colors={["transparent", "rgba(26,11,46,0.92)"]} style={StyleSheet.absoluteFillObject} />
        {/* DNA Match badge — pill, no circle */}
        <View style={S.dnaBadge}>
          <IconSymbol name="checkmark.seal.fill" size={13} color={C.white} />
          <Text style={S.dnaBadgeText}>{item.match}% Match</Text>
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
          <TouchableOpacity style={S.planBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
            <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.planBtnText}>Plan Trip →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[S.saveBtn, saved && S.saveBtnActive]}
            onPress={() => { setSaved(s => !s); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            activeOpacity={0.85}
          >
            <IconSymbol name={saved ? "heart.fill" : "heart"} size={16} color={saved ? C.white : C.pink} />
            <Text style={[S.saveBtnText, saved && { color: C.white }]}>{saved ? "Saved" : "Save"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Trending Card ─────────────────────────────────────────────────────────────
function TrendCard({ item }: { item: typeof TRENDING[0] }) {
  return (
    <TouchableOpacity style={S.trendCard} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.88}>
      <ImageBackground source={item.image} style={StyleSheet.absoluteFillObject} imageStyle={{ borderRadius: 16 }} resizeMode="cover">
        <LinearGradient colors={["transparent", "rgba(26,11,46,0.88)"]} style={StyleSheet.absoluteFillObject} />
        <View style={S.trendBadge}>
          <Text style={S.trendBadgeText}>🔥 Trending</Text>
        </View>
        <View style={S.trendBottom}>
          <Text style={S.trendCity}>{item.city}</Text>
          <Text style={S.trendPrice}>From {item.price}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
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

  const tabBarOffset = 60 + Math.max(insets.bottom, 8) + 16;

  const quickActions = [
    { id: "plan",    icon: "airplane"               as const, label: "Plan a Trip",   sub: "Start exploring",    gradient: [C.purple, C.pink] as [string,string],  onPress: () => router.push("/(trip)/plan" as never) },
    { id: "wallet",  icon: "dollarsign.circle.fill" as const, label: "€0.00",         sub: "Available cashback", color: C.orange, onPress: () => router.push("/(tabs)/wallet" as never) },
    { id: "explore", icon: "safari.fill"            as const, label: "Explore",       sub: "Discover destinations", color: C.pink, onPress: () => router.push("/(tabs)/explore" as never) },
    { id: "dna",     icon: "sparkles"               as const, label: "Travel DNA",    sub: hasQuiz ? `${dnaType}` : "Complete quiz", color: C.purple, onPress: () => router.push("/(trip)/swipe" as never) },
  ];

  const upcomingTrips = state.trips?.filter(t => t.status === "upcoming") ?? [];

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>

        {/* ══ HEADER ══ */}
        <LinearGradient
          colors={[C.purple, "#9B3FD4", C.pink]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={[S.header, { paddingTop: insets.top + 12 }]}
        >
          <Image source={require("@/assets/images/logotype-dark.webp")} style={S.logoImg} resizeMode="contain" />
          <TouchableOpacity style={S.avatarBtn} onPress={() => router.push("/(tabs)/profile" as never)} activeOpacity={0.85}>
            <View style={S.avatar}>
              <Text style={S.avatarText}>{firstName.charAt(0)}</Text>
            </View>
            {activeTrip && <View style={S.avatarDot} />}
          </TouchableOpacity>
        </LinearGradient>

        {/* ══ HERO GREETING ══ */}
        <View style={S.hero}>
          <Text style={S.heroGreeting}>{greeting}, {firstName} 👋</Text>
          <Text style={S.heroDNA}>
            {hasQuiz ? `Your DNA Profile: ${dnaType} 🧬` : "Your DNA Profile: 0% Complete 🧬"}
          </Text>
          {!hasQuiz && (
            <TouchableOpacity style={S.heroCTA} onPress={() => router.push("/(trip)/swipe" as never)} activeOpacity={0.88}>
              <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <Text style={S.heroCTAText}>Complete DNA →</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ══ QUICK ACTIONS ══ */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.quickScroll}>
            {quickActions.map(item => (
              <TouchableOpacity
                key={item.id}
                style={S.quickCard}
                onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); item.onPress(); }}
                activeOpacity={0.82}
              >
                {item.gradient ? (
                  <LinearGradient colors={item.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
                ) : null}
                {/* Bare icon — NO circle background */}
                <IconSymbol name={item.icon} size={26} color={item.gradient ? C.white : (item.color ?? C.purple)} />
                <Text style={[S.quickLabel, item.gradient && { color: C.white }]}>{item.label}</Text>
                <Text style={[S.quickSub, item.gradient && { color: "rgba(255,255,255,0.75)" }]}>{item.sub}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ══ LIVE TRIP BANNER ══ */}
        {activeTrip && (
          <View style={S.sectionPad}>
            <TouchableOpacity style={S.liveBanner} onPress={() => router.push("/(live)/home" as never)} activeOpacity={0.88}>
              <LinearGradient colors={["rgba(2,166,92,0.18)", "rgba(2,166,92,0.08)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <View style={S.liveDot} />
              <View style={{ flex: 1 }}>
                <Text style={S.liveBannerLabel}>LIVE TRIP</Text>
                <Text style={S.liveBannerDest}>{activeTrip.destination}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={C.green} />
            </TouchableOpacity>
          </View>
        )}

        {/* ══ UPCOMING TRIPS ══ */}
        {upcomingTrips.length > 0 && (
          <View style={S.section}>
            <Text style={S.sectionTitle}>Your Upcoming Trips ✈️</Text>
            {upcomingTrips.map(trip => {
              const daysLeft = Math.ceil((new Date(trip.startDate).getTime() - Date.now()) / 86400000);
              return (
                <TouchableOpacity key={trip.id} style={S.tripCard} onPress={() => router.push("/(tabs)/trip-hub" as never)} activeOpacity={0.88}>
                  <View style={S.tripAccent} />
                  <View style={S.tripContent}>
                    <Text style={S.tripDest}>{trip.destination}</Text>
                    <Text style={S.tripDates}>{trip.startDate} – {trip.endDate}</Text>
                    <Text style={S.tripMeta}>{daysLeft} days away</Text>
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

        {/* ══ AI-CURATED DESTINATIONS ══ */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Destinations you'll love 💜</Text>
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

        {/* ══ GRADIENT DIVIDER ══ */}
        <LinearGradient colors={[C.purple, "#9B3FD4", C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.divider} />

        {/* ══ TRENDING NOW ══ */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Trending Now 🔥</Text>
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

        {/* ══ CASHBACK MANIFESTO ══ */}
        {!hasQuiz && (
          <View style={S.sectionPad}>
            <View style={S.manifestoCard}>
              <LinearGradient colors={[C.purple, "#3D2480"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
              <Text style={S.manifestoTitle}>You are your own agent.</Text>
              <Text style={S.manifestoBody}>
                Traditional agents pocket 10–15% of every booking. TRAVI removes the middleman — that commission comes back to you as cashback.
              </Text>
              <View style={S.manifestoRow}>
                <View style={S.manifestoCol}>
                  <Text style={S.manifestoColLabel}>Old way</Text>
                  <View style={[S.manifestoPill, { backgroundColor: "rgba(255,255,255,0.12)" }]}>
                    <Text style={S.manifestoPillText}>Agent keeps 15%</Text>
                  </View>
                </View>
                <Text style={S.manifestoVs}>vs</Text>
                <View style={S.manifestoCol}>
                  <Text style={S.manifestoColLabel}>TRAVI</Text>
                  <View style={[S.manifestoPill, { backgroundColor: "rgba(2,166,92,0.25)" }]}>
                    <Text style={[S.manifestoPillText, { color: "#7FFFB8" }]}>You keep it all</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

      </ScrollView>

      <AgentFAB bottomOffset={tabBarOffset} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  // Header
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingBottom: 16,
  },
  logoImg: { width: 90, height: 30 },
  avatarBtn: { position: "relative" },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 2, borderColor: "rgba(255,255,255,0.5)",
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: C.white, fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Bold" },
  avatarDot: {
    position: "absolute", top: 0, right: 0, width: 12, height: 12,
    borderRadius: 6, backgroundColor: C.green, borderWidth: 2, borderColor: C.bg,
  },

  // Hero
  hero: {
    backgroundColor: C.surface,
    paddingHorizontal: 24, paddingVertical: 24, gap: 8,
    borderBottomWidth: 1, borderBottomColor: C.glassStroke,
  },
  heroGreeting: { color: C.white, fontSize: 24, fontWeight: "800", fontFamily: "Chillax-Bold" },
  heroDNA: { color: C.textSecondary, fontSize: 14, fontFamily: "Satoshi-Regular" },
  heroCTA: {
    alignSelf: "flex-start", borderRadius: 24,
    paddingHorizontal: 24, paddingVertical: 12, marginTop: 8, overflow: "hidden",
  },
  heroCTAText: { color: C.white, fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },

  // Sections
  section: { paddingTop: 28, gap: 14 },
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  sectionTitle: {
    color: C.white, fontSize: 20, fontWeight: "700",
    fontFamily: "Chillax-Bold", paddingHorizontal: 20,
  },
  sectionSub: {
    color: C.textMuted, fontSize: 13, fontFamily: "Satoshi-Regular",
    paddingHorizontal: 20, marginTop: -8,
  },

  // Quick Actions — NO circle backgrounds
  quickScroll: { paddingHorizontal: 20, gap: 12 },
  quickCard: {
    width: 150, height: 120, borderRadius: 16, padding: 16, gap: 6,
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.glassStroke,
    overflow: "hidden",
    shadowColor: C.purple, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4,
  },
  quickLabel: { color: C.textSecondary, fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold", lineHeight: 18 },
  quickSub: { color: C.textMuted, fontSize: 11, fontFamily: "Satoshi-Regular", lineHeight: 14 },

  // Live Banner
  liveBanner: {
    flexDirection: "row", alignItems: "center", gap: 12,
    borderRadius: 16, borderWidth: 1, borderColor: "rgba(2,166,92,0.35)",
    paddingHorizontal: 16, paddingVertical: 14, overflow: "hidden",
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  liveBannerLabel: { color: C.green, fontSize: 10, fontWeight: "700", fontFamily: "Satoshi-Bold", letterSpacing: 1.2 },
  liveBannerDest: { color: C.white, fontSize: 15, fontWeight: "700", fontFamily: "Chillax-Bold" },

  // Trip Card — glass surface, NO circles
  tripCard: {
    flexDirection: "row", alignItems: "stretch",
    backgroundColor: C.surface, borderRadius: 16, marginHorizontal: 20,
    borderWidth: 1, borderColor: C.glassStroke, overflow: "hidden",
  },
  tripAccent: { width: 4, backgroundColor: C.purple },
  tripContent: { flex: 1, padding: 16, gap: 3 },
  tripDest: { color: C.white, fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Bold" },
  tripDates: { color: C.textSecondary, fontSize: 13, fontFamily: "Satoshi-Regular" },
  tripMeta: { color: C.textMuted, fontSize: 12, fontFamily: "Satoshi-Regular" },
  tripCountdown: {
    alignItems: "center", justifyContent: "center",
    paddingHorizontal: 16, backgroundColor: "rgba(100,67,244,0.15)",
  },
  tripCountdownNum: { color: C.purple, fontSize: 22, fontWeight: "800", fontFamily: "Chillax-Bold" },
  tripCountdownLabel: { color: C.textMuted, fontSize: 10, fontFamily: "Satoshi-Medium" },

  // Destination Card — dark surface, no circles
  destCard: {
    width: 280, borderRadius: 20,
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.glassStroke,
    overflow: "hidden",
  },
  destImage: { width: 280, height: 185, justifyContent: "flex-end", padding: 12 },
  dnaBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    alignSelf: "flex-start",
    backgroundColor: C.green, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  dnaBadgeText: { color: C.white, fontSize: 11, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  destCityOverlay: {
    position: "absolute", bottom: 12, left: 14,
    color: C.white, fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold",
  },
  destContent: { padding: 14, gap: 8 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    backgroundColor: "rgba(249,68,152,0.18)", borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  tagText: { color: C.pink, fontSize: 11, fontFamily: "Satoshi-Medium" },
  destPrice: { color: C.textSecondary, fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  destCTA: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  planBtn: {
    borderRadius: 24, paddingHorizontal: 18, paddingVertical: 10, overflow: "hidden",
  },
  planBtnText: { color: C.white, fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  saveBtn: {
    flexDirection: "row", alignItems: "center", gap: 5,
    borderRadius: 24, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1.5, borderColor: C.pink,
  },
  saveBtnActive: { backgroundColor: C.pink, borderColor: C.pink },
  saveBtnText: { color: C.pink, fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },

  // Gradient Divider
  divider: { height: 3, marginTop: 28, opacity: 0.6 },

  // Trending Card
  trendCard: {
    width: 160, height: 110, borderRadius: 16, overflow: "hidden",
    borderWidth: 1, borderColor: C.glassStroke,
  },
  trendBadge: {
    position: "absolute", top: 10, left: 10,
    backgroundColor: "rgba(255,147,39,0.85)", borderRadius: 12,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  trendBadgeText: { color: C.white, fontSize: 10, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  trendBottom: { position: "absolute", bottom: 10, left: 12 },
  trendCity: { color: C.white, fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  trendPrice: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Satoshi-Regular" },

  // Manifesto Card
  manifestoCard: {
    borderRadius: 20, padding: 24, gap: 16, overflow: "hidden",
    borderWidth: 1, borderColor: C.glassStroke,
  },
  manifestoTitle: { color: C.white, fontSize: 22, fontWeight: "800", fontFamily: "Chillax-Bold" },
  manifestoBody: { color: C.textSecondary, fontSize: 14, fontFamily: "Satoshi-Regular", lineHeight: 22 },
  manifestoRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 8 },
  manifestoCol: { alignItems: "center", gap: 8 },
  manifestoColLabel: { color: C.textMuted, fontSize: 11, fontFamily: "Satoshi-Medium", letterSpacing: 0.5 },
  manifestoPill: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  manifestoPillText: { color: C.white, fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  manifestoVs: { color: C.textDisabled, fontSize: 16, fontFamily: "Chillax-Bold" },

  // FAB
  fab: { position: "absolute", right: 20, zIndex: 100 },
  fabInner: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: "center", justifyContent: "center", overflow: "hidden",
    shadowColor: C.purple, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.45, shadowRadius: 24, elevation: 12,
  },
  fabMascot: { width: 42, height: 42 },
});
