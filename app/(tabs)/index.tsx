// Screen 11 — Home Dashboard — Figma Prompt v3
// Route: /(tabs) (index) | Mode: Discovery
// Cinematic, premium, dark-first — inspired by high-end fintech + travel apps

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
import { PlanTripVariantSelector } from "@/components/plan-trip-variants";
import * as Haptics from "expo-haptics";

const { width: W } = Dimensions.get("window");

// ─── Figma Palette ───
const C = {
  bg: "#0D0221",
  cardBg: "#16092C",
  dnaBg: "#1A0A30",
  liveBg: "#0D1F18",
  tabBg: "#120824",
  purple: "#6443F4",
  pink: "#F94498",
  green: "#00C96B",
  gold: "#FDCD0A",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.6)",
  mutedLight: "rgba(255,255,255,0.45)",
  border: "rgba(123,68,230,0.25)",
  borderLight: "rgba(123,68,230,0.2)",
  frosted: "rgba(255,255,255,0.12)",
};

// ─── Destination images ───
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
  { id: "1", key: "bali", city: "Bali", country: "Indonesia", match: 96 },
  { id: "2", key: "santorini", city: "Santorini", country: "Greece", match: 91 },
  { id: "3", key: "kyoto", city: "Kyoto", country: "Japan", match: 88 },
  { id: "4", key: "paris", city: "Paris", country: "France", match: 85 },
];

