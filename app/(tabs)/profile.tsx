import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Dimensions } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const DNA_LABELS: Record<string, string> = {
  adventure: "🧗 Adventurer",
  culture: "🎭 Culture Lover",
  food: "🍜 Foodie",
  relaxation: "🧘 Relaxer",
  nightlife: "🌙 Night Owl",
  nature: "🌿 Nature Seeker",
  luxury: "👑 Luxury Traveler",
  budget: "💰 Budget Savvy",
};

const ACHIEVEMENTS = [
  { id: "a1", icon: "✈️", title: "First Flight", desc: "Booked your first trip", earned: true },
  { id: "a2", icon: "🌍", title: "Globe Trotter", desc: "Visited 3+ countries", earned: true },
  { id: "a3", icon: "⭐", title: "5-Star Traveler", desc: "Stayed in a 5-star hotel", earned: true },
  { id: "a4", icon: "🤝", title: "Social Butterfly", desc: "Referred 3 friends", earned: false },
  { id: "a5", icon: "🏆", title: "Elite Nomad", desc: "Reach Elite Nomad tier", earned: false },
  { id: "a6", icon: "📸", title: "Storyteller", desc: "Share 10 travel stories", earned: false },
];

const SETTINGS_SECTIONS = [
  {
    title: "Account",
    items: [
      { icon: "person.fill", label: "Edit Profile", action: "navigate", value: "", toggleKey: "" },
      { icon: "bell.fill", label: "Notifications", action: "navigate", value: "", toggleKey: "" },
      { icon: "shield.fill", label: "Privacy & Security", action: "navigate", value: "", toggleKey: "" },
      { icon: "lock.fill", label: "Change Password", action: "navigate", value: "", toggleKey: "" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "globe", label: "Language", value: "English", action: "navigate", toggleKey: "" },
      { icon: "dollarsign.circle.fill", label: "Currency", value: "USD", action: "navigate", toggleKey: "" },
      { icon: "moon.fill", label: "Dark Mode", action: "toggle", toggleKey: "darkMode", value: "" },
      { icon: "bell.fill", label: "Push Notifications", action: "toggle", toggleKey: "notifications", value: "" },
    ],
  },
  {
    title: "Travel",
    items: [
      { icon: "heart.fill", label: "Saved Destinations", action: "navigate", value: "", toggleKey: "" },
      { icon: "doc.fill", label: "Travel Documents", action: "navigate", value: "", toggleKey: "" },
      { icon: "creditcard.fill", label: "Payment Methods", action: "navigate", value: "", toggleKey: "" },
      { icon: "tag.fill", label: "Promo Codes", action: "navigate", value: "", toggleKey: "" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "bubble.left.fill", label: "Help & FAQ", action: "navigate", value: "", toggleKey: "" },
      { icon: "envelope.fill", label: "Contact Support", action: "navigate", value: "", toggleKey: "" },
      { icon: "star.fill", label: "Rate TRAVI", action: "navigate", value: "", toggleKey: "" },
      { icon: "square.and.arrow.up", label: "Share App", action: "navigate", value: "", toggleKey: "" },
    ],
  },
];

