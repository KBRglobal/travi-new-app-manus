import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated, Modal, FlatList } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const QUICK_ACTIONS = [
  { id: "chat", icon: "💬", label: "Ask TRAVI", desc: "AI assistant", route: "/(live)/chat", gradient: ["#7B2FBE", "#5A1E9E"] as [string, string] },
  { id: "itinerary", icon: "📋", label: "Today's Plan", desc: "View schedule", route: "/(live)/itinerary", gradient: ["#1A3A5C", "#2D1B69"] as [string, string] },
  { id: "map", icon: "🗺️", label: "Nearby", desc: "Explore area", route: "/(live)/map", gradient: ["#1B4D1E", "#2D3A1B"] as [string, string] },
  { id: "emergency", icon: "🆘", label: "Emergency", desc: "Get help", route: null, gradient: ["#8B1A1A", "#5C1010"] as [string, string] },
];

const WEATHER = { temp: "22°C", condition: "Partly Cloudy", icon: "⛅", humidity: "65%", wind: "12 km/h", uv: "Moderate" };

const LIVE_TIPS = [
  "💡 The Eiffel Tower sparkles every hour after dark — don't miss it tonight!",
  "🍽️ Try Café de Flore for breakfast — it's a Parisian institution since 1887",
  "🚇 The Navigo Découverte card gives unlimited metro rides for €22.80/week",
  "📸 Best Eiffel Tower photo spot: Trocadéro gardens at golden hour",
  "🛍️ Avoid tourist shops near landmarks — head to Marais for authentic souvenirs",
];

const MOCK_NEARBY = [
  { name: "Le Comptoir du Relais", type: "French Bistro", distance: "180m", rating: 4.7, emoji: "🍽️" },
  { name: "Musée d'Orsay", type: "Art Museum", distance: "320m", rating: 4.8, emoji: "🎨" },
  { name: "Café de Flore", type: "Historic Café", distance: "250m", rating: 4.5, emoji: "☕" },
];

const MOCK_ACTIVE_TRIP = {
  id: "demo1",
  destination: "Paris",
  country: "France",
  startDate: "Apr 15",
  endDate: "Apr 22",
  travelers: 2,
  budget: "Luxury",
  status: "active" as const,
  interests: ["culture", "food"],
  landmarks: ["Eiffel Tower", "Louvre"],
  itinerary: [
    {
      day: 1, date: "Apr 15",
      activities: [
        { id: "a1", time: "14:00", title: "Check-in Le Bristol", description: "Luxury 5-star hotel check-in", location: "Rue du Faubourg Saint-Honoré", price: 0, category: "hotel" as const, status: "completed" as const },
        { id: "a2", time: "16:00", title: "Eiffel Tower Visit", description: "Skip-the-line tickets booked", location: "Champ de Mars, Paris", price: 28, category: "activity" as const, status: "confirmed" as const },
        { id: "a3", time: "20:00", title: "Dinner at Jules Verne", description: "Michelin-starred restaurant inside the Eiffel Tower", location: "Eiffel Tower, 2nd floor", price: 180, category: "food" as const, status: "pending" as const },
      ],
    },
  ],
  totalCost: 4850,
  pointsEarned: 2425,
};

