import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Dimensions, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { getDNA, type TravelerDNA } from "@/lib/dna-store";

const { width } = Dimensions.get("window");

type IconName = "figure.run" | "building.columns.fill" | "fork.knife" | "figure.yoga" | "moon.fill" | "leaf.fill" | "crown.fill" | "dollarsign.circle.fill";

const DNA_CONFIG: Record<string, { label: string; icon: IconName; color: string }> = {
  adventure: { label: "Adventurer", icon: "figure.run", color: "#F94498" },
  culture: { label: "Culture Lover", icon: "building.columns.fill", color: "#6443F4" },
  food: { label: "Foodie", icon: "fork.knife", color: "#FF9800" },
  relaxation: { label: "Relaxer", icon: "figure.yoga", color: "#4CAF50" },
  nightlife: { label: "Night Owl", icon: "moon.fill", color: "#2196F3" },
  nature: { label: "Nature Seeker", icon: "leaf.fill", color: "#02A65C" },
  luxury: { label: "Luxury Traveler", icon: "crown.fill", color: "#FFD700" },
  budget: { label: "Budget Savvy", icon: "dollarsign.circle.fill", color: "#06B6D4" },
};

type AchIcon = "airplane" | "safari.fill" | "star.fill" | "person.2.fill" | "crown.fill" | "camera.fill";
const ACHIEVEMENTS: { id: string; icon: AchIcon; iconColor: string; title: string; desc: string; earned: boolean }[] = [
  { id: "a1", icon: "airplane", iconColor: "#6443F4", title: "First Flight", desc: "Booked first trip", earned: true },
  { id: "a2", icon: "safari.fill", iconColor: "#F94498", title: "Globe Trotter", desc: "3+ countries", earned: true },
  { id: "a3", icon: "star.fill", iconColor: "#FFD700", title: "5-Star Traveler", desc: "Stayed in 5-star hotel", earned: true },
  { id: "a4", icon: "person.2.fill", iconColor: "#2196F3", title: "Social Butterfly", desc: "Refer 3 friends", earned: false },
  { id: "a5", icon: "crown.fill", iconColor: "#FF9800", title: "Elite Nomad", desc: "Reach Elite tier", earned: false },
  { id: "a6", icon: "camera.fill", iconColor: "#4CAF50", title: "Storyteller", desc: "Share 10 stories", earned: false },
];

const SETTINGS_SECTIONS = [
  {
    title: "Account",
    items: [
      { icon: "person.fill" as const, label: "Edit Profile", value: "", toggleKey: "", isToggle: false },
      { icon: "bell.fill" as const, label: "Notifications", value: "", toggleKey: "notifications", isToggle: true },
      { icon: "shield.fill" as const, label: "Privacy & Security", value: "", toggleKey: "", isToggle: false },
      { icon: "lock.fill" as const, label: "Change Password", value: "", toggleKey: "", isToggle: false },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "globe" as const, label: "Language", value: "English", toggleKey: "", isToggle: false },
      { icon: "dollarsign.circle.fill" as const, label: "Currency", value: "USD", toggleKey: "", isToggle: false },
      { icon: "moon.fill" as const, label: "Dark Mode", value: "", toggleKey: "darkMode", isToggle: true },
    ],
  },
  {
    title: "Premium",
    items: [
      { icon: "crown.fill" as const, label: "Upgrade Plan", value: "Explorer", toggleKey: "", isToggle: false, route: "/(tabs)/subscription" },
      { icon: "gift.fill" as const, label: "Refer & Earn", value: "500 pts/friend", toggleKey: "", isToggle: false, route: "/(tabs)/refer" },
    ],
  },
  {
    title: "Travel",
    items: [
      { icon: "heart.fill" as const, label: "Saved Destinations", value: "", toggleKey: "", isToggle: false },
      { icon: "doc.fill" as const, label: "Travel Documents", value: "", toggleKey: "", isToggle: false },
      { icon: "creditcard.fill" as const, label: "Payment Methods", value: "", toggleKey: "", isToggle: false },
      { icon: "tag.fill" as const, label: "Promo Codes", value: "", toggleKey: "", isToggle: false },
    ],
  },
  {
    title: "Business & Invest",
    items: [
      { icon: "building.2.fill" as const, label: "UAE Real Estate", value: "Dubai / Abu Dhabi", toggleKey: "", isToggle: false, route: "/(tabs)/real-estate" },
      { icon: "chart.bar.fill" as const, label: "Enterprise Dashboard", value: "B2B Analytics", toggleKey: "", isToggle: false, route: "/(tabs)/enterprise" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "bubble.left.fill" as const, label: "Help & FAQ", value: "", toggleKey: "", isToggle: false, route: "/(tabs)/support" },
      { icon: "envelope.fill" as const, label: "Contact Support", value: "", toggleKey: "", isToggle: false, route: "/(tabs)/support" },
      { icon: "star.fill" as const, label: "Rate TRAVI", value: "", toggleKey: "", isToggle: false },
    ],
  },
];

