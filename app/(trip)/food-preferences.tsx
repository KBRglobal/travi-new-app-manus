import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { recordFoodPreferences } from "@/lib/dna-store";

const CUISINES = [
  "Italian", "Japanese", "Mexican", "Indian",
  "Thai", "Chinese", "French", "American",
  "Mediterranean", "Middle Eastern", "Korean", "Greek",
];

const AVOID = [
  "Pork", "Beef", "Chicken", "Seafood",
  "Fried food", "Spicy food", "Raw food", "Alcohol",
];

const ALLERGIES = [
  "Nuts", "Dairy / Lactose", "Gluten", "Shellfish",
  "Eggs", "Soy", "Sesame", "Wheat",
];

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {selected && <Text style={styles.chipCheck}>✓ </Text>}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function FoodPreferencesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    destination?: string;
    budget?: string;
    interests?: string;
  }>();

  const [cuisines, setCuisines] = useState<string[]>([]);
  const [avoid, setAvoid] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  function toggle(list: string[], setList: (v: string[]) => void, item: string) {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  }

  function addCustomAllergy() {
    const trimmed = customAllergy.trim();
    if (trimmed && !allergies.includes(trimmed)) {
      setAllergies([...allergies, trimmed]);
    }
    setCustomAllergy("");
  }

  async function handleSave() {
    setSaving(true);
    await recordFoodPreferences({ cuisines, avoid, allergies, notes });
    setSaving(false);
    // Navigate to swipe with food context
    router.push({
      pathname: "/(trip)/swipe" as never,
      params: {
        destination: params.destination ?? "dubai",
        budget: params.budget ?? "mid",
        interests: params.interests ?? "food",
        foodCuisines: cuisines.join(","),
        foodAvoid: avoid.join(","),
        foodAllergies: allergies.join(","),
      },
    });
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <LinearGradient
        colors={["#1a0533", "#2d1060"]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Preferences</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro message */}
        <View style={styles.introCard}>
          <Text style={styles.introIcon}>🍽️</Text>
          <Text style={styles.introTitle}>Help us find your perfect restaurants</Text>
          <Text style={styles.introText}>
            To recommend the right spots, we need to know your food preferences.
            Everything you share is saved to your DNA profile and used for all future trips.
          </Text>
        </View>

        {/* Preferred Cuisines */}
        <Text style={styles.sectionTitle}>Preferred Cuisines</Text>
        <View style={styles.chipGrid}>
          {CUISINES.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={cuisines.includes(c)}
              onPress={() => toggle(cuisines, setCuisines, c)}
            />
          ))}
        </View>

        {/* Foods to Avoid */}
        <Text style={styles.sectionTitle}>Foods to Avoid</Text>
        <View style={styles.chipGrid}>
          {AVOID.map((a) => (
            <Chip
              key={a}
              label={a}
              selected={avoid.includes(a)}
              onPress={() => toggle(avoid, setAvoid, a)}
            />
          ))}
        </View>

        {/* Sensitivities & Allergies */}
        <View style={styles.allergyHeader}>
          <Text style={styles.sectionTitle}>Sensitivities & Allergies</Text>
          <View style={styles.allergyToggle}>
            <View style={[styles.toggleDot, allergies.length > 0 && styles.toggleDotActive]} />
          </View>
        </View>
        <View style={styles.chipGrid}>
          {ALLERGIES.map((a) => (
            <Chip
              key={a}
              label={a}
              selected={allergies.includes(a)}
              onPress={() => toggle(allergies, setAllergies, a)}
            />
          ))}
          {/* Custom allergies added by user */}
          {allergies
            .filter((a) => !ALLERGIES.includes(a))
            .map((a) => (
              <Chip
                key={a}
                label={a}
                selected
                onPress={() => setAllergies(allergies.filter((x) => x !== a))}
              />
            ))}
        </View>

        {/* Add custom allergy */}
        <View style={styles.customRow}>
          <TextInput
            style={styles.customInput}
            placeholder="Add allergy..."
            placeholderTextColor="#9BA1A6"
            value={customAllergy}
            onChangeText={setCustomAllergy}
            onSubmitEditing={addCustomAllergy}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={addCustomAllergy}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addBtnGradient}
            >
              <Text style={styles.addBtnText}>+</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Additional Notes */}
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Any special instructions? (e.g., halal only, avoid oily food, prefer healthy options)"
          placeholderTextColor="#9BA1A6"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          activeOpacity={0.85}
          disabled={saving}
        >
          <LinearGradient
            colors={["#6443F4", "#F94498"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtnGradient}
          >
            <Text style={styles.saveBtnText}>
              {saving ? "Saving..." : "Save Preferences →"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.dnaNote}>
          ✦ Saved to your DNA profile — TRAVI will remember this for every future trip
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0d0118" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56,
    paddingBottom: 130,
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: { color: "#fff", fontSize: 20 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 130 },

  introCard: {
    backgroundColor: "rgba(100,67,244,0.15)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.3)",
  },
  introIcon: { fontSize: 36, marginBottom: 10 },
  introTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Chillax-Semibold",
  },
  introText: {
    color: "#9BA1A6",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 8,
    fontFamily: "Chillax-Semibold",
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
  },
  chipSelected: {
    backgroundColor: "rgba(249,68,152,0.2)",
    borderColor: "#F94498",
  },
  chipCheck: { color: "#F94498", fontSize: 12, fontWeight: "700" },
  chipText: { color: "#9BA1A6", fontSize: 13, fontWeight: "500", fontFamily: "Satoshi-Medium" },
  chipTextSelected: { color: "#F94498", fontWeight: "600" },

  allergyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 8,
  },
  allergyToggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(100,67,244,0.3)",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  toggleDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#666",
    alignSelf: "flex-end",
  },
  toggleDotActive: {
    backgroundColor: "#6443F4",
    alignSelf: "flex-end",
  },

  customRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
    marginTop: -16,
  },
  customInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
  },
  addBtn: { borderRadius: 12, overflow: "hidden" },
  addBtnGradient: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  addBtnText: { color: "#fff", fontSize: 24, fontWeight: "700", lineHeight: 28, fontFamily: "Chillax-Semibold" },

  notesInput: {
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    fontSize: 14,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    marginBottom: 28,
    lineHeight: 20,
  },

  saveBtn: { borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", marginBottom: 16 },
  saveBtnGradient: {
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: 16,
  },
  saveBtnText: { color: "#fff", fontSize: 17, fontWeight: "700", fontFamily: "Chillax-Semibold" },

  dnaNote: {
    color: "#6443F4",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
