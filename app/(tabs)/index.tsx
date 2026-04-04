// Home Dashboard — TRAVI v2
// Design: DNA-first, full-screen hero, 4-action grid, full-width rec cards

import { useRef, useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
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
import { DS } from "@/components/screen-wrapper";

const { width: W, height: H } = Dimensions.get("window");

// ─── Brand Palette ───
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
  orange: "#FF9327",
  w80: "rgba(255,255,255,0.8)",
  w60: "rgba(255,255,255,0.6)",
  w40: "rgba(255,255,255,0.4)",
  w20: "rgba(255,255,255,0.2)",
  w10: "rgba(255,255,255,0.1)",
  w06: "rgba(255,255,255,0.06)",
  glassBg: "rgba(255,255,255,0.05)",
  glassBorder: "rgba(255,255,255,0.08)",
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
  {
    id: "1",
    key: "bali" as keyof typeof DEST,
    city: "Bali",
    country: "Indonesia",
    match: 96,
    hook: "Temples, yoga & rice terraces made for you",
    tags: ["Culturalist", "Relaxation"],
  },
  {
    id: "2",
    key: "santorini" as keyof typeof DEST,
    city: "Santorini",
    country: "Greece",
    match: 91,
    hook: "Sunsets & white villages for the romantic in you",
    tags: ["Culturalist", "Romantic"],
  },
  {
    id: "3",
    key: "kyoto" as keyof typeof DEST,
    city: "Kyoto",
    country: "Japan",
    match: 88,
    hook: "Ancient temples & cherry blossoms await",
    tags: ["Culturalist", "Adventurer"],
  },
  {
    id: "4",
    key: "paris" as keyof typeof DEST,
    city: "Paris",
    country: "France",
    match: 85,
    hook: "Art, cuisine & boulevards for the explorer",
    tags: ["Foodie", "Culturalist"],
  },
];

function haptic(style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) {
  if (Platform.OS !== "web") Haptics.impactAsync(style);
}

