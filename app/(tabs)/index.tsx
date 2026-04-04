// Home Dashboard — TRAVI
// Reference-level: dramatic depth, glass cards, particles, glowing elements
// Brand palette only: #0A0514 bg, #6443F4 purple, #F94498 pink, #9B7EFF lavender

import { useRef, useEffect, useState, useMemo } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W, height: H } = Dimensions.get("window");

// ─── TRAVI Brand Palette ───
const C = {
  bg: "#0A0514",
  purple: "#6443F4",
  purpleLight: "#9B7EFF",
  purpleDark: "#3D2494",
  pink: "#F94498",
  pinkLight: "#FF6BB5",
  white: "#FFFFFF",
  green: "#00C96B",
  gold: "#FDCD0A",
  // Opacity variants
  w80: "rgba(255,255,255,0.8)",
  w60: "rgba(255,255,255,0.6)",
  w40: "rgba(255,255,255,0.4)",
  w20: "rgba(255,255,255,0.2)",
  w10: "rgba(255,255,255,0.1)",
  w06: "rgba(255,255,255,0.06)",
  w03: "rgba(255,255,255,0.03)",
  // Glass
  glassBg: "rgba(255,255,255,0.05)",
  glassBorder: "rgba(255,255,255,0.08)",
  glassHighlight: "rgba(255,255,255,0.12)",
  // Glow
  purpleGlow15: "rgba(100,67,244,0.15)",
  purpleGlow25: "rgba(100,67,244,0.25)",
  purpleGlow40: "rgba(100,67,244,0.4)",
  pinkGlow12: "rgba(249,68,152,0.12)",
  pinkGlow30: "rgba(249,68,152,0.3)",
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

function haptic() {
  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

// ═══════════════════════════════════════════════════
// STAR PARTICLES — floating dots like a night sky
// ═══════════════════════════════════════════════════
function StarField() {
  const stars = useMemo(() => {
    const result = [];
    for (let i = 0; i < 60; i++) {
      result.push({
        id: i,
        left: Math.random() * W,
        top: Math.random() * 1600,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.05,
      });
    }
    return result;
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((s) => (
        <View
          key={s.id}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: s.size / 2,
            backgroundColor: `rgba(255,255,255,${s.opacity})`,
          }}
        />
      ))}
    </View>
  );
}

// ═══════════════════════════════════════════════════
// GLASS CARD — deep frosted glass with glowing border
// ═══════════════════════════════════════════════════
function GlassCard({
  children,
  style,
  onPress,
  glowColor,
}: {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  glowColor?: string;
}) {
  const borderColor = glowColor
    ? glowColor.replace(/[\d.]+\)$/, "0.2)")
    : C.glassBorder;

  const content = (
    <View style={[glassS.outer, glowColor && { shadowColor: glowColor }, style]}>
      <View style={[glassS.card, { borderColor }]}>
        {Platform.OS !== "web" ? (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(20,10,50,0.7)" }]} />
        )}
        {children}
      </View>
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

const glassS = StyleSheet.create({
  outer: {
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: C.glassBg,
    borderWidth: 1,
    borderColor: C.glassBorder,
  },
});

// ═══════════════════════════════════════════════════
// HERO — Cinematic destination card
// ═══════════════════════════════════════════════════
function HeroCard({ onPress }: { onPress: () => void }) {
  const shimmer = useRef(new Animated.Value(-1)).current;
  const glowPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Shimmer sweep on CTA
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 2800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.delay(1500),
        Animated.timing(shimmer, { toValue: -1, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    // Glow pulse on card border
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 0.6, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.2, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const shimmerX = shimmer.interpolate({
    inputRange: [-1, 1],
    outputRange: [-250, W + 50],
  });

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <View style={heroS.wrapper}>
        {/* Outer glow ring */}
        <Animated.View style={[heroS.glowRing, { opacity: glowPulse }]} />

        <View style={heroS.card}>
          {/* Background photo */}
          <ExpoImage source={DEST.bali} style={StyleSheet.absoluteFill} contentFit="cover" transition={400} />

          {/* Gradient overlays — dramatic cinematic */}
          <LinearGradient
            colors={["rgba(10,5,20,0.2)", "rgba(10,5,20,0.5)", "rgba(10,5,20,0.95)"]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
          />
          {/* Purple tint overlay for brand feel */}
          <LinearGradient
            colors={["rgba(100,67,244,0.15)", "transparent", "rgba(249,68,152,0.1)"]}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* Content */}
          <View style={heroS.content}>
            {/* Top badge */}
            <View style={heroS.topRow}>
              <View style={heroS.aiBadge}>
                <Text style={heroS.aiBadgeText}>✦ AI-Powered</Text>
              </View>
            </View>

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Bottom text */}
            <View style={heroS.textBlock}>
              <Text style={heroS.headline}>
                Where will{"\n"}
                <Text style={heroS.headlineAccent}>AI</Text> take you{"\n"}
                next?
              </Text>
              <Text style={heroS.sub}>
                Personalized trips matched to your DNA
              </Text>
            </View>

            {/* CTA */}
            <View style={heroS.ctaWrap}>
              <LinearGradient
                colors={[C.purple, "#7B5CF6", C.pink]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={heroS.ctaGradient}
              >
                {/* Shimmer */}
                <Animated.View
                  style={[heroS.shimmer, { transform: [{ translateX: shimmerX }] }]}
                />
                <MaterialIcons name="flight-takeoff" size={20} color="#fff" />
                <Text style={heroS.ctaText}>Plan My Trip</Text>
                <View style={heroS.ctaArrow}>
                  <MaterialIcons name="arrow-forward" size={16} color={C.purple} />
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const heroS = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  glowRing: {
    position: "absolute",
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: C.purpleLight,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  card: {
    width: "100%" as any,
    height: 300,
    borderRadius: 24,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 18,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  aiBadge: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backdropFilter: "blur(10px)",
  },
  aiBadgeText: {
    fontSize: 12,
    fontFamily: "Satoshi-Bold",
    color: C.white,
    letterSpacing: 0.5,
  },
  textBlock: {
    marginBottom: 12,
  },
  headline: {
    fontSize: 28,
    fontFamily: "Chillax-Bold",
    color: C.white,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  headlineAccent: {
    color: C.pink,
  },
  sub: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    color: C.w60,
    marginTop: 10,
    lineHeight: 20,
  },
  ctaWrap: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
  },
  ctaGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 13,
    overflow: "hidden",
  },
  ctaText: {
    fontSize: 15,
    fontFamily: "Satoshi-Bold",
    color: C.white,
    letterSpacing: 0.3,
    flex: 1,
  },
  ctaArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: "rgba(255,255,255,0.08)",
    transform: [{ skewX: "-20deg" }],
  },
});

