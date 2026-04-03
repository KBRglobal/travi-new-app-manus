import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Animated, TextInput, Platform, PanResponder,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const DESTINATIONS = [
  { id: "paris", city: "Paris", country: "France", code: "CDG", gradient: ["#1a1a4e", "#3d1a3d"] as [string, string], vibe: "Romance & Culture", icon: "building.columns.fill" as const },
  { id: "tokyo", city: "Tokyo", country: "Japan", code: "NRT", gradient: ["#1a0533", "#2d1b69"] as [string, string], vibe: "Tech & Tradition", icon: "building.2.fill" as const },
  { id: "bali", city: "Bali", country: "Indonesia", code: "DPS", gradient: ["#0d3320", "#1a4a2e"] as [string, string], vibe: "Zen & Nature", icon: "leaf.fill" as const },
  { id: "maldives", city: "Maldives", country: "Maldives", code: "MLE", gradient: ["#0d2040", "#1a3a5c"] as [string, string], vibe: "Luxury & Ocean", icon: "beach.umbrella" as const },
  { id: "nyc", city: "New York", country: "USA", code: "JFK", gradient: ["#1a1a1a", "#2d2d2d"] as [string, string], vibe: "Urban & Energy", icon: "building.2.fill" as const },
  { id: "santorini", city: "Santorini", country: "Greece", code: "JTR", gradient: ["#1a2a4e", "#2d3a6e"] as [string, string], vibe: "Views & Sunsets", icon: "sun.max.fill" as const },
  { id: "dubai", city: "Dubai", country: "UAE", code: "DXB", gradient: ["#2d1a00", "#4a2d00"] as [string, string], vibe: "Luxury & Futurism", icon: "crown.fill" as const },
  { id: "barcelona", city: "Barcelona", country: "Spain", code: "BCN", gradient: ["#3d1a00", "#5c2d00"] as [string, string], vibe: "Art & Nightlife", icon: "paintbrush.fill" as const },
];

const TRAVEL_STYLES = [
  { id: "adventure", label: "Adventure", desc: "Hiking, extreme sports, off the beaten path", icon: "figure.run" as const, gradient: ["#1a3320", "#2d5c35"] as [string, string], color: "#4CAF50" },
  { id: "luxury", label: "Luxury", desc: "5-star hotels, fine dining, VIP experiences", icon: "crown.fill" as const, gradient: ["#3d2a00", "#6b4800"] as [string, string], color: "#FBBF24" },
  { id: "culture", label: "Culture", desc: "Museums, history, local experiences", icon: "building.columns.fill" as const, gradient: ["#1a1a4e", "#2d2d7a"] as [string, string], color: "#6443F4" },
  { id: "chill", label: "Chill & Relax", desc: "Beaches, spas, slow travel", icon: "beach.umbrella" as const, gradient: ["#0d2040", "#1a3a5c"] as [string, string], color: "#2196F3" },
  { id: "food", label: "Foodie", desc: "Local cuisine, cooking classes, food tours", icon: "fork.knife" as const, gradient: ["#3d1a00", "#6b2d00"] as [string, string], color: "#FF9800" },
  { id: "nightlife", label: "Nightlife", desc: "Clubs, bars, live music, entertainment", icon: "music.note" as const, gradient: ["#2d0033", "#5c0066"] as [string, string], color: "#F94498" },
];

const BUDGETS = [
  { id: "budget", label: "Budget", range: "Under $1,000", icon: "leaf.fill" as const, color: "#4CAF50" },
  { id: "mid", label: "Mid-Range", range: "$1,000 – $3,000", icon: "star.fill" as const, color: "#2196F3" },
  { id: "premium", label: "Premium", range: "$3,000 – $7,000", icon: "sparkles" as const, color: "#6443F4" },
  { id: "luxury", label: "Luxury", range: "$7,000+", icon: "crown.fill" as const, color: "#FBBF24" },
];

const CUSTOM_MIN = 500;
const CUSTOM_MAX = 20000;
const CUSTOM_STEP = 250;

const TRAVI_MESSAGES = [
  "Where does your heart want to go?",
  "When are you traveling?",
];

type Step = "destination" | "dates";
const STEPS: Step[] = ["destination", "dates"];

