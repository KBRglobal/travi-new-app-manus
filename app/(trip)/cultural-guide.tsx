import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { getCulturalData, KNOWN_DESTINATIONS } from "@/lib/cultural-data";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CulturalSection {
  id: string;
  icon: string;
  title: string;
  color: string;
  gradient: [string, string];
  items: CulturalItem[];
}

interface CulturalItem {
  label: string;
  value: string;
  type: "do" | "dont" | "info" | "tip";
}

// ─── Item Badge ───────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  do: { label: "DO", bg: "#10B98120", text: "#10B981", border: "#10B98140" },
  dont: { label: "DON'T", bg: "#EF444420", text: "#EF4444", border: "#EF444440" },
  info: { label: "INFO", bg: "#3B82F620", text: "#60A5FA", border: "#3B82F640" },
  tip: { label: "TIP", bg: "#F59E0B20", text: "#F59E0B", border: "#F59E0B40" },
};

function CulturalItemRow({ item }: { item: CulturalItem }) {
  const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.info;
  return (
    <View style={S.itemRow}>
      <View style={[S.typeBadge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
        <Text style={[S.typeBadgeText, { color: cfg.text }]}>{cfg.label}</Text>
      </View>
      <View style={S.itemContent}>
        <Text style={S.itemLabel}>{item.label}</Text>
        <Text style={S.itemValue}>{item.value}</Text>
      </View>
    </View>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ section, expanded, onToggle }: { section: CulturalSection; expanded: boolean; onToggle: () => void }) {
  return (
    <View style={S.sectionCard}>
      <TouchableOpacity style={S.sectionHeader} onPress={onToggle} activeOpacity={0.8}>
        <LinearGradient colors={section.gradient} style={S.sectionIcon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <IconSymbol name={section.icon as never} size={18} color="#fff" />
        </LinearGradient>
        <Text style={S.sectionTitle}>{section.title}</Text>
        <View style={[S.sectionCount, { backgroundColor: section.color + "20" }]}>
          <Text style={[S.sectionCountText, { color: section.color }]}>{section.items.length}</Text>
        </View>
        <IconSymbol name={expanded ? "chevron.down" : "chevron.right"} size={16} color="#9BA1A6" />
      </TouchableOpacity>
      {expanded && (
        <View style={S.sectionBody}>
          {section.items.map((item, i) => (
            <CulturalItemRow key={i} item={item} />
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Visa Card ────────────────────────────────────────────────────────────────
function VisaCard({ items, expanded, onToggle }: { items: CulturalItem[]; expanded: boolean; onToggle: () => void }) {
  return (
    <View style={[S.sectionCard, S.visaCard]}>
      <TouchableOpacity style={S.sectionHeader} onPress={onToggle} activeOpacity={0.8}>
        <LinearGradient colors={["#0EA5E9", "#0369A1"]} style={S.sectionIcon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <IconSymbol name="airplane.circle.fill" size={18} color="#fff" />
        </LinearGradient>
        <Text style={S.sectionTitle}>Visa & Entry</Text>
        <View style={[S.sectionCount, { backgroundColor: "#0EA5E920" }]}>
          <Text style={[S.sectionCountText, { color: "#0EA5E9" }]}>{items.length}</Text>
        </View>
        <IconSymbol name={expanded ? "chevron.down" : "chevron.right"} size={16} color="#9BA1A6" />
      </TouchableOpacity>
      {expanded && (
        <View style={S.sectionBody}>
          {items.map((item, i) => (
            <CulturalItemRow key={i} item={item} />
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDestinationName(dest: string): string {
  return dest
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildSectionsFromAI(aiData: Record<string, unknown>): CulturalSection[] {
  const SECTION_DEFS = [
    { id: "religion", key: "religion", icon: "moon.stars.fill", title: "Religion & Customs", color: "#8B5CF6", gradient: ["#8B5CF6", "#6D28D9"] as [string, string] },
    { id: "dress", key: "dress", icon: "tshirt.fill", title: "Dress Code", color: "#EC4899", gradient: ["#EC4899", "#BE185D"] as [string, string] },
    { id: "food", key: "food", icon: "fork.knife", title: "Food & Drink", color: "#F59E0B", gradient: ["#F59E0B", "#D97706"] as [string, string] },
    { id: "laws", key: "laws", icon: "shield.fill", title: "Laws & Rules", color: "#EF4444", gradient: ["#EF4444", "#B91C1C"] as [string, string] },
    { id: "etiquette", key: "etiquette", icon: "hand.raised.fill", title: "Etiquette & Tips", color: "#10B981", gradient: ["#10B981", "#059669"] as [string, string] },
  ];
  return SECTION_DEFS.map((def) => ({
    id: def.id,
    icon: def.icon,
    title: def.title,
    color: def.color,
    gradient: def.gradient,
    items: (Array.isArray(aiData[def.key]) ? aiData[def.key] as CulturalItem[] : []),
  })).filter((s) => s.items.length > 0);
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CulturalGuideScreen() {
  const { destination = "dubai" } = useLocalSearchParams<{ destination: string }>();
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<string>("visa");

  const normalizedKey = destination?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "");
  const isKnown = KNOWN_DESTINATIONS.includes(normalizedKey);

  // Use static data for known destinations
  const staticData = isKnown ? getCulturalData(destination) : null;

  // Use AI for unknown destinations
  const { data: aiData, isLoading: aiLoading } = trpc.culturalGuide.generate.useQuery(
    { destination },
    { enabled: !isKnown, staleTime: 1000 * 60 * 30 }
  );

  function toggle(id: string) {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded((prev) => (prev === id ? "" : id));
  }

  const displayName = formatDestinationName(destination);

  // Build display data
  let headline = "";
  let emoji = "🌍";
  let sections: CulturalSection[] = [];
  let visaItems: CulturalItem[] = [];

  if (staticData) {
    headline = staticData.headline;
    emoji = staticData.emoji;
    sections = staticData.sections as CulturalSection[];
    visaItems = (staticData.visa ?? []) as CulturalItem[];
  } else if (aiData) {
    const ai = aiData as Record<string, unknown>;
    headline = (ai.headline as string) ?? `Cultural guide for ${displayName}`;
    emoji = (ai.emoji as string) ?? "🌍";
    sections = buildSectionsFromAI(ai);
    visaItems = (Array.isArray(ai.visa) ? ai.visa : []) as CulturalItem[];
  }

  return (
    <View style={[S.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient colors={["#1A0A2E", "#2D1B4E"]} style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <IconSymbol name="chevron.left" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerEmoji}>{emoji}</Text>
          <Text style={S.headerTitle}>{displayName}</Text>
          <Text style={S.headerSub}>Cultural Guide</Text>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      {/* AI Loading State */}
      {!isKnown && aiLoading && (
        <View style={S.loadingContainer}>
          <ActivityIndicator size="large" color="#A78BFA" />
          <Text style={S.loadingText}>Generating cultural guide for {displayName}...</Text>
          <Text style={S.loadingSubtext}>Powered by TRAVI AI</Text>
        </View>
      )}

      {/* Headline */}
      {headline ? (
        <View style={S.headlineBanner}>
          <IconSymbol name="info.circle.fill" size={16} color="#A78BFA" />
          <Text style={S.headlineText}>{headline}</Text>
        </View>
      ) : null}

      {/* Sections */}
      {!aiLoading && (
        <ScrollView style={S.scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
          {/* Visa & Entry — pinned at top */}
          {visaItems.length > 0 && (
            <VisaCard
              items={visaItems}
              expanded={expanded === "visa"}
              onToggle={() => toggle("visa")}
            />
          )}

          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              expanded={expanded === section.id}
              onToggle={() => toggle(section.id)}
            />
          ))}

          {/* Footer note */}
          <View style={S.footerNote}>
            <IconSymbol name="exclamationmark.triangle.fill" size={14} color="#F59E0B" />
            <Text style={S.footerNoteText}>
              Cultural norms and visa requirements evolve. Always verify current local guidelines before your trip.
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0F0520" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center",
  },
  headerCenter: { alignItems: "center" },
  headerEmoji: { fontSize: 32, marginBottom: 4 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#fff", letterSpacing: 0.3 },
  headerSub: { fontSize: 13, color: "#A78BFA", marginTop: 2 },
  headlineBanner: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    marginHorizontal: 16, marginTop: 12, marginBottom: 4,
    backgroundColor: "rgba(167,139,250,0.1)", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(167,139,250,0.2)",
    padding: 12,
  },
  headlineText: { flex: 1, fontSize: 13, color: "#C4B5FD", lineHeight: 19 },
  scroll: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  loadingContainer: {
    flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 32,
  },
  loadingText: { fontSize: 15, color: "#C4B5FD", textAlign: "center", fontWeight: "600" },
  loadingSubtext: { fontSize: 12, color: "#6B7280", textAlign: "center" },
  sectionCard: {
    backgroundColor: "#1A0A2E", borderRadius: 16,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.07)",
    marginBottom: 10, overflow: "hidden",
  },
  visaCard: {
    borderColor: "rgba(14,165,233,0.25)",
    backgroundColor: "#0A1929",
  },
  sectionHeader: {
    flexDirection: "row", alignItems: "center", gap: 12,
    padding: 16,
  },
  sectionIcon: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  sectionTitle: { flex: 1, fontSize: 15, fontWeight: "700", color: "#fff" },
  sectionCount: {
    width: 24, height: 24, borderRadius: 8,
    alignItems: "center", justifyContent: "center",
  },
  sectionCountText: { fontSize: 12, fontWeight: "700" },
  sectionBody: { paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  itemRow: {
    flexDirection: "row", gap: 10, alignItems: "flex-start",
    paddingTop: 10, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)",
  },
  typeBadge: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6,
    borderWidth: 1, alignSelf: "flex-start", marginTop: 2,
  },
  typeBadgeText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  itemContent: { flex: 1 },
  itemLabel: { fontSize: 13, fontWeight: "700", color: "#E2E8F0", marginBottom: 3 },
  itemValue: { fontSize: 12, color: "#94A3B8", lineHeight: 18 },
  footerNote: {
    flexDirection: "row", gap: 8, alignItems: "flex-start",
    backgroundColor: "rgba(245,158,11,0.08)", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(245,158,11,0.2)",
    padding: 12, marginTop: 8,
  },
  footerNoteText: { flex: 1, fontSize: 12, color: "#FCD34D", lineHeight: 18 },
});
