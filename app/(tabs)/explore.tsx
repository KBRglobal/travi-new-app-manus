/**
 * TRAVI — Explore Screen
 */

import { useState } from "react";
import { useStore } from "@/lib/store";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, TextInput, Platform, ImageBackground,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { AgentFAB } from "@/components/agent-fab";

const IMG = {
  santorini: require("@/assets/destinations/santorini.jpg"),
  kyoto: require("@/assets/destinations/kyoto.jpg"),
  bali: require("@/assets/destinations/bali.jpg"),
  paris: require("@/assets/destinations/paris.jpg"),
  maldives: require("@/assets/destinations/maldives.jpg"),
  newyork: require("@/assets/destinations/newyork.jpg"),
  machupicchu: require("@/assets/destinations/machupicchu.jpg"),
  phuket: require("@/assets/destinations/phuket.jpg"),
  rome: require("@/assets/destinations/rome.jpg"),
  patagonia: require("@/assets/destinations/patagonia.jpg"),
  tokyo: require("@/assets/destinations/tokyo.jpg"),
  iceland: require("@/assets/destinations/iceland.jpg"),
  barcelona: require("@/assets/destinations/barcelona.jpg"),
  dubai: require("@/assets/destinations/dubai.jpg"),
};

const { width } = Dimensions.get("window");

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "beach", label: "🏖️ Beach" },
  { id: "city", label: "🏙️ City" },
  { id: "nature", label: "🌿 Nature" },
  { id: "culture", label: "🏛️ Culture" },
  { id: "adventure", label: "⛰️ Adventure" },
];

const DESTINATIONS = [
  { id: "d1", city: "Paris", country: "France", category: "city", tag: "🔥 Hot", tagColor: "#F94498", image: IMG.paris, tagline: "The city of eternal light" },
  { id: "d2", city: "Maldives", country: "Maldives", category: "beach", tag: "✨ Luxury", tagColor: "#06B6D4", image: IMG.maldives, tagline: "Overwater bliss at the edge of the world" },
  { id: "d3", city: "Tokyo", country: "Japan", category: "city", tag: "🌟 Iconic", tagColor: "#6443F4", image: IMG.tokyo, tagline: "Neon dreams that never sleep" },
  { id: "d4", city: "Santorini", country: "Greece", category: "beach", tag: "💎 Trending", tagColor: "#F94498", image: IMG.santorini, tagline: "Where sunsets stop time" },
  { id: "d5", city: "Kyoto", country: "Japan", category: "culture", tag: "🎋 Zen", tagColor: "#FF9800", image: IMG.kyoto, tagline: "Ancient beauty, modern soul" },
  { id: "d6", city: "Bali", country: "Indonesia", category: "beach", tag: "🌴 Paradise", tagColor: "#4CAF50", image: IMG.bali, tagline: "Find your inner peace" },
  { id: "d7", city: "New York", country: "USA", category: "city", tag: "🗽 Classic", tagColor: "#6443F4", image: IMG.newyork, tagline: "The city that never sleeps" },
  { id: "d8", city: "Machu Picchu", country: "Peru", category: "adventure", tag: "⛰️ Epic", tagColor: "#D97706", image: IMG.machupicchu, tagline: "Lost city of the Incas" },
  { id: "d9", city: "Phuket", country: "Thailand", category: "beach", tag: "🏝️ Tropical", tagColor: "#10B981", image: IMG.phuket, tagline: "Crystal waters, endless summer" },
  { id: "d10", city: "Rome", country: "Italy", category: "culture", tag: "🏛️ Historic", tagColor: "#8B5CF6", image: IMG.rome, tagline: "All roads lead here" },
  { id: "d11", city: "Patagonia", country: "Argentina", category: "nature", tag: "🏔️ Wild", tagColor: "#06B6D4", image: IMG.patagonia, tagline: "The edge of the world" },
  { id: "d12", city: "Iceland", country: "Iceland", category: "nature", tag: "❄️ Magical", tagColor: "#3B82F6", image: IMG.iceland, tagline: "Fire, ice, and the northern lights" },
  { id: "d13", city: "Barcelona", country: "Spain", category: "city", tag: "🎨 Artsy", tagColor: "#EC4899", image: IMG.barcelona, tagline: "Gaudí's masterpiece on the Med" },
  { id: "d14", city: "Dubai", country: "UAE", category: "city", tag: "🌆 Modern", tagColor: "#F59E0B", image: IMG.dubai, tagline: "Where dreams touch the sky" },
];

