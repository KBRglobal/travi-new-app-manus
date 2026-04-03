import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Animated, Platform, StatusBar, ImageBackground,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { fetchWeather, type WeatherData } from "@/lib/weather";

const { width, height } = Dimensions.get("window");

// ─── Cinematic destination images ────────────────────────────────────────────
const HERO_DESTINATIONS = [
  {
    id: "1",
    city: "Santorini",
    country: "Greece",
    mood: "Where sunsets stop time",
    image: require("@/assets/destinations/santorini.jpg"),
    color: "#F59E0B",
  },
  {
    id: "2",
    city: "Kyoto",
    country: "Japan",
    mood: "Ancient beauty, modern soul",
    image: require("@/assets/destinations/kyoto.jpg"),
    color: "#F94498",
  },
  {
    id: "3",
    city: "Bali",
    country: "Indonesia",
    mood: "Find your inner peace",
    image: require("@/assets/destinations/bali.jpg"),
    color: "#02A65C",
  },
  {
    id: "4",
    city: "Patagonia",
    country: "Argentina",
    mood: "The edge of the world",
    image: require("@/assets/destinations/patagonia.jpg"),
    color: "#6443F4",
  },
  {
    id: "5",
    city: "Tokyo",
    country: "Japan",
    mood: "Neon dreams never sleep",
    image: require("@/assets/destinations/tokyo.jpg"),
    color: "#C084FC",
  },
];

