import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore, FlightOption } from "@/lib/store";

const MOCK_FLIGHTS: FlightOption[] = [
  {
    id: "f1",
    airline: "Emirates",
    from: "DXB",
    to: "CDG",
    departure: "08:30",
    arrival: "13:45",
    duration: "7h 15m",
    price: 620,
    class: "Economy",
    stops: 0,
  },
  {
    id: "f2",
    airline: "Air France",
    from: "DXB",
    to: "CDG",
    departure: "14:20",
    arrival: "19:05",
    duration: "6h 45m",
    price: 780,
    class: "Economy",
    stops: 0,
  },
  {
    id: "f3",
    airline: "Lufthansa",
    from: "DXB",
    to: "CDG",
    departure: "22:10",
    arrival: "06:30+1",
    duration: "8h 20m",
    price: 540,
    class: "Economy",
    stops: 1,
  },
];

function FlightCard({ flight, selected, onSelect }: { flight: FlightOption; selected: boolean; onSelect: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.flightCard, selected && styles.flightCardSelected]}
      onPress={onSelect}
      activeOpacity={0.85}
    >
      {selected && (
        <LinearGradient
          colors={["rgba(123,47,190,0.15)", "rgba(233,30,140,0.1)"]}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <View style={styles.flightHeader}>
        <View style={styles.airlineBadge}>
          <Text style={styles.airlineText}>{flight.airline[0]}</Text>
        </View>
        <Text style={styles.airlineName}>{flight.airline}</Text>
        {flight.stops === 0 && (
          <View style={styles.directBadge}>
            <Text style={styles.directText}>Direct</Text>
          </View>
        )}
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${flight.price}</Text>
        </View>
      </View>

      <View style={styles.flightRoute}>
        <View style={styles.routePoint}>
          <Text style={styles.routeCode}>{flight.from}</Text>
          <Text style={styles.routeTime}>{flight.departure}</Text>
        </View>
        <View style={styles.routeLine}>
          <View style={styles.routeLineBar} />
          <IconSymbol name="airplane" size={16} color="#7B2FBE" />
          <View style={styles.routeLineBar} />
        </View>
        <View style={styles.routePoint}>
          <Text style={styles.routeCode}>{flight.to}</Text>
          <Text style={styles.routeTime}>{flight.arrival}</Text>
        </View>
      </View>

      <View style={styles.flightMeta}>
        <View style={styles.metaItem}>
          <IconSymbol name="clock.fill" size={13} color="#A78BCA" />
          <Text style={styles.metaText}>{flight.duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <IconSymbol name="person.fill" size={13} color="#A78BCA" />
          <Text style={styles.metaText}>{flight.class}</Text>
        </View>
        {flight.stops > 0 && (
          <View style={styles.metaItem}>
            <Text style={styles.stopsText}>{flight.stops} stop</Text>
          </View>
        )}
      </View>

      {selected && (
        <View style={styles.selectedIndicator}>
          <IconSymbol name="checkmark.circle.fill" size={18} color="#E91E8C" />
          <Text style={styles.selectedText}>Selected</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function FlightsScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state, dispatch } = useStore();
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [hasOwnFlight, setHasOwnFlight] = useState(false);

  const trip = state.trips.find((t) => t.id === tripId);

  const handleNext = () => {
    if (!selectedFlight && !hasOwnFlight) return;
    const flight = MOCK_FLIGHTS.find((f) => f.id === selectedFlight);
    if (flight) {
      dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { flight } } });
    }
    router.push({ pathname: "/(trip)/hotels" as never, params: { tripId } });
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 4 of 6</Text>
          <View style={styles.stepBar}>
            {[1,2,3,4,5,6].map((s) => (
              <View key={s} style={[styles.stepDot, s <= 4 && styles.stepDotActive]} />
            ))}
          </View>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Choose Your Flight</Text>
        <Text style={styles.subtitle}>
          TRAVI filtered the best options for {trip?.destination || "your trip"}
        </Text>

        {/* Own flight toggle */}
        <TouchableOpacity
          style={[styles.ownFlightToggle, hasOwnFlight && styles.ownFlightToggleActive]}
          onPress={() => { setHasOwnFlight(!hasOwnFlight); setSelectedFlight(null); }}
          activeOpacity={0.8}
        >
          <IconSymbol
            name={hasOwnFlight ? "checkmark.circle.fill" : "airplane"}
            size={18}
            color={hasOwnFlight ? "#4CAF50" : "#A78BCA"}
          />
          <Text style={[styles.ownFlightText, hasOwnFlight && styles.ownFlightTextActive]}>
            I already have my flight booked
          </Text>
        </TouchableOpacity>

        {!hasOwnFlight && (
          <View style={styles.flightList}>
            {MOCK_FLIGHTS.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                selected={selectedFlight === flight.id}
                onSelect={() => setSelectedFlight(flight.id)}
              />
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.nextBtn, (!selectedFlight && !hasOwnFlight) && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!selectedFlight && !hasOwnFlight}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={(selectedFlight || hasOwnFlight) ? ["#7B2FBE", "#E91E8C"] : ["#4A3080", "#4A3080"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>Choose Hotel</Text>
            <IconSymbol name="arrow.right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
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
  ownFlightToggle: {
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
  ownFlightToggleActive: { borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.1)" },
  ownFlightText: { color: "#A78BCA", fontSize: 15 },
  ownFlightTextActive: { color: "#4CAF50" },
  flightList: { gap: 14, marginBottom: 24 },
  flightCard: {
    backgroundColor: "#2D1B69",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#4A3080",
    overflow: "hidden",
  },
  flightCardSelected: { borderColor: "#7B2FBE" },
  flightHeader: { flexDirection: "row", alignItems: "center", marginBottom: 14, gap: 8 },
  airlineBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7B2FBE",
    alignItems: "center",
    justifyContent: "center",
  },
  airlineText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  airlineName: { color: "#FFFFFF", fontSize: 15, fontWeight: "600", flex: 1 },
  directBadge: {
    backgroundColor: "rgba(76,175,80,0.2)",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  directText: { color: "#4CAF50", fontSize: 11, fontWeight: "600" },
  priceTag: {
    backgroundColor: "#3D2580",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priceText: { color: "#FFD700", fontSize: 15, fontWeight: "700" },
  flightRoute: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  routePoint: { alignItems: "center", flex: 1 },
  routeCode: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
  routeTime: { color: "#A78BCA", fontSize: 13, marginTop: 2 },
  routeLine: { flex: 2, flexDirection: "row", alignItems: "center", gap: 4 },
  routeLineBar: { flex: 1, height: 1, backgroundColor: "#4A3080" },
  flightMeta: { flexDirection: "row", gap: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { color: "#A78BCA", fontSize: 13 },
  stopsText: { color: "#FF9800", fontSize: 13 },
  selectedIndicator: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  selectedText: { color: "#E91E8C", fontSize: 13, fontWeight: "600" },
  nextBtn: { borderRadius: 28, overflow: "hidden" },
  nextBtnDisabled: { opacity: 0.5 },
  nextGradient: { paddingVertical: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  nextText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
});
