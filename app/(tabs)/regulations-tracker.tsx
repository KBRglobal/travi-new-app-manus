// @ts-nocheck
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Platform, TextInput,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";

const { width } = Dimensions.get("window");

// ── Data ──────────────────────────────────────────────────────────────────

type RegStatus = "compliant" | "warning" | "critical" | "pending";
type RegCategory = "visa" | "tax" | "data" | "consumer" | "financial" | "health";

interface Regulation {
  id: string;
  title: string;
  jurisdiction: string;
  flag: string;
  category: RegCategory;
  status: RegStatus;
  lastUpdated: string;
  effectiveDate: string;
  summary: string;
  impact: string;
  action?: string;
  priority: "high" | "medium" | "low";
}

const REGULATIONS: Regulation[] = [
  {
    id: "gdpr-eu",
    title: "GDPR Data Protection",
    jurisdiction: "European Union",
    flag: "🇪🇺",
    category: "data",
    status: "compliant",
    lastUpdated: "Mar 15, 2026",
    effectiveDate: "May 25, 2018",
    summary: "General Data Protection Regulation requires explicit consent for data collection, right to erasure, and data portability for EU residents.",
    impact: "All user data handling, cookie consent, and privacy policy must comply. Fines up to €20M or 4% of global turnover.",
    priority: "high",
  },
  {
    id: "psd2-eu",
    title: "PSD2 Payment Services",
    jurisdiction: "European Union",
    flag: "🇪🇺",
    category: "financial",
    status: "compliant",
    lastUpdated: "Jan 8, 2026",
    effectiveDate: "Jan 13, 2018",
    summary: "Requires Strong Customer Authentication (SCA) for online payments and open banking APIs.",
    impact: "All payment flows must implement 2FA. Stripe handles SCA compliance automatically.",
    priority: "high",
  },
  {
    id: "ccpa-us",
    title: "CCPA / CPRA Privacy",
    jurisdiction: "California, USA",
    flag: "🇺🇸",
    category: "data",
    status: "compliant",
    lastUpdated: "Feb 20, 2026",
    effectiveDate: "Jan 1, 2020",
    summary: "California Consumer Privacy Act grants consumers rights to know, delete, and opt-out of sale of personal data.",
    impact: "Privacy policy must include CCPA disclosures. Users must be able to request data deletion.",
    priority: "high",
  },
  {
    id: "iata-ndc",
    title: "IATA NDC Standard",
    jurisdiction: "Global",
    flag: "🌐",
    category: "consumer",
    status: "warning",
    lastUpdated: "Mar 1, 2026",
    effectiveDate: "Jun 1, 2023",
    summary: "New Distribution Capability requires travel agents to use XML-based API for airline content distribution.",
    impact: "Flight booking integration must migrate to NDC-compliant APIs by Q3 2026.",
    action: "Migrate flight API to NDC-compliant provider",
    priority: "high",
  },
  {
    id: "vat-eu-travel",
    title: "EU VAT on Travel Services",
    jurisdiction: "European Union",
    flag: "🇪🇺",
    category: "tax",
    status: "warning",
    lastUpdated: "Feb 10, 2026",
    effectiveDate: "Jul 1, 2021",
    summary: "VAT OSS (One Stop Shop) requires registration for digital services sold to EU consumers. Travel margin scheme applies to package tours.",
    impact: "Must register for VAT OSS if EU revenue exceeds €10,000. Tax counsel review needed.",
    action: "Complete VAT OSS registration by Q2 2026",
    priority: "medium",
  },
  {
    id: "israel-privacy",
    title: "Israeli Privacy Protection Law",
    jurisdiction: "Israel",
    flag: "🇮🇱",
    category: "data",
    status: "pending",
    lastUpdated: "Mar 28, 2026",
    effectiveDate: "Pending 2026",
    summary: "Proposed amendment to Israel's Privacy Protection Law aligns with GDPR standards, including DPO requirements and breach notification within 72 hours.",
    impact: "New requirements for data processing agreements and DPO appointment pending final legislation.",
    action: "Monitor legislation progress and prepare compliance roadmap",
    priority: "medium",
  },
  {
    id: "uae-tourism-tax",
    title: "UAE Tourism Dirham Fee",
    jurisdiction: "UAE",
    flag: "🇦🇪",
    category: "tax",
    status: "compliant",
    lastUpdated: "Jan 15, 2026",
    effectiveDate: "Oct 31, 2014",
    summary: "Dubai Tourism Dirham fee applies to hotel stays: AED 7-20 per room per night based on hotel star rating.",
    impact: "Must be collected and remitted to Dubai Tourism. Currently handled by hotel partners.",
    priority: "low",
  },
  {
    id: "pci-dss",
    title: "PCI DSS v4.0",
    jurisdiction: "Global",
    flag: "🌐",
    category: "financial",
    status: "compliant",
    lastUpdated: "Mar 31, 2024",
    effectiveDate: "Mar 31, 2024",
    summary: "Payment Card Industry Data Security Standard v4.0 requires enhanced authentication, monitoring, and encryption for cardholder data.",
    impact: "Stripe handles PCI compliance as a Level 1 PCI DSS certified provider. TRAVI is SAQ A eligible.",
    priority: "high",
  },
  {
    id: "eu-ai-act",
    title: "EU AI Act",
    jurisdiction: "European Union",
    flag: "🇪🇺",
    category: "data",
    status: "pending",
    lastUpdated: "Mar 10, 2026",
    effectiveDate: "Aug 2, 2026",
    summary: "First comprehensive AI regulation. Travel recommendation systems may be classified as limited-risk AI requiring transparency obligations.",
    impact: "AI itinerary builder and DNA matching system must disclose AI use to users. Compliance deadline Aug 2026.",
    action: "Add AI disclosure notices to recommendation features",
    priority: "high",
  },
  {
    id: "uk-package-travel",
    title: "UK Package Travel Regulations",
    jurisdiction: "United Kingdom",
    flag: "🇬🇧",
    category: "consumer",
    status: "critical",
    lastUpdated: "Mar 25, 2026",
    effectiveDate: "Jul 1, 2018",
    summary: "Package Travel and Linked Travel Arrangements Regulations require financial protection (ATOL/ABTA bonding) for package holidays sold to UK consumers.",
    impact: "TRAVI must obtain ATOL license or partner with ATOL-licensed operator before selling packages to UK customers.",
    action: "Apply for ATOL license or establish white-label partnership with ATOL holder",
    priority: "high",
  },
];

