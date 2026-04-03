// Screen 15 — Profile & Settings — STATIC WIREFRAME
// Route: /(tabs)/profile | Mode: Universal
// Spec: Header 180px (avatar 80x80 circle + name + email), Grouped menu sections, Logout bottom

import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from "react-native";

const MENU_SECTIONS = [
  {
    title: "ACCOUNT",
    items: [
      { icon: "👤", label: "Edit Profile", chevron: true },
      { icon: "🧬", label: "My Travel DNA", chevron: true },
      { icon: "💳", label: "Payment Methods", chevron: true },
      { icon: "🔔", label: "Notification Settings", chevron: true },
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      { icon: "🌙", label: "Dark Mode", toggle: true, value: true },
      { icon: "🌍", label: "Language", detail: "English", chevron: true },
      { icon: "💱", label: "Currency", detail: "EUR (€)", chevron: true },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { icon: "❓", label: "Help Center", chevron: true },
      { icon: "📝", label: "Send Feedback", chevron: true },
      { icon: "📜", label: "Terms of Service", chevron: true },
      { icon: "🔒", label: "Privacy Policy", chevron: true },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header — 180px */}
        <View style={s.header}>
          <View style={s.avatar}><Text style={s.avatarText}>DK</Text></View>
          <Text style={s.name}>David Kaplan</Text>
          <Text style={s.email}>david@example.com</Text>
          <View style={s.tierBadge}><Text style={s.tierText}>Gold Member</Text></View>
        </View>

        {/* Stats row */}
        <View style={s.statsRow}>
          <View style={s.stat}><Text style={s.statValue}>12</Text><Text style={s.statLabel}>Trips</Text></View>
          <View style={s.statDivider} />
          <View style={s.stat}><Text style={s.statValue}>€245</Text><Text style={s.statLabel}>Cashback</Text></View>
          <View style={s.statDivider} />
          <View style={s.stat}><Text style={s.statValue}>8</Text><Text style={s.statLabel}>Wishlist</Text></View>
        </View>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={s.menuSection}>
            <Text style={s.menuSectionTitle}>{section.title}</Text>
            <View style={s.menuGroup}>
              {section.items.map((item, i) => (
                <Pressable key={item.label} style={[s.menuRow, i < section.items.length - 1 && s.menuRowBorder]}>
                  <Text style={s.menuIcon}>{item.icon}</Text>
                  <Text style={s.menuLabel}>{item.label}</Text>
                  {item.detail && <Text style={s.menuDetail}>{item.detail}</Text>}
                  {item.toggle && <Switch value={item.value} trackColor={{ false: "#333", true: "#555" }} thumbColor="#FFF" />}
                  {item.chevron && <Text style={s.chevron}>›</Text>}
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <View style={s.logoutSection}>
          <Pressable style={s.logoutBtn}><Text style={s.logoutText}>Sign Out</Text></Pressable>
          <Text style={s.version}>TRAVI v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 220, alignItems: "center", justifyContent: "center",
    paddingTop: 56, backgroundColor: "#1A1A1A",
    borderBottomWidth: 1, borderBottomColor: "#222",
  },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#FFF", fontSize: 24, fontWeight: "700" },
  name: { color: "#FFF", fontSize: 20, fontWeight: "700" },
  email: { color: "#888", fontSize: 14, marginTop: 4 },
  tierBadge: { marginTop: 8, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, backgroundColor: "#333", borderWidth: 1, borderColor: "#555" },
  tierText: { color: "#CCC", fontSize: 12, fontWeight: "600" },
  statsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginHorizontal: 20, marginTop: 16, paddingVertical: 16, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  stat: { alignItems: "center" },
  statValue: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  statLabel: { color: "#888", fontSize: 12, marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: "#333" },
  menuSection: { marginTop: 24, paddingHorizontal: 20 },
  menuSectionTitle: { color: "#666", fontSize: 12, fontWeight: "600", letterSpacing: 1, marginBottom: 8 },
  menuGroup: { borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  menuRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: "#222" },
  menuIcon: { fontSize: 18 },
  menuLabel: { flex: 1, color: "#FFF", fontSize: 15 },
  menuDetail: { color: "#888", fontSize: 13 },
  chevron: { color: "#555", fontSize: 20 },
  logoutSection: { alignItems: "center", marginTop: 32, paddingBottom: 20 },
  logoutBtn: { paddingHorizontal: 32, paddingVertical: 12, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  logoutText: { color: "#FF3B30", fontSize: 15, fontWeight: "600" },
  version: { color: "#555", fontSize: 12, marginTop: 12 },
});
