import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

// ─── Cultural Data (from Travi.world) ────────────────────────────────────────
import { getCulturalData } from "@/lib/cultural-data";

// ─── Item Badge ───────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  do: { label: "DO", bg: "#10B98120", text: "#10B981", border: "#10B98140" },
  dont: { label: "DON'T", bg: "#EF444420", text: "#EF4444", border: "#EF444440" },
  info: { label: "INFO", bg: "#3B82F620", text: "#60A5FA", border: "#3B82F640" },
  tip: { label: "TIP", bg: "#F59E0B20", text: "#F59E0B", border: "#F59E0B40" },
};

function CulturalItemRow({ item }: { item: CulturalItem }) {
  const cfg = TYPE_CONFIG[item.type];
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

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CulturalGuideScreen() {
  const { destination = "dubai" } = useLocalSearchParams<{ destination: string }>();
  const insets = useSafeAreaInsets();
  const data = getCulturalData(destination);
  const [expanded, setExpanded] = useState<string>("religion");

  function toggle(id: string) {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded((prev) => (prev === id ? "" : id));
  }

  const displayName = destination.charAt(0).toUpperCase() + destination.slice(1);

  return (
    <View style={[S.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient colors={["#1A0A2E", "#2D1B4E"]} style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <IconSymbol name="chevron.left" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerEmoji}>{data.emoji}</Text>
          <Text style={S.headerTitle}>{displayName}</Text>
          <Text style={S.headerSub}>Cultural Guide</Text>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      {/* Headline */}
      <View style={S.headlineBanner}>
        <IconSymbol name="info.circle.fill" size={16} color="#A78BFA" />
        <Text style={S.headlineText}>{data.headline}</Text>
      </View>

      {/* Sections */}
      <ScrollView style={S.scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        {data.sections.map((section) => (
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
            Cultural norms evolve. Always verify current local guidelines before your trip.
          </Text>
        </View>
      </ScrollView>
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
  sectionCard: {
    backgroundColor: "#1A0A2E", borderRadius: 16,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.07)",
    marginBottom: 10, overflow: "hidden",
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