const CATEGORIES: { id: RegCategory | "all"; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "square.grid.2x2.fill" },
  { id: "data", label: "Data", icon: "lock.shield.fill" },
  { id: "financial", label: "Financial", icon: "creditcard.fill" },
  { id: "tax", label: "Tax", icon: "percent" },
  { id: "consumer", label: "Consumer", icon: "person.fill" },
  { id: "visa", label: "Visa", icon: "doc.text.fill" },
  { id: "health", label: "Health", icon: "cross.circle.fill" },
];

const STATUS_CONFIG: Record<RegStatus, { color: string; bg: string; label: string; icon: string }> = {
  compliant: { color: "#22C55E", bg: "rgba(34,197,94,0.12)", label: "Compliant", icon: "checkmark.circle.fill" },
  warning: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)", label: "Action Needed", icon: "exclamationmark.circle.fill" },
  critical: { color: "#EF4444", bg: "rgba(239,68,68,0.12)", label: "Critical", icon: "xmark.circle.fill" },
  pending: { color: "#6B7280", bg: "rgba(107,114,128,0.12)", label: "Monitoring", icon: "clock" },
};

const CATEGORY_COLORS: Record<RegCategory, string> = {
  visa: "#6443F4",
  tax: "#F59E0B",
  data: "#06B6D4",
  consumer: "#F94498",
  financial: "#22C55E",
  health: "#EF4444",
};

// ── Component ─────────────────────────────────────────────────────────────

