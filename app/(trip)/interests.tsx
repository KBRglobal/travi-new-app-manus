import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const INTERESTS = [
  { id: "nature", label: "Nature", emoji: "🌿", desc: "Parks, hikes, landscapes" },
  { id: "culture", label: "Culture", emoji: "🏛️", desc: "Museums, history, art" },
  { id: "food", label: "Food & Drink", emoji: "🍽️", desc: "Local cuisine, restaurants" },
  { id: "nightlife", label: "Nightlife", emoji: "🎉", desc: "Bars, clubs, entertainment" },
  { id: "adventure", label: "Adventure", emoji: "🧗", desc: "Sports, thrills, outdoors" },
  { id: "beach", label: "Beach", emoji: "🏖️", desc: "Sun, sea, relaxation" },
  { id: "shopping", label: "Shopping", emoji: "🛍️", desc: "Markets, malls, boutiques" },
  { id: "wellness", label: "Wellness", emoji: "🧘", desc: "Spa, yoga, mindfulness" },
  { id: "photography", label: "Photography", emoji: "📸", desc: "Scenic spots, viewpoints" },
  { id: "family", label: "Family Fun", emoji: "🎡", desc: "Kid-friendly activities" },
  { id: "romance", label: "Romance", emoji: "💑", desc: "Couple experiences" },
  { id: "local", label: "Local Life", emoji: "🏘️", desc: "Neighborhoods, daily life" },
];

export default function InterestsScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { dispatch } = useStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { interests: selected } } });
    router.push({ pathname: "/(trip)/landmarks" as never, params: { tripId } });
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 2 of 6</Text>
          <View style={styles.stepBar}>
            {[1,2,3,4,5,6].map((s) => (
              <View key={s} style={[styles.stepDot, s <= 2 && styles.stepDotActive]} />
            ))}
          </View>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What are you into?</Text>
        <Text style={styles.subtitle}>Choose your interests — TRAVI will tailor your itinerary</Text>

        <View style={styles.grid}>
          {INTERESTS.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.interestCard, isSelected && styles.interestCardActive]}
                onPress={() => toggle(item.id)}
                activeOpacity={0.8}
              >
                {isSelected && (
                  <View style={styles.checkmark}>
                    <IconSymbol name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                )}
                <Text style={styles.interestEmoji}>{item.emoji}</Text>
                <Text style={[styles.interestLabel, isSelected && styles.interestLabelActive]}>
                  {item.label}
                </Text>
                <Text style={styles.interestDesc}>{item.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.selectedCount}>
          <Text style={styles.selectedCountText}>
            {selected.length} selected{selected.length > 0 ? " ✓" : ""}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.nextBtn, selected.length === 0 && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selected.length === 0}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={selected.length > 0 ? ["#7B2FBE", "#E91E8C"] : ["#4A3080", "#4A3080"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>Choose Landmarks</Text>
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
  subtitle: { color: "#A78BCA", fontSize: 15, marginBottom: 24 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 20 },
  interestCard: {
    width: (width - 48 - 12) / 2,
    backgroundColor: "#2D1B69",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#4A3080",
    position: "relative",
  },
  interestCardActive: { backgroundColor: "#3D2580", borderColor: "#7B2FBE" },
  checkmark: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E91E8C",
    alignItems: "center",
    justifyContent: "center",
  },
  interestEmoji: { fontSize: 32, marginBottom: 8 },
  interestLabel: { color: "#A78BCA", fontSize: 15, fontWeight: "600", marginBottom: 3 },
  interestLabelActive: { color: "#FFFFFF" },
  interestDesc: { color: "#6B5A8A", fontSize: 12 },
  selectedCount: { alignItems: "center", marginBottom: 16 },
  selectedCountText: { color: "#7B2FBE", fontSize: 14, fontWeight: "600" },
  nextBtn: { borderRadius: 28, overflow: "hidden" },
  nextBtnDisabled: { opacity: 0.5 },
  nextGradient: { paddingVertical: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  nextText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
});
