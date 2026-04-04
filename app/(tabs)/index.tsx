// Home Dashboard — TRAVI
// Design DNA: #0A0514 bg, dot grid, purple/pink glows, Apple glassmorphism, Chillax+Satoshi

import { useRef, useEffect, useState } from "react";
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
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Image as ExpoImage } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

const { width: W } = Dimensions.get("window");

// ─── Design DNA Palette ───
const C = {
  bg: "#0A0514",
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.1)",
  glassLight: "rgba(255,255,255,0.09)",
  purple: "#6443F4",
  purpleLight: "#9B7EFF",
  purpleGlow: "rgba(100,67,244,0.22)",
  pink: "#F94498",
  pinkGlow: "rgba(249,68,152,0.14)",
  green: "#00C96B",
  gold: "#FDCD0A",
  white: "#FFFFFF",
  muted70: "rgba(255,255,255,0.7)",
  muted50: "rgba(255,255,255,0.5)",
  muted30: "rgba(255,255,255,0.3)",
  muted15: "rgba(255,255,255,0.15)",
};

// ─── Destination images ───
const DEST = {
  bali: require("@/assets/destinations/bali.jpg"),
  santorini: require("@/assets/destinations/santorini.jpg"),
  kyoto: require("@/assets/destinations/kyoto.jpg"),
  paris: require("@/assets/destinations/paris.jpg"),
  dubai: require("@/assets/destinations/dubai.jpg"),
  tokyo: require("@/assets/destinations/tokyo.jpg"),
  barcelona: require("@/assets/destinations/barcelona.jpg"),
};

const RECOMMENDED = [
  { id: "1", key: "bali" as keyof typeof DEST, city: "Bali", country: "Indonesia", match: 96 },
  { id: "2", key: "santorini" as keyof typeof DEST, city: "Santorini", country: "Greece", match: 91 },
  { id: "3", key: "kyoto" as keyof typeof DEST, city: "Kyoto", country: "Japan", match: 88 },
  { id: "4", key: "paris" as keyof typeof DEST, city: "Paris", country: "France", match: 85 },
];

const IATA = ["DXB", "BKK", "CDG", "NRT", "LHR", "SYD", "JFK", "IST"];

function haptic() {
  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

// ═══════════════════════════════════════════════════
// GLASS CARD WRAPPER — Apple-style frosted glass
// ═══════════════════════════════════════════════════
function GlassCard({ children, style, onPress }: { children: React.ReactNode; style?: any; onPress?: () => void }) {
  const content = (
    <View style={[glass.card, style]}>
      {Platform.OS !== "web" ? (
        <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
      ) : null}
      <View style={glass.inner}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={() => { haptic(); onPress(); }}
        style={({ pressed }) => [pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] }]}
      >
        {content}
      </Pressable>
    );
  }
  return content;
}

const glass = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: C.glass,
    borderWidth: 1,
    borderColor: C.glassBorder,
  },
  inner: {
    // Content sits above blur
  },
});

