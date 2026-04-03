/**
 * TRAVI — Invite Travel Partner
 */
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PENDING_INVITES = [
  { id: "1", name: "Sarah Cohen", dna: "Explorer · Foodie", compatibility: 94, avatar: "S", status: "pending" },
  { id: "2", name: "Yoni Levi", dna: "Adventurer · Naturalist", compatibility: 87, avatar: "Y", status: "accepted" },
];

export default function InvitePartnerScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Hey! I'm planning a trip with TRAVI and would love for you to join me. Check out our DNA compatibility!");
  const [sent, setSent] = useState(false);

  const sendInvite = () => {
    if (!email) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
  };

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <Text style={S.backText}>←</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>Invite Travel Partner</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Hero */}
        <View style={S.hero}>
          <Text style={S.heroEmoji}>✈️🤝</Text>
          <Text style={S.heroTitle}>Travel Together</Text>
          <Text style={S.heroDesc}>Invite a friend to plan your trip together. TRAVI will merge your itineraries and find experiences you'll both love based on your DNA compatibility.</Text>
        </View>

        {/* Pending invites */}
        {PENDING_INVITES.length > 0 && (
          <View style={S.section}>
            <Text style={S.sectionTitle}>Pending & Active Partners</Text>
            {PENDING_INVITES.map((inv) => (
              <View key={inv.id} style={S.inviteCard}>
                <View style={S.inviteAvatar}>
                  <Text style={S.inviteAvatarText}>{inv.avatar}</Text>
                </View>
                <View style={S.inviteInfo}>
                  <Text style={S.inviteName}>{inv.name}</Text>
                  <Text style={S.inviteDna}>{inv.dna}</Text>
                  <Text style={S.inviteCompat}>{inv.compatibility}% DNA match</Text>
                </View>
                <View style={[S.statusBadge, inv.status === "accepted" ? S.statusAccepted : S.statusPending]}>
                  <Text style={S.statusText}>{inv.status === "accepted" ? "✓ Joined" : "Pending"}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Send invite */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Send New Invite</Text>
          <Text style={S.fieldLabel}>Email or Phone</Text>
          <TextInput
            style={S.input}
            value={email}
            onChangeText={setEmail}
            placeholder="friend@example.com or +972-50-..."
            placeholderTextColor="rgba(255,255,255,0.35)"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={[S.fieldLabel, { marginTop: 14 }]}>Personal Message</Text>
          <TextInput
            style={[S.input, S.textarea]}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {sent ? (
            <View style={S.sentBanner}>
              <Text style={S.sentText}>✓ Invite sent successfully!</Text>
            </View>
          ) : (
            <TouchableOpacity style={S.sendBtn} onPress={sendInvite} activeOpacity={0.88}>
              <Text style={S.sendBtnText}>Send Invite</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Share link */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Share Your Trip Link</Text>
          <View style={S.linkCard}>
            <Text style={S.linkText}>travi.app/join/trip/abc123</Text>
            <TouchableOpacity style={S.copyBtn} activeOpacity={0.8}>
              <Text style={S.copyBtnText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerTitle: { flex: 1, color: "#FFFFFF", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold", textAlign: "center" },
  hero: { marginHorizontal: 20, marginBottom: 24, borderRadius: 18, backgroundColor: "rgba(100,67,244,0.1)", borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", padding: 20, alignItems: "center", gap: 8 },
  heroEmoji: { fontSize: 36 },
  heroTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  heroDesc: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 20, textAlign: "center" },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 },
  inviteCard: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.12)" },
  inviteAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(100,67,244,0.25)", alignItems: "center", justifyContent: "center" },
  inviteAvatarText: { color: "#A78BFA", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  inviteInfo: { flex: 1, gap: 2 },
  inviteName: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  inviteDna: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  inviteCompat: { color: "#22C55E", fontSize: 12, fontWeight: "700" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  statusAccepted: { backgroundColor: "rgba(34,197,94,0.15)", borderWidth: 1, borderColor: "rgba(34,197,94,0.3)" },
  statusPending: { backgroundColor: "rgba(245,158,11,0.15)", borderWidth: 1, borderColor: "rgba(245,158,11,0.3)" },
  statusText: { fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", color: "#FFFFFF" },
  fieldLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 },
  input: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", paddingHorizontal: 14, paddingVertical: 12, color: "#FFFFFF", fontSize: 14 },
  textarea: { height: 100, paddingTop: 12 },
  sendBtn: { marginTop: 16, borderRadius: 14, backgroundColor: "#6443F4", paddingVertical: 16, alignItems: "center" },
  sendBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
  sentBanner: { marginTop: 16, borderRadius: 12, backgroundColor: "rgba(34,197,94,0.15)", borderWidth: 1, borderColor: "rgba(34,197,94,0.3)", paddingVertical: 14, alignItems: "center" },
  sentText: { color: "#22C55E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  linkCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", paddingHorizontal: 14, paddingVertical: 12 },
  linkText: { flex: 1, color: "rgba(255,255,255,0.5)", fontSize: 13 },
  copyBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: "rgba(100,67,244,0.2)", borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  copyBtnText: { color: "#A78BFA", fontSize: 12, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
});
