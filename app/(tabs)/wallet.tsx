/**
 * TRAVI — Wallet Screen (Neutral Mockup)
 * Clean, minimal dark theme. Focus on UX and information.
 */
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, FlatList, Image,
} from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const N = {
  bg:         "#111111",
  surface:    "#1C1C1E",
  surfaceAlt: "#2C2C2E",
  border:     "rgba(255,255,255,0.10)",
  white:      "#FFFFFF",
  textPri:    "#FFFFFF",
  textSec:    "#ABABAB",
  textMuted:  "#777777",
  accent:     "#007AFF",
  green:      "#34C759",
  orange:     "#FF9500",
  red:        "#FF3B30",
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
  { id: "r1", icon: "airplane" as const,         title: "Airline Miles" },
  { id: "r2", icon: "gift.fill" as const,        title: "Gift Cards" },
  { id: "r3", icon: "bed.double.fill" as const,  title: "Hotel Stays" },
  { id: "r4", icon: "wifi" as const,             title: "eSIM Data" },
  { id: "r5", icon: "theatermasks.fill" as const, title: "Experiences" },
  { id: "r6", icon: "sofa.fill" as const,        title: "Lounges" },
];

const CARDS = [
  { id: "c1", type: "Visa",       last4: "4242", name: "TRAVI GOLD",   balance: 3420 },
  { id: "c2", type: "Mastercard", last4: "8888", name: "TRAVI TRAVEL", balance: 1850 },
];

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const [activeCard, setActiveCard] = useState(0);
  const tabBarOffset = 56 + Math.max(insets.bottom, 8) + 16;

  const totalBalance = CARDS.reduce((s, c) => s + c.balance, 0);
  const totalPoints  = 8_450;
  const cashback     = 127;

  return (
    <View style={S.root}>
      {/* ── Header ── */}
      <View style={[S.header, { paddingTop: insets.top + 8 }]}>
        <View style={S.headerRow}>
          <View>
            <Text style={S.headerTitle}>Wallet</Text>
            <Text style={S.headerSub}>Manage your travel funds</Text>
          </View>
          <TouchableOpacity
            style={S.addBtn}
            onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            activeOpacity={0.7}
          >
            <IconSymbol name="plus" size={16} color={N.white} />
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
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>
        {/* ── Cards ── */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>My Cards</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {CARDS.map((card, i) => (
              <TouchableOpacity key={card.id} onPress={() => setActiveCard(i)} activeOpacity={0.8}>
                <View style={[S.payCard, i !== activeCard && { opacity: 0.5 }]}>
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

        {/* ── Quick Actions ── */}
        <View style={S.quickActions}>
          {[
            { label: "Top Up",   icon: "arrow.up.circle.fill" as const },
            { label: "Transfer", icon: "arrow.left.arrow.right" as const },
            { label: "Redeem",   icon: "star.fill" as const },
            { label: "History",  icon: "clock.fill" as const },
          ].map(a => (
            <TouchableOpacity
              key={a.label}
              style={S.quickAction}
              onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.7}
            >
              <View style={S.quickActionIcon}>
                <IconSymbol name={a.icon} size={22} color={N.white} />
              </View>
              <Text style={S.quickActionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Points Card ── */}
        <View style={S.sectionPad}>
          <View style={S.pointsCard}>
            <View style={S.pointsCardContent}>
              <View>
                <Text style={S.pointsCardLabel}>Travel Points</Text>
                <Text style={S.pointsCardNum}>{totalPoints.toLocaleString()} pts</Text>
                <Text style={S.pointsCardSub}>≈ €{(totalPoints * 0.01).toFixed(0)} travel credit</Text>
              </View>
              <TouchableOpacity style={S.redeemBtn} activeOpacity={0.7}>
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

        {/* ── Featured Rewards ── */}
        <View style={S.section}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Redeem Points</Text>
            <TouchableOpacity activeOpacity={0.7}><Text style={S.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <FlatList
            data={FEATURED_REWARDS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={i => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={S.rewardCard} activeOpacity={0.7}>
                <Image source={item.image} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />
                <View style={S.rewardOverlay} />
                <View style={S.rewardBottom}>
                  <Text style={S.rewardTitle}>{item.title}</Text>
                  <Text style={S.rewardSub}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── Ways to Redeem ── */}
        <View style={S.sectionPad}>
          <Text style={S.sectionTitleInline}>Ways to Redeem</Text>
          <View style={S.redeemGrid}>
            {REDEEM_WAYS.map(r => (
              <TouchableOpacity key={r.id} style={S.redeemItem} activeOpacity={0.7}>
                <View style={S.redeemIcon}>
                  <IconSymbol name={r.icon} size={22} color={N.white} />
                </View>
                <Text style={S.redeemLabel}>{r.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Transactions ── */}
        <View style={S.sectionPad}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitleInline}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.7}><Text style={S.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <View style={S.txList}>
            {TRANSACTIONS.map((tx, i) => (
              <View key={tx.id} style={[S.txRow, i === TRANSACTIONS.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={S.txIconWrap}>
                  <IconSymbol name={tx.positive ? "arrow.down.circle.fill" : "arrow.up.circle.fill"} size={20} color={tx.positive ? N.green : N.red} />
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
  root: { flex: 1, backgroundColor: N.bg },

  // Header
  header: { paddingHorizontal: 20, paddingBottom: 16, gap: 12, backgroundColor: N.bg },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  headerTitle: { color: N.white, fontSize: 28, fontWeight: "700" },
  headerSub: { color: N.textSec, fontSize: 14 },
  addBtn: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: N.accent, borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  addBtnText: { color: N.white, fontSize: 13, fontWeight: "600" },
  balanceRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: N.surface, borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  balanceItem: { flex: 1, alignItems: "center", gap: 2 },
  balanceNum: { color: N.white, fontSize: 18, fontWeight: "700" },
  balanceLabel: { color: N.textMuted, fontSize: 11 },
  balanceDivider: { width: StyleSheet.hairlineWidth, height: 28, backgroundColor: N.border },

  // Sections
  section: { paddingTop: 24, gap: 12 },
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { color: N.white, fontSize: 18, fontWeight: "700", paddingHorizontal: 20 },
  sectionTitleInline: { color: N.white, fontSize: 18, fontWeight: "700", marginBottom: 12 },
  seeAll: { color: N.accent, fontSize: 13, fontWeight: "500", paddingHorizontal: 20 },

  // Pay Cards
  payCard: {
    width: 280, height: 160, borderRadius: 14, overflow: "hidden",
    padding: 20, justifyContent: "space-between",
    backgroundColor: N.surfaceAlt,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  payCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  payCardName: { color: N.white, fontSize: 13, fontWeight: "700", letterSpacing: 1 },
  payCardType: { color: N.textMuted, fontSize: 12 },
  payCardBalance: { color: N.white, fontSize: 28, fontWeight: "700" },
  payCardBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  payCardNumber: { color: N.textMuted, fontSize: 13, letterSpacing: 2 },
  activeChip: { backgroundColor: N.accent, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 3 },
  activeChipText: { color: N.white, fontSize: 11, fontWeight: "700" },

  // Quick Actions
  quickActions: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 20, paddingTop: 24 },
  quickAction: { alignItems: "center", gap: 8 },
  quickActionIcon: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
    alignItems: "center", justifyContent: "center",
  },
  quickActionLabel: { color: N.textSec, fontSize: 12 },

  // Points Card
  pointsCard: {
    borderRadius: 14, padding: 20, gap: 16,
    backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  pointsCardContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pointsCardLabel: { color: N.textSec, fontSize: 13 },
  pointsCardNum: { color: N.white, fontSize: 28, fontWeight: "700" },
  pointsCardSub: { color: N.textMuted, fontSize: 12 },
  redeemBtn: {
    backgroundColor: N.accent, borderRadius: 8,
    paddingHorizontal: 18, paddingVertical: 10,
  },
  redeemBtnText: { color: N.white, fontSize: 14, fontWeight: "600" },
  pointsProgress: { gap: 6 },
  pointsProgressBar: { height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" },
  pointsProgressFill: { height: "100%", backgroundColor: N.accent, borderRadius: 3 },
  pointsProgressLabel: { color: N.textMuted, fontSize: 12 },

  // Reward Cards
  rewardCard: {
    width: 150, height: 110, borderRadius: 12, overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border, justifyContent: "flex-end",
  },
  rewardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },
  rewardBottom: { padding: 10, zIndex: 1 },
  rewardTitle: { color: N.white, fontSize: 13, fontWeight: "700" },
  rewardSub: { color: "rgba(255,255,255,0.7)", fontSize: 11 },

  // Redeem Grid
  redeemGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  redeemItem: { width: "30%", alignItems: "center", gap: 6 },
  redeemIcon: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
    alignItems: "center", justifyContent: "center",
  },
  redeemLabel: { color: N.textSec, fontSize: 11, textAlign: "center" },

  // Transactions
  txList: {
    backgroundColor: N.surface, borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border, overflow: "hidden",
  },
  txRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: N.border,
  },
  txIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center", justifyContent: "center",
  },
  txInfo: { flex: 1, gap: 2 },
  txTitle: { color: N.textPri, fontSize: 14, fontWeight: "500" },
  txMeta: { color: N.textMuted, fontSize: 12 },
  txRight: { alignItems: "flex-end", gap: 2 },
  txAmount: { color: N.red, fontSize: 14, fontWeight: "600" },
  txAmountPos: { color: N.green },
  txPts: { color: N.textMuted, fontSize: 11 },
});
