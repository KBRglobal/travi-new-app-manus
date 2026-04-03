/**
 * TRAVI — Hotel Detail Screen
 * Full hotel details: photos, amenities, room types, reviews, map, cashback, booking.
 */

import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const HOTELS: Record<string, {
  name: string; stars: number; location: string; city: string;
  image: string; images: string[];
  pricePerNight: number; cashback: number; color: string;
  rating: number; reviewCount: number;
  amenities: string[];
  rooms: Array<{ name: string; price: number; size: string; beds: string; perks: string[] }>;
  reviews: Array<{ name: string; rating: number; comment: string; date: string }>;
  highlights: string[];
}> = {
  "h1": {
    name: "Burj Al Arab", stars: 7, location: "Jumeirah Beach", city: "Dubai",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    ],
    pricePerNight: 1200, cashback: 120, color: "#D97706",
    rating: 4.9, reviewCount: 2847,
    amenities: ["🏊 Private Beach", "🍽️ 9 Restaurants", "🧖 Spa & Wellness", "🏋️ Gym", "🚗 Valet Parking", "🛎️ 24/7 Butler", "🌊 Infinity Pool", "🎾 Tennis Courts"],
    rooms: [
      { name: "Deluxe Suite", price: 1200, size: "170 m²", beds: "King bed", perks: ["Sea view", "Butler service", "Breakfast included"] },
      { name: "Panoramic Suite", price: 2400, size: "280 m²", beds: "King + sofa bed", perks: ["360° views", "Private dining", "Spa access"] },
      { name: "Royal Suite", price: 5500, size: "780 m²", beds: "King + 2 bedrooms", perks: ["Duplex", "Private cinema", "Rolls Royce transfer"] },
    ],
    reviews: [
      { name: "Yael K.", rating: 5, comment: "Absolutely breathtaking. The butler service is unmatched and the views are out of this world.", date: "March 2025" },
      { name: "Oren M.", rating: 5, comment: "Worth every penny. The breakfast spread alone is worth the stay.", date: "February 2025" },
      { name: "Sarah L.", rating: 4, comment: "Incredible hotel, though the price is steep. Perfect for a special occasion.", date: "January 2025" },
    ],
    highlights: ["Iconic sail-shaped architecture", "World's only 7-star hotel", "Helipad on the 28th floor", "Underwater restaurant"],
  },
  "h2": {
    name: "Atlantis The Palm", stars: 5, location: "Palm Jumeirah", city: "Dubai",
    image: "https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],
    pricePerNight: 650, cashback: 65, color: "#0EA5E9",
    rating: 4.7, reviewCount: 5621,
    amenities: ["🌊 Aquaventure Waterpark", "🦈 Aquarium", "🏊 Private Beach", "🍽️ 23 Restaurants", "🧖 Spa", "🏋️ Gym"],
    rooms: [
      { name: "Deluxe Room", price: 650, size: "50 m²", beds: "King bed", perks: ["Garden view", "Breakfast included"] },
      { name: "Ocean Suite", price: 1200, size: "110 m²", beds: "King bed", perks: ["Ocean view", "Lounge access", "Waterpark included"] },
    ],
    reviews: [
      { name: "Mike R.", rating: 5, comment: "The waterpark is incredible! Kids loved every minute. Great family hotel.", date: "March 2025" },
      { name: "Dana S.", rating: 4, comment: "Amazing facilities. The aquarium walk-through is a must-do.", date: "February 2025" },
    ],
    highlights: ["Aquaventure Waterpark included", "Private beach access", "Underwater suites available", "Celebrity chef restaurants"],
  },
};

