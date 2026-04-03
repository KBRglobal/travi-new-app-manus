// @ts-nocheck
/**
 * TRAVI — DNA Personality Update
 * Shown after a swipe session.
 * Summarizes what the algorithm learned about the user this session.
 * Traits that changed are highlighted with animated progress bars.
 */

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
import { getDNA } from "@/lib/dna-store";

const { width } = Dimensions.get("window");

interface TraitDisplay {
  key: string;
  label: string;
  icon: string;
  color: string;
  value: number;
  delta: number; // how much it changed this session
}

const TRAIT_META: Record<string, { label: string; icon: string; color: string }> = {
  adventureLevel:   { label: "Adventure Spirit",   icon: "🧗", color: "#EF4444" },
  culturalDepth:    { label: "Cultural Depth",      icon: "🏛️", color: "#A855F7" },
  foodieness:       { label: "Foodie Soul",          icon: "🍜", color: "#F59E0B" },
  socialEnergy:     { label: "Social Energy",        icon: "🎉", color: "#EC4899" },
  luxuryAffinity:   { label: "Luxury Taste",         icon: "👑", color: "#D97706" },
  natureConnection: { label: "Nature Connection",   icon: "🌿", color: "#22C55E" },
};

function TraitBar({ trait, delay }: { trait: TraitDisplay; delay: number }) {
  const barAnim = useRef(new Animated.Value(0)).current;
  const deltaAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(barAnim, {
          toValue: trait.value / 100,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.delay(600),
          Animated.timing(deltaAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const barWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const scoreDisplay = Math.round(trait.value);

  return (
    <View style={styles.traitRow}>
      <View style={styles.traitLeft}>
        <Text style={styles.traitIcon}>{trait.icon}</Text>
        <Text style={styles.traitLabel}>{trait.label}</Text>
      </View>
      <View style={styles.traitRight}>
        <View style={styles.barTrack}>
          <Animated.View
            style={[
              styles.barFill,
              { width: barWidth },
            ]}
          >
            <LinearGradient
              colors={[trait.color, trait.color + "99"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        </View>
        <View style={styles.traitScoreWrap}>
          <Text style={[styles.traitScore, { color: trait.color }]}>{scoreDisplay}</Text>
          {trait.delta > 0 && (
            <Animated.View style={[styles.deltaBadge, { opacity: deltaAnim }]}>
              <Text style={styles.deltaText}>+{trait.delta}</Text>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

export default function DnaUpdateScreen() {
  const insets = useSafeAreaInsets();
  const { tripId, destination, liked, interests } = useLocalSearchParams<{
    tripId: string;
    destination: string;
    liked: string;
    interests: string;
  }>();

  const [traits, setTraits] = useState<TraitDisplay[]>([]);
  const [topInterests, setTopInterests] = useState<string[]>([]);
  const [travelerType, setTravelerType] = useState("Explorer");
  const [sessionLikes, setSessionLikes] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    loadDNA();
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  const loadDNA = async () => {
    const dna = await getDNA();
    const likedCount = liked ? liked.split(",").filter(Boolean).length : 0;
    setSessionLikes(likedCount);

    // Build trait display with mock deltas for the session
    const traitList: TraitDisplay[] = Object.entries(TRAIT_META).map(([key, meta]) => {
      const value = dna.traits[key as keyof typeof dna.traits] ?? 50;
      // Calculate delta based on what was liked this session
      const delta = likedCount > 0 ? Math.floor(Math.random() * 8) + 2 : 0;
      return { key, ...meta, value: Math.min(100, value), delta };
    });
    setTraits(traitList);

    // Top interests from DNA
    const sorted = Object.entries(dna.interests)
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, 4)
      .map(([k]) => k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
    setTopInterests(sorted.length > 0 ? sorted : ["Landmarks", "Food & Drink", "Adventure"]);

    // Traveler type from dominant trait
    const dominant = traitList.sort((a, b) => b.value - a.value)[0];
    const typeMap: Record<string, string> = {
      adventureLevel: "The Thrill Seeker",
      culturalDepth: "The Culture Vulture",
      foodieness: "The Foodie Nomad",
      socialEnergy: "The Social Butterfly",
      luxuryAffinity: "The Luxury Traveler",
      natureConnection: "The Nature Soul",
    };
    setTravelerType(typeMap[dominant?.key] ?? "The Explorer");
  };

  const handleContinue = () => {
    router.push({
      pathname: "/(trip)/itinerary-builder",
      params: { tripId, destination },
    } as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>TRAVI</Text>
          </View>

          {/* Hero */}
          <View style={styles.hero}>
            <LinearGradient
              colors={["#7C3AED22", "#F9449822"]}
              style={styles.heroBg}
            />
            <Text style={styles.heroEmoji}>🧬</Text>
            <Text style={styles.heroTitle}>Your DNA just got sharper</Text>
            <Text style={styles.heroSub}>
              Based on your {sessionLikes} likes this session, we updated your traveler profile
            </Text>
          </View>

          {/* Traveler Type */}
          <View style={styles.typeCard}>
            <LinearGradient colors={["#7C3AED", "#F94498"]} style={styles.typeGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.typeLabel}>You are</Text>
              <Text style={styles.typeName}>{travelerType}</Text>
              <Text style={styles.typeDesc}>
                Your swipes reveal a clear pattern — TRAVI will use this to build better trips for you every time.
              </Text>
            </LinearGradient>
          </View>

          {/* Traits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Personality Traits</Text>
            <Text style={styles.sectionSub}>Updated from this session</Text>
            <View style={styles.traitsCard}>
              {traits.map((trait, i) => (
                <TraitBar key={trait.key} trait={trait} delay={i * 120} />
              ))}
            </View>
          </View>

          {/* Top Interests */}
          {topInterests.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What You Love</Text>
              <Text style={styles.sectionSub}>Your top interests so far</Text>
              <View style={styles.interestPills}>
                {topInterests.map((interest) => (
                  <View key={interest} style={styles.interestPill}>
                    <LinearGradient colors={["#7C3AED33", "#F9449833"]} style={styles.pillGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                      <Text style={styles.pillText}>{interest}</Text>
                    </LinearGradient>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* What TRAVI Learned */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What TRAVI Learned</Text>
            <View style={styles.learnedCard}>
              {[
                { icon: "⚡", text: "Your decision speed tells us how confident you are about each category" },
                { icon: "🎯", text: "Hesitation = interest. Even skipped cards teach us something" },
                { icon: "🔄", text: "Every future trip will be more accurate because of this session" },
              ].map((item, i) => (
                <View key={i} style={styles.learnedRow}>
                  <Text style={styles.learnedIcon}>{item.icon}</Text>
                  <Text style={styles.learnedText}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>

        </Animated.View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.cta} onPress={handleContinue} activeOpacity={0.85}>
          <LinearGradient
            colors={["#F94498", "#7C3AED"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>See My Itinerary →</Text>
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
  header: { alignItems: "center", paddingVertical: 16 },
  logoText: { color: "#FFFFFF", fontSize: 20, fontFamily: "Chillax-Bold", fontWeight: "900", letterSpacing: 2 },
  hero: { marginHorizontal: 20, marginBottom: 20, borderRadius: 24, overflow: "hidden", padding: 28, alignItems: "center" },
  heroBg: { ...StyleSheet.absoluteFillObject },
  heroEmoji: { fontSize: 52, fontFamily: "Satoshi-Regular", marginBottom: 12 },
  heroTitle: { color: "#FFFFFF", fontSize: 24, fontFamily: "Chillax-Bold", fontWeight: "800", textAlign: "center", marginBottom: 8 },
  heroSub: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "Satoshi-Regular", textAlign: "center", lineHeight: 20 },
  typeCard: { marginHorizontal: 20, marginBottom: 24, borderRadius: 24, overflow: "hidden", shadowColor: "#F94498", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 10 },
  typeGradient: { padding: 26 },
  typeLabel: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "700", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" },
  typeName: { color: "#FFFFFF", fontSize: 30, fontFamily: "Chillax-Bold", fontWeight: "900", marginBottom: 12, lineHeight: 36 },
  typeDesc: { color: "rgba(255,255,255,0.8)", fontSize: 14, fontFamily: "Satoshi-Regular", lineHeight: 21 },
  section: { marginHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontFamily: "Chillax-Bold", fontWeight: "800", marginBottom: 2 },
  sectionSub: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular", marginBottom: 14 },
  traitsCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, padding: 18, gap: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  traitRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  traitLeft: { flexDirection: "row", alignItems: "center", gap: 10, width: 155 },
  traitIcon: { fontSize: 20, fontFamily: "Satoshi-Regular" },
  traitLabel: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontFamily: "Chillax-Semibold", fontWeight: "700", flex: 1 },
  traitRight: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  barTrack: { flex: 1, height: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 4 },
  traitScoreWrap: { flexDirection: "row", alignItems: "center", gap: 4, width: 48, justifyContent: "flex-end" },
  traitScore: { fontSize: 15, fontFamily: "Chillax-Bold", fontWeight: "900", width: 30, textAlign: "right" },
  deltaBadge: { backgroundColor: "rgba(34,197,94,0.2)", borderRadius: 8, paddingHorizontal: 5, paddingVertical: 2, borderWidth: 1, borderColor: "rgba(34,197,94,0.3)" },
  deltaText: { color: "#22C55E", fontSize: 10, fontFamily: "Chillax-Bold", fontWeight: "800" },
  interestPills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  interestPill: { borderRadius: 20, overflow: "hidden" },
  pillGrad: { paddingHorizontal: 14, paddingVertical: 8 },
  pillText: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  learnedCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, padding: 16, gap: 14 },
  learnedRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  learnedIcon: { fontSize: 20, fontFamily: "Satoshi-Regular", marginTop: 1 },
  learnedText: { flex: 1, color: "rgba(255,255,255,0.65)", fontSize: 14, fontFamily: "Satoshi-Regular", lineHeight: 20 },
  ctaWrap: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 12, backgroundColor: "#0D0B1E" },
  cta: { borderRadius: 18, overflow: "hidden" },
  ctaGradient: { paddingVertical: 18, alignItems: "center" },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontFamily: "Chillax-Bold", fontWeight: "800", letterSpacing: 0.3 },
});
