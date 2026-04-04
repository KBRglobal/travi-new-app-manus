// Screen 13 — Search
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const RECENT = ["Bali", "Tokyo", "Paris", "Santorini", "Dubai"];
const POPULAR = [
  { id: "1", name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80" },
  { id: "2", name: "Tokyo", country: "Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80" },
  { id: "3", name: "Paris", country: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80" },
  { id: "4", name: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80" },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Search bar */}
      <View style={s.searchWrap}>
        <View style={s.searchBar}>
          <MaterialIcons name="search" size={20} color={DS.placeholder} />
          <TextInput
            style={s.searchInput}
            placeholder="Where do you want to go?"
            placeholderTextColor={DS.placeholder}
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <MaterialIcons name="close" size={18} color={DS.muted} />
            </Pressable>
          )}
        </View>
        <Pressable style={s.cancelBtn} onPress={() => router.back()}>
          <Text style={s.cancelText}>Cancel</Text>
        </Pressable>
      </View>

      <FlatList
        data={[]}
        keyExtractor={() => ""}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Recent */}
            {query.length === 0 && (
              <>
                <View style={s.sectionHeader}>
                  <Text style={s.sectionTitle}>Recent</Text>
                  <Pressable><Text style={s.clearText}>Clear</Text></Pressable>
                </View>
                {RECENT.map(r => (
                  <Pressable key={r} style={({ pressed }) => [s.recentRow, pressed && { opacity: 0.7 }]}>
                    <View style={s.recentIcon}><MaterialIcons name="history" size={16} color={DS.muted} /></View>
                    <Text style={s.recentText}>{r}</Text>
                    <MaterialIcons name="north-west" size={16} color={DS.muted} />
                  </Pressable>
                ))}
                <Text style={[s.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>Popular Now</Text>
                <View style={s.popularGrid}>
                  {POPULAR.map(p => (
                    <Pressable key={p.id} style={({ pressed }) => [s.popularCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/destination-detail" as any)}>
                      <Image source={{ uri: p.img }} style={s.popularImg} />
                      <LinearGradient colors={["transparent", "rgba(10,5,20,0.85)"]} style={StyleSheet.absoluteFillObject} />
                      <Text style={s.popularName}>{p.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </>
        }
        renderItem={() => null}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  searchWrap: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, paddingHorizontal: 12, height: 44, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.white },
  cancelBtn: { paddingVertical: 8 },
  cancelText: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.purple },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white },
  clearText: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted },
  recentRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, gap: 12, borderBottomWidth: 1, borderBottomColor: DS.border },
  recentIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: DS.surface, justifyContent: "center", alignItems: "center" },
  recentText: { flex: 1, fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.white },
  popularGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  popularCard: { width: "47%", height: 120, borderRadius: 14, overflow: "hidden", backgroundColor: DS.surface },
  popularImg: { ...StyleSheet.absoluteFillObject },
  popularName: { position: "absolute", bottom: 10, left: 10, fontSize: 15, fontFamily: "Chillax-Bold", color: DS.white },
});
