// @ts-nocheck
/**
 * TRAVI — Emergency Settings
 */
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EmergencySettingsScreen() {
  const insets = useSafeAreaInsets();
  const [contacts, setContacts] = useState([
    { id: "1", name: "Mom", phone: "+972-50-1234567", relation: "Parent" },
    { id: "2", name: "David Cohen", phone: "+972-52-9876543", relation: "Friend" },
  ]);
  const [medInfo, setMedInfo] = useState({
    bloodType: "A+",
    allergies: "Penicillin",
    conditions: "",
    medications: "",
    notes: "Carry EpiPen",
  });

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <Text style={S.backText}>←</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>Emergency Info</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* SOS Banner */}
        <View style={S.sosBanner}>
          <Text style={S.sosEmoji}>🆘</Text>
          <View style={S.sosBannerText}>
            <Text style={S.sosBannerTitle}>Emergency SOS</Text>
            <Text style={S.sosBannerDesc}>Hold the TRAVI logo for 3 seconds to send SOS to your emergency contacts with your GPS location.</Text>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={S.section}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Emergency Contacts</Text>
            <TouchableOpacity style={S.addBtn} activeOpacity={0.8}>
              <Text style={S.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {contacts.map((c) => (
            <View key={c.id} style={S.contactCard}>
              <View style={S.contactAvatar}>
                <Text style={S.contactAvatarText}>{c.name[0]}</Text>
              </View>
              <View style={S.contactInfo}>
                <Text style={S.contactName}>{c.name}</Text>
                <Text style={S.contactPhone}>{c.phone}</Text>
                <Text style={S.contactRelation}>{c.relation}</Text>
              </View>
              <TouchableOpacity style={S.contactEdit} activeOpacity={0.7}>
                <Text style={S.contactEditText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Medical Info */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Medical Information</Text>
          <Text style={S.sectionDesc}>Shared with emergency services if you activate SOS</Text>
          {[
            { label: "Blood Type", key: "bloodType", placeholder: "e.g. A+" },
            { label: "Allergies", key: "allergies", placeholder: "e.g. Penicillin, nuts" },
            { label: "Medical Conditions", key: "conditions", placeholder: "e.g. Diabetes, asthma" },
            { label: "Current Medications", key: "medications", placeholder: "e.g. Metformin 500mg" },
            { label: "Additional Notes", key: "notes", placeholder: "e.g. Carry EpiPen" },
          ].map((field) => (
            <View key={field.key} style={S.fieldRow}>
              <Text style={S.fieldLabel}>{field.label}</Text>
              <TextInput
                style={S.fieldInput}
                value={medInfo[field.key as keyof typeof medInfo]}
                onChangeText={(v) => setMedInfo((m) => ({ ...m, [field.key]: v }))}
                placeholder={field.placeholder}
                placeholderTextColor="rgba(255,255,255,0.35)"
              />
            </View>
          ))}
        </View>

        {/* Save */}
        <View style={S.section}>
          <TouchableOpacity style={S.saveBtn} activeOpacity={0.88}>
            <Text style={S.saveBtnText}>Save Emergency Info</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#1A0B2E", fontSize: 18, fontWeight: "700",
      fontFamily: "Chillax-Semibold" },
  headerTitle: { flex: 1, color: "#1A0B2E", fontSize: 20, fontWeight: "900", textAlign: "center", fontFamily: "Chillax-Bold" },
  sosBanner: { marginHorizontal: 20, marginBottom: 24, borderRadius: 16, backgroundColor: "rgba(239,68,68,0.12)", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)", padding: 16, flexDirection: "row", gap: 14, alignItems: "flex-start" },
  sosEmoji: { fontSize: 28 },
  sosBannerText: { flex: 1, gap: 4 },
  sosBannerTitle: { color: "#EF4444", fontSize: 15, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
  sosBannerDesc: { color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 18 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", textTransform: "uppercase", letterSpacing: 1.5 },
  sectionDesc: { color: "rgba(255,255,255,0.55)", fontSize: 12, marginBottom: 12, marginTop: -8 },
  addBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: "rgba(100,67,244,0.2)", borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  addBtnText: { color: "#A78BFA", fontSize: 12, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  contactCard: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.12)" },
  contactAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(100,67,244,0.25)", alignItems: "center", justifyContent: "center" },
  contactAvatarText: { color: "#A78BFA", fontSize: 18, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
  contactInfo: { flex: 1, gap: 2 },
  contactName: { color: "#1A0B2E", fontSize: 14, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  contactPhone: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  contactRelation: { color: "#A78BFA", fontSize: 11, fontWeight: "700" },
  contactEdit: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)" },
  contactEditText: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  fieldRow: { marginBottom: 12 },
  fieldLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700", marginBottom: 6 },
  fieldInput: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", paddingHorizontal: 14, paddingVertical: 10, color: "#1A0B2E", fontSize: 14 },
  saveBtn: { borderRadius: 14, backgroundColor: "#6443F4", paddingVertical: 16, alignItems: "center", shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10 },
  saveBtnText: { color: "#1A0B2E", fontSize: 15, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
});
