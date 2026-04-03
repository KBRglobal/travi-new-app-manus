// Screen 40 — Memories Gallery — STATIC WIREFRAME
// Summary 100px, 3-col grid, Group by Day toggle, Long-press multi-select, Full-screen viewer
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const PHOTOS = Array.from({ length: 18 }, (_, i) => ({ id: i + 1, day: i < 6 ? 1 : i < 12 ? 2 : 3 }));

export default function MemoriesScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Memories</Text>
        <Pressable><Text style={s.selectText}>Select</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Summary — 100px */}
        <View style={s.summaryCard}>
          <View style={s.summaryItem}><Text style={s.summaryNum}>18</Text><Text style={s.summaryLabel}>Photos</Text></View>
          <View style={s.summaryItem}><Text style={s.summaryNum}>3</Text><Text style={s.summaryLabel}>Videos</Text></View>
          <View style={s.summaryItem}><Text style={s.summaryNum}>3</Text><Text style={s.summaryLabel}>Days</Text></View>
        </View>

        {/* Group by Day toggle */}
        <View style={s.toggleRow}>
          <Text style={s.toggleLabel}>Group by Day</Text>
          <View style={s.toggle}><View style={s.toggleKnob} /></View>
        </View>

        {/* Day 1 */}
        <Text style={s.dayHeader}>Day 1 — Apr 15</Text>
        <View style={s.grid}>
          {PHOTOS.filter(p => p.day === 1).map((p) => (
            <Pressable key={p.id} style={s.gridItem}>
              <Text style={s.gridText}>{p.id}</Text>
            </Pressable>
          ))}
        </View>

        {/* Day 2 */}
        <Text style={s.dayHeader}>Day 2 — Apr 16</Text>
        <View style={s.grid}>
          {PHOTOS.filter(p => p.day === 2).map((p) => (
            <Pressable key={p.id} style={s.gridItem}>
              <Text style={s.gridText}>{p.id}</Text>
            </Pressable>
          ))}
        </View>

        {/* Day 3 */}
        <Text style={s.dayHeader}>Day 3 — Apr 17</Text>
        <View style={s.grid}>
          {PHOTOS.filter(p => p.day === 3).map((p) => (
            <Pressable key={p.id} style={s.gridItem}>
              <Text style={s.gridText}>{p.id}</Text>
            </Pressable>
          ))}
        </View>
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
  selectText: { color: "#888", fontSize: 14 },
  summaryCard: { flexDirection: "row", margin: 20, padding: 16, height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  summaryItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  summaryNum: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  summaryLabel: { color: "#888", fontSize: 12, marginTop: 2 },
  toggleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 12 },
  toggleLabel: { color: "#888", fontSize: 14 },
  toggle: { width: 48, height: 28, borderRadius: 14, backgroundColor: "#333", justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 2 },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#FFF" },
  dayHeader: { color: "#FFF", fontSize: 14, fontWeight: "600", paddingHorizontal: 20, marginTop: 16, marginBottom: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 18, gap: 4 },
  gridItem: { width: "31.5%", aspectRatio: 1, borderRadius: 8, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  gridText: { color: "#444", fontSize: 14 },
});
