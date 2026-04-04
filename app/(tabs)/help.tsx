// Screen 66 — Help & Support — STATIC 
// Search + 2x2 quick actions + popular topics + contact form
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const QUICK_ACTIONS = [
  { icon: "?", label: "FAQ" },
  { icon: "💬", label: "Live Chat" },
  { icon: "📧", label: "Email Us" },
  { icon: "📞", label: "Call Us" },
];

const TOPICS = [
  "How to book a trip",
  "Cancel or modify booking",
  "Wallet & payments",
  "DNA profile questions",
  "Account & security",
  "Cashback & rewards",
  "Technical issues",
  "Privacy & data",
];

export default function HelpScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Help & Support</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Search */}
        <View style={s.searchWrap}>
          <View style={s.searchBar}><Text style={s.searchPlaceholder}>Search for help...</Text></View>
        </View>

        {/* 2x2 quick actions */}
        <View style={s.grid}>
          {QUICK_ACTIONS.map((a) => (
            <Pressable key={a.label} style={s.gridItem}>
              <Text style={s.gridIcon}>{a.icon}</Text>
              <Text style={s.gridLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Popular topics */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Popular Topics</Text>
          {TOPICS.map((topic) => (
            <Pressable key={topic} style={s.topicRow}>
              <Text style={s.topicText}>{topic}</Text>
              <Text style={s.topicArrow}>{">"}</Text>
            </Pressable>
          ))}
        </View>

        {/* Contact form */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Still Need Help?</Text>
          <View style={s.formCard}>
            <View style={s.formField}><Text style={s.formLabel}>Subject</Text><View style={s.formInput}><Text style={s.formPlaceholder}>Describe your issue...</Text></View></View>
            <View style={s.formField}><Text style={s.formLabel}>Message</Text><View style={[s.formInput, { height: 100 }]}><Text style={s.formPlaceholder}>Tell us more...</Text></View></View>
            <Pressable style={s.submitBtn}><Text style={s.submitText}>Submit</Text></Pressable>
          </View>
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
  searchWrap: { padding: 20 },
  searchBar: { height: 48, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 16 },
  searchPlaceholder: { color: "#555", fontSize: 15 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 12 },
  gridItem: { width: "47%", height: 88, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", gap: 6 },
  gridIcon: { fontSize: 24 },
  gridLabel: { color: "#FFF", fontSize: 13, fontWeight: "600" },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  topicRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 48, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  topicText: { color: "#FFF", fontSize: 15 },
  topicArrow: { color: "#555", fontSize: 14 },
  formCard: { padding: 16, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", gap: 12 },
  formField: { gap: 4 },
  formLabel: { color: "#888", fontSize: 13 },
  formInput: { height: 44, borderRadius: 10, backgroundColor: "#111", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 12 },
  formPlaceholder: { color: "#555", fontSize: 14 },
  submitBtn: { height: 44, borderRadius: 22, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  submitText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
});