// ═══════════════════════════════════════════════════
// HERO — "Where will you go next?"
// Full-width cinematic card with destination photo, gradient, and CTA
// ═══════════════════════════════════════════════════
function HeroCard({ onPress }: { onPress: () => void }) {
  const shimmer = useRef(new Animated.Value(-1)).current;
  const [destIdx, setDestIdx] = useState(0);
  const destFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Shimmer sweep across CTA
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.delay(1200),
        Animated.timing(shimmer, { toValue: -1, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    // Rotating destination text
    const interval = setInterval(() => {
      Animated.timing(destFade, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        setDestIdx((i) => (i + 1) % IATA.length);
        Animated.timing(destFade, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const shimmerTranslate = shimmer.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200],
  });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <View style={heroS.card}>
        {/* Background destination image */}
        <ExpoImage
          source={DEST.bali}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={400}
        />
        {/* Dark gradient overlay */}
        <LinearGradient
          colors={["rgba(10,5,20,0.3)", "rgba(10,5,20,0.6)", "rgba(10,5,20,0.92)"]}
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Content */}
        <View style={heroS.content}>
          {/* Top row */}
          <View style={heroS.topRow}>
            <View style={heroS.aiBadge}>
              <Text style={heroS.aiBadgeText}>✦ AI-Powered</Text>
            </View>
            <Animated.Text style={[heroS.rotating, { opacity: destFade }]}>
              Next stop: {IATA[destIdx]}
            </Animated.Text>
          </View>

          {/* Main text */}
          <View style={heroS.textBlock}>
            <Text style={heroS.headline}>Where will{"\n"}you go next?</Text>
            <Text style={heroS.sub}>
              Your AI travel agent builds the perfect trip{"\n"}matched to your personality
            </Text>
          </View>

          {/* CTA Button */}
          <Pressable
            onPress={() => { haptic(); onPress(); }}
            style={({ pressed }) => [heroS.cta, pressed && { opacity: 0.9 }]}
          >
            <LinearGradient
              colors={[C.purple, "#8B5CF6", C.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={heroS.ctaGradient}
            >
              {/* Shimmer overlay */}
              <Animated.View
                style={[heroS.shimmer, { transform: [{ translateX: shimmerTranslate }] }]}
              />
              <MaterialIcons name="flight-takeoff" size={18} color="#fff" />
              <Text style={heroS.ctaText}>Plan My Trip</Text>
              <MaterialIcons name="arrow-forward" size={16} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const heroS = StyleSheet.create({
  card: {
    width: "100%" as any,
    height: 340,
    borderRadius: 24,
    overflow: "hidden",
    // Glow shadow
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 36,
    elevation: 20,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 22,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  aiBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  aiBadgeText: {
    fontSize: 11,
    fontFamily: "Satoshi-Bold",
    color: C.white,
    letterSpacing: 0.3,
  },
  rotating: {
    fontSize: 12,
    fontFamily: "Satoshi-Medium",
    color: C.muted50,
  },
  textBlock: {
    gap: 10,
  },
  headline: {
    fontSize: 34,
    fontFamily: "Chillax-Bold",
    color: C.white,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    color: C.muted70,
    lineHeight: 20,
  },
  cta: {
    alignSelf: "stretch",
    borderRadius: 18,
    overflow: "hidden",
    // CTA glow
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  ctaGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 18,
    overflow: "hidden",
  },
  ctaText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: C.white,
    letterSpacing: 0.3,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: "rgba(255,255,255,0.12)",
    transform: [{ skewX: "-20deg" }],
  },
});

// ═══════════════════════════════════════════════════
// RECOMMENDED CARD
// ═══════════════════════════════════════════════════
const REC_W = W * 0.58;
const REC_H = 300;

function RecCard({ item, onPress }: { item: typeof RECOMMENDED[0]; onPress: () => void }) {
  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { opacity: 0.93, transform: [{ scale: 0.97 }] }]}
    >
      <View style={rec.card}>
        <ExpoImage source={DEST[item.key]} style={rec.image} contentFit="cover" transition={300} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.88)"]}
          locations={[0.3, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Match badge — glass style */}
        <View style={rec.badge}>
          <Text style={rec.badgeText}>✦ {item.match}%</Text>
        </View>
        {/* Name */}
        <View style={rec.nameWrap}>
          <Text style={rec.city}>{item.city}</Text>
          <Text style={rec.country}>{item.country}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const rec = StyleSheet.create({
  card: {
    width: REC_W,
    height: REC_H,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  image: { width: "100%", height: "100%" },
  badge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: C.green,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  badgeText: { fontSize: 12, fontFamily: "Satoshi-Bold", color: C.white },
  nameWrap: { position: "absolute", bottom: 18, left: 18 },
  city: {
    fontSize: 24,
    fontFamily: "Chillax-Bold",
    color: C.white,
    lineHeight: 28,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  country: {
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
    color: "rgba(255,255,255,0.7)",
    marginTop: 3,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
});

// ═══════════════════════════════════════════════════
// DOT GRID BACKGROUND LAYER
// ═══════════════════════════════════════════════════
function DotGrid() {
  // Create a grid of dots to simulate the CSS radial-gradient dot pattern
  const dots = [];
  const spacing = 28;
  const cols = Math.ceil(W / spacing) + 1;
  const rows = 35; // enough to cover scrollable content
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <View
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: c * spacing,
            top: r * spacing,
            width: 2,
            height: 2,
            borderRadius: 1,
            backgroundColor: "rgba(255,255,255,0.035)",
          }}
        />
      );
    }
  }
  return <View style={StyleSheet.absoluteFill} pointerEvents="none">{dots}</View>;
}

// ═══════════════════════════════════════════════════
// MAIN SCREEN
// ═══════════════════════════════════════════════════
export default function HomeScreen() {
  const router = useRouter();
  const livePulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(livePulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(livePulse, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={s.root}>
      {/* ═══ BACKGROUND LAYERS ═══ */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Dot grid */}
        <DotGrid />
        {/* Center purple glow */}
        <View style={s.glowPurple} />
        {/* Bottom pink glow */}
        <View style={s.glowPink} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* ═══ HEADER ═══ */}
        <View style={s.header}>
          <Image source={require("@/assets/images/logotype-dark.webp")} style={s.logo} resizeMode="contain" />
          <Pressable
            onPress={() => { haptic(); router.push("/(settings)/profile" as any); }}
            style={({ pressed }) => [s.avatar, pressed && { opacity: 0.7 }]}
          >
            <Text style={s.avatarText}>D</Text>
          </Pressable>
        </View>

        {/* ═══ GREETING ═══ */}
        <View style={s.greeting}>
          <Text style={s.greetText}>Good morning,</Text>
          <Text style={s.greetName}>David</Text>
          <View style={s.dnaPill}>
            <Text style={s.dnaIcon}>✦</Text>
            <Text style={s.dnaLabel}>Explorer DNA</Text>
          </View>
        </View>

        {/* ═══ HERO ═══ */}
        <View style={s.section}>
          <HeroCard onPress={() => router.push("/(tabs)/plan-trip" as any)} />
        </View>

        {/* ═══ LIVE TRIP ═══ */}
        <View style={s.section}>
          <GlassCard onPress={() => router.push("/(live)/home" as any)}>
            <View style={s.liveInner}>
              <View style={s.liveDotWrap}>
                <Animated.View style={[s.liveDotOuter, { opacity: livePulse }]} />
                <View style={s.liveDotInner} />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={s.liveLabel}>LIVE TRIP</Text>
                <Text style={s.liveDest}>Bali, Indonesia</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={C.muted30} />
            </View>
          </GlassCard>
        </View>

        {/* ═══ DNA COMPLETION ═══ */}
        <View style={s.section}>
          <GlassCard onPress={() => router.push("/(dna)/profile" as any)}>
            <View style={s.dnaInner}>
              <View style={s.dnaAccent} />
              <View style={s.dnaIconWrap}>
                <MaterialIcons name="auto-awesome" size={20} color={C.purpleLight} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.dnaTitle}>Complete Your Travel DNA</Text>
                <Text style={s.dnaSub}>Unlock personalized matches</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={C.muted30} />
            </View>
          </GlassCard>
        </View>

        {/* ═══ RECOMMENDED ═══ */}
        <View style={s.sectionFull}>
          <Text style={s.sectionTitle}>Recommended for You</Text>
          <FlatList
            data={RECOMMENDED}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            snapToInterval={REC_W + 14}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <RecCard
                item={item}
                onPress={() => router.push({ pathname: "/(tabs)/destination-guide", params: { id: item.key } } as any)}
              />
            )}
          />
        </View>

        {/* ═══ QUICK ACTIONS ═══ */}
        <View style={s.section}>
          <View style={s.quickRow}>
            <GlassCard style={s.quickCardStyle} onPress={() => router.push("/(points)/wallet" as any)}>
              <View style={s.quickInner}>
                <View style={s.quickIconWrap}>
                  <MaterialIcons name="account-balance-wallet" size={22} color={C.gold} />
                </View>
                <Text style={s.quickLabel}>Wallet</Text>
                <Text style={s.quickValue}>€45</Text>
              </View>
            </GlassCard>
            <GlassCard style={s.quickCardStyle} onPress={() => router.push("/(tabs)/explore" as any)}>
              <View style={s.quickInner}>
                <View style={s.quickIconWrap}>
                  <MaterialIcons name="explore" size={22} color={C.purpleLight} />
                </View>
                <Text style={s.quickLabel}>Explore</Text>
                <Text style={s.quickValue}>12 new</Text>
              </View>
            </GlassCard>
            <GlassCard style={s.quickCardStyle} onPress={() => router.push("/(tabs)/trips" as any)}>
              <View style={s.quickInner}>
                <View style={s.quickIconWrap}>
                  <MaterialIcons name="luggage" size={22} color={C.pink} />
                </View>
                <Text style={s.quickLabel}>Trips</Text>
                <Text style={s.quickValue}>3</Text>
              </View>
            </GlassCard>
          </View>
        </View>

        {/* ═══ TRAVI TIP ═══ */}
        <View style={s.section}>
          <GlassCard>
            <View style={s.tipInner}>
              <Image source={require("@/assets/images/mascot-dark.png")} style={s.tipMascot} resizeMode="contain" />
              <View style={{ flex: 1 }}>
                <Text style={s.tipTitle}>TRAVI says</Text>
                <Text style={s.tipText}>
                  Bali is trending this season — 96% match with your Explorer DNA. Ready to go?
                </Text>
              </View>
            </View>
          </GlassCard>
        </View>

      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  // ─── Background Glows ───
  glowPurple: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -180,
    marginLeft: -180,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: C.purpleGlow,
  },
  glowPink: {
    position: "absolute",
    bottom: -40,
    left: "50%",
    marginLeft: -150,
    width: 300,
    height: 200,
    borderRadius: 150,
    backgroundColor: C.pinkGlow,
  },

  // ─── Header ───
  header: {
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { width: 80, height: 28 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: C.glass,
    borderWidth: 1,
    borderColor: C.glassBorder,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: C.white, fontSize: 15, fontFamily: "Satoshi-Bold" },

  // ─── Greeting ───
  greeting: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 4 },
  greetText: { fontSize: 16, fontFamily: "Satoshi-Regular", color: C.muted50 },
  greetName: { fontSize: 32, fontFamily: "Chillax-Bold", color: C.white, marginTop: 2, lineHeight: 38 },
  dnaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    backgroundColor: "rgba(100,67,244,0.12)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  dnaIcon: { color: C.purpleLight, fontSize: 12 },
  dnaLabel: { color: C.purpleLight, fontSize: 12, fontFamily: "Satoshi-Medium" },

  // ─── Sections ───
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionFull: { marginTop: 28 },
  sectionTitle: {
    color: C.white,
    fontSize: 20,
    fontFamily: "Chillax-Bold",
    marginBottom: 16,
    paddingHorizontal: 20,
  },

  // ─── Live Trip ───
  liveInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  liveDotWrap: { width: 20, height: 20, justifyContent: "center", alignItems: "center" },
  liveDotOuter: { position: "absolute", width: 20, height: 20, borderRadius: 10, backgroundColor: C.green },
  liveDotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  liveLabel: { color: C.green, fontSize: 10, fontFamily: "Satoshi-Bold", letterSpacing: 1.2 },
  liveDest: { color: C.white, fontSize: 15, fontFamily: "Chillax-Bold", marginTop: 1 },

  // ─── DNA Card ───
  dnaInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    paddingLeft: 14,
  },
  dnaAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: C.purple,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  dnaIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(100,67,244,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  dnaTitle: { color: C.white, fontSize: 15, fontFamily: "Satoshi-Bold" },
  dnaSub: { color: C.muted50, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },

  // ─── Quick Actions ───
  quickRow: { flexDirection: "row", gap: 10 },
  quickCardStyle: { flex: 1 },
  quickInner: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 8,
  },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickLabel: { color: C.muted50, fontSize: 11, fontFamily: "Satoshi-Medium" },
  quickValue: { color: C.white, fontSize: 18, fontFamily: "Chillax-Bold" },

  // ─── Tip ───
  tipInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  tipMascot: { width: 44, height: 44 },
  tipTitle: { color: C.purpleLight, fontSize: 12, fontFamily: "Satoshi-Bold", letterSpacing: 0.5, marginBottom: 4 },
  tipText: { color: C.muted50, fontSize: 13, fontFamily: "Satoshi-Regular", lineHeight: 19 },
});
