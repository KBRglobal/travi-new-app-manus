import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated, Modal } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Image } from "react-native";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const WEATHER = { temp: "22°C", condition: "Partly Cloudy", humidity: "65%", wind: "12 km/h", uv: "Moderate" };

const LIVE_TIPS = [
  "The Eiffel Tower sparkles every hour after dark — don't miss it tonight!",
  "Try Café de Flore for breakfast — it's a Parisian institution since 1887",
  "The Navigo Découverte card gives unlimited metro rides for €22.80/week",
  "Best Eiffel Tower photo spot: Trocadéro gardens at golden hour",
  "Avoid tourist shops near landmarks — head to Marais for authentic souvenirs",
];

const MOCK_ACTIVE_TRIP = {
  id: "demo1", destination: "Paris", country: "France",
  startDate: "Apr 15", endDate: "Apr 22", travelers: 2, budget: "Luxury",
  status: "active" as const, interests: ["culture", "food"], landmarks: ["Eiffel Tower", "Louvre"],
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
  totalCost: 4850, pointsEarned: 2425,
};

const EMERGENCY_CONTACTS = [
  { label: "Police", number: "17", iconName: "shield.fill" as const, color: "#2196F3" },
  { label: "Ambulance", number: "15", iconName: "cross.circle.fill" as const, color: "#F44336" },
  { label: "Fire Brigade", number: "18", iconName: "flame.fill" as const, color: "#FF9800" },
  { label: "Embassy", number: "+33 1 43 12 22 22", iconName: "building.columns.fill" as const, color: "#9C27B0" },
];

const WEATHER_ITEMS = [
  { label: "Temperature", value: WEATHER.temp, iconName: "thermometer" as const, color: "#FF9800" },
  { label: "Humidity", value: WEATHER.humidity, iconName: "cloud.rain.fill" as const, color: "#2196F3" },
  { label: "Wind", value: WEATHER.wind, iconName: "wind" as const, color: "#4CAF50" },
  { label: "UV Index", value: WEATHER.uv, iconName: "sun.max.fill" as const, color: "#FBBF24" },
];

