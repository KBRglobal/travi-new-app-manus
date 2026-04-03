/**
 * TRAVI — Restaurant Detail Screen
 * Full restaurant details: photos, menu highlights, reviews, reservation booking.
 */

import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
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

const RESTAURANTS: Record<string, {
  name: string; cuisine: string; location: string; city: string;
  image: string; priceRange: string; rating: number; reviewCount: number;
  cashback: number; color: string; openHours: string;
  highlights: string[];
  menuCategories: Array<{ name: string; items: Array<{ name: string; desc: string; price: number; emoji: string }> }>;
  reviews: Array<{ name: string; rating: number; comment: string; date: string }>;
  tags: string[];
}> = {
  "r1": {
    name: "Nobu Dubai", cuisine: "Japanese Fusion", location: "Atlantis The Palm", city: "Dubai",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    priceRange: "$$$", rating: 4.8, reviewCount: 3241, cashback: 15, color: "#E31837",
    openHours: "12:00 PM – 11:30 PM",
    highlights: ["Celebrity chef Nobu Matsuhisa", "Iconic black cod miso", "Beachfront location", "Dress code: Smart casual"],
    tags: ["Japanese", "Sushi", "Fine Dining", "Seafood", "Michelin"],
    menuCategories: [
      {
        name: "Signatures",
        items: [
          { name: "Black Cod Miso", desc: "Nobu's iconic dish — miso-marinated black cod", price: 68, emoji: "🐟" },
          { name: "Yellowtail Jalapeño", desc: "Sashimi with jalapeño, yuzu soy, cilantro", price: 42, emoji: "🌶️" },
          { name: "Rock Shrimp Tempura", desc: "Crispy shrimp with creamy spicy sauce", price: 38, emoji: "🦐" },
        ],
      },
      {
        name: "Sushi & Sashimi",
        items: [
          { name: "Omakase Platter", desc: "Chef's selection of 12 premium pieces", price: 95, emoji: "🍣" },
          { name: "Toro Sashimi", desc: "Premium fatty tuna, 5 pieces", price: 55, emoji: "🐠" },
          { name: "Dragon Roll", desc: "Shrimp tempura, avocado, eel sauce", price: 32, emoji: "🌀" },
        ],
      },
      {
        name: "Desserts",
        items: [
          { name: "Bento Box Dessert", desc: "Nobu's legendary dessert selection", price: 28, emoji: "🍮" },
          { name: "Yuzu Sorbet", desc: "Refreshing citrus sorbet with mochi", price: 18, emoji: "🍧" },
        ],
      },
    ],
    reviews: [
      { name: "Yael K.", rating: 5, comment: "The black cod miso is life-changing. Every bite is perfection. Worth every dirham.", date: "March 2025" },
      { name: "Oren M.", rating: 5, comment: "Best Japanese food outside Japan. The omakase was incredible.", date: "February 2025" },
      { name: "Dana S.", rating: 4, comment: "Amazing food and atmosphere. The beachfront setting makes it extra special.", date: "January 2025" },
    ],
  },
  "r2": {
    name: "Pierchic", cuisine: "Seafood", location: "Al Qasr Hotel", city: "Dubai",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    priceRange: "$$$$", rating: 4.7, reviewCount: 1892, cashback: 20, color: "#0EA5E9",
    openHours: "12:30 PM – 11:00 PM",
    highlights: ["Overwater restaurant on private pier", "Panoramic Arabian Gulf views", "Freshest seafood daily", "Romantic sunset dining"],
    tags: ["Seafood", "Romantic", "Fine Dining", "Waterfront"],
    menuCategories: [
      {
        name: "Starters",
        items: [
          { name: "Oysters Rockefeller", desc: "6 Gulf oysters with spinach, hollandaise", price: 55, emoji: "🦪" },
          { name: "Lobster Bisque", desc: "Rich cream soup with cognac and chives", price: 38, emoji: "🦞" },
        ],
      },
      {
        name: "Mains",
        items: [
          { name: "Whole Grilled Lobster", desc: "1.2kg fresh lobster, garlic butter, herbs", price: 195, emoji: "🦞" },
          { name: "Pan-Seared Halibut", desc: "Wild halibut, truffle risotto, asparagus", price: 125, emoji: "🐟" },
          { name: "Seafood Platter for 2", desc: "Lobster, king prawns, oysters, crab", price: 320, emoji: "🦐" },
        ],
      },
    ],
    reviews: [
      { name: "Sarah L.", rating: 5, comment: "Most romantic restaurant I've ever been to. The sunset over the Gulf is magical.", date: "March 2025" },
      { name: "Mike R.", rating: 4, comment: "Exceptional seafood and stunning views. Perfect for a special occasion.", date: "February 2025" },
    ],
  },
};

const TIME_SLOTS = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