export default function PlanScreen() {
  const { dispatch } = useStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedDest, setSelectedDest] = useState<typeof DESTINATIONS[0] | null>(null);
  const [startDate, setStartDate] = useState("Apr 15, 2026");
  const [endDate, setEndDate] = useState("Apr 22, 2026");
  const [editingDate, setEditingDate] = useState<"start" | "end" | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const duckBounce = useRef(new Animated.Value(0)).current;

  const currentStep = STEPS[stepIndex];

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(40);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();
    Animated.sequence([
      Animated.timing(duckBounce, { toValue: -8, duration: 150, useNativeDriver: true }),
      Animated.timing(duckBounce, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [stepIndex]);

  const canProceed = () => {
    if (currentStep === "destination") return !!selectedDest;
    if (currentStep === "dates") return !!startDate && !!endDate;
    return false;
  };

  const handleNext = () => {
    if (!canProceed()) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      const draft = {
        id: Date.now().toString(),
        destination: selectedDest!.city,
        destinationCode: selectedDest!.code,
        country: selectedDest!.country,
        startDate,
        endDate,
        travelers: 2,
        budget: "mid",
        status: "draft" as const,
        interests: [],
        landmarks: [],
        itinerary: [],
        totalCost: 0,
        pointsEarned: 0,
      };
      dispatch({ type: "ADD_TRIP", payload: draft });
      router.push({ pathname: "/(trip)/interests", params: { tripId: draft.id, destination: draft.destination, budget: draft.budget } } as never);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setStepIndex((i) => i - 1);
    } else {
      router.back();
    }
  };

  const progress = (stepIndex + 1) / STEPS.length;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: `${progress * 100}%` as unknown as number }]} />
          </View>
          <Text style={styles.progressLabel}>{stepIndex + 1} of {STEPS.length}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* TRAVI Duck Message */}
      <View style={styles.duckRow}>
        <Animated.View style={[styles.duckAvatar, { transform: [{ translateY: duckBounce }] }]}>
          <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.duckGradient}>
            <Image source={require("@/assets/logos/mascot-dark.png")} style={styles.duckImg} resizeMode="contain" />
          </LinearGradient>
        </Animated.View>
        <Animated.View style={[styles.duckBubble, { opacity: fadeAnim }]}>
          <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} style={styles.duckBubbleGradient}>
            <Text style={styles.duckMessage}>{TRAVI_MESSAGES[stepIndex]}</Text>
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Step Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

        {/* ── STEP 1: Destination ── */}
        {currentStep === "destination" && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.destGrid}>
            {DESTINATIONS.map((dest) => {
              const selected = selectedDest?.id === dest.id;
              return (
                <TouchableOpacity
                  key={dest.id}
                  style={[styles.destCard, selected && styles.destCardSelected]}
                  onPress={() => {
                    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedDest(dest);
                  }}
                  activeOpacity={0.88}
                >
                  <LinearGradient colors={dest.gradient} style={styles.destGradient}>
                    {selected && <View style={styles.destSelectedOverlay} />}
                    <View style={[styles.destIconWrap, { backgroundColor: "rgba(255,255,255,0.06)" }]}>
                      <IconSymbol name={dest.icon} size={28} color="#FFFFFF" />
                    </View>
                    <View style={styles.destInfo}>
                      <Text style={styles.destCity}>{dest.city}</Text>
                      <Text style={styles.destCountry}>{dest.country}</Text>
                      <View style={styles.destVibePill}>
                        <Text style={styles.destVibe}>{dest.vibe}</Text>
                      </View>
                    </View>
                    {selected && (
                      <View style={styles.destCheck}>
                        <IconSymbol name="checkmark.circle.fill" size={24} color="#FFFFFF" />
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}



        {/* ── STEP 2: Dates ── */}
        {currentStep === "dates" && (
          <View style={styles.datesWrap}>
            <TouchableOpacity
              style={[styles.dateCard, editingDate === "start" && styles.dateCardActive]}
              onPress={() => setEditingDate(editingDate === "start" ? null : "start")}
              activeOpacity={0.88}
            >
              <LinearGradient
                colors={editingDate === "start" ? ["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={styles.dateCardLeft}>
                <View style={styles.dateIconWrap}>
                  <IconSymbol name="airplane.departure" size={20} color="#6443F4" />
                </View>
                <View>
                  <Text style={styles.dateCardLabel}>Departure</Text>
                  <Text style={styles.dateCardValue}>{startDate}</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={18} color="rgba(255,255,255,0.06)" />
            </TouchableOpacity>

            {editingDate === "start" && (
              <View style={styles.dateInputWrap}>
                <LinearGradient colors={["rgba(123,47,190,0.2)", "rgba(233,30,140,0.15)"]} style={StyleSheet.absoluteFillObject} />
                <TextInput
                  style={styles.dateInput}
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholder="e.g. Apr 15, 2026"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  returnKeyType="done"
                  onSubmitEditing={() => setEditingDate(null)}
                />
              </View>
            )}

            <TouchableOpacity
              style={[styles.dateCard, editingDate === "end" && styles.dateCardActive]}
              onPress={() => setEditingDate(editingDate === "end" ? null : "end")}
              activeOpacity={0.88}
            >
              <LinearGradient
                colors={editingDate === "end" ? ["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={styles.dateCardLeft}>
                <View style={styles.dateIconWrap}>
                  <IconSymbol name="airplane.arrival" size={20} color="#F94498" />
                </View>
                <View>
                  <Text style={styles.dateCardLabel}>Return</Text>
                  <Text style={styles.dateCardValue}>{endDate}</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={18} color="rgba(255,255,255,0.06)" />
            </TouchableOpacity>

            {editingDate === "end" && (
              <View style={styles.dateInputWrap}>
                <LinearGradient colors={["rgba(123,47,190,0.2)", "rgba(233,30,140,0.15)"]} style={StyleSheet.absoluteFillObject} />
                <TextInput
                  style={styles.dateInput}
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholder="e.g. Apr 22, 2026"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  returnKeyType="done"
                  onSubmitEditing={() => setEditingDate(null)}
                />
              </View>
            )}

            {startDate && endDate && (
              <View style={styles.durationPill}>
                <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.2)"]} style={StyleSheet.absoluteFillObject} />
                <IconSymbol name="clock.fill" size={16} color="#C084FC" />
                <Text style={styles.durationText}>7 nights · Perfect for a week escape</Text>
              </View>
            )}

            <Text style={styles.presetsTitle}>Quick select</Text>
            <View style={styles.datePresets}>
              {([
                { label: "Weekend", start: "Apr 11, 2026", end: "Apr 13, 2026" },
                { label: "1 Week", start: "Apr 15, 2026", end: "Apr 22, 2026" },
                { label: "2 Weeks", start: "Apr 15, 2026", end: "Apr 29, 2026" },
                { label: "1 Month", start: "May 1, 2026", end: "May 31, 2026" },
              ]).map((preset) => (
                <TouchableOpacity
                  key={preset.label}
                  style={styles.datePresetChip}
                  onPress={() => {
                    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setStartDate(preset.start);
                    setEndDate(preset.end);
                    setEditingDate(null);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.datePresetLabel}>{preset.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </Animated.View>

      {/* CTA Button */}
      <View style={styles.ctaWrap}>
        <TouchableOpacity
          style={[styles.ctaBtn, !canProceed() && styles.ctaBtnDisabled]}
          onPress={handleNext}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={canProceed() ? ["#6443F4", "#F94498"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={[styles.ctaText, !canProceed() && styles.ctaTextDisabled]}>
              {stepIndex === STEPS.length - 1 ? "Find My Perfect Trip" : "Next"}
            </Text>
            <IconSymbol name="arrow.right" size={20} color={canProceed() ? "#FFFFFF" : "#3A2D4E"} />
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
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  progressWrap: { flex: 1, gap: 6 },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#F94498", borderRadius: 2 },
  progressLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "right" },
  duckRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 20, paddingBottom: 130, gap: 10 },
  duckAvatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckImg: { width: 30, height: 30 },
  duckBubble: { flex: 1, borderRadius: 18, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckMessage: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold", lineHeight: 22 },
  content: { flex: 1 },
  destGrid: { paddingHorizontal: 20, gap: 12, paddingBottom: 130 },
  destCard: { borderRadius: 20, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.12)" },
  destCardSelected: { borderColor: "#F94498" },
  destGradient: { flexDirection: "row", alignItems: "center", padding: 18, gap: 16 },
  destSelectedOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(233,30,140,0.15)" },
  destIconWrap: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  destInfo: { flex: 1, gap: 4 },
  destCity: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", fontFamily: "Chillax-Bold" },
  destCountry: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  destVibePill: { alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginTop: 4 },
  destVibe: { color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: "600" },
  destCheck: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F94498", alignItems: "center", justifyContent: "center" },
  styleGrid: { paddingHorizontal: 20, gap: 12, paddingBottom: 130 },
  styleCard: { flexDirection: "row", alignItems: "center", borderRadius: 20, padding: 18, gap: 16, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.12)" },
  styleIconWrap: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  styleText: { flex: 1, gap: 4 },
  styleLabel: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  styleDesc: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular", lineHeight: 18 },
  styleCheck: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  travelersWrap: { flex: 1, paddingHorizontal: 20, alignItems: "center", gap: 24 },
  travelersCard: { width: "100%", borderRadius: 28, padding: 32, alignItems: "center", gap: 12, overflow: "hidden", borderWidth: 2, borderColor: "rgba(123,47,190,0.4)" },
  travelersIconRow: { flexDirection: "row", marginBottom: 8 },
  travelerAvatar: { width: 40, height: 40, borderRadius: 20, overflow: "hidden", borderWidth: 2, borderColor: "#0D0628" },
  travelerAvatarGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  travelerAvatarMore: { backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  travelerMoreText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  travelersCount: { color: "#FFFFFF", fontSize: 64, fontWeight: "900", fontFamily: "Satoshi-Bold", lineHeight: 72 },
  travelersLabel: { color: "rgba(255,255,255,0.5)", fontSize: 18, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  travelersControls: { flexDirection: "row", gap: 24 },
  travelerBtn: { borderRadius: 22, overflow: "hidden" },
  travelerBtnDisabled: { opacity: 0.4 },
  travelerBtnGradient: { width: 64, height: 64, alignItems: "center", justifyContent: "center", borderRadius: 22 },
  travelersPresets: { flexDirection: "row", gap: 10, flexWrap: "wrap", justifyContent: "center" },
  presetChip: { borderRadius: 14, paddingHorizontal: 20, paddingVertical: 10, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)" },
  presetChipActive: { borderColor: "rgba(192,132,252,0.6)" },
  presetLabel: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  presetLabelActive: { color: "#C084FC" },
  budgetGrid: { paddingHorizontal: 20, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  budgetCard: { width: (width - 52) / 2, borderRadius: 20, padding: 20, gap: 10, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.12)", alignItems: "center" },
  budgetIconWrap: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  budgetLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  budgetRange: { color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "center" },
  budgetCheck: { position: "absolute", top: 10, right: 10, width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  datesWrap: { paddingHorizontal: 20, gap: 14 },
  dateCard: { flexDirection: "row", alignItems: "center", borderRadius: 20, padding: 18, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.12)" },
  dateCardActive: { borderColor: "rgba(123,47,190,0.6)" },
  dateCardLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 14 },
  dateIconWrap: { width: 44, height: 44, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  dateCardLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "600" },
  dateCardValue: { color: "#FFFFFF", fontSize: 17, fontWeight: "700", fontFamily: "Chillax-Semibold", marginTop: 2 },
  dateInputWrap: { borderRadius: 16, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.4)" },
  dateInput: { color: "#FFFFFF", fontSize: 16, paddingHorizontal: 18, paddingVertical: 14 },
  durationPill: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, overflow: "hidden", borderWidth: 1, borderColor: "rgba(192,132,252,0.3)" },
  durationText: { color: "#C084FC", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  presetsTitle: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium", marginTop: 4 },
  datePresets: { flexDirection: "row", gap: 10 },
  datePresetChip: { flex: 1, borderRadius: 14, paddingVertical: 10, alignItems: "center", backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)" },
  datePresetLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  ctaWrap: { paddingHorizontal: 20, paddingBottom: 130, paddingTop: 12 },
  ctaBtn: { borderRadius: 20, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  ctaBtnDisabled: { opacity: 0.5 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10, borderRadius: 20 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  ctaTextDisabled: { color: "#3A2D4E" },
  // Custom budget slider styles
  budgetWrap: { gap: 12, paddingBottom: 130 },
  customBudgetCard: { marginHorizontal: 20, borderRadius: 20, padding: 20, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.12)" },
  customBudgetCardActive: { borderColor: "rgba(249,68,152,0.6)" },
  customBudgetTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  customAmount: { color: "#F94498", fontSize: 18, fontWeight: "800", fontFamily: "Satoshi-Bold" },
  sliderWrap: { marginTop: 16, gap: 8 },
  sliderTrack: { height: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", position: "relative" },
  sliderFill: { height: "100%" as unknown as number, borderRadius: 3 },
  sliderThumb: { position: "absolute", top: -9, width: 24, height: 24, borderRadius: 12, backgroundColor: "#F94498", borderWidth: 3, borderColor: "#0D0628", marginLeft: -12 },
  sliderLabels: { flexDirection: "row", justifyContent: "space-between" },
  sliderLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  sliderPresets: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 4 },
  presetChipText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "600" },
  presetChipTextActive: { color: "#C084FC" },
  paceWrap: { flex: 1, paddingHorizontal: 20, paddingTop: 8, gap: 12 },
  paceCard: { borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.06)", padding: 20, flexDirection: "row", alignItems: "center", gap: 16, position: "relative" },
  paceEmoji: { fontSize: 32 },
  paceLabel: { fontSize: 17, fontWeight: "700", fontFamily: "Chillax-Semibold", color: "#FFFFFF", marginBottom: 4 },
  paceDesc: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.55)", lineHeight: 18 },
  paceCheck: { position: "absolute", top: 12, right: 12, width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
});
