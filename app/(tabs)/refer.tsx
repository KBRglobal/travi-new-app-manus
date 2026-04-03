// @ts-nocheck
"use client";
import React, { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Dimensions, Animated, Share
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

const { width: W } = Dimensions.get("window");

const REFERRAL_CODE = "TRAVI-MAYA42";
const REFERRED_FRIENDS = [
  { id: "1", name: "Lior K.", joined: "2 days ago", status: "completed", reward: 500, initial: "L", color: "#6443F4" },
  { id: "2", name: "Noa S.", joined: "1 week ago", status: "completed", reward: 500, initial: "N", color: "#F94498" },
  { id: "3", name: "Tal M.", joined: "2 weeks ago", status: "pending", reward: 0, initial: "T", color: "#02A65C" },
];

const REWARDS = [
  { icon: "star.fill", title: "500 Points", sub: "Per successful referral", color: "#FFD112" },
  { icon: "gift.fill", title: "Free Month", sub: "After 5 referrals", color: "#6443F4" },
  { icon: "crown.fill", title: "Elite Upgrade", sub: "After 10 referrals", color: "#F94498" },
];

const SHARE_OPTIONS = [
  { id: "whatsapp", label: "WhatsApp", icon: "message.fill", color: "#25D366" },
  { id: "instagram", label: "Instagram", icon: "camera.fill", color: "#E1306C" },
  { id: "link", label: "Copy Link", icon: "link", color: "#6443F4" },
  { id: "more", label: "More", icon: "square.and.arrow.up", color: "#9BA1A6" },
];

export default function ReferScreen() {
  const insets = useSafeAreaInsets();
  const [copied, setCopied] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { isAuthenticated } = useAuth();

  // Fetch real referrals from DB when authenticated
  const referralsQuery = trpc.referrals.list.useQuery(undefined, { enabled: isAuthenticated });
  const dbReferrals = referralsQuery.data ?? [];

  // Use real DB referrals if available, otherwise fall back to mock data
  const displayReferrals = dbReferrals.length > 0
    ? dbReferrals.map((r: any, i: number) => ({
        id: String(r.id),
        name: `Referral #${i + 1}`,
        joined: new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        status: r.status,
        reward: r.status === "completed" ? 500 : 0,
        initial: String.fromCharCode(65 + (i % 26)),
        color: ["#6443F4", "#F94498", "#02A65C", "#F59E0B", "#06B6D4"][i % 5],
      }))
    : REFERRED_FRIENDS;

  const totalEarned = displayReferrals.filter((f: any) => f.status === "completed").reduce((s: number, f: any) => s + f.reward, 0);
  const completedCount = displayReferrals.filter((f: any) => f.status === "completed").length;

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
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={[S.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <View style={S.backBtnInner}>
            <IconSymbol name="chevron.left" size={18} color="#1A0B2E" />
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
            <LinearGradient colors={["#6443F4", "#F94498"]} style={S.heroIconGrad}>
              <IconSymbol name="gift.fill" size={34} color="#1A0B2E" />
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
              <Text style={[S.statValue, { color: "#02A65C" }]}>{10 - completedCount}</Text>
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
              <IconSymbol name={copied ? "checkmark" : "doc.on.doc.fill"} size={16} color={copied ? "#02A65C" : "#1A0B2E"} />
              <Text style={[S.copyBtnText, copied && { color: "#02A65C" }]}>{copied ? "Copied!" : "Copy"}</Text>
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
          {displayReferrals.length === 0 ? (
            <View style={S.emptyCard}>
              <IconSymbol name="person.2.fill" size={32} color="rgba(255,255,255,0.06)" />
              <Text style={S.emptyText}>No referrals yet</Text>
              <Text style={S.emptySub}>Share your code to start earning</Text>
            </View>
          ) : (
            <View style={S.friendsList}>
              {displayReferrals.map((friend: typeof REFERRED_FRIENDS[0]) => (
                <View key={friend.id} style={S.friendRow}>
                  <LinearGradient colors={["rgba(255,255,255,0.06)", "transparent"]} style={StyleSheet.absoluteFillObject} />
                  <View style={[S.friendAvatar, { backgroundColor: friend.color + "25", borderColor: friend.color + "50" }]}>
                    <Text style={[S.friendInitial, { color: friend.color }]}>{friend.initial}</Text>
                  </View>
                  <View style={S.friendInfo}>
                    <Text style={S.friendName}>{friend.name}</Text>
                    <Text style={S.friendJoined}>Joined {friend.joined}</Text>
                  </View>
                  <View style={[S.friendStatus, { backgroundColor: friend.status === "completed" ? "#02A65C22" : "#F59E0B22" }]}>
                    <Text style={[S.friendStatusText, { color: friend.status === "completed" ? "#02A65C" : "#F59E0B" }]}>
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
            <LinearGradient colors={["#6443F4", "#F94498", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <IconSymbol name="square.and.arrow.up" size={20} color="#1A0B2E" />
            <Text style={S.ctaBtnText}>Invite Friends Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: W * 1.2, height: W * 1.2, borderRadius: W * 0.6, top: -W * 0.5, left: -W * 0.3, backgroundColor: "rgba(123,47,190,0.1)" },
  orb2: { position: "absolute", width: W * 0.8, height: W * 0.8, borderRadius: W * 0.4, bottom: 100, right: -W * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  backBtn: {},
  backBtnInner: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  headerTitle: { color: "#1A0B2E", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  hero: { alignItems: "center", paddingVertical: 28, paddingHorizontal: 24, gap: 10, overflow: "hidden" },
  heroIconWrap: { marginBottom: 4 },
  heroIconGrad: { width: 80, height: 80, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  heroTitle: { color: "#1A0B2E", fontSize: 26, fontWeight: "900", textAlign: "center", letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  heroSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", lineHeight: 20, maxWidth: 280, fontFamily: "Satoshi-Regular" },
  statsRow: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", overflow: "hidden", width: "100%", marginTop: 8 },
  statCard: { flex: 1, alignItems: "center", paddingVertical: 16, overflow: "hidden" },
  statDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  statValue: { color: "#1A0B2E", fontSize: 24, fontWeight: "900", fontFamily: "Chillax-Bold" },
  statLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 },
  section: { paddingHorizontal: 20, marginBottom: 24, gap: 12 },
  sectionTitle: { color: "#1A0B2E", fontSize: 17, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  codeCard: { borderRadius: 20, borderWidth: 1.5, borderColor: "rgba(123,47,190,0.5)", padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "hidden" },
  codeLeft: { gap: 4 },
  codeLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  codeValue: { color: "#1A0B2E", fontSize: 22, fontWeight: "900", letterSpacing: 2, fontFamily: "Chillax-Bold" },
  copyBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(123,47,190,0.4)", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(123,47,190,0.5)" },
  copyBtnSuccess: { backgroundColor: "rgba(16,185,129,0.2)", borderColor: "rgba(16,185,129,0.4)" },
  copyBtnText: { color: "#1A0B2E", fontSize: 14, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  shareGrid: { flexDirection: "row", gap: 12 },
  shareBtn: { flex: 1, alignItems: "center", gap: 8 },
  shareBtnIcon: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  shareBtnLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  rewardsCol: { gap: 10 },
  rewardRow: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", overflow: "hidden" },
  rewardIconWrap: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  rewardInfo: { flex: 1 },
  rewardTitle: { color: "#1A0B2E", fontSize: 15, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  rewardSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  rewardStep: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  rewardStepText: { fontSize: 11, fontWeight: "700" },
  emptyCard: { alignItems: "center", paddingVertical: 32, gap: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  emptyText: { color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  emptySub: { color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  friendsList: { gap: 10 },
  friendRow: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", overflow: "hidden" },
  friendAvatar: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  friendInitial: { fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  friendInfo: { flex: 1 },
  friendName: { color: "#1A0B2E", fontSize: 14, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  friendJoined: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  friendStatus: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  friendStatusText: { fontSize: 12, fontWeight: "700" },
  ctaWrap: { paddingHorizontal: 20, marginBottom: 8 },
  ctaBtn: { borderRadius: 18, paddingVertical: 18, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  ctaBtnText: { color: "#1A0B2E", fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
