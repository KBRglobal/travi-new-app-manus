import { useRouter } from 'expo-router';
// Screen 18 — Notifications
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const FILTERS = ["All", "Trips", "Deals", "Social", "System"];
const NOTIFS = [
  { id: "1", type: "trip", icon: "flight-takeoff", title: "Your Bali trip starts tomorrow!", body: "Check your itinerary and packing list.", time: "2h ago", unread: true, color: DS.purple },
  { id: "2", type: "deal", icon: "local-offer", title: "Flash Deal: Tokyo -40%", body: "Limited seats available. Book now.", time: "5h ago", unread: true, color: DS.pink },
  { id: "3", type: "social", icon: "people", title: "Sarah joined your trip", body: "Sarah Cohen accepted your invite to Santorini.", time: "1d ago", unread: false, color: DS.success },
  { id: "4", type: "system", icon: "verified", title: "Identity Verified", body: "Your KYC verification was approved.", time: "2d ago", unread: false, color: DS.info },
  { id: "5", type: "trip", icon: "hotel", title: "Hotel Confirmed", body: "Alaya Resort Ubud — Check-in Mar 15", time: "3d ago", unread: false, color: DS.purple },
  { id: "6", type: "deal", icon: "star", title: "New destinations match your DNA", body: "6 new places added to your Explore feed.", time: "4d ago", unread: false, color: DS.warning },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = NOTIFS.filter(n => activeFilter === "All" || n.type === activeFilter.toLowerCase());

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>Notifications</Text>
        <Pressable style={s.markAllBtn}>
          <Text style={s.markAllText}>Mark All Read</Text>
        </Pressable>
      </View>

      {/* Filters */}
      <View style={s.filtersWrap}>
        {FILTERS.map(f => (
          <Pressable key={f} style={[s.chip, activeFilter === f && s.chipActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[s.chipText, activeFilter === f && s.chipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [s.notifRow, item.unread && s.notifUnread, pressed && { opacity: 0.8 }]}>
            <View style={[s.iconWrap, { backgroundColor: item.color + "22", borderColor: item.color + "44" }]}>
              <MaterialIcons name={item.icon as any} size={20} color={item.color} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={s.notifHeader}>
                <Text style={s.notifTitle} numberOfLines={1}>{item.title}</Text>
                {item.unread && <View style={s.unreadDot} />}
              </View>
              <Text style={s.notifBody} numberOfLines={2}>{item.body}</Text>
              <Text style={s.notifTime}>{item.time}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 24, fontFamily: "Chillax-Bold", color: DS.white },
  markAllBtn: { paddingVertical: 6, paddingHorizontal: 12 },
  markAllText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.purple },
  filtersWrap: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  chipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: DS.purple },
  chipText: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted },
  chipTextActive: { color: DS.white },
  notifRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, padding: 14, borderRadius: 16, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  notifUnread: { borderColor: "rgba(100,67,244,0.35)", backgroundColor: "rgba(100,67,244,0.08)" },
  iconWrap: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  notifHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 3 },
  notifTitle: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Bold", color: DS.white },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: DS.pink },
  notifBody: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted, lineHeight: 18, marginBottom: 4 },
  notifTime: { fontSize: 11, fontFamily: "Satoshi-Regular", color: DS.placeholder },
});
