// Screen 11 — Home Dashboard — DESIGNED (Premium)
// Route: /(tabs) (index) | Mode: Discovery
// Uses: Chillax/Satoshi fonts, mascot, logotype, Unsplash destination photos, IconSymbol icons

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
  bgCard: "rgba(36,16,62,0.6)",
  borderCard: "rgba(123,68,230,0.25)",
  purple: "#6443F4",
  pink: "#F94498",
  orange: "#FF9327",
  yellow: "#FDCD0A",
  textPrimary: "#FFFFFF",
  textSecondary: "#D3CFD8",
  textTertiary: "#A79FB2",
  success: "#34D399",
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
  { id: "1", key: "bali", city: "Bali", country: "Indonesia", match: 96, price: "€850", days: "7-10", tagline: "Temples & tropical paradise" },
  { id: "2", key: "santorini", city: "Santorini", country: "Greece", match: 91, price: "€1,200", days: "5-7", tagline: "Blue domes & sunsets" },
  { id: "3", key: "kyoto", city: "Kyoto", country: "Japan", match: 88, price: "€950", days: "7-10", tagline: "Cherry blossoms & tradition" },
  { id: "4", key: "paris", city: "Paris", country: "France", match: 85, price: "€780", days: "4-6", tagline: "Romance & culture" },
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

