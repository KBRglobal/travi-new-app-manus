import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { Brand, Gradients, Text as DS, Border, Typography, Radius, Spacing } from "@/lib/design-system";

type AvatarOption = {
  id: string;
  iconName: "flame.fill" | "bolt.fill" | "leaf.fill" | "mountain.2.fill" | "globe" | "star.fill" | "heart.fill" | "moon.fill" | "sun.max.fill" | "sparkles" | "crown.fill" | "trophy.fill";
  color: string;
  label: string;
};

const AVATARS: AvatarOption[] = [
  { id: "fire",     iconName: "flame.fill",      color: "#FF5722", label: "Fire" },
  { id: "bolt",     iconName: "bolt.fill",        color: "#FFD700", label: "Bolt" },
  { id: "leaf",     iconName: "leaf.fill",        color: "#4CAF50", label: "Nature" },
  { id: "mountain", iconName: "mountain.2.fill",  color: "#78909C", label: "Explorer" },
  { id: "globe",    iconName: "globe",            color: "#2196F3", label: "Globetrotter" },
  { id: "star",     iconName: "star.fill",        color: "#FFC107", label: "Star" },
  { id: "heart",    iconName: "heart.fill",       color: "#F94498", label: "Romantic" },
  { id: "moon",     iconName: "moon.fill",        color: "#9C27B0", label: "Night Owl" },
  { id: "sun",      iconName: "sun.max.fill",     color: "#FF9800", label: "Sunny" },
  { id: "sparkles", iconName: "sparkles",         color: "#00BCD4", label: "Dreamer" },
  { id: "crown",    iconName: "crown.fill",       color: "#FFD700", label: "Elite" },
  { id: "trophy",   iconName: "trophy.fill",      color: "#FF9800", label: "Champion" },
];

