// Screen 17 — Wishlist
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const FILTERS = ["All", "Destinations", "Activities", "Hotels"];
const ITEMS = [
  { id: "1", name: "Ubud, Bali", type: "Destinations", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", match: 96 },
  { id: "2", name: "Santorini Sunset", type: "Activities", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80", match: 91 },
  { id: "3", name: "Fushimi Inari", type: "Activities", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", match: 88 },
  { id: "4", name: "Alaya Resort", type: "Hotels", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80", match: 85 },
  { id: "5", name: "Patagonia Trek", type: "Activities", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80", match: 82 },
  { id: "6", name: "Overwater Villa", type: "Hotels", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80", match: 79 },
];

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = ITEMS.filter(i => activeFilter === "All" || i.type === activeFilter);

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>Wishlist</Text>
        <Pressable style={s.sortBtn}>
          <MaterialIcons name="sort" size={20} color={DS.white} />
        </Pressable>
      </View>

      <View style={s.filtersWrap}>
        {FILTERS.map(f => (
          <Pressable key={f} style={[s.chip, activeFilter === f && s.chipActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[s.chipText, activeFilter === f && s.chipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={s.row}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [s.card, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/destination-detail" as any)}>
            <Image source={{ uri: item.img }} style={s.cardImg} />
            <LinearGradient colors={["transparent", "rgba(10,5,20,0.9)"]} style={s.cardOverlay} />
            <Pressable style={s.heartBtn}>
              <MaterialIcons name="favorite" size={18} color={DS.pink} />
            </Pressable>
            <View style={s.matchBadge}>
              <Text style={s.matchText}>✦ {item.match}%</Text>
            </View>
            <Text style={s.cardName} numberOfLines={1}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const CARD_W = (360 - 48 - 12) / 2;

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 24, fontFamily: "Chillax-Bold", color: DS.white },
  sortBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  filtersWrap: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  chipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: DS.purple },
  chipText: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted },
  chipTextActive: { color: DS.white },
  row: { justifyContent: "space-between", marginBottom: 12 },
  card: { width: CARD_W, height: CARD_W * 1.3, borderRadius: 16, overflow: "hidden", backgroundColor: DS.surface },
  cardImg: { ...StyleSheet.absoluteFillObject },
  cardOverlay: { ...StyleSheet.absoluteFillObject },
  heartBtn: { position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(10,5,20,0.6)", justifyContent: "center", alignItems: "center" },
  matchBadge: { position: "absolute", top: 10, left: 10, backgroundColor: "#02A65C", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  matchText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.white },
  cardName: { position: "absolute", bottom: 12, left: 12, right: 12, fontSize: 15, fontFamily: "Chillax-Bold", color: DS.white },
});