export default function RestaurantDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ restaurantId?: string; destination?: string }>();
  const restaurantId = params.restaurantId ?? "r1";

  const restaurant = RESTAURANTS[restaurantId] ?? RESTAURANTS["r1"];
  const [activeTab, setActiveTab] = useState<"menu" | "reviews" | "reserve">("menu");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [partySize, setPartySize] = useState(2);
  const [reserved, setReserved] = useState(false);

  const handleReserve = () => {
    if (!selectedTime) return;
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setReserved(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Hero */}
      <View style={styles.heroWrap}>
        <Image source={{ uri: restaurant.image }} style={styles.heroImage} contentFit="cover" />
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <LinearGradient colors={["transparent", "rgba(13,6,40,0.95)"]} style={styles.heroOverlay} />
        <View style={styles.heroInfo}>
          <View style={styles.heroTagRow}>
            {restaurant.tags.slice(0, 3).map((tag) => (
              <View key={tag} style={[styles.heroTag, { backgroundColor: restaurant.color + "33" }]}>
                <Text style={[styles.heroTagText, { color: restaurant.color }]}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.heroName}>{restaurant.name}</Text>
          <Text style={styles.heroCuisine}>{restaurant.cuisine} · {restaurant.priceRange}</Text>
          <View style={styles.heroMetaRow}>
            <Text style={styles.heroRating}>⭐ {restaurant.rating}</Text>
            <Text style={styles.heroReviews}>({restaurant.reviewCount.toLocaleString()})</Text>
            <Text style={styles.heroDot}>·</Text>
            <Text style={styles.heroHours}>🕐 {restaurant.openHours}</Text>
          </View>
          <Text style={styles.heroLocation}>📍 {restaurant.location}, {restaurant.city}</Text>
        </View>
      </View>

      {/* Cashback badge */}
      <View style={styles.cashbackCard}>
        <LinearGradient colors={["rgba(34,197,94,0.15)", "rgba(34,197,94,0.05)"]} style={StyleSheet.absoluteFillObject} />
        <Text style={styles.cashbackEmoji}>💰</Text>
        <Text style={styles.cashbackText}>Earn ${restaurant.cashback} cashback on your reservation</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(["menu", "reviews", "reserve"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === "menu" ? "🍽️ Menu" : tab === "reviews" ? "⭐ Reviews" : "📅 Reserve"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── MENU TAB ── */}
        {activeTab === "menu" && (
          <>
            {/* Highlights */}
            <View style={styles.highlightsRow}>
              {restaurant.highlights.map((h, i) => (
                <View key={i} style={styles.highlightChip}>
                  <Text style={styles.highlightText}>✦ {h}</Text>
                </View>
              ))}
            </View>

            {restaurant.menuCategories.map((cat) => (
              <View key={cat.name} style={styles.menuCategory}>
                <Text style={styles.menuCategoryTitle}>{cat.name}</Text>
                {cat.items.map((item) => (
                  <View key={item.name} style={styles.menuItem}>
                    <Text style={styles.menuItemEmoji}>{item.emoji}</Text>
                    <View style={styles.menuItemInfo}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      <Text style={styles.menuItemDesc}>{item.desc}</Text>
                    </View>
                    <Text style={styles.menuItemPrice}>${item.price}</Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}

        {/* ── REVIEWS TAB ── */}
        {activeTab === "reviews" && (
          <>
            <View style={styles.ratingOverview}>
              <Text style={styles.ratingBig}>{restaurant.rating}</Text>
              <Text style={styles.ratingStars}>{"⭐".repeat(5)}</Text>
              <Text style={styles.ratingCount}>{restaurant.reviewCount.toLocaleString()} reviews</Text>
            </View>
            {restaurant.reviews.map((review, i) => (
              <View key={i} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{review.name[0]}</Text>
                  </View>
                  <View style={styles.reviewMeta}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <Text style={styles.reviewRating}>{"⭐".repeat(review.rating)}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </>
        )}

        {/* ── RESERVE TAB ── */}
        {activeTab === "reserve" && (
          <>
            {reserved ? (
              <View style={styles.reservedCard}>
                <Text style={styles.reservedEmoji}>🎉</Text>
                <Text style={styles.reservedTitle}>Reservation Confirmed!</Text>
                <Text style={styles.reservedSub}>Table for {partySize} at {selectedTime}</Text>
                <Text style={styles.reservedSub}>{restaurant.name} · {restaurant.city}</Text>
                <View style={styles.reservedCashback}>
                  <Text style={styles.reservedCashbackText}>💰 ${restaurant.cashback} cashback earned</Text>
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.reserveLabel}>Party Size</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.partySizeScroll} contentContainerStyle={styles.partySizeContent}>
                  {PARTY_SIZES.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[styles.partySizeChip, partySize === size && styles.partySizeChipActive]}
                      onPress={() => {
                        if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setPartySize(size);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.partySizeText, partySize === size && styles.partySizeTextActive]}>
                        {size === 1 ? "Solo" : `${size} guests`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={[styles.reserveLabel, { marginTop: 20 }]}>Available Times</Text>
                <View style={styles.timeSlotsGrid}>
                  {TIME_SLOTS.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[styles.timeSlot, selectedTime === time && { backgroundColor: restaurant.color + "33", borderColor: restaurant.color }]}
                      onPress={() => {
                        if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setSelectedTime(time);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.timeSlotText, selectedTime === time && { color: "#FFFFFF" }]}>{time}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.reserveBtn, !selectedTime && { opacity: 0.4 }]}
                  onPress={handleReserve}
                  activeOpacity={0.85}
                  disabled={!selectedTime}
                >
                  <LinearGradient
                    colors={[restaurant.color, restaurant.color + "BB"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.reserveBtnGrad}
                  >
                    <Text style={styles.reserveBtnText}>
                      {selectedTime ? `Reserve Table for ${partySize} at ${selectedTime}` : "Select a Time"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  heroWrap: { position: "relative", height: 280 },
  heroImage: { width, height: 280 },
  backBtn: { position: "absolute", top: 16, left: 16, zIndex: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: 180 },
  heroInfo: { position: "absolute", bottom: 16, left: 20, right: 20, gap: 4 },
  heroTagRow: { flexDirection: "row", gap: 6, marginBottom: 4 },
  heroTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  heroTagText: { fontSize: 11, fontWeight: "800" },
  heroName: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  heroCuisine: { color: "rgba(255,255,255,0.7)", fontSize: 13 },
  heroMetaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  heroRating: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  heroReviews: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  heroDot: { color: "rgba(255,255,255,0.3)", fontSize: 12 },
  heroHours: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  heroLocation: { color: "rgba(255,255,255,0.55)", fontSize: 12 },
  cashbackCard: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 20, marginTop: 12, borderRadius: 14, overflow: "hidden", padding: 12, borderWidth: 1, borderColor: "rgba(34,197,94,0.2)" },
  cashbackEmoji: { fontSize: 22 },
  cashbackText: { color: "#22C55E", fontSize: 13, fontWeight: "700", flex: 1 },
  tabs: { flexDirection: "row", marginHorizontal: 20, marginTop: 12, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 4 },
  tab: { flex: 1, paddingVertical: 9, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "rgba(100,67,244,0.3)" },
  tabText: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "700" },
  tabTextActive: { color: "#FFFFFF" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  highlightsRow: { gap: 8, marginBottom: 20 },
  highlightChip: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  highlightText: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
  menuCategory: { marginBottom: 20 },
  menuCategoryTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", marginBottom: 10, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.08)" },
  menuItem: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  menuItemEmoji: { fontSize: 24, marginTop: 2 },
  menuItemInfo: { flex: 1 },
  menuItemName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  menuItemDesc: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2, lineHeight: 16 },
  menuItemPrice: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  ratingOverview: { alignItems: "center", paddingVertical: 20, gap: 4 },
  ratingBig: { color: "#FFFFFF", fontSize: 48, fontWeight: "900" },
  ratingStars: { fontSize: 20 },
  ratingCount: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  reviewCard: { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  reviewAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(100,67,244,0.3)", alignItems: "center", justifyContent: "center" },
  reviewAvatarText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  reviewMeta: { flex: 1 },
  reviewName: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  reviewDate: { color: "rgba(255,255,255,0.4)", fontSize: 11 },
  reviewRating: { fontSize: 12 },
  reviewComment: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 20 },
  reserveLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", marginBottom: 12 },
  partySizeScroll: { marginBottom: 4 },
  partySizeContent: { gap: 8, paddingRight: 20 },
  partySizeChip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  partySizeChipActive: { backgroundColor: "rgba(100,67,244,0.3)", borderColor: "#6443F4" },
  partySizeText: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "700" },
  partySizeTextActive: { color: "#FFFFFF" },
  timeSlotsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  timeSlot: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)" },
  timeSlotText: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "700" },
  reserveBtn: { borderRadius: 18, overflow: "hidden" },
  reserveBtnGrad: { paddingVertical: 18, alignItems: "center" },
  reserveBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  reservedCard: { alignItems: "center", paddingVertical: 40, gap: 10 },
  reservedEmoji: { fontSize: 56 },
  reservedTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  reservedSub: { color: "rgba(255,255,255,0.6)", fontSize: 14 },
  reservedCashback: { marginTop: 12, backgroundColor: "rgba(34,197,94,0.15)", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  reservedCashbackText: { color: "#22C55E", fontSize: 14, fontWeight: "800" },
});