// ─── Star particles ───
function StarField() {
  const stars = useMemo(() => {
    const result = [];
    for (let i = 0; i < 50; i++) {
      result.push({
        id: i,
        left: Math.random() * W,
        top: Math.random() * 2000,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
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
// HERO — Full-screen DNA match card (70% viewport)
// ═══════════════════════════════════════════════════
function HeroSection({ onExplore, insetTop }: { onExplore: () => void; insetTop: number }) {
  const pulseBadge = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Badge pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseBadge, { toValue: 1.08, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseBadge, { toValue: 1.0, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
    // Border glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, { toValue: 0.7, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 0.2, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const HERO_H = H * 0.68;

  return (
    <Pressable
      onPress={() => { haptic(); onExplore(); }}
      style={({ pressed }) => [pressed && { opacity: 0.95, transform: [{ scale: 0.995 }] }]}
    >
      <View style={{ height: HERO_H, position: "relative" }}>
        {/* Full-screen image */}
        <ExpoImage
          source={DEST.bali}
          style={[StyleSheet.absoluteFill, { borderRadius: 0 }]}
          contentFit="cover"
          transition={400}
        />

        {/* Very light overlay — let the image breathe */}
        <LinearGradient
          colors={["rgba(10,5,20,0.1)", "rgba(10,5,20,0.15)", "rgba(10,5,20,0.9)"]}
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Subtle brand tint */}
        <LinearGradient
          colors={["rgba(100,67,244,0.08)", "transparent", "rgba(249,68,152,0.06)"]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Header row inside hero */}
        <View style={[heroS.headerRow, { paddingTop: insetTop + 10 }]}>
          <Image
            source={require("@/assets/images/logotype-dark.webp")}
            style={heroS.logo}
            resizeMode="contain"
          />
          <Pressable style={heroS.avatarBtn}>
            <Text style={heroS.avatarText}>D</Text>
          </Pressable>
        </View>

        {/* Greeting */}
        <View style={heroS.greetWrap}>
          <Text style={heroS.greetLine}>
            <Text style={heroS.greetMuted}>Good morning, </Text>
            <Text style={heroS.greetName}>David</Text>
          </Text>
        </View>

        {/* DNA Match Glass Card — bottom of hero */}
        <View style={heroS.dnaCard}>
          {Platform.OS !== "web" ? (
            <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(10,5,20,0.82)" }]} />
          )}
          <Animated.View style={[heroS.glowBorder, { opacity: glowOpacity }]} />

          <View style={heroS.dnaCardContent}>
            {/* Label */}
            <View style={heroS.dnaLabelRow}>
              <MaterialIcons name="biotech" size={14} color={C.purpleLight} />
              <Text style={heroS.dnaLabelText}>YOUR TOP DNA MATCH</Text>
            </View>

            {/* Big percentage */}
            <View style={heroS.matchRow}>
              <View style={heroS.matchNumWrap}>
                <Animated.View style={{ transform: [{ scale: pulseBadge }] }}>
                  <LinearGradient
                    colors={[C.purple, C.pink] as [string, string]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={heroS.matchBadge}
                  >
                    <Text style={heroS.matchNum}>96%</Text>
                    <Text style={heroS.matchWord}>PERFECT</Text>
                  </LinearGradient>
                </Animated.View>
              </View>

              <View style={heroS.matchInfo}>
                <Text style={heroS.matchCity}>Bali, Indonesia</Text>
                <Text style={heroS.matchHook}>"Temples, yoga & rice terraces made for you"</Text>
                <View style={heroS.tagRow}>
                  {["🏛️ Culturalist", "🧘 Relaxation"].map((t) => (
                    <View key={t} style={heroS.tag}>
                      <Text style={heroS.tagText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* CTA */}
            <Pressable
              onPress={() => { haptic(); onExplore(); }}
              style={({ pressed }) => [pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
            >
              <LinearGradient
                colors={[C.purple, "#7B5CF6", C.pink] as [string, string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={heroS.cta}
              >
                <MaterialIcons name="explore" size={18} color="#fff" />
                <Text style={heroS.ctaText}>Explore Bali</Text>
                <MaterialIcons name="arrow-forward" size={16} color="rgba(255,255,255,0.7)" />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const heroS = StyleSheet.create({
  headerRow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  logo: { width: 80, height: 28 },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1.5,
    borderColor: "rgba(155,126,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: C.white, fontSize: 14, fontFamily: "Satoshi-Bold" },
  greetWrap: {
    position: "absolute",
    top: "22%",
    left: 20,
    right: 20,
    zIndex: 5,
  },
  greetLine: { fontSize: 20, lineHeight: 26 },
  greetMuted: { fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.5)" },
  greetName: { fontFamily: "Chillax-Bold", color: C.white },

  // DNA Glass Card
  dnaCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(155,126,255,0.15)",
  },
  glowBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: C.purpleLight,
  },
  dnaCardContent: {
    padding: 18,
    paddingBottom: 20,
    gap: 14,
  },
  dnaLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dnaLabelText: {
    color: C.purpleLight,
    fontSize: 11,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 1.2,
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  matchNumWrap: {},
  matchBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  matchNum: {
    color: C.white,
    fontSize: 22,
    fontFamily: "Chillax-Bold",
    lineHeight: 26,
  },
  matchWord: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 9,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 1,
  },
  matchInfo: { flex: 1, gap: 6 },
  matchCity: {
    color: C.white,
    fontSize: 20,
    fontFamily: "Chillax-Bold",
    lineHeight: 24,
  },
  matchHook: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    lineHeight: 17,
    fontStyle: "italic",
  },
  tagRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  tag: {
    backgroundColor: "rgba(100,67,244,0.2)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.3)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { color: C.purpleLight, fontSize: 11, fontFamily: "Satoshi-Medium" },

  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
  },
  ctaText: {
    color: C.white,
    fontSize: 15,
    fontFamily: "Satoshi-Bold",
    flex: 1,
    textAlign: "center",
  },
});

// ═══════════════════════════════════════════════════
// 4-ACTION GRID
// ═══════════════════════════════════════════════════
const ACTIONS = [
  { icon: "luggage" as const, label: "Plan Trip", sub: "AI-powered", color: C.purple, route: "/(trip)/plan" },
  { icon: "explore" as const, label: "Explore Places", sub: "12 new matches", color: C.pink, route: "/(tabs)/explore" },
  { icon: "account-balance-wallet" as const, label: "Wallet", sub: "Cashback ready", color: C.gold, route: "/(tabs)/wallet" },
  { icon: "biotech" as const, label: "Update DNA", sub: "67% complete", color: C.purpleLight, route: "/(dna)/categories" },
];

function ActionGrid({ router }: { router: ReturnType<typeof useRouter> }) {
  return (
    <View style={ag.wrap}>
      <Text style={ag.title}>What do you want to do?</Text>
      <View style={ag.grid}>
        {ACTIONS.map((a, i) => {
          const anim = useRef(new Animated.Value(0)).current;
          useEffect(() => {
            Animated.timing(anim, {
              toValue: 1,
              duration: 350,
              delay: i * 80,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }).start();
          }, []);
          return (
            <Animated.View
              key={a.label}
              style={{
                opacity: anim,
                transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
                width: (W - 52) / 2,
              }}
            >
              <Pressable
                onPress={() => { haptic(); router.push(a.route as any); }}
                style={({ pressed }) => [ag.card, pressed && { opacity: 0.8, transform: [{ scale: 0.96 }] }]}
              >
                {Platform.OS !== "web" ? (
                  <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
                ) : (
                  <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(20,10,50,0.7)" }]} />
                )}
                <View style={[ag.iconWrap, { backgroundColor: a.color + "18", borderColor: a.color + "30" }]}>
                  <MaterialIcons name={a.icon} size={28} color={a.color} />
                </View>
                <Text style={ag.label}>{a.label}</Text>
                <Text style={ag.sub}>{a.sub}</Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const ag = StyleSheet.create({
  wrap: { paddingHorizontal: 20, marginTop: 28 },
  title: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "Satoshi-Medium", marginBottom: 14, letterSpacing: 0.3 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    height: 110,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    padding: 16,
    gap: 8,
    justifyContent: "center",
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 2,
  },
  label: { color: C.white, fontSize: 14, fontFamily: "Satoshi-Bold", lineHeight: 18 },
  sub: { color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "Satoshi-Regular" },
});

// ═══════════════════════════════════════════════════
// DNA COMPLETION BANNER
// ═══════════════════════════════════════════════════
function DNABanner({ router }: { router: ReturnType<typeof useRouter> }) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressAnim, { toValue: 0.67, duration: 800, delay: 300, easing: Easing.out(Easing.ease), useNativeDriver: false }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.03, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1.0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <Pressable
      onPress={() => { haptic(Haptics.ImpactFeedbackStyle.Medium); router.push("/(dna)/categories" as any); }}
      style={({ pressed }) => [pressed && { opacity: 0.88 }]}
    >
      <Animated.View style={[dnaB.card, { transform: [{ scale: pulseAnim }] }]}>
        {Platform.OS !== "web" ? (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(20,10,50,0.8)" }]} />
        )}
        {/* Orange warning accent */}
        <View style={dnaB.accentBar} />

        <View style={dnaB.inner}>
          <View style={dnaB.warningIcon}>
            <MaterialIcons name="warning-amber" size={20} color={C.orange} />
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            <View style={dnaB.titleRow}>
              <Text style={dnaB.title}>⚠️ Your DNA is incomplete</Text>
              <Text style={dnaB.pct}>67%</Text>
            </View>
            <Text style={dnaB.missing}>Missing: Luxurist, Adventurer</Text>
            {/* Progress bar */}
            <View style={dnaB.progressTrack}>
              <Animated.View style={[dnaB.progressFill, { width: progressWidth }]} />
            </View>
            <Text style={dnaB.cta}>Complete DNA (2 min) →</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const dnaB = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,147,39,0.25)",
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 10,
    bottom: 10,
    width: 3,
    backgroundColor: C.orange,
    borderRadius: 2,
  },
  inner: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 18,
    paddingLeft: 20,
    gap: 14,
  },
  warningIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,147,39,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,147,39,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: C.white, fontSize: 14, fontFamily: "Satoshi-Bold" },
  pct: { color: C.orange, fontSize: 14, fontFamily: "Chillax-Bold" },
  missing: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  progressTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: C.orange,
  },
  cta: { color: C.orange, fontSize: 13, fontFamily: "Satoshi-Bold", marginTop: 2 },
});

// ═══════════════════════════════════════════════════
// FULL-WIDTH RECOMMENDATION CARDS
// ═══════════════════════════════════════════════════
function RecCard({
  item,
  index,
  onPress,
}: {
  item: typeof RECOMMENDED[0];
  index: number;
  onPress: () => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  const matchPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 400,
      delay: index * 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    if (index < 2) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(matchPulse, { toValue: 1.06, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(matchPulse, { toValue: 1.0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    }
  }, []);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
      }}
    >
      <Pressable
        onPress={() => { haptic(); onPress(); }}
        style={({ pressed }) => [recS.card, pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }]}
      >
        <ExpoImage source={DEST[item.key]} style={recS.img} contentFit="cover" transition={300} />
        <LinearGradient
          colors={["transparent", "rgba(10,5,20,0.5)", "rgba(10,5,20,0.96)"]}
          locations={[0.2, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* DNA Match badge — center top */}
        <View style={recS.badgeWrap}>
          <Animated.View style={{ transform: [{ scale: matchPulse }] }}>
            <LinearGradient
              colors={[C.purple, C.pink] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={recS.badge}
            >
              <Text style={recS.badgeNum}>{item.match}%</Text>
              <Text style={recS.badgeWord}>MATCH</Text>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Bottom content */}
        <View style={recS.bottom}>
          <Text style={recS.city}>{item.city}, {item.country}</Text>
          <Text style={recS.hook}>"{item.hook}"</Text>
          <View style={recS.tagRow}>
            {item.tags.map((t) => (
              <View key={t} style={recS.tag}>
                <Text style={recS.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const recS = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    height: 220,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  img: { ...StyleSheet.absoluteFillObject },
  badgeWrap: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  badgeNum: { color: C.white, fontSize: 22, fontFamily: "Chillax-Bold", lineHeight: 26 },
  badgeWord: { color: "rgba(255,255,255,0.8)", fontSize: 9, fontFamily: "Satoshi-Bold", letterSpacing: 1 },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
    gap: 5,
  },
  city: { color: C.white, fontSize: 20, fontFamily: "Chillax-Bold", lineHeight: 24 },
  hook: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: "Satoshi-Regular", lineHeight: 16, fontStyle: "italic" },
  tagRow: { flexDirection: "row", gap: 6, marginTop: 4 },
  tag: {
    backgroundColor: "rgba(100,67,244,0.25)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.35)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { color: C.purpleLight, fontSize: 11, fontFamily: "Satoshi-Medium" },
});

// ═══════════════════════════════════════════════════
// LIVE TRIP BANNER
// ═══════════════════════════════════════════════════
function LiveTripBanner({ router }: { router: ReturnType<typeof useRouter> }) {
  const dotPulse = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotPulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(dotPulse, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Pressable
      onPress={() => { haptic(); router.push("/(live)/home" as any); }} // S35 Live Dashboard
      style={({ pressed }) => [pressed && { opacity: 0.85 }]}
    >
      <View style={liveS.card}>
        {Platform.OS !== "web" ? (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,20,10,0.85)" }]} />
        )}
        <View style={liveS.inner}>
          <View style={liveS.dotWrap}>
            <Animated.View style={[liveS.dotOuter, { opacity: dotPulse }]} />
            <View style={liveS.dotInner} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={liveS.label}>🟢 YOUR TRIP IS LIVE</Text>
            <Text style={liveS.dest}>Bali, Indonesia</Text>
            <Text style={liveS.day}>Day 2 of 5 · Next: Temple Visit 10:00 AM</Text>
          </View>
          <View style={liveS.arrow}>
            <MaterialIcons name="chevron-right" size={20} color={C.green} />
          </View>
        </View>
        <View style={liveS.ctaRow}>
          <Text style={liveS.ctaText}>Open Live Dashboard →</Text>
        </View>
      </View>
    </Pressable>
  );
}

const liveS = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,201,107,0.25)",
    shadowColor: C.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  dotWrap: { width: 20, height: 20, justifyContent: "center", alignItems: "center" },
  dotOuter: { position: "absolute", width: 20, height: 20, borderRadius: 10, backgroundColor: C.green },
  dotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  label: { color: C.green, fontSize: 11, fontFamily: "Satoshi-Bold", letterSpacing: 0.8 },
  dest: { color: C.white, fontSize: 17, fontFamily: "Chillax-Bold" },
  day: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,201,107,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  ctaRow: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,201,107,0.12)",
    paddingVertical: 12,
    alignItems: "center",
  },
  ctaText: { color: C.green, fontSize: 13, fontFamily: "Satoshi-Bold" },
});

// ═══════════════════════════════════════════════════
// MAIN SCREEN
// ═══════════════════════════════════════════════════
export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={s.root}>
      {/* Background */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[StyleSheet.absoluteFill, { backgroundColor: C.bg }]} />
        <StarField />
        <View style={s.glowPurple} />
        <View style={s.glowPink} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ═══ HERO (70% viewport, DNA match centerpiece) ═══ */}
        <HeroSection
          onExplore={() => router.push({ pathname: "/(tabs)/destination-guide", params: { id: "bali" } } as any)} // S14 Destination Detail
          insetTop={insets.top}
        />

        {/* ═══ 4-ACTION GRID ═══ */}
        <ActionGrid router={router} />

        {/* ═══ LIVE TRIP BANNER ═══ */}
        <View style={{ marginTop: 24 }}>
          <LiveTripBanner router={router} />
        </View>

        {/* ═══ DNA COMPLETION BANNER ═══ */}
        <View style={{ marginTop: 16 }}>
          <DNABanner router={router} />
        </View>

        {/* ═══ MORE DNA MATCHES ═══ */}
        <View style={{ marginTop: 28 }}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>More DNA Matches</Text>
            <Pressable onPress={() => { haptic(); router.push("/(tabs)/explore" as any); }}>
              <Text style={s.seeAll}>See all</Text>
            </Pressable>
          </View>
          <View style={{ gap: 14 }}>
            {RECOMMENDED.map((item, i) => (
              <RecCard
                key={item.id}
                item={item}
                index={i}
                onPress={() => router.push({ pathname: "/(tabs)/destination-guide", params: { id: item.key } } as any)} // S14 Destination Detail
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  glowPurple: {
    position: "absolute",
    top: "30%",
    left: "50%",
    marginLeft: -200,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(100,67,244,0.05)",
  },
  glowPink: {
    position: "absolute",
    bottom: -60,
    left: "50%",
    marginLeft: -180,
    width: 360,
    height: 250,
    borderRadius: 180,
    backgroundColor: "rgba(249,68,152,0.04)",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: { color: C.white, fontSize: 18, fontFamily: "Chillax-Bold" },
  seeAll: { color: C.purpleLight, fontSize: 13, fontFamily: "Satoshi-Bold" },
});
