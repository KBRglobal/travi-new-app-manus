/**
 * TRAVI — Real Estate Market Analysis
 */
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const MARKETS = [
  { id: "dubai", label: "Dubai", emoji: "🏙️", color: "#F59E0B" },
  { id: "abu-dhabi", label: "Abu Dhabi", emoji: "🕌", color: "#6443F4" },
  { id: "rak", label: "RAK", emoji: "🏔️", color: "#22C55E" },
];

type MarketData = {
  avgPrice: string; yoyGrowth: string; rentalYield: string; transactions: string;
  pricePerSqm: string; forecast: string; color: string;
  areas: { name: string; avgPsm: string; growth: string; type: string }[];
  trends: { quarter: string; index: number }[];
};

const MARKET_DATA: Record<string, MarketData> = {
  dubai: {
    avgPrice: "AED 1.85M", yoyGrowth: "+18.4%", rentalYield: "6.8%", transactions: "42,300",
    pricePerSqm: "AED 14,200", forecast: "+12–15% (2025)", color: "#F59E0B",
    areas: [
      { name: "Downtown Dubai", avgPsm: "AED 28,000", growth: "+22%", type: "Luxury" },
      { name: "Dubai Marina", avgPsm: "AED 19,500", growth: "+16%", type: "Premium" },
      { name: "Business Bay", avgPsm: "AED 17,200", growth: "+19%", type: "Mixed" },
      { name: "JVC", avgPsm: "AED 9,800", growth: "+14%", type: "Affordable" },
      { name: "Palm Jumeirah", avgPsm: "AED 42,000", growth: "+28%", type: "Ultra-luxury" },
    ],
    trends: [
      { quarter: "Q1 23", index: 100 }, { quarter: "Q2 23", index: 106 }, { quarter: "Q3 23", index: 112 },
      { quarter: "Q4 23", index: 118 }, { quarter: "Q1 24", index: 124 }, { quarter: "Q2 24", index: 131 },
    ],
  },
  "abu-dhabi": {
    avgPrice: "AED 1.42M", yoyGrowth: "+12.1%", rentalYield: "5.9%", transactions: "18,700",
    pricePerSqm: "AED 11,800", forecast: "+8–11% (2025)", color: "#6443F4",
    areas: [
      { name: "Yas Island", avgPsm: "AED 14,500", growth: "+18%", type: "Leisure" },
      { name: "Saadiyat Island", avgPsm: "AED 22,000", growth: "+15%", type: "Luxury" },
      { name: "Al Reem Island", avgPsm: "AED 12,000", growth: "+11%", type: "Mixed" },
      { name: "Khalifa City", avgPsm: "AED 8,500", growth: "+9%", type: "Family" },
    ],
    trends: [
      { quarter: "Q1 23", index: 100 }, { quarter: "Q2 23", index: 103 }, { quarter: "Q3 23", index: 107 },
      { quarter: "Q4 23", index: 110 }, { quarter: "Q1 24", index: 113 }, { quarter: "Q2 24", index: 116 },
    ],
  },
  rak: {
    avgPrice: "AED 820K", yoyGrowth: "+24.6%", rentalYield: "7.4%", transactions: "8,200",
    pricePerSqm: "AED 7,400", forecast: "+18–22% (2025)", color: "#22C55E",
    areas: [
      { name: "Al Hamra Village", avgPsm: "AED 9,200", growth: "+26%", type: "Resort" },
      { name: "Mina Al Arab", avgPsm: "AED 8,800", growth: "+24%", type: "Waterfront" },
      { name: "Hayat Island", avgPsm: "AED 11,500", growth: "+32%", type: "Luxury" },
    ],
    trends: [
      { quarter: "Q1 23", index: 100 }, { quarter: "Q2 23", index: 108 }, { quarter: "Q3 23", index: 116 },
      { quarter: "Q4 23", index: 122 }, { quarter: "Q1 24", index: 130 }, { quarter: "Q2 24", index: 140 },
    ],
  },
};

const ROI_SCENARIOS = [
  { label: "Conservative", appreciation: 8, rental: 5.5, total: 13.5, color: "#22C55E" },
  { label: "Base Case", appreciation: 14, rental: 6.8, total: 20.8, color: "#F59E0B" },
  { label: "Optimistic", appreciation: 22, rental: 7.5, total: 29.5, color: "#F94498" },
];

