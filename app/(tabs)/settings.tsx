import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { useRouter } from "expo-router";
import { useState } from "react";

const SECTIONS = [
  {
    title: "Account",
    items: [
      { icon: "person", label: "Edit Profile", route: "/(tabs)/profile-edit", hasArrow: true },
      { icon: "verified-user", label: "Verify Identity", route: "/(tabs)/kyc", hasArrow: true },
      { icon: "lock", label: "Privacy & Security", route: "/(settings)/privacy-security", hasArrow: true },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "notifications", label: "Notifications", route: "/(settings)/notifications", hasArrow: true },
      { icon: "language", label: "Language", route: "/(settings)/language-selector", hasArrow: true },
      { icon: "health-and-safety", label: "Health & Activity", route: "/(settings)/health-activity", hasArrow: true },
    ],
  },
  {
    title: "Travel",
    items: [
      { icon: "flight", label: "DNA Management", route: "/(tabs)/dna-management", hasArrow: true },
      { icon: "card-membership", label: "Membership", route: "/(tabs)/membership", hasArrow: true },
      { icon: "people", label: "Invite Partner", route: "/(tabs)/invite-partner", hasArrow: true },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "help-outline", label: "Help Center", route: "/(tabs)/help", hasArrow: true },
      { icon: "emergency", label: "Emergency Contacts", route: "/(settings)/emergency", hasArrow: true },
      { icon: "info-outline", label: "About TRAVI", route: null, hasArrow: true },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  return (
    <ScreenWrapper title="Settings" scrollable bottomPad={40}>
      {/* Toggles */}
      <BlurView intensity={15} tint="dark" style={s.card}>
        <View style={[s.row, s.rowBorder]}>
          <View style={s.rowLeft}>
            <View style={[s.iconBox, { backgroundColor: DS.purple + "22" }]}>
              <MaterialIcons name="dark-mode" size={18} color={DS.purple} />
            </View>
            <Text style={s.rowLabel}>Dark Mode</Text>
          </View>
          <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: DS.border, true: DS.purple }} thumbColor={DS.white} />
        </View>
        <View style={s.row}>
          <View style={s.rowLeft}>
            <View style={[s.iconBox, { backgroundColor: DS.success + "22" }]}>
              <MaterialIcons name="fingerprint" size={18} color={DS.success} />
            </View>
            <Text style={s.rowLabel}>Biometric Login</Text>
          </View>
          <Switch value={biometrics} onValueChange={setBiometrics} trackColor={{ false: DS.border, true: DS.success }} thumbColor={DS.white} />
        </View>
      </BlurView>

      {/* Sections */}
      {SECTIONS.map(section => (
        <View key={section.title} style={s.section}>
          <Text style={s.sectionTitle}>{section.title}</Text>
          <BlurView intensity={15} tint="dark" style={s.card}>
            {section.items.map((item, i) => (
              <Pressable
                key={item.label}
                style={[s.row, i < section.items.length - 1 && s.rowBorder]}
                onPress={() => item.route && router.push(item.route as any)}
              >
                <View style={s.rowLeft}>
                  <View style={[s.iconBox, { backgroundColor: DS.surface }]}>
                    <MaterialIcons name={item.icon as any} size={18} color={DS.muted} />
                  </View>
                  <Text style={s.rowLabel}>{item.label}</Text>
                </View>
                {item.hasArrow && <MaterialIcons name="chevron-right" size={20} color={DS.placeholder} />}
              </Pressable>
            ))}
          </BlurView>
        </View>
      ))}

      {/* Sign out */}
      <Pressable style={s.signOutBtn} onPress={() => router.replace("/(auth)/splash" as any)}>
        <MaterialIcons name="logout" size={20} color={DS.error} />
        <Text style={s.signOutText}>Sign Out</Text>
      </Pressable>

      {/* Version */}
      <Text style={s.version}>TRAVI v1.0.0 · Made with ♥</Text>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  section: { marginBottom: 20 },
  sectionTitle: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Medium", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, marginLeft: 4 },
  card: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, backgroundColor: DS.surface },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  rowLabel: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  signOutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 16, borderRadius: 14, borderWidth: 1, borderColor: DS.error + "44", backgroundColor: DS.error + "11", marginBottom: 16 },
  signOutText: { color: DS.error, fontSize: 15, fontFamily: "Satoshi-Medium" },
  version: { color: DS.placeholder, fontSize: 12, fontFamily: "Satoshi-Regular", textAlign: "center" },
});
