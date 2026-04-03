import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const TABS = ["Overview", "Revenue", "Competitors", "Regulations"];

// ── Revenue data ──
const MONTHLY_REVENUE = [
  { month: "Oct", value: 142000 },
  { month: "Nov", value: 168000 },
  { month: "Dec", value: 221000 },
  { month: "Jan", value: 195000 },
  { month: "Feb", value: 248000 },
  { month: "Mar", value: 312000 },
];

const REVENUE_BREAKDOWN = [
  { label: "Hotel Commissions", value: 148000, pct: 47, color: "#6443F4" },
  { label: "Flight Commissions", value: 89000, pct: 28, color: "#F94498" },
  { label: "Tour Packages", value: 47000, pct: 15, color: "#22C55E" },
  { label: "Car Rentals", value: 28000, pct: 9, color: "#F59E0B" },
];

// ── Competitor data ──
const COMPETITORS = [
  {
    name: "Booking.com", logo: "🌐", marketShare: "31%", rating: 4.2,
    strengths: ["Massive inventory", "Brand recognition", "Price comparison"],
    weaknesses: ["No personalization", "Hidden fees", "No loyalty program"],
    avgCommission: "15-25%", returnsToUser: "0%",
  },
  {
    name: "Expedia", logo: "✈️", marketShare: "18%", rating: 4.0,
    strengths: ["Bundle deals", "Loyalty points", "Wide coverage"],
    weaknesses: ["Complex UI", "Poor customer service", "No DNA profiling"],
    avgCommission: "12-22%", returnsToUser: "0%",
  },
  {
    name: "Airbnb", logo: "🏠", marketShare: "14%", rating: 4.5,
    strengths: ["Unique stays", "Local experiences", "Strong community"],
    weaknesses: ["No flights", "Variable quality", "High service fees"],
    avgCommission: "3-5% host + 14% guest", returnsToUser: "0%",
  },
  {
    name: "TRAVI", logo: "🧬", marketShare: "Growing", rating: 4.9,
    strengths: ["100% commission return", "DNA personalization", "AI trip planner"],
    weaknesses: ["New brand", "Limited markets", "Building inventory"],
    avgCommission: "10-20%", returnsToUser: "100%",
    isUs: true,
  },
];

// ── Regulations data ──
const REGULATIONS = [
  {
    country: "UAE", flag: "🇦🇪", status: "Compliant",
    rules: [
      { title: "Travel Agency License", body: "RERA-licensed. Annual renewal required. Fee: AED 15,000.", status: "ok" },
      { title: "Data Protection (PDPL)", body: "UAE Personal Data Protection Law. Full compliance required by Sep 2024.", status: "ok" },
      { title: "VAT on Services", body: "5% VAT applicable on all service fees. Registered with FTA.", status: "ok" },
    ],
  },
  {
    country: "Israel", flag: "🇮🇱", status: "Compliant",
    rules: [
      { title: "Tourism Services Law", body: "Ministry of Tourism license required. Annual audit.", status: "ok" },
      { title: "Consumer Protection", body: "Full refund policy within 14 days. Compliant.", status: "ok" },
      { title: "Privacy Protection Law", body: "Israeli Privacy Protection Regulations 2017. Compliant.", status: "ok" },
    ],
  },
  {
    country: "EU", flag: "🇪🇺", status: "In Progress",
    rules: [
      { title: "GDPR", body: "General Data Protection Regulation. DPO appointed. Ongoing compliance.", status: "warning" },
      { title: "Package Travel Directive", body: "EU Directive 2015/2302. Implementation in progress.", status: "warning" },
      { title: "PSD2 Payments", body: "Strong Customer Authentication required. Integrated.", status: "ok" },
    ],
  },
];

// ── KPI cards ──
const KPIS = [
  { label: "Monthly Revenue", value: "AED 312K", trend: "+26%", up: true, icon: "💰" },
  { label: "Active Users", value: "18,420", trend: "+34%", up: true, icon: "👥" },
  { label: "Bookings", value: "2,847", trend: "+19%", up: true, icon: "✈️" },
  { label: "Avg. Booking Value", value: "AED 4,200", trend: "+8%", up: true, icon: "📊" },
  { label: "Points Distributed", value: "AED 62K", trend: "+31%", up: true, icon: "⭐" },
  { label: "NPS Score", value: "72", trend: "+5pts", up: true, icon: "❤️" },
];

