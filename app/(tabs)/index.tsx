// Home Dashboard — TRAVI
// Clean, cinematic, emotionally compelling — makes you want to book NOW

import { useRef, useEffect, useState, useCallback } from "react";
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
import { Image as ExpoImage } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

const { width: W } = Dimensions.get("window");

// ─── Palette ───
const C = {
  bg: "#0D0221",
  surface: "#140930",
  surfaceLight: "#1C0E3D",
  purple: "#6443F4",
  purpleLight: "#9B7EFF",
  pink: "#F94498",
  green: "#00C96B",
  gold: "#FDCD0A",
  white: "#FFFFFF",
  muted60: "rgba(255,255,255,0.6)",
  muted40: "rgba(255,255,255,0.4)",
  muted20: "rgba(255,255,255,0.2)",
  border: "rgba(100,67,244,0.2)",
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
// BOARDING PASS — THE HERO
// ═══════════════════════════════════════════════════
function BoardingPassHero({ onPress }: { onPress: () => void }) {
  const planeX = useRef(new Animated.Value(0)).current;
  const [destIdx, setDestIdx] = useState(0);
  const destFade = useRef(new Animated.Value(1)).current;
  const destSlide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Plane float
    Animated.loop(
      Animated.sequence([
        Animated.timing(planeX, { toValue: 5, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(planeX, { toValue: -5, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();

    // Rotating destination
    const interval = setInterval(() => {
      Animated.parallel([
        Animated.timing(destFade, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(destSlide, { toValue: -6, duration: 180, useNativeDriver: true }),
      ]).start(() => {
        setDestIdx((i) => (i + 1) % IATA.length);
        destSlide.setValue(6);
        Animated.parallel([
          Animated.timing(destFade, { toValue: 1, duration: 180, useNativeDriver: true }),
          Animated.timing(destSlide, { toValue: 0, duration: 180, useNativeDriver: true }),
        ]).start();
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const bars = [28,20,28,16,24,28,14,28,20,16,28,24,20,28,16,28,14,24,28,20,16,28];

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <View style={hero.card}>
        {/* ── DARK TOP ── */}
        <View style={hero.dark}>
          <View style={hero.header}>
            <Text style={hero.brand}>TR<Text style={{ color: C.purpleLight }}>AVI</Text></Text>
            <Text style={hero.type}>BOARDING PASS</Text>
          </View>

          <View style={hero.route}>
            {/* Origin */}
            <View style={hero.cityBlock}>
              <Text style={hero.iata}>TLV</Text>
              <Text style={hero.cityLabel}>TEL AVIV</Text>
            </View>

            {/* Flight line */}
            <View style={hero.mid}>
              <View style={hero.flightRow}>
                <View style={hero.lineSeg} />
                <Animated.View style={{ transform: [{ translateX: planeX }] }}>
                  <MaterialIcons name="flight" size={20} color="rgba(255,255,255,0.5)" style={{ transform: [{ rotate: "90deg" }] }} />
                </Animated.View>
                <View style={hero.lineSeg} />
              </View>
              <View style={hero.aiBadge}>
                <Text style={hero.aiBadgeText}>✦ AI MATCHED</Text>
              </View>
            </View>

            {/* Destination — rotating */}
            <View style={hero.cityBlock}>
              <Animated.Text style={[hero.iata, hero.iataDest, { opacity: destFade, transform: [{ translateY: destSlide }] }]}>
                {IATA[destIdx]}
              </Animated.Text>
              <Text style={hero.cityLabel}>YOUR DREAM</Text>
            </View>
          </View>
        </View>

        {/* ── PERFORATION ── */}
        <View style={hero.perfRow}>
          <View style={hero.perfCircle} />
          <View style={hero.perfDashes} />
          <View style={[hero.perfCircle, { right: -9, left: undefined }]} />
        </View>

        {/* ── LIGHT BOTTOM ── */}
        <View style={hero.light}>
          <View style={hero.fields}>
            <View style={hero.field}>
              <Text style={hero.fieldLabel}>PASSENGER</Text>
              <Text style={hero.fieldValue}>David ✦</Text>
            </View>
            <View style={hero.field}>
              <Text style={hero.fieldLabel}>CLASS</Text>
              <Text style={hero.fieldValue}>Explorer</Text>
            </View>
            <View style={hero.field}>
              <Text style={hero.fieldLabel}>DEPARTS</Text>
              <Text style={hero.fieldValue}>Anytime</Text>
            </View>
          </View>
          <View style={hero.bottomRow}>
            <View style={hero.barcode}>
              {bars.map((h, i) => <View key={i} style={[hero.bar, { height: h }]} />)}
            </View>
            <Pressable
              onPress={() => { haptic(); onPress(); }}
              style={({ pressed }) => [hero.cta, pressed && { opacity: 0.85 }]}
            >
              <Text style={hero.ctaText}>Plan Trip</Text>
              <MaterialIcons name="arrow-forward" size={14} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const hero = StyleSheet.create({
  card: {
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 40,
    elevation: 20,
  },
  dark: {
    backgroundColor: C.surface,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  brand: { fontSize: 14, fontFamily: "Chillax-Bold", color: C.white },
  type: { fontSize: 9, fontFamily: "Satoshi-Bold", letterSpacing: 3, color: C.muted20 },
  route: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cityBlock: { alignItems: "center", width: 80 },
  iata: { fontSize: 38, fontFamily: "Chillax-Bold", color: C.white, letterSpacing: -2, lineHeight: 42 },
  iataDest: { color: C.pink },
  cityLabel: { fontSize: 8, fontFamily: "Satoshi-Bold", color: C.muted40, marginTop: 4, letterSpacing: 1.5 },
  mid: { flex: 1, alignItems: "center", gap: 8 },
  flightRow: { flexDirection: "row", alignItems: "center", width: "100%" as any },
  lineSeg: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.12)" },
  aiBadge: {
    backgroundColor: "rgba(100,67,244,0.2)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.4)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  aiBadgeText: { fontSize: 9, fontFamily: "Satoshi-Bold", color: C.purpleLight, letterSpacing: 0.5 },
  // Perforation
  perfRow: {
    height: 1,
    backgroundColor: "#F0ECFF",
    position: "relative",
    overflow: "visible",
  },
  perfCircle: {
    position: "absolute",
    left: -9,
    top: -9,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: C.bg,
    zIndex: 5,
  },
  perfDashes: {
    flex: 1,
    height: 1,
    marginHorizontal: 14,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.15)",
  },
  // Light bottom
  light: {
    backgroundColor: "#F7F4FF",
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 16,
  },
  fields: { flexDirection: "row", gap: 24, marginBottom: 14 },
  field: {},
  fieldLabel: { fontSize: 8, fontFamily: "Satoshi-Bold", letterSpacing: 1.5, color: C.purpleLight, marginBottom: 3 },
  fieldValue: { fontSize: 14, fontFamily: "Chillax-Bold", color: "#1A0B32" },
  bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  barcode: { flexDirection: "row", gap: 2, alignItems: "flex-end", height: 28 },
  bar: { width: 2, backgroundColor: "#1A0B32", borderRadius: 1 },
  cta: {
    backgroundColor: C.purple,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  ctaText: { fontSize: 13, fontFamily: "Satoshi-Bold", color: C.white },
});

// ═══════════════════════════════════════════════════
// RECOMMENDED CARD
// ═══════════════════════════════════════════════════
const REC_W = W * 0.6;
const REC_H = 320;

function RecCard({ item, onPress }: { item: typeof RECOMMENDED[0]; onPress: () => void }) {
  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { opacity: 0.93, transform: [{ scale: 0.97 }] }]}
    >
      <View style={rec.card}>
        <ExpoImage source={DEST[item.key]} style={rec.image} contentFit="cover" transition={300} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.85)"]}
          locations={[0.3, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Match badge */}
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
    borderRadius: 24,
    overflow: "hidden",
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
  nameWrap: { position: "absolute", bottom: 20, left: 18 },
  city: {
    fontSize: 26,
    fontFamily: "Chillax-Bold",
    color: C.white,
    lineHeight: 30,
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
      {/* Ambient orbs */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={s.orbPurple} />
        <View style={s.orbPink} />
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

        {/* ═══ BOARDING PASS HERO ═══ */}
        <View style={s.section}>
          <BoardingPassHero onPress={() => router.push("/(tabs)/plan-trip" as any)} />
        </View>

        {/* ═══ LIVE TRIP ═══ */}
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
            <MaterialIcons name="chevron-right" size={20} color={C.muted40} />
          </Pressable>
        </View>

        {/* ═══ DNA COMPLETION ═══ */}
        <View style={s.section}>
          <Pressable
            onPress={() => { haptic(); router.push("/(dna)/profile" as any); }}
            style={({ pressed }) => [s.dnaCard, pressed && { opacity: 0.88 }]}
          >
            <View style={s.dnaAccent} />
            <View style={s.dnaContent}>
              <View style={s.dnaIconWrap}>
                <MaterialIcons name="auto-awesome" size={20} color={C.purpleLight} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.dnaTitle}>Complete Your Travel DNA</Text>
                <Text style={s.dnaSub}>Unlock personalized matches</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={C.muted40} />
            </View>
          </Pressable>
        </View>

        {/* ═══ RECOMMENDED ═══ */}
        <View style={s.sectionFull}>
          <Text style={s.sectionTitle}>Recommended for You</Text>
          <FlatList
            data={RECOMMENDED}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
            snapToInterval={REC_W + 16}
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
            <Pressable
              onPress={() => { haptic(); router.push("/(points)/wallet" as any); }}
              style={({ pressed }) => [s.quickCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
            >
              <MaterialIcons name="account-balance-wallet" size={24} color={C.gold} />
              <Text style={s.quickLabel}>Wallet</Text>
              <Text style={s.quickValue}>€45</Text>
            </Pressable>
            <Pressable
              onPress={() => { haptic(); router.push("/(tabs)/explore" as any); }}
              style={({ pressed }) => [s.quickCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
            >
              <MaterialIcons name="explore" size={24} color={C.purple} />
              <Text style={s.quickLabel}>Explore</Text>
              <Text style={s.quickValue}>12 new</Text>
            </Pressable>
            <Pressable
              onPress={() => { haptic(); router.push("/(tabs)/trips" as any); }}
              style={({ pressed }) => [s.quickCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
            >
              <MaterialIcons name="luggage" size={24} color={C.pink} />
              <Text style={s.quickLabel}>Trips</Text>
              <Text style={s.quickValue}>3</Text>
            </Pressable>
          </View>
        </View>

        {/* ═══ TRAVI TIP ═══ */}
        <View style={s.section}>
          <View style={s.tipCard}>
            <Image source={require("@/assets/images/mascot-dark.png")} style={s.tipMascot} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={s.tipTitle}>TRAVI says</Text>
              <Text style={s.tipText}>
                Bali is trending this season — 96% match with your Explorer DNA. Ready to go?
              </Text>
            </View>
          </View>
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

  // Ambient
  orbPurple: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: "rgba(100,67,244,0.12)",
    top: -80,
    left: -60,
  },
  orbPink: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(249,68,152,0.06)",
    top: "55%",
    right: -80,
  },

  // Header
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.surface,
    borderWidth: 1.5,
    borderColor: "rgba(100,67,244,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: C.white, fontSize: 15, fontFamily: "Satoshi-Bold" },

  // Greeting
  greeting: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 4 },
  greetText: { fontSize: 16, fontFamily: "Satoshi-Regular", color: C.muted60 },
  greetName: { fontSize: 32, fontFamily: "Chillax-Bold", color: C.white, marginTop: 2, lineHeight: 38 },
  dnaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    backgroundColor: "rgba(100,67,244,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  dnaIcon: { color: C.purpleLight, fontSize: 12 },
  dnaLabel: { color: C.purpleLight, fontSize: 12, fontFamily: "Satoshi-Medium" },

  // Sections
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionFull: { marginTop: 28 },
  sectionTitle: {
    color: C.white,
    fontSize: 20,
    fontFamily: "Chillax-Bold",
    marginBottom: 16,
    paddingHorizontal: 20,
  },

  // Live Trip
  liveStrip: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(0,201,107,0.08)",
    borderWidth: 1,
    borderColor: "rgba(0,201,107,0.15)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  liveDotWrap: { width: 20, height: 20, justifyContent: "center", alignItems: "center" },
  liveDotOuter: { position: "absolute", width: 20, height: 20, borderRadius: 10, backgroundColor: C.green },
  liveDotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  liveLabel: { color: C.green, fontSize: 10, fontFamily: "Satoshi-Bold", letterSpacing: 1.2 },
  liveDest: { color: C.white, fontSize: 15, fontFamily: "Chillax-Bold", marginTop: 1 },

  // DNA Card
  dnaCard: {
    borderRadius: 16,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
  },
  dnaAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: C.purple,
  },
  dnaContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    paddingLeft: 16,
  },
  dnaIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(100,67,244,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  dnaTitle: { color: C.white, fontSize: 15, fontFamily: "Satoshi-Bold" },
  dnaSub: { color: C.muted40, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },

  // Quick Actions
  quickRow: { flexDirection: "row", gap: 12 },
  quickCard: {
    flex: 1,
    backgroundColor: C.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
    gap: 8,
  },
  quickLabel: { color: C.muted60, fontSize: 11, fontFamily: "Satoshi-Medium" },
  quickValue: { color: C.white, fontSize: 18, fontFamily: "Chillax-Bold" },

  // Tip
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  tipMascot: { width: 44, height: 44 },
  tipTitle: { color: C.purpleLight, fontSize: 12, fontFamily: "Satoshi-Bold", letterSpacing: 0.5, marginBottom: 4 },
  tipText: { color: C.muted60, fontSize: 13, fontFamily: "Satoshi-Regular", lineHeight: 19 },
});
