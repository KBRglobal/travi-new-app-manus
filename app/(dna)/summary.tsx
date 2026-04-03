/**
 * Quick DNA — Summary Screen — Neutral Wireframe
 * Spec: Step 4/4 (Complete). Shows top 3 DNA dimensions,
 *       "See My Recommendations" CTA → Home,
 *       "View Full DNA Profile" link → /profile/dna.
 */
import { useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const N = {
  bg:       "#111111",
  surface:  "#1A1A1A",
  white:    "#FFFFFF",
  textSec:  "#ABABAB",
  textTer:  "#777777",
  accent:   "#007AFF",
  border:   "#333333",
  success:  "#4ADE80",
};

type Dimension = {
  id: string;
  name: string;
  score: number;
  description: string;
  icon: "safari.fill" | "fork.knife" | "figure.climbing";
  color: string;
};

// Demo top 3 dimensions
const TOP_DIMENSIONS: Dimension[] = [
  {
    id: "explorer", name: "Explorer", score: 8,
    description: "You seek new experiences and uncharted paths",
    icon: "safari.fill", color: "#007AFF",
  },
  {
    id: "foodie", name: "Foodie", score: 7,
    description: "Local cuisine is a highlight of every trip",
    icon: "fork.knife", color: "#FF9500",
  },
  {
    id: "adventurer", name: "Adventurer", score: 9,
    description: "Thrill-seeking and outdoor activities drive your travels",
    icon: "figure.climbing", color: "#4ADE80",
  },
];

export default function SummaryScreen() {
  const { dispatch } = useStore();

  const mascotScale = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(TOP_DIMENSIONS.map(() => new Animated.Value(0))).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Save DNA scores
    dispatch({
      type: "SET_DNA_SCORES",
      payload: {
        explorer: 8, relaxer: 4, adventurer: 9, culturalist: 5,
        foodie: 7, photographer: 3, historian: 4, naturalist: 6,
      },
    });
    dispatch({ type: "UPDATE_PROFILE", payload: { quizCompleted: true } });
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });

    // Animations
    Animated.spring(mascotScale, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }).start(() => {
      Animated.stagger(200, cardAnims.map((anim) =>
        Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true })
      )).start(() => {
        Animated.timing(ctaOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    });
  }, []);

  const handleSeeRecommendations = () => {
    router.replace("/(tabs)" as never);
  };

  const handleViewDNA = () => {
    // Navigate to DNA profile (if screen exists)
    router.replace("/(tabs)/profile" as never);
  };

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top", "bottom"]} style={s.safe}>
        {/* Header */}
        <View style={s.header}>
          <View style={{ width: 40 }} />
          <Text style={s.headerTitle}>Step 4 of 4</Text>
          <TouchableOpacity onPress={handleSeeRecommendations} activeOpacity={0.7}>
            <IconSymbol name="xmark" size={22} color={N.textSec} />
          </TouchableOpacity>
        </View>

        {/* Progress bar — 100% */}
        <View style={s.progressBg}>
          <View style={[s.progressFill, { width: "100%", backgroundColor: N.success }]} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          {/* Mascot celebration */}
          <Animated.View style={[s.mascotWrap, { transform: [{ scale: mascotScale }] }]}>
            <View style={s.mascotCircle}>
              <Text style={s.mascotEmoji}>🏆</Text>
            </View>
          </Animated.View>

          <Text style={s.headline}>Your DNA is ready!</Text>
          <Text style={s.subtext}>Here's what makes you unique</Text>

          {/* Top 3 dimension cards */}
          <View style={s.dimensionsList}>
            {TOP_DIMENSIONS.map((dim, i) => (
              <Animated.View key={dim.id} style={[s.dimCard, { opacity: cardAnims[i] }]}>
                <View style={s.dimHeader}>
                  <View style={s.dimLeft}>
                    <View style={[s.dimIconWrap, { backgroundColor: dim.color + "20" }]}>
                      <IconSymbol name={dim.icon} size={24} color={dim.color} />
                    </View>
                    <Text style={s.dimName}>{dim.name}</Text>
                  </View>
                  <Text style={s.dimScore}>{dim.score}/10</Text>
                </View>
                {/* Progress bar */}
                <View style={s.dimProgressBg}>
                  <View style={[s.dimProgressFill, { width: `${dim.score * 10}%`, backgroundColor: dim.color }]} />
                </View>
                <Text style={s.dimDesc}>{dim.description}</Text>
              </Animated.View>
            ))}
          </View>

          {/* CTAs */}
          <Animated.View style={[s.ctaSection, { opacity: ctaOpacity }]}>
            <TouchableOpacity style={s.primaryBtn} onPress={handleSeeRecommendations} activeOpacity={0.8}>
              <Text style={s.primaryBtnText}>See My Recommendations</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleViewDNA} activeOpacity={0.6}>
              <Text style={s.linkText}>View Full DNA Profile</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },
  safe: { flex: 1 },

  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 12,
  },
  headerTitle: { fontSize: 15, fontWeight: "600", color: N.textSec },

  progressBg: { height: 4, backgroundColor: N.surface, marginHorizontal: 20 },
  progressFill: { height: 4, borderRadius: 2 },

  scroll: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 60, alignItems: "center" },

  mascotWrap: { marginBottom: 24 },
  mascotCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    alignItems: "center", justifyContent: "center",
  },
  mascotEmoji: { fontSize: 48 },

  headline: {
    fontSize: 30, fontWeight: "800", color: N.white,
    textAlign: "center", letterSpacing: -0.5, marginBottom: 8,
  },
  subtext: { fontSize: 16, color: N.textSec, textAlign: "center", marginBottom: 36 },

  dimensionsList: { width: "100%", gap: 14, marginBottom: 36 },
  dimCard: {
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    borderRadius: 18, padding: 18,
  },
  dimHeader: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    marginBottom: 12,
  },
  dimLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  dimIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  dimName: { fontSize: 18, fontWeight: "700", color: N.white },
  dimScore: { fontSize: 22, fontWeight: "800", color: N.white },
  dimProgressBg: { height: 6, backgroundColor: N.border, borderRadius: 3, marginBottom: 10 },
  dimProgressFill: { height: 6, borderRadius: 3 },
  dimDesc: { fontSize: 14, color: N.textSec, lineHeight: 20 },

  ctaSection: { width: "100%", alignItems: "center", gap: 16 },
  primaryBtn: {
    width: "100%", height: 56, borderRadius: 28,
    backgroundColor: N.accent,
    justifyContent: "center", alignItems: "center",
  },
  primaryBtnText: { fontSize: 16, fontWeight: "700", color: N.white },
  linkText: { fontSize: 14, color: N.textTer, fontWeight: "500" },
});
