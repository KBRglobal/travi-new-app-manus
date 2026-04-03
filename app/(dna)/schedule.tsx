/**
 * Quick DNA — Schedule Screen — Neutral Wireframe
 * Spec: Step 3/4. Single-select radio: travel timeline.
 *       4 options, Continue when selected.
 */
import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
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

type ScheduleOption = {
  id: string;
  label: string;
  icon: "calendar" | "clock.fill" | "clock" | "safari.fill";
};

const OPTIONS: ScheduleOption[] = [
  { id: "now",       label: "I'm planning now",  icon: "calendar" },
  { id: "1-3months", label: "In 1-3 months",     icon: "clock.fill" },
  { id: "3-6months", label: "In 3-6 months",     icon: "clock" },
  { id: "browsing",  label: "Just browsing",      icon: "safari.fill" },
];

export default function ScheduleScreen() {
  const { dispatch } = useStore();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    // Save timeline preference
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { tripPace: selected === "now" ? "full" : selected === "browsing" ? "slow" : "balanced" },
    });
    router.push("/(dna)/summary" as never);
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
          <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={20} color={N.textSec} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Step 3 of 4</Text>
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
            <Text style={s.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Progress bar */}
        <View style={s.progressBg}>
          <View style={[s.progressFill, { width: "75%" }]} />
        </View>

        <View style={s.content}>
          <Text style={s.title}>When do you usually travel?</Text>
          <Text style={s.subtitle}>This helps us time recommendations</Text>

          <View style={s.optionsList}>
            {OPTIONS.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[s.optionCard, isSelected && s.optionCardSelected]}
                  onPress={() => setSelected(opt.id)}
                  activeOpacity={0.7}
                >
                  <View style={s.optionLeft}>
                    <IconSymbol name={opt.icon} size={22} color={isSelected ? N.accent : N.textSec} />
                    <Text style={[s.optionLabel, isSelected && s.optionLabelSelected]}>
                      {opt.label}
                    </Text>
                  </View>
                  <View style={[s.radio, isSelected && s.radioSelected]}>
                    {isSelected && <View style={s.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Fixed bottom */}
        <View style={s.bottomBar}>
          <TouchableOpacity
            style={[s.continueBtn, !selected && s.continueBtnDisabled]}
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={!selected}
          >
            <Text style={[s.continueText, !selected && s.continueTextDim]}>Continue</Text>
          </TouchableOpacity>
        </View>
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

  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },

  title: { fontSize: 28, fontWeight: "800", color: N.white, letterSpacing: -0.5, marginBottom: 8 },
  subtitle: { fontSize: 16, color: N.textSec, marginBottom: 32 },

  optionsList: { gap: 12 },
  optionCard: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    height: 64, borderRadius: 16,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    paddingHorizontal: 20,
  },
  optionCardSelected: { borderColor: N.accent, borderWidth: 2, backgroundColor: N.selected },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  optionLabel: { fontSize: 16, fontWeight: "600", color: N.white },
  optionLabelSelected: { color: N.accent },

  radio: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: N.textTer,
    alignItems: "center", justifyContent: "center",
  },
  radioSelected: { borderColor: N.accent },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: N.accent },

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
});
