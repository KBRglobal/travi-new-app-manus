import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Platform, ScrollView } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

type DNATag = "culture" | "adventure" | "food" | "luxury" | "social" | "solo" | "nature" | "urban" | "relax" | "spontaneous" | "planned";
interface QuizOption { id: string; label: string; sublabel: string; colors: [string, string]; iconName: string; tags: DNATag[]; }
interface QuizQuestion { id: number; question: string; subtitle: string; options: QuizOption[]; }

const QUESTIONS: QuizQuestion[] = [
  { id: 1, question: "Your perfect Saturday morning", subtitle: "Pick the one that makes your heart beat faster", options: [
    { id: "1a", label: "Cafe & Croissant", sublabel: "Watching the city wake up", colors: ["#C2410C", "#EA580C"], iconName: "cup.and.saucer.fill", tags: ["culture", "urban", "relax"] },
    { id: "1b", label: "Sunrise Hike", sublabel: "Chasing the golden hour", colors: ["#0369A1", "#0EA5E9"], iconName: "figure.hiking", tags: ["adventure", "nature", "solo"] },
    { id: "1c", label: "Street Food Tour", sublabel: "Eating your way through the market", colors: ["#15803D", "#22C55E"], iconName: "fork.knife", tags: ["food", "social", "culture"] },
    { id: "1d", label: "Rooftop Pool", sublabel: "Sipping something cold with a view", colors: ["#6443F4", "#9077EF"], iconName: "drop.fill", tags: ["luxury", "relax", "social"] },
  ]},
  { id: 2, question: "The perfect travel photo", subtitle: "What fills your camera roll?", options: [
    { id: "2a", label: "Ancient Ruins", sublabel: "History you can touch", colors: ["#92400E", "#D97706"], iconName: "building.columns.fill", tags: ["culture", "solo", "planned"] },
    { id: "2b", label: "Wild Landscapes", sublabel: "Nature at its most raw", colors: ["#02A65C", "#059669"], iconName: "mountain.2.fill", tags: ["nature", "adventure", "solo"] },
    { id: "2c", label: "Local People", sublabel: "Faces that tell stories", colors: ["#6443F4", "#6443F4"], iconName: "person.2.fill", tags: ["social", "culture", "spontaneous"] },
    { id: "2d", label: "Dreamy Hotels", sublabel: "Spaces that inspire", colors: ["#831843", "#F94498"], iconName: "bed.double.fill", tags: ["luxury", "relax", "planned"] },
  ]},
  { id: 3, question: "Your ideal dinner abroad", subtitle: "Where are you sitting tonight?", options: [
    { id: "3a", label: "Michelin Star", sublabel: "Tasting menu, wine pairing", colors: ["#292524", "#78716C"], iconName: "star.fill", tags: ["luxury", "food", "planned"] },
    { id: "3b", label: "Night Market", sublabel: "Plastic stool, $3 noodles", colors: ["#7C2D12", "#DC2626"], iconName: "cart.fill", tags: ["food", "social", "spontaneous"] },
    { id: "3c", label: "Rooftop Bar", sublabel: "Cocktails above the skyline", colors: ["#312E81", "#6366F1"], iconName: "wineglass.fill", tags: ["urban", "social", "luxury"] },
    { id: "3d", label: "Cooking Class", sublabel: "Learn the local recipe", colors: ["#14532D", "#16A34A"], iconName: "flame.fill", tags: ["food", "culture", "social"] },
  ]},
  { id: 4, question: "How do you get around?", subtitle: "Your transport style says a lot", options: [
    { id: "4a", label: "Rent a Car", sublabel: "Freedom to go anywhere", colors: ["#1E40AF", "#3B82F6"], iconName: "car.fill", tags: ["adventure", "spontaneous", "solo"] },
    { id: "4b", label: "Walk & Explore", sublabel: "Get lost on purpose", colors: ["#4D7C0F", "#84CC16"], iconName: "figure.walk", tags: ["culture", "spontaneous", "solo"] },
    { id: "4c", label: "Private Driver", sublabel: "Comfort is non-negotiable", colors: ["#292524", "#57534E"], iconName: "car.side.fill", tags: ["luxury", "planned", "relax"] },
    { id: "4d", label: "Local Transit", sublabel: "Live like a local", colors: ["#0F766E", "#14B8A6"], iconName: "tram.fill", tags: ["culture", "social", "spontaneous"] },
  ]},
  { id: 5, question: "The perfect evening", subtitle: "How does your ideal night end?", options: [
    { id: "5a", label: "Live Music", sublabel: "Jazz bar or local band", colors: ["#6B21A8", "#6443F4"], iconName: "music.note", tags: ["culture", "social", "urban"] },
    { id: "5b", label: "Spa & Sleep", sublabel: "Early to bed, early to rise", colors: ["#0E7490", "#06B6D4"], iconName: "moon.fill", tags: ["relax", "luxury", "solo"] },
    { id: "5c", label: "Night Hike", sublabel: "Stars and silence", colors: ["#6443F4", "#1D4ED8"], iconName: "moon.stars.fill", tags: ["adventure", "nature", "solo"] },
    { id: "5d", label: "Rooftop Party", sublabel: "New friends, great views", colors: ["#9D174D", "#F94498"], iconName: "person.3.fill", tags: ["social", "urban", "spontaneous"] },
  ]},
  { id: 6, question: "When plans fall apart...", subtitle: "Your flight is cancelled. You:", options: [
    { id: "6a", label: "Improvise!", sublabel: "Best stories start here", colors: ["#B45309", "#F59E0B"], iconName: "bolt.fill", tags: ["spontaneous", "adventure", "solo"] },
    { id: "6b", label: "Find the lounge", sublabel: "Make the most of it", colors: ["#292524", "#44403C"], iconName: "sofa.fill", tags: ["luxury", "relax", "planned"] },
    { id: "6c", label: "Explore the city", sublabel: "Bonus destination!", colors: ["#02A65C", "#02A65C"], iconName: "map.fill", tags: ["adventure", "culture", "spontaneous"] },
    { id: "6d", label: "Rebook ASAP", sublabel: "Stick to the plan", colors: ["#6443F4", "#3B82F6"], iconName: "calendar", tags: ["planned", "solo", "relax"] },
  ]},
  { id: 7, question: "Your dream accommodation", subtitle: "Where do you sleep best?", options: [
    { id: "7a", label: "Boutique Hotel", sublabel: "Unique, local, personal", colors: ["#6443F4", "#9077EF"], iconName: "building.2.fill", tags: ["culture", "luxury", "planned"] },
    { id: "7b", label: "Jungle Villa", sublabel: "Nature all around you", colors: ["#14532D", "#22C55E"], iconName: "house.fill", tags: ["nature", "adventure", "relax"] },
    { id: "7c", label: "City Penthouse", sublabel: "Skyline views, everything close", colors: ["#0F172A", "#334155"], iconName: "building.fill", tags: ["urban", "luxury", "social"] },
    { id: "7d", label: "Hostel Common Room", sublabel: "Where the stories happen", colors: ["#7C2D12", "#F97316"], iconName: "person.3.fill", tags: ["social", "spontaneous", "solo"] },
  ]},
  { id: 8, question: "Must-do on every trip", subtitle: "The thing you always make time for", options: [
    { id: "8a", label: "Local Museum", sublabel: "Context makes everything richer", colors: ["#6443F4", "#1D4ED8"], iconName: "building.columns.fill", tags: ["culture", "solo", "planned"] },
    { id: "8b", label: "Extreme Sport", sublabel: "Skydive, surf, climb — yes", colors: ["#7C2D12", "#EF4444"], iconName: "figure.surfing", tags: ["adventure", "spontaneous", "solo"] },
    { id: "8c", label: "Fine Dining", sublabel: "At least one special meal", colors: ["#292524", "#78716C"], iconName: "fork.knife.circle.fill", tags: ["food", "luxury", "planned"] },
    { id: "8d", label: "Spa Day", sublabel: "Recharge is non-negotiable", colors: ["#0E7490", "#22D3EE"], iconName: "sparkles", tags: ["relax", "luxury", "solo"] },
  ]},
  { id: 9, question: "Your travel soundtrack", subtitle: "What plays in your earphones?", options: [
    { id: "9a", label: "Local Music", sublabel: "Discover culture through sound", colors: ["#92400E", "#F59E0B"], iconName: "music.note.list", tags: ["culture", "social", "spontaneous"] },
    { id: "9b", label: "Podcasts", sublabel: "Learn while you explore", colors: ["#6443F4", "#6366F1"], iconName: "mic.fill", tags: ["solo", "planned", "culture"] },
    { id: "9c", label: "Pure Silence", sublabel: "Just the sounds of the place", colors: ["#02A65C", "#02A65C"], iconName: "waveform", tags: ["nature", "solo", "relax"] },
    { id: "9d", label: "Party Playlist", sublabel: "Energy up, always", colors: ["#6B21A8", "#F94498"], iconName: "headphones", tags: ["social", "urban", "spontaneous"] },
  ]},
  { id: 10, question: "Your travel philosophy", subtitle: "Which one is you?", options: [
    { id: "10a", label: "Plan Everything", sublabel: "Spreadsheet, bookings, itinerary", colors: ["#1E40AF", "#3B82F6"], iconName: "list.bullet.clipboard.fill", tags: ["planned", "luxury", "solo"] },
    { id: "10b", label: "Go with the Flow", sublabel: "One bag, no agenda", colors: ["#B45309", "#F59E0B"], iconName: "wind", tags: ["spontaneous", "adventure", "social"] },
    { id: "10c", label: "Deep Dive", sublabel: "One place, really know it", colors: ["#02A65C", "#059669"], iconName: "magnifyingglass", tags: ["culture", "solo", "planned"] },
    { id: "10d", label: "Collect Countries", sublabel: "Passport stamps > everything", colors: ["#6443F4", "#C084FC"], iconName: "globe", tags: ["adventure", "spontaneous", "social"] },
  ]},
];

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

