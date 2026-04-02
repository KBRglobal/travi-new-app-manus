/**
 * TRAVI — Explore Screen
 * Browse destinations with full-image cards, search, and categories.
 */

import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, TextInput, Platform,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

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
  { id: "all", label: "All", icon: "safari.fill" as const },
  { id: "beach", label: "Beach", icon: "beach.umbrella" as const },
  { id: "city", label: "City", icon: "building.2.fill" as const },
  { id: "nature", label: "Nature", icon: "leaf.fill" as const },
  { id: "culture", label: "Culture", icon: "building.columns.fill" as const },
  { id: "adventure", label: "Adventure", icon: "figure.run" as const },
];

const DESTINATIONS = [
  { id: "d1", city: "Paris", country: "France", category: "city", tag: "🔥 Hot", tagColor: "#F94498", image: IMG.paris },
  { id: "d2", city: "Maldives", country: "Maldives", category: "beach", tag: "✨ Luxury", tagColor: "#06B6D4", image: IMG.maldives },
  { id: "d3", city: "Tokyo", country: "Japan", category: "city", tag: "🌟 Iconic", tagColor: "#6443F4", image: IMG.tokyo },
  { id: "d4", city: "Santorini", country: "Greece", category: "beach", tag: "💎 Trending", tagColor: "#F94498", image: IMG.santorini },
  { id: "d5", city: "Kyoto", country: "Japan", category: "culture", tag: "🎋 Zen", tagColor: "#FF9800", image: IMG.kyoto },
  { id: "d6", city: "Bali", country: "Indonesia", category: "beach", tag: "🌴 Paradise", tagColor: "#4CAF50", image: IMG.bali },
  { id: "d7", city: "New York", country: "USA", category: "city", tag: "🗽 Classic", tagColor: "#6443F4", image: IMG.newyork },
  { id: "d8", city: "Machu Picchu", country: "Peru", category: "adventure", tag: "⛰️ Epic", tagColor: "#D97706", image: IMG.machupicchu },
  { id: "d9", city: "Phuket", country: "Thailand", category: "beach", tag: "🏝️ Tropical", tagColor: "#10B981", image: IMG.phuket },
  { id: "d10", city: "Rome", country: "Italy", category: "culture", tag: "🏛️ Historic", tagColor: "#8B5CF6", image: IMG.rome },
  { id: "d11", city: "Patagonia", country: "Argentina", category: "nature", tag: "🏔️ Wild", tagColor: "#06B6D4", image: IMG.patagonia },
  { id: "d12", city: "Iceland", country: "Iceland", category: "nature", tag: "❄️ Magical", tagColor: "#3B82F6", image: IMG.iceland },
  { id: "d13", city: "Barcelona", country: "Spain", category: "city", tag: "🎨 Artsy", tagColor: "#EC4899", image: IMG.barcelona },
  { id: "d14", city: "Dubai", country: "UAE", category: "city", tag: "🌆 Modern", tagColor: "#F59E0B", image: IMG.dubai },
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
    // Outer View fills full screen including behind status bar
    <View style={S.container}>
      <LinearGradient
        colors={["#0D0628", "#1A0A3D", "#0D0628"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* SafeAreaView handles the notch/status bar properly */}
      <SafeAreaView style={S.safeArea} edges={["top", "left", "right"]}>

        {/* Header */}
        <View style={S.header}>
          <View>
            <Text style={S.headerTitle}>Explore</Text>
            <Text style={S.headerSub}>Discover your next adventure</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={S.searchWrap}>
          <LinearGradient
            colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.04)"]}
            style={S.searchGradient}
          >
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
          </LinearGradient>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={S.categoriesScroll}
          contentContainerStyle={S.categoriesContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[S.categoryChip, activeCategory === cat.id && S.categoryChipActive]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveCategory(cat.id);
              }}
              activeOpacity={0.8}
            >
              {activeCategory === cat.id && (
                <LinearGradient
                  colors={["rgba(100,67,244,0.4)", "rgba(249,68,152,0.25)"]}
                  style={[StyleSheet.absoluteFillObject, { borderRadius: 20 }]}
                  pointerEvents="none"
                />
              )}
              <IconSymbol
                name={cat.icon}
                size={16}
                color={activeCategory === cat.id ? "#C084FC" : "#5A4D72"}
              />
              <Text style={[S.categoryLabel, activeCategory === cat.id && S.categoryLabelActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Destinations List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.scroll}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>
              {activeCategory === "all"
                ? "All Destinations"
                : CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </Text>
            <Text style={S.countBadge}>{filtered.length}</Text>
          </View>

          <View style={S.destGrid}>
            {filtered.map((dest) => (
              <TouchableOpacity
                key={dest.id}
                style={S.destCard}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  router.push({
                    pathname: "/(trip)/destination-detail",
                    params: { id: dest.city.toLowerCase().replace(/ /g, "") },
                  } as never);
                }}
                activeOpacity={0.88}
              >
                {/* Full image */}
                <Image source={dest.image} style={S.destImage} contentFit="cover" />

                {/* Gradient overlay */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.85)"]}
                  locations={[0.45, 1]}
                  style={S.destGradient}
                  pointerEvents="none"
                />

                {/* Save button */}
                <TouchableOpacity
                  style={S.saveBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleSave(dest.id);
                  }}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={savedDests.includes(dest.id) ? "heart.fill" : "heart"}
                    size={18}
                    color={savedDests.includes(dest.id) ? "#F94498" : "rgba(255,255,255,0.8)"}
                  />
                </TouchableOpacity>

                {/* Tag */}
                <View style={[S.destTag, { backgroundColor: dest.tagColor + "DD" }]}>
                  <Text style={S.destTagText}>{dest.tag}</Text>
                </View>

                {/* Bottom info */}
                <View style={S.destBottom}>
                  <Text style={S.destCity}>{dest.city}</Text>
                  <View style={S.destCountryRow}>
                    <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.6)" />
                    <Text style={S.destCountry}>{dest.country}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

      </SafeAreaView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", letterSpacing: -0.5 },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 2 },
  searchWrap: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  searchGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 15 },
  categoriesScroll: { marginBottom: 20 },
  categoriesContent: { paddingHorizontal: 20, gap: 8 },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 20,
    overflow: "hidden",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  categoryChipActive: { borderColor: "rgba(100,67,244,0.5)" },
  categoryLabel: { color: "#5A4D72", fontSize: 13, fontWeight: "600" },
  categoryLabelActive: { color: "#C084FC" },
  scroll: { paddingBottom: 40 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", letterSpacing: -0.3 },
  countBadge: { color: "rgba(255,255,255,0.35)", fontSize: 14, fontWeight: "600" },
  destGrid: { paddingHorizontal: 20, gap: 16 },
  destCard: {
    width: "100%",
    height: 280,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#1A0A3D",
  },
  destImage: { width: "100%", height: "100%", position: "absolute" },
  destGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
  },
  saveBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  destTag: {
    position: "absolute",
    top: 14,
    left: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  destTagText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  destBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 4,
  },
  destCity: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", letterSpacing: -0.5 },
  destCountryRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  destCountry: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600" },
});
