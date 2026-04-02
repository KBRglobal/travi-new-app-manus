/**
 * TRAVI — Tinder Swipe for Attractions & Restaurants
 * Swipe right = add to trip + boost DNA score
 * Swipe left = skip + small negative signal
 * Hesitation time = strong learning signal
 *
 * Every interaction feeds the DNA engine.
 */

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { recordSwipe, type InterestCategory } from "@/lib/dna-store";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.35;
const ROTATION_FACTOR = 12;

interface Attraction {
  id: string;
  name: string;
  type: string;
  category: InterestCategory;
  location: string;
  rating: number;
  reviews: number;
  duration: string;
  price: string;
  tags: string[];
  image: any;
  description: string;
  color: string;
}

const ALL_ATTRACTIONS: Attraction[] = [
  {
    id: "a1", name: "Burj Khalifa Observation Deck", type: "Landmark", category: "landmarks",
    location: "Dubai, UAE", rating: 4.8, reviews: 142000, duration: "2–3 hrs", price: "$40",
    tags: ["Views", "Architecture", "Iconic"],
    image: require("@/assets/destinations/dubai.jpg"),
    description: "Stand at the top of the world's tallest building. 360° views that will leave you speechless.",
    color: "#F94498",
  },
  {
    id: "a2", name: "Fushimi Inari Shrine", type: "Cultural Site", category: "history",
    location: "Kyoto, Japan", rating: 4.9, reviews: 89000, duration: "2–4 hrs", price: "Free",
    tags: ["Spiritual", "Photography", "Hiking"],
    image: require("@/assets/destinations/kyoto.jpg"),
    description: "Thousands of vermillion torii gates winding up a sacred mountain. Pure magic at dawn.",
    color: "#F97316",
  },
  {
    id: "a3", name: "Maldives Snorkeling Safari", type: "Water Activity", category: "water_sports",
    location: "North Malé Atoll", rating: 4.9, reviews: 23000, duration: "Half day", price: "$85",
    tags: ["Ocean", "Marine Life", "Adventure"],
    image: require("@/assets/destinations/maldives.jpg"),
    description: "Swim alongside manta rays, sea turtles, and technicolor reef fish in crystal-clear lagoons.",
    color: "#06B6D4",
  },
  {
    id: "a4", name: "Sagrada Família", type: "Architecture", category: "art_culture",
    location: "Barcelona, Spain", rating: 4.8, reviews: 210000, duration: "1–2 hrs", price: "$30",
    tags: ["Gaudí", "Art", "Architecture"],
    image: require("@/assets/destinations/barcelona.jpg"),
    description: "Gaudí's unfinished masterpiece — a cathedral that looks like it grew from the earth itself.",
    color: "#A855F7",
  },
  {
    id: "a5", name: "Ubud Rice Terraces Trek", type: "Nature Walk", category: "nature",
    location: "Bali, Indonesia", rating: 4.7, reviews: 45000, duration: "3–4 hrs", price: "$15",
    tags: ["Hiking", "Nature", "Photography"],
    image: require("@/assets/destinations/bali.jpg"),
    description: "Walk through emerald-green rice terraces carved into hillsides over 2,000 years ago.",
    color: "#22C55E",
  },
  {
    id: "a6", name: "Torres del Paine Trek", type: "Adventure", category: "adventure",
    location: "Patagonia, Chile", rating: 4.9, reviews: 18000, duration: "Full day", price: "$25",
    tags: ["Trekking", "Wilderness", "Epic"],
    image: require("@/assets/destinations/patagonia.jpg"),
    description: "Granite towers, glacial lakes, and wind that tries to blow you off the planet. Worth every step.",
    color: "#EF4444",
  },
  {
    id: "a7", name: "Santorini Sunset Cruise", type: "Experience", category: "beaches",
    location: "Santorini, Greece", rating: 4.8, reviews: 67000, duration: "4 hrs", price: "$70",
    tags: ["Sunset", "Romantic", "Sailing"],
    image: require("@/assets/destinations/santorini.jpg"),
    description: "Watch the sun melt into the Aegean from a catamaran. Hot springs, wine, and magic.",
    color: "#F59E0B",
  },
  {
    id: "a8", name: "Tokyo Ramen Alley", type: "Food Experience", category: "food",
    location: "Shinjuku, Tokyo", rating: 4.7, reviews: 34000, duration: "2 hrs", price: "$20",
    tags: ["Ramen", "Street Food", "Local"],
    image: require("@/assets/destinations/tokyo.jpg"),
    description: "Twelve tiny ramen shops in one alley. Each one a different broth, a different story.",
    color: "#F59E0B",
  },
  {
    id: "a9", name: "Northern Lights Snowmobile", type: "Adventure", category: "extreme",
    location: "Iceland", rating: 4.9, reviews: 12000, duration: "4 hrs", price: "$150",
    tags: ["Aurora", "Snow", "Adrenaline"],
    image: require("@/assets/destinations/iceland.jpg"),
    description: "Race across a frozen tundra under dancing curtains of green and purple light.",
    color: "#8B5CF6",
  },
  {
    id: "a10", name: "Machu Picchu Sunrise", type: "Wonder", category: "landmarks",
    location: "Cusco, Peru", rating: 5.0, reviews: 98000, duration: "Full day", price: "$50",
    tags: ["Inca", "Sunrise", "Iconic"],
    image: require("@/assets/destinations/machupicchu.jpg"),
    description: "Watch mist lift off the lost city of the Incas as the sun rises over the Andes.",
    color: "#D97706",
  },
  {
    id: "a11", name: "Amsterdam Canal Kayak", type: "Water Activity", category: "water_sports",
    location: "Amsterdam, Netherlands", rating: 4.6, reviews: 28000, duration: "2 hrs", price: "$35",
    tags: ["Canals", "Kayaking", "City"],
    image: require("@/assets/destinations/amsterdam.jpg"),
    description: "Paddle through 17th-century canals, under drawbridges, past houseboat gardens.",
    color: "#0EA5E9",
  },
  {
    id: "a12", name: "Phuket Night Market", type: "Food & Shopping", category: "nightlife",
    location: "Phuket, Thailand", rating: 4.5, reviews: 52000, duration: "3 hrs", price: "$10",
    tags: ["Street Food", "Shopping", "Nightlife"],
    image: require("@/assets/destinations/phuket.jpg"),
    description: "A sensory overload of pad thai, mango sticky rice, silk scarves, and neon lights.",
    color: "#EC4899",
  },
];

