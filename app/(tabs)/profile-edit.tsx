import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const SECTIONS = [
  {
    title: "Personal Information",
    icon: "person",
    fields: [
      { label: "First Name", value: "Amit", key: "firstName" },
      { label: "Last Name", value: "Cohen", key: "lastName" },
      { label: "Email", value: "amit@example.com", key: "email" },
      { label: "Phone", value: "+972 50 123 4567", key: "phone" },
      { label: "Date of Birth", value: "Jan 15, 1990", key: "dob" },
    ],
  },
  {
    title: "Location",
    icon: "location-on",
    fields: [
      { label: "Country", value: "Israel", key: "country" },
      { label: "City", value: "Tel Aviv", key: "city" },
      { label: "Timezone", value: "GMT+3", key: "timezone" },
    ],
  },
  {
    title: "Travel Preferences",
    icon: "flight",
    fields: [
      { label: "Preferred Currency", value: "EUR (€)", key: "currency" },
      { label: "Seat Preference", value: "Window", key: "seat" },
      { label: "Meal Preference", value: "No preference", key: "meal" },
    ],
  },
];

export default function ProfileEditScreen() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <ScreenWrapper
      title="Edit Profile"
      scrollable
      bottomPad={100}
      headerRight={
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: DS.pink, fontFamily: "Satoshi-Medium", fontSize: 15 }}>Save</Text>
        </Pressable>
      }
    >
      {/* Avatar */}
      <View style={s.avatarSection}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} style={s.avatarRing}>
          <View style={s.avatarInner}>
            <Text style={s.avatarInitials}>AC</Text>
          </View>
        </LinearGradient>
        <Pressable style={s.changePhotoBtn}>
          <MaterialIcons name="camera-alt" size={14} color={DS.white} />
          <Text style={s.changePhotoText}>Change Photo</Text>
        </Pressable>
      </View>

      {/* Sections */}
      {SECTIONS.map((section) => (
        <View key={section.title} style={s.section}>
          <View style={s.sectionHeader}>
            <MaterialIcons name={section.icon as any} size={18} color={DS.purple} />
            <Text style={s.sectionTitle}>{section.title}</Text>
          </View>
          <BlurView intensity={15} tint="dark" style={s.card}>
            {section.fields.map((field, i) => (
              <View key={field.key} style={[s.fieldRow, i < section.fields.length - 1 && s.fieldBorder]}>
                <Text style={s.fieldLabel}>{field.label}</Text>
                <Text style={s.fieldValue}>{values[field.key] ?? field.value}</Text>
                <MaterialIcons name="chevron-right" size={18} color={DS.placeholder} />
              </View>
            ))}
          </BlurView>
        </View>
      ))}

      {/* Danger zone */}
      <BlurView intensity={15} tint="dark" style={[s.card, { marginTop: 8, borderColor: DS.error + "44" }]}>
        <Pressable style={s.fieldRow}>
          <MaterialIcons name="delete-outline" size={20} color={DS.error} />
          <Text style={[s.fieldLabel, { color: DS.error, flex: 1, marginLeft: 8 }]}>Delete Account</Text>
          <MaterialIcons name="chevron-right" size={18} color={DS.error + "88"} />
        </Pressable>
      </BlurView>

      {/* Save CTA */}
      <Pressable onPress={() => router.back()} style={{ marginTop: 24 }}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.saveBtn}>
          <Text style={s.saveBtnText}>Save Changes</Text>
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  avatarSection: { alignItems: "center", paddingVertical: 24, gap: 12 },
  avatarRing: { width: 96, height: 96, borderRadius: 48, padding: 3, justifyContent: "center", alignItems: "center" },
  avatarInner: { width: 90, height: 90, borderRadius: 45, backgroundColor: DS.surfaceHigh, justifyContent: "center", alignItems: "center" },
  avatarInitials: { color: DS.white, fontSize: 32, fontFamily: "Chillax-Bold" },
  changePhotoBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  changePhotoText: { color: DS.white, fontSize: 13, fontFamily: "Satoshi-Medium" },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionTitle: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold" },
  card: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, backgroundColor: DS.surface },
  fieldRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  fieldBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  fieldLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular", width: 120 },
  fieldValue: { flex: 1, color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium", textAlign: "right", marginRight: 8 },
  saveBtn: { height: 56, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  saveBtnText: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
});
