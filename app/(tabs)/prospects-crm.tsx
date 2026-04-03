// @ts-nocheck
/**
 * TRAVI — Prospects CRM Screen
 * B2B CRM for travel agents: pipeline management, contact tracking, deal stages, notes.
 */

import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SkeletonBlock } from "@/components/skeleton-loader";
import { trpc } from "@/lib/trpc";

const { width } = Dimensions.get("window");

type DealStage = "Lead" | "Contacted" | "Proposal" | "Negotiation" | "Closed";

interface Prospect {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  stage: DealStage;
  value: number;
  lastContact: string;
  notes: string;
  tags: string[];
  avatar: string;
  flag: string;
  country: string;
}

const STAGE_COLORS: Record<DealStage, string> = {
  Lead: "#6B7280",
  Contacted: "#3B82F6",
  Proposal: "#F59E0B",
  Negotiation: "#8B5CF6",
  Closed: "#22C55E",
};

const MOCK_PROSPECTS: Prospect[] = [
  {
    id: "p1", name: "Sarah Cohen", company: "Elite Travel Agency", role: "CEO",
    email: "sarah@elitetravel.co.il", phone: "+972-52-1234567",
    stage: "Negotiation", value: 85000, lastContact: "2 days ago",
    notes: "Interested in white-label TRAVI for their 200+ agents. Needs custom branding.",
    tags: ["High Value", "Enterprise", "Israel"],
    avatar: "SC", flag: "🇮🇱", country: "Israel",
  },
  {
    id: "p2", name: "Ahmed Al-Rashid", company: "Gulf Tours LLC", role: "Director",
    email: "ahmed@gulftours.ae", phone: "+971-50-9876543",
    stage: "Proposal", value: 120000, lastContact: "5 days ago",
    notes: "Dubai-based agency with 50 agents. Wants API integration for hotel inventory.",
    tags: ["High Value", "API Partner", "UAE"],
    avatar: "AA", flag: "🇦🇪", country: "UAE",
  },
  {
    id: "p3", name: "Maria Santos", company: "Viagens Premium", role: "Manager",
    email: "maria@viagenspremium.pt", phone: "+351-91-2345678",
    stage: "Contacted", value: 45000, lastContact: "1 week ago",
    notes: "Portuguese agency expanding to South America. Interested in DNA profiling for clients.",
    tags: ["Mid Value", "South America", "Portugal"],
    avatar: "MS", flag: "🇵🇹", country: "Portugal",
  },
  {
    id: "p4", name: "Yuki Tanaka", company: "Japan Luxury Travel", role: "Founder",
    email: "yuki@japlux.jp", phone: "+81-90-12345678",
    stage: "Lead", value: 200000, lastContact: "2 weeks ago",
    notes: "Premium Japanese travel house. Interested in TRAVI's AI capabilities for ultra-HNW clients.",
    tags: ["Very High Value", "Luxury", "Japan"],
    avatar: "YT", flag: "🇯🇵", country: "Japan",
  },
  {
    id: "p5", name: "David Levy", company: "Mossad Travel", role: "Partner",
    email: "david@mossadtravel.co.il", phone: "+972-54-7654321",
    stage: "Closed", value: 32000, lastContact: "Yesterday",
    notes: "Signed annual enterprise plan. Onboarding 15 agents next week.",
    tags: ["Closed", "Active", "Israel"],
    avatar: "DL", flag: "🇮🇱", country: "Israel",
  },
  {
    id: "p6", name: "Emma Wilson", company: "UK Premier Holidays", role: "Head of Sales",
    email: "emma@ukpremier.co.uk", phone: "+44-7911-123456",
    stage: "Contacted", value: 68000, lastContact: "3 days ago",
    notes: "UK agency with strong corporate travel division. Evaluating TRAVI vs Booking.com for Business.",
    tags: ["Mid Value", "Corporate", "UK"],
    avatar: "EW", flag: "🇬🇧", country: "UK",
  },
];

const PIPELINE_STAGES: DealStage[] = ["Lead", "Contacted", "Proposal", "Negotiation", "Closed"];

const TABS = ["Pipeline", "Contacts", "Analytics"];

