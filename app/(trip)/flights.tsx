import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Animated, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const MOCK_FLIGHTS = [
  { id: "f1", airline: "Emirates", from: "TLV", to: "DXB", departure: "06:45", arrival: "10:20", duration: "3h 35m", stops: "Direct", price: 420, class: "Economy", color: "#E31837" },
  { id: "f2", airline: "Air France", from: "TLV", to: "CDG", departure: "09:15", arrival: "12:40", duration: "4h 25m", stops: "Direct", price: 380, class: "Economy", color: "#FFFFFF" },
  { id: "f3", airline: "Lufthansa", from: "TLV", to: "FRA", departure: "11:30", arrival: "14:55", duration: "4h 25m", stops: "Direct", price: 355, class: "Economy", color: "#FFFFFF" },
  { id: "f4", airline: "Turkish Airlines", from: "TLV", to: "IST", departure: "14:00", arrival: "16:10", duration: "2h 10m", stops: "1 Stop", price: 290, class: "Economy", color: "#E81932" },
  { id: "f5", airline: "El Al", from: "TLV", to: "LHR", departure: "16:20", arrival: "19:45", duration: "5h 25m", stops: "Direct", price: 445, class: "Economy", color: "#FFFFFF" },
  { id: "f6", airline: "Emirates", from: "TLV", to: "DXB", departure: "22:10", arrival: "01:55+1", duration: "3h 45m", stops: "Direct", price: 820, class: "Business", color: "#E31837" },
];

const FILTERS = ["All", "Direct", "Cheapest", "Business"];

