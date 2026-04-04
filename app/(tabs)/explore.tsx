// Screen 12 — Explore Feed
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const FILTERS = ["All", "Beach", "City", "Mountain", "Culture", "Adventure", "Food"];
const DESTINATIONS = [
  { id: "1", name: "Bali", country: "Indonesia", match: 96, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", tag: "Beach" },
  { id: "2", name: "Santorini", country: "Greece", match: 91, img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", tag: "City" },
  { id: "3", name: "Kyoto", country: "Japan", match: 88, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", tag: "Culture" },
  { id: "4", name: "Patagonia", country: "Argentina", match: 85, img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", tag: "Mountain" },
  { id: "5", name: "Tokyo", country: "Japan", match: 82, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", tag: "City" },
  { id: "6", name: "Maldives", country: "Maldives", match: 79, img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", tag: "Beach" },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = DESTINATIONS.filter(d =>
    (activeFilter === "All" || d.tag === activeFilter) &&
    (query === "" || d.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.searchBar}>
          <MaterialIcons name="search" size={20} color={DS.placeholder} />
          <TextInput
            style={s.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor={DS.placeholder}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <MaterialIcons name="close" size={18} color={DS.muted} />
            </Pressable>
          )}
        </View>
        <Pressable style={s.filterBtn} onPress={() => {}}>
          <MaterialIcons name="tune" size={20} color={DS.white} />
        </Pressable>
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filtersScroll} contentContainerStyle={s.filtersContent}>
        {FILTERS.map(f => (
          <Pressable key={f} style={[s.chip, activeFilter === f && s.chipActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[s.chipText, activeFilter === f && s.chipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={s.row}
        contentContainerStyle={[s.listContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [s.card, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/destination-detail" as any)}>
            <Image source={{ uri: item.img }} style={s.cardImg} />
            <LinearGradient colors={["transparent", "rgba(10,5,20,0.9)"]} style={s.cardOverlay} />
            <View style={s.matchBadge}>
              <Text style={s.matchText}>✦ {item.match}%</Text>
            </View>
            <View style={s.cardInfo}>
              <Text style={s.cardName}>{item.name}</Text>
              <Text style={s.cardCountry}>{item.country}</Text>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={
          <Text style={s.sectionTitle}>
            {filtered.length} Destinations <Text style={{ color: DS.purple }}>for You</Text>
          </Text>
        }
      />
    </View>
  );
}

const CARD_W = (360 - 48 - 12) / 2;

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, paddingHorizontal: 12, height: 44, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.white },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  filtersScroll: { maxHeight: 48 },
  filtersContent: { paddingHorizontal: 16, gap: 8, alignItems: "center" },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  chipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: DS.purple },
  chipText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.muted },
  chipTextActive: { color: DS.white },
  listContent: { paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 16 },
  row: { justifyContent: "space-between", marginBottom: 12 },
  card: { width: CARD_W, height: CARD_W * 1.3, borderRadius: 16, overflow: "hidden", backgroundColor: DS.surface },
  cardImg: { ...StyleSheet.absoluteFillObject },
  cardOverlay: { ...StyleSheet.absoluteFillObject },
  matchBadge: { position: "absolute", top: 10, right: 10, backgroundColor: "#02A65C", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  matchText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.white },
  cardInfo: { position: "absolute", bottom: 12, left: 12 },
  cardName: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white },
  cardCountry: { fontSize: 12, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)" },
});
