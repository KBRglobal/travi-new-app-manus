/**
 * Destination Detail — Immersive casino-style UI
 * Hero slideshow, personality match, neighborhoods, experiences+prices+cashback, food, hidden gems
 */

import { useState, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Animated, Image, FlatList, Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";

const { width, height } = Dimensions.get("window");

// ── Data ──────────────────────────────────────────────────────────────────────

const DESTINATIONS: Record<string, any> = {
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "Where luxury meets the desert",
    match: 98,
    dnaType: "The Luxury Connoisseur",
    hero: [
      require("@/assets/destinations/dubai.jpg"),
      require("@/assets/destinations/dubai.jpg"),
      require("@/assets/destinations/dubai.jpg"),
    ],
    neighborhoods: [
      { id: "n1", name: "Downtown", desc: "Burj Khalifa & Dubai Mall", match: 99, image: require("@/assets/destinations/dubai.jpg") },
      { id: "n2", name: "Dubai Marina", desc: "Waterfront luxury living", match: 96, image: require("@/assets/destinations/dubai.jpg") },
      { id: "n3", name: "Old Dubai", desc: "Souks & heritage", match: 88, image: require("@/assets/destinations/dubai.jpg") },
    ],
    experiences: [
      { id: "e1", title: "Burj Khalifa — At the Top", desc: "Floor 148 ticket. Arrive 15 min early.", price: 400, cashback: 32, rating: 4.9, reviews: 52000, image: require("@/assets/destinations/dubai.jpg"), url: "https://www.burjkhalifa.ae" },
      { id: "e2", title: "Desert Safari with BBQ", desc: "Dune bashing, camel ride, dinner", price: 120, cashback: 10, rating: 4.8, reviews: 18000, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
      { id: "e3", title: "Dubai Aquarium & Underwater Zoo", desc: "Walk-through tunnel experience", price: 85, cashback: 7, rating: 4.7, reviews: 9500, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
    ],
    food: [
      { id: "f1", name: "Pierchic", cuisine: "Seafood", price: "$$$", match: 97, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
      { id: "f2", name: "Al Hadheerah", cuisine: "Arabic", price: "$$", match: 94, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
      { id: "f3", name: "Zuma", cuisine: "Japanese", price: "$$$", match: 92, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
    ],
    hiddenGems: [
      { id: "h1", title: "Alserkal Avenue", desc: "Art galleries & indie cafes", image: require("@/assets/destinations/dubai.jpg") },
      { id: "h2", title: "La Mer Beach", desc: "Trendy beachfront district", image: require("@/assets/destinations/dubai.jpg") },
    ],
  },
  santorini: {
    name: "Santorini",
    country: "Greece",
    tagline: "Where sunsets stop time",
    match: 95,
    dnaType: "The Culture Vulture",
    hero: [
      require("@/assets/destinations/santorini.jpg"),
      require("@/assets/destinations/santorini.jpg"),
      require("@/assets/destinations/santorini.jpg"),
    ],
    neighborhoods: [
      { id: "n1", name: "Oia", desc: "Iconic sunset views", match: 98, image: require("@/assets/destinations/santorini.jpg") },
      { id: "n2", name: "Fira", desc: "Cliffside capital", match: 94, image: require("@/assets/destinations/santorini.jpg") },
      { id: "n3", name: "Akrotiri", desc: "Ancient ruins", match: 90, image: require("@/assets/destinations/santorini.jpg") },
    ],
    experiences: [
      { id: "e1", title: "Sunset Sailing Cruise", desc: "Catamaran tour with dinner", price: 180, cashback: 14, rating: 4.9, reviews: 3200, image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com" },
      { id: "e2", title: "Wine Tasting Tour", desc: "Visit 3 wineries", price: 95, cashback: 8, rating: 4.8, reviews: 1800, image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com" },
      { id: "e3", title: "Volcano Hike", desc: "Guided hike to Nea Kameni", price: 65, cashback: 5, rating: 4.7, reviews: 950, image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com" },
    ],
    food: [
      { id: "f1", name: "Ambrosia", cuisine: "Greek", price: "$$$", match: 96, image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com" },
      { id: "f2", name: "Metaxi Mas", cuisine: "Taverna", price: "$$", match: 93, image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com" },
    ],
    hiddenGems: [
      { id: "h1", title: "Red Beach", desc: "Dramatic volcanic sand", image: require("@/assets/destinations/santorini.jpg") },
      { id: "h2", title: "Pyrgos Village", desc: "Quiet hilltop charm", image: require("@/assets/destinations/santorini.jpg") },
    ],
  },
  // Add more destinations as needed
};

// ── Main screen ───────────────────────────────────────────────────────────────
export default function DestinationDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string }>();
  const destId = params.id ?? "dubai";
  const dest = DESTINATIONS[destId] ?? DESTINATIONS.dubai;

  const [heroIndex, setHeroIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleBack = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handlePlanTrip = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: "/(trip)/plan", params: { destination: dest.name } } as never);
  };

  const handleMoreInfo = async (url: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await WebBrowser.openBrowserAsync(url);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Hero slideshow */}
      <View style={S.heroWrap}>
        <FlatList
          data={dest.hero}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setHeroIndex(index);
          }}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={S.heroImage} resizeMode="cover" />
          )}
        />
        <LinearGradient colors={["transparent", "rgba(13,6,40,0.95)"]} locations={[0.5, 1]} style={S.heroGradient} />

        {/* Hero dots */}
        <View style={S.heroDots}>
          {dest.hero.map((_: any, i: number) => (
            <View key={i} style={[S.heroDot, i === heroIndex && S.heroDotActive]} />
          ))}
        </View>

        {/* Header (fades in on scroll) */}
        <Animated.View style={[S.header, { opacity: headerOpacity, paddingTop: insets.top + 8 }]}>
          <LinearGradient colors={["rgba(13,6,40,0.98)", "rgba(13,6,40,0.85)"]} style={StyleSheet.absoluteFillObject} />
          <TouchableOpacity style={S.backBtn} onPress={handleBack} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={S.headerTitle}>{dest.name}</Text>
          <View style={{ width: 40 }} />
        </Animated.View>

        {/* Floating back button */}
        <TouchableOpacity style={[S.floatingBack, { top: insets.top + 8 }]} onPress={handleBack} activeOpacity={0.8}>
          <LinearGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.2)"]} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Title card */}
        <View style={S.titleCard}>
          <Text style={S.destName}>{dest.name}</Text>
          <Text style={S.destCountry}>{dest.country}</Text>
          <Text style={S.destTagline}>{dest.tagline}</Text>

          {/* Match badge */}
          <View style={S.matchCard}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <View style={S.matchOrb1} />
            <View style={S.matchOrb2} />
            <Text style={S.matchPercent}>{dest.match}%</Text>
            <Text style={S.matchLabel}>Perfect match for</Text>
            <Text style={S.matchDna}>{dest.dnaType}</Text>
          </View>
        </View>

        {/* Neighborhoods */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Neighborhoods</Text>
          <FlatList
            data={dest.neighborhoods}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={S.neighborhoodCard} activeOpacity={0.88}>
                <Image source={item.image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]} locations={[0.4, 1]} style={StyleSheet.absoluteFillObject} />
                <View style={S.neighborhoodBadge}>
                  <Text style={S.neighborhoodMatch}>{item.match}% match</Text>
                </View>
                <View style={S.neighborhoodBottom}>
                  <Text style={S.neighborhoodName}>{item.name}</Text>
                  <Text style={S.neighborhoodDesc}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Top Experiences */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Top Experiences</Text>
          {dest.experiences.map((exp: any) => (
            <View key={exp.id} style={S.expCard}>
              <Image source={exp.image} style={S.expImage} resizeMode="cover" />
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} locations={[0.5, 1]} style={S.expImageGradient} />
              <View style={S.expImageCounter}>
                <IconSymbol name="paperplane.fill" size={14} color="#FFFFFF" />
                <Text style={S.expImageCounterText}>1 / 11</Text>
              </View>

              <View style={S.expContent}>
                <Text style={S.expTitle}>{exp.title}</Text>
                <View style={S.expRating}>
                  <Text style={S.expRatingText}>⭐ {exp.rating}</Text>
                  <Text style={S.expReviews}>({exp.reviews.toLocaleString()} reviews)</Text>
                </View>

                <View style={S.expPricing}>
                  <View>
                    <Text style={S.expPriceLabel}>Price from</Text>
                    <Text style={S.expPrice}>${exp.price}</Text>
                  </View>
                  <View style={S.expCashback}>
                    <IconSymbol name="star.fill" size={16} color="#FFD700" />
                    <Text style={S.expCashbackText}>${exp.cashback} back</Text>
                  </View>
                </View>

                <View style={S.expDetails}>
                  <View style={S.expDetailRow}>
                    <IconSymbol name="checkmark" size={14} color="rgba(255,255,255,0.5)" />
                    <Text style={S.expDetailText}>{exp.desc}</Text>
                  </View>
                </View>

                <TouchableOpacity style={S.expMoreBtn} onPress={() => handleMoreInfo(exp.url)} activeOpacity={0.8}>
                  <Text style={S.expMoreText}>More Info</Text>
                  <IconSymbol name="chevron.right" size={14} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Food & Drink */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Food & Drink</Text>
          {dest.food.map((f: any) => (
            <TouchableOpacity key={f.id} style={S.foodCard} onPress={() => handleMoreInfo(f.url)} activeOpacity={0.88}>
              <Image source={f.image} style={S.foodImage} resizeMode="cover" />
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} locations={[0.3, 1]} style={StyleSheet.absoluteFillObject} />
              <View style={S.foodContent}>
                <Text style={S.foodName}>{f.name}</Text>
                <View style={S.foodMeta}>
                  <Text style={S.foodCuisine}>{f.cuisine}</Text>
                  <Text style={S.foodPrice}>{f.price}</Text>
                  <Text style={S.foodMatch}>{f.match}% match</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hidden Gems */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Hidden Gems</Text>
          <Text style={S.sectionSub}>Locals' favorites</Text>
          {dest.hiddenGems.map((gem: any) => (
            <View key={gem.id} style={S.gemCard}>
              <Image source={gem.image} style={S.gemImage} resizeMode="cover" />
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} locations={[0.4, 1]} style={StyleSheet.absoluteFillObject} />
              <View style={S.gemContent}>
                <Text style={S.gemTitle}>{gem.title}</Text>
                <Text style={S.gemDesc}>{gem.desc}</Text>
              </View>
            </View>
          ))}
        </View>

      </Animated.ScrollView>

      {/* Floating CTA */}
      <View style={[S.floatingCta, { paddingBottom: insets.bottom + 12 }]}>
        <LinearGradient colors={["rgba(13,6,40,0)", "rgba(13,6,40,0.98)"]} locations={[0, 0.3]} style={S.floatingCtaGradient} />
        <TouchableOpacity style={S.planBtn} onPress={handlePlanTrip} activeOpacity={0.88}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <Text style={S.planBtnText}>Plan This Trip →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },

  heroWrap: { width, height: height * 0.5 },
  heroImage: { width, height: height * 0.5 },
  heroGradient: { position: "absolute", bottom: 0, left: 0, right: 0, height: 200 },
  heroDots: { position: "absolute", bottom: 20, left: 0, right: 0, flexDirection: "row", justifyContent: "center", gap: 6 },
  heroDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.3)" },
  heroDotActive: { width: 20, backgroundColor: "#FFFFFF" },

  header: { position: "absolute", top: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },

  floatingBack: { position: "absolute", left: 16, width: 40, height: 40, borderRadius: 20, overflow: "hidden", alignItems: "center", justifyContent: "center" },

  titleCard: { marginTop: -40, marginHorizontal: 20, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  destName: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", letterSpacing: -1 },
  destCountry: { color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 2 },
  destTagline: { color: "rgba(255,255,255,0.7)", fontSize: 15, fontStyle: "italic", marginTop: 8 },

  matchCard: { marginTop: 16, borderRadius: 18, overflow: "hidden", padding: 18, alignItems: "center" },
  matchOrb1: { position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.08)", top: -30, right: -20 },
  matchOrb2: { position: "absolute", width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.05)", bottom: -10, left: 10 },
  matchPercent: { color: "#FFFFFF", fontSize: 48, fontWeight: "900", letterSpacing: -2 },
  matchLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 },
  matchDna: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", marginTop: 2 },

  section: { marginTop: 28 },
  sectionTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", paddingHorizontal: 20, letterSpacing: -0.5 },
  sectionSub: { color: "rgba(255,255,255,0.4)", fontSize: 13, paddingHorizontal: 20, marginTop: 4, marginBottom: 12 },

  neighborhoodCard: { width: width * 0.42, height: 180, borderRadius: 18, overflow: "hidden", marginRight: 10, marginTop: 12 },
  neighborhoodBadge: { position: "absolute", top: 10, right: 10, backgroundColor: "rgba(100,67,244,0.9)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  neighborhoodMatch: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  neighborhoodBottom: { position: "absolute", bottom: 12, left: 12, right: 12 },
  neighborhoodName: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  neighborhoodDesc: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 },

  expCard: { marginHorizontal: 20, marginTop: 16, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  expImage: { width: "100%", height: 200 },
  expImageGradient: { position: "absolute", top: 0, left: 0, right: 0, height: 200 },
  expImageCounter: { position: "absolute", top: 12, right: 12, flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  expImageCounterText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  expContent: { padding: 16 },
  expTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", lineHeight: 22 },
  expRating: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  expRatingText: { color: "#FFD700", fontSize: 13, fontWeight: "700" },
  expReviews: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  expPricing: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.07)" },
  expPriceLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  expPrice: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", marginTop: 2 },
  expCashback: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,215,0,0.15)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
  expCashbackText: { color: "#FFD700", fontSize: 13, fontWeight: "800" },
  expDetails: { marginTop: 12, gap: 6 },
  expDetailRow: { flexDirection: "row", alignItems: "flex-start", gap: 6 },
  expDetailText: { color: "rgba(255,255,255,0.6)", fontSize: 13, flex: 1 },
  expMoreBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 12, paddingVertical: 10, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12 },
  expMoreText: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "700" },

  foodCard: { marginHorizontal: 20, marginTop: 12, height: 140, borderRadius: 18, overflow: "hidden" },
  foodImage: { width: "100%", height: "100%" },
  foodContent: { position: "absolute", bottom: 12, left: 12, right: 12 },
  foodName: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  foodMeta: { flexDirection: "row", gap: 10, marginTop: 4 },
  foodCuisine: { color: "rgba(255,255,255,0.7)", fontSize: 13 },
  foodPrice: { color: "rgba(255,255,255,0.7)", fontSize: 13 },
  foodMatch: { color: "#6443F4", fontSize: 13, fontWeight: "700" },

  gemCard: { marginHorizontal: 20, marginTop: 12, height: 120, borderRadius: 18, overflow: "hidden" },
  gemImage: { width: "100%", height: "100%" },
  gemContent: { position: "absolute", bottom: 12, left: 12, right: 12 },
  gemTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  gemDesc: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 },

  floatingCta: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 20 },
  floatingCtaGradient: { position: "absolute", top: 0, left: 0, right: 0, height: 60 },
  planBtn: { borderRadius: 20, overflow: "hidden", paddingVertical: 16, alignItems: "center" },
  planBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", letterSpacing: 0.5 },
});
