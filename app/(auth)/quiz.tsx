/**
 * TRAVI DNA Quiz — Onboarding
 * Phase A: Activity categories (multi-select, min 3)
 * Phase B: Trip pace (3 cards)
 * Phase C: 10 scenario-based DNA questions
 * Phase D: DNA result screen
 */

import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Platform, ScrollView } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { recordInterestSelections } from "@/lib/dna-store";
import { DNAResultScreen } from "@/components/dna-result-screen";
import * as Haptics from "expo-haptics";
import type { ActivityCategory, TripPace } from "@/lib/store";

const { width } = Dimensions.get("window");

// ── Phase A: Activity categories ─────────────────────────────────────────────

type ActivityItem = {
  id: ActivityCategory;
  label: string;
  emoji: string;
  iconName: string;
  color: string;
};

const ACTIVITIES: ActivityItem[] = [
  { id: "beaches",      label: "Beaches",       emoji: "🏖️", iconName: "beach.umbrella",         color: "#0EA5E9" },
  { id: "hiking",       label: "Hiking",         emoji: "🥾", iconName: "figure.hiking",           color: "#22C55E" },
  { id: "food",         label: "Food & Dining",  emoji: "🍜", iconName: "fork.knife",              color: "#F97316" },
  { id: "nightlife",    label: "Nightlife",       emoji: "🎉", iconName: "music.note",              color: "#A855F7" },
  { id: "culture",      label: "Culture",         emoji: "🏛️", iconName: "building.columns.fill",  color: "#6443F4" },
  { id: "adventure",    label: "Adventure",       emoji: "🪂", iconName: "bolt.fill",               color: "#EF4444" },
  { id: "wellness",     label: "Wellness & Spa",  emoji: "🧘", iconName: "sparkles",               color: "#06B6D4" },
  { id: "shopping",     label: "Shopping",        emoji: "🛍️", iconName: "bag.fill",               color: "#EC4899" },
  { id: "nature",       label: "Nature",          emoji: "🌿", iconName: "leaf.fill",              color: "#16A34A" },
  { id: "art",          label: "Art & Design",    emoji: "🎨", iconName: "paintbrush.fill",        color: "#F59E0B" },
  { id: "music",        label: "Live Music",      emoji: "🎵", iconName: "music.note.list",        color: "#8B5CF6" },
  { id: "architecture", label: "Architecture",    emoji: "🏗️", iconName: "building.2.fill",       color: "#64748B" },
];

// ── Phase B: Pace options ─────────────────────────────────────────────────────

type PaceOption = { id: TripPace; label: string; sublabel: string; desc: string; emoji: string; colors: [string, string] };

const PACE_OPTIONS: PaceOption[] = [
  {
    id: "slow",
    label: "Slow & Deep",
    sublabel: "2–3 things a day",
    desc: "Really feel each place. Long lunches, no rushing.",
    emoji: "🌿",
    colors: ["#0E7490", "#06B6D4"],
  },
  {
    id: "balanced",
    label: "Balanced",
    sublabel: "Mix of must-sees & free time",
    desc: "See the highlights, keep space for surprises.",
    emoji: "⚡",
    colors: ["#6443F4", "#9077EF"],
  },
  {
    id: "full",
    label: "Full Send",
    sublabel: "Every hour counts",
    desc: "Max destinations, max experiences. Sleep at home.",
    emoji: "🔥",
    colors: ["#DC2626", "#F97316"],
  },
];

// ── Phase C: DNA Questions ────────────────────────────────────────────────────

