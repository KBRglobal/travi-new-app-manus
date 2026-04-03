/**
 * TRAVI — Wallet Screen
 * Dark mode: #1A0B2E bg, #24103E surface, purple→pink gradients
 * NO circles — bare icons, pill badges, glassmorphism cards
 */
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, FlatList, Image,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const C = {
  bg:           "#1A0B2E",
  surface:      "#24103E",
  glassStroke:  "rgba(123,68,230,0.3)",
  purple:       "#6443F4",
  pink:         "#F94498",
  orange:       "#FF9327",
  green:        "#02A65C",
  white:        "#FFFFFF",
  textPrimary:  "#FFFFFF",
  textSecondary:"#D3CFD8",
  textMuted:    "#A79FB2",
  textDisabled: "#504065",
};

const FEATURED_REWARDS = [
  { id: "fr1", title: "Flights to Tokyo",  subtitle: "From 13,000 pts", image: require("@/assets/destinations/tokyo.jpg") },
  { id: "fr2", title: "Maldives Stay",     subtitle: "From 18,500 pts", image: require("@/assets/destinations/maldives.jpg") },
  { id: "fr3", title: "Paris Experience",  subtitle: "From 9,000 pts",  image: require("@/assets/destinations/paris.jpg") },
  { id: "fr4", title: "Bali Adventure",    subtitle: "From 7,500 pts",  image: require("@/assets/destinations/bali.jpg") },
];

const TRANSACTIONS = [
  { id: "t1", title: "Dubai Trip — Flights",     category: "Flight",  amount: "+€54",   pts: "+540 pts",   date: "Today 09:14",   positive: true },
  { id: "t2", title: "Dubai Trip — Hotel",       category: "Hotel",   amount: "+€150",  pts: "+1,500 pts", date: "Today 09:16",   positive: true },
  { id: "t3", title: "Santorini Trip — Flights", category: "Flight",  amount: "+€52",   pts: "+520 pts",   date: "Mar 15 14:30",  positive: true },
  { id: "t4", title: "Referral Bonus",           category: "Reward",  amount: "+€25",   pts: "+500 pts",   date: "Mar 15 18:00",  positive: true },
  { id: "t5", title: "Travel Insurance",         category: "Other",   amount: "-€65",   pts: "",           date: "Mar 5 11:00",   positive: false },
];

const REDEEM_WAYS = [
  { id: "r1", emoji: "✈️", title: "Airline Miles",   color: C.purple },
  { id: "r2", emoji: "🎁", title: "Gift Cards",      color: C.pink },
  { id: "r3", emoji: "🏨", title: "Hotel Stays",     color: "#06B6D4" },
  { id: "r4", emoji: "📱", title: "eSIM Data",       color: C.green },
  { id: "r5", emoji: "🎭", title: "Experiences",     color: C.orange },
  { id: "r6", emoji: "🛋️", title: "Lounges",        color: "#8B5CF6" },
];

