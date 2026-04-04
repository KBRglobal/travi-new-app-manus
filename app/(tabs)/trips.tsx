// Screen 14 — My Trips
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const TABS = ["Upcoming", "Past", "Draft"];
const TRIPS = {
  Upcoming: [
    { id: "1", dest: "Bali, Indonesia", dates: "Mar 15–22, 2025", status: "Confirmed", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80", days: 7, companions: 2 },
    { id: "2", dest: "Tokyo, Japan", dates: "Apr 3–10, 2025", status: "Planning", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80", days: 7, companions: 1 },
  ],
  Past: [
    { id: "3", dest: "Paris, France", dates: "Dec 10–17, 2024", status: "Completed", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80", days: 7, companions: 2 },
    { id: "4", dest: "Dubai, UAE", dates: "Oct 5–9, 2024", status: "Completed", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80", days: 4, companions: 3 },
  ],
  Draft: [
    { id: "5", dest: "Santorini, Greece", dates: "Not scheduled", status: "Draft", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80", days: 5, companions: 2 },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Confirmed: "#02A65C",
  Planning: "#FF9327",
  Completed: "#A79FB2",
  Draft: "#6443F4",
};

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const trips = TRIPS[activeTab as keyof typeof TRIPS] || [];

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>My Trips</Text>
        <Pressable style={s.addBtn} onPress={() => router.push("/(trip)/plan" as any)}>
          <MaterialIcons name="add" size={22} color={DS.white} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={s.tabsWrap}>
        {TABS.map(tab => (
          <Pressable key={tab} style={[s.tab, activeTab === tab && s.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>{tab}</Text>
          </Pressable>
        ))}
      </View>

      {/* Trip list */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {trips.map(trip => (
          <Pressable key={trip.id} style={({ pressed }) => [s.card, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]} onPress={() => router.push("/(tabs)/trip-hub" as any)}>
            <Image source={{ uri: trip.img }} style={s.cardImg} />
            <LinearGradient colors={["transparent", "rgba(10,5,20,0.95)"]} style={s.cardOverlay} />
            <View style={[s.statusBadge, { backgroundColor: STATUS_COLORS[trip.status] + "33", borderColor: STATUS_COLORS[trip.status] + "66" }]}>
              <View style={[s.statusDot, { backgroundColor: STATUS_COLORS[trip.status] }]} />
              <Text style={[s.statusText, { color: STATUS_COLORS[trip.status] }]}>{trip.status}</Text>
            </View>
            <View style={s.cardContent}>
              <Text style={s.cardDest}>{trip.dest}</Text>
              <Text style={s.cardDates}>{trip.dates}</Text>
              <View style={s.cardMeta}>
                <View style={s.metaItem}>
                  <MaterialIcons name="calendar-today" size={13} color={DS.muted} />
                  <Text style={s.metaText}>{trip.days} days</Text>
                </View>
                <View style={s.metaItem}>
                  <MaterialIcons name="people" size={13} color={DS.muted} />
                  <Text style={s.metaText}>{trip.companions} travelers</Text>
                </View>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.5)" style={s.cardArrow} />
          </Pressable>
        ))}

        {/* Plan new trip CTA */}
        <Pressable style={({ pressed }) => [s.planBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/plan" as any)}>
          <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.planGrad}>
            <MaterialIcons name="add" size={20} color={DS.white} style={{ marginRight: 8 }} />
            <Text style={s.planText}>Plan a New Trip</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: DS.white },
  addBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  tabsWrap: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 4 },
  tab: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  tabActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: DS.purple },
  tabText: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.muted },
  tabTextActive: { color: DS.white },
  card: { height: 180, borderRadius: 20, overflow: "hidden", marginBottom: 14, backgroundColor: DS.surface },
  cardImg: { ...StyleSheet.absoluteFillObject },
  cardOverlay: { ...StyleSheet.absoluteFillObject },
  statusBadge: { position: "absolute", top: 12, right: 12, flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontFamily: "Satoshi-Bold" },
  cardContent: { position: "absolute", bottom: 14, left: 16, right: 40 },
  cardDest: { fontSize: 20, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 3 },
  cardDates: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)", marginBottom: 8 },
  cardMeta: { flexDirection: "row", gap: 14 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  cardArrow: { position: "absolute", right: 14, bottom: 20 },
  planBtn: { marginTop: 4, height: 52, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  planGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  planText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
});
