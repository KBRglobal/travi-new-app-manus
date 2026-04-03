// Screen 32 — Pre-Trip Dashboard — STATIC WIREFRAME
// Header 80px gradient, Countdown 140px (progress ring), 2x2 quick actions 160px, Live Mode card
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const QUICK_ACTIONS = [
  { icon: "+", title: "Checklist", sub: "8/12 done" },
  { icon: "D", title: "Documents", sub: "3 pending" },
  { icon: "$", title: "Budget", sub: "E4,170" },
  { icon: "S", title: "Share Trip", sub: "Invite others" },
];

export default function PreTripDashboardScreen() {
  return (
    <View style={s.root}>
      {/* Header — 80px */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={s.headerTitle}>Bali Trip</Text>
          <Text style={s.headerSub}>Apr 15-22, 2026</Text>
        </View>
        <Pressable><Text style={s.menuText}>...</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Countdown card — 140px */}
        <View style={s.countdownCard}>
          <View style={s.progressRing}>
            <Text style={s.daysNum}>12</Text>
            <Text style={s.daysLabel}>days</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.countdownTitle}>12 Days Until Departure</Text>
            <Text style={s.countdownSub}>67% of preparation complete</Text>
            <View style={s.progressBar}><View style={[s.progressFill, { width: "67%" }]} /></View>
          </View>
        </View>

        {/* 2x2 Quick actions — 160px total */}
        <View style={s.actionsGrid}>
          {QUICK_ACTIONS.map((a) => (
            <Pressable key={a.title} style={s.actionCard}>
              <Text style={s.actionIcon}>{a.icon}</Text>
              <Text style={s.actionTitle}>{a.title}</Text>
              <Text style={s.actionSub}>{a.sub}</Text>
            </Pressable>
          ))}
        </View>

        {/* Trip details */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Trip Details</Text>
          <View style={s.detailCard}>
            <View style={s.detailRow}><Text style={s.detailLabel}>Flight</Text><Text style={s.detailValue}>Emirates TLV-DPS</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Hotel</Text><Text style={s.detailValue}>The Mulia Resort</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Activities</Text><Text style={s.detailValue}>9 planned</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Travelers</Text><Text style={s.detailValue}>2 Adults</Text></View>
          </View>
        </View>

        {/* Live Mode activation card */}
        <View style={s.section}>
          <View style={s.liveCard}>
            <Text style={s.liveTitle}>Live Mode</Text>
            <Text style={s.liveSub}>Available 24h before departure. Get real-time assistance, navigation, and AI recommendations during your trip.</Text>
            <View style={s.liveStatus}>
              <View style={s.statusDot} />
              <Text style={s.statusText}>Activates Apr 14, 2026</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 80, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, paddingTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  headerSub: { color: "#888", fontSize: 12, marginTop: 2 },
  menuText: { color: "#888", fontSize: 20 },
  countdownCard: { flexDirection: "row", margin: 20, padding: 20, height: 140, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", alignItems: "center", gap: 16 },
  progressRing: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  daysNum: { color: "#FFF", fontSize: 24, fontWeight: "800" },
  daysLabel: { color: "#888", fontSize: 11 },
  countdownTitle: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  countdownSub: { color: "#888", fontSize: 12, marginTop: 4 },
  progressBar: { height: 6, borderRadius: 3, backgroundColor: "#222", marginTop: 8 },
  progressFill: { height: 6, borderRadius: 3, backgroundColor: "#555" },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, gap: 12 },
  actionCard: { width: "47%", height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 14, justifyContent: "center" },
  actionIcon: { color: "#888", fontSize: 20, marginBottom: 4 },
  actionTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  actionSub: { color: "#888", fontSize: 11, marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  detailCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 16 },
  detailRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  detailLabel: { color: "#888", fontSize: 14 },
  detailValue: { color: "#FFF", fontSize: 14 },
  liveCard: { borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 20 },
  liveTitle: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  liveSub: { color: "#888", fontSize: 13, marginTop: 6, lineHeight: 20 },
  liveStatus: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#555" },
  statusText: { color: "#888", fontSize: 12 },
});
