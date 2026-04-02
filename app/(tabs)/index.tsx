import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Animated, Platform, StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");

// ─── Cinematic destination images — real travi.world CDN ─────────────────────
const HERO_DESTINATIONS = [
  {
    id: "1",
    city: "Dubai",
    country: "UAE",
    mood: "Where dreams touch the sky",
    image: "https://cdn.travi.world/destinations/hero/dubai/dubai-hero-burj-khalifa-palms-sunset.webp",
    color: "#F59E0B",
  },
  {
    id: "2",
    city: "Tokyo",
    country: "Japan",
    mood: "Neon dreams never sleep",
    image: "https://cdn.travi.world/destinations/hero/tokyo/tokyo-hero-shibuya-crossing-night-neon.webp",
    color: "#C084FC",
  },
  {
    id: "3",
    city: "Paris",
    country: "France",
    mood: "The city of eternal light",
    image: "https://cdn.travi.world/destinations/hero/paris/paris-hero-eiffel-tower-golden-hour.webp",
    color: "#F94498",
  },
  {
    id: "4",
    city: "Singapore",
    country: "Singapore",
    mood: "The garden city of the future",
    image: "https://cdn.travi.world/destinations/hero/singapore/singapore-hero-gardens-by-the-bay-supertrees-night.webp",
    color: "#10B981",
  },
  {
    id: "5",
    city: "Barcelona",
    country: "Spain",
    mood: "Gaudí's masterpiece on the Med",
    image: "https://cdn.travi.world/destinations/hero/barcelona/barcelona-hero-sagrada-familia-sunset.webp",
    color: "#EC4899",
  },
];

const HOW_IT_WORKS = [
  {
    icon: "sparkles" as const,
    color: "#C084FC",
    gradient: ["#6443F4", "#9077EF"] as [string, string],
    title: "We learn you",
    desc: "Your travel DNA, your pace, your non-negotiables. TRAVI remembers everything.",
  },
  {
    icon: "airplane" as const,
    color: "#F94498",
    gradient: ["#F94498", "#C2185B"] as [string, string],
    title: "We plan it all",
    desc: "Flights, hotels, experiences — curated for you, booked in minutes.",
  },
  {
    icon: "dollarsign.circle.fill" as const,
    color: "#FFD700",
    gradient: ["#F59E0B", "#D97706"] as [string, string],
    title: "The commission is yours",
    desc: "No middleman. The fee that used to go to a travel agent? It comes back to you.",
  },
];

const START_OPTIONS = [
  {
    id: "destination",
    icon: "location.fill" as const,
    label: "I have a destination",
    sub: "Tell me where you want to go",
    gradient: ["#6443F4", "#9077EF"] as [string, string],
  },
  {
    id: "inspiration",
    icon: "sparkles" as const,
    label: "Inspire me",
    sub: "Let TRAVI surprise you",
    gradient: ["#F94498", "#C2185B"] as [string, string],
  },
  {
    id: "dates",
    icon: "calendar" as const,
    label: "I have dates",
    sub: "I know when, not where",
    gradient: ["#02A65C", "#059669"] as [string, string],
  },
];