function haptic() {
  if (Platform.OS !== "web") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

const CARD_W = 220;
const CARD_H = 280;

export default function HomeScreen() {
  const router = useRouter();
  const mascotBob = useRef(new Animated.Value(0)).current;
  const livePulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotBob, { toValue: -3, duration: 1400, useNativeDriver: true }),
        Animated.timing(mascotBob, { toValue: 3, duration: 1400, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(livePulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(livePulse, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={s.root}>
      {/* Ambient radial gradient orbs */}
      <View style={s.ambientBg}>
        <View style={s.orbPurple} />
        <View style={s.orbLavender} />
        <View style={s.orbPink} />
        <View style={s.orbCyan} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ═══════════════ HEADER ═══════════════ */}
        <View style={s.header}>
          <Image
            source={require("@/assets/images/logotype-dark.webp")}
            style={s.logotype}
            resizeMode="contain"
          />
          <Pressable
            onPress={() => { haptic(); router.push("/(settings)/profile" as any); }}
            style={({ pressed }) => [s.avatar, pressed && { opacity: 0.7 }]}
          >
            <Text style={s.avatarText}>D</Text>
          </Pressable>
        </View>

        {/* ═══════════════ GREETING ═══════════════ */}
        <View style={s.greetingSection}>
          <View style={s.greetingRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.greeting}>Good morning, David</Text>
              <View style={s.dnaPill}>
                <Text style={s.dnaPillIcon}>✦</Text>
                <Text style={s.dnaPillText}>Explorer DNA</Text>
              </View>
            </View>
            <Animated.View style={{ transform: [{ translateY: mascotBob }] }}>
              <Image
                source={require("@/assets/images/mascot-dark.png")}
                style={s.mascot}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
        </View>

        {/* ═══════════════ PLAN A TRIP — VARIANT SELECTOR ═══════════════ */}
        <View style={s.section}>
          <PlanTripVariantSelector onPress={() => { haptic(); router.push("/(tabs)/plan-trip" as any); }} />
        </View>

        {/* ═══════════════ SECONDARY CARDS ═══════════════ */}
        <View style={s.section}>
          <View style={s.cardRow}>
            <Pressable
              onPress={() => { haptic(); router.push("/(points)/wallet" as any); }}
              style={({ pressed }) => [s.secondaryCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
            >
              <View style={s.secIconWrap}>
                <IconSymbol name="dollarsign.circle.fill" size={26} color={C.gold} />
              </View>
              <Text style={s.secLabel}>Cashback</Text>
              <Text style={s.secValue}>€45.20</Text>
            </Pressable>
            <Pressable
              onPress={() => { haptic(); router.push("/(tabs)/explore" as any); }}
              style={({ pressed }) => [s.secondaryCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
            >
              <View style={s.secIconWrap}>
                <IconSymbol name="safari.fill" size={26} color={C.purple} />
              </View>
              <Text style={s.secLabel}>Explore</Text>
              <Text style={s.secValue}>12 new</Text>
            </Pressable>
          </View>
        </View>

        {/* ═══════════════ DNA BANNER ═══════════════ */}
        <View style={s.section}>
          <Pressable
            onPress={() => { haptic(); router.push("/(dna)/profile" as any); }}
            style={({ pressed }) => [s.dnaBanner, pressed && { opacity: 0.88 }]}
          >
            {/* Left accent bar */}
            <View style={s.dnaAccent} />
            <View style={s.dnaIconWrap}>
              <IconSymbol name="waveform" size={22} color={C.purple} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.dnaTitle}>Complete Your DNA</Text>
              <Text style={s.dnaSub}>Unlock personalized recommendations</Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color={C.mutedLight} />
          </Pressable>
        </View>

        {/* ═══════════════ LIVE TRIP ═══════════════ */}
        <View style={s.section}>
          <Pressable
            onPress={() => { haptic(); router.push("/(live)/home" as any); }}
            style={({ pressed }) => [s.liveStrip, pressed && { opacity: 0.88 }]}
          >
            <View style={s.liveDotWrap}>
              <Animated.View style={[s.liveDotOuter, { opacity: livePulse }]} />
              <View style={s.liveDotInner} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={s.liveLabel}>LIVE TRIP</Text>
              <Text style={s.liveDest}>Bali, Indonesia</Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color={C.mutedLight} />
          </Pressable>
        </View>

        {/* ═══════════════ RECOMMENDED FOR YOU ═══════════════ */}
        <View style={s.sectionNoHPad}>
          <Text style={[s.sectionTitle, { paddingHorizontal: 16 }]}>Recommended for You</Text>
          <FlatList
            data={DESTINATIONS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
            snapToInterval={CARD_W + 14}
            decelerationRate="fast"
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => { haptic(); router.push({ pathname: "/(tabs)/destination-guide", params: { id: item.key } } as any); }}
                style={({ pressed }) => [
                  s.recCard,
                  pressed && { opacity: 0.93, transform: [{ scale: 0.98 }] },
                  // Slight scale on peeking card
                  index > 0 && { transform: [{ scale: 0.98 }] },
                ]}
              >
                <ExpoImage
                  source={DEST_IMAGES[item.key]}
                  style={s.recImage}
                  contentFit="cover"
                  transition={300}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.8)"]}
                  locations={[0.35, 0.55, 1]}
                  style={s.recOverlay}
                />
                {/* Green match badge */}
                <View style={s.matchBadge}>
                  <Text style={s.matchIcon}>✦</Text>
                  <Text style={s.matchText}>{item.match}% Match</Text>
                </View>
                {/* City name */}
                <View style={s.recNameWrap}>
                  <Text style={s.recCity}>{item.city}</Text>
                  <Text style={s.recCountry}>{item.country}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* ═══════════════ TRAVI TIP ═══════════════ */}
        <View style={s.section}>
          <View style={s.tipCard}>
            <Image
              source={require("@/assets/images/mascot-dark.png")}
              style={s.tipMascot}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
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

// ═══════════════════════════════════════════════════
// STYLES — pixel-perfect Figma prompt
// ═══════════════════════════════════════════════════
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  // ─── Ambient Background Orbs ───
  ambientBg: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  orbPurple: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(100,67,244,0.15)",
    top: "-10%",
    left: "-10%",
  },
  orbLavender: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: "rgba(123,92,246,0.10)",
    top: "5%",
    right: "-15%",
  },
  orbPink: {
    position: "absolute",
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: "rgba(249,68,152,0.08)",
    top: "50%",
    left: "10%",
  },
  orbCyan: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(1,190,255,0.06)",
    bottom: "5%",
    left: "-10%",
  },

  // ─── Header ───
  header: {
    paddingHorizontal: 16,
    paddingTop: 58,
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logotype: { width: 90, height: 32 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.cardBg,
    borderWidth: 1.5,
    borderColor: "rgba(100,67,244,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: C.white,
    fontSize: 15,
    fontFamily: "Satoshi-Bold",
  },

  // ─── Greeting ───
  greetingSection: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 4 },
  greetingRow: { flexDirection: "row", alignItems: "center" },
  greeting: {
    color: C.white,
    fontSize: 26,
    fontFamily: "Chillax-Bold",
    lineHeight: 32,
  },
  dnaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
    backgroundColor: "rgba(100,67,244,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    alignSelf: "flex-start",
    // subtle glow
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dnaPillIcon: { color: "#C4B5FD", fontSize: 12 },
  dnaPillText: {
    color: "#C4B5FD",
    fontSize: 12,
    fontFamily: "Satoshi-Medium",
    letterSpacing: 0.3,
  },
  mascot: { width: 64, height: 64 },

  // ─── Sections ───
  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionNoHPad: { marginTop: 24 },
  sectionTitle: {
    color: C.white,
    fontSize: 18,
    fontFamily: "Chillax-Bold",
    marginBottom: 14,
  },

  // ─── Hero Card (Plan a Trip) ───
  heroCard: {
    width: "100%" as any,
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    // cinematic glow
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 12,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  aiPill: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: C.frosted,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  aiPillText: {
    color: C.white,
    fontSize: 12,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 0.5,
  },
  heroTextWrap: {
    position: "absolute",
    bottom: 18,
    left: 18,
  },
  heroTitle: {
    color: C.white,
    fontSize: 24,
    fontFamily: "Chillax-Bold",
    lineHeight: 30,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroSub: {
    color: C.muted,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: 3,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ─── Secondary Cards ───
  cardRow: { flexDirection: "row", gap: 12 },
  secondaryCard: {
    flex: 1,
    height: 120,
    borderRadius: 16,
    backgroundColor: C.cardBg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    justifyContent: "space-between",
  },
  secIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(100,67,244,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  secLabel: {
    color: C.mutedLight,
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
  },
  secValue: {
    color: C.white,
    fontSize: 18,
    fontFamily: "Chillax-Bold",
  },

  // ─── DNA Banner ───
  dnaBanner: {
    height: 64,
    borderRadius: 14,
    backgroundColor: C.dnaBg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingLeft: 0,
    overflow: "hidden",
  },
  dnaAccent: {
    width: 4,
    height: "100%" as any,
    backgroundColor: C.purple,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  dnaIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(100,67,244,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 14,
    marginRight: 12,
  },
  dnaTitle: {
    color: C.white,
    fontSize: 15,
    fontFamily: "Satoshi-Bold",
  },
  dnaSub: {
    color: C.mutedLight,
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    marginTop: 2,
  },

  // ─── Live Trip Strip ───
  liveStrip: {
    height: 56,
    borderRadius: 14,
    backgroundColor: C.liveBg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  liveDotWrap: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  liveDotOuter: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.green,
  },
  liveDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.green,
  },
  liveLabel: {
    color: C.green,
    fontSize: 10,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 1.2,
  },
  liveDest: {
    color: C.white,
    fontSize: 15,
    fontFamily: "Chillax-Bold",
    marginTop: 1,
  },

  // ─── Recommended Cards ───
  recCard: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 20,
    overflow: "hidden",
  },
  recImage: {
    width: "100%",
    height: "100%",
  },
  recOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  matchBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: C.green,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  matchIcon: {
    color: C.white,
    fontSize: 11,
    fontFamily: "Satoshi-Bold",
  },
  matchText: {
    color: C.white,
    fontSize: 12,
    fontFamily: "Satoshi-Bold",
  },
  recNameWrap: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  recCity: {
    color: C.white,
    fontSize: 22,
    fontFamily: "Chillax-Bold",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    lineHeight: 28,
  },
  recCountry: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    marginTop: 2,
  },

  // ─── TRAVI Tip ───
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.cardBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  tipMascot: { width: 48, height: 48 },
  tipTitle: {
    color: C.gold,
    fontSize: 13,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  tipText: {
    color: C.muted,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    lineHeight: 19,
  },
});