// Mini bar chart
function MiniBarChart({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <View style={BC.container}>
      {data.map((d, i) => {
        const pct = d.value / max;
        const isLast = i === data.length - 1;
        return (
          <View key={i} style={BC.barWrap}>
            <View style={BC.barTrack}>
              <View style={[BC.barFill, { height: `${pct * 100}%` }]}>
                {isLast && <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />}
                {!isLast && <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "rgba(255,255,255,0.55)" }]} />}
              </View>
            </View>
            <Text style={[BC.label, isLast && { color: "#C084FC" }]}>{d.month}</Text>
          </View>
        );
      })}
    </View>
  );
}

const BC = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "flex-end", gap: 8, height: 100 },
  barWrap: { flex: 1, alignItems: "center", gap: 4 },
  barTrack: { flex: 1, width: "100%", justifyContent: "flex-end" },
  barFill: { width: "100%", borderRadius: 4, overflow: "hidden" },
  label: { color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: "600" },
});

export default function EnterpriseScreen() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTab = (i: number) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(i);
  };

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.8}>
          <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={S.headerTitle}>Enterprise Dashboard</Text>
          <Text style={S.headerSub}>Business intelligence & analytics</Text>
        </View>
        <View style={S.liveIndicator}>
          <View style={S.liveDot} />
          <Text style={S.liveText}>Live</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={S.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.tabsRow}>
          {TABS.map((tab, i) => (
            <TouchableOpacity
              key={tab}
              style={[S.tab, activeTab === i && S.tabActive]}
              onPress={() => handleTab(i)}
              activeOpacity={0.8}
            >
              {activeTab === i && (
                <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              )}
              <Text style={[S.tabText, activeTab === i && S.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.content}>
        {activeTab === 0 && <OverviewTab />}
        {activeTab === 1 && <RevenueTab />}
        {activeTab === 2 && <CompetitorsTab />}
        {activeTab === 3 && <RegulationsTab />}
      </ScrollView>
    </View>
  );
}

function OverviewTab() {
  return (
    <View style={T.wrap}>
      <TouchableOpacity
        style={T.crmBanner}
        onPress={() => router.push("/(tabs)/prospects-crm" as never)}
        activeOpacity={0.85}
      >
        <LinearGradient colors={["rgba(100,67,244,0.25)", "rgba(249,68,152,0.15)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
        <Text style={T.crmBannerEmoji}>👥</Text>
        <View style={T.crmBannerInfo}>
          <Text style={T.crmBannerTitle}>Prospects CRM</Text>
          <Text style={T.crmBannerSub}>6 contacts · $550K pipeline</Text>
        </View>
        <Text style={T.crmBannerArrow}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={T.crmBanner}
        onPress={() => router.push("/(tabs)/revenue-dashboard" as never)}
        activeOpacity={0.85}
      >
        <LinearGradient colors={["rgba(34,197,94,0.25)", "rgba(6,182,212,0.15)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
        <Text style={T.crmBannerEmoji}>📊</Text>
        <View style={T.crmBannerInfo}>
          <Text style={T.crmBannerTitle}>Revenue Dashboard</Text>
          <Text style={T.crmBannerSub}>$312K March · +25.8% growth</Text>
        </View>
        <Text style={T.crmBannerArrow}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={T.crmBanner}
        onPress={() => router.push("/(tabs)/regulations-tracker" as never)}
        activeOpacity={0.85}
      >
        <LinearGradient colors={["rgba(6,182,212,0.25)", "rgba(100,67,244,0.15)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
        <Text style={T.crmBannerEmoji}>⚖️</Text>
        <View style={T.crmBannerInfo}>
          <Text style={T.crmBannerTitle}>Regulations Tracker</Text>
          <Text style={T.crmBannerSub}>10 regulations · 80% compliant</Text>
        </View>
        <Text style={T.crmBannerArrow}>→</Text>
      </TouchableOpacity>
      <Text style={T.sectionTitle}>Key Performance Indicators</Text>
      <View style={T.kpiGrid}>
        {KPIS.map((kpi, i) => (
          <View key={i} style={T.kpiCard}>
            <LinearGradient colors={["rgba(100,67,244,0.18)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
            <Text style={T.kpiIcon}>{kpi.icon}</Text>
            <Text style={T.kpiValue}>{kpi.value}</Text>
            <Text style={T.kpiLabel}>{kpi.label}</Text>
            <Text style={[T.kpiTrend, { color: kpi.up ? "#22C55E" : "#EF4444" }]}>
              {kpi.up ? "↑" : "↓"} {kpi.trend}
            </Text>
          </View>
        ))}
      </View>

      <Text style={T.sectionTitle}>Revenue Trend (6M)</Text>
      <View style={T.chartCard}>
        <LinearGradient colors={["rgba(100,67,244,0.1)", "rgba(249,68,152,0.05)"]} style={StyleSheet.absoluteFillObject} />
        <View style={T.chartHeader}>
          <Text style={T.chartValue}>AED 312K</Text>
          <Text style={T.chartTrend}>↑ +26% MoM</Text>
        </View>
        <MiniBarChart data={MONTHLY_REVENUE} />
      </View>
    </View>
  );
}

function RevenueTab() {
  const total = REVENUE_BREAKDOWN.reduce((s, r) => s + r.value, 0);
  return (
    <View style={T.wrap}>
      <Text style={T.sectionTitle}>Revenue Breakdown</Text>
      <View style={T.revCard}>
        <LinearGradient colors={["rgba(100,67,244,0.12)", "rgba(249,68,152,0.06)"]} style={StyleSheet.absoluteFillObject} />
        <Text style={T.revTotal}>AED {(total / 1000).toFixed(0)}K</Text>
        <Text style={T.revTotalLabel}>Total Revenue — March 2026</Text>
        <View style={T.revBarRow}>
          {REVENUE_BREAKDOWN.map((r, i) => (
            <View key={i} style={[T.revBarSeg, { flex: r.pct, backgroundColor: r.color }]} />
          ))}
        </View>
        {REVENUE_BREAKDOWN.map((r, i) => (
          <View key={i} style={T.revRow}>
            <View style={[T.revDot, { backgroundColor: r.color }]} />
            <Text style={T.revLabel}>{r.label}</Text>
            <Text style={T.revPct}>{r.pct}%</Text>
            <Text style={T.revValue}>AED {(r.value / 1000).toFixed(0)}K</Text>
          </View>
        ))}
      </View>

      <Text style={T.sectionTitle}>Monthly Trend</Text>
      <View style={T.chartCard}>
        <LinearGradient colors={["rgba(100,67,244,0.1)", "rgba(249,68,152,0.05)"]} style={StyleSheet.absoluteFillObject} />
        <MiniBarChart data={MONTHLY_REVENUE} />
        <View style={T.trendStats}>
          <View style={T.trendStat}>
            <Text style={T.trendStatValue}>AED 1.29M</Text>
            <Text style={T.trendStatLabel}>6M Total</Text>
          </View>
          <View style={T.trendStat}>
            <Text style={T.trendStatValue}>+120%</Text>
            <Text style={T.trendStatLabel}>6M Growth</Text>
          </View>
          <View style={T.trendStat}>
            <Text style={T.trendStatValue}>AED 215K</Text>
            <Text style={T.trendStatLabel}>6M Avg</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function CompetitorsTab() {
  return (
    <View style={T.wrap}>
      <Text style={T.sectionTitle}>Competitive Landscape</Text>
      {COMPETITORS.map((comp, i) => (
        <View key={i} style={[T.compCard, comp.isUs && T.compCardUs]}>
          {comp.isUs && <LinearGradient colors={["rgba(100,67,244,0.25)", "rgba(249,68,152,0.15)"]} style={StyleSheet.absoluteFillObject} />}
          {!comp.isUs && <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "rgba(255,255,255,0.55)" }]} />}
          <View style={T.compHeader}>
            <Text style={T.compLogo}>{comp.logo}</Text>
            <View style={{ flex: 1 }}>
              <View style={T.compNameRow}>
                <Text style={T.compName}>{comp.name}</Text>
                {comp.isUs && <View style={T.usBadge}><Text style={T.usBadgeText}>US</Text></View>}
              </View>
              <Text style={T.compShare}>Market Share: {comp.marketShare}</Text>
            </View>
            <View style={T.ratingBadge}>
              <Text style={T.ratingText}>⭐ {comp.rating}</Text>
            </View>
          </View>
          <View style={T.commRow}>
            <View style={T.commItem}>
              <Text style={T.commLabel}>Commission</Text>
              <Text style={T.commValue}>{comp.avgCommission}</Text>
            </View>
            <View style={T.commItem}>
              <Text style={T.commLabel}>Returns to User</Text>
              <Text style={[T.commValue, { color: comp.returnsToUser === "100%" ? "#22C55E" : "#EF4444" }]}>
                {comp.returnsToUser}
              </Text>
            </View>
          </View>
          <View style={T.swRow}>
            <View style={T.swCol}>
              <Text style={T.swTitle}>✅ Strengths</Text>
              {comp.strengths.map((s, j) => (
                <Text key={j} style={T.swItem}>· {s}</Text>
              ))}
            </View>
            <View style={T.swCol}>
              <Text style={T.swTitle}>❌ Weaknesses</Text>
              {comp.weaknesses.map((w, j) => (
                <Text key={j} style={T.swItem}>· {w}</Text>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function RegulationsTab() {
  return (
    <View style={T.wrap}>
      <Text style={T.sectionTitle}>Regulatory Compliance</Text>
      {REGULATIONS.map((reg, i) => {
        const isCompliant = reg.status === "Compliant";
        return (
          <View key={i} style={T.regCountryCard}>
            <View style={T.regCountryHeader}>
              <Text style={T.regFlag}>{reg.flag}</Text>
              <Text style={T.regCountry}>{reg.country}</Text>
              <View style={[T.regStatusBadge, { backgroundColor: isCompliant ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)" }]}>
                <Text style={[T.regStatusText, { color: isCompliant ? "#22C55E" : "#F59E0B" }]}>{reg.status}</Text>
              </View>
            </View>
            {reg.rules.map((rule, j) => (
              <View key={j} style={T.ruleCard}>
                <View style={T.ruleTop}>
                  <Text style={T.ruleStatus}>{rule.status === "ok" ? "✅" : "⚠️"}</Text>
                  <Text style={T.ruleTitle}>{rule.title}</Text>
                </View>
                <Text style={T.ruleBody}>{rule.body}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const T = StyleSheet.create({
  wrap: { gap: 16 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },

  kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  kpiCard: { width: (width - 42) / 2, borderRadius: 16, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", gap: 2 },
  kpiIcon: { fontSize: 22, marginBottom: 4 },
  kpiValue: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  kpiLabel: { color: "rgba(255,255,255,0.45)", fontSize: 11 },
  kpiTrend: { fontSize: 12, fontWeight: "700", marginTop: 2 },

  chartCard: { borderRadius: 18, overflow: "hidden", padding: 16, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", gap: 12 },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chartValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  chartTrend: { color: "#22C55E", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },

  revCard: { borderRadius: 18, overflow: "hidden", padding: 16, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", gap: 10 },
  revTotal: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold" },
  revTotalLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 4 },
  revBarRow: { flexDirection: "row", height: 8, borderRadius: 4, overflow: "hidden", gap: 1 },
  revBarSeg: { height: "100%" },
  revRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  revDot: { width: 8, height: 8, borderRadius: 4 },
  revLabel: { color: "rgba(255,255,255,0.6)", fontSize: 13, flex: 1 },
  revPct: { color: "rgba(255,255,255,0.5)", fontSize: 12, width: 32, textAlign: "right" },
  revValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold", width: 70, textAlign: "right" },

  trendStats: { flexDirection: "row", gap: 10 },
  trendStat: { flex: 1, alignItems: "center", gap: 2 },
  trendStatValue: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  trendStatLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },

  compCard: { borderRadius: 18, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)", gap: 10 },
  compCardUs: { borderColor: "rgba(100,67,244,0.4)" },
  compHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  compLogo: { fontSize: 28 },
  compNameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  compName: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  usBadge: { backgroundColor: "#6443F4", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  usBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  compShare: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  ratingBadge: { backgroundColor: "rgba(255,215,0,0.15)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  ratingText: { color: "#FBBF24", fontSize: 12, fontWeight: "700" },
  commRow: { flexDirection: "row", gap: 10 },
  commItem: { flex: 1, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 10, padding: 10 },
  commLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  commValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold", marginTop: 2 },
  swRow: { flexDirection: "row", gap: 10 },
  swCol: { flex: 1, gap: 4 },
  swTitle: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: "700", marginBottom: 2 },
  swItem: { color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 17 },

  regCountryCard: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)", gap: 10 },
  regCountryHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  regFlag: { fontSize: 24 },
  regCountry: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold", flex: 1 },
  regStatusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  regStatusText: { fontSize: 12, fontWeight: "700" },
  ruleCard: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 10, padding: 10, gap: 4 },
  ruleTop: { flexDirection: "row", alignItems: "center", gap: 6 },
  ruleStatus: { fontSize: 14 },
  ruleTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  ruleBody: { color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 17, paddingLeft: 20 },
  crmBanner: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 16, overflow: "hidden", padding: 14, marginBottom: 16, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  crmBannerEmoji: { fontSize: 28 },
  crmBannerInfo: { flex: 1 },
  crmBannerTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  crmBannerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  crmBannerArrow: { color: "rgba(255,255,255,0.6)", fontSize: 20, fontWeight: "700", fontFamily: "Chillax-Semibold" },
});

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 56, paddingHorizontal: 16, paddingBottom: 130 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 1 },
  liveIndicator: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(34,197,94,0.15)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(34,197,94,0.3)" },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#22C55E" },
  liveText: { color: "#22C55E", fontSize: 12, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  tabsContainer: { borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.55)" },
  tabsRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  tab: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 16, paddingVertical: 7, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  tabActive: { borderColor: "transparent" },
  tabText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  tabTextActive: { color: "#FFFFFF" },
  content: { padding: 16, paddingBottom: 130, gap: 16 },
});