export default function HotelDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ hotelId?: string; tripId?: string; nights?: string }>();
  const hotelId = params.hotelId ?? "h1";
  const tripId = params.tripId;
  const nights = parseInt(params.nights ?? "5", 10);

  const hotel = HOTELS[hotelId] ?? HOTELS["h1"];
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [booked, setBooked] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const selectedRoomData = hotel.rooms[selectedRoom];
  const totalPrice = selectedRoomData.price * nights;
  const totalCashback = Math.round(totalPrice * 0.1);

  const handleBook = () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setBooked(true);
    setTimeout(() => {
      router.push({ pathname: "/(trip)/summary", params: { tripId } } as never);
    }, 1200);
  };

  const stars = hotel.stars <= 5 ? "⭐".repeat(hotel.stars) : "⭐⭐⭐⭐⭐✨✨";

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image carousel */}
        <View style={styles.heroWrap}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
              listener: (e: any) => setActiveImageIdx(Math.round(e.nativeEvent.contentOffset.x / width)),
            })}
            scrollEventThrottle={16}
          >
            {hotel.images.map((img, i) => (
              <Image key={i} source={{ uri: img }} style={styles.heroImage} contentFit="cover" />
            ))}
          </ScrollView>
          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { top: 16, left: 16 }]} activeOpacity={0.7}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          {/* Image dots */}
          <View style={styles.imageDots}>
            {hotel.images.map((_, i) => (
              <View key={i} style={[styles.imageDot, i === activeImageIdx && styles.imageDotActive]} />
            ))}
          </View>
          {/* Gradient overlay */}
          <LinearGradient colors={["transparent", "rgba(13,6,40,0.9)"]} style={styles.heroOverlay} />
          {/* Hotel info overlay */}
          <View style={styles.heroInfo}>
            <Text style={styles.heroStars}>{stars}</Text>
            <Text style={styles.heroName}>{hotel.name}</Text>
            <Text style={styles.heroLocation}>📍 {hotel.location}, {hotel.city}</Text>
            <View style={styles.heroRatingRow}>
              <Text style={styles.heroRating}>⭐ {hotel.rating}</Text>
              <Text style={styles.heroReviews}>({hotel.reviewCount.toLocaleString()} reviews)</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Cashback badge */}
          <View style={styles.cashbackCard}>
            <LinearGradient colors={["rgba(34,197,94,0.15)", "rgba(34,197,94,0.05)"]} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.cashbackEmoji}>💰</Text>
            <View style={styles.cashbackInfo}>
              <Text style={styles.cashbackTitle}>Earn ${hotel.cashback}/night Cashback</Text>
              <Text style={styles.cashbackSub}>10% of your stay goes back to your TRAVI wallet</Text>
            </View>
          </View>

          {/* Highlights */}
          <Text style={styles.sectionTitle}>Why Stay Here</Text>
          <View style={styles.highlightsGrid}>
            {hotel.highlights.map((h, i) => (
              <View key={i} style={styles.highlightChip}>
                <Text style={styles.highlightText}>✦ {h}</Text>
              </View>
            ))}
          </View>

          {/* Amenities */}
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {hotel.amenities.map((a, i) => (
              <View key={i} style={styles.amenityChip}>
                <Text style={styles.amenityText}>{a}</Text>
              </View>
            ))}
          </View>

          {/* Room selector */}
          <Text style={styles.sectionTitle}>Choose Your Room</Text>
          {hotel.rooms.map((room, i) => (
            <TouchableOpacity
              key={room.name}
              style={[styles.roomCard, selectedRoom === i && { borderColor: hotel.color, backgroundColor: hotel.color + "15" }]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedRoom(i);
              }}
              activeOpacity={0.8}
            >
              <View style={styles.roomHeader}>
                <View style={styles.roomTitleWrap}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.roomSize}>{room.size} · {room.beds}</Text>
                </View>
                <View style={styles.roomPriceWrap}>
                  <Text style={[styles.roomPrice, { color: selectedRoom === i ? hotel.color : "#FFFFFF" }]}>${room.price}</Text>
                  <Text style={styles.roomPriceNight}>/night</Text>
                </View>
              </View>
              <View style={styles.roomPerks}>
                {room.perks.map((perk, j) => (
                  <View key={j} style={styles.perkChip}>
                    <Text style={styles.perkText}>✓ {perk}</Text>
                  </View>
                ))}
              </View>
              {selectedRoom === i && (
                <View style={[styles.selectedBadge, { backgroundColor: hotel.color }]}>
                  <Text style={styles.selectedBadgeText}>Selected</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* Reviews */}
          <Text style={styles.sectionTitle}>Guest Reviews</Text>
          {hotel.reviews.map((review, i) => (
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

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Booking bar */}
      <View style={[styles.bookingBar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.bookingPrice}>
          <Text style={styles.bookingPriceLabel}>{nights} nights total</Text>
          <Text style={styles.bookingPriceAmount}>${totalPrice.toLocaleString()}</Text>
          <Text style={styles.bookingCashback}>+${totalCashback} cashback</Text>
        </View>
        <TouchableOpacity
          style={[styles.bookBtn, booked && styles.bookBtnDone]}
          onPress={handleBook}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={booked ? ["#22C55E", "#16A34A"] : [hotel.color, hotel.color + "BB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bookBtnGrad}
          >
            <Text style={styles.bookBtnText}>{booked ? "✓ Booked!" : "Reserve Room"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  heroWrap: { position: "relative", height: 300 },
  heroImage: { width, height: 300 },
  backBtn: { position: "absolute", zIndex: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  imageDots: { position: "absolute", bottom: 80, left: 0, right: 0, flexDirection: "row", justifyContent: "center", gap: 6 },
  imageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.5)" },
  imageDotActive: { backgroundColor: "#FFFFFF", width: 18 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: 160 },
  heroInfo: { position: "absolute", bottom: 16, left: 20, right: 20, gap: 4 },
  heroStars: { fontSize: 14 },
  heroName: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", fontFamily: "Chillax-Bold" },
  heroLocation: { color: "rgba(255,255,255,0.7)", fontSize: 13 },
  heroRatingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  heroRating: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  heroReviews: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  cashbackCard: { borderRadius: 16, overflow: "hidden", padding: 14, flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20, borderWidth: 1, borderColor: "rgba(34,197,94,0.2)" },
  cashbackEmoji: { fontSize: 28 },
  cashbackInfo: { flex: 1 },
  cashbackTitle: { color: "#22C55E", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  cashbackSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  sectionTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", marginBottom: 12, marginTop: 4, fontFamily: "Chillax-Bold" },
  highlightsGrid: { gap: 8, marginBottom: 20 },
  highlightChip: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  highlightText: { color: "rgba(255,255,255,0.8)", fontSize: 13 },
  amenitiesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  amenityChip: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  amenityText: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
  roomCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", position: "relative" },
  roomHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  roomTitleWrap: { flex: 1 },
  roomName: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  roomSize: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  roomPriceWrap: { alignItems: "flex-end" },
  roomPrice: { fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  roomPriceNight: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  roomPerks: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  perkChip: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  perkText: { color: "rgba(255,255,255,0.65)", fontSize: 11 },
  selectedBadge: { position: "absolute", top: 12, right: 12, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  selectedBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
  reviewCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  reviewAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(100,67,244,0.3)", alignItems: "center", justifyContent: "center" },
  reviewAvatarText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  reviewMeta: { flex: 1 },
  reviewName: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  reviewDate: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  reviewRating: { fontSize: 12 },
  reviewComment: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 20 },
  bookingBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(13,6,40,0.95)", paddingHorizontal: 20, paddingTop: 14, flexDirection: "row", alignItems: "center", gap: 14, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)" },
  bookingPrice: { flex: 1 },
  bookingPriceLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  bookingPriceAmount: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", fontFamily: "Chillax-Bold" },
  bookingCashback: { color: "#22C55E", fontSize: 12, fontWeight: "700" },
  bookBtn: { flex: 1.5, borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  bookBtnDone: {},
  bookBtnGrad: { paddingVertical: 16, alignItems: "center" },
  bookBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
