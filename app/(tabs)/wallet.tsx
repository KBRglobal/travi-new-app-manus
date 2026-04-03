/**
 * TRAVI Wallet — Revolut-style premium design
 * Dramatic balance card, featured rewards with photos,
 * ways to redeem, transaction history grouped by trip.
 */

import { useState, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Animated, Modal, Platform, FlatList, Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

// ── Data ──────────────────────────────────────────────────────────────────────

const TIERS = [
  { name: "Explorer",     min: 0,     max: 5000,    color: "#A78BCA", emoji: "🌱" },
  { name: "Adventurer",   min: 5000,  max: 15000,   color: "#22C55E", emoji: "🧗" },
  { name: "Globetrotter", min: 15000, max: 30000,   color: "#06B6D4", emoji: "🌍" },
  { name: "Elite Nomad",  min: 30000, max: Infinity, color: "#FFD700", emoji: "👑" },
];

const FEATURED_REWARDS = [
  { id: "fr1", title: "Flights to Tokyo", subtitle: "From ✦ 13,000 pts", image: require("@/assets/destinations/tokyo.jpg"), color: "#6443F4" },
  { id: "fr2", title: "Maldives Stay", subtitle: "From ✦ 18,500 pts", image: require("@/assets/destinations/maldives.jpg"), color: "#06B6D4" },
  { id: "fr3", title: "Paris Experience", subtitle: "From ✦ 9,000 pts", image: require("@/assets/destinations/paris.jpg"), color: "#F94498" },
  { id: "fr4", title: "Bali Adventure", subtitle: "From ✦ 7,500 pts", image: require("@/assets/destinations/bali.jpg"), color: "#F59E0B" },
];

const REDEEM_WAYS = [
  { id: "rw1", emoji: "✈️", title: "Airline Miles",    desc: "Get airline rewards",           color: "#6443F4" },
  { id: "rw2", emoji: "🎁", title: "Gift Cards",       desc: "Save on top brands",            color: "#F94498" },
  { id: "rw3", emoji: "🏨", title: "Hotel Stays",      desc: "Book hotels and more",          color: "#06B6D4" },
  { id: "rw4", emoji: "📱", title: "eSIM Data",        desc: "Discounted data plans",         color: "#22C55E" },
  { id: "rw5", emoji: "🎭", title: "Experiences",      desc: "Explore things to do",          color: "#F59E0B" },
  { id: "rw6", emoji: "🛋️", title: "Airport Lounges", desc: "Access lounges worldwide",      color: "#8B5CF6" },
  { id: "rw7", emoji: "💳", title: "Virtual Cards",    desc: "Exclusive card designs",        color: "#EC4899" },
  { id: "rw8", emoji: "❤️", title: "Donations",        desc: "Support causes you care about", color: "#EF4444" },
];

const TRANSACTIONS = [
  {
    group: "Today",
    total: "+$241 cashback",
    items: [
      { id: "tx1", emoji: "✈️", title: "Dubai Trip — Flights", subtitle: "Emirates · TLV → DXB", amount: "+$54", pts: "+540 pts", color: "#6443F4", time: "09:14" },
      { id: "tx2", emoji: "🏨", title: "Dubai Trip — Hotel", subtitle: "Atlantis The Palm · 5 nights", amount: "+$150", pts: "+1,500 pts", color: "#F94498", time: "09:16" },
      { id: "tx3", emoji: "🎭", title: "Dubai Trip — Activities", subtitle: "Burj Khalifa + Desert Safari", amount: "+$37", pts: "+370 pts", color: "#F59E0B", time: "09:18" },
    ],
  },
  {
    group: "Mar 15, 2026",
    total: "+$198 cashback",
    items: [
      { id: "tx4", emoji: "✈️", title: "Santorini Trip — Flights", subtitle: "Aegean · TLV → ATH → JTR", amount: "+$52", pts: "+520 pts", color: "#06B6D4", time: "14:30" },
      { id: "tx5", emoji: "🏨", title: "Santorini Trip — Hotel", subtitle: "Canaves Oia · 4 nights", amount: "+$120", pts: "+1,200 pts", color: "#8B5CF6", time: "14:32" },
      { id: "tx6", emoji: "🎁", title: "Referral Bonus", subtitle: "Friend joined TRAVI", amount: "+$25", pts: "+500 pts", color: "#22C55E", time: "18:00" },
    ],
  },
  {
    group: "Feb 28, 2026",
    total: "+$89 cashback",
    items: [
      { id: "tx7", emoji: "✈️", title: "Tokyo Trip — Flights", subtitle: "El Al · TLV → NRT", amount: "+$89", pts: "+890 pts", color: "#F94498", time: "11:20" },
    ],
  },
];

// ── Transaction Detail Modal ──────────────────────────────────────────────────
function TxModal({ tx, onClose }: { tx: typeof TRANSACTIONS[0]["items"][0] | null; onClose: () => void }) {
  if (!tx) return null;
  return (
    <Modal visible={!!tx} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={tm.overlay} onPress={onClose} activeOpacity={1}>
        <View style={tm.sheet}>
          <View style={tm.handle} />
          <TouchableOpacity style={tm.closeBtn} onPress={onClose}>
            <Text style={tm.closeX}>✕</Text>
          </TouchableOpacity>
          <View style={[tm.iconCircle, { backgroundColor: tx.color + "22" }]}>
            <Text style={tm.iconEmoji}>{tx.emoji}</Text>
          </View>
          <Text style={tm.txTitle}>{tx.title}</Text>
          <Text style={tm.txAmount}>{tx.amount} cashback</Text>
          <Text style={tm.txTime}>{tx.subtitle} · {tx.time}</Text>

          <View style={tm.rows}>
            <View style={tm.row}>
              <Text style={tm.rowLabel}>Status</Text>
              <View style={tm.statusBadge}><Text style={tm.statusText}>✓ Completed</Text></View>
            </View>
            <View style={tm.divider} />
            <View style={tm.row}>
              <Text style={tm.rowLabel}>Points earned</Text>
              <Text style={tm.rowValue}>{tx.pts}</Text>
            </View>
            <View style={tm.divider} />
            <View style={tm.row}>
              <Text style={tm.rowLabel}>Cashback rate</Text>
              <Text style={tm.rowValue}>8% of booking value</Text>
            </View>
            <View style={tm.divider} />
            <View style={tm.row}>
              <Text style={tm.rowLabel}>Paid out</Text>
              <Text style={tm.rowValue}>After trip completion</Text>
            </View>
          </View>

          <TouchableOpacity style={[tm.helpBtn]} onPress={onClose}>
            <Text style={tm.helpText}>Get help →</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
const tm = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  sheet: { backgroundColor: "#1A1A2E", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40, alignItems: "center" },
  handle: { width: 40, height: 4, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 2, marginBottom: 20 },
  closeBtn: { position: "absolute", top: 20, right: 20, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },
  closeX: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  iconCircle: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  iconEmoji: { fontSize: 32 },
  txTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", textAlign: "center", fontFamily: "Chillax-Bold" },
  txAmount: { color: "#22C55E", fontSize: 32, fontWeight: "900", marginTop: 4, fontFamily: "Satoshi-Bold" },
  txTime: { color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 4, marginBottom: 20 },
  rows: { width: "100%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.07)", marginHorizontal: 16 },
  rowLabel: { color: "rgba(255,255,255,0.5)", fontSize: 14 },
  rowValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  statusBadge: { backgroundColor: "rgba(34,197,94,0.15)", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { color: "#22C55E", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  helpBtn: { marginTop: 20, padding: 12 },
  helpText: { color: "rgba(255,255,255,0.4)", fontSize: 14 },
});

// ── Animated progress bar ─────────────────────────────────────────────────────
function ProgressBar({ progress, color }: { progress: number; color: string }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: progress / 100, duration: 1400, delay: 400, useNativeDriver: false }).start();
  }, [progress]);
  const w = anim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });
  return (
    <View style={pb.track}>
      <Animated.View style={[pb.fill, { width: w }]}>
        <LinearGradient colors={[color, color + "AA"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
      </Animated.View>
    </View>
  );
}
const pb = StyleSheet.create({
  track: { height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 3, overflow: "hidden" },
});

// ── Main screen ───────────────────────────────────────────────────────────────
export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const { state } = useStore();
  const points = state.profile?.points ?? 4250;
  const lifetimeSavings = state.profile?.lifetimeSavings ?? 127;
  const tripsRewarded = 3;
  const cashbackRate = 8;

  const [activeTab, setActiveTab] = useState<"overview" | "redeem" | "history">("overview");
  const [selectedTx, setSelectedTx] = useState<typeof TRANSACTIONS[0]["items"][0] | null>(null);
  const tabAnim = useRef(new Animated.Value(0)).current;

  const currentTier = TIERS.find((t) => points >= t.min && points < t.max) ?? TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  const tierProgress = nextTier
    ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;
  const ptsToNext = nextTier ? nextTier.min - points : 0;

  const handleTab = (tab: typeof activeTab) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
    Animated.spring(tabAnim, { toValue: tab === "overview" ? 0 : tab === "redeem" ? 1 : 2, useNativeDriver: false }).start();
  };

  const handleTx = (tx: typeof TRANSACTIONS[0]["items"][0]) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTx(tx);
  };

  const tabIndicatorLeft = tabAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["2%", "35%", "68%"],
  });

  return (
    <View style={[S.container]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#0D0628"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />

      {/* Header — sits below status bar */}
      <View style={[S.header, { paddingTop: Math.max(insets.top, 44) + 8 }]}>
        <Text style={S.headerTitle}>TRAVI Wallet</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* ═══ BALANCE CARD ═══ */}
        <View style={S.cardWrap}>
          <View style={S.balanceCard}>
            <LinearGradient
              colors={["#6443F4", "#C026D3", "#F94498"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            {/* Decorative orbs */}
            <View style={S.cardOrb1} />
            <View style={S.cardOrb2} />

            {/* Top row */}
            <View style={S.cardTopRow}>
              <Text style={S.cardLabel}>CASHBACK BALANCE</Text>
              <View style={S.tierBadge}>
                <Text style={S.tierBadgeText}>{currentTier.emoji} {currentTier.name}</Text>
              </View>
            </View>

            {/* Big number */}
            <Text style={S.balanceAmount}>${lifetimeSavings}</Text>
            <Text style={S.balanceSub}>≈ {points.toLocaleString()} TRAVI points</Text>

            {/* Progress to next tier */}
            <View style={S.tierProgress}>
              <View style={S.tierProgressLabels}>
                <Text style={S.tierProgressLeft}>{points.toLocaleString()} pts</Text>
                <Text style={S.tierProgressRight}>
                  {nextTier ? `${nextTier.name} at ${nextTier.min.toLocaleString()}` : "Max Tier 👑"}
                </Text>
              </View>
              <ProgressBar progress={tierProgress} color="#FFFFFF" />
              {nextTier && (
                <Text style={S.tierProgressHint}>{ptsToNext.toLocaleString()} pts to {nextTier.name}</Text>
              )}
            </View>

            {/* Stats row */}
            <View style={S.statsRow}>
              <View style={S.statItem}>
                <Text style={S.statValue}>${lifetimeSavings}</Text>
                <Text style={S.statLabel}>Lifetime Saved</Text>
              </View>
              <View style={S.statDivider} />
              <View style={S.statItem}>
                <Text style={S.statValue}>{tripsRewarded}</Text>
                <Text style={S.statLabel}>Trips Rewarded</Text>
              </View>
              <View style={S.statDivider} />
              <View style={S.statItem}>
                <Text style={S.statValue}>{cashbackRate}%</Text>
                <Text style={S.statLabel}>Cashback Rate</Text>
              </View>
            </View>
          </View>
          {/* Action buttons */}
          <View style={S.actionBtnsRow}>
            <TouchableOpacity style={S.actionBtn} onPress={() => router.push("/(tabs)/wallet-kyc" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.08)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.actionBtnEmoji}>📸</Text>
              <Text style={S.actionBtnText}>Verify ID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={S.actionBtn} onPress={() => router.push("/(tabs)/wallet-withdraw" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["rgba(34,197,94,0.2)", "rgba(34,197,94,0.08)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.actionBtnEmoji}>💸</Text>
              <Text style={S.actionBtnText}>Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity style={S.actionBtn} onPress={() => router.push("/(tabs)/rewards-portal" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(100,67,244,0.08)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.actionBtnEmoji}>⭐</Text>
              <Text style={S.actionBtnText}>Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={S.actionBtn} onPress={() => router.push("/(tabs)/badges-leaderboard" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["rgba(249,68,152,0.2)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.actionBtnEmoji}>🏆</Text>
              <Text style={S.actionBtnText}>Badges</Text>
            </TouchableOpacity>
            <TouchableOpacity style={S.actionBtn} onPress={() => router.push("/(tabs)/wallet-exchange" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["rgba(34,197,94,0.2)", "rgba(34,197,94,0.08)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.actionBtnEmoji}>💱</Text>
              <Text style={S.actionBtnText}>Exchange</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* ═══ TABS ═══ */}
        <View style={S.tabsWrap}>
          <View style={S.tabs}>
            <Animated.View style={[S.tabIndicator, { left: tabIndicatorLeft }]} />
            {(["overview", "redeem", "history"] as const).map((tab) => (
              <TouchableOpacity key={tab} style={S.tab} onPress={() => handleTab(tab)} activeOpacity={0.8}>
                <Text style={[S.tabText, activeTab === tab && S.tabTextActive]}>
                  {tab === "overview" ? "Overview" : tab === "redeem" ? "Redeem" : "History"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === "overview" && (
          <View style={S.tabContent}>
            <Text style={S.sectionTitle}>How to Earn</Text>
            <Text style={S.sectionSub}>Every booking earns you cashback — automatically.</Text>
            <View style={S.earnList}>
              {[
                { emoji: "✈️", action: "Book a flight",    pts: "8% cashback", color: "#6443F4" },
                { emoji: "🏨", action: "Book a hotel",     pts: "8% cashback", color: "#F94498" },
                { emoji: "🎭", action: "Book activities",  pts: "5% cashback", color: "#F59E0B" },
                { emoji: "👥", action: "Refer a friend",   pts: "$25 bonus",   color: "#22C55E" },
                { emoji: "⭐", action: "Leave a review",   pts: "$2 bonus",    color: "#06B6D4" },
                { emoji: "🎂", action: "Birthday bonus",   pts: "$10 bonus",   color: "#8B5CF6" },
              ].map((row, i) => (
                <View key={i} style={S.earnRow}>
                  <View style={[S.earnIcon, { backgroundColor: row.color + "22" }]}>
                    <Text style={{ fontSize: 20 }}>{row.emoji}</Text>
                  </View>
                  <Text style={S.earnAction}>{row.action}</Text>
                  <View style={[S.earnBadge, { backgroundColor: row.color + "22", borderColor: row.color + "44" }]}>
                    <Text style={[S.earnBadgeText, { color: row.color }]}>{row.pts}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Tier ladder */}
            <Text style={[S.sectionTitle, { marginTop: 28 }]}>Tier Benefits</Text>
            <View style={S.tierLadder}>
              {TIERS.map((tier, i) => {
                const isActive = tier.name === currentTier.name;
                return (
                  <View key={i} style={[S.tierRow, isActive && { backgroundColor: tier.color + "18" }]}>
                    <Text style={S.tierEmoji}>{tier.emoji}</Text>
                    <View style={S.tierInfo}>
                      <Text style={[S.tierName, isActive && { color: tier.color }]}>{tier.name}</Text>
                      <Text style={S.tierRange}>
                        {tier.max === Infinity ? `${tier.min.toLocaleString()}+ pts` : `${tier.min.toLocaleString()} – ${tier.max.toLocaleString()} pts`}
                      </Text>
                    </View>
                    {isActive && <View style={[S.activeDot, { backgroundColor: tier.color }]} />}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* ═══ REDEEM TAB ═══ */}
        {activeTab === "redeem" && (
          <View style={S.tabContent}>
            {/* Featured rewards */}
            <Text style={S.sectionTitle}>Featured Rewards</Text>
            <FlatList
              data={FEATURED_REWARDS}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingRight: 8, paddingTop: 12, paddingBottom: 4 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={S.featuredCard} activeOpacity={0.88}>
                  <Image source={item.image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                  <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} locations={[0.3, 1]} style={StyleSheet.absoluteFillObject} />
                  <View style={S.featuredCardIcon}>
                    <Text style={{ fontSize: 18 }}>✈️</Text>
                  </View>
                  <View style={S.featuredCardBottom}>
                    <Text style={S.featuredCardTitle}>{item.title}</Text>
                    <Text style={S.featuredCardSub}>{item.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            {/* Ways to redeem */}
            <Text style={[S.sectionTitle, { marginTop: 24 }]}>Ways to Redeem</Text>
            <View style={S.redeemList}>
              {REDEEM_WAYS.map((way, i) => (
                <TouchableOpacity key={way.id} style={S.redeemRow} activeOpacity={0.8}
                  onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}>
                  <View style={[S.redeemIcon, { backgroundColor: way.color + "22" }]}>
                    <Text style={{ fontSize: 20 }}>{way.emoji}</Text>
                  </View>
                  <View style={S.redeemText}>
                    <Text style={S.redeemTitle}>{way.title}</Text>
                    <Text style={S.redeemDesc}>{way.desc}</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.3)" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ═══ HISTORY TAB ═══ */}
        {activeTab === "history" && (
          <View style={S.tabContent}>
            {TRANSACTIONS.map((group, gi) => (
              <View key={gi} style={{ marginBottom: 20 }}>
                <View style={S.groupHeader}>
                  <Text style={S.groupDate}>{group.group}</Text>
                  <Text style={S.groupTotal}>{group.total}</Text>
                </View>
                <View style={S.txGroup}>
                  {group.items.map((tx, ti) => (
                    <TouchableOpacity key={tx.id} style={S.txRow} onPress={() => handleTx(tx)} activeOpacity={0.8}>
                      <View style={[S.txIcon, { backgroundColor: tx.color + "22" }]}>
                        <Text style={{ fontSize: 20 }}>{tx.emoji}</Text>
                      </View>
                      <View style={S.txInfo}>
                        <Text style={S.txTitle}>{tx.title}</Text>
                        <Text style={S.txSub}>{tx.subtitle}</Text>
                      </View>
                      <View style={S.txRight}>
                        <Text style={S.txAmount}>{tx.amount}</Text>
                        <Text style={S.txPts}>{tx.pts}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

      {/* Transaction detail modal */}
      <TxModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  headerTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "900", letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  pointsBadge: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7 },
  pointsBadgeText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },

  // Balance card
  cardWrap: { paddingHorizontal: 20, marginBottom: 20 },
  balanceCard: { borderRadius: 28, overflow: "hidden", padding: 22, gap: 0 },
  cardOrb1: { position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.08)", top: -60, right: -60 },
  cardOrb2: { position: "absolute", width: 140, height: 140, borderRadius: 70, backgroundColor: "rgba(255,255,255,0.05)", bottom: -40, left: 20 },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardLabel: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  tierBadge: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  tierBadgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  balanceAmount: { color: "#FFFFFF", fontSize: 52, fontWeight: "900", letterSpacing: -2, lineHeight: 56, fontFamily: "Satoshi-Bold" },
  balanceSub: { color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4, marginBottom: 18 },

  tierProgress: { gap: 6, marginBottom: 18 },
  tierProgressLabels: { flexDirection: "row", justifyContent: "space-between" },
  tierProgressLeft: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: "700" },
  tierProgressRight: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: "700" },
  tierProgressHint: { color: "rgba(255,255,255,0.45)", fontSize: 11, textAlign: "center", marginTop: 2 },

  statsRow: { flexDirection: "row", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 14 },
  statItem: { flex: 1, alignItems: "center", gap: 3 },
  statValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", fontFamily: "Satoshi-Bold" },
  statLabel: { color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: "600" },
  statDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.15)" },

  // Tabs
  tabsWrap: { paddingHorizontal: 20, marginBottom: 4 },
  tabs: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 4, position: "relative" },
  tabIndicator: { position: "absolute", top: 4, bottom: 4, width: "30%", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 12 },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center" },
  tabText: { color: "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  tabTextActive: { color: "#FFFFFF" },

  tabContent: { paddingHorizontal: 20, paddingTop: 20 },

  sectionTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", letterSpacing: -0.3, fontFamily: "Chillax-Bold" },
  sectionSub: { color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 4, marginBottom: 14 },

  // Earn rows
  earnList: { gap: 2, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  earnRow: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  earnIcon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  earnAction: { flex: 1, color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  earnBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1 },
  earnBadgeText: { fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },

  // Tier ladder
  tierLadder: { gap: 2, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", marginTop: 12 },
  tierRow: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  tierEmoji: { fontSize: 22, width: 32, textAlign: "center" },
  tierInfo: { flex: 1 },
  tierName: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  tierRange: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 1 },
  activeDot: { width: 8, height: 8, borderRadius: 4 },

  // Featured rewards
  featuredCard: { width: width * 0.52, height: 160, borderRadius: 18, overflow: "hidden", marginRight: 10 },
  featuredCardIcon: { position: "absolute", top: 12, left: 12, width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  featuredCardBottom: { position: "absolute", bottom: 12, left: 12, right: 12 },
  featuredCardTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", lineHeight: 18, fontFamily: "Chillax-Bold" },
  featuredCardSub: { color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 },

  // Redeem list
  redeemList: { gap: 2, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", marginTop: 12 },
  redeemRow: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  redeemIcon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  redeemText: { flex: 1 },
  redeemTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  redeemDesc: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 1 },

  // History
  groupHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  groupDate: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  groupTotal: { color: "#22C55E", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  txGroup: { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  txRow: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  txIcon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  txInfo: { flex: 1 },
  txTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  txSub: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 1 },
  txRight: { alignItems: "flex-end" },
  txAmount: { color: "#22C55E", fontSize: 15, fontWeight: "900", fontFamily: "Satoshi-Bold" },
  txPts: { color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 1 },
  actionBtnsRow: { flexDirection: "row", gap: 8, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
  actionBtn: { flex: 1, borderRadius: 14, overflow: "hidden", paddingVertical: 12, alignItems: "center", gap: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  actionBtnEmoji: { fontSize: 20 },
  actionBtnText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
});
