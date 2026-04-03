/**
 * TRAVI — Badges & Leaderboard Screen
 * Full badge collection with progress, XP system, and global/friends leaderboard.
 */

import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface Badge {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  xp: number;
  earned: boolean;
  earnedDate?: string;
  category: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  progress?: number;
  total?: number;
}

const RARITY_COLORS = {
  Common: "#6B7280",
  Rare: "#3B82F6",
  Epic: "#8B5CF6",
  Legendary: "#F59E0B",
};

const BADGES: Badge[] = [
  // Earned
  { id: "b1", emoji: "✈️", title: "First Takeoff", desc: "Book your first flight with TRAVI", xp: 100, earned: true, earnedDate: "Jan 2025", category: "Booking", rarity: "Common" },
  { id: "b2", emoji: "🧬", title: "DNA Pioneer", desc: "Complete your Traveler DNA quiz", xp: 150, earned: true, earnedDate: "Jan 2025", category: "Profile", rarity: "Common" },
  { id: "b3", emoji: "💰", title: "First Cashback", desc: "Earn your first cashback reward", xp: 200, earned: true, earnedDate: "Feb 2025", category: "Wallet", rarity: "Rare" },
  { id: "b4", emoji: "🌍", title: "World Explorer", desc: "Visit 3 different continents", xp: 500, earned: true, earnedDate: "Mar 2025", category: "Travel", rarity: "Epic" },
  { id: "b5", emoji: "🤝", title: "Social Butterfly", desc: "Connect with 5 fellow travelers", xp: 250, earned: true, earnedDate: "Feb 2025", category: "Social", rarity: "Rare" },
  { id: "b6", emoji: "⭐", title: "5-Star Reviewer", desc: "Leave 10 reviews for hotels or restaurants", xp: 300, earned: true, earnedDate: "Mar 2025", category: "Community", rarity: "Rare" },
  // In Progress
  { id: "b7", emoji: "🏆", title: "Elite Traveler", desc: "Book 10 trips with TRAVI", xp: 1000, earned: false, category: "Booking", rarity: "Legendary", progress: 7, total: 10 },
  { id: "b8", emoji: "🌟", title: "First Class DNA", desc: "Complete the First Class DNA assessment", xp: 750, earned: false, category: "Profile", rarity: "Epic", progress: 0, total: 9 },
  { id: "b9", emoji: "👥", title: "Community Leader", desc: "Get 50 followers on TRAVI", xp: 500, earned: false, category: "Social", rarity: "Epic", progress: 23, total: 50 },
  { id: "b10", emoji: "💎", title: "Diamond Member", desc: "Spend 365 days as a TRAVI member", xp: 2000, earned: false, category: "Loyalty", rarity: "Legendary", progress: 187, total: 365 },
  { id: "b11", emoji: "🗺️", title: "Continent Hopper", desc: "Visit all 7 continents", xp: 3000, earned: false, category: "Travel", rarity: "Legendary", progress: 3, total: 7 },
  { id: "b12", emoji: "🍽️", title: "Foodie Passport", desc: "Try local cuisine in 15 countries", xp: 800, earned: false, category: "Food", rarity: "Epic", progress: 8, total: 15 },
  { id: "b13", emoji: "📸", title: "Memory Maker", desc: "Add 20 trip memories to your journal", xp: 400, earned: false, category: "Community", rarity: "Rare", progress: 12, total: 20 },
  { id: "b14", emoji: "🤝", title: "Referral Champion", desc: "Refer 5 friends to TRAVI", xp: 600, earned: false, category: "Social", rarity: "Epic", progress: 2, total: 5 },
];