export default function LiveHomeScreen() {
  const { state } = useStore();
  const activeTrip = state.trips.find((t) => t.status === "active") || MOCK_ACTIVE_TRIP;
  const [currentTip, setCurrentTip] = useState(0);
  const [showEmergency, setShowEmergency] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const tipFadeAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const today = activeTrip?.itinerary?.[0];
  const currentHour = new Date().getHours();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.4, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

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

  const completedActivities = today?.activities?.filter((a) => a.status === "completed").length || 1;
  const totalActivities = today?.activities?.length || 3;
  const dayProgress = completedActivities / totalActivities;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D0628", "#0A0520", "#0D1A0D"]} locations={[0, 0.6, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <Animated.View style={[styles.orb3, { opacity: glowAnim }]} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <View style={styles.backBtnInner}>
            <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <View style={styles.liveBadgeWrap}>
          <LinearGradient colors={["rgba(76,175,80,0.3)", "rgba(76,175,80,0.15)"]} style={styles.liveBadge}>
            <Animated.View style={[styles.livePulse, { transform: [{ scale: pulseAnim }] }]} />
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE MODE</Text>
          </LinearGradient>
        </View>

        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
          <View style={styles.moreBtnInner}>
            <IconSymbol name="ellipsis" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Trip Card */}
        <View style={styles.heroCard}>
          <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(76,175,80,0.3)", "rgba(4,0,16,0.9)"]} locations={[0, 0.5, 1]} style={styles.heroGradient}>
            <View style={styles.heroCircle1} />
            <View style={styles.heroCircle2} />

            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroDestination}>{activeTrip?.destination}</Text>
                <Text style={styles.heroCountry}>{activeTrip?.country}</Text>
              </View>
              <View style={styles.weatherCard}>
                <IconSymbol name="sun.max.fill" size={22} color="#FBBF24" />
                <Text style={styles.weatherTemp}>{WEATHER.temp}</Text>
                <Text style={styles.weatherCond}>{WEATHER.condition}</Text>
              </View>
            </View>

            <View style={styles.heroMeta}>
              <View style={styles.heroMetaItem}>
                <IconSymbol name="calendar" size={12} color="rgba(255,255,255,0.6)" />
                <Text style={styles.heroMetaText}>{activeTrip?.startDate} – {activeTrip?.endDate}</Text>
              </View>
              <View style={styles.heroMetaItem}>
                <IconSymbol name="person.2.fill" size={12} color="rgba(255,255,255,0.6)" />
                <Text style={styles.heroMetaText}>{activeTrip?.travelers} travelers</Text>
              </View>
            </View>

            <View style={styles.progressWrap}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Day 1 of {activeTrip?.itinerary?.length || 7}</Text>
                <Text style={styles.progressPct}>{completedActivities}/{totalActivities} activities</Text>
              </View>
              <View style={styles.progressBar}>
                <LinearGradient colors={["#4CAF50", "#6443F4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.progressFill, { width: `${dayProgress * 100}%` as any }]} />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Current Activity */}
        {currentActivity && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <IconSymbol name="location.fill" size={16} color="#6443F4" />
              <Text style={styles.sectionTitle}> Happening Now</Text>
            </View>
            <View style={styles.currentCard}>
              <LinearGradient colors={["rgba(123,47,190,0.35)", "rgba(233,30,140,0.2)", "rgba(4,0,16,0.8)"]} locations={[0, 0.5, 1]} style={StyleSheet.absoluteFillObject} />
              <View style={styles.currentTopRow}>
                <View style={styles.currentTimeBadge}>
                  <Text style={styles.currentTimeText}>{currentActivity.time}</Text>
                </View>
                <View style={styles.inProgressBadge}>
                  <View style={styles.inProgressDot} />
                  <Text style={styles.inProgressText}>In Progress</Text>
                </View>
              </View>
              <Text style={styles.currentTitle}>{currentActivity.title}</Text>
              <Text style={styles.currentDesc}>{currentActivity.description}</Text>
              <View style={styles.currentLocationRow}>
                <IconSymbol name="location.fill" size={13} color="#6443F4" />
                <Text style={styles.currentLocationText}>{currentActivity.location}</Text>
                {currentActivity.price > 0 && <Text style={styles.currentPrice}>${currentActivity.price}</Text>}
              </View>
              <View style={styles.currentBtns}>
                <TouchableOpacity style={styles.dirBtn} onPress={() => router.push("/(live)/map" as never)} activeOpacity={0.85}>
                  <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.dirBtnGradient}>
                    <IconSymbol name="location.north.fill" size={14} color="#FFFFFF" />
                    <Text style={styles.dirBtnText}>Directions</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.askBtn} onPress={() => router.push("/(live)/chat" as never)} activeOpacity={0.85}>
                  <IconSymbol name="bubble.left.fill" size={14} color="#C4B5D9" />
                  <Text style={styles.askBtnText}>Ask TRAVI</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Next Activity */}
        {nextActivity && (
          <TouchableOpacity style={styles.nextCard} onPress={() => router.push("/(live)/itinerary" as never)} activeOpacity={0.85}>
            <LinearGradient colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.55)"]} style={StyleSheet.absoluteFillObject} />
            <View style={styles.nextLeft}>
              <Text style={styles.nextLabel}>Up Next</Text>
              <View style={styles.nextTimeBadge}>
                <Text style={styles.nextTimeText}>{nextActivity.time}</Text>
              </View>
            </View>
            <View style={styles.nextInfo}>
              <Text style={styles.nextTitle}>{nextActivity.title}</Text>
              <View style={styles.nextLocationRow}>
                <IconSymbol name="location.fill" size={11} color="#5A4D72" />
                <Text style={styles.nextLocation}>{nextActivity.location}</Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={18} color="#5A4D72" />
          </TouchableOpacity>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {([
              { id: "chat", icon: "bubble.left.fill" as const, label: "Ask TRAVI", sub: "AI assistant", route: "/(live)/chat", colors: ["#6443F4", "#5A1E9E"] as [string, string] },
              { id: "plan", icon: "calendar" as const, label: "Schedule", sub: "Day by day", route: "/(live)/schedule", colors: ["#1A3A5C", "#2D1B69"] as [string, string] },
              { id: "map", icon: "map.fill" as const, label: "Nearby", sub: "Explore area", route: "/(live)/map", colors: ["#1B4D1E", "#2D3A1B"] as [string, string] },
              { id: "split", icon: "dollarsign.circle.fill" as const, label: "Expenses", sub: "Track & split", route: "/(live)/expenses", colors: ["#1A3A1A", "#2D3A2D"] as [string, string] },
              { id: "summary", icon: "trophy.fill" as const, label: "Trip Summary", sub: "Memories & stats", route: "/(live)/trip-summary", colors: ["#3A2A00", "#2D1B00"] as [string, string] },
              { id: "emergency", icon: "exclamationmark.triangle.fill" as const, label: "Emergency", sub: "Get help", route: null, colors: ["#8B1A1A", "#5C1010"] as [string, string] },
            ] as const).map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => {
                  if (action.id === "emergency") setShowEmergency(true);
                  else if (action.route) router.push(action.route as never);
                }}
                activeOpacity={0.85}
              >
                <LinearGradient colors={action.colors} style={styles.actionGradient}>
                  <IconSymbol name={action.icon} size={26} color="#FFFFFF" />
                  <Text style={styles.actionLabel}>{action.label}</Text>
                  <Text style={styles.actionSub}>{action.sub}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* TRAVI Tip */}
        <View style={styles.tipCard}>
          <LinearGradient colors={["rgba(123,47,190,0.25)", "rgba(233,30,140,0.15)"]} style={StyleSheet.absoluteFillObject} />
          <View style={styles.tipHeader}>
            <View style={styles.tipLogoWrap}>
              <Image source={require("@/assets/logos/mascot-dark.png")} style={styles.tipLogo} resizeMode="contain" />
            </View>
            <Text style={styles.tipTitle}>TRAVI Tip</Text>
          </View>
          <Animated.Text style={[styles.tipText, { opacity: tipFadeAnim }]}>
            {LIVE_TIPS[currentTip]}
          </Animated.Text>
          <View style={styles.tipDots}>
            {LIVE_TIPS.map((_, i) => (
              <View key={i} style={[styles.tipDot, i === currentTip && styles.tipDotActive]} />
            ))}
          </View>
        </View>

        {/* Weather Details */}
        <View style={styles.weatherDetails}>
          <LinearGradient colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.55)"]} style={StyleSheet.absoluteFillObject} />
          <View style={styles.weatherTitleRow}>
            <IconSymbol name="sun.max.fill" size={16} color="#FBBF24" />
            <Text style={styles.weatherTitle}> Weather in {activeTrip?.destination}</Text>
          </View>
          <View style={styles.weatherGrid}>
            {WEATHER_ITEMS.map((item) => (
              <View key={item.label} style={styles.weatherItem}>
                <View style={[styles.weatherItemIconWrap, { backgroundColor: item.color + "22" }]}>
                  <IconSymbol name={item.iconName} size={18} color={item.color} />
                </View>
                <Text style={styles.weatherItemValue}>{item.value}</Text>
                <Text style={styles.weatherItemLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Points earned */}
        <TouchableOpacity style={styles.pointsCard} onPress={() => router.push("/(tabs)/wallet" as never)} activeOpacity={0.85}>
          <LinearGradient colors={["rgba(255,215,0,0.2)", "rgba(255,152,0,0.1)"]} style={StyleSheet.absoluteFillObject} />
          <View style={styles.pointsLeft}>
            <View style={styles.pointsIconWrap}>
              <IconSymbol name="sparkles" size={22} color="#FBBF24" />
            </View>
            <View>
              <Text style={styles.pointsTitle}>Trip Points</Text>
              <Text style={styles.pointsSub}>Earning as you travel</Text>
            </View>
          </View>
          <View style={styles.pointsRight}>
            <Text style={styles.pointsValue}>{activeTrip?.pointsEarned?.toLocaleString() || "2,425"}</Text>
            <Text style={styles.pointsLabel}>pts earned</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Emergency Modal */}
      <Modal visible={showEmergency} transparent animationType="slide" onRequestClose={() => setShowEmergency(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={["#1A0A0A", "#2D0D0D"]} style={StyleSheet.absoluteFillObject} />
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <IconSymbol name="sos" size={22} color="#F44336" />
                <Text style={styles.modalTitle}> Emergency Contacts</Text>
              </View>
              <TouchableOpacity onPress={() => setShowEmergency(false)} activeOpacity={0.7}>
                <IconSymbol name="xmark.circle.fill" size={28} color="#F44336" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSub}>Emergency numbers in {activeTrip?.country}</Text>
            {EMERGENCY_CONTACTS.map((c) => (
              <TouchableOpacity key={c.label} style={styles.emergencyItem} activeOpacity={0.8}>
                <LinearGradient colors={["rgba(244,67,54,0.2)", "rgba(244,67,54,0.1)"]} style={StyleSheet.absoluteFillObject} />
                <View style={[styles.emergencyIconWrap, { backgroundColor: c.color + "22" }]}>
                  <IconSymbol name={c.iconName} size={22} color={c.color} />
                </View>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyLabel}>{c.label}</Text>
                  <Text style={styles.emergencyNumber}>{c.number}</Text>
                </View>
                <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
                  <IconSymbol name="phone.fill" size={14} color="#F44336" />
                  <Text style={styles.callBtnText}> Call</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width * 1.2, height: width * 1.2, borderRadius: width * 0.6, top: -width * 0.5, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.12)" },
  orb2: { position: "absolute", width: width * 0.8, height: width * 0.8, borderRadius: width * 0.4, bottom: 100, right: -width * 0.3, backgroundColor: "rgba(76,175,80,0.08)" },
  orb3: { position: "absolute", width: width * 0.6, height: width * 0.6, borderRadius: width * 0.3, top: width * 0.3, right: -width * 0.2, backgroundColor: "rgba(233,30,140,0.07)" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 22, paddingTop: 60, paddingBottom: 130 },
  backBtn: {},
  backBtnInner: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  liveBadgeWrap: { borderRadius: 12, overflow: "hidden" },
  liveBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 8, gap: 6, borderRadius: 12, borderWidth: 1, borderColor: "rgba(76,175,80,0.4)" },
  livePulse: { position: "absolute", width: 10, height: 10, borderRadius: 5, backgroundColor: "rgba(76,175,80,0.3)", left: 14 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4CAF50" },
  liveText: { color: "#4CAF50", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold", letterSpacing: 1 },
  moreBtn: {},
  moreBtnInner: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  scroll: { paddingHorizontal: 22, paddingBottom: 130, gap: 20 },
  heroCard: { borderRadius: 24, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.5)" },
  heroGradient: { padding: 22, gap: 14 },
  heroCircle1: { position: "absolute", width: 200, height: 200, borderRadius: 100, top: -60, right: -40, backgroundColor: "rgba(255,255,255,0.55)" },
  heroCircle2: { position: "absolute", width: 120, height: 120, borderRadius: 60, bottom: -20, left: 20, backgroundColor: "rgba(255,255,255,0.55)" },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  heroDestination: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", fontFamily: "Chillax-Bold", letterSpacing: -0.5 },
  heroCountry: { color: "rgba(255,255,255,0.6)", fontSize: 16, fontFamily: "Satoshi-Regular", marginTop: 2 },
  weatherCard: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 16, padding: 12, alignItems: "center", gap: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  weatherTemp: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  weatherCond: { color: "rgba(255,255,255,0.6)", fontSize: 10 },
  heroMeta: { flexDirection: "row", gap: 16 },
  heroMetaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  heroMetaText: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  progressWrap: { gap: 8 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between" },
  progressLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  progressPct: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  progressBar: { height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.55)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  section: { gap: 12 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center" },
  sectionTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  currentCard: { borderRadius: 22, padding: 20, gap: 10, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.5)" },
  currentTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  currentTimeBadge: { backgroundColor: "rgba(123,47,190,0.3)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(123,47,190,0.5)" },
  currentTimeText: { color: "#C4B5D9", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  inProgressBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(76,175,80,0.2)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  inProgressDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#4CAF50" },
  inProgressText: { color: "#4CAF50", fontSize: 12, fontWeight: "700" },
  currentTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", fontFamily: "Chillax-Bold" },
  currentDesc: { color: "#8B7AAA", fontSize: 14, fontFamily: "Satoshi-Regular", lineHeight: 20 },
  currentLocationRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  currentLocationText: { flex: 1, color: "#8B7AAA", fontSize: 13, fontFamily: "Satoshi-Regular" },
  currentPrice: { color: "#F94498", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  currentBtns: { flexDirection: "row", gap: 10, marginTop: 4 },
  dirBtn: { flex: 1, borderRadius: 14, overflow: "hidden" },
  dirBtnGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, gap: 6 },
  dirBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  askBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 14, borderWidth: 1.5, borderColor: "rgba(123,47,190,0.5)", paddingVertical: 12, gap: 6 },
  askBtnText: { color: "#C4B5D9", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  nextCard: { flexDirection: "row", alignItems: "center", borderRadius: 18, padding: 16, gap: 14, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.55)" },
  nextLeft: { gap: 4 },
  nextLabel: { color: "#5A4D72", fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  nextTimeBadge: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  nextTimeText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  nextInfo: { flex: 1 },
  nextTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  nextLocationRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  nextLocation: { color: "#5A4D72", fontSize: 12 },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  actionCard: { width: (width - 44 - 12) / 2, borderRadius: 20, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.55)" },
  actionGradient: { padding: 18, gap: 6, minHeight: 100 },
  actionLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  actionSub: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  tipCard: { borderRadius: 20, padding: 18, gap: 10, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.4)" },
  tipHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  tipLogoWrap: { width: 32, height: 32, borderRadius: 10, overflow: "hidden", backgroundColor: "rgba(123,47,190,0.3)" },
  tipLogo: { width: 32, height: 32 },
  tipTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  tipText: { color: "#C4B5D9", fontSize: 14, fontFamily: "Satoshi-Regular", lineHeight: 22 },
  tipDots: { flexDirection: "row", gap: 5 },
  tipDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: "rgba(255,255,255,0.55)" },
  tipDotActive: { width: 14, backgroundColor: "#6443F4" },
  weatherDetails: { borderRadius: 20, padding: 18, gap: 14, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.55)" },
  weatherTitleRow: { flexDirection: "row", alignItems: "center" },
  weatherTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  weatherGrid: { flexDirection: "row", justifyContent: "space-between" },
  weatherItem: { alignItems: "center", gap: 6 },
  weatherItemIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  weatherItemValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  weatherItemLabel: { color: "#5A4D72", fontSize: 11 },
  pointsCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 20, padding: 18, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,215,0,0.3)" },
  pointsLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  pointsIconWrap: { width: 44, height: 44, borderRadius: 14, backgroundColor: "rgba(255,215,0,0.15)", alignItems: "center", justifyContent: "center" },
  pointsTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  pointsSub: { color: "#5A4D72", fontSize: 12 },
  pointsRight: { alignItems: "flex-end" },
  pointsValue: { color: "#FBBF24", fontSize: 22, fontWeight: "800", fontFamily: "Chillax-Bold" },
  pointsLabel: { color: "#5A4D72", fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "flex-end" },
  modalContent: { borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 16, overflow: "hidden", borderTopWidth: 1.5, borderColor: "rgba(244,67,54,0.3)" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  modalTitleRow: { flexDirection: "row", alignItems: "center" },
  modalTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", fontFamily: "Chillax-Bold" },
  modalSub: { color: "#8B7AAA", fontSize: 14, fontFamily: "Satoshi-Regular" },
  emergencyItem: { flexDirection: "row", alignItems: "center", borderRadius: 16, padding: 14, gap: 12, overflow: "hidden", borderWidth: 1, borderColor: "rgba(244,67,54,0.3)" },
  emergencyIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  emergencyInfo: { flex: 1 },
  emergencyLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  emergencyNumber: { color: "#F44336", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold", marginTop: 2 },
  callBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(244,67,54,0.2)", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(244,67,54,0.4)" },
  callBtnText: { color: "#F44336", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
});