const CARDS = [
  { id: "c1", type: "Visa",       last4: "4242", name: "TRAVI GOLD",   colors: [C.purple, "#9B3FD4", C.pink] as [string, string, string], balance: 3420 },
  { id: "c2", type: "Mastercard", last4: "8888", name: "TRAVI TRAVEL", colors: ["#1A0B2E", "#24103E", "#3D1F6B"] as [string, string, string], balance: 1850 },
];

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const [activeCard, setActiveCard] = useState(0);
  const tabBarOffset = 60 + Math.max(insets.bottom, 8) + 16;

  const totalBalance = CARDS.reduce((s, c) => s + c.balance, 0);
  const totalPoints  = 8_450;
  const cashback     = 127;

  return (
    <View style={S.root}>
      {/* ══ HEADER ══ */}
      <LinearGradient
        colors={[C.purple, "#9B3FD4", C.pink]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={[S.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={S.headerRow}>
          <View>
            <Text style={S.headerTitle}>Wallet</Text>
            <Text style={S.headerSub}>Manage your travel funds</Text>
          </View>
          <TouchableOpacity style={S.addBtn} onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }} activeOpacity={0.85}>
            <IconSymbol name="plus" size={18} color={C.white} />
            <Text style={S.addBtnText}>Add Card</Text>
          </TouchableOpacity>
        </View>
        <View style={S.balanceRow}>
          <View style={S.balanceItem}>
            <Text style={S.balanceNum}>€{totalBalance.toLocaleString()}</Text>
            <Text style={S.balanceLabel}>Total Balance</Text>
          </View>
          <View style={S.balanceDivider} />
          <View style={S.balanceItem}>
            <Text style={S.balanceNum}>{totalPoints.toLocaleString()}</Text>
            <Text style={S.balanceLabel}>Travel Points</Text>
          </View>
          <View style={S.balanceDivider} />
          <View style={S.balanceItem}>
            <Text style={S.balanceNum}>€{cashback}</Text>
            <Text style={S.balanceLabel}>Cashback</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>
        {/* ══ CARDS ══ */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>My Cards</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {CARDS.map((card, i) => (
              <TouchableOpacity key={card.id} onPress={() => setActiveCard(i)} activeOpacity={0.9}>
                <View style={[S.payCard, i !== activeCard && { opacity: 0.6 }]}>
                  <LinearGradient colors={card.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
                  <View style={S.payCardTop}>
                    <Text style={S.payCardName}>{card.name}</Text>
                    <Text style={S.payCardType}>{card.type}</Text>
                  </View>
                  <Text style={S.payCardBalance}>€{card.balance.toLocaleString()}</Text>
                  <View style={S.payCardBottom}>
                    <Text style={S.payCardNumber}>•••• •••• •••• {card.last4}</Text>
                    {i === activeCard && <View style={S.activeChip}><Text style={S.activeChipText}>Active</Text></View>}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ══ QUICK ACTIONS ══ */}
        <View style={S.quickActions}>
          {[
            { label: "Top Up",   icon: "arrow.up.circle.fill" as const,   color: C.purple },
            { label: "Transfer", icon: "arrow.left.arrow.right" as const, color: C.pink },
            { label: "Redeem",   icon: "star.fill" as const,              color: C.orange },
            { label: "History",  icon: "clock.fill" as const,             color: C.green },
          ].map(a => (
            <TouchableOpacity
              key={a.label}
              style={S.quickAction}
              onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.85}
            >
              <View style={[S.quickActionIcon, { borderColor: a.color + "55" }]}>
                <IconSymbol name={a.icon} size={22} color={a.color} />
              </View>
              <Text style={S.quickActionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ══ POINTS CARD ══ */}
        <View style={S.sectionPad}>
          <View style={S.pointsCard}>
            <LinearGradient colors={[C.purple, "#9B3FD4", C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
            <View style={S.pointsCardContent}>
              <View>
                <Text style={S.pointsCardLabel}>Travel Points</Text>
                <Text style={S.pointsCardNum}>{totalPoints.toLocaleString()} pts</Text>
                <Text style={S.pointsCardSub}>≈ €{(totalPoints * 0.01).toFixed(0)} travel credit</Text>
              </View>
              <TouchableOpacity style={S.redeemBtn} activeOpacity={0.85}>
                <Text style={S.redeemBtnText}>Redeem</Text>
              </TouchableOpacity>
            </View>
            <View style={S.pointsProgress}>
              <View style={S.pointsProgressBar}>
                <View style={[S.pointsProgressFill, { width: `${Math.min((totalPoints / 10000) * 100, 100)}%` }]} />
              </View>
              <Text style={S.pointsProgressLabel}>{(10000 - totalPoints).toLocaleString()} pts to Gold status</Text>
            </View>
          </View>
        </View>

        {/* ══ FEATURED REWARDS ══ */}
        <View style={S.section}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Redeem Points</Text>
            <TouchableOpacity activeOpacity={0.85}><Text style={S.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <FlatList
            data={FEATURED_REWARDS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={i => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={S.rewardCard} activeOpacity={0.88}>
                <Image source={item.image} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(26,11,46,0.85)"]} style={StyleSheet.absoluteFillObject} />
                <View style={S.rewardBottom}>
                  <Text style={S.rewardTitle}>{item.title}</Text>
                  <Text style={S.rewardSub}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ══ WAYS TO REDEEM ══ */}
        <View style={S.sectionPad}>
          <Text style={S.sectionTitle}>Ways to Redeem</Text>
          <View style={S.redeemGrid}>
            {REDEEM_WAYS.map(r => (
              <TouchableOpacity key={r.id} style={S.redeemItem} activeOpacity={0.85}>
                <View style={[S.redeemIcon, { borderColor: r.color + "55" }]}>
                  <Text style={S.redeemEmoji}>{r.emoji}</Text>
                </View>
                <Text style={S.redeemLabel}>{r.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ══ TRANSACTIONS ══ */}
        <View style={S.sectionPad}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.85}><Text style={S.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <View style={S.txList}>
            {TRANSACTIONS.map((tx, i) => (
              <View key={tx.id} style={[S.txRow, i === TRANSACTIONS.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={[S.txIconWrap, { borderColor: (tx.positive ? C.green : C.pink) + "44" }]}>
                  <IconSymbol name={tx.positive ? "arrow.down.circle.fill" : "arrow.up.circle.fill"} size={20} color={tx.positive ? C.green : C.pink} />
                </View>
                <View style={S.txInfo}>
                  <Text style={S.txTitle}>{tx.title}</Text>
                  <Text style={S.txMeta}>{tx.category} · {tx.date}</Text>
                </View>
                <View style={S.txRight}>
                  <Text style={[S.txAmount, tx.positive && S.txAmountPos]}>{tx.amount}</Text>
                  {tx.pts ? <Text style={S.txPts}>{tx.pts}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  headerTitle: { color: C.white, fontSize: 28, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  addBtn: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.25)",
  },
  addBtnText: { color: C.white, fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  balanceRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 16,
    paddingVertical: 14, paddingHorizontal: 20,
  },
  balanceItem: { flex: 1, alignItems: "center", gap: 2 },
  balanceNum: { color: C.white, fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  balanceLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Satoshi-Regular" },
  balanceDivider: { width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.2)" },
  section: { paddingTop: 24, gap: 12 },
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { color: C.white, fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Bold", paddingHorizontal: 20 },
  seeAll: { color: C.pink, fontSize: 13, fontFamily: "Satoshi-Medium", paddingHorizontal: 20 },
  payCard: {
    width: 300, height: 170, borderRadius: 20, overflow: "hidden",
    padding: 20, justifyContent: "space-between",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  payCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  payCardName: { color: C.white, fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold", letterSpacing: 1 },
  payCardType: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  payCardBalance: { color: C.white, fontSize: 28, fontWeight: "800", fontFamily: "Chillax-Bold" },
  payCardBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  payCardNumber: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "Satoshi-Regular", letterSpacing: 2 },
  activeChip: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  activeChipText: { color: C.white, fontSize: 11, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  quickActions: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 20, paddingTop: 24 },
  quickAction: { alignItems: "center", gap: 8 },
  quickActionIcon: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: C.surface, borderWidth: 1,
    alignItems: "center", justifyContent: "center",
  },
  quickActionLabel: { color: C.textSecondary, fontSize: 12, fontFamily: "Satoshi-Medium" },
  pointsCard: {
    borderRadius: 20, overflow: "hidden",
    padding: 20, gap: 16,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  pointsCardContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pointsCardLabel: { color: "rgba(255,255,255,0.8)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  pointsCardNum: { color: C.white, fontSize: 28, fontWeight: "800", fontFamily: "Chillax-Bold" },
  pointsCardSub: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  redeemBtn: {
    backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 10,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.3)",
  },
  redeemBtnText: { color: C.white, fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  pointsProgress: { gap: 6 },
  pointsProgressBar: { height: 6, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" },
  pointsProgressFill: { height: "100%", backgroundColor: C.white, borderRadius: 3 },
  pointsProgressLabel: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  rewardCard: {
    width: 160, height: 120, borderRadius: 16, overflow: "hidden",
    borderWidth: 1, borderColor: C.glassStroke, justifyContent: "flex-end",
  },
  rewardBottom: { padding: 10 },
  rewardTitle: { color: C.white, fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  rewardSub: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Satoshi-Regular" },
  redeemGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 12 },
  redeemItem: { width: "30%", alignItems: "center", gap: 6 },
  redeemIcon: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: C.surface, borderWidth: 1,
    alignItems: "center", justifyContent: "center",
  },
  redeemEmoji: { fontSize: 22 },
  redeemLabel: { color: C.textSecondary, fontSize: 11, fontFamily: "Satoshi-Medium", textAlign: "center" },
  txList: {
    backgroundColor: C.surface, borderRadius: 20,
    borderWidth: 1, borderColor: C.glassStroke, overflow: "hidden",
  },
  txRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: "rgba(123,68,230,0.15)",
  },
  txIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: "rgba(100,67,244,0.12)", borderWidth: 1,
    alignItems: "center", justifyContent: "center",
  },
  txInfo: { flex: 1, gap: 2 },
  txTitle: { color: C.textPrimary, fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  txMeta: { color: C.textMuted, fontSize: 12, fontFamily: "Satoshi-Regular" },
  txRight: { alignItems: "flex-end", gap: 2 },
  txAmount: { color: C.pink, fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  txAmountPos: { color: C.green },
  txPts: { color: C.textMuted, fontSize: 11, fontFamily: "Satoshi-Regular" },
});
