import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore, HotelOption } from "@/lib/store";

const MOCK_HOTELS: HotelOption[] = [
  {
    id: "h1",
    name: "Le Bristol Paris",
    stars: 5,
    location: "8th Arrondissement",
    pricePerNight: 650,
    totalPrice: 1950,
    amenities: ["Pool", "Spa", "Fine Dining", "Concierge"],
    rating: 9.4,
  },
  {
    id: "h2",
    name: "Hôtel des Arts Montmartre",
    stars: 3,
    location: "Montmartre, 18th",
    pricePerNight: 180,
    totalPrice: 540,
    amenities: ["Breakfast", "WiFi", "Bar", "Terrace"],
    rating: 8.7,
  },
  {
    id: "h3",
    name: "Citadines Apart'hotel",
    stars: 4,
    location: "Saint-Germain, 6th",
    pricePerNight: 280,
    totalPrice: 840,
    amenities: ["Kitchen", "Gym", "WiFi", "24h Reception"],
    rating: 8.2,
  },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1,2,3,4,5].map((s) => (
        <Text key={s} style={{ fontSize: 11, color: s <= stars ? "#FFD700" : "#4A3080" }}>★</Text>
      ))}
    </View>
  );
}

export default function HotelsScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state, dispatch } = useStore();
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [hasOwnHotel, setHasOwnHotel] = useState(false);

  const trip = state.trips.find((t) => t.id === tripId);

  const handleNext = () => {
    if (!selectedHotel && !hasOwnHotel) return;
    const hotel = MOCK_HOTELS.find((h) => h.id === selectedHotel);
    if (hotel) {
      dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { hotel } } });
    }
    // Generate mock itinerary
    const itinerary = generateItinerary(trip?.destination || "Destination", trip?.startDate || "", trip?.endDate || "");
    dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { itinerary, status: "upcoming" } } });
    router.push({ pathname: "/(trip)/summary" as never, params: { tripId } });
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 5 of 6</Text>
          <View style={styles.stepBar}>
            {[1,2,3,4,5,6].map((s) => (
              <View key={s} style={[styles.stepDot, s <= 5 && styles.stepDotActive]} />
            ))}
          </View>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Choose Your Hotel</Text>
        <Text style={styles.subtitle}>
          Filtered for {trip?.destination || "your trip"} based on your profile
        </Text>

        <TouchableOpacity
          style={[styles.ownToggle, hasOwnHotel && styles.ownToggleActive]}
          onPress={() => { setHasOwnHotel(!hasOwnHotel); setSelectedHotel(null); }}
          activeOpacity={0.8}
        >
          <IconSymbol
            name={hasOwnHotel ? "checkmark.circle.fill" : "bed.double.fill"}
            size={18}
            color={hasOwnHotel ? "#4CAF50" : "#A78BCA"}
          />
          <Text style={[styles.ownText, hasOwnHotel && styles.ownTextActive]}>
            I already have my hotel booked
          </Text>
        </TouchableOpacity>

        {!hasOwnHotel && (
          <View style={styles.hotelList}>
            {MOCK_HOTELS.map((hotel) => {
              const isSelected = selectedHotel === hotel.id;
              return (
                <TouchableOpacity
                  key={hotel.id}
                  style={[styles.hotelCard, isSelected && styles.hotelCardSelected]}
                  onPress={() => setSelectedHotel(hotel.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.hotelHeader}>
                    <View style={styles.hotelEmoji}>
                      <Text style={{ fontSize: 28 }}>🏨</Text>
                    </View>
                    <View style={styles.hotelInfo}>
                      <Text style={styles.hotelName}>{hotel.name}</Text>
                      <StarRating stars={hotel.stars} />
                      <Text style={styles.hotelLocation}>📍 {hotel.location}</Text>
                    </View>
                    <View style={styles.hotelPrice}>
                      <Text style={styles.pricePerNight}>${hotel.pricePerNight}</Text>
                      <Text style={styles.perNightLabel}>/night</Text>
                      <Text style={styles.totalPrice}>${hotel.totalPrice} total</Text>
                    </View>
                  </View>

                  <View style={styles.ratingRow}>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingScore}>{hotel.rating}</Text>
                    </View>
                    <Text style={styles.ratingLabel}>
                      {hotel.rating >= 9 ? "Exceptional" : hotel.rating >= 8.5 ? "Excellent" : "Very Good"}
                    </Text>
                  </View>

                  <View style={styles.amenitiesRow}>
                    {hotel.amenities.map((a) => (
                      <View key={a} style={styles.amenityChip}>
                        <Text style={styles.amenityText}>{a}</Text>
                      </View>
                    ))}
                  </View>

                  {isSelected && (
                    <View style={styles.selectedRow}>
                      <IconSymbol name="checkmark.circle.fill" size={16} color="#E91E8C" />
                      <Text style={styles.selectedText}>Selected</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <TouchableOpacity
          style={[styles.nextBtn, (!selectedHotel && !hasOwnHotel) && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!selectedHotel && !hasOwnHotel}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={(selectedHotel || hasOwnHotel) ? ["#7B2FBE", "#E91E8C"] : ["#4A3080", "#4A3080"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>View Trip Summary</Text>
            <IconSymbol name="arrow.right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

function generateItinerary(destination: string, startDate: string, endDate: string) {
  return [
    {
      day: 1,
      date: startDate || "Day 1",
      activities: [
        { id: "a1", time: "09:00", title: "Arrival & Hotel Check-in", description: "Settle in and freshen up", location: destination, price: 0, category: "hotel" as const, status: "confirmed" as const },
        { id: "a2", time: "12:00", title: "Welcome Lunch", description: "Try local cuisine near the hotel", location: destination, price: 35, category: "food" as const, status: "confirmed" as const },
        { id: "a3", time: "15:00", title: "City Orientation Walk", description: "Explore the neighborhood", location: destination, price: 0, category: "activity" as const, status: "confirmed" as const },
        { id: "a4", time: "19:00", title: "Dinner at Local Restaurant", description: "Authentic local dinner", location: destination, price: 55, category: "food" as const, status: "pending" as const },
      ],
    },
    {
      day: 2,
      date: "Day 2",
      activities: [
        { id: "b1", time: "08:30", title: "Breakfast", description: "Hotel breakfast or local café", location: destination, price: 15, category: "food" as const, status: "confirmed" as const },
        { id: "b2", time: "10:00", title: "Main Landmark Visit", description: "Visit the top attraction", location: destination, price: 25, category: "activity" as const, status: "confirmed" as const },
        { id: "b3", time: "13:00", title: "Lunch Break", description: "Midday meal", location: destination, price: 30, category: "food" as const, status: "confirmed" as const },
        { id: "b4", time: "15:00", title: "Museum or Gallery", description: "Cultural afternoon", location: destination, price: 20, category: "activity" as const, status: "confirmed" as const },
        { id: "b5", time: "20:00", title: "Evening Entertainment", description: "Local show or nightlife", location: destination, price: 50, category: "activity" as const, status: "pending" as const },
      ],
    },
    {
      day: 3,
      date: endDate || "Day 3",
      activities: [
        { id: "c1", time: "09:00", title: "Morning Market", description: "Local market experience", location: destination, price: 0, category: "activity" as const, status: "confirmed" as const },
        { id: "c2", time: "11:00", title: "Shopping & Souvenirs", description: "Last-minute shopping", location: destination, price: 80, category: "activity" as const, status: "confirmed" as const },
        { id: "c3", time: "14:00", title: "Farewell Lunch", description: "Final meal in the city", location: destination, price: 45, category: "food" as const, status: "confirmed" as const },
        { id: "c4", time: "17:00", title: "Hotel Check-out & Transfer", description: "Head to the airport", location: destination, price: 40, category: "transport" as const, status: "confirmed" as const },
      ],
    },
  ];
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  stepIndicator: { flex: 1, alignItems: "center", gap: 6 },
  stepText: { color: "#A78BCA", fontSize: 12 },
  stepBar: { flexDirection: "row", gap: 4 },
  stepDot: { width: 24, height: 4, borderRadius: 2, backgroundColor: "#4A3080" },
  stepDotActive: { backgroundColor: "#E91E8C" },
  content: { padding: 24, paddingBottom: 40 },
  title: { color: "#FFFFFF", fontSize: 26, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#A78BCA", fontSize: 15, marginBottom: 20 },
  ownToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 10,
    marginBottom: 20,
  },
  ownToggleActive: { borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.1)" },
  ownText: { color: "#A78BCA", fontSize: 15 },
  ownTextActive: { color: "#4CAF50" },
  hotelList: { gap: 14, marginBottom: 24 },
  hotelCard: {
    backgroundColor: "#2D1B69",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  hotelCardSelected: { borderColor: "#7B2FBE" },
  hotelHeader: { flexDirection: "row", gap: 12, marginBottom: 12 },
  hotelEmoji: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#3D2580",
    alignItems: "center",
    justifyContent: "center",
  },
  hotelInfo: { flex: 1, gap: 4 },
  hotelName: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  hotelLocation: { color: "#A78BCA", fontSize: 12, marginTop: 2 },
  hotelPrice: { alignItems: "flex-end" },
  pricePerNight: { color: "#FFD700", fontSize: 18, fontWeight: "700" },
  perNightLabel: { color: "#A78BCA", fontSize: 11 },
  totalPrice: { color: "#6B5A8A", fontSize: 12, marginTop: 2 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  ratingBadge: { backgroundColor: "#4CAF50", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  ratingScore: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  ratingLabel: { color: "#A78BCA", fontSize: 13 },
  amenitiesRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  amenityChip: {
    backgroundColor: "#3D2580",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  amenityText: { color: "#A78BCA", fontSize: 11 },
  selectedRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  selectedText: { color: "#E91E8C", fontSize: 13, fontWeight: "600" },
  nextBtn: { borderRadius: 28, overflow: "hidden" },
  nextBtnDisabled: { opacity: 0.5 },
  nextGradient: { paddingVertical: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  nextText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
});
