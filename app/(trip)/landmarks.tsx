import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Animated, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

type LandmarkIcon = "building.columns.fill" | "mountain.2.fill" | "beach.umbrella" | "building.2.fill" | "paintbrush.fill" | "fork.knife" | "leaf.fill" | "globe";

const LANDMARKS: Record<string, { id: string; name: string; type: string; rating: number; icon: LandmarkIcon }[]> = {
  default: [
    { id: "l1", name: "Old Town", type: "Historic District", rating: 4.9, icon: "building.columns.fill" },
    { id: "l2", name: "Central Market", type: "Local Experience", rating: 4.7, icon: "fork.knife" },
    { id: "l3", name: "City Viewpoint", type: "Scenic Spot", rating: 4.8, icon: "mountain.2.fill" },
    { id: "l4", name: "National Museum", type: "Culture", rating: 4.6, icon: "paintbrush.fill" },
    { id: "l5", name: "Botanical Garden", type: "Nature", rating: 4.7, icon: "leaf.fill" },
    { id: "l6", name: "Waterfront Promenade", type: "Leisure", rating: 4.5, icon: "beach.umbrella" },
    { id: "l7", name: "Art District", type: "Culture", rating: 4.6, icon: "paintbrush.fill" },
    { id: "l8", name: "Night Market", type: "Food & Culture", rating: 4.8, icon: "fork.knife" },
  ],
  Paris: [
    { id: "p1", name: "Eiffel Tower", type: "Iconic Landmark", rating: 4.9, icon: "building.2.fill" },
    { id: "p2", name: "Louvre Museum", type: "World-Class Art", rating: 4.8, icon: "paintbrush.fill" },
    { id: "p3", name: "Montmartre", type: "Historic District", rating: 4.7, icon: "building.columns.fill" },
    { id: "p4", name: "Champs-Élysées", type: "Shopping & Leisure", rating: 4.6, icon: "building.2.fill" },
    { id: "p5", name: "Notre-Dame", type: "Historic Cathedral", rating: 4.8, icon: "building.columns.fill" },
    { id: "p6", name: "Seine River Cruise", type: "Scenic Experience", rating: 4.7, icon: "beach.umbrella" },
    { id: "p7", name: "Versailles Palace", type: "Royal Heritage", rating: 4.9, icon: "building.columns.fill" },
    { id: "p8", name: "Marais District", type: "Food & Culture", rating: 4.6, icon: "fork.knife" },
  ],
  Tokyo: [
    { id: "t1", name: "Senso-ji Temple", type: "Sacred Site", rating: 4.9, icon: "building.columns.fill" },
    { id: "t2", name: "Shibuya Crossing", type: "Iconic Spot", rating: 4.8, icon: "building.2.fill" },
    { id: "t3", name: "Tsukiji Market", type: "Food Experience", rating: 4.7, icon: "fork.knife" },
    { id: "t4", name: "Shinjuku Garden", type: "Nature & Peace", rating: 4.6, icon: "leaf.fill" },
    { id: "t5", name: "Akihabara", type: "Tech & Pop Culture", rating: 4.5, icon: "building.2.fill" },
    { id: "t6", name: "Mt. Fuji View", type: "Scenic Wonder", rating: 5.0, icon: "mountain.2.fill" },
    { id: "t7", name: "Harajuku", type: "Fashion & Culture", rating: 4.6, icon: "paintbrush.fill" },
    { id: "t8", name: "Odaiba Island", type: "Modern Marvel", rating: 4.5, icon: "globe" },
  ],
  Bali: [
    { id: "b1", name: "Tanah Lot Temple", type: "Sacred Site", rating: 4.9, icon: "building.columns.fill" },
    { id: "b2", name: "Ubud Rice Terraces", type: "Natural Wonder", rating: 4.8, icon: "mountain.2.fill" },
    { id: "b3", name: "Seminyak Beach", type: "Beach", rating: 4.7, icon: "beach.umbrella" },
    { id: "b4", name: "Sacred Monkey Forest", type: "Nature", rating: 4.6, icon: "leaf.fill" },
    { id: "b5", name: "Tegallalang", type: "Scenic Terraces", rating: 4.8, icon: "mountain.2.fill" },
    { id: "b6", name: "Uluwatu Temple", type: "Cliff Temple", rating: 4.9, icon: "building.columns.fill" },
    { id: "b7", name: "Kuta Night Market", type: "Food & Culture", rating: 4.5, icon: "fork.knife" },
    { id: "b8", name: "Nusa Penida", type: "Island Escape", rating: 4.9, icon: "beach.umbrella" },
  ],
};

