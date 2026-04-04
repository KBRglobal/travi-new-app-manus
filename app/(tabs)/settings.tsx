// Screen 55 — Settings
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const SECTIONS = [
  { title: "Account", items: [
    { label: "Change Email", icon: "email", route: "/(settings)/edit-profile" },
    { label: "Change Password", icon: "lock-outline", route: "/(settings)/change-password" },
    { label: "Privacy & Security", icon: "security", route: "/(settings)/privacy-security" },
  ]},
  { title: "Notifications", items: [
    { label: "Push Notifications", icon: "notifications-none", route: "/(settings)/notifications" },
    { label: "Email Alerts", icon: "mail-outline", route: "/(settings)/notifications" },
  ]},
  { title: "App Preferences", items: [
    { label: "Language", icon: "language", route: "/(settings)/language-selector" },
    { label: "Currency", icon: "attach-money", route: "/(settings)/currency-selector" },
  ]},
  { title: "AI Settings", items: [
    { label: "Travel DNA", icon: "science", route: "/(tabs)/dna-management" },
    { label: "AI Recommendations", icon: "auto-awesome", route: "/(tabs)/dna-management" },
  ]},
  { title: "Support", items: [
    { label: "Help Center", icon: "help-outline", route: "/(tabs)/help" },
    { label: "Contact Support", icon: "support-agent", route: "/(tabs)/support" },
    { label: "Rate TRAVI", icon: "star-outline", route: "/(tabs)/support" },
  ]},
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.title}>Settings</Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionLabel}>{section.title}</Text>
            <View style={s.sectionCard}>
              {section.items.map((item, idx) => (
                <Pressable key={item.label} style={({ pressed }) => [s.row, idx < section.items.length - 1 && s.rowBorder, pressed && { opacity: 0.7 }]} onPress={() => router.push(item.route as any)}>
                  <View style={s.iconWrap}>
                    <MaterialIcons name={item.icon as any} size={18} color={DS.purple} />
                  </View>
                  <Text style={s.rowLabel}>{item.label}</Text>
                  <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Toggles */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>Quick Toggles</Text>
          <View style={s.sectionCard}>
            <View style={[s.row, s.rowBorder]}>
              <View style={s.iconWrap}><MaterialIcons name="notifications" size={18} color={DS.purple} /></View>
              <Text style={s.rowLabel}>Push Notifications</Text>
              <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: DS.surface, true: DS.purple }} thumbColor={DS.white} />
            </View>
            <View style={s.row}>
              <View style={s.iconWrap}><MaterialIcons name="auto-awesome" size={18} color={DS.purple} /></View>
              <Text style={s.rowLabel}>AI Suggestions</Text>
              <Switch value={aiSuggestions} onValueChange={setAiSuggestions} trackColor={{ false: DS.surface, true: DS.purple }} thumbColor={DS.white} />
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
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: DS.white },
  section: { marginBottom: 20 },
  sectionLabel: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted, marginBottom: 8, marginLeft: 4, textTransform: "uppercase", letterSpacing: 0.8 },
  sectionCard: { backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  iconWrap: { width: 32, height: 32, borderRadius: 8, backgroundColor: "rgba(100,67,244,0.12)", justifyContent: "center", alignItems: "center" },
  rowLabel: { flex: 1, fontSize: 15, fontFamily: "Satoshi-Medium", color: DS.white },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,107,107,0.25)", backgroundColor: "rgba(255,107,107,0.08)", marginBottom: 16 },
  logoutText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.error },
});
