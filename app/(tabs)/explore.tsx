/**
 * TRAVI — Explore Screen (Neutral Mockup)
 * Clean, minimal dark theme. Focus on UX and information.
 */
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, TextInput, ImageBackground, FlatList, Platform,
} from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const N = {
  bg:         "#111111",
  surface:    "#1C1C1E",
  surfaceAlt: "#2C2C2E",
  border:     "rgba(255,255,255,0.10)",
  white:      "#FFFFFF",
  textPri:    "#FFFFFF",
  textSec:    "#ABABAB",
  textMuted:  "#777777",
  accent:     "#007AFF",
  green:      "#34C759",
  orange:     "#FF9500",
};

const FILTERS = ["All", "Beach", "Adventure", "Culture", "Food", "Wellness", "City", "Nature", "Luxury"];

const DESTINATIONS = [
  { id: "1", city: "Bali",       country: "Indonesia", match: 96, price: "€850",  days: "7-10", tags: ["Adventure", "Nature"],  image: require("@/assets/destinations/bali.jpg"),      trending: false },
  { id: "2", city: "Santorini",  country: "Greece",    match: 91, price: "€1,200", days: "5-7", tags: ["Romance", "Sunsets"],   image: require("@/assets/destinations/santorini.jpg"), trending: true },
  { id: "3", city: "Kyoto",      country: "Japan",     match: 88, price: "€950",  days: "7-10", tags: ["Culture", "History"],   image: require("@/assets/destinations/kyoto.jpg"),     trending: false },
  { id: "4", city: "Paris",      country: "France",    match: 85, price: "€780",  days: "4-6",  tags: ["Romance", "Art"],       image: require("@/assets/destinations/paris.jpg"),     trending: true },
  { id: "5", city: "Maldives",   country: "Maldives",  match: 82, price: "€2,100", days: "5-8", tags: ["Beach", "Luxury"],     image: require("@/assets/destinations/maldives.jpg"),  trending: false },
  { id: "6", city: "Dubai",      country: "UAE",       match: 79, price: "€650",  days: "4-6",  tags: ["City", "Luxury"],       image: require("@/assets/destinations/dubai.jpg"),     trending: true },
];

const HIDDEN_GEMS = [
  { id: "g1", city: "Faroe Islands", country: "Denmark",    image: require("@/assets/destinations/bali.jpg"),      price: "€1,100" },
  { id: "g2", city: "Kotor",         country: "Montenegro", image: require("@/assets/destinations/santorini.jpg"), price: "€480" },
  { id: "g3", city: "Tbilisi",       country: "Georgia",    image: require("@/assets/destinations/kyoto.jpg"),     price: "€390" },
  { id: "g4", city: "Luang Prabang", country: "Laos",       image: require("@/assets/destinations/paris.jpg"),     price: "€620" },
];

