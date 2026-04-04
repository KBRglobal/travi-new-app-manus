import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Platform,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

const { width } = Dimensions.get("window");

// ── Data ──────────────────────────────────────────────────────────────────

const MONTHLY_REVENUE = [
  { month: "Oct", value: 142000, growth: null },
  { month: "Nov", value: 168000, growth: 18.3 },
  { month: "Dec", value: 221000, growth: 31.5 },
  { month: "Jan", value: 195000, growth: -11.8 },
  { month: "Feb", value: 248000, growth: 27.2 },
  { month: "Mar", value: 312000, growth: 25.8 },
];

const REVENUE_STREAMS = [
  { label: "Hotel Commissions", value: 148000, pct: 47, color: "#6443F4", icon: "bed.double.fill" as const, trend: "+12%" },
  { label: "Flight Commissions", value: 89000, pct: 28, color: "#F94498", icon: "airplane.departure" as const, trend: "+8%" },
  { label: "Tour Packages", value: 47000, pct: 15, color: "#22C55E", icon: "map.circle.fill" as const, trend: "+31%" },
  { label: "Car Rentals", value: 28000, pct: 9, color: "#F59E0B", icon: "car.fill" as const, trend: "+5%" },
  { label: "Travel Insurance", value: 6000, pct: 1, color: "#06B6D4", icon: "cross.circle.fill" as const, trend: "+22%" },
];

const KPI_CARDS = [
  { label: "Total Revenue", value: "$312K", sub: "March 2026", icon: "chart.line.uptrend.xyaxis" as const, color: "#6443F4", change: "+25.8%" },
  { label: "Active Users", value: "14,832", sub: "+1,240 this month", icon: "person.3.fill" as const, color: "#F94498", change: "+9.1%" },
  { label: "Avg Booking Value", value: "$847", sub: "Per transaction", icon: "cart.fill" as const, color: "#22C55E", change: "+4.3%" },
  { label: "Commission Rate", value: "18.2%", sub: "Platform average", icon: "percent" as const, color: "#F59E0B", change: "+0.4%" },
  { label: "TRAVI Points Issued", value: "2.1M", sub: "This month", icon: "star.fill" as const, color: "#06B6D4", change: "+18%" },
  { label: "Refund Rate", value: "2.1%", sub: "Below industry avg", icon: "arrow.uturn.backward" as const, color: "#EF4444", change: "-0.3%" },
];

const TOP_DESTINATIONS = [
  { city: "Dubai", bookings: 1842, revenue: 87400, flag: "🇦🇪", growth: "+34%" },
  { city: "Paris", bookings: 1621, revenue: 72100, flag: "🇫🇷", growth: "+18%" },
  { city: "Tokyo", bookings: 1389, revenue: 68500, flag: "🇯🇵", growth: "+41%" },
  { city: "New York", bookings: 1204, revenue: 61200, flag: "🇺🇸", growth: "+12%" },
  { city: "Bali", bookings: 987, revenue: 42800, flag: "🇮🇩", growth: "+28%" },
];

const PERIODS = ["7D", "1M", "3M", "6M", "1Y"];

// ── Component ─────────────────────────────────────────────────────────────