export default function LiveHomeScreen() {
  const { state, dispatch } = useStore();
  const activeTrip = state.trips.find((t) => t.status === "active") || MOCK_ACTIVE_TRIP;
  const [currentTip, setCurrentTip] = useState(0);
  const [showEmergency, setShowEmergency] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const tipFadeAnim = useRef(new Animated.Value(1)).current;

  const today = activeTrip?.itinerary?.[0];
  const currentHour = new Date().getHours();

  // Pulse animation for LIVE indicator
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Auto-rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(tipFadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        setCurrentTip((t) => (t + 1) % LIVE_TIPS.length);
        Animated.timing(tipFadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentActivity = today?.activities?.find((a) => {
    const h = parseInt(a.time.split(":")[0]);
    return Math.abs(h - currentHour) <= 1;
  }) || today?.activities?.[0];

  const nextActivity = today?.activities?.find((a) => {
    const h = parseInt(a.time.split(":")[0]);
    return h > currentHour;
  });

  const handleAction = (action: typeof QUICK_ACTIONS[0]) => {
    if (action.id === "emergency") {
      setShowEmergency(true);
    } else if (action.route) {
      router.push(action.route as never);
    }
  };

  const handleActivateDemo = () => {
    if (!state.trips.find((t) => t.status === "active")) {
      dispatch({ type: "ADD_TRIP", payload: { ...MOCK_ACTIVE_TRIP, id: Date.now().toString() } });
    }
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Live Mode Header */}
      <LinearGradient colors={["#0D1F0D", "#1B4D1E", "#2D1B69"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.liveIndicatorRow}>
            <Animated.View style={[styles.livePulse, { transform: [{ scale: pulseAnim }] }]} />
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE MODE</Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <IconSymbol name="ellipsis" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Trip info */}
        <View style={styles.tripInfoRow}>
          <View>
            <Text style={styles.tripDestination}>{activeTrip?.destination || "Your Trip"}</Text>
            <Text style={styles.tripDates}>
              📅 {activeTrip?.startDate} → {activeTrip?.endDate} • {activeTrip?.travelers} travelers
            </Text>
          </View>
          <View style={styles.weatherBadge}>
            <Text style={styles.weatherIcon}>{WEATHER.icon}</Text>
            <Text style={styles.weatherTemp}>{WEATHER.temp}</Text>
          </View>
        </View>

        {/* Day progress */}
        <View style={styles.dayProgress}>
          <View style={styles.dayProgressBar}>
            <View style={[styles.dayProgressFill, { width: `${Math.min(100, (currentHour / 22) * 100)}%` as any }]} />
          </View>
          <Text style={styles.dayProgressLabel}>Day 1 of {activeTrip?.itinerary?.length || 7}</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── CURRENT ACTIVITY ────────────────────────────────────────────── */}
        {currentActivity && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Happening Now</Text>
            <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.currentCard}>
              <View style={styles.currentCardHeader}>
                <View style={styles.currentTimeBadge}>
                  <Text style={styles.currentTimeText}>{currentActivity.time}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>In Progress</Text>
                </View>
              </View>
              <Text style={styles.currentTitle}>{currentActivity.title}</Text>
              <Text style={styles.currentDesc}>{currentActivity.description}</Text>
              <View style={styles.currentMeta}>
                <IconSymbol name="location.fill" size={13} color="#A78BCA" />
                <Text style={styles.currentLocation}>{currentActivity.location}</Text>
                {currentActivity.price > 0 && (
                  <Text style={styles.currentPrice}>${currentActivity.price}</Text>
                )}
              </View>
              <View style={styles.currentActions}>
                <TouchableOpacity
                  style={styles.currentActionBtn}
                  onPress={() => router.push("/(live)/map" as never)}
                  activeOpacity={0.85}
                >
                  <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.currentActionGradient}>
                    <IconSymbol name="location.north.fill" size={14} color="#FFFFFF" />
                    <Text style={styles.currentActionText}>Directions</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.currentActionBtnOutline}
                  onPress={() => router.push("/(live)/chat" as never)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.currentActionTextOutline}>💬 Ask TRAVI</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* ── NEXT UP ──────────────────────────────────────────────────────── */}
        {nextActivity && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⏭️ Up Next</Text>
            <TouchableOpacity
              style={styles.nextCard}
              onPress={() => router.push("/(live)/itinerary" as never)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#1A2A4A", "#2D1B69"]} style={styles.nextCardGradient}>
                <View style={styles.nextTimeBadge}>
                  <Text style={styles.nextTimeText}>{nextActivity.time}</Text>
                </View>
                <View style={styles.nextInfo}>
                  <Text style={styles.nextTitle}>{nextActivity.title}</Text>
                  <Text style={styles.nextLocation}>📍 {nextActivity.location}</Text>
                </View>
                <IconSymbol name="chevron.right" size={18} color="#A78BCA" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* ── QUICK ACTIONS ────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => handleAction(action)}
                activeOpacity={0.85}
              >
                <LinearGradient colors={action.gradient} style={styles.quickActionGradient}>
                  <Text style={styles.quickActionIcon}>{action.icon}</Text>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                  <Text style={styles.quickActionDesc}>{action.desc}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── WEATHER CARD ─────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌤️ Today's Weather</Text>
          <LinearGradient colors={["#1A3A5C", "#2D1B69"]} style={styles.weatherCard}>
            <View style={styles.weatherMain}>
              <Text style={styles.weatherBigIcon}>{WEATHER.icon}</Text>
              <View>
                <Text style={styles.weatherBigTemp}>{WEATHER.temp}</Text>
                <Text style={styles.weatherCondition}>{WEATHER.condition}</Text>
              </View>
            </View>
            <View style={styles.weatherDetails}>
              {[
                { label: "Humidity", value: WEATHER.humidity, icon: "💧" },
                { label: "Wind", value: WEATHER.wind, icon: "💨" },
                { label: "UV Index", value: WEATHER.uv, icon: "☀️" },
              ].map((item) => (
                <View key={item.label} style={styles.weatherDetailItem}>
                  <Text style={styles.weatherDetailIcon}>{item.icon}</Text>
                  <Text style={styles.weatherDetailValue}>{item.value}</Text>
                  <Text style={styles.weatherDetailLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* ── TRAVI TIP ────────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Animated.View style={{ opacity: tipFadeAnim }}>
            <TouchableOpacity
              style={styles.tipCard}
              onPress={() => setCurrentTip((t) => (t + 1) % LIVE_TIPS.length)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["rgba(123,47,190,0.25)", "rgba(233,30,140,0.15)"]}
                style={styles.tipGradient}
              >
                <Image source={require("@/assets/images/icon.png")} style={styles.tipDuck} contentFit="contain" />
                <View style={styles.tipContent}>
                  <Text style={styles.tipLabel}>TRAVI Tip</Text>
                  <Text style={styles.tipText}>{LIVE_TIPS[currentTip]}</Text>
                  <Text style={styles.tipHint}>Tap for next tip</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* ── NEARBY HIGHLIGHTS ────────────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📍 Nearby</Text>
            <TouchableOpacity onPress={() => router.push("/(live)/map" as never)}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          {MOCK_NEARBY.map((place) => (
            <TouchableOpacity
              key={place.name}
              style={styles.nearbyCard}
              onPress={() => router.push("/(live)/map" as never)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.nearbyCardGradient}>
                <View style={styles.nearbyEmoji}>
                  <Text style={{ fontSize: 22 }}>{place.emoji}</Text>
                </View>
                <View style={styles.nearbyInfo}>
                  <Text style={styles.nearbyName}>{place.name}</Text>
                  <Text style={styles.nearbyType}>{place.type}</Text>
                </View>
                <View style={styles.nearbyRight}>
                  <Text style={styles.nearbyRating}>⭐ {place.rating}</Text>
                  <Text style={styles.nearbyDistance}>{place.distance}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── POINTS EARNED ────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.2)"]} style={styles.pointsCard}>
            <Text style={styles.pointsCardStar}>✦</Text>
            <View style={styles.pointsCardInfo}>
              <Text style={styles.pointsCardTitle}>Points Earned This Trip</Text>
              <Text style={styles.pointsCardValue}>{(activeTrip?.pointsEarned || 2425).toLocaleString()} pts</Text>
            </View>
            <TouchableOpacity
              style={styles.pointsCardBtn}
              onPress={() => router.push("/(tabs)/wallet" as never)}
              activeOpacity={0.85}
            >
              <Text style={styles.pointsCardBtnText}>View →</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Emergency Modal */}
      <Modal visible={showEmergency} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.emergencyModal}>
            <View style={styles.emergencyHeader}>
              <Text style={styles.emergencyTitle}>🆘 Emergency Contacts</Text>
              <TouchableOpacity onPress={() => setShowEmergency(false)}>
                <IconSymbol name="xmark" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            {[
              { label: "Police", number: "17", emoji: "👮" },
              { label: "Ambulance / SAMU", number: "15", emoji: "🚑" },
              { label: "Fire Brigade", number: "18", emoji: "🚒" },
              { label: "European Emergency", number: "112", emoji: "🆘" },
              { label: "Tourist Police", number: "+33 1 53 71 53 71", emoji: "🏛️" },
            ].map((e) => (
              <TouchableOpacity key={e.label} style={styles.emergencyItem} activeOpacity={0.8}>
                <Text style={styles.emergencyEmoji}>{e.emoji}</Text>
                <View style={styles.emergencyItemInfo}>
                  <Text style={styles.emergencyLabel}>{e.label}</Text>
                  <Text style={styles.emergencyNumber}>{e.number}</Text>
                </View>
                <View style={styles.callBtn}>
                  <LinearGradient colors={["#C62828", "#8B1A1A"]} style={styles.callGradient}>
                    <IconSymbol name="phone.fill" size={14} color="#FFFFFF" />
                    <Text style={styles.callText}>Call</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, gap: 12 },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  liveIndicatorRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  livePulse: {
    position: "absolute",
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: "rgba(76,175,80,0.3)",
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4CAF50" },
  liveText: { color: "#4CAF50", fontSize: 13, fontWeight: "800", letterSpacing: 2 },
  settingsBtn: { padding: 8 },
  tripInfoRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  tripDestination: { color: "#FFFFFF", fontSize: 24, fontWeight: "800" },
  tripDates: { color: "#A78BCA", fontSize: 13, marginTop: 2 },
  weatherBadge: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 6, gap: 4,
  },
  weatherIcon: { fontSize: 16 },
  weatherTemp: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  dayProgress: { gap: 4 },
  dayProgressBar: { height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" },
  dayProgressFill: { height: "100%", backgroundColor: "#4CAF50", borderRadius: 2 },
  dayProgressLabel: { color: "#A78BCA", fontSize: 11, textAlign: "right" },
  content: { padding: 16, gap: 4, paddingBottom: 100 },
  section: { marginBottom: 16 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  seeAll: { color: "#7B2FBE", fontSize: 13, fontWeight: "600" },
  currentCard: { borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#4A3080" },
  currentCardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  currentTimeBadge: {
    backgroundColor: "rgba(123,47,190,0.3)", borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: "#7B2FBE",
  },
  currentTimeText: { color: "#E91E8C", fontSize: 13, fontWeight: "700" },
  statusBadge: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "rgba(76,175,80,0.15)", borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: "#4CAF50",
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#4CAF50" },
  statusText: { color: "#4CAF50", fontSize: 11, fontWeight: "600" },
  currentTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", marginBottom: 4 },
  currentDesc: { color: "#A78BCA", fontSize: 14, lineHeight: 20, marginBottom: 8 },
  currentMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  currentLocation: { color: "#A78BCA", fontSize: 13, flex: 1 },
  currentPrice: { color: "#4CAF50", fontSize: 13, fontWeight: "600" },
  currentActions: { flexDirection: "row", gap: 10 },
  currentActionBtn: { borderRadius: 10, overflow: "hidden" },
  currentActionGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 9, gap: 6 },
  currentActionText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  currentActionBtnOutline: {
    flex: 1, borderWidth: 1, borderColor: "#4A3080",
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9,
    alignItems: "center",
  },
  currentActionTextOutline: { color: "#A78BCA", fontSize: 14 },
  nextCard: { borderRadius: 12, overflow: "hidden" },
  nextCardGradient: {
    flexDirection: "row", alignItems: "center",
    padding: 14, gap: 12, borderWidth: 1, borderColor: "#4A3080", borderRadius: 12,
  },
  nextTimeBadge: {
    backgroundColor: "rgba(33,150,243,0.2)", borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "#2196F3",
  },
  nextTimeText: { color: "#2196F3", fontSize: 13, fontWeight: "700" },
  nextInfo: { flex: 1 },
  nextTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  nextLocation: { color: "#A78BCA", fontSize: 12, marginTop: 2 },
  quickActionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  quickActionCard: { width: (width - 52) / 2, borderRadius: 14, overflow: "hidden" },
  quickActionGradient: { padding: 16, gap: 6, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: 14 },
  quickActionIcon: { fontSize: 28 },
  quickActionLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  quickActionDesc: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  weatherCard: { borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#4A3080" },
  weatherMain: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 16 },
  weatherBigIcon: { fontSize: 48 },
  weatherBigTemp: { color: "#FFFFFF", fontSize: 36, fontWeight: "800" },
  weatherCondition: { color: "#A78BCA", fontSize: 14, marginTop: 2 },
  weatherDetails: { flexDirection: "row", justifyContent: "space-around" },
  weatherDetailItem: { alignItems: "center", gap: 4 },
  weatherDetailIcon: { fontSize: 20 },
  weatherDetailValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  weatherDetailLabel: { color: "#A78BCA", fontSize: 11 },
  tipCard: { borderRadius: 14, overflow: "hidden" },
  tipGradient: {
    flexDirection: "row", alignItems: "center",
    padding: 14, gap: 12, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)", borderRadius: 14,
  },
  tipDuck: { width: 50, height: 50 },
  tipContent: { flex: 1 },
  tipLabel: { color: "#E91E8C", fontSize: 11, fontWeight: "700", marginBottom: 4, letterSpacing: 0.5 },
  tipText: { color: "#FFFFFF", fontSize: 13, lineHeight: 18 },
  tipHint: { color: "#6B5A8A", fontSize: 11, marginTop: 4 },
  nearbyCard: { borderRadius: 12, overflow: "hidden", marginBottom: 8 },
  nearbyCardGradient: {
    flexDirection: "row", alignItems: "center",
    padding: 12, gap: 12, borderWidth: 1, borderColor: "#4A3080", borderRadius: 12,
  },
  nearbyEmoji: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: "rgba(123,47,190,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  nearbyInfo: { flex: 1 },
  nearbyName: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  nearbyType: { color: "#A78BCA", fontSize: 12, marginTop: 2 },
  nearbyRight: { alignItems: "flex-end", gap: 2 },
  nearbyRating: { color: "#FFD700", fontSize: 12 },
  nearbyDistance: { color: "#A78BCA", fontSize: 12 },
  pointsCard: {
    flexDirection: "row", alignItems: "center",
    borderRadius: 14, padding: 14, gap: 12,
    borderWidth: 1, borderColor: "rgba(123,47,190,0.4)",
  },
  pointsCardStar: { fontSize: 28, color: "#FFD700" },
  pointsCardInfo: { flex: 1 },
  pointsCardTitle: { color: "#A78BCA", fontSize: 12 },
  pointsCardValue: { color: "#FFD700", fontSize: 20, fontWeight: "800" },
  pointsCardBtn: {
    backgroundColor: "rgba(123,47,190,0.3)", borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "#7B2FBE",
  },
  pointsCardBtnText: { color: "#A78BCA", fontSize: 13, fontWeight: "600" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  emergencyModal: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 16 },
  emergencyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  emergencyTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  emergencyItem: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12,
    padding: 14, gap: 12, borderWidth: 1, borderColor: "#4A3080",
  },
  emergencyEmoji: { fontSize: 24 },
  emergencyItemInfo: { flex: 1 },
  emergencyLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  emergencyNumber: { color: "#A78BCA", fontSize: 13, marginTop: 2 },
  callBtn: { borderRadius: 10, overflow: "hidden" },
  callGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, gap: 5 },
  callText: { color: "#FFFFFF", fontSize: 13, fontWeight: "600" },
});
