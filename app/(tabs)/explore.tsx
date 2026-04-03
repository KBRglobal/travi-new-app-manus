// Screen 12 — Explore Feed — STATIC WIREFRAME
// Route: /(tabs)/explore | Mode: Discovery
// Spec: Header 120px + search bar 48px, Filter chips horizontal,
//       Top Picks (full-width 220px) + Trending (180x240 horizontal) + Hidden Gems (2-col)

import { View, Text, StyleSheet, Pressable, ScrollView, FlatList, TextInput } from "react-native";

const FILTERS = ["All", "Beach", "City", "Mountain", "Culture", "Adventure", "Food"];

const TOP_PICKS = [
  { id: "1", city: "Bali", country: "Indonesia", match: 96, price: "€850" },
  { id: "2", city: "Santorini", country: "Greece", match: 91, price: "€1,200" },
];

const TRENDING = [
  { id: "t1", city: "Dubai", price: "€650" },
  { id: "t2", city: "Tokyo", price: "€1,100" },
  { id: "t3", city: "Barcelona", price: "€720" },
  { id: "t4", city: "New York", price: "€890" },
];

const HIDDEN_GEMS = [
  { id: "h1", city: "Luang Prabang", country: "Laos", price: "€420" },
  { id: "h2", city: "Kotor", country: "Montenegro", price: "€380" },
  { id: "h3", city: "Oaxaca", country: "Mexico", price: "€550" },
  { id: "h4", city: "Tbilisi", country: "Georgia", price: "€310" },
];

export default function ExploreScreen() {
  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header — 120px */}
        <View style={s.header}>
          <Text style={s.headerTitle}>Explore</Text>
          <Text style={s.headerSub}>Discover your next adventure</Text>
        </View>

        {/* Search bar — 48px */}
        <View style={s.searchWrap}>
          <View style={s.searchBar}>
            <Text style={s.searchIcon}>🔍</Text>
            <TextInput style={s.searchInput} placeholder="Search destinations..." placeholderTextColor="#666" editable={false} />
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterScroll} contentContainerStyle={s.filterContent}>
          {FILTERS.map((f, i) => (
            <Pressable key={f} style={[s.chip, i === 0 && s.chipActive]}>
              <Text style={[s.chipText, i === 0 && s.chipTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Top Picks — full-width 220px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Top Picks for You</Text>
          {TOP_PICKS.map((item) => (
            <Pressable key={item.id} style={s.topPickCard}>
              <View style={s.topPickImage}>
                <Text style={s.imgText}>{item.city}</Text>
                <View style={s.matchBadge}><Text style={s.matchText}>{item.match}% Match</Text></View>
              </View>
              <View style={s.topPickInfo}>
                <Text style={s.topPickCity}>{item.city}, {item.country}</Text>
                <Text style={s.topPickPrice}>From {item.price}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Trending — 180x240 horizontal */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Trending Now</Text>
          <FlatList
            data={TRENDING}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            renderItem={({ item }) => (
              <Pressable style={s.trendCard}>
                <View style={s.trendImage}><Text style={s.imgTextSm}>{item.city}</Text></View>
                <Text style={s.trendCity}>{item.city}</Text>
                <Text style={s.trendPrice}>From {item.price}</Text>
              </Pressable>
            )}
          />
        </View>

        {/* Hidden Gems — 2-col */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Hidden Gems</Text>
          <View style={s.gemGrid}>
            {HIDDEN_GEMS.map((item) => (
              <Pressable key={item.id} style={s.gemCard}>
                <View style={s.gemImage}><Text style={s.imgTextSm}>{item.city}</Text></View>
                <Text style={s.gemCity}>{item.city}</Text>
                <Text style={s.gemCountry}>{item.country}</Text>
                <Text style={s.gemPrice}>From {item.price}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 120, paddingHorizontal: 20, paddingTop: 56,
    justifyContent: "flex-end", paddingBottom: 12,
    backgroundColor: "#1A1A1A", borderBottomWidth: 1, borderBottomColor: "#222",
  },
  headerTitle: { color: "#FFF", fontSize: 28, fontWeight: "800" },
  headerSub: { color: "#888", fontSize: 14, marginTop: 4 },
  searchWrap: { paddingHorizontal: 20, paddingVertical: 12 },
  searchBar: {
    height: 48, borderRadius: 12, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", flexDirection: "row",
    alignItems: "center", paddingHorizontal: 16, gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, color: "#FFF", fontSize: 15 },
  filterScroll: { marginBottom: 8 },
  filterContent: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333",
  },
  chipActive: { backgroundColor: "#333", borderColor: "#666" },
  chipText: { color: "#888", fontSize: 13, fontWeight: "500" },
  chipTextActive: { color: "#FFF" },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 12 },
  topPickCard: {
    height: 220, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", overflow: "hidden", marginBottom: 12,
  },
  topPickImage: { flex: 1, backgroundColor: "#222", justifyContent: "flex-end", padding: 12 },
  imgText: { color: "#555", fontSize: 18, fontWeight: "600" },
  matchBadge: {
    position: "absolute", top: 12, right: 12,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  matchText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  topPickInfo: { padding: 12 },
  topPickCity: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  topPickPrice: { color: "#888", fontSize: 13, marginTop: 4 },
  trendCard: {
    width: 180, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", overflow: "hidden",
  },
  trendImage: { height: 160, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  imgTextSm: { color: "#555", fontSize: 14 },
  trendCity: { color: "#FFF", fontSize: 14, fontWeight: "600", paddingHorizontal: 12, paddingTop: 10 },
  trendPrice: { color: "#888", fontSize: 12, paddingHorizontal: 12, paddingTop: 4, paddingBottom: 12 },
  gemGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  gemCard: {
    width: "47%", borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", overflow: "hidden",
  },
  gemImage: { height: 120, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  gemCity: { color: "#FFF", fontSize: 14, fontWeight: "600", paddingHorizontal: 12, paddingTop: 10 },
  gemCountry: { color: "#888", fontSize: 12, paddingHorizontal: 12, paddingTop: 2 },
  gemPrice: { color: "#999", fontSize: 12, paddingHorizontal: 12, paddingTop: 4, paddingBottom: 12 },
});
