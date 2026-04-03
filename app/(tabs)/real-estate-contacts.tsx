/**
 * TRAVI — Real Estate Contacts
 */
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "agent", label: "Agents" },
  { id: "developer", label: "Developers" },
  { id: "lawyer", label: "Lawyers" },
  { id: "mortgage", label: "Mortgage" },
];

const CONTACTS = [
  { id: "c1", type: "agent", name: "Yael Cohen", role: "Senior Property Consultant", company: "Betterhomes Dubai", emoji: "👩‍💼", specialties: ["Downtown", "Marina", "JVC"], languages: ["Hebrew", "English", "Arabic"], rating: 4.9, deals: 142, phone: "+97150123456", market: "Dubai" },
  { id: "c2", type: "agent", name: "David Levy", role: "Luxury Property Specialist", company: "Allsopp & Allsopp", emoji: "👨‍💼", specialties: ["Palm Jumeirah", "Emirates Hills", "DIFC"], languages: ["Hebrew", "English", "Russian"], rating: 4.8, deals: 98, phone: "+97155234567", market: "Dubai" },
  { id: "c3", type: "developer", name: "Emaar Properties", role: "Official Sales Team", company: "Emaar Properties PJSC", emoji: "🏢", specialties: ["Downtown Dubai", "Dubai Hills", "Emaar Beachfront"], languages: ["English", "Arabic", "Hebrew"], rating: 4.7, deals: 0, phone: "+97143661688", market: "Dubai" },
  { id: "c4", type: "developer", name: "DAMAC Properties", role: "International Sales", company: "DAMAC Properties", emoji: "🏗️", specialties: ["DAMAC Hills", "Safa One", "Cavalli Tower"], languages: ["English", "Arabic", "Hebrew", "Russian"], rating: 4.5, deals: 0, phone: "+97143733000", market: "Dubai" },
  { id: "c5", type: "lawyer", name: "Adv. Sarah Mizrahi", role: "Real Estate Attorney", company: "Al Tamimi & Company", emoji: "⚖️", specialties: ["Off-plan contracts", "Title deeds", "Mortgage law"], languages: ["Hebrew", "English", "Arabic"], rating: 4.9, deals: 0, phone: "+97143641641", market: "Dubai" },
  { id: "c6", type: "mortgage", name: "Emirates NBD", role: "Home Finance Team", company: "Emirates NBD Bank", emoji: "🏦", specialties: ["Non-resident mortgages", "Off-plan finance", "Refinancing"], languages: ["English", "Arabic", "Hebrew"], rating: 4.6, deals: 0, phone: "+971600540000", market: "Dubai" },
  { id: "c7", type: "agent", name: "Avi Shapiro", role: "Investment Property Advisor", company: "Provident Estate", emoji: "👨‍💼", specialties: ["Yas Island", "Saadiyat", "Al Reem"], languages: ["Hebrew", "English"], rating: 4.8, deals: 67, phone: "+97152345678", market: "Abu Dhabi" },
];

const SLOTS = [
  { id: "s1", day: "Today", time: "3:00 PM", available: true },
  { id: "s2", day: "Today", time: "5:00 PM", available: true },
  { id: "s3", day: "Tomorrow", time: "10:00 AM", available: true },
  { id: "s4", day: "Tomorrow", time: "2:00 PM", available: false },
  { id: "s5", day: "Thu Apr 4", time: "11:00 AM", available: true },
];

