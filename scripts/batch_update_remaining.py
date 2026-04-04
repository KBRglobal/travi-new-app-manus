#!/usr/bin/env python3
"""
TRAVI Batch Updater — Remaining Screens
Rewrites Trips, Wallet, Planning, Live, Points, Social screens with full TRAVI DNA.
"""

import os

BASE = "/home/ubuntu/travi-app/app"

DS = '''const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };'''

SCREENS = {

"(tabs)/trips.tsx": '''// Screen 14 — My Trips
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const TABS = ["Upcoming", "Past", "Draft"];
const TRIPS = {
  Upcoming: [
    { id: "1", dest: "Bali, Indonesia", dates: "Mar 15–22, 2025", status: "Confirmed", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80", days: 7, companions: 2 },
    { id: "2", dest: "Tokyo, Japan", dates: "Apr 3–10, 2025", status: "Planning", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80", days: 7, companions: 1 },
  ],
  Past: [
    { id: "3", dest: "Paris, France", dates: "Dec 10–17, 2024", status: "Completed", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80", days: 7, companions: 2 },
    { id: "4", dest: "Dubai, UAE", dates: "Oct 5–9, 2024", status: "Completed", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80", days: 4, companions: 3 },
  ],
  Draft: [
    { id: "5", dest: "Santorini, Greece", dates: "Not scheduled", status: "Draft", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80", days: 5, companions: 2 },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Confirmed: "#02A65C",
  Planning: "#FF9327",
  Completed: "#A79FB2",
  Draft: "#6443F4",
};

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const trips = TRIPS[activeTab as keyof typeof TRIPS] || [];

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>My Trips</Text>
        <Pressable style={s.addBtn} onPress={() => router.push("/(trip)/plan" as any)}>
          <MaterialIcons name="add" size={22} color={DS.white} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={s.tabsWrap}>
        {TABS.map(tab => (
          <Pressable key={tab} style={[s.tab, activeTab === tab && s.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>{tab}</Text>
          </Pressable>
        ))}
      </View>

      {/* Trip list */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {trips.map(trip => (
          <Pressable key={trip.id} style={({ pressed }) => [s.card, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]} onPress={() => router.push("/(tabs)/trip-hub" as any)}>
            <Image source={{ uri: trip.img }} style={s.cardImg} />
            <LinearGradient colors={["transparent", "rgba(10,5,20,0.95)"]} style={s.cardOverlay} />
            <View style={[s.statusBadge, { backgroundColor: STATUS_COLORS[trip.status] + "33", borderColor: STATUS_COLORS[trip.status] + "66" }]}>
              <View style={[s.statusDot, { backgroundColor: STATUS_COLORS[trip.status] }]} />
              <Text style={[s.statusText, { color: STATUS_COLORS[trip.status] }]}>{trip.status}</Text>
            </View>
            <View style={s.cardContent}>
              <Text style={s.cardDest}>{trip.dest}</Text>
              <Text style={s.cardDates}>{trip.dates}</Text>
              <View style={s.cardMeta}>
                <View style={s.metaItem}>
                  <MaterialIcons name="calendar-today" size={13} color={DS.muted} />
                  <Text style={s.metaText}>{trip.days} days</Text>
                </View>
                <View style={s.metaItem}>
                  <MaterialIcons name="people" size={13} color={DS.muted} />
                  <Text style={s.metaText}>{trip.companions} travelers</Text>
                </View>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.5)" style={s.cardArrow} />
          </Pressable>
        ))}

        {/* Plan new trip CTA */}
        <Pressable style={({ pressed }) => [s.planBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/plan" as any)}>
          <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.planGrad}>
            <MaterialIcons name="add" size={20} color={DS.white} style={{ marginRight: 8 }} />
            <Text style={s.planText}>Plan a New Trip</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: DS.white },
  addBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  tabsWrap: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 4 },
  tab: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  tabActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: DS.purple },
  tabText: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.muted },
  tabTextActive: { color: DS.white },
  card: { height: 180, borderRadius: 20, overflow: "hidden", marginBottom: 14, backgroundColor: DS.surface },
  cardImg: { ...StyleSheet.absoluteFillObject },
  cardOverlay: { ...StyleSheet.absoluteFillObject },
  statusBadge: { position: "absolute", top: 12, right: 12, flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontFamily: "Satoshi-Bold" },
  cardContent: { position: "absolute", bottom: 14, left: 16, right: 40 },
  cardDest: { fontSize: 20, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 3 },
  cardDates: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)", marginBottom: 8 },
  cardMeta: { flexDirection: "row", gap: 14 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  cardArrow: { position: "absolute", right: 14, bottom: 20 },
  planBtn: { marginTop: 4, height: 52, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  planGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  planText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
});
''',

"(tabs)/wallet.tsx": '''// Screen 48 — Wallet
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const TRANSACTIONS = [
  { id: "1", label: "Bali Hotel", type: "debit", amount: -425.00, date: "Mar 12", icon: "hotel", color: DS.purple },
  { id: "2", label: "Cashback Reward", type: "credit", amount: +12.75, date: "Mar 10", icon: "card-giftcard", color: DS.success },
  { id: "3", label: "Flight TLV→DPS", type: "debit", amount: -890.00, date: "Mar 8", icon: "flight", color: DS.pink },
  { id: "4", label: "Added Funds", type: "credit", amount: +500.00, date: "Mar 5", icon: "account-balance", color: DS.success },
  { id: "5", label: "Tokyo Activity", type: "debit", amount: -65.00, date: "Mar 3", icon: "local-activity", color: DS.warning },
];

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.title}>Wallet</Text>
        <Pressable style={s.historyBtn} onPress={() => router.push("/(tabs)/transaction-history" as any)}>
          <MaterialIcons name="receipt-long" size={20} color={DS.white} />
        </Pressable>
      </View>

      {/* Balance card */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.balanceCard}>
          <View style={s.balanceTop}>
            <Text style={s.balanceLabel}>TRAVI Balance</Text>
            <View style={s.balanceBadge}>
              <MaterialIcons name="verified" size={12} color={DS.white} />
              <Text style={s.balanceBadgeText}>Verified</Text>
            </View>
          </View>
          <Text style={s.balanceAmount}>$1,247.50</Text>
          <Text style={s.balanceSub}>Available for travel</Text>
          <View style={s.balanceActions}>
            <Pressable style={s.balanceAction} onPress={() => router.push("/(tabs)/add-funds" as any)}>
              <MaterialIcons name="add" size={18} color={DS.white} />
              <Text style={s.balanceActionText}>Add Funds</Text>
            </Pressable>
            <View style={s.actionDivider} />
            <Pressable style={s.balanceAction} onPress={() => router.push("/(tabs)/wallet-withdraw" as any)}>
              <MaterialIcons name="arrow-upward" size={18} color={DS.white} />
              <Text style={s.balanceActionText}>Withdraw</Text>
            </Pressable>
            <View style={s.actionDivider} />
            <Pressable style={s.balanceAction} onPress={() => router.push("/(tabs)/split-payment" as any)}>
              <MaterialIcons name="call-split" size={18} color={DS.white} />
              <Text style={s.balanceActionText}>Split</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      {/* Stats row */}
      <View style={s.statsRow}>
        <View style={s.statCard}>
          <MaterialIcons name="card-giftcard" size={20} color={DS.success} />
          <Text style={s.statAmount}>$47.25</Text>
          <Text style={s.statLabel}>Cashback</Text>
        </View>
        <View style={s.statCard}>
          <MaterialIcons name="star" size={20} color={DS.warning} />
          <Text style={s.statAmount}>2,840</Text>
          <Text style={s.statLabel}>Points</Text>
        </View>
        <View style={s.statCard}>
          <MaterialIcons name="currency-exchange" size={20} color={DS.info} />
          <Text style={s.statAmount}>12</Text>
          <Text style={s.statLabel}>Currencies</Text>
        </View>
      </View>

      {/* Recent transactions */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Recent Transactions</Text>
          <Pressable onPress={() => router.push("/(tabs)/transaction-history" as any)}>
            <Text style={s.seeAll}>See All</Text>
          </Pressable>
        </View>
        <View style={s.txCard}>
          {TRANSACTIONS.map((tx, idx) => (
            <View key={tx.id} style={[s.txRow, idx < TRANSACTIONS.length - 1 && s.txRowBorder]}>
              <View style={[s.txIcon, { backgroundColor: tx.color + "22", borderColor: tx.color + "44" }]}>
                <MaterialIcons name={tx.icon as any} size={18} color={tx.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.txLabel}>{tx.label}</Text>
                <Text style={s.txDate}>{tx.date}</Text>
              </View>
              <Text style={[s.txAmount, { color: tx.type === "credit" ? DS.success : DS.white }]}>
                {tx.type === "credit" ? "+" : ""}{tx.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: DS.white },
  historyBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  balanceCard: { borderRadius: 24, padding: 24 },
  balanceTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  balanceLabel: { fontSize: 13, fontFamily: "Satoshi-Medium", color: "rgba(255,255,255,0.8)" },
  balanceBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.15)" },
  balanceBadgeText: { fontSize: 11, fontFamily: "Satoshi-Medium", color: DS.white },
  balanceAmount: { fontSize: 40, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 4 },
  balanceSub: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)", marginBottom: 20 },
  balanceActions: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 14, padding: 4 },
  balanceAction: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 10, gap: 6 },
  balanceActionText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.white },
  actionDivider: { width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.2)" },
  statsRow: { flexDirection: "row", paddingHorizontal: 16, gap: 10, marginBottom: 24 },
  statCard: { flex: 1, alignItems: "center", padding: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, gap: 4 },
  statAmount: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white },
  statLabel: { fontSize: 11, fontFamily: "Satoshi-Regular", color: DS.muted },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white },
  seeAll: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.purple },
  txCard: { backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, overflow: "hidden" },
  txRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  txRowBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  txIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  txLabel: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.white, marginBottom: 2 },
  txDate: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  txAmount: { fontSize: 15, fontFamily: "Satoshi-Bold" },
});
''',

"(trip)/plan.tsx": '''// Screen 20 — Plan a Trip Entry
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const TRIP_TYPES = [
  { label: "Beach & Relax", icon: "beach-access", color: DS.info },
  { label: "City Explorer", icon: "location-city", color: DS.purple },
  { label: "Adventure", icon: "terrain", color: DS.error },
  { label: "Culture & Art", icon: "museum", color: DS.warning },
  { label: "Food & Wine", icon: "restaurant", color: DS.pink },
  { label: "Nature", icon: "forest", color: DS.success },
];

export default function PlanScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [selectedType, setSelectedType] = useState("");

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <Pressable style={s.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={22} color={DS.white} />
        </Pressable>
        <Text style={s.title}>Plan a Trip</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {/* AI Suggestion banner */}
        <View style={s.aiBanner}>
          <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.aiBannerGrad}>
            <MaterialIcons name="auto-awesome" size={18} color={DS.purple} />
            <Text style={s.aiBannerText}>AI will personalize your trip based on your DNA</Text>
          </LinearGradient>
        </View>

        {/* Destination input */}
        <Text style={s.label}>Where to?</Text>
        <View style={s.inputWrap}>
          <MaterialIcons name="search" size={20} color={DS.placeholder} />
          <TextInput
            style={s.input}
            placeholder="City, country, or region..."
            placeholderTextColor={DS.placeholder}
            value={destination}
            onChangeText={setDestination}
            returnKeyType="done"
          />
        </View>

        {/* Trip type */}
        <Text style={[s.label, { marginTop: 24 }]}>What kind of trip?</Text>
        <View style={s.typesGrid}>
          {TRIP_TYPES.map(t => (
            <Pressable key={t.label} style={[s.typeCard, selectedType === t.label && { borderColor: t.color, backgroundColor: t.color + "18" }]} onPress={() => setSelectedType(t.label)}>
              <View style={[s.typeIcon, { backgroundColor: t.color + "22" }]}>
                <MaterialIcons name={t.icon as any} size={22} color={t.color} />
              </View>
              <Text style={[s.typeLabel, selectedType === t.label && { color: t.color }]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Surprise me */}
        <Pressable style={s.surpriseBtn} onPress={() => router.push("/(trip)/surprise" as any)}>
          <MaterialIcons name="auto-awesome" size={18} color={DS.pink} style={{ marginRight: 8 }} />
          <Text style={s.surpriseText}>Surprise Me with AI Pick</Text>
        </Pressable>

        {/* CTA */}
        <Pressable style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/destination-select" as any)}>
          <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.ctaGrad}>
            <Text style={s.ctaText}>Continue</Text>
            <MaterialIcons name="arrow-forward" size={18} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontFamily: "Chillax-Bold", color: DS.white },
  aiBanner: { marginBottom: 24, borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  aiBannerGrad: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  aiBannerText: { flex: 1, fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.secondary },
  label: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 10 },
  inputWrap: { flexDirection: "row", alignItems: "center", backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, paddingHorizontal: 14, height: 52, gap: 10 },
  input: { flex: 1, fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.white },
  typesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  typeCard: { width: "30%", alignItems: "center", padding: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, gap: 8 },
  typeIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  typeLabel: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted, textAlign: "center" },
  surpriseBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 48, borderRadius: 24, borderWidth: 1, borderColor: "rgba(249,68,152,0.3)", backgroundColor: "rgba(249,68,152,0.08)", marginBottom: 16 },
  surpriseText: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.pink },
  ctaBtn: { height: 56, borderRadius: 28, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  ctaGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  ctaText: { fontSize: 16, fontFamily: "Satoshi-Bold", color: DS.white },
});
''',

"(trip)/destination-detail.tsx": '''// Screen — Destination Detail
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const HIGHLIGHTS = [
  { icon: "wb-sunny", label: "Best Season", value: "Apr–Oct" },
  { icon: "attach-money", label: "Avg Budget", value: "$120/day" },
  { icon: "language", label: "Language", value: "Balinese" },
  { icon: "access-time", label: "Timezone", value: "UTC+8" },
];

const ACTIVITIES = [
  { id: "1", name: "Tanah Lot Temple", type: "Culture", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80", match: 94 },
  { id: "2", name: "Tegalalang Rice", type: "Nature", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", match: 88 },
  { id: "3", name: "Seminyak Beach", type: "Beach", img: "https://images.unsplash.com/photo-1520454974749-611d7d931571?w=300&q=80", match: 91 },
];

export default function DestinationDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: DS.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={s.heroWrap}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" }} style={s.heroImg} />
          <LinearGradient colors={["rgba(10,5,20,0.3)", "transparent", "rgba(10,5,20,0.95)"]} style={StyleSheet.absoluteFillObject} />
          <View style={[s.heroHeader, { paddingTop: insets.top + 8 }]}>
            <Pressable style={s.backBtn} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={22} color={DS.white} />
            </Pressable>
            <Pressable style={s.heartBtn}>
              <MaterialIcons name="favorite-border" size={22} color={DS.white} />
            </Pressable>
          </View>
          <View style={s.heroContent}>
            <View style={s.matchBadge}>
              <Text style={s.matchText}>✦ 96% DNA Match</Text>
            </View>
            <Text style={s.heroTitle}>Bali, Indonesia</Text>
            <View style={s.heroMeta}>
              <MaterialIcons name="star" size={14} color={DS.warning} />
              <Text style={s.heroRating}>4.9</Text>
              <Text style={s.heroDot}>·</Text>
              <Text style={s.heroReviews}>2,847 reviews</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          {/* Highlights */}
          <View style={s.highlightsRow}>
            {HIGHLIGHTS.map(h => (
              <View key={h.label} style={s.highlightCard}>
                <MaterialIcons name={h.icon as any} size={18} color={DS.purple} />
                <Text style={s.highlightValue}>{h.value}</Text>
                <Text style={s.highlightLabel}>{h.label}</Text>
              </View>
            ))}
          </View>

          {/* About */}
          <Text style={s.sectionTitle}>About</Text>
          <Text style={s.aboutText}>Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Immerse yourself in the island's rich culture, stunning rice terraces, and pristine beaches.</Text>

          {/* Top Activities */}
          <Text style={[s.sectionTitle, { marginTop: 24 }]}>Top Activities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {ACTIVITIES.map(a => (
              <Pressable key={a.id} style={s.actCard}>
                <Image source={{ uri: a.img }} style={s.actImg} />
                <LinearGradient colors={["transparent", "rgba(10,5,20,0.9)"]} style={StyleSheet.absoluteFillObject} />
                <View style={s.actMatchBadge}>
                  <Text style={s.actMatchText}>{a.match}%</Text>
                </View>
                <Text style={s.actName}>{a.name}</Text>
                <Text style={s.actType}>{a.type}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[s.ctaWrap, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/dates-travelers" as any)}>
          <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.ctaGrad}>
            <Text style={s.ctaText}>Plan This Trip</Text>
            <MaterialIcons name="arrow-forward" size={18} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  heroWrap: { height: 340, position: "relative" },
  heroImg: { ...StyleSheet.absoluteFillObject },
  heroHeader: { position: "absolute", top: 0, left: 0, right: 0, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(10,5,20,0.5)", justifyContent: "center", alignItems: "center" },
  heartBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(10,5,20,0.5)", justifyContent: "center", alignItems: "center" },
  heroContent: { position: "absolute", bottom: 20, left: 16 },
  matchBadge: { backgroundColor: "#02A65C", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: "flex-start", marginBottom: 8 },
  matchText: { fontSize: 12, fontFamily: "Satoshi-Bold", color: DS.white },
  heroTitle: { fontSize: 32, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 6 },
  heroMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  heroRating: { fontSize: 14, fontFamily: "Satoshi-Bold", color: DS.white },
  heroDot: { fontSize: 14, color: DS.muted },
  heroReviews: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted },
  highlightsRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  highlightCard: { flex: 1, alignItems: "center", padding: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, gap: 4 },
  highlightValue: { fontSize: 13, fontFamily: "Satoshi-Bold", color: DS.white },
  highlightLabel: { fontSize: 11, fontFamily: "Satoshi-Regular", color: DS.muted },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 10 },
  aboutText: { fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.secondary, lineHeight: 22 },
  actCard: { width: 160, height: 200, borderRadius: 16, overflow: "hidden", backgroundColor: DS.surface },
  actImg: { ...StyleSheet.absoluteFillObject },
  actMatchBadge: { position: "absolute", top: 10, right: 10, backgroundColor: "#02A65C", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  actMatchText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.white },
  actName: { position: "absolute", bottom: 28, left: 12, right: 12, fontSize: 14, fontFamily: "Chillax-Bold", color: DS.white },
  actType: { position: "absolute", bottom: 12, left: 12, fontSize: 12, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)" },
  ctaWrap: { paddingHorizontal: 16, paddingTop: 12, backgroundColor: DS.bg, borderTopWidth: 1, borderTopColor: DS.border },
  ctaBtn: { height: 56, borderRadius: 28, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  ctaGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  ctaText: { fontSize: 16, fontFamily: "Satoshi-Bold", color: DS.white },
});
''',

"(live)/home.tsx": '''// Screen 35 — Live Trip Dashboard
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const TIMELINE = [
  { time: "09:00", label: "Breakfast at Locavore", icon: "restaurant", done: true, color: DS.success },
  { time: "11:00", label: "Tanah Lot Temple", icon: "temple-hindu", done: true, color: DS.success },
  { time: "14:00", label: "Tegalalang Rice Terraces", icon: "terrain", done: false, color: DS.purple, current: true },
  { time: "17:00", label: "Seminyak Beach Sunset", icon: "beach-access", done: false, color: DS.warning },
  { time: "20:00", label: "Dinner at Merah Putih", icon: "dinner-dining", done: false, color: DS.pink },
];

export default function LiveHomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Live header */}
      <View style={s.header}>
        <View>
          <View style={s.livePill}>
            <View style={s.liveDot} />
            <Text style={s.liveText}>LIVE TRIP</Text>
          </View>
          <Text style={s.headerTitle}>Bali, Indonesia</Text>
        </View>
        <Pressable style={s.emergencyBtn} onPress={() => router.push("/(trip)/emergency" as any)}>
          <MaterialIcons name="emergency" size={18} color={DS.error} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {/* Day progress */}
        <View style={s.progressCard}>
          <View style={s.progressHeader}>
            <Text style={s.progressTitle}>Day 3 of 7</Text>
            <Text style={s.progressDate}>Mar 17, 2025</Text>
          </View>
          <View style={s.progressBar}>
            <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[s.progressFill, { width: "43%" }]} />
          </View>
          <Text style={s.progressSub}>2 of 5 activities completed today</Text>
        </View>

        {/* Quick actions */}
        <View style={s.actionsRow}>
          {[
            { icon: "map", label: "Map", route: "/(live)/map" },
            { icon: "chat", label: "AI Chat", route: "/(live)/chat" },
            { icon: "account-balance-wallet", label: "Expenses", route: "/(live)/expenses" },
            { icon: "photo-camera", label: "Memories", route: "/(trip)/memories" },
          ].map(a => (
            <Pressable key={a.label} style={({ pressed }) => [s.actionBtn, pressed && { opacity: 0.7 }]} onPress={() => router.push(a.route as any)}>
              <View style={s.actionIcon}>
                <MaterialIcons name={a.icon as any} size={22} color={DS.purple} />
              </View>
              <Text style={s.actionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Today's timeline */}
        <Text style={s.sectionTitle}>Today\'s Schedule</Text>
        {TIMELINE.map((item, idx) => (
          <View key={idx} style={s.timelineRow}>
            <View style={s.timelineLeft}>
              <Text style={[s.timelineTime, item.done && s.timeDone]}>{item.time}</Text>
              {idx < TIMELINE.length - 1 && <View style={[s.timelineLine, item.done && s.lineDone]} />}
            </View>
            <View style={[s.timelineCard, item.current && s.timelineCardCurrent]}>
              <View style={[s.timelineIcon, { backgroundColor: item.color + "22", borderColor: item.color + "44" }]}>
                <MaterialIcons name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={[s.timelineLabel, item.done && s.labelDone]}>{item.label}</Text>
              {item.current && <View style={s.currentBadge}><Text style={s.currentText}>NOW</Text></View>}
              {item.done && <MaterialIcons name="check-circle" size={18} color={DS.success} />}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: DS.success },
  liveText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.success, letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white },
  emergencyBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,107,107,0.12)", borderWidth: 1, borderColor: "rgba(255,107,107,0.3)", justifyContent: "center", alignItems: "center" },
  progressCard: { backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, padding: 16, marginBottom: 20 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  progressTitle: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white },
  progressDate: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted },
  progressBar: { height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.08)", marginBottom: 8 },
  progressFill: { height: 6, borderRadius: 3 },
  progressSub: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  actionBtn: { alignItems: "center", gap: 6 },
  actionIcon: { width: 56, height: 56, borderRadius: 16, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  actionLabel: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 16 },
  timelineRow: { flexDirection: "row", gap: 12, marginBottom: 0 },
  timelineLeft: { width: 48, alignItems: "center" },
  timelineTime: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted, marginBottom: 4 },
  timeDone: { color: DS.success },
  timelineLine: { width: 2, flex: 1, backgroundColor: DS.border, marginBottom: -4 },
  lineDone: { backgroundColor: DS.success },
  timelineCard: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10, padding: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, marginBottom: 8 },
  timelineCardCurrent: { borderColor: DS.purple, backgroundColor: "rgba(100,67,244,0.1)" },
  timelineIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  timelineLabel: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.white },
  labelDone: { color: DS.muted },
  currentBadge: { backgroundColor: DS.purple, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  currentText: { fontSize: 10, fontFamily: "Satoshi-Bold", color: DS.white },
});
''',

"(points)/dashboard.tsx": '''// Points Dashboard
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const PERKS = [
  { icon: "flight-upgrade", label: "Flight Upgrade", points: 5000, color: DS.purple },
  { icon: "hotel", label: "Free Night", points: 8000, color: DS.pink },
  { icon: "local-activity", label: "Activity Pass", points: 2500, color: DS.success },
  { icon: "card-giftcard", label: "Gift Card", points: 3000, color: DS.warning },
];

export default function PointsDashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.title}>TRAVI Points</Text>
        <Pressable style={s.historyBtn} onPress={() => router.push("/(points)/transactions" as any)}>
          <MaterialIcons name="history" size={20} color={DS.white} />
        </Pressable>
      </View>

      {/* Points card */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.pointsCard}>
          <Text style={s.pointsLabel}>Your Points Balance</Text>
          <Text style={s.pointsAmount}>12,840</Text>
          <Text style={s.pointsSub}>≈ $128.40 travel credit</Text>
          <View style={s.tierRow}>
            <MaterialIcons name="star" size={14} color={DS.warning} />
            <Text style={s.tierText}>Gold Explorer Tier</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Redeem */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={s.sectionTitle}>Redeem Points</Text>
        <View style={s.perksGrid}>
          {PERKS.map(p => (
            <Pressable key={p.label} style={({ pressed }) => [s.perkCard, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(points)/redeem" as any)}>
              <View style={[s.perkIcon, { backgroundColor: p.color + "22", borderColor: p.color + "44" }]}>
                <MaterialIcons name={p.icon as any} size={24} color={p.color} />
              </View>
              <Text style={s.perkLabel}>{p.label}</Text>
              <Text style={[s.perkPoints, { color: p.color }]}>{p.points.toLocaleString()} pts</Text>
            </Pressable>
          ))}
        </View>

        {/* Earn guide */}
        <Pressable style={({ pressed }) => [s.earnBtn, pressed && { opacity: 0.8 }]} onPress={() => router.push("/(points)/earn-guide" as any)}>
          <MaterialIcons name="add-circle-outline" size={18} color={DS.purple} style={{ marginRight: 8 }} />
          <Text style={s.earnText}>How to Earn More Points</Text>
          <MaterialIcons name="chevron-right" size={18} color={DS.muted} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: DS.white },
  historyBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  pointsCard: { borderRadius: 24, padding: 24 },
  pointsLabel: { fontSize: 13, fontFamily: "Satoshi-Medium", color: "rgba(255,255,255,0.8)", marginBottom: 8 },
  pointsAmount: { fontSize: 44, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 4 },
  pointsSub: { fontSize: 14, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)", marginBottom: 12 },
  tierRow: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.15)", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  tierText: { fontSize: 12, fontFamily: "Satoshi-Bold", color: DS.white },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 14 },
  perksGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  perkCard: { width: "47%", alignItems: "center", padding: 16, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, gap: 8 },
  perkIcon: { width: 52, height: 52, borderRadius: 14, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  perkLabel: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.white, textAlign: "center" },
  perkPoints: { fontSize: 13, fontFamily: "Satoshi-Bold" },
  earnBtn: { flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14 },
  earnText: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.white },
});
''',

"(social)/discover.tsx": '''// Social Discover Screen
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const TRAVELERS = [
  { id: "1", name: "Sarah K.", dna: "Explorer", match: 94, trips: 23, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", dest: "Bali" },
  { id: "2", name: "Mike R.", dna: "Adventurer", match: 88, trips: 31, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", dest: "Patagonia" },
  { id: "3", name: "Emma L.", dna: "Culture Seeker", match: 85, trips: 18, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", dest: "Kyoto" },
  { id: "4", name: "Alex T.", dna: "Foodie", match: 82, trips: 15, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", dest: "Tokyo" },
];

export default function SocialDiscoverScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>Discover <Text style={{ color: DS.purple }}>Travelers</Text></Text>
        <Pressable style={s.filterBtn}>
          <MaterialIcons name="tune" size={20} color={DS.white} />
        </Pressable>
      </View>

      <FlatList
        data={TRAVELERS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [s.card, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]} onPress={() => router.push("/(social)/traveler-profile" as any)}>
            <Image source={{ uri: item.img }} style={s.avatar} />
            <View style={{ flex: 1 }}>
              <View style={s.nameRow}>
                <Text style={s.name}>{item.name}</Text>
                <View style={s.matchBadge}>
                  <Text style={s.matchText}>✦ {item.match}%</Text>
                </View>
              </View>
              <Text style={s.dnaText}>{item.dna} · {item.trips} trips</Text>
              <View style={s.destRow}>
                <MaterialIcons name="flight-takeoff" size={12} color={DS.muted} />
                <Text style={s.destText}>Next: {item.dest}</Text>
              </View>
            </View>
            <Pressable style={({ pressed }) => [s.connectBtn, pressed && { opacity: 0.8 }]} onPress={() => router.push("/(social)/connect-flow" as any)}>
              <Text style={s.connectText}>Connect</Text>
            </Pressable>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={
          <Pressable style={s.swipeBtn} onPress={() => router.push("/(social)/swipe-travelers" as any)}>
            <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.swipeGrad}>
              <MaterialIcons name="swipe" size={18} color={DS.white} style={{ marginRight: 8 }} />
              <Text style={s.swipeText}>Swipe to Match Travelers</Text>
            </LinearGradient>
          </Pressable>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 24, fontFamily: "Chillax-Bold", color: DS.white },
  filterBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  swipeBtn: { height: 52, borderRadius: 26, overflow: "hidden", marginBottom: 16, shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  swipeGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  swipeText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
  card: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: DS.surface },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 },
  name: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
  matchBadge: { backgroundColor: "#02A65C", paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8 },
  matchText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.white },
  dnaText: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted, marginBottom: 4 },
  destRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  destText: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  connectBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: DS.purple, backgroundColor: "rgba(100,67,244,0.12)" },
  connectText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.purple },
});
''',

}

def update_screens():
    updated = []
    for rel_path, content in SCREENS.items():
        full_path = os.path.join(BASE, rel_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w") as f:
            f.write(content)
        updated.append(rel_path)
        print(f"✅ Updated: {rel_path}")
    print(f"\n✅ Done! Updated {len(updated)} screens.")

if __name__ == "__main__":
    update_screens()
