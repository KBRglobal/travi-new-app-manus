/**
 * TRAVI — Rewards Portal Screen
 * Cashback balance, points redemption, tier benefits, and referral program.
 */

import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

const { width } = Dimensions.get("window");

const TIERS = [
  { name: "Bronze", emoji: "🥉", minXP: 0, maxXP: 2000, cashbackRate: "5%", color: "#CD7F32", perks: ["5% cashback on all bookings", "Priority customer support", "Early access to deals"] },
  { name: "Silver", emoji: "🥈", minXP: 2000, maxXP: 5000, cashbackRate: "8%", color: "#C0C0C0", perks: ["8% cashback on all bookings", "Free travel insurance (1 trip/yr)", "Lounge access (2x/yr)", "Dedicated travel agent"] },
  { name: "Gold", emoji: "🥇", minXP: 5000, maxXP: 10000, cashbackRate: "12%", color: "#FBBF24", perks: ["12% cashback on all bookings", "Free travel insurance (unlimited)", "Lounge access (unlimited)", "Room upgrades when available", "DNA-matched concierge"] },
  { name: "Platinum", emoji: "💎", minXP: 10000, maxXP: Infinity, cashbackRate: "15%", color: "#A78BFA", perks: ["15% cashback on all bookings", "All Gold perks", "Private jet partnerships", "24/7 personal travel butler", "Exclusive destination access", "First Class DNA included"] },
];

const REWARDS = [
  { id: "r1", title: "Flight Upgrade", desc: "Upgrade to Business Class on any booking", points: 5000, category: "Travel", emoji: "✈️", available: true },
  { id: "r2", title: "Hotel Night Free", desc: "One free night at any partner hotel", points: 3000, category: "Hotel", emoji: "🏨", available: true },
  { id: "r3", title: "Airport Lounge", desc: "Single-use lounge access at any airport", points: 1500, category: "Comfort", emoji: "🛋️", available: true },
  { id: "r4", title: "Travel Insurance", desc: "1-month comprehensive travel insurance", points: 2000, category: "Protection", emoji: "🛡️", available: true },
  { id: "r5", title: "eSIM Data Pack", desc: "10GB international data for 30 days", points: 800, category: "Tech", emoji: "📱", available: true },
  { id: "r6", title: "DNA Assessment", desc: "First Class DNA 9-module assessment", points: 0, category: "Profile", emoji: "🧬", available: false },
  { id: "r7", title: "Cashback Boost", desc: "Double cashback on next booking", points: 1200, category: "Cashback", emoji: "💰", available: true },
  { id: "r8", title: "Private Transfer", desc: "Airport private car transfer", points: 2500, category: "Transport", emoji: "🚗", available: true },
];

const TRANSACTIONS = [
  { id: "t1", desc: "Dubai hotel booking", amount: +420, date: "Feb 2025", type: "earned" },
  { id: "t2", desc: "Flight upgrade redeemed", amount: -5000, date: "Jan 2025", type: "spent" },
  { id: "t3", desc: "Paris flight booking", amount: +380, date: "Nov 2024", type: "earned" },
  { id: "t4", desc: "Tokyo hotel booking", amount: +550, date: "Sep 2024", type: "earned" },
  { id: "t5", desc: "Referral bonus — Oren M.", amount: +200, date: "Aug 2024", type: "bonus" },
  { id: "t6", desc: "Maldives resort booking", amount: +890, date: "Jun 2024", type: "earned" },
  { id: "t7", desc: "Lounge access redeemed", amount: -1500, date: "May 2024", type: "spent" },
];

const TABS = ["Overview", "Redeem", "History"];