const ICON_COLORS: Record<LandmarkIcon, string> = {
  "building.columns.fill": "#6443F4",
  "mountain.2.fill": "#4CAF50",
  "beach.umbrella": "#2196F3",
  "building.2.fill": "#FF9800",
  "paintbrush.fill": "#F94498",
  "fork.knife": "#FF6B35",
  "leaf.fill": "#8BC34A",
  "globe": "#00BCD4",
};

export default function LandmarksScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state, dispatch } = useStore();
  const [selected, setSelected] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const trip = state.trips.find((t) => t.id === tripId);
  const dest = trip?.destination || "default";
  const landmarks = LANDMARKS[dest] || LANDMARKS.default;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  const toggle = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (tripId) dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { landmarks: selected } } });
    router.push({ pathname: "/(trip)/flights", params: { tripId } } as never);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: "60%" }]} />
          </View>
          <Text style={styles.progressLabel}>3 of 5</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.duckRow}>
        <View style={styles.duckAvatar}>
          <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.duckGradient}>
            <Image source={require("@/assets/logos/mascot-dark.png")} style={styles.duckImg} resizeMode="contain" />
          </LinearGradient>
        </View>
        <Animated.View style={[styles.duckBubble, { opacity: fadeAnim }]}>
          <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} style={styles.duckBubbleGradient}>
            <Text style={styles.duckMessage}>Which places must you visit?</Text>
            <Text style={styles.duckSub}>{dest !== "default" ? `Top spots in ${dest}` : "Curated for you"}</Text>
          </LinearGradient>
        </Animated.View>
      </View>

      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        <FlatList
          data={landmarks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const isSelected = selected.includes(item.id);
            const color = ICON_COLORS[item.icon] || "#6443F4";
            return (
              <TouchableOpacity
                style={[styles.card, isSelected && { borderColor: color + "AA" }]}
                onPress={() => toggle(item.id)}
                activeOpacity={0.88}
              >
                <LinearGradient
                  colors={isSelected ? [color + "22", color + "11"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.03)"]}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={[styles.iconWrap, { backgroundColor: color + "22" }]}>
                  <IconSymbol name={item.icon} size={26} color={color} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardName, isSelected && { color: "#FFFFFF" }]}>{item.name}</Text>
                  <Text style={styles.cardType}>{item.type}</Text>
                  <View style={styles.ratingRow}>
                    <IconSymbol name="star.fill" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                  </View>
                </View>
                {isSelected ? (
                  <View style={[styles.checkCircle, { backgroundColor: color }]}>
                    <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={styles.addCircle}>
                    <IconSymbol name="plus" size={16} color="rgba(255,255,255,0.3)" />
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>

      <View style={styles.ctaWrap}>
        {selected.length > 0 && (
          <Text style={styles.selectedCount}>{selected.length} landmarks selected</Text>
        )}
        <TouchableOpacity
          style={[styles.ctaBtn, selected.length === 0 && styles.ctaBtnDisabled]}
          onPress={handleNext}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={selected.length > 0 ? ["#6443F4", "#F94498"] : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.05)"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={[styles.ctaText, selected.length === 0 && styles.ctaTextDisabled]}>Find Flights</Text>
            <IconSymbol name="airplane" size={20} color={selected.length > 0 ? "#FFFFFF" : "#3A2D4E"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  progressWrap: { flex: 1, gap: 6 },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#F94498", borderRadius: 2 },
  progressLabel: { color: "rgba(255,255,255,0.4)", fontSize: 12, textAlign: "right" },
  duckRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 20, paddingBottom: 16, gap: 10 },
  duckAvatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckImg: { width: 30, height: 30 },
  duckBubble: { flex: 1, borderRadius: 18, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckMessage: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", lineHeight: 20 },
  duckSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  list: { paddingHorizontal: 20, gap: 12, paddingBottom: 20 },
  card: { flexDirection: "row", alignItems: "center", borderRadius: 20, padding: 16, gap: 14, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.08)" },
  iconWrap: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  cardInfo: { flex: 1, gap: 3 },
  cardName: { color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: "700" },
  cardType: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  ratingText: { color: "#FFD700", fontSize: 12, fontWeight: "600" },
  checkCircle: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  addCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  ctaWrap: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 12, gap: 8 },
  selectedCount: { color: "rgba(192,132,252,0.8)", fontSize: 13, fontWeight: "600", textAlign: "center" },
  ctaBtn: { borderRadius: 20, overflow: "hidden" },
  ctaBtnDisabled: { opacity: 0.5 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10, borderRadius: 20 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  ctaTextDisabled: { color: "#3A2D4E" },
});
