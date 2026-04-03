// Screen 36 — Live Timeline — STATIC WIREFRAME
// Date selector chips, Daily summary, Activity cards 140px with status, Travel time indicators, Rate button
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const DAYS = ["Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20", "Apr 21"];

const ACTIVITIES = [
  { time: "08:00", title: "Breakfast at Hotel", location: "The Mulia Resort", status: "Done", duration: "1h" },
  { time: "10:00", title: "Ubud Rice Terraces", location: "Tegallalang", status: "Current", duration: "2h" },
  { time: "12:30", travel: "25 min drive" },
  { time: "13:00", title: "Lunch at Locavore", location: "Ubud Center", status: "Upcoming", duration: "1.5h" },
  { time: "14:30", travel: "15 min drive" },
  { time: "15:00", title: "Monkey Forest Sanctuary", location: "Ubud", status: "Upcoming", duration: "2h" },
  { time: "17:30", travel: "40 min drive" },
  { time: "18:00", title: "Sunset at Tanah Lot", location: "Tanah Lot Temple", status: "Upcoming", duration: "1.5h" },
];

export default function LiveTimelineScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Timeline</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Date selector chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.daysRow}>
        {DAYS.map((day, i) => (
          <Pressable key={day} style={[s.dayChip, i === 1 && s.dayChipActive]}>
            <Text style={[s.dayText, i === 1 && s.dayTextActive]}>{day}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Daily summary */}
      <View style={s.summaryRow}>
        <View style={s.summaryItem}><Text style={s.summaryNum}>5</Text><Text style={s.summaryLabel}>Activities</Text></View>
        <View style={s.summaryItem}><Text style={s.summaryNum}>8h</Text><Text style={s.summaryLabel}>Duration</Text></View>
        <View style={s.summaryItem}><Text style={s.summaryNum}>E95</Text><Text style={s.summaryLabel}>Spent</Text></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {ACTIVITIES.map((item, i) => {
          if ('travel' in item && item.travel) {
            return (
              <View key={i} style={s.travelIndicator}>
                <View style={s.travelLine} />
                <Text style={s.travelText}>{item.travel}</Text>
                <View style={s.travelLine} />
              </View>
            );
          }
          return (
            <Pressable key={i} style={s.activityCard}>
              <Text style={s.actTime}>{item.time}</Text>
              <View style={s.actDot}>
                <View style={[s.dot, item.status === "Current" && s.dotCurrent, item.status === "Done" && s.dotDone]} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.actTitle}>{item.title}</Text>
                <Text style={s.actLocation}>{item.location}</Text>
                <Text style={s.actDuration}>{item.duration}</Text>
              </View>
              <View style={[s.statusBadge, item.status === "Current" && s.statusCurrent, item.status === "Done" && s.statusDone]}>
                <Text style={[s.statusText, item.status === "Current" && s.statusTextCurrent]}>{item.status}</Text>
              </View>
              {item.status === "Done" && (
                <Pressable style={s.rateBtn}><Text style={s.rateText}>Rate</Text></Pressable>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  daysRow: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  dayChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  dayChipActive: { backgroundColor: "#333", borderColor: "#555" },
  dayText: { color: "#888", fontSize: 13, fontWeight: "600" },
  dayTextActive: { color: "#FFF" },
  summaryRow: { flexDirection: "row", paddingHorizontal: 20, paddingBottom: 12, gap: 12, borderBottomWidth: 1, borderBottomColor: "#222" },
  summaryItem: { flex: 1, alignItems: "center" },
  summaryNum: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  summaryLabel: { color: "#888", fontSize: 11, marginTop: 2 },
  activityCard: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 8, padding: 14, height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", gap: 10 },
  actTime: { color: "#888", fontSize: 12, width: 40 },
  actDot: { width: 16, alignItems: "center" },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#333" },
  dotCurrent: { backgroundColor: "#FFF" },
  dotDone: { backgroundColor: "#666" },
  actTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  actLocation: { color: "#888", fontSize: 12, marginTop: 2 },
  actDuration: { color: "#666", fontSize: 11, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: "#222" },
  statusCurrent: { backgroundColor: "#333" },
  statusDone: { backgroundColor: "#222" },
  statusText: { color: "#888", fontSize: 10, fontWeight: "600" },
  statusTextCurrent: { color: "#FFF" },
  rateBtn: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: "#444" },
  rateText: { color: "#888", fontSize: 11 },
  travelIndicator: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 6, gap: 8 },
  travelLine: { flex: 1, height: 1, backgroundColor: "#222" },
  travelText: { color: "#666", fontSize: 11 },
});
