import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const LANDMARKS_BY_CITY: Record<string, { id: string; name: string; emoji: string; category: string; aiPick: boolean }[]> = {
  default: [
    { id: "l1", name: "Old Town / Historic Center", emoji: "🏛️", category: "Culture", aiPick: true },
    { id: "l2", name: "Main Market Square", emoji: "🏪", category: "Local Life", aiPick: true },
    { id: "l3", name: "National Museum", emoji: "🖼️", category: "Culture", aiPick: true },
    { id: "l4", name: "Local Food Market", emoji: "🥘", category: "Food", aiPick: false },
    { id: "l5", name: "Botanical Garden", emoji: "🌸", category: "Nature", aiPick: false },
    { id: "l6", name: "Viewpoint / Panorama", emoji: "🌅", category: "Photography", aiPick: true },
    { id: "l7", name: "Famous Restaurant District", emoji: "🍽️", category: "Food", aiPick: false },
    { id: "l8", name: "Art Gallery", emoji: "🎨", category: "Culture", aiPick: false },
  ],
  Paris: [
    { id: "p1", name: "Eiffel Tower", emoji: "🗼", category: "Landmark", aiPick: true },
    { id: "p2", name: "Louvre Museum", emoji: "🖼️", category: "Culture", aiPick: true },
    { id: "p3", name: "Montmartre", emoji: "⛪", category: "Culture", aiPick: true },
    { id: "p4", name: "Notre-Dame Cathedral", emoji: "🏰", category: "Culture", aiPick: false },
    { id: "p5", name: "Champs-Élysées", emoji: "🛍️", category: "Shopping", aiPick: false },
    { id: "p6", name: "Seine River Cruise", emoji: "🚢", category: "Experience", aiPick: true },
    { id: "p7", name: "Versailles Palace", emoji: "👑", category: "History", aiPick: false },
    { id: "p8", name: "Le Marais District", emoji: "🏘️", category: "Local Life", aiPick: false },
  ],
  Tokyo: [
    { id: "t1", name: "Shibuya Crossing", emoji: "🚦", category: "Iconic", aiPick: true },
    { id: "t2", name: "Senso-ji Temple", emoji: "⛩️", category: "Culture", aiPick: true },
    { id: "t3", name: "Tsukiji Fish Market", emoji: "🐟", category: "Food", aiPick: true },
    { id: "t4", name: "Akihabara", emoji: "🎮", category: "Entertainment", aiPick: false },
    { id: "t5", name: "Mount Fuji Day Trip", emoji: "🗻", category: "Nature", aiPick: true },
    { id: "t6", name: "Shinjuku Gyoen Garden", emoji: "🌸", category: "Nature", aiPick: false },
    { id: "t7", name: "teamLab Borderless", emoji: "🌈", category: "Art", aiPick: false },
    { id: "t8", name: "Harajuku", emoji: "🎀", category: "Culture", aiPick: false },
  ],
};

export default function LandmarksScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state, dispatch } = useStore();
  const trip = state.trips.find((t) => t.id === tripId);

  const cityKey = trip?.destination || "default";
  const landmarks = LANDMARKS_BY_CITY[cityKey] || LANDMARKS_BY_CITY.default;

  const [selected, setSelected] = useState<string[]>(
    landmarks.filter((l) => l.aiPick).map((l) => l.id)
  );

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleNext = () => {
    dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { landmarks: selected } } });
    router.push({ pathname: "/(trip)/flights" as never, params: { tripId } });
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 3 of 6</Text>
          <View style={styles.stepBar}>
            {[1,2,3,4,5,6].map((s) => (
              <View key={s} style={[styles.stepDot, s <= 3 && styles.stepDotActive]} />
            ))}
          </View>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.titleSection}>
        <Text style={styles.title}>Top Landmarks</Text>
        <Text style={styles.subtitle}>
          TRAVI pre-selected the best spots for {trip?.destination || "your trip"}
        </Text>
        <View style={styles.aiChip}>
          <Text style={styles.aiChipText}>🧠 AI Picks highlighted</Text>
        </View>
      </View>

      <FlatList
        data={landmarks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);
          return (
            <TouchableOpacity
              style={[styles.landmarkCard, isSelected && styles.landmarkCardActive]}
              onPress={() => toggle(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.landmarkEmoji}>{item.emoji}</Text>
              <View style={styles.landmarkInfo}>
                <Text style={[styles.landmarkName, isSelected && styles.landmarkNameActive]}>
                  {item.name}
                </Text>
                <View style={styles.landmarkMeta}>
                  <Text style={styles.landmarkCategory}>{item.category}</Text>
                  {item.aiPick && (
                    <View style={styles.aiPickBadge}>
                      <Text style={styles.aiPickText}>🧠 AI Pick</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                {isSelected && <IconSymbol name="checkmark" size={14} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#7B2FBE", "#E91E8C"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextGradient}
            >
              <Text style={styles.nextText}>Choose Flight</Text>
              <IconSymbol name="arrow.right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>
        }
      />
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
  titleSection: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12 },
  title: { color: "#FFFFFF", fontSize: 26, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#A78BCA", fontSize: 15, marginBottom: 10 },
  aiChip: {
    backgroundColor: "#2D1B69",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  aiChipText: { color: "#A78BCA", fontSize: 12 },
  list: { paddingHorizontal: 24, paddingBottom: 40, gap: 10 },
  landmarkCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 12,
  },
  landmarkCardActive: { backgroundColor: "#3D2580", borderColor: "#7B2FBE" },
  landmarkEmoji: { fontSize: 28, width: 36, textAlign: "center" },
  landmarkInfo: { flex: 1 },
  landmarkName: { color: "#A78BCA", fontSize: 15, fontWeight: "600", marginBottom: 4 },
  landmarkNameActive: { color: "#FFFFFF" },
  landmarkMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  landmarkCategory: { color: "#6B5A8A", fontSize: 12 },
  aiPickBadge: {
    backgroundColor: "rgba(123, 47, 190, 0.2)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#7B2FBE",
  },
  aiPickText: { color: "#7B2FBE", fontSize: 10, fontWeight: "600" },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#4A3080",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: { backgroundColor: "#E91E8C", borderColor: "#E91E8C" },
  nextBtn: { borderRadius: 28, overflow: "hidden", marginTop: 16 },
  nextGradient: { paddingVertical: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  nextText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
});
