/**
 * TRAVI — Destination Picker
 * Visual photo-grid to choose your destination before the swipe session.
 * The chosen destination filters attractions in the swipe screen.
 */

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";

const { width } = Dimensions.get("window");
const CARD_W = (width - 48) / 2;
const CARD_H = CARD_W * 1.3;

interface Destination {
  id: string;
  name: string;
  country: string;
  image: any;
  gradient: [string, string, ...string[]];
  vibe: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    image: require("@/assets/destinations/dubai.jpg"),
    gradient: ["#F94498", "#7C3AED"],
    vibe: "Luxury & Skyline",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image: require("@/assets/destinations/kyoto.jpg"),
    gradient: ["#F97316", "#DC2626"],
    vibe: "Culture & Zen",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: require("@/assets/destinations/bali.jpg"),
    gradient: ["#10B981", "#0EA5E9"],
    vibe: "Nature & Wellness",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    image: require("@/assets/destinations/barcelona.jpg"),
    gradient: ["#A855F7", "#EC4899"],
    vibe: "Art & Nightlife",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    image: require("@/assets/destinations/maldives.jpg"),
    gradient: ["#06B6D4", "#0EA5E9"],
    vibe: "Ocean & Escape",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: require("@/assets/destinations/tokyo.jpg"),
    gradient: ["#8B5CF6", "#EC4899"],
    vibe: "Future & Food",
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: require("@/assets/destinations/santorini.jpg"),
    gradient: ["#3B82F6", "#06B6D4"],
    vibe: "Romance & Views",
  },
  {
    id: "patagonia",
    name: "Patagonia",
    country: "Argentina",
    image: require("@/assets/destinations/patagonia.jpg"),
    gradient: ["#22C55E", "#0EA5E9"],
    vibe: "Wild & Adventure",
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    image: require("@/assets/destinations/amsterdam.jpg"),
    gradient: ["#F59E0B", "#EF4444"],
    vibe: "Canals & Culture",
  },
  {
    id: "phuket",
    name: "Phuket",
    country: "Thailand",
    image: require("@/assets/destinations/phuket.jpg"),
    gradient: ["#10B981", "#F59E0B"],
    vibe: "Beaches & Party",
  },
];

export default function DestinationPickScreen() {
  const insets = useSafeAreaInsets();
  const { tripId, interests } = useLocalSearchParams<{ tripId: string; interests: string }>();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelected(id);
  };

  const handleContinue = () => {
    if (!selected) return;
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push({
      pathname: "/(trip)/swipe",
      params: { tripId, interests, destination: selected },
    } as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.logoText}>TRAVI</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Title */}
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Where are you headed?</Text>
        <Text style={styles.subtitle}>We'll show you the best spots to swipe through</Text>
      </View>

      {/* Grid */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {DESTINATIONS.map((dest) => {
          const isSelected = selected === dest.id;
          return (
            <TouchableOpacity
              key={dest.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => handleSelect(dest.id)}
              activeOpacity={0.85}
            >
              <Image source={dest.image} style={styles.cardImage} resizeMode="cover" />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.75)"]}
                style={styles.cardGradient}
              />
              {/* Selected overlay */}
              {isSelected && (
                <View style={styles.selectedOverlay}>
                  <LinearGradient
                    colors={[dest.gradient[0] + "55", dest.gradient[1] + "55"]}
                    style={StyleSheet.absoluteFill}
                  />
                  <View style={styles.checkCircle}>
                    <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
                  </View>
                </View>
              )}
              {/* Labels */}
              <View style={styles.cardLabels}>
                <Text style={styles.cardName}>{dest.name}</Text>
                <View style={styles.vibePill}>
                  <Text style={styles.vibeText}>{dest.vibe}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.cta, !selected && styles.ctaDisabled]}
          onPress={handleContinue}
          activeOpacity={0.85}
          disabled={!selected}
        >
          <LinearGradient
            colors={selected ? ["#F94498", "#7C3AED"] : ["#2A2A3A", "#2A2A3A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={[styles.ctaText, !selected && styles.ctaTextDisabled]}>
              {selected
                ? `Explore ${DESTINATIONS.find((d) => d.id === selected)?.name} →`
                : "Pick a destination"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0B1E" },
  orb1: { position: "absolute", width: width * 0.8, height: width * 0.8, borderRadius: width * 0.4, top: -width * 0.3, left: -width * 0.3, backgroundColor: "rgba(124,58,237,0.08)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(249,68,152,0.06)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  logoText: { color: "#FFFFFF", fontSize: 20, fontFamily: "Chillax-Bold", fontWeight: "900", letterSpacing: 2 },
  headerRight: { width: 40 },
  titleWrap: { paddingHorizontal: 20, paddingBottom: 130 },
  title: { color: "#FFFFFF", fontSize: 26, fontFamily: "Chillax-Bold", fontWeight: "800", letterSpacing: -0.5, marginBottom: 4 },
  subtitle: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  scroll: { flex: 1 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 12 },
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#F94498",
  },
  cardImage: { width: "100%", height: "100%", position: "absolute" },
  cardGradient: { position: "absolute", bottom: 0, left: 0, right: 0, height: "60%" },
  selectedOverlay: { ...StyleSheet.absoluteFillObject, alignItems: "flex-end", padding: 10 },
  checkCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#F94498", alignItems: "center", justifyContent: "center" },
  cardLabels: { position: "absolute", bottom: 12, left: 12, right: 12 },
  cardName: { color: "#FFFFFF", fontSize: 18, fontFamily: "Chillax-Bold", fontWeight: "800", marginBottom: 4 },
  vibePill: { alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  vibeText: { color: "rgba(255,255,255,0.85)", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  ctaWrap: { paddingHorizontal: 20, paddingTop: 12, backgroundColor: "#0D0B1E" },
  cta: { borderRadius: 18, overflow: "hidden", shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10 },
  ctaDisabled: { opacity: 0.5 },
  ctaGradient: { paddingVertical: 18, alignItems: "center" },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontFamily: "Chillax-Bold", fontWeight: "800", letterSpacing: 0.3 },
  ctaTextDisabled: { color: "rgba(255,255,255,0.5)" },
});
