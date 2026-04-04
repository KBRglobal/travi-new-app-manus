// Screen 9 — Quick DNA: Schedule — STATIC 
// Route: /dna/schedule | Mode: Onboarding
// Spec: 4 radio options for travel timeline, Continue CTA

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const OPTIONS = [
  { id: "soon", label: "Within 2 weeks", desc: "I'm ready to go!" },
  { id: "month", label: "Within a month", desc: "Planning ahead" },
  { id: "quarter", label: "In 2-3 months", desc: "Taking my time" },
  { id: "exploring", label: "Just exploring", desc: "No specific plans yet" },
];

const SELECTED = "month";

export default function ScheduleScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backIcon}>←</Text></Pressable>
        <Text style={s.headerTitle}>Travel Timeline</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={s.body} contentContainerStyle={s.bodyContent}>
        <Text style={s.title}>When are you planning to travel?</Text>
        <Text style={s.subtitle}>This helps us prioritize your recommendations</Text>

        <View style={s.optionsList}>
          {OPTIONS.map((opt) => {
            const sel = opt.id === SELECTED;
            return (
              <Pressable key={opt.id} style={[s.option, sel && s.optionSelected]}>
                <View style={[s.radio, sel && s.radioSel]}>
                  {sel && <View style={s.radioDot} />}
                </View>
                <View style={s.optionContent}>
                  <Text style={[s.optionLabel, sel && s.optionLabelSel]}>{opt.label}</Text>
                  <Text style={s.optionDesc}>{opt.desc}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={s.bottomBar}>
        <Pressable style={s.primaryBtn}>
          <Text style={s.primaryText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 60, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#222", marginTop: 48,
  },
  backBtn: { width: 44, height: 44, justifyContent: "center" },
  backIcon: { color: "#FFF", fontSize: 20 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  body: { flex: 1 },
  bodyContent: { padding: 24, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: "700", color: "#FFF", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#999", marginBottom: 28 },
  optionsList: { gap: 12 },
  option: {
    flexDirection: "row", alignItems: "center", gap: 16,
    padding: 16, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333",
  },
  optionSelected: { borderColor: "#666", backgroundColor: "#222" },
  radio: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: "#555",
    justifyContent: "center", alignItems: "center",
  },
  radioSel: { borderColor: "#888" },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#888" },
  optionContent: { flex: 1 },
  optionLabel: { color: "#CCC", fontSize: 16, fontWeight: "600" },
  optionLabelSel: { color: "#FFF" },
  optionDesc: { color: "#777", fontSize: 13, marginTop: 2 },
  bottomBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 36, backgroundColor: "#111",
    borderTopWidth: 1, borderTopColor: "#222",
  },
  primaryBtn: {
    height: 56, borderRadius: 28, backgroundColor: "#333",
    borderWidth: 1, borderColor: "#555",
    justifyContent: "center", alignItems: "center",
  },
  primaryText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
