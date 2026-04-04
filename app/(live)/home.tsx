// Screen 35 — Live Trip Dashboard
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const TIMELINE = [
  { time: "09:00", label: "Breakfast at Locavore", icon: "restaurant", done: true, color: DS.success },
  { time: "11:00", label: "Tanah Lot Temple", icon: "temple-hindu", done: true, color: DS.success },
  { time: "14:00", label: "Tegalalang Rice Terraces", icon: "terrain", done: false, color: DS.purple, current: true },
  { time: "17:00", label: "Seminyak Beach Sunset", icon: "beach-access", done: false, color: DS.warning },
  { time: "20:00", label: "Dinner at Merah Putih", icon: "dinner-dining", done: false, color: DS.pink },
];

export default function LiveHomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Live header */}
      <View style={s.header}>
        <View>
          <View style={s.livePill}>
            <View style={s.liveDot} />
            <Text style={s.liveText}>LIVE TRIP</Text>
          </View>
          <Text style={s.headerTitle}>Bali, Indonesia</Text>
        </View>
        <Pressable style={s.emergencyBtn} onPress={() => router.push("/(trip)/emergency" as any)}>
          <MaterialIcons name="emergency" size={18} color={DS.error} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {/* Day progress */}
        <View style={s.progressCard}>
          <View style={s.progressHeader}>
            <Text style={s.progressTitle}>Day 3 of 7</Text>
            <Text style={s.progressDate}>Mar 17, 2025</Text>
          </View>
          <View style={s.progressBar}>
            <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[s.progressFill, { width: "43%" }]} />
          </View>
          <Text style={s.progressSub}>2 of 5 activities completed today</Text>
        </View>

        {/* Quick actions */}
        <View style={s.actionsRow}>
          {[
            { icon: "map", label: "Map", route: "/(live)/map" },
            { icon: "chat", label: "AI Chat", route: "/(live)/chat" },
            { icon: "account-balance-wallet", label: "Expenses", route: "/(live)/expenses" },
            { icon: "photo-camera", label: "Memories", route: "/(trip)/memories" },
          ].map(a => (
            <Pressable key={a.label} style={({ pressed }) => [s.actionBtn, pressed && { opacity: 0.7 }]} onPress={() => router.push(a.route as any)}>
              <View style={s.actionIcon}>
                <MaterialIcons name={a.icon as any} size={22} color={DS.purple} />
              </View>
              <Text style={s.actionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Today's timeline */}
        <Text style={s.sectionTitle}>Today's Schedule</Text>
        {TIMELINE.map((item, idx) => (
          <View key={idx} style={s.timelineRow}>
            <View style={s.timelineLeft}>
              <Text style={[s.timelineTime, item.done && s.timeDone]}>{item.time}</Text>
              {idx < TIMELINE.length - 1 && <View style={[s.timelineLine, item.done && s.lineDone]} />}
            </View>
            <View style={[s.timelineCard, item.current && s.timelineCardCurrent]}>
              <View style={[s.timelineIcon, { backgroundColor: item.color + "22", borderColor: item.color + "44" }]}>
                <MaterialIcons name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={[s.timelineLabel, item.done && s.labelDone]}>{item.label}</Text>
              {item.current && <View style={s.currentBadge}><Text style={s.currentText}>NOW</Text></View>}
              {item.done && <MaterialIcons name="check-circle" size={18} color={DS.success} />}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: DS.success },
  liveText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.success, letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white },
  emergencyBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,107,107,0.12)", borderWidth: 1, borderColor: "rgba(255,107,107,0.3)", justifyContent: "center", alignItems: "center" },
  progressCard: { backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, padding: 16, marginBottom: 20 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  progressTitle: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white },
  progressDate: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted },
  progressBar: { height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.08)", marginBottom: 8 },
  progressFill: { height: 6, borderRadius: 3 },
  progressSub: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  actionBtn: { alignItems: "center", gap: 6 },
  actionIcon: { width: 56, height: 56, borderRadius: 16, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  actionLabel: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 16 },
  timelineRow: { flexDirection: "row", gap: 12, marginBottom: 0 },
  timelineLeft: { width: 48, alignItems: "center" },
  timelineTime: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted, marginBottom: 4 },
  timeDone: { color: DS.success },
  timelineLine: { width: 2, flex: 1, backgroundColor: DS.border, marginBottom: -4 },
  lineDone: { backgroundColor: DS.success },
  timelineCard: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10, padding: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, marginBottom: 8 },
  timelineCardCurrent: { borderColor: DS.purple, backgroundColor: "rgba(100,67,244,0.1)" },
  timelineIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  timelineLabel: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.white },
  labelDone: { color: DS.muted },
  currentBadge: { backgroundColor: DS.purple, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  currentText: { fontSize: 10, fontFamily: "Satoshi-Bold", color: DS.white },
});