export default function RevenueDashboardScreen() {
  const colors = useColors();
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [selectedTab, setSelectedTab] = useState<"overview" | "streams" | "destinations">("overview");

  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.value));
  const totalRevenue = REVENUE_STREAMS.reduce((s, r) => s + r.value, 0);

  const haptic = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>

        {/* ── Header ── */}
        <LinearGradient
          colors={["#0f0c29", "#302b63", "#24243e"]}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => { haptic(); router.back(); }}
          >
            <IconSymbol name="chevron.left" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerLabel}>ENTERPRISE</Text>
            <Text style={styles.headerTitle}>Revenue Dashboard</Text>
            <Text style={styles.headerSub}>Real-time financial performance</Text>
          </View>
          <View style={styles.headerBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </LinearGradient>

        {/* ── Period Selector ── */}
        <View style={styles.periodRow}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.periodBtn, selectedPeriod === p && styles.periodBtnActive]}
              onPress={() => { haptic(); setSelectedPeriod(p); }}
            >
              <Text style={[styles.periodText, selectedPeriod === p && styles.periodTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Tab Selector ── */}
        <View style={styles.tabRow}>
          {(["overview", "streams", "destinations"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, selectedTab === tab && styles.tabBtnActive]}
              onPress={() => { haptic(); setSelectedTab(tab); }}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {tab === "overview" ? "Overview" : tab === "streams" ? "Revenue Streams" : "Top Destinations"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── OVERVIEW TAB ── */}
        {selectedTab === "overview" && (
          <View style={styles.section}>

            {/* KPI Grid */}
            <View style={styles.kpiGrid}>
              {KPI_CARDS.map((kpi) => (
                <View key={kpi.label} style={styles.kpiCard}>
                  <View style={[styles.kpiIconBox, { backgroundColor: kpi.color + "22" }]}>
                    <IconSymbol name={kpi.icon} size={20} color={kpi.color} />
                  </View>
                  <Text style={styles.kpiValue}>{kpi.value}</Text>
                  <Text style={styles.kpiLabel}>{kpi.label}</Text>
                  <Text style={[styles.kpiChange, { color: kpi.change.startsWith("-") ? "#EF4444" : "#22C55E" }]}>
                    {kpi.change}
                  </Text>
                </View>
              ))}
            </View>

            {/* Monthly Revenue Chart */}
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Monthly Revenue</Text>
              <Text style={styles.chartSub}>Last 6 months · USD</Text>
              <View style={styles.barChart}>
                {MONTHLY_REVENUE.map((m) => {
                  const barHeight = Math.max(8, (m.value / maxRevenue) * 120);
                  const isLast = m.month === "Mar";
                  return (
                    <View key={m.month} style={styles.barWrapper}>
                      <Text style={[styles.barValue, isLast && { color: "#6443F4" }]}>
                        ${(m.value / 1000).toFixed(0)}K
                      </Text>
                      <View style={styles.barTrack}>
                        <LinearGradient
                          colors={isLast ? ["#6443F4", "#F94498"] : ["#6443F455", "#F9449855"]}
                          style={[styles.bar, { height: barHeight }]}
                        />
                      </View>
                      <Text style={[styles.barMonth, isLast && { color: "#6443F4", fontWeight: "700" }]}>
                        {m.month}
                      </Text>
                      {m.growth !== null && (
                        <Text style={[styles.barGrowth, { color: m.growth >= 0 ? "#22C55E" : "#EF4444" }]}>
                          {m.growth >= 0 ? "+" : ""}{m.growth}%
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Summary Row */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryValue}>$1.29M</Text>
                <Text style={styles.summaryLabel}>6-Month Total</Text>
              </View>
              <View style={[styles.summaryCard, { borderColor: "#22C55E33" }]}>
                <Text style={[styles.summaryValue, { color: "#22C55E" }]}>+18.4%</Text>
                <Text style={styles.summaryLabel}>Avg Monthly Growth</Text>
              </View>
              <View style={[styles.summaryCard, { borderColor: "#F9449833" }]}>
                <Text style={[styles.summaryValue, { color: "#F94498" }]}>$215K</Text>
                <Text style={styles.summaryLabel}>Avg Monthly Revenue</Text>
              </View>
            </View>
          </View>
        )}

        {/* ── REVENUE STREAMS TAB ── */}
        {selectedTab === "streams" && (
          <View style={styles.section}>

            {/* Donut-style breakdown */}
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Revenue Breakdown</Text>
              <Text style={styles.chartSub}>March 2026 · ${(totalRevenue / 1000).toFixed(0)}K total</Text>

              {/* Visual bar breakdown */}
              <View style={styles.breakdownBar}>
                {REVENUE_STREAMS.map((s) => (
                  <View key={s.label} style={[styles.breakdownSegment, { flex: s.pct, backgroundColor: s.color }]} />
                ))}
              </View>

              {/* Legend */}
              {REVENUE_STREAMS.map((s) => (
                <View key={s.label} style={styles.legendRow}>
                  <View style={styles.legendLeft}>
                    <View style={[styles.legendDot, { backgroundColor: s.color }]} />
                    <IconSymbol name={s.icon} size={16} color={s.color} />
                    <Text style={styles.legendLabel}>{s.label}</Text>
                  </View>
                  <View style={styles.legendRight}>
                    <Text style={[styles.legendTrend, { color: "#22C55E" }]}>{s.trend}</Text>
                    <Text style={styles.legendPct}>{s.pct}%</Text>
                    <Text style={styles.legendValue}>${(s.value / 1000).toFixed(0)}K</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Insights */}
            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <IconSymbol name="lightbulb.fill" size={18} color="#F59E0B" />
                <Text style={styles.insightTitle}>AI Revenue Insights</Text>
              </View>
              <Text style={styles.insightText}>
                Tour packages show the highest growth (+31%) this month. Consider increasing marketing spend on curated experiences to capitalize on this trend.
              </Text>
              <Text style={[styles.insightText, { marginTop: 8 }]}>
                Hotel commissions remain the largest revenue driver at 47%. Negotiate higher commission tiers with top-performing hotel partners in Q2.
              </Text>
            </View>
          </View>
        )}

        {/* ── TOP DESTINATIONS TAB ── */}
        {selectedTab === "destinations" && (
          <View style={styles.section}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Top Destinations by Revenue</Text>
              <Text style={styles.chartSub}>March 2026</Text>

              {TOP_DESTINATIONS.map((dest, i) => (
                <View key={dest.city} style={styles.destRow}>
                  <View style={styles.destRank}>
                    <Text style={styles.destRankText}>#{i + 1}</Text>
                  </View>
                  <Text style={styles.destFlag}>{dest.flag}</Text>
                  <View style={styles.destInfo}>
                    <Text style={styles.destCity}>{dest.city}</Text>
                    <Text style={styles.destBookings}>{dest.bookings.toLocaleString()} bookings</Text>
                  </View>
                  <View style={styles.destRevenue}>
                    <Text style={styles.destRevenueValue}>${(dest.revenue / 1000).toFixed(1)}K</Text>
                    <Text style={[styles.destGrowth, { color: "#22C55E" }]}>{dest.growth}</Text>
                  </View>
                  {/* Revenue bar */}
                  <View style={styles.destBarTrack}>
                    <View
                      style={[
                        styles.destBar,
                        { width: `${(dest.revenue / TOP_DESTINATIONS[0].revenue) * 100}%`, backgroundColor: ["#6443F4", "#F94498", "#22C55E", "#F59E0B", "#06B6D4"][i] },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>

            {/* Geographic Distribution */}
            <View style={styles.geoCard}>
              <Text style={styles.chartTitle}>Geographic Distribution</Text>
              <View style={styles.geoRow}>
                {[
                  { region: "Middle East", pct: 34, color: "#6443F4" },
                  { region: "Europe", pct: 28, color: "#F94498" },
                  { region: "Asia Pacific", pct: 22, color: "#22C55E" },
                  { region: "Americas", pct: 16, color: "#F59E0B" },
                ].map((g) => (
                  <View key={g.region} style={styles.geoItem}>
                    <View style={[styles.geoCircle, { borderColor: g.color }]}>
                      <Text style={[styles.geoPct, { color: g.color }]}>{g.pct}%</Text>
                    </View>
                    <Text style={styles.geoLabel}>{g.region}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16, paddingBottom: 130, paddingHorizontal: 20,
    flexDirection: "row", alignItems: "flex-start", gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center", justifyContent: "center", marginTop: 4,
  },
  headerContent: { flex: 1 },
  headerLabel: { fontSize: 10, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#6443F4", letterSpacing: 2, marginBottom: 2 },
  headerTitle: { fontSize: 22, fontFamily: "Chillax-Bold", fontWeight: "800", color: "#fff" },
  headerSub: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.6)", marginTop: 2 },
  headerBadge: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "rgba(34,197,94,0.2)", borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 4, marginTop: 4,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#22C55E" },
  liveText: { fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#22C55E" },

  periodRow: {
    flexDirection: "row", paddingHorizontal: 16, paddingVertical: 12, gap: 8,
  },
  periodBtn: {
    flex: 1, paddingVertical: 7, borderRadius: 20,
    backgroundColor: "rgba(100,67,244,0.08)",
    alignItems: "center",
  },
  periodBtnActive: { backgroundColor: "#6443F4" },
  periodText: { fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "600", color: "#9BA1A6" },
  periodTextActive: { color: "#fff" },

  tabRow: {
    flexDirection: "row", marginHorizontal: 16, marginBottom: 4,
    backgroundColor: "rgba(100,67,244,0.06)", borderRadius: 12, padding: 4,
  },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center" },
  tabBtnActive: { backgroundColor: "#6443F4" },
  tabText: { fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "600", color: "#9BA1A6" },
  tabTextActive: { color: "#fff" },

  section: { paddingHorizontal: 16, paddingTop: 12, gap: 12 },

  kpiGrid: {
    flexDirection: "row", flexWrap: "wrap", gap: 10,
  },
  kpiCard: {
    width: (width - 42) / 2,
    backgroundColor: "rgba(36,16,62,0.55)", borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  kpiIconBox: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: "center", justifyContent: "center", marginBottom: 10,
  },
  kpiValue: { fontSize: 20, fontFamily: "Chillax-Bold", fontWeight: "800", color: "#ECEDEE" },
  kpiLabel: { fontSize: 11, fontFamily: "Satoshi-Regular", color: "#9BA1A6", marginTop: 2 },
  kpiChange: { fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "700", marginTop: 4 },

  chartCard: {
    backgroundColor: "rgba(36,16,62,0.55)", borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  chartTitle: { fontSize: 16, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#ECEDEE" },
  chartSub: { fontSize: 12, fontFamily: "Satoshi-Regular", color: "#9BA1A6", marginTop: 2, marginBottom: 16 },

  barChart: {
    flexDirection: "row", alignItems: "flex-end", gap: 8, height: 160,
  },
  barWrapper: { flex: 1, alignItems: "center", gap: 4 },
  barValue: { fontSize: 9, fontFamily: "Chillax-Semibold", color: "#9BA1A6", fontWeight: "600" },
  barTrack: { flex: 1, width: "100%", justifyContent: "flex-end" },
  bar: { width: "100%", borderRadius: 4 },
  barMonth: { fontSize: 10, fontFamily: "Chillax-Semibold", color: "#9BA1A6", fontWeight: "600" },
  barGrowth: { fontSize: 8, fontFamily: "Chillax-Semibold", fontWeight: "700" },

  summaryRow: { flexDirection: "row", gap: 8 },
  summaryCard: {
    flex: 1, backgroundColor: "rgba(36,16,62,0.55)", borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", alignItems: "center",
  },
  summaryValue: { fontSize: 16, fontFamily: "Chillax-Bold", fontWeight: "800", color: "#6443F4" },
  summaryLabel: { fontSize: 10, fontFamily: "Satoshi-Regular", color: "#9BA1A6", marginTop: 2, textAlign: "center" },

  breakdownBar: {
    flexDirection: "row", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 16,
  },
  breakdownSegment: { height: "100%" },

  legendRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.12)",
  },
  legendLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "#ECEDEE", flex: 1 },
  legendRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  legendTrend: { fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  legendPct: { fontSize: 12, fontFamily: "Satoshi-Regular", color: "#9BA1A6", width: 30, textAlign: "right" },
  legendValue: { fontSize: 13, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#ECEDEE", width: 44, textAlign: "right" },

  insightCard: {
    backgroundColor: "rgba(245,158,11,0.08)", borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: "rgba(245,158,11,0.2)",
  },
  insightHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  insightTitle: { fontSize: 14, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#F59E0B" },
  insightText: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "#9BA1A6", lineHeight: 20 },

  destRow: {
    flexDirection: "row", alignItems: "center", paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.12)", gap: 8,
  },
  destRank: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: "rgba(100,67,244,0.15)", alignItems: "center", justifyContent: "center",
  },
  destRankText: { fontSize: 10, fontFamily: "Chillax-Bold", fontWeight: "800", color: "#6443F4" },
  destFlag: { fontSize: 22, fontFamily: "Satoshi-Regular" },
  destInfo: { flex: 1 },
  destCity: { fontSize: 14, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#ECEDEE" },
  destBookings: { fontSize: 11, fontFamily: "Satoshi-Regular", color: "#9BA1A6", marginTop: 1 },
  destRevenue: { alignItems: "flex-end", marginRight: 8 },
  destRevenueValue: { fontSize: 14, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#ECEDEE" },
  destGrowth: { fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  destBarTrack: {
    position: "absolute", bottom: 0, left: 56, right: 0, height: 2,
    backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 1,
  },
  destBar: { height: 2, borderRadius: 1 },

  geoCard: {
    backgroundColor: "rgba(36,16,62,0.55)", borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  geoRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 16 },
  geoItem: { alignItems: "center", gap: 8 },
  geoCircle: {
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 3, alignItems: "center", justifyContent: "center",
  },
  geoPct: { fontSize: 16, fontFamily: "Chillax-Bold", fontWeight: "800" },
  geoLabel: { fontSize: 10, fontFamily: "Satoshi-Regular", color: "#9BA1A6", textAlign: "center", maxWidth: 70 },
});