export default function RegulationsTrackerScreen() {
  const [selectedCategory, setSelectedCategory] = useState<RegCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<RegStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const haptic = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const filtered = REGULATIONS.filter((r) => {
    if (selectedCategory !== "all" && r.category !== selectedCategory) return false;
    if (selectedStatus !== "all" && r.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.jurisdiction.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q);
    }
    return true;
  });

  const stats = {
    compliant: REGULATIONS.filter((r) => r.status === "compliant").length,
    warning: REGULATIONS.filter((r) => r.status === "warning").length,
    critical: REGULATIONS.filter((r) => r.status === "critical").length,
    pending: REGULATIONS.filter((r) => r.status === "pending").length,
  };

  const complianceScore = Math.round((stats.compliant / REGULATIONS.length) * 100);

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>

        {/* ── Header ── */}
        <LinearGradient
          colors={["#0f2027", "#203a43", "#2c5364"]}
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
            <Text style={styles.headerTitle}>Regulations Tracker</Text>
            <Text style={styles.headerSub}>Global compliance monitoring</Text>
          </View>
          <View style={[styles.scoreCircle, { borderColor: complianceScore >= 80 ? "#22C55E" : "#F59E0B" }]}>
            <Text style={[styles.scoreValue, { color: complianceScore >= 80 ? "#22C55E" : "#F59E0B" }]}>
              {complianceScore}%
            </Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
        </LinearGradient>

        {/* ── Status Overview ── */}
        <View style={styles.statsRow}>
          {(["compliant", "warning", "critical", "pending"] as RegStatus[]).map((s) => {
            const cfg = STATUS_CONFIG[s];
            return (
              <TouchableOpacity
                key={s}
                style={[styles.statCard, selectedStatus === s && { borderColor: cfg.color }]}
                onPress={() => { haptic(); setSelectedStatus(selectedStatus === s ? "all" : s); }}
              >
                <Text style={[styles.statCount, { color: cfg.color }]}>{stats[s]}</Text>
                <Text style={styles.statLabel}>{cfg.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Search ── */}
        <View style={styles.searchRow}>
          <IconSymbol name="magnifyingglass" size={16} color="#9BA1A6" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search regulations..."
            placeholderTextColor="#9BA1A6"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <IconSymbol name="xmark.circle.fill" size={16} color="#9BA1A6" />
            </TouchableOpacity>
          )}
        </View>

        {/* ── Category Filter ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, selectedCategory === cat.id && styles.catChipActive]}
              onPress={() => { haptic(); setSelectedCategory(cat.id); }}
            >
              <Text style={[styles.catText, selectedCategory === cat.id && styles.catTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Results Count ── */}
        <Text style={styles.resultsCount}>{filtered.length} regulation{filtered.length !== 1 ? "s" : ""}</Text>

        {/* ── Regulation Cards ── */}
        <View style={styles.cardList}>
          {filtered.map((reg) => {
            const cfg = STATUS_CONFIG[reg.status];
            const catColor = CATEGORY_COLORS[reg.category];
            const isExpanded = expandedId === reg.id;

            return (
              <TouchableOpacity
                key={reg.id}
                style={[styles.regCard, reg.status === "critical" && styles.regCardCritical]}
                onPress={() => { haptic(); setExpandedId(isExpanded ? null : reg.id); }}
                activeOpacity={0.85}
              >
                {/* Card Header */}
                <View style={styles.regHeader}>
                  <Text style={styles.regFlag}>{reg.flag}</Text>
                  <View style={styles.regTitleBlock}>
                    <Text style={styles.regTitle} numberOfLines={isExpanded ? undefined : 1}>{reg.title}</Text>
                    <Text style={styles.regJurisdiction}>{reg.jurisdiction}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
                    <IconSymbol name={cfg.icon as any} size={12} color={cfg.color} />
                    <Text style={[styles.statusText, { color: cfg.color }]}>{cfg.label}</Text>
                  </View>
                </View>

                {/* Category + Priority Tags */}
                <View style={styles.tagRow}>
                  <View style={[styles.catTag, { backgroundColor: catColor + "22" }]}>
                    <Text style={[styles.catTagText, { color: catColor }]}>
                      {reg.category.toUpperCase()}
                    </Text>
                  </View>
                  <View style={[styles.priorityTag, {
                    backgroundColor: reg.priority === "high" ? "#EF444422" : reg.priority === "medium" ? "#F59E0B22" : "#22C55E22",
                  }]}>
                    <Text style={[styles.priorityText, {
                      color: reg.priority === "high" ? "#EF4444" : reg.priority === "medium" ? "#F59E0B" : "#22C55E",
                    }]}>
                      {reg.priority.toUpperCase()} PRIORITY
                    </Text>
                  </View>
                  <Text style={styles.updatedText}>Updated {reg.lastUpdated}</Text>
                </View>

                {/* Summary (always visible) */}
                <Text style={styles.regSummary} numberOfLines={isExpanded ? undefined : 2}>
                  {reg.summary}
                </Text>

                {/* Expanded Content */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <View style={styles.impactBox}>
                      <View style={styles.impactHeader}>
                        <IconSymbol name="exclamationmark.circle" size={14} color="#F59E0B" />
                        <Text style={styles.impactTitle}>Business Impact</Text>
                      </View>
                      <Text style={styles.impactText}>{reg.impact}</Text>
                    </View>

                    <View style={styles.dateRow}>
                      <View style={styles.dateItem}>
                        <Text style={styles.dateLabel}>Effective Date</Text>
                        <Text style={styles.dateValue}>{reg.effectiveDate}</Text>
                      </View>
                      <View style={styles.dateDivider} />
                      <View style={styles.dateItem}>
                        <Text style={styles.dateLabel}>Last Reviewed</Text>
                        <Text style={styles.dateValue}>{reg.lastUpdated}</Text>
                      </View>
                    </View>

                    {reg.action && (
                      <View style={styles.actionBox}>
                        <IconSymbol name="arrow.right.circle.fill" size={16} color="#6443F4" />
                        <Text style={styles.actionText}>{reg.action}</Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Expand indicator */}
                <View style={styles.expandRow}>
                  <IconSymbol
                    name={isExpanded ? "chevron.up" : "chevron.down"}
                    size={14}
                    color="#9BA1A6"
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Disclaimer ── */}
        <View style={styles.disclaimer}>
          <IconSymbol name="info.circle" size={14} color="#9BA1A6" />
          <Text style={styles.disclaimerText}>
            This tracker provides general compliance guidance. Consult qualified legal counsel for jurisdiction-specific advice.
          </Text>
        </View>

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
  headerLabel: { fontSize: 10, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#06B6D4", letterSpacing: 2, marginBottom: 2 },
  headerTitle: { fontSize: 22, fontFamily: "Chillax-Bold", fontWeight: "800", color: "#fff" },
  headerSub: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.6)", marginTop: 2 },
  scoreCircle: {
    width: 56, height: 56, borderRadius: 28, borderWidth: 2,
    alignItems: "center", justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  scoreValue: { fontSize: 14, fontFamily: "Chillax-Bold", fontWeight: "800" },
  scoreLabel: { fontSize: 9, fontFamily: "Chillax-Semibold", color: "#9BA1A6", fontWeight: "600" },

  statsRow: {
    flexDirection: "row", paddingHorizontal: 16, paddingVertical: 12, gap: 8,
  },
  statCard: {
    flex: 1, backgroundColor: "#1e2022", borderRadius: 12, padding: 10,
    alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  statCount: { fontSize: 20, fontFamily: "Chillax-Bold", fontWeight: "800" },
  statLabel: { fontSize: 9, fontFamily: "Satoshi-Regular", color: "#9BA1A6", marginTop: 2, textAlign: "center" },

  searchRow: {
    flexDirection: "row", alignItems: "center", gap: 10,
    marginHorizontal: 16, marginBottom: 8,
    backgroundColor: "#1e2022", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Regular", color: "#ECEDEE" },

  categoryScroll: { marginBottom: 8 },
  catChip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: "rgba(100,67,244,0.08)", borderWidth: 1, borderColor: "transparent",
  },
  catChipActive: { backgroundColor: "#6443F4", borderColor: "#6443F4" },
  catText: { fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "600", color: "#9BA1A6" },
  catTextActive: { color: "#fff" },

  resultsCount: {
    fontSize: 12, fontFamily: "Satoshi-Regular", color: "#9BA1A6", paddingHorizontal: 20, marginBottom: 8,
  },

  cardList: { paddingHorizontal: 16, gap: 10 },

  regCard: {
    backgroundColor: "#1e2022", borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  regCardCritical: { borderColor: "rgba(239,68,68,0.3)" },

  regHeader: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
  regFlag: { fontSize: 22, fontFamily: "Satoshi-Regular", marginTop: 2 },
  regTitleBlock: { flex: 1 },
  regTitle: { fontSize: 14, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#ECEDEE" },
  regJurisdiction: { fontSize: 11, fontFamily: "Satoshi-Regular", color: "#9BA1A6", marginTop: 1 },
  statusBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
  },
  statusText: { fontSize: 10, fontFamily: "Chillax-Semibold", fontWeight: "700" },

  tagRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" },
  catTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  catTagText: { fontSize: 9, fontFamily: "Chillax-Bold", fontWeight: "800", letterSpacing: 0.5 },
  priorityTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  priorityText: { fontSize: 9, fontFamily: "Chillax-Bold", fontWeight: "800", letterSpacing: 0.5 },
  updatedText: { fontSize: 10, fontFamily: "Satoshi-Regular", color: "#9BA1A6", marginLeft: "auto" },

  regSummary: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "#9BA1A6", lineHeight: 19, marginBottom: 4 },

  expandedContent: { marginTop: 12, gap: 10 },

  impactBox: {
    backgroundColor: "rgba(245,158,11,0.08)", borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: "rgba(245,158,11,0.15)",
  },
  impactHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  impactTitle: { fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#F59E0B" },
  impactText: { fontSize: 12, fontFamily: "Satoshi-Regular", color: "#9BA1A6", lineHeight: 18 },

  dateRow: {
    flexDirection: "row", backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 10, padding: 12,
  },
  dateItem: { flex: 1, alignItems: "center" },
  dateLabel: { fontSize: 10, fontFamily: "Satoshi-Regular", color: "#9BA1A6", marginBottom: 3 },
  dateValue: { fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "700", color: "#ECEDEE" },
  dateDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.06)", marginHorizontal: 12 },

  actionBox: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    backgroundColor: "rgba(100,67,244,0.1)", borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: "rgba(100,67,244,0.2)",
  },
  actionText: { flex: 1, fontSize: 12, fontFamily: "Chillax-Semibold", color: "#ECEDEE", lineHeight: 18, fontWeight: "600" },

  expandRow: { alignItems: "center", marginTop: 8 },

  disclaimer: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    margin: 16, padding: 12,
    backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10,
  },
  disclaimerText: { flex: 1, fontSize: 11, fontFamily: "Satoshi-Regular", color: "#9BA1A6", lineHeight: 16 },
});