export default function FlightsScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state, dispatch } = useStore();
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const trip = state.trips.find((t) => t.id === tripId);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    pulse.start();
    const timer = setTimeout(() => {
      pulse.stop();
      setLoading(false);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredFlights = MOCK_FLIGHTS.filter((f) => {
    if (activeFilter === "Direct") return f.stops === "Direct";
    if (activeFilter === "Business") return f.class === "Business";
    return true;
  }).sort((a, b) => activeFilter === "Cheapest" ? a.price - b.price : 0);

  const handleSelect = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedFlight(id);
  };

  const handleNext = () => {
    if (!selectedFlight) return;
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const flight = MOCK_FLIGHTS.find((f) => f.id === selectedFlight);
    if (tripId && flight) dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { totalCost: flight.price } } });
    router.push({ pathname: "/(trip)/hotels", params: { tripId } } as never);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}><View style={[styles.progressFill, { width: "80%" }]} /></View>
            <Text style={styles.progressLabel}>4 of 5</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loadingWrap}>
          <Animated.View style={[styles.duckLarge, { opacity: pulseAnim }]}>
            <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.duckLargeGradient}>
              <Image source={require("@/assets/logos/mascot-dark.png")} style={{ width: 60, height: 60 }} resizeMode="contain" />
            </LinearGradient>
          </Animated.View>
          <Text style={styles.loadingTitle}>Searching flights...</Text>
          <Text style={styles.loadingSubtitle}>Finding the best deals to {trip?.destination || "your destination"}</Text>
          <View style={styles.dotsRow}>
            {[0, 1, 2].map((i) => (
              <Animated.View key={i} style={[styles.dot, { opacity: pulseAnim }]} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: "80%" }]} /></View>
          <Text style={styles.progressLabel}>4 of 5</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.duckRow}>
        <View style={styles.duckAvatar}>
          <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.duckGradient}>
            <Image source={require("@/assets/logos/mascot-dark.png")} style={{ width: 32, height: 32 }} resizeMode="contain" />
          </LinearGradient>
        </View>
        <Animated.View style={[styles.duckBubble, { opacity: fadeAnim }]}>
          <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} style={styles.duckBubbleGradient}>
            <Text style={styles.duckMessage}>Found {filteredFlights.length} great flights!</Text>
            <Text style={styles.duckSub}>Tap a card to select your flight</Text>
          </LinearGradient>
        </Animated.View>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          horizontal
          data={FILTERS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterChip, activeFilter === item && styles.filterChipActive]}
              onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setActiveFilter(item); }}
              activeOpacity={0.8}
            >
              {activeFilter === item && <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)"]} style={StyleSheet.absoluteFillObject} />}
              <Text style={[styles.filterLabel, activeFilter === item && styles.filterLabelActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        <FlatList
          data={filteredFlights}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const isSelected = selectedFlight === item.id;
            return (
              <TouchableOpacity
                style={[styles.flightCard, isSelected && styles.flightCardSelected]}
                onPress={() => handleSelect(item.id)}
                activeOpacity={0.88}
              >
                <LinearGradient
                  colors={isSelected ? ["rgba(123,47,190,0.35)", "rgba(233,30,140,0.2)"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.flightTop}>
                  <View style={styles.airlineRow}>
                    <View style={[styles.airlineDot, { backgroundColor: item.color }]} />
                    <Text style={styles.airlineName}>{item.airline}</Text>
                    {item.class === "Business" && (
                      <View style={styles.bizBadge}><Text style={styles.bizText}>Business</Text></View>
                    )}
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={[styles.price, isSelected && { color: "#F94498" }]}>${item.price}</Text>
                    <Text style={styles.perPerson}>per person</Text>
                  </View>
                </View>
                <View style={styles.routeRow}>
                  <View>
                    <Text style={styles.routeTime}>{item.departure}</Text>
                    <Text style={styles.routeCode}>{item.from}</Text>
                  </View>
                  <View style={styles.routeMiddle}>
                    <Text style={styles.routeDuration}>{item.duration}</Text>
                    <View style={styles.routeLine}>
                      <View style={styles.routeDot} />
                      <View style={styles.routeLineBar} />
                      <IconSymbol name="airplane" size={16} color={isSelected ? "#F94498" : "rgba(255,255,255,0.06)"} />
                      <View style={styles.routeLineBar} />
                      <View style={styles.routeDot} />
                    </View>
                    <Text style={[styles.routeStops, item.stops === "Direct" && { color: "#4CAF50" }]}>{item.stops}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.routeTime}>{item.arrival}</Text>
                    <Text style={styles.routeCode}>{item.to}</Text>
                  </View>
                </View>
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.selectedBadgeGradient}>
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
        <TouchableOpacity style={[styles.ctaBtn, !selectedFlight && styles.ctaBtnDisabled]} onPress={handleNext} activeOpacity={0.88}>
          <LinearGradient
            colors={selectedFlight ? ["#6443F4", "#F94498"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={[styles.ctaText, !selectedFlight && styles.ctaTextDisabled]}>Choose Hotel</Text>
            <IconSymbol name="bed.double.fill" size={20} color={selectedFlight ? "#FFFFFF" : "#3A2D4E"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.2, backgroundColor: "rgba(123,47,190,0.09)" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  progressWrap: { flex: 1, gap: 6 },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#F94498", borderRadius: 2 },
  progressLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Satoshi-Regular", textAlign: "right" },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  duckLarge: { width: 90, height: 90, borderRadius: 45, overflow: "hidden" },
  duckLargeGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingTitle: { color: "#FFFFFF", fontSize: 24, fontFamily: "Chillax-Bold", fontWeight: "800" },
  loadingSubtitle: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular", textAlign: "center", paddingHorizontal: 40, lineHeight: 22 },
  dotsRow: { flexDirection: "row", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#F94498" },
  duckRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 20, paddingBottom: 130, gap: 10 },
  duckAvatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckBubble: { flex: 1, borderRadius: 18, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckMessage: { color: "#FFFFFF", fontSize: 15, fontFamily: "Chillax-Semibold", fontWeight: "700", lineHeight: 20 },
  duckSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  filterList: { paddingHorizontal: 20, gap: 8, paddingBottom: 130 },
  filterChip: { borderRadius: 14, paddingHorizontal: 16, paddingVertical: 8, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)" },
  filterChipActive: { borderColor: "rgba(192,132,252,0.5)" },
  filterLabel: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  filterLabelActive: { color: "#C084FC" },
  list: { paddingHorizontal: 20, gap: 12, paddingBottom: 130 },
  flightCard: { borderRadius: 20, padding: 18, gap: 14, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.12)" },
  flightCardSelected: { borderColor: "rgba(233,30,140,0.6)" },
  flightTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  airlineRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  airlineDot: { width: 10, height: 10, borderRadius: 5 },
  airlineName: { color: "#FFFFFF", fontSize: 15, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  bizBadge: { backgroundColor: "rgba(255,215,0,0.2)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: "rgba(255,215,0,0.4)" },
  bizText: { color: "#FBBF24", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  price: { color: "#FFFFFF", fontSize: 22, fontFamily: "Chillax-Bold", fontWeight: "900" },
  perPerson: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Satoshi-Regular" },
  routeRow: { flexDirection: "row", alignItems: "center" },
  routeMiddle: { flex: 1, alignItems: "center", gap: 4, paddingHorizontal: 12 },
  routeDuration: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  routeLine: { flexDirection: "row", alignItems: "center", width: "100%", gap: 4 },
  routeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.06)" },
  routeLineBar: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  routeStops: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  routeTime: { color: "#FFFFFF", fontSize: 18, fontFamily: "Chillax-Bold", fontWeight: "800" },
  routeCode: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  selectedBadge: { alignSelf: "flex-start", borderRadius: 10, overflow: "hidden" },
  selectedBadgeGradient: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 6 },
  selectedBadgeText: { color: "#FFFFFF", fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  ctaWrap: { paddingHorizontal: 20, paddingBottom: 130, paddingTop: 12 },
  ctaBtn: { borderRadius: 20, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  ctaBtnDisabled: { opacity: 0.5 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10, borderRadius: 20 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontFamily: "Chillax-Bold", fontWeight: "800" },
  ctaTextDisabled: { color: "#D3CFD8" },
});