export default function RealEstateContactsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const filtered = activeFilter === "all" ? CONTACTS : CONTACTS.filter((c) => c.type === activeFilter);

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0A0A1A", "#0D1628", "#0A0A1A"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}><Text style={S.backText}>←</Text></TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>🤝 Expert Contacts</Text>
          <Text style={S.headerSub}>UAE Property Professionals</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={S.consultBanner}>
          <LinearGradient colors={["rgba(100,67,244,0.3)", "rgba(249,68,152,0.2)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.consultTitle}>Free 30-Min Consultation</Text>
          <Text style={S.consultDesc}>Book a free call with a UAE property expert. Honest advice for Israeli investors.</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginTop: 12 }}>
            {SLOTS.map((slot) => (
              <TouchableOpacity key={slot.id} style={[S.slotChip, !slot.available && S.slotChipDisabled, selectedSlot === slot.id && S.slotChipSelected]} onPress={() => slot.available && setSelectedSlot(slot.id)} activeOpacity={slot.available ? 0.8 : 1}>
                <Text style={[S.slotDay, !slot.available && { opacity: 0.3 }]}>{slot.day}</Text>
                <Text style={[S.slotTime, !slot.available && { opacity: 0.3 }, selectedSlot === slot.id && { color: "#6443F4" }]}>{slot.time}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {selectedSlot && (
            <TouchableOpacity style={S.bookBtn} activeOpacity={0.88}>
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <Text style={S.bookBtnText}>Confirm Booking →</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity key={f.id} style={[S.filterChip, activeFilter === f.id && S.filterChipActive]} onPress={() => setActiveFilter(f.id)} activeOpacity={0.8}>
              <Text style={[S.filterLabel, activeFilter === f.id && S.filterLabelActive]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={S.section}>
          {filtered.map((contact) => (
            <View key={contact.id} style={S.contactCard}>
              <View style={S.contactTop}>
                <Text style={S.contactEmoji}>{contact.emoji}</Text>
                <View style={S.contactInfo}>
                  <Text style={S.contactName}>{contact.name}</Text>
                  <Text style={S.contactRole}>{contact.role}</Text>
                  <Text style={S.contactCompany}>{contact.company}</Text>
                  <View style={S.contactMeta}>
                    <Text style={S.contactRating}>⭐ {contact.rating}</Text>
                    {contact.deals > 0 && <Text style={S.contactDeals}>{contact.deals} deals</Text>}
                    <Text style={S.contactMarket}>{contact.market}</Text>
                  </View>
                </View>
              </View>
              <View style={S.contactSpecialties}>
                {contact.specialties.map((s) => (<View key={s} style={S.specialtyChip}><Text style={S.specialtyText}>{s}</Text></View>))}
              </View>
              <View style={S.contactLangs}>
                <Text style={S.contactLangsLabel}>Languages: </Text>
                <Text style={S.contactLangsValue}>{contact.languages.join(" · ")}</Text>
              </View>
              <View style={S.contactActions}>
                <TouchableOpacity style={S.callBtn} onPress={() => Linking.openURL("tel:" + contact.phone)} activeOpacity={0.85}>
                  <LinearGradient colors={["#22C55E", "#16A34A"]} style={StyleSheet.absoluteFillObject} />
                  <Text style={S.callBtnText}>📞 Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={S.waBtn} onPress={() => Linking.openURL("https://wa.me/" + contact.phone.replace(/\D/g, ""))} activeOpacity={0.85}>
                  <LinearGradient colors={["#25D366", "#128C7E"]} style={StyleSheet.absoluteFillObject} />
                  <Text style={S.callBtnText}>💬 WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A1A" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 12, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  consultBanner: { marginHorizontal: 20, borderRadius: 20, overflow: "hidden", padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  consultTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  consultDesc: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 20, marginTop: 6 },
  slotChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", alignItems: "center" },
  slotChipDisabled: { opacity: 0.4 },
  slotChipSelected: { borderColor: "#6443F4", backgroundColor: "rgba(100,67,244,0.2)" },
  slotDay: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  slotTime: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  bookBtn: { borderRadius: 12, overflow: "hidden", paddingVertical: 12, alignItems: "center", marginTop: 12 },
  bookBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", fontFamily: "Chillax-Bold" },
  filterRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  filterChipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: "#6443F4" },
  filterLabel: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700" },
  filterLabelActive: { color: "#FFFFFF" },
  section: { paddingHorizontal: 20, gap: 12 },
  contactCard: { borderRadius: 18, backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", padding: 16, gap: 12 },
  contactTop: { flexDirection: "row", gap: 14 },
  contactEmoji: { fontSize: 40, marginTop: 2 },
  contactInfo: { flex: 1, gap: 2 },
  contactName: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  contactRole: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  contactCompany: { color: "rgba(255,255,255,0.35)", fontSize: 12 },
  contactMeta: { flexDirection: "row", gap: 10, marginTop: 4 },
  contactRating: { color: "#F59E0B", fontSize: 12, fontWeight: "700" },
  contactDeals: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  contactMarket: { color: "#6443F4", fontSize: 12, fontWeight: "700" },
  contactSpecialties: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  specialtyChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: "rgba(100,67,244,0.15)", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  specialtyText: { color: "#A78BFA", fontSize: 11, fontWeight: "700" },
  contactLangs: { flexDirection: "row" },
  contactLangsLabel: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  contactLangsValue: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  contactActions: { flexDirection: "row", gap: 10 },
  callBtn: { flex: 1, borderRadius: 12, overflow: "hidden", paddingVertical: 10, alignItems: "center" },
  waBtn: { flex: 1, borderRadius: 12, overflow: "hidden", paddingVertical: 10, alignItems: "center" },
  callBtnText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
