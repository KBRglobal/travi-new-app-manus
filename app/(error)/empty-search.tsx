// Screen 68 — Empty No Search Results — STATIC WIREFRAME
// Suggestions + popular + browse categories
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const SUGGESTIONS = ["Bali", "Tokyo", "Barcelona", "Santorini"];
const CATEGORIES = ["Beach", "Adventure", "Culture", "Nightlife", "Food", "Nature"];

export default function EmptySearchScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <View style={s.searchBar}><Text style={s.searchText}>xyznotfound</Text></View>
        <Pressable><Text style={s.cancelText}>Cancel</Text></Pressable>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={s.emptySection}>
          <View style={s.iconWrap}><Text style={s.icon}>🔍</Text></View>
          <Text style={s.title}>No Results Found</Text>
          <Text style={s.body}>Try different keywords or browse our suggestions below.</Text>
        </View>
        <View style={s.section}>
          <Text style={s.sectionTitle}>Try Searching For</Text>
          <View style={s.chipsRow}>
            {SUGGESTIONS.map((s2) => (
              <Pressable key={s2} style={s.chip}><Text style={s.chipText}>{s2}</Text></Pressable>
            ))}
          </View>
        </View>
        <View style={s.section}>
          <Text style={s.sectionTitle}>Browse Categories</Text>
          <View style={s.chipsRow}>
            {CATEGORIES.map((c) => (
              <Pressable key={c} style={s.chip}><Text style={s.chipText}>{c}</Text></Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, marginTop: 48, height: 60, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  searchBar: { flex: 1, height: 40, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 12 },
  searchText: { color: "#FFF", fontSize: 15 },
  cancelText: { color: "#888", fontSize: 14 },
  emptySection: { alignItems: "center", paddingVertical: 40, paddingHorizontal: 40 },
  iconWrap: { width: 80, height: 80, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  icon: { fontSize: 32 },
  title: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  body: { color: "#888", fontSize: 14, textAlign: "center", marginTop: 6 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  chipText: { color: "#FFF", fontSize: 13 },
});
