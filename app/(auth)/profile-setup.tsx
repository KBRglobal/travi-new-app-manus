import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Dimensions, ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const AVATARS = ["🦁", "🐯", "🦊", "🐺", "🦅", "🐬", "🦋", "🌊", "🔥", "⚡", "🌙", "🎯"];

export default function ProfileSetupScreen() {
  const { state, dispatch } = useStore();
  const [name, setName] = useState(state.profile?.name || "");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [nameFocused, setNameFocused] = useState(false);

  const handleContinue = () => {
    if (!name.trim()) return;
    dispatch({
      type: "SET_PROFILE",
      payload: {
        ...(state.profile || {
          id: Date.now().toString(), email: "",
          quizCompleted: false, travelerDNA: {},
          foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
          points: 0, lifetimeSavings: 0, subscriptionActive: false,
        }),
        name: name.trim(),
        photo: selectedAvatar,
      },
    });
    router.replace("/(auth)/welcome" as never);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#040010", "#0D0520", "#1A0A3D", "#0D0520"]}
        locations={[0, 0.3, 0.6, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.stepBadge}>
              <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} style={styles.stepGradient}>
                <Text style={styles.stepText}>Step 2 of 3</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>Set up your profile</Text>
            <Text style={styles.subtitle}>Tell us a bit about yourself</Text>
          </View>

          {/* Avatar selector */}
          <View style={styles.avatarSection}>
            <Text style={styles.sectionLabel}>CHOOSE YOUR AVATAR</Text>
            <View style={styles.selectedAvatarWrap}>
              <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.selectedAvatarRing}>
                <View style={styles.selectedAvatarInner}>
                  <Text style={styles.selectedAvatarEmoji}>{selectedAvatar}</Text>
                </View>
              </LinearGradient>
              <View style={styles.selectedAvatarGlow} />
            </View>
            <View style={styles.avatarGrid}>
              {AVATARS.map((av) => (
                <TouchableOpacity
                  key={av}
                  style={[styles.avatarItem, selectedAvatar === av && styles.avatarItemSelected]}
                  onPress={() => setSelectedAvatar(av)}
                  activeOpacity={0.75}
                >
                  {selectedAvatar === av && (
                    <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)"]} style={StyleSheet.absoluteFillObject} />
                  )}
                  <Text style={styles.avatarEmoji}>{av}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Name input */}
          <View style={styles.nameSection}>
            <Text style={styles.sectionLabel}>YOUR NAME</Text>
            <View style={[styles.inputWrap, nameFocused && styles.inputWrapFocused]}>
              <LinearGradient
                colors={nameFocused ? ["rgba(123,47,190,0.3)", "rgba(233,30,140,0.15)"] : ["rgba(255,255,255,0.07)", "rgba(255,255,255,0.03)"]}
                style={styles.inputGradient}
              >
                <IconSymbol name="person.fill" size={18} color={nameFocused ? "#E91E8C" : "#5A4D72"} />
                <TextInput
                  style={styles.input}
                  placeholder="What should we call you?"
                  placeholderTextColor="#3D3050"
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
          {name.trim() ? (
            <View style={styles.previewCard}>
              <LinearGradient colors={["rgba(123,47,190,0.2)", "rgba(233,30,140,0.12)"]} style={styles.previewGradient}>
                <Text style={styles.previewAvatar}>{selectedAvatar}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.previewName}>{name.trim()}</Text>
                  <Text style={styles.previewSub}>TRAVI Traveler</Text>
                </View>
                <View style={styles.previewBadge}>
                  <LinearGradient colors={["#FFD700", "#FF9500"]} style={styles.previewBadgeGradient}>
                    <Text style={styles.previewBadgeText}>NEW</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </View>
          ) : null}

          {/* CTA */}
          <TouchableOpacity
            style={styles.cta}
            onPress={handleContinue}
            activeOpacity={0.85}
            disabled={!name.trim()}
          >
            <LinearGradient
              colors={name.trim() ? ["#7B2FBE", "#C2185B", "#E91E8C"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.03)"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Text style={[styles.ctaText, !name.trim() && styles.ctaTextDim]}>Continue</Text>
              <IconSymbol name="arrow.right" size={18} color={name.trim() ? "#FFFFFF" : "#3D3050"} />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width * 0.9, height: width * 0.9, borderRadius: width * 0.45, top: -width * 0.3, left: -width * 0.2, backgroundColor: "rgba(123,47,190,0.10)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.25, backgroundColor: "rgba(233,30,140,0.07)" },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 64, paddingBottom: 40, gap: 28 },
  header: { gap: 10 },
  stepBadge: { alignSelf: "flex-start" },
  stepGradient: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  stepText: { color: "#C4B5D9", fontSize: 12, fontWeight: "600", letterSpacing: 0.5 },
  title: { fontSize: 30, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: "#8B7AAA" },
  avatarSection: { gap: 16 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: "#5A4D72", letterSpacing: 1.5 },
  selectedAvatarWrap: { alignSelf: "center", width: 90, height: 90, alignItems: "center", justifyContent: "center" },
  selectedAvatarRing: { width: 90, height: 90, borderRadius: 28, padding: 3 },
  selectedAvatarInner: { flex: 1, borderRadius: 25, backgroundColor: "#0D0520", alignItems: "center", justifyContent: "center" },
  selectedAvatarEmoji: { fontSize: 42 },
  selectedAvatarGlow: { position: "absolute", width: 90, height: 90, borderRadius: 45, backgroundColor: "rgba(123,47,190,0.2)", shadowColor: "#7B2FBE", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 25 },
  avatarGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  avatarItem: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)", overflow: "hidden" },
  avatarItemSelected: { borderColor: "rgba(233,30,140,0.8)" },
  avatarEmoji: { fontSize: 26 },
  nameSection: { gap: 12 },
  inputWrap: { borderRadius: 16, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)" },
  inputWrapFocused: { borderColor: "rgba(233,30,140,0.6)" },
  inputGradient: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 16 },
  input: { flex: 1, color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
  previewCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(123,47,190,0.3)" },
  previewGradient: { flexDirection: "row", alignItems: "center", gap: 14, padding: 18 },
  previewAvatar: { fontSize: 36 },
  previewName: { fontSize: 18, fontWeight: "700", color: "#FFFFFF" },
  previewSub: { fontSize: 12, color: "#8B7AAA", marginTop: 2 },
  previewBadge: {},
  previewBadgeGradient: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  previewBadgeText: { fontSize: 11, fontWeight: "800", color: "#000000", letterSpacing: 0.5 },
  cta: { borderRadius: 16, overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 17, gap: 10 },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  ctaTextDim: { color: "#3D3050" },
});
