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
  destination: string; // destination code e.g. "dubai", "kyoto"
  rating: number;
  reviews: number;
  duration: string;
  price: string;
  priceLevel: "budget" | "mid" | "premium" | "luxury"; // for budget filtering
  tags: string[];
  image: any;
  description: string;
  color: string;
}

// Budget level ordering: budget < mid < premium < luxury
const BUDGET_LEVELS = ["budget", "mid", "premium", "luxury"] as const;
type BudgetLevel = typeof BUDGET_LEVELS[number];

function budgetAllows(itemLevel: BudgetLevel, userBudget: string): boolean {
  const userIdx = BUDGET_LEVELS.indexOf(userBudget as BudgetLevel);
  const itemIdx = BUDGET_LEVELS.indexOf(itemLevel);
  if (userIdx === -1) return true; // unknown budget = show all
  // Show items at or below user's budget level (luxury users see everything)
  return itemIdx <= userIdx + 1;
}

const ALL_ATTRACTIONS: Attraction[] = [
  // ── DUBAI ──
  { id: "d1", name: "Burj Khalifa Observation Deck", type: "Landmark", category: "landmarks", destination: "dubai",
    location: "Downtown Dubai", rating: 4.8, reviews: 142000, duration: "2–3 hrs", price: "$40", priceLevel: "mid",
    tags: ["Views", "Architecture", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80" },
    description: "Stand at the top of the world's tallest building. 360° views that will leave you speechless.", color: "#F94498" },
  { id: "d2", name: "Dubai Mall & Aquarium", type: "Shopping & Experience", category: "shopping", destination: "dubai",
    location: "Downtown Dubai", rating: 4.7, reviews: 210000, duration: "3–5 hrs", price: "$30", priceLevel: "mid",
    tags: ["Shopping", "Aquarium", "Family"], image: { uri: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" },
    description: "The world's largest mall with an indoor aquarium, ice rink, and 1,200+ stores.", color: "#06B6D4" },
  { id: "d3", name: "Gold Souk & Spice Souk", type: "Shopping", category: "shopping", destination: "dubai",
    location: "Deira, Dubai", rating: 4.5, reviews: 89000, duration: "2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Gold", "Bargain", "Authentic"], image: { uri: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80" },
    description: "Narrow alleyways glittering with gold and fragrant with spices. Bargain hard.", color: "#D97706" },
  { id: "d4", name: "Desert Safari & BBQ Dinner", type: "Adventure", category: "adventure", destination: "dubai",
    location: "Dubai Desert", rating: 4.8, reviews: 67000, duration: "6 hrs", price: "$80", priceLevel: "mid",
    tags: ["Dunes", "Camel", "Sunset"], image: { uri: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" },
    description: "Dune bashing, camel rides, and a BBQ dinner under the stars in the Arabian desert.", color: "#F97316" },
  { id: "d5", name: "Atlantis Aquaventure Waterpark", type: "Water Park", category: "water_sports", destination: "dubai",
    location: "Palm Jumeirah", rating: 4.7, reviews: 45000, duration: "Full day", price: "$90", priceLevel: "premium",
    tags: ["Slides", "Beach", "Family"], image: { uri: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80" },
    description: "The Middle East's best waterpark with 105 rides, a private beach, and a marine habitat.", color: "#0EA5E9" },
  { id: "d6", name: "Burj Al Arab Afternoon Tea", type: "Luxury Dining", category: "food", destination: "dubai",
    location: "Jumeirah", rating: 4.9, reviews: 12000, duration: "2 hrs", price: "$150", priceLevel: "luxury",
    tags: ["Luxury", "Iconic", "Tea"], image: { uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
    description: "Afternoon tea in the world's most iconic hotel. Gold-plated everything.", color: "#F59E0B" },
  { id: "d7", name: "Dubai Frame", type: "Landmark", category: "landmarks", destination: "dubai",
    location: "Zabeel Park", rating: 4.4, reviews: 38000, duration: "1–2 hrs", price: "$15", priceLevel: "budget",
    tags: ["Views", "Architecture", "Instagram"], image: { uri: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
    description: "A 150m picture frame with old Dubai on one side and new Dubai on the other.", color: "#A855F7" },
  { id: "d8", name: "Dubai Marina Night Walk", type: "Nightlife", category: "nightlife", destination: "dubai",
    location: "Dubai Marina", rating: 4.6, reviews: 55000, duration: "2–3 hrs", price: "Free", priceLevel: "budget",
    tags: ["Yachts", "Restaurants", "Nightlife"], image: { uri: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" },
    description: "Yacht-lined waterfront with dozens of restaurants, bars, and a buzzing atmosphere.", color: "#8B5CF6" },

  // ── KYOTO ──
  { id: "k1", name: "Fushimi Inari Shrine", type: "Cultural Site", category: "history", destination: "kyoto",
    location: "Fushimi, Kyoto", rating: 4.9, reviews: 89000, duration: "2–4 hrs", price: "Free", priceLevel: "budget",
    tags: ["Torii Gates", "Spiritual", "Hiking"], image: { uri: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80" },
    description: "Thousands of vermillion torii gates winding up a sacred mountain. Pure magic at dawn.", color: "#F97316" },
  { id: "k2", name: "Arashiyama Bamboo Grove", type: "Nature", category: "nature", destination: "kyoto",
    location: "Arashiyama, Kyoto", rating: 4.7, reviews: 72000, duration: "1–2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Bamboo", "Photography", "Zen"], image: { uri: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80" },
    description: "Walk through towering bamboo stalks that creak and sway in the wind. Otherworldly.", color: "#22C55E" },
  { id: "k3", name: "Kinkaku-ji Golden Pavilion", type: "Temple", category: "art_culture", destination: "kyoto",
    location: "Kita, Kyoto", rating: 4.8, reviews: 115000, duration: "1 hr", price: "$5", priceLevel: "budget",
    tags: ["Gold", "Temple", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
    description: "A Zen temple covered in gold leaf, reflected perfectly in a mirror pond.", color: "#D97706" },
  { id: "k4", name: "Nishiki Market Food Tour", type: "Food Experience", category: "food", destination: "kyoto",
    location: "Central Kyoto", rating: 4.6, reviews: 43000, duration: "2 hrs", price: "$30", priceLevel: "mid",
    tags: ["Street Food", "Tofu", "Pickles"], image: { uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
    description: "'Kyoto's Kitchen' — 400-year-old covered market with 100+ stalls of local delicacies.", color: "#F59E0B" },
  { id: "k5", name: "Geisha District Night Walk", type: "Cultural Experience", category: "art_culture", destination: "kyoto",
    location: "Gion, Kyoto", rating: 4.7, reviews: 61000, duration: "2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Geisha", "Lanterns", "History"], image: { uri: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80" },
    description: "Cobblestone streets lined with ochaya teahouses. Spot a geiko if you're lucky.", color: "#EC4899" },

  // ── BALI ──
  { id: "b1", name: "Ubud Rice Terraces Trek", type: "Nature Walk", category: "nature", destination: "bali",
    location: "Ubud, Bali", rating: 4.7, reviews: 45000, duration: "3–4 hrs", price: "$15", priceLevel: "budget",
    tags: ["Hiking", "Nature", "Photography"], image: { uri: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
    description: "Walk through emerald-green rice terraces carved into hillsides over 2,000 years ago.", color: "#22C55E" },
  { id: "b2", name: "Tanah Lot Temple Sunset", type: "Temple", category: "landmarks", destination: "bali",
    location: "Tabanan, Bali", rating: 4.8, reviews: 78000, duration: "2 hrs", price: "$5", priceLevel: "budget",
    tags: ["Sunset", "Temple", "Ocean"], image: { uri: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80" },
    description: "A sea temple perched on a rock formation, silhouetted against a blazing sunset.", color: "#F97316" },
  { id: "b3", name: "Seminyak Beach Club Day", type: "Beach", category: "beaches", destination: "bali",
    location: "Seminyak, Bali", rating: 4.6, reviews: 52000, duration: "Full day", price: "$50", priceLevel: "premium",
    tags: ["Pool", "Beach", "Cocktails"], image: { uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
    description: "Bali's most stylish beach clubs with infinity pools, DJs, and ocean views.", color: "#06B6D4" },
  { id: "b4", name: "Balinese Cooking Class", type: "Food Experience", category: "food", destination: "bali",
    location: "Ubud, Bali", rating: 4.8, reviews: 23000, duration: "4 hrs", price: "$45", priceLevel: "mid",
    tags: ["Cooking", "Spices", "Local"], image: { uri: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80" },
    description: "Visit a local market, then cook 8 traditional dishes in an open-air kitchen.", color: "#F59E0B" },

  // ── BARCELONA ──
  { id: "bc1", name: "Sagrada Família", type: "Architecture", category: "art_culture", destination: "barcelona",
    location: "Eixample, Barcelona", rating: 4.8, reviews: 210000, duration: "1–2 hrs", price: "$30", priceLevel: "mid",
    tags: ["Gaudí", "Art", "Architecture"], image: { uri: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80" },
    description: "Gaudí's unfinished masterpiece — a cathedral that looks like it grew from the earth itself.", color: "#A855F7" },
  { id: "bc2", name: "La Boqueria Market", type: "Food Experience", category: "food", destination: "barcelona",
    location: "Las Ramblas, Barcelona", rating: 4.5, reviews: 145000, duration: "1–2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Market", "Tapas", "Fresh"], image: { uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    description: "Europe's most famous food market. Jamón, seafood, fresh fruit, and chaos.", color: "#F59E0B" },
  { id: "bc3", name: "Barceloneta Beach", type: "Beach", category: "beaches", destination: "barcelona",
    location: "Barceloneta, Barcelona", rating: 4.4, reviews: 98000, duration: "Half day", price: "Free", priceLevel: "budget",
    tags: ["Beach", "Sun", "City"], image: { uri: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80" },
    description: "City beach with golden sand, beach bars, and the Mediterranean at your feet.", color: "#06B6D4" },
  { id: "bc4", name: "Gothic Quarter Night Tour", type: "History Walk", category: "history", destination: "barcelona",
    location: "Barri Gòtic, Barcelona", rating: 4.7, reviews: 34000, duration: "2 hrs", price: "$20", priceLevel: "mid",
    tags: ["History", "Medieval", "Night"], image: { uri: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80" },
    description: "2,000 years of history in a labyrinth of narrow streets. Roman ruins under your feet.", color: "#D97706" },

  // ── TOKYO ──
  { id: "t1", name: "Shibuya Crossing", type: "Landmark", category: "landmarks", destination: "tokyo",
    location: "Shibuya, Tokyo", rating: 4.7, reviews: 187000, duration: "30 min", price: "Free", priceLevel: "budget",
    tags: ["Iconic", "Crowds", "Photography"], image: { uri: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" },
    description: "The world's busiest pedestrian crossing. 3,000 people cross at once. Pure Tokyo energy.", color: "#F94498" },
  { id: "t2", name: "Tsukiji Outer Market", type: "Food Experience", category: "food", destination: "tokyo",
    location: "Chuo, Tokyo", rating: 4.7, reviews: 92000, duration: "2 hrs", price: "$20", priceLevel: "mid",
    tags: ["Sushi", "Seafood", "Morning"], image: { uri: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80" },
    description: "The world's freshest sushi at 6am. Tuna, sea urchin, and tamagoyaki straight from the source.", color: "#F59E0B" },
  { id: "t3", name: "Shinjuku Nightlife", type: "Nightlife", category: "nightlife", destination: "tokyo",
    location: "Shinjuku, Tokyo", rating: 4.6, reviews: 73000, duration: "4 hrs", price: "$30", priceLevel: "mid",
    tags: ["Bars", "Neon", "Izakaya"], image: { uri: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80" },
    description: "200 bars in one block. Golden Gai, Robot Restaurant, and izakayas that never close.", color: "#8B5CF6" },
  { id: "t4", name: "teamLab Planets", type: "Art Experience", category: "art_culture", destination: "tokyo",
    location: "Toyosu, Tokyo", rating: 4.9, reviews: 41000, duration: "2 hrs", price: "$35", priceLevel: "mid",
    tags: ["Digital Art", "Immersive", "Unique"], image: { uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
    description: "Walk through rooms of infinite mirrors, floating flowers, and digital waterfalls. Mind-bending.", color: "#EC4899" },
];

export default function SwipeScreen() {
  const insets = useSafeAreaInsets();
  const { tripId, interests, destination, budget } = useLocalSearchParams<{ tripId: string; interests: string; destination: string; budget: string }>();

  // 1. Filter by destination (exact match)
  const destFiltered = destination
    ? ALL_ATTRACTIONS.filter((a) => a.destination === destination.toLowerCase())
    : ALL_ATTRACTIONS;

  // 2. Filter by budget level
  const budgetFiltered = budget
    ? destFiltered.filter((a) => budgetAllows(a.priceLevel, budget))
    : destFiltered;

  // 3. Sort: selected interest categories first, then rest
  const selectedInterests = interests ? interests.split(",") : [];
  const filteredAttractions = selectedInterests.length > 0
    ? [
        ...budgetFiltered.filter((a) => selectedInterests.includes(a.category)),
        ...budgetFiltered.filter((a) => !selectedInterests.includes(a.category)),
      ]
    : budgetFiltered;

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
            onPress={() => router.push({ pathname: "/(trip)/dna-update", params: { tripId, destination: destination ?? "dubai", liked: liked.map((a) => a.id).join(","), interests } } as never)}
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
