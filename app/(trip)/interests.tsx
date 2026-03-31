import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const INTERESTS = [
  { id: "food", label: "Local Food", icon: "fork.knife" as const, color: "#FF6B35", gradient: ["#3d1a00", "#6b2d00"] as [string, string] },
  { id: "history", label: "History", icon: "building.columns.fill" as const, color: "#7B2FBE", gradient: ["#1a1a4e", "#2d2d7a"] as [string, string] },
  { id: "nature", label: "Nature", icon: "leaf.fill" as const, color: "#4CAF50", gradient: ["#0d2a0d", "#1a4a1a"] as [string, string] },
  { id: "art", label: "Art & Culture", icon: "paintbrush.fill" as const, color: "#E91E8C", gradient: ["#2d0033", "#5c0066"] as [string, string] },
  { id: "adventure", label: "Adventure", icon: "figure.run" as const, color: "#FF9800", gradient: ["#2d1a00", "#5c3300"] as [string, string] },
  { id: "beaches", label: "Beaches", icon: "beach.umbrella" as const, color: "#2196F3", gradient: ["#0d2040", "#1a3a5c"] as [string, string] },
  { id: "nightlife", label: "Nightlife", icon: "music.note" as const, color: "#9C27B0", gradient: ["#1a0033", "#3d0066"] as [string, string] },
  { id: "shopping", label: "Shopping", icon: "bag.fill" as const, color: "#F44336", gradient: ["#2d0a0a", "#5c1a1a"] as [string, string] },
  { id: "wellness", label: "Wellness", icon: "figure.yoga" as const, color: "#00BCD4", gradient: ["#002d33", "#005c66"] as [string, string] },
  { id: "sports", label: "Sports", icon: "dumbbell.fill" as const, color: "#8BC34A", gradient: ["#1a2d00", "#335c00"] as [string, string] },
  { id: "photography", label: "Photography", icon: "camera.fill" as const, color: "#FF5722", gradient: ["#2d1500", "#5c2a00"] as [string, string] },
  { id: "wine", label: "Wine & Drinks", icon: "wineglass.fill" as const, color: "#E91E63", gradient: ["#2d0020", "#5c0040"] as [string, string] },
];

export default function InterestsScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { dispatch } = useStore();
  const [selected, setSelected] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    if (tripId) dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { interests: selected } } });
    router.push({ pathname: "/(trip)/landmarks", params: { tripId } } as never);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: "40%" }]} />
          </View>
          <Text style={styles.progressLabel}>2 of 5</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.duckRow}>
        <View style={styles.duckAvatar}>
          <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.duckGradient}>
            <Image source={require("@/assets/images/icon.png")} style={styles.duckImg} contentFit="contain" />
          </LinearGradient>
        </View>
        <Animated.View style={[styles.duckBubble, { opacity: fadeAnim }]}>
          <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} style={styles.duckBubbleGradient}>
            <Text style={styles.duckMessage}>What do you love doing on trips?</Text>
            <Text style={styles.duckSub}>Pick as many as you like</Text>
          </LinearGradient>
        </Animated.View>
      </View>

      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
          {INTERESTS.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isSelected && { borderColor: item.color + "AA" }]}
                onPress={() => toggle(item.id)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={isSelected ? item.gradient : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.03)"]}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={[styles.iconWrap, { backgroundColor: item.color + (isSelected ? "33" : "18") }]}>
                  <IconSymbol name={item.icon} size={26} color={item.color} />
                </View>
                <Text style={[styles.cardLabel, isSelected && { color: "#FFFFFF" }]}>{item.label}</Text>
                {isSelected && (
                  <View style={[styles.checkBadge, { backgroundColor: item.color }]}>
                    <IconSymbol name="checkmark" size={10} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      <View style={styles.ctaWrap}>
        {selected.length > 0 && (
          <Text style={styles.selectedCount}>{selected.length} interests selected</Text>
        )}
        <TouchableOpacity
          style={[styles.ctaBtn, selected.length === 0 && styles.ctaBtnDisabled]}
          onPress={handleNext}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={selected.length > 0 ? ["#7B2FBE", "#E91E8C"] : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.05)"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={[styles.ctaText, selected.length === 0 && styles.ctaTextDisabled]}>
              Choose Landmarks
            </Text>
            <IconSymbol name="arrow.right" size={20} color={selected.length > 0 ? "#FFFFFF" : "#3A2D4E"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.09)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  progressWrap: { flex: 1, gap: 6 },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#E91E8C", borderRadius: 2 },
  progressLabel: { color: "rgba(255,255,255,0.4)", fontSize: 12, textAlign: "right" },
  duckRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 20, paddingBottom: 16, gap: 10 },
  duckAvatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckImg: { width: 30, height: 30 },
  duckBubble: { flex: 1, borderRadius: 18, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckMessage: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", lineHeight: 20 },
  duckSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  grid: { paddingHorizontal: 20, flexDirection: "row", flexWrap: "wrap", gap: 12, paddingBottom: 20 },
  card: { width: (width - 52) / 2, borderRadius: 20, padding: 18, gap: 10, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.08)", alignItems: "center" },
  iconWrap: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  cardLabel: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "700", textAlign: "center" },
  checkBadge: { position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  ctaWrap: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 12, gap: 8 },
  selectedCount: { color: "rgba(192,132,252,0.8)", fontSize: 13, fontWeight: "600", textAlign: "center" },
  ctaBtn: { borderRadius: 20, overflow: "hidden" },
  ctaBtnDisabled: { opacity: 0.5 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10, borderRadius: 20 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  ctaTextDisabled: { color: "#3A2D4E" },
});