// ── Map DB status → local DealStage ──
const STATUS_TO_STAGE: Record<string, DealStage> = {
  lead: "Lead",
  qualified: "Contacted",
  proposal: "Proposal",
  negotiation: "Negotiation",
  closed_won: "Closed",
  closed_lost: "Closed",
};

const COUNTRY_FLAGS: Record<string, string> = {
  Israel: "🇮🇱", UAE: "🇦🇪", Portugal: "🇵🇹", Japan: "🇯🇵", UK: "🇬🇧",
  US: "🇺🇸", Germany: "🇩🇪", France: "🇫🇷", Spain: "🇪🇸", Italy: "🇮🇹",
  Brazil: "🇧🇷", India: "🇮🇳", China: "🇨🇳", Australia: "🇦🇺", Canada: "🇨🇦",
};

export default function ProspectsCRMScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStage, setSelectedStage] = useState<DealStage | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  const { data: dbProspects, isLoading } = trpc.enterprise.prospects.useQuery();

  // Convert DB prospects to local shape, fall back to mock data
  const PROSPECTS: Prospect[] = useMemo(() => {
    if (!dbProspects || dbProspects.length === 0) return MOCK_PROSPECTS;
    return dbProspects.map((p: any) => {
      const name = p.contactName ?? p.companyName;
      const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
      const country = p.country ?? "";
      return {
        id: String(p.id),
        name,
        company: p.companyName,
        role: p.industry ?? "Contact",
        email: p.email ?? "",
        phone: p.phone ?? "",
        stage: STATUS_TO_STAGE[p.status] ?? "Lead",
        value: p.dealValue ?? 0,
        lastContact: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "—",
        notes: p.notes ?? "",
        tags: [country, p.industry].filter(Boolean) as string[],
        avatar: initials,
        flag: COUNTRY_FLAGS[country] ?? "🌍",
        country,
      };
    });
  }, [dbProspects]);

  const filteredProspects = PROSPECTS.filter((p) => {
    const matchesStage = selectedStage === "All" || p.stage === selectedStage;
    const matchesSearch = searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const totalPipelineValue = PROSPECTS.reduce((sum, p) => sum + p.value, 0);
  const closedValue = PROSPECTS.filter((p) => p.stage === "Closed").reduce((sum, p) => sum + p.value, 0);
  const activeDeals = PROSPECTS.filter((p) => p.stage !== "Lead").length;

  const stageCount = (stage: DealStage) => PROSPECTS.filter((p) => p.stage === stage).length;
  const stageValue = (stage: DealStage) => PROSPECTS.filter((p) => p.stage === stage).reduce((s, p) => s + p.value, 0);

  if (selectedProspect) {
    return <ProspectDetail prospect={selectedProspect} onBack={() => setSelectedProspect(null)} />;
  }

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Prospects CRM</Text>
            <SkeletonBlock width="60%" height={12} />
          </View>
          <View style={{ width: 60 }} />
        </View>
        <View style={styles.kpiRow}>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={styles.kpiCard}>
              <SkeletonBlock width="70%" height={18} />
              <SkeletonBlock width="50%" height={10} />
            </View>
          ))}
        </View>
        <View style={{ paddingHorizontal: 20, gap: 12, marginTop: 12 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} width="100%" height={72} borderRadius={14} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Prospects CRM</Text>
          <Text style={styles.headerSub}>{PROSPECTS.length} contacts · ${(totalPipelineValue / 1000).toFixed(0)}K pipeline</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* KPI row */}
      <View style={styles.kpiRow}>
        {[
          { label: "Pipeline", value: `$${(totalPipelineValue / 1000).toFixed(0)}K`, color: "#6443F4" },
          { label: "Closed", value: `$${(closedValue / 1000).toFixed(0)}K`, color: "#22C55E" },
          { label: "Active", value: `${activeDeals}`, color: "#F59E0B" },
          { label: "Win Rate", value: "24%", color: "#F94498" },
        ].map((kpi) => (
          <View key={kpi.label} style={styles.kpiCard}>
            <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
            <Text style={styles.kpiLabel}>{kpi.label}</Text>
          </View>
        ))}
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

      {/* ── PIPELINE TAB ── */}
      {activeTab === 0 && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {PIPELINE_STAGES.map((stage) => {
            const stageProspects = PROSPECTS.filter((p) => p.stage === stage);
            if (stageProspects.length === 0) return null;
            return (
              <View key={stage} style={styles.pipelineStage}>
                <View style={styles.pipelineStageHeader}>
                  <View style={[styles.stageDot, { backgroundColor: STAGE_COLORS[stage] }]} />
                  <Text style={styles.stageName}>{stage}</Text>
                  <Text style={styles.stageCount}>{stageCount(stage)}</Text>
                  <Text style={styles.stageValue}>${(stageValue(stage) / 1000).toFixed(0)}K</Text>
                </View>
                {stageProspects.map((prospect) => (
                  <TouchableOpacity
                    key={prospect.id}
                    style={styles.prospectCard}
                    onPress={() => {
                      if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setSelectedProspect(prospect);
                    }}
                    activeOpacity={0.85}
                  >
                    <View style={styles.prospectAvatar}>
                      <Text style={styles.prospectAvatarText}>{prospect.avatar}</Text>
                    </View>
                    <View style={styles.prospectInfo}>
                      <Text style={styles.prospectName}>{prospect.name} {prospect.flag}</Text>
                      <Text style={styles.prospectCompany}>{prospect.company}</Text>
                      <Text style={styles.prospectLastContact}>Last contact: {prospect.lastContact}</Text>
                    </View>
                    <View style={styles.prospectValueWrap}>
                      <Text style={styles.prospectValue}>${(prospect.value / 1000).toFixed(0)}K</Text>
                      <View style={[styles.stageTag, { backgroundColor: STAGE_COLORS[stage] + "33" }]}>
                        <Text style={[styles.stageTagText, { color: STAGE_COLORS[stage] }]}>{stage}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* ── CONTACTS TAB ── */}
      {activeTab === 1 && (
        <>
          <View style={styles.searchWrap}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search contacts..."
              placeholderTextColor="rgba(255,255,255,0.35)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stageFilterScroll} contentContainerStyle={styles.stageFilterContent}>
            {(["All", ...PIPELINE_STAGES] as const).map((stage) => (
              <TouchableOpacity
                key={stage}
                style={[styles.stageFilter, selectedStage === stage && { backgroundColor: (stage === "All" ? "#6443F4" : STAGE_COLORS[stage]) + "33", borderColor: stage === "All" ? "#6443F4" : STAGE_COLORS[stage] }]}
                onPress={() => setSelectedStage(stage)}
                activeOpacity={0.8}
              >
                <Text style={[styles.stageFilterText, selectedStage === stage && { color: "#1A0B2E" }]}>{stage}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <FlatList
            data={filteredProspects}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.contactsList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: prospect }) => (
              <TouchableOpacity
                style={styles.contactCard}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedProspect(prospect);
                }}
                activeOpacity={0.85}
              >
                <View style={[styles.contactAvatar, { backgroundColor: STAGE_COLORS[prospect.stage] + "33" }]}>
                  <Text style={styles.contactAvatarText}>{prospect.avatar}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{prospect.name} {prospect.flag}</Text>
                  <Text style={styles.contactRole}>{prospect.role} · {prospect.company}</Text>
                  <View style={styles.contactTags}>
                    {prospect.tags.slice(0, 2).map((tag) => (
                      <View key={tag} style={styles.contactTag}>
                        <Text style={styles.contactTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.contactRight}>
                  <Text style={styles.contactValue}>${(prospect.value / 1000).toFixed(0)}K</Text>
                  <View style={[styles.stageTag, { backgroundColor: STAGE_COLORS[prospect.stage] + "33" }]}>
                    <Text style={[styles.stageTagText, { color: STAGE_COLORS[prospect.stage] }]}>{prospect.stage}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {/* ── ANALYTICS TAB ── */}
      {activeTab === 2 && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.analyticsTitle}>Pipeline by Stage</Text>
          {PIPELINE_STAGES.map((stage) => {
            const val = stageValue(stage);
            const pct = Math.round((val / totalPipelineValue) * 100);
            return (
              <View key={stage} style={styles.analyticsRow}>
                <View style={[styles.analyticsDot, { backgroundColor: STAGE_COLORS[stage] }]} />
                <Text style={styles.analyticsStage}>{stage}</Text>
                <View style={styles.analyticsBarWrap}>
                  <View style={[styles.analyticsBar, { width: `${pct}%` as any, backgroundColor: STAGE_COLORS[stage] }]} />
                </View>
                <Text style={styles.analyticsValue}>${(val / 1000).toFixed(0)}K</Text>
              </View>
            );
          })}

          <Text style={[styles.analyticsTitle, { marginTop: 24 }]}>Top Markets</Text>
          {[
            { country: "Israel 🇮🇱", deals: 2, value: 117000 },
            { country: "UAE 🇦🇪", deals: 1, value: 120000 },
            { country: "UK 🇬🇧", deals: 1, value: 68000 },
            { country: "Japan 🇯🇵", deals: 1, value: 200000 },
            { country: "Portugal 🇵🇹", deals: 1, value: 45000 },
          ].map((market) => (
            <View key={market.country} style={styles.marketCard}>
              <Text style={styles.marketCountry}>{market.country}</Text>
              <Text style={styles.marketDeals}>{market.deals} deal{market.deals > 1 ? "s" : ""}</Text>
              <Text style={styles.marketValue}>${(market.value / 1000).toFixed(0)}K</Text>
            </View>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

function ProspectDetail({ prospect, onBack }: { prospect: Prospect; onBack: () => void }) {
  const insets = useSafeAreaInsets();
  const [stage, setStage] = useState<DealStage>(prospect.stage);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Detail</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile card */}
        <View style={styles.detailProfileCard}>
          <View style={[styles.detailAvatar, { backgroundColor: STAGE_COLORS[stage] + "33" }]}>
            <Text style={styles.detailAvatarText}>{prospect.avatar}</Text>
          </View>
          <Text style={styles.detailName}>{prospect.name} {prospect.flag}</Text>
          <Text style={styles.detailRole}>{prospect.role} · {prospect.company}</Text>
          <Text style={styles.detailCountry}>{prospect.country}</Text>
          <View style={styles.detailContactRow}>
            <View style={styles.detailContactChip}>
              <Text style={styles.detailContactText}>📧 {prospect.email}</Text>
            </View>
            <View style={styles.detailContactChip}>
              <Text style={styles.detailContactText}>📱 {prospect.phone}</Text>
            </View>
          </View>
        </View>

        {/* Deal value */}
        <View style={styles.dealValueCard}>
          <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(100,67,244,0.05)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={styles.dealValueLabel}>Deal Value</Text>
          <Text style={styles.dealValueAmount}>${prospect.value.toLocaleString()}</Text>
          <Text style={styles.dealValueSub}>Last contact: {prospect.lastContact}</Text>
        </View>

        {/* Stage selector */}
        <Text style={styles.sectionTitle}>Deal Stage</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }} contentContainerStyle={{ gap: 8, paddingRight: 20 }}>
          {PIPELINE_STAGES.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.stageBtn, stage === s && { backgroundColor: STAGE_COLORS[s] + "33", borderColor: STAGE_COLORS[s] }]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setStage(s);
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.stageBtnText, stage === s && { color: STAGE_COLORS[s] }]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tags */}
        <Text style={styles.sectionTitle}>Tags</Text>
        <View style={styles.tagsRow}>
          {prospect.tags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Notes */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Notes</Text>
        <View style={styles.notesCard}>
          <Text style={styles.notesText}>{prospect.notes}</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.actionBtnGrad}>
              <Text style={styles.actionBtnText}>📧 Send Email</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <LinearGradient colors={["#22C55E", "#16A34A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.actionBtnGrad}>
              <Text style={styles.actionBtnText}>📅 Schedule Call</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#1A0B2E", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#1A0B2E", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  addBtn: { backgroundColor: "rgba(100,67,244,0.3)", paddingHorizontal: 14, paddingVertical: 7, borderRadius: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.5)" },
  addBtnText: { color: "#1A0B2E", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  kpiRow: { flexDirection: "row", paddingHorizontal: 20, gap: 10, marginBottom: 12 },
  kpiCard: { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  kpiValue: { fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  kpiLabel: { color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 },
  tabs: { flexDirection: "row", marginHorizontal: 20, marginBottom: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 4 },
  tab: { flex: 1, paddingVertical: 9, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "rgba(100,67,244,0.3)" },
  tabText: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#1A0B2E" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 4 },
  pipelineStage: { marginBottom: 20 },
  pipelineStageHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  stageDot: { width: 10, height: 10, borderRadius: 5 },
  stageName: { flex: 1, color: "#1A0B2E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  stageCount: { color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 4, fontFamily: "Satoshi-Regular" },
  stageValue: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "700" },
  prospectCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  prospectAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(100,67,244,0.3)", alignItems: "center", justifyContent: "center" },
  prospectAvatarText: { color: "#1A0B2E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  prospectInfo: { flex: 1 },
  prospectName: { color: "#1A0B2E", fontSize: 14, fontWeight: "700" },
  prospectCompany: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  prospectLastContact: { color: "rgba(255,255,255,0.55)", fontSize: 11, marginTop: 2 },
  prospectValueWrap: { alignItems: "flex-end", gap: 4 },
  prospectValue: { color: "#1A0B2E", fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
  stageTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  stageTagText: { fontSize: 10, fontWeight: "800", fontFamily: "Chillax-Bold" },
  searchWrap: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 10, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, gap: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, color: "#1A0B2E", fontSize: 14, fontFamily: "Satoshi-Regular" },
  stageFilterScroll: { marginBottom: 10 },
  stageFilterContent: { paddingHorizontal: 20, gap: 8 },
  stageFilter: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  stageFilterText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  contactsList: { paddingHorizontal: 20, paddingBottom: 130 },
  contactCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  contactAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  contactAvatarText: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  contactInfo: { flex: 1 },
  contactName: { color: "#1A0B2E", fontSize: 14, fontWeight: "700" },
  contactRole: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 1 },
  contactTags: { flexDirection: "row", gap: 4, marginTop: 4 },
  contactTag: { backgroundColor: "rgba(255,255,255,0.06)", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  contactTagText: { color: "rgba(255,255,255,0.5)", fontSize: 10 },
  contactRight: { alignItems: "flex-end", gap: 4 },
  contactValue: { color: "#1A0B2E", fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
  analyticsTitle: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", marginBottom: 14, fontFamily: "Chillax-Bold" },
  analyticsRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  analyticsDot: { width: 10, height: 10, borderRadius: 5 },
  analyticsStage: { color: "rgba(255,255,255,0.7)", fontSize: 13, width: 90, fontFamily: "Satoshi-Regular" },
  analyticsBarWrap: { flex: 1, height: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" },
  analyticsBar: { height: 8, borderRadius: 4 },
  analyticsValue: { color: "#1A0B2E", fontSize: 13, fontWeight: "700", width: 50, textAlign: "right" },
  marketCard: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  marketCountry: { flex: 1, color: "#1A0B2E", fontSize: 14, fontWeight: "700" },
  marketDeals: { color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 12, fontFamily: "Satoshi-Regular" },
  marketValue: { color: "#22C55E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  // Detail styles
  detailProfileCard: { alignItems: "center", paddingVertical: 24, gap: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, marginBottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  detailAvatar: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  detailAvatarText: { color: "#1A0B2E", fontSize: 24, fontWeight: "900", fontFamily: "Chillax-Bold" },
  detailName: { color: "#1A0B2E", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  detailRole: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  detailCountry: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  detailContactRow: { flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 8 },
  detailContactChip: { backgroundColor: "rgba(255,255,255,0.06)", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  detailContactText: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  dealValueCard: { borderRadius: 16, overflow: "hidden", padding: 16, marginBottom: 20, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", alignItems: "center" },
  dealValueLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  dealValueAmount: { color: "#1A0B2E", fontSize: 32, fontWeight: "900", fontFamily: "Chillax-Bold" },
  dealValueSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 },
  sectionTitle: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", marginBottom: 10, fontFamily: "Chillax-Bold" },
  stageBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)" },
  stageBtnText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700" },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 4 },
  tagChip: { backgroundColor: "rgba(100,67,244,0.2)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  tagText: { color: "#A78BFA", fontSize: 12, fontWeight: "700" },
  notesCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  notesText: { color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 22, fontFamily: "Satoshi-Regular" },
  actionRow: { flexDirection: "row", gap: 12, marginTop: 20 },
  actionBtn: { flex: 1, borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  actionBtnGrad: { paddingVertical: 14, alignItems: "center" },
  actionBtnText: { color: "#1A0B2E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
