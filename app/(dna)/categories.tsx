// Screen 7 — Quick DNA: Categories — STATIC 
// Route: /dna/categories | Mode: Onboarding Step 3/3
// Spec: 8 category cards, 2-col grid, multi-select (min 3), Continue with count

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const CATEGORIES = [
  { id: "adventure", emoji: "🏔️", label: "Adventure" },
  { id: "culture", emoji: "🏛️", label: "Culture" },
  { id: "food", emoji: "🍜", label: "Food & Dining" },
  { id: "nightlife", emoji: "🌃", label: "Nightlife" },
  { id: "nature", emoji: "🌿", label: "Nature" },
  { id: "wellness", emoji: "🧘", label: "Wellness" },
  { id: "shopping", emoji: "🛍️", label: "Shopping" },
  { id: "family", emoji: "👨‍👩‍👧", label: "Family" },
];

const SELECTED = ["adventure", "food"];

export default function CategoriesScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backIcon}>←</Text></Pressable>
        <Text style={s.headerTitle}>Your Interests</Text>
        <Text style={s.stepLabel}>Step 3/3</Text>
      </View>

      <ScrollView style={s.body} contentContainerStyle={s.bodyContent}>
        <Text style={s.instruction}>Select at least 3 categories that interest you</Text>

        <View style={s.grid}>
          {CATEGORIES.map((cat) => {
            const sel = SELECTED.includes(cat.id);
            return (
              <Pressable key={cat.id} style={[s.card, sel && s.cardSelected]}>
                <Text style={s.cardEmoji}>{cat.emoji}</Text>
                <Text style={[s.cardLabel, sel && s.cardLabelSel]}>{cat.label}</Text>
                {sel && <View style={s.checkBadge}><Text style={s.checkIcon}>✓</Text></View>}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={s.bottomBar}>
        <Pressable style={[s.primaryBtn, { opacity: 0.4 }]}>
          <Text style={s.primaryText}>Continue (2/3 min)</Text>
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
  stepLabel: { color: "#888", fontSize: 13 },
  body: { flex: 1 },
  bodyContent: { padding: 20, paddingBottom: 100 },
  instruction: { color: "#999", fontSize: 14, textAlign: "center", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "47%", aspectRatio: 1.2, borderRadius: 16,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333",
    justifyContent: "center", alignItems: "center", gap: 8,
  },
  cardSelected: { borderColor: "#666", backgroundColor: "#222" },
  cardEmoji: { fontSize: 36 },
  cardLabel: { color: "#CCC", fontSize: 14, fontWeight: "500" },
  cardLabelSel: { color: "#FFF", fontWeight: "600" },
  checkBadge: {
    position: "absolute", top: 10, right: 10,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: "#555", justifyContent: "center", alignItems: "center",
  },
  checkIcon: { color: "#FFF", fontSize: 14, fontWeight: "700" },
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
