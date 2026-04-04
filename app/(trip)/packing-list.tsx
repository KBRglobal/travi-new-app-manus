import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SectionList,
  TextInput, Platform, Dimensions
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
interface PackItem {
  id: string;
  label: string;
  checked: boolean;
  essential: boolean;
}

interface PackSection {
  title: string;
  icon: string;
  color: string;
  data: PackItem[];
}

// ─── Smart Pack Generator ─────────────────────────────────────────────────────
function generatePackingList(destination: string, activities: string[]): PackSection[] {
  const isBeach = activities.includes("Beaches") || destination.toLowerCase().includes("bali") || destination.toLowerCase().includes("maldives");
  const isCold = destination.toLowerCase().includes("iceland") || destination.toLowerCase().includes("norway");
  const isCultural = activities.includes("Culture") || activities.includes("Museums");
  const isAdventure = activities.includes("Hiking") || activities.includes("Adventure");

  return [
    {
      title: "Essentials",
      icon: "⭐",
      color: "#F59E0B",
      data: [
        { id: "e1", label: "Passport & ID", checked: false, essential: true },
        { id: "e2", label: "Travel insurance docs", checked: false, essential: true },
        { id: "e3", label: "Flight & hotel confirmations", checked: false, essential: true },
        { id: "e4", label: "Credit cards & cash", checked: false, essential: true },
        { id: "e5", label: "Phone charger & adapter", checked: false, essential: true },
        { id: "e6", label: "Medications", checked: false, essential: true },
      ],
    },
    {
      title: "Clothing",
      icon: "👕",
      color: "#6443F4",
      data: [
        { id: "c1", label: `${isCold ? "Heavy jacket & thermals" : "Light jacket / layer"}`, checked: false, essential: false },
        { id: "c2", label: `${isBeach ? "Swimwear (2-3 sets)" : "Comfortable walking shoes"}`, checked: false, essential: false },
        { id: "c3", label: isCultural ? "Smart casual outfit (temples/churches)" : "Casual outfits", checked: false, essential: false },
        { id: "c4", label: "Underwear & socks (7 days)", checked: false, essential: false },
        { id: "c5", label: isAdventure ? "Hiking boots & moisture-wicking shirts" : "Comfortable sneakers", checked: false, essential: false },
        { id: "c6", label: "Sunglasses", checked: false, essential: false },
      ],
    },
    {
      title: "Toiletries",
      icon: "🧴",
      color: "#F94498",
      data: [
        { id: "t1", label: "Toothbrush & toothpaste", checked: false, essential: true },
        { id: "t2", label: isBeach ? "SPF 50+ sunscreen" : "Sunscreen SPF 30", checked: false, essential: false },
        { id: "t3", label: "Shampoo & conditioner", checked: false, essential: false },
        { id: "t4", label: "Deodorant", checked: false, essential: false },
        { id: "t5", label: "Face wash & moisturizer", checked: false, essential: false },
        { id: "t6", label: isAdventure ? "Insect repellent" : "Hand sanitizer", checked: false, essential: false },
      ],
    },
    {
      title: "Tech & Gadgets",
      icon: "📱",
      color: "#3B82F6",
      data: [
        { id: "g1", label: "Power bank (20,000mAh)", checked: false, essential: false },
        { id: "g2", label: "Universal travel adapter", checked: false, essential: false },
        { id: "g3", label: "Earphones / AirPods", checked: false, essential: false },
        { id: "g4", label: "Camera & memory cards", checked: false, essential: false },
        { id: "g5", label: "Laptop / tablet (if needed)", checked: false, essential: false },
      ],
    },
    ...(isBeach ? [{
      title: "Beach Essentials",
      icon: "🏖️",
      color: "#06B6D4",
      data: [
        { id: "b1", label: "Beach towel", checked: false, essential: false },
        { id: "b2", label: "Waterproof bag", checked: false, essential: false },
        { id: "b3", label: "Snorkeling gear", checked: false, essential: false },
        { id: "b4", label: "Flip flops / sandals", checked: false, essential: false },
      ],
    }] : []),
    ...(isAdventure ? [{
      title: "Adventure Gear",
      icon: "🧗",
      color: "#10B981",
      data: [
        { id: "a1", label: "Daypack / backpack", checked: false, essential: false },
        { id: "a2", label: "Water bottle (1L+)", checked: false, essential: false },
        { id: "a3", label: "First aid kit", checked: false, essential: false },
        { id: "a4", label: "Trekking poles", checked: false, essential: false },
      ],
    }] : []),
  ];
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function PackingListScreen() {
  const insets = useSafeAreaInsets();
  const { destination = "Tokyo", activities = "Culture,Food" } = useLocalSearchParams<{ destination: string; activities: string }>();
  const activityList = (activities as string).split(",");

  const [sections, setSections] = useState<PackSection[]>(() => generatePackingList(destination as string, activityList));
  const [newItem, setNewItem] = useState("");
  const [addingToSection, setAddingToSection] = useState<string | null>(null);

  const totalItems = sections.reduce((s, sec) => s + sec.data.length, 0);
  const checkedItems = sections.reduce((s, sec) => s + sec.data.filter((i) => i.checked).length, 0);
  const progress = totalItems > 0 ? checkedItems / totalItems : 0;

  const toggleItem = (sectionTitle: string, itemId: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSections((prev) =>
      prev.map((sec) =>
        sec.title === sectionTitle
          ? { ...sec, data: sec.data.map((item) => item.id === itemId ? { ...item, checked: !item.checked } : item) }
          : sec
      )
    );
  };

  const addItem = (sectionTitle: string) => {
    if (!newItem.trim()) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSections((prev) =>
      prev.map((sec) =>
        sec.title === sectionTitle
          ? { ...sec, data: [...sec.data, { id: Date.now().toString(), label: newItem.trim(), checked: false, essential: false }] }
          : sec
      )
    );
    setNewItem("");
    setAddingToSection(null);
  };

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D1B2A", "#0D1B2A"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={S.headerTitle}>Packing List</Text>
          <Text style={S.headerSub}>{destination as string} · {activityList.join(", ")}</Text>
        </View>
        <Text style={S.headerCount}>{checkedItems}/{totalItems}</Text>
      </View>

      {/* Progress Bar */}
      <View style={S.progressWrap}>
        <View style={S.progressTrack}>
          <LinearGradient
            colors={["#6443F4", "#F94498"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[S.progressFill, { width: `${Math.round(progress * 100)}%` }]}
          />
        </View>
        <Text style={S.progressLabel}>{Math.round(progress * 100)}% packed</Text>
      </View>

      {/* List */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 130 }}
        renderSectionHeader={({ section }) => (
          <View style={S.sectionHeader}>
            <Text style={S.sectionIcon}>{section.icon}</Text>
            <Text style={[S.sectionTitle, { color: section.color }]}>{section.title}</Text>
            <TouchableOpacity
              style={S.addToSectionBtn}
              onPress={() => setAddingToSection(addingToSection === section.title ? null : section.title)}
              activeOpacity={0.8}
            >
              <IconSymbol name="plus" size={14} color={section.color} />
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item, section }) => (
          <View>
            <TouchableOpacity
              style={S.itemRow}
              onPress={() => toggleItem(section.title, item.id)}
              activeOpacity={0.8}
            >
              <View style={[S.checkbox, item.checked && S.checkboxChecked, { borderColor: item.checked ? section.color : "rgba(255,255,255,0.06)" }]}>
                {item.checked && <IconSymbol name="checkmark" size={12} color="#FFF" />}
              </View>
              <Text style={[S.itemLabel, item.checked && S.itemLabelChecked]}>{item.label}</Text>
              {item.essential && !item.checked && (
                <View style={S.essentialBadge}>
                  <Text style={S.essentialText}>Must</Text>
                </View>
              )}
            </TouchableOpacity>

            {addingToSection === section.title && section.data[section.data.length - 1].id === item.id && (
              <View style={S.addItemRow}>
                <TextInput
                  style={S.addItemInput}
                  placeholder="Add item..."
                  placeholderTextColor="#5A4D72"
                  value={newItem}
                  onChangeText={setNewItem}
                  onSubmitEditing={() => addItem(section.title)}
                  returnKeyType="done"
                  autoFocus
                />
                <TouchableOpacity style={[S.addItemBtn, { backgroundColor: section.color }]} onPress={() => addItem(section.title)} activeOpacity={0.8}>
                  <IconSymbol name="plus" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1B2A" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, paddingTop: 4, gap: 8 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "#5A4D72", fontSize: 12 },
  headerCount: { color: "#9BA1A6", fontSize: 14, fontWeight: "700" },

  progressWrap: { paddingHorizontal: 16, paddingBottom: 130, gap: 6 },
  progressTrack: { height: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  progressLabel: { color: "#9BA1A6", fontSize: 12 },

  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 14, paddingTop: 20 },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { fontSize: 14, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.5, flex: 1, fontFamily: "Chillax-Bold" },
  addToSectionBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },

  itemRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.12)" },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, alignItems: "center", justifyContent: "center" },
  checkboxChecked: { backgroundColor: "#6443F4", borderColor: "#6443F4" },
  itemLabel: { color: "#FFF", fontSize: 14, flex: 1 },
  itemLabelChecked: { color: "#5A4D72", textDecorationLine: "line-through" },
  essentialBadge: { backgroundColor: "rgba(245,158,11,0.15)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: "rgba(245,158,11,0.3)" },
  essentialText: { color: "#F59E0B", fontSize: 10, fontWeight: "700" },

  addItemRow: { flexDirection: "row", gap: 8, paddingVertical: 8 },
  addItemInput: { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 10, color: "#FFF", fontSize: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  addItemBtn: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
});