const LEADERBOARD = [
  { rank: 1, name: "Yael K.", avatar: "YK", xp: 12450, trips: 23, country: "🇮🇱", badge: "🏆" },
  { rank: 2, name: "Ahmed R.", avatar: "AR", xp: 11200, trips: 19, country: "🇦🇪", badge: "🥈" },
  { rank: 3, name: "Sarah L.", avatar: "SL", xp: 9800, trips: 17, country: "🇬🇧", badge: "🥉" },
  { rank: 4, name: "You", avatar: "ME", xp: 7850, trips: 14, country: "🇮🇱", badge: "", isMe: true },
  { rank: 5, name: "Oren M.", avatar: "OM", xp: 7200, trips: 13, country: "🇮🇱", badge: "" },
  { rank: 6, name: "Dana S.", avatar: "DS", xp: 6900, trips: 12, country: "🇺🇸", badge: "" },
  { rank: 7, name: "Mike R.", avatar: "MR", xp: 6400, trips: 11, country: "🇩🇪", badge: "" },
  { rank: 8, name: "Emma W.", avatar: "EW", xp: 5800, trips: 10, country: "🇬🇧", badge: "" },
  { rank: 9, name: "Yuki T.", avatar: "YT", xp: 5200, trips: 9, country: "🇯🇵", badge: "" },
  { rank: 10, name: "Maria S.", avatar: "MS", xp: 4900, trips: 8, country: "🇵🇹", badge: "" },
];

const CATEGORIES = ["All", "Booking", "Profile", "Travel", "Social", "Wallet", "Food", "Community", "Loyalty"];
const TABS = ["Badges", "Leaderboard"];

