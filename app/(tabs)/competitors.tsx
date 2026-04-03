import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, StatusBar, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

/* ─── Competitors ──────────────────────────────────────────────────────────── */
const COMPETITORS = [
  {
    id: "tripadvisor", name: "TripAdvisor", color: "#00AF87", share: "28%",
    strengths: ["Massive review database", "Strong SEO presence", "Trust & credibility"],
    weaknesses: ["Cluttered UI", "No personalization", "Review manipulation"],
    journey: ["Search destination", "Read reviews", "Compare prices", "External redirect", "Book elsewhere"],
    frictions: ["Too many ads", "Redirects to external sites", "No booking completion", "Review trust issues"],
  },
  {
    id: "viator", name: "Viator", color: "#3D5A80", share: "15%",
    strengths: ["Activity marketplace", "Easy booking", "Good mobile UX"],
    weaknesses: ["Limited to activities", "No flights/hotels", "Commission-heavy"],
    journey: ["Browse activities", "Filter by date/price", "Read reviews", "Book in-app", "Get confirmation"],
    frictions: ["No full trip planning", "Price not always best", "Cancellation policies vary"],
  },
  {
    id: "getyourguide", name: "GetYourGuide", color: "#FF6F61", share: "12%",
    strengths: ["Curated experiences", "Original tours", "Strong brand"],
    weaknesses: ["Activities only", "Premium pricing", "Limited destinations"],
    journey: ["Search experience", "View details", "Check availability", "Book & pay", "Receive voucher"],
    frictions: ["Higher prices than local", "No trip integration", "Limited flexibility"],
  },
  {
    id: "airbnb", name: "Airbnb Exp.", color: "#FF5A5F", share: "18%",
    strengths: ["Unique local experiences", "Trust through platform", "Global reach"],
    weaknesses: ["Quality inconsistent", "No travel planning", "Host-dependent"],
    journey: ["Explore experiences", "Check host ratings", "Book dates", "Message host", "Attend experience"],
    frictions: ["Quality varies widely", "Communication delays", "Cancellation by host"],
  },
  {
    id: "klook", name: "Klook", color: "#FF6E40", share: "10%",
    strengths: ["Asia-Pacific leader", "Instant confirmation", "Mobile-first"],
    weaknesses: ["Weak outside Asia", "No personalization", "Generic recommendations"],
    journey: ["Browse by city", "Select activity", "Choose date/time", "Pay in-app", "Show e-ticket"],
    frictions: ["Region-limited", "No trip building", "Generic suggestions"],
  },
];

type ViewMode = "overview" | "journey" | "frictions";

