// Screen 15 — Profile & Settings
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Switch, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const MENU_SECTIONS = [
  { title: "Account", items: [
    { label: "Edit Profile", icon: "person-outline", route: "/(tabs)/profile-edit" },
    { label: "Travel DNA", icon: "science", route: "/(tabs)/dna-management" },
    { label: "Membership", icon: "star-outline", route: "/(tabs)/membership" },
  ]},
  { title: "Wallet & Payments", items: [
    { label: "Wallet", icon: "account-balance-wallet", route: "/(tabs)/wallet" },
    { label: "Transaction History", icon: "receipt-long", route: "/(tabs)/transaction-history" },
  ]},
  { title: "Preferences", items: [
    { label: "Notifications", icon: "notifications-none", route: "/(settings)/notifications" },
    { label: "Language", icon: "language", route: "/(settings)/language-selector" },
    { label: "Currency", icon: "attach-money", route: "/(settings)/currency-selector" },
  ]},
  { title: "Support", items: [
    { label: "Help Center", icon: "help-outline", route: "/(tabs)/help" },
    { label: "Privacy & Security", icon: "security", route: "/(settings)/privacy-security" },
  ]},
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient colors={["rgba(100,67,244,0.3)", "rgba(10,5,20,0)"]} style={[s.hero, { paddingTop: insets.top + 16 }]}>
        <View style={s.avatarWrap}>
          <LinearGradient colors={[DS.purple, DS.pink] as const} style={s.avatarRing}>
            <View style={s.avatarInner}>
              <MaterialIcons name="person" size={40} color={DS.white} />
            </View>
          </LinearGradient>
        </View>
        <Text style={s.name}>David Cohen</Text>
        <Text style={s.email}>david@example.com</Text>
        <View style={s.dnaRow}>
          <View style={s.dnaBadge}>
            <MaterialIcons name="science" size={12} color={DS.purple} />
            <Text style={s.dnaText}>Explorer DNA</Text>
          </View>
          <View style={s.statBadge}>
            <Text style={s.statNum}>12</Text>
            <Text style={s.statLabel}>Trips</Text>
          </View>
          <View style={s.statBadge}>
            <Text style={s.statNum}>8</Text>
            <Text style={s.statLabel}>Countries</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Menu sections */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionTitle}>{section.title}</Text>
            <View style={s.sectionCard}>
              {section.items.map((item, idx) => (
                <Pressable key={item.label} style={({ pressed }) => [s.menuRow, idx < section.items.length - 1 && s.menuRowBorder, pressed && { opacity: 0.7 }]} onPress={() => router.push(item.route as any)}>
                  <View style={s.menuIconWrap}>
                    <MaterialIcons name={item.icon as any} size={18} color={DS.purple} />
                  </View>
                  <Text style={s.menuLabel}>{item.label}</Text>
                  <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Dark mode toggle */}
        <View style={s.section}>
          <View style={s.sectionCard}>
            <View style={s.menuRow}>
              <View style={s.menuIconWrap}>
                <MaterialIcons name="dark-mode" size={18} color={DS.purple} />
              </View>
              <Text style={s.menuLabel}>Dark Mode</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: DS.surface, true: DS.purple }} thumbColor={DS.white} />
            </View>
          </View>
        </View>

        {/* Logout */}
        <Pressable style={({ pressed }) => [s.logoutBtn, pressed && { opacity: 0.7 }]} onPress={() => router.replace("/(auth)/sign-up" as any)}>
          <MaterialIcons name="logout" size={18} color={DS.error} style={{ marginRight: 8 }} />
          <Text style={s.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { alignItems: "center", paddingBottom: 24, paddingHorizontal: 24 },
  avatarWrap: { marginBottom: 12 },
  avatarRing: { width: 88, height: 88, borderRadius: 44, padding: 2 },
  avatarInner: { flex: 1, borderRadius: 42, backgroundColor: DS.surface, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 22, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 4 },
  email: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted, marginBottom: 16 },
  dnaRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  dnaBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, backgroundColor: "rgba(100,67,244,0.15)", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  dnaText: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.purple },
  statBadge: { alignItems: "center", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  statNum: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white },
  statLabel: { fontSize: 11, fontFamily: "Satoshi-Regular", color: DS.muted },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.muted, marginBottom: 8, marginLeft: 4, textTransform: "uppercase", letterSpacing: 0.8 },
  sectionCard: { backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, overflow: "hidden" },
  menuRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  menuIconWrap: { width: 32, height: 32, borderRadius: 8, backgroundColor: "rgba(100,67,244,0.12)", justifyContent: "center", alignItems: "center" },
  menuLabel: { flex: 1, fontSize: 15, fontFamily: "Satoshi-Medium", color: DS.white },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,107,107,0.25)", backgroundColor: "rgba(255,107,107,0.08)", marginBottom: 16 },
  logoutText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.error },
});
