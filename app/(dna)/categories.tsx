/**
 * Quick DNA — Categories Screen — Neutral Wireframe
 * Spec: Step 1/4. 8 category cards (2 columns), multi-select,
 *       Continue button shows count, Skip option.
 */
import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const N = {
  bg:       "#111111",
  surface:  "#1A1A1A",
  white:    "#FFFFFF",
  textSec:  "#ABABAB",
  textTer:  "#777777",
  accent:   "#007AFF",
  border:   "#333333",
  disabled: "#444444",
  selected: "rgba(0,122,255,0.12)",
};

type Category = {
  id: string;
  label: string;
  icon: "safari.fill" | "fork.knife" | "building.columns.fill" | "figure.climbing" | "crown.fill" | "person.3.fill" | "leaf.fill" | "bolt.fill";
};

const CATEGORIES: Category[] = [
  { id: "explorer",    label: "Explorer",    icon: "safari.fill" },
  { id: "foodie",      label: "Foodie",      icon: "fork.knife" },
  { id: "culture",     label: "Culture",     icon: "building.columns.fill" },
  { id: "adventure",   label: "Adventure",   icon: "figure.climbing" },
  { id: "luxury",      label: "Luxury",      icon: "crown.fill" },
  { id: "social",      label: "Social",      icon: "person.3.fill" },
  { id: "nature",      label: "Nature",      icon: "leaf.fill" },
  { id: "spontaneous", label: "Spontaneous", icon: "bolt.fill" },
];

export default function CategoriesScreen() {
  const { dispatch } = useStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [showExitModal, setShowExitModal] = useState(false);

  const toggleCategory = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { activityCategories: selected as any },
    });
    router.push({
      pathname: "/(dna)/quick-swipe" as never,
      params: { categories: selected.join(",") },
    } as never);
  };

  const handleSkip = () => {
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });
    router.replace("/(tabs)" as never);
  };

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top", "bottom"]} style={s.safe}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity style={s.backBtn} onPress={() => setShowExitModal(true)} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={20} color={N.textSec} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Step 1 of 4</Text>
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
            <Text style={s.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Progress bar */}
        <View style={s.progressBg}>
          <View style={[s.progressFill, { width: "25%" }]} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <Text style={s.title}>What drives your travels?</Text>
          <Text style={s.subtitle}>Select all that apply</Text>
          <Text style={s.hint}>Select 3-5 for best results</Text>

          {/* Category grid */}
          <View style={s.grid}>
            {CATEGORIES.map((cat) => {
              const isSelected = selected.includes(cat.id);
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[s.card, isSelected && s.cardSelected]}
                  onPress={() => toggleCategory(cat.id)}
                  activeOpacity={0.7}
                >
                  <View style={s.cardHeader}>
                    <IconSymbol name={cat.icon} size={28} color={isSelected ? N.accent : N.textSec} />
                    {isSelected && (
                      <IconSymbol name="checkmark.circle.fill" size={20} color={N.accent} />
                    )}
                  </View>
                  <Text style={[s.cardLabel, isSelected && s.cardLabelSelected]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Fixed bottom */}
        <View style={s.bottomBar}>
          <TouchableOpacity
            style={[s.continueBtn, selected.length === 0 && s.continueBtnDisabled]}
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={selected.length === 0}
          >
            <Text style={[s.continueText, selected.length === 0 && s.continueTextDim]}>
              {selected.length > 0 ? `Continue (${selected.length} selected)` : "Select at least 1"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Exit modal */}
        <Modal visible={showExitModal} transparent animationType="fade">
          <View style={s.modalOverlay}>
            <View style={s.modalContent}>
              <Text style={s.modalTitle}>Exit DNA Setup?</Text>
              <Text style={s.modalMessage}>Your progress will be lost.</Text>
              <View style={s.modalActions}>
                <TouchableOpacity style={s.modalCancel} onPress={() => setShowExitModal(false)} activeOpacity={0.7}>
                  <Text style={s.modalCancelText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.modalConfirm} onPress={() => { setShowExitModal(false); router.back(); }} activeOpacity={0.8}>
                  <Text style={s.modalConfirmText}>Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },
  safe: { flex: 1 },

  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 15, fontWeight: "600", color: N.textSec },
  skipText: { fontSize: 14, fontWeight: "500", color: N.textTer },

  progressBg: { height: 4, backgroundColor: N.surface, marginHorizontal: 20 },
  progressFill: { height: 4, backgroundColor: N.accent, borderRadius: 2 },

  scroll: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 120 },

  title: { fontSize: 28, fontWeight: "800", color: N.white, letterSpacing: -0.5, marginBottom: 8 },
  subtitle: { fontSize: 16, color: N.textSec, marginBottom: 4 },
  hint: { fontSize: 13, color: N.textTer, marginBottom: 28 },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "47%",
    aspectRatio: 1.1,
    backgroundColor: N.surface,
    borderWidth: 1, borderColor: N.border,
    borderRadius: 16, padding: 16,
    justifyContent: "space-between",
  },
  cardSelected: { borderColor: N.accent, borderWidth: 2, backgroundColor: N.selected },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardLabel: { fontSize: 16, fontWeight: "700", color: N.white },
  cardLabelSelected: { color: N.accent },

  bottomBar: {
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20,
    borderTopWidth: 1, borderTopColor: N.border, backgroundColor: N.bg,
  },
  continueBtn: {
    height: 56, borderRadius: 28, backgroundColor: N.accent,
    justifyContent: "center", alignItems: "center",
  },
  continueBtnDisabled: { backgroundColor: N.disabled },
  continueText: { fontSize: 16, fontWeight: "700", color: N.white },
  continueTextDim: { color: N.textTer },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center", alignItems: "center", padding: 32,
  },
  modalContent: { width: "100%", backgroundColor: N.surface, borderRadius: 20, padding: 24 },
  modalTitle: { fontSize: 20, fontWeight: "700", color: N.white, textAlign: "center", marginBottom: 8 },
  modalMessage: { fontSize: 15, color: N.textSec, textAlign: "center", marginBottom: 24 },
  modalActions: { flexDirection: "row", gap: 12 },
  modalCancel: {
    flex: 1, height: 48, borderRadius: 24,
    backgroundColor: N.bg, borderWidth: 1, borderColor: N.border,
    justifyContent: "center", alignItems: "center",
  },
  modalCancelText: { color: N.textSec, fontSize: 15, fontWeight: "600" },
  modalConfirm: {
    flex: 1, height: 48, borderRadius: 24, backgroundColor: "#FF6B6B",
    justifyContent: "center", alignItems: "center",
  },
  modalConfirmText: { color: N.white, fontSize: 15, fontWeight: "700" },
});