export default function ProfileScreen() {
  const { state, dispatch } = useStore();
  const profile = state.profile;
  const [toggles, setToggles] = useState({ darkMode: false, notifications: true });

  const displayName = profile?.name || "Alex Johnson";
  const displayEmail = profile?.email || "alex@example.com";
  const points = profile?.points || 4250;
  const trips = state.trips.length || 3;

  const dnaEntries = profile?.travelerDNA
    ? Object.entries(profile.travelerDNA).slice(0, 3)
    : [["culture", "high"], ["food", "high"], ["adventure", "medium"]];

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.replace("/(auth)/splash" as never);
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Header */}
        <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.hero}>
          {/* Settings button */}
          <TouchableOpacity style={styles.settingsIconBtn}>
            <IconSymbol name="gearshape.fill" size={22} color="#A78BCA" />
          </TouchableOpacity>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <Text style={styles.avatarText}>
                  {displayName.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </Text>
              </View>
            </LinearGradient>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <IconSymbol name="camera.fill" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{displayEmail}</Text>

          {/* Tier Badge */}
          <LinearGradient
            colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.3)"]}
            style={styles.tierBadge}
          >
            <Text style={styles.tierIcon}>🌱</Text>
            <Text style={styles.tierName}>Explorer Tier</Text>
            <View style={styles.tierSeparator} />
            <Text style={styles.tierPoints}>✦ {points.toLocaleString()} pts</Text>
          </LinearGradient>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{trips}</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{trips + 2}</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${(profile?.lifetimeSavings || 127)}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{ACHIEVEMENTS.filter((a) => a.earned).length}</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Traveler DNA */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🧬 Traveler DNA</Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/quiz" as never)}>
              <Text style={styles.seeAll}>Retake quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dnaRow}>
            {dnaEntries.map(([key]) => (
              <View key={key} style={styles.dnaBadge}>
                <Text style={styles.dnaBadgeText}>{DNA_LABELS[key] || key}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}>
            {ACHIEVEMENTS.map((ach) => (
              <View key={ach.id} style={[styles.achCard, !ach.earned && styles.achCardLocked]}>
                <Text style={[styles.achIcon, !ach.earned && styles.achIconLocked]}>{ach.icon}</Text>
                <Text style={[styles.achTitle, !ach.earned && styles.achTitleLocked]}>{ach.title}</Text>
                <Text style={styles.achDesc}>{ach.desc}</Text>
                {ach.earned && (
                  <View style={styles.achEarnedBadge}>
                    <Text style={styles.achEarnedText}>✓ Earned</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsGroup}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.settingsRow,
                    idx < section.items.length - 1 && styles.settingsRowBorder,
                  ]}
                  activeOpacity={item.action === "toggle" ? 1 : 0.7}
                >
                  <View style={styles.settingsIconContainer}>
                    <IconSymbol name={item.icon as any} size={18} color="#7B2FBE" />
                  </View>
                  <Text style={styles.settingsLabel}>{item.label}</Text>
                  {item.action === "toggle" ? (
                    <Switch
                      value={toggles[item.toggleKey as keyof typeof toggles]}
                      onValueChange={(v) => setToggles((t) => ({ ...t, [item.toggleKey!]: v }))}
                      trackColor={{ false: "#4A3080", true: "#7B2FBE" }}
                      thumbColor="#FFFFFF"
                    />
                  ) : (
                    <View style={styles.settingsRight}>
                      {item.value && <Text style={styles.settingsValue}>{item.value}</Text>}
                      <IconSymbol name="chevron.right" size={16} color="#6B5A8A" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Subscription Card */}
        <View style={styles.section}>
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={["#7B2FBE", "#E91E8C"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.subscriptionCard}
            >
              <View>
                <Text style={styles.subTitle}>TRAVI Pro ✨</Text>
                <Text style={styles.subDesc}>Unlimited AI planning • Priority support • 2x points</Text>
              </View>
              <View style={styles.subPriceContainer}>
                <Text style={styles.subPrice}>$9.99</Text>
                <Text style={styles.subPeriod}>/mo</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View style={[styles.section, { marginBottom: 0 }]}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
            <IconSymbol name="arrow.left" size={18} color="#F44336" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>TRAVI v1.0.0 • Made with ❤️ for travelers</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: { padding: 24, paddingTop: 16, alignItems: "center", gap: 12 },
  settingsIconBtn: { alignSelf: "flex-end", padding: 4 },
  avatarContainer: { position: "relative", marginTop: 4 },
  avatarRing: { width: 90, height: 90, borderRadius: 45, padding: 3 },
  avatarInner: {
    flex: 1, borderRadius: 42,
    backgroundColor: "#2D1B69",
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#FFFFFF", fontSize: 28, fontWeight: "800" },
  editAvatarBtn: {
    position: "absolute", bottom: 2, right: 2,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: "#7B2FBE",
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: "#1A0533",
  },
  userName: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },
  userEmail: { color: "#A78BCA", fontSize: 14 },
  tierBadge: {
    flexDirection: "row", alignItems: "center",
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8,
    gap: 8, borderWidth: 1, borderColor: "#7B2FBE",
  },
  tierIcon: { fontSize: 16 },
  tierName: { color: "#A78BCA", fontSize: 13, fontWeight: "600" },
  tierSeparator: { width: 1, height: 14, backgroundColor: "#4A3080" },
  tierPoints: { color: "#FFD700", fontSize: 13, fontWeight: "700" },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14, padding: 14, width: "100%",
  },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  statLabel: { color: "#A78BCA", fontSize: 11 },
  statDivider: { width: 1, backgroundColor: "#4A3080" },
  section: { paddingHorizontal: 20, paddingTop: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", marginBottom: 12 },
  seeAll: { color: "#7B2FBE", fontSize: 14, fontWeight: "600" },
  dnaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  dnaBadge: {
    backgroundColor: "rgba(123,47,190,0.2)",
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7,
    borderWidth: 1, borderColor: "#7B2FBE",
  },
  dnaBadgeText: { color: "#A78BCA", fontSize: 13, fontWeight: "600" },
  achCard: {
    width: 120, backgroundColor: "#2D1B69",
    borderRadius: 16, padding: 14, gap: 6,
    borderWidth: 1, borderColor: "#4A3080",
    alignItems: "center",
  },
  achCardLocked: { opacity: 0.5 },
  achIcon: { fontSize: 30 },
  achIconLocked: { opacity: 0.4 },
  achTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", textAlign: "center" },
  achTitleLocked: { color: "#A78BCA" },
  achDesc: { color: "#6B5A8A", fontSize: 10, textAlign: "center", lineHeight: 14 },
  achEarnedBadge: {
    backgroundColor: "rgba(76,175,80,0.2)",
    borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2,
    borderWidth: 1, borderColor: "#4CAF50",
  },
  achEarnedText: { color: "#4CAF50", fontSize: 10, fontWeight: "700" },
  settingsGroup: {
    backgroundColor: "#2D1B69", borderRadius: 16,
    borderWidth: 1, borderColor: "#4A3080", overflow: "hidden",
  },
  settingsRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  settingsRowBorder: { borderBottomWidth: 1, borderBottomColor: "#4A3080" },
  settingsIconContainer: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: "rgba(123,47,190,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  settingsLabel: { color: "#FFFFFF", fontSize: 15, flex: 1 },
  settingsRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  settingsValue: { color: "#A78BCA", fontSize: 14 },
  subscriptionCard: { borderRadius: 18, padding: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  subTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", marginBottom: 4 },
  subDesc: { color: "rgba(255,255,255,0.75)", fontSize: 12, lineHeight: 18 },
  subPriceContainer: { flexDirection: "row", alignItems: "flex-end" },
  subPrice: { color: "#FFFFFF", fontSize: 24, fontWeight: "800" },
  subPeriod: { color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 3 },
  logoutBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, backgroundColor: "rgba(244,67,54,0.1)",
    borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: "rgba(244,67,54,0.3)",
  },
  logoutText: { color: "#F44336", fontSize: 15, fontWeight: "700" },
  version: { color: "#4A3080", fontSize: 12, textAlign: "center", padding: 20, paddingTop: 16 },
});
