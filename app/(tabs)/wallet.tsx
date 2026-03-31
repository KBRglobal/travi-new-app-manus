import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { router } from "expo-router";

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
    <View style={styles.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>TRAVI Wallet</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.alertsBtn}
              onPress={() => router.push("/(tabs)/alerts" as never)}
              activeOpacity={0.8}
            >
              <IconSymbol name="bell.fill" size={16} color="#C084FC" />
              <Text style={styles.alertsBtnText}>Alerts</Text>
            </TouchableOpacity>
            <View style={[styles.tierPill, { borderColor: currentTier.color + "66" }]}>
              <Text style={[styles.tierPillText, { color: currentTier.color }]}>{currentTier.icon} {currentTier.name}</Text>
            </View>
          </View>
        </View>

        {/* Points Hero Card */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={["rgba(123,47,190,0.7)", "rgba(194,24,91,0.6)", "rgba(233,30,140,0.5)"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroCircle1} />
            <View style={styles.heroCircle2} />

            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroLabel}>TRAVI Points Balance</Text>
                <View style={styles.heroPointsRow}>
                  <Text style={styles.heroStar}>✦</Text>
                  <Text style={styles.heroPoints}>{points.toLocaleString()}</Text>
                </View>
                <Text style={styles.heroWorth}>≈ ${(points / 100).toFixed(0)} travel value</Text>
              </View>
              <View style={styles.heroTierBadge}>
                <Text style={styles.heroTierIcon}>{currentTier.icon}</Text>
                <Text style={[styles.heroTierName, { color: currentTier.color }]}>{currentTier.name}</Text>
              </View>
            </View>

            {nextTier && (
              <View style={styles.heroProgress}>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabelLeft}>{points.toLocaleString()} pts</Text>
                  <Text style={styles.progressLabelRight}>{nextTier.name} at {nextTier.min.toLocaleString()}</Text>
                </View>
                <View style={styles.progressTrack}>
                  <LinearGradient
                    colors={[currentTier.color, "#E91E8C"]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${Math.min(tierProgress, 100)}%` }]}
                  />
                </View>
                <Text style={styles.progressHint}>{(nextTier.min - points).toLocaleString()} pts to {nextTier.name}</Text>
              </View>
            )}

            {/* Stats */}
            <View style={styles.heroStats}>
              {[
                { value: `$${lifetimeSavings}`, label: "Lifetime Saved" },
                { value: String(transactions.filter((t) => t.amount > 0).length), label: "Trips Rewarded" },
                { value: "5%", label: "Cashback Rate" },
              ].map((stat, i) => (
                <View key={i} style={styles.heroStatItem}>
                  {i > 0 && <View style={styles.heroStatDivider} />}
                  <Text style={styles.heroStatValue}>{stat.value}</Text>
                  <Text style={styles.heroStatLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabs}>
          {(["overview", "redeem", "history"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              {activeTab === tab && (
                <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)"]} style={StyleSheet.absoluteFillObject} />
              )}
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === "overview" ? "Overview" : tab === "redeem" ? "Redeem" : "History"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Success Toast */}
        {redeemSuccess && (
          <View style={styles.successToast}>
            <LinearGradient colors={["rgba(76,175,80,0.3)", "rgba(76,175,80,0.15)"]} style={styles.successGradient}>
              <Text style={styles.successText}>✓ {redeemSuccess} redeemed!</Text>
            </LinearGradient>
          </View>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <View style={styles.tabContent}>
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
                <View style={styles.earnIconWrap}>
                  <Text style={styles.earnIcon}>{item.icon}</Text>
                </View>
                <Text style={styles.earnAction}>{item.action}</Text>
                <View style={styles.earnBadge}>
                  <Text style={styles.earnPts}>{item.pts}</Text>
                </View>
              </View>
            ))}

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Tier Benefits</Text>
            {TIERS.map((tier, i) => (
              <View key={i} style={[styles.tierCard, tier.name === currentTier.name && { borderColor: tier.color + "66" }]}>
                {tier.name === currentTier.name && (
                  <LinearGradient colors={[tier.color + "22", tier.color + "10"]} style={StyleSheet.absoluteFillObject} />
                )}
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
                  <View style={[styles.currentBadge, { borderColor: tier.color + "66" }]}>
                    <Text style={[styles.currentBadgeText, { color: tier.color }]}>Current</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Redeem Tab */}
        {activeTab === "redeem" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Redeem Your Points</Text>
            <View style={styles.redeemGrid}>
              {REDEEM_OPTIONS.map((option) => {
                const canAfford = points >= option.cost;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[styles.redeemCard, !canAfford && styles.redeemCardDim]}
                    onPress={() => handleRedeem(option)}
                    activeOpacity={0.85}
                  >
                    <LinearGradient colors={[option.color + "33", option.color + "15"]} style={StyleSheet.absoluteFillObject} />
                    <Text style={styles.redeemIcon}>{option.icon}</Text>
                    <Text style={styles.redeemTitle}>{option.title}</Text>
                    <Text style={styles.redeemDesc}>{option.desc}</Text>
                    <View style={[styles.redeemCostBadge, { borderColor: canAfford ? option.color + "88" : "rgba(255,255,255,0.1)" }]}>
                      <Text style={[styles.redeemCostText, { color: canAfford ? option.color : "#5A4D72" }]}>
                        ✦ {option.cost.toLocaleString()} pts
                      </Text>
                    </View>
                    {!canAfford && (
                      <Text style={styles.redeemNeedMore}>Need {(option.cost - points).toLocaleString()} more</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Points History</Text>
            {transactions.map((tx) => (
              <View key={tx.id} style={styles.txRow}>
                <View style={[styles.txIconWrap, { backgroundColor: tx.amount > 0 ? "rgba(76,175,80,0.2)" : "rgba(233,30,140,0.2)" }]}>
                  <Text style={styles.txIconText}>{tx.icon}</Text>
                </View>
                <View style={styles.txInfo}>
                  <Text style={styles.txDesc}>{tx.description}</Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
                <Text style={[styles.txAmount, { color: tx.amount > 0 ? "#4CAF50" : "#E91E8C" }]}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()} pts
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const CARD_W = (width - 44 - 12) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.1)" },
  orb2: { position: "absolute", width: width * 0.8, height: width * 0.8, borderRadius: width * 0.4, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  scroll: { paddingHorizontal: 22, paddingTop: 60, paddingBottom: 100, gap: 20 },
  pageHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "800" },
  tierPill: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "rgba(255,255,255,0.05)" },
  tierPillText: { fontSize: 13, fontWeight: "700" },
  heroCard: { borderRadius: 24, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.5)" },
  heroGradient: { padding: 24, gap: 20 },
  heroCircle1: { position: "absolute", width: 200, height: 200, borderRadius: 100, top: -60, right: -40, backgroundColor: "rgba(255,255,255,0.05)" },
  heroCircle2: { position: "absolute", width: 120, height: 120, borderRadius: 60, bottom: -30, left: 20, backgroundColor: "rgba(255,255,255,0.04)" },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  heroLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13 },
  heroPointsRow: { flexDirection: "row", alignItems: "flex-end", gap: 6 },
  heroStar: { color: "#FFD700", fontSize: 26, marginBottom: 6 },
  heroPoints: { color: "#FFFFFF", fontSize: 48, fontWeight: "900", letterSpacing: -1 },
  heroWorth: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 2 },
  heroTierBadge: { alignItems: "center", gap: 4, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 16, padding: 12 },
  heroTierIcon: { fontSize: 24 },
  heroTierName: { fontSize: 12, fontWeight: "700" },
  heroProgress: { gap: 8 },
  progressLabels: { flexDirection: "row", justifyContent: "space-between" },
  progressLabelLeft: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  progressLabelRight: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.15)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4 },
  progressHint: { color: "rgba(255,255,255,0.5)", fontSize: 11, textAlign: "center" },
  heroStats: { flexDirection: "row", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 16, padding: 16 },
  heroStatItem: { flex: 1, alignItems: "center", gap: 4, flexDirection: "column" },
  heroStatDivider: { position: "absolute", width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.1)" },
  heroStatValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  heroStatLabel: { color: "rgba(255,255,255,0.6)", fontSize: 10, textAlign: "center" },
  tabs: { flexDirection: "row", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" },
  tab: { flex: 1, paddingVertical: 14, alignItems: "center", overflow: "hidden" },
  tabActive: {},
  tabText: { color: "#5A4D72", fontSize: 14, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  successToast: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "rgba(76,175,80,0.4)" },
  successGradient: { paddingVertical: 12, alignItems: "center" },
  successText: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
  tabContent: { gap: 10 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", marginBottom: 4 },
  earnRow: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" },
  earnIconWrap: { width: 38, height: 38, borderRadius: 12, backgroundColor: "rgba(123,47,190,0.2)", alignItems: "center", justifyContent: "center" },
  earnIcon: { fontSize: 20 },
  earnAction: { color: "#C4B5D9", fontSize: 14, flex: 1 },
  earnBadge: { backgroundColor: "rgba(255,215,0,0.15)", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(255,215,0,0.3)" },
  earnPts: { color: "#FFD700", fontSize: 12, fontWeight: "700" },
  tierCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 14, padding: 14, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)", overflow: "hidden" },
  tierCardLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  tierCardIcon: { fontSize: 24 },
  tierCardName: { fontSize: 15, fontWeight: "700" },
  tierCardRange: { color: "#5A4D72", fontSize: 12, marginTop: 2 },
  currentBadge: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  currentBadgeText: { fontSize: 11, fontWeight: "700" },
  redeemGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  redeemCard: { width: CARD_W, borderRadius: 20, padding: 16, gap: 6, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)", overflow: "hidden" },
  redeemCardDim: { opacity: 0.5 },
  redeemIcon: { fontSize: 30 },
  redeemTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  redeemDesc: { color: "#8B7AAA", fontSize: 11, lineHeight: 16 },
  redeemCostBadge: { alignSelf: "flex-start", borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  redeemCostText: { fontSize: 11, fontWeight: "700" },
  redeemNeedMore: { color: "#E91E8C", fontSize: 10 },
  txRow: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" },
  txIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  txIconText: { fontSize: 20 },
  txInfo: { flex: 1, gap: 3 },
  txDesc: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  txDate: { color: "#5A4D72", fontSize: 12 },
  txAmount: { fontSize: 15, fontWeight: "700" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  alertsBtn: { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 12, borderWidth: 1, borderColor: "rgba(192,132,252,0.4)", paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "rgba(192,132,252,0.1)" },
  alertsBtnText: { color: "#C084FC", fontSize: 13, fontWeight: "600" },
});
