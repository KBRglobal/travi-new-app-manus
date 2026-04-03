// @ts-nocheck
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MapPin {
  id: string;
  name: string;
  category: "must_see" | "beach" | "food" | "culture" | "shopping" | "nature";
  emoji: string;
  lat: number;
  lng: number;
  rating: number;
  duration: string;
  price: string;
  day?: number;
}

// ─── Destination Data ─────────────────────────────────────────────────────────
const DEST_DATA: Record<string, { lat: number; lng: number; delta: number; pins: MapPin[] }> = {
  Tokyo: {
    lat: 35.6762, lng: 139.6503, delta: 0.15,
    pins: [
      { id: "t1", name: "Shibuya Crossing", category: "must_see", emoji: "🏙️", lat: 35.6595, lng: 139.7004, rating: 4.9, duration: "1h", price: "Free", day: 1 },
      { id: "t2", name: "Senso-ji Temple", category: "culture", emoji: "⛩️", lat: 35.7148, lng: 139.7967, rating: 4.8, duration: "2h", price: "Free", day: 1 },
      { id: "t3", name: "TeamLab Planets", category: "culture", emoji: "🎨", lat: 35.6488, lng: 139.7858, rating: 4.9, duration: "2h", price: "$32", day: 2 },
      { id: "t4", name: "Tsukiji Outer Market", category: "food", emoji: "🍣", lat: 35.6655, lng: 139.7707, rating: 4.7, duration: "1.5h", price: "$15", day: 2 },
      { id: "t5", name: "Shinjuku Gyoen", category: "nature", emoji: "🌸", lat: 35.6851, lng: 139.7100, rating: 4.7, duration: "2h", price: "$2", day: 3 },
      { id: "t6", name: "Akihabara", category: "shopping", emoji: "🎮", lat: 35.7023, lng: 139.7745, rating: 4.5, duration: "3h", price: "Varies", day: 3 },
    ],
  },
  Dubai: {
    lat: 25.2048, lng: 55.2708, delta: 0.12,
    pins: [
      { id: "d1", name: "Burj Khalifa", category: "must_see", emoji: "🏙️", lat: 25.1972, lng: 55.2744, rating: 4.9, duration: "2h", price: "$40", day: 1 },
      { id: "d2", name: "Dubai Mall", category: "shopping", emoji: "🛍️", lat: 25.1980, lng: 55.2793, rating: 4.8, duration: "3h", price: "Free", day: 1 },
      { id: "d3", name: "Dubai Fountain", category: "must_see", emoji: "⛲", lat: 25.1959, lng: 55.2742, rating: 4.8, duration: "30m", price: "Free", day: 1 },
      { id: "d4", name: "Jumeirah Beach", category: "beach", emoji: "🏖️", lat: 25.2020, lng: 55.2388, rating: 4.7, duration: "3h", price: "Free", day: 2 },
      { id: "d5", name: "Gold Souk", category: "shopping", emoji: "💍", lat: 25.2708, lng: 55.3005, rating: 4.6, duration: "2h", price: "Varies", day: 2 },
      { id: "d6", name: "Desert Safari", category: "nature", emoji: "🏜️", lat: 24.8607, lng: 55.7765, rating: 4.9, duration: "5h", price: "$65", day: 3 },
    ],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  must_see: "#FF6B6B",
  beach: "#4ECDC4",
  food: "#FFD93D",
  culture: "#A78BFA",
  shopping: "#F472B6",
  nature: "#34D399",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function DestinationMapScreen() {
  const { destination } = useLocalSearchParams<{ destination: string }>();
  const insets = useSafeAreaInsets();
  const colors = useColors();

  const destKey = destination || "Dubai";
  const data = DEST_DATA[destKey] || DEST_DATA.Dubai;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPins = selectedCategory
    ? data.pins.filter((p) => p.category === selectedCategory)
    : data.pins;

  const categories = Array.from(new Set(data.pins.map((p) => p.category)));

  const handleCategoryPress = (cat: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(selectedCategory === cat ? null : cat);
  };

  const handlePinPress = (pin: MapPin) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Could navigate to activity detail here
  };

  const renderPin = ({ item }: { item: MapPin }) => {
    const catColor = CATEGORY_COLORS[item.category] || "#888";
    return (
      <TouchableOpacity
        style={[S.pinCard, { backgroundColor: colors.surface, borderLeftColor: catColor }]}
        activeOpacity={0.7}
        onPress={() => handlePinPress(item)}
      >
        <View style={S.pinHeader}>
          <Text style={S.pinEmoji}>{item.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[S.pinName, { color: colors.foreground }]}>{item.name}</Text>
            <Text style={[S.pinMeta, { color: colors.muted }]}>
              ⭐ {item.rating} · {item.duration} · {item.price}
            </Text>
          </View>
          {item.day && (
            <View style={[S.dayBadge, { backgroundColor: catColor }]}>
              <Text style={S.dayText}>Day {item.day}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[S.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[S.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={[S.backBtn, { backgroundColor: colors.surface }]}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[S.headerTitle, { color: colors.foreground }]}>{destKey} Map</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={S.filterRow}
        style={{ flexGrow: 0 }}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const catColor = CATEGORY_COLORS[cat] || "#888";
          return (
            <TouchableOpacity
              key={cat}
              style={[
                S.filterChip,
                { backgroundColor: isActive ? catColor : colors.surface },
              ]}
              activeOpacity={0.8}
              onPress={() => handleCategoryPress(cat)}
            >
              <Text
                style={[
                  S.filterText,
                  { color: isActive ? "#fff" : colors.foreground },
                ]}
              >
                {cat.replace("_", " ")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Pins List */}
      <FlatList
        data={filteredPins}
        keyExtractor={(item) => item.id}
        renderItem={renderPin}
        contentContainerStyle={[S.listContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 130,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: { fontSize: 14, fontFamily: "Chillax-Semibold", fontWeight: "600", textTransform: "capitalize" },
  listContent: { paddingHorizontal: 16, paddingTop: 8, gap: 12 },
  pinCard: {
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
  },
  pinHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  pinEmoji: { fontSize: 32, fontFamily: "Satoshi-Regular" },
  pinName: { fontSize: 16, fontFamily: "Chillax-Semibold", fontWeight: "700", marginBottom: 4 },
  pinMeta: { fontSize: 13, fontFamily: "Satoshi-Regular" },
  dayBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dayText: { color: "#fff", fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "700" },
});
