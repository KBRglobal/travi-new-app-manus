// @ts-nocheck
/**
 * TRAVI Trip Companions
 *
 * Invite friends to a trip. Each companion:
 * - Creates their own DNA profile
 * - Costs are split automatically
 * - DNA compatibility score shown
 * - Share via link / QR
 */

import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Animated, Platform, TextInput, Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const haptic = (style = Haptics.ImpactFeedbackStyle.Light) => {
  if (Platform.OS !== "web") Haptics.impactAsync(style);
};

// ── Mock companion data ───────────────────────────────────────────────────────

type Companion = {
  id: string;
  name: string;
  avatar: string;
  dnaType: string;
  compatibility: number;
  status: "accepted" | "pending" | "declined";
  topCategories: string[];
};

const MOCK_COMPANIONS: Companion[] = [
  {
    id: "c1", name: "Maya Cohen", avatar: "👩‍🦱", dnaType: "The Culture Seeker",
    compatibility: 94, status: "accepted",
    topCategories: ["🏛️ Culture", "🍜 Food", "🎨 Art"],
  },
  {
    id: "c2", name: "Lior Ben-David", avatar: "👨‍🦲", dnaType: "The Adventure Junkie",
    compatibility: 78, status: "pending",
    topCategories: ["🪂 Adventure", "🥾 Hiking", "🏖️ Beaches"],
  },
];