type DNATag = "culture" | "adventure" | "food" | "luxury" | "social" | "solo" | "nature" | "urban" | "relax" | "spontaneous" | "planned";
interface QuizOption { id: string; label: string; sublabel: string; colors: [string, string]; iconName: string; tags: DNATag[]; }
interface QuizQuestion { id: number; question: string; subtitle: string; options: QuizOption[]; }

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "First morning abroad — what happens?",
    subtitle: "You just landed. The day is yours.",
    options: [
      { id: "1a", label: "Slow coffee & people-watch", sublabel: "Let the city come to me", colors: ["#0E7490", "#06B6D4"], iconName: "cup.and.saucer.fill", tags: ["relax", "urban", "solo"] },
      { id: "1b", label: "Straight to the market", sublabel: "Smell, taste, touch everything", colors: ["#7C2D12", "#DC2626"], iconName: "cart.fill", tags: ["food", "social", "spontaneous"] },
      { id: "1c", label: "Spa & decompress", sublabel: "Travel is tiring — I recharge first", colors: ["#6443F4", "#9077EF"], iconName: "sparkles", tags: ["relax", "luxury", "solo"] },
      { id: "1d", label: "Out the door, no plan", sublabel: "Best discoveries are unplanned", colors: ["#02A65C", "#059669"], iconName: "figure.walk", tags: ["adventure", "spontaneous", "solo"] },
    ],
  },
  {
    id: 2,
    question: "You're hungry. Where do you eat?",
    subtitle: "No recommendations, no Google Maps.",
    options: [
      { id: "2a", label: "Follow the locals", sublabel: "If it's packed, it's good", colors: ["#7C2D12", "#F97316"], iconName: "person.2.fill", tags: ["food", "social", "spontaneous"] },
      { id: "2b", label: "The place I booked 2 months ago", sublabel: "Research is part of the trip", colors: ["#292524", "#78716C"], iconName: "fork.knife.circle.fill", tags: ["food", "luxury", "planned"] },
      { id: "2c", label: "Nice café with a view", sublabel: "Ambiance matters as much as food", colors: ["#1E40AF", "#3B82F6"], iconName: "cup.and.saucer.fill", tags: ["urban", "relax", "planned"] },
      { id: "2d", label: "Street food, plastic stool", sublabel: "$3 noodles beat any restaurant", colors: ["#14532D", "#22C55E"], iconName: "fork.knife", tags: ["food", "culture", "spontaneous"] },
    ],
  },
  {
    id: 3,
    question: "Free afternoon — you choose:",
    subtitle: "Nothing is planned. What calls you?",
    options: [
      { id: "3a", label: "Museum or temple", sublabel: "Context makes everything richer", colors: ["#6443F4", "#1D4ED8"], iconName: "building.columns.fill", tags: ["culture", "solo", "planned"] },
      { id: "3b", label: "Pool with a cocktail", sublabel: "I earned this", colors: ["#0E7490", "#22D3EE"], iconName: "drop.fill", tags: ["relax", "luxury", "solo"] },
      { id: "3c", label: "Hike or kayak", sublabel: "Body in motion, mind at peace", colors: ["#02A65C", "#059669"], iconName: "figure.hiking", tags: ["adventure", "nature", "solo"] },
      { id: "3d", label: "Wander the streets", sublabel: "Get lost, find something real", colors: ["#B45309", "#F59E0B"], iconName: "map.fill", tags: ["culture", "spontaneous", "urban"] },
    ],
  },
  {
    id: 4,
    question: "Where do you sleep best?",
    subtitle: "Your ideal place to wake up abroad.",
    options: [
      { id: "4a", label: "5-star resort, full service", sublabel: "If I'm traveling, I'm doing it right", colors: ["#292524", "#57534E"], iconName: "crown.fill", tags: ["luxury", "relax", "planned"] },
      { id: "4b", label: "Boutique hotel with character", sublabel: "Unique, local, personal", colors: ["#6443F4", "#9077EF"], iconName: "building.2.fill", tags: ["culture", "luxury", "planned"] },
      { id: "4c", label: "Jungle villa or nature lodge", sublabel: "Wake up to birds, not traffic", colors: ["#14532D", "#22C55E"], iconName: "house.fill", tags: ["nature", "adventure", "relax"] },
      { id: "4d", label: "Hostel or local Airbnb", sublabel: "Spend on experiences, not beds", colors: ["#7C2D12", "#F97316"], iconName: "person.3.fill", tags: ["social", "spontaneous", "solo"] },
    ],
  },
  {
    id: 5,
    question: "Your flight is cancelled.",
    subtitle: "You have 6 unexpected hours. You:",
    options: [
      { id: "5a", label: "Head into the city", sublabel: "Bonus destination, let's go", colors: ["#02A65C", "#059669"], iconName: "map.fill", tags: ["adventure", "spontaneous", "culture"] },
      { id: "5b", label: "Find the airport lounge", sublabel: "Comfort is always the right call", colors: ["#292524", "#44403C"], iconName: "sofa.fill", tags: ["luxury", "relax", "planned"] },
      { id: "5c", label: "Rebook and plan the new route", sublabel: "I need to know what comes next", colors: ["#1E40AF", "#3B82F6"], iconName: "calendar", tags: ["planned", "solo", "urban"] },
      { id: "5d", label: "Meet whoever's nearby", sublabel: "Best travel stories start in airports", colors: ["#6B21A8", "#F94498"], iconName: "person.2.fill", tags: ["social", "spontaneous", "urban"] },
    ],
  },
  {
    id: 6,
    question: "Evening in a new city.",
    subtitle: "How does your perfect night look?",
    options: [
      { id: "6a", label: "Rooftop bar, city lights", sublabel: "Cocktail in hand, skyline view", colors: ["#312E81", "#6366F1"], iconName: "wineglass.fill", tags: ["urban", "social", "luxury"] },
      { id: "6b", label: "Dinner I booked weeks ago", sublabel: "The meal is the event", colors: ["#292524", "#78716C"], iconName: "star.fill", tags: ["food", "luxury", "planned"] },
      { id: "6c", label: "Night market, street food", sublabel: "Loud, messy, unforgettable", colors: ["#7C2D12", "#DC2626"], iconName: "cart.fill", tags: ["food", "social", "spontaneous"] },
      { id: "6d", label: "Back to the hotel early", sublabel: "Tomorrow is the real adventure", colors: ["#0E7490", "#06B6D4"], iconName: "moon.fill", tags: ["relax", "solo", "planned"] },
    ],
  },
  {
    id: 7,
    question: "You have one day left. You:",
    subtitle: "Last day, limited time.",
    options: [
      { id: "7a", label: "That one place I missed", sublabel: "The list must be completed", colors: ["#6443F4", "#1D4ED8"], iconName: "list.bullet.clipboard.fill", tags: ["culture", "planned", "solo"] },
      { id: "7b", label: "Go back to my favorite spot", sublabel: "Depth over breadth", colors: ["#02A65C", "#059669"], iconName: "heart.fill", tags: ["relax", "solo", "nature"] },
      { id: "7c", label: "Full spa day", sublabel: "Leave feeling better than I arrived", colors: ["#0E7490", "#22D3EE"], iconName: "sparkles", tags: ["relax", "luxury", "solo"] },
      { id: "7d", label: "Wander until I have to leave", sublabel: "No plan is the best plan", colors: ["#B45309", "#F59E0B"], iconName: "figure.walk", tags: ["spontaneous", "adventure", "urban"] },
    ],
  },
  {
    id: 8,
    question: "What makes a trip memorable?",
    subtitle: "The thing you talk about years later.",
    options: [
      { id: "8a", label: "A meal I still dream about", sublabel: "Food is memory", colors: ["#7C2D12", "#F97316"], iconName: "fork.knife", tags: ["food", "culture", "social"] },
      { id: "8b", label: "A view that stopped time", sublabel: "Nature or skyline — doesn't matter", colors: ["#14532D", "#22C55E"], iconName: "mountain.2.fill", tags: ["nature", "adventure", "solo"] },
      { id: "8c", label: "A person I met", sublabel: "Connections outlast destinations", colors: ["#6B21A8", "#F94498"], iconName: "person.2.fill", tags: ["social", "spontaneous", "culture"] },
      { id: "8d", label: "The feeling of total peace", sublabel: "No phone, no stress, just present", colors: ["#0E7490", "#06B6D4"], iconName: "moon.fill", tags: ["relax", "solo", "nature"] },
    ],
  },
  {
    id: 9,
    question: "You're choosing between two trips.",
    subtitle: "Same price, same duration.",
    options: [
      { id: "9a", label: "One country, go deep", sublabel: "Know it like a local", colors: ["#6443F4", "#9077EF"], iconName: "magnifyingglass", tags: ["culture", "solo", "planned"] },
      { id: "9b", label: "Three countries, keep moving", sublabel: "More stamps, more stories", colors: ["#6443F4", "#C084FC"], iconName: "globe", tags: ["adventure", "spontaneous", "social"] },
      { id: "9c", label: "One resort, total luxury", sublabel: "I want to arrive and never leave", colors: ["#292524", "#78716C"], iconName: "crown.fill", tags: ["luxury", "relax", "planned"] },
      { id: "9d", label: "Off-grid, no itinerary", sublabel: "Discover as I go", colors: ["#02A65C", "#059669"], iconName: "map.fill", tags: ["nature", "adventure", "spontaneous"] },
    ],
  },
  {
    id: 10,
    question: "What matters most to you?",
    subtitle: "Be honest — this shapes everything.",
    options: [
      { id: "10a", label: "The hotel", sublabel: "Base camp sets the whole tone", colors: ["#292524", "#57534E"], iconName: "bed.double.fill", tags: ["luxury", "relax", "planned"] },
      { id: "10b", label: "The food", sublabel: "Every meal is an experience", colors: ["#7C2D12", "#DC2626"], iconName: "fork.knife.circle.fill", tags: ["food", "culture", "social"] },
      { id: "10c", label: "The moments", sublabel: "Photos, feelings, memories", colors: ["#6B21A8", "#F94498"], iconName: "sparkles", tags: ["spontaneous", "social", "nature"] },
      { id: "10d", label: "The peace", sublabel: "No schedule, no pressure, just free", colors: ["#0E7490", "#06B6D4"], iconName: "moon.stars.fill", tags: ["relax", "solo", "nature"] },
    ],
  },
];

