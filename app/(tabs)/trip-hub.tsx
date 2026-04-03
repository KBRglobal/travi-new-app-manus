/**
 * TRAVI — Trip Hub
 * Post-booking command center. Shown after a trip is confirmed.
 * Acts as an AI concierge, upsell engine, and social connector.
 */

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Share,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { fetchWeather, type WeatherData } from "@/lib/weather";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UpsellItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  cashback: string;
  price: string;
  color: string;
  booked: boolean;
}

interface TravelerMatch {
  id: string;
  name: string;
  avatar: string;
  dnaMatch: number; // 0–100
  traits: string[];
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const UPSELLS: UpsellItem[] = [
  {
    id: "taxi",
    icon: "🚖",
    title: "Airport Transfer",
    subtitle: "Private taxi from DXB to your hotel",
    cashback: "$8 back",
    price: "$45",
    color: "#F59E0B",
    booked: false,
  },
  {
    id: "esim",
    icon: "📱",
    title: "UAE eSIM",
    subtitle: "10GB data, 30 days — no roaming fees",
    cashback: "$3 back",
    price: "$18",
    color: "#6443F4",
    booked: false,
  },
  {
    id: "insurance",
    icon: "🛡️",
    title: "Travel Insurance",
    subtitle: "Full coverage — medical, cancellation, luggage",
    cashback: "$12 back",
    price: "$65",
    color: "#10B981",
    booked: false,
  },
  {
    id: "hotel_upgrade",
    icon: "🏨",
    title: "Hotel Room Upgrade",
    subtitle: "Upgrade to Deluxe Sea View — only 2 left",
    cashback: "$25 back",
    price: "$120",
    color: "#EC4899",
    booked: false,
  },
  {
    id: "desert_safari",
    icon: "🐪",
    title: "Desert Safari",
    subtitle: "Sunset dunes + BBQ dinner — bestseller",
    cashback: "$15 back",
    price: "$85",
    color: "#D97706",
    booked: false,
  },
  {
    id: "dinner",
    icon: "🍽️",
    title: "Fine Dining Reservation",
    subtitle: "Nobu Dubai — pre-book your table",
    cashback: "$20 back",
    price: "$0 (pay at venue)",
    color: "#F94498",
    booked: false,
  },
];

const TRAVELER_MATCHES: TravelerMatch[] = [
  {
    id: "t1",
    name: "Yael K.",
    avatar: "https://i.pravatar.cc/80?img=47",
    dnaMatch: 94,
    traits: ["Foodie", "Culture Lover"],
  },
  {
    id: "t2",
    name: "Oren M.",
    avatar: "https://i.pravatar.cc/80?img=12",
    dnaMatch: 87,
    traits: ["Adventurer", "Night Owl"],
  },
  {
    id: "t3",
    name: "Dana S.",
    avatar: "https://i.pravatar.cc/80?img=32",
    dnaMatch: 81,
    traits: ["Explorer", "Wellness"],
  },
];

// ─── Countdown Component ─────────────────────────────────────────────────────

function Countdown({ departureDate }: { departureDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    function update() {
      const now = Date.now();
      const diff = departureDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    }
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [departureDate]);

  return (
    <View style={styles.countdownRow}>
      {[
        { value: timeLeft.days, label: "DAYS" },
        { value: timeLeft.hours, label: "HRS" },
        { value: timeLeft.minutes, label: "MIN" },
      ].map(({ value, label }) => (
        <View key={label} style={styles.countdownUnit}>
          <Text style={styles.countdownNumber}>{String(value).padStart(2, "0")}</Text>
          <Text style={styles.countdownLabel}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Upsell Card ─────────────────────────────────────────────────────────────

function UpsellCard({
  item,
  onBook,
}: {
  item: UpsellItem;
  onBook: (id: string) => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePress() {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    onBook(item.id);
  }

  return (
    <Animated.View style={[styles.upsellCard, { transform: [{ scale }] }]}>
      <View style={[styles.upsellIconWrap, { backgroundColor: item.color + "22" }]}>
        <Text style={styles.upsellIcon}>{item.icon}</Text>
      </View>
      <View style={styles.upsellInfo}>
        <Text style={styles.upsellTitle}>{item.title}</Text>
        <Text style={styles.upsellSub}>{item.subtitle}</Text>
        <View style={styles.upsellMeta}>
          <Text style={styles.upsellPrice}>{item.price}</Text>
          <View style={styles.cashbackBadge}>
            <Text style={styles.cashbackText}>💰 {item.cashback}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.bookBtn, item.booked && styles.bookBtnDone]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.bookBtnText}>{item.booked ? "✓" : "Add"}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function TripHubScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    destination?: string;
    departureDate?: string;
    tripName?: string;
    totalCashback?: string;
  }>();

  const destination = params.destination ?? "Dubai";
  const tripName = params.tripName ?? `${destination} Adventure`;
  const totalCashback = params.totalCashback ?? "127";
  const departureDate = params.departureDate
    ? new Date(params.departureDate)
    : new Date(Date.now() + 18 * 24 * 60 * 60 * 1000); // 18 days from now

  const [upsells, setUpsells] = useState<UpsellItem[]>(UPSELLS);
  const [activeTab, setActiveTab] = useState<"concierge" | "travelers" | "split">("concierge");
  const [splitAmount] = useState(1840);
  const [travelers] = useState(2);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Fetch live weather on mount
  useEffect(() => {
    fetchWeather(destination).then((data) => {
      setWeather(data);
      setWeatherLoading(false);
    });
  }, [destination]);

  // Schedule trip reminder notifications
  useEffect(() => {
    async function scheduleReminders() {
      if (Platform.OS === "web") return;
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") return;

        // Cancel any existing trip reminders
        await Notifications.cancelAllScheduledNotificationsAsync();

        const now = Date.now();
        const depTime = departureDate.getTime();

        // 3 days before: book taxi reminder
        const threeDaysBefore = depTime - 3 * 24 * 60 * 60 * 1000;
        if (threeDaysBefore > now) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "✈️ 3 days to go!",
              body: `Don't forget to book your airport taxi for ${destination}. Book now and earn cashback!`,
              data: { type: "taxi_reminder" },
            },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: new Date(threeDaysBefore) },
          });
        }

        // 1 day before: check-in reminder
        const oneDayBefore = depTime - 24 * 60 * 60 * 1000;
        if (oneDayBefore > now) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "🌍 Tomorrow you fly!",
              body: `Check in online for your ${destination} flight and pack your bags. Have an amazing trip!`,
              data: { type: "checkin_reminder" },
            },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: new Date(oneDayBefore) },
          });
        }
      } catch (err) {
        console.warn("[notifications] Failed to schedule:", err);
      }
    }
    scheduleReminders();
  }, [destination, departureDate]);

  function handleBook(id: string) {
    setUpsells((prev) =>
      prev.map((u) => (u.id === id ? { ...u, booked: !u.booked } : u))
    );
  }

  async function handleInvite() {
    try {
      await Share.share({
        message: `Join me on my ${destination} trip! 🌍 I'm using TRAVI — the app that gives you back your travel agent commission. Download: https://travi.app`,
      });
    } catch {}
  }

  const bookedCashback = upsells
    .filter((u) => u.booked)
    .reduce((sum, u) => sum + parseInt(u.cashback.replace(/\D/g, ""), 10), 0);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Hero Header */}
      <LinearGradient
        colors={["#0d0118", "#1a0533", "#2d1060"]}
        style={styles.hero}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>YOUR TRIP IS CONFIRMED ✈️</Text>
          <Text style={styles.heroTitle}>{tripName}</Text>

          {/* Countdown */}
          <View style={styles.countdownCard}>
            <Text style={styles.countdownTitle}>Departure in</Text>
            <Countdown departureDate={departureDate} />
          </View>

          {/* Weather + Cashback row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>{weather?.icon ?? "🌡️"}</Text>
              <Text style={styles.statValue}>{weatherLoading ? "--" : `${weather?.temp ?? "--"}°C`}</Text>
              <Text style={styles.statLabel}>{destination}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={[styles.statValue, { color: "#F94498" }]}>
                ${parseInt(totalCashback) + bookedCashback}
              </Text>
              <Text style={styles.statLabel}>Total Cashback</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🌡️</Text>
              <Text style={styles.statValue}>{weatherLoading ? "--" : `${weather?.humidity ?? "--"}%`}</Text>
              <Text style={styles.statLabel}>Humidity</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {(["concierge", "travelers", "split"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === "concierge" ? "🤖 Concierge" : tab === "travelers" ? "👥 Travelers" : "💳 Split"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Floating Chat Button */}
      <TouchableOpacity
        style={styles.floatingChat}
        onPress={() => {
          if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push({ pathname: "/(trip)/trip-chat" as never, params: { destination } });
        }}
        activeOpacity={0.85}
      >
        <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.floatingChatGradient}>
          <Text style={styles.floatingChatEmoji}>✨</Text>
        </LinearGradient>
        <View style={styles.floatingChatBadge}>
          <Text style={styles.floatingChatBadgeText}>24/7</Text>
        </View>
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── CONCIERGE TAB ── */}
        {activeTab === "concierge" && (
          <>
            {/* AI Concierge Message */}
            <View style={styles.conciergeCard}>
              <View style={styles.conciergeAvatar}>
                <Text style={styles.conciergeAvatarText}>T</Text>
              </View>
              <View style={styles.conciergeBody}>
                <Text style={styles.conciergeTitle}>Hey! I'm your TRAVI concierge 👋</Text>
                <Text style={styles.conciergeText}>
                  Your {destination} trip is booked. I'll remind you of everything — from airport
                  transfer to restaurant reservations. Here's what I recommend adding to make your
                  trip perfect:
                </Text>
              </View>
            </View>

            {/* Upsells */}
            <Text style={styles.sectionTitle}>Recommended Add-ons</Text>
            <Text style={styles.sectionSub}>Each one earns you cashback 💰</Text>
            {upsells.map((item) => (
              <UpsellCard key={item.id} item={item} onBook={handleBook} />
            ))}

            {/* Reminder nudge */}
            <View style={styles.reminderCard}>
              <Text style={styles.reminderIcon}>⏰</Text>
              <View style={styles.reminderBody}>
                <Text style={styles.reminderTitle}>Don't forget</Text>
                <Text style={styles.reminderText}>
                  Book your airport taxi at least 24 hours before departure to guarantee availability.
                  TRAVI will remind you 3 days before.
                </Text>
              </View>
            </View>

            {/* View Itinerary */}
            <TouchableOpacity
              style={styles.itineraryBtn}
              onPress={() => router.push({ pathname: "/(trip)/itinerary" as never, params: { destination } })}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#6443F4", "#F94498"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.itineraryBtnGradient}
              >
                <Text style={styles.itineraryBtnText}>📋 View Full Itinerary</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Cultural Guide */}
            <TouchableOpacity
              style={[styles.itineraryBtn, { marginTop: 10 }]}
              onPress={() => router.push({ pathname: "/(trip)/cultural-guide" as never, params: { destination } })}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#8B5CF6", "#EC4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.itineraryBtnGradient}
              >
                <Text style={styles.itineraryBtnText}>🌍 Cultural Guide</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Prepare for Trip */}
            <TouchableOpacity
              style={[styles.itineraryBtn, { marginTop: 10 }]}
              onPress={() => router.push({ pathname: "/(trip)/trip-prep" as never, params: { destination } })}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#0EA5E9", "#6443F4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.itineraryBtnGradient}
              >
                <Text style={styles.itineraryBtnText}>🎒 Prepare for Trip</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {/* ── TRAVELERS TAB ── */}
        {activeTab === "travelers" && (
          <>
            <View style={styles.conciergeCard}>
              <View style={styles.conciergeAvatar}>
                <Text style={styles.conciergeAvatarText}>T</Text>
              </View>
              <View style={styles.conciergeBody}>
                <Text style={styles.conciergeTitle}>Travelers with similar DNA 🧬</Text>
                <Text style={styles.conciergeText}>
                  These travelers are heading to {destination} around the same time and share your
                  travel style. Connect and share tips!
                </Text>
              </View>
            </View>

            {TRAVELER_MATCHES.map((t) => (
              <View key={t.id} style={styles.travelerCard}>
                <Image
                  source={t.avatar}
                  style={styles.travelerAvatar}
                  contentFit="cover"
                />
                <View style={styles.travelerInfo}>
                  <Text style={styles.travelerName}>{t.name}</Text>
                  <View style={styles.travelerTraits}>
                    {t.traits.map((trait) => (
                      <View key={trait} style={styles.traitPill}>
                        <Text style={styles.traitText}>{trait}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchPct}>{t.dnaMatch}%</Text>
                  <Text style={styles.matchLabel}>match</Text>
                </View>
                <TouchableOpacity
                  style={styles.connectBtn}
                  onPress={() => {
                    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert("Connection request sent!", `${t.name} will be notified.`);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.connectBtnText}>Connect</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Invite friend */}
            <TouchableOpacity style={styles.inviteBtn} onPress={handleInvite} activeOpacity={0.85}>
              <LinearGradient
                colors={["#6443F4", "#F94498"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inviteBtnGradient}
              >
                <Text style={styles.inviteBtnText}>✉️ Invite a Friend to Join</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {/* ── SPLIT TAB ── */}
        {activeTab === "split" && (
          <>
            <View style={styles.conciergeCard}>
              <View style={styles.conciergeAvatar}>
                <Text style={styles.conciergeAvatarText}>T</Text>
              </View>
              <View style={styles.conciergeBody}>
                <Text style={styles.conciergeTitle}>Split the trip cost 💳</Text>
                <Text style={styles.conciergeText}>
                  Divide the total cost between travelers. Each person pays their share directly —
                  and each gets their own cashback.
                </Text>
              </View>
            </View>

            <View style={styles.splitCard}>
              <Text style={styles.splitTitle}>Trip Total</Text>
              <Text style={styles.splitAmount}>${splitAmount.toLocaleString()}</Text>
              <View style={styles.splitDivider} />
              <Text style={styles.splitPerPerson}>
                ${Math.round(splitAmount / travelers).toLocaleString()} per person
              </Text>
              <Text style={styles.splitTravelers}>{travelers} travelers</Text>
            </View>

            {/* Cashback per person */}
            <View style={styles.cashbackCard}>
              <Text style={styles.cashbackCardTitle}>💰 Cashback per person</Text>
              <Text style={styles.cashbackCardAmount}>
                ${Math.round((parseInt(totalCashback) + bookedCashback) / travelers)}
              </Text>
              <Text style={styles.cashbackCardSub}>
                Each traveler gets their share of the commission back
              </Text>
            </View>

            {/* Add traveler */}
            <TouchableOpacity style={styles.inviteBtn} onPress={handleInvite} activeOpacity={0.85}>
              <LinearGradient
                colors={["#6443F4", "#F94498"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inviteBtnGradient}
              >
                <Text style={styles.inviteBtnText}>+ Add Travel Partner</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Payment breakdown */}
            <Text style={styles.sectionTitle}>Payment Breakdown</Text>
            {[
              { label: "Flights (2 tickets)", amount: 980 },
              { label: "Hotel (5 nights)", amount: 650 },
              { label: "Activities", amount: 210 },
            ].map(({ label, amount }) => (
              <View key={label} style={styles.payRow}>
                <Text style={styles.payLabel}>{label}</Text>
                <Text style={styles.payAmount}>${amount}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0d0118" },

  hero: { paddingBottom: 20 },
  backBtn: {
    marginHorizontal: 20,
    marginTop: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: { color: "#fff", fontSize: 20 },
  heroContent: { paddingHorizontal: 20, paddingTop: 8 },
  heroLabel: { color: "#F94498", fontSize: 11, fontWeight: "700", letterSpacing: 1.5, marginBottom: 6 },
  heroTitle: { color: "#fff", fontSize: 26, fontWeight: "800", marginBottom: 20 },

  countdownCard: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  countdownTitle: { color: "#9BA1A6", fontSize: 12, fontWeight: "600", marginBottom: 12, textAlign: "center" },
  countdownRow: { flexDirection: "row", justifyContent: "center", gap: 24 },
  countdownUnit: { alignItems: "center" },
  countdownNumber: { color: "#fff", fontSize: 36, fontWeight: "800", lineHeight: 40 },
  countdownLabel: { color: "#6443F4", fontSize: 10, fontWeight: "700", letterSpacing: 1 },

  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  statCard: { flex: 1, alignItems: "center" },
  statIcon: { fontSize: 22, marginBottom: 4 },
  statValue: { color: "#fff", fontSize: 18, fontWeight: "700" },
  statLabel: { color: "#9BA1A6", fontSize: 10, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.1)", marginHorizontal: 8 },

  tabBar: {
    flexDirection: "row",
    backgroundColor: "#0d0118",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  tab: { flex: 1, paddingVertical: 14, alignItems: "center" },
  tabActive: { borderBottomWidth: 2, borderBottomColor: "#F94498" },
  tabText: { color: "#9BA1A6", fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: "#fff" },

  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 48 },

  conciergeCard: {
    flexDirection: "row",
    backgroundColor: "rgba(100,67,244,0.12)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.25)",
    gap: 12,
  },
  conciergeAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#6443F4",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  conciergeAvatarText: { color: "#fff", fontSize: 20, fontWeight: "800" },
  conciergeBody: { flex: 1 },
  conciergeTitle: { color: "#fff", fontSize: 15, fontWeight: "700", marginBottom: 6 },
  conciergeText: { color: "#9BA1A6", fontSize: 13, lineHeight: 19 },

  sectionTitle: { color: "#fff", fontSize: 17, fontWeight: "700", marginBottom: 4 },
  sectionSub: { color: "#9BA1A6", fontSize: 13, marginBottom: 16 },

  upsellCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    gap: 12,
  },
  upsellIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  upsellIcon: { fontSize: 24 },
  upsellInfo: { flex: 1 },
  upsellTitle: { color: "#fff", fontSize: 14, fontWeight: "700", marginBottom: 2 },
  upsellSub: { color: "#9BA1A6", fontSize: 12, lineHeight: 16, marginBottom: 6 },
  upsellMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  upsellPrice: { color: "#fff", fontSize: 13, fontWeight: "600" },
  cashbackBadge: {
    backgroundColor: "rgba(249,68,152,0.15)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(249,68,152,0.3)",
  },
  cashbackText: { color: "#F94498", fontSize: 11, fontWeight: "700" },
  bookBtn: {
    backgroundColor: "#6443F4",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexShrink: 0,
  },
  bookBtnDone: { backgroundColor: "#10B981" },
  bookBtnText: { color: "#fff", fontSize: 13, fontWeight: "700" },

  reminderCard: {
    flexDirection: "row",
    backgroundColor: "rgba(245,158,11,0.1)",
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.2)",
    gap: 12,
    alignItems: "flex-start",
  },
  reminderIcon: { fontSize: 24 },
  reminderBody: { flex: 1 },
  reminderTitle: { color: "#F59E0B", fontSize: 14, fontWeight: "700", marginBottom: 4 },
  reminderText: { color: "#9BA1A6", fontSize: 13, lineHeight: 18 },

  itineraryBtn: { borderRadius: 16, overflow: "hidden", marginBottom: 8 },
  itineraryBtnGradient: { paddingVertical: 16, alignItems: "center", borderRadius: 16 },
  itineraryBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  travelerCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    gap: 12,
  },
  travelerAvatar: { width: 48, height: 48, borderRadius: 24, flexShrink: 0 },
  travelerInfo: { flex: 1 },
  travelerName: { color: "#fff", fontSize: 15, fontWeight: "700", marginBottom: 6 },
  travelerTraits: { flexDirection: "row", gap: 6 },
  traitPill: {
    backgroundColor: "rgba(100,67,244,0.2)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  traitText: { color: "#6443F4", fontSize: 11, fontWeight: "600" },
  matchBadge: { alignItems: "center", marginRight: 8 },
  matchPct: { color: "#F94498", fontSize: 18, fontWeight: "800" },
  matchLabel: { color: "#9BA1A6", fontSize: 10 },
  connectBtn: {
    backgroundColor: "rgba(100,67,244,0.25)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#6443F4",
  },
  connectBtnText: { color: "#6443F4", fontSize: 12, fontWeight: "700" },

  inviteBtn: { borderRadius: 16, overflow: "hidden", marginBottom: 24 },
  inviteBtnGradient: { paddingVertical: 16, alignItems: "center", borderRadius: 16 },
  inviteBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  splitCard: {
    backgroundColor: "rgba(100,67,244,0.12)",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.25)",
  },
  splitTitle: { color: "#9BA1A6", fontSize: 13, fontWeight: "600", marginBottom: 8 },
  splitAmount: { color: "#fff", fontSize: 42, fontWeight: "800", marginBottom: 12 },
  splitDivider: { width: "80%", height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 12 },
  splitPerPerson: { color: "#F94498", fontSize: 22, fontWeight: "700" },
  splitTravelers: { color: "#9BA1A6", fontSize: 13, marginTop: 4 },

  cashbackCard: {
    backgroundColor: "rgba(249,68,152,0.1)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(249,68,152,0.2)",
  },
  cashbackCardTitle: { color: "#F94498", fontSize: 14, fontWeight: "700", marginBottom: 8 },
  cashbackCardAmount: { color: "#fff", fontSize: 36, fontWeight: "800", marginBottom: 6 },
  cashbackCardSub: { color: "#9BA1A6", fontSize: 13, textAlign: "center" },

  payRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  payLabel: { color: "#9BA1A6", fontSize: 14 },
  payAmount: { color: "#fff", fontSize: 14, fontWeight: "600" },

  floatingChat: {
    position: "absolute",
    bottom: 24,
    right: 20,
    zIndex: 100,
  },
  floatingChatGradient: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6443F4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  floatingChatEmoji: { fontSize: 26 },
  floatingChatBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#F94498",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: "#0d0118",
  },
  floatingChatBadgeText: { color: "#fff", fontSize: 8, fontWeight: "800" },
});
