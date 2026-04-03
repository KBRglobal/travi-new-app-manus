// Screen 20 — Destination Select — STATIC WIREFRAME
// Route: /(trip)/destination-select | Mode: Planning
// Spec: Gradient header + search, 2-col grid (4:5 ratio), Selection bar slides up on pick

import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";

const DESTINATIONS = [
  { id: "1", city: "Bali", country: "Indonesia", match: 96, price: "€850" },
  { id: "2", city: "Tokyo", country: "Japan", match: 97, price: "€1,200" },
  { id: "3", city: "Paris", country: "France", match: 92, price: "€650" },
  { id: "4", city: "Dubai", country: "UAE", match: 98, price: "€780" },
  { id: "5", city: "Santorini", country: "Greece", match: 89, price: "€720" },
  { id: "6", city: "Barcelona", country: "Spain", match: 85, price: "€550" },
];

export default function DestinationSelectScreen() {
  return (
    <View style={s.root}>
      {/* Header */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>‹</Text></Pressable>
        <Text style={s.headerTitle}>Choose Destination</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Search */}
      <View style={s.searchWrap}>
        <TextInput style={s.searchInput} placeholder="Search destinations..." placeholderTextColor="#666" editable={false} />
      </View>

      {/* 2-col grid (4:5 ratio) */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.grid}>
        {DESTINATIONS.map((d) => (
          <Pressable key={d.id} style={s.card}>
            <View style={s.cardImage}>
              <Text style={s.imgText}>{d.city}</Text>
              <View style={s.matchBadge}><Text style={s.matchText}>{d.match}%</Text></View>
            </View>
            <View style={s.cardBody}>
              <Text style={s.cardCity}>{d.city}</Text>
              <Text style={s.cardCountry}>{d.country}</Text>
              <Text style={s.cardPrice}>From {d.price}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Selection bar (shown when destination picked) */}
      <View style={s.selectionBar}>
        <View>
          <Text style={s.selLabel}>Selected</Text>
          <Text style={s.selCity}>Bali, Indonesia</Text>
        </View>
        <Pressable style={s.continueBtn}><Text style={s.continueText}>Continue</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  searchWrap: { paddingHorizontal: 20, paddingVertical: 12 },
  searchInput: { height: 44, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", paddingHorizontal: 16, color: "#FFF", fontSize: 15 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 12, paddingBottom: 120 },
  card: { width: "47%", borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  cardImage: { aspectRatio: 4 / 5, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  imgText: { color: "#555", fontSize: 14 },
  matchBadge: { position: "absolute", top: 8, right: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: "rgba(0,0,0,0.6)" },
  matchText: { color: "#FFF", fontSize: 11, fontWeight: "700" },
  cardBody: { padding: 10, gap: 2 },
  cardCity: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  cardCountry: { color: "#888", fontSize: 12 },
  cardPrice: { color: "#888", fontSize: 12, marginTop: 4 },
  selectionBar: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, paddingBottom: 36, backgroundColor: "#1A1A1A", borderTopWidth: 1, borderTopColor: "#333" },
  selLabel: { color: "#888", fontSize: 11 },
  selCity: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  continueBtn: { height: 48, paddingHorizontal: 28, borderRadius: 24, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  continueText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
});
