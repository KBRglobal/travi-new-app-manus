// @ts-nocheck
/**
 * TRAVI — Wishlist (Saved Destinations & Experiences)
 */
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type WishItem = { id: string; type: "destination" | "hotel" | "experience"; title: string; subtitle: string; price?: string; cashback?: string; image: number; saved: boolean };

const INITIAL_ITEMS: WishItem[] = [
  { id: "1", type: "destination", title: "Bali, Indonesia", subtitle: "Tropical paradise · 14 days", price: "from $1,200", cashback: "8% cashback", image: require("@/assets/destinations/bali.jpg"), saved: true },
  { id: "2", type: "destination", title: "Kyoto, Japan", subtitle: "Culture & temples · 10 days", price: "from $2,100", cashback: "6% cashback", image: require("@/assets/destinations/kyoto.jpg"), saved: true },
  { id: "3", type: "hotel", title: "Burj Al Arab", subtitle: "Dubai · 7-star · 3 nights", price: "AED 8,500/night", cashback: "12% cashback", image: require("@/assets/destinations/dubai.jpg"), saved: true },
  { id: "4", type: "destination", title: "Santorini, Greece", subtitle: "Romantic getaway · 7 days", price: "from $1,800", cashback: "7% cashback", image: require("@/assets/destinations/santorini.jpg"), saved: true },
  { id: "5", type: "experience", title: "Maldives Overwater Villa", subtitle: "Maldives · 5 nights", price: "from $3,200", cashback: "10% cashback", image: require("@/assets/destinations/maldives.jpg"), saved: true },
  { id: "6", type: "destination", title: "Barcelona, Spain", subtitle: "Architecture & food · 8 days", price: "from $1,400", cashback: "6% cashback", image: require("@/assets/destinations/barcelona.jpg"), saved: true },
];

const FILTERS = ["All", "Destinations", "Hotels", "Experiences"];
const TYPE_MAP: Record<string, string> = { "Destinations": "destination", "Hotels": "hotel", "Experiences": "experience" };

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? items : items.filter((i) => i.type === TYPE_MAP[filter]);

  const unsave = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <Text style={S.backText}>←</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>Wishlist</Text>
        <Text style={S.headerCount}>{items.length}</Text>
      </View>

      {/* Filters */}
      <View style={S.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f} style={[S.filterChip, filter === f && S.filterChipActive]} onPress={() => setFilter(f)} activeOpacity={0.8}>
            <Text style={[S.filterText, filter === f && S.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 130, gap: 14 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={S.empty}>
            <Text style={S.emptyEmoji}>💔</Text>
            <Text style={S.emptyTitle}>Nothing saved here yet</Text>
            <Text style={S.emptyDesc}>Tap the heart on any destination or hotel to save it</Text>
            <TouchableOpacity style={S.emptyBtn} onPress={() => router.push("/(tabs)/explore" as never)} activeOpacity={0.88}>
              <Text style={S.emptyBtnText}>Explore Destinations</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={S.card}>
            <Image source={item.image} style={S.cardImage} resizeMode="cover" />
            <View style={S.cardOverlay} />
            <View style={S.cardTypeBadge}>
              <Text style={S.cardTypeText}>{item.type === "destination" ? "🌍" : item.type === "hotel" ? "🏨" : "✨"} {item.type}</Text>
            </View>
            <TouchableOpacity style={S.unsaveBtn} onPress={() => unsave(item.id)} activeOpacity={0.8}>
              <Text style={S.unsaveBtnText}>❤️</Text>
            </TouchableOpacity>
            <View style={S.cardBody}>
              <Text style={S.cardTitle}>{item.title}</Text>
              <Text style={S.cardSub}>{item.subtitle}</Text>
              <View style={S.cardBottom}>
                <View>
                  <Text style={S.cardPrice}>{item.price}</Text>
                  {item.cashback && <Text style={S.cardCashback}>{item.cashback}</Text>}
                </View>
                <TouchableOpacity style={S.planBtn} onPress={() => router.push("/(tabs)/plan" as never)} activeOpacity={0.88}>
                  <Text style={S.planBtnText}>Plan Trip →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#1A0B2E", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerTitle: { flex: 1, color: "#1A0B2E", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerCount: { color: "#A78BFA", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  filterRow: { flexDirection: "row", paddingHorizontal: 20, gap: 8, marginBottom: 16 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  filterChipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: "rgba(100,67,244,0.4)" },
  filterText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  filterTextActive: { color: "#1A0B2E" },
  card: { borderRadius: 18, overflow: "hidden", height: 200 },
  cardImage: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  cardOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)" },
  cardTypeBadge: { position: "absolute", top: 12, left: 12, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  cardTypeText: { color: "#1A0B2E", fontSize: 11, fontWeight: "700", textTransform: "capitalize" },
  unsaveBtn: { position: "absolute", top: 10, right: 12 },
  unsaveBtnText: { fontSize: 22 },
  cardBody: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 18 },
  cardTitle: { color: "#1A0B2E", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  cardSub: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 8 },
  cardBottom: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  cardPrice: { color: "#1A0B2E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  cardCashback: { color: "#22C55E", fontSize: 11, fontWeight: "700" },
  planBtn: { backgroundColor: "rgba(100,67,244,0.85)", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10 },
  planBtnText: { color: "#1A0B2E", fontSize: 12, fontWeight: "900", fontFamily: "Chillax-Bold" },
  empty: { paddingTop: 60, alignItems: "center", gap: 12 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { color: "#1A0B2E", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  emptyDesc: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", paddingHorizontal: 40, fontFamily: "Satoshi-Regular" },
  emptyBtn: { marginTop: 8, borderRadius: 12, backgroundColor: "#6443F4", paddingHorizontal: 24, paddingVertical: 12 },
  emptyBtnText: { color: "#1A0B2E", fontSize: 14, fontWeight: "900", fontFamily: "Chillax-Bold" },
});