export default function QuizScreen() {
  const { dispatch } = useStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [dnaProfile, setDnaProfile] = useState(DNA_PROFILES.default);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(1)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const safeQ = Math.max(0, Math.min(Number.isFinite(currentQ) ? currentQ : 0, QUESTIONS.length - 1));
  const question = QUESTIONS[safeQ];
  const progress = Math.min(safeQ, QUESTIONS.length) / QUESTIONS.length;

  useEffect(() => {
    Animated.timing(progressAnim, { toValue: progress, duration: 400, useNativeDriver: false }).start();
  }, [currentQ]);

  const handleSelect = (option: QuizOption) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
        setShowResult(true);
        if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Animated.spring(resultAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }).start();
      }
    }, 250);
  };

  const handleFinish = () => {
    dispatch({ type: "UPDATE_PROFILE", payload: { travelerDNA: { type: dnaProfile.title, ...Object.fromEntries(Object.keys(tagCounts).map((t) => [t, "1"])) }, quizCompleted: true } });
    dispatch({ type: "ADD_POINTS", payload: { amount: 250, description: "Completed Traveler DNA Quiz" } });
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });
    router.replace("/(tabs)/" as never);
  };

  if (!question) return null;

  if (showResult) {
    return (
      <View style={S.container}>
        <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={S.orb1} />
        <Animated.ScrollView
          contentContainerStyle={S.resultScroll}
          showsVerticalScrollIndicator={false}
          style={{ opacity: resultAnim, transform: [{ scale: resultAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] }}
        >
          <View style={S.resultBadgeWrap}>
            <LinearGradient colors={dnaProfile.colors} style={S.resultBadge}>
              <IconSymbol name={dnaProfile.iconName} size={48} color="rgba(255,255,255,0.95)" />
            </LinearGradient>
            <View style={[S.resultRing, { borderColor: dnaProfile.colors[1] + "55" }]} />
            <View style={[S.resultRing2, { borderColor: dnaProfile.colors[1] + "22" }]} />
          </View>
          <Text style={S.resultLabel}>YOUR TRAVELER DNA</Text>
          <Text style={S.resultType}>{dnaProfile.title}</Text>
          <Text style={S.resultDesc}>{dnaProfile.description}</Text>
          <View style={S.destSection}>
            <Text style={S.destSectionLabel}>Perfect destinations for you</Text>
            {dnaProfile.destinations.map((dest, i) => (
              <TouchableOpacity key={i} style={S.destCard} activeOpacity={0.85}
                onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}>
                {/* Destination photo background */}
                <Image source={dest.image} style={S.destCardImg} resizeMode="cover" />
                <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.65)"]} style={StyleSheet.absoluteFillObject} />
                <View style={S.destNum}><Text style={S.destNumText}>{i + 1}</Text></View>
                <Text style={S.destText}>{dest.name}</Text>
                <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.7)" />
              </TouchableOpacity>
            ))}
          </View>
          <View style={S.tagsWrap}>
            {Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([tag]) => (
              <View key={tag} style={S.tagChip}>
                <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.2)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                <Text style={S.tagText}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</Text>
              </View>
            ))}
          </View>
          <View style={S.pointsCard}>
            <LinearGradient colors={["rgba(255,215,0,0.2)", "rgba(255,149,0,0.1)"]} style={StyleSheet.absoluteFillObject} />
            <View style={S.pointsIconWrap}>
              <IconSymbol name="star.fill" size={24} color="#FFD700" />
            </View>
            <View>
              <Text style={S.pointsTitle}>+250 TRAVI Points earned!</Text>
              <Text style={S.pointsSub}>For completing your Traveler DNA quiz</Text>
            </View>
          </View>
          <TouchableOpacity style={S.ctaBtn} onPress={handleFinish} activeOpacity={0.88}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.ctaGradient}>
              <Text style={S.ctaText}>Start Exploring</Text>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.ScrollView>
      </View>
    );
  }

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />
      <View style={S.header}>
        <TouchableOpacity style={S.skipBtn} onPress={handleFinish} activeOpacity={0.7}>
          <Text style={S.skipText}>Skip</Text>
        </TouchableOpacity>
        <View style={S.progressTrack}>
          <Animated.View style={[S.progressFill, { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          </Animated.View>
        </View>
        <Text style={S.progressText}>{currentQ + 1}/{QUESTIONS.length}</Text>
      </View>
      <Animated.View style={[S.questionBlock, { opacity: cardAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={S.duckRow}>
          <View style={S.duckAvatar}>
            <LinearGradient colors={["#6443F4", "#F94498"]} style={S.duckGradient}>
              <Image source={require("@/assets/logos/mascot-dark.png")} style={S.duckImg} resizeMode="contain" />
            </LinearGradient>
          </View>
          <View style={S.duckBubble}>
            <LinearGradient colors={["rgba(123,47,190,0.35)", "rgba(233,30,140,0.2)"]} style={S.duckBubbleGradient}>
              <Text style={S.duckBubbleText}>Question {currentQ + 1} of {QUESTIONS.length}</Text>
            </LinearGradient>
          </View>
        </View>
        <Text style={S.questionText}>{question.question}</Text>
        <Text style={S.questionSubtitle}>{question.subtitle}</Text>
      </Animated.View>
      <Animated.View style={[S.optionsGrid, { opacity: cardAnim }]}>
        {question.options.map((option) => {
          const isSelected = selected[currentQ] === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              style={[S.optionCard, isSelected && S.optionCardSelected]}
              onPress={() => handleSelect(option)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={option.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
              {/* Ghost watermark icon */}
              <View style={S.ghostIconWrap} pointerEvents="none">
                <IconSymbol name={option.iconName as never} size={90} color="rgba(255,255,255,0.10)" />
              </View>
              {isSelected && <View style={S.selectedOverlay} />}
              <View style={S.optionIconWrap}>
                <IconSymbol name={option.iconName as never} size={26} color="rgba(255,255,255,0.9)" />
              </View>
              <Text style={S.optionLabel}>{option.label}</Text>
              <Text style={S.optionSublabel} numberOfLines={2}>{option.sublabel}</Text>
              {isSelected && (
                <View style={S.checkBadge}>
                  <IconSymbol name="checkmark" size={10} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      {/* Bottom hint */}
      <Animated.View style={[S.bottomHint, { opacity: cardAnim }]}>
        <View style={S.hintDots}>
          {QUESTIONS.map((_, i) => (
            <View key={i} style={[S.hintDot, i === currentQ && S.hintDotActive, i < currentQ && S.hintDotDone]} />
          ))}
        </View>
        <Text style={S.hintText}>
          {QUESTIONS.length - currentQ - 1 > 0
            ? `${QUESTIONS.length - currentQ - 1} more question${QUESTIONS.length - currentQ - 1 > 1 ? "s" : ""} to reveal your DNA`
            : "Last one — make it count ✨"}
        </Text>
      </Animated.View>
    </View>
  );
}

const CARD_W = (width - 44) / 2;
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width * 1.4, height: width * 1.4, borderRadius: width * 0.7, top: -width * 0.5, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.1)" },
  orb2: { position: "absolute", width: width, height: width, borderRadius: width / 2, bottom: -width * 0.3, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, gap: 12 },
  skipBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.08)" },
  skipText: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: "600" },
  progressTrack: { flex: 1, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  progressText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700", minWidth: 32, textAlign: "right" },
  questionBlock: { paddingHorizontal: 24, paddingBottom: 16, gap: 8 },
  duckRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  duckAvatar: { width: 36, height: 36, borderRadius: 18, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckImg: { width: 26, height: 26 },
  duckBubble: { borderRadius: 14, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckBubbleText: { color: "rgba(192,132,252,0.9)", fontSize: 12, fontWeight: "700" },
  questionText: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", lineHeight: 30, letterSpacing: -0.5 },
  questionSubtitle: { color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 20 },
  optionsGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 12, paddingBottom: 8, alignContent: "flex-start" },
  optionCard: { width: CARD_W, height: CARD_W * 0.95, borderRadius: 22, overflow: "hidden", padding: 14, gap: 4, borderWidth: 2, borderColor: "transparent", justifyContent: "flex-end" },
  ghostIconWrap: { position: "absolute", bottom: -10, right: -10, opacity: 1 },
  optionCardSelected: { borderColor: "rgba(255,255,255,0.7)" },
  selectedOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.18)" },
  optionIconWrap: { width: 46, height: 46, borderRadius: 14, backgroundColor: "rgba(0,0,0,0.25)", alignItems: "center", justifyContent: "center", marginBottom: 6 },
  optionLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", lineHeight: 18 },
  optionSublabel: { color: "rgba(255,255,255,0.6)", fontSize: 11, lineHeight: 15 },
  checkBadge: { position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(255,255,255,0.3)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.9)" },
  resultScroll: { alignItems: "center", paddingTop: 80, paddingHorizontal: 24, paddingBottom: 60, gap: 20 },
  resultBadgeWrap: { position: "relative", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  resultBadge: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center" },
  resultIconWrap: { alignItems: "center", justifyContent: "center" },
  resultRing: { position: "absolute", width: 124, height: 124, borderRadius: 62, borderWidth: 2 },
  resultRing2: { position: "absolute", width: 148, height: 148, borderRadius: 74, borderWidth: 1.5 },
  resultLabel: { color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: "700", letterSpacing: 2.5, textTransform: "uppercase" },
  resultType: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", letterSpacing: -0.5, textAlign: "center" },
  resultDesc: { color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 24, textAlign: "center" },
  destSection: { width: "100%", gap: 8 },
  destSectionLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 },
  destCard: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 16, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  destCardImg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  destNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: "rgba(123,47,190,0.4)", alignItems: "center", justifyContent: "center" },
  destNumText: { color: "#C084FC", fontSize: 12, fontWeight: "800" },
  destText: { flex: 1, color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  tagsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" },
  tagChip: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  tagText: { color: "rgba(192,132,252,0.9)", fontSize: 13, fontWeight: "600" },
  pointsCard: { width: "100%", flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 18, overflow: "hidden", padding: 16, borderWidth: 1, borderColor: "rgba(255,215,0,0.2)" },
  pointsIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(255,215,0,0.15)", alignItems: "center", justifyContent: "center" },
  pointsTitle: { color: "#FFD700", fontSize: 15, fontWeight: "800" },
  pointsSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  ctaBtn: { width: "100%", borderRadius: 20, overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  // Bottom hint
  bottomHint: { alignItems: "center", paddingHorizontal: 24, paddingBottom: 28, paddingTop: 16, gap: 10 },
  hintDots: { flexDirection: "row", gap: 5, alignItems: "center" },
  hintDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: "rgba(255,255,255,0.15)" },
  hintDotActive: { width: 18, height: 5, borderRadius: 2.5, backgroundColor: "#6443F4" },
  hintDotDone: { backgroundColor: "rgba(100,67,244,0.4)" },
  hintText: { color: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: "500", textAlign: "center", letterSpacing: 0.2 },
});
