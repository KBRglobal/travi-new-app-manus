// Screen 11 — Home Dashboard — DESIGNED (Premium v2)
// Route: /(tabs) (index) | Mode: Discovery
// Fixes: Hero Plan Trip, card contrast, taller Recommended, Chillax fonts, 24px spacing

import { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image as ExpoImage } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

const { width: W } = Dimensions.get("window");

const C = {
  bgBase: "#1A0B2E",
  bgDeep: "#0D0221",
  bgSurface: "#24103E",
  bgCard: "rgba(36,16,62,0.7)",
  bgCardBright: "rgba(50,24,80,0.85)",
  borderCard: "rgba(123,68,230,0.35)",
  borderBright: "rgba(140,90,255,0.5)",
  purple: "#6443F4",
  pink: "#F94498",
  orange: "#FF9327",
  yellow: "#FDCD0A",
  textPrimary: "#FFFFFF",
  textSecondary: "#D3CFD8",
  textTertiary: "#A79FB2",
  success: "#34D399",
  glassBg: "rgba(100,67,244,0.08)",
  glassBorder: "rgba(100,67,244,0.35)",
};

// Destination images (local Unsplash assets)
const DEST_IMAGES: Record<string, any> = {
  bali: require("@/assets/destinations/bali.jpg"),
  santorini: require("@/assets/destinations/santorini.jpg"),
  kyoto: require("@/assets/destinations/kyoto.jpg"),
  paris: require("@/assets/destinations/paris.jpg"),
  dubai: require("@/assets/destinations/dubai.jpg"),
  tokyo: require("@/assets/destinations/tokyo.jpg"),
  barcelona: require("@/assets/destinations/barcelona.jpg"),
};

const DESTINATIONS = [
  { id: "1", key: "bali", city: "Bali", country: "Indonesia", match: 96, price: "€850", days: "7-10" },
  { id: "2", key: "santorini", city: "Santorini", country: "Greece", match: 91, price: "€1,200", days: "5-7" },
  { id: "3", key: "kyoto", city: "Kyoto", country: "Japan", match: 88, price: "€950", days: "7-10" },
  { id: "4", key: "paris", city: "Paris", country: "France", match: 85, price: "€780", days: "4-6" },
];

const TRENDING = [
  { id: "t1", key: "dubai", city: "Dubai", country: "UAE", price: "€650" },
  { id: "t2", key: "tokyo", city: "Tokyo", country: "Japan", price: "€1,100" },
  { id: "t3", key: "barcelona", city: "Barcelona", country: "Spain", price: "€720" },
];

