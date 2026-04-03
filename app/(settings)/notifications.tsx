/**
 * TRAVI — Notification Settings
 */
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NotifSection = { title: string; items: { id: string; label: string; desc: string; defaultOn: boolean }[] };

const SECTIONS: NotifSection[] = [
  {
    title: "Trip Alerts",
    items: [
      { id: "price_drop", label: "Price Drop Alerts", desc: "When flight or hotel prices drop for saved trips", defaultOn: true },
      { id: "trip_reminder", label: "Trip Reminders", desc: "24h and 2h before departure", defaultOn: true },
      { id: "gate_change", label: "Gate & Flight Changes", desc: "Real-time gate changes and delays", defaultOn: true },
      { id: "checkin_open", label: "Check-in Opens", desc: "When online check-in is available", defaultOn: true },
    ],
  },
  {
    title: "Cashback & Wallet",
    items: [
      { id: "cashback_earned", label: "Cashback Earned", desc: "When you earn cashback on a booking", defaultOn: true },
      { id: "wallet_credit", label: "Wallet Credits", desc: "When credits are added to your wallet", defaultOn: true },
      { id: "kyc_status", label: "KYC Status Updates", desc: "Identity verification progress", defaultOn: true },
    ],
  },
  {
    title: "Social",
    items: [
      { id: "friend_invite", label: "Friend Invites", desc: "When someone invites you on a trip", defaultOn: true },
      { id: "dna_match", label: "DNA Matches", desc: "When a high-compatibility traveler is found", defaultOn: false },
      { id: "community_reply", label: "Community Replies", desc: "Replies to your posts and comments", defaultOn: false },
      { id: "message_new", label: "New Messages", desc: "Direct messages from other travelers", defaultOn: true },
    ],
  },
  {
    title: "Marketing",
    items: [
      { id: "deals", label: "Exclusive Deals", desc: "Personalized travel deals based on your DNA", defaultOn: true },
      { id: "newsletter", label: "Weekly Digest", desc: "Top destinations and travel tips", defaultOn: false },
      { id: "partner_offers", label: "Partner Offers", desc: "Offers from TRAVI partners", defaultOn: false },
    ],
  },
];

export default function NotificationsSettingsScreen() {
  const insets = useSafeAreaInsets();
  const [prefs, setPrefs] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    SECTIONS.forEach((s) => s.items.forEach((item) => { init[item.id] = item.defaultOn; }));
    return init;
  });

  const toggle = (id: string) => setPrefs((p) => ({ ...p, [id]: !p[id] }));

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <Text style={S.backText}>←</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>Notifications</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={S.section}>
            <Text style={S.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={S.row}>
                <View style={S.rowText}>
                  <Text style={S.rowLabel}>{item.label}</Text>
                  <Text style={S.rowDesc}>{item.desc}</Text>
                </View>
                <Switch
                  value={prefs[item.id]}
                  onValueChange={() => toggle(item.id)}
                  trackColor={{ false: "#2A2A3A", true: "#6443F4" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  headerTitle: { flex: 1, color: "#FFFFFF", fontSize: 20, fontWeight: "900", textAlign: "center", fontFamily: "Chillax-Bold" },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: "800", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)", gap: 12 },
  rowText: { flex: 1, gap: 2 },
  rowLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  rowDesc: { color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 18 },
});
