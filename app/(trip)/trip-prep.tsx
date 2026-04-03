/**
 * TRAVI — Trip Preparation Hub
 * Pre-departure command center: weather, visa, services, packing, documents, checklist.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  category: "docs" | "health" | "tech" | "clothing" | "other";
}

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  cashback: string;
  price: string;
  color: string;
  booked: boolean;
}

// ─── Default Packing List ─────────────────────────────────────────────────────

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  // Documents
  { id: "d1", text: "Passport (valid 6+ months)", done: false, category: "docs" },
  { id: "d2", text: "Visa / entry permit", done: false, category: "docs" },
  { id: "d3", text: "Travel insurance certificate", done: false, category: "docs" },
  { id: "d4", text: "Flight confirmation printout", done: false, category: "docs" },
  { id: "d5", text: "Hotel booking confirmation", done: false, category: "docs" },
  { id: "d6", text: "Emergency contacts list", done: false, category: "docs" },
  // Health
  { id: "h1", text: "Prescription medications (30-day supply)", done: false, category: "health" },
  { id: "h2", text: "Travel first-aid kit", done: false, category: "health" },
  { id: "h3", text: "Sunscreen SPF 50+", done: false, category: "health" },
  { id: "h4", text: "Insect repellent", done: false, category: "health" },
  // Tech
  { id: "t1", text: "Phone charger + power bank", done: false, category: "tech" },
  { id: "t2", text: "Universal travel adapter", done: false, category: "tech" },
  { id: "t3", text: "eSIM / local SIM card", done: false, category: "tech" },
  { id: "t4", text: "Earphones / noise-cancelling headphones", done: false, category: "tech" },
  { id: "t5", text: "Camera / GoPro", done: false, category: "tech" },
  // Clothing
  { id: "c1", text: "Weather-appropriate clothing (7 days)", done: false, category: "clothing" },
  { id: "c2", text: "Comfortable walking shoes", done: false, category: "clothing" },
  { id: "c3", text: "Swimwear", done: false, category: "clothing" },
  { id: "c4", text: "Formal outfit (restaurants / events)", done: false, category: "clothing" },
  // Other
  { id: "o1", text: "Local currency (small bills)", done: false, category: "other" },
  { id: "o2", text: "Luggage locks", done: false, category: "other" },
  { id: "o3", text: "Reusable water bottle", done: false, category: "other" },
];

const SERVICES: ServiceItem[] = [
  { id: "insurance", icon: "🛡️", title: "Travel Insurance", subtitle: "Full coverage — medical, cancellation, luggage", cashback: "$12 back", price: "$65", color: "#10B981", booked: false },
  { id: "esim", icon: "📱", title: "UAE eSIM", subtitle: "10GB data, 30 days — no roaming fees", cashback: "$3 back", price: "$18", color: "#6443F4", booked: false },
  { id: "taxi", icon: "🚖", title: "Airport Transfer", subtitle: "Private taxi from DXB to your hotel", cashback: "$8 back", price: "$45", color: "#F59E0B", booked: false },
  { id: "currency", icon: "💱", title: "Currency Exchange", subtitle: "Best rate — delivered to your door", cashback: "$5 back", price: "0% fee", color: "#F94498", booked: false },
  { id: "lounge", icon: "🛋️", title: "Airport Lounge", subtitle: "Priority Pass — unlimited access", cashback: "$10 back", price: "$35", color: "#8B5CF6", booked: false },
  { id: "fasttrack", icon: "⚡", title: "Fast Track Security", subtitle: "Skip the queue at DXB Terminal 3", cashback: "$4 back", price: "$22", color: "#0EA5E9", booked: false },
];

const VISA_INFO: Record<string, { status: string; color: string; note: string }> = {
  "Dubai": { status: "Visa on Arrival", color: "#22C55E", note: "Israeli passport holders receive free 30-day visa on arrival at DXB." },
  "Tokyo": { status: "Visa Required", color: "#F59E0B", note: "Apply for Japanese tourist visa at least 2 weeks before departure." },
  "Paris": { status: "No Visa Required", color: "#22C55E", note: "EU Schengen area — free entry for up to 90 days." },
  "Maldives": { status: "Visa on Arrival", color: "#22C55E", note: "Free 30-day tourist visa on arrival. Return ticket required." },
  "New York": { status: "ESTA Required", color: "#F59E0B", note: "Apply for ESTA online at least 72 hours before travel. $21 fee." },
  "Barcelona": { status: "No Visa Required", color: "#22C55E", note: "EU Schengen area — free entry for up to 90 days." },
  "Bali": { status: "Visa on Arrival", color: "#22C55E", note: "Free 30-day visa on arrival. Extendable once for 30 more days." },
};

const CATEGORY_COLORS: Record<ChecklistItem["category"], string> = {
  docs: "#6443F4",
  health: "#10B981",
  tech: "#0EA5E9",
  clothing: "#F94498",
  other: "#F59E0B",
};

const CATEGORY_ICONS: Record<ChecklistItem["category"], string> = {
  docs: "📄",
  health: "💊",
  tech: "💻",
  clothing: "👕",
  other: "📦",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TripPrepScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ destination?: string }>();
  const destination = params.destination ?? "Dubai";

  const [activeTab, setActiveTab] = useState<"checklist" | "services" | "visa">("checklist");
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES);
  const [newItemText, setNewItemText] = useState("");
  const [filterCat, setFilterCat] = useState<ChecklistItem["category"] | "all">("all");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const visaInfo = VISA_INFO[destination] ?? { status: "Check Requirements", color: "#F59E0B", note: "Please verify visa requirements for your passport at the embassy website." };
  const doneCount = checklist.filter((i) => i.done).length;
  const totalCount = checklist.length;
  const progress = totalCount > 0 ? doneCount / totalCount : 0;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    loadChecklist();
  }, []);

  const loadChecklist = async () => {
    try {
      const saved = await AsyncStorage.getItem(`@travi_checklist_${destination}`);
      if (saved) setChecklist(JSON.parse(saved));
    } catch {}
  };

  const saveChecklist = async (updated: ChecklistItem[]) => {
    try {
      await AsyncStorage.setItem(`@travi_checklist_${destination}`, JSON.stringify(updated));
    } catch {}
  };

  const toggleItem = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = checklist.map((item) => item.id === id ? { ...item, done: !item.done } : item);
    setChecklist(updated);
    saveChecklist(updated);
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newItem: ChecklistItem = {
      id: `custom_${Date.now()}`,
      text: newItemText.trim(),
      done: false,
      category: "other",
    };
    const updated = [...checklist, newItem];
    setChecklist(updated);
    saveChecklist(updated);
    setNewItemText("");
  };

  const toggleService = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, booked: !s.booked } : s));
  };

  const TABS = [
    { id: "checklist" as const, label: "Checklist", icon: "✅" },
    { id: "services" as const, label: "Services", icon: "🛒" },
    { id: "visa" as const, label: "Visa & Docs", icon: "📋" },
  ];

  const CATEGORIES: Array<{ id: ChecklistItem["category"] | "all"; label: string }> = [
    { id: "all", label: "All" },
    { id: "docs", label: "📄 Docs" },
    { id: "health", label: "💊 Health" },
    { id: "tech", label: "💻 Tech" },
    { id: "clothing", label: "👕 Clothes" },
    { id: "other", label: "📦 Other" },
  ];

  const filteredChecklist = filterCat === "all" ? checklist : checklist.filter((i) => i.category === filterCat);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background gradient */}
      <LinearGradient colors={["#0D0628", "#0D1B2A", "#0D0628"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>🎒 Prepare for {destination}</Text>
          <Text style={styles.headerSub}>{doneCount}/{totalCount} items ready</Text>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
              {tab.icon} {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* ── CHECKLIST TAB ── */}
          {activeTab === "checklist" && (
            <>
              {/* Category filter */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catScrollContent}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.catChip, filterCat === cat.id && styles.catChipActive]}
                    onPress={() => setFilterCat(cat.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.catChipText, filterCat === cat.id && styles.catChipTextActive]}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Add custom item */}
              <View style={styles.addItemRow}>
                <TextInput
                  style={styles.addItemInput}
                  placeholder="Add custom item..."
                  placeholderTextColor="rgba(255,255,255,0.55)"
                  value={newItemText}
                  onChangeText={setNewItemText}
                  onSubmitEditing={addItem}
                  returnKeyType="done"
                />
                <TouchableOpacity style={styles.addItemBtn} onPress={addItem} activeOpacity={0.8}>
                  <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.addItemBtnGrad}>
                    <Text style={styles.addItemBtnText}>+</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Checklist items */}
              {filteredChecklist.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.checkItem, item.done && styles.checkItemDone]}
                  onPress={() => toggleItem(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkBox, item.done && { backgroundColor: CATEGORY_COLORS[item.category], borderColor: CATEGORY_COLORS[item.category] }]}>
                    {item.done && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                  <View style={styles.checkItemContent}>
                    <Text style={[styles.checkItemText, item.done && styles.checkItemTextDone]}>{item.text}</Text>
                    <View style={[styles.catTag, { backgroundColor: CATEGORY_COLORS[item.category] + "22" }]}>
                      <Text style={[styles.catTagText, { color: CATEGORY_COLORS[item.category] }]}>
                        {CATEGORY_ICONS[item.category]} {item.category}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              {/* Done message */}
              {doneCount === totalCount && totalCount > 0 && (
                <View style={styles.allDoneCard}>
                  <Text style={styles.allDoneEmoji}>🎉</Text>
                  <Text style={styles.allDoneTitle}>You're ready to go!</Text>
                  <Text style={styles.allDoneSub}>All items packed. Have an amazing trip to {destination}!</Text>
                </View>
              )}
            </>
          )}

          {/* ── SERVICES TAB ── */}
          {activeTab === "services" && (
            <>
              <Text style={styles.sectionTitle}>Pre-Trip Services</Text>
              <Text style={styles.sectionSub}>Book these essentials and earn cashback on every purchase.</Text>
              {services.map((service) => (
                <View key={service.id} style={styles.serviceCard}>
                  <View style={[styles.serviceIconWrap, { backgroundColor: service.color + "22" }]}>
                    <Text style={styles.serviceIcon}>{service.icon}</Text>
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.serviceSub}>{service.subtitle}</Text>
                    <View style={styles.serviceMeta}>
                      <Text style={styles.servicePrice}>{service.price}</Text>
                      <View style={styles.cashbackBadge}>
                        <Text style={styles.cashbackText}>💰 {service.cashback}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.bookBtn, service.booked && styles.bookBtnDone]}
                    onPress={() => toggleService(service.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.bookBtnText}>{service.booked ? "✓" : "Add"}</Text>
                  </TouchableOpacity>
                </View>
              ))}

              {/* Total cashback */}
              {services.some((s) => s.booked) && (
                <View style={styles.totalCashbackCard}>
                  <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.15)"]} style={StyleSheet.absoluteFillObject} />
                  <Text style={styles.totalCashbackLabel}>Total Cashback Earned</Text>
                  <Text style={styles.totalCashbackAmount}>
                    ${services.filter((s) => s.booked).reduce((sum, s) => sum + parseInt(s.cashback.replace(/\D/g, ""), 10), 0)} back
                  </Text>
                </View>
              )}
            </>
          )}

          {/* ── VISA & DOCS TAB ── */}
          {activeTab === "visa" && (
            <>
              {/* Visa status card */}
              <View style={[styles.visaCard, { borderColor: visaInfo.color + "44" }]}>
                <LinearGradient colors={[visaInfo.color + "15", "transparent"]} style={StyleSheet.absoluteFillObject} />
                <View style={styles.visaHeader}>
                  <Text style={styles.visaFlag}>🛂</Text>
                  <View style={styles.visaHeaderText}>
                    <Text style={styles.visaDestination}>{destination}</Text>
                    <View style={[styles.visaStatusBadge, { backgroundColor: visaInfo.color + "22" }]}>
                      <View style={[styles.visaStatusDot, { backgroundColor: visaInfo.color }]} />
                      <Text style={[styles.visaStatusText, { color: visaInfo.color }]}>{visaInfo.status}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.visaNote}>{visaInfo.note}</Text>
              </View>

              {/* Document checklist */}
              <Text style={styles.sectionTitle}>Required Documents</Text>
              {[
                { icon: "📘", title: "Passport", note: "Valid for 6+ months beyond travel dates", required: true },
                { icon: "🛂", title: "Visa / Entry Permit", note: visaInfo.status, required: visaInfo.status !== "No Visa Required" },
                { icon: "🛡️", title: "Travel Insurance", note: "Recommended — covers medical emergencies", required: false },
                { icon: "✈️", title: "Flight Confirmation", note: "E-ticket or printout", required: true },
                { icon: "🏨", title: "Hotel Booking", note: "Confirmation email or printout", required: true },
                { icon: "💳", title: "International Credit Card", note: "Notify your bank before travel", required: false },
              ].map((doc, i) => (
                <View key={i} style={styles.docItem}>
                  <Text style={styles.docIcon}>{doc.icon}</Text>
                  <View style={styles.docInfo}>
                    <View style={styles.docTitleRow}>
                      <Text style={styles.docTitle}>{doc.title}</Text>
                      {doc.required && (
                        <View style={styles.requiredBadge}>
                          <Text style={styles.requiredText}>Required</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.docNote}>{doc.note}</Text>
                  </View>
                </View>
              ))}

              {/* Emergency contacts */}
              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Emergency Numbers in {destination}</Text>
              {[
                { label: "Police", number: destination === "Dubai" ? "999" : "112" },
                { label: "Ambulance", number: destination === "Dubai" ? "998" : "112" },
                { label: "Tourist Police", number: destination === "Dubai" ? "+971 800 4673" : "N/A" },
                { label: "Israeli Embassy", number: destination === "Dubai" ? "+971 4 XXX XXXX" : "+XX XXX XXXX" },
              ].map((contact, i) => (
                <View key={i} style={styles.emergencyItem}>
                  <Text style={styles.emergencyLabel}>{contact.label}</Text>
                  <Text style={styles.emergencyNumber}>{contact.number}</Text>
                </View>
              ))}
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: 300, height: 300, borderRadius: 150, backgroundColor: "rgba(100,67,244,0.08)", top: -80, left: -80 },
  orb2: { position: "absolute", width: 250, height: 250, borderRadius: 125, backgroundColor: "rgba(249,68,152,0.06)", bottom: 100, right: -60 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  progressCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(100,67,244,0.2)", borderWidth: 2, borderColor: "#6443F4", alignItems: "center", justifyContent: "center" },
  progressPct: { color: "#6443F4", fontSize: 11, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
  progressBar: { height: 3, backgroundColor: "rgba(255,255,255,0.55)", marginHorizontal: 20 },
  progressFill: { height: "100%", backgroundColor: "#6443F4", borderRadius: 2 },
  tabs: { flexDirection: "row", marginHorizontal: 20, marginTop: 16, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 14, padding: 4 },
  tab: { flex: 1, paddingVertical: 9, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "rgba(100,67,244,0.3)" },
  tabText: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "700" },
  tabTextActive: { color: "#FFFFFF" },
  content: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  // Checklist
  catScroll: { marginBottom: 12 },
  catScrollContent: { gap: 8, paddingRight: 20 },
  catChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.55)", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  catChipActive: { backgroundColor: "rgba(100,67,244,0.3)", borderColor: "#6443F4" },
  catChipText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  catChipTextActive: { color: "#FFFFFF" },
  addItemRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  addItemInput: { flex: 1, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: "#FFFFFF", fontSize: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  addItemBtn: { width: 46, height: 46, borderRadius: 12, overflow: "hidden" },
  addItemBtnGrad: { flex: 1, alignItems: "center", justifyContent: "center" },
  addItemBtnText: { color: "#FFFFFF", fontSize: 24, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  checkItem: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  checkItemDone: { opacity: 0.5 },
  checkBox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center", marginTop: 1 },
  checkMark: { color: "#FFFFFF", fontSize: 12, fontWeight: "900", fontFamily: "Chillax-Bold" },
  checkItemContent: { flex: 1, gap: 4 },
  checkItemText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", lineHeight: 20 },
  checkItemTextDone: { textDecorationLine: "line-through", color: "rgba(255,255,255,0.5)" },
  catTag: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  catTagText: { fontSize: 11, fontWeight: "700" },
  allDoneCard: { alignItems: "center", paddingVertical: 32, gap: 8 },
  allDoneEmoji: { fontSize: 48 },
  allDoneTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  allDoneSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center" },
  // Services
  sectionTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", marginBottom: 6, fontFamily: "Chillax-Bold" },
  sectionSub: { color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 16, lineHeight: 18 },
  serviceCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  serviceIconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  serviceIcon: { fontSize: 24 },
  serviceInfo: { flex: 1, gap: 3 },
  serviceTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  serviceSub: { color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 16 },
  serviceMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 },
  servicePrice: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "700" },
  cashbackBadge: { backgroundColor: "rgba(34,197,94,0.15)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  cashbackText: { color: "#22C55E", fontSize: 11, fontWeight: "700" },
  bookBtn: { backgroundColor: "rgba(100,67,244,0.3)", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: "#6443F4" },
  bookBtnDone: { backgroundColor: "rgba(34,197,94,0.2)", borderColor: "#22C55E" },
  bookBtnText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  totalCashbackCard: { borderRadius: 18, overflow: "hidden", padding: 20, alignItems: "center", marginTop: 8, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  totalCashbackLabel: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "700" },
  totalCashbackAmount: { color: "#22C55E", fontSize: 28, fontWeight: "900", marginTop: 4, fontFamily: "Chillax-Bold" },
  // Visa
  visaCard: { borderRadius: 18, overflow: "hidden", padding: 18, marginBottom: 20, borderWidth: 1.5 },
  visaHeader: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12 },
  visaFlag: { fontSize: 36 },
  visaHeaderText: { flex: 1, gap: 6 },
  visaDestination: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  visaStatusBadge: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  visaStatusDot: { width: 7, height: 7, borderRadius: 3.5 },
  visaStatusText: { fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  visaNote: { color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 20 },
  docItem: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.55)" },
  docIcon: { fontSize: 24, marginTop: 2 },
  docInfo: { flex: 1, gap: 4 },
  docTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  docTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  requiredBadge: { backgroundColor: "rgba(239,68,68,0.2)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  requiredText: { color: "#EF4444", fontSize: 10, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  docNote: { color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 18 },
  emergencyItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.55)" },
  emergencyLabel: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600" },
  emergencyNumber: { color: "#6443F4", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