export default function HomeScreen() {
  const { state } = useStore();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const heroFade = useRef(new Animated.Value(0)).current;
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const profile = state.profile;
  const activeTrip = state.activeTrip;
  const dnaType = profile?.travelerDNA?.type;
  const firstName = profile?.name?.split(" ")[0] || "Traveler";
  const hasQuiz = !!dnaType;

  const headerOpacity = scrollY.interpolate({ inputRange: [0, 100], outputRange: [0, 1], extrapolate: "clamp" });

  // Auto-rotate hero destinations
  useEffect(() => {
    Animated.timing(heroFade, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    heroTimer.current = setInterval(() => {
      Animated.sequence([
        Animated.timing(heroFade, { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.delay(100),
        Animated.timing(heroFade, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]).start();
      setHeroIndex((i) => (i + 1) % HERO_DESTINATIONS.length);
    }, 4500);
    return () => { if (heroTimer.current) clearInterval(heroTimer.current); };
  }, []);

  const handleStart = useCallback((optionId: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (optionId === "inspiration") {
      router.push("/(trip)/surprise" as never);
    } else {
      router.push("/(trip)/plan" as never);
    }
  }, []);

  const handleLiveTrip = useCallback(() => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/(live)/home" as never);
  }, []);

  const currentDest = HERO_DESTINATIONS[heroIndex];

  return (
    <View style={S.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Sticky mini-header ── */}
      <Animated.View style={[S.stickyHeader, { opacity: headerOpacity, paddingTop: insets.top + 8 }]}>
        <LinearGradient colors={["rgba(4,0,16,0.97)", "rgba(13,5,32,0.95)"]} style={StyleSheet.absoluteFillObject} />
        <Text style={S.stickyTitle}>TRAVI</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/notifications" as never)} style={S.stickyNotif} activeOpacity={0.8}>
          <IconSymbol name="bell.fill" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* ══════════════════════════════════════════
            BLOCK 1 — Cinematic Hero
        ══════════════════════════════════════════ */}
        <View style={S.heroWrap}>
          <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: heroFade }]}>
            <Image source={{ uri: currentDest.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
          </Animated.View>

          {/* Multi-layer cinematic overlay */}
          <LinearGradient
            colors={["rgba(0,0,0,0.15)", "rgba(13,5,32,0.5)", "rgba(13,5,32,0.95)"]}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          {/* Subtle color tint from destination */}
          <LinearGradient
            colors={["transparent", `${currentDest.color}22`]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Header row */}
          <View style={[S.heroHeader, { paddingTop: insets.top + 8 }]}>
            <View>
              <Text style={S.heroGreeting}>Hello, {firstName}</Text>
            </View>
            <TouchableOpacity style={S.notifBtn} onPress={() => router.push("/(tabs)/notifications" as never)} activeOpacity={0.8}>
              <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)"]} style={S.notifGradient}>
                <IconSymbol name="bell.fill" size={18} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Main headline */}
          <View style={S.heroBody}>
            <Text style={S.heroTagline}>{currentDest.mood}</Text>
            <Text style={S.heroCity}>{currentDest.city}</Text>
            <Text style={S.heroCountry}>{currentDest.country}</Text>

            {/* Dot indicators */}
            <View style={S.heroDots}>
              {HERO_DESTINATIONS.map((_, i) => (
                <View
                  key={i}
                  style={[S.heroDot, i === heroIndex && S.heroDotActive]}
                />
              ))}
            </View>
          </View>

          {/* Big headline */}
          <View style={S.heroHeadlineWrap}>
            <Text style={S.heroHeadline}>The travel friend{"\n"}you never had.</Text>
            <Text style={S.heroSub}>
              Someone who knows exactly how you travel — and works only for you.
            </Text>
          </View>

          {/* Active trip banner */}
          {activeTrip && (
            <TouchableOpacity style={S.activeTripBanner} onPress={handleLiveTrip} activeOpacity={0.88}>
              <LinearGradient colors={["rgba(16,185,129,0.3)", "rgba(5,150,105,0.2)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <View style={S.activeDot} />
              <View style={{ flex: 1 }}>
                <Text style={S.activeTripLabel}>LIVE TRIP</Text>
                <Text style={S.activeTripDest}>{activeTrip.destination}, {activeTrip.country}</Text>
              </View>
              <View style={S.activeTripArrow}>
                <IconSymbol name="chevron.right" size={16} color="#02A65C" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* ══════════════════════════════════════════
            BLOCK 2 — Trending Destinations
        ══════════════════════════════════════════ */}
        <View style={S.block}>
          <View style={S.blockHeaderRow}>
            <Text style={S.blockTitle}>Trending Now</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore" as never)} activeOpacity={0.7}>
              <Text style={S.seeAllText}>See all →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.trendingRow}>
            {[
              { city: "Dubai", country: "UAE", img: "https://travi.world/cards/dubai.webp", tag: "✨ Luxury" },
              { city: "Tokyo", country: "Japan", img: "https://travi.world/cards/tokyo.webp", tag: "🌟 Iconic" },
              { city: "Barcelona", country: "Spain", img: "https://travi.world/cards/barcelona.webp", tag: "🎨 Artsy" },
              { city: "Singapore", country: "Singapore", img: "https://travi.world/cards/singapore.webp", tag: "🌿 Garden" },
              { city: "Amsterdam", country: "Netherlands", img: "https://travi.world/cards/amsterdam.webp", tag: "🚲 Charming" },
            ].map((d) => (
              <TouchableOpacity
                key={d.city}
                style={S.trendingCard}
                onPress={() => router.push({ pathname: "/(trip)/destination-detail", params: { id: d.city.toLowerCase() } } as never)}
                activeOpacity={0.88}
              >
                <Image source={{ uri: d.img }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.75)"]} locations={[0.4, 1]} style={StyleSheet.absoluteFillObject} pointerEvents="none" />
                <View style={S.trendingTag}><Text style={S.trendingTagText}>{d.tag}</Text></View>
                <View style={S.trendingInfo}>
                  <Text style={S.trendingCity}>{d.city}</Text>
                  <Text style={S.trendingCountry}>{d.country}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ══════════════════════════════════════════
            BLOCK 3 — "Where's your head at?" CTA
        ══════════════════════════════════════════ */}
        <View style={S.block}>
          <Text style={S.blockTitle}>Where's your head at?</Text>
          <Text style={S.blockSub}>Let's build your perfect trip.</Text>
          <View style={S.startOptions}>
            {START_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={S.startCard}
                onPress={() => handleStart(opt.id)}
                activeOpacity={0.88}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={S.startCardBorder} />
                <View style={[S.startIconWrap, { overflow: "hidden" }]}>
                  <LinearGradient colors={opt.gradient} style={StyleSheet.absoluteFillObject} />
                  <IconSymbol name={opt.icon} size={22} color="#FFFFFF" />
                </View>
                <View style={S.startCardText}>
                  <Text style={S.startCardLabel}>{opt.label}</Text>
                  <Text style={S.startCardSub}>{opt.sub}</Text>
                </View>
                <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.3)" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ══════════════════════════════════════════
            BLOCK 4 — How It Works
        ══════════════════════════════════════════ */}
        <View style={S.block}>
          <Text style={S.blockTitle}>How TRAVI works</Text>
          <Text style={S.blockSub}>No middleman. No hidden fees. Just you and your trip.</Text>

          <View style={S.howItWorksWrap}>
            {HOW_IT_WORKS.map((step, i) => (
              <View key={i} style={S.howStep}>
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && <View style={S.howConnector} />}

                <View style={S.howLeft}>
                  <View style={[S.howIconWrap, { overflow: "hidden" }]}>
                    <LinearGradient colors={step.gradient} style={StyleSheet.absoluteFillObject} />
                    <IconSymbol name={step.icon} size={22} color="#FFFFFF" />
                  </View>
                </View>
                <View style={S.howContent}>
                  <Text style={S.howTitle}>{step.title}</Text>
                  <Text style={S.howDesc}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ══════════════════════════════════════════
            BLOCK 5 — No Middleman Manifesto
        ══════════════════════════════════════════ */}
        <View style={S.block}>
          <View style={S.manifestoCard}>
            <LinearGradient
              colors={["rgba(100,67,244,0.25)", "rgba(249,68,152,0.2)", "rgba(255,215,0,0.1)"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={S.manifestoBorder} />

            <View style={S.manifestoHeader}>
              <View style={S.manifestoIconWrap}>
                <LinearGradient colors={["#F59E0B", "#D97706"]} style={StyleSheet.absoluteFillObject} />
                <IconSymbol name="dollarsign.circle.fill" size={22} color="#FFFFFF" />
              </View>
              <Text style={S.manifestoTitle}>You are your own agent</Text>
            </View>

            <Text style={S.manifestoText}>
              Every time you book a trip, a travel agent takes a commission — usually 10–15% of your total cost. With TRAVI, there is no agent. You plan, you book, and that commission comes straight back to you as cashback after your trip.
            </Text>

            <View style={S.manifestoComparison}>
              <View style={S.manifestoCompCol}>
                <Text style={S.manifestoCompLabel}>Traditional</Text>
                <View style={S.manifestoCompBadge}>
                  <Text style={S.manifestoCompBadgeText}>Agent keeps 10–15%</Text>
                </View>
              </View>
              <View style={S.manifestoVs}>
                <Text style={S.manifestoVsText}>vs</Text>
              </View>
              <View style={S.manifestoCompCol}>
                <Text style={[S.manifestoCompLabel, { color: "#02A65C" }]}>TRAVI</Text>
                <View style={[S.manifestoCompBadge, { backgroundColor: "rgba(2,166,92,0.2)", borderColor: "rgba(2,166,92,0.4)" }]}>
                  <Text style={[S.manifestoCompBadgeText, { color: "#02A65C" }]}>You keep it all</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ══════════════════════════════════════════
            BLOCK 6 — Final CTA
        ══════════════════════════════════════════ */}
        <View style={[S.block, { paddingBottom: 8 }]}>
          <TouchableOpacity style={S.finalCta} onPress={() => handleStart("destination")} activeOpacity={0.88}>
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={S.finalCtaContent}>
              <Text style={S.finalCtaTitle}>Let's build your trip</Text>
              <Text style={S.finalCtaSub}>Free to plan · You only pay when you book</Text>
            </View>
            <View style={S.finalCtaArrow}>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

      </Animated.ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },

  // Sticky header — paddingTop set dynamically via insets
  stickyHeader: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingBottom: 12 },
  stickyTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", letterSpacing: 2 },
  stickyNotif: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },

  // Hero
  heroWrap: { height: height * 0.72, justifyContent: "flex-end", overflow: "hidden" },
  heroHeader: { position: "absolute", top: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  heroGreeting: { color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: "500" },
  notifBtn: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  notifGradient: { flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", borderRadius: 22 },

  heroBody: { position: "absolute", bottom: 160, left: 20, right: 20 },
  heroTagline: { color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: "600", letterSpacing: 0.5, marginBottom: 4 },
  heroCity: { color: "#FFFFFF", fontSize: 42, fontWeight: "900", letterSpacing: -1.5, lineHeight: 46 },
  heroCountry: { color: "rgba(255,255,255,0.55)", fontSize: 16, fontWeight: "600", marginTop: 2 },
  heroDots: { flexDirection: "row", gap: 6, marginTop: 14 },
  heroDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.25)" },
  heroDotActive: { width: 20, backgroundColor: "#FFFFFF" },

  heroHeadlineWrap: { paddingHorizontal: 20, paddingBottom: 28 },
  heroHeadline: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", letterSpacing: -0.8, lineHeight: 34 },
  heroSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 21, marginTop: 8 },

  activeTripBanner: { flexDirection: "row", alignItems: "center", gap: 12, marginHorizontal: 20, marginBottom: 20, borderRadius: 16, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(16,185,129,0.3)" },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#02A65C" },
  activeTripLabel: { color: "#02A65C", fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  activeTripDest: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  activeTripArrow: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(16,185,129,0.2)", alignItems: "center", justifyContent: "center" },

  // Blocks
  block: { paddingHorizontal: 20, paddingTop: 28 },
  blockTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", letterSpacing: -0.5 },
  blockSub: { color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 4, marginBottom: 16, lineHeight: 19 },
  blockHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  seeAllText: { color: "#C084FC", fontSize: 13, fontWeight: "700" },

  // Trending horizontal cards
  trendingRow: { paddingRight: 20, gap: 12 },
  trendingCard: { width: 160, height: 200, borderRadius: 18, overflow: "hidden" },
  trendingTag: { position: "absolute", top: 10, left: 10, backgroundColor: "rgba(0,0,0,0.55)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  trendingTagText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  trendingInfo: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 12 },
  trendingCity: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", letterSpacing: -0.3 },
  trendingCountry: { color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: "600" },

  // DNA card (has quiz)
  dnaCard: { borderRadius: 20, overflow: "hidden", flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
  dnaCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 20, borderWidth: 1, borderColor: "rgba(100,67,244,0.35)" },
  dnaCardLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  dnaIconWrap: { width: 48, height: 48, borderRadius: 16, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  dnaCardLabel: { color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  dnaCardType: { color: "#C084FC", fontSize: 18, fontWeight: "900", marginTop: 1 },
  dnaCardSub: { color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 2 },

  // DNA teaser (no quiz)
  dnaTeaser: { borderRadius: 20, overflow: "hidden", padding: 18 },
  dnaTeaserContent: { flexDirection: "row", alignItems: "center", gap: 14 },
  dnaTeaserLeft: { flex: 1 },
  dnaTeaserTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", lineHeight: 22 },
  dnaTeaserSub: { color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 4, lineHeight: 18 },
  dnaTeaserBtn: { borderRadius: 14, overflow: "hidden", paddingHorizontal: 16, paddingVertical: 10 },
  dnaTeaserBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },

  // Start options
  startOptions: { gap: 10 },
  startCard: { borderRadius: 18, overflow: "hidden", flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
  startCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  startIconWrap: { width: 50, height: 50, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  startCardText: { flex: 1 },
  startCardLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  startCardSub: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 },

  // How it works
  howItWorksWrap: { gap: 0 },
  howStep: { flexDirection: "row", gap: 16, paddingBottom: 28, position: "relative" },
  howConnector: { position: "absolute", left: 24, top: 52, width: 2, height: "100%", backgroundColor: "rgba(255,255,255,0.07)" },
  howLeft: { alignItems: "center" },
  howIconWrap: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  howContent: { flex: 1, paddingTop: 4 },
  howTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  howDesc: { color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 20, marginTop: 4 },

  // Manifesto
  manifestoCard: { borderRadius: 24, overflow: "hidden", padding: 22, gap: 16 },
  manifestoBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  manifestoHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  manifestoIconWrap: { width: 44, height: 44, borderRadius: 14, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  manifestoTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", flex: 1 },
  manifestoText: { color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 22 },
  manifestoComparison: { flexDirection: "row", alignItems: "center", gap: 12 },
  manifestoCompCol: { flex: 1, alignItems: "center", gap: 8 },
  manifestoCompLabel: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "700", letterSpacing: 0.5 },
  manifestoCompBadge: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7, backgroundColor: "rgba(239,68,68,0.15)", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)", alignItems: "center" },
  manifestoCompBadgeText: { color: "#F87171", fontSize: 12, fontWeight: "700" },
  manifestoVs: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.07)", alignItems: "center", justifyContent: "center" },
  manifestoVsText: { color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: "700" },

  // Final CTA
  finalCta: { borderRadius: 22, overflow: "hidden", flexDirection: "row", alignItems: "center", padding: 20 },
  finalCtaContent: { flex: 1 },
  finalCtaTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  finalCtaSub: { color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 3 },
  finalCtaArrow: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
});