export default function CompetitorsScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [selectedComp, setSelectedComp] = useState(COMPETITORS[0].id);

  const comp = COMPETITORS.find((c) => c.id === selectedComp) || COMPETITORS[0];

  return (
    <View style={S.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Header */}
        <View style={S.header}>
          <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={S.headerTitle}>Competitor Analysis</Text>
            <Text style={S.headerSub}>Travel market intelligence</Text>
          </View>
        </View>

        {/* Market Share Overview */}
        <View style={S.shareRow}>
          {COMPETITORS.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[S.shareCard, selectedComp === c.id && { borderColor: c.color + "60" }]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedComp(c.id);
              }}
              activeOpacity={0.8}
            >
              <View style={[S.shareDot, { backgroundColor: c.color }]} />
              <Text style={S.shareName} numberOfLines={1}>{c.name}</Text>
              <Text style={[S.sharePercent, { color: c.color }]}>{c.share}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* View Mode Tabs */}
        <View style={S.modeRow}>
          {([
            { key: "overview", label: "Overview", icon: "chart.pie.fill" },
            { key: "journey", label: "Journey", icon: "arrow.triangle.branch" },
            { key: "frictions", label: "Frictions", icon: "exclamationmark.triangle.fill" },
          ] as { key: ViewMode; label: string; icon: string }[]).map((mode) => (
            <TouchableOpacity
              key={mode.key}
              style={[S.modeBtn, viewMode === mode.key && S.modeBtnActive]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setViewMode(mode.key);
              }}
              activeOpacity={0.8}
            >
              {viewMode === mode.key && (
                <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              )}
              <IconSymbol name={mode.icon as never} size={14} color={viewMode === mode.key ? "#FFFFFF" : "rgba(255,255,255,0.5)"} />
              <Text style={[S.modeBtnText, viewMode === mode.key && { color: "#FFFFFF" }]}>{mode.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected Competitor Header */}
        <View style={S.compHeader}>
          <View style={[S.compLogo, { backgroundColor: comp.color + "20" }]}>
            <Text style={[S.compLogoText, { color: comp.color }]}>{comp.name[0]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={S.compName}>{comp.name}</Text>
            <Text style={S.compShare}>Market Share: {comp.share}</Text>
          </View>
        </View>

        {/* ── Overview Mode ── */}
        {viewMode === "overview" && (
          <View style={S.section}>
            {/* Strengths */}
            <View style={S.swotCard}>
              <LinearGradient colors={["rgba(16,185,129,0.08)", "rgba(16,185,129,0.02)"]} style={StyleSheet.absoluteFillObject} />
              <View style={S.swotCardBorder} />
              <View style={S.swotHeader}>
                <IconSymbol name="checkmark.circle.fill" size={18} color="#10B981" />
                <Text style={S.swotTitle}>Strengths</Text>
              </View>
              {comp.strengths.map((s, i) => (
                <View key={i} style={S.swotItem}>
                  <View style={[S.swotDot, { backgroundColor: "#10B981" }]} />
                  <Text style={S.swotText}>{s}</Text>
                </View>
              ))}
            </View>

            {/* Weaknesses */}
            <View style={S.swotCard}>
              <LinearGradient colors={["rgba(239,68,68,0.08)", "rgba(239,68,68,0.02)"]} style={StyleSheet.absoluteFillObject} />
              <View style={S.swotCardBorder} />
              <View style={S.swotHeader}>
                <IconSymbol name="xmark.circle.fill" size={18} color="#EF4444" />
                <Text style={S.swotTitle}>Weaknesses</Text>
              </View>
              {comp.weaknesses.map((w, i) => (
                <View key={i} style={S.swotItem}>
                  <View style={[S.swotDot, { backgroundColor: "#EF4444" }]} />
                  <Text style={S.swotText}>{w}</Text>
                </View>
              ))}
            </View>

            {/* TRAVI Advantage */}
            <View style={S.advantageCard}>
              <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
              <View style={[S.swotCardBorder, { borderColor: "rgba(100,67,244,0.3)" }]} />
              <View style={S.swotHeader}>
                <IconSymbol name="sparkles" size={18} color="#C084FC" />
                <Text style={[S.swotTitle, { color: "#C084FC" }]}>TRAVI Advantage</Text>
              </View>
              <Text style={S.advantageText}>
                Full-stack travel platform with AI-powered DNA matching, end-to-end trip planning,
                live trip management, and social features — all in one app.
              </Text>
            </View>
          </View>
        )}

        {/* ── Journey Mode ── */}
        {viewMode === "journey" && (
          <View style={S.section}>
            <Text style={S.journeyTitle}>Customer Journey Map</Text>
            {comp.journey.map((step, i) => (
              <View key={i} style={S.journeyStep}>
                <View style={S.journeyLine}>
                  <View style={[S.journeyDot, { backgroundColor: comp.color }]}>
                    <Text style={S.journeyNum}>{i + 1}</Text>
                  </View>
                  {i < comp.journey.length - 1 && <View style={[S.journeyConnector, { backgroundColor: comp.color + "30" }]} />}
                </View>
                <View style={S.journeyContent}>
                  <Text style={S.journeyStepText}>{step}</Text>
                </View>
              </View>
            ))}

            {/* TRAVI comparison */}
            <View style={S.traviJourneyCard}>
              <LinearGradient colors={["rgba(100,67,244,0.12)", "rgba(249,68,152,0.06)"]} style={StyleSheet.absoluteFillObject} />
              <View style={[S.swotCardBorder, { borderColor: "rgba(100,67,244,0.3)" }]} />
              <Text style={S.traviJourneyTitle}>TRAVI Journey</Text>
              {["Take DNA Quiz", "Get personalized matches", "Plan full trip in 90 sec", "Book everything in-app", "Live trip dashboard"].map((step, i) => (
                <View key={i} style={S.traviStep}>
                  <View style={S.traviStepDot}>
                    <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
                    <Text style={S.traviStepNum}>{i + 1}</Text>
                  </View>
                  <Text style={S.traviStepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── Frictions Mode ── */}
        {viewMode === "frictions" && (
          <View style={S.section}>
            <Text style={S.journeyTitle}>Friction Points</Text>
            <Text style={S.frictionSub}>Pain points where users drop off or get frustrated</Text>
            {comp.frictions.map((f, i) => (
              <View key={i} style={S.frictionCard}>
                <LinearGradient colors={["rgba(239,68,68,0.06)", "rgba(239,68,68,0.02)"]} style={StyleSheet.absoluteFillObject} />
                <View style={S.frictionCardBorder} />
                <View style={S.frictionIcon}>
                  <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#F59E0B" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={S.frictionText}>{f}</Text>
                </View>
                <View style={S.frictionSeverity}>
                  {[1, 2, 3].map((dot) => (
                    <View key={dot} style={[S.severityDot, { backgroundColor: dot <= (i < 2 ? 3 : 2) ? "#EF4444" : "rgba(255,255,255,0.55)" }]} />
                  ))}
                </View>
              </View>
            ))}

            {/* How TRAVI solves */}
            <View style={[S.advantageCard, { marginTop: 16 }]}>
              <LinearGradient colors={["rgba(16,185,129,0.1)", "rgba(16,185,129,0.03)"]} style={StyleSheet.absoluteFillObject} />
              <View style={[S.swotCardBorder, { borderColor: "rgba(16,185,129,0.3)" }]} />
              <View style={S.swotHeader}>
                <IconSymbol name="checkmark.seal.fill" size={18} color="#10B981" />
                <Text style={[S.swotTitle, { color: "#10B981" }]}>How TRAVI Solves This</Text>
              </View>
              <Text style={S.advantageText}>
                End-to-end booking in one app. AI-powered personalization eliminates generic results.
                DNA matching ensures relevant recommendations. No external redirects.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width * 1.5, height: width * 1.5, borderRadius: width * 0.75, top: -width * 0.6, left: -width * 0.4, backgroundColor: "rgba(123,47,190,0.12)" },
  header: { flexDirection: "row", alignItems: "center", gap: 14, paddingTop: 64, paddingHorizontal: 20, paddingBottom: 130 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "800", fontFamily: "Chillax-Bold", letterSpacing: -0.3 },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 2 },
  shareRow: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, gap: 8, marginBottom: 16 },
  shareCard: { width: (width - 56) / 3, alignItems: "center", gap: 4, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 14, padding: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  shareDot: { width: 10, height: 10, borderRadius: 5 },
  shareName: { color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: "600" },
  sharePercent: { fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  modeRow: { flexDirection: "row", paddingHorizontal: 20, gap: 8, marginBottom: 20 },
  modeBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 11, borderRadius: 12, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.55)", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  modeBtnActive: { borderColor: "transparent" },
  modeBtnText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  compHeader: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: 20, marginBottom: 20 },
  compLogo: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  compLogoText: { fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  compName: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", fontFamily: "Chillax-Bold" },
  compShare: { color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 2 },
  section: { paddingHorizontal: 20, gap: 12 },
  swotCard: { borderRadius: 16, overflow: "hidden", padding: 16, gap: 10 },
  swotCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  swotHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  swotTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  swotItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingLeft: 4 },
  swotDot: { width: 6, height: 6, borderRadius: 3 },
  swotText: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "500", fontFamily: "Satoshi-Medium" },
  advantageCard: { borderRadius: 16, overflow: "hidden", padding: 16, gap: 10 },
  advantageText: { color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 21 },
  /* Journey */
  journeyTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold", marginBottom: 4 },
  frictionSub: { color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 8 },
  journeyStep: { flexDirection: "row", gap: 14 },
  journeyLine: { alignItems: "center", width: 32 },
  journeyDot: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  journeyNum: { color: "#FFFFFF", fontSize: 12, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  journeyConnector: { width: 2, height: 24 },
  journeyContent: { flex: 1, paddingBottom: 130, justifyContent: "center" },
  journeyStepText: { color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: "500", fontFamily: "Satoshi-Medium" },
  traviJourneyCard: { borderRadius: 16, overflow: "hidden", padding: 16, gap: 10, marginTop: 16 },
  traviJourneyTitle: { color: "#C084FC", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold", marginBottom: 4 },
  traviStep: { flexDirection: "row", alignItems: "center", gap: 10 },
  traviStepDot: { width: 24, height: 24, borderRadius: 12, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  traviStepNum: { color: "#FFFFFF", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  traviStepText: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "500", fontFamily: "Satoshi-Medium" },
  /* Frictions */
  frictionCard: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 14, overflow: "hidden", padding: 14 },
  frictionCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 14, borderWidth: 1, borderColor: "rgba(239,68,68,0.12)" },
  frictionIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: "rgba(245,158,11,0.15)", alignItems: "center", justifyContent: "center" },
  frictionText: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "500", fontFamily: "Satoshi-Medium" },
  frictionSeverity: { flexDirection: "row", gap: 3 },
  severityDot: { width: 6, height: 6, borderRadius: 3 },
});
