// Screen 55 — Settings — STATIC WIREFRAME
// Header 60px, Sections: Account / Notifications / Privacy / App Prefs / AI Settings / Storage / Support / Logout
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const SECTIONS = [
  { title: "Account", items: [
    { label: "Change Email", arrow: true },
    { label: "Change Password", arrow: true },
    { label: "Two-Factor Authentication", toggle: true, on: false },
    { label: "Connected Accounts", arrow: true },
  ]},
  { title: "Notifications", items: [
    { label: "Push Notifications", toggle: true, on: true },
    { label: "Email Notifications", toggle: true, on: true },
    { label: "Trip Reminders", toggle: true, on: true },
    { label: "Price Alerts", toggle: true, on: false },
    { label: "Marketing", toggle: true, on: false },
  ]},
  { title: "Privacy", items: [
    { label: "Location Services", arrow: true },
    { label: "Data Sharing", toggle: true, on: false },
    { label: "Analytics", toggle: true, on: true },
    { label: "Download My Data", arrow: true },
  ]},
  { title: "App Preferences", items: [
    { label: "Language", value: "English", arrow: true },
    { label: "Currency", value: "EUR (E)", arrow: true },
    { label: "Temperature", value: "Celsius", arrow: true },
    { label: "Dark Mode", value: "Auto", arrow: true },
  ]},
  { title: "AI Settings", items: [
    { label: "AI Recommendations", toggle: true, on: true },
    { label: "Personalization Level", value: "High", arrow: true },
    { label: "Voice Assistant", toggle: true, on: false },
  ]},
  { title: "Storage", items: [
    { label: "Cache Size", value: "124 MB", arrow: true },
    { label: "Clear Cache", arrow: true },
    { label: "Offline Maps", value: "2 maps", arrow: true },
  ]},
  { title: "Support", items: [
    { label: "Help Center", arrow: true },
    { label: "Contact Us", arrow: true },
    { label: "Report a Bug", arrow: true },
    { label: "Rate the App", arrow: true },
    { label: "Terms of Service", arrow: true },
    { label: "Privacy Policy", arrow: true },
  ]},
];

export default function SettingsScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Settings</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <Pressable key={item.label} style={s.row}>
                <Text style={s.rowLabel}>{item.label}</Text>
              {(item as any).toggle ? (
                  <View style={[s.toggle, (item as any).on && s.toggleOn]}>
                    <View style={[s.toggleKnob, (item as any).on && s.toggleKnobOn]} />
                  </View>
                ) : (
                  <View style={s.rowRight}>
                    {(item as any).value && <Text style={s.rowValue}>{(item as any).value}</Text>}
                    {(item as any).arrow && <Text style={s.rowArrow}>{">"}  </Text>}
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        ))}

        <Pressable style={s.logoutBtn}><Text style={s.logoutText}>Log Out</Text></Pressable>
        <Text style={s.version}>TRAVI v1.0.0 | Build 2026.04</Text>
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
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 48, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  rowLabel: { color: "#FFF", fontSize: 15 },
  rowRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  rowValue: { color: "#888", fontSize: 14 },
  rowArrow: { color: "#555", fontSize: 14 },
  toggle: { width: 48, height: 28, borderRadius: 14, backgroundColor: "#333", justifyContent: "center", paddingHorizontal: 2 },
  toggleOn: { backgroundColor: "#555" },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#666" },
  toggleKnobOn: { backgroundColor: "#FFF", alignSelf: "flex-end" },
  logoutBtn: { alignSelf: "center", marginTop: 28, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: "#F8717140" },
  logoutText: { color: "#F87171", fontSize: 15, fontWeight: "600" },
  version: { color: "#555", fontSize: 11, textAlign: "center", marginTop: 16 },
});
