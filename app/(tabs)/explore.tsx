/**
 * TRAVI — Explore Screen (Redesigned)
 */

import { useState } from "react";
import { useStore } from "@/lib/store";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, TextInput, Platform, ImageBackground, FlatList,
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
const CARD_HEIGHT = 260;
const HERO_HEIGHT = 320;

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "beach", label: "Beach" },
  { id: "city", label: "City" },
  { id: "nature", label: "Nature" },
  { id: "culture", label: "Culture" },
  { id: "adventure", label: "Adventure" },
];

const DESTINATIONS = [
  { id: "d1", city: "Paris", country: "France", category: "city", tag: "Hot", image: IMG.paris, tagline: "The city of eternal light", tagColor: "#F94498" },
  { id: "d2", city: "Maldives", country: "Maldives", category: "beach", tag: "Luxury", image: IMG.maldives, tagline: "Overwater bliss at the edge of the world", tagColor: "#06B6D4" },
  { id: "d3", city: "Tokyo", country: "Japan", category: "city", tag: "Iconic", image: IMG.tokyo, tagline: "Neon dreams that never sleep", tagColor: "#6443F4" },
  { id: "d4", city: "Santorini", country: "Greece", category: "beach", tag: "Trending", image: IMG.santorini, tagline: "Where sunsets stop time", tagColor: "#F94498" },
  { id: "d5", city: "Kyoto", country: "Japan", category: "culture", tag: "Zen", image: IMG.kyoto, tagline: "Ancient beauty, modern soul", tagColor: "#FF9800" },
  { id: "d6", city: "Bali", country: "Indonesia", category: "beach", tag: "Paradise", image: IMG.bali, tagline: "Find your inner peace", tagColor: "#4CAF50" },
  { id: "d7", city: "New York", country: "USA", category: "city", tag: "Classic", image: IMG.newyork, tagline: "The city that never sleeps", tagColor: "#6443F4" },
  { id: "d8", city: "Machu Picchu", country: "Peru", category: "adventure", tag: "Epic", image: IMG.machupicchu, tagline: "Lost city of the Incas", tagColor: "#D97706" },
  { id: "d9", city: "Phuket", country: "Thailand", category: "beach", tag: "Tropical", image: IMG.phuket, tagline: "Crystal waters, endless summer", tagColor: "#10B981" },
  { id: "d10", city: "Rome", country: "Italy", category: "culture", tag: "Historic", image: IMG.rome, tagline: "All roads lead here", tagColor: "#8B5CF6" },
  { id: "d11", city: "Patagonia", country: "Argentina", category: "nature", tag: "Wild", image: IMG.patagonia, tagline: "The edge of the world", tagColor: "#06B6D4" },
  { id: "d12", city: "Iceland", country: "Iceland", category: "nature", tag: "Magical", image: IMG.iceland, tagline: "Fire, ice, and the northern lights", tagColor: "#3B82F6" },
  { id: "d13", city: "Barcelona", country: "Spain", category: "city", tag: "Artsy", image: IMG.barcelona, tagline: "Gaudí's masterpiece on the Med", tagColor: "#EC4899" },
  { id: "d14", city: "Dubai", country: "UAE", category: "city", tag: "Featured", image: IMG.dubai, tagline: "Where dreams touch the sky", tagColor: "#F59E0B" },
];

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
  const dnaScores = state.profile?.dnaScores as Record<string, number> | undefined;

  const filtered = DESTINATIONS.filter((d) => {
    const matchCat = activeCategory === "all" || d.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredDest = DESTINATIONS.find((d) => d.id === "d14")!; // Dubai as featured
  const listDests = filtered.filter((d) => d.id !== "d14" || activeCategory !== "all" || searchQuery);

  const toggleSave = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSavedDests((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
  };

  const goToDestination = (dest: typeof DESTINATIONS[0]) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: "/(trip)/destination-detail", params: { id: dest.city.toLowerCase().replace(/ /g, "") } } as never);
  };

  return (
    <View style={S.container}>
      <LinearGradient
        colors={["#0D0820", "#1A0D3D", "#0D0820"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={S.safeArea} edges={["top", "left", "right"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.scrollContent}>

          {/* ── Header ── */}
          <View style={S.header}>
            <Text style={S.headerTitle}>Where to?</Text>
            {/* Search Bar */}
            <View style={S.searchWrap}>
              <IconSymbol name="magnifyingglass" size={18} color="#9BA1A6" />
              <TextInput
                style={S.searchInput}
                placeholder="Search destinations..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")} activeOpacity={0.7}>
                  <IconSymbol name="xmark.circle.fill" size={18} color="rgba(255,255,255,0.4)" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* ── Category Chips ── */}
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
                {activeCategory === cat.id && (
                  <LinearGradient
                    colors={["#6443F4", "#F94498"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                )}
                <Text style={[S.chipText, activeCategory === cat.id && S.chipTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── Featured Hero Card ── */}
          {activeCategory === "all" && !searchQuery && (
            <TouchableOpacity
              style={S.heroCard}
              onPress={() => goToDestination(featuredDest)}
              activeOpacity={0.92}
            >
              <ImageBackground
                source={featuredDest.image}
                style={S.heroCardBg}
                imageStyle={S.heroCardImg}
                resizeMode="cover"
              >
                {/* Dark gradient overlay */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.0)", "rgba(0,0,0,0.88)"]}
                  locations={[0, 0.45, 1]}
                  style={StyleSheet.absoluteFillObject}
                />
                {/* Top tint */}
                <LinearGradient
                  colors={["rgba(249,68,152,0.18)", "transparent"]}
                  locations={[0, 0.6]}
                  style={StyleSheet.absoluteFillObject}
                />

                {/* Featured badge */}
                <View style={S.featuredBadge}>
                  <LinearGradient
                    colors={["#6443F4", "#F94498"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                  <Text style={S.featuredBadgeText}>FEATURED</Text>
                </View>

                {/* Save button */}
                <TouchableOpacity
                  style={S.heroSaveBtn}
                  onPress={(e) => { e.stopPropagation(); toggleSave(featuredDest.id); }}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={savedDests.includes(featuredDest.id) ? "heart.fill" : "heart"}
                    size={20}
                    color={savedDests.includes(featuredDest.id) ? "#F94498" : "rgba(255,255,255,0.9)"}
                  />
                </TouchableOpacity>

                {/* Info */}
                <View style={S.heroInfo}>
                  <Text style={S.heroTagline}>{featuredDest.tagline}</Text>
                  <Text style={S.heroCity}>{featuredDest.city}</Text>
                  <View style={S.heroMeta}>
                    <View style={S.heroMetaLeft}>
                      <IconSymbol name="location.fill" size={13} color="rgba(255,255,255,0.65)" />
                      <Text style={S.heroCountry}>{featuredDest.country}</Text>
                    </View>
                    <View style={S.cashbackBadge}>
                      <Text style={S.cashbackText}>Up to $120 cashback</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}

          {/* ── Section Header ── */}
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>
              {activeCategory === "all" && !searchQuery
                ? "All Destinations"
                : searchQuery
                ? `Results for "${searchQuery}"`
                : CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </Text>
            <Text style={S.sectionCount}>{filtered.length}</Text>
          </View>

          {/* ── Destination Cards ── */}
          {listDests.map((dest) => {
            const compat = dnaCompatibility(dest.category, dnaScores);
            const isSaved = savedDests.includes(dest.id);
            return (
              <TouchableOpacity
                key={dest.id}
                style={S.card}
                onPress={() => goToDestination(dest)}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={dest.image}
                  style={S.cardBg}
                  imageStyle={S.cardImg}
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.0)", "rgba(0,0,0,0.86)"]}
                    locations={[0, 0.4, 1]}
                    style={StyleSheet.absoluteFillObject}
                  />

                  {/* Tag pill */}
                  <View style={[S.tagPill, { backgroundColor: dest.tagColor + "D8" }]}>
                    <Text style={S.tagPillText}>{dest.tag}</Text>
                  </View>

                  {/* Save */}
                  <TouchableOpacity
                    style={S.saveBtn}
                    onPress={(e) => { e.stopPropagation(); toggleSave(dest.id); }}
                    activeOpacity={0.7}
                  >
                    <IconSymbol
                      name={isSaved ? "heart.fill" : "heart"}
                      size={18}
                      color={isSaved ? "#F94498" : "rgba(255,255,255,0.9)"}
                    />
                  </TouchableOpacity>

                  {/* DNA match */}
                  {dnaScores && compat > 0 && (
                    <View style={[S.compatBadge, { backgroundColor: compat >= 75 ? "rgba(2,166,92,0.85)" : compat >= 50 ? "rgba(245,158,11,0.85)" : "rgba(155,161,166,0.7)" }]}>
                      <Text style={S.compatText}>{compat}% match</Text>
                    </View>
                  )}

                  {/* Info */}
                  <View style={S.cardInfo}>
                    <Text style={S.cardTagline}>{dest.tagline}</Text>
                    <Text style={S.cardCity}>{dest.city}</Text>
                    <View style={S.cardMeta}>
                      <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.6)" />
                      <Text style={S.cardCountry}>{dest.country}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}

          {/* Empty state */}
          {listDests.length === 0 && (
            <View style={S.emptyState}>
              <IconSymbol name="magnifyingglass" size={40} color="rgba(255,255,255,0.2)" />
              <Text style={S.emptyTitle}>No destinations found</Text>
              <Text style={S.emptyText}>Try a different search or category</Text>
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
      <AgentFAB />
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0820" },
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Header
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16, gap: 14 },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
    fontFamily: "Chillax-Bold",
  },

  // Search
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Satoshi-Regular",
  },

  // Chips
  chipsScroll: { flexGrow: 0, marginBottom: 20 },
  chipsRow: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  chipActive: {
    borderColor: "transparent",
  },
  chipText: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Chillax-Semibold",
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Hero card
  heroCard: {
    marginHorizontal: 20,
    height: HERO_HEIGHT,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 24,
  },
  heroCardBg: { flex: 1, justifyContent: "flex-end" },
  heroCardImg: { borderRadius: 28 },
  featuredBadge: {
    position: "absolute",
    top: 18,
    left: 18,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: "hidden",
  },
  featuredBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "Chillax-Bold",
  },
  heroSaveBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  heroInfo: { padding: 22, gap: 4 },
  heroTagline: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    fontStyle: "italic",
    fontFamily: "Satoshi-Regular",
  },
  heroCity: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: -1.5,
    lineHeight: 44,
    fontFamily: "Chillax-Bold",
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  heroMetaLeft: { flexDirection: "row", alignItems: "center", gap: 5 },
  heroCountry: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Satoshi-Medium",
  },
  cashbackBadge: {
    backgroundColor: "rgba(255,215,18,0.15)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,215,18,0.35)",
  },
  cashbackText: {
    color: "#FFD712",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Satoshi-Bold",
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.3,
    fontFamily: "Chillax-Bold",
  },
  sectionCount: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Chillax-Semibold",
  },

  // Destination cards
  card: {
    marginHorizontal: 20,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
  },
  cardBg: { flex: 1, justifyContent: "flex-end" },
  cardImg: { borderRadius: 24 },

  tagPill: {
    position: "absolute",
    top: 16,
    left: 16,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagPillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
    letterSpacing: 0.5,
  },

  saveBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  compatBadge: {
    position: "absolute",
    bottom: 60,
    left: 14,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  compatText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
  },

  cardInfo: { padding: 18, gap: 3 },
  cardTagline: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontStyle: "italic",
    fontFamily: "Satoshi-Regular",
  },
  cardCity: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
    lineHeight: 32,
    fontFamily: "Chillax-Bold",
  },
  cardMeta: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  cardCountry: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Satoshi-Medium",
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: "Chillax-Bold",
  },
  emptyText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Satoshi-Regular",
  },
});