export default function SwipeScreen() {
  const insets = useSafeAreaInsets();
  const { tripId, interests } = useLocalSearchParams<{ tripId: string; interests: string }>();

  // Filter cards by selected interests if provided
  const filteredAttractions = interests
    ? ALL_ATTRACTIONS.filter((a) => interests.split(",").includes(a.category)).concat(
        ALL_ATTRACTIONS.filter((a) => !interests.split(",").includes(a.category))
      )
    : ALL_ATTRACTIONS;

  const [cards, setCards] = useState(filteredAttractions);
  const [liked, setLiked] = useState<Attraction[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const cardAppearTime = useRef<number>(Date.now());

  const position = useRef(new Animated.ValueXY()).current;
  const nextCardScale = useRef(new Animated.Value(0.92)).current;

  const rotate = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [`-${ROTATION_FACTOR}deg`, "0deg", `${ROTATION_FACTOR}deg`],
    extrapolate: "clamp",
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD / 2],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD / 2, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Reset card appearance timer when index changes
  useEffect(() => {
    cardAppearTime.current = Date.now();
    setSwipeDirection(null);
  }, [currentIndex]);

  const handleSwipe = useCallback(
    async (direction: "left" | "right") => {
      const card = cards[currentIndex];
      if (!card) return;

      const hesitationMs = Date.now() - cardAppearTime.current;
      const liked = direction === "right";

      if (Platform.OS !== "web") {
        if (liked) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      // Record to DNA store
      await recordSwipe(card.id, card.category, liked, hesitationMs);

      if (liked) {
        setLiked((prev) => [...prev, card]);
      }

      // Animate out
      const toX = direction === "right" ? width * 1.5 : -width * 1.5;
      Animated.parallel([
        Animated.timing(position, { toValue: { x: toX, y: 0 }, duration: 280, useNativeDriver: true }),
        Animated.timing(nextCardScale, { toValue: 1, duration: 280, useNativeDriver: true }),
      ]).start(() => {
        position.setValue({ x: 0, y: 0 });
        nextCardScale.setValue(0.92);
        setCurrentIndex((i) => i + 1);
      });
    },
    [cards, currentIndex, position, nextCardScale]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gs) => {
        position.setValue({ x: gs.dx, y: gs.dy * 0.3 });
        if (gs.dx > 30) setSwipeDirection("right");
        else if (gs.dx < -30) setSwipeDirection("left");
        else setSwipeDirection(null);

        // Scale up next card as current card moves
        const progress = Math.min(Math.abs(gs.dx) / SWIPE_THRESHOLD, 1);
        nextCardScale.setValue(0.92 + progress * 0.08);
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dx > SWIPE_THRESHOLD) {
          handleSwipe("right");
        } else if (gs.dx < -SWIPE_THRESHOLD) {
          handleSwipe("left");
        } else {
          // Snap back
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            tension: 40,
            friction: 6,
          }).start();
          Animated.spring(nextCardScale, {
            toValue: 0.92,
            useNativeDriver: true,
          }).start();
          setSwipeDirection(null);
        }
      },
    })
  ).current;

  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];
  const isDone = currentIndex >= cards.length;

  if (isDone) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.orb1} />
        <View style={styles.orb2} />
        <View style={styles.doneWrap}>
          <LinearGradient colors={["rgba(249,68,152,0.2)", "rgba(100,67,244,0.15)"]} style={styles.doneBg} />
          <Text style={styles.doneEmoji}>✨</Text>
          <Text style={styles.doneTitle}>Your trip is taking shape!</Text>
          <Text style={styles.doneSub}>
            You liked {liked.length} attraction{liked.length !== 1 ? "s" : ""}. TRAVI is building your perfect itinerary.
          </Text>
          <View style={styles.likedList}>
            {liked.slice(0, 4).map((a) => (
              <View key={a.id} style={[styles.likedChip, { borderColor: a.color + "60" }]}>
                <View style={[styles.likedDot, { backgroundColor: a.color }]} />
                <Text style={styles.likedChipText}>{a.name}</Text>
              </View>
            ))}
            {liked.length > 4 && (
              <Text style={styles.likedMore}>+{liked.length - 4} more</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => router.push({ pathname: "/(trip)/itinerary", params: { tripId, likedIds: liked.map((a) => a.id).join(",") } } as never)}
            activeOpacity={0.88}
          >
            <LinearGradient colors={["#F94498", "#6443F4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
              <Text style={styles.ctaText}>Build My Itinerary</Text>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          <Text style={styles.headerTitle}>Pick your highlights</Text>
          <Text style={styles.headerSub}>{currentIndex + 1} of {cards.length}</Text>
        </View>
        <View style={[styles.likedBadge, liked.length > 0 && styles.likedBadgeActive]}>
          <IconSymbol name="heart.fill" size={14} color={liked.length > 0 ? "#F94498" : "rgba(255,255,255,0.3)"} />
          <Text style={[styles.likedCount, liked.length > 0 && styles.likedCountActive]}>{liked.length}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={["#F94498", "#6443F4"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${((currentIndex) / cards.length) * 100}%` as unknown as number }]}
          />
        </View>
      </View>

      {/* Cards stack */}
      <View style={styles.cardsArea}>
        {/* Next card (behind) */}
        {nextCard && (
          <Animated.View style={[styles.card, styles.nextCard, { transform: [{ scale: nextCardScale }] }]}>
            <Image source={nextCard.image} style={styles.cardImage} resizeMode="cover" />
            <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]} style={StyleSheet.absoluteFillObject} />
          </Animated.View>
        )}

        {/* Current card (front) */}
        {currentCard && (
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  { translateX: position.x },
                  { translateY: position.y },
                  { rotate },
                ],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <Image source={currentCard.image} style={styles.cardImage} resizeMode="cover" />
            <LinearGradient colors={["transparent", "rgba(0,0,0,0.95)"]} style={StyleSheet.absoluteFillObject} />

            {/* LIKE stamp */}
            <Animated.View style={[styles.stamp, styles.stampLike, { opacity: likeOpacity }]}>
              <Text style={styles.stampText}>LIKE</Text>
            </Animated.View>

            {/* NOPE stamp */}
            <Animated.View style={[styles.stamp, styles.stampNope, { opacity: nopeOpacity }]}>
              <Text style={[styles.stampText, styles.stampTextNope]}>SKIP</Text>
            </Animated.View>

            {/* Card info */}
            <View style={styles.cardInfo}>
              <View style={styles.cardTypePill}>
                <Text style={styles.cardTypeText}>{currentCard.type}</Text>
              </View>
              <Text style={styles.cardName}>{currentCard.name}</Text>
              <Text style={styles.cardLocation}>📍 {currentCard.location}</Text>
              <Text style={styles.cardDesc}>{currentCard.description}</Text>

              <View style={styles.cardMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaValue}>⭐ {currentCard.rating}</Text>
                  <Text style={styles.metaLabel}>{(currentCard.reviews / 1000).toFixed(0)}k reviews</Text>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                  <Text style={styles.metaValue}>⏱ {currentCard.duration}</Text>
                  <Text style={styles.metaLabel}>Duration</Text>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                  <Text style={styles.metaValue}>{currentCard.price}</Text>
                  <Text style={styles.metaLabel}>Per person</Text>
                </View>
              </View>

              <View style={styles.tags}>
                {currentCard.tags.map((tag) => (
                  <View key={tag} style={[styles.tag, { borderColor: currentCard.color + "60" }]}>
                    <Text style={[styles.tagText, { color: currentCard.color }]}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}
      </View>

      {/* Action buttons */}
      <View style={[styles.actions, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionBtnNope]}
          onPress={() => handleSwipe("left")}
          activeOpacity={0.8}
        >
          <LinearGradient colors={["rgba(239,68,68,0.2)", "rgba(239,68,68,0.1)"]} style={styles.actionBtnGradient}>
            <Text style={styles.actionBtnNopeTxt}>✕</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.actionCenter}>
          <Text style={styles.swipeHint}>Swipe to decide</Text>
        </View>

        <TouchableOpacity
          style={[styles.actionBtn, styles.actionBtnLike]}
          onPress={() => handleSwipe("right")}
          activeOpacity={0.8}
        >
          <LinearGradient colors={["rgba(249,68,152,0.3)", "rgba(100,67,244,0.2)"]} style={styles.actionBtnGradient}>
            <Text style={styles.actionBtnLikeTxt}>♥</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CARD_HEIGHT = height * 0.58;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.09)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.06)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 8, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 },
  likedBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)" },
  likedBadgeActive: { backgroundColor: "rgba(249,68,152,0.12)", borderColor: "rgba(249,68,152,0.3)" },
  likedCount: { color: "rgba(255,255,255,0.3)", fontSize: 14, fontWeight: "700" },
  likedCountActive: { color: "#F94498" },
  progressWrap: { paddingHorizontal: 20, paddingBottom: 12 },
  progressTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%" as unknown as number, borderRadius: 2 },
  cardsArea: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 16 },
  card: { position: "absolute", width: width - 32, height: CARD_HEIGHT, borderRadius: 28, overflow: "hidden", backgroundColor: "#1A0A3D" },
  nextCard: { top: 16 },
  cardImage: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  stamp: { position: "absolute", top: 40, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, borderWidth: 4 },
  stampLike: { right: 20, borderColor: "#22C55E", transform: [{ rotate: "15deg" }] },
  stampNope: { left: 20, borderColor: "#EF4444", transform: [{ rotate: "-15deg" }] },
  stampText: { color: "#22C55E", fontSize: 28, fontWeight: "900", letterSpacing: 2 },
  stampTextNope: { color: "#EF4444" },
  cardInfo: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, gap: 8 },
  cardTypePill: { alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  cardTypeText: { color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  cardName: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", lineHeight: 28 },
  cardLocation: { color: "rgba(255,255,255,0.6)", fontSize: 13 },
  cardDesc: { color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 19 },
  cardMeta: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 14, padding: 12, gap: 8 },
  metaItem: { flex: 1, alignItems: "center", gap: 2 },
  metaValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  metaLabel: { color: "rgba(255,255,255,0.4)", fontSize: 10 },
  metaDivider: { width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.1)" },
  tags: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  tag: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  tagText: { fontSize: 11, fontWeight: "600" },
  actions: { flexDirection: "row", alignItems: "center", paddingHorizontal: 32, paddingTop: 16, gap: 16 },
  actionBtn: { borderRadius: 36, overflow: "hidden" },
  actionBtnGradient: { width: 72, height: 72, alignItems: "center", justifyContent: "center", borderRadius: 36, borderWidth: 2, borderColor: "rgba(255,255,255,0.08)" },
  actionBtnNope: {},
  actionBtnLike: {},
  actionBtnNopeTxt: { fontSize: 28, color: "#EF4444" },
  actionBtnLikeTxt: { fontSize: 26, color: "#F94498" },
  actionCenter: { flex: 1, alignItems: "center" },
  swipeHint: { color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: "600" },
  // Done screen
  doneWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 16, overflow: "hidden" },
  doneBg: { ...StyleSheet.absoluteFillObject },
  doneEmoji: { fontSize: 56 },
  doneTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "800", textAlign: "center" },
  doneSub: { color: "rgba(255,255,255,0.6)", fontSize: 15, textAlign: "center", lineHeight: 22 },
  likedList: { width: "100%", gap: 8, marginTop: 8 },
  likedChip: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1 },
  likedDot: { width: 8, height: 8, borderRadius: 4 },
  likedChipText: { color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: "600", flex: 1 },
  likedMore: { color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", marginTop: 4 },
  ctaBtn: { width: "100%", borderRadius: 20, overflow: "hidden", marginTop: 8 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10 },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
});
