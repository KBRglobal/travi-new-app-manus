// Screen 33 — Pre-Trip Checklist — STATIC 
// Progress card 100px, Accordion sections, Checkbox items 28x28, Add custom item
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const SECTIONS = [
  { title: "Documents", items: [
    { label: "Passport (valid 6+ months)", done: true },
    { label: "Visa / eVisa", done: true },
    { label: "Travel insurance", done: false },
    { label: "Flight tickets (printed/digital)", done: true },
  ]},
  { title: "Health", items: [
    { label: "Required vaccinations", done: false },
    { label: "Medications & prescriptions", done: false },
    { label: "First aid kit", done: true },
  ]},
  { title: "Packing", items: [
    { label: "Clothes for 7 days", done: false },
    { label: "Toiletries", done: false },
    { label: "Electronics & chargers", done: true },
    { label: "Travel adapter", done: true },
    { label: "Sunscreen & insect repellent", done: false },
  ]},
];

export default function PreTripChecklistScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Pre-Trip Checklist</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Progress card — 100px */}
        <View style={s.progressCard}>
          <View style={{ flex: 1 }}>
            <Text style={s.progressTitle}>8 of 12 completed</Text>
            <View style={s.progressBar}><View style={[s.progressFill, { width: "67%" }]} /></View>
          </View>
          <Text style={s.progressPct}>67%</Text>
        </View>

        {/* Accordion sections */}
        {SECTIONS.map((sec) => (
          <View key={sec.title} style={s.section}>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>{sec.title}</Text>
              <Text style={s.sectionCount}>{sec.items.filter(i => i.done).length}/{sec.items.length}</Text>
            </View>
            {sec.items.map((item, i) => (
              <Pressable key={i} style={s.checkItem}>
                <View style={[s.checkbox, item.done && s.checkboxDone]}>
                  {item.done && <Text style={s.checkMark}>+</Text>}
                </View>
                <Text style={[s.checkLabel, item.done && s.checkLabelDone]}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        ))}

        {/* Add custom item */}
        <Pressable style={s.addBtn}>
          <Text style={s.addText}>+ Add Custom Item</Text>
        </Pressable>
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
  progressCard: { flexDirection: "row", alignItems: "center", margin: 20, padding: 16, height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", gap: 16 },
  progressTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  progressBar: { height: 8, borderRadius: 4, backgroundColor: "#222", marginTop: 8 },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: "#555" },
  progressPct: { color: "#FFF", fontSize: 24, fontWeight: "800" },
  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#222" },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  sectionCount: { color: "#888", fontSize: 13 },
  checkItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  checkbox: { width: 28, height: 28, borderRadius: 6, borderWidth: 2, borderColor: "#444", justifyContent: "center", alignItems: "center" },
  checkboxDone: { backgroundColor: "#333", borderColor: "#666" },
  checkMark: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  checkLabel: { color: "#FFF", fontSize: 14, flex: 1 },
  checkLabelDone: { color: "#888", textDecorationLine: "line-through" },
  addBtn: { marginHorizontal: 20, marginTop: 20, height: 48, borderRadius: 12, borderWidth: 1, borderColor: "#333", borderStyle: "dashed", justifyContent: "center", alignItems: "center" },
  addText: { color: "#888", fontSize: 14 },
});
