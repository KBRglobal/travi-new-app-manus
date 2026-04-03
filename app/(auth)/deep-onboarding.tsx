// @ts-nocheck
/**
 * TRAVI — Deep Onboarding (10 Steps)
 * Extended DNA collection: travel mode, planning style, budget mindset,
 * pace calibration, non-negotiables, food preferences, allergies,
 * accessibility, trip directions, business integration.
 * Saves all data to DNA store. Accessible from Profile → "Complete Your Profile".
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────

interface OnboardingData {
  travelMode: string | null;
  planningStyle: string | null;
  budgetMindset: string | null;
  pace: number;
  nonNegotiables: string[];
  foodPreferences: string[];
  allergies: string[];
  accessibility: string[];
  tripDirections: string[];
  businessInterests: string[];
}

// ─── Step Definitions ─────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "travelMode",
    title: "How do you travel?",
    subtitle: "This shapes every recommendation TRAVI makes for you.",
    icon: "✈️",
    color: "#6443F4",
    type: "single" as const,
    options: [
      { id: "solo", icon: "🧍", label: "Solo", sub: "Just me and the world" },
      { id: "couple", icon: "👫", label: "Couple", sub: "Romantic getaways & shared adventures" },
      { id: "group", icon: "👥", label: "Group", sub: "Friends, colleagues, or community" },
      { id: "family", icon: "👨‍👩‍👧‍👦", label: "Family", sub: "Kid-friendly & multi-generational" },
    ],
  },
  {
    id: "planningStyle",
    title: "Your planning style?",
    subtitle: "Are you a meticulous planner or a spontaneous explorer?",
    icon: "📋",
    color: "#F94498",
    type: "single" as const,
    options: [
      { id: "detailed", icon: "📊", label: "Detailed Planner", sub: "I research everything in advance" },
      { id: "spontaneous", icon: "🎲", label: "Spontaneous", sub: "I figure it out as I go" },
      { id: "mix", icon: "⚖️", label: "Mix of Both", sub: "Key things planned, rest is free" },
      { id: "guided", icon: "🗺️", label: "Let TRAVI Plan", sub: "I trust AI to handle everything" },
    ],
  },
  {
    id: "budgetMindset",
    title: "Your budget mindset?",
    subtitle: "Not just how much — but how you think about spending on travel.",
    icon: "💰",
    color: "#F59E0B",
    type: "single" as const,
    options: [
      { id: "value", icon: "🎯", label: "Value Hunter", sub: "Best experience per dollar spent" },
      { id: "quality", icon: "⭐", label: "Quality First", sub: "I pay for what matters to me" },
      { id: "luxury", icon: "👑", label: "Luxury Mindset", sub: "Only the best — money is secondary" },
      { id: "budget", icon: "🪙", label: "Budget Traveler", sub: "Stretch every dollar, maximize trips" },
    ],
  },
  {
    id: "pace",
    title: "Your travel pace?",
    subtitle: "From completely relaxed to packed-schedule explorer.",
    icon: "⏱️",
    color: "#10B981",
    type: "slider" as const,
    sliderLabels: ["🛁 Ultra Chill", "😌 Relaxed", "⚖️ Balanced", "🚀 Active", "⚡ Packed"],
  },
  {
    id: "nonNegotiables",
    title: "Your non-negotiables?",
    subtitle: "Things you absolutely must have (or avoid) on every trip.",
    icon: "🚫",
    color: "#EF4444",
    type: "multi" as const,
    options: [
      { id: "wifi", icon: "📶", label: "Fast WiFi", sub: "I work remotely" },
      { id: "pool", icon: "🏊", label: "Pool / Beach", sub: "Water is non-negotiable" },
      { id: "gym", icon: "🏋️", label: "Gym Access", sub: "I maintain my routine" },
      { id: "ac", icon: "❄️", label: "Air Conditioning", sub: "Essential for comfort" },
      { id: "no_party", icon: "🔇", label: "No Party Scene", sub: "I need peace and quiet" },
      { id: "no_crowds", icon: "🏔️", label: "Avoid Crowds", sub: "Off-the-beaten-path only" },
      { id: "pet_friendly", icon: "🐾", label: "Pet Friendly", sub: "Traveling with my pet" },
      { id: "accessible", icon: "♿", label: "Accessible", sub: "Mobility-friendly required" },
    ],
  },
  {
    id: "foodPreferences",
    title: "Your food preferences?",
    subtitle: "What cuisines and dining styles define your travel eating?",
    icon: "🍜",
    color: "#F97316",
    type: "multi" as const,
    options: [
      { id: "local", icon: "🏘️", label: "Local Street Food", sub: "Authentic hole-in-the-wall spots" },
      { id: "fine", icon: "🍽️", label: "Fine Dining", sub: "Michelin stars & tasting menus" },
      { id: "vegetarian", icon: "🥗", label: "Vegetarian", sub: "Plant-based options required" },
      { id: "vegan", icon: "🌱", label: "Vegan", sub: "100% plant-based only" },
      { id: "halal", icon: "☪️", label: "Halal", sub: "Halal-certified restaurants" },
      { id: "kosher", icon: "✡️", label: "Kosher", sub: "Kosher-certified restaurants" },
      { id: "seafood", icon: "🦞", label: "Seafood Lover", sub: "Fresh fish & ocean flavors" },
      { id: "adventurous", icon: "🦗", label: "Adventurous Eater", sub: "I'll try anything once" },
    ],
  },
  {
    id: "allergies",
    title: "Any food allergies?",
    subtitle: "We'll filter out restaurants and activities that may be unsafe.",
    icon: "⚠️",
    color: "#EF4444",
    type: "multi" as const,
    options: [
      { id: "none", icon: "✅", label: "No Allergies", sub: "I can eat anything" },
      { id: "nuts", icon: "🥜", label: "Tree Nuts / Peanuts", sub: "Nut allergy" },
      { id: "gluten", icon: "🌾", label: "Gluten / Wheat", sub: "Celiac or gluten sensitivity" },
      { id: "dairy", icon: "🥛", label: "Dairy / Lactose", sub: "Lactose intolerant" },
      { id: "shellfish", icon: "🦐", label: "Shellfish", sub: "Shellfish allergy" },
      { id: "eggs", icon: "🥚", label: "Eggs", sub: "Egg allergy" },
      { id: "soy", icon: "🫘", label: "Soy", sub: "Soy allergy" },
      { id: "fish", icon: "🐟", label: "Fish", sub: "Fish allergy" },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility needs?",
    subtitle: "TRAVI ensures every recommendation works for you.",
    icon: "♿",
    color: "#0EA5E9",
    type: "multi" as const,
    options: [
      { id: "none", icon: "✅", label: "No Special Needs", sub: "Standard accessibility is fine" },
      { id: "mobility", icon: "♿", label: "Mobility Assistance", sub: "Wheelchair or limited walking" },
      { id: "visual", icon: "👁️", label: "Visual Impairment", sub: "Screen reader or guide support" },
      { id: "hearing", icon: "👂", label: "Hearing Impairment", sub: "Visual alerts preferred" },
      { id: "cognitive", icon: "🧠", label: "Cognitive Support", sub: "Simplified navigation" },
      { id: "elderly", icon: "👴", label: "Senior Traveler", sub: "Comfortable pace & facilities" },
    ],
  },
  {
    id: "tripDirections",
    title: "Trip preferences?",
    subtitle: "What types of trips do you typically take?",
    icon: "🌍",
    color: "#8B5CF6",
    type: "multi" as const,
    options: [
      { id: "short_haul", icon: "🛫", label: "Short Haul", sub: "Under 4 hours flight" },
      { id: "long_haul", icon: "🌏", label: "Long Haul", sub: "International, 8+ hours" },
      { id: "domestic", icon: "🏠", label: "Domestic", sub: "Within my home country" },
      { id: "international", icon: "🌐", label: "International", sub: "Cross-border adventures" },
      { id: "weekend", icon: "📅", label: "Weekend Getaways", sub: "2-3 day escapes" },
      { id: "extended", icon: "🗓️", label: "Extended Trips", sub: "2+ weeks at a time" },
      { id: "business", icon: "💼", label: "Business Travel", sub: "Work + leisure (bleisure)" },
      { id: "digital_nomad", icon: "💻", label: "Digital Nomad", sub: "Work from anywhere" },
    ],
  },
  {
    id: "businessInterests",
    title: "Investment interests?",
    subtitle: "TRAVI Anatra: real estate & investment opportunities while you travel.",
    icon: "🏢",
    color: "#D97706",
    type: "multi" as const,
    options: [
      { id: "none", icon: "❌", label: "Not Interested", sub: "Just travel for me" },
      { id: "dubai_re", icon: "🏙️", label: "Dubai Real Estate", sub: "Off-plan & ready properties" },
      { id: "abudhabi_re", icon: "🕌", label: "Abu Dhabi Real Estate", sub: "Capital city investments" },
      { id: "short_term", icon: "🏨", label: "Short-Term Rentals", sub: "Airbnb & holiday homes" },
      { id: "commercial", icon: "🏢", label: "Commercial Property", sub: "Office & retail spaces" },
      { id: "roi_focus", icon: "📈", label: "High ROI Focus", sub: "Maximize investment returns" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DeepOnboardingScreen() {
  const insets = useSafeAreaInsets();
  const [stepIdx, setStepIdx] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    travelMode: null,
    planningStyle: null,
    budgetMindset: null,
    pace: 2,
    nonNegotiables: [],
    foodPreferences: [],
    allergies: [],
    accessibility: [],
    tripDirections: [],
    businessInterests: [],
  });
  const [skipsUsed, setSkipsUsed] = useState(0);
  const MAX_SKIPS = 3;

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const currentStep = STEPS[stepIdx];
  const progress = (stepIdx + 1) / STEPS.length;

  const animateTransition = (forward: boolean, callback: () => void) => {
    const direction = forward ? -30 : 30;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: direction, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      callback();
      slideAnim.setValue(-direction);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    });
  };

  const goNext = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (stepIdx < STEPS.length - 1) {
      animateTransition(true, () => setStepIdx((p) => p + 1));
    } else {
      handleComplete();
    }
  };

  const goBack = () => {
    if (stepIdx > 0) {
      animateTransition(false, () => setStepIdx((p) => p - 1));
    } else {
      router.back();
    }
  };

  const handleSkip = () => {
    if (skipsUsed >= MAX_SKIPS) return;
    setSkipsUsed((p) => p + 1);
    goNext();
  };

  const handleComplete = async () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await AsyncStorage.setItem("@travi_deep_onboarding", JSON.stringify(data));
    await AsyncStorage.setItem("@travi_deep_onboarding_done", "1");
    router.back();
  };

  const toggleMulti = (key: keyof OnboardingData, value: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setData((prev) => {
      const arr = prev[key] as string[];
      const has = arr.includes(value);
      // If selecting "none", clear others
      if (value === "none") return { ...prev, [key]: has ? [] : ["none"] };
      const filtered = arr.filter((v) => v !== "none");
      return { ...prev, [key]: has ? filtered.filter((v) => v !== value) : [...filtered, value] };
    });
  };

  const setSingle = (key: keyof OnboardingData, value: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    const step = currentStep;
    if (step.type === "single") {
      return (data[step.id as keyof OnboardingData] as string | null) !== null;
    }
    if (step.type === "multi") {
      return (data[step.id as keyof OnboardingData] as string[]).length > 0;
    }
    return true; // slider always valid
  };

  const renderOptions = () => {
    const step = currentStep;

    if (step.type === "single") {
      const selected = data[step.id as keyof OnboardingData] as string | null;
      return (
        <View style={styles.optionsGrid}>
          {step.options!.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optionCard, isSelected && { borderColor: step.color, backgroundColor: step.color + "22" }]}
                onPress={() => setSingle(step.id as keyof OnboardingData, opt.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.optionIcon}>{opt.icon}</Text>
                <Text style={[styles.optionLabel, isSelected && { color: "#1A0B2E" }]}>{opt.label}</Text>
                <Text style={styles.optionSub}>{opt.sub}</Text>
                {isSelected && (
                  <View style={[styles.checkBadge, { backgroundColor: step.color }]}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    if (step.type === "multi") {
      const selected = data[step.id as keyof OnboardingData] as string[];
      return (
        <View style={styles.optionsGrid}>
          {step.options!.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optionCard, isSelected && { borderColor: step.color, backgroundColor: step.color + "22" }]}
                onPress={() => toggleMulti(step.id as keyof OnboardingData, opt.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.optionIcon}>{opt.icon}</Text>
                <Text style={[styles.optionLabel, isSelected && { color: "#1A0B2E" }]}>{opt.label}</Text>
                <Text style={styles.optionSub}>{opt.sub}</Text>
                {isSelected && (
                  <View style={[styles.checkBadge, { backgroundColor: step.color }]}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    if (step.type === "slider") {
      const labels = step.sliderLabels!;
      const pace = data.pace;
      return (
        <View style={styles.sliderWrap}>
          <Text style={[styles.sliderValue, { color: step.color }]}>{labels[pace]}</Text>
          <View style={styles.sliderTrack}>
            {labels.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.sliderDot,
                  i <= pace && { backgroundColor: step.color },
                  i === pace && styles.sliderDotActive,
                ]}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setData((prev) => ({ ...prev, pace: i }));
                }}
                activeOpacity={0.8}
              />
            ))}
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelText}>Chill</Text>
            <Text style={styles.sliderLabelText}>Packed</Text>
          </View>
          <Text style={styles.sliderHint}>
            Tap a dot to set your pace. TRAVI will build itineraries that match your energy.
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background */}
      <View style={[styles.orb, { backgroundColor: currentStep.color + "15", top: -100, left: -100 }]} />
      <View style={[styles.orb, { backgroundColor: currentStep.color + "08", bottom: 0, right: -80 }]} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.stepCounter}>{stepIdx + 1} / {STEPS.length}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` as any, backgroundColor: currentStep.color }]} />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSkip}
          style={[styles.skipBtn, skipsUsed >= MAX_SKIPS && { opacity: 0.3 }]}
          activeOpacity={0.7}
          disabled={skipsUsed >= MAX_SKIPS}
        >
          <Text style={styles.skipText}>Skip ({MAX_SKIPS - skipsUsed})</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Step header */}
          <View style={styles.stepHeader}>
            <View style={[styles.stepIconWrap, { backgroundColor: currentStep.color + "22" }]}>
              <Text style={styles.stepIcon}>{currentStep.icon}</Text>
            </View>
            <Text style={styles.stepTitle}>{currentStep.title}</Text>
            <Text style={styles.stepSubtitle}>{currentStep.subtitle}</Text>
          </View>

          {/* Options */}
          {renderOptions()}

          {/* Bottom spacer for CTA */}
          <View style={{ height: 120 }} />
        </ScrollView>
      </Animated.View>

      {/* CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.ctaBtn, !canProceed() && { opacity: 0.4 }]}
          onPress={goNext}
          activeOpacity={0.85}
          disabled={!canProceed()}
        >
          <LinearGradient
            colors={[currentStep.color, currentStep.color + "CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGrad}
          >
            <Text style={styles.ctaText}>
              {stepIdx === STEPS.length - 1 ? "Complete Profile →" : "Continue →"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb: { position: "absolute", width: width * 0.9, height: width * 0.9, borderRadius: width * 0.45 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#1A0B2E", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1, gap: 6 },
  stepCounter: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700", textAlign: "center" },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2 },
  progressFill: { height: "100%", borderRadius: 2 },
  skipBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  skipText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "600" },
  content: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
  stepHeader: { alignItems: "center", paddingTop: 16, paddingBottom: 16, gap: 10 },
  stepIconWrap: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  stepIcon: { fontSize: 32 },
  stepTitle: { color: "#1A0B2E", fontSize: 24, fontWeight: "900", textAlign: "center", fontFamily: "Chillax-Bold" },
  stepSubtitle: { color: "rgba(255,255,255,0.55)", fontSize: 15, textAlign: "center", lineHeight: 22, fontFamily: "Satoshi-Regular" },
  optionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  optionCard: {
    width: (width - 52) / 2,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.12)",
    gap: 4,
    position: "relative",
  },
  optionIcon: { fontSize: 26, marginBottom: 4 },
  optionLabel: { color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  optionSub: { color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 16 },
  checkBadge: { position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  checkText: { color: "#1A0B2E", fontSize: 11, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
  sliderWrap: { alignItems: "center", gap: 20, paddingVertical: 20 },
  sliderValue: { fontSize: 24, fontWeight: "900", fontFamily: "Chillax-Bold" },
  sliderTrack: { flexDirection: "row", alignItems: "center", gap: 16 },
  sliderDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.06)" },
  sliderDotActive: { width: 28, height: 28, borderRadius: 14 },
  sliderLabels: { flexDirection: "row", justifyContent: "space-between", width: "80%" },
  sliderLabelText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  sliderHint: { color: "rgba(255,255,255,0.55)", fontSize: 13, textAlign: "center", lineHeight: 20, paddingHorizontal: 20, fontFamily: "Satoshi-Regular" },
  ctaWrap: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 12, backgroundColor: "#0D0628" },
  ctaBtn: { borderRadius: 18, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  ctaGrad: { paddingVertical: 18, alignItems: "center" },
  ctaText: { color: "#1A0B2E", fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