const HOW_IT_WORKS = [
  {
    icon: "sparkles" as const,
    color: "#C084FC",
    gradient: ["#6443F4", "#9077EF"] as [string, string],
    title: "Your Travel DNA",
    desc: "Answer 7 questions once. TRAVI learns your travel personality — your pace, your vibe, your non-negotiables.",
  },
  {
    icon: "airplane" as const,
    color: "#F94498",
    gradient: ["#F94498", "#C2185B"] as [string, string],
    title: "AI plans everything",
    desc: "Flights, hotels, and experiences curated for you — not for the masses. Built around your DNA.",
  },
  {
    icon: "dollarsign.circle.fill" as const,
    color: "#FBBF24",
    gradient: ["#F59E0B", "#D97706"] as [string, string],
    title: "Cashback, not commissions",
    desc: "The 10–15% that used to go to a travel agent? After your trip, it comes back to you as TRAVI cashback.",
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
  const [upcomingWeather, setUpcomingWeather] = useState<WeatherData | null>(null);

  // Time-based greeting
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    if (h < 21) return "Good evening";
    return "Good night";
  })();

  // Fetch weather for upcoming trip
  useEffect(() => {
    const upcoming = state.trips.filter(t => t.status === "upcoming").sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
    if (upcoming) {
      fetchWeather(upcoming.destination).then(w => setUpcomingWeather(w));
    }
  }, [state.trips]);

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
      <Animated.View style={[S.stickyHeader, { opacity: headerOpacity }]}>
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
        contentContainerStyle={{ paddingBottom: 130 }}
      >

        {/* ══════════════════════════════════════════
            BLOCK 1 — Cinematic Hero
        ══════════════════════════════════════════ */}
        <View style={S.heroWrap}>
          <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: heroFade }]}>
            <ImageBackground source={currentDest.image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
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
          <View style={[S.heroHeader, { paddingTop: Math.max(insets.top, 44) + 8 }]}>
            <View>
              <Text style={S.heroGreeting}>{greeting}, {firstName}</Text>
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
            {/* Prominent Plan a Trip CTA */}
            <TouchableOpacity
              style={S.heroPlanBtn}
              onPress={() => router.push("/(trip)/plan" as never)}
              activeOpacity={0.88}
            >
              <LinearGradient
                colors={["#6443F4", "#F94498"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <IconSymbol name="airplane" size={18} color="#FFFFFF" />
              <Text style={S.heroPlanBtnText}>Plan a Trip</Text>
              <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>

          {/* Upcoming trip countdown banner */}
          {!activeTrip && state.trips.filter(t => t.status === "upcoming").length > 0 && (() => {
            const upcoming = state.trips.filter(t => t.status === "upcoming").sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
            const daysLeft = Math.ceil((new Date(upcoming.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            return (
              <TouchableOpacity style={S.upcomingBanner} onPress={() => router.push("/(tabs)/trip-hub" as never)} activeOpacity={0.88}>
                <LinearGradient colors={["rgba(100,67,244,0.3)", "rgba(249,68,152,0.2)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                <View style={S.upcomingCountdown}>
                  <Text style={S.upcomingDays}>{daysLeft}</Text>
                  <Text style={S.upcomingDaysLabel}>days</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={S.upcomingLabel}>UPCOMING TRIP</Text>
                  <Text style={S.upcomingDest}>{upcoming.destination}, {upcoming.country}</Text>
                  {upcomingWeather && (
                    <Text style={S.upcomingWeather}>{upcomingWeather.icon} {upcomingWeather.temp}°C · {upcomingWeather.condition}</Text>
                  )}
                </View>
                <View style={S.activeTripArrow}>
                  <IconSymbol name="chevron.right" size={16} color="#A78BFA" />
                </View>
              </TouchableOpacity>
            );
          })()}
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
            BLOCK 2 — Plan Your Trip CTA
        ══════════════════════════════════════════ */}
        <View style={S.block}>
          <TouchableOpacity
            style={S.dnaCard}
            onPress={() => router.push("/(dna)/quick-swipe" as never)}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={["rgba(100,67,244,0.35)", "rgba(249,68,152,0.25)"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={S.dnaCardBorder} />
            <View style={S.dnaCardLeft}>
              <View style={S.dnaIconWrap}>
                <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
                <IconSymbol name="sparkles" size={22} color="#FFFFFF" />
              </View>
              <View>
                <Text style={S.dnaCardLabel}>2 MINUTES · FREE</Text>
                <Text style={S.dnaCardType}>Discover Your Travel DNA</Text>
                <Text style={S.dnaCardSub}>Swipe to reveal your traveler profile</Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={18} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>
        </View>

        {/* ══════════════════════════════════════════
            BLOCK 2.5 — DNA-Powered Daily Tips
        ══════════════════════════════════════════ */}
        {hasQuiz && (
          <View style={S.block}>
            <Text style={S.blockTitle}>Made for you today</Text>
            <Text style={S.blockSub}>Based on your {dnaType} profile</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingBottom: 130 }}>
              {[
                { emoji: "🏖️", tip: "Book beach activities early — best spots sell out 3 days ahead", color: "#06B6D4" },
                { emoji: "🍜", tip: "Try the local market for lunch — 3x better value than tourist restaurants", color: "#F59E0B" },
                { emoji: "🗺️", tip: "Your Balanced pace = 4-5 stops/day. Don't over-schedule Day 1", color: "#6443F4" },
              ].map((tip, i) => (
                <View key={i} style={[S.tipCard, { borderColor: tip.color + "30" }]}>
                  <LinearGradient colors={[tip.color + "18", tip.color + "06"]} style={StyleSheet.absoluteFillObject} />
                  <Text style={{ fontSize: 24 }}>{tip.emoji}</Text>
                  <Text style={S.tipText}>{tip.tip}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

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
                  colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.55)"]}
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
                <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.55)" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ══════════════════════════════════════════
            BLOCK 4 — How It Works
        ══════════════════════════════════════════ */}
        <View style={S.block}>
          <Text style={S.blockTitle}>How TRAVI works</Text>
          <Text style={S.blockSub}>The travel friend you never had — who works only for you.</Text>

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
              Traditional travel agents take 10–15% of every booking — without you knowing. TRAVI removes the middleman entirely. You plan, you book directly, and that commission comes back to you as cashback after your trip. No hidden fees. No surprises.
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
        <View style={[S.block, { paddingBottom: 130 }]}>
          <TouchableOpacity style={S.finalCta} onPress={() => handleStart("destination")} activeOpacity={0.88}>
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={S.finalCtaContent}>
              <Text style={S.finalCtaTitle}>Plan your next trip</Text>
              <Text style={S.finalCtaSub}>Free to plan · Pay only when you book · Cashback guaranteed</Text>
            </View>
            <View style={S.finalCtaArrow}>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

      </Animated.ScrollView>

      {/* ── AI Agent FAB ── */}
      <TouchableOpacity
        style={[S.agentFab, { bottom: Math.max(insets.bottom, 16) + 72 }]}
        onPress={() => {
          if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push("/(agent)/chat" as never);
        }}
        activeOpacity={0.88}
      >
        <LinearGradient
          colors={["#7C3AED", "#9333EA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={S.agentFabBorder} />
        <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
        <Text style={S.agentFabLabel}>Agent</Text>
      </TouchableOpacity>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },

  // Sticky header
  stickyHeader: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 56, paddingBottom: 130 },
  stickyTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", letterSpacing: 2, fontFamily: "Chillax-Bold" },
  stickyNotif: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },

  // Hero
  heroWrap: { height: height * 0.72, justifyContent: "flex-end", overflow: "hidden" },
  heroHeader: { position: "absolute", top: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 130 },
  heroGreeting: { color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: "500", fontFamily: "Satoshi-Medium" },
  notifBtn: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  notifGradient: { flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)", borderRadius: 22 },

  heroBody: { position: "absolute", bottom: 220, left: 20, right: 20, zIndex: 2 },
  heroTagline: { color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: "600", letterSpacing: 0.5, marginBottom: 4 },
  heroCity: { color: "#FFFFFF", fontSize: 42, fontWeight: "900", letterSpacing: -1.5, lineHeight: 46, fontFamily: "Chillax-Bold" },
  heroCountry: { color: "rgba(255,255,255,0.55)", fontSize: 16, fontWeight: "600", marginTop: 2 },
  heroDots: { flexDirection: "row", gap: 6, marginTop: 14 },
  heroDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.55)" },
  heroDotActive: { width: 20, backgroundColor: "#FFFFFF" },

  heroHeadlineWrap: { paddingHorizontal: 20, paddingBottom: 130 },
  heroHeadline: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", letterSpacing: -0.8, lineHeight: 34, fontFamily: "Chillax-Bold" },
  heroSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 21, marginTop: 8 },
  heroPlanBtn: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 18, borderRadius: 28, paddingVertical: 14, paddingHorizontal: 24, overflow: "hidden", alignSelf: "flex-start" },
  heroPlanBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700",
      fontFamily: "Chillax-Semibold", letterSpacing: 0.2 },

  upcomingBanner: { flexDirection: "row", alignItems: "center", gap: 12, marginHorizontal: 20, marginBottom: 16, borderRadius: 16, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  upcomingCountdown: { width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(100,67,244,0.25)", alignItems: "center", justifyContent: "center" },
  upcomingDays: { fontSize: 18, fontWeight: "800",
      fontFamily: "Chillax-Bold", color: "#A78BFA", lineHeight: 20 },
  upcomingDaysLabel: { fontSize: 9, color: "#A78BFA", fontWeight: "600", letterSpacing: 0.5 },
  upcomingLabel: { color: "#A78BFA", fontSize: 10, fontWeight: "800",
      fontFamily: "Chillax-Bold", letterSpacing: 1.5 },
  upcomingDest: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  upcomingWeather: { color: "rgba(167,139,250,0.8)", fontSize: 11, marginTop: 2 },
  activeTripBanner: { flexDirection: "row", alignItems: "center", gap: 12, marginHorizontal: 20, marginBottom: 20, borderRadius: 16, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(16,185,129,0.3)" },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#02A65C" },
  activeTripLabel: { color: "#02A65C", fontSize: 10, fontWeight: "800",
      fontFamily: "Chillax-Bold", letterSpacing: 1.5 },
  activeTripDest: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  activeTripArrow: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(16,185,129,0.2)", alignItems: "center", justifyContent: "center" },

  // Blocks
  block: { paddingHorizontal: 20, paddingTop: 28 },
  blockTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  blockSub: { color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4, marginBottom: 16, lineHeight: 19 },

  // Plan Trip CTA card
  planTripCard: { borderRadius: 20, overflow: "hidden", padding: 18, shadowColor: "#6443F4", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.45, shadowRadius: 18, elevation: 12 },
  planTripContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  planTripLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  planTripIconBox: { width: 52, height: 52, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  planTripTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", lineHeight: 22, fontFamily: "Chillax-Bold" },
  planTripSub: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 3, fontWeight: "500",
      fontFamily: "Satoshi-Medium" },
  planTripArrow: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },

  // DNA card (has quiz)
  dnaCard: { borderRadius: 20, overflow: "hidden", flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
  dnaCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 20, borderWidth: 1, borderColor: "rgba(100,67,244,0.35)" },
  dnaCardLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  dnaIconWrap: { width: 48, height: 48, borderRadius: 16, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  dnaCardLabel: { color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  dnaCardType: { color: "#C084FC", fontSize: 18, fontWeight: "900",
      fontFamily: "Chillax-Bold", marginTop: 1 },
  dnaCardSub: { color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 2 },

  // DNA teaser (no quiz)
  dnaTeaser: { borderRadius: 20, overflow: "hidden", padding: 18 },
  dnaTeaserContent: { flexDirection: "row", alignItems: "center", gap: 14 },
  dnaTeaserLeft: { flex: 1 },
  dnaTeaserTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800",
      fontFamily: "Chillax-Bold", lineHeight: 22 },
  dnaTeaserSub: { color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 4, lineHeight: 18 },
  dnaTeaserBtn: { borderRadius: 14, overflow: "hidden", paddingHorizontal: 16, paddingVertical: 10 },
  dnaTeaserBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800",
      fontFamily: "Chillax-Bold" },

  // Start options
  startOptions: { gap: 10 },
  startCard: { borderRadius: 18, overflow: "hidden", flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
  startCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  startIconWrap: { width: 50, height: 50, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  startCardText: { flex: 1 },
  startCardLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  startCardSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },

  // How it works
  howItWorksWrap: { gap: 0 },
  howStep: { flexDirection: "row", gap: 16, paddingBottom: 130, position: "relative" },
  howConnector: { position: "absolute", left: 24, top: 52, width: 2, height: "100%", backgroundColor: "rgba(255,255,255,0.55)" },
  howLeft: { alignItems: "center" },
  howIconWrap: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  howContent: { flex: 1, paddingTop: 4 },
  howTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  howDesc: { color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 20, marginTop: 4 },

  // Manifesto
  manifestoCard: { borderRadius: 24, overflow: "hidden", padding: 22, gap: 16 },
  manifestoBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  manifestoHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  manifestoIconWrap: { width: 44, height: 44, borderRadius: 14, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  manifestoTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", flex: 1, fontFamily: "Chillax-Bold" },
  manifestoText: { color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 22 },
  manifestoComparison: { flexDirection: "row", alignItems: "center", gap: 12 },
  manifestoCompCol: { flex: 1, alignItems: "center", gap: 8 },
  manifestoCompLabel: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "700", letterSpacing: 0.5 },
  manifestoCompBadge: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7, backgroundColor: "rgba(239,68,68,0.15)", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)", alignItems: "center" },
  manifestoCompBadgeText: { color: "#F87171", fontSize: 12, fontWeight: "700" },
  manifestoVs: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  manifestoVsText: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700" },
  tipCard: { width: 200, borderRadius: 16, padding: 14, gap: 8, overflow: "hidden", borderWidth: 1 },
  tipText: { color: "#ECEDEE", fontSize: 13, lineHeight: 19 },

  // Final CTA
  finalCta: { borderRadius: 22, overflow: "hidden", flexDirection: "row", alignItems: "center", padding: 20 },
  finalCtaContent: { flex: 1 },
  finalCtaTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  finalCtaSub: { color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 3 },
  finalCtaArrow: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },

  // AI Agent FAB
  agentFab: { position: "absolute", right: 20, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 18, paddingVertical: 14, borderRadius: 28, overflow: "hidden", shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 16, elevation: 12 },
  agentFabBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 28, borderWidth: 1, borderColor: "rgba(192,132,252,0.4)" },
  agentFabLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", letterSpacing: 0.3 },
});
