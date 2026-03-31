import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

type IconName = "globe" | "fork.knife" | "building.columns.fill" | "bed.double.fill" | "tram.fill" | "cross.circle.fill" | "location.fill";

const CATEGORIES: { id: string; label: string; iconName: IconName }[] = [
  { id: "all", label: "All", iconName: "globe" },
  { id: "food", label: "Food", iconName: "fork.knife" },
  { id: "attraction", label: "Sights", iconName: "building.columns.fill" },
  { id: "hotel", label: "Hotels", iconName: "bed.double.fill" },
  { id: "transport", label: "Transit", iconName: "tram.fill" },
  { id: "pharmacy", label: "Health", iconName: "cross.circle.fill" },
];

type PlaceIconName = "fork.knife" | "paintbrush.fill" | "cup.and.saucer.fill" | "theatermasks.fill" | "tram.fill" | "cross.circle.fill" | "bed.double.fill" | "fork.knife.circle.fill";

const NEARBY_PLACES: {
  id: string; name: string; category: string; type: string;
  distance: string; rating: number; price: string; open: boolean; iconName: PlaceIconName;
  address: string; hours: string; tags: string[];
}[] = [
  {
    id: "p1", name: "Le Comptoir du Relais", category: "food", type: "French Bistro",
    distance: "180m", rating: 4.7, price: "$$", open: true, iconName: "fork.knife",
    address: "9 Carrefour de l'Odéon, Paris",
    hours: "12:00 – 23:00",
    tags: ["Outdoor seating", "Reservations"],
  },
  {
    id: "p2", name: "Musée d'Orsay", category: "attraction", type: "Art Museum",
    distance: "320m", rating: 4.8, price: "€16", open: true, iconName: "paintbrush.fill",
    address: "1 Rue de la Légion d'Honneur, Paris",
    hours: "09:30 – 18:00",
    tags: ["World-class art", "Skip the line"],
  },
  {
    id: "p3", name: "Café de Flore", category: "food", type: "Historic Café",
    distance: "250m", rating: 4.5, price: "$$$", open: true, iconName: "cup.and.saucer.fill",
    address: "172 Bd Saint-Germain, Paris",
    hours: "07:30 – 01:30",
    tags: ["Iconic", "People watching"],
  },
  {
    id: "p4", name: "Odéon – Théâtre de l'Europe", category: "attraction", type: "Theatre",
    distance: "150m", rating: 4.6, price: "€25", open: false, iconName: "theatermasks.fill",
    address: "Place de l'Odéon, Paris",
    hours: "Opens 14:00",
    tags: ["Cultural", "Historic"],
  },
  {
    id: "p5", name: "Métro Saint-Michel", category: "transport", type: "Metro Station",
    distance: "400m", rating: 4.2, price: "€1.90", open: true, iconName: "tram.fill",
    address: "Place Saint-Michel, Paris",
    hours: "05:30 – 01:15",
    tags: ["Line 4", "RER B/C"],
  },
  {
    id: "p6", name: "Pharmacie de l'Odéon", category: "pharmacy", type: "Pharmacy",
    distance: "200m", rating: 4.3, price: "Free", open: true, iconName: "cross.circle.fill",
    address: "8 Carrefour de l'Odéon, Paris",
    hours: "08:30 – 20:00",
    tags: ["English spoken", "24h nearby"],
  },
  {
    id: "p7", name: "Hôtel Récamier", category: "hotel", type: "Boutique Hotel",
    distance: "300m", rating: 4.8, price: "$$$", open: true, iconName: "bed.double.fill",
    address: "3 Pl. Saint-Sulpice, Paris",
    hours: "24/7",
    tags: ["5-star", "Spa"],
  },
  {
    id: "p8", name: "Breizh Café", category: "food", type: "Crêperie",
    distance: "450m", rating: 4.9, price: "$$", open: true, iconName: "fork.knife.circle.fill",
    address: "109 Rue Vieille du Temple, Paris",
    hours: "11:30 – 22:30",
    tags: ["Best crêpes", "Organic"],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  food: "#FF9800",
  attraction: "#9C27B0",
  hotel: "#2196F3",
  transport: "#4CAF50",
  pharmacy: "#F44336",
  all: "#7B2FBE",
};

// Fake map grid with colored cells to simulate a map
function MockMap({ destination }: { destination: string }) {
  return (
    <View style={styles.mapContainer}>
      <LinearGradient colors={["#1A2A4A", "#1A3A2A"]} style={styles.mapBg}>
        {/* Grid lines */}
        {[...Array(8)].map((_, i) => (
          <View key={`h${i}`} style={[styles.gridLine, styles.gridLineH, { top: `${i * 14}%` as any }]} />
        ))}
        {[...Array(6)].map((_, i) => (
          <View key={`v${i}`} style={[styles.gridLine, styles.gridLineV, { left: `${i * 18}%` as any }]} />
        ))}

        {/* "Streets" */}
        <View style={[styles.street, { top: "35%", left: 0, right: 0, height: 8 }]} />
        <View style={[styles.street, { top: "60%", left: 0, right: 0, height: 5 }]} />
        <View style={[styles.street, { left: "40%", top: 0, bottom: 0, width: 8 }]} />
        <View style={[styles.street, { left: "65%", top: 0, bottom: 0, width: 5 }]} />

        {/* "Park" area */}
        <View style={styles.parkArea} />

        {/* "Water" */}
        <View style={styles.waterArea} />

        {/* Place markers using icons */}
        <View style={[styles.marker, { top: "30%", left: "38%" }]}>
          <View style={styles.markerYou}>
            <IconSymbol name="location.fill" size={14} color="#FFFFFF" />
          </View>
          <View style={styles.markerLabel}><Text style={styles.markerLabelText}>You</Text></View>
        </View>
        <View style={[styles.markerIcon, { top: "20%", left: "55%" }]}>
          <IconSymbol name="fork.knife" size={12} color="#FF9800" />
        </View>
        <View style={[styles.markerIcon, { top: "45%", left: "25%" }]}>
          <IconSymbol name="paintbrush.fill" size={12} color="#9C27B0" />
        </View>
        <View style={[styles.markerIcon, { top: "55%", left: "60%" }]}>
          <IconSymbol name="cup.and.saucer.fill" size={12} color="#FF9800" />
        </View>
        <View style={[styles.markerIcon, { top: "15%", left: "70%" }]}>
          <IconSymbol name="bed.double.fill" size={12} color="#2196F3" />
        </View>
        <View style={[styles.markerIcon, { top: "65%", left: "45%" }]}>
          <IconSymbol name="tram.fill" size={12} color="#4CAF50" />
        </View>

        {/* Destination label */}
        <View style={styles.mapLabel}>
          <IconSymbol name="location.fill" size={12} color="#7B2FBE" />
          <Text style={styles.mapLabelText}> {destination}</Text>
        </View>

        {/* Map controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControlBtn}>
            <Text style={styles.mapControlText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlBtn}>
            <Text style={styles.mapControlText}>−</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlBtn}>
            <IconSymbol name="location.north.fill" size={16} color="#7B2FBE" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

export default function MapScreen() {
  const { state } = useStore();
  const activeTrip = state.trips.find((t) => t.status === "active") || state.trips[0];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlace, setSelectedPlace] = useState<typeof NEARBY_PLACES[0] | null>(null);

  const filtered = selectedCategory === "all"
    ? NEARBY_PLACES
    : NEARBY_PLACES.filter((p) => p.category === selectedCategory);

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Nearby</Text>
          <View style={styles.headerSubRow}>
            <IconSymbol name="location.fill" size={12} color="#A78BCA" />
            <Text style={styles.headerSub}> {activeTrip?.destination || "Your Location"}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <IconSymbol name="magnifyingglass" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Map */}
      <MockMap destination={activeTrip?.destination || "Paris"} />

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const color = CATEGORY_COLORS[cat.id] || "#7B2FBE";
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryPill, isActive && { backgroundColor: color + "33", borderColor: color }]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.8}
            >
              <IconSymbol name={cat.iconName} size={14} color={isActive ? color : "#A78BCA"} />
              <Text style={[styles.categoryLabel, isActive && { color: "#FFFFFF" }]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Places List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, gap: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const iconColor = CATEGORY_COLORS[item.category] || "#7B2FBE";
          return (
            <TouchableOpacity
              style={styles.placeCard}
              onPress={() => setSelectedPlace(selectedPlace?.id === item.id ? null : item)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.placeCardGradient}>
                <View style={styles.placeCardTop}>
                  <View style={[styles.placeIconWrap, { backgroundColor: iconColor + "22" }]}>
                    <IconSymbol name={item.iconName} size={22} color={iconColor} />
                  </View>
                  <View style={styles.placeInfo}>
                    <View style={styles.placeNameRow}>
                      <Text style={styles.placeName}>{item.name}</Text>
                      {item.open ? (
                        <View style={styles.openBadge}><Text style={styles.openText}>Open</Text></View>
                      ) : (
                        <View style={styles.closedBadge}><Text style={styles.closedText}>Closed</Text></View>
                      )}
                    </View>
                    <Text style={styles.placeType}>{item.type}</Text>
                    <View style={styles.placeMeta}>
                      <View style={styles.placeMetaItem}>
                        <IconSymbol name="location.fill" size={11} color="#A78BCA" />
                        <Text style={styles.placeDistance}> {item.distance}</Text>
                      </View>
                      <View style={styles.placeMetaItem}>
                        <IconSymbol name="star.fill" size={11} color="#FFD700" />
                        <Text style={styles.placeRating}> {item.rating}</Text>
                      </View>
                      <Text style={styles.placePrice}>{item.price}</Text>
                    </View>
                  </View>
                </View>

                {/* Expanded details */}
                {selectedPlace?.id === item.id && (
                  <View style={styles.placeDetails}>
                    <View style={styles.placeDetailRow}>
                      <IconSymbol name="location.fill" size={14} color="#A78BCA" />
                      <Text style={styles.placeDetailText}>{item.address}</Text>
                    </View>
                    <View style={styles.placeDetailRow}>
                      <IconSymbol name="clock.fill" size={14} color="#A78BCA" />
                      <Text style={styles.placeDetailText}>{item.hours}</Text>
                    </View>
                    <View style={styles.placeTagsRow}>
                      {item.tags.map((tag) => (
                        <View key={tag} style={styles.placeTag}>
                          <Text style={styles.placeTagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.placeActions}>
                      <TouchableOpacity style={styles.placeActionBtn}>
                        <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.placeActionGradient}>
                          <IconSymbol name="location.north.fill" size={14} color="#FFFFFF" />
                          <Text style={styles.placeActionText}>Directions</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.placeActionBtnOutline}>
                        <IconSymbol name="bookmark.fill" size={14} color="#7B2FBE" />
                        <Text style={styles.placeActionTextOutline}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.placeActionBtnOutline}>
                        <IconSymbol name="bubble.left.fill" size={14} color="#7B2FBE" />
                        <Text style={styles.placeActionTextOutline}>Ask TRAVI</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, gap: 12,
  },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerInfo: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  headerSubRow: { flexDirection: "row", alignItems: "center", marginTop: 1 },
  headerSub: { color: "#A78BCA", fontSize: 13 },
  searchBtn: { padding: 8 },
  mapContainer: { height: 200, overflow: "hidden" },
  mapBg: { flex: 1, position: "relative" },
  gridLine: { position: "absolute", backgroundColor: "rgba(255,255,255,0.04)" },
  gridLineH: { left: 0, right: 0, height: 1 },
  gridLineV: { top: 0, bottom: 0, width: 1 },
  street: { position: "absolute", backgroundColor: "rgba(255,255,255,0.12)" },
  parkArea: {
    position: "absolute", top: "10%", left: "5%", width: "25%", height: "25%",
    backgroundColor: "rgba(76,175,80,0.15)", borderRadius: 8,
  },
  waterArea: {
    position: "absolute", bottom: "5%", right: "5%", width: "30%", height: "20%",
    backgroundColor: "rgba(33,150,243,0.15)", borderRadius: 8,
  },
  marker: { position: "absolute", alignItems: "center" },
  markerYou: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "#7B2FBE", alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: "#FFFFFF",
  },
  markerIcon: {
    position: "absolute",
    width: 26, height: 26, borderRadius: 8,
    backgroundColor: "rgba(45,27,105,0.9)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
  },
  markerLabel: {
    backgroundColor: "#7B2FBE", borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2, marginTop: 2,
  },
  markerLabelText: { color: "#FFFFFF", fontSize: 10, fontWeight: "700" },
  mapLabel: {
    position: "absolute", bottom: 8, left: 12,
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  mapLabelText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  mapControls: {
    position: "absolute", right: 12, top: 12, gap: 4,
  },
  mapControlBtn: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: "rgba(45,27,105,0.9)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "#4A3080",
  },
  mapControlText: { color: "#FFFFFF", fontSize: 18, fontWeight: "300" },
  categoryScroll: { maxHeight: 54, borderBottomWidth: 1, borderBottomColor: "#2D1B69" },
  categoryPill: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#2D1B69", borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
    gap: 5, borderWidth: 1, borderColor: "#4A3080",
  },
  categoryLabel: { color: "#A78BCA", fontSize: 13, fontWeight: "600" },
  placeCard: { borderRadius: 14, overflow: "hidden" },
  placeCardGradient: { padding: 14, borderWidth: 1, borderColor: "#4A3080", borderRadius: 14 },
  placeCardTop: { flexDirection: "row", gap: 12 },
  placeIconWrap: {
    width: 48, height: 48, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  placeInfo: { flex: 1 },
  placeNameRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 2 },
  placeName: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", flex: 1 },
  openBadge: {
    backgroundColor: "rgba(76,175,80,0.2)", borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: "#4CAF50",
  },
  openText: { color: "#4CAF50", fontSize: 10, fontWeight: "700" },
  closedBadge: {
    backgroundColor: "rgba(244,67,54,0.15)", borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: "#F44336",
  },
  closedText: { color: "#F44336", fontSize: 10, fontWeight: "700" },
  placeType: { color: "#A78BCA", fontSize: 12, marginBottom: 6 },
  placeMeta: { flexDirection: "row", gap: 10, alignItems: "center" },
  placeMetaItem: { flexDirection: "row", alignItems: "center" },
  placeDistance: { color: "#A78BCA", fontSize: 12 },
  placeRating: { color: "#FFD700", fontSize: 12 },
  placePrice: { color: "#4CAF50", fontSize: 12, fontWeight: "600" },
  placeDetails: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#4A3080", gap: 8 },
  placeDetailRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  placeDetailText: { color: "#A78BCA", fontSize: 13, flex: 1, lineHeight: 18 },
  placeTagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  placeTag: {
    backgroundColor: "rgba(123,47,190,0.2)", borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: "#4A3080",
  },
  placeTagText: { color: "#A78BCA", fontSize: 11 },
  placeActions: { flexDirection: "row", gap: 8, marginTop: 4 },
  placeActionBtn: { borderRadius: 10, overflow: "hidden" },
  placeActionGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 7, gap: 5 },
  placeActionText: { color: "#FFFFFF", fontSize: 13, fontWeight: "600" },
  placeActionBtnOutline: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: "#4A3080",
    borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7, gap: 5,
  },
  placeActionTextOutline: { color: "#A78BCA", fontSize: 13 },
});
