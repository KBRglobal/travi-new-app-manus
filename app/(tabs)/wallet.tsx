import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const MOCK_TRANSACTIONS = [
  { id: "t1", date: "Mar 28, 2026", description: "Paris Trip Booking", amount: 2340, type: "earned", icon: "✈️" },
  { id: "t2", date: "Mar 20, 2026", description: "Hotel Le Bristol", amount: 975, type: "earned", icon: "🏨" },
  { id: "t3", date: "Mar 15, 2026", description: "Redeemed for Upgrade", amount: -1500, type: "spent", icon: "🎁" },
  { id: "t4", date: "Mar 10, 2026", description: "Tokyo Trip Booking", amount: 1820, type: "earned", icon: "⛩️" },
  { id: "t5", date: "Feb 28, 2026", description: "Referral Bonus", amount: 500, type: "earned", icon: "👥" },
  { id: "t6", date: "Feb 14, 2026", description: "Valentine's Package", amount: 650, type: "earned", icon: "💑" },
  { id: "t7", date: "Jan 31, 2026", description: "Points Expired", amount: -200, type: "expired", icon: "⏰" },
];

const REDEEM_OPTIONS = [
  { id: "r1", title: "Flight Discount", desc: "10% off next flight", cost: 1000, icon: "✈️", color: "#7B2FBE" },
  { id: "r2", title: "Hotel Upgrade", desc: "Free room upgrade", cost: 1500, icon: "🏨", color: "#E91E8C" },
  { id: "r3", title: "Airport Transfer", desc: "Free taxi to airport", cost: 800, icon: "🚗", color: "#FF9800" },
  { id: "r4", title: "Travel Insurance", desc: "7-day coverage", cost: 2000, icon: "🛡️", color: "#4CAF50" },
  { id: "r5", title: "Lounge Access", desc: "Airport VIP lounge", cost: 1200, icon: "🥂", color: "#2196F3" },
  { id: "r6", title: "City Tour", desc: "Half-day guided tour", cost: 900, icon: "🗺️", color: "#9C27B0" },
];

const TIERS = [
  { name: "Explorer", min: 0, max: 5000, color: "#A78BCA", icon: "🌱" },
  { name: "Adventurer", min: 5000, max: 15000, color: "#4CAF50", icon: "🌿" },
  { name: "Globetrotter", min: 15000, max: 30000, color: "#2196F3", icon: "🌍" },
  { name: "Elite Nomad", min: 30000, max: Infinity, color: "#FFD700", icon: "👑" },
];

