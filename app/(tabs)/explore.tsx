/**
 * TRAVI — Explore Screen
 */

import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, TextInput, Platform,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "beach", label: "🏖️ Beach" },
  { id: "city", label: "🏙️ City" },
  { id: "nature", label: "🌿 Nature" },
  { id: "culture", label: "🏛️ Culture" },
  { id: "adventure", label: "⛰️ Adventure" },
];

// Real destinations from travi.world with CDN images
const DESTINATIONS = [
  { id: "d1", city: "Paris", country: "France", category: "city", tag: "🔥 Hot", tagColor: "#F94498", image: "https://travi.world/cards/paris.webp" },
  { id: "d2", city: "Dubai", country: "UAE", category: "city", tag: "✨ Luxury", tagColor: "#F59E0B", image: "https://travi.world/cards/dubai.webp" },
  { id: "d3", city: "Tokyo", country: "Japan", category: "city", tag: "🌟 Iconic", tagColor: "#6443F4", image: "https://travi.world/cards/tokyo.webp" },
  { id: "d4", city: "New York", country: "USA", category: "city", tag: "🗽 Classic", tagColor: "#6443F4", image: "https://travi.world/cards/new-york.webp" },
  { id: "d5", city: "London", country: "UK", category: "city", tag: "👑 Royal", tagColor: "#8B5CF6", image: "https://travi.world/cards/london.webp" },
  { id: "d6", city: "Barcelona", country: "Spain", category: "city", tag: "🎨 Artsy", tagColor: "#EC4899", image: "https://travi.world/cards/barcelona.webp" },
  { id: "d7", city: "Singapore", country: "Singapore", category: "city", tag: "🌿 Garden", tagColor: "#10B981", image: "https://travi.world/cards/singapore.webp" },
  { id: "d8", city: "Bangkok", country: "Thailand", category: "city", tag: "🛕 Temple", tagColor: "#FF9800", image: "https://travi.world/cards/bangkok.webp" },
  { id: "d9", city: "Rome", country: "Italy", category: "culture", tag: "🏛️ Historic", tagColor: "#8B5CF6", image: "https://travi.world/cards/rome.webp" },
  { id: "d10", city: "Istanbul", country: "Turkey", category: "culture", tag: "🕌 Exotic", tagColor: "#D97706", image: "https://travi.world/cards/istanbul.webp" },
  { id: "d11", city: "Amsterdam", country: "Netherlands", category: "city", tag: "🚲 Charming", tagColor: "#06B6D4", image: "https://travi.world/cards/amsterdam.webp" },
  { id: "d12", city: "Miami", country: "USA", category: "beach", tag: "🌴 Beach", tagColor: "#10B981", image: "https://travi.world/cards/miami.webp" },
  { id: "d13", city: "Las Vegas", country: "USA", category: "city", tag: "🎰 Vegas", tagColor: "#F59E0B", image: "https://travi.world/cards/las-vegas.webp" },
  { id: "d14", city: "Los Angeles", country: "USA", category: "city", tag: "🎬 Hollywood", tagColor: "#EC4899", image: "https://travi.world/cards/los-angeles.webp" },
  { id: "d15", city: "Hong Kong", country: "China", category: "city", tag: "🌆 Skyline", tagColor: "#3B82F6", image: "https://travi.world/cards/hong-kong.webp" },
  { id: "d16", city: "Abu Dhabi", country: "UAE", category: "city", tag: "💎 Luxury", tagColor: "#F59E0B", image: "https://travi.world/cards/abu-dhabi.webp" },
];

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedDests, setSavedDests] = useState<string[]>([]);

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
          <View style={S.listHeader}>
            <Text style={S.listTitle}>
              {activeCategory === "all"
                ? "All Destinations"
                : CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </Text>
            <Text style={S.listCount}>{filtered.length}</Text>
          </View>

          {filtered.length === 0 && (
            <View style={S.emptyState}>
              <Text style={S.emptyIcon}>🌍</Text>
              <Text style={S.emptyTitle}>No destinations found</Text>
              <Text style={S.emptySub}>Try a different category or search term</Text>
              <TouchableOpacity
                style={S.emptyReset}
                onPress={() => { setActiveCategory("all"); setSearchQuery(""); }}
                activeOpacity={0.8}
              >
                <Text style={S.emptyResetText}>Show all destinations</Text>
              </TouchableOpacity>
            </View>
          )}

          {filtered.map((dest) => (
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
              <Image
                source={{ uri: dest.image }}
                style={S.cardBg}
                contentFit="cover"
                transition={200}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.82)"]}
                locations={[0.4, 1]}
                style={StyleSheet.absoluteFillObject}
                pointerEvents="none"
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

              {/* Info */}
              <View style={S.cardInfo}>
                <Text style={S.cardCity}>{dest.city}</Text>
                <View style={S.cardCountryRow}>
                  <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.65)" />
                  <Text style={S.cardCountry}>{dest.country}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  safeArea: { flex: 1 },

  header: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 14 },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", letterSpacing: -0.5 },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 2 },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 15 },

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
  chipText: { color: "#9BA1A6", fontSize: 13, fontWeight: "600" },
  chipTextActive: { color: "#C084FC", fontWeight: "700" },

  listContent: { paddingHorizontal: 20 },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  listTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", letterSpacing: -0.3 },
  listCount: { color: "rgba(255,255,255,0.35)", fontSize: 14, fontWeight: "600" },

  card: {
    width: "100%",
    height: 280,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 16,
  },
  cardBg: { 
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  tag: {
    position: "absolute",
    top: 14,
    left: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },

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

  cardInfo: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, gap: 4 },
  cardCity: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", letterSpacing: -0.5 },
  cardCountryRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  cardCountry: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600" },

  // Empty state
  emptyState: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  emptySub: { color: "rgba(255,255,255,0.4)", fontSize: 14, textAlign: "center" },
  emptyReset: { marginTop: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, backgroundColor: "rgba(100,67,244,0.3)", borderWidth: 1, borderColor: "rgba(100,67,244,0.5)" },
  emptyResetText: { color: "#C084FC", fontSize: 14, fontWeight: "700" },
});