// ═══════════════════════════════════════════════════
// CATEGORY PILLS — quick access with glowing icons
// ═══════════════════════════════════════════════════
const CATEGORIES = [
  { id: "1", icon: "beach-access" as const, label: "Beach", color: C.pink },
  { id: "2", icon: "landscape" as const, label: "Nature", color: C.green },
  { id: "3", icon: "location-city" as const, label: "City", color: C.purpleLight },
  { id: "4", icon: "restaurant" as const, label: "Food", color: C.gold },
  { id: "5", icon: "nightlife" as const, label: "Nightlife", color: C.pinkLight },
];

function CategoryPills() {
  const router = useRouter();
  return (
    <View style={catS.row}>
      {CATEGORIES.map((cat) => (
        <Pressable
          key={cat.id}
          onPress={() => { haptic(); router.push("/(tabs)/explore" as any); }}
          style={({ pressed }) => [catS.pill, pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] }]}
        >
          <View style={[catS.iconCircle, { backgroundColor: cat.color + "18", borderColor: cat.color + "30" }]}>
            <MaterialIcons name={cat.icon} size={20} color={cat.color} />
          </View>
          <Text style={catS.label}>{cat.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const catS = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  pill: { alignItems: "center", gap: 8, flex: 1 },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  label: { fontSize: 11, fontFamily: "Satoshi-Medium", color: C.w60 },
});

// ═══════════════════════════════════════════════════
// RECOMMENDED CARD — tall cinematic
// ═══════════════════════════════════════════════════
const REC_W = W * 0.55;
const REC_H = 220;

function RecCard({ item, onPress }: { item: typeof RECOMMENDED[0]; onPress: () => void }) {
  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { opacity: 0.93, transform: [{ scale: 0.97 }] }]}
    >
      <View style={recS.card}>
        <ExpoImage source={DEST[item.key]} style={recS.image} contentFit="cover" transition={300} />
        <LinearGradient
          colors={["transparent", "rgba(10,5,20,0.2)", "rgba(10,5,20,0.92)"]}
          locations={[0.25, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Match badge */}
        <View style={recS.badge}>
          <Text style={recS.badgeText}>✦ {item.match}%</Text>
        </View>
        {/* Name */}
        <View style={recS.nameWrap}>
          <Text style={recS.city}>{item.city}</Text>
          <Text style={recS.country}>{item.country}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const recS = StyleSheet.create({
  card: {
    width: REC_W,
    height: REC_H,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.w10,
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
    shadowColor: C.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  badgeText: { fontSize: 12, fontFamily: "Satoshi-Bold", color: C.white },
  nameWrap: { position: "absolute", bottom: 14, left: 14 },
  city: {
    fontSize: 20,
    fontFamily: "Chillax-Bold",
    color: C.white,
    lineHeight: 24,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
  },
  country: {
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
    color: C.w60,
    marginTop: 4,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
});

// ═══════════════════════════════════════════════════
// MAIN SCREEN
// ═══════════════════════════════════════════════════
export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const livePulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(livePulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(livePulse, { toValue: 0.3, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={s.root}>
        {/* ═══ BACKGROUND LAYERS ═══ */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Solid black base */}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "#0A0514" }]} />
        {/* Star particles */}
        <StarField />
        {/* Very subtle center purple glow */}
        <View style={s.glowPurple} />
        {/* Very subtle bottom pink glow */}
        <View style={s.glowPink} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* ═══ HEADER ═══ */}
        <View style={[s.header, { paddingTop: insets.top + 8 }]}>
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
          <Text style={s.greetLine}>
            <Text style={s.greetMuted}>Good morning, </Text>
            <Text style={s.greetName}>David</Text>
          </Text>
          <View style={s.dnaPill}>
            <Text style={s.dnaIcon}>✦</Text>
            <Text style={s.dnaLabel}>Explorer DNA</Text>
          </View>
        </View>

        {/* ═══ HERO ═══ */}
        <View style={s.section}>
          <HeroCard onPress={() => router.push("/(tabs)/plan-trip" as any)} />
        </View>

        {/* ═══ CATEGORIES ═══ */}
        <View style={s.section}>
          <CategoryPills />
        </View>

        {/* ═══ LIVE TRIP ═══ */}
        <View style={s.section}>
          <GlassCard glowColor={C.green} onPress={() => router.push("/(live)/home" as any)}>
            <View style={s.liveInner}>
              <View style={s.liveDotWrap}>
                <Animated.View style={[s.liveDotOuter, { opacity: livePulse }]} />
                <View style={s.liveDotInner} />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={s.liveLabel}>LIVE TRIP</Text>
                <Text style={s.liveDest}>Bali, Indonesia</Text>
              </View>
              <View style={s.liveArrow}>
                <MaterialIcons name="chevron-right" size={18} color={C.green} />
              </View>
            </View>
          </GlassCard>
        </View>

        {/* ═══ DNA COMPLETION ═══ */}
        <View style={s.section}>
          <GlassCard glowColor={C.purple} onPress={() => router.push("/(dna)/profile" as any)}>
            <View style={s.dnaInner}>
              <View style={s.dnaAccent} />
              <View style={s.dnaIconWrap}>
                <MaterialIcons name="auto-awesome" size={22} color={C.purpleLight} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.dnaTitle}>Complete Your <Text style={{ color: C.purpleLight }}>Travel DNA</Text></Text>
                <Text style={s.dnaSub}>Unlock personalized matches</Text>
                {/* Progress bar */}
                <View style={s.dnaProgress}>
                  <View style={s.dnaProgressFill} />
                </View>
              </View>
              <View style={s.dnaArrow}>
                <MaterialIcons name="chevron-right" size={18} color={C.purpleLight} />
              </View>
            </View>
          </GlassCard>
        </View>

        {/* ═══ RECOMMENDED ═══ */}
        <View style={s.sectionFull}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>
              <Text style={{ color: C.pink }}>Recommended</Text> for You
            </Text>
            <Pressable onPress={() => { haptic(); router.push("/(tabs)/explore" as any); }}>
              <Text style={s.seeAll}>See all</Text>
            </Pressable>
          </View>
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
            {[
              { icon: "account-balance-wallet" as const, label: "Wallet", value: "€45", color: C.gold },
              { icon: "explore" as const, label: "Explore", value: "12 new", color: C.purpleLight },
              { icon: "luggage" as const, label: "Trips", value: "3", color: C.pink },
            ].map((q, i) => (
              <GlassCard
                key={i}
                style={{ flex: 1 }}
                onPress={() => {
                  if (i === 0) router.push("/(points)/wallet" as any);
                  else if (i === 1) router.push("/(tabs)/explore" as any);
                  else router.push("/(tabs)/trips" as any);
                }}
              >
                <View style={s.quickInner}>
                  <View style={[s.quickIcon, { backgroundColor: q.color + "15", borderColor: q.color + "25" }]}>
                    <MaterialIcons name={q.icon} size={22} color={q.color} />
                  </View>
                  <Text style={s.quickLabel}>{q.label}</Text>
                  <Text style={s.quickValue}>{q.value}</Text>
                </View>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* ═══ TRAVI TIP ═══ */}
        <View style={s.section}>
          <GlassCard glowColor={C.purple}>
            <View style={s.tipInner}>
              <Image source={require("@/assets/images/mascot-dark.png")} style={s.tipMascot} resizeMode="contain" />
              <View style={{ flex: 1 }}>
                <Text style={s.tipTitle}>TRAVI says</Text>
                <Text style={s.tipText}>
                  Bali is <Text style={{ color: C.pink, fontFamily: "Satoshi-Bold" }}>trending</Text> this season — 96% match with your Explorer DNA.
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
    top: "35%",
    left: "50%",
    marginLeft: -200,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(100,67,244,0.06)",
  },
  glowPink: {
    position: "absolute",
    bottom: -60,
    left: "50%",
    marginLeft: -180,
    width: 360,
    height: 250,
    borderRadius: 180,
    backgroundColor: "rgba(249,68,152,0.05)",
  },

  // ─── Header ───
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { width: 80, height: 28 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.glassBg,
    borderWidth: 1.5,
    borderColor: C.purpleGlow25,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: C.white, fontSize: 15, fontFamily: "Satoshi-Bold" },

  // ─── Greeting ───
  greeting: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 4 },
  greetLine: { fontSize: 22, lineHeight: 28 },
  greetMuted: { fontFamily: "Satoshi-Regular", color: C.w40 },
  greetName: { fontFamily: "Chillax-Bold", color: C.white },
  dnaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    backgroundColor: C.purpleGlow15,
    borderWidth: 1,
    borderColor: C.purpleGlow25,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dnaIcon: { color: C.purpleLight, fontSize: 13 },
  dnaLabel: { color: C.purpleLight, fontSize: 12, fontFamily: "Satoshi-Bold", letterSpacing: 0.3 },

  // ─── Sections ───
  section: { paddingHorizontal: 20, marginTop: 18 },
  sectionFull: { marginTop: 22 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: C.white,
    fontSize: 18,
    fontFamily: "Chillax-Bold",
  },
  seeAll: {
    color: C.purpleLight,
    fontSize: 13,
    fontFamily: "Satoshi-Bold",
  },

  // ─── Live Trip ───
  liveInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  liveDotWrap: { width: 22, height: 22, justifyContent: "center", alignItems: "center" },
  liveDotOuter: { position: "absolute", width: 22, height: 22, borderRadius: 11, backgroundColor: C.green },
  liveDotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  liveLabel: { color: C.green, fontSize: 10, fontFamily: "Satoshi-Bold", letterSpacing: 1.5 },
  liveDest: { color: C.white, fontSize: 16, fontFamily: "Chillax-Bold", marginTop: 2 },
  liveArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,201,107,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  // ─── DNA Card ───
  dnaInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,
    paddingLeft: 16,
  },
  dnaAccent: {
    position: "absolute",
    left: 0,
    top: 8,
    bottom: 8,
    width: 3,
    backgroundColor: C.purple,
    borderRadius: 2,
  },
  dnaIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: C.purpleGlow15,
    borderWidth: 1,
    borderColor: C.purpleGlow25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dnaTitle: { color: C.white, fontSize: 15, fontFamily: "Satoshi-Bold" },
  dnaSub: { color: C.w40, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 3 },
  dnaProgress: {
    height: 4,
    backgroundColor: C.w06,
    borderRadius: 2,
    marginTop: 8,
    width: "80%" as any,
  },
  dnaProgressFill: {
    height: 4,
    width: "40%" as any,
    borderRadius: 2,
    backgroundColor: C.purple,
  },
  dnaArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.purpleGlow15,
    justifyContent: "center",
    alignItems: "center",
  },

  // ─── Quick Actions ───
  quickRow: { flexDirection: "row", gap: 10 },
  quickInner: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 7,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  quickLabel: { color: C.w40, fontSize: 10, fontFamily: "Satoshi-Medium" },
  quickValue: { color: C.white, fontSize: 16, fontFamily: "Chillax-Bold" },

  // ─── Tip ───
  tipInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    gap: 14,
  },
  tipMascot: { width: 48, height: 48 },
  tipTitle: { color: C.purpleLight, fontSize: 12, fontFamily: "Satoshi-Bold", letterSpacing: 0.5, marginBottom: 4 },
  tipText: { color: C.w60, fontSize: 13, fontFamily: "Satoshi-Regular", lineHeight: 20 },
});
