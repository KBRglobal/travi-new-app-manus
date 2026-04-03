import { useRef, useState, useEffect, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Animated, Platform, StatusBar, ImageBackground,
  Image,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { fetchWeather, type WeatherData } from "@/lib/weather";

const { width } = Dimensions.get("window");

// ─── TRAVI Brand ─────────────────────────────────────────────────────────────
const B = {
  purple:      "#6443F4",
  purpleDark:  "#1A0D3D",
  purpleMid:   "#2E1A6E",
  purpleLight: "#8266F6",
  pink:        "#F94498",
  pinkDark:    "#C4206A",
  orange:      "#FF9327",
  green:       "#02A65C",
  cyan:        "#01BEFF",
  white:       "#FFFFFF",
  offWhite:    "rgba(255,255,255,0.92)",
  dim:         "rgba(255,255,255,0.55)",
  dimmer:      "rgba(255,255,255,0.30)",
};

// ─── Hero destinations ────────────────────────────────────────────────────────
const HERO_DESTINATIONS = [
  { id: "1", city: "Santorini", country: "Greece",    emoji: "🇬🇷", vibe: "Sunsets that break hearts",       image: require("@/assets/destinations/santorini.jpg") },
  { id: "2", city: "Kyoto",     country: "Japan",     emoji: "🇯🇵", vibe: "Ancient beauty, modern soul",     image: require("@/assets/destinations/kyoto.jpg") },
  { id: "3", city: "Bali",      country: "Indonesia", emoji: "🇮🇩", vibe: "Find your inner peace",           image: require("@/assets/destinations/bali.jpg") },
  { id: "4", city: "Tokyo",     country: "Japan",     emoji: "🇯🇵", vibe: "Neon dreams never sleep",         image: require("@/assets/destinations/tokyo.jpg") },
  { id: "5", city: "Patagonia", country: "Argentina", emoji: "🇦🇷", vibe: "The edge of the world",           image: require("@/assets/destinations/patagonia.jpg") },
];

// ─── Quick-start options ──────────────────────────────────────────────────────
const START_OPTIONS = [
  { id: "destination", icon: "location.fill" as const, label: "I know where",   sub: "Pick a destination",       color: B.purple,  bg: "rgba(100,67,244,0.12)" },
  { id: "inspiration", icon: "sparkles"      as const, label: "Surprise me",    sub: "Let TRAVI choose",         color: B.pink,    bg: "rgba(249,68,152,0.12)" },
  { id: "dates",       icon: "calendar"      as const, label: "I have dates",   sub: "Find what fits",           color: B.orange,  bg: "rgba(255,147,39,0.12)" },
];

export default function HomeScreen() {
  const { state } = useStore();
  const insets = useSafeAreaInsets();
  const heroFade = useRef(new Animated.Value(1)).current;
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [upcomingWeather, setUpcomingWeather] = useState<WeatherData | null>(null);

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

  // Fetch upcoming trip weather
  useEffect(() => {
    const upcoming = state.trips
      .filter(t => t.status === "upcoming")
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
    if (upcoming) fetchWeather(upcoming.destination).then(w => setUpcomingWeather(w));
  }, [state.trips]);

  // Auto-rotate hero
  useEffect(() => {
    heroTimer.current = setInterval(() => {
      Animated.sequence([
        Animated.timing(heroFade, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(heroFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]).start();
      setHeroIndex(i => (i + 1) % HERO_DESTINATIONS.length);
    }, 5000);
    return () => { if (heroTimer.current) clearInterval(heroTimer.current); };
  }, []);

  const handleStart = useCallback((optionId: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (optionId === "inspiration") router.push("/(trip)/surprise" as never);
    else router.push("/(trip)/plan" as never);
  }, []);

  const currentDest  = HERO_DESTINATIONS[heroIndex];
  const tabBarOffset = 60 + Math.max(insets.bottom, 8);

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={B.purpleDark} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}
      >

        {/* ══════════════════════════════════════════════════════
            HERO — Full-bleed destination photo
        ══════════════════════════════════════════════════════ */}
        <View style={[S.heroWrap, { height: 380 + insets.top }]}>
          {/* Background image with fade */}
          <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: heroFade }]}>
            <ImageBackground
              source={currentDest.image}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
          </Animated.View>

          {/* Dark gradient overlay — top to bottom */}
          <LinearGradient
            colors={["rgba(26,13,61,0.55)", "rgba(26,13,61,0.15)", "rgba(26,13,61,0.80)"]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* ── Top bar ── */}
          <View style={[S.topBar, { paddingTop: insets.top + 10 }]}>
            {/* Official TRAVI logotype (white version for dark bg) */}
            <Image
              source={require("@/assets/images/logotype-dark.webp")}
              style={S.logoImg}
              resizeMode="contain"
            />
            <View style={S.topBarRight}>
              {state.isAuthenticated && (
                <TouchableOpacity
                  style={S.walletPill}
                  onPress={() => router.push("/(tabs)/wallet" as never)}
                  activeOpacity={0.85}
                >
                  <IconSymbol name="dollarsign.circle.fill" size={13} color={B.white} />
                  <Text style={S.walletPillText}>$0</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={S.notifBtn}
                onPress={() => router.push("/(tabs)/notifications" as never)}
                activeOpacity={0.85}
              >
                <IconSymbol name="bell.fill" size={20} color={B.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Greeting ── */}
          <View style={S.heroGreetingWrap}>
            <Text style={S.heroGreeting}>
              {state.isAuthenticated ? `${greeting}, ${firstName} ✈️` : "Where to next? ✈️"}
            </Text>
          </View>

          {/* ── Destination info at bottom ── */}
          <View style={S.heroBottom}>
            <View style={S.heroDestInfo}>
              <Text style={S.heroVibe}>{currentDest.vibe}</Text>
              <View style={S.heroCityRow}>
                <Text style={S.heroCity}>{currentDest.city}</Text>
                <Text style={S.heroFlag}>{currentDest.emoji}</Text>
              </View>
            </View>

            {/* Dots + Explore button */}
            <View style={S.heroActions}>
              <View style={S.heroDots}>
                {HERO_DESTINATIONS.map((_, i) => (
                  <View key={i} style={[S.heroDot, i === heroIndex && S.heroDotActive]} />
                ))}
              </View>
              <TouchableOpacity
                style={S.exploreBtn}
                onPress={() => router.push("/(tabs)/explore" as never)}
                activeOpacity={0.85}
              >
                <Text style={S.exploreBtnText}>Explore</Text>
                <IconSymbol name="arrow.right" size={13} color={B.purpleDark} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ══════════════════════════════════════════════════════
            CONTENT — Dark purple background
        ══════════════════════════════════════════════════════ */}
        <View style={S.content}>

          {/* ── Active / Upcoming trip banner ── */}
          {activeTrip && (
            <TouchableOpacity
              style={S.liveBanner}
              onPress={() => router.push("/(live)/home" as never)}
              activeOpacity={0.88}
            >
              <View style={S.liveDot} />
              <View style={{ flex: 1 }}>
                <Text style={S.liveBannerLabel}>LIVE TRIP</Text>
                <Text style={S.liveBannerDest}>{activeTrip.destination}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={B.cyan} />
            </TouchableOpacity>
          )}

          {!activeTrip && state.trips.filter(t => t.status === "upcoming").length > 0 && (() => {
            const upcoming = state.trips
              .filter(t => t.status === "upcoming")
              .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
            const daysLeft = Math.ceil((new Date(upcoming.startDate).getTime() - Date.now()) / 86400000);
            return (
              <TouchableOpacity
                style={S.upcomingBanner}
                onPress={() => router.push("/(tabs)/trip-hub" as never)}
                activeOpacity={0.88}
              >
                <View style={S.upcomingCountdown}>
                  <Text style={S.upcomingDays}>{daysLeft}</Text>
                  <Text style={S.upcomingDaysLabel}>days</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={S.upcomingLabel}>NEXT TRIP</Text>
                  <Text style={S.upcomingDest}>{upcoming.destination}</Text>
                  {upcomingWeather && (
                    <Text style={S.upcomingWeather}>{upcomingWeather.temp}° · {upcomingWeather.condition}</Text>
                  )}
                </View>
                <IconSymbol name="chevron.right" size={16} color={B.dim} />
              </TouchableOpacity>
            );
          })()}

          {/* ── Big pink CTA ── */}
          <TouchableOpacity
            style={S.planBtn}
            onPress={() => router.push("/(trip)/plan" as never)}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={[B.pink, B.pinkDark]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={S.planBtnLeft}>
              <View style={S.planBtnIcon}>
                <IconSymbol name="airplane" size={20} color={B.pink} />
              </View>
              <View>
                <Text style={S.planBtnTitle}>Plan a Trip</Text>
                <Text style={S.planBtnSub}>Free to plan · Pay when you book</Text>
              </View>
            </View>
            <View style={S.planBtnArrow}>
              <IconSymbol name="arrow.right" size={18} color={B.white} />
            </View>
          </TouchableOpacity>



          {/* ── Where's your head at ── */}
          <View style={S.section}>
            <Text style={S.sectionTitle}>Where's your head at?</Text>
            <Text style={S.sectionSub}>Tell us your vibe, we'll handle the rest.</Text>
            <View style={S.startGrid}>
              {START_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={S.startCard}
                  onPress={() => handleStart(opt.id)}
                  activeOpacity={0.85}
                >
                  <View style={[S.startIconWrap, { backgroundColor: opt.bg }]}>
                    <IconSymbol name={opt.icon} size={22} color={opt.color} />
                  </View>
                  <Text style={S.startCardLabel}>{opt.label}</Text>
                  <Text style={S.startCardSub}>{opt.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ── Travel DNA ── */}
          <TouchableOpacity
            style={S.dnaCard}
            onPress={() => router.push("/(dna)/quick-swipe" as never)}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={[B.purpleMid, B.purple]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            {/* Duck mascot — appears here because it's playful & relevant */}
            <Image
              source={require("@/assets/images/mascot-dark.png")}
              style={S.dnaMascot}
              resizeMode="contain"
            />
            <View style={S.dnaContent}>
              <View style={S.dnaBadge}>
                <Text style={S.dnaBadgeText}>2 MIN · FREE</Text>
              </View>
              <Text style={S.dnaTitle}>
                {hasQuiz ? `Your DNA: ${dnaType}` : "Discover Your\nTravel DNA"}
              </Text>
              <Text style={S.dnaSub}>
                {hasQuiz ? "View your full traveler profile →" : "Swipe to reveal your traveler type →"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* ── DNA tips (if quiz done) ── */}
          {hasQuiz && (
            <View style={S.section}>
              <Text style={S.sectionTitle}>Made for you today</Text>
              <Text style={S.sectionSub}>Based on your {dnaType} profile</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 4 }}>
                {[
                  { icon: "sun.max.fill" as const, tip: "Book beach activities early — best spots sell out 3 days ahead", color: B.orange },
                  { icon: "fork.knife"   as const, tip: "Try the local market for lunch — 3× better value",              color: B.green },
                  { icon: "map.fill"     as const, tip: "Your pace = 4–5 stops/day. Don't over-schedule Day 1",          color: B.purple },
                ].map((tip, i) => (
                  <View key={i} style={[S.tipCard, { borderColor: tip.color + "40" }]}>
                    <View style={[S.tipIcon, { backgroundColor: tip.color + "18" }]}>
                      <IconSymbol name={tip.icon} size={18} color={tip.color} />
                    </View>
                    <Text style={S.tipText} numberOfLines={4}>{tip.tip}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* ── How TRAVI works ── */}
          <View style={S.section}>
            <Text style={S.sectionTitle}>How it works</Text>
            <Text style={S.sectionSub}>The travel friend you never had.</Text>
            {[
              { icon: "sparkles"             as const, color: B.purple, title: "Your Travel DNA",      desc: "Answer 7 questions. TRAVI learns your travel personality forever." },
              { icon: "airplane"             as const, color: B.pink,   title: "AI plans everything",  desc: "Flights, hotels, experiences — curated for you, not the masses." },
              { icon: "dollarsign.circle.fill" as const, color: B.orange, title: "Cashback, not fees", desc: "The 10–15% that used to go to agents? It comes back to you." },
            ].map((step, i) => (
              <View key={i} style={S.howRow}>
                <View style={[S.howIcon, { backgroundColor: step.color + "18" }]}>
                  <IconSymbol name={step.icon} size={20} color={step.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={S.howTitle}>{step.title}</Text>
                  <Text style={S.howDesc}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* ── Cashback manifesto ── */}
          <View style={S.manifestoCard}>
            <LinearGradient
              colors={[B.purpleMid, B.purple]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
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
      </ScrollView>

      {/* ── AI Agent FAB ── */}
      <TouchableOpacity
        style={[S.fab, { bottom: tabBarOffset + 12 }]}
        onPress={() => {
          if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push("/(agent)/chat" as never);
        }}
        activeOpacity={0.88}
      >
        <LinearGradient
          colors={[B.pink, B.pinkDark]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <IconSymbol name="bubble.left.fill" size={17} color={B.white} />
        <Text style={S.fabLabel}>Agent</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: B.purpleDark },

  // ── Hero ──
  heroWrap: {
    overflow: "hidden",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  logoImg: {
    width: 80,
    height: 28,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  walletPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  walletPillText: {
    color: B.white,
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
  },
  notifBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroGreetingWrap: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  heroGreeting: {
    color: B.offWhite,
    fontSize: 17,
    fontWeight: "600",
    fontFamily: "Satoshi-Medium",
  },
  heroBottom: {
    paddingHorizontal: 20,
    paddingBottom: 22,
    gap: 10,
  },
  heroDestInfo: {
    gap: 4,
  },
  heroVibe: {
    color: B.dim,
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
    letterSpacing: 0.3,
  },
  heroCityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heroCity: {
    color: B.white,
    fontSize: 36,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
    letterSpacing: -1,
  },
  heroFlag: {
    fontSize: 24,
  },
  heroActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroDots: {
    flexDirection: "row",
    gap: 6,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: B.dimmer,
  },
  heroDotActive: {
    width: 18,
    backgroundColor: B.white,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: B.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  exploreBtnText: {
    color: B.purpleDark,
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
  },

  // ── Content ──
  content: {
    backgroundColor: B.purpleDark,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },

  // ── Live / Upcoming banners ──
  liveBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(1,190,255,0.12)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(1,190,255,0.30)",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: B.cyan,
  },
  liveBannerLabel: {
    color: B.cyan,
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
    letterSpacing: 1.2,
  },
  liveBannerDest: {
    color: B.white,
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Chillax-Bold",
  },
  upcomingBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: B.purpleMid,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.35)",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  upcomingCountdown: {
    alignItems: "center",
    minWidth: 40,
  },
  upcomingDays: {
    color: B.white,
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
    lineHeight: 26,
  },
  upcomingDaysLabel: {
    color: B.dim,
    fontSize: 10,
    fontFamily: "Satoshi-Medium",
  },
  upcomingLabel: {
    color: B.purple,
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
    letterSpacing: 1.2,
  },
  upcomingDest: {
    color: B.white,
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Chillax-Bold",
  },
  upcomingWeather: {
    color: B.dim,
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    marginTop: 2,
  },

  // ── Plan a Trip CTA ──
  planBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    overflow: "hidden",
  },
  planBtnLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  planBtnIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: B.white,
    alignItems: "center",
    justifyContent: "center",
  },
  planBtnTitle: {
    color: B.white,
    fontSize: 17,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
  },
  planBtnSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    marginTop: 2,
  },
  planBtnArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Join card ──
  joinCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: B.white,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  joinTitle: {
    color: B.purpleDark,
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Chillax-Bold",
  },
  joinSub: {
    color: "#7B6B8D",
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    marginTop: 2,
  },
  joinArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(100,67,244,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Section ──
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: B.white,
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
    letterSpacing: -0.3,
  },
  sectionSub: {
    color: B.dim,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: -8,
  },

  // ── Start options grid ──
  startGrid: {
    flexDirection: "row",
    gap: 10,
  },
  startCard: {
    flex: 1,
    backgroundColor: B.purpleMid,
    borderRadius: 16,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.30)",
  },
  startIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  startCardLabel: {
    color: B.white,
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
    lineHeight: 17,
  },
  startCardSub: {
    color: B.dim,
    fontSize: 11,
    fontFamily: "Satoshi-Regular",
    lineHeight: 15,
  },

  // ── Travel DNA card (duck mascot here!) ──
  dnaCard: {
    borderRadius: 20,
    overflow: "hidden",
    paddingLeft: 20,
    paddingRight: 130,
    paddingVertical: 22,
    minHeight: 130,
    justifyContent: "center",
  },
  dnaMascot: {
    position: "absolute",
    right: -10,
    bottom: -5,
    width: 130,
    height: 130,
  },
  dnaContent: {
    gap: 8,
  },
  dnaBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(249,68,152,0.25)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dnaBadgeText: {
    color: B.pink,
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
    letterSpacing: 0.8,
  },
  dnaTitle: {
    color: B.white,
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  dnaSub: {
    color: B.dim,
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
  },

  // ── Tips ──
  tipCard: {
    width: width * 0.62,
    backgroundColor: B.purpleMid,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tipText: {
    color: B.offWhite,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    lineHeight: 19,
    flexShrink: 1,
    flexWrap: "wrap",
  },

  // ── How it works ──
  howRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  howIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  howTitle: {
    color: B.white,
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
    marginBottom: 3,
  },
  howDesc: {
    color: B.dim,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    lineHeight: 18,
  },

  // ── Manifesto ──
  manifestoCard: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 22,
    gap: 14,
  },
  manifestoTitle: {
    color: B.white,
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
    letterSpacing: -0.3,
  },
  manifestoBody: {
    color: B.dim,
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    lineHeight: 20,
  },
  manifestoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  manifestoCol: {
    flex: 1,
    gap: 6,
  },
  manifestoColLabel: {
    color: B.dimmer,
    fontSize: 11,
    fontFamily: "Satoshi-Medium",
    letterSpacing: 0.5,
  },
  manifestoPill: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: "center",
  },
  manifestoPillText: {
    color: B.white,
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
  },
  manifestoVs: {
    color: B.dimmer,
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
  },

  // ── FAB ──
  fab: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 30,
    overflow: "hidden",
    elevation: 8,
    shadowColor: B.pink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
  },
  fabLabel: {
    color: B.white,
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
  },
});
