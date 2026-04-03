// Screen 17 — Wishlist — STATIC WIREFRAME
// Route: /(tabs)/wishlist | Mode: Universal
// Spec: Header 60px + Sort, Filter chips, 2-col grid (3:4 ratio), Remove confirm + undo toast, Empty state

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const FILTERS = ["All", "Destinations", "Activities", "Hotels"];

const ITEMS = [
  { id: "1", title: "Bali, Indonesia", type: "Destination", match: 96, price: "€850" },
  { id: "2", title: "Tokyo, Japan", type: "Destination", match: 97, price: "€1,200" },
  { id: "3", title: "Burj Khalifa Tour", type: "Activity", match: 94, price: "€45" },
  { id: "4", title: "Paris, France", type: "Destination", match: 92, price: "€650" },
  { id: "5", title: "Desert Safari", type: "Activity", match: 88, price: "€120" },
  { id: "6", title: "Ritz Paris", type: "Hotel", match: 95, price: "€450/night" },
];

export default function WishlistScreen() {
  return (
    <View style={s.root}>
      {/* Header — 60px */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Wishlist</Text>
        <Pressable style={s.sortBtn}><Text style={s.sortText}>Sort ↕</Text></Pressable>
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
        {FILTERS.map((f, i) => (
          <Pressable key={f} style={[s.filterChip, i === 0 && s.filterActive]}>
            <Text style={[s.filterText, i === 0 && s.filterTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* 2-col grid */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.grid}>
        {ITEMS.map((item) => (
          <Pressable key={item.id} style={s.card}>
            <View style={s.cardImage}>
              <Text style={s.imgPlaceholder}>📷</Text>
              <Pressable style={s.heartBtn}><Text style={s.heartText}>♥</Text></Pressable>
            </View>
            <View style={s.cardBody}>
              <Text style={s.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={s.cardType}>{item.type}</Text>
              <View style={s.cardFooter}>
                <Text style={s.cardMatch}>{item.match}% Match</Text>
                <Text style={s.cardPrice}>{item.price}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 60, flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: 20, marginTop: 48,
    borderBottomWidth: 1, borderBottomColor: "#222",
  },
  headerTitle: { color: "#FFF", fontSize: 20, fontWeight: "700" },
  sortBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  sortText: { color: "#CCC", fontSize: 13 },
  filterRow: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  filterActive: { backgroundColor: "#333", borderColor: "#666" },
  filterText: { color: "#888", fontSize: 13 },
  filterTextActive: { color: "#FFF", fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 12, paddingBottom: 100 },
  card: { width: "47%", borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  cardImage: { aspectRatio: 3 / 4, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  imgPlaceholder: { fontSize: 32, opacity: 0.3 },
  heartBtn: { position: "absolute", top: 8, right: 8, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  heartText: { color: "#FF3B30", fontSize: 16 },
  cardBody: { padding: 10, gap: 2 },
  cardTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  cardType: { color: "#888", fontSize: 11 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  cardMatch: { color: "#888", fontSize: 11 },
  cardPrice: { color: "#FFF", fontSize: 12, fontWeight: "600" },
});