export default function HomeScreen() {
  const router = useRouter();
  const mascotBob = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Mascot gentle bob
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotBob, { toValue: -4, duration: 1500, useNativeDriver: true }),
        Animated.timing(mascotBob, { toValue: 4, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 0.6, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ─── Header ─── */}
        <LinearGradient
          colors={["#2D1B69", "#1A0B2E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={s.header}
        >
          {/* Logotype */}
          <Image
            source={require("@/assets/images/logotype-dark.webp")}
            style={s.logotype}
            resizeMode="contain"
          />
          {/* Profile avatar */}
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

        {/* ─── Quick Actions ─── */}
        <View style={s.section}>
          {/* Plan Trip — hero CTA */}
          <Pressable
            onPress={() => { haptic(); router.push("/(tabs)/plan-trip" as any); }}
            style={({ pressed }) => [s.planTripCard, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          >
            <LinearGradient
              colors={[C.purple, C.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.planTripGrad}
            >
              <View style={s.planTripIconWrap}>
                <IconSymbol name="airplane" size={28} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.planTripTitle}>Plan a Trip</Text>
                <Text style={s.planTripSub}>AI-powered itinerary in minutes</Text>
              </View>
              <IconSymbol name="chevron.right" size={22} color="rgba(255,255,255,0.5)" />
            </LinearGradient>
          </Pressable>

          {/* Quick cards row */}
          <View style={s.quickRow}>
            <Pressable
              onPress={() => { haptic(); router.push("/(points)/wallet" as any); }}
              style={({ pressed }) => [s.quickCard, pressed && { opacity: 0.8 }]}
            >
              <View style={s.quickIconCircle}>
                <IconSymbol name="dollarsign.circle.fill" size={22} color={C.yellow} />
              </View>
              <Text style={s.quickLabel}>Cashback</Text>
              <Text style={s.quickValue}>€45.20</Text>
            </Pressable>
            <Pressable
              onPress={() => { haptic(); router.push("/(tabs)/explore" as any); }}
              style={({ pressed }) => [s.quickCard, pressed && { opacity: 0.8 }]}
            >
              <View style={s.quickIconCircle}>
                <IconSymbol name="safari.fill" size={22} color={C.purple} />
              </View>
              <Text style={s.quickLabel}>Explore</Text>
              <Text style={s.quickValue}>12 new</Text>
            </Pressable>
          </View>
        </View>

        {/* ─── DNA Banner ─── */}
        <View style={s.section}>
          <Pressable
            onPress={() => { haptic(); router.push("/(dna)/profile" as any); }}
            style={({ pressed }) => [pressed && { opacity: 0.85 }]}
          >
            <LinearGradient
              colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.15)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.dnaBannerGrad}
            >
              <View style={s.dnaIconWrap}>
                <IconSymbol name="waveform" size={24} color={C.purple} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.dnaTitle}>Complete Your DNA</Text>
                <Text style={s.dnaSub}>Get personalized recommendations</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={C.textTertiary} />
            </LinearGradient>
          </Pressable>
        </View>

        {/* ─── Live Trip Banner ─── */}
        <View style={s.section}>
          <Pressable
            onPress={() => { haptic(); router.push("/(live)/home" as any); }}
            style={({ pressed }) => [s.liveBanner, pressed && { opacity: 0.85 }]}
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
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => { haptic(); router.push({ pathname: "/(tabs)/destination-guide", params: { id: item.key } } as any); }}
                style={({ pressed }) => [s.destCard, pressed && { opacity: 0.92, transform: [{ scale: 0.98 }] }]}
              >
                {/* Photo */}
                <View style={s.destImageWrap}>
                  <ExpoImage
                    source={DEST_IMAGES[item.key]}
                    style={s.destImage}
                    contentFit="cover"
                    transition={300}
                  />
                  {/* Gradient overlay */}
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.6)"]}
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
                  {/* City name on image */}
                  <View style={s.destNameOnImage}>
                    <Text style={s.destCityOnImage}>{item.city}</Text>
                    <Text style={s.destCountryOnImage}>{item.country}</Text>
                  </View>
                </View>
                {/* Info */}
                <View style={s.destInfo}>
                  <Text style={s.destTagline}>{item.tagline}</Text>
                  <View style={s.destMeta}>
                    <View style={s.destMetaItem}>
                      <IconSymbol name="tag.fill" size={13} color={C.textTertiary} />
                      <Text style={s.destPrice}>From {item.price}</Text>
                    </View>
                    <View style={s.destMetaItem}>
                      <IconSymbol name="calendar" size={13} color={C.textTertiary} />
                      <Text style={s.destPrice}>{item.days} days</Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => { haptic(); router.push("/(tabs)/plan-trip" as any); }}
                    style={({ pressed }) => [s.destBtn, pressed && { opacity: 0.8 }]}
                  >
                    <LinearGradient
                      colors={[C.purple, C.pink]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={s.destBtnGrad}
                    >
                      <IconSymbol name="airplane" size={14} color="#FFFFFF" />
                      <Text style={s.destBtnText}>Plan Trip</Text>
                    </LinearGradient>
                  </Pressable>
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
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => { haptic(); router.push({ pathname: "/(tabs)/destination-guide", params: { id: item.key } } as any); }}
                style={({ pressed }) => [s.trendCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
              >
                <ExpoImage
                  source={DEST_IMAGES[item.key]}
                  style={s.trendImage}
                  contentFit="cover"
                  transition={300}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.7)"]}
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
        <View style={s.section}>
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
    paddingBottom: 4,
  },
  greetingTextWrap: {
    flex: 1,
  },
  greetingText: {
    color: C.textPrimary,
    fontSize: 22,
    fontFamily: "Chillax-Bold",
  },
  dnaTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    backgroundColor: "rgba(100,67,244,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    width: 64,
    height: 64,
  },

  // ─── Sections ───
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionNoHPad: { marginTop: 24 },
  sectionTitle: {
    color: C.textPrimary,
    fontSize: 18,
    fontFamily: "Chillax-Semibold",
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },

  // ─── Plan Trip CTA ───
  planTripCard: {
    height: 100,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  planTripGrad: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 16,
    borderRadius: 20,
  },
  planTripIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  planTripTitle: {
    color: C.textPrimary,
    fontSize: 18,
    fontFamily: "Chillax-Bold",
  },
  planTripSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: 2,
  },

  // ─── Quick Cards ───
  quickRow: { flexDirection: "row", gap: 12 },
  quickCard: {
    flex: 1,
    height: 110,
    borderRadius: 16,
    backgroundColor: C.bgCard,
    borderWidth: 1,
    borderColor: C.borderCard,
    padding: 16,
    justifyContent: "space-between",
  },
  quickIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(100,67,244,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickLabel: {
    color: C.textTertiary,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
  },
  quickValue: {
    color: C.textPrimary,
    fontSize: 18,
    fontFamily: "Chillax-Bold",
  },

  // ─── DNA Banner ───
  dnaBannerGrad: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.borderCard,
  },
  dnaIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(100,67,244,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  dnaTitle: {
    color: C.textPrimary,
    fontSize: 15,
    fontFamily: "Satoshi-Bold",
  },
  dnaSub: {
    color: C.textTertiary,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: 2,
  },

  // ─── Live Trip Banner ───
  liveBanner: {
    height: 72,
    borderRadius: 16,
    backgroundColor: C.bgCard,
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.3)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  liveDotOuter: {
    position: "absolute",
    left: 16,
    width: 20,
    height: 20,
    borderRadius: 10,
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
    fontSize: 16,
    fontFamily: "Chillax-Semibold",
  },

  // ─── Destination Cards ───
  destCard: {
    width: 280,
    borderRadius: 20,
    backgroundColor: C.bgCard,
    borderWidth: 1,
    borderColor: C.borderCard,
    overflow: "hidden",
  },
  destImageWrap: {
    height: 200,
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
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  matchText: {
    color: C.textPrimary,
    fontSize: 11,
    fontFamily: "Satoshi-Bold",
  },
  destNameOnImage: {
    position: "absolute",
    bottom: 14,
    left: 14,
  },
  destCityOnImage: {
    color: C.textPrimary,
    fontSize: 22,
    fontFamily: "Chillax-Bold",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  destCountryOnImage: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  destInfo: {
    padding: 16,
  },
  destTagline: {
    color: C.textSecondary,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginBottom: 10,
  },
  destMeta: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
  },
  destMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  destPrice: {
    color: C.textTertiary,
    fontSize: 12,
    fontFamily: "Satoshi-Medium",
  },
  destBtn: {
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  destBtnGrad: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    borderRadius: 20,
  },
  destBtnText: {
    color: C.textPrimary,
    fontSize: 14,
    fontFamily: "Satoshi-Bold",
  },

  // ─── Trending Cards ───
  trendCard: {
    width: 180,
    height: 240,
    borderRadius: 16,
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
    fontSize: 18,
    fontFamily: "Chillax-Bold",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  trendPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  trendPrice: {
    color: "rgba(255,255,255,0.85)",
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
    backgroundColor: C.bgCard,
    borderWidth: 1,
    borderColor: C.borderCard,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  tipMascot: {
    width: 50,
    height: 50,
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
    lineHeight: 18,
  },
});