function haptic() {
  if (Platform.OS !== "web") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

// Card width: show ~1.3 cards so user sees the peek of next card
const DEST_CARD_W = W * 0.72;
const TREND_CARD_W = W * 0.42;

export default function HomeScreen() {
  const router = useRouter();
  const mascotBob = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotBob, { toValue: -4, duration: 1500, useNativeDriver: true }),
        Animated.timing(mascotBob, { toValue: 4, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 0.6, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* ─── Header ─── */}
        <LinearGradient
          colors={["#2D1B69", "#1A0B2E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={s.header}
        >
          <Image
            source={require("@/assets/images/logotype-dark.webp")}
            style={s.logotype}
            resizeMode="contain"
          />
          <Pressable
            onPress={() => { haptic(); router.push("/(settings)/profile" as any); }}
            style={({ pressed }) => [s.avatar, pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] }]}
          >
            <Text style={s.avatarText}>D</Text>
          </Pressable>
        </LinearGradient>

        {/* ─── Greeting with Mascot ─── */}
        <View style={s.greetingRow}>
          <View style={s.greetingTextWrap}>
            <Text style={s.greetingText}>Good morning, David</Text>
            <View style={s.dnaTag}>
              <IconSymbol name="sparkles" size={14} color={C.yellow} />
              <Text style={s.dnaTagText}>Explorer DNA</Text>
            </View>
          </View>
          <Animated.View style={{ transform: [{ translateY: mascotBob }] }}>
            <Image
              source={require("@/assets/images/mascot-dark.png")}
              style={s.mascotSmall}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* ─── Plan a Trip — HERO CARD ─── */}
        <View style={s.sectionSpaced}>
          <Pressable
            onPress={() => { haptic(); router.push("/(tabs)/plan-trip" as any); }}
            style={({ pressed }) => [s.planTripCard, pressed && { opacity: 0.92, transform: [{ scale: 0.98 }] }]}
          >
            <LinearGradient
              colors={[C.purple, "#8B5CF6", C.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.planTripGrad}
            >
              {/* Decorative glow circle */}
              <View style={s.planGlowCircle} />

              <View style={s.planTripIconWrap}>
                <IconSymbol name="airplane" size={32} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.planTripTitle}>Plan a Trip</Text>
                <Text style={s.planTripSub}>AI-powered itinerary in minutes</Text>
              </View>
              <View style={s.planArrowWrap}>
                <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        {/* ─── Quick Cards Row (Cashback + Explore) ─── */}
        <View style={s.sectionSpaced}>
          <View style={s.quickRow}>
            <Pressable
              onPress={() => { haptic(); router.push("/(points)/wallet" as any); }}
              style={({ pressed }) => [s.quickCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
            >
              <View style={s.quickIconCircle}>
                <IconSymbol name="dollarsign.circle.fill" size={24} color={C.yellow} />
              </View>
              <Text style={s.quickLabel}>Cashback</Text>
              <Text style={s.quickValue}>€45.20</Text>
            </Pressable>
            <Pressable
              onPress={() => { haptic(); router.push("/(tabs)/explore" as any); }}
              style={({ pressed }) => [s.quickCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
            >
              <View style={[s.quickIconCircle, { backgroundColor: "rgba(100,67,244,0.18)" }]}>
                <IconSymbol name="safari.fill" size={24} color={C.purple} />
              </View>
              <Text style={s.quickLabel}>Explore</Text>
              <Text style={s.quickValue}>12 new</Text>
            </Pressable>
          </View>
        </View>

        {/* ─── Complete Your DNA — Glass Card ─── */}
        <View style={s.sectionSpaced}>
          <Pressable
            onPress={() => { haptic(); router.push("/(dna)/profile" as any); }}
            style={({ pressed }) => [pressed && { opacity: 0.88 }]}
          >
            <View style={s.dnaGlassCard}>
              <View style={s.dnaIconWrap}>
                <IconSymbol name="waveform" size={24} color={C.purple} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.dnaTitle}>Complete Your DNA</Text>
                <Text style={s.dnaSub}>Get personalized recommendations</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={C.textTertiary} />
            </View>
          </Pressable>
        </View>

        {/* ─── Live Trip Banner ─── */}
        <View style={s.sectionSpaced}>
          <Pressable
            onPress={() => { haptic(); router.push("/(live)/home" as any); }}
            style={({ pressed }) => [s.liveBanner, pressed && { opacity: 0.88 }]}
          >
            <Animated.View style={[s.liveDotOuter, { opacity: glowPulse }]} />
            <View style={s.liveDot} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={s.liveLabel}>LIVE TRIP</Text>
              <Text style={s.liveDest}>Bali, Indonesia</Text>
            </View>
            <IconSymbol name="chevron.right" size={18} color={C.textTertiary} />
          </Pressable>
        </View>

        {/* ─── Recommended Destinations ─── */}
        <View style={s.sectionNoHPad}>
          <Text style={[s.sectionTitle, { paddingHorizontal: 20 }]}>Recommended for You</Text>
          <FlatList
            data={DESTINATIONS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
            snapToInterval={DEST_CARD_W + 16}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => { haptic(); router.push({ pathname: "/(tabs)/destination-guide", params: { id: item.key } } as any); }}
                style={({ pressed }) => [s.destCard, pressed && { opacity: 0.93, transform: [{ scale: 0.98 }] }]}
              >
                {/* Photo — tall and dramatic */}
                <View style={s.destImageWrap}>
                  <ExpoImage
                    source={DEST_IMAGES[item.key]}
                    style={s.destImage}
                    contentFit="cover"
                    transition={300}
                  />
                  {/* Strong gradient overlay from bottom */}
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.75)"]}
                    locations={[0.3, 0.55, 1]}
                    style={s.destOverlay}
                  />
                  {/* Match badge */}
                  <LinearGradient
                    colors={[C.purple, C.pink]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={s.matchBadge}
                  >
                    <IconSymbol name="sparkles" size={11} color="#FFFFFF" />
                    <Text style={s.matchText}>{item.match}% Match</Text>
                  </LinearGradient>
                  {/* City name on image — bigger font */}
                  <View style={s.destNameOnImage}>
                    <Text style={s.destCityOnImage}>{item.city}</Text>
                    <Text style={s.destCountryOnImage}>{item.country}</Text>
                  </View>
                </View>
                {/* Info strip */}
                <View style={s.destInfo}>
                  <View style={s.destMeta}>
                    <View style={s.destMetaItem}>
                      <IconSymbol name="tag.fill" size={13} color={C.yellow} />
                      <Text style={s.destPrice}>From {item.price}</Text>
                    </View>
                    <View style={s.destMetaItem}>
                      <IconSymbol name="calendar" size={13} color={C.textTertiary} />
                      <Text style={s.destPrice}>{item.days} days</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* ─── Trending Now ─── */}
        <View style={s.sectionNoHPad}>
          <View style={[s.sectionTitleRow, { paddingHorizontal: 20 }]}>
            <Text style={s.sectionTitle}>Trending Now</Text>
            <IconSymbol name="flame.fill" size={18} color={C.orange} />
          </View>
          <FlatList
            data={TRENDING}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            snapToInterval={TREND_CARD_W + 14}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => { haptic(); router.push({ pathname: "/(tabs)/destination-guide", params: { id: item.key } } as any); }}
                style={({ pressed }) => [s.trendCard, pressed && { opacity: 0.88, transform: [{ scale: 0.97 }] }]}
              >
                <ExpoImage
                  source={DEST_IMAGES[item.key]}
                  style={s.trendImage}
                  contentFit="cover"
                  transition={300}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.75)"]}
                  locations={[0.4, 1]}
                  style={s.trendOverlay}
                />
                <View style={s.trendContent}>
                  <Text style={s.trendCity}>{item.city}</Text>
                  <View style={s.trendPriceRow}>
                    <IconSymbol name="tag.fill" size={12} color={C.yellow} />
                    <Text style={s.trendPrice}>From {item.price}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* ─── TRAVI Tip ─── */}
        <View style={s.sectionSpaced}>
          <View style={s.tipCard}>
            <Image
              source={require("@/assets/images/mascot-dark.png")}
              style={s.tipMascot}
              resizeMode="contain"
            />
            <View style={s.tipContent}>
              <Text style={s.tipTitle}>TRAVI Tip</Text>
              <Text style={s.tipText}>
                Complete your Travel DNA quiz to unlock personalized destination matches and exclusive deals!
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bgBase },

  // ─── Header ───
  header: {
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  logotype: {
    width: 100,
    height: 36,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.bgSurface,
    borderWidth: 1.5,
    borderColor: C.purple,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: C.textPrimary,
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
  },

  // ─── Greeting ───
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greetingTextWrap: {
    flex: 1,
  },
  greetingText: {
    color: C.textPrimary,
    fontSize: 24,
    fontFamily: "Chillax-Bold",
    lineHeight: 30,
  },
  dnaTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    backgroundColor: "rgba(100,67,244,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  dnaTagText: {
    color: C.yellow,
    fontSize: 12,
    fontFamily: "Satoshi-Medium",
    letterSpacing: 0.5,
  },
  mascotSmall: {
    width: 68,
    height: 68,
  },

  // ─── Sections ───
  sectionSpaced: { paddingHorizontal: 20, marginTop: 24 },
  sectionNoHPad: { marginTop: 28 },
  sectionTitle: {
    color: C.textPrimary,
    fontSize: 19,
    fontFamily: "Chillax-Semibold",
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },

  // ─── Plan Trip — HERO CTA (160px+) ───
  planTripCard: {
    height: 160,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 12,
  },
  planTripGrad: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 18,
    borderRadius: 24,
    position: "relative",
    overflow: "hidden",
  },
  planGlowCircle: {
    position: "absolute",
    right: -30,
    top: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  planTripIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  planTripTitle: {
    color: C.textPrimary,
    fontSize: 24,
    fontFamily: "Chillax-Bold",
    lineHeight: 30,
  },
  planTripSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    marginTop: 4,
  },
  planArrowWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  // ─── Quick Cards (brighter contrast) ───
  quickRow: { flexDirection: "row", gap: 14 },
  quickCard: {
    flex: 1,
    height: 120,
    borderRadius: 18,
    backgroundColor: C.bgCardBright,
    borderWidth: 1.5,
    borderColor: C.borderBright,
    padding: 16,
    justifyContent: "space-between",
  },
  quickIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(253,205,10,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickLabel: {
    color: C.textSecondary,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
  },
  quickValue: {
    color: C.textPrimary,
    fontSize: 20,
    fontFamily: "Chillax-Bold",
  },

  // ─── DNA Glass Card ───
  dnaGlassCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 14,
    borderRadius: 18,
    backgroundColor: C.glassBg,
    borderWidth: 1.5,
    borderColor: C.glassBorder,
  },
  dnaIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(100,67,244,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  dnaTitle: {
    color: C.textPrimary,
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
  },
  dnaSub: {
    color: C.textTertiary,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: 3,
  },

  // ─── Live Trip Banner ───
  liveBanner: {
    height: 76,
    borderRadius: 18,
    backgroundColor: C.bgCard,
    borderWidth: 1.5,
    borderColor: "rgba(52,211,153,0.35)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  liveDotOuter: {
    position: "absolute",
    left: 18,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: C.success,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.success,
  },
  liveLabel: {
    color: C.success,
    fontSize: 11,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 1,
  },
  liveDest: {
    color: C.textPrimary,
    fontSize: 17,
    fontFamily: "Chillax-Semibold",
    marginTop: 2,
  },

  // ─── Destination Cards (taller, dramatic) ───
  destCard: {
    width: DEST_CARD_W,
    borderRadius: 22,
    backgroundColor: C.bgCard,
    borderWidth: 1,
    borderColor: C.borderCard,
    overflow: "hidden",
  },
  destImageWrap: {
    height: 240,
    overflow: "hidden",
  },
  destImage: {
    width: "100%",
    height: "100%",
  },
  destOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  matchBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 14,
  },
  matchText: {
    color: C.textPrimary,
    fontSize: 12,
    fontFamily: "Satoshi-Bold",
  },
  destNameOnImage: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  destCityOnImage: {
    color: C.textPrimary,
    fontSize: 28,
    fontFamily: "Chillax-Bold",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    lineHeight: 34,
  },
  destCountryOnImage: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    marginTop: 2,
  },
  destInfo: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  destMeta: {
    flexDirection: "row",
    gap: 20,
  },
  destMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  destPrice: {
    color: C.textSecondary,
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
  },

  // ─── Trending Cards ───
  trendCard: {
    width: TREND_CARD_W,
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
  },
  trendImage: {
    width: "100%",
    height: "100%",
  },
  trendOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  trendContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
  },
  trendCity: {
    color: C.textPrimary,
    fontSize: 20,
    fontFamily: "Chillax-Bold",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  trendPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  trendPrice: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ─── TRAVI Tip ───
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.bgCardBright,
    borderWidth: 1.5,
    borderColor: C.borderBright,
    borderRadius: 18,
    padding: 18,
    gap: 14,
  },
  tipMascot: {
    width: 52,
    height: 52,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    color: C.yellow,
    fontSize: 13,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  tipText: {
    color: C.textSecondary,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    lineHeight: 19,
  },
});
