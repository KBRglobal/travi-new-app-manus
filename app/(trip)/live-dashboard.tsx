// Screen 35 — Live Dashboard — STATIC 
// Header 120px, 2x3 quick actions 88px, Today's Schedule 240px, AI Proactive 140px, Emergency card
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const ACTIONS = [
  { icon: "M", title: "Map" },
  { icon: "T", title: "Timeline" },
  { icon: "$", title: "Expenses" },
  { icon: "P", title: "Photos" },
  { icon: "C", title: "AI Chat" },
  { icon: "!", title: "Emergency" },
];

const SCHEDULE = [
  { time: "08:00", title: "Breakfast at Hotel", status: "Done" },
  { time: "10:00", title: "Ubud Rice Terraces", status: "Current" },
  { time: "13:00", title: "Lunch at Locavore", status: "Upcoming" },
  { time: "15:00", title: "Monkey Forest", status: "Upcoming" },
];

export default function LiveDashboardScreen() {
  return (
    <View style={s.root}>
      {/* Header — 120px */}
      <View style={s.header}>
        <View style={s.modeBadge}><Text style={s.modeText}>LIVE</Text></View>
        <Text style={s.headerTitle}>Bali Trip</Text>
        <Text style={s.headerSub}>Day 2 of 7 | Apr 16, 2026</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 2x3 Quick actions — 88px each */}
        <View style={s.actionsGrid}>
          {ACTIONS.map((a) => (
            <Pressable key={a.title} style={s.actionCard}>
              <Text style={s.actionIcon}>{a.icon}</Text>
              <Text style={s.actionTitle}>{a.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* Today's Schedule — 240px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Today's Schedule</Text>
          <View style={s.scheduleCard}>
            {SCHEDULE.map((item, i) => (
              <View key={i} style={[s.scheduleRow, i < SCHEDULE.length - 1 && s.scheduleBorder]}>
                <Text style={s.schedTime}>{item.time}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.schedTitle}>{item.title}</Text>
                </View>
                <View style={[s.statusBadge, item.status === "Current" && s.statusCurrent, item.status === "Done" && s.statusDone]}>
                  <Text style={[s.statusText, item.status === "Current" && s.statusTextCurrent]}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Proactive — 140px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>AI Suggestion</Text>
          <View style={s.aiCard}>
            <Text style={s.aiTitle}>Weather Alert</Text>
            <Text style={s.aiDesc}>Rain expected at 14:00. Consider moving Monkey Forest to tomorrow and visiting the indoor art gallery instead.</Text>
            <View style={s.aiActions}>
              <Pressable style={s.aiBtn}><Text style={s.aiBtnText}>Accept</Text></Pressable>
              <Pressable style={s.aiDismiss}><Text style={s.aiDismissText}>Dismiss</Text></Pressable>
            </View>
          </View>
        </View>

        {/* Emergency card */}
        <View style={s.section}>
          <Pressable style={s.emergencyCard}>
            <Text style={s.emergencyIcon}>!</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.emergencyTitle}>Emergency Contacts</Text>
              <Text style={s.emergencySub}>Police, Hospital, Embassy, Hotel</Text>
            </View>
            <Text style={s.emergencyArrow}>{">"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 120, paddingHorizontal: 20, paddingTop: 52, borderBottomWidth: 1, borderBottomColor: "#222" },
  modeBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: "#333", marginBottom: 4 },
  modeText: { color: "#4ADE80", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  headerTitle: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  headerSub: { color: "#888", fontSize: 13, marginTop: 2 },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, paddingTop: 16, gap: 10 },
  actionCard: { width: "30%", height: 88, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", gap: 6 },
  actionIcon: { color: "#888", fontSize: 20, fontWeight: "700" },
  actionTitle: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  scheduleCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  scheduleRow: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  scheduleBorder: { borderBottomWidth: 1, borderBottomColor: "#222" },
  schedTime: { color: "#888", fontSize: 13, width: 48 },
  schedTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: "#222" },
  statusCurrent: { backgroundColor: "#333" },
  statusDone: { backgroundColor: "#222" },
  statusText: { color: "#888", fontSize: 11, fontWeight: "600" },
  statusTextCurrent: { color: "#FFF" },
  aiCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 16 },
  aiTitle: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  aiDesc: { color: "#888", fontSize: 13, marginTop: 6, lineHeight: 20 },
  aiActions: { flexDirection: "row", gap: 10, marginTop: 12 },
  aiBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: "#333" },
  aiBtnText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
  aiDismiss: { paddingHorizontal: 16, paddingVertical: 8 },
  aiDismissText: { color: "#888", fontSize: 13 },
  emergencyCard: { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", gap: 12 },
  emergencyIcon: { color: "#F87171", fontSize: 20, fontWeight: "800" },
  emergencyTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  emergencySub: { color: "#888", fontSize: 12, marginTop: 2 },
  emergencyArrow: { color: "#555", fontSize: 16 },
});
