// Screen 26 — Itinerary Builder — STATIC 
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const DAYS = [
  { day: 1, date: "Apr 15", activities: [
    { time: "09:00", title: "Airport Transfer", duration: "1h", type: "Transport" },
    { time: "11:00", title: "Hotel Check-in", duration: "30m", type: "Hotel" },
    { time: "14:00", title: "Bali Swing Experience", duration: "3h", type: "Adventure" },
    { time: "19:00", title: "Dinner at Jimbaran Bay", duration: "2h", type: "Dining" },
  ]},
  { day: 2, date: "Apr 16", activities: [
    { time: "08:00", title: "Ubud Rice Terraces", duration: "4h", type: "Nature" },
    { time: "13:00", title: "Lunch at Locavore", duration: "1.5h", type: "Dining" },
    { time: "15:00", title: "Monkey Forest Sanctuary", duration: "2h", type: "Nature" },
  ]},
  { day: 3, date: "Apr 17", activities: [
    { time: "07:00", title: "Mount Batur Sunrise Trek", duration: "5h", type: "Adventure" },
    { time: "14:00", title: "Hot Springs", duration: "2h", type: "Wellness" },
  ]},
];

export default function ItineraryBuilderScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Build Itinerary</Text>
        <Pressable><Text style={s.menuText}>...</Text></Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={s.summary}>
          <Text style={s.summaryDest}>Bali, Indonesia</Text>
          <Text style={s.summaryDates}>Apr 15-22, 2026 | 7 nights</Text>
          <View style={s.summaryStats}>
            <View style={s.stat}><Text style={s.statValue}>9</Text><Text style={s.statLabel}>Activities</Text></View>
            <View style={s.stat}><Text style={s.statValue}>3</Text><Text style={s.statLabel}>Days Planned</Text></View>
            <View style={s.stat}><Text style={s.statValue}>4</Text><Text style={s.statLabel}>Days Free</Text></View>
          </View>
        </View>
        {DAYS.map((day) => (
          <View key={day.day}>
            <View style={s.dayHeader}>
              <Text style={s.dayTitle}>Day {day.day}</Text>
              <Text style={s.dayDate}>{day.date}</Text>
              <Pressable><Text style={s.addText}>+ Add</Text></Pressable>
            </View>
            {day.activities.map((act, i) => (
              <View key={i}>
                <Pressable style={s.actCard}>
                  <View style={s.timeCol}>
                    <Text style={s.actTime}>{act.time}</Text>
                    <View style={s.timeLine} />
                  </View>
                  <View style={s.actBody}>
                    <View style={s.actTop}>
                      <View style={{ flex: 1 }}>
                        <Text style={s.actTitle}>{act.title}</Text>
                        <Text style={s.actMeta}>{act.duration} | {act.type}</Text>
                      </View>
                      <Pressable><Text style={s.dragHandle}>::</Text></Pressable>
                    </View>
                  </View>
                </Pressable>
                {i < day.activities.length - 1 && (
                  <View style={s.travel}><View style={s.tLine}/><Text style={s.tText}>15 min</Text><View style={s.tLine}/></View>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={s.bottom}>
        <Text style={s.actCount}>9 activities</Text>
        <Pressable style={s.cta}><Text style={s.ctaText}>Continue to Review</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  menuText: { color: "#888", fontSize: 20 },
  summary: { padding: 20, height: 140, borderBottomWidth: 1, borderBottomColor: "#222", justifyContent: "center" },
  summaryDest: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  summaryDates: { color: "#888", fontSize: 13, marginTop: 4 },
  summaryStats: { flexDirection: "row", gap: 24, marginTop: 12 },
  stat: { alignItems: "center" },
  statValue: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  statLabel: { color: "#888", fontSize: 11, marginTop: 2 },
  dayHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12, backgroundColor: "#151515", borderBottomWidth: 1, borderBottomColor: "#222" },
  dayTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", flex: 1 },
  dayDate: { color: "#888", fontSize: 13, marginRight: 12 },
  addText: { color: "#888", fontSize: 13 },
  actCard: { flexDirection: "row", paddingHorizontal: 20, paddingVertical: 12, minHeight: 80 },
  timeCol: { width: 50, alignItems: "center" },
  actTime: { color: "#888", fontSize: 12 },
  timeLine: { flex: 1, width: 1, backgroundColor: "#333", marginTop: 4 },
  actBody: { flex: 1, marginLeft: 12, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 14 },
  actTop: { flexDirection: "row", alignItems: "flex-start" },
  actTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  actMeta: { color: "#888", fontSize: 12, marginTop: 4 },
  dragHandle: { color: "#555", fontSize: 16 },
  travel: { flexDirection: "row", alignItems: "center", paddingHorizontal: 40, height: 40, gap: 8 },
  tLine: { flex: 1, height: 1, backgroundColor: "#222" },
  tText: { color: "#666", fontSize: 11 },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222", alignItems: "center", gap: 8 },
  actCount: { color: "#888", fontSize: 13 },
  cta: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
