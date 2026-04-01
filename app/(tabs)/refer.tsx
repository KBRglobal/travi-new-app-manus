"use client";
import React, { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Dimensions, Animated, Share
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

const REFERRAL_CODE = "TRAVI-MAYA42";
const REFERRED_FRIENDS = [
  { id: "1", name: "Lior K.", joined: "2 days ago", status: "completed", reward: 500, initial: "L", color: "#7B2FBE" },
  { id: "2", name: "Noa S.", joined: "1 week ago", status: "completed", reward: 500, initial: "N", color: "#E91E8C" },
  { id: "3", name: "Tal M.", joined: "2 weeks ago", status: "pending", reward: 0, initial: "T", color: "#10B981" },
];

const REWARDS = [
  { icon: "star.fill", title: "500 Points", sub: "Per successful referral", color: "#FFD112" },
  { icon: "gift.fill", title: "Free Month", sub: "After 5 referrals", color: "#7B2FBE" },
  { icon: "crown.fill", title: "Elite Upgrade", sub: "After 10 referrals", color: "#E91E8C" },
];

const SHARE_OPTIONS = [
  { id: "whatsapp", label: "WhatsApp", icon: "message.fill", color: "#25D366" },
  { id: "instagram", label: "Instagram", icon: "camera.fill", color: "#E1306C" },
  { id: "link", label: "Copy Link", icon: "link", color: "#7B2FBE" },
  { id: "more", label: "More", icon: "square.and.arrow.up", color: "#9BA1A6" },
];

export default function ReferScreen() {
  const insets = useSafeAreaInsets();
  const [copied, setCopied] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const totalEarned = REFERRED_FRIENDS.filter(f => f.status === "completed").reduce((s, f) => s + f.reward, 0);
  const completedCount = REFERRED_FRIENDS.filter(f => f.status === "completed").length;

  const handleCopyCode = () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.05, duration: 100, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      await Share.share({
        message: `Join me on TRAVI — the AI travel app that plans your perfect trip! Use my code ${REFERRAL_CODE} and we both get 500 points. 🌍✈️ https://travi.app/join`,
        title: "Join TRAVI with my code",
      });
    } catch {}
  };

  return (
    <View style={S.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={[S.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <View style={S.backBtnInner}>
            <IconSymbol name="chevron.left" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <Text style={S.headerTitle}>Refer & Earn</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        {/* Hero */}
        <View style={S.hero}>
          <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.2)", "transparent"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.heroIconWrap}>
            <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={S.heroIconGrad}>
              <IconSymbol name="gift.fill" size={34} color="#FFFFFF" />
            </LinearGradient>
          </View>
          <Text style={S.heroTitle}>Share the Adventure</Text>
          <Text style={S.heroSub}>Invite friends and earn 500 TRAVI Points for every successful referral</Text>

          {/* Stats */}
          <View style={S.statsRow}>
            <View style={S.statCard}>
              <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(123,47,190,0.15)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={S.statValue}>{completedCount}</Text>
              <Text style={S.statLabel}>Friends Joined</Text>
            </View>
            <View style={S.statDivider} />
            <View style={S.statCard}>
              <LinearGradient colors={["rgba(255,209,18,0.2)", "rgba(255,209,18,0.1)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={[S.statValue, { color: "#FFD112" }]}>{totalEarned.toLocaleString()}</Text>
              <Text style={S.statLabel}>Points Earned</Text>
            </View>
            <View style={S.statDivider} />
            <View style={S.statCard}>
              <LinearGradient colors={["rgba(16,185,129,0.2)", "rgba(16,185,129,0.1)"]} style={StyleSheet.absoluteFillObject} />
              <Text style={[S.statValue, { color: "#10B981" }]}>{10 - completedCount}</Text>
              <Text style={S.statLabel}>Until Elite</Text>
            </View>
          </View>
        </View>

        {/* Referral Code */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Your Referral Code</Text>
          <Animated.View style={[S.codeCard, { transform: [{ scale: pulseAnim }] }]}>
            <LinearGradient colors={["rgba(123,47,190,0.25)", "rgba(233,30,140,0.15)"]} style={StyleSheet.absoluteFillObject} />
            <View style={S.codeLeft}>
              <Text style={S.codeLabel}>Share this code</Text>
              <Text style={S.codeValue}>{REFERRAL_CODE}</Text>
            </View>
            <TouchableOpacity style={[S.copyBtn, copied && S.copyBtnSuccess]} onPress={handleCopyCode} activeOpacity={0.8}>
              <IconSymbol name={copied ? "checkmark" : "doc.on.doc.fill"} size={16} color={copied ? "#10B981" : "#FFFFFF"} />
              <Text style={[S.copyBtnText, copied && { color: "#10B981" }]}>{copied ? "Copied!" : "Copy"}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Share options */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Share Via</Text>
          <View style={S.shareGrid}>
            {SHARE_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={S.shareBtn}
                onPress={handleShare}
                activeOpacity={0.8}
              >
                <View style={[S.shareBtnIcon, { backgroundColor: opt.color + "22" }]}>
                  <IconSymbol name={opt.icon as never} size={22} color={opt.color} />
                </View>
                <Text style={S.shareBtnLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rewards */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Rewards You Can Earn</Text>
          <View style={S.rewardsCol}>
            {REWARDS.map((reward, i) => (
              <View key={reward.title} style={S.rewardRow}>
                <LinearGradient colors={[reward.color + "15", reward.color + "08"]} style={StyleSheet.absoluteFillObject} />
                <View style={[S.rewardIconWrap, { backgroundColor: reward.color + "22" }]}>
                  <IconSymbol name={reward.icon as never} size={22} color={reward.color} />
                </View>
                <View style={S.rewardInfo}>
                  <Text style={S.rewardTitle}>{reward.title}</Text>
                  <Text style={S.rewardSub}>{reward.sub}</Text>
                </View>
                <View style={[S.rewardStep, { backgroundColor: reward.color + "22" }]}>
                  <Text style={[S.rewardStepText, { color: reward.color }]}>Step {i + 1}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Friends list */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Friends You Referred</Text>
          {REFERRED_FRIENDS.length === 0 ? (
            <View style={S.emptyCard}>
              <IconSymbol name="person.2.fill" size={32} color="rgba(255,255,255,0.2)" />
              <Text style={S.emptyText}>No referrals yet</Text>
              <Text style={S.emptySub}>Share your code to start earning</Text>
            </View>
          ) : (
            <View style={S.friendsList}>
              {REFERRED_FRIENDS.map((friend) => (
                <View key={friend.id} style={S.friendRow}>
                  <LinearGradient colors={["rgba(255,255,255,0.04)", "transparent"]} style={StyleSheet.absoluteFillObject} />
                  <View style={[S.friendAvatar, { backgroundColor: friend.color + "25", borderColor: friend.color + "50" }]}>
                    <Text style={[S.friendInitial, { color: friend.color }]}>{friend.initial}</Text>
                  </View>
                  <View style={S.friendInfo}>
                    <Text style={S.friendName}>{friend.name}</Text>
                    <Text style={S.friendJoined}>Joined {friend.joined}</Text>
                  </View>
                  <View style={[S.friendStatus, { backgroundColor: friend.status === "completed" ? "#10B98122" : "#F59E0B22" }]}>
                    <Text style={[S.friendStatusText, { color: friend.status === "completed" ? "#10B981" : "#F59E0B" }]}>
                      {friend.status === "completed" ? `+${friend.reward} pts` : "Pending"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Big Share CTA */}
        <View style={S.ctaWrap}>
          <TouchableOpacity style={S.ctaBtn} onPress={handleShare} activeOpacity={0.88}>
            <LinearGradient colors={["#7B2FBE", "#C026D3", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <IconSymbol name="square.and.arrow.up" size={20} color="#FFFFFF" />
            <Text style={S.ctaBtnText}>Invite Friends Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: W * 1.2, height: W * 1.2, borderRadius: W * 0.6, top: -W * 0.5, left: -W * 0.3, backgroundColor: "rgba(123,47,190,0.1)" },
  orb2: { position: "absolute", width: W * 0.8, height: W * 0.8, borderRadius: W * 0.4, bottom: 100, right: -W * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  backBtn: {},
  backBtnInner: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  hero: { alignItems: "center", paddingVertical: 28, paddingHorizontal: 24, gap: 10, overflow: "hidden" },
  heroIconWrap: { marginBottom: 4 },
  heroIconGrad: { width: 80, height: 80, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  heroTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "900", textAlign: "center", letterSpacing: -0.5 },
  heroSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", lineHeight: 20, maxWidth: 280 },
  statsRow: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", overflow: "hidden", width: "100%", marginTop: 8 },
  statCard: { flex: 1, alignItems: "center", paddingVertical: 16, overflow: "hidden" },
  statDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.08)" },
  statValue: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  statLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 },
  section: { paddingHorizontal: 20, marginBottom: 24, gap: 12 },
  sectionTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  codeCard: { borderRadius: 20, borderWidth: 1.5, borderColor: "rgba(123,47,190,0.5)", padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "hidden" },
  codeLeft: { gap: 4 },
  codeLabel: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  codeValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", letterSpacing: 2 },
  copyBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(123,47,190,0.4)", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(123,47,190,0.5)" },
  copyBtnSuccess: { backgroundColor: "rgba(16,185,129,0.2)", borderColor: "rgba(16,185,129,0.4)" },
  copyBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  shareGrid: { flexDirection: "row", gap: 12 },
  shareBtn: { flex: 1, alignItems: "center", gap: 8 },
  shareBtnIcon: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  shareBtnLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  rewardsCol: { gap: 10 },
  rewardRow: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", overflow: "hidden" },
  rewardIconWrap: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  rewardInfo: { flex: 1 },
  rewardTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  rewardSub: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 },
  rewardStep: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  rewardStepText: { fontSize: 11, fontWeight: "700" },
  emptyCard: { alignItems: "center", paddingVertical: 32, gap: 8, backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  emptyText: { color: "rgba(255,255,255,0.4)", fontSize: 15, fontWeight: "600" },
  emptySub: { color: "rgba(255,255,255,0.25)", fontSize: 13 },
  friendsList: { gap: 10 },
  friendRow: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", overflow: "hidden" },
  friendAvatar: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  friendInitial: { fontSize: 18, fontWeight: "800" },
  friendInfo: { flex: 1 },
  friendName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  friendJoined: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 },
  friendStatus: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  friendStatusText: { fontSize: 12, fontWeight: "700" },
  ctaWrap: { paddingHorizontal: 20, marginBottom: 8 },
  ctaBtn: { borderRadius: 18, paddingVertical: 18, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10, overflow: "hidden" },
  ctaBtnText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
});
