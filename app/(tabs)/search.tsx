// Screen 13 — Search — STATIC WIREFRAME
// Route: /(tabs)/search | Mode: Discovery
// Spec: Header 60px (back + search input + Cancel), States: empty/typing/results/no results
//       Sort/Filter bottom sheet modals

import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";

const RECENT = ["Bali", "Tokyo", "Paris", "Santorini"];
const POPULAR = ["Dubai", "Maldives", "Barcelona", "New York", "Kyoto", "Rome"];

const RESULTS = [
  { id: "1", city: "Bali", country: "Indonesia", match: 96, price: "€850" },
  { id: "2", city: "Bangkok", country: "Thailand", match: 84, price: "€620" },
  { id: "3", city: "Barcelona", country: "Spain", match: 79, price: "€720" },
];

export default function SearchScreen() {
  // Showing "results" state as default wireframe
  return (
    <View style={s.root}>
      {/* Header — 60px */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>‹</Text></Pressable>
        <View style={s.searchInput}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.input}
            placeholder="Search destinations..."
            placeholderTextColor="#666"
            value="Bal"
            editable={false}
          />
        </View>
        <Pressable><Text style={s.cancelText}>Cancel</Text></Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Results count */}
        <View style={s.resultsHeader}>
          <Text style={s.resultsCount}>3 results for "Bal"</Text>
          <Pressable style={s.sortBtn}><Text style={s.sortText}>Sort ↕</Text></Pressable>
          <Pressable style={s.filterBtn}><Text style={s.filterText}>Filter ⚙</Text></Pressable>
        </View>

        {/* Search Results */}
        {RESULTS.map((item) => (
          <Pressable key={item.id} style={s.resultCard}>
            <View style={s.resultImage}><Text style={s.imgText}>{item.city}</Text></View>
            <View style={s.resultInfo}>
              <Text style={s.resultCity}>{item.city}, {item.country}</Text>
              <Text style={s.resultMatch}>{item.match}% DNA Match</Text>
              <Text style={s.resultPrice}>From {item.price}</Text>
            </View>
            <Text style={s.chevron}>›</Text>
          </Pressable>
        ))}

        {/* Divider */}
        <View style={s.divider} />

        {/* Recent Searches */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Recent Searches</Text>
            <Pressable><Text style={s.clearText}>Clear</Text></Pressable>
          </View>
          {RECENT.map((r) => (
            <Pressable key={r} style={s.recentRow}>
              <Text style={s.recentIcon}>🕐</Text>
              <Text style={s.recentText}>{r}</Text>
            </Pressable>
          ))}
        </View>

        {/* Popular */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Popular Destinations</Text>
          <View style={s.popularGrid}>
            {POPULAR.map((p) => (
              <Pressable key={p} style={s.popularChip}>
                <Text style={s.popularText}>{p}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* No Results State (hidden, shown for reference) */}
        {false && (
          <View style={s.emptyState}>
            <Text style={s.emptyIcon}>🔍</Text>
            <Text style={s.emptyTitle}>No results found</Text>
            <Text style={s.emptySub}>Try a different search term</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 60, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, gap: 10, marginTop: 48,
    borderBottomWidth: 1, borderBottomColor: "#222",
  },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  searchInput: {
    flex: 1, height: 40, borderRadius: 10, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", flexDirection: "row",
    alignItems: "center", paddingHorizontal: 12, gap: 8,
  },
  searchIcon: { fontSize: 14 },
  input: { flex: 1, color: "#FFF", fontSize: 15 },
  cancelText: { color: "#888", fontSize: 15 },
  resultsHeader: {
    flexDirection: "row", alignItems: "center", paddingHorizontal: 20,
    paddingVertical: 12, gap: 8,
  },
  resultsCount: { flex: 1, color: "#888", fontSize: 13 },
  sortBtn: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333",
  },
  sortText: { color: "#CCC", fontSize: 12 },
  filterBtn: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333",
  },
  filterText: { color: "#CCC", fontSize: 12 },
  resultCard: {
    flexDirection: "row", alignItems: "center", marginHorizontal: 20,
    marginBottom: 12, borderRadius: 12, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", overflow: "hidden",
  },
  resultImage: {
    width: 80, height: 80, backgroundColor: "#222",
    justifyContent: "center", alignItems: "center",
  },
  imgText: { color: "#555", fontSize: 12 },
  resultInfo: { flex: 1, padding: 12 },
  resultCity: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  resultMatch: { color: "#888", fontSize: 12, marginTop: 2 },
  resultPrice: { color: "#AAA", fontSize: 13, fontWeight: "600", marginTop: 4 },
  chevron: { color: "#555", fontSize: 20, paddingRight: 12 },
  divider: { height: 1, backgroundColor: "#222", marginHorizontal: 20, marginVertical: 16 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  clearText: { color: "#888", fontSize: 13 },
  recentRow: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#1A1A1A",
  },
  recentIcon: { fontSize: 14 },
  recentText: { color: "#CCC", fontSize: 15 },
  popularGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  popularChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333",
  },
  popularText: { color: "#CCC", fontSize: 13 },
  emptyState: { alignItems: "center", paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  emptySub: { color: "#888", fontSize: 14, marginTop: 4 },
});