// ── DNA Profiles ──────────────────────────────────────────────────────────────

type DNAIconName = "building.columns.fill" | "fork.knife" | "mountain.2.fill" | "crown.fill" | "person.2.fill" | "leaf.fill" | "moon.fill" | "building.fill" | "bolt.fill" | "list.bullet.clipboard.fill" | "figure.walk" | "globe";

const QIMG = {
  kyoto: require("@/assets/destinations/kyoto.jpg"),
  tokyo: require("@/assets/destinations/tokyo.jpg"),
  patagonia: require("@/assets/destinations/patagonia.jpg"),
  maldives: require("@/assets/destinations/maldives.jpg"),
  dubai: require("@/assets/destinations/dubai.jpg"),
  barcelona: require("@/assets/destinations/barcelona.jpg"),
  bali: require("@/assets/destinations/bali.jpg"),
  iceland: require("@/assets/destinations/iceland.jpg"),
  santorini: require("@/assets/destinations/santorini.jpg"),
  newyork: require("@/assets/destinations/newyork.jpg"),
  rome: require("@/assets/destinations/rome.jpg"),
  machupicchu: require("@/assets/destinations/machupicchu.jpg"),
  paris: require("@/assets/destinations/paris.jpg"),
  amsterdam: require("@/assets/destinations/amsterdam.jpg"),
  phuket: require("@/assets/destinations/phuket.jpg"),
};
type DestinationEntry = { name: string; image: number };
const DNA_PROFILES: Record<string, { title: string; iconName: DNAIconName; description: string; destinations: DestinationEntry[]; colors: [string, string] }> = {
  culture: { title: "Cultural Explorer", iconName: "building.columns.fill", description: "You travel to understand the world. Museums, history, and authentic local experiences fuel your soul.", destinations: [{ name: "Kyoto, Japan", image: QIMG.kyoto }, { name: "Rome, Italy", image: QIMG.rome }, { name: "Amsterdam", image: QIMG.amsterdam }], colors: ["#6443F4", "#6443F4"] },
  food: { title: "Culinary Nomad", iconName: "fork.knife", description: "Your itinerary is built around meals. You know the best street food spots before you land.", destinations: [{ name: "Tokyo, Japan", image: QIMG.tokyo }, { name: "Barcelona, Spain", image: QIMG.barcelona }, { name: "Phuket, Thailand", image: QIMG.phuket }], colors: ["#7C2D12", "#DC2626"] },
  adventure: { title: "Adrenaline Seeker", iconName: "mountain.2.fill", description: "You need the rush. Hikes, dives, and off-the-beaten-path discoveries define your trips.", destinations: [{ name: "Iceland", image: QIMG.iceland }, { name: "Patagonia", image: QIMG.patagonia }, { name: "Machu Picchu", image: QIMG.machupicchu }], colors: ["#02A65C", "#02A65C"] },
  luxury: { title: "Luxury Connoisseur", iconName: "crown.fill", description: "You believe travel should be an experience of the finest things. Quality over quantity, always.", destinations: [{ name: "Maldives", image: QIMG.maldives }, { name: "Santorini", image: QIMG.santorini }, { name: "Dubai, UAE", image: QIMG.dubai }], colors: ["#292524", "#78716C"] },
  social: { title: "Social Butterfly", iconName: "person.2.fill", description: "You travel for the people — locals, fellow travelers, and the connections that last a lifetime.", destinations: [{ name: "Barcelona, Spain", image: QIMG.barcelona }, { name: "Bali, Indonesia", image: QIMG.bali }, { name: "Amsterdam", image: QIMG.amsterdam }], colors: ["#6B21A8", "#F94498"] },
  nature: { title: "Nature Wanderer", iconName: "leaf.fill", description: "The best views have no WiFi. You seek wild places that remind you how small we are.", destinations: [{ name: "Iceland", image: QIMG.iceland }, { name: "Patagonia", image: QIMG.patagonia }, { name: "Bali, Indonesia", image: QIMG.bali }], colors: ["#14532D", "#22C55E"] },
  relax: { title: "Mindful Traveler", iconName: "moon.fill", description: "You travel to restore. Slow mornings, beautiful surroundings, and zero rush define your perfect trip.", destinations: [{ name: "Santorini, Greece", image: QIMG.santorini }, { name: "Maldives", image: QIMG.maldives }, { name: "Bali", image: QIMG.bali }], colors: ["#0E7490", "#06B6D4"] },
  urban: { title: "City Connoisseur", iconName: "building.fill", description: "Skylines, rooftops, and the electric energy of great cities are your natural habitat.", destinations: [{ name: "New York, USA", image: QIMG.newyork }, { name: "Tokyo, Japan", image: QIMG.tokyo }, { name: "Amsterdam", image: QIMG.amsterdam }], colors: ["#0F172A", "#334155"] },
  spontaneous: { title: "Free Spirit", iconName: "bolt.fill", description: "Rules are for other travelers. You live for the unplanned moments that become the best stories.", destinations: [{ name: "Bali, Indonesia", image: QIMG.bali }, { name: "Phuket, Thailand", image: QIMG.phuket }, { name: "Barcelona", image: QIMG.barcelona }], colors: ["#B45309", "#F59E0B"] },
  planned: { title: "Master Planner", iconName: "list.bullet.clipboard.fill", description: "You know the best table at the best restaurant 3 months before you land. Precision is your superpower.", destinations: [{ name: "Kyoto, Japan", image: QIMG.kyoto }, { name: "Paris, France", image: QIMG.paris }, { name: "Amsterdam", image: QIMG.amsterdam }], colors: ["#1E40AF", "#3B82F6"] },
  solo: { title: "Solo Adventurer", iconName: "figure.walk", description: "You travel on your own terms. Every decision is yours, every discovery is personal.", destinations: [{ name: "Japan", image: QIMG.kyoto }, { name: "Iceland", image: QIMG.iceland }, { name: "Patagonia", image: QIMG.patagonia }], colors: ["#6443F4", "#9077EF"] },
  default: { title: "Free Spirit Traveler", iconName: "globe", description: "You defy categories. Every trip is different, every destination a new chapter.", destinations: [{ name: "Bali, Indonesia", image: QIMG.bali }, { name: "Santorini", image: QIMG.santorini }, { name: "Tokyo", image: QIMG.tokyo }], colors: ["#6443F4", "#F94498"] },
};

