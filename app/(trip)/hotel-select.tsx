// Screen 23 — Hotel Select — STATIC 
// Route: /(trip)/hotel-select | Mode: Planning
// Spec: Filter chips, Sort + Map toggle, Hotel cards 240px, Skip link

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const FILTERS = ["All", "5 Star", "Pool", "Beach", "Spa", "Boutique"];

const HOTELS = [
  { id: "1", name: "The Mulia Resort", stars: 5, rating: 9.4, reviews: 2840, price: "€320", perNight: true, match: 96, tags: ["Pool", "Beach", "Spa"] },
  { id: "2", name: "Four Seasons Jimbaran", stars: 5, rating: 9.6, reviews: 3120, price: "€450", perNight: true, match: 94, tags: ["Beach", "Spa"] },
  { id: "3", name: "Alila Ubud", stars: 5, rating: 9.2, reviews: 1560, price: "€280", perNight: true, match: 91, tags: ["Pool", "Spa"] },
  { id: "4", name: "W Bali Seminyak", stars: 5, rating: 8.8, reviews: 2100, price: "€260", perNight: true, match: 88, tags: ["Pool", "Beach"] },
];

export default function HotelSelectScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>‹</Text></Pressable>
        <Text style={s.headerTitle}>Select Hotel</Text>
        <Pressable><Text style={s.skipText}>Skip</Text></Pressable>
      </View>

      {/* Destination + dates summary */}
      <View style={s.summaryRow}>
        <Text style={s.summaryText}>Bali · Apr 15–22 · 2 Adults · 7 nights</Text>
      </View>

      {/* Sort + Map toggle */}
      <View style={s.toolRow}>
        <Pressable style={s.sortBtn}><Text style={s.sortText}>Sort: Recommended ↕</Text></Pressable>
        <Pressable style={s.mapBtn}><Text style={s.mapText}>Map 🗺️</Text></Pressable>
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
        {FILTERS.map((f, i) => (
          <Pressable key={f} style={[s.filterChip, i === 0 && s.filterActive]}>
            <Text style={[s.filterText, i === 0 && s.filterTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Hotel cards — 240px each */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={s.resultsText}>{HOTELS.length} hotels found</Text>
        {HOTELS.map((h) => (
          <Pressable key={h.id} style={s.hotelCard}>
            <View style={s.hotelImage}>
              <Text style={s.imgText}>{h.name}</Text>
              <View style={s.matchBadge}><Text style={s.matchText}>{h.match}%</Text></View>
            </View>
            <View style={s.hotelBody}>
              <View style={s.hotelTop}>
                <View style={{ flex: 1 }}>
                  <Text style={s.hotelName}>{h.name}</Text>
                  <Text style={s.hotelStars}>{"★".repeat(h.stars)}</Text>
                </View>
                <View style={s.ratingBadge}><Text style={s.ratingText}>{h.rating}</Text></View>
              </View>
              <Text style={s.reviewCount}>{h.reviews.toLocaleString()} reviews</Text>
              <View style={s.tagRow}>
                {h.tags.map((t) => (
                  <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>
                ))}
              </View>
              <View style={s.priceRow}>
                <Text style={s.price}>{h.price}<Text style={s.perNight}>/night</Text></Text>
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
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  skipText: { color: "#888", fontSize: 14 },
  summaryRow: { paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#222" },
  summaryText: { color: "#888", fontSize: 13, textAlign: "center" },
  toolRow: { flexDirection: "row", paddingHorizontal: 20, paddingTop: 12, gap: 8 },
  sortBtn: { flex: 1, height: 36, borderRadius: 10, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  sortText: { color: "#CCC", fontSize: 13 },
  mapBtn: { height: 36, paddingHorizontal: 16, borderRadius: 10, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  mapText: { color: "#CCC", fontSize: 13 },
  filterRow: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  filterActive: { backgroundColor: "#333", borderColor: "#666" },
  filterText: { color: "#888", fontSize: 13 },
  filterTextActive: { color: "#FFF", fontWeight: "600" },
  resultsText: { color: "#888", fontSize: 13, paddingHorizontal: 20, marginBottom: 12 },
  hotelCard: { marginHorizontal: 20, marginBottom: 16, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  hotelImage: { height: 160, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  imgText: { color: "#555", fontSize: 14 },
  matchBadge: { position: "absolute", top: 10, right: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: "rgba(0,0,0,0.6)" },
  matchText: { color: "#FFF", fontSize: 11, fontWeight: "700" },
  hotelBody: { padding: 14, gap: 6 },
  hotelTop: { flexDirection: "row", alignItems: "flex-start" },
  hotelName: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  hotelStars: { color: "#F59E0B", fontSize: 12, marginTop: 2 },
  ratingBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: "#333" },
  ratingText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  reviewCount: { color: "#888", fontSize: 12 },
  tagRow: { flexDirection: "row", gap: 6, marginTop: 4 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: "#222", borderWidth: 1, borderColor: "#333" },
  tagText: { color: "#888", fontSize: 11 },
  priceRow: { marginTop: 4 },
  price: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  perNight: { color: "#888", fontSize: 12, fontWeight: "400" },
});
