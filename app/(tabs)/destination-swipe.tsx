import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
  Dimensions, Platform, Image
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { PanResponder } from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W, height: H } = Dimensions.get("window");
const SWIPE_THRESHOLD = W * 0.35;

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  dnaMatch: number;
  tags: string[];
  bestFor: string;
  avgCost: string;
  weather: string;
  gradient: [string, string];
}

const DESTINATIONS: Destination[] = [
  { id: "d1", city: "Kyoto", country: "Japan", image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600", dnaMatch: 97, tags: ["Culture", "Nature", "Food"], bestFor: "Cultural Explorers", avgCost: "$180/day", weather: "18°C · Sunny", gradient: ["#7C2D12", "#DC2626"] },
  { id: "d2", city: "Lisbon", country: "Portugal", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600", dnaMatch: 93, tags: ["Food", "Nightlife", "History"], bestFor: "Foodies & Night Owls", avgCost: "$120/day", weather: "22°C · Partly Cloudy", gradient: ["#1E3A5F", "#2563EB"] },
  { id: "d3", city: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600", dnaMatch: 89, tags: ["Nature", "Wellness", "Beaches"], bestFor: "Nature & Wellness Seekers", avgCost: "$80/day", weather: "29°C · Tropical", gradient: ["#064E3B", "#10B981"] },
  { id: "d4", city: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600", dnaMatch: 85, tags: ["Architecture", "Food", "Beaches"], bestFor: "Architecture Lovers", avgCost: "$150/day", weather: "24°C · Sunny", gradient: ["#7C2D12", "#F59E0B"] },
  { id: "d5", city: "Marrakech", country: "Morocco", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600", dnaMatch: 82, tags: ["Culture", "Adventure", "Food"], bestFor: "Adventure Seekers", avgCost: "$90/day", weather: "28°C · Hot", gradient: ["#78350F", "#D97706"] },
  { id: "d6", city: "Reykjavik", country: "Iceland", image: "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?w=600", dnaMatch: 78, tags: ["Nature", "Adventure", "Northern Lights"], bestFor: "Nature Adventurers", avgCost: "$220/day", weather: "4°C · Aurora", gradient: ["#1E3A5F", "#6443F4"] },
];

// ─── Swipe Card ───────────────────────────────────────────────────────────────
function SwipeCard({
  dest,
  isTop,
  onSwipeLeft,
  onSwipeRight,
}: {
  dest: Destination;
  isTop: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}) {
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({ inputRange: [-W, 0, W], outputRange: ["-15deg", "0deg", "15deg"] });
  const likeOpacity = position.x.interpolate({ inputRange: [0, SWIPE_THRESHOLD / 2], outputRange: [0, 1], extrapolate: "clamp" });
  const nopeOpacity = position.x.interpolate({ inputRange: [-SWIPE_THRESHOLD / 2, 0], outputRange: [1, 0], extrapolate: "clamp" });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onPanResponderMove: (_, g) => position.setValue({ x: g.dx, y: g.dy }),
      onPanResponderRelease: (_, g) => {
        if (g.dx > SWIPE_THRESHOLD) {
          Animated.timing(position, { toValue: { x: W * 1.5, y: g.dy }, duration: 300, useNativeDriver: true }).start(onSwipeRight);
          if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else if (g.dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, { toValue: { x: -W * 1.5, y: g.dy }, duration: 300, useNativeDriver: true }).start(onSwipeLeft);
          if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
          Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[S.card, isTop && { transform: [...position.getTranslateTransform(), { rotate }] }]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      <Image source={{ uri: dest.image }} style={S.cardImage} resizeMode="cover" />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]} style={S.cardGradient} />

      {/* LIKE / NOPE overlays */}
      {isTop && (
        <>
          <Animated.View style={[S.likeStamp, { opacity: likeOpacity }]}>
            <Text style={S.likeText}>SAVE ✈️</Text>
          </Animated.View>
          <Animated.View style={[S.nopeStamp, { opacity: nopeOpacity }]}>
            <Text style={S.nopeText}>SKIP ✕</Text>
          </Animated.View>
        </>
      )}

      {/* DNA Match Badge */}
      <View style={S.matchBadge}>
        <LinearGradient colors={["#6443F4", "#F94498"]} style={S.matchBadgeGrad}>
          <Text style={S.matchBadgeText}>{dest.dnaMatch}% Match</Text>
        </LinearGradient>
      </View>

      {/* Content */}
      <View style={S.cardContent}>
        <View style={S.cardTop}>
          <Text style={S.cardCity}>{dest.city}</Text>
          <Text style={S.cardCountry}>{dest.country}</Text>
        </View>
        <View style={S.cardMeta}>
          <View style={S.metaRow}>
            <Text style={S.metaIcon}>☀️</Text>
            <Text style={S.metaText}>{dest.weather}</Text>
          </View>
          <View style={S.metaRow}>
            <Text style={S.metaIcon}>💰</Text>
            <Text style={S.metaText}>{dest.avgCost}</Text>
          </View>
        </View>
        <View style={S.tagsRow}>
          {dest.tags.map((tag) => (
            <View key={tag} style={S.tag}>
              <Text style={S.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={S.bestFor}>Best for: {dest.bestFor}</Text>
      </View>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function DestinationSwipeScreen() {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState<Destination[]>([]);
  const [lastAction, setLastAction] = useState<"save" | "skip" | null>(null);

  const current = DESTINATIONS[index];
  const next = DESTINATIONS[index + 1];

  const handleSwipeRight = () => {
    setSaved((prev) => [...prev, DESTINATIONS[index]]);
    setLastAction("save");
    setIndex((i) => i + 1);
  };

  const handleSwipeLeft = () => {
    setLastAction("skip");
    setIndex((i) => i + 1);
  };

  const handleButtonSwipe = (dir: "left" | "right") => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (dir === "right") handleSwipeRight(); else handleSwipeLeft();
  };

  if (index >= DESTINATIONS.length) {
    return (
      <View style={[S.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={S.header}>
          <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={22} color="#FFF" />
          </TouchableOpacity>
          <Text style={S.headerTitle}>Discover</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={S.doneWrap}>
          <Text style={{ fontSize: 60 }}>✈️</Text>
          <Text style={S.doneTitle}>You've seen them all!</Text>
          <Text style={S.doneSub}>You saved {saved.length} destinations. Ready to plan?</Text>
          {saved.length > 0 && (
            <TouchableOpacity style={S.planBtn} onPress={() => router.back()} activeOpacity={0.85}>
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.planBtnGrad}>
                <Text style={S.planBtnText}>Plan My Trips →</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Discover</Text>
        <View style={S.savedCount}>
          <Text style={S.savedCountText}>❤️ {saved.length}</Text>
        </View>
      </View>

      <Text style={S.subtitle}>Swipe right to save, left to skip</Text>

      {/* Card Stack */}
      <View style={S.cardStack}>
        {next && (
          <View style={[S.card, S.cardBehind]}>
            <Image source={{ uri: next.image }} style={S.cardImage} resizeMode="cover" />
            <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]} style={S.cardGradient} />
          </View>
        )}
        {current && (
          <SwipeCard
            key={current.id}
            dest={current}
            isTop
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        )}
      </View>

      {/* Action Buttons */}
      <View style={S.actionRow}>
        <TouchableOpacity style={[S.actionBtn, S.skipBtn]} onPress={() => handleButtonSwipe("left")} activeOpacity={0.8}>
          <Text style={S.skipBtnText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[S.actionBtn, S.infoBtn]}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const current = DESTINATIONS[index];
            router.push({ pathname: "/(trip)/destination-detail", params: { id: current.city.toLowerCase() } } as never);
          }}
          activeOpacity={0.8}
        >
          <IconSymbol name="info.circle.fill" size={22} color="#9BA1A6" />
        </TouchableOpacity>
        <TouchableOpacity style={[S.actionBtn, S.saveBtn]} onPress={() => handleButtonSwipe("right")} activeOpacity={0.8}>
          <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.saveBtnText}>✈️</Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <Text style={S.progress}>{index + 1} / {DESTINATIONS.length}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, paddingTop: 4 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold", flex: 1, textAlign: "center" },
  savedCount: { width: 40, alignItems: "flex-end" },
  savedCountText: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  subtitle: { color: "#5A4D72", fontSize: 13, textAlign: "center", marginBottom: 16 },

  cardStack: { flex: 1, alignItems: "center", justifyContent: "center", marginHorizontal: 16 },
  card: { position: "absolute", width: W - 32, height: H * 0.55, borderRadius: 24, overflow: "hidden", backgroundColor: "#1A0A3D" },
  cardBehind: { transform: [{ scale: 0.95 }], top: 12 },
  cardImage: { ...StyleSheet.absoluteFillObject },
  cardGradient: { ...StyleSheet.absoluteFillObject },

  likeStamp: { position: "absolute", top: 40, left: 20, borderWidth: 3, borderColor: "#22C55E", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, transform: [{ rotate: "-15deg" }] },
  likeText: { color: "#22C55E", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  nopeStamp: { position: "absolute", top: 40, right: 20, borderWidth: 3, borderColor: "#EF4444", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, transform: [{ rotate: "15deg" }] },
  nopeText: { color: "#EF4444", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },

  matchBadge: { position: "absolute", top: 16, right: 16, borderRadius: 12, overflow: "hidden" },
  matchBadgeGrad: { paddingHorizontal: 12, paddingVertical: 6 },
  matchBadgeText: { color: "#FFF", fontSize: 12, fontWeight: "800",
      fontFamily: "Chillax-Bold" },

  cardContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, gap: 8 },
  cardTop: { gap: 2 },
  cardCity: { color: "#FFF", fontSize: 32, fontWeight: "900", fontFamily: "Chillax-Bold" },
  cardCountry: { color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: "600" },
  cardMeta: { flexDirection: "row", gap: 16 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaIcon: { fontSize: 14 },
  metaText: { color: "rgba(255,255,255,0.8)", fontSize: 13 },
  tagsRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  tag: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  bestFor: { color: "rgba(255,255,255,0.6)", fontSize: 12 },

  actionRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20, paddingVertical: 20 },
  actionBtn: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  skipBtn: { backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  skipBtnText: { color: "#EF4444", fontSize: 24, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  infoBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.06)" },
  saveBtn: { width: 70, height: 70, borderRadius: 35 },
  saveBtnText: { fontSize: 28 },

  progress: { color: "#5A4D72", fontSize: 12, textAlign: "center", paddingBottom: 130 },

  doneWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, paddingHorizontal: 32 },
  doneTitle: { color: "#FFF", fontSize: 24, fontWeight: "800", fontFamily: "Chillax-Bold", textAlign: "center" },
  doneSub: { color: "#9BA1A6", fontSize: 15, textAlign: "center", lineHeight: 22 },
  planBtn: { borderRadius: 16, overflow: "hidden", marginTop: 8 },
  planBtnGrad: { paddingHorizontal: 28, paddingVertical: 16 },
  planBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
