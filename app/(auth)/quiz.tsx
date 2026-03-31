import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, ScrollView
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const QUESTIONS = [
  {
    id: "morning",
    question: "First morning in Bangkok — what do you do?",
    emoji: "🌅",
    options: [
      { id: "a", text: "Head straight to the street market at 6am", tag: "explorer" },
      { id: "b", text: "Sleep until noon, then explore at your own pace", tag: "relaxer" },
    ],
  },
  {
    id: "accommodation",
    question: "Your ideal place to stay is...",
    emoji: "🏨",
    options: [
      { id: "a", text: "A boutique hotel with local character", tag: "boutique" },
      { id: "b", text: "A luxury 5-star with all amenities", tag: "luxury" },
      { id: "c", text: "A cozy hostel to meet fellow travelers", tag: "social" },
    ],
  },
  {
    id: "food",
    question: "You're in Tokyo. Where do you eat?",
    emoji: "🍜",
    options: [
      { id: "a", text: "A tiny ramen stall with a line around the block", tag: "adventurous_food" },
      { id: "b", text: "A Michelin-starred restaurant", tag: "fine_dining" },
      { id: "c", text: "Whatever the hotel recommends", tag: "safe_food" },
    ],
  },
  {
    id: "pace",
    question: "How do you like to explore a new city?",
    emoji: "🗺️",
    options: [
      { id: "a", text: "Pack the itinerary — I want to see everything", tag: "packed" },
      { id: "b", text: "A few key spots and lots of wandering", tag: "balanced" },
      { id: "c", text: "One or two things, then just soak it in", tag: "slow" },
    ],
  },
  {
    id: "social",
    question: "You're at a rooftop bar. You...",
    emoji: "🍹",
    options: [
      { id: "a", text: "Strike up a conversation with strangers", tag: "extrovert" },
      { id: "b", text: "Enjoy the view with your travel partner", tag: "introvert" },
    ],
  },
  {
    id: "budget",
    question: "You see an amazing experience that's over budget. You...",
    emoji: "💳",
    options: [
      { id: "a", text: "Book it immediately — you only live once", tag: "splurger" },
      { id: "b", text: "Skip it and stick to the plan", tag: "budget_strict" },
      { id: "c", text: "Find a similar but cheaper alternative", tag: "budget_smart" },
    ],
  },
  {
    id: "transport",
    question: "Getting around a new city, you prefer...",
    emoji: "🚇",
    options: [
      { id: "a", text: "Walking everywhere — I love getting lost", tag: "walker" },
      { id: "b", text: "Metro and public transport", tag: "public_transport" },
      { id: "c", text: "Taxis and ride-sharing — convenience first", tag: "taxi" },
    ],
  },
  {
    id: "activity",
    question: "Your dream afternoon activity is...",
    emoji: "🎭",
    options: [
      { id: "a", text: "Hiking to a hidden viewpoint", tag: "adventure" },
      { id: "b", text: "Visiting a world-class museum", tag: "culture" },
      { id: "c", text: "Lounging by the pool with a book", tag: "relaxation" },
      { id: "d", text: "Exploring local markets and shops", tag: "shopping" },
    ],
  },
  {
    id: "planning",
    question: "How much do you plan before a trip?",
    emoji: "📋",
    options: [
      { id: "a", text: "Every hour is planned — I hate uncertainty", tag: "planner" },
      { id: "b", text: "Key things booked, rest is spontaneous", tag: "semi_planned" },
      { id: "c", text: "Just a flight and hotel — figure it out there", tag: "spontaneous" },
    ],
  },
  {
    id: "memory",
    question: "How do you remember your travels?",
    emoji: "📸",
    options: [
      { id: "a", text: "Hundreds of photos — I document everything", tag: "photographer" },
      { id: "b", text: "A travel journal with stories", tag: "writer" },
      { id: "c", text: "Just in my head — I live in the moment", tag: "present" },
    ],
  },
];

export default function QuizScreen() {
  const { dispatch } = useStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const question = QUESTIONS[currentQ];
  const progress = (currentQ + 1) / QUESTIONS.length;

  const handleAnswer = (optionId: string, tag: string) => {
    const newAnswers = { ...answers, [question.id]: tag };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      // Animate transition
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -30, duration: 150, useNativeDriver: true }),
      ]).start(() => {
        setCurrentQ((q) => q + 1);
        slideAnim.setValue(30);
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
      });
    } else {
      // Quiz complete
      dispatch({ type: "UPDATE_PROFILE", payload: { travelerDNA: newAnswers, quizCompleted: true } });
      dispatch({ type: "SET_ONBOARDING_COMPLETED" });
      router.replace("/(tabs)" as never);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1A0533", "#2D1B69", "#1A0533"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{currentQ + 1} / {QUESTIONS.length}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Question */}
      <Animated.View
        style={[styles.questionContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <Text style={styles.questionEmoji}>{question.emoji}</Text>
        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.optionCard}
              onPress={() => handleAnswer(opt.id, opt.tag)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>{opt.text}</Text>
              <IconSymbol name="chevron.right" size={18} color="#7B2FBE" />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* DNA Preview */}
      <View style={styles.dnaPreview}>
        <Text style={styles.dnaLabel}>🧬 Building your Traveler DNA...</Text>
        <View style={styles.dnaDots}>
          {QUESTIONS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dnaDot,
                i < currentQ && styles.dnaDotDone,
                i === currentQ && styles.dnaDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A0533" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  progressContainer: { flex: 1, gap: 6 },
  progressTrack: {
    height: 4,
    backgroundColor: "#2D1B69",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#E91E8C",
    borderRadius: 2,
  },
  progressText: { color: "#A78BCA", fontSize: 12, textAlign: "right" },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  questionEmoji: { fontSize: 52, textAlign: "center", marginBottom: 16 },
  questionText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 32,
  },
  optionsContainer: { gap: 12 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 12,
  },
  optionText: { flex: 1, color: "#FFFFFF", fontSize: 16, lineHeight: 22 },
  dnaPreview: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
    gap: 12,
  },
  dnaLabel: { color: "#A78BCA", fontSize: 13 },
  dnaDots: { flexDirection: "row", gap: 6 },
  dnaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2D1B69",
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  dnaDotDone: { backgroundColor: "#7B2FBE", borderColor: "#7B2FBE" },
  dnaDotActive: { backgroundColor: "#E91E8C", borderColor: "#E91E8C", transform: [{ scale: 1.3 }] },
});