const SPLIT_ITEMS = [
  { label: "Flights", total: 1200, icon: "✈️" },
  { label: "Hotel", total: 800, icon: "🏨" },
  { label: "Activities", total: 340, icon: "🎯" },
  { label: "Upsells", total: 100, icon: "🛡️" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function TripCompanionsScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ destination?: string; totalCost?: string }>();
  const [companions, setCompanions] = useState<Companion[]>(MOCK_COMPANIONS);
  const [emailInput, setEmailInput] = useState("");
  const [inviteSent, setInviteSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"companions" | "split">("companions");
  const successAnim = useRef(new Animated.Value(0)).current;

  const destination = params.destination ?? "Your Trip";
  const totalCost = parseInt(params.totalCost ?? "2440", 10);
  const totalPeople = companions.filter((c) => c.status === "accepted").length + 1; // +1 for user
  const perPerson = Math.ceil(totalCost / totalPeople);

  const handleInvite = async () => {
    if (!emailInput.trim()) return;
    haptic(Haptics.ImpactFeedbackStyle.Medium);
    setInviteSent(true);
    Animated.sequence([
      Animated.spring(successAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(successAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => { setInviteSent(false); setEmailInput(""); });
  };

  const handleShareLink = async () => {
    haptic();
    try {
      await Share.share({
        message: `Join me on my TRAVI trip to ${destination}! 🌍\nCreate your travel DNA profile and let's plan together:\nhttps://travi.app/join/TRV-${Date.now().toString().slice(-6)}`,
        title: `Join my trip to ${destination}`,
      });
    } catch (_) {}
  };

  const handleRemove = (id: string) => {
    haptic();
    setCompanions((prev) => prev.filter((c) => c.id !== id));
  };

  const compatibilityColor = (score: number) =>
    score >= 90 ? "#22C55E" : score >= 70 ? "#F59E0B" : "#EF4444";

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={[S.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={S.backBtn} onPress={() => { haptic(); router.back(); }} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="#1A0B2E" />
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>Trip Companions</Text>
          <Text style={S.headerSub}>{destination} · {companions.length + 1} traveler{companions.length > 0 ? "s" : ""}</Text>
        </View>
        <TouchableOpacity style={S.shareBtn} onPress={handleShareLink} activeOpacity={0.8}>
          <LinearGradient colors={["rgba(100,67,244,0.4)", "rgba(249,68,152,0.3)"]} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="square.and.arrow.up" size={16} color="#1A0B2E" />
          <Text style={S.shareBtnText}>Invite</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={S.tabs}>
        {(["companions", "split"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[S.tab, activeTab === tab && S.tabActive]}
            onPress={() => { haptic(); setActiveTab(tab); }}
            activeOpacity={0.8}
          >
            {activeTab === tab && (
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            )}
            <Text style={[S.tabText, activeTab === tab && S.tabTextActive]}>
              {tab === "companions" ? "👥 Companions" : "💰 Cost Split"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.content}>

        {/* ── Companions Tab ─────────────────────────────────────────────── */}
        {activeTab === "companions" && (
          <>
            {/* Invite by email */}
            <View style={S.inviteCard}>
              <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.inviteTitle}>Invite by email</Text>
              <View style={S.inviteRow}>
                <TextInput
                  style={S.inviteInput}
                  placeholder="friend@email.com"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  value={emailInput}
                  onChangeText={setEmailInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="send"
                  onSubmitEditing={handleInvite}
                />
                <TouchableOpacity style={S.inviteBtn} onPress={handleInvite} activeOpacity={0.85}>
                  <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                  <Text style={S.inviteBtnText}>Send</Text>
                </TouchableOpacity>
              </View>
              <Animated.View style={[S.inviteSuccess, { opacity: successAnim, transform: [{ scale: successAnim }] }]}>
                <Text style={S.inviteSuccessText}>✅ Invite sent!</Text>
              </Animated.View>
              <TouchableOpacity style={S.shareLinkBtn} onPress={handleShareLink} activeOpacity={0.8}>
                <IconSymbol name="link" size={14} color="rgba(192,132,252,0.8)" />
                <Text style={S.shareLinkText}>Or share trip link</Text>
              </TouchableOpacity>
            </View>

            {/* You */}
            <Text style={S.sectionLabel}>On this trip</Text>
            <View style={S.companionCard}>
              <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.companionAvatar}>🧑</Text>
              <View style={S.companionInfo}>
                <Text style={S.companionName}>You</Text>
                <Text style={S.companionDna}>Trip Organizer</Text>
                <View style={S.companionCats}>
                  {["🏖️ Beaches", "🍜 Food", "🛍️ Shopping"].map((c) => (
                    <View key={c} style={S.catPill}><Text style={S.catPillText}>{c}</Text></View>
                  ))}
                </View>
              </View>
              <View style={S.organiserBadge}>
                <Text style={S.organiserBadgeText}>👑</Text>
              </View>
            </View>

            {companions.map((c) => (
              <View key={c.id} style={S.companionCard}>
                <LinearGradient
                  colors={c.status === "accepted" ? ["rgba(34,197,94,0.1)", "rgba(34,197,94,0.05)"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]}
                  style={StyleSheet.absoluteFillObject}
                />
                <Text style={S.companionAvatar}>{c.avatar}</Text>
                <View style={S.companionInfo}>
                  <View style={S.companionNameRow}>
                    <Text style={S.companionName}>{c.name}</Text>
                    <View style={[S.statusBadge, { backgroundColor: c.status === "accepted" ? "rgba(34,197,94,0.2)" : c.status === "pending" ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.2)" }]}>
                      <Text style={[S.statusText, { color: c.status === "accepted" ? "#22C55E" : c.status === "pending" ? "#F59E0B" : "#EF4444" }]}>
                        {c.status === "accepted" ? "✓ Joined" : c.status === "pending" ? "⏳ Pending" : "✗ Declined"}
                      </Text>
                    </View>
                  </View>
                  <Text style={S.companionDna}>{c.dnaType}</Text>
                  <View style={S.compatRow}>
                    <View style={[S.compatBar, { backgroundColor: compatibilityColor(c.compatibility) + "33" }]}>
                      <View style={[S.compatFill, { width: `${c.compatibility}%`, backgroundColor: compatibilityColor(c.compatibility) }]} />
                    </View>
                    <Text style={[S.compatScore, { color: compatibilityColor(c.compatibility) }]}>{c.compatibility}% match</Text>
                  </View>
                  <View style={S.companionCats}>
                    {c.topCategories.map((cat) => (
                      <View key={cat} style={S.catPill}><Text style={S.catPillText}>{cat}</Text></View>
                    ))}
                  </View>
                </View>
                <TouchableOpacity style={S.removeBtn} onPress={() => handleRemove(c.id)} activeOpacity={0.7}>
                  <IconSymbol name="xmark" size={12} color="rgba(255,255,255,0.06)" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {/* ── Cost Split Tab ─────────────────────────────────────────────── */}
        {activeTab === "split" && (
          <>
            <View style={S.splitHeader}>
              <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.splitTotal}>${totalCost.toLocaleString()}</Text>
              <Text style={S.splitSub}>Total trip cost</Text>
              <View style={S.splitDivider} />
              <Text style={S.splitPerPerson}>${perPerson}</Text>
              <Text style={S.splitPerPersonSub}>per person · {totalPeople} traveler{totalPeople > 1 ? "s" : ""}</Text>
            </View>

            <Text style={S.sectionLabel}>Breakdown</Text>
            {SPLIT_ITEMS.map((item) => {
              const perP = Math.ceil(item.total / totalPeople);
              return (
                <View key={item.label} style={S.splitItem}>
                  <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={StyleSheet.absoluteFillObject} />
                  <Text style={S.splitItemIcon}>{item.icon}</Text>
                  <View style={S.splitItemInfo}>
                    <Text style={S.splitItemLabel}>{item.label}</Text>
                    <Text style={S.splitItemTotal}>${item.total} total</Text>
                  </View>
                  <View style={S.splitItemRight}>
                    <Text style={S.splitItemPer}>${perP}</Text>
                    <Text style={S.splitItemPerLabel}>/ person</Text>
                  </View>
                </View>
              );
            })}

            <View style={S.splitNote}>
              <IconSymbol name="info.circle.fill" size={14} color="rgba(100,67,244,0.8)" />
              <Text style={S.splitNoteText}>
                Each companion pays their share directly through TRAVI. No awkward money conversations.
              </Text>
            </View>
          </>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[S.bottomCta, { paddingBottom: insets.bottom + 12 }]}>
        <LinearGradient colors={["rgba(13,6,40,0)", "rgba(13,6,40,0.98)"]} locations={[0, 0.25]} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity style={S.doneBtn} onPress={() => { haptic(Haptics.ImpactFeedbackStyle.Medium); router.replace("/(tabs)" as never); }} activeOpacity={0.88}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <Text style={S.doneBtnText}>Go to My Trip →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: 350, height: 350, borderRadius: 175, top: -100, right: -80, backgroundColor: "rgba(100,67,244,0.07)" },
  orb2: { position: "absolute", width: 250, height: 250, borderRadius: 125, bottom: 100, left: -60, backgroundColor: "rgba(249,68,152,0.05)" },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#1A0B2E", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 1 },
  shareBtn: { borderRadius: 14, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  shareBtnText: { color: "#1A0B2E", fontSize: 12, fontWeight: "700" },

  tabs: { flexDirection: "row", marginHorizontal: 16, marginBottom: 16, borderRadius: 14, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.06)", padding: 4, gap: 4 },
  tab: { flex: 1, borderRadius: 10, overflow: "hidden", paddingVertical: 10, alignItems: "center" },
  tabActive: {},
  tabText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#1A0B2E" },

  content: { paddingHorizontal: 16, gap: 12 },

  inviteCard: { borderRadius: 18, overflow: "hidden", padding: 16, gap: 10, borderWidth: 1, borderColor: "rgba(100,67,244,0.25)" },
  inviteTitle: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  inviteRow: { flexDirection: "row", gap: 8 },
  inviteInput: { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, color: "#1A0B2E", fontSize: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  inviteBtn: { borderRadius: 12, overflow: "hidden", paddingHorizontal: 18, justifyContent: "center" },
  inviteBtnText: { color: "#1A0B2E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  inviteSuccess: { alignItems: "center" },
  inviteSuccessText: { color: "#22C55E", fontSize: 14, fontWeight: "700" },
  shareLinkBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  shareLinkText: { color: "rgba(192,132,252,0.7)", fontSize: 13, fontWeight: "600" },

  sectionLabel: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase", marginTop: 4 },

  companionCard: { borderRadius: 18, overflow: "hidden", padding: 14, flexDirection: "row", alignItems: "flex-start", gap: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  companionAvatar: { fontSize: 36, lineHeight: 44 },
  companionInfo: { flex: 1, gap: 4 },
  companionNameRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  companionName: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  statusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: 11, fontWeight: "700" },
  companionDna: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  compatRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 },
  compatBar: { flex: 1, height: 4, borderRadius: 2, overflow: "hidden" },
  compatFill: { height: "100%", borderRadius: 2 },
  compatScore: { fontSize: 11, fontWeight: "700" },
  companionCats: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 4 },
  catPill: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  catPillText: { color: "rgba(255,255,255,0.5)", fontSize: 10 },
  organiserBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,215,0,0.15)", alignItems: "center", justifyContent: "center" },
  organiserBadgeText: { fontSize: 16 },
  removeBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },

  splitHeader: { borderRadius: 20, overflow: "hidden", padding: 20, alignItems: "center", gap: 4, borderWidth: 1, borderColor: "rgba(100,67,244,0.25)" },
  splitTotal: { color: "#1A0B2E", fontSize: 40, fontWeight: "900", fontFamily: "Chillax-Bold" },
  splitSub: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  splitDivider: { width: 40, height: 1, backgroundColor: "rgba(255,255,255,0.06)", marginVertical: 8 },
  splitPerPerson: { color: "#6443F4", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold" },
  splitPerPersonSub: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  splitItem: { borderRadius: 16, overflow: "hidden", padding: 14, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  splitItemIcon: { fontSize: 24, width: 36, textAlign: "center" },
  splitItemInfo: { flex: 1 },
  splitItemLabel: { color: "#1A0B2E", fontSize: 14, fontWeight: "700" },
  splitItemTotal: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  splitItemRight: { alignItems: "flex-end" },
  splitItemPer: { color: "#1A0B2E", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  splitItemPerLabel: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
  splitNote: { flexDirection: "row", gap: 8, backgroundColor: "rgba(100,67,244,0.1)", borderRadius: 14, padding: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)" },
  splitNoteText: { color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 18, flex: 1 },

  bottomCta: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 24 },
  doneBtn: { borderRadius: 20, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", paddingVertical: 18, alignItems: "center" },
  doneBtnText: { color: "#1A0B2E", fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
