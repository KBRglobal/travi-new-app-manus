// Screen 43 — Trip Settings — STATIC 
// Toggle rows 56px, Preference selectors, Trip Management buttons, Danger Zone
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const TOGGLES = [
  { label: "Push Notifications", on: true },
  { label: "Location Tracking", on: true },
  { label: "Auto-sync Photos", on: false },
  { label: "Offline Mode", on: false },
];

const PREFS = [
  { label: "Currency", value: "EUR (E)" },
  { label: "Temperature", value: "Celsius" },
  { label: "Distance", value: "Kilometers" },
  { label: "Language", value: "English" },
];

export default function TripSettingsScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Trip Settings</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Toggle rows — 56px each */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Notifications & Tracking</Text>
          {TOGGLES.map((t) => (
            <View key={t.label} style={s.toggleRow}>
              <Text style={s.toggleLabel}>{t.label}</Text>
              <View style={[s.toggle, t.on && s.toggleOn]}>
                <View style={[s.toggleKnob, t.on && s.toggleKnobOn]} />
              </View>
            </View>
          ))}
        </View>

        {/* Preference selectors */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Preferences</Text>
          {PREFS.map((p) => (
            <Pressable key={p.label} style={s.prefRow}>
              <Text style={s.prefLabel}>{p.label}</Text>
              <View style={s.prefValue}>
                <Text style={s.prefValueText}>{p.value}</Text>
                <Text style={s.prefArrow}>{">"}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Trip Management */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Trip Management</Text>
          <Pressable style={s.mgmtBtn}><Text style={s.mgmtText}>Edit Trip Details</Text></Pressable>
          <Pressable style={s.mgmtBtn}><Text style={s.mgmtText}>Manage Travelers</Text></Pressable>
          <Pressable style={s.mgmtBtn}><Text style={s.mgmtText}>Export Trip Data</Text></Pressable>
          <Pressable style={s.mgmtBtn}><Text style={s.mgmtText}>Share Trip</Text></Pressable>
        </View>

        {/* Danger Zone */}
        <View style={s.section}>
          <Text style={s.dangerTitle}>Danger Zone</Text>
          <Pressable style={s.dangerBtn}><Text style={s.dangerText}>End Trip Early</Text></Pressable>
          <Pressable style={[s.dangerBtn, s.cancelBtn]}><Text style={s.cancelText}>Cancel Trip</Text></Pressable>
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
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  toggleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 56, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  toggleLabel: { color: "#FFF", fontSize: 15 },
  toggle: { width: 48, height: 28, borderRadius: 14, backgroundColor: "#333", justifyContent: "center", paddingHorizontal: 2 },
  toggleOn: { backgroundColor: "#555" },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#666" },
  toggleKnobOn: { backgroundColor: "#FFF", alignSelf: "flex-end" },
  prefRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 56, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  prefLabel: { color: "#FFF", fontSize: 15 },
  prefValue: { flexDirection: "row", alignItems: "center", gap: 6 },
  prefValueText: { color: "#888", fontSize: 14 },
  prefArrow: { color: "#555", fontSize: 14 },
  mgmtBtn: { height: 52, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 16, marginBottom: 8 },
  mgmtText: { color: "#FFF", fontSize: 15 },
  dangerTitle: { color: "#F87171", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  dangerBtn: { height: 52, borderRadius: 12, borderWidth: 1, borderColor: "#F8717140", justifyContent: "center", alignItems: "center", marginBottom: 8 },
  dangerText: { color: "#F87171", fontSize: 15, fontWeight: "600" },
  cancelBtn: { backgroundColor: "#2A1515" },
  cancelText: { color: "#F87171", fontSize: 15, fontWeight: "600" },
});
