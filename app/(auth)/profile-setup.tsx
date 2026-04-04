// Screen 5 — Profile Setup
// Route: /profile-setup | Mode: Auth
// Visual DNA: #0A0514 bg, Chillax-Bold, Satoshi, glass inputs, gradient CTA

import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const C = {
  bg: "#0A0514",
  surface: "rgba(36,16,62,0.6)",
  border: "rgba(123,68,230,0.3)",
  borderFocus: "#6443F4",
  purple: "#6443F4",
  pink: "#F94498",
  white: "#FFFFFF",
  secondary: "#D3CFD8",
  muted: "#A79FB2",
  placeholder: "#7B6A94",
};

export default function ProfileSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const canSubmit = firstName.length > 0 && lastName.length > 0;

  const fields = [
    { key: "first", label: "First Name", required: true, value: firstName, setter: setFirstName, placeholder: "Enter first name", icon: "person" as const, keyboard: "default" as const },
    { key: "last", label: "Last Name", required: true, value: lastName, setter: setLastName, placeholder: "Enter last name", icon: "person-outline" as const, keyboard: "default" as const },
    { key: "dob", label: "Date of Birth", required: true, value: dob, setter: setDob, placeholder: "DD / MM / YYYY", icon: "calendar-today" as const, keyboard: "number-pad" as const },
    { key: "phone", label: "Phone", required: false, value: phone, setter: setPhone, placeholder: "+1 (555) 000-0000", icon: "phone" as const, keyboard: "phone-pad" as const },
    { key: "country", label: "Country", required: true, value: country, setter: setCountry, placeholder: "Select country", icon: "public" as const, keyboard: "default" as const },
  ];

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Header */}
        <View style={s.header}>
          <Pressable
            style={({ pressed }) => [s.backBtn, pressed && { opacity: 0.6 }]}
            onPress={() => router.back()}
          >
            <View style={s.backCircle}>
              <MaterialIcons name="arrow-back" size={20} color={C.white} />
            </View>
          </Pressable>
          <View style={s.stepPill}>
            <Text style={s.stepText}>Step 3 of 4</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 40 }]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={s.headline}>Set Up Profile</Text>
          <Text style={s.body}>Tell us a bit about yourself</Text>

          {/* Avatar */}
          <View style={s.avatarSection}>
            <Pressable style={({ pressed }) => [s.avatar, pressed && { opacity: 0.8 }]}>
              <MaterialIcons name="person" size={44} color={C.muted} />
              <View style={s.addPhotoBadge}>
                <LinearGradient colors={[C.purple, C.pink]} style={s.addPhotoGrad}>
                  <MaterialIcons name="camera-alt" size={14} color={C.white} />
                </LinearGradient>
              </View>
            </Pressable>
            <Text style={s.addPhotoLabel}>Add Photo</Text>
          </View>

          {/* Fields */}
          {fields.map((f) => (
            <View key={f.key} style={s.fieldGroup}>
              <Text style={s.label}>
                {f.label}{" "}
                {f.required ? (
                  <Text style={s.required}>*</Text>
                ) : (
                  <Text style={s.optional}>(optional)</Text>
                )}
              </Text>
              <View style={[s.inputWrap, focused === f.key && s.inputFocused]}>
                <MaterialIcons name={f.icon} size={18} color={C.muted} style={s.inputIcon} />
                <TextInput
                  style={s.input}
                  placeholder={f.placeholder}
                  placeholderTextColor={C.placeholder}
                  value={f.value}
                  onChangeText={f.setter}
                  keyboardType={f.keyboard}
                  onFocus={() => setFocused(f.key)}
                  onBlur={() => setFocused(null)}
                />
                {f.key === "country" && (
                  <MaterialIcons name="keyboard-arrow-down" size={20} color={C.muted} />
                )}
              </View>
            </View>
          ))}

          {/* CTA */}
          <Pressable
            style={({ pressed }) => [
              s.ctaBtn,
              pressed && canSubmit && { opacity: 0.85, transform: [{ scale: 0.98 }] },
            ]}
            onPress={() => canSubmit && router.push("/(auth)/welcome-travi")}
            disabled={!canSubmit}
          >
            <LinearGradient
              colors={canSubmit ? [C.purple, C.pink] : ["#2A1A4A", "#2A1A4A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.ctaGrad}
            >
              <Text style={[s.ctaText, !canSubmit && { opacity: 0.4 }]}>Continue</Text>
            </LinearGradient>
          </Pressable>

          {/* Skip */}
          <Pressable
            style={({ pressed }) => [s.skipBtn, pressed && { opacity: 0.6 }]}
            onPress={() => router.push("/(auth)/welcome-travi")}
          >
            <Text style={s.skipText}>Skip for now</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    justifyContent: "center",
    alignItems: "center",
  },
  stepPill: {
    backgroundColor: "rgba(100,67,244,0.15)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.3)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  stepText: { fontSize: 13, color: C.purple, fontFamily: "Satoshi-Medium" },
  scroll: { paddingHorizontal: 24 },
  headline: {
    fontSize: 32,
    fontFamily: "Chillax-Bold",
    color: C.white,
    marginBottom: 8,
    marginTop: 8,
  },
  body: {
    fontSize: 15,
    fontFamily: "Satoshi-Regular",
    color: C.secondary,
    marginBottom: 24,
  },
  avatarSection: { alignItems: "center", marginBottom: 28 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: C.surface,
    borderWidth: 2,
    borderColor: C.border,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: C.bg,
  },
  addPhotoGrad: { flex: 1, justifyContent: "center", alignItems: "center" },
  addPhotoLabel: {
    color: C.muted,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: 8,
  },
  fieldGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontFamily: "Satoshi-Medium", color: C.secondary, marginBottom: 8 },
  required: { color: C.pink },
  optional: { color: C.muted, fontFamily: "Satoshi-Regular" },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
  },
  inputFocused: { borderColor: C.borderFocus },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: C.white, fontSize: 15, fontFamily: "Satoshi-Regular" },
  ctaBtn: {
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    marginTop: 8,
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaGrad: { flex: 1, justifyContent: "center", alignItems: "center" },
  ctaText: { fontSize: 16, fontFamily: "Satoshi-Bold", color: C.white },
  skipBtn: {
    alignSelf: "center",
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: "center",
    marginTop: 4,
  },
  skipText: { fontSize: 14, fontFamily: "Satoshi-Regular", color: C.muted },
});