export default function WalletScreen() {
  const { state, dispatch } = useStore();
  const points = state.profile?.points || 4250;
  const lifetimeSavings = state.profile?.lifetimeSavings || 127;
  const [activeTab, setActiveTab] = useState<"overview" | "redeem" | "history">("overview");
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  const currentTier = TIERS.find((t) => points >= t.min && points < t.max) || TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  const tierProgress = nextTier ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  const handleRedeem = (option: typeof REDEEM_OPTIONS[0]) => {
    if (points >= option.cost) {
      dispatch({ type: "SPEND_POINTS", payload: { amount: option.cost, description: option.title } });
      setRedeemSuccess(option.title);
      setTimeout(() => setRedeemSuccess(null), 3000);
    }
  };

  const transactions = state.pointTransactions.length > 0
    ? state.pointTransactions.map((tx) => ({
        id: tx.id,
        date: new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        description: tx.description,
        amount: tx.amount,
        type: tx.type,
        icon: tx.amount > 0 ? "✦" : "🎁",
      }))
    : MOCK_TRANSACTIONS;

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Card */}
        <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.hero}>
          <View style={styles.heroTop}>
            <Text style={styles.heroLabel}>TRAVI Points Balance</Text>
            <TouchableOpacity style={styles.infoBtn}>
              <IconSymbol name="info.circle.fill" size={18} color="#A78BCA" />
            </TouchableOpacity>
          </View>

          <View style={styles.pointsDisplay}>
            <Text style={styles.pointsStar}>✦</Text>
            <Text style={styles.pointsAmount}>{points.toLocaleString()}</Text>
          </View>

          <Text style={styles.pointsValue}>≈ ${(points / 100).toFixed(0)} travel value</Text>

          {/* Tier Badge */}
          <View style={[styles.tierBadge, { borderColor: currentTier.color }]}>
            <Text style={styles.tierIcon}>{currentTier.icon}</Text>
            <Text style={[styles.tierName, { color: currentTier.color }]}>{currentTier.name}</Text>
          </View>

          {/* Tier Progress */}
          {nextTier && (
            <View style={styles.tierProgress}>
              <View style={styles.tierProgressTrack}>
                <LinearGradient
                  colors={[currentTier.color, nextTier.color]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.tierProgressFill, { width: `${tierProgress}%` }]}
                />
              </View>
              <Text style={styles.tierProgressText}>
                {(nextTier.min - points).toLocaleString()} pts to {nextTier.name}
              </Text>
            </View>
          )}

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${lifetimeSavings}</Text>
              <Text style={styles.statLabel}>Lifetime Savings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{transactions.filter((t) => t.amount > 0).length}</Text>
              <Text style={styles.statLabel}>Trips Rewarded</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5%</Text>
              <Text style={styles.statLabel}>Cashback Rate</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Tab Switcher */}
        <View style={styles.tabs}>
          {(["overview", "redeem", "history"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === "overview" ? "Overview" : tab === "redeem" ? "Redeem" : "History"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Redeem Success Toast */}
        {redeemSuccess && (
          <View style={styles.successToast}>
            <Text style={styles.successToastText}>✓ {redeemSuccess} redeemed successfully!</Text>
          </View>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <View style={styles.section}>
            {/* How to Earn */}
            <Text style={styles.sectionTitle}>How to Earn Points</Text>
            {[
              { icon: "✈️", action: "Book a flight", pts: "5% of value" },
              { icon: "🏨", action: "Book a hotel", pts: "5% of value" },
              { icon: "🎭", action: "Book activities", pts: "3% of value" },
              { icon: "👥", action: "Refer a friend", pts: "500 pts" },
              { icon: "⭐", action: "Leave a review", pts: "50 pts" },
              { icon: "🎂", action: "Birthday bonus", pts: "200 pts" },
            ].map((item, i) => (
              <View key={i} style={styles.earnRow}>
                <Text style={styles.earnIcon}>{item.icon}</Text>
                <Text style={styles.earnAction}>{item.action}</Text>
                <View style={styles.earnBadge}>
                  <Text style={styles.earnPts}>{item.pts}</Text>
                </View>
              </View>
            ))}

            {/* Tier Benefits */}
            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Tier Benefits</Text>
            {TIERS.map((tier, i) => (
              <View key={i} style={[styles.tierCard, tier.name === currentTier.name && styles.tierCardActive]}>
                <View style={styles.tierCardLeft}>
                  <Text style={styles.tierCardIcon}>{tier.icon}</Text>
                  <View>
                    <Text style={[styles.tierCardName, { color: tier.color }]}>{tier.name}</Text>
                    <Text style={styles.tierCardRange}>
                      {tier.max === Infinity ? `${tier.min.toLocaleString()}+` : `${tier.min.toLocaleString()} – ${tier.max.toLocaleString()}`} pts
                    </Text>
                  </View>
                </View>
                {tier.name === currentTier.name && (
                  <View style={[styles.currentBadge, { borderColor: tier.color }]}>
                    <Text style={[styles.currentBadgeText, { color: tier.color }]}>Current</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Redeem Tab */}
        {activeTab === "redeem" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Redeem Your Points</Text>
            <View style={styles.redeemGrid}>
              {REDEEM_OPTIONS.map((option) => {
                const canAfford = points >= option.cost;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[styles.redeemCard, !canAfford && styles.redeemCardDisabled]}
                    onPress={() => handleRedeem(option)}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={canAfford ? [`${option.color}30`, `${option.color}10`] : ["#2D1B69", "#2D1B69"]}
                      style={styles.redeemCardGradient}
                    >
                      <Text style={styles.redeemIcon}>{option.icon}</Text>
                      <Text style={[styles.redeemTitle, !canAfford && styles.redeemTitleDisabled]}>
                        {option.title}
                      </Text>
                      <Text style={styles.redeemDesc}>{option.desc}</Text>
                      <View style={[styles.redeemCost, { borderColor: canAfford ? option.color : "#4A3080" }]}>
                        <Text style={[styles.redeemCostText, { color: canAfford ? option.color : "#6B5A8A" }]}>
                          ✦ {option.cost.toLocaleString()} pts
                        </Text>
                      </View>
                      {!canAfford && (
                        <Text style={styles.redeemNeedMore}>
                          Need {(option.cost - points).toLocaleString()} more
                        </Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Points History</Text>
            {transactions.map((tx) => (
              <View key={tx.id} style={styles.txRow}>
                <View style={[styles.txIcon, tx.amount > 0 ? styles.txIconEarned : styles.txIconSpent]}>
                  <Text style={styles.txIconText}>{tx.icon}</Text>
                </View>
                <View style={styles.txInfo}>
                  <Text style={styles.txDesc}>{tx.description}</Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
                <Text style={[styles.txAmount, tx.amount > 0 ? styles.txAmountEarned : styles.txAmountSpent]}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()} pts
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: { padding: 24, paddingTop: 20 },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  heroLabel: { color: "#A78BCA", fontSize: 14, fontWeight: "500" },
  infoBtn: { padding: 4 },
  pointsDisplay: { flexDirection: "row", alignItems: "flex-end", gap: 6, marginBottom: 4 },
  pointsStar: { color: "#FFD700", fontSize: 28, marginBottom: 8 },
  pointsAmount: { color: "#FFD700", fontSize: 52, fontWeight: "800", lineHeight: 58 },
  pointsValue: { color: "#A78BCA", fontSize: 14, marginBottom: 16 },
  tierBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 6,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  tierIcon: { fontSize: 16 },
  tierName: { fontSize: 13, fontWeight: "700", letterSpacing: 0.5 },
  tierProgress: { gap: 6, marginBottom: 20 },
  tierProgressTrack: { height: 6, backgroundColor: "#4A3080", borderRadius: 3, overflow: "hidden" },
  tierProgressFill: { height: "100%", borderRadius: 3 },
  tierProgressText: { color: "#A78BCA", fontSize: 12 },
  statsRow: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 16 },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  statLabel: { color: "#A78BCA", fontSize: 11, textAlign: "center" },
  statDivider: { width: 1, backgroundColor: "#4A3080" },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#2D1B69",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "#7B2FBE" },
  tabText: { color: "#A78BCA", fontSize: 14, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  successToast: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: "rgba(76,175,80,0.2)",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#4CAF50",
    alignItems: "center",
  },
  successToastText: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
  section: { paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", marginBottom: 14 },
  earnRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 12,
  },
  earnIcon: { fontSize: 22, width: 28, textAlign: "center" },
  earnAction: { color: "#FFFFFF", fontSize: 14, flex: 1 },
  earnBadge: { backgroundColor: "#3D2580", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  earnPts: { color: "#FFD700", fontSize: 12, fontWeight: "700" },
  tierCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2D1B69",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  tierCardActive: { borderColor: "#7B2FBE", backgroundColor: "#3D2580" },
  tierCardLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  tierCardIcon: { fontSize: 24 },
  tierCardName: { fontSize: 15, fontWeight: "700" },
  tierCardRange: { color: "#A78BCA", fontSize: 12, marginTop: 2 },
  currentBadge: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  currentBadgeText: { fontSize: 11, fontWeight: "700" },
  redeemGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  redeemCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  redeemCardDisabled: { opacity: 0.6 },
  redeemCardGradient: { padding: 16, gap: 6, minHeight: 150 },
  redeemIcon: { fontSize: 32, marginBottom: 4 },
  redeemTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  redeemTitleDisabled: { color: "#A78BCA" },
  redeemDesc: { color: "#A78BCA", fontSize: 12, lineHeight: 16 },
  redeemCost: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  redeemCostText: { fontSize: 12, fontWeight: "700" },
  redeemNeedMore: { color: "#F44336", fontSize: 10, marginTop: 2 },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 12,
  },
  txIcon: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  txIconEarned: { backgroundColor: "rgba(76,175,80,0.2)" },
  txIconSpent: { backgroundColor: "rgba(233,30,140,0.2)" },
  txIconText: { fontSize: 18 },
  txInfo: { flex: 1 },
  txDesc: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  txDate: { color: "#A78BCA", fontSize: 12, marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: "700" },
  txAmountEarned: { color: "#4CAF50" },
  txAmountSpent: { color: "#E91E8C" },
});