export default function BadgesLeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const earnedBadges = BADGES.filter((b) => b.earned);
  const inProgressBadges = BADGES.filter((b) => !b.earned);
  const totalXP = earnedBadges.reduce((sum, b) => sum + b.xp, 0);

  const filteredBadges = BADGES.filter((b) =>
    selectedCategory === "All" || b.category === selectedCategory
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Achievements</Text>
          <Text style={styles.headerSub}>{earnedBadges.length} badges · {totalXP.toLocaleString()} XP</Text>
        </View>
        <View style={styles.xpPill}>
          <Text style={styles.xpPillText}>⭐ {totalXP.toLocaleString()} XP</Text>
        </View>
      </View>

      {/* XP Progress bar */}
      <View style={styles.xpCard}>
        <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.xpCardRow}>
          <View>
            <Text style={styles.xpTier}>🥇 Gold Tier</Text>
            <Text style={styles.xpProgress}>{totalXP.toLocaleString()} / 10,000 XP to Platinum</Text>
          </View>
          <Text style={styles.xpPct}>{Math.round((totalXP / 10000) * 100)}%</Text>
        </View>
        <View style={styles.xpBarTrack}>
          <LinearGradient
            colors={["#6443F4", "#F94498"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.xpBarFill, { width: `${Math.min((totalXP / 10000) * 100, 100)}%` as any }]}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === i && styles.tabActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveTab(i);
            }}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>
              {tab === "Badges" ? `🏅 Badges (${BADGES.length})` : `🏆 Leaderboard`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── BADGES TAB ── */}
      {activeTab === 0 && (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryContent}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <FlatList
            data={filteredBadges}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.badgesGrid}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: badge }) => (
              <TouchableOpacity
                style={[styles.badgeCard, !badge.earned && styles.badgeCardLocked]}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedBadge(badge);
                }}
                activeOpacity={0.85}
              >
                {badge.earned && (
                  <LinearGradient
                    colors={[RARITY_COLORS[badge.rarity] + "33", RARITY_COLORS[badge.rarity] + "11"]}
                    style={StyleSheet.absoluteFillObject}
                  />
                )}
                <View style={[styles.rarityBadge, { backgroundColor: RARITY_COLORS[badge.rarity] + "33" }]}>
                  <Text style={[styles.rarityText, { color: RARITY_COLORS[badge.rarity] }]}>{badge.rarity}</Text>
                </View>
                <Text style={[styles.badgeEmoji, !badge.earned && { opacity: 0.3 }]}>{badge.emoji}</Text>
                <Text style={[styles.badgeTitle, !badge.earned && { opacity: 0.5 }]}>{badge.title}</Text>
                <Text style={[styles.badgeXP, { color: RARITY_COLORS[badge.rarity] }]}>+{badge.xp} XP</Text>
                {badge.earned ? (
                  <View style={styles.earnedBadge}>
                    <Text style={styles.earnedText}>✓ Earned</Text>
                  </View>
                ) : badge.progress !== undefined ? (
                  <View style={styles.progressWrap}>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${(badge.progress / badge.total!) * 100}%` as any, backgroundColor: RARITY_COLORS[badge.rarity] }]} />
                    </View>
                    <Text style={styles.progressText}>{badge.progress}/{badge.total}</Text>
                  </View>
                ) : (
                  <Text style={styles.lockedText}>🔒 Locked</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {/* ── LEADERBOARD TAB ── */}
      {activeTab === 1 && (
        <FlatList
          data={LEADERBOARD}
          keyExtractor={(item) => String(item.rank)}
          contentContainerStyle={styles.leaderboardList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.podium}>
              {/* Top 3 podium */}
              {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((user, i) => {
                const heights = [80, 100, 70];
                const colors = ["#C0C0C0", "#FFD700", "#CD7F32"];
                return (
                  <View key={user.rank} style={[styles.podiumSlot, { height: heights[i] + 60 }]}>
                    <Text style={styles.podiumEmoji}>{user.badge || user.country}</Text>
                    <View style={[styles.podiumAvatar, { backgroundColor: colors[i] + "33", borderColor: colors[i] }]}>
                      <Text style={styles.podiumAvatarText}>{user.avatar}</Text>
                    </View>
                    <Text style={styles.podiumName}>{user.name}</Text>
                    <Text style={[styles.podiumXP, { color: colors[i] }]}>{(user.xp / 1000).toFixed(1)}K</Text>
                    <View style={[styles.podiumBase, { height: heights[i], backgroundColor: colors[i] + "22", borderTopColor: colors[i] }]}>
                      <Text style={[styles.podiumRank, { color: colors[i] }]}>#{user.rank}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          }
          renderItem={({ item: user }) => {
            if (user.rank <= 3) return null;
            return (
              <View style={[styles.leaderRow, (user as any).isMe && styles.leaderRowMe]}>
                {(user as any).isMe && <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />}
                <Text style={styles.leaderRank}>#{user.rank}</Text>
                <View style={[styles.leaderAvatar, (user as any).isMe && { backgroundColor: "rgba(100,67,244,0.4)" }]}>
                  <Text style={styles.leaderAvatarText}>{user.avatar}</Text>
                </View>
                <View style={styles.leaderInfo}>
                  <Text style={[styles.leaderName, (user as any).isMe && { color: "#C084FC" }]}>
                    {user.name} {user.country} {(user as any).isMe ? "← You" : ""}
                  </Text>
                  <Text style={styles.leaderTrips}>{user.trips} trips</Text>
                </View>
                <Text style={styles.leaderXP}>{user.xp.toLocaleString()} XP</Text>
              </View>
            );
          }}
        />
      )}

      {/* Badge detail modal */}
      {selectedBadge && (
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSelectedBadge(null)} activeOpacity={1}>
          <View style={styles.modalCard}>
            <LinearGradient
              colors={[RARITY_COLORS[selectedBadge.rarity] + "33", "rgba(13,6,40,0.95)"]}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.modalEmoji}>{selectedBadge.emoji}</Text>
            <Text style={styles.modalTitle}>{selectedBadge.title}</Text>
            <View style={[styles.modalRarity, { backgroundColor: RARITY_COLORS[selectedBadge.rarity] + "33" }]}>
              <Text style={[styles.modalRarityText, { color: RARITY_COLORS[selectedBadge.rarity] }]}>{selectedBadge.rarity}</Text>
            </View>
            <Text style={styles.modalDesc}>{selectedBadge.desc}</Text>
            <Text style={[styles.modalXP, { color: RARITY_COLORS[selectedBadge.rarity] }]}>+{selectedBadge.xp} XP</Text>
            {selectedBadge.earned ? (
              <View style={styles.modalEarned}>
                <Text style={styles.modalEarnedText}>✓ Earned on {selectedBadge.earnedDate}</Text>
              </View>
            ) : selectedBadge.progress !== undefined ? (
              <View style={styles.modalProgress}>
                <View style={styles.modalProgressTrack}>
                  <View style={[styles.modalProgressFill, { width: `${(selectedBadge.progress / selectedBadge.total!) * 100}%` as any, backgroundColor: RARITY_COLORS[selectedBadge.rarity] }]} />
                </View>
                <Text style={styles.modalProgressText}>{selectedBadge.progress} / {selectedBadge.total}</Text>
              </View>
            ) : null}
            <TouchableOpacity style={styles.modalClose} onPress={() => setSelectedBadge(null)} activeOpacity={0.8}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 12, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  xpPill: { backgroundColor: "rgba(100,67,244,0.25)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  xpPillText: { color: "#C084FC", fontSize: 12, fontWeight: "800" },
  xpCard: { marginHorizontal: 20, borderRadius: 16, overflow: "hidden", padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)" },
  xpCardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  xpTier: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  xpProgress: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  xpPct: { color: "#C084FC", fontSize: 18, fontWeight: "900" },
  xpBarTrack: { height: 8, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" },
  xpBarFill: { height: 8, borderRadius: 4 },
  tabs: { flexDirection: "row", marginHorizontal: 20, marginBottom: 10, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 4 },
  tab: { flex: 1, paddingVertical: 9, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "rgba(100,67,244,0.3)" },
  tabText: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#FFFFFF" },
  categoryScroll: { marginBottom: 10 },
  categoryContent: { paddingHorizontal: 20, gap: 8 },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  categoryChipActive: { backgroundColor: "rgba(100,67,244,0.3)", borderColor: "#6443F4" },
  categoryText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  categoryTextActive: { color: "#FFFFFF" },
  badgesGrid: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
  badgeCard: { flex: 1, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 14, alignItems: "center", gap: 6, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", overflow: "hidden", marginHorizontal: 0 },
  badgeCardLocked: { opacity: 0.7 },
  rarityBadge: { position: "absolute", top: 8, right: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  rarityText: { fontSize: 9, fontWeight: "900" },
  badgeEmoji: { fontSize: 36, marginTop: 8 },
  badgeTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", textAlign: "center" },
  badgeXP: { fontSize: 12, fontWeight: "700" },
  earnedBadge: { backgroundColor: "rgba(34,197,94,0.2)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  earnedText: { color: "#22C55E", fontSize: 11, fontWeight: "800" },
  progressWrap: { width: "100%", gap: 4 },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: 4, borderRadius: 2 },
  progressText: { color: "rgba(255,255,255,0.4)", fontSize: 10, textAlign: "center" },
  lockedText: { color: "rgba(255,255,255,0.3)", fontSize: 11 },
  podium: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 8, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  podiumSlot: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  podiumEmoji: { fontSize: 20, marginBottom: 4 },
  podiumAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 2, marginBottom: 4 },
  podiumAvatarText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  podiumName: { color: "#FFFFFF", fontSize: 11, fontWeight: "700", textAlign: "center" },
  podiumXP: { fontSize: 11, fontWeight: "900", marginBottom: 4 },
  podiumBase: { width: "100%", alignItems: "center", justifyContent: "center", borderTopWidth: 2, borderRadius: 4 },
  podiumRank: { fontSize: 18, fontWeight: "900", paddingTop: 8 },
  leaderboardList: { paddingHorizontal: 20, paddingBottom: 40 },
  leaderRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", overflow: "hidden" },
  leaderRowMe: { borderColor: "rgba(100,67,244,0.4)" },
  leaderRank: { color: "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: "800", width: 28 },
  leaderAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  leaderAvatarText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  leaderInfo: { flex: 1 },
  leaderName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  leaderTrips: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  leaderXP: { color: "#C084FC", fontSize: 14, fontWeight: "900" },
  modalOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)", alignItems: "center", justifyContent: "center" },
  modalCard: { width: width - 60, borderRadius: 24, overflow: "hidden", padding: 24, alignItems: "center", gap: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  modalEmoji: { fontSize: 56 },
  modalTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  modalRarity: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  modalRarityText: { fontSize: 12, fontWeight: "900" },
  modalDesc: { color: "rgba(255,255,255,0.6)", fontSize: 14, textAlign: "center", lineHeight: 22 },
  modalXP: { fontSize: 20, fontWeight: "900" },
  modalEarned: { backgroundColor: "rgba(34,197,94,0.2)", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10 },
  modalEarnedText: { color: "#22C55E", fontSize: 13, fontWeight: "800" },
  modalProgress: { width: "100%", gap: 6 },
  modalProgressTrack: { height: 8, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" },
  modalProgressFill: { height: 8, borderRadius: 4 },
  modalProgressText: { color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "center" },
  modalClose: { marginTop: 8, backgroundColor: "rgba(255,255,255,0.08)", paddingHorizontal: 24, paddingVertical: 10, borderRadius: 14 },
  modalCloseText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
});
