/**
 * TRAVI — First Class DNA Assessment
 * 9-module deep personality analysis.
 * Unlocks 50% subscription discount on completion.
 * Output: 8-dimension DNA scores (0-100 each).
 */

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// ─── Module Definitions ──────────────────────────────────────────────────────

interface Question {
  id: string;
  text: string;
  options: { label: string; value: number; scores: Partial<DNAScores> }[];
}

interface Module {
  id: number;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  questions: Question[];
}

interface DNAScores {
  explorer: number;
  relaxer: number;
  adventurer: number;
  culturalist: number;
  foodie: number;
  photographer: number;
  historian: number;
  naturalist: number;
}

const MODULES: Module[] = [
  {
    id: 1,
    name: "Identity",
    subtitle: "Who you are as a traveler",
    icon: "🧭",
    color: "#6443F4",
    questions: [
      {
        id: "id1",
        text: "When you travel, what drives you most?",
        options: [
          { label: "Discovering new cultures", value: 0, scores: { culturalist: 10, historian: 5 } },
          { label: "Pure adventure and thrills", value: 1, scores: { adventurer: 10, explorer: 5 } },
          { label: "Relaxation and escape", value: 2, scores: { relaxer: 10 } },
          { label: "Capturing beautiful moments", value: 3, scores: { photographer: 10, explorer: 3 } },
        ],
      },
      {
        id: "id2",
        text: "How do you feel before a big trip?",
        options: [
          { label: "Excited — I've planned every detail", value: 0, scores: { explorer: 5, historian: 5 } },
          { label: "Thrilled — I barely planned anything", value: 1, scores: { adventurer: 8, explorer: 5 } },
          { label: "Calm — I know it'll be good", value: 2, scores: { relaxer: 8 } },
          { label: "Anxious — I hope everything works out", value: 3, scores: { relaxer: 3, culturalist: 3 } },
        ],
      },
      {
        id: "id3",
        text: "Your ideal travel companion is...",
        options: [
          { label: "No one — I prefer solo", value: 0, scores: { explorer: 8, adventurer: 5 } },
          { label: "My partner", value: 1, scores: { relaxer: 8, photographer: 5 } },
          { label: "A group of close friends", value: 2, scores: { adventurer: 5, foodie: 5 } },
          { label: "Anyone who shares my interests", value: 3, scores: { culturalist: 8, historian: 5 } },
        ],
      },
      {
        id: "id4",
        text: "What's your travel identity?",
        options: [
          { label: "The Explorer — always off the beaten path", value: 0, scores: { explorer: 12, adventurer: 5 } },
          { label: "The Connoisseur — quality over quantity", value: 1, scores: { relaxer: 8, foodie: 8 } },
          { label: "The Storyteller — collecting experiences", value: 2, scores: { photographer: 10, culturalist: 5 } },
          { label: "The Historian — every place has a story", value: 3, scores: { historian: 12, culturalist: 8 } },
        ],
      },
      {
        id: "id5",
        text: "After a trip, you feel most satisfied when...",
        options: [
          { label: "I saw things no tourist guide mentions", value: 0, scores: { explorer: 10, adventurer: 5 } },
          { label: "I truly rested and recharged", value: 1, scores: { relaxer: 12 } },
          { label: "I ate the most incredible food", value: 2, scores: { foodie: 12 } },
          { label: "I learned something profound about the culture", value: 3, scores: { culturalist: 10, historian: 8 } },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Crisis",
    subtitle: "How you handle travel problems",
    icon: "⚡",
    color: "#EF4444",
    questions: [
      {
        id: "cr1",
        text: "Your flight is cancelled. What's your first reaction?",
        options: [
          { label: "Immediately rebook and adapt the plan", value: 0, scores: { explorer: 8, adventurer: 5 } },
          { label: "Get upset, then figure it out", value: 1, scores: { relaxer: 5 } },
          { label: "See it as an unexpected adventure", value: 2, scores: { adventurer: 10, explorer: 5 } },
          { label: "Call for help and follow instructions", value: 3, scores: { relaxer: 8 } },
        ],
      },
      {
        id: "cr2",
        text: "You're lost in an unfamiliar city at night. You...",
        options: [
          { label: "Embrace it — best stories start this way", value: 0, scores: { adventurer: 12, explorer: 8 } },
          { label: "Use maps and find my way methodically", value: 1, scores: { explorer: 8, historian: 3 } },
          { label: "Find a local and ask for help", value: 2, scores: { culturalist: 8, foodie: 3 } },
          { label: "Get anxious and call someone", value: 3, scores: { relaxer: 5 } },
        ],
      },
      {
        id: "cr3",
        text: "Your hotel is nothing like the photos. You...",
        options: [
          { label: "Demand a refund and find something better", value: 0, scores: { relaxer: 5, explorer: 5 } },
          { label: "Make the best of it — it's just a bed", value: 1, scores: { adventurer: 8, explorer: 5 } },
          { label: "Negotiate an upgrade or compensation", value: 2, scores: { explorer: 8 } },
          { label: "Leave a bad review and move on", value: 3, scores: { relaxer: 3 } },
        ],
      },
      {
        id: "cr4",
        text: "You get sick mid-trip. Your approach is...",
        options: [
          { label: "Power through — I'm not wasting a day", value: 0, scores: { adventurer: 8 } },
          { label: "Rest completely and recover properly", value: 1, scores: { relaxer: 10 } },
          { label: "Modify the plan to lighter activities", value: 2, scores: { explorer: 5, culturalist: 5 } },
          { label: "Find the best local doctor immediately", value: 3, scores: { historian: 3, culturalist: 3 } },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Money",
    subtitle: "Budget attitudes & spending priorities",
    icon: "💰",
    color: "#F59E0B",
    questions: [
      {
        id: "mo1",
        text: "Your travel budget philosophy is...",
        options: [
          { label: "Spend freely — experiences are priceless", value: 0, scores: { relaxer: 8, foodie: 5 } },
          { label: "Balance — splurge on what matters", value: 1, scores: { explorer: 8, culturalist: 5 } },
          { label: "Stretch every dollar — budget travel is smart", value: 2, scores: { adventurer: 5, explorer: 5 } },
          { label: "Invest in quality — I travel less but better", value: 3, scores: { relaxer: 10, photographer: 5 } },
        ],
      },
      {
        id: "mo2",
        text: "Where do you splurge most when traveling?",
        options: [
          { label: "Accommodation — a great hotel changes everything", value: 0, scores: { relaxer: 10 } },
          { label: "Food — the best meals are worth any price", value: 1, scores: { foodie: 12 } },
          { label: "Experiences — activities and tours", value: 2, scores: { adventurer: 8, culturalist: 5 } },
          { label: "Photography gear and memories", value: 3, scores: { photographer: 10 } },
        ],
      },
      {
        id: "mo3",
        text: "Cashback and rewards programs...",
        options: [
          { label: "Are a major factor in my booking decisions", value: 0, scores: { explorer: 8 } },
          { label: "Nice to have but not a priority", value: 1, scores: { relaxer: 5, adventurer: 3 } },
          { label: "I maximize every point and mile", value: 2, scores: { explorer: 10, historian: 3 } },
          { label: "I don't think about them much", value: 3, scores: { adventurer: 5 } },
        ],
      },
      {
        id: "mo4",
        text: "How far in advance do you book trips?",
        options: [
          { label: "6+ months — I plan everything early", value: 0, scores: { historian: 8, relaxer: 5 } },
          { label: "1-3 months — enough time to plan well", value: 1, scores: { explorer: 8 } },
          { label: "Last minute — I love spontaneous deals", value: 2, scores: { adventurer: 10, explorer: 5 } },
          { label: "Whenever the mood strikes", value: 3, scores: { adventurer: 8 } },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Visual",
    subtitle: "Aesthetic preferences",
    icon: "🎨",
    color: "#EC4899",
    questions: [
      {
        id: "vi1",
        text: "Your ideal landscape is...",
        options: [
          { label: "Dramatic mountains and valleys", value: 0, scores: { naturalist: 10, adventurer: 8 } },
          { label: "Pristine beaches and turquoise water", value: 1, scores: { relaxer: 10, photographer: 5 } },
          { label: "Dense jungle and waterfalls", value: 2, scores: { naturalist: 12, adventurer: 5 } },
          { label: "Ancient ruins and historic streets", value: 3, scores: { historian: 12, culturalist: 8 } },
        ],
      },
      {
        id: "vi2",
        text: "The architecture that moves you most is...",
        options: [
          { label: "Futuristic and modern (Dubai, Singapore)", value: 0, scores: { photographer: 8, explorer: 5 } },
          { label: "Ancient and historical (Rome, Athens)", value: 1, scores: { historian: 12, culturalist: 8 } },
          { label: "Colorful and vibrant (Havana, Lisbon)", value: 2, scores: { photographer: 10, culturalist: 5 } },
          { label: "Minimalist and zen (Kyoto, Copenhagen)", value: 3, scores: { relaxer: 8, naturalist: 5 } },
        ],
      },
      {
        id: "vi3",
        text: "Your ideal photo from a trip would be...",
        options: [
          { label: "A stunning landscape at golden hour", value: 0, scores: { photographer: 12, naturalist: 8 } },
          { label: "A candid street scene with locals", value: 1, scores: { culturalist: 10, photographer: 5 } },
          { label: "An iconic landmark perfectly framed", value: 2, scores: { historian: 8, photographer: 8 } },
          { label: "A plate of extraordinary food", value: 3, scores: { foodie: 10, photographer: 5 } },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Brand",
    subtitle: "Brand loyalty & quality expectations",
    icon: "👑",
    color: "#D97706",
    questions: [
      {
        id: "br1",
        text: "When choosing a hotel, you prioritize...",
        options: [
          { label: "Brand reputation (Marriott, Hilton, Four Seasons)", value: 0, scores: { relaxer: 8 } },
          { label: "Unique boutique properties", value: 1, scores: { explorer: 10, photographer: 5 } },
          { label: "Best value for money", value: 2, scores: { adventurer: 5, explorer: 5 } },
          { label: "Location above all else", value: 3, scores: { culturalist: 8, historian: 5 } },
        ],
      },
      {
        id: "br2",
        text: "Your airline preference is...",
        options: [
          { label: "Always fly the best airline available", value: 0, scores: { relaxer: 10 } },
          { label: "Loyal to one airline for points", value: 1, scores: { explorer: 8 } },
          { label: "Cheapest option — it's just transport", value: 2, scores: { adventurer: 8 } },
          { label: "Best route/timing regardless of brand", value: 3, scores: { explorer: 5, adventurer: 5 } },
        ],
      },
      {
        id: "br3",
        text: "For activities, you prefer...",
        options: [
          { label: "Premium guided tours with expert guides", value: 0, scores: { historian: 10, culturalist: 8 } },
          { label: "Self-guided exploration with a good map", value: 1, scores: { explorer: 10, adventurer: 5 } },
          { label: "Local recommendations from residents", value: 2, scores: { culturalist: 10, foodie: 5 } },
          { label: "Whatever looks most adventurous", value: 3, scores: { adventurer: 12 } },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Social",
    subtitle: "Solo vs. group, introversion/extraversion",
    icon: "🌐",
    color: "#10B981",
    questions: [
      {
        id: "so1",
        text: "At a travel destination, you prefer to...",
        options: [
          { label: "Explore completely alone at my own pace", value: 0, scores: { explorer: 10, naturalist: 5 } },
          { label: "Have a companion but with alone time too", value: 1, scores: { relaxer: 8, photographer: 5 } },
          { label: "Travel with a group — more fun together", value: 2, scores: { adventurer: 5, foodie: 5 } },
          { label: "Meet locals and make new friends", value: 3, scores: { culturalist: 10, explorer: 5 } },
        ],
      },
      {
        id: "so2",
        text: "At a social dinner abroad, you...",
        options: [
          { label: "Lead the conversation and make everyone laugh", value: 0, scores: { adventurer: 5, foodie: 8 } },
          { label: "Listen and observe, speak when inspired", value: 1, scores: { historian: 8, culturalist: 5 } },
          { label: "Focus on the food and let others talk", value: 2, scores: { foodie: 12 } },
          { label: "Connect deeply with one or two people", value: 3, scores: { culturalist: 8, relaxer: 5 } },
        ],
      },
      {
        id: "so3",
        text: "Sharing your travel experiences means...",
        options: [
          { label: "Posting everything in real time on social media", value: 0, scores: { photographer: 10 } },
          { label: "Carefully curating a highlight reel later", value: 1, scores: { photographer: 8, relaxer: 3 } },
          { label: "Telling stories to close friends in person", value: 2, scores: { culturalist: 8 } },
          { label: "Keeping it private — travel is personal", value: 3, scores: { relaxer: 8, naturalist: 5 } },
        ],
      },
      {
        id: "so4",
        text: "Group travel dynamics for you are...",
        options: [
          { label: "I naturally become the trip organizer", value: 0, scores: { explorer: 8, historian: 5 } },
          { label: "I follow the group's lead happily", value: 1, scores: { relaxer: 8 } },
          { label: "I need my own agenda within the group", value: 2, scores: { explorer: 10, adventurer: 5 } },
          { label: "I prefer small groups of 2-3 people", value: 3, scores: { relaxer: 5, photographer: 5 } },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Sensory",
    subtitle: "Food, music & tactile preferences",
    icon: "🎵",
    color: "#8B5CF6",
    questions: [
      {
        id: "se1",
        text: "Your food adventure level is...",
        options: [
          { label: "I'll eat anything — the stranger the better", value: 0, scores: { foodie: 12, adventurer: 8 } },
          { label: "I try local food but stay in my comfort zone", value: 1, scores: { foodie: 8, culturalist: 5 } },
          { label: "I prefer familiar cuisines I know I'll enjoy", value: 2, scores: { relaxer: 8 } },
          { label: "Fine dining and Michelin stars are my thing", value: 3, scores: { foodie: 10, relaxer: 5 } },
        ],
      },
      {
        id: "se2",
        text: "The soundtrack of your ideal trip is...",
        options: [
          { label: "Local traditional music playing everywhere", value: 0, scores: { culturalist: 10, historian: 5 } },
          { label: "Complete silence — nature sounds only", value: 1, scores: { naturalist: 12, relaxer: 8 } },
          { label: "My own playlist — music sets the mood", value: 2, scores: { relaxer: 5, photographer: 5 } },
          { label: "Live street music and spontaneous performances", value: 3, scores: { explorer: 8, culturalist: 5 } },
        ],
      },
      {
        id: "se3",
        text: "The physical sensation you seek most while traveling is...",
        options: [
          { label: "Adrenaline — heart racing, body moving", value: 0, scores: { adventurer: 12 } },
          { label: "Complete relaxation — spa, massage, stillness", value: 1, scores: { relaxer: 12 } },
          { label: "The feeling of walking ancient ground", value: 2, scores: { historian: 10, culturalist: 5 } },
          { label: "Immersion in nature — wind, water, earth", value: 3, scores: { naturalist: 12, adventurer: 5 } },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Future",
    subtitle: "Bucket list & dream destinations",
    icon: "🌍",
    color: "#0EA5E9",
    questions: [
      {
        id: "fu1",
        text: "Your ultimate bucket list destination is...",
        options: [
          { label: "Antarctica or the Arctic", value: 0, scores: { naturalist: 12, adventurer: 10 } },
          { label: "Japan — culture, food, beauty", value: 1, scores: { culturalist: 10, foodie: 8, historian: 5 } },
          { label: "The Maldives — pure paradise", value: 2, scores: { relaxer: 12, photographer: 8 } },
          { label: "Egypt — ancient wonders", value: 3, scores: { historian: 12, explorer: 8 } },
        ],
      },
      {
        id: "fu2",
        text: "In 10 years, your travel legacy will be...",
        options: [
          { label: "Visited 50+ countries", value: 0, scores: { explorer: 12, adventurer: 8 } },
          { label: "Mastered 3-4 destinations deeply", value: 1, scores: { culturalist: 10, historian: 8 } },
          { label: "Created a stunning travel photography portfolio", value: 2, scores: { photographer: 12 } },
          { label: "Found my second home abroad", value: 3, scores: { relaxer: 10, naturalist: 5 } },
        ],
      },
      {
        id: "fu3",
        text: "Your dream travel experience is...",
        options: [
          { label: "A solo expedition through remote wilderness", value: 0, scores: { naturalist: 12, adventurer: 10 } },
          { label: "A private villa on a secluded island", value: 1, scores: { relaxer: 12, photographer: 5 } },
          { label: "Living as a local in a foreign city for a month", value: 2, scores: { culturalist: 12, foodie: 8 } },
          { label: "A grand tour of historical wonders", value: 3, scores: { historian: 12, culturalist: 8 } },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "AI Challenge",
    subtitle: "Scenario-based AI puzzles",
    icon: "🤖",
    color: "#F94498",
    questions: [
      {
        id: "ai1",
        text: "TRAVI gives you 3 days in an unknown city with no internet. You...",
        options: [
          { label: "Wander freely and discover organically", value: 0, scores: { adventurer: 12, explorer: 8 } },
          { label: "Find a local guide immediately", value: 1, scores: { culturalist: 10, historian: 5 } },
          { label: "Stick to the hotel and relax", value: 2, scores: { relaxer: 10 } },
          { label: "Sketch, photograph, and document everything", value: 3, scores: { photographer: 12, historian: 5 } },
        ],
      },
      {
        id: "ai2",
        text: "You have $500 left for your last day. You spend it on...",
        options: [
          { label: "The most expensive restaurant in the city", value: 0, scores: { foodie: 12 } },
          { label: "A helicopter tour for the ultimate view", value: 1, scores: { adventurer: 10, photographer: 8 } },
          { label: "A private museum tour with an expert", value: 2, scores: { historian: 12, culturalist: 8 } },
          { label: "A spa day and beautiful sunset dinner", value: 3, scores: { relaxer: 12 } },
        ],
      },
      {
        id: "ai3",
        text: "TRAVI's AI predicts you'll love a destination you've never considered. You...",
        options: [
          { label: "Book it immediately — I trust the AI", value: 0, scores: { adventurer: 10, explorer: 8 } },
          { label: "Research it thoroughly first", value: 1, scores: { historian: 8, explorer: 5 } },
          { label: "Ask friends who've been there", value: 2, scores: { culturalist: 5, foodie: 3 } },
          { label: "Stick to my original plan", value: 3, scores: { relaxer: 5 } },
        ],
      },
      {
        id: "ai4",
        text: "The most important thing travel has taught you is...",
        options: [
          { label: "The world is bigger and more beautiful than I imagined", value: 0, scores: { naturalist: 10, explorer: 8 } },
          { label: "People everywhere share the same core humanity", value: 1, scores: { culturalist: 12, historian: 5 } },
          { label: "I am capable of more than I thought", value: 2, scores: { adventurer: 12 } },
          { label: "Slowing down is the greatest luxury", value: 3, scores: { relaxer: 12 } },
        ],
      },
    ],
  },
];

// ─── Score Calculation ────────────────────────────────────────────────────────

function calculateDNAScores(answers: Record<string, number>): DNAScores {
  const raw: DNAScores = {
    explorer: 0, relaxer: 0, adventurer: 0, culturalist: 0,
    foodie: 0, photographer: 0, historian: 0, naturalist: 0,
  };

  for (const module of MODULES) {
    for (const q of module.questions) {
      const selectedValue = answers[q.id];
      if (selectedValue !== undefined) {
        const option = q.options.find((o) => o.value === selectedValue);
        if (option?.scores) {
          for (const [key, val] of Object.entries(option.scores)) {
            raw[key as keyof DNAScores] += val as number;
          }
        }
      }
    }
  }

  // Normalize to 0-100
  const maxPossible = 120;
  const normalized: DNAScores = {} as DNAScores;
  for (const key of Object.keys(raw) as (keyof DNAScores)[]) {
    normalized[key] = Math.min(100, Math.round((raw[key] / maxPossible) * 100));
  }
  return normalized;
}

// ─── Components ──────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
    </View>
  );
}

function ModuleCard({
  module,
  isActive,
  isCompleted,
  onPress,
}: {
  module: Module;
  isActive: boolean;
  isCompleted: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.moduleCard,
        isActive && styles.moduleCardActive,
        isCompleted && styles.moduleCardDone,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.moduleIcon}>{module.icon}</Text>
      <View style={styles.moduleCardText}>
        <Text style={[styles.moduleCardName, isActive && { color: module.color }]}>
          {module.name}
        </Text>
        <Text style={styles.moduleCardSub}>{module.subtitle}</Text>
      </View>
      <View style={[styles.moduleStatus, isCompleted && { backgroundColor: module.color + "33" }]}>
        <Text style={[styles.moduleStatusText, isCompleted && { color: module.color }]}>
          {isCompleted ? "✓" : isActive ? "→" : `${module.questions.length}Q`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function QuestionScreen({
  question,
  moduleColor,
  selectedValue,
  onSelect,
}: {
  question: Question;
  moduleColor: string;
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
}) {
  return (
    <View style={styles.questionWrap}>
      <Text style={styles.questionText}>{question.text}</Text>
      <View style={styles.optionsWrap}>
        {question.options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.optionCard,
                isSelected && { borderColor: moduleColor, backgroundColor: moduleColor + "22" },
              ]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onSelect(opt.value);
              }}
              activeOpacity={0.8}
            >
              {isSelected && (
                <View style={[styles.optionCheck, { backgroundColor: moduleColor }]}>
                  <Text style={styles.optionCheckText}>✓</Text>
                </View>
              )}
              <Text style={[styles.optionLabel, isSelected && { color: "#FFFFFF" }]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function ResultScreen({ scores }: { scores: DNAScores }) {
  const insets = useSafeAreaInsets();
  const barAnims = useRef(
    Object.keys(scores).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = Object.values(scores).map((val, i) =>
      Animated.timing(barAnims[i], {
        toValue: val / 100,
        duration: 800 + i * 100,
        useNativeDriver: false,
        delay: i * 80,
      })
    );
    Animated.parallel(animations).start();
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  const DIMENSION_META: Record<keyof DNAScores, { label: string; icon: string; color: string }> = {
    explorer:     { label: "Explorer",     icon: "🧭", color: "#6443F4" },
    relaxer:      { label: "Relaxer",      icon: "🌊", color: "#0EA5E9" },
    adventurer:   { label: "Adventurer",   icon: "⚡", color: "#EF4444" },
    culturalist:  { label: "Culturalist",  icon: "🏛️", color: "#A855F7" },
    foodie:       { label: "Foodie",       icon: "🍜", color: "#F59E0B" },
    photographer: { label: "Photographer", icon: "📸", color: "#EC4899" },
    historian:    { label: "Historian",    icon: "📜", color: "#D97706" },
    naturalist:   { label: "Naturalist",   icon: "🌿", color: "#10B981" },
  };

  const sortedDimensions = (Object.entries(scores) as [keyof DNAScores, number][])
    .sort(([, a], [, b]) => b - a);

  const topDimension = sortedDimensions[0];
  const topMeta = DIMENSION_META[topDimension[0]];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.resultHero}>
        <LinearGradient
          colors={[topMeta.color + "33", "transparent"]}
          style={StyleSheet.absoluteFillObject}
        />
        <Text style={styles.resultEmoji}>{topMeta.icon}</Text>
        <Text style={styles.resultTitle}>First Class DNA Complete</Text>
        <Text style={styles.resultSub}>
          You are primarily a{" "}
          <Text style={{ color: topMeta.color, fontWeight: "900",
      fontFamily: "Chillax-Bold" }}>
            {topMeta.label}
          </Text>
        </Text>
        <View style={styles.discountBadge}>
          <LinearGradient
            colors={["#F94498", "#6443F4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.discountGrad}
          >
            <Text style={styles.discountText}>🎁 50% OFF First Month — Unlocked!</Text>
          </LinearGradient>
        </View>
      </View>

      {/* 8 Dimensions */}
      <View style={styles.resultSection}>
        <Text style={styles.resultSectionTitle}>Your 8-Dimension DNA Profile</Text>
        <Text style={styles.resultSectionSub}>580 behavioral signals analyzed</Text>
        <View style={styles.dimensionsCard}>
          {sortedDimensions.map(([key, val], i) => {
            const meta = DIMENSION_META[key];
            const barWidth = barAnims[Object.keys(scores).indexOf(key)].interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            });
            return (
              <View key={key} style={styles.dimensionRow}>
                <View style={styles.dimensionLeft}>
                  <Text style={styles.dimensionIcon}>{meta.icon}</Text>
                  <Text style={styles.dimensionLabel}>{meta.label}</Text>
                </View>
                <View style={styles.dimensionRight}>
                  <View style={styles.dimensionTrack}>
                    <Animated.View style={[styles.dimensionFill, { width: barWidth, backgroundColor: meta.color }]} />
                  </View>
                  <Text style={[styles.dimensionScore, { color: meta.color }]}>{val}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* What This Means */}
      <View style={styles.resultSection}>
        <Text style={styles.resultSectionTitle}>What This Means For Your Trips</Text>
        <View style={styles.insightCards}>
          {sortedDimensions.slice(0, 3).map(([key]) => {
            const meta = DIMENSION_META[key];
            const insights: Record<string, string> = {
              explorer:     "TRAVI will prioritize off-the-beaten-path experiences and hidden gems over tourist traps.",
              relaxer:      "Your itineraries will have breathing room — no rushed schedules, quality over quantity.",
              adventurer:   "Expect adrenaline-fueled activities and spontaneous detours in every recommendation.",
              culturalist:  "Local immersion, authentic experiences, and cultural depth will define your trips.",
              foodie:       "Every destination recommendation will lead with the best food experiences available.",
              photographer: "Scenic timing, golden hour spots, and photogenic locations will be built into your plans.",
              historian:    "Historical context, guided tours, and deep-dive museum experiences will be prioritized.",
              naturalist:   "National parks, wildlife, and natural wonders will dominate your travel suggestions.",
            };
            return (
              <View key={key} style={[styles.insightCard, { borderLeftColor: meta.color }]}>
                <Text style={styles.insightIcon}>{meta.icon}</Text>
                <Text style={styles.insightText}>{insights[key]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function FirstClassDNAScreen() {
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<"intro" | "modules" | "question" | "result">("intro");
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [dnaScores, setDnaScores] = useState<DNAScores | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const totalQuestions = MODULES.reduce((sum, m) => sum + m.questions.length, 0);
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const animateTransition = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 10, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      callback();
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    });
  };

  const currentModule = MODULES[activeModuleIdx];
  const currentQuestion = currentModule?.questions[activeQuestionIdx];

  const handleSelectAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    const isLastQuestion = activeQuestionIdx === currentModule.questions.length - 1;
    const isLastModule = activeModuleIdx === MODULES.length - 1;

    if (isLastQuestion) {
      const newCompleted = new Set(completedModules);
      newCompleted.add(activeModuleIdx);
      setCompletedModules(newCompleted);

      if (isLastModule) {
        // Calculate final scores
        const scores = calculateDNAScores(newAnswers);
        setDnaScores(scores);
        animateTransition(() => setPhase("result"));
      } else {
        animateTransition(() => {
          setActiveModuleIdx((prev) => prev + 1);
          setActiveQuestionIdx(0);
          setPhase("modules");
        });
      }
    } else {
      animateTransition(() => setActiveQuestionIdx((prev) => prev + 1));
    }
  };

  const handleStartModule = (idx: number) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    animateTransition(() => {
      setActiveModuleIdx(idx);
      setActiveQuestionIdx(0);
      setPhase("question");
    });
  };

  const handleFinish = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          if (phase === "question") {
            animateTransition(() => setPhase("modules"));
          } else {
            router.back();
          }
        }} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>First Class DNA</Text>
          {phase === "question" && (
            <Text style={styles.headerSub}>
              Module {activeModuleIdx + 1}/{MODULES.length} · Q{activeQuestionIdx + 1}/{currentModule.questions.length}
            </Text>
          )}
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerProgress}>{answeredCount}/{totalQuestions}</Text>
        </View>
      </View>

      {/* Progress */}
      <ProgressBar current={answeredCount} total={totalQuestions} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Intro Phase */}
        {phase === "intro" && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
            <View style={styles.introHero}>
              <LinearGradient
                colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={styles.introEmoji}>🧬</Text>
              <Text style={styles.introTitle}>First Class DNA</Text>
              <Text style={styles.introSub}>
                The deepest travel personality analysis ever built. 9 modules, 60+ questions, 580 behavioral signals.
              </Text>
            </View>

            <View style={styles.introStats}>
              {[
                { icon: "🧩", label: "9 Modules", sub: "Identity to AI Challenge" },
                { icon: "⏱️", label: "15-20 min", sub: "Average completion time" },
                { icon: "🎁", label: "50% OFF", sub: "First month subscription" },
                { icon: "🎯", label: "580 Signals", sub: "Behavioral data points" },
              ].map((stat) => (
                <View key={stat.label} style={styles.introStat}>
                  <Text style={styles.introStatIcon}>{stat.icon}</Text>
                  <Text style={styles.introStatLabel}>{stat.label}</Text>
                  <Text style={styles.introStatSub}>{stat.sub}</Text>
                </View>
              ))}
            </View>

            <View style={styles.introModules}>
              <Text style={styles.introModulesTitle}>What We'll Explore</Text>
              {MODULES.map((m) => (
                <View key={m.id} style={styles.introModuleRow}>
                  <View style={[styles.introModuleDot, { backgroundColor: m.color }]} />
                  <Text style={styles.introModuleName}>{m.name}</Text>
                  <Text style={styles.introModuleDesc}>{m.subtitle}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Modules Overview Phase */}
        {phase === "modules" && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
            <View style={styles.modulesHeader}>
              <Text style={styles.modulesTitle}>
                {completedModules.size === 0
                  ? "Choose Your First Module"
                  : `${completedModules.size}/${MODULES.length} Modules Complete`}
              </Text>
              <Text style={styles.modulesSub}>
                Complete all 9 modules to unlock your full DNA profile
              </Text>
            </View>
            <View style={styles.modulesList}>
              {MODULES.map((m, idx) => (
                <ModuleCard
                  key={m.id}
                  module={m}
                  isActive={idx === activeModuleIdx}
                  isCompleted={completedModules.has(idx)}
                  onPress={() => handleStartModule(idx)}
                />
              ))}
            </View>
          </ScrollView>
        )}

        {/* Question Phase */}
        {phase === "question" && currentQuestion && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
            {/* Module header */}
            <View style={[styles.moduleHeader, { borderColor: currentModule.color + "44" }]}>
              <Text style={styles.moduleHeaderIcon}>{currentModule.icon}</Text>
              <View>
                <Text style={[styles.moduleHeaderName, { color: currentModule.color }]}>
                  {currentModule.name}
                </Text>
                <Text style={styles.moduleHeaderSub}>{currentModule.subtitle}</Text>
              </View>
            </View>

            <QuestionScreen
              question={currentQuestion}
              moduleColor={currentModule.color}
              selectedValue={answers[currentQuestion.id]}
              onSelect={handleSelectAnswer}
            />
          </ScrollView>
        )}

        {/* Result Phase */}
        {phase === "result" && dnaScores && (
          <ResultScreen scores={dnaScores} />
        )}
      </Animated.View>

      {/* Bottom CTA */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + 16 }]}>
        {phase === "intro" && (
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              animateTransition(() => setPhase("modules"));
            }}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGrad}
            >
              <Text style={styles.ctaText}>Begin First Class DNA →</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {phase === "result" && (
          <TouchableOpacity style={styles.ctaBtn} onPress={handleFinish} activeOpacity={0.85}>
            <LinearGradient
              colors={["#F94498", "#6443F4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGrad}
            >
              <Text style={styles.ctaText}>🎉 Claim 50% Discount →</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width * 0.8, height: width * 0.8, borderRadius: width * 0.4, top: -width * 0.2, left: -width * 0.3, backgroundColor: "rgba(100,67,244,0.07)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(249,68,152,0.05)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  headerRight: { width: 36, alignItems: "flex-end" },
  headerProgress: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  progressTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.06)", marginHorizontal: 20, borderRadius: 2 },
  progressFill: { height: "100%", backgroundColor: "#F94498", borderRadius: 2 },
  content: { flex: 1 },

  // Intro
  introHero: { margin: 20, borderRadius: 24, overflow: "hidden", padding: 28, alignItems: "center" },
  introEmoji: { fontSize: 56, marginBottom: 12 },
  introTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold", textAlign: "center", marginBottom: 8 },
  introSub: { color: "rgba(255,255,255,0.6)", fontSize: 15, fontFamily: "Satoshi-Regular", textAlign: "center", lineHeight: 22 },
  introStats: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  introStat: { width: (width - 52) / 2, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  introStatIcon: { fontSize: 24, marginBottom: 6 },
  introStatLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold", marginBottom: 2 },
  introStatSub: { color: "rgba(255,255,255,0.5)", fontSize: 11, textAlign: "center" },
  introModules: { marginHorizontal: 20, marginBottom: 24 },
  introModulesTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold", marginBottom: 14 },
  introModuleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  introModuleDot: { width: 8, height: 8, borderRadius: 4 },
  introModuleName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Medium", width: 80 },
  introModuleDesc: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular", flex: 1 },

  // Modules list
  modulesHeader: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  modulesTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  modulesSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular", marginTop: 4 },
  modulesList: { paddingHorizontal: 20, gap: 10, paddingBottom: 130 },
  moduleCard: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  moduleCardActive: { borderColor: "#6443F4", backgroundColor: "rgba(100,67,244,0.1)" },
  moduleCardDone: { borderColor: "rgba(255,255,255,0.12)", opacity: 0.85 },
  moduleIcon: { fontSize: 28 },
  moduleCardText: { flex: 1 },
  moduleCardName: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  moduleCardSub: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular", marginTop: 2 },
  moduleStatus: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  moduleStatusText: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },

  // Module header in question phase
  moduleHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginHorizontal: 20, marginTop: 16, marginBottom: 8, padding: 14, borderRadius: 14, borderWidth: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  moduleHeaderIcon: { fontSize: 24 },
  moduleHeaderName: { fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  moduleHeaderSub: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular" },

  // Question
  questionWrap: { paddingHorizontal: 20, paddingTop: 8 },
  questionText: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", fontFamily: "Chillax-Bold", lineHeight: 28, marginBottom: 20 },
  optionsWrap: { gap: 12 },
  optionCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", flexDirection: "row", alignItems: "center", gap: 12 },
  optionCheck: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  optionCheckText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900", fontFamily: "Satoshi-Bold" },
  optionLabel: { color: "rgba(255,255,255,0.85)", fontSize: 15, fontFamily: "Satoshi-Regular", lineHeight: 21, flex: 1 },

  // Result
  resultHero: { margin: 20, borderRadius: 24, overflow: "hidden", padding: 28, alignItems: "center" },
  resultEmoji: { fontSize: 56, marginBottom: 12 },
  resultTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "900", fontFamily: "Chillax-Bold", textAlign: "center", marginBottom: 6 },
  resultSub: { color: "rgba(255,255,255,0.7)", fontSize: 16, fontFamily: "Satoshi-Regular", textAlign: "center", lineHeight: 22, marginBottom: 16 },
  discountBadge: { borderRadius: 14, overflow: "hidden" },
  discountGrad: { paddingHorizontal: 20, paddingVertical: 10 },
  discountText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  resultSection: { marginHorizontal: 20, marginBottom: 24 },
  resultSectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold", marginBottom: 4 },
  resultSectionSub: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular", marginBottom: 14 },
  dimensionsCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, padding: 16, gap: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  dimensionRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dimensionLeft: { flexDirection: "row", alignItems: "center", gap: 8, width: 145 },
  dimensionIcon: { fontSize: 18 },
  dimensionLabel: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Medium" },
  dimensionRight: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  dimensionTrack: { flex: 1, height: 7, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" },
  dimensionFill: { height: "100%", borderRadius: 4 },
  dimensionScore: { fontSize: 14, fontWeight: "900", fontFamily: "Satoshi-Bold", width: 32, textAlign: "right" },
  insightCards: { gap: 10 },
  insightCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, flexDirection: "row", alignItems: "flex-start", gap: 10, borderLeftWidth: 3 },
  insightIcon: { fontSize: 20, marginTop: 1 },
  insightText: { flex: 1, color: "rgba(255,255,255,0.7)", fontSize: 14, fontFamily: "Satoshi-Regular", lineHeight: 20 },

  // CTA
  cta: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 12, backgroundColor: "#0D0628" },
  ctaBtn: { borderRadius: 18, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  ctaGrad: { paddingVertical: 18, alignItems: "center" },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
