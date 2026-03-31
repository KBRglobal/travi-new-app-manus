import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Animated, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const MOCK_HOTELS = [
  { id: "h1", name: "The Grand Palace", stars: 5, area: "City Center", rating: 9.4, reviews: 2847, pricePerNight: 320, amenities: ["wifi", "pool", "spa", "gym"], tag: "Best Value" },
  { id: "h2", name: "Boutique Loft Hotel", stars: 4, area: "Arts District", rating: 9.1, reviews: 1203, pricePerNight: 185, amenities: ["wifi", "breakfast", "gym"], tag: "Highly Rated" },
  { id: "h3", name: "Urban Zen Suites", stars: 4, area: "Old Town", rating: 8.9, reviews: 876, pricePerNight: 145, amenities: ["wifi", "breakfast"], tag: null },
  { id: "h4", name: "Skyline Residences", stars: 5, area: "Business District", rating: 9.6, reviews: 4521, pricePerNight: 480, amenities: ["wifi", "pool", "spa", "gym", "restaurant"], tag: "Top Pick" },
  { id: "h5", name: "Cozy Corner Inn", stars: 3, area: "Local Quarter", rating: 8.5, reviews: 432, pricePerNight: 89, amenities: ["wifi", "breakfast"], tag: "Budget Friendly" },
  { id: "h6", name: "Harbor View Hotel", stars: 4, area: "Waterfront", rating: 9.2, reviews: 1876, pricePerNight: 220, amenities: ["wifi", "pool", "restaurant"], tag: null },
];

const AMENITY_ICONS: Record<string, "wifi" | "figure.pool.swim" | "figure.yoga" | "dumbbell.fill" | "fork.knife" | "cup.and.saucer.fill"> = {
  wifi: "wifi", pool: "figure.pool.swim", spa: "figure.yoga", gym: "dumbbell.fill", restaurant: "fork.knife", breakfast: "cup.and.saucer.fill",
};

function generateItinerary(tripId: string, destination: string, startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const templates = [
    { time: "09:00", title: "Morning Exploration", description: "Discover " + destination + " at your own pace", location: destination, price: 0, category: "activity" as const },
    { time: "12:00", title: "Local Lunch", description: "Authentic local cuisine at a top-rated restaurant", location: destination, price: 25, category: "food" as const },
    { time: "14:00", title: "Cultural Visit", description: "Museum or gallery showcasing local heritage", location: destination, price: 15, category: "activity" as const },
    { time: "17:00", title: "Sunset Viewpoint", description: "Best panoramic views of the city", location: destination, price: 0, category: "activity" as const },
    { time: "19:30", title: "Dinner", description: "Recommended restaurant with local specialties", location: destination, price: 45, category: "food" as const },
  ];
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    date: new Date(start.getTime() + i * 86400000).toISOString().split("T")[0],
    activities: templates.map((a) => ({ ...a, id: tripId + "-d" + (i + 1) + "-" + a.time, status: "pending" as const, completed: false })),
  }));
}

