// Screen 5 — Profile Setup — STATIC WIREFRAME
// Route: /profile-setup | Mode: Auth
// Spec: Header 60px (back + Step 2/3), Avatar 120x120 circle + Add photo
// 5 fields: First Name, Last Name, DOB, Phone, Country

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function ProfileSetupScreen() {
  return (
    <View style={s.root}>
      {/* Header — 60px */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backIcon}>←</Text></Pressable>
        <Text style={s.headerTitle}>Profile Setup</Text>
        <Text style={s.stepLabel}>Step 2/3</Text>
      </View>

      <ScrollView style={s.body} contentContainerStyle={s.bodyContent}>
        {/* Avatar — 120x120 circle */}
        <View style={s.avatarSection}>
          <View style={s.avatar}>
            <Text style={s.avatarIcon}>👤</Text>
            <View style={s.addPhotoBadge}>
              <Text style={s.addPhotoIcon}>📷</Text>
            </View>
          </View>
          <Text style={s.addPhotoLabel}>Add Photo</Text>
        </View>

        {/* First Name */}
        <View style={s.field}>
          <Text style={s.label}>First Name *</Text>
          <View style={s.input}><Text style={s.placeholder}>Enter first name</Text></View>
        </View>

        {/* Last Name */}
        <View style={s.field}>
          <Text style={s.label}>Last Name *</Text>
          <View style={s.input}><Text style={s.placeholder}>Enter last name</Text></View>
        </View>

        {/* Date of Birth */}
        <View style={s.field}>
          <Text style={s.label}>Date of Birth *</Text>
          <View style={s.input}>
            <Text style={s.placeholder}>DD / MM / YYYY</Text>
            <Text style={s.fieldIcon}>📅</Text>
          </View>
        </View>

        {/* Phone */}
        <View style={s.field}>
          <Text style={s.label}>Phone (optional)</Text>
          <View style={s.input}>
            <Text style={s.placeholder}>+1 (555) 000-0000</Text>
            <Text style={s.fieldIcon}>📱</Text>
          </View>
        </View>

        {/* Country */}
        <View style={s.field}>
          <Text style={s.label}>Country *</Text>
          <View style={s.input}>
            <Text style={s.placeholder}>Select country</Text>
            <Text style={s.fieldIcon}>▼</Text>
          </View>
        </View>

        {/* Continue CTA */}
        <Pressable style={s.primaryBtn}>
          <Text style={s.primaryText}>Continue</Text>
        </Pressable>

        {/* Skip */}
        <Pressable style={s.skipBtn}>
          <Text style={s.skipText}>Skip for now</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 60, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#222", marginTop: 48,
  },
  backBtn: { width: 44, height: 44, justifyContent: "center" },
  backIcon: { color: "#FFF", fontSize: 20 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  stepLabel: { color: "#888", fontSize: 13 },
  body: { flex: 1 },
  bodyContent: { padding: 24, gap: 20, paddingBottom: 60 },
  avatarSection: { alignItems: "center", marginBottom: 8 },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: "#1A1A1A", borderWidth: 2, borderColor: "#333",
    justifyContent: "center", alignItems: "center",
  },
  avatarIcon: { fontSize: 40 },
  addPhotoBadge: {
    position: "absolute", bottom: 0, right: 0,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "#333", borderWidth: 2, borderColor: "#111",
    justifyContent: "center", alignItems: "center",
  },
  addPhotoIcon: { fontSize: 16 },
  addPhotoLabel: { color: "#888", fontSize: 13, marginTop: 8 },
  field: { gap: 8 },
  label: { color: "#CCC", fontSize: 14, fontWeight: "500" },
  input: {
    height: 52, borderRadius: 12, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", paddingHorizontal: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  placeholder: { color: "#555", fontSize: 15 },
  fieldIcon: { fontSize: 14, color: "#666" },
  primaryBtn: {
    height: 56, borderRadius: 28, backgroundColor: "#333",
    justifyContent: "center", alignItems: "center",
    borderWidth: 1, borderColor: "#555", marginTop: 8,
  },
  primaryText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  skipBtn: { alignItems: "center", paddingVertical: 8 },
  skipText: { color: "#888", fontSize: 14 },
});