export default function ProfileSetupScreen() {
  const { state, dispatch } = useStore();
  const [name, setName] = useState(state.profile?.name || "");
  const [selectedAvatarId, setSelectedAvatarId] = useState(AVATARS[0].id);
  const [nameFocused, setNameFocused] = useState(false);

  const selectedAvatar = AVATARS.find((a) => a.id === selectedAvatarId) || AVATARS[0];

  const handleContinue = () => {
    if (!name.trim()) return;
    dispatch({
      type: "SET_PROFILE",
      payload: {
        ...(state.profile || {
          id: Date.now().toString(), email: "",
          quizCompleted: false, travelerDNA: {},
          activityCategories: [], tripPace: "balanced" as const,
          foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
          points: 0, lifetimeSavings: 0, subscriptionActive: false,
        }),
        name: name.trim(),
        photo: selectedAvatarId,
      },
    });
    router.replace("/(auth)/welcome" as never);
  };

  const canContinue = name.trim().length > 0;

  return (
    <View style={s.container}>
      <LinearGradient colors={Gradients.authBg} locations={[0, 0.35, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={s.orbTopRight} />
      <View style={s.orbBottomLeft} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Step badge */}
          <View style={s.stepBadge}>
            <LinearGradient colors={Gradients.badge} style={s.stepGradient}>
              <Text style={s.stepText}>Step 2 of 3</Text>
            </LinearGradient>
          </View>

          {/* Heading */}
          <View style={s.heading}>
            <Text style={s.title}>Set up your profile</Text>
            <Text style={s.subtitle}>Tell us a bit about yourself</Text>
          </View>

          {/* Avatar section */}
          <View style={s.section}>
            <Text style={s.sectionLabel}>CHOOSE YOUR AVATAR</Text>

            {/* Selected avatar preview */}
            <View style={s.selectedWrap}>
              <LinearGradient colors={["#6443F4", "#F94498"]} style={s.selectedRing}>
                <View style={[s.selectedInner, { backgroundColor: selectedAvatar.color + "22" }]}>
                  <IconSymbol name={selectedAvatar.iconName} size={42} color={selectedAvatar.color} />
                </View>
              </LinearGradient>
            </View>

            {/* Avatar grid */}
            <View style={s.grid}>
              {AVATARS.map((av) => {
                const active = selectedAvatarId === av.id;
                return (
                  <TouchableOpacity
                    key={av.id}
                    style={[s.gridItem, active && s.gridItemActive]}
                    onPress={() => setSelectedAvatarId(av.id)}
                    activeOpacity={0.75}
                  >
                    {active && (
                      <LinearGradient colors={["rgba(100,67,244,0.45)", "rgba(249,68,152,0.30)"]} style={StyleSheet.absoluteFillObject} />
                    )}
                    <View style={[s.gridIcon, { backgroundColor: av.color + "30" }]}>
                      <IconSymbol name={av.iconName} size={22} color={av.color} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Name input */}
          <View style={s.section}>
            <Text style={s.sectionLabel}>YOUR NAME</Text>
            <View style={[s.inputWrap, nameFocused && s.inputWrapFocused]}>
              <LinearGradient
                colors={nameFocused ? Gradients.inputFocus : Gradients.inputIdle}
                style={s.inputGradient}
              >
                <IconSymbol name="person.fill" size={18} color={nameFocused ? DS.accent : DS.muted} />
                <TextInput
                  style={s.input}
                  placeholder="What should we call you?"
                  placeholderTextColor={DS.placeholder}
                  value={name}
                  onChangeText={setName}
                  returnKeyType="done"
                  onSubmitEditing={handleContinue}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  autoCapitalize="words"
                />
              </LinearGradient>
            </View>
          </View>

          {/* Preview card */}
          {canContinue && (
            <View style={s.previewCard}>
              <LinearGradient colors={Gradients.card} style={s.previewGradient}>
                <View style={[s.previewAvatar, { backgroundColor: selectedAvatar.color + "25" }]}>
                  <IconSymbol name={selectedAvatar.iconName} size={28} color={selectedAvatar.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.previewName}>{name.trim()}</Text>
                  <Text style={s.previewSub}>TRAVI Traveler</Text>
                </View>
                <LinearGradient colors={["#FFD700", "#FF9500"]} style={s.newBadge}>
                  <Text style={s.newBadgeText}>NEW</Text>
                </LinearGradient>
              </LinearGradient>
            </View>
          )}

          {/* CTA */}
          <TouchableOpacity style={s.cta} onPress={handleContinue} activeOpacity={0.85} disabled={!canContinue}>
            <LinearGradient
              colors={canContinue ? Gradients.cta : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.03)"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={s.ctaGradient}
            >
              <Text style={[s.ctaText, !canContinue && s.ctaDim]}>Continue</Text>
              <IconSymbol name="arrow.right" size={18} color={canContinue ? DS.primary : DS.disabled} />
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Brand.deepPurple },
  orbTopRight: {
    position: "absolute", width: 320, height: 320, borderRadius: 160,
    top: -100, right: -120, backgroundColor: "rgba(100,67,244,0.12)",
  },
  orbBottomLeft: {
    position: "absolute", width: 260, height: 260, borderRadius: 130,
    bottom: 60, left: -100, backgroundColor: "rgba(249,68,152,0.08)",
  },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 64, paddingBottom: 40, gap: 24 },

  stepBadge: { alignSelf: "flex-start" },
  stepGradient: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: Radius.pill,
    borderWidth: 1, borderColor: Border.badge,
  },
  stepText: { ...Typography.label, color: DS.secondary },

  heading: { gap: 6 },
  title:    { ...Typography.h2 },
  subtitle: { ...Typography.body, color: DS.muted },

  section: { gap: 12 },
  sectionLabel: { ...Typography.label },

  selectedWrap: { alignSelf: "center" },
  selectedRing: { width: 90, height: 90, borderRadius: Radius.xxl, padding: 3 },
  selectedInner: { flex: 1, borderRadius: 24, alignItems: "center", justifyContent: "center" },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  gridItem: {
    width: 52, height: 52, borderRadius: Radius.md, alignItems: "center", justifyContent: "center",
    borderWidth: 1.5, borderColor: Border.idle, backgroundColor: "rgba(255,255,255,0.07)", overflow: "hidden",
  },
  gridItemActive: { borderColor: "rgba(249,68,152,0.80)" },
  gridIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },

  inputWrap: { borderRadius: Radius.lg, overflow: "hidden", borderWidth: 1.5, borderColor: Border.idle },
  inputWrapFocused: { borderColor: Border.focused },
  inputGradient: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  input: { flex: 1, color: DS.primary, fontSize: 16, fontWeight: "500" },

  previewCard: { borderRadius: Radius.xl, overflow: "hidden", borderWidth: 1, borderColor: Border.card },
  previewGradient: { flexDirection: "row", alignItems: "center", gap: 14, padding: 18 },
  previewAvatar: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  previewName: { ...Typography.h4 },
  previewSub: { ...Typography.small, color: DS.muted, marginTop: 2 },
  newBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  newBadgeText: { fontSize: 11, fontWeight: "800", color: "#000000", letterSpacing: 0.5 },

  cta: { borderRadius: Radius.lg, overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 17, gap: 10 },
  ctaText: { ...Typography.cta },
  ctaDim: { color: DS.disabled },
});