const TRAIT_CONFIG = [
  { key: "adventureLevel" as const, label: "Adventure", color: "#F94498", emoji: "🏄" },
  { key: "culturalDepth" as const, label: "Culture", color: "#6443F4", emoji: "🏛️" },
  { key: "foodieness" as const, label: "Foodie", color: "#F97316", emoji: "🍜" },
  { key: "luxuryAffinity" as const, label: "Luxury", color: "#FFD700", emoji: "👑" },
  { key: "natureConnection" as const, label: "Nature", color: "#22C55E", emoji: "🌿" },
  { key: "socialEnergy" as const, label: "Social", color: "#06B6D4", emoji: "🎉" },
];

export default function ProfileScreen() {
  const { state, dispatch } = useStore();
  const insets = useSafeAreaInsets();
  const profile = state.profile;
  const [toggles, setToggles] = useState({ darkMode: false, notifications: true });
  const [liveDNA, setLiveDNA] = useState<TravelerDNA | null>(null);
  const traitAnims = useRef(TRAIT_CONFIG.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    getDNA().then((dna) => {
      setLiveDNA(dna);
      const animations = TRAIT_CONFIG.map((t, i) =>
        Animated.timing(traitAnims[i], {
          toValue: dna.traits[t.key] / 100,
          duration: 800 + i * 100,
          useNativeDriver: false,
        })
      );
      Animated.stagger(80, animations).start();
    });
  }, []);

  const displayName = profile?.name || "Alex Johnson";
  const displayEmail = profile?.email || "alex@example.com";
  const points = profile?.points || 4250;
  const trips = state.trips.length || 3;
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.replace("/(auth)/splash" as never);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { paddingTop: Math.max(insets.top, 44) + 16 }]}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.avatarWrap}>
            <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            </LinearGradient>
            <TouchableOpacity style={styles.editAvatarBtn} activeOpacity={0.8}>
              <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.editAvatarGradient}>
                <IconSymbol name="camera.fill" size={12} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{displayEmail}</Text>

          {/* Tier Badge */}
          <TouchableOpacity style={styles.tierBadge} activeOpacity={0.85}>
            <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.tierGradient}>
              <IconSymbol name="leaf.fill" size={14} color="#4CAF50" />
              <Text style={styles.tierName}>Explorer Tier</Text>
              <View style={styles.tierSep} />
              <IconSymbol name="sparkles" size={12} color="#FFD700" />
              <Text style={styles.tierPoints}>{points.toLocaleString()} pts</Text>
              <IconSymbol name="chevron.right" size={14} color="rgba(255,255,255,0.5)" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { value: String(trips), label: "Trips" },
              { value: String(trips + 2), label: "Countries" },
              { value: `$${profile?.lifetimeSavings || 127}`, label: "Saved" },
              { value: String(ACHIEVEMENTS.filter((a) => a.earned).length), label: "Badges" },
            ].map((stat, i) => (
              <View key={i} style={styles.statItem}>
                {i > 0 && <View style={styles.statDivider} />}
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Traveler DNA — Live Traits */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <IconSymbol name="sparkles" size={16} color="#C084FC" />
              <Text style={styles.sectionTitle}>Traveler DNA</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(auth)/quiz" as never)} activeOpacity={0.7}>
              <Text style={styles.seeAll}>Retake quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dnaTraitsCard}>
            <LinearGradient colors={["rgba(100,67,244,0.08)", "rgba(249,68,152,0.06)"]} style={StyleSheet.absoluteFillObject} />
            {liveDNA && liveDNA.totalInteractions > 0 ? (
              <>
                <Text style={styles.dnaCardLabel}>Your profile is {Math.min(100, Math.round(liveDNA.totalInteractions * 2))}% complete</Text>
                {TRAIT_CONFIG.map((trait, i) => {
                  const value = liveDNA.traits[trait.key];
                  const barWidth = traitAnims[i].interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });
                  return (
                    <View key={trait.key} style={styles.traitRow}>
                      <Text style={styles.traitEmoji}>{trait.emoji}</Text>
                      <View style={styles.traitInfo}>
                        <View style={styles.traitLabelRow}>
                          <Text style={styles.traitLabel}>{trait.label}</Text>
                          <Text style={[styles.traitScore, { color: trait.color }]}>{Math.round(value)}</Text>
                        </View>
                        <View style={styles.traitTrack}>
                          <Animated.View style={[styles.traitBar, { width: barWidth, backgroundColor: trait.color }]} />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </>
            ) : (
              <View style={styles.dnaEmptyWrap}>
                <Text style={styles.dnaEmptyEmoji}>🧬</Text>
                <Text style={styles.dnaEmptyTitle}>Your DNA is just getting started</Text>
                <Text style={styles.dnaEmptySub}>Plan a trip or take the quiz to build your traveler profile</Text>
                <TouchableOpacity
                  style={styles.dnaEmptyBtn}
                  onPress={() => router.push("/(auth)/quiz" as never)}
                  activeOpacity={0.85}
                >
                  <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.dnaEmptyBtnGradient}>
                    <Text style={styles.dnaEmptyBtnText}>Take the DNA Quiz →</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <IconSymbol name="trophy.fill" size={16} color="#FFD700" />
              <Text style={styles.sectionTitle}>Achievements</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {ACHIEVEMENTS.map((ach) => (
              <View key={ach.id} style={[styles.achCard, !ach.earned && styles.achCardLocked]}>
                <LinearGradient
                  colors={ach.earned ? [ach.iconColor + "33", ach.iconColor + "18"] : ["rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)"]}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={[styles.achIconWrap, { backgroundColor: ach.iconColor + "22", opacity: ach.earned ? 1 : 0.3 }]}>
                  <IconSymbol name={ach.icon} size={22} color={ach.iconColor} />
                </View>
                <Text style={[styles.achTitle, !ach.earned && styles.achTitleLocked]}>{ach.title}</Text>
                <Text style={styles.achDesc}>{ach.desc}</Text>
                {ach.earned && (
                  <View style={styles.achEarned}>
                    <IconSymbol name="checkmark.circle.fill" size={12} color="#4CAF50" />
                    <Text style={styles.achEarnedText}>Earned</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* TRAVI Pro Card */}
        <TouchableOpacity style={styles.proCard} activeOpacity={0.88} onPress={() => router.push("/(tabs)/subscription" as never)}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.proGradient}>
            <View style={styles.proCircle1} />
            <View style={styles.proCircle2} />
            <View style={styles.proContent}>
              <View style={styles.proTitleRow}>
                <IconSymbol name="sparkles" size={16} color="#FFFFFF" />
                <Text style={styles.proTitle}>TRAVI Pro</Text>
              </View>
              <Text style={styles.proDesc}>Unlimited AI planning • 2x points • Priority support</Text>
            </View>
            <View style={styles.proPrice}>
              <Text style={styles.proPriceValue}>$9.99</Text>
              <Text style={styles.proPricePeriod}>/mo</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsGroup}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.settingsRow, idx < section.items.length - 1 && styles.settingsRowBorder]}
                  activeOpacity={item.isToggle ? 1 : 0.7}
                  onPress={() => {
                    if (!item.isToggle && (item as any).route) router.push((item as any).route as never);
                  }}
                >
                  <View style={styles.settingsIconWrap}>
                    <IconSymbol name={item.icon} size={16} color="#6443F4" />
                  </View>
                  <Text style={styles.settingsLabel}>{item.label}</Text>
                  {item.isToggle ? (
                    <Switch
                      value={toggles[item.toggleKey as keyof typeof toggles]}
                      onValueChange={(v) => setToggles((t) => ({ ...t, [item.toggleKey]: v }))}
                      trackColor={{ false: "rgba(255,255,255,0.1)", true: "#6443F4" }}
                      thumbColor="#FFFFFF"
                    />
                  ) : (
                    <View style={styles.settingsRight}>
                      {item.value ? <Text style={styles.settingsValue}>{item.value}</Text> : null}
                      <IconSymbol name="chevron.right" size={14} color="#5A4D72" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <LinearGradient colors={["rgba(244,67,54,0.15)", "rgba(244,67,54,0.08)"]} style={styles.logoutGradient}>
            <IconSymbol name="arrow.left" size={18} color="#F44336" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.version}>TRAVI v1.0.0 • Made with care for travelers</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.09)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.06)" },
  scroll: { paddingHorizontal: 22, paddingTop: 60, paddingBottom: 110, gap: 24 },
  hero: { alignItems: "center", gap: 10 },
  avatarWrap: { position: "relative", marginBottom: 4 },
  avatarRing: { width: 90, height: 90, borderRadius: 45, padding: 3 },
  avatarInner: { flex: 1, borderRadius: 42, backgroundColor: "#1A0A3D", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFFFFF", fontSize: 28, fontWeight: "800" },
  editAvatarBtn: { position: "absolute", bottom: 0, right: 0, borderRadius: 12, overflow: "hidden" },
  editAvatarGradient: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  userName: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },
  userEmail: { color: "#5A4D72", fontSize: 14 },
  tierBadge: { borderRadius: 14, overflow: "hidden" },
  tierGradient: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  tierName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  tierSep: { width: 1, height: 14, backgroundColor: "rgba(255,255,255,0.2)" },
  tierPoints: { color: "#FFD700", fontSize: 13, fontWeight: "700" },
  statsRow: { flexDirection: "row", width: "100%", borderRadius: 20, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" },
  statItem: { flex: 1, alignItems: "center", paddingVertical: 16, gap: 4 },
  statDivider: { position: "absolute", left: 0, top: 12, bottom: 12, width: 1, backgroundColor: "rgba(255,255,255,0.08)" },
  statValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  statLabel: { color: "#5A4D72", fontSize: 11 },
  section: { gap: 14 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  seeAll: { color: "#C084FC", fontSize: 13, fontWeight: "600" },
  dnaRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  dnaBadge: { borderRadius: 12, overflow: "hidden" },
  dnaBadgeGradient: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  dnaBadgeText: { fontSize: 13, fontWeight: "600" },
  achCard: { width: 120, borderRadius: 18, padding: 14, gap: 6, alignItems: "center", overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.1)" },
  achCardLocked: { borderColor: "rgba(255,255,255,0.05)" },
  achIconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  achTitle: { color: "#FFFFFF", fontSize: 12, fontWeight: "700", textAlign: "center" },
  achTitleLocked: { color: "#3A2D4E" },
  achDesc: { color: "#5A4D72", fontSize: 10, textAlign: "center", lineHeight: 14 },
  achEarned: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  achEarnedText: { color: "#4CAF50", fontSize: 10, fontWeight: "700" },
  proCard: { borderRadius: 20, overflow: "hidden" },
  proGradient: { flexDirection: "row", alignItems: "center", padding: 20, gap: 14 },
  proCircle1: { position: "absolute", width: 120, height: 120, borderRadius: 60, top: -30, right: -20, backgroundColor: "rgba(255,255,255,0.08)" },
  proCircle2: { position: "absolute", width: 80, height: 80, borderRadius: 40, bottom: -20, left: 20, backgroundColor: "rgba(255,255,255,0.06)" },
  proContent: { flex: 1, gap: 4 },
  proTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  proTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  proDesc: { color: "rgba(255,255,255,0.7)", fontSize: 12, lineHeight: 18 },
  proPrice: { alignItems: "flex-end" },
  proPriceValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },
  proPricePeriod: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  settingsGroup: { borderRadius: 20, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" },
  settingsRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 14 },
  settingsRowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.06)" },
  settingsIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(123,47,190,0.2)", alignItems: "center", justifyContent: "center" },
  settingsLabel: { flex: 1, color: "#FFFFFF", fontSize: 15 },
  settingsRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  settingsValue: { color: "#5A4D72", fontSize: 14 },
  logoutBtn: { borderRadius: 16, overflow: "hidden" },
  logoutGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: "rgba(244,67,54,0.3)" },
  logoutText: { color: "#F44336", fontSize: 16, fontWeight: "700" },
  version: { color: "#3A2D4E", fontSize: 12, textAlign: "center" },
  // DNA Traits
  dnaTraitsCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", padding: 16, gap: 12 },
  dnaCardLabel: { color: "#C084FC", fontSize: 12, fontWeight: "600", marginBottom: 4 },
  traitRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  traitEmoji: { fontSize: 18, width: 28, textAlign: "center" },
  traitInfo: { flex: 1, gap: 4 },
  traitLabelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  traitLabel: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "600" },
  traitScore: { fontSize: 12, fontWeight: "700" },
  traitTrack: { height: 6, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" },
  traitBar: { height: 6, borderRadius: 3 },
  // DNA Empty State
  dnaEmptyWrap: { alignItems: "center", gap: 10, paddingVertical: 8 },
  dnaEmptyEmoji: { fontSize: 36 },
  dnaEmptyTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", textAlign: "center" },
  dnaEmptySub: { color: "#5A4D72", fontSize: 13, textAlign: "center", lineHeight: 18 },
  dnaEmptyBtn: { borderRadius: 14, overflow: "hidden", marginTop: 4 },
  dnaEmptyBtnGradient: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 14 },
  dnaEmptyBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
});
