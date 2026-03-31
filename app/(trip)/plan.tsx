import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const TRAVELER_TYPES = [
  { id: "solo", label: "Solo", icon: "🧍" },
  { id: "couple", label: "Couple", icon: "👫" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧" },
  { id: "group", label: "Group", icon: "👥" },
];

const BUDGET_RANGES = [
  { id: "budget", label: "Budget", range: "< $50/day", icon: "💚" },
  { id: "mid", label: "Mid-range", range: "$50–150/day", icon: "💛" },
  { id: "luxury", label: "Luxury", range: "$150+/day", icon: "💜" },
];

export default function PlanScreen() {
  const { destination: presetDest } = useLocalSearchParams<{ destination?: string }>();
  const { dispatch } = useStore();

  const [destination, setDestination] = useState(presetDest || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelerType, setTravelerType] = useState("solo");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState("mid");

  const isValid = destination.trim() && startDate && endDate;

  const handleNext = () => {
    if (!isValid) return;
    // Store trip draft
    const tripId = Date.now().toString();
    dispatch({
      type: "ADD_TRIP",
      payload: {
        id: tripId,
        destination: destination.trim(),
        country: "",
        startDate,
        endDate,
        travelers,
        budget: BUDGET_RANGES.find((b) => b.id === budget)?.range || budget,
        status: "draft",
        interests: [],
        landmarks: [],
        itinerary: [],
        totalCost: 0,
        pointsEarned: 0,
      },
    });
    router.push({ pathname: "/(trip)/interests" as never, params: { tripId } });
  };

  const adjustTravelers = (delta: number) => {
    setTravelers((v) => Math.max(1, Math.min(20, v + delta)));
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <LinearGradient
        colors={["#2D1B69", "#1A0533"]}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 1 of 6</Text>
          <View style={styles.stepBar}>
            {[1,2,3,4,5,6].map((s) => (
              <View key={s} style={[styles.stepDot, s === 1 && styles.stepDotActive]} />
            ))}
          </View>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Plan Your Adventure</Text>
        <Text style={styles.subtitle}>Tell TRAVI where you want to go</Text>

        {/* Destination */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Where to?</Text>
          <View style={styles.inputRow}>
            <IconSymbol name="location.fill" size={18} color="#A78BCA" />
            <TextInput
              style={styles.input}
              placeholder="City, country or region"
              placeholderTextColor="#A78BCA"
              value={destination}
              onChangeText={setDestination}
              returnKeyType="next"
            />
          </View>
        </View>

        {/* Dates */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>When?</Text>
          <View style={styles.dateRow}>
            <View style={[styles.inputRow, { flex: 1 }]}>
              <IconSymbol name="calendar" size={18} color="#A78BCA" />
              <TextInput
                style={styles.input}
                placeholder="From (DD/MM)"
                placeholderTextColor="#A78BCA"
                value={startDate}
                onChangeText={setStartDate}
                returnKeyType="next"
              />
            </View>
            <View style={styles.dateSeparator}>
              <Text style={styles.dateSeparatorText}>→</Text>
            </View>
            <View style={[styles.inputRow, { flex: 1 }]}>
              <IconSymbol name="calendar" size={18} color="#A78BCA" />
              <TextInput
                style={styles.input}
                placeholder="To (DD/MM)"
                placeholderTextColor="#A78BCA"
                value={endDate}
                onChangeText={setEndDate}
                returnKeyType="done"
              />
            </View>
          </View>
        </View>

        {/* Traveler Type */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Who's traveling?</Text>
          <View style={styles.chipRow}>
            {TRAVELER_TYPES.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[styles.chip, travelerType === t.id && styles.chipActive]}
                onPress={() => setTravelerType(t.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.chipIcon}>{t.icon}</Text>
                <Text style={[styles.chipLabel, travelerType === t.id && styles.chipLabelActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Number of Travelers */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Number of travelers</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity style={styles.counterBtn} onPress={() => adjustTravelers(-1)}>
              <Text style={styles.counterBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{travelers}</Text>
            <TouchableOpacity style={styles.counterBtn} onPress={() => adjustTravelers(1)}>
              <Text style={styles.counterBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Budget */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Budget range</Text>
          <View style={styles.budgetRow}>
            {BUDGET_RANGES.map((b) => (
              <TouchableOpacity
                key={b.id}
                style={[styles.budgetCard, budget === b.id && styles.budgetCardActive]}
                onPress={() => setBudget(b.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.budgetIcon}>{b.icon}</Text>
                <Text style={[styles.budgetLabel, budget === b.id && styles.budgetLabelActive]}>
                  {b.label}
                </Text>
                <Text style={styles.budgetRange}>{b.range}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.nextBtn, !isValid && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!isValid}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={isValid ? ["#7B2FBE", "#E91E8C"] : ["#4A3080", "#4A3080"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>Choose Interests</Text>
            <IconSymbol name="arrow.right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  stepIndicator: { flex: 1, alignItems: "center", gap: 6 },
  stepText: { color: "#A78BCA", fontSize: 12 },
  stepBar: { flexDirection: "row", gap: 4 },
  stepDot: { width: 24, height: 4, borderRadius: 2, backgroundColor: "#4A3080" },
  stepDotActive: { backgroundColor: "#E91E8C" },
  content: { padding: 24, paddingBottom: 40 },
  title: { color: "#FFFFFF", fontSize: 26, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#A78BCA", fontSize: 15, marginBottom: 28 },
  fieldGroup: { marginBottom: 24 },
  fieldLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "600", marginBottom: 10 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    paddingHorizontal: 14,
    paddingVertical: 4,
    gap: 10,
  },
  input: { flex: 1, color: "#FFFFFF", fontSize: 15, paddingVertical: 12 },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dateSeparator: { alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  dateSeparatorText: { color: "#A78BCA", fontSize: 18 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 6,
  },
  chipActive: { backgroundColor: "#3D2580", borderColor: "#7B2FBE" },
  chipIcon: { fontSize: 18 },
  chipLabel: { color: "#A78BCA", fontSize: 14, fontWeight: "500" },
  chipLabelActive: { color: "#FFFFFF" },
  counterRow: { flexDirection: "row", alignItems: "center", gap: 20 },
  counterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2D1B69",
    borderWidth: 1,
    borderColor: "#4A3080",
    alignItems: "center",
    justifyContent: "center",
  },
  counterBtnText: { color: "#FFFFFF", fontSize: 22, fontWeight: "300" },
  counterValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "700", minWidth: 30, textAlign: "center" },
  budgetRow: { flexDirection: "row", gap: 10 },
  budgetCard: {
    flex: 1,
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 4,
  },
  budgetCardActive: { backgroundColor: "#3D2580", borderColor: "#7B2FBE" },
  budgetIcon: { fontSize: 22 },
  budgetLabel: { color: "#A78BCA", fontSize: 13, fontWeight: "600" },
  budgetLabelActive: { color: "#FFFFFF" },
  budgetRange: { color: "#6B5A8A", fontSize: 11 },
  nextBtn: { borderRadius: 28, overflow: "hidden", marginTop: 8 },
  nextBtnDisabled: { opacity: 0.5 },
  nextGradient: { paddingVertical: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  nextText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
});