export default function HotelsScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state, dispatch } = useStore();
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const trip = state.trips.find((t) => t.id === tripId);

  useEffect(() => {
    const pulse = Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]));
    pulse.start();
    const timer = setTimeout(() => {
      pulse.stop();
      setLoading(false);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedHotel(id);
  };

  const handleNext = () => {
    if (!selectedHotel || !tripId) return;
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const hotel = MOCK_HOTELS.find((h) => h.id === selectedHotel);
    if (hotel && trip) {
      const itinerary = generateItinerary(tripId, trip.destination || "your destination", trip.startDate || new Date().toISOString(), trip.endDate || new Date(Date.now() + 7 * 86400000).toISOString());
      const hotelOption = { id: hotel.id, name: hotel.name, stars: hotel.stars, location: hotel.area, pricePerNight: hotel.pricePerNight, totalPrice: hotel.pricePerNight * 7, amenities: hotel.amenities, rating: hotel.rating };
      dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { hotel: hotelOption, totalCost: (trip.totalCost || 0) + hotel.pricePerNight * 7, itinerary } } });
    }
    router.push({ pathname: "/(trip)/summary", params: { tripId } } as never);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}><View style={[styles.progressFill, { width: "100%" }]} /></View>
            <Text style={styles.progressLabel}>5 of 5</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loadingWrap}>
          <Animated.View style={[styles.duckLarge, { opacity: pulseAnim }]}>
            <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.duckLargeGradient}>
              <Text style={styles.duckEmoji}>🦆</Text>
            </LinearGradient>
          </Animated.View>
          <Text style={styles.loadingTitle}>Finding hotels...</Text>
          <Text style={styles.loadingSubtitle}>{"Searching the best stays in " + (trip?.destination || "your destination")}</Text>
          <View style={styles.dotsRow}>
            {[0, 1, 2].map((i) => <Animated.View key={i} style={[styles.dot, { opacity: pulseAnim }]} />)}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: "100%" }]} /></View>
          <Text style={styles.progressLabel}>5 of 5</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.duckRow}>
        <View style={styles.duckAvatar}>
          <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.duckGradient}>
            <Text style={styles.duckEmojiSm}>🦆</Text>
          </LinearGradient>
        </View>
        <Animated.View style={[styles.duckBubble, { opacity: fadeAnim }]}>
          <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} style={styles.duckBubbleGradient}>
            <Text style={styles.duckMessage}>Almost there! Pick your hotel</Text>
            <Text style={styles.duckSub}>Handpicked for your style</Text>
          </LinearGradient>
        </Animated.View>
      </View>
      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        <FlatList
          data={MOCK_HOTELS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const isSelected = selectedHotel === item.id;
            return (
              <TouchableOpacity style={[styles.hotelCard, isSelected && styles.hotelCardSelected]} onPress={() => handleSelect(item.id)} activeOpacity={0.88}>
                <LinearGradient colors={isSelected ? ["rgba(123,47,190,0.35)", "rgba(233,30,140,0.2)"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.03)"]} style={StyleSheet.absoluteFillObject} />
                <View style={styles.hotelImageWrap}>
                  <LinearGradient colors={["#1A0A3D", "#2D1A5E"]} style={styles.hotelImage}>
                    <IconSymbol name="building.2.fill" size={32} color="rgba(192,132,252,0.4)" />
                  </LinearGradient>
                  {item.tag && (
                    <View style={styles.tagBadge}>
                      <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.tagGradient}>
                        <Text style={styles.tagText}>{item.tag}</Text>
                      </LinearGradient>
                    </View>
                  )}
                </View>
                <View style={styles.hotelInfo}>
                  <View style={styles.hotelTopRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.hotelName, isSelected && { color: "#FFFFFF" }]}>{item.name}</Text>
                      <View style={styles.hotelMeta}>
                        <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.4)" />
                        <Text style={styles.hotelArea}>{item.area}</Text>
                        <View style={styles.starsRow}>
                          {Array.from({ length: item.stars }).map((_, i) => <IconSymbol key={i} name="star.fill" size={10} color="#FFD700" />)}
                        </View>
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={[styles.hotelPrice, isSelected && { color: "#E91E8C" }]}>{"$" + item.pricePerNight}</Text>
                      <Text style={styles.perNight}>per night</Text>
                    </View>
                  </View>
                  <View style={styles.ratingRow}>
                    <View style={styles.ratingBadge}><Text style={styles.ratingScore}>{item.rating}</Text></View>
                    <Text style={styles.ratingLabel}>Excellent</Text>
                    <Text style={styles.reviewCount}>{item.reviews.toLocaleString() + " reviews"}</Text>
                  </View>
                  <View style={styles.amenitiesRow}>
                    {item.amenities.slice(0, 4).map((a) => {
                      const iconName = AMENITY_ICONS[a];
                      return iconName ? (
                        <View key={a} style={styles.amenityChip}>
                          <IconSymbol name={iconName} size={12} color="rgba(192,132,252,0.7)" />
                        </View>
                      ) : null;
                    })}
                  </View>
                </View>
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.selectedBadgeGradient}>
                      <IconSymbol name="checkmark" size={12} color="#FFFFFF" />
                      <Text style={styles.selectedBadgeText}>Selected</Text>
                    </LinearGradient>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
      <View style={styles.ctaWrap}>
        <TouchableOpacity style={[styles.ctaBtn, !selectedHotel && styles.ctaBtnDisabled]} onPress={handleNext} activeOpacity={0.88}>
          <LinearGradient colors={selectedHotel ? ["#7B2FBE", "#E91E8C"] : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.05)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
            <Text style={[styles.ctaText, !selectedHotel && styles.ctaTextDisabled]}>Review My Trip</Text>
            <IconSymbol name="arrow.right" size={20} color={selectedHotel ? "#FFFFFF" : "#3A2D4E"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  progressWrap: { flex: 1, gap: 6 },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#E91E8C", borderRadius: 2 },
  progressLabel: { color: "rgba(255,255,255,0.4)", fontSize: 12, textAlign: "right" },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  duckLarge: { width: 90, height: 90, borderRadius: 45, overflow: "hidden" },
  duckLargeGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckEmoji: { fontSize: 48 },
  duckEmojiSm: { fontSize: 24 },
  loadingTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "800" },
  loadingSubtitle: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", paddingHorizontal: 40, lineHeight: 22 },
  dotsRow: { flexDirection: "row", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#E91E8C" },
  duckRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 20, paddingBottom: 12, gap: 10 },
  duckAvatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckBubble: { flex: 1, borderRadius: 18, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckMessage: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", lineHeight: 20 },
  duckSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  list: { paddingHorizontal: 20, gap: 14, paddingBottom: 20 },
  hotelCard: { borderRadius: 20, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.08)" },
  hotelCardSelected: { borderColor: "rgba(233,30,140,0.6)" },
  hotelImageWrap: { position: "relative" },
  hotelImage: { height: 110, alignItems: "center", justifyContent: "center" },
  tagBadge: { position: "absolute", top: 10, left: 10, borderRadius: 10, overflow: "hidden" },
  tagGradient: { paddingHorizontal: 10, paddingVertical: 5 },
  tagText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  hotelInfo: { padding: 14, gap: 10 },
  hotelTopRow: { flexDirection: "row", alignItems: "flex-start" },
  hotelName: { color: "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: "800", lineHeight: 22 },
  hotelMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  hotelArea: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  starsRow: { flexDirection: "row", gap: 2 },
  hotelPrice: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  perNight: { color: "rgba(255,255,255,0.4)", fontSize: 11 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ratingBadge: { backgroundColor: "#4CAF50", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  ratingScore: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  ratingLabel: { color: "#4CAF50", fontSize: 13, fontWeight: "600" },
  reviewCount: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  amenitiesRow: { flexDirection: "row", gap: 8 },
  amenityChip: { width: 32, height: 32, borderRadius: 10, backgroundColor: "rgba(192,132,252,0.1)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(192,132,252,0.2)" },
  selectedBadge: { margin: 14, marginTop: 0, alignSelf: "flex-start", borderRadius: 10, overflow: "hidden" },
  selectedBadgeGradient: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 6 },
  selectedBadgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  ctaWrap: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 12 },
  ctaBtn: { borderRadius: 20, overflow: "hidden" },
  ctaBtnDisabled: { opacity: 0.5 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10, borderRadius: 20 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  ctaTextDisabled: { color: "#3A2D4E" },
});