export default function RealEstateAnalysisScreen() {
  const insets = useSafeAreaInsets();
  const [activeMarket, setActiveMarket] = useState("dubai");
  const data = MARKET_DATA[activeMarket];
  const marketName = activeMarket === "dubai" ? "Dubai" : activeMarket === "abu-dhabi" ? "Abu Dhabi" : "RAK";

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0A0A1A", "#0D1628", "#0A0A1A"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}><Text style={S.backText}>←</Text></TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>📊 Market Analysis</Text>
          <Text style={S.headerSub}>UAE Real Estate Intelligence</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={S.marketRow}>
          {MARKETS.map((m) => (
            <TouchableOpacity key={m.id} style={[S.marketChip, activeMarket === m.id && { borderColor: m.color, backgroundColor: m.color + "22" }]} onPress={() => setActiveMarket(m.id)} activeOpacity={0.8}>
              <Text style={S.marketEmoji}>{m.emoji}</Text>
              <Text style={[S.marketLabel, activeMarket === m.id && { color: "#FFFFFF" }]}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={S.metricsGrid}>
          {[
            { label: "Avg Price", value: data.avgPrice, sub: "per unit", color: data.color },
            { label: "YoY Growth", value: data.yoyGrowth, sub: "year-on-year", color: "#22C55E" },
            { label: "Rental Yield", value: data.rentalYield, sub: "gross annual", color: "#6443F4" },
            { label: "Transactions", value: data.transactions, sub: "2024 YTD", color: "#F94498" },
            { label: "Price/sqm", value: data.pricePerSqm, sub: "average", color: "#06B6D4" },
            { label: "2025 Forecast", value: data.forecast, sub: "price growth", color: "#F59E0B" },
          ].map((metric, i) => (
            <View key={i} style={[S.metricCard, { width: (width - 50) / 2 }]}>
              <LinearGradient colors={[metric.color + "22", metric.color + "11"]} style={StyleSheet.absoluteFillObject} />
              <Text style={[S.metricValue, { color: metric.color }]}>{metric.value}</Text>
              <Text style={S.metricLabel}>{metric.label}</Text>
              <Text style={S.metricSub}>{metric.sub}</Text>
            </View>
          ))}
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Price Index Trend</Text>
          <View style={S.chartCard}>
            <LinearGradient colors={["rgba(255,255,255,0.03)", "rgba(255,255,255,0.01)"]} style={StyleSheet.absoluteFillObject} />
            <View style={S.chartBars}>
              {data.trends.map((t, i) => {
                const maxIndex = Math.max(...data.trends.map((x) => x.index));
                const barH = ((t.index - 95) / (maxIndex - 95)) * 100;
                return (
                  <View key={i} style={S.chartBarWrap}>
                    <View style={[S.chartBar, { height: Math.max(barH, 10), backgroundColor: data.color }]} />
                    <Text style={S.chartBarLabel}>{t.quarter}</Text>
                    <Text style={[S.chartBarValue, { color: data.color }]}>{t.index}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Area Breakdown</Text>
          {data.areas.map((area, i) => (
            <View key={i} style={S.areaRow}>
              <View style={S.areaLeft}>
                <Text style={S.areaName}>{area.name}</Text>
                <View style={[S.areaTypeBadge, { backgroundColor: data.color + "22" }]}><Text style={[S.areaTypeText, { color: data.color }]}>{area.type}</Text></View>
              </View>
              <View style={S.areaRight}>
                <Text style={S.areaPsm}>{area.avgPsm}</Text>
                <Text style={S.areaGrowth}>{area.growth}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>📈 ROI Scenarios (5-Year)</Text>
          <Text style={S.sectionSub}>Based on AED 1M investment in {marketName}</Text>
          {ROI_SCENARIOS.map((s, i) => (
            <View key={i} style={[S.roiCard, { borderColor: s.color + "44" }]}>
              <LinearGradient colors={[s.color + "18", s.color + "08"]} style={StyleSheet.absoluteFillObject} />
              <View style={S.roiHeader}>
                <Text style={[S.roiLabel, { color: s.color }]}>{s.label}</Text>
                <Text style={[S.roiTotal, { color: s.color }]}>{s.total}% total return</Text>
              </View>
              <View style={S.roiDetails}>
                <Text style={S.roiDetail}>📈 Capital appreciation: +{s.appreciation}%/yr</Text>
                <Text style={S.roiDetail}>🏠 Rental income: {s.rental}%/yr</Text>
                <Text style={S.roiDetail}>💰 5-year profit: AED {Math.round(1000000 * s.total / 100 / 1000)}K+</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={[S.section, { paddingBottom: 40 }]}>
          <TouchableOpacity style={S.ctaBtn} onPress={() => router.push("/(tabs)/real-estate-contacts" as never)} activeOpacity={0.88}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.ctaBtnText}>Talk to a UAE Property Expert →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A1A" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 12, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  marketRow: { flexDirection: "row", paddingHorizontal: 20, gap: 10, marginBottom: 20 },
  marketChip: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  marketEmoji: { fontSize: 16 },
  marketLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  metricCard: { borderRadius: 14, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  metricValue: { fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  metricLabel: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", marginTop: 4 },
  metricSub: { color: "rgba(255,255,255,0.3)", fontSize: 11 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold", marginBottom: 4 },
  sectionSub: { color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 12 },
  chartCard: { borderRadius: 16, overflow: "hidden", padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  chartBars: { flexDirection: "row", alignItems: "flex-end", height: 120, gap: 8 },
  chartBarWrap: { flex: 1, alignItems: "center", justifyContent: "flex-end", gap: 4 },
  chartBar: { width: "100%", borderRadius: 4, minHeight: 10 },
  chartBarLabel: { color: "rgba(255,255,255,0.4)", fontSize: 9 },
  chartBarValue: { fontSize: 10, fontWeight: "800" },
  areaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  areaLeft: { gap: 4 },
  areaName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  areaTypeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, alignSelf: "flex-start" },
  areaTypeText: { fontSize: 11, fontWeight: "700" },
  areaRight: { alignItems: "flex-end", gap: 2 },
  areaPsm: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  areaGrowth: { color: "#22C55E", fontSize: 12, fontWeight: "700" },
  roiCard: { borderRadius: 16, overflow: "hidden", padding: 16, marginBottom: 10, borderWidth: 1 },
  roiHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  roiLabel: { fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  roiTotal: { fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  roiDetails: { gap: 4 },
  roiDetail: { color: "rgba(255,255,255,0.6)", fontSize: 13 },
  ctaBtn: { borderRadius: 16, overflow: "hidden", paddingVertical: 16, alignItems: "center" },
  ctaBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
});
