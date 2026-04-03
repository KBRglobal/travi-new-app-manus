// @ts-nocheck
/**
 * TRAVI — Health & Activity Settings
 */
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FITNESS_LEVELS = [
  { id: "sedentary", label: "Sedentary", desc: "Prefer minimal walking, use transport", emoji: "🛋️" },
  { id: "light", label: "Light Activity", desc: "Up to 2km walks, easy hikes", emoji: "🚶" },
  { id: "moderate", label: "Moderate", desc: "5–10km walks, light cycling", emoji: "🏃" },
  { id: "active", label: "Active", desc: "10+ km hikes, sports, cycling", emoji: "🚴" },
  { id: "athlete", label: "Athlete", desc: "Marathons, extreme sports, no limits", emoji: "🏋️" },
];

const HEALTH_CONDITIONS = [
  { id: "none", label: "No conditions", emoji: "✅" },
  { id: "heart", label: "Heart condition", emoji: "❤️" },
  { id: "diabetes", label: "Diabetes", emoji: "💉" },
  { id: "respiratory", label: "Respiratory issues", emoji: "🫁" },
  { id: "mobility", label: "Mobility limitations", emoji: "♿" },
  { id: "altitude", label: "Altitude sensitivity", emoji: "⛰️" },
  { id: "heat", label: "Heat sensitivity", emoji: "🌡️" },
  { id: "sea", label: "Sea sickness", emoji: "🌊" },
];

const DIETARY = [
  { id: "none", label: "No restrictions", emoji: "🍽️" },
  { id: "kosher", label: "Kosher", emoji: "✡️" },
  { id: "halal", label: "Halal", emoji: "☪️" },
  { id: "vegan", label: "Vegan", emoji: "🌱" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🥗" },
  { id: "gluten", label: "Gluten-free", emoji: "🌾" },
  { id: "lactose", label: "Lactose-free", emoji: "🥛" },
  { id: "nut", label: "Nut allergy", emoji: "🥜" },
];

export default function HealthActivityScreen() {
  const insets = useSafeAreaInsets();
  const [fitness, setFitness] = useState("moderate");
  const [conditions, setConditions] = useState<string[]>(["none"]);
  const [dietary, setDietary] = useState<string[]>(["kosher"]);

  const toggleMulti = (arr: string[], setArr: (v: string[]) => void, id: string) => {
    if (id === "none") { setArr(["none"]); return; }
    const next = arr.filter((x) => x !== "none");
    setArr(next.includes(id) ? next.filter((x) => x !== id) : [...next, id]);
  };

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <Text style={S.backText}>←</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>Health & Activity</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        <View style={S.infoBox}>
          <Text style={S.infoText}>This information helps TRAVI recommend activities, restaurants, and accommodations that match your health needs and fitness level.</Text>
        </View>

        {/* Fitness Level */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Fitness Level</Text>
          {FITNESS_LEVELS.map((f) => (
            <TouchableOpacity key={f.id} style={[S.optionRow, fitness === f.id && S.optionRowActive]} onPress={() => setFitness(f.id)} activeOpacity={0.8}>
              <Text style={S.optionEmoji}>{f.emoji}</Text>
              <View style={S.optionText}>
                <Text style={[S.optionLabel, fitness === f.id && S.optionLabelActive]}>{f.label}</Text>
                <Text style={S.optionDesc}>{f.desc}</Text>
              </View>
              <View style={[S.radio, fitness === f.id && S.radioActive]}>
                {fitness === f.id && <View style={S.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Conditions */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Health Conditions</Text>
          <Text style={S.sectionDesc}>Select all that apply — affects activity recommendations</Text>
          <View style={S.chipGrid}>
            {HEALTH_CONDITIONS.map((c) => (
              <TouchableOpacity key={c.id} style={[S.chip, conditions.includes(c.id) && S.chipActive]} onPress={() => toggleMulti(conditions, setConditions, c.id)} activeOpacity={0.8}>
                <Text style={S.chipEmoji}>{c.emoji}</Text>
                <Text style={[S.chipLabel, conditions.includes(c.id) && S.chipLabelActive]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dietary */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Dietary Preferences</Text>
          <Text style={S.sectionDesc}>Used for restaurant and food recommendations</Text>
          <View style={S.chipGrid}>
            {DIETARY.map((d) => (
              <TouchableOpacity key={d.id} style={[S.chip, dietary.includes(d.id) && S.chipActive]} onPress={() => toggleMulti(dietary, setDietary, d.id)} activeOpacity={0.8}>
                <Text style={S.chipEmoji}>{d.emoji}</Text>
                <Text style={[S.chipLabel, dietary.includes(d.id) && S.chipLabelActive]}>{d.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={S.section}>
          <TouchableOpacity style={S.saveBtn} activeOpacity={0.88}>
            <Text style={S.saveBtnText}>Save Preferences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#1A0B2E", fontSize: 18, fontWeight: "700",
      fontFamily: "Chillax-Semibold" },
  headerTitle: { flex: 1, color: "#1A0B2E", fontSize: 20, fontWeight: "900", textAlign: "center", fontFamily: "Chillax-Bold" },
  infoBox: { marginHorizontal: 20, marginBottom: 20, borderRadius: 12, backgroundColor: "rgba(100,67,244,0.1)", borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", padding: 18 },
  infoText: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 20 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 },
  sectionDesc: { color: "rgba(255,255,255,0.55)", fontSize: 12, marginBottom: 12 },
  optionRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, marginBottom: 8, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  optionRowActive: { backgroundColor: "rgba(100,67,244,0.12)", borderColor: "rgba(100,67,244,0.35)" },
  optionEmoji: { fontSize: 22 },
  optionText: { flex: 1, gap: 2 },
  optionLabel: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "700" },
  optionLabelActive: { color: "#1A0B2E" },
  optionDesc: { color: "rgba(255,255,255,0.55)", fontSize: 12 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center" },
  radioActive: { borderColor: "#6443F4" },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#6443F4" },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  chipActive: { backgroundColor: "rgba(100,67,244,0.18)", borderColor: "rgba(100,67,244,0.4)" },
  chipEmoji: { fontSize: 14 },
  chipLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  chipLabelActive: { color: "#1A0B2E" },
  saveBtn: { borderRadius: 14, backgroundColor: "#6443F4", paddingVertical: 16, alignItems: "center", shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10 },
  saveBtnText: { color: "#1A0B2E", fontSize: 15, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
});
