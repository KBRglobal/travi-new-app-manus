// Social Discover Screen
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const TRAVELERS = [
  { id: "1", name: "Sarah K.", dna: "Explorer", match: 94, trips: 23, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", dest: "Bali" },
  { id: "2", name: "Mike R.", dna: "Adventurer", match: 88, trips: 31, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", dest: "Patagonia" },
  { id: "3", name: "Emma L.", dna: "Culture Seeker", match: 85, trips: 18, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", dest: "Kyoto" },
  { id: "4", name: "Alex T.", dna: "Foodie", match: 82, trips: 15, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", dest: "Tokyo" },
];

export default function SocialDiscoverScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>Discover <Text style={{ color: DS.purple }}>Travelers</Text></Text>
        <Pressable style={s.filterBtn}>
          <MaterialIcons name="tune" size={20} color={DS.white} />
        </Pressable>
      </View>

      <FlatList
        data={TRAVELERS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [s.card, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]} onPress={() => router.push("/(social)/traveler-profile" as any)}>
            <Image source={{ uri: item.img }} style={s.avatar} />
            <View style={{ flex: 1 }}>
              <View style={s.nameRow}>
                <Text style={s.name}>{item.name}</Text>
                <View style={s.matchBadge}>
                  <Text style={s.matchText}>✦ {item.match}%</Text>
                </View>
              </View>
              <Text style={s.dnaText}>{item.dna} · {item.trips} trips</Text>
              <View style={s.destRow}>
                <MaterialIcons name="flight-takeoff" size={12} color={DS.muted} />
                <Text style={s.destText}>Next: {item.dest}</Text>
              </View>
            </View>
            <Pressable style={({ pressed }) => [s.connectBtn, pressed && { opacity: 0.8 }]} onPress={() => router.push("/(social)/connect-flow" as any)}>
              <Text style={s.connectText}>Connect</Text>
            </Pressable>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={
          <Pressable style={s.swipeBtn} onPress={() => router.push("/(social)/swipe-travelers" as any)}>
            <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.swipeGrad}>
              <MaterialIcons name="swipe" size={18} color={DS.white} style={{ marginRight: 8 }} />
              <Text style={s.swipeText}>Swipe to Match Travelers</Text>
            </LinearGradient>
          </Pressable>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 24, fontFamily: "Chillax-Bold", color: DS.white },
  filterBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  swipeBtn: { height: 52, borderRadius: 26, overflow: "hidden", marginBottom: 16, shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  swipeGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  swipeText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
  card: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: DS.surface },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 },
  name: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
  matchBadge: { backgroundColor: "#02A65C", paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8 },
  matchText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.white },
  dnaText: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted, marginBottom: 4 },
  destRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  destText: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  connectBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: DS.purple, backgroundColor: "rgba(100,67,244,0.12)" },
  connectText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.purple },
});
