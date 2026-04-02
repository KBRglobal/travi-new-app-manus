import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Dimensions, Animated
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const { height } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
interface MapPin {
  id: string;
  name: string;
  category: "must_see" | "beach" | "food" | "culture" | "shopping" | "nature";
  emoji: string;
  lat: number;
  lng: number;
  rating: number;
  duration: string;
  price: string;
  day?: number;
}

// ─── Destination Data ─────────────────────────────────────────────────────────
const DEST_DATA: Record<string, { lat: number; lng: number; delta: number; pins: MapPin[] }> = {
  Tokyo: {
    lat: 35.6762, lng: 139.6503, delta: 0.15,
    pins: [
      { id: "t1", name: "Shibuya Crossing", category: "must_see", emoji: "🏙️", lat: 35.6595, lng: 139.7004, rating: 4.9, duration: "1h", price: "Free", day: 1 },
      { id: "t2", name: "Senso-ji Temple", category: "culture", emoji: "⛩️", lat: 35.7148, lng: 139.7967, rating: 4.8, duration: "2h", price: "Free", day: 1 },
      { id: "t3", name: "TeamLab Planets", category: "culture", emoji: "🎨", lat: 35.6488, lng: 139.7858, rating: 4.9, duration: "2h", price: "$32", day: 2 },
      { id: "t4", name: "Tsukiji Outer Market", category: "food", emoji: "🍣", lat: 35.6655, lng: 139.7707, rating: 4.7, duration: "1.5h", price: "$15", day: 2 },
      { id: "t5", name: "Shinjuku Gyoen", category: "nature", emoji: "🌸", lat: 35.6851, lng: 139.7100, rating: 4.7, duration: "2h", price: "$2", day: 3 },
      { id: "t6", name: "Akihabara", category: "shopping", emoji: "🎮", lat: 35.7023, lng: 139.7745, rating: 4.5, duration: "3h", price: "Varies", day: 3 },
    ],
  },
  Dubai: {
    lat: 25.2048, lng: 55.2708, delta: 0.12,
    pins: [
      { id: "d1", name: "Burj Khalifa", category: "must_see", emoji: "🏙️", lat: 25.1972, lng: 55.2744, rating: 4.9, duration: "2h", price: "$40", day: 1 },
      { id: "d2", name: "Dubai Mall", category: "shopping", emoji: "🛍️", lat: 25.1980, lng: 55.2793, rating: 4.8, duration: "3h", price: "Free", day: 1 },
      { id: "d3", name: "Dubai Fountain", category: "must_see", emoji: "⛲", lat: 25.1959, lng: 55.2742, rating: 4.8, duration: "30m", price: "Free", day: 1 },
      { id: "d4", name: "Desert Safari", category: "nature", emoji: "🏜️", lat: 24.9857, lng: 55.4272, rating: 4.9, duration: "6h", price: "$80", day: 2 },
      { id: "d5", name: "Gold Souk", category: "shopping", emoji: "💛", lat: 25.2697, lng: 55.3094, rating: 4.6, duration: "2h", price: "Free", day: 3 },
      { id: "d6", name: "Palm Jumeirah", category: "beach", emoji: "🏖️", lat: 25.1124, lng: 55.1390, rating: 4.7, duration: "3h", price: "Free", day: 2 },
    ],
  },
  Bali: {
    lat: -8.4095, lng: 115.1889, delta: 0.3,
    pins: [
      { id: "b1", name: "Tanah Lot Temple", category: "must_see", emoji: "⛩️", lat: -8.6215, lng: 115.0866, rating: 4.8, duration: "2h", price: "$5", day: 1 },
      { id: "b2", name: "Ubud Rice Terraces", category: "nature", emoji: "🌾", lat: -8.4095, lng: 115.2519, rating: 4.9, duration: "2h", price: "Free", day: 2 },
      { id: "b3", name: "Seminyak Beach", category: "beach", emoji: "🏖️", lat: -8.6900, lng: 115.1600, rating: 4.7, duration: "4h", price: "Free", day: 3 },
      { id: "b4", name: "Uluwatu Temple", category: "culture", emoji: "🌅", lat: -8.8291, lng: 115.0849, rating: 4.8, duration: "2h", price: "$3", day: 4 },
      { id: "b5", name: "Tegallalang", category: "nature", emoji: "🌿", lat: -8.4317, lng: 115.2789, rating: 4.7, duration: "1.5h", price: "$2", day: 2 },
    ],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  must_see: "#F94498",
  beach: "#06B6D4",
  food: "#F59E0B",
  culture: "#A78BFA",
  shopping: "#FB923C",
  nature: "#22C55E",
};

const CATEGORY_LABELS: Record<string, string> = {
  must_see: "Must-See",
  beach: "Beach",
  food: "Food",
  culture: "Culture",
  shopping: "Shopping",
  nature: "Nature",
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function DestinationMapScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ destination?: string }>();
  const destination = params.destination ?? "Tokyo";
  const destData = DEST_DATA[destination] ?? DEST_DATA["Tokyo"];

  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const mapRef = useRef<MapView>(null);
  const sheetAnim = useRef(new Animated.Value(0)).current;

  const filteredPins = activeFilter === "all"
    ? destData.pins
    : destData.pins.filter((p) => p.category === activeFilter);

  const handlePinPress = (pin: MapPin) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPin(pin);
    mapRef.current?.animateToRegion({
      latitude: pin.lat - 0.01,
      longitude: pin.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }, 400);
    Animated.spring(sheetAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 12 }).start();
  };

  const handleCloseSheet = () => {
    Animated.timing(sheetAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => setSelectedPin(null));
  };

  const categories = ["all", ...Array.from(new Set(destData.pins.map((p) => p.category)))];

  const sheetTranslate = sheetAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] });

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      {/* Header overlay */}
      <View style={[S.header, { paddingTop: insets.top + 4 }]}>
        <LinearGradient colors={["rgba(13,6,40,0.95)", "rgba(13,6,40,0)"]} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <View style={S.backBtnInner}>
            <IconSymbol name="chevron.left" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
        <Text style={S.headerTitle}>{destination} Map</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: destData.lat,
          longitude: destData.lng,
          latitudeDelta: destData.delta,
          longitudeDelta: destData.delta,
        }}
        userInterfaceStyle="dark"
        showsUserLocation={false}
        showsCompass={false}
        showsScale={false}
      >
        {filteredPins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.lat, longitude: pin.lng }}
            onPress={() => handlePinPress(pin)}
          >
            <View style={[S.pin, { backgroundColor: CATEGORY_COLORS[pin.category] }]}>
              <Text style={{ fontSize: 14 }}>{pin.emoji}</Text>
            </View>
            <View style={[S.pinTail, { borderTopColor: CATEGORY_COLORS[pin.category] }]} />
          </Marker>
        ))}
      </MapView>

      {/* Category filters */}
      <View style={[S.filtersWrap, { top: insets.top + 60 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[S.filterChip, activeFilter === cat && { backgroundColor: (CATEGORY_COLORS[cat] ?? "#6443F4") + "CC", borderColor: CATEGORY_COLORS[cat] ?? "#6443F4" }]}
              onPress={() => {
                setActiveFilter(cat);
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              activeOpacity={0.8}
            >
              <Text style={[S.filterChipText, activeFilter === cat && { color: "#FFF" }]}>
                {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Pin count badge */}
      <View style={[S.countBadge, { top: insets.top + 110 }]}>
        <Text style={S.countBadgeText}>{filteredPins.length} spots</Text>
      </View>

      {/* Selected pin bottom sheet */}
      {selectedPin && (
        <Animated.View style={[S.sheet, { transform: [{ translateY: sheetTranslate }], paddingBottom: insets.bottom + 16 }]}>
          <LinearGradient colors={["#1A0A3D", "#0D0628"]} style={StyleSheet.absoluteFillObject} />
          <View style={[S.sheetAccent, { backgroundColor: CATEGORY_COLORS[selectedPin.category] }]} />

          <View style={S.sheetHandle} />

          <View style={S.sheetContent}>
            <View style={S.sheetLeft}>
              <Text style={{ fontSize: 36 }}>{selectedPin.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={S.sheetTopRow}>
                <View style={[S.categoryBadge, { backgroundColor: CATEGORY_COLORS[selectedPin.category] + "25", borderColor: CATEGORY_COLORS[selectedPin.category] + "50" }]}>
                  <Text style={[S.categoryBadgeText, { color: CATEGORY_COLORS[selectedPin.category] }]}>
                    {CATEGORY_LABELS[selectedPin.category]}
                  </Text>
                </View>
                {selectedPin.day && <Text style={S.dayLabel}>Day {selectedPin.day}</Text>}
              </View>
              <Text style={S.sheetName}>{selectedPin.name}</Text>
              <View style={S.sheetMeta}>
                <Text style={S.sheetMetaItem}>⭐ {selectedPin.rating}</Text>
                <Text style={S.sheetMetaDot}>·</Text>
                <Text style={S.sheetMetaItem}>⏱ {selectedPin.duration}</Text>
                <Text style={S.sheetMetaDot}>·</Text>
                <Text style={S.sheetMetaItem}>💰 {selectedPin.price}</Text>
              </View>
            </View>
            <TouchableOpacity style={S.closeSheetBtn} onPress={handleCloseSheet} activeOpacity={0.7}>
              <IconSymbol name="xmark" size={14} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          </View>

          <View style={S.sheetActions}>
            <TouchableOpacity style={S.sheetActionBtn} activeOpacity={0.8}>
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <IconSymbol name="plus.circle.fill" size={18} color="#FFF" />
              <Text style={S.sheetActionBtnText}>Add to Itinerary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={S.sheetSecondaryBtn} activeOpacity={0.8}>
              <IconSymbol name="location.fill" size={16} color="#A78BFA" />
              <Text style={S.sheetSecondaryBtnText}>Directions</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },

  header: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 20 },
  backBtn: { zIndex: 1 },
  backBtnInner: { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(13,6,40,0.8)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  headerTitle: { color: "#FFF", fontSize: 17, fontWeight: "800" },

  filtersWrap: { position: "absolute", left: 0, right: 0, zIndex: 10 },
  filterChip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, backgroundColor: "rgba(13,6,40,0.85)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  filterChipText: { color: "#9BA1A6", fontSize: 13, fontWeight: "600" },

  countBadge: { position: "absolute", right: 16, zIndex: 10, backgroundColor: "rgba(13,6,40,0.85)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  countBadgeText: { color: "#9BA1A6", fontSize: 12, fontWeight: "700" },

  pin: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#FFF", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 4, elevation: 6 },
  pinTail: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 8, borderLeftColor: "transparent", borderRightColor: "transparent", alignSelf: "center", marginTop: -1 },

  sheet: { position: "absolute", bottom: 0, left: 0, right: 0, borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden", paddingHorizontal: 20, paddingTop: 12, gap: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  sheetAccent: { position: "absolute", top: 0, left: 0, right: 0, height: 3 },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)", alignSelf: "center", marginBottom: 4 },
  sheetContent: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  sheetLeft: { width: 56, height: 56, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  sheetTopRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  categoryBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  categoryBadgeText: { fontSize: 11, fontWeight: "700" },
  dayLabel: { color: "#9BA1A6", fontSize: 11 },
  sheetName: { color: "#FFF", fontSize: 18, fontWeight: "800", marginBottom: 6 },
  sheetMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  sheetMetaItem: { color: "#9BA1A6", fontSize: 13 },
  sheetMetaDot: { color: "rgba(255,255,255,0.2)", fontSize: 13 },
  closeSheetBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },

  sheetActions: { flexDirection: "row", gap: 10 },
  sheetActionBtn: { flex: 1, borderRadius: 14, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 13 },
  sheetActionBtnText: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  sheetSecondaryBtn: { borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(167,139,250,0.1)", borderWidth: 1, borderColor: "rgba(167,139,250,0.25)" },
  sheetSecondaryBtnText: { color: "#A78BFA", fontSize: 14, fontWeight: "700" },
});