function getDNAProfile(tagCounts: Record<string, number>) {
  const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  const top = sorted[0]?.[0] || "default";
  return DNA_PROFILES[top] || DNA_PROFILES.default;
}

// ── Quiz phases ───────────────────────────────────────────────────────────────

type Phase = "questions" | "result";

// ── Component ─────────────────────────────────────────────────────────────────

export default function QuizScreen() {
  const { dispatch } = useStore();

  // Phase state
  const [phase, setPhase] = useState<Phase>("questions");

  // Phase A
  const [selectedActivities, setSelectedActivities] = useState<ActivityCategory[]>([]);

  // Phase B
  const [selectedPace, setSelectedPace] = useState<TripPace | null>(null);

  // Phase C
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});

  // Phase D
  const [dnaProfile, setDnaProfile] = useState(DNA_PROFILES.default);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(1)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const phaseAnim = useRef(new Animated.Value(1)).current;

  const safeQ = Math.max(0, Math.min(Number.isFinite(currentQ) ? currentQ : 0, QUESTIONS.length - 1));
  const question = QUESTIONS[safeQ];

  // Progress: questions only
  const totalSteps = QUESTIONS.length;
  const currentStep = phase === "questions" ? currentQ : totalSteps;
  const progress = currentStep / totalSteps;

  useEffect(() => {
    Animated.timing(progressAnim, { toValue: progress, duration: 400, useNativeDriver: false }).start();
  }, [phase, currentQ]);

  const haptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    if (Platform.OS !== "web") Haptics.impactAsync(style);
  };

  const animatePhaseTransition = (cb: () => void) => {
    Animated.timing(phaseAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      cb();
      phaseAnim.setValue(0);
      Animated.timing(phaseAnim, { toValue: 1, duration: 280, useNativeDriver: true }).start();
    });
  };

  // ── Removed: Phase A & B handlers (moved to trip planning flow) ──────────

  // ── Phase C handlers ──────────────────────────────────────────────────────

  const handleSelect = (option: QuizOption) => {
    haptic(Haptics.ImpactFeedbackStyle.Medium);
    const newSelected = { ...selected, [currentQ]: option.id };
    const newTagCounts = { ...tagCounts };
    option.tags.forEach((tag) => { newTagCounts[tag] = (newTagCounts[tag] || 0) + 1; });
    setSelected(newSelected);
    setTagCounts(newTagCounts);

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        Animated.timing(cardAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
          setCurrentQ((q) => q + 1);
          cardAnim.setValue(0);
          Animated.timing(cardAnim, { toValue: 1, duration: 280, useNativeDriver: true }).start();
        });
      } else {
        const profile = getDNAProfile(newTagCounts);
        setDnaProfile(profile);
        setPhase("result");
        if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Animated.spring(resultAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }).start();
      }
    }, 250);
  };

  // ── Finish ────────────────────────────────────────────────────────────────

  const handleFinish = async () => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        travelerDNA: { type: dnaProfile.title, ...Object.fromEntries(Object.keys(tagCounts).map((t) => [t, "1"])) },
        activityCategories: selectedActivities,
        tripPace: selectedPace ?? "balanced",
        quizCompleted: true,
      },
    });
    dispatch({ type: "ADD_POINTS", payload: { amount: 250, description: "Completed Traveler DNA Quiz" } });
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });
    const TAG_TO_INTEREST: Record<string, string> = {
      culture: "art_culture", adventure: "adventure", food: "food",
      luxury: "landmarks", social: "nightlife", nature: "nature",
      urban: "landmarks", relax: "wellness", solo: "wellness",
      spontaneous: "adventure", planned: "landmarks",
    };
    const interests = [...new Set(
      Object.keys(tagCounts).map((t) => TAG_TO_INTEREST[t]).filter(Boolean)
    )] as import("@/lib/dna-store").InterestCategory[];
    if (interests.length > 0) await recordInterestSelections(interests);
    router.replace("/(tabs)/" as never);
  };

  const handleSkip = () => handleFinish();

  // ── Render ────────────────────────────────────────────────────────────────

  const renderBackground = () => (
    <>
      <LinearGradient colors={["#1A0B2E", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />
    </>
  );

  const renderHeader = (stepLabel: string) => (
    <View style={S.header}>
      <TouchableOpacity style={S.skipBtn} onPress={handleSkip} activeOpacity={0.7}>
        <Text style={S.skipText}>Skip</Text>
      </TouchableOpacity>
      <View style={S.progressTrack}>
        <Animated.View style={[S.progressFill, { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
        </Animated.View>
      </View>
      <Text style={S.progressText}>{stepLabel}</Text>
    </View>
  );

  // ── Phase D: Result ───────────────────────────────────────────────────────

  if (phase === "result") {
    return (
      <DNAResultScreen
        dnaProfile={dnaProfile}
        tagCounts={tagCounts}
        resultAnim={resultAnim}
        onFinish={handleFinish}
      />
    );
  }

  // ── Phase C: DNA Questions ────────────────────────────────────────────────

  if (!question) return null;

  return (
    <View style={S.container}>
      <LinearGradient colors={["#1A0B2E", "#1A0A3D", "#1A0B2E"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* ── Header: progress + skip ── */}
      <View style={S.header}>
        <View style={S.progressSection}>
          <View style={S.progressTrack}>
            <Animated.View style={[S.progressFill, {
              width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] })
            }]}>
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            </Animated.View>
          </View>
          <Text style={S.progressText}>{currentQ + 1} / {QUESTIONS.length}</Text>
        </View>
        <TouchableOpacity style={S.skipBtn} onPress={handleSkip} activeOpacity={0.7}>
          <Text style={S.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* ── Question zone ── */}
      <Animated.View style={[S.questionBlock, { opacity: cardAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={S.questionNumRow}>
          <View style={S.questionNumBadge}>
            <LinearGradient colors={["rgba(100,67,244,0.3)", "rgba(249,68,152,0.2)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.questionNumText}>Q{currentQ + 1}</Text>
          </View>
          <View style={S.questionNumLine} />
        </View>
        <Text style={S.questionText}>{question.question}</Text>
        <Text style={S.questionSubtitle}>{question.subtitle}</Text>
      </Animated.View>

      {/* ── Options ── */}
      <Animated.View style={[S.optionsGrid, { opacity: cardAnim }]}>
        {question.options.map((option) => {
          const isSelected = selected[currentQ] === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              style={[S.optionCard, isSelected && S.optionCardSelected]}
              onPress={() => handleSelect(option)}
              activeOpacity={0.88}
            >
              <LinearGradient
                colors={option.colors}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              {/* Ghost icon background */}
              <View style={S.ghostIconWrap} pointerEvents="none">
                <IconSymbol name={option.iconName as never} size={80} color="rgba(255,255,255,0.07)" />
              </View>
              {isSelected && <View style={S.selectedOverlay} />}
              {/* Icon circle */}
              <View style={S.optionIconWrap}>
                <IconSymbol name={option.iconName as never} size={26} color="rgba(255,255,255,0.95)" />
              </View>
              {/* Text */}
              <View style={S.optionTextBlock}>
                <Text style={S.optionLabel}>{option.label}</Text>
                <Text style={S.optionSublabel} numberOfLines={1}>{option.sublabel}</Text>
              </View>
              {/* Check */}
              {isSelected && (
                <View style={S.checkBadge}>
                  <IconSymbol name="checkmark" size={11} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* ── Bottom hint ── */}
      <Animated.View style={[S.bottomHint, { opacity: cardAnim }]}>
        <View style={S.hintDots}>
          {QUESTIONS.map((_, i) => (
            <View key={i} style={[S.hintDot, i === currentQ && S.hintDotActive, i < currentQ && S.hintDotDone]} />
          ))}
        </View>
        <Text style={S.hintText}>
          {QUESTIONS.length - currentQ - 1 > 0
            ? `${QUESTIONS.length - currentQ - 1} more to reveal your DNA`
            : "Last one — make it count"}
        </Text>
      </Animated.View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const CARD_W = (width - 44) / 2;
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A0B2E" },
  orb1: { position: "absolute", width: width * 1.4, height: width * 1.4, borderRadius: width * 0.7, top: -width * 0.5, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.1)" },
  orb2: { position: "absolute", width: width, height: width, borderRadius: width / 2, bottom: -width * 0.3, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 58, paddingBottom: 12, gap: 12 },
  progressSection: { flex: 1, gap: 6 },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4 },
  progressText: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "700", fontFamily: "Satoshi-Bold", letterSpacing: 0.5 },
  skipBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  skipText: { color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },

  // Phase header
  phaseHeader: { paddingHorizontal: 24, paddingBottom: 16, gap: 8 },
  phaseTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", lineHeight: 30, letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  phaseSubtitle: { color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 20, fontFamily: "Satoshi-Regular" },

  // Duck avatar
  duckRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  duckAvatar: { width: 36, height: 36, borderRadius: 18, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckImg: { width: 26, height: 26 },
  duckBubble: { borderRadius: 14, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckBubbleText: { color: "rgba(192,132,252,0.9)", fontSize: 12, fontWeight: "700" },

  // Activities
  activitiesGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 10, paddingBottom: 130 },
  activityChip: {
    width: (width - 52) / 3,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 6,
    overflow: "hidden",
  },
  activityChipGlow: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  activityEmoji: { fontSize: 26 },
  activityLabel: { color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: "700", textAlign: "center", lineHeight: 14 },
  activityCheck: { position: "absolute", top: 6, right: 6, width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center" },

  // Continue button
  continueWrap: { paddingHorizontal: 20, paddingBottom: 130, paddingTop: 8 },
  continueBtn: { borderRadius: 20, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", paddingVertical: 18, alignItems: "center", justifyContent: "center" },
  continueBtnDisabled: {},
  continueBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  continueBtnTextDisabled: { color: "rgba(255,255,255,0.55)" },

  // Pace
  paceCards: { flex: 1, paddingHorizontal: 20, gap: 12, justifyContent: "center" },
  paceCard: {
    borderRadius: 22,
    overflow: "hidden",
    padding: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  paceCardSelected: { borderColor: "rgba(255,255,255,0.5)" },
  paceCardGlow: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.06)" },
  paceCardLeft: { flex: 1, flexDirection: "row", alignItems: "flex-start", gap: 14 },
  paceEmoji: { fontSize: 32, lineHeight: 38 },
  paceLabel: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", lineHeight: 22, fontFamily: "Chillax-Bold" },
  paceSublabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "700", marginTop: 2 },
  paceDesc: { color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 17, marginTop: 4 },
  paceCheck: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.7)" },

  // DNA Questions
  questionBlock: { paddingHorizontal: 22, paddingBottom: 14, gap: 8 },
  questionNumRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 },
  questionNumBadge: {
    borderRadius: 10, overflow: "hidden",
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: "rgba(100,67,244,0.4)",
  },
  questionNumText: { color: "rgba(192,132,252,0.9)", fontSize: 12, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  questionNumLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  questionText: { color: "#FFFFFF", fontSize: 26, fontWeight: "900", lineHeight: 32, letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  questionSubtitle: { color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 20, fontFamily: "Satoshi-Regular" },
  optionsGrid: { flex: 1, flexDirection: "column", paddingHorizontal: 16, gap: 10, paddingBottom: 8 },
  optionCard: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    paddingHorizontal: 16,
    paddingVertical: 0,
    borderWidth: 2,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 68,
  },
  ghostIconWrap: { position: "absolute", right: 12, top: "50%", transform: [{ translateY: -40 }] },
  optionCardSelected: { borderColor: "rgba(255,255,255,0.75)" },
  selectedOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.07)" },
  optionIconWrap: { width: 46, height: 46, borderRadius: 14, backgroundColor: "rgba(0,0,0,0.22)", alignItems: "center", justifyContent: "center", marginRight: 14, flexShrink: 0 },
  optionTextBlock: { flex: 1 },
  optionLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", lineHeight: 21, fontFamily: "Chillax-Bold" },
  optionSublabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 16, fontFamily: "Satoshi-Regular" },
  checkBadge: { width: 24, height: 24, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.9)", marginLeft: 8, flexShrink: 0 },

  // Bottom hint
  bottomHint: { alignItems: "center", paddingHorizontal: 24, paddingBottom: 36, paddingTop: 10, gap: 8 },
  hintDots: { flexDirection: "row", gap: 5, alignItems: "center" },
  hintDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: "rgba(255,255,255,0.06)" },
  hintDotActive: { width: 18, height: 5, borderRadius: 2.5, backgroundColor: "#6443F4" },
  hintDotDone: { backgroundColor: "rgba(100,67,244,0.4)" },
  hintText: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: "500", textAlign: "center", letterSpacing: 0.2 },

  // unused but kept for linter
  resultScroll: { alignItems: "center", paddingTop: 80, paddingHorizontal: 24, paddingBottom: 130, gap: 20 },
});