export default function RewardsPortalScreen() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [redeeming, setRedeeming] = useState<string | null>(null);

  // ── Real DB data via tRPC ────────────────────────────────────────────────────
  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
  const { data: walletData } = trpc.wallet.balance.useQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 30_000,
  });

  // Use real XP from profile, fall back to mock
  const currentXP = profile?.xp ?? 7850;
  const currentTier = TIERS.find((t) => currentXP >= t.minXP && currentXP < t.maxXP) || TIERS[2];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  // Use real wallet balance (cents → dollars), fall back to mock
  const cashbackBalance = walletData?.balance != null ? Math.round(walletData.balance / 100) : 2240;
  const pointsBalance = walletData?.balance != null ? Math.round(walletData.balance / 10) : 4850;

  const handleRedeem = (rewardId: string) => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setRedeeming(rewardId);
    setTimeout(() => setRedeeming(null), 2000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Rewards Portal</Text>
          <Text style={styles.headerSub}>{currentTier.emoji} {currentTier.name} Member</Text>
        </View>
        <View style={[styles.tierBadge, { backgroundColor: currentTier.color + "22", borderColor: currentTier.color + "55" }]}>
          <Text style={[styles.tierBadgeText, { color: currentTier.color }]}>{currentTier.name}</Text>
        </View>
      </View>

      {/* Balance cards */}
      <View style={styles.balanceRow}>
        <View style={styles.balanceCard}>
          <LinearGradient colors={["rgba(34,197,94,0.2)", "rgba(34,197,94,0.05)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={styles.balanceEmoji}>💰</Text>
          <Text style={styles.balanceValue}>${cashbackBalance}</Text>
          <Text style={styles.balanceLabel}>Cashback Balance</Text>
          <TouchableOpacity style={styles.balanceBtn} activeOpacity={0.8}>
            <Text style={styles.balanceBtnText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.balanceCard}>
          <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(100,67,244,0.05)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={styles.balanceEmoji}>⭐</Text>
          <Text style={styles.balanceValue}>{pointsBalance.toLocaleString()}</Text>
          <Text style={styles.balanceLabel}>Reward Points</Text>
          <TouchableOpacity style={[styles.balanceBtn, { backgroundColor: "rgba(100,67,244,0.3)" }]} activeOpacity={0.8} onPress={() => setActiveTab(1)}>
            <Text style={styles.balanceBtnText}>Redeem</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === i && styles.tabActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveTab(i);
            }}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 0 && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.overviewContent}>
          {/* Tier progress */}
          <View style={styles.tierCard}>
            <LinearGradient colors={[currentTier.color + "22", currentTier.color + "08"]} style={StyleSheet.absoluteFillObject} />
            <View style={styles.tierHeader}>
              <Text style={styles.tierEmoji}>{currentTier.emoji}</Text>
              <View style={styles.tierInfo}>
                <Text style={styles.tierName}>{currentTier.name} Tier</Text>
                <Text style={styles.tierXP}>{currentXP.toLocaleString()} XP</Text>
              </View>
              {nextTier && <Text style={styles.tierNext}>{nextTier.maxXP - currentXP} XP to {nextTier.name}</Text>}
            </View>
            {nextTier && (
              <View style={styles.tierProgress}>
                <View style={styles.tierProgressTrack}>
                  <LinearGradient
                    colors={[currentTier.color, currentTier.color + "88"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.tierProgressFill, { width: `${((currentXP - currentTier.minXP) / (currentTier.maxXP - currentTier.minXP)) * 100}%` as any }]}
                  />
                </View>
                <Text style={styles.tierProgressLabel}>{currentTier.minXP.toLocaleString()} — {currentTier.maxXP.toLocaleString()} XP</Text>
              </View>
            )}
          </View>

          {/* Current perks */}
          <Text style={styles.sectionTitle}>Your {currentTier.name} Perks</Text>
          {currentTier.perks.map((perk, i) => (
            <View key={i} style={styles.perkRow}>
              <Text style={[styles.perkDot, { color: currentTier.color }]}>✓</Text>
              <Text style={styles.perkText}>{perk}</Text>
            </View>
          ))}

          {/* All tiers */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>All Tiers</Text>
          {TIERS.map((tier) => (
            <View key={tier.name} style={[styles.tierRow, tier.name === currentTier.name && { borderColor: tier.color + "55", backgroundColor: tier.color + "11" }]}>
              <Text style={styles.tierRowEmoji}>{tier.emoji}</Text>
              <View style={styles.tierRowInfo}>
                <Text style={styles.tierRowName}>{tier.name}</Text>
                <Text style={styles.tierRowXP}>{tier.minXP.toLocaleString()}+ XP</Text>
              </View>
              <Text style={[styles.tierRowRate, { color: tier.color }]}>{tier.cashbackRate}</Text>
              {tier.name === currentTier.name && <View style={[styles.currentBadge, { backgroundColor: tier.color + "33" }]}><Text style={[styles.currentBadgeText, { color: tier.color }]}>Current</Text></View>}
            </View>
          ))}

          {/* Referral section */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Refer & Earn</Text>
          <View style={styles.referCard}>
            <LinearGradient colors={["rgba(249,68,152,0.2)", "rgba(100,67,244,0.1)"]} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.referEmoji}>🤝</Text>
            <Text style={styles.referTitle}>Invite friends, earn together</Text>
            <Text style={styles.referDesc}>You earn $50 cashback for each friend who books their first trip. They get $25 off their first booking.</Text>
            <View style={styles.referCodeRow}>
              <Text style={styles.referCode}>TRAVI-YK2025</Text>
              <TouchableOpacity style={styles.copyBtn} activeOpacity={0.8}>
                <Text style={styles.copyBtnText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* ── REDEEM TAB ── */}
      {activeTab === 1 && (
        <FlatList
          data={REWARDS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.redeemList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: reward }) => (
            <View style={[styles.rewardCard, !reward.available && { opacity: 0.5 }]}>
              <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDesc}>{reward.desc}</Text>
                <View style={[styles.rewardCategoryBadge]}>
                  <Text style={styles.rewardCategoryText}>{reward.category}</Text>
                </View>
              </View>
              <View style={styles.rewardRight}>
                {reward.points > 0 ? (
                  <Text style={styles.rewardPoints}>{reward.points.toLocaleString()} pts</Text>
                ) : (
                  <Text style={styles.rewardFree}>FREE</Text>
                )}
                <TouchableOpacity
                  style={[styles.redeemBtn, redeeming === reward.id && styles.redeemBtnSuccess, !reward.available && { backgroundColor: "rgba(255,255,255,0.06)" }]}
                  onPress={() => reward.available && handleRedeem(reward.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.redeemBtnText}>
                    {redeeming === reward.id ? "✓ Done!" : reward.available ? "Redeem" : "Locked"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* ── HISTORY TAB ── */}
      {activeTab === 2 && (
        <FlatList
          data={TRANSACTIONS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.historyList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: tx }) => (
            <View style={styles.txRow}>
              <View style={[styles.txDot, { backgroundColor: tx.type === "earned" ? "#22C55E" : tx.type === "bonus" ? "#F59E0B" : "#EF4444" }]} />
              <View style={styles.txInfo}>
                <Text style={styles.txDesc}>{tx.desc}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <Text style={[styles.txAmount, { color: tx.amount > 0 ? "#22C55E" : "#EF4444" }]}>
                {tx.amount > 0 ? "+" : ""}{tx.amount > 0 ? `$${tx.amount}` : `${tx.amount} pts`}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  tierBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1 },
  tierBadgeText: { fontSize: 12, fontWeight: "900", fontFamily: "Chillax-Bold" },
  balanceRow: { flexDirection: "row", paddingHorizontal: 20, gap: 12, marginBottom: 12 },
  balanceCard: { flex: 1, borderRadius: 18, overflow: "hidden", padding: 14, alignItems: "center", gap: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  balanceEmoji: { fontSize: 24 },
  balanceValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  balanceLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  balanceBtn: { marginTop: 6, backgroundColor: "rgba(34,197,94,0.25)", paddingHorizontal: 16, paddingVertical: 7, borderRadius: 10 },
  balanceBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  tabs: { flexDirection: "row", marginHorizontal: 20, marginBottom: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 4 },
  tab: { flex: 1, paddingVertical: 9, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "rgba(100,67,244,0.3)" },
  tabText: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#FFFFFF" },
  overviewContent: { paddingHorizontal: 20, paddingBottom: 130 },
  tierCard: { borderRadius: 18, overflow: "hidden", padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", gap: 12 },
  tierHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  tierEmoji: { fontSize: 32 },
  tierInfo: { flex: 1 },
  tierName: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  tierXP: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  tierNext: { color: "rgba(255,255,255,0.5)", fontSize: 11, textAlign: "right" },
  tierProgress: { gap: 6 },
  tierProgressTrack: { height: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" },
  tierProgressFill: { height: 8, borderRadius: 4 },
  tierProgressLabel: { color: "rgba(255,255,255,0.55)", fontSize: 10 },
  sectionTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", marginBottom: 10, fontFamily: "Chillax-Bold" },
  perkRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 8 },
  perkDot: { fontSize: 14, fontWeight: "900", marginTop: 1, fontFamily: "Chillax-Bold" },
  perkText: { color: "rgba(255,255,255,0.7)", fontSize: 14, flex: 1, lineHeight: 20, fontFamily: "Satoshi-Regular" },
  tierRow: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  tierRowEmoji: { fontSize: 22 },
  tierRowInfo: { flex: 1 },
  tierRowName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  tierRowXP: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  tierRowRate: { fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  currentBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  currentBadgeText: { fontSize: 11, fontWeight: "800", fontFamily: "Chillax-Bold" },
  referCard: { borderRadius: 18, overflow: "hidden", padding: 16, gap: 8, borderWidth: 1, borderColor: "rgba(249,68,152,0.2)", alignItems: "center" },
  referEmoji: { fontSize: 32 },
  referTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", textAlign: "center", fontFamily: "Chillax-Bold" },
  referDesc: { color: "rgba(255,255,255,0.5)", fontSize: 13, textAlign: "center", lineHeight: 20, fontFamily: "Satoshi-Regular" },
  referCodeRow: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginTop: 4 },
  referCode: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", flex: 1, letterSpacing: 1, fontFamily: "Chillax-Bold" },
  copyBtn: { backgroundColor: "rgba(100,67,244,0.3)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  copyBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  redeemList: { paddingHorizontal: 20, paddingBottom: 130, gap: 10 },
  rewardCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  rewardEmoji: { fontSize: 28 },
  rewardInfo: { flex: 1, gap: 3 },
  rewardTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  rewardDesc: { color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 17 },
  rewardCategoryBadge: { backgroundColor: "rgba(255,255,255,0.06)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, alignSelf: "flex-start", marginTop: 2 },
  rewardCategoryText: { color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: "700" },
  rewardRight: { alignItems: "flex-end", gap: 6 },
  rewardPoints: { color: "#C084FC", fontSize: 13, fontWeight: "900", fontFamily: "Chillax-Bold" },
  rewardFree: { color: "#22C55E", fontSize: 13, fontWeight: "900", fontFamily: "Chillax-Bold" },
  redeemBtn: { backgroundColor: "rgba(100,67,244,0.3)", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  redeemBtnSuccess: { backgroundColor: "rgba(34,197,94,0.3)", borderColor: "rgba(34,197,94,0.4)" },
  redeemBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  historyList: { paddingHorizontal: 20, paddingBottom: 130, gap: 8 },
  txRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  txDot: { width: 10, height: 10, borderRadius: 5 },
  txInfo: { flex: 1 },
  txDesc: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  txDate: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
});