// DNA compatibility weights per destination category
const DNA_WEIGHTS: Record<string, Partial<Record<string, number>>> = {
  beach:     { relaxer: 40, naturalist: 30, photographer: 20, adventurer: 10 },
  city:      { explorer: 35, foodie: 25, culturalist: 25, photographer: 15 },
  culture:   { culturalist: 40, historian: 35, photographer: 15, explorer: 10 },
  adventure: { adventurer: 45, explorer: 30, naturalist: 15, photographer: 10 },
  nature:    { naturalist: 45, adventurer: 25, photographer: 20, relaxer: 10 },
};

function dnaCompatibility(category: string, scores?: Record<string, number>): number {
  if (!scores) return 0;
  const w = DNA_WEIGHTS[category] ?? {};
  let s = 0, t = 0;
  for (const [k, v] of Object.entries(w)) { s += ((scores[k] ?? 0) / 100) * (v as number); t += v as number; }
  return t > 0 ? Math.round((s / t) * 100) : 0;
}

export default function ExploreScreen() {
  const { state } = useStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedDests, setSavedDests] = useState<string[]>([]);
  const [gridMode, setGridMode] = useState(false);
  const [showGuestSaveBanner, setShowGuestSaveBanner] = useState(false);
  const dnaScores = state.profile?.dnaScores as Record<string, number> | undefined;

  const filtered = DESTINATIONS.filter((d) => {
    const matchCat = activeCategory === "all" || d.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleSave = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSavedDests((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
    if (state.isGuest && !savedDests.includes(id)) {
      setShowGuestSaveBanner(true);
      setTimeout(() => setShowGuestSaveBanner(false), 4000);
    }
  };

  return (
    <View style={S.container}>
      <LinearGradient
        colors={["#0D0628", "#1A0A3D", "#0D0628"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={S.safeArea} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={S.header}>
          <Text style={S.headerTitle}>Explore</Text>
          <Text style={S.headerSub}>Discover your next adventure</Text>
        </View>

        {/* Guest save banner */}
        {showGuestSaveBanner && (
          <TouchableOpacity
            style={S.guestBanner}
            onPress={() => { setShowGuestSaveBanner(false); router.push("/(auth)/splash" as never); }}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.15)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <IconSymbol name="heart.fill" size={16} color="#F94498" />
            <Text style={S.guestBannerText}>Create an account to save favorites</Text>
            <IconSymbol name="chevron.right" size={14} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>
        )}

        {/* Search */}
        <View style={S.searchWrap}>
          <IconSymbol name="magnifyingglass" size={18} color="#9BA1A6" />
          <TextInput
            style={S.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor="#5A4D72"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} activeOpacity={0.7}>
              <IconSymbol name="xmark.circle.fill" size={18} color="#5A4D72" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={S.chipsRow}
          style={S.chipsScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[S.chip, activeCategory === cat.id && S.chipActive]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveCategory(cat.id);
              }}
              activeOpacity={0.75}
            >
              <Text style={[S.chipText, activeCategory === cat.id && S.chipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Destinations */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={S.listContent}
        >
          {/* Featured Hero Card — shown only in All view */}
          {activeCategory === "all" && !searchQuery && (
            <TouchableOpacity
              style={S.heroCard}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push({ pathname: "/(trip)/destination-detail", params: { id: "dubai" } } as never);
              }}
              activeOpacity={0.9}
            >
              <ImageBackground source={IMG.dubai} style={S.heroCardBg} imageStyle={S.heroCardImg} resizeMode="cover">
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.92)"]} locations={[0.3, 1]} style={StyleSheet.absoluteFillObject} />
                <LinearGradient colors={["rgba(249,68,152,0.3)", "transparent"]} locations={[0, 0.5]} style={StyleSheet.absoluteFillObject} />
                <View style={S.heroCardBadge}>
                  <Text style={S.heroCardBadgeText}>🌟 FEATURED</Text>
                </View>
                <View style={S.heroCardInfo}>
                  <Text style={S.heroCardTagline}>Where dreams touch the sky</Text>
                  <Text style={S.heroCardCity}>Dubai</Text>
                  <View style={S.heroCardRow}>
                    <IconSymbol name="location.fill" size={13} color="rgba(255,255,255,0.7)" />
                    <Text style={S.heroCardCountry}>United Arab Emirates</Text>
                    <View style={S.heroCardCashback}>
                      <Text style={S.heroCardCashbackText}>💰 Up to $120 cashback</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}

          {/* South America Hub Banner — only in All view */}
          {activeCategory === "all" && !searchQuery && (
            <TouchableOpacity style={S.regionBanner} onPress={() => router.push("/(tabs)/south-america-hub" as never)} activeOpacity={0.88}>
              <LinearGradient colors={["rgba(34,197,94,0.2)", "rgba(6,182,212,0.15)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.regionBannerGradient}>
                <Text style={S.regionBannerEmoji}>🌎</Text>
                <View style={S.regionBannerInfo}>
                  <Text style={S.regionBannerTitle}>South America Hub</Text>
                  <Text style={S.regionBannerSub}>Brazil · Argentina · Colombia · Peru · Chile</Text>
                </View>
                <Text style={S.regionBannerArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          <View style={S.listHeader}>
            <Text style={S.listTitle}>
              {activeCategory === "all"
                ? "All Destinations"
                : CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={S.listCount}>{filtered.length}</Text>
              <TouchableOpacity
                onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setGridMode((g) => !g); }}
                style={S.gridToggle}
                activeOpacity={0.7}
              >
                <IconSymbol name={gridMode ? "rectangle.grid.1x2.fill" : "square.grid.2x2.fill"} size={18} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>
          </View>

          {gridMode ? (
            <View style={S.grid}>
              {filtered.map((dest) => (
                <TouchableOpacity
                  key={dest.id}
                  style={S.gridCard}
                  onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); router.push({ pathname: "/(trip)/destination-detail", params: { id: dest.city.toLowerCase().replace(/ /g, "") } } as never); }}
                  activeOpacity={0.88}
                >
                  <ImageBackground source={dest.image} style={S.gridCardBg} imageStyle={S.gridCardImg} resizeMode="cover">
                    <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} locations={[0.4, 1]} style={StyleSheet.absoluteFillObject} />
                    <View style={[S.gridTag, { backgroundColor: dest.tagColor + "D0" }]}>
                      <Text style={S.gridTagText}>{dest.tag}</Text>
                    </View>
                    <TouchableOpacity style={S.gridSaveBtn} onPress={(e) => { e.stopPropagation(); toggleSave(dest.id); }} activeOpacity={0.7}>
                      <IconSymbol name={savedDests.includes(dest.id) ? "heart.fill" : "heart"} size={14} color={savedDests.includes(dest.id) ? "#F94498" : "rgba(255,255,255,0.85)"} />
                    </TouchableOpacity>
                    <View style={S.gridCardInfo}>
                      <Text style={S.gridCardCity}>{dest.city}</Text>
                      <Text style={S.gridCardCountry}>{dest.country}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          {!gridMode && filtered.map((dest) => (
            <TouchableOpacity
              key={dest.id}
              style={S.card}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push({
                  pathname: "/(trip)/destination-detail",
                  params: { id: dest.city.toLowerCase().replace(/ /g, "") },
                } as never);
              }}
              activeOpacity={0.88}
            >
              <ImageBackground
                source={dest.image}
                style={S.cardBg}
                imageStyle={S.cardImg}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.82)"]}
                  locations={[0.4, 1]}
                  style={StyleSheet.absoluteFillObject}
                />

                {/* Tag */}
                <View style={[S.tag, { backgroundColor: dest.tagColor + "E0" }]}>
                  <Text style={S.tagText}>{dest.tag}</Text>
                </View>

                {/* Save */}
                <TouchableOpacity
                  style={S.saveBtn}
                  onPress={(e) => { e.stopPropagation(); toggleSave(dest.id); }}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={savedDests.includes(dest.id) ? "heart.fill" : "heart"}
                    size={18}
                    color={savedDests.includes(dest.id) ? "#F94498" : "rgba(255,255,255,0.85)"}
                  />
                </TouchableOpacity>

                {/* DNA Compatibility badge */}
                {dnaScores && (() => {
                  const compat = dnaCompatibility(dest.category, dnaScores);
                  if (compat === 0) return null;
                  const color = compat >= 75 ? "#02A65C" : compat >= 50 ? "#F59E0B" : "#9BA1A6";
                  return (
                    <View style={[S.compatBadge, { backgroundColor: color + "CC" }]}>
                      <Text style={S.compatText}>{compat}% match</Text>
                    </View>
                  );
                })()}

                {/* Info */}
                <View style={S.cardInfo}>
                  <Text style={S.cardCity}>{dest.city}</Text>
                  <View style={S.cardCountryRow}>
                    <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.65)" />
                    <Text style={S.cardCountry}>{dest.country}</Text>
                  </View>
                  {dest.tagline ? (
                    <Text style={S.cardTagline}>{dest.tagline}</Text>
                  ) : null}
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}

          {!gridMode && null}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
      <AgentFAB />
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  safeArea: { flex: 1 },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 2, fontFamily: "Satoshi-Regular" },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 15, fontFamily: "Satoshi-Regular" },

  chipsScroll: { flexGrow: 0, marginBottom: 18 },
  chipsRow: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  chipActive: {
    backgroundColor: "rgba(100,67,244,0.35)",
    borderColor: "#6443F4",
  },
  chipText: { color: "#9BA1A6", fontSize: 13, fontWeight: "600", fontFamily: "Chillax-Semibold" },
  chipTextActive: { color: "#C084FC", fontWeight: "700", fontFamily: "Chillax-Semibold" },

  listContent: { paddingHorizontal: 20, paddingBottom: 130 },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  listTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", letterSpacing: -0.3, fontFamily: "Chillax-Bold" },
  listCount: { color: "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: "600", fontFamily: "Chillax-Semibold" },

  card: {
    width: "100%",
    height: 220,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 14,
  },
  cardBg: { flex: 1, justifyContent: "flex-end" },
  cardImg: { borderRadius: 22 },

  tag: {
    position: "absolute",
    top: 14,
    left: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },

  saveBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  cardInfo: { padding: 16, gap: 4 },
  cardCity: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  cardCountryRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  cardCountry: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  cardTagline: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontStyle: "italic", marginTop: 2, fontFamily: "Satoshi-Regular" },

  gridToggle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridCard: {
    width: (width - 40 - 12) / 2,
    height: 180,
    borderRadius: 18,
    overflow: "hidden",
  },
  gridCardBg: { flex: 1, justifyContent: "flex-end" },
  gridCardImg: { borderRadius: 18 },
  gridTag: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  gridTagText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800", fontFamily: "Chillax-Bold" },
  gridSaveBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  gridCardInfo: { padding: 10, gap: 2 },
  gridCardCity: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", letterSpacing: -0.3, fontFamily: "Chillax-Bold" },
  gridCardCountry: { color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: "600", fontFamily: "Satoshi-Medium" },

  emptyState: { alignItems: "center", paddingTop: 60, paddingHorizontal: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", textAlign: "center", fontFamily: "Chillax-Bold" },
  emptyText: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", marginTop: 8, lineHeight: 20, fontFamily: "Satoshi-Regular" },
  heroCard: { width: "100%", height: 280, borderRadius: 24, overflow: "hidden", marginBottom: 20 },
  heroCardBg: { flex: 1, justifyContent: "flex-end" },
  heroCardImg: { borderRadius: 24 },
  heroCardBadge: { position: "absolute", top: 16, left: 16, backgroundColor: "rgba(249,68,152,0.85)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  heroCardBadgeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", letterSpacing: 1 },
  heroCardInfo: { padding: 20, gap: 4 },
  heroCardTagline: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontStyle: "italic", fontFamily: "Satoshi-Regular" },
  heroCardCity: { color: "#FFFFFF", fontSize: 36, fontWeight: "900", letterSpacing: -1, lineHeight: 42, fontFamily: "Chillax-Bold" },
  heroCardRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  heroCardCountry: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600", flex: 1, fontFamily: "Satoshi-Medium" },
  heroCardCashback: { backgroundColor: "rgba(255,215,18,0.2)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(255,215,18,0.3)" },
  heroCardCashbackText: { color: "#FFD712", fontSize: 11, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  emptyBtn: { marginTop: 24, borderRadius: 14, overflow: "hidden" },
  emptyBtnGrad: { paddingHorizontal: 24, paddingVertical: 12 },
  emptyBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  compatBadge: { position: "absolute", bottom: 52, left: 12, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  compatText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800",
      fontFamily: "Chillax-Bold", letterSpacing: 0.5 },
  regionBanner: { marginHorizontal: 16, marginBottom: 12, borderRadius: 14, overflow: "hidden" },
  regionBannerGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12, borderWidth: 1, borderColor: "rgba(34,197,94,0.2)", borderRadius: 14 },
  regionBannerEmoji: { fontSize: 28 },
  regionBannerInfo: { flex: 1, gap: 2 },
  regionBannerTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", fontFamily: "Chillax-Bold" },
  regionBannerSub: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Satoshi-Regular" },
  regionBannerArrow: { color: "rgba(255,255,255,0.5)", fontSize: 18, fontWeight: "700",
      fontFamily: "Chillax-Semibold" },

  // Guest save banner
  guestBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(249,68,152,0.3)",
  },
  guestBannerText: { flex: 1, color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },
});
