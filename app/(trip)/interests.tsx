/**
 * TRAVI — Interests Picker
 * Beautiful photo-grid for selecting travel interests.
 * Every selection feeds the DNA learning engine.
 */

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image } from "expo-image";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { recordInterestSelections, type InterestCategory } from "@/lib/dna-store";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - 48) / 2;

interface Interest {
  id: InterestCategory;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  color: string;
}

const INTERESTS: Interest[] = [
  { id: "landmarks",  label: "Landmarks",         image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=70", color: "#F94498" },
  { id: "nature",     label: "Nature",             image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=70", color: "#22C55E" },
  { id: "beaches",    label: "Beaches",            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70", color: "#06B6D4" },
  { id: "food",       label: "Food & Drink",       image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=70", color: "#F59E0B" },
  { id: "nightlife",  label: "Nightlife",          image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=70", color: "#8B5CF6" },
  { id: "shopping",   label: "Shopping",           image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=70", color: "#EC4899" },
  { id: "adventure",  label: "Adventure",          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=70", color: "#EF4444" },
  { id: "wellness",   label: "Wellness & Spa",     image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=70", color: "#10B981" },
  { id: "history",    label: "History",            image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=70", color: "#D97706" },
  { id: "water_sports", label: "Water Sports",    image: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=400&q=70", color: "#0EA5E9" },
  { id: "art_culture", label: "Art & Culture",    image: "https://images.unsplash.com/photo-1565060169194-19fabf63012c?w=400&q=70", color: "#A855F7" },
  { id: "extreme",    label: "Extreme Activities", image: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=400&q=70", color: "#F97316" },
];

export default function InterestsScreen() {
  const insets = useSafeAreaInsets();
  const { tripId, destination, budget } = useLocalSearchParams<{ tripId: string; destination: string; budget: string }>();
  const [selected, setSelected] = useState<Set<InterestCategory>>(new Set());
  const [saving, setSaving] = useState(false);

  const toggle = (id: InterestCategory) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = async () => {
    if (selected.size === 0) return;
    setSaving(true);
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await recordInterestSelections(Array.from(selected));
    setSaving(false);
    const interestsList = Array.from(selected).join(",");
    const commonParams = { tripId, interests: interestsList, destination: destination ?? "dubai", budget: budget ?? "mid" };
    // If food is selected, collect food preferences first
    if (selected.has("food")) {
      router.push({ pathname: "/(trip)/food-preferences", params: commonParams } as never);
    } else {
      router.push({ pathname: "/(trip)/swipe", params: commonParams } as never);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
        <View style={[styles.countBadge, selected.size > 0 && styles.countBadgeActive]}>
          <Text style={[styles.countText, selected.size > 0 && styles.countTextActive]}>{selected.size}</Text>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Choose your interests</Text>
        <Text style={styles.subtitle}>Pick as many as you like — TRAVI learns your style</Text>
      </View>

      {/* Photo Grid */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {INTERESTS.map((item) => {
          const isSelected = selected.has(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, isSelected && { borderColor: item.color, borderWidth: 3 }]}
              onPress={() => toggle(item.id)}
              activeOpacity={0.88}
            >
              {/* Photo */}
              <Image
                source={item.image}
                style={styles.cardImage}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />

              {/* Gradient overlay */}
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={StyleSheet.absoluteFillObject}
              />

              {/* Selected color tint */}
              {isSelected && (
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color + "30" }]} />
              )}

              {/* Checkmark top-left */}
              <View style={styles.checkWrap}>
                {isSelected ? (
                  <View style={[styles.checkFilled, { backgroundColor: item.color }]}>
                    <IconSymbol name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={styles.checkEmpty} />
                )}
              </View>

              {/* Label pill bottom-left */}
              <View style={styles.labelWrap}>
                <LinearGradient
                  colors={isSelected ? [item.color, item.color + "CC"] : ["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)"]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.labelPill}
                >
                  <Text style={styles.labelText}>{item.label}</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Continue CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <TouchableOpacity
          style={[styles.ctaBtn, selected.size === 0 && styles.ctaBtnDisabled]}
          onPress={handleContinue}
          disabled={selected.size === 0 || saving}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={selected.size > 0 ? ["#F94498", "#6443F4"] : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.05)"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={[styles.ctaText, selected.size === 0 && styles.ctaTextDisabled]}>
              {saving ? "Learning your style..." : `Continue${selected.size > 0 ? ` · ${selected.size} selected` : ""}`}
            </Text>
            {selected.size > 0 && !saving && (
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.09)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.06)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 8, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  logo: { width: 80, height: 28 },
  logoText: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", letterSpacing: 2 },
  countBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },
  countBadgeActive: { backgroundColor: "rgba(249,68,152,0.2)", borderColor: "rgba(249,68,152,0.4)" },
  countText: { color: "rgba(255,255,255,0.4)", fontSize: 16, fontWeight: "800" },
  countTextActive: { color: "#F94498" },
  titleWrap: { paddingHorizontal: 20, paddingBottom: 16 },
  title: { color: "#FFFFFF", fontSize: 26, fontWeight: "800", lineHeight: 32 },
  subtitle: { color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 4, lineHeight: 20 },
  scroll: { flex: 1 },
  grid: { paddingHorizontal: 16, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: CARD_SIZE, height: CARD_SIZE * 1.1, borderRadius: 20, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.06)" },
  cardImage: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  checkWrap: { position: "absolute", top: 10, left: 10 },
  checkEmpty: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: "rgba(255,255,255,0.6)", backgroundColor: "rgba(0,0,0,0.3)" },
  checkFilled: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  labelWrap: { position: "absolute", bottom: 12, left: 10, right: 10 },
  labelPill: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: "flex-start" },
  labelText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  ctaWrap: { paddingHorizontal: 20, paddingTop: 12, backgroundColor: "rgba(13,6,40,0.95)" },
  ctaBtn: { borderRadius: 20, overflow: "hidden" },
  ctaBtnDisabled: { opacity: 0.4 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10 },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  ctaTextDisabled: { color: "rgba(255,255,255,0.3)" },
});
