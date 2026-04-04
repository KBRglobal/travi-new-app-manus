// Screen 5 — Profile Setup — DESIGNED
// Route: /profile-setup | Mode: Auth
// Spec: Step 3/4, Avatar 120x120 circle, 5 fields (First, Last, DOB, Phone, Country), gradient CTA, Skip

import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const C = {
  bgBase: "#1A0B2E",
  bgSurface: "#24103E",
  bgInput: "rgba(36,16,62,0.6)",
  borderInput: "rgba(123,68,230,0.3)",
  borderFocus: "rgba(100,67,244,0.6)",
  purple: "#6443F4",
  pink: "#F94498",
  textPrimary: "#FFFFFF",
  textSecondary: "#D3CFD8",
  textTertiary: "#A79FB2",
  textPlaceholder: "#7B6A94",
};

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const canSubmit = firstName.length > 0 && lastName.length > 0;

  return (
    <View style={s.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Header */}
        <View style={s.header}>
          <Pressable
            style={({ pressed }) => [s.backBtn, pressed && { opacity: 0.6 }]}
            onPress={() => router.back()}
          >
            <Text style={s.backArrow}>‹</Text>
          </Pressable>
          <Text style={s.stepText}>Step 3 of 4</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <Text style={s.headline}>Set Up Profile</Text>
          <Text style={s.body}>Tell us a bit about yourself</Text>

          {/* Avatar — 120x120 circle */}
          <View style={s.avatarSection}>
            <Pressable style={({ pressed }) => [s.avatar, pressed && { opacity: 0.8 }]}>
              <Text style={s.avatarIcon}>👤</Text>
              <View style={s.addPhotoBadge}>
                <LinearGradient colors={[C.purple, C.pink]} style={s.addPhotoGrad}>
                  <Text style={s.addPhotoIcon}>📷</Text>
                </LinearGradient>
              </View>
            </Pressable>
            <Text style={s.addPhotoLabel}>Add Photo</Text>
          </View>

          {/* First Name */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>First Name <Text style={s.required}>*</Text></Text>
            <View style={[s.inputWrap, focused === "first" && s.inputFocused]}>
              <TextInput style={s.input} placeholder="Enter first name" placeholderTextColor={C.textPlaceholder}
                value={firstName} onChangeText={setFirstName}
                onFocus={() => setFocused("first")} onBlur={() => setFocused(null)} />
            </View>
          </View>

          {/* Last Name */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Last Name <Text style={s.required}>*</Text></Text>
            <View style={[s.inputWrap, focused === "last" && s.inputFocused]}>
              <TextInput style={s.input} placeholder="Enter last name" placeholderTextColor={C.textPlaceholder}
                value={lastName} onChangeText={setLastName}
                onFocus={() => setFocused("last")} onBlur={() => setFocused(null)} />
            </View>
          </View>

          {/* Date of Birth */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Date of Birth <Text style={s.required}>*</Text></Text>
            <Pressable style={[s.inputWrap, focused === "dob" && s.inputFocused]}>
              <Text style={s.inputIcon}>📅</Text>
              <TextInput style={s.input} placeholder="DD / MM / YYYY" placeholderTextColor={C.textPlaceholder}
                value={dob} onChangeText={setDob} keyboardType="number-pad"
                onFocus={() => setFocused("dob")} onBlur={() => setFocused(null)} />
            </Pressable>
          </View>

          {/* Phone */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Phone <Text style={s.optional}>(optional)</Text></Text>
            <View style={[s.inputWrap, focused === "phone" && s.inputFocused]}>
              <Text style={s.inputIcon}>📱</Text>
              <TextInput style={s.input} placeholder="+1 (555) 000-0000" placeholderTextColor={C.textPlaceholder}
                value={phone} onChangeText={setPhone} keyboardType="phone-pad"
                onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
            </View>
          </View>

          {/* Country */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Country <Text style={s.required}>*</Text></Text>
            <Pressable style={[s.inputWrap, focused === "country" && s.inputFocused]}>
              <Text style={s.inputIcon}>🌍</Text>
              <TextInput style={s.input} placeholder="Select country" placeholderTextColor={C.textPlaceholder}
                value={country} onChangeText={setCountry}
                onFocus={() => setFocused("country")} onBlur={() => setFocused(null)} />
              <Text style={{ color: C.textTertiary, fontSize: 12 }}>▼</Text>
            </Pressable>
          </View>

          {/* Continue CTA */}
          <Pressable
            style={({ pressed }) => [s.ctaBtn, pressed && canSubmit && { opacity: 0.8, transform: [{ scale: 0.98 }] }]}
            onPress={() => canSubmit && router.push("/(auth)/welcome-travi")}
            disabled={!canSubmit}
          >
            <LinearGradient
              colors={canSubmit ? [C.purple, C.pink] : ["#3A2A5C", "#3A2A5C"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.ctaGrad}
            >
              <Text style={[s.ctaText, !canSubmit && { opacity: 0.5 }]}>Continue</Text>
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
  root: { flex: 1, backgroundColor: C.bgBase },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8 },
  backBtn: { width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  backArrow: { fontSize: 32, color: C.textPrimary, fontWeight: "300" },
  stepText: { fontSize: 14, color: C.textTertiary, fontWeight: "500" },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },
  headline: { fontSize: 28, fontWeight: "800", color: C.textPrimary, marginBottom: 8, marginTop: 8 },
  body: { fontSize: 16, color: C.textSecondary, marginBottom: 24 },
  avatarSection: { alignItems: "center", marginBottom: 24 },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: C.bgSurface, borderWidth: 2, borderColor: C.borderInput,
    justifyContent: "center", alignItems: "center",
  },
  avatarIcon: { fontSize: 40 },
  addPhotoBadge: {
    position: "absolute", bottom: 0, right: 0,
    width: 36, height: 36, borderRadius: 18,
    overflow: "hidden", borderWidth: 2, borderColor: C.bgBase,
  },
  addPhotoGrad: { flex: 1, justifyContent: "center", alignItems: "center" },
  addPhotoIcon: { fontSize: 14 },
  addPhotoLabel: { color: C.textTertiary, fontSize: 13, marginTop: 8 },
  fieldGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: C.textSecondary, fontWeight: "600", marginBottom: 8 },
  required: { color: C.pink },
  optional: { color: C.textTertiary, fontWeight: "400" },
  inputWrap: { flexDirection: "row", alignItems: "center", backgroundColor: C.bgInput, borderWidth: 1, borderColor: C.borderInput, borderRadius: 16, height: 52, paddingHorizontal: 16 },
  inputFocused: { borderColor: C.borderFocus },
  inputIcon: { fontSize: 16, marginRight: 12 },
  input: { flex: 1, color: C.textPrimary, fontSize: 16 },
  ctaBtn: { width: "100%", height: 56, borderRadius: 28, overflow: "hidden", marginTop: 8, shadowColor: C.pink, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  ctaGrad: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 28 },
  ctaText: { fontSize: 16, fontWeight: "700", color: C.textPrimary },
  skipBtn: { alignSelf: "center", paddingVertical: 12, minHeight: 44, justifyContent: "center" },
  skipText: { fontSize: 14, color: C.textTertiary },
});
