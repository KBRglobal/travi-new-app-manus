// @ts-nocheck
/**
 * TRAVI — Explore Screen
 * Dark mode: #1A0B2E bg, #24103E surface, purple→pink gradients
 * NO circles — bare icons, pill badges, glassmorphism cards
 */
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, TextInput, ImageBackground, FlatList,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const C = {
  bg:           "#1A0B2E",
  surface:      "#24103E",
  glassStroke:  "rgba(123,68,230,0.3)",
  purple:       "#6443F4",
  pink:         "#F94498",
  orange:       "#FF9327",
  green:        "#02A65C",
  white:        "#1A0B2E",
  textPrimary:  "#1A0B2E",
  textSecondary:"#D3CFD8",
  textMuted:    "#A79FB2",
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
      <ImageBackground
        source={item.image}
        style={S.destImage}
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        resizeMode="cover"
      >
        <LinearGradient colors={["transparent", "rgba(26,11,46,0.92)"]} style={StyleSheet.absoluteFillObject} />
        <View style={S.dnaBadge}>
          <Text style={S.dnaBadgeText}>{item.match}% Match</Text>
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
          <TouchableOpacity style={S.planBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
            <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.planBtnText}>Plan Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[S.saveBtn, saved && S.saveBtnActive]}
            onPress={() => { setSaved(s => !s); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            activeOpacity={0.85}
          >
            <Text style={[S.saveBtnText, saved && { color: C.white }]}>{saved ? "Saved" : "Save"}</Text>
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
  const tabBarOffset = 60 + Math.max(insets.bottom, 8) + 16;

  const filtered = DESTINATIONS.filter(d => {
    const matchSearch = search.length === 0 ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || d.tags.some(t => t === activeFilter);
    return matchSearch && matchFilter;
  });

  return (
    <View style={S.root}>
      <LinearGradient
        colors={[C.purple, "#9B3FD4", C.pink]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={[S.header, { paddingTop: insets.top + 12 }]}
      >
        <Text style={S.headerTitle}>Explore</Text>
        <Text style={S.headerSub}>Discover your next adventure</Text>
        <View style={S.searchBar}>
          <IconSymbol name="magnifyingglass" size={18} color={C.textMuted} />
          <TextInput
            style={S.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor={C.textMuted}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <IconSymbol name="xmark.circle.fill" size={18} color={C.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.filtersScroll} style={S.filtersContainer}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[S.filterChip, activeFilter === f && S.filterChipActive]}
              onPress={() => { setActiveFilter(f); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.8}
            >
              {activeFilter === f && (
                <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              )}
              <Text style={[S.filterChipText, activeFilter === f && S.filterChipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={S.resultsRow}>
          <Text style={S.resultsText}>{filtered.length} destinations found</Text>
        </View>

        <FlatList
          data={filtered}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={i => i.id}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
          renderItem={({ item }) => <DestCard item={item} />}
          scrollEnabled
        />

        <View style={S.section}>
          <Text style={S.sectionTitle}>Hidden Gems</Text>
          <Text style={S.sectionSub}>Off the beaten path</Text>
          <View style={S.gemsGrid}>
            {HIDDEN_GEMS.map(g => (
              <TouchableOpacity key={g.id} style={S.gemCard} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.88}>
                <ImageBackground source={g.image} style={StyleSheet.absoluteFillObject} imageStyle={{ borderRadius: 16 }} resizeMode="cover">
                  <LinearGradient colors={["transparent", "rgba(26,11,46,0.88)"]} style={StyleSheet.absoluteFillObject} />
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

        <View style={S.sectionPad}>
          <TouchableOpacity style={S.dnaCTA} onPress={() => router.push("/(trip)/swipe" as never)} activeOpacity={0.88}>
            <LinearGradient colors={[C.purple, "#9B3FD4", C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
            <View style={S.dnaCTAContent}>
              <Text style={S.dnaCTATitle}>Discover your Travel DNA</Text>
              <Text style={S.dnaCTASub}>Get AI-matched destinations in 2 minutes</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={C.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  headerTitle: { color: C.white, fontSize: 28, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "Satoshi-Regular", marginTop: -6 },
  searchBar: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.15)",
  },
  searchInput: { flex: 1, color: C.white, fontSize: 15, fontFamily: "Satoshi-Regular" },
  filtersContainer: { backgroundColor: C.bg },
  filtersScroll: { paddingHorizontal: 20, paddingVertical: 16, gap: 8 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: "rgba(36,16,62,0.95)", borderWidth: 1.5, borderColor: "rgba(123,68,230,0.55)", overflow: "hidden",
  },
  filterChipActive: { borderColor: "transparent" },
  filterChipText: { color: "#C8C0D8", fontSize: 13, fontFamily: "Satoshi-Medium", fontWeight: "600" },
  filterChipTextActive: { color: C.white, fontFamily: "Satoshi-Bold" },
  resultsRow: { paddingHorizontal: 20, marginBottom: 12 },
  resultsText: { color: C.textMuted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  destCard: {
    width: 280, borderRadius: 20,
    backgroundColor: C.surface, borderWidth: 1, borderColor: C.glassStroke, overflow: "hidden",
  },
  destImage: { width: 280, height: 185, justifyContent: "flex-end", padding: 12 },
  dnaBadge: {
    flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start",
    backgroundColor: C.green, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
  },
  dnaBadgeText: { color: C.white, fontSize: 11, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  trendingBadge: {
    position: "absolute", top: 12, right: 12,
    backgroundColor: "rgba(255,147,39,0.85)", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3,
  },
  trendingBadgeText: { color: C.white, fontSize: 10, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  destCityOverlay: {
    position: "absolute", bottom: 12, left: 14,
    color: C.white, fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold",
  },
  destContent: { padding: 14, gap: 8 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { backgroundColor: "rgba(249,68,152,0.18)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  tagText: { color: C.pink, fontSize: 11, fontFamily: "Satoshi-Medium" },
  destPrice: { color: C.textSecondary, fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  destCTA: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  planBtn: { borderRadius: 24, paddingHorizontal: 18, paddingVertical: 10, overflow: "hidden" },
  planBtnText: { color: C.white, fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  saveBtn: {
    flexDirection: "row", alignItems: "center", gap: 5,
    borderRadius: 24, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1.5, borderColor: C.pink,
  },
  saveBtnActive: { backgroundColor: C.pink, borderColor: C.pink },
  saveBtnText: { color: C.pink, fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  section: { paddingTop: 28, gap: 12 },
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  sectionTitle: { color: C.white, fontSize: 20, fontWeight: "700", fontFamily: "Chillax-Bold", paddingHorizontal: 20 },
  sectionSub: { color: C.textMuted, fontSize: 13, fontFamily: "Satoshi-Regular", paddingHorizontal: 20, marginTop: -6 },
  gemsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, paddingHorizontal: 20, marginTop: 4 },
  gemCard: {
    width: (width - 52) / 2, height: 140, borderRadius: 16, overflow: "hidden",
    borderWidth: 1, borderColor: "rgba(123,68,230,0.3)",
  },
  gemBadge: {
    position: "absolute", top: 10, left: 10,
    backgroundColor: "rgba(100,67,244,0.75)", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3,
  },
  gemBadgeText: { color: "#1A0B2E", fontSize: 10, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  gemBottom: { position: "absolute", bottom: 10, left: 12 },
  gemCity: { color: "#1A0B2E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  gemCountry: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontFamily: "Satoshi-Regular" },
  gemPrice: { color: "#F94498", fontSize: 11, fontWeight: "700", fontFamily: "Satoshi-Bold", marginTop: 2 },
  dnaCTA: {
    borderRadius: 20, overflow: "hidden",
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 20,
    borderWidth: 1, borderColor: "rgba(123,68,230,0.3)",
  },
  dnaCTAContent: { flex: 1, gap: 4 },
  dnaCTATitle: { color: "#1A0B2E", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  dnaCTASub: { color: "rgba(255,255,255,0.75)", fontSize: 13, fontFamily: "Satoshi-Regular" },
});