function DestCard({ item }: { item: typeof DESTINATIONS[0] }) {
  const [saved, setSaved] = useState(false);
  return (
    <View style={S.destCard}>
      <ImageBackground source={item.image} style={S.destImage} imageStyle={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }} resizeMode="cover">
        <View style={S.destOverlay} />
        <View style={S.matchBadge}>
          <Text style={S.matchBadgeText}>{item.match}% Match</Text>
        </View>
        {item.trending && (
          <View style={S.trendingBadge}>
            <Text style={S.trendingBadgeText}>Trending</Text>
          </View>
        )}
        <Text style={S.destCityOverlay}>{item.city}, {item.country}</Text>
      </ImageBackground>
      <View style={S.destContent}>
        <View style={S.tagsRow}>
          {item.tags.map(t => (
            <View key={t} style={S.tag}><Text style={S.tagText}>{t}</Text></View>
          ))}
        </View>
        <Text style={S.destPrice}>From {item.price} · {item.days} days</Text>
        <View style={S.destCTA}>
          <TouchableOpacity style={S.planBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.7}>
            <Text style={S.planBtnText}>Plan Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[S.saveBtn, saved && S.saveBtnActive]}
            onPress={() => { setSaved(s => !s); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            activeOpacity={0.7}
          >
            <Text style={[S.saveBtnText, saved && { color: N.white }]}>{saved ? "Saved" : "Save"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const tabBarOffset = 56 + Math.max(insets.bottom, 8) + 16;

  const filtered = DESTINATIONS.filter(d => {
    const matchSearch = search.length === 0 ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || d.tags.some(t => t === activeFilter);
    return matchSearch && matchFilter;
  });

  return (
    <View style={S.root}>
      {/* ── Header ── */}
      <View style={[S.header, { paddingTop: insets.top + 8 }]}>
        <Text style={S.headerTitle}>Explore</Text>
        <Text style={S.headerSub}>Discover your next adventure</Text>
        <View style={S.searchBar}>
          <IconSymbol name="magnifyingglass" size={18} color={N.textMuted} />
          <TextInput
            style={S.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor={N.textMuted}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <IconSymbol name="xmark.circle.fill" size={18} color={N.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>
        {/* ── Filters ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.filtersScroll}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[S.filterChip, activeFilter === f && S.filterChipActive]}
              onPress={() => { setActiveFilter(f); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.7}
            >
              <Text style={[S.filterChipText, activeFilter === f && S.filterChipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={S.resultsRow}>
          <Text style={S.resultsText}>{filtered.length} destinations found</Text>
        </View>

        {/* ── Destination Cards ── */}
        <FlatList
          data={filtered}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={i => i.id}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
          renderItem={({ item }) => <DestCard item={item} />}
          scrollEnabled
        />

        {/* ── Hidden Gems ── */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Hidden Gems</Text>
          <Text style={S.sectionSub}>Off the beaten path</Text>
          <View style={S.gemsGrid}>
            {HIDDEN_GEMS.map(g => (
              <TouchableOpacity key={g.id} style={S.gemCard} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.7}>
                <ImageBackground source={g.image} style={StyleSheet.absoluteFillObject} imageStyle={{ borderRadius: 12 }} resizeMode="cover">
                  <View style={[S.destOverlay, { borderRadius: 12 }]} />
                  <View style={S.gemBadge}>
                    <Text style={S.gemBadgeText}>Hidden Gem</Text>
                  </View>
                  <View style={S.gemBottom}>
                    <Text style={S.gemCity}>{g.city}</Text>
                    <Text style={S.gemCountry}>{g.country}</Text>
                    <Text style={S.gemPrice}>From {g.price}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── DNA CTA ── */}
        <View style={S.sectionPad}>
          <TouchableOpacity style={S.dnaCTA} onPress={() => router.push("/(trip)/swipe" as never)} activeOpacity={0.7}>
            <View style={S.dnaCTAContent}>
              <Text style={S.dnaCTATitle}>Discover your Travel DNA</Text>
              <Text style={S.dnaCTASub}>Get AI-matched destinations in 2 minutes</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={N.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },

  // Header
  header: { paddingHorizontal: 20, paddingBottom: 16, gap: 8, backgroundColor: N.bg },
  headerTitle: { color: N.white, fontSize: 28, fontWeight: "700" },
  headerSub: { color: N.textSec, fontSize: 14, marginTop: -4 },
  searchBar: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: N.surface, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  searchInput: { flex: 1, color: N.white, fontSize: 15 },

  // Filters
  filtersScroll: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: N.surface,
    borderWidth: 1, borderColor: N.border,
  },
  filterChipActive: { backgroundColor: N.accent, borderColor: N.accent },
  filterChipText: { color: N.textSec, fontSize: 13, fontWeight: "500" },
  filterChipTextActive: { color: N.white, fontWeight: "600" },

  resultsRow: { paddingHorizontal: 20, marginBottom: 12 },
  resultsText: { color: N.textMuted, fontSize: 13 },

  // Destination Card
  destCard: {
    width: 260, borderRadius: 14,
    backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
    overflow: "hidden",
  },
  destImage: { width: 260, height: 160, justifyContent: "flex-end", padding: 12 },
  destOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  matchBadge: {
    alignSelf: "flex-start",
    backgroundColor: N.green, borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  matchBadgeText: { color: N.white, fontSize: 11, fontWeight: "700" },
  trendingBadge: {
    position: "absolute", top: 12, right: 12,
    backgroundColor: N.orange, borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  trendingBadgeText: { color: N.white, fontSize: 10, fontWeight: "700" },
  destCityOverlay: {
    position: "absolute", bottom: 12, left: 14,
    color: N.white, fontSize: 16, fontWeight: "700",
  },
  destContent: { padding: 14, gap: 8 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { color: N.textSec, fontSize: 11 },
  destPrice: { color: N.textSec, fontSize: 14, fontWeight: "600" },
  destCTA: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  planBtn: { backgroundColor: N.accent, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 10 },
  planBtnText: { color: N.white, fontSize: 14, fontWeight: "600" },
  saveBtn: {
    borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: N.border,
  },
  saveBtnActive: { backgroundColor: N.accent, borderColor: N.accent },
  saveBtnText: { color: N.textSec, fontSize: 13, fontWeight: "600" },

  // Sections
  section: { paddingTop: 28, gap: 12 },
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  sectionTitle: { color: N.white, fontSize: 18, fontWeight: "700", paddingHorizontal: 20 },
  sectionSub: { color: N.textMuted, fontSize: 13, paddingHorizontal: 20, marginTop: -6 },

  // Hidden Gems
  gemsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, paddingHorizontal: 20, marginTop: 4 },
  gemCard: {
    width: (width - 52) / 2, height: 130, borderRadius: 12, overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  gemBadge: {
    position: "absolute", top: 10, left: 10,
    backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  gemBadgeText: { color: N.white, fontSize: 10, fontWeight: "600" },
  gemBottom: { position: "absolute", bottom: 10, left: 12 },
  gemCity: { color: N.white, fontSize: 14, fontWeight: "700" },
  gemCountry: { color: "rgba(255,255,255,0.65)", fontSize: 11 },
  gemPrice: { color: N.accent, fontSize: 11, fontWeight: "600", marginTop: 2 },

  // DNA CTA
  dnaCTA: {
    borderRadius: 14, overflow: "hidden",
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 18,
    backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  dnaCTAContent: { flex: 1, gap: 4 },
  dnaCTATitle: { color: N.white, fontSize: 16, fontWeight: "700" },
  dnaCTASub: { color: N.textSec, fontSize: 13 },
});
